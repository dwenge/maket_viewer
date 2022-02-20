import Vue from 'vue'
import VueRouter from 'vue-router'

// import Home from '@/views/Home'
import ProjectList from '@/views/ProjectList'
import ProjectDetail from '@/views/ProjectDetail'
import ProjectPage from '@/views/ProjectPage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: ProjectList
  },
  // {
  //   path: '/projects/',
  //   name: 'ProjectList',
  //   component: ProjectList
  // },
  {
    path: '/projects/:project_code/',
    name: 'ProjectDetail',
    component: ProjectDetail
  },
  {
    path: '/projects/:project_code/:page_type/:page_code.html',
    name: 'ProjectPage',
    component: ProjectPage
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
