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
        <el-form-item label="排程日期">
          <el-date-picker
            v-model="screen_data.SchedulingArray"
            type="daterange"
            align="right"
            unlink-panels
            style='width:220px'
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format='yyyy-MM-dd'
            @change='changeSchedulingDate'
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="模糊搜索">
          <el-input v-model="screen_data.search" placeholder="模糊搜索" style='width: 220px;'></el-input>
        </el-form-item>
        <div>
          <el-form-item label="排程完结">
            <el-select v-model="screen_data.isEndOfSchedule" placeholder="请选择" size='mini' style='width: 220px;'>
              <el-option label="否" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
              <el-option label="全部" value=" "></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="供应商">
            <el-input v-model="screen_data.supplierName" placeholder="输入供应商名称" style='width: 220px;'></el-input>
          </el-form-item>
          <el-form-item label="采购单">
            <el-input v-model="screen_data.purchaseOrder" placeholder="请输入采购单" style='width: 220px;'></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="品号">
            <el-input v-model="screen_data.productNumber" placeholder="请输入品号" style='width: 220px;'></el-input>
          </el-form-item>
          <el-form-item label="品名">
            <el-input v-model="screen_data.productName" placeholder="请输入品名" style='width: 220px;'></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style='margin-left:10px' size='mini' @click='handleCurrentChange("search")'>搜索</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style='margin-left:10px' size='mini' @click='downloadFiles'
                       v-show='orderTableDataList.length>0'>导出</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <!--订单总览-->
    <el-table :data="orderTableDataList" style="width: 100%" align="center" border size='mini' :height="tableHeight">
      <el-table-column prop="purchaseDate" :label="orderTableHeader.purchaseDate" width="100%"
                       align="center"></el-table-column>
      <el-table-column prop="purchaseOrder" :label="orderTableHeader.purchaseOrder" width="120"
                       align="center"></el-table-column>
      <el-table-column prop="supplierName" :label="orderTableHeader.supplierName" width="200"
                       align="center"></el-table-column>
      <el-table-column prop="productNumber" :label="orderTableHeader.productNumber" width="130"
                       align="center"  fixed="left"></el-table-column>
      <el-table-column prop="productName" :label="orderTableHeader.productName" width="150"
                       align="center"  fixed="left"></el-table-column>
      <el-table-column prop="unit" :label="orderTableHeader.unit" width="100%" align="center"></el-table-column>
      <el-table-column prop="purchaseUserName" :label="orderTableHeader.purchaseUserName" width="100%" align="center"></el-table-column>
      <el-table-column prop="specification" :label="orderTableHeader.specification" width="150"
                       align="center"></el-table-column>
      <el-table-column :label="orderTableHeader.count" width="90" align="center" fixed="left">
        <template slot-scope="scope">
          <span>{{scope.row.count|filtersCount}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" :label="orderTableHeader.status" width="80" align="center" fixed="left"></el-table-column>
      <el-table-column prop="statistics" :label="orderTableHeader.statistics" width="100" align="center" fixed="left"></el-table-column>
      <el-table-column label="操作" width="70" align="center" v-if='userRole=="ROLE_ADMIN"||userRole=="PLANNER"' fixed="right">
        <template slot-scope="scope">
          <el-button  type="text" size='mini' @click='save(scope)'>保存</el-button>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        v-for="(item,index) in orderTableHeader.dateList"
        :key='index'
        width='150px'
        :label="item"
      >
        <template slot-scope="scope">
          <!--第一行输入框-->
          <el-input style='text-align:center;width:100px;' placeholder="请输入内容" v-model='orderTableDataList[scope.$index].dateList[index].data' :disabled="!Boolean(orderTableDataList[scope.$index].dateList[index].editable)" size="mini"></el-input>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class='page_fen' v-show='!orderTableDataList.length=="0"'>
      <el-pagination
        background
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="totalNum"
        @current-change="handleCurrentChange"
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
  // Vuex语法糖
  import {mapState} from 'Vuex'

  export default {
    name: 'orderScheduling',
    data() {
      return {
        tableHeight:514,
        // 快捷搜索
        screen_data: {
          // 模糊搜索
          search: '',
          // 采购日期数组
          purchaseArr:[],
          // 采购开始日期
          startDate: '',
          // 采购结束日期
          endDate: '',
          // 排程日期数组
          SchedulingArray: [],
          // 排程开始日期
          planStartDate: "",
          // 排程结束日期
          planEndDate: '',
          // 是否排程
          isEndOfSchedule:" ",
          //供应商、
          supplierName:'',
          //采购单
          purchaseOrder:'',
          // 品号
          productNumber:'',
          // 品名
          productName:''
        },
        // 表头
        orderTableHeader: "",
        // 内容
        orderTableDataList: [],
        // 当前页
        pageNum: 1,
        // 请求条数
        pageSize: 15,
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
        },
        // 选中列表要传入到后台的值
        selectAll:[],
        selectSate:false
      }
    },
    filters:{
      filtersCount:function (val) {
        return Interface.Remainder(val)
      }
    },
    computed: {
      // 获取 uuid 公共state 角色身份
      ...mapState(['userRole']),
    },
    mounted() {
      // 默认显示日期
      this.defaultDate()
      // 获取订单
      this.handleCurrentChange()

      // 设置table高度
      let _this=this
      setTimeout(function () {
        _this.tableHeight=515
      },800)
    },
    methods: {
      // 获取采购选中日期
      changeDate() {
        this.screen_data.startDate=this.screen_data.purchaseArr[0]
        this.screen_data.endDate=this.screen_data.purchaseArr[1]
      },
      // 获取排程选中日期
      changeSchedulingDate() {
        // 开始日期
        this.screen_data.planStartDate = this.screen_data.SchedulingArray[0]
        // 结束日期
        this.screen_data.planEndDate = this.screen_data.SchedulingArray[1]
      },
      // 默认显示日期
      defaultDate() {
        // 默认排程日期
        this.screen_data.SchedulingArray.push(Interface.getToday("-"), Interface.fun_date('', 'addition', 7))
        this.screen_data.planStartDate = Interface.getToday("-")
        this.screen_data.planEndDate = Interface.fun_date('', 'addition', 7)
        // 采购日期
        this.screen_data.purchaseArr.push(Interface.fun_date('', 'reduce', 7), Interface.getToday("-"))
        this.screen_data.startDate = Interface.fun_date('', 'reduce', 7),
          this.screen_data.endDate = Interface.getToday("-")
      },
      // 获取用订单列表
      handleCurrentChange(type) {
        this.tableHeight=515


        if (type == 'search') {
          this.pageNum = 1
        }
        const params = {
          search: this.screen_data.search,
          planStartDate: this.screen_data.planStartDate,
          planEndDate: this.screen_data.planEndDate,
          startDate: this.screen_data.startDate,
          endDate: this.screen_data.endDate,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          isEndOfSchedule:this.screen_data.isEndOfSchedule,
          //供应商、
          supplierName:this.screen_data.supplierName,
          //采购单
          purchaseOrder:this.screen_data.purchaseOrder,
          // 品号
          productNumber:this.screen_data.productNumber,
          // 品名
          productName:this.screen_data.productName
        }
        axios.post(config.api, '/procurement/findEspecialOrderPlan.do', params).then((res) => {
          //加载完成，关闭条件筛选弹窗
          this.dialogVisible=false
          // 如果请求成功
          if (res.status == 0) {
            this.orderTableHeader = res.data.orderTableHeader
            this.orderTableDataList = res.data.orderTableDataList

            if (res.data.orderTableDataList.length > 0) {
              // 总条数
              this.totalNum = res.data.orderTableDataList[0].totalNum
            }

            let _this=this
            setTimeout(function () {
              _this.tableHeight=516
            },800)
          }else{
            // 错误提示
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      // 保存排程
      save(scope){
        let schedulingPlanList=[]
        let _this=this
        this.orderTableHeader.dateList.map(function(item,index){
          schedulingPlanList.push({
            purchaseOrder:_this.orderTableDataList[scope.$index].purchaseOrder,
            planTime:item.substring(0, 4) +"-"+ item.substring(4, 6) +"-"+ item.substring(6,8),
            quantity:_this.orderTableDataList[scope.$index].dateList[index].data,
            productUuid:_this.orderTableDataList[scope.$index].uuid,
            orderCount:_this.orderTableDataList[scope.$index].count,
            purchaseDate:_this.orderTableDataList[scope.$index].purchaseDate,
            startSchedulingRange:_this.screen_data.planStartDate,
            endSchedulingRange:_this.screen_data.planEndDate
          })
        })

        axios.post(config.api,'/procurement/saveOrderPlan.do',schedulingPlanList).then((res) => {
          if (res.status == 0) {
            let _thsi=this
            // 错误提示
            _thsi.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true,
              callback: action => {
                // 重新获取数据
                _thsi.handleCurrentChange()
              }
            });
          }else{
            // 错误提示
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            });
          }
        })
      },
      // 下载文件
      downloadFiles(){
        const params={
          search: this.screen_data.search,
          planStartDate: this.screen_data.planStartDate,
          planEndDate: this.screen_data.planEndDate,
          startDate: this.screen_data.startDate,
          endDate: this.screen_data.endDate,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          isEndOfSchedule:this.screen_data.isEndOfSchedule,
          //供应商
          supplierName:this.screen_data.supplierName,
          //采购单
          purchaseOrder:this.screen_data.purchaseOrder,
          // 品号
          productNumber:this.screen_data.productNumber,
          // 品名
          productName:this.screen_data.productName
        }
        axios.getFile(config.noNeedLogionApi, 'skip/exportConciseOrderPlan.do', params).then((response) => {
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(new Blob([response]));
          link.target = "_blank";
          link.download = '排程报表.xlsx';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
      }
    }
  }
</script>

<style lang='stylus' scoped>

  .el-table--border{
    border: 2px solid #ccc;

  }


  .el-table>>>.el-table__row td{
    border: 1px solid #ccc;
  }



  .el-table>>>.el-table__header-wrapper th.is-leaf {
    border-bottom: 2px solid #ccc;
    border: 1px solid #ccc;
  }

  .el-table>>>.el-table__fixed-header-wrapper th.is-leaf {
    border-bottom: 2px solid #ccc;
    border: 1px solid #ccc;
  }


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

  .queding_warp
    width 100%
    height 50px;
    display flex
    justify-content center
    align-items center


</style>

