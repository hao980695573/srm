<template>
  <div>
    <!--搜索框-->
    <div class='inquiry_warp'>
      <el-form ref="screen_list" :model="screen_list" :inline="true" label-width="80px" size='mini'>
        <el-form-item label="模糊搜索">
          <el-date-picker
            v-model="screen_list.DateArr"
            type="daterange"
            align="right"
            unlink-panels
            style='width:250px'
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format='yyyy-MM-dd'
            @change='changeDate'
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="模糊搜索">
          <el-input v-model="screen_list.search" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click='handleCurrentChange("screen")'>搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--表格-->
    <el-table :data="tableData" style="width: 100%"
              border
              element-loading-background="rgba(0, 0, 0, 0.8)"
              height='415'
              size='mini'
    >
      <el-table-column
        type="index"
        width="55">
      </el-table-column>
      <el-table-column
        align="center"
        label="送货单号"
        show-overflow-tooltip
        min-width="130">
        <template slot-scope="scope">
          <span>{{scope.row.deliveryNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="进货单号"
        min-width='130'>
        <template slot-scope="scope">
          <span>{{scope.row.stockNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="单据日期"
        min-width='140'>
        <template slot-scope="scope">
          <span>{{scope.row.stockDate|filtersDate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="currency"
        label="币种"
        min-width='140'>
      </el-table-column>
      <el-table-column
        align="center"
        label="备注"
        min-width='150'>
        <template slot-scope="scope">
          <span>{{scope.row.remark}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align='center'
        width="150">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click='enterInventory(scope)'
          >
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class='page_fen' v-show='tableData.length>"0"'>
      <el-pagination
        background
        :page-size="screen_list.pageSize"
        layout="prev, pager, next"
        :total="screen_list.totalNum"
        @current-change="handleCurrentChange"
        :current-page.sync="screen_list.pageNum">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  // 引入公共配置
  import {config} from 'api/config.js';
  //引入接口文件请求文件
  import axios from 'api/axios.js'
  // 引入公共方法
  import Interface from 'api/Interface.js'
  // Vuex语法糖
  import {mapMutations} from 'Vuex'


  export default {
    name:'inventoryList',
    data(){
      return{
        screen_list:{
          DateArr:[],
          startDate:'',
          endDate:'',
          search:'',
          // 当前页码
          pageNum:1,
          // 请求条数
          pageSize:7,
          // 总条数
          totalNum:0,
        },
        // 表格
        tableData:[],
        // 选择日期快捷方式
        pickerOptions: {
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
        }
      }
    },
    filters:{
      filtersDate:function(val){
        if(val){
          return Interface.renderTime(val).slice(0,10)
        }
      }
    },
    mounted(){
      // 获取列表
      this.handleCurrentChange()
    },
    methods:{
      ...mapMutations(["changeUuid"]),
      // 选择日期
      changeDate(){
        this.screen_list.startDate=this.screen_list.DateArr[0],
        this.screen_list.endDate=this.screen_list.DateArr[1]
      },
      // 获取列表
      handleCurrentChange(data){
        if(data=='screen'){
          this.screen_list.pageNum=1
        }
        const params={
          startDate:this.screen_list.startDate,
          endDate:this.screen_list.endDate,
          search:this.screen_list.search,
          pageNum:this.screen_list.pageNum,
          pageSize:this.screen_list.pageSize
        }
        console.log(params);
        axios.post(config.api, '/stock/getStockList.do', params).then((res) => {
          if (res.status == 0) {
            this.tableData=res.data
            if(res.data.length>0){
              this.screen_list.totalNum=res.data[0].totalNum
            }
          }else{
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      // 进入详情
      enterInventory(scope){
        this.changeUuid(scope.row.uuid)
        this.$router.push('inventoryDetails')
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .inquiry_warp
    width: 100%;
    margin-top: 20px;
    margin-bottom: 10px;
    .Fuzzy
      width: 65px;
      margin: 0px 10px;

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
</style>
