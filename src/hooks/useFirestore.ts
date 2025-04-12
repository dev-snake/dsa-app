import {
    collection,
    doc,
    query,
    where,
    getDocs,
    getDoc,
    addDoc,
    updateDoc,
    deleteDoc,
    writeBatch,
    onSnapshot,
    orderBy,
    limit,
    startAfter,
    QueryConstraint,
    DocumentData,
    Query,
    DocumentSnapshot,
    serverTimestamp,
} from 'firebase/firestore';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { db } from '@/configs/firebase/firebase.config';

// ==================== Types ====================
type WhereFilterOp =
    | '<'
    | '<='
    | '=='
    | '!='
    | '>='
    | '>'
    | 'array-contains'
    | 'in'
    | 'not-in'
    | 'array-contains-any';

interface WhereCondition {
    field: string;
    condition?: WhereFilterOp;
    value: unknown;
}

interface OrderByCondition {
    field: string;
    value: 'asc' | 'desc';
}

interface QueryOptions {
    where?: WhereCondition[];
    orderBy?: OrderByCondition;
    limit?: number;
    realtime?: boolean;
    startAfterDoc?: DocumentSnapshot;
}

interface FirestoreOperations<T extends DocumentData> {
    // Core State
    data: T[] | T | null;
    loading: boolean;
    error: Error | null;
    lastVisible: DocumentSnapshot | null;

    // Read Operations
    getCollection: (collectionName: string, options?: QueryOptions) => Promise<T[]>;
    getDocument: (collectionName: string, id: string) => Promise<T | null>;
    subscribe: (
        collectionName: string,
        callback: (data: T[]) => void,
        options?: QueryOptions
    ) => () => void;

    // Write Operations
    addDocument: (
        collectionName: string,
        data: Omit<T, 'id'>,
        options?: { merge?: boolean }
    ) => Promise<string>;
    updateDocument: (collectionName: string, id: string, data: Partial<T>) => Promise<void>;
    updateDocuments: (
        collectionName: string,
        data: Partial<T>,
        conditions?: WhereCondition[]
    ) => Promise<number>;
    deleteDocument: (collectionName: string, id: string) => Promise<void>;
    deleteDocuments: (collectionName: string, conditions?: WhereCondition[]) => Promise<number>;

    // Batch Operations
    batchUpdate: (
        collectionName: string,
        updates: Array<{ id: string; data: Partial<T> }>
    ) => Promise<void>;
    batchDelete: (collectionName: string, ids: string[]) => Promise<void>;

    // Pagination
    getNextPage: (
        collectionName: string,
        options?: Omit<QueryOptions, 'startAfterDoc'>
    ) => Promise<T[]>;
}

