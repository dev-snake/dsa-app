import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '@/pages/home-page';
import MainLayout from '@/layouts/main-layout';
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
]);
export default router;
export const AppRouter = () => {
    return <RouterProvider router={router} />;
};
