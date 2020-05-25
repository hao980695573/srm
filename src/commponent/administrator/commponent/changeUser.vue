<template>
  <!--权限列表-->
  <el-dialog
    title="角色权限"
    :visible.sync="changeShow"
    width="50%"
    top='2.5%'
    @close='hanldaccessCose'
  >
    <!--角色提示-->
    <div class='roleStatus'>
      <span class='role_title'>角色：</span>
      <el-input
        v-model="changeUserData.name"
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
</template>

<script>
  // 引入公共配置
  import {config} from 'api/config.js';
  //引入接口文件请求文件
  import axios from 'api/axios.js'
  // Vuex语法糖
  import {mapState} from 'Vuex'

  export default {
    name: 'changeUser',
    data() {
      return {
        //所有的菜单数组
        menu: [],
        //已选的菜单id数组
        menusIds: [],
        // 是否显示权限列表
        changeShow: false

      }
    },
    computed: {
      // 获取 遮罩层加载模块、用户后台数据源、展示用户列表中的值、角色列表
      ...mapState(['changeUserData']),
    },
    methods: {
      // 开启权限列表显示
      hanldaccessShow(scope){
        // 权限列表显示
        this.changeShow=true
        // 加载权限列表
        this.loadData();
      },
      // 关闭权限列表显示
      hanldaccessCose(){
        this.menusIds=[]
      },
      // 加载权限列表
      loadData() {
        setTimeout(()=>{
          axios.post(config.api,'/user/getUserRoleList.do ',this.changeUserData).then((res) => {
            console.log(res);
            // 所有权限目录
            this.menu =res.data.allRouterList
            // 当前角色所拥有的权限
            res.data.currentRoleRouterList.map((item)=>{
              console.log(item)
              this.menusIds.push(item.uuid)
              if(item.children.length>0){
                item.children.map((child)=>{
                  this.menusIds.push(child.uuid)
                })
              }
            })
          })
        },500)
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
          if (index > 0) {
            if (self.menusIds.indexOf(self.menu[a].uuid) < 0) {
              self.menusIds.push(self.menu[a].uuid);
            }
          } else {
            if (self.menusIds.indexOf(self.menu[a].uuid) > 0) {
              self.menusIds.splice(self.menusIds.indexOf(self.menu[a].uuid), 1);
            }
          }
        } else {
          if (self.menusIds.indexOf(self.menu[a].uuid) > -1) {
            self.menu[a].children.map(item => {
              if (self.menusIds.findIndex((n) => n == item.uuid) < 0) {
                self.menusIds.push(item.uuid)
              }
            })
          } else {
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
        let arr=[]
        console.log(this.menusIds)
        this.menusIds.map((item,index)=>{
          console.log(this.menusIds)
          arr.push({
            routeruuid:item
          })
        })


        const params={
          selectUser:this.changeUserData.uuid,
          routerList:arr
        }
        axios.post(config.api,'/user/updateUserRoleList.do',params).then((res) => {
          this.$alert(res.msg, {
            confirmButtonText: '确定',
            center: true,
            callback: action => {
              this.changeShow=false
            }
          });
        })

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
    width 1200px;
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
