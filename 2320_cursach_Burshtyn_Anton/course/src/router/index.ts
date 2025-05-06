import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import Schedule from '@/pages/Schedule.vue'
import Clients from '@/pages/Clients.vue'
import Instructors from '@/pages/Instructors.vue'
import Settings from '@/pages/Settings.vue'


// const routes = [
//   { path: '/', component: Home },
//   { path: '/schedule', component: Schedule },
//   { path: '/clients', component: Clients },
//   { path: '/instructors', component: Instructors },
//   { path: '/settings', component: Settings },
// ]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/schedule',
      name: 'Schedule',
      component: Schedule,
    },
    {
    path: '/Clients',
    name: 'Clients',
    component: Clients,
  },
  {
    path: '/Instructors',
    name: 'Instructors',
    component: Instructors,
  },
  {
    path: '/Settings',
    name: 'Settings',
    component: Settings,
  },
    {
      path: '/about',
      name: 'about',

      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
