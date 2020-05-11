<template>
  <el-dialog
    title="修改密码"
    :visible.sync="dialogVisible"
    width="400px"
    :before-close="handleClose">
    <el-form ref="userInfo" :model="userInfo" label-width="80px" size="small">
      <el-form-item label="用户名">
        <el-input type="text" v-model="username" readonly></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="text" v-model="userInfo.password"></el-input>
      </el-form-item>
     <div class='que'>
       <el-button type="primary" @click="onSubmit" size='small'>确定</el-button>
     </div>
    </el-form>

  </el-dialog>
</template>

<script>
  // 引入公共配置
  import {config} from 'api/config.js';
  //引入接口文件请求文件
  import axios from 'api/axios.js'
  // Vuex语法糖
  import {mapState} from 'Vuex'

  export default {
    name:'changePass',
    data(){
      return{
        dialogVisible:false,
        // 用户名和密码
        userInfo:{
          password:''
        }
      }
    },
    computed:{
      ...mapState(['username','userId'])
    },
    methods:{
      // 显示修改密码
      changePassShow(){
        this.dialogVisible=true
      },
      // 修改密码
      onSubmit(){
        const params={
          username:this.username,
          password:this.userInfo.password,
          uuid:this.userId
        }
        axios.post(config.api, '/user/editPassword.do', params).then((res) => {
          if(res.status==0){
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true,
              callback: action => {
                // 清除缓存
                this.userInfo.password=''
                this.dialogVisible=false
              }
            })
          }else{
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      // 关闭修改页面
      handleClose(){
        // 清除缓存
        this.userInfo.password=''
        this.dialogVisible=false
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .que
    width 100%
    height 40px;
    display flex;
    justify-content center
    align-items center

</style>
