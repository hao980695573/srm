<template>
  <div>
   <!--搜索框-->
    <div class='inquiry_warp'>
     <el-form ref="screen_list" :model="screen_list"  :inline="true" label-width="80px" size='mini'>
      <el-form-item label="分类" label-width="50px">
        <el-select v-model="screen_list.screen_type" placeholder="请选择类别" style='width: 100px;'>
          <el-option label='请选择' value=""></el-option>
          <el-option :label="item.name" :value="item.uuid" v-for='item in categoryList' :key='item.uuid'></el-option>
        </el-select>
        <el-form-item label="发布时间">
          <el-date-picker
            style='width: 230px;'
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
        <el-button type="primary" @click='handleCurrentChange'>搜索</el-button>
        <el-button type="primary" @click='newaddShow'>新增</el-button>
        <el-button type="danger" size='mini' @click='allDelte'>一键删除</el-button>
      </el-form-item>
    </el-form>
    </div>
    <!--表格-->
    <el-table :data="tableData" style="width: 100%"
              border
              size='mini'
              height="415"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              v-loading.fullscreen.lock='this.mark'
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              @selection-change="handleAllChange"
    >
      <el-table-column
        align="center"
        type="selection"
        width="50">
      </el-table-column>
      <el-table-column
        align="center"
        type="index"
        width="60">
      </el-table-column>
      <el-table-column
        align="center"
        prop="categoryName"
        label="分类"
        width="80">
      </el-table-column>
      <el-table-column
        align="center"
        prop="author"
        label="发布人"
        width="100">
      </el-table-column>
      <el-table-column
        align="center"
        prop="title"
        label="标题"
        min-width='140'
        show-overflow-tooltip
      >
      </el-table-column>
      <el-table-column
        align="center"
        prop="summary"
        label="概要"
        show-overflow-tooltip
        min-width='135'>
      </el-table-column>
      <el-table-column
        align="center"
        label="状态"
        width='80'>
        <template slot-scope="scope">
          <span :class='{forbidden:scope.row.status==0}'>{{scope.row.status|formatState}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="创建时间"
        width='150'>
        <template slot-scope="scope">
          <span>{{scope.row.createDate|createDate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="发布时间"
        width='150'>
        <template slot-scope="scope">
          <span>{{scope.row.publishDate|publishDate}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="130" align="center" >
        <template slot-scope="scope">
          <el-button  type="text" size='mini' :disabled="scope.row.status!='0'||userRole!='ROLE_ADMIN'" @click='announce(scope)'>发布</el-button>
          <el-button  type="text" size='mini' @click='eduitshow(scope)'>编辑</el-button>
          <el-button  type="text"  size='mini' @click='deletefrom(scope)'>删除</el-button>
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
        @current-change="handleCurrentChange"
        :current-page.sync="pageNum">
      </el-pagination>
    </div>
    <!--新增消息-->
    <publish ref='publish' @againload='againformation'></publish>
    <!--编辑信息-->
    <editorlist ref='editorlist'></editorlist>
  </div>
</template>

<script>
  // 新增消息组件
  import publish from 'commponent/publish/publish'
  // 编辑消息组件
  import editorlist from 'commponent/editor/editor'
  // 引入公共配置
  import {config} from 'api/config.js';
  //引入接口文件请求文件
  import axios from 'api/axios.js'
  // 引入公共方法
  import Interface from 'api/Interface.js'
  // Vuex语法糖
  import {mapState,mapMutations} from 'Vuex'

  export default {
    name:'informationList',
    data(){
      return {
        // 是否禁用发布
        forbidden:false,
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
        // 表格列表
        tableData: [],
        // 表格当前页面
        pageNum:1,
        // 请求数量
        pageSize:15,
        // 总数量
        totalNum:0,
        // 全选后的uuid
        allArrUuid:[],
        // 发布数组
        announceArr:[]

      }
    },
    mounted(){
      // 获取分类列表
      this.getcategory()
      // 获取用户列表
      this.handleCurrentChange()
    },
    filters: {
      // 发布状态转换
      formatState: function (val) {
        return val === 0 ? '未发布' : '已发布'
      },
      // 创建时间
      createDate:function(val){
        return Interface.renderTime(val)
      },
      // 发布时间
      publishDate:function(val){
        if(val){
          return Interface.renderTime(val)
        }else{
          return ''
        }
      }
    },
    computed: {
      // 获取 消息管理分类列表 遮罩层 用户角色
      ...mapState(['categoryList','mark','userRole'])
    },
    methods:{
      // 修改 消息管理分类列表,改变uuid
      ...mapMutations(['changeCategoryList','changeUuid','loadMack']),
      // 显示新增消息
      newaddShow(){
        this.$refs.publish.addUserShow()
      },
      // 显示编辑消息
      eduitshow(scope){
        // 改变uuid
        this.changeUuid(scope.row.uuid)
        // 显示编辑
        this.$refs.editorlist.showEditor()
      },
      // 分页获取用户列表
      handleCurrentChange(){
        // 开启遮罩层
        this.loadMack(true)
        const params={
          startDate:this.screen_list.date1,
          endDate:this.screen_list.date2,
          categoryUuid:this.screen_list.screen_type,
          pageNum:this.pageNum,
          pageSize:this.pageSize
        }
        axios.post(config.api,'/information/getInformationList.do',params).then((res) => {
          //加载完成，关闭遮罩层
          this.loadMack(false)
          this.tableData=res.data
          // 总条数
          if(res.data.length>0){
            this.totalNum=res.data[0].totalNum
          }
        })
      },
      // 一键发布
      announce(scope){
        // 只有未发布的才可以发布
        if(scope.row.status==0){
          //请求
          const params={
            uuid:scope.row.uuid,
            status:1
          }
          axios.post(config.api,'/information/publishInformation.do',params).then((res) => {
            if(res.status==0){
              let _this=this
              this.$alert(res.msg,{
                confirmButtonText:'确定',
                center:true,
                callback: action => {
                  // 重新获取数据
                  _this.handleCurrentChange()
                }
              })
            }
          })
        }

      },
      // 选择日期
      changeDay(){
        // 开始日期
        this.screen_list.date1=this.screen_list.screen_day[0]
        // 结束日期
        this.screen_list.date2=this.screen_list.screen_day[1]
      },
      // 重新获取数据列表
      againformation(){
        this.pageNum=1
        this.handleCurrentChange()
      },
      // 获取文章分类列表
      getcategory(){
        axios.get(config.api,'/category/getCategoryList.do').then((res) => {
          this.changeCategoryList(res.data)
        })
      },
      // 删除文章
      deletefrom(scope){
        // 存储选择数组
        this.allArrUuid.push(scope.row.uuid)
        // 存储uuid删除数组
        let params=[{
          uuid:this.allArrUuid[0]
        }]
        axios.post(config.api,'/information/deleteInformation.do',params).then((res) => {
          if(res.status==0){
            let _this=this
            this.$alert(res.msg,{
              confirmButtonText:'确定',
              center:true,
              callback: action => {
                // 重新获取列表数据
                _this.handleCurrentChange()
                // 清空选中数组
                _this.allArrUuid.length=0
              }
            })
          }
        })
      },
      // 全选
      handleAllChange(data){
        if(data.length>0){
          // 清空
          this.allArrUuid.length=0
          // 全选，返回后台要的格式uuid，否则清空数组
          data.map((item)=>{
            this.allArrUuid.push({
              uuid:item.uuid
            })
          })
        }else{
          this.allArrUuid.length=0
        }
      },
      // 一键删除
      allDelte(){
        axios.post(config.api,'/information/deleteInformation.do',this.allArrUuid).then((res) => {
          if(res.status==0){
            let _this=this
            this.$alert(res.msg,{
              confirmButtonText:'确定',
              center:true,
              callback: action => {
                // 判断是否最后一页
                if(this.pageNum==Math.ceil(this.totalNum / this.pageSize)){
                  this.pageNum=1
                  // 重新获取列表数据
                  _this.handleCurrentChange()
                }else{
                  // 重新获取列表数据
                  _this.handleCurrentChange()
                }
              }
            })
          }
        })
      }
    },
    components:{
      publish,
      editorlist
    }
  }
</script>

<style lang='stylus' scoped>
  .inquiry_warp{
    width: 100%;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  .el-col-2
    width: 8.33333%;
    text-align: center;

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
