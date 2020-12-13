export const viewerRouter = {
    path: '/public-view/:contentId',
    name: 'PublicViewer',
    component: () => import('@/views/PublicViewer.vue')
}