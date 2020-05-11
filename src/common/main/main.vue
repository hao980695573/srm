<template>
  <div class='main'>
    <!-- 此处放置el-tabs代码 -->
    <div >
      <el-tabs
        v-model="activeIndex"
        type="border-card"
        closable
        v-if="openTab.length"
        @tab-click='tabClick'
        @tab-remove='tabRemove'
      >
        <el-tab-pane
          :key="item.name"
          v-for="(item, index) in openTab"
          :label="item.title"
          :name="item.route"
        >
          {{item.route}}
        </el-tab-pane>
      </el-tabs>
    </div>
    <div>
      <!--点击el_tab切换路由需要缓存-->
      <keep-alive>
        <router-view v-if="this.$route.meta.keepAlive=='1'"></router-view>
      </keep-alive>
      <router-view v-show="this.$route.meta.keepAlive=='0'"></router-view>
    </div>
  </div>
</template>

<script>
// Vuex语法糖
import {mapState} from 'Vuex'

export default {
  name:'mains',
  methods:{
    //tab标签点击时，切换相应的路由
    tabClick(tab){
      this.$router.push({path: this.activeIndex});
    },
    //移除tab标签
    tabRemove(targetName){
      // 根据不同角色，首页不删
      if(this.$store.state.userRole=='OWN_CLERK'){
        if(targetName == '/'||targetName == '/financialManagement/financialReconciliation'){
          return
        }
      }else if(this.$store.state.userRole=='OWN_WAREHOUSE'){
        if(targetName == '/'||targetName == '/collectGoods/addPromotionBill'){
          return
        }
      }else if(this.$store.state.userRole=='ROLE_ADMINPLANNER'){
        if(targetName == '/'||targetName == '/purchase/orderScheduling'){
          return
        }
      }else{
        if(targetName == '/'||targetName == '/record/home'){
          return
        }
      }

      this.$store.commit('delete_tabs', targetName);
      if (this.activeIndex === targetName) {
        // 设置当前激活的路由
        if (this.openTab && this.openTab.length >= 1) {
          this.$store.commit('set_active_index', this.openTab[this.openTab.length - 1].route);
          this.$router.push({path: this.activeIndex});
        }
      }
    }
  },
  mounted () {
    // 刷新页面时清空列表
    this.$store.commit('add_tabs',0);
    // 刷新时以当前路由做为tab加入tabs
    // 当前路由不是首页时，添加首页以及另一页到store里，并设置激活状态
    // 当当前路由是首页时，添加首页到store，并设置激活状态

    // 根据用户角色进入不同
    if(this.$store.state.userRole=='OWN_CLERK'){
      if (this.$route.path == '/financialManagement/financialReconciliation') {
        // 本部财务员默认路径
        this.$store.commit('add_tabs', {route: '/financialManagement/financialReconciliation', name: 'financialReconciliation',title:this.$route.meta.title});
        this.$store.commit('set_active_index', '/financialManagement/financialReconciliation');
      } else {
        // 本部财务员不是默认路径
        this.$store.commit('add_tabs', {route: '/financialManagement/financialReconciliation' , name: 'financialReconciliation',title:'财务对账'});
        this.$store.commit('add_tabs', {route: this.$route.path , name: this.$route.name,title:this.$route.meta.title});
        this.$store.commit('set_active_index', this.$route.path);
      }
    }else if(this.$store.state.userRole=='OWN_WAREHOUSE'){
      if (this.$route.path == '/collectGoods/addPromotionBill') {
        // 本部仓库员默认路径
        this.$store.commit('add_tabs', {route: '/collectGoods/addPromotionBill', name: 'addPromotionBill',title:this.$route.meta.title});
        this.$store.commit('set_active_index', '/collectGoods/addPromotionBill');
      } else {
        // 本部仓库员不是默认路径
        this.$store.commit('add_tabs', {route: '/collectGoods/addPromotionBill' , name: 'addPromotionBill',title:'新增进货单'});
        this.$store.commit('add_tabs', {route: this.$route.path , name: this.$route.name,title:this.$route.meta.title});
        this.$store.commit('set_active_index', this.$route.path);
      }
    }else if(this.$store.state.userRole=='PLANNER'){
      if (this.$route.path == '/purchase/orderScheduling') {
        // 计划人员默认路径
        this.$store.commit('add_tabs', {route: '/purchase/orderScheduling', name: 'orderScheduling',title:this.$route.meta.title});
      } else {
        // 计划人员员不是默认路径
        this.$store.commit('add_tabs', {route: '/purchase/orderScheduling' , name: 'orderScheduling',title:'采购订单排程'});
        this.$store.commit('add_tabs', {route: this.$route.path , name: this.$route.name,title:this.$route.meta.title});
        this.$store.commit('set_active_index', this.$route.path);
      }
    }else{
      if (this.$route.path == '/record/home') {
        // 默认路径
        this.$store.commit('add_tabs', {route: '/record/home', name: 'home',title:this.$route.meta.title});
        this.$store.commit('set_active_index', '/record/home');
      } else {
        // 不是默认路径
        this.$store.commit('add_tabs', {route: '/record/home' , name: 'home',title:'基础档案管理'});
        this.$store.commit('add_tabs', {route: this.$route.path , name: this.$route.name,title:this.$route.meta.title});
        this.$store.commit('set_active_index', this.$route.path);

      }
    }

  },
  computed: {
    // 是否tab切换的，用来控制路由是否缓存
    ...mapState(['tabState']),
    // 打开tab
    openTab () {
      // 返回打开的地址
      return this.$store.state.openTab;
    },
    activeIndex:{
      get () {
        return this.$store.state.activeIndex;
      },
      set (val) {
        this.$store.commit('set_active_index', val);
      }
    }
  },
  watch:{
    '$route'(to,from){
      //判断路由是否已经打开
      //已经打开的 ，将其置为active
      //未打开的，将其放入队列里
      if(this.$route.meta.title!=null){
        let flag = false;
        for(let item of this.openTab){
          if(item.name === to.name){
            this.$store.commit('set_active_index',to.path)
            flag = true;
            break;
          }
        }
        if(!flag){
          this.$store.commit('add_tabs', {route: to.path, name: to.name,title:this.$route.meta.title});
          this.$store.commit('set_active_index', to.path);
        }
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
  .main
    position absolute
    left: 210px;
    top: 60px;
    right: 0px;
    bottom: 0px;
    padding: 10px;
    overflow scroll;
</style>
