import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChildrenView from '../views/ChildrenView.vue'
import BackendView from '../views/BackendView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/routers',
      components: {
        default: HomeView,
        middle:ChildrenView,
        bottom: HomeView,
      }
    },
    {
      path: '/about/:id?',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
      children:[
        {
          path:"children",
          component: ChildrenView,
        },
      ],
    },
    {
      path: '/children',
      name: 'children',
      component: ChildrenView
    },
    {
      path: '/backend', 
      name: 'backend',
      component: BackendView
    },
  ],
});


export default router

