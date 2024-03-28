import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../components/Dashboard.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: HomeView
    },
    {
      path: '/newcv',
      name: 'newcv',
      component: () => import('../components/newCv.vue')
    },
    {
      path: '/edit/:id',
      name: 'editcv',
      component: () => import('../components/editcv.vue')
    },
    {
      path: '/cv/:id',
      name: 'viewcv',
      component: () => import('../components/viewcv.vue')
    }
  ]
})

export default router
