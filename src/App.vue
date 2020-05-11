<template>
  <div id="app">
    <router-view></router-view>
    <!--抽屉显示-->
    <Drawer></Drawer>
  </div>
</template>

<script>
  import Drawer from 'common/Drawer/Drawer'
export default {
  name: 'App',
  data(){
    return{
    }
  },
  components:{
    Drawer
  }
}
</script>

<style lang='stylus' scoped>
  #app
    width 100%
    height 100%

</style>
