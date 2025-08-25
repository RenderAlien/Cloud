import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'
import Department from '../views/Department.vue'
import Departments from '../views/Departments.vue'
import Profile from '../views/Profile.vue'
import AdminUsers from '../views/AdminUsers.vue'
import AdminDelRequests from '../views/AdminDelRequests.vue'
import AdminDocs from '../views/AdminDocs.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
    },
    {
      path: '/dep',
      name: 'dep',
      component: Department
    },
    {
      path: '/deps',
      name: 'deps',
      component: Departments
    },
    {
      path: '/profile',
      name: '/profile',
      component: Profile
    },
    {
      path: '/admin_users',
      name: '/admin_users',
      component: AdminUsers
    },
    {
      path: '/admin_del_requests',
      name: '/admin_del_requests',
      component: AdminDelRequests
    },
    {
      path: '/admin_docs',
      name: '/admin_docs',
      component: AdminDocs
    }
  ],
})

export default router
