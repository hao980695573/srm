<template>
  <!--头部-->
  <div class='greatech_top'>
    <div class='greatech_title'>
      <i class='login_icon'></i>
    </div>
  </div>
</template>

<script>
  export default {
    name:'login_header'
  }
</script>

<style lang='stylus' scoped>
  //引入css变量,使用快速定位文件夹时在css中要加~
  @import '~styles/mixins.styl'

  .greatech_top
    width: 100%
    height: 100px;
    background #2bb3d5
    display flex
    align-items center
    justify-content center
    .greatech_title
      width: 1200px;
      height: 71px;
      margin-left: -20px
      .login_icon
        display inline-block
        width: 320px
        height: 60px
        background url('../../../static/image/login/login_ico.png')
        background-repeat no-repeat
        background-size 320px 60px
</style>
