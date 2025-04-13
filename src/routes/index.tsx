import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '@/pages/home-page';
import MainLayout from '@/layouts/main-layout';
import AlgoSimLayout from '@/layouts/algo-sim-layout';
import SortingPage from '@/pages/sorting-page';
const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: '/',
                Component: () => <HomePage />,
                errorElement: <div>error</div>,
            },
        ],
    },
    {
        path: '/algo',
        element: <AlgoSimLayout />,
        children: [
            {
                path: 'sorting',
                Component: () => <SortingPage />,
            },
        ],
    },
]);
export default router;
export const AppRouter = () => {
    return <RouterProvider router={router} />;
};
