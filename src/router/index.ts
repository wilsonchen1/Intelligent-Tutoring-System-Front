import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/login/LoginView.vue')
        },
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('../views/admin/menu/MenuView.vue'),
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: () => import('../views/admin/home/HomeView.vue')
                },
                {
                    path: '/grades',
                    name: 'grades',
                    component: () => import('../views/admin/grades/GradesView.vue')
                },
                {
                    path: '/publish',
                    name: 'publish',
                    component: () => import('../views/admin/publish/PublishView.vue')
                },
                {
                    path: '/generate',
                    name: 'generate',
                    component: () => import('../views/admin/generate/GenerateView.vue')
                },
                {
                    path: '/files',
                    name: 'files',
                    component: () => import('../views/admin/files/FilesView.vue')
                },
                {
                    path: '/posts',
                    name: 'posts',
                    component: () => import('../views/admin/posts/postsView.vue')
                },
                {
                    path: '/texts',
                    name: 'texts',
                    component: () => import('../views/admin/text/homeView.vue'),
                    children: [
                        {
                            path: 'bomb-game',
                            name: 'bomb-game',
                            component: () => import('../views/admin/text/bomb/bombView.vue'),
                        }
                    ]
                },
            ]
        }
    ]
});

export default router;
