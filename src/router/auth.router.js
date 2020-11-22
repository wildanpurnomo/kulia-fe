export const authRouter = {
    path: '',
    component: () => import('@/views/Auth.vue'),
    children: [
        {
            path: '/login',
            name: 'Login',
            component: () => import('@/views/partials/auth/Login.vue')
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('@/views/partials/auth/Register.vue')
        }
    ]
}
