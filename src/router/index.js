import Vue from 'vue'
import Router from 'vue-router'



Vue.use(Router)


// 固定的路由表
export const fixedRouter = [{
  path: '/',
  component: (resolve) => require(['@/pages/login/login'], resolve),
  hidden: true
},
  {
    path: '/newsList',
    component: (resolve) => require(['@/pages/newsList/newsList'], resolve),
    hidden: true
  },
  {
    path: '/newsDetails',
    component: (resolve) => require(['@/pages/newsDetails/newsDetails'], resolve),
    hidden: true
  },
  {
    path: "*",
    component:(resolve) => require(['@/common/404/404'], resolve),
  }]


export default new Router({
  routes: fixedRouter
})
