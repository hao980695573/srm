<template>
  <div class='list_warp'>
    <!--搜索框-->
    <div class='inquiry_warp'>
      <el-form ref="screen_list" :model="screen_list" :inline="true" label-width="80px" size='mini'>
        <el-form-item label="模糊搜索">
          <el-input v-model="screen_list.search" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList('screen')">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--列表-->
    <el-table
      :data="List"
      border
      style="width: 100%"
      height='415px'
      size='mini'
    >
      <el-table-column
        type="index"
        align='center'
        width="50">
      </el-table-column>
      <el-table-column
        label="标题"
        align='center'
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="简介"
        align='center'
        min-width="250">
        <template slot-scope="scope">
          <span>{{scope.row.introduction}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="内容"
        align='center'
        min-width="350">
        <template slot-scope="scope">
          <span>{{scope.row.content}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-button type="text" size='mini' @click='see(scope)'>查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class='page_fen'>
      <el-pagination
        background
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="totalNum"
        @current-change="getList"
        :current-page.sync="pageNum">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  // 引入公共配置
  import {config} from 'api/config.js';
  //引入接口文件请求文件
  import axios from 'api/axios.js'
  // Vuex语法糖
  import {mapMutations} from 'Vuex'

  export default {
    name:'viewMessageList',
    data(){
      return{
        // 搜索
        screen_list:{
          search:''
        },
        List:[{
          title:'',
          content:'',
          introduction:'',
          messageSender:''
        }],
        // 分页
        pageNum:1,
        pageSize:10,
        totalNum:1
      }
    },
    mounted(){
      this.getList()
    },
    methods:{
      // 获取 uuid 角色身份
      ...mapMutations(['changeMessageDetail','changeDrawerShow']),
      // 获取列表
      getList(data){
        if(data=='screen'){
          this.pageNum=1
        }
        let params={
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          search:this.screen_list.search,
        }
        axios.post(config.api, '/message/viewMessageList.do', params).then((res) => {
          // 赋值档案列表
          if (res.status == 0) {
            this.List=res.data
            if(res.data.length>0){
              this.totalNum=res.data[0].totalNum
            }
          } else {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      see(scope){
        this.changeMessageDetail(scope.row)
        let params=Array(scope.row)
        let _this=this
        axios.post(config.api, '/message/readMessage.do', params).then((res) => {
          // 展开抽屉显示详情
          _this.changeDrawerShow(true)
        })
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .list_warp
    margin-top 20px;
  /*分页*/
  .page_fen {
    width: 100%;
    height: 50px;
    background: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    padding: 0px 20px;
    box-sizing: border-box;
  }

  .inquiry_warp
    width: 100%;
    margin-top 20px;
    margin-bottom: 10px;
    .Fuzzy
      width: 65px;
      margin: 0px 10px;


</style>
