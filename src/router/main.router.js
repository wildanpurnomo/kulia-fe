export const mainRouter = {
    path: '',
    component: () => import('@/views/Main.vue'),
    children:[
        {
            path: '/home',
            name: 'Home',
            component: () => import('@/views/partials/main/Home.vue')
        },
        {
            path:'/my-content',
            name: 'MyContent',
            component: () => import('@/views/partials/main/MyContent.vue')
        },
        {
            path:'/add-content',
            name: 'AddContent',
            component: () => import('@/views/partials/main/AddContent.vue')
        },
        {
            path:'/edit-content',
            name: 'EditContent',
            component: () => import('@/views/partials/main/AddContent.vue')
        },
        {
            path:'/my-profile',
            name: 'MyProfile',
            component: () => import('@/views/partials/main/MyProfile.vue')
        }
    ]
}