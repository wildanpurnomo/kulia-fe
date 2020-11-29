export const mainRouter = {
    path: '',
    component: () => import('@/views/Main.vue'),
    children:[
        {
            path: '/home',
            name: 'Home',
            component: () => import('@/views/partials/main/Home.vue'),
            meta: {value:'Beranda'}
        },
        {
            path:'/my-content',
            name: 'MyContent',
            component: () => import('@/views/partials/main/MyContent.vue'),
            meta: {value:'Konten Saya'},
        },
        {
            path:'/add-content',
            name: 'AddContent',
            component: () => import('@/views/partials/main/AddContent.vue'),
            meta: {value:'Tambah Konten'},
        },
        {
            path:'/edit-content/:contentId',
            name: 'EditContent',
            component: () => import('@/views/partials/main/AddContent.vue'),
            meta: {value:'Edit Konten'},
        },
        {
            path:'/my-profile',
            name: 'MyProfile',
            component: () => import('@/views/partials/main/MyProfile.vue'),
            meta: {value:'Profil Saya'},
        },
        {
            path:'/my-following',
            name: 'MyFollowing',
            component: () => import('@/views/partials/main/MyFollowing.vue'),
            meta: {value:'Saya Ikuti'},
        }
    ]
}