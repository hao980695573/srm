import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// 兼容ie
import 'babel-polyfill'
// 引入重置样式
import './styles/reset.css'

// 引入element ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import contentmenu from 'v-contextmenu'
import 'v-contextmenu/dist/index.css'

Vue.use(contentmenu)

//这里进行路由后台获取
import 'common/promission.js'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
