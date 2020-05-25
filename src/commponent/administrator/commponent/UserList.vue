<template>
  <div>
    <!--快捷搜索-->
    <div class='inquiry_warp'>
     <el-form ref="searchfrom" :model="searchfrom" label-width="auto" size='mini' :inline='true'>
      <!--用户名-->
      <el-form-item label="用户名" label-width='80px'>
        <el-input v-model='searchfrom.username' style='width: 150px;'></el-input>
      </el-form-item>
      <!--联系人-->
      <el-form-item label="联系人">
        <el-input v-model='searchfrom.name' style='width: 150px;'></el-input>
      </el-form-item>
      <!--联系电话-->
      <el-form-item label="联系电话">
        <el-input v-model='searchfrom.phone' style='width: 150px;'></el-input>
      </el-form-item>
      <!--角色-->
      <el-form-item label="角色">
        <el-select v-model="searchfrom.role" placeholder="请选择角色" style='width: 150px;'>
          <el-option label="请选择角色" value=""></el-option>
          <el-option v-for="item in this.roleList"
                     :key="item.uuid"
                     :label="item.name"
                     :value="item.uuid"></el-option>
        </el-select>
      </el-form-item>
      <!--按钮-->
      <el-form-item>
        <el-button type="primary" @click='searchfor'>搜索</el-button>
        <el-button @click='addUsers'>新增用户</el-button>
      </el-form-item>
    </el-form>
    </div>
    <!--用户列表-->
    <el-table :data="this.tableData" style="width: 100%"
              border
              size='mini'
              max-height="415"
              v-loading.fullscreen.lock='this.mark'
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column
        align="center"
        type="index"
        width="60">
      </el-table-column>
      <el-table-column
        align="center"
        prop="username"
        label="用户名"
        min-width="100">
      </el-table-column>
      <el-table-column
        align="center"
        prop="manufacturerName"
        label="公司名"
        min-width="130">
      </el-table-column>
      <el-table-column
        align="center"
        prop="name"
        label="联系人"
        width='120'>
      </el-table-column>
      <el-table-column
        align="center"
        prop="phone"
        label="电话"
        width='110'>
      </el-table-column>
      <el-table-column
        align="center"
        label="状态"
        width='90'
      >
        <template slot-scope="scope">
          <span :class='{forbidden:scope.row.status==1}'>{{scope.row.status|formatState}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="role"
        label="角色"
        min-width='130'>
      </el-table-column>
      <el-table-column label="操作" width="170" align='center'>
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click='hlandEditDialogs(scope.row)'>编辑</el-button>
          <el-button type="text" size="mini" @click='changeUser(scope.row)' v-if="userRole=='ROLE_ADMIN'">权限</el-button>
          <el-button type="text" size="mini" @click='resetPassword(scope.row)'>重置</el-button>
          <el-button type='text' size="mini" @click='forbiddenUser(scope.row)'>禁用</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class='page_fen'>
      <el-pagination
        background
        :page-size="ShowPage"
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage">
      </el-pagination>
    </div>
    <!--编辑用户-->
    <editUser ref='editUserdialog' @getUserList='gettableData'></editUser>
    <!--新增用户-->
    <UserAdd ref='dialog' @upUserList='gettableData'></UserAdd>
    <!--修改具体用户模块-->
    <changeUser ref='changeDialog'></changeUser>
  </div>
</template>

<script>
  // 引入公共配置
  import {config} from 'api/config.js';
  //引入接口文件请求文件
  import axios from 'api/axios.js'
  // Vuex语法糖
  import {mapState,mapMutations} from 'Vuex'
  // 引入编辑用户模块
  import editUser from '@/commponent/administrator/commponent/editUser'
  // 引入新增用户模块
  import UserAdd from '@/commponent/administrator/commponent/UserAdd'
  // 引入修改具体用户模块
  import changeUser from '@/commponent/administrator/commponent/changeUser'



  export default {
    name:'UserList',
    data(){
      return{
        // 总条数
        total: 1,
        // 当前页
        currentPage: 1,
        // 展示条数
        ShowPage: 15,
        // 搜索条件
        searchfrom: {
          // 用户名
          username: '',
          // 联系人
          name: '',
          // 联系电话
          phone: '',
          // 角色
          liaisonType: ''
        }
      }
    },
    filters: {
      // 用户状态转换
      formatState: function (val) {
        return val === 0 ? '使用中' : '禁用'
      },
    },
    computed: {
      // 获取 遮罩层加载模块、用户后台数据源、展示用户列表中的值、角色列表
      ...mapState(['mark','loadData','tableData','roleList','userRole']),
    },
    mounted(){
     // 获取用户列表
      this.gettableData()
      // 获取角色列表
      this.getroleList()
    },
    methods:{
      ...mapMutations(['loadMack','changeloadData','changetableData','ChangeroleList','changehlderUserData']),
      // 显示新增用户
      addUsers() {
        this.$refs.dialog.hlandDialogs()
      },
      // 显示修改用户
      changeUser(scope){
        this.$refs.changeDialog.hanldaccessShow()
        // 存储选中修改的用户
        this.changehlderUserData(scope)
      },
      // 显示编辑用户
      hlandEditDialogs(scope){
        this.$refs.editUserdialog.hlandEditDialogs(scope.uuid)
      },
      // 获取角色列表
      getroleList() {
        let params = {
          englishName: ''
        }
        axios.post(config.api, '/role/getRoleList.do', params).then((res) => {
          this.ChangeroleList(res.data)
        })
      },
      // 快捷搜索
      searchfor() {
        const params = {
          username: this.searchfrom.username,
          name: this.searchfrom.name,
          phone: this.searchfrom.phone,
          roleuuid: this.searchfrom.role
        }
        // 开始请求
        axios.post(config.api, '/user/listUser.do', params).then((res) => {
          // 关闭加载状态
          this.loadMack(false)
          // 如果有数据
          if (res.data.length !== 0) {
            // 存储本地数据
            this.changeloadData(res.data)
            // 分页按钮
            this.handleCurrentChange()
          } else {
            // 没有数据直接返回空
            this.changetableData(null)
          }
        })
      },
      // 用户列表
      gettableData() {
        // 清空用户管理列表展示数据
        this.changetableData(null)
        // 开启加载状态
        this.loadMack(true)
        // 开始请求
        const params = {
          username: "",
          name: "",
          phone: ""
        }
        axios.post(config.api, '/user/listUser.do', params).then((res) => {
          // 关闭加载状态
          this.loadMack(false)
          // 判断是否有数据
          if (res.data.length !== 0) {
            // 存储本地数据
            this.changeloadData(res.data)
            // 分页按钮
            this.handleCurrentChange()
          } else {
            // 没有数据直接返回空
            this.changetableData(null)
          }
        })
      },
      // 分页按钮
      handleCurrentChange() {
        // 清空用户管理列表展示数据
        this.changetableData(null)
        // 用户列表总条数
        this.total = this.loadData.length
        // 如果数据刚好能被需要展示的条数整除
        if (this.total % this.ShowPage === 0) {
          for (let i = (this.currentPage - 1) * this.ShowPage; i < this.currentPage * this.ShowPage; i++) {
            this.changetableData(this.loadData[i])
          }
        } else {
          // 如果不够被需要展示的条数整除，获得余数
          const remainder = this.total % this.ShowPage
          // 每次取需要展示的条数
          var size = this.currentPage * this.ShowPage;
          // 如果当前页等于总页数
          if (this.currentPage === Math.ceil(this.total / this.ShowPage)) {
            size = (this.currentPage - 1) * this.ShowPage + remainder
          }
          // 从第几条数据开始
          for (let i = (this.currentPage - 1) * this.ShowPage; i < size; i++) {
            this.changetableData(this.loadData[i])
          }
        }
      },
      // 重置密码
      resetPassword(data){
        const params={
          "uuid":data.uuid
        }
        // 开始请求
        axios.post(config.api, '/user/resetPassword.do', params).then((res) => {
            // 如果修改成功
            if(res.status==0){
              this.$alert("重置密码成功",{
                confirmButtonText:'确定',
                center:true
              })
            }else{
              this.$alert(res.msg,{
                confirmButtonText:'确定',
                center:true
              })
            }

        })
      },
      // 禁用账号
      forbiddenUser(data){
        console.log(data);
        if(data.status==1){
          this.$alert('该账户已被禁用',{
            confirmButtonText:'确定',
            center:true
          })
          return
        }
        const params={
          "uuid":data.uuid,
          "status":data.status
        }
        // 开始请求
        axios.post(config.api, '/user/forbiddenUser.do', params).then((res) => {
          // 如果修改成功
          if(res.status==0){
            let _this=this
            this.$alert('禁用成功',{
              confirmButtonText:'确定',
              center:true,
              callback: action => {
                // 重新获取数据列表
                _this.gettableData()
              }
            })
          }else{
            this.$alert(res.msg,{
              confirmButtonText:'确定',
              center:true
            })
          }
        })
      },
    },
    components:{
      editUser,
      UserAdd,
      changeUser
    }
  }
</script>

<style lang='stylus' scoped>
  .inquiry_warp
    width: 100%;
    margin-top: 20px;
    margin-bottom: 10px;

  .el-table >>> thead
    color: #1f2d3d;

  .el-table
    border 1px solid #dddddd;
    overflow hidden;

  // 分页
  .page_fen
    width: 100%;
    height: 60px;
    background: #f5f5f5;
    display flex
    justify-content center
    align-items: center
    margin-top: 20px;
    padding: 0px 20px;
    box-sizing border-box;

  .forbidden
    color: #ff6666
</style>
