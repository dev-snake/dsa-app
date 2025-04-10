import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomePage from '@/pages/home-page';
import MainLayout from '@/layouts/main-layout';
const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        // loader: async () => {
        //     const { default: HomePage } = await import('@/pages/home-page');
        //     return { HomePage };
        // },
        // action: async () => {
        //     const { default: HomePage } = await import('@/pages/home-page');
        //     return { HomePage };
        // },
        // handle: {
        //     breadcrumb: 'Home',
        // },

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
