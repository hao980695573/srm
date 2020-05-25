<template>
  <div>
    <div class='inquiry_warp'>
      <!--搜索-->
      <el-form label-width="auto" size='mini' :inline='true'>
        <!--角色-->
        <el-form-item label="角色" label-width='80px'>
          <el-input v-model="rolesrech.name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <!--按钮-->
        <el-form-item>
          <el-button type="primary" @click='getUserList'>搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--角色列表-->
    <div class='role_warp'>
      <!--角色列表-->
      <el-table :data="roleList"
                border
                size='mini'
                height="700px"
                element-loading-background="rgba(0, 0, 0, 0.8)">
        <el-table-column
          align="center"
          type="index"
          width="60">
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="角色名称"
          min-width="150">
        </el-table-column>
        <el-table-column
          align="center"
          prop="englishName"
          label="英语名称"
          min-width="100">
        </el-table-column>
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click='hanldaccessShow(scope.row)' :disabled='scope.row.englishName=="ROLE_ADMIN"'>编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--权限列表-->
    <el-dialog
      title="角色权限"
      :visible.sync="accessShow"
      width="50%"
      top='2.5%'
      @close='hanldaccessCose'
    >
      <!--角色提示-->
      <div class='roleStatus'>
        <span class='role_title'>角色：</span>
        <el-input
        v-model="name"
        :disabled="true"
        size='mini'
        >
      </el-input>
      </div>
      <!--checkout-->
      <div class="checkbox-table" v-for="(item, indexkey) in menu" :key="item.uuid" v-show='item.hidden=="false"'>
        <template>
          <el-checkbox class="check1" style="font-weight: 600;margin-bottom: 15px " v-model='menusIds' :label="item.uuid" @change='handleCheck(1,indexkey)'>
            {{item.meta.title}}
          </el-checkbox>
          <div style="margin-bottom: 20px;">
            <div v-for="list in item.children" class="line-check" :key="list.uuid" style="display: inline-block; margin-left: 20px;margin-bottom: 20px;" >
              <el-checkbox class="check2" @change='handleCheck(2,indexkey)' v-model="menusIds" :label="list.uuid">
                {{list.meta.title}}
              </el-checkbox>
            </div>
          </div>
        </template>
      </div>

      <!--确定按钮-->
      <div class='assign' @click='hlandfailure'>确定</div>
    </el-dialog>
  </div>
</template>

<script>
  // 引入公共配置
  import {config} from 'api/config.js';
  //引入接口文件请求文件
  import axios from 'api/axios.js'

  export default {
    name: 'access',
    data() {
      return {
        //所有的菜单数组
        menu: [],
        //已选的菜单id数组
        menusIds: [],
        // 搜索
        rolesrech: {
          name: ''
        },
        // 当前选择编辑角色的值
        name:'',
        // 当前选择编辑角色的uuid
        uuid:'',
        // 角色列表
        roleList: [],
        // 是否显示权限列表
        accessShow: false

      }
    },
    mounted() {
      // 获取用户角色列表
      this.getUserList()
    },
    methods: {
      // 获取用户角色列表
      getUserList() {
        const params = {
          name: this.rolesrech.name
        }
        axios.post(config.api, '/role/getRoleList.do', params).then((res) => {
          // 角色列表
          this.roleList = res.data
        })
      },
      // 开启权限列表显示
      hanldaccessShow(scope){
        // 当前编辑角色的英语名字
        this.englishName=scope.englishName
        // 当前编辑角色的名字
        this.name=scope.name
        // 当前编辑角色的uuid
        this.uuid=scope.uuid
        // 权限列表显示
        this.accessShow=true
        // 加载权限列表
        this.loadData();
      },
      // 关闭权限列表显示
      hanldaccessCose(){
        this.menusIds=[]
      },
      // 加载权限列表
      loadData() {
        const params={
          englishName:this.englishName,
          name:this.name
        }
        let _this = this
        axios.post(config.api,'/role/getRoleRouter.do',params).then((res) => {
          // 所有权限目录
          _this.menu =res.data.allRouterList
          console.log( _this.menu)
          // 当前角色所拥有的权限
          //判断把当前选择checkbox加入数组中
          res.data.currentRoleRouterList.map((item)=>{

            _this.menusIds.push(item.uuid)
            if(item.children.length>0){
              item.children.map((child)=>{

                _this.menusIds.push(child.uuid)
              })
            }
          })
        })
      },

      // 处理选择事件
      handleCheck(type, a = 0) { // 多选框
        let self = this;
        if (type == 2) { // 二级菜单点击
          let index = 0;

          self.menu[a].children.map(item => {
            if (self.menusIds.indexOf(item.uuid) > -1) {
              index += 1;
            }
          })
          console.log(a)
          if (index > 0) {
            if (self.menusIds.indexOf(self.menu[a].uuid) < 0) {
              self.menusIds.push(self.menu[a].uuid);
            }
          }
        //如果整行为空
        else {
            if (self.menusIds.indexOf(self.menu[a].uuid) > 0) {
              self.menusIds.splice(self.menusIds.indexOf(self.menu[a].uuid), 1);
            }
          }
        }
        //点击大标题
        else {
          if (self.menusIds.indexOf(self.menu[a].uuid) > -1) {
            self.menu[a].children.map(item => {
              if (self.menusIds.findIndex((n) => n == item.uuid) < 0) {
                self.menusIds.push(item.uuid)
              }
            })
          }
          //大标题为空的时候
          else {
            self.menu[a].children.map(item => {
              if (self.menusIds.findIndex((n) => n == item.uuid) > -1) {
                self.menusIds.splice(self.menusIds.findIndex((n) => n == item.uuid), 1);
              }
            })
          }
        }
      },
      // 确定修改权限
      hlandfailure(){
        const params=[]
        // 判断是否遍历完成
        const indexLength= this.menusIds.length
        if(this.menusIds.length>0){
          this.menusIds.map((item,index)=>{
            console.log(this.menusIds)
            console.log(item);
            if(index<indexLength){
              params.push({
                selectRoleuuid: this.uuid,
                roleuuid: this.uuid,
                routeruuid:item
              })
              // 如果遍历完成
              if((index+1)===indexLength){
                axios.post(config.api,'/role/updateRoleRouter.do',params).then((res) => {
                  let _this = this
                  this.$alert(res.msg, {
                    confirmButtonText: '确定',
                    center: true,
                    callback: action => {
                      this.accessShow=false
                    }
                  });
                })
              }
            }
          })
        }else{
          params.push({
            selectRoleuuid: this.uuid,
            roleuuid: "",
            routeruuid:""
          })
          console.log(params);
          axios.post(config.api,'/role/updateRoleRouter.do',params).then((res) => {
            let _this = this
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true,
              callback: action => {
                this.accessShow=false
              }
            });
          })
        }

      }
    }
  }
</script>

<style lang='stylus' scoped>
  .inquiry_warp
    width: 100%;
    margin-top: 20px;
    margin-bottom: 10px;

  .role_warp
    width 1000px;
    margin 0px auto;
    margin-top: 40px;

  .roleStatus
    width 200px
    display flex
    justify-content center
    align-items center
    margin-bottom 30px;
    .role_title
      width 60px;

  .assign
    width 100px;
    line-height 40px;
    background #409EFF;
    text-align center
    margin 0px auto
    color:#fff;
    font-size 18px;
    border-radius 10px;
    cursor pointer
</style>
