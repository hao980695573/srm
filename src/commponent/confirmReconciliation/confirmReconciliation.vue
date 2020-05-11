<template>
  <div>
    <!--搜索-->
    <div class='inquiry_warp'>
      <el-form ref="screen_data" :model="screen_data" :inline="true" size='mini'>
        <el-form-item label="创建日期">
          <el-date-picker
            v-model="screen_data.DateArr"
            type="daterange"
            align="right"
            unlink-panels
            style='width:230px'
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format='yyyy-MM-dd'
            @change="changeDate"
            :picker-options="pickerOptions">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="对账单号">
          <el-input v-model="screen_data.statementNumber" placeholder="请输入对账单号"></el-input>
        </el-form-item>
        <el-form-item label="供应商名称">
          <el-input v-model="screen_data.supplierName" placeholder="请输入对账单号"></el-input>
        </el-form-item>
        <div>
          <el-form-item label="对账年月">
            <el-date-picker
              style='width:120px'
              v-model="screen_data.search"
              type="month"
              value-format='yyyy-MM'
              placeholder="选择年月">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class='Fuzzy' size="mini" @click='handleCurrentChange("screen")'>搜索</el-button>
          </el-form-item>
            <el-button type="success" class='Fuzzy' size="mini" @click='saveExamine("pass")' :disabled='this.accoutStatementList==""'>终审通过</el-button>
            <el-button type="danger" class='Fuzzy' size="mini" @click='saveExamine("Refusal")' :disabled='this.accoutStatementList==""'>拒绝</el-button>
        </div>

      </el-form>
    </div>
    <!--列表-->
    <el-table
      :data="form"
      border
      style="width: 100%"
      height='415px'
      size='mini'
      ref='selectTable'
      @select="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        type="index"
        align='center'
        width="50">
      </el-table-column>
      <el-table-column
        label="对账单号"
        align='center'
        min-width="120">
        <template slot-scope="scope">
          <span>{{scope.row.statementNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        align='center'
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.status|filterState}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="供应商代码"
        align='center'
        width="90">
        <template slot-scope="scope">
          <span>{{scope.row.erpno}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="供应商名称"
        align='center'
        min-width="220">
        <template slot-scope="scope">
          <span>{{scope.row.supplierName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="对账年月"
        align='center'
        width="80">
        <template slot-scope="scope">
          <span>{{scope.row.billingTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="对账总金额"
        align='center'
        width="140">
        <template slot-scope="scope">
          <span>{{scope.row.totalAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="税率"
        align='center'
        width="60">
        <template slot-scope="scope">
          <span>{{scope.row.taxRate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="发票号"
        align='center'
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.invoiceNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建日期"
        align='center'
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.createDate|filterDate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align='center'
        label="操作"
        width="70">
        <template slot-scope="scope">
          <el-button type="text" size='mini' @click='see(scope)'>查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class='page_fen' v-show='form.length>0'>
      <el-pagination
        background
        :page-size="screen_data.pageSize"
        layout="prev, pager, next"
        :total="screen_data.totalNum"
        @current-change="handleCurrentChange"
        :current-page.sync="screen_data.pageNum">
      </el-pagination>
    </div>
    <!--查看详情-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="70%"
    >
      <!--搜索条件-->
      <div>
        <el-form ref="detailedScreen" :model="detailedScreen" size='mini' label-width="80px" :inline="true">
          <el-form-item label="送货单号">
            <el-input v-model="detailedScreen.search" style='width: 150px'></el-input>
          </el-form-item>
          <el-form-item label="采购单号">
            <el-input v-model="detailedScreen.purchaseOrder" style='width: 150px'></el-input>
          </el-form-item>
          <el-form-item label="物料编码">
            <el-input v-model="detailedScreen.productNumber" style='width: 150px'></el-input>
          </el-form-item>
          <el-form-item label="物料名称">
            <el-input v-model="detailedScreen.productName" style='width: 150px'></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click='getDetailsList'>查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--列表-->
      <el-table
        :data="detailList.accoutStatementList"
        border
        style="width: 100%"
        height='315px'
        size='mini'
      >
        <el-table-column
          type="index"
          align='center'
          width="50">
        </el-table-column>
        <el-table-column
          label="数据来源"
          align='center'
          width="100">
          <template slot-scope="scope">
            <span>{{scope.row.dataType|filterType}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="送货单号"
          align='center'
          width="150">
          <template slot-scope="scope">
            <span>{{scope.row.deliveryNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="采购单号"
          align='center'
          width="130">
          <template slot-scope="scope">
            <span>{{scope.row.purchaseOrder}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="物料编码"
          align='center'
          width="130">
          <template slot-scope="scope">
            <span>{{scope.row.productNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="物料名称"
          align='center'
          width="250">
          <template slot-scope="scope">
            <span>{{scope.row.productName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="规格型号"
          align='center'
          width="250">
          <template slot-scope="scope">
            <span>{{scope.row.specification}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="数量"
          align='center'
          width="130">
          <template slot-scope="scope">
            <span>{{scope.row.quantity}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="含税单价"
          align='center'
          width="130">
          <template slot-scope="scope">
            <span>{{scope.row.price}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="含税金额"
          align='center'
          width="130">
          <template slot-scope="scope">
            <span>{{scope.row.totalAmount}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="扣款金额"
          align='center'
          width="130">
          <template slot-scope="scope">
            <span>{{scope.row.deductionAmount}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="发生日期"
          align='center'
          width="130">
          <template slot-scope="scope">
            <span>{{scope.row.createDate|filterDate}}</span>
          </template>
        </el-table-column>
      </el-table>
      <!--显示数据-->
      <div style='margin-top:20px'>
        <el-form ref="detailList" :model="detailList" size='mini' label-width="80px" :inline="true">
          <el-form-item label="账单总金额（含税）" label-width='100px'>
            <el-input v-model="detailList.taxableAmount" style='width: 150px'></el-input>
          </el-form-item>
          <el-form-item label="入库总金额(含税)" label-width="100px">
            <el-input v-model="detailList.totalAmount" style='width: 150px'></el-input>
          </el-form-item>
          <el-form-item label="扣款">
            <el-input v-model="detailList.tdeductionAmount" style='width: 150px'></el-input>
          </el-form-item>
          <el-form-item label="退货金额">
            <el-input v-model="detailList.returnGoodAmount" style='width: 150px'></el-input>
          </el-form-item>
          <el-form-item label="总收货数量" label-width='100px'>
            <el-input v-model="detailList.treceiveCount" style='width: 150px'></el-input>
          </el-form-item>
          <el-form-item label="总退货数量" label-width='100px'>
            <el-input v-model="detailList.treturnGoodCount" style='width: 150px'></el-input>
          </el-form-item>
          <el-form-item label="对账退回处理说明" label-width='140px'>
            <el-input v-model="detailList.returnBillRemark" style='width: 150px'></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  // 引入公共配置
  import {config} from 'api/config.js';
  //引入接口文件请求文件
  import axios from 'api/axios.js'
  // 引入公共方法
  import Interface from 'api/Interface.js'

  export default {
    name:'confirmReconciliation',
    data(){
      return{
        // 搜索
        screen_data:{
          // 时间数组
          DateArr: [],
          // 开始时间
          startDate: '',
          // 结束时间
          endDate: '',
          // 当前页
          pageNum: 1,
          // 请求页
          pageSize: 8,
          // 总页数
          totalNum: 1,
          // 对账单号
          statementNumber: '',
          // 供应商名称
          supplierName: '',
          // 对账年月
          search: ''
        },
        // 列表
        form:[],
        // 全选选中的列
        accoutStatementList:[],
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
        // 查看详情搜索
        detailedScreen: {
          // 送货单号
          search:'',
          // 订单号码
          purchaseOrder: '',
          // 物料编码
          productNumber: '',
          // 物料名称
          productName: ''
        },
        // 详情列表
        detailList: {},
        // 详情uuid
        uuid: '',
        // 详情状态
        status:'',
        // 查看详情
        dialogVisible: false
      }
    },
    filters:{
      filterDate(val){
        if(val){
          return Interface.renderTime(val).slice(0,10)
        }
      },
      filterPice(val){
        if(val){
          return Interface.RemainderPice(val)
        }
      },
      filterState(val){
        if(val=='0'){
          return '待发起'
        }else if(val=='1'){
          return '已发起'
        }else if(val=='2'){
          return '财务确认'
        }else if(val=='4'){
          return '已填入发票'
        }else if(val=='5'){
          return '已生成账单'
        }
      },
      // 数据来源
      filterType(val) {
        if (val == '') {
          return '进货'
        } else if (val == '1') {
          return '退货'
        } else if (val == '2') {
          return '扣款'
        }else if (val == '3') {
          return '补货'
        }
      }
    },
    mounted(){
      this.handleCurrentChange()
    },
    methods:{
      // 选择日期
      changeDate(){
        if(this.screen_data.DateArr!=null){
          this.screen_data.startDate=this.screen_data.DateArr[0]
          this.screen_data.endDate=this.screen_data.DateArr[1]
        }else{
          this.screen_data.startDate=''
          this.screen_data.endDate=''
        }
      },
      // 全选
      handleSelectionChange(selection, row){
        if(selection.length>1){
          this.$refs.selectTable.toggleRowSelection(selection[0]);
          this.accoutStatementList=row
        }else if(selection.length==1){
          this.accoutStatementList=row
        }else{
          this.accoutStatementList=''
        }
      },
      // 获取列表
      handleCurrentChange(data){
        if(data=='screen'){
          this.screen_data.pageNum=1
        }
        const params={
          search: this.screen_data.search,
          startDate: this.screen_data.startDate,
          endDate: this.screen_data.endDate,
          pageNum: this.screen_data.pageNum,
          pageSize: this.screen_data.pageSize,
          statementNumber: this.screen_data.statementNumber,
          supplierName: this.screen_data.supplierName,
          search: this.screen_data.search.split('-').join('')
        }
        axios.post(config.api, '/aStatement/getToBeBillList.do', params).then((res) => {
          if (res.status == 0) {
            this.form=res.data
            // 分页
            if(res.data.length>0){
              this.screen_data.totalNum=res.data[0].totalNum
            }
          }
        })
      },
      // 判断是综审通过还是拒绝
      saveExamine(data){
        // 重复提交校验
        if(config.submitSign) {
          // 禁止重复提交
          config.submitSign = false
          // 判断
          if(data=='pass'){
            // 后台要求增加状态字段
            this.accoutStatementList.status=5
          }else{
            this.accoutStatementList.status=6
          }
          axios.post(config.api, '/aStatement/updateBillStatus.do', this.accoutStatementList).then((res) => {
            if (res.status == 0) {
              this.$alert(res.msg, {
                confirmButtonText: '确定',
                center: true,
                callback: action => {
                  // 允许提交
                  config.submitSign=true
                  // 清除选中缓存
                  this.accoutStatementList=''
                  // 重新获取数据
                  this.handleCurrentChange()
                }
              })
            }else{
              this.$alert(res.msg, {
                confirmButtonText: '确定',
                center: true
              })
            }
          })
        }else{
          // 重复提交提示
          this.$alert('请勿重复提交',{
            confirmButtonText:'确定',
            center:true
          });
        }

      },
      // 查看详情
      see(scope) {
        this.dialogVisible = true
        // 获取详情uuid
        this.uuid = scope.row.uuid
        // 获取详情status
        this.status=scope.row.status
        // 获取列表
        this.getDetailsList()

      },
      // 获取详情
      getDetailsList() {
        const params = {
          //送货单号
          search:this.detailedScreen.search,
          purchaseOrder: this.detailedScreen.purchaseOrder,
          productNumber: this.detailedScreen.productNumber,
          productName: this.detailedScreen.productName,
          uuid: this.uuid
        }
        axios.post(config.api, '/aStatement/getGeneratedBillDetail.do', params).then((res) => {
          if (res.status == 0) {
            if (res.data == null) {
              this.detailList = {}
            } else {
              this.detailList = res.data
            }
          }
        })
      },
    }
  }
</script>

<style lang='stylus' scoped>
  .inquiry_warp{
    width: 100%;
    margin-top 20px;
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


