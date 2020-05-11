<template>
  <div>
    <!--显示订单基础信息-->
    <div class='inquiry_warp'>
      <el-form ref="form" :model="form" size="mini" label-position="right" :inline="true">
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.dateArr"
            type="daterange"
            align="right"
            unlink-panels
            style='width:230px'
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format='yyyy-MM-dd'
            @change='changeDate'
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="退货单号" prop='receivingUnit'>
          <el-input v-model="form.search" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class='Fuzzy' @click='handleCurrentChange("screen")'>搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--表格-->
    <el-table
      :data="deliveryList"
      border
      style="width: 100%"
      size="mini"
      height='415'
    >
      <el-table-column
        prop="psno"
        label="退货单号"
        align='center'
        show-overflow-tooltip
        width="120">
      </el-table-column>
      <el-table-column
        label="单据日期"
        align='center'
        show-overflow-tooltip
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.psdd|filtersDate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="同步时间"
        align='center'
        show-overflow-tooltip
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.createdate|filtersDate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="cusname"
        label="客户名字"
        align='center'
        show-overflow-tooltip
        min-width="200">
      </el-table-column>
      <el-table-column
        label="部门名称"
        align='center'
        show-overflow-tooltip
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.depname}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="原进货单号"
        align='center'
        show-overflow-tooltip
        min-width="130">
        <template slot-scope="scope">
          <span>{{scope.row.osno}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="币别"
        align='center'
        show-overflow-tooltip
        width="70">
        <template slot-scope="scope">
          <span>{{scope.row.curid}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="汇率"
        align='center'
        show-overflow-tooltip
        width="90">
        <template slot-scope="scope">
          <span>{{scope.row.excrto|filterPrice}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="业务员名称"
        align='center'
        show-overflow-tooltip
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.salname}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align='center'
        width="80">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click='enterDeliveryDetail(scope)'
          >
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class='page_fen'>
      <el-pagination
        background
        :page-size="form.pageSize"
        layout="prev, pager, next"
        :total="form.totalNum"
        @current-change="handleCurrentChange"
        :current-page.sync="form.pageNum">
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
    name:'returnGoodList',
    data(){
      return{
        // 快捷搜索
        form:{
          // 日期
          dateArr:[],
          startDate:'',
          endDate:'',
          search:'',
          // 总条数
          totalNum:0,
          // 当前页
          pageNum:1,
          // 请求条数
          pageSize:6,
        },

        // 表格
        deliveryList:[],
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
    filters: {
      filtersDate(val) {
        if (val) {
          return Interface.renderTime(val).slice(0, 10)
        }
      },
      filterPrice(val){
        return Interface.RemainderPice(val)
      }
    },
    mounted(){
      this.handleCurrentChange()
    },
    methods:{
      ...mapMutations(['changeUuid']),
      // 修改日期
      changeDate(){
        if(this.form.dateArr!=null){
          this.form.startDate=this.form.dateArr[0]
          this.form.endDate=this.form.dateArr[1]
        }else{
          this.form.startDate=''
          this.form.endDate=''
        }

      },
      // 获取列表
      handleCurrentChange(type){
        if(type=='screen'){
          this.form.pageNum=1
        }
        const params={
          uuid:"",
          search:this.form.search,
          startDate:this.form.startDate,
          endDate:this.form.endDate,
          pageNum:this.form.pageNum,
          pageSize:this.form.pageSize
        }
        axios.post(config.api, '/returnGood/getAllReturnGoodList.do', params).then((res) => {
          if (res.status == 0) {
            this.deliveryList=res.data
            // 总条数
            if(res.data.length>0){
              this.form.totalNum=res.data[0].totalNum
            }
          } else {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      // 进入详情
      enterDeliveryDetail(scope){
        // 改变公共uuid
        this.changeUuid(scope.row.uuid)
        // 跳转
        this.$router.push('returnGoodDetail')
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .inquiry_warp{
    width: 100%;
    margin-top: 20px;
    margin-bottom: 10px;
  }

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