// ==================== Hook Implementation ====================
const useFirestore = <T extends DocumentData>(): FirestoreOperations<T> => {
    const [data, setData] = useState<T[] | T | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [lastVisible, setLastVisible] = useState<DocumentSnapshot | null>(null);

    const getCollectionRef = useCallback((collectionPath: string) => {
        return collection(db, collectionPath);
    }, []);

    const buildQuery = useCallback(
        (collectionPath: string, options?: QueryOptions): Query<T> => {
            const collectionRef = getCollectionRef(collectionPath);
            const constraints: QueryConstraint[] = [];

            // Where conditions
            const whereConditions = options?.where;
            if (whereConditions) {
                whereConditions.forEach(({ field, condition, value }) => {
                    constraints.push(where(field, condition ?? '==', value));
                });
            }

            // Ordering
            const orderByCondition = options?.orderBy;
            if (orderByCondition) {
                constraints.push(orderBy(orderByCondition.field, orderByCondition.value));
            }

            // Limit
            const queryLimit = options?.limit;
            if (queryLimit) {
                constraints.push(limit(queryLimit));
            }

            // Pagination
            if (options?.startAfterDoc) {
                constraints.push(startAfter(options.startAfterDoc));
            }

            return query(collectionRef, ...constraints) as Query<T>;
        },
        [getCollectionRef]
    );

    // ==================== Read Operations ====================
    const getCollection = useCallback(
        async (collectionName: string, options?: QueryOptions): Promise<T[]> => {
            setLoading(true);
            try {
                const querySnapshot = await getDocs(buildQuery(collectionName, options));
                const results = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as T[];

                setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1] || null);
                setData(results);
                return results;
            } catch (err) {
                setError(err as Error);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [buildQuery]
    );

    const getDocument = useCallback(
        async (collectionName: string, id: string): Promise<T | null> => {
            setLoading(true);
            try {
                const docRef = doc(db, collectionName, id);
                const snapshot = await getDoc(docRef);

                if (!snapshot.exists()) {
                    setData(null);
                    return null;
                }

                const result = { id: snapshot.id, ...snapshot.data() } as unknown as T;
                setData(result);
                return result;
            } catch (err) {
                setError(err as Error);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    // ==================== Write Operations ====================
    const addDocument = useCallback(
        async (
            collectionName: string,
            data: Omit<T, 'id'>,
            options?: { merge?: boolean }
        ): Promise<string> => {
            setLoading(true);
            try {
                const collectionRef = getCollectionRef(collectionName);
                const docData = {
                    ...data,
                    createdAt: serverTimestamp(),
                    updatedAt: serverTimestamp(),
                };

                const docRef = await addDoc(collectionRef, docData);
                return docRef.id;
            } catch (err) {
                setError(err as Error);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [getCollectionRef]
    );

    const updateDocument = useCallback(
        async (collectionName: string, id: string, data: Partial<T>): Promise<void> => {
            setLoading(true);
            try {
                const docRef = doc(db, collectionName, id);
                await updateDoc(docRef, {
                    ...data,
                    updatedAt: serverTimestamp(),
                });

                // Update local state if needed
                if (Array.isArray(data)) {
                    setData((prev) =>
                        Array.isArray(prev)
                            ? prev.map((item) => (item.id === id ? { ...item, ...data } : item))
                            : prev
                    );
                } else if (data && (data as T).id === id) {
                    setData((prev) => (prev ? { ...prev, ...data } : null));
                }
            } catch (err) {
                setError(err as Error);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const updateDocuments = useCallback(
        async (
            collectionName: string,
            data: Partial<T>,
            conditions?: WhereCondition[]
        ): Promise<number> => {
            setLoading(true);
            try {
                const q = buildQuery(collectionName, { where: conditions });
                const snapshot = await getDocs(q);
                const batch = writeBatch(db);

                snapshot.forEach((doc) => {
                    batch.update(doc.ref, {
                        ...data,
                        updatedAt: serverTimestamp(),
                    });
                });

                await batch.commit();

                // Update local state if needed
                if (Array.isArray(data)) {
                    const updatedIds = snapshot.docs.map((doc) => doc.id);
                    setData((prev) =>
                        Array.isArray(prev)
                            ? prev.map((item) =>
                                  updatedIds.includes(item.id) ? { ...item, ...data } : item
                              )
                            : prev
                    );
                }

                return snapshot.size;
            } catch (err) {
                setError(err as Error);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [buildQuery]
    );

    const deleteDocument = useCallback(
        async (collectionName: string, id: string): Promise<void> => {
            setLoading(true);
            try {
                const docRef = doc(db, collectionName, id);
                await deleteDoc(docRef);

                // Update local state
                setData((prev) =>
                    Array.isArray(prev)
                        ? prev.filter((item) => item.id !== id)
                        : prev && (prev as T).id === id
                        ? null
                        : prev
                );
            } catch (err) {
                setError(err as Error);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const deleteDocuments = useCallback(
        async (collectionName: string, conditions?: WhereCondition[]): Promise<number> => {
            setLoading(true);
            try {
                const q = buildQuery(collectionName, { where: conditions });
                const snapshot = await getDocs(q);
                const batch = writeBatch(db);

                snapshot.forEach((doc) => {
                    batch.delete(doc.ref);
                });

                await batch.commit();

                // Update local state
                if (conditions) {
                    const deletedIds = snapshot.docs.map((doc) => doc.id);
                    setData((prev) =>
                        Array.isArray(prev)
                            ? prev.filter((item) => !deletedIds.includes(item.id))
                            : prev && deletedIds.includes((prev as T).id)
                            ? null
                            : prev
                    );
                }

                return snapshot.size;
            } catch (err) {
                setError(err as Error);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [buildQuery]
    );

    // ==================== Batch Operations ====================
    const batchUpdate = useCallback(
        async (
            collectionName: string,
            updates: Array<{ id: string; data: Partial<T> }>
        ): Promise<void> => {
            setLoading(true);
            try {
                const batch = writeBatch(db);

                updates.forEach(({ id, data }) => {
                    const docRef = doc(db, collectionName, id);
                    batch.update(docRef, {
                        ...data,
                        updatedAt: serverTimestamp(),
                    });
                });

                await batch.commit();

                // Update local state
                const updatedIds = updates.map((u) => u.id);
                setData((prev) =>
                    Array.isArray(prev)
                        ? prev.map((item) => {
                              const update = updates.find((u) => u.id === item.id);
                              return update ? { ...item, ...update.data } : item;
                          })
                        : prev && updatedIds.includes((prev as T).id)
                        ? { ...prev, ...updates.find((u) => u.id === (prev as T).id)?.data }
                        : prev
                );
            } catch (err) {
                setError(err as Error);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const batchDelete = useCallback(
        async (collectionName: string, ids: string[]): Promise<void> => {
            setLoading(true);
            try {
                const batch = writeBatch(db);

                ids.forEach((id) => {
                    const docRef = doc(db, collectionName, id);
                    batch.delete(docRef);
                });

                await batch.commit();

                // Update local state
                setData((prev) =>
                    Array.isArray(prev)
                        ? prev.filter((item) => !ids.includes(item.id))
                        : prev && ids.includes((prev as T).id)
                        ? null
                        : prev
                );
            } catch (err) {
                setError(err as Error);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        []
    );

    // ==================== Real-time Subscriptions ====================
    const subscribe = useCallback(
        (collectionName: string, callback: (data: T[]) => void, options?: QueryOptions) => {
            const q = buildQuery(collectionName, options);

            const unsubscribe = onSnapshot(
                q,
                (snapshot) => {
                    const results = snapshot.docs.map((doc) => ({
                        id: doc.id,
                        ...doc.data(),
                    })) as T[];

                    setData(results);
                    setLastVisible(snapshot.docs[snapshot.docs.length - 1] || null);
                    callback(results);
                },
                (err) => setError(err)
            );

            return unsubscribe;
        },
        [buildQuery]
    );

    // ==================== Pagination ====================
    const getNextPage = useCallback(
        async (
            collectionName: string,
            options?: Omit<QueryOptions, 'startAfterDoc'>
        ): Promise<T[]> => {
            if (!lastVisible) {
                throw new Error('No more documents to load');
            }

            setLoading(true);
            try {
                const querySnapshot = await getDocs(
                    buildQuery(collectionName, {
                        ...options,
                        startAfterDoc: lastVisible,
                    })
                );

                const results = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as T[];

                setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1] || null);

                // Merge with existing data
                setData((prev) => (Array.isArray(prev) ? [...prev, ...results] : results));

                return results;
            } catch (err) {
                setError(err as Error);
                throw err;
            } finally {
                setLoading(false);
            }
        },
        [buildQuery, lastVisible]
    );

    return {
        // State
        data,
        loading,
        error,
        lastVisible,

        // Read
        getCollection,
        getDocument,
        subscribe,

        // Write
        addDocument,
        updateDocument,
        updateDocuments,
        deleteDocument,
        deleteDocuments,

        // Batch
        batchUpdate,
        batchDelete,

        // Pagination
        getNextPage,
    };
};

export default useFirestore;
