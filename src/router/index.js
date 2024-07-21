import { createRouter, createWebHistory} from "vue-router";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";
import DashboardView from "@/views/DashboardView.vue";
import UsersView from "@/views/UsersView.vue";
import NotFoundView from '@/views/NotFoundView.vue'

const routes = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardView,
        meta: { requiresAuth: true },
    },
    {
        path: '/users',
        name: 'users',
        component: UsersView,
        meta: { requiresAuth: true },
    },
    {
        path: '/',
        name: 'home',
        component: LoginView,
        meta: { hideNavigation: true },
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView,
        meta: { hideNavigation: true },
    },
    {
        path: '/login',
        name: 'login',
        component: LoginView,
        meta: { hideNavigation: true },
    },
    {
        path: '/notfound',
        name: 'notfound',
        component: NotFoundView,
        meta: { hideNavigation: true },
    },
];

const router = createRouter({
    history: createWebHistory('/'),
    routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = !!localStorage.getItem('token');
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next('/notfound');
    } else {
        next();
    }
});

export default router;