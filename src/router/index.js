import { createRouter, createWebHistory} from "vue-router";
import HomeView from "@/views/HomeView.vue";
import RegisterView from "@/views/RegisterView.vue";
import LoginView from "@/views/LoginView.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
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
];

const router = createRouter({
    history: createWebHistory('/'),
    routes
});

// router.beforeEach((to, from, next) => {
//     if (to.matched.some(record => record.meta.requiresAuth)) {
//         next('/login');
//     } else {
//         next();
//     }
// });

export default router;