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
            redirect: '/home'
        },
        {
            path: '/menu',
            name: 'menu',
            component: () => import('../views/manager/menu/MenuView.vue'),
            children: [
                {
                    path: '/home',
                    name: 'home',
                    component: () => import('../views/manager/home/HomeView.vue')
                },
                {
                    path: '/grades',
                    name: 'grades',
                    component: () => import('../views/manager/grades/GradesView.vue')
                },
                {
                    path: '/publish',
                    name: 'publish',
                    component: () => import('../views/manager/publish/PublishView.vue')
                },
                {
                    path: '/generate',
                    name: 'generate',
                    component: () => import('../views/manager/generate/GenerateView.vue')
                },
                {
                    path: '/files',
                    name: 'files',
                    component: () => import('../views/manager/files/FilesView.vue')
                }
            ]
        }
    ]
});

export default router;
