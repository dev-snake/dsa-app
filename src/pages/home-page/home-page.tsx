import { Input } from '@/components/ui/input';
import { useEffect, useState, useRef } from 'react';
import sortImg from '@/assets/images/sort.png';
import { Aperture } from 'lucide-react';
import useFirestore from '@/hooks/useFirestore';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router';
import ROUTES from '@/constants/routes';
interface HomePageProps {
    foo: string;
}

const HomePage = (_props: HomePageProps) => {
    const [sortNames] = useState<string[]>([
        'insertion',
        'bubble',
        'selection',
        'merge',
        'quick',
        'heap',
        'radix',
        'counting',
        'shell',
    ]);
    const { getCollection, addDocument, loading, error } = useFirestore();

    const scrollContainersRef = useRef<HTMLDivElement[]>([]);

    useEffect(() => {
        const setupDragScroll = (el: HTMLElement) => {
            let isDown = false;
            let startX: number;
            let scrollLeft: number;
            el.addEventListener('mousedown', (e) => {
                isDown = true;
                startX = e.pageX - el.offsetLeft;
                scrollLeft = el.scrollLeft;
                // console.log('mousedown');
            });

            el.addEventListener('mouseleave', () => {
                isDown = false;
                // console.log('mouseleave');
            });

            el.addEventListener('mouseup', () => {
                isDown = false;
                // console.log('mouseup');
            });

            el.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - el.offsetLeft;
                const walk = (x - startX) * 2; //scroll-fast
                el.scrollLeft = scrollLeft - walk;
                // console.log(walk);
            });
        };

        // Apply drag scroll to all containers
        scrollContainersRef.current.forEach((container) => {
            if (container) {
                setupDragScroll(container);
            }
        });
        return () => {
            scrollContainersRef.current.forEach((container) => {
                if (container) {
                    container.removeEventListener('mousedown', () => {});
                    container.removeEventListener('mouseleave', () => {});
                    container.removeEventListener('mouseup', () => {});
                    container.removeEventListener('mousemove', () => {});
                }
            });
        };
    }, []);

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>Lỗi: {error.message}</div>;
    return (
        <section className="px-8 pt-14 min-h-screen">
            <div className="max-w-sm mx-auto pt-12">
                <h1 className="font-silkscreen text-center text-5xl pb-4 max-sm:text-3xl ">
                    Algo<span className="text-orange-400 font-silkscreen">Viz</span>
                    <span className="font-silkscreen text-xl  max-sm:text-xs">.dev</span>
                </h1>
                <div>
                    <Input type="text" placeholder="Search here..." className="bg-white" />
                </div>
            </div>
            <div className="grid grid-cols-5 max-xl:grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-[540px]:!grid-cols-1 max-[540px]:px-0  py-8 px-4 gap-6 justify-center">
                {Array.from({ length: 8 }).map((item, key) => (
                    <div className="p-2 shadow overflow-hidden bg-white" key={key}>
                        <img src={sortImg} alt="error" className="h-52 w-full" />
                        <div className="flex justify-between items-center pt-2">
                            <Link
                                to={ROUTES.PUBLIC.SORTING}
                                className="text-xs font-bold hover:cursor-pointer hover:opacity-55 transition-opacity"
                            >
                                Array
                            </Link>
                            <Aperture className="h-4" />
                        </div>
                        <div
                            className="flex gap-x-2 pt-2 overflow-x-auto overflow-y-hidden whitespace-nowrap cursor-pointer select-none scrollbar-hide"
                            ref={(el) => {
                                if (el) scrollContainersRef.current[key] = el;
                            }}
                        >
                            {sortNames.map((item, index) => (
                                <span
                                    key={index}
                                    className="inline-block text-xs bg-gray-100 px-2 py-1 rounded select-none "
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

HomePage.defaultProps = {
    foo: 'bar',
};

export default HomePage;
