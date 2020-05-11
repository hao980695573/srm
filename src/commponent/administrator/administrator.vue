<template>
    <!--用户列表-->
    <UserList></UserList>
</template>

<script>
  // 引入用户列表模块
  import UserList from '@/commponent/administrator/commponent/UserList.vue'



  export default {
    name: 'usermanage',
    components:{
      UserList
    }
  }
</script>

<style scoped lang='stylus'>
</style>
