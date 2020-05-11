<template>
  <div>
    <!--搜索-->
    <div class='inquiry_warp'>
      <el-form ref="screen_data" :model="screen_data" label-width="80px" :inline="true" size='mini'>
        <el-form-item label="采购日期">
          <el-date-picker
            v-model="screen_data.purchaseArr"
            type="daterange"
            align="right"
            unlink-panels
            style='width:220px'
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format='yyyy-MM-dd'
            @change='changeDate'
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="模糊搜索">
          <el-input v-model="screen_data.search" placeholder="模糊搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class='Fuzzy' @click='getList("search")'>搜索</el-button>
          <el-button type="primary" class='Fuzzy' @click='downloadFile' :disabled='tableData.length==0'>导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--表单-->
      <el-table :data="tableData" style="width: 100%"
                border
                element-loading-background="rgba(0, 0, 0, 0.8)"
                height='415px'
                size='mini'
      >
        <el-table-column
          align="center"
          label="采购日期"
          show-overflow-tooltip
          width="100">
          <template slot-scope="scope">
            <span>{{scope.row.purchaseDate|filtersPurchaseDate}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="采购单号"
          prop='purchaseOrder'
          width='120'>
        </el-table-column>
        <el-table-column
          align="center"
          prop="supplierName"
          show-overflow-tooltip
          label="供应商"
          min-width='220'>
        </el-table-column>
        <el-table-column
          align="center"
          prop="productName"
          show-overflow-tooltip
          label="品名"
          min-width='200'>
        </el-table-column>
        <el-table-column
          align="center"
          prop="productNumber"
          label="品号"
          width='120'>
        </el-table-column>
        <el-table-column
          align="center"
          label="规格"
          width='250'>
          <template slot-scope="scope">
            <span>{{scope.row.specification}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="概要"
          prop='summary'
          width='200'
          v-if="userRole=='PLANNER'||userRole=='ROLE_ADMIN'"
        >
        </el-table-column>
        <el-table-column
          align="center"
          label="订单数"
          show-overflow-tooltip
          width='100'>
          <template slot-scope="scope">
            <span>{{scope.row.count|filtersCount}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="unit"
          label="单位"
          show-overflow-tooltip
          width='70'>
        </el-table-column>
        <el-table-column
          align="center"
          label="已交数"
          show-overflow-tooltip
          width='80'>
          <template slot-scope="scope">
            <span>{{scope.row.receivedCount|filtersCount}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="在途数"
          show-overflow-tooltip
          width='80'>
          <template slot-scope="scope">
            <span>{{scope.row.otwCount|filtersCount}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="退货数"
          show-overflow-tooltip
          width='80'>
          <template slot-scope="scope">
            <span>{{scope.row.returnGoodCount|filtersCount}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="未交数"
          show-overflow-tooltip
          width='80'>
          <template slot-scope="scope">
            <span>{{scope.row.surplusQuantity|filtersCount}}</span>
          </template>
        </el-table-column>
      </el-table>


    <!--分页-->
    <div class='page_fen' v-show='tableData.length>"0"'>
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
  // 引入公共方法
  import Interface from 'api/Interface.js'
  // VUEX
  import {mapState} from 'Vuex'

  export default {
    name: 'merchandiser',
    data() {
      return {
        // 搜索
        screen_data: {
          purchaseArr:[],
          startDate: '',
          endDate: '',
          search: ''
        },
        // 表格
        tableData: [],
        // 当前页
        pageNum: 1,
        // 请求条数
        pageSize: 13,
        // 总条数
        totalNum: 0,
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
    computed:{
      ...mapState(['userRole'])
    },
    mounted() {
      console.log(this.userRole);
      // 默认显示日期
      this.defaultDate()
      // 获取列表数据
      this.getList()

    },
    filters: {
      filtersPurchaseDate(val) {
        if (val) {
          return Interface.renderTime(val).slice(0, 10)
        }
      },
      filtersCount(val) {
        if (val == null || val == undefined || val == "undefined" || val == "") {
          return '无'
        } else {
          return Interface.Remainder(val)
        }
      }
    },
    methods: {
      // 获取采购选中日期
      changeDate() {
        this.screen_data.startDate=this.screen_data.purchaseArr[0]
        this.screen_data.endDate=this.screen_data.purchaseArr[1]
      },
      // 默认显示日期
      defaultDate() {
        // 采购日期
        this.screen_data.purchaseArr.push(Interface.fun_date('', 'reduce', 7), Interface.getToday("-"))
        this.screen_data.startDate = Interface.fun_date('', 'reduce', 7)
        this.screen_data.endDate = Interface.getToday("-")
      },
      getList(type) {
        if (type == "search") {
          this.pageNum = 1
        }
        const params = {
          startDate: this.screen_data.startDate,
          endDate: this.screen_data.endDate,
          search: this.screen_data.search,
          pageSize: this.pageSize,
          pageNum: this.pageNum
        }
        axios.post(config.api, '/procurement/getOrderMainList.do', params).then((res) => {
          if (res.status == 0) {
            this.tableData = res.data
            if (res.data.length > 0) {
              this.totalNum = res.data[0].totalNum
            }

          } else {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true,
            })
          }
        })
      },
      // 导出下载
      downloadFile(){
        const params={
          startDate: this.screen_data.startDate,
          endDate: this.screen_data.endDate,
          search: this.screen_data.search,
          pageSize: this.pageSize,
          pageNum: this.pageNum
        }
        axios.getFile(config.noNeedLogionApi, 'skip/exportOrderMainList.do', params).then((response) => {
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(new Blob([response]));
          link.target = "_blank";
          link.download = '订单总览报表.xlsx';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
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
