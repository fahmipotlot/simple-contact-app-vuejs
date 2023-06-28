import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import( /* webpackChunkName: "login" */ '../views/auth/Login.vue')
    },
    {
        path: '/register',
        name: 'register',
        component: () => import( /* webpackChunkName: "register" */ '../views/auth/Register.vue')
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import( /* webpackChunkName: "dashboard" */ '../views/dashboard/Index.vue')
    },
    {
        path: '/contact',
        name: 'contact.index',
        component: () => import( /* webpackChunkName: "contactindex" */ '../views/contact/index.vue')
    },
    {
        path: '/contact/create',
        name: 'contact.create',
        component: () => import( /* webpackChunkName: "contactcreate" */ '../views/contact/create.vue')
    },
    {
        path: '/contact/edit/:id',
        name: 'contact.edit',
        component: () => import( /* webpackChunkName: "contactedit" */ '../views/contact/edit.vue')
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router