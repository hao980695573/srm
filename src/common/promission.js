import router from '../router/index'
// 引入公共配置
import {config} from '@/api/config.js';
//引入接口文件请求文件
import axios from '@/api/axios.js'
// 引入store
import $store from '@/store/index'
// 引入vue使用element的ui
import Vue from 'vue'
let v = new Vue();

const _import = require('@/router/_import_' + process.env.NODE_ENV)//获取组件的方法

const dashboard = () => import('@/pages/dashboard/dashboard') //dashboard 是架构组件，不在后台返回，在文件里单独引入

var getRouter //用来获取后台拿到的路由

router.beforeEach((to, from, next) => {
  // 判断是否有token
  if (localStorage.getItem('token')!=null&&localStorage.getItem('token')!="undefined") {
    //不加这个判断，路由会陷入死循环
    console.log(getRouter)
    if (!getRouter) {
      if (!getObjArr('router')) {
        let uuid={
          uuid:$store.state.userId
        }
        axios.post(config.api,'/user/getUserRoleList.do',uuid).then((res) => {
          getRouter = res.data.currentRoleRouterList //后台拿到路由
          saveObjArr('router', getRouter) //存储路由到localStorage
          routerGo(to, next) //执行路由跳转方法
        })
      } else {
        //从localStorage拿到了路由
        getRouter = getObjArr('router')//拿到路由
        routerGo(to, next)
      }
    }else {
      // 如果修改过基础资料
      if($store.state.supplierState=='1'){
        if(to.path=='/'||to.path=='/newsList'||to.path=='/newsDetails'||to.path=='/record/home'||to.path=='/record/manufacturer'){
          next()
        }else{
          if($store.state.auditStatus=="6"){
            next()
          }
        }
      }else if($store.state.supplierState=='0'){
        // 如果没有修改过基础资料，限制进入路由
        if(to.path=='/'||to.path=='/newsList'||to.path=='/newsDetails'||to.path=='/record/home'||to.path=='/record/manufacturer'){
          next()
        }
      }else{
        next()
      }
    }
  } else {
    // 如果没有token，则判断是否进入这些不需要权限的页面
    if(to.path=='/'||to.path=='/newsList'||to.path=='/newsDetails'){
      next()
    }else{
      console.log(to)
      next('/')
    }
  }
})


function routerGo(to, next) {
  getRouter = filterAsyncRouter(getRouter) //过滤路由
  router.addRoutes(getRouter) //动态添加路由
  global.antRouter = getRouter //将路由数据传递给全局变量，做侧边栏菜单渲染工作
  next({ ...to, replace: true })
}

function saveObjArr(name, data) { //localStorage 存储数组对象的方法
  localStorage.setItem(name, JSON.stringify(data))
}

function getObjArr(name) { //localStorage 获取数组对象的方法
  return JSON.parse(window.localStorage.getItem(name));
}

function filterAsyncRouter(asyncRouterMap) { //遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === 'dashboard') { //Layout组件特殊处理
        route.component = dashboard
      } else {
        route.component = _import(route.component)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })
  return accessedRouters
}
