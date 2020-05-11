<template>
  <div>
    <!--头部-->
    <login_header></login_header>

    <!--内容-->
    <div class='newsCenter'>
      <!--面包屑导航-->
      <div class='breadcrumb'>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/newsList' }">最新动态</el-breadcrumb-item>
          <el-breadcrumb-item>动态详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!--内容详情-->
      <div class='details'>
          <!--标题-->
          <div class='details_title_warp'>
            <!--标题-->
            <div class='details_title'>{{newsDetailsData.title}}</div>
            <!--时间-->
            <div class='details_time'>{{newsDetailsData.publishDate.slice(0,10)}}</div>
          </div>
          <!--文章详情-->
          <div class='details_center'>
            <div id="zoom" class="content_nr" v-html='newsDetailsData.content'></div>
          </div>
      </div>
    </div>

  </div>
</template>

<script>
  // 引入头部文件
  import login_header from 'common/login_header/login_header'
  // Vuex语法糖
  import {mapState} from 'Vuex'

  export default {
    name: 'newsDetails',
    computed:{
      ...mapState(['newsDetailsData'])
    },
    components: {
      login_header
    }
  }
</script>

<style lang='stylus' scoped>
  .newsCenter
    width 1200px
    border 1px solid #ccc
    box-shadow: 0 0 10px #ccc;
    margin 0px auto
    margin-top 40px
    margin-bottom 20px;
    .breadcrumb
      margin-top 20px
      padding-left 15px
    .details
      width 100%
      margin-top 25px
      .details_title_warp
        width 100%
        height 100px
        display flex
        justify-content center
        align-items center
        position relative
        border-bottom 1px solid #CCC
        .details_title
          font-size 20px
        .details_time
          font-size 14px
          position absolute
          right 20px
          bottom 10px
      .details_center
        width 100%
        min-height 500px;
        padding 20px
        margin-bottom 40px;
        box-sizing border-box
</style>
