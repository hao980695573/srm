<template>
  <div>
    <!--头部-->
    <login_header></login_header>
    <!--搜索框-->
    <div class='screen_warp'>
      <el-form ref="screen_list" :model="screen_list"  :inline="true" label-width="80px" size='small'>
        <el-form-item label="分类">
          <el-select v-model="screen_list.screen_type" placeholder="请选择类别">
            <el-option label='请选择' value=""></el-option>
            <el-option :label="item.name" :value="item.uuid" v-for='item in categoryList' :key='item.uuid'></el-option>
          </el-select>
          <el-form-item label="发布时间">
            <el-date-picker
              v-model="screen_list.screen_day"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              @change='changeDay'
            >
            </el-date-picker>
          </el-form-item>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click='getList("screen")'>搜索</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!--资讯列表-->
    <div class='list_warp'>
      <!--面包屑导航-->
      <div class='breadcrumb'>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>最新消息</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!--如果有数据 资讯列表-->
      <div class='informationList' v-if='fromDataList.length>0'>
        <div class='information_li' @click='enterDetail(item)' v-for='item in fromDataList'>
          <span class='informationList_news' v-if='item.categoryUuid==1'>{{item.categoryName}}</span>
          <span class='informationList_notice' v-else-if='item.categoryUuid==2'>{{item.categoryName}}</span>
          <span class='informationList_xitong' v-else>{{item.categoryName}}</span>
          <a class='informationList_title' :title='item.title'>{{item.title}}</a>
          <span class='informationList_date'>{{item.publishDate.slice(0,10)}}</span>
        </div>
      </div>

      <!--如果没数据 显示暂无信息-->
      <div class='empty' v-else>
          暂无信息
      </div>
      <!--分页-->
      <div class='pagingWarp' v-if='!totalNum.length<23'>
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


    <!--脚注-->
    <div class='footer'>
      <div class='footer_center'>
        2018东莞市广正模具塑胶有限公司EIP平台 Copyright © 2018 东莞市广正模具塑胶有限公司
      </div>
    </div>
  </div>
</template>

<script>
  // 引入头部文件
  import login_header from 'common/login_header/login_header'
  // Vuex语法糖
  import {mapState,mapMutations} from 'Vuex'
  // 引入公共配置
  import {config} from 'api/config.js';
  //引入接口文件请求文件
  import axios from 'api/axios.js'

  export default {
    name:'newsList',
    data(){
      return{
        // 搜索列表
        screen_list: {
          // 分类
          screen_type: '',
          // 发布时间
          screen_day:'',
          date1: '',
          date2:''
        },
        // 日期数据
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        // 消息列表
        fromDataList:[],
        // 表格当前页面
        pageNum:1,
        // 请求数量
        pageSize:22,
        // 总数量
        totalNum:0
      }
    },
    computed: {
      // 获取 消息管理分类列表 遮罩层 用户角色
      ...mapState(['categoryList'])
    },
    mounted(){
      // 获取文章分类列表
      this.getcategory()
      // 获取咨询列表
      this.getList()
    },
    methods:{
      // 修改 消息管理分类列表 消息详情数据
      ...mapMutations(['changeCategoryList','changeNewsDetailsData']),
      // 获取文章分类列表
      getcategory(){
        axios.get(config.noNeedLogionApi,'skip/getCategoryList.do').then((res) => {
          this.changeCategoryList(res.data)
        })
      },
      // 选择日期
      changeDay(){
        // 开始日期
        this.screen_list.date1=this.screen_list.screen_day[0]
        // 结束日期
        this.screen_list.date2=this.screen_list.screen_day[1]
      },
      // 获取咨询列表
      getList(type){
        // 判断是否是快捷搜索
        if(type=='screen'){
          this.pageNum=1
        }
        window.scrollTo(0,0)
        const params={
          startDate:this.screen_list.date1,
          endDate:this.screen_list.date2,
          categoryUuid:this.screen_list.screen_type,
          pageNum:this.pageNum,
          pageSize:this.pageSize
        }
        axios.post(config.noNeedLogionApi,'skip/getInformationList.do',params).then((res) => {
          this.fromDataList=res.data
          // 总条数
          if(res.data.length>0){
            this.totalNum=res.data[0].totalNum
          }else{
            this.totalNum=res.data.length
          }
        })
      },
      // 进入资讯详情页面
      enterDetail(data){
        // 传递点击的这个详情对象
        this.changeNewsDetailsData(data)
        this.$router.push('newsDetails')
      },
    },
    components:{
      login_header
    }
  }
</script>

<style lang='stylus' scoped>
  //引入css变量,使用快速定位文件夹时在css中要加~
  @import '~styles/mixins.styl'

  a{
    color:#000
  }

  .screen_warp
    width 1200px
    margin 0px auto
    margin-top 40px;
    display flex
    justify-content center

  .list_warp
    width 1000px
    border 1px solid #ccc
    border-radius 10px
    margin 0px auto
    margin-bottom 40px
  .breadcrumb
    margin-top 20px
    padding-left 15px
  .empty
    width 100%
    line-height 250px;
    font-size 20px;
    text-align center
  .informationList
    width: 100%
    padding 15px
    box-sizing border-box
    .information_li
      width 100%
      height: 25px
      margin-top 20px;
      cursor pointer
      display flex
      justify-content flex-start
      align-items center
      position relative
      .informationList_xitong
        text-align center
        font-size 13px
        width: 40px;
        line-height: 25px
        color: #ffffff
        background #67C23A
        border-radius 4px
      .informationList_notice
        text-align center
        font-size 13px
        width: 40px;
        line-height: 25px
        color: #ffffff
        background $BackgroundColor
        border-radius 4px
      .informationList_news
        text-align center
        font-size 13px
        width: 40px;
        line-height: 25px
        color: #ffffff
        background #E6A23C
        border-radius 4px
      .informationList_title
        max-width: 800px
        margin-left: 15px
        white-space: nowrap;
        font-size 13px
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap
      .informationList_date
        font-size 13px
        margin-left 35px;
  .pagingWarp
    width 100%
    display flex
    justify-content center
    align-items center
    margin-top 70px
    margin-bottom 40px;
  .footer
    width 100%
    height: 60px
    background: #EEEEEE
    .footer_center
      font-size 16px
      width: 1200px;
      line-height 60px
      margin 0 auto
      text-align center
</style>
