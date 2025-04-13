export const ROUTES = {
    PUBLIC: {
        HOME: '/',
        LOGIN: '/login',
        REGISTER: '/register',
        FORGOT_PASSWORD: '/forgot-password',
        RESET_PASSWORD: '/reset-password',
        VERIFY_EMAIL: '/verify-email',
        SORTING: 'algo/sorting',
    },
    ADMIN: {
        DASHBOARD: '/admin/dashboard',
        USERS: '/admin/users',
        USER_DETAIL: '/admin/users/:id',
        SETTINGS: '/admin/settings',
    },
};
export default ROUTES;
