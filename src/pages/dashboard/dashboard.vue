<template>
  <div class='warp'>
      <!--头部-->
     <Header></Header>
      <!--侧边栏-->
     <AsideLeft :routes="getRoutes"></AsideLeft>
      <!--中心-->
     <MainRigin></MainRigin>
  </div>
</template>

<script>
// 引入Header
import Header from 'common/header/header'
// 引入aside
import AsideLeft from 'common/aside/aside'
// 引入main
import MainRigin from 'common/main/main'


export default{
  name: 'dashboard',
  computed: {
    getRoutes() {
      return global.antRouter

    },
  },
  components: {
    Header,
    AsideLeft,
    MainRigin
  }
}
</script>
