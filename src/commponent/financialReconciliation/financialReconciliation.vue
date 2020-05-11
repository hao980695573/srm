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
          <el-input v-model="screen_data.statementNumber" placeholder="请输入对账单号" style='width: 120px'></el-input>
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
          <el-button type="success" class='Fuzzy' size="mini" @click='financeAccount("pass")' :disabled='this.deliveryProductList==""'>审核通过</el-button>
          <el-button type="warning" class='Fuzzy' size="mini" @click='financeAccount("examine")' :disabled='this.deliveryProductList==""'>审核不通过</el-button>
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
        min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.statementNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建日期"
        align='center'
        width="120">
        <template slot-scope="scope">
          <span>{{scope.row.createDate|filterDate}}</span>
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
        width="160">
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
        width="90">
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
        width="80">
        <template slot-scope="scope">
          <span>{{scope.row.taxRate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="发票号"
        align='center'
        width="200">
        <template slot-scope="scope">
          <span>{{scope.row.invoiceNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="120" align="center">
        <template slot-scope="scope">
          <el-button type="text" size='mini' @click='see(scope)'>查看</el-button>
          <el-button type="text" size='mini' @click='downloadFiles(scope)'>下载</el-button>
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
      title="查看详情"
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
            <el-button type="primary" @click='addType' v-if="userRole!='FIRMMANAGER'&&userRole!='FIRMUSER'&&userRole!='FIRMCLERK'">新增</el-button>
            <el-button type="primary" @click='synchronizedReturn' v-if="userRole!='FIRMMANAGER'&&userRole!='FIRMUSER'&&userRole!='FIRMCLERK'">同步退货</el-button>
            <el-button type="primary" @click='SpareKanban'>备品看板</el-button>
            <el-button type="danger" @click='deleteDetails' :disabled='detailedScreen.search==""' v-if="userRole!='FIRMMANAGER'&&userRole!='FIRMUSER'&&userRole!='FIRMCLERK'">删除送货单</el-button>
            <el-button type="danger" @click='deleteDeduction' :disabled='detailSelect==""' v-if="userRole!='FIRMMANAGER'&&userRole!='FIRMUSER'&&userRole!='FIRMCLERK'">删除扣款</el-button>
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
          ref='SeeDetailList'
          @select="DetailListSelection"
          @select-all='AllDetail'
        >
          <el-table-column
            type="selection"
            align='center'
            width="55">
          </el-table-column>
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
            label="未税单价"
            align='center'
            width="130">
            <template slot-scope="scope">
              <span>{{scope.row.price}}</span>
            </template>
          </el-table-column>
          <el-table-column
            label="未税金额"
            align='center'
            width="130">
            <template slot-scope="scope">
              <span>{{scope.row.untaxedAmount}}</span>
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
          <el-table-column
            label="概述"
            align='center'
            width="130">
            <template slot-scope="scope">
              <span>{{scope.row.remark}}</span>
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
    <!--新增字段-->
    <el-dialog
      title="新增"
      :visible.sync="AddDialog"
      width="830px"
      @close='AddClose'
    >
      <!--搜索条件-->
      <div>
        <el-form ref="addData" :model="addData" :rules="rules" size='mini' label-width="80px" :inline="true">
          <el-form-item label="选择类型">
            <el-select v-model="addData.dataType" placeholder="请选择类型">
              <el-option label="扣款" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="采购单号" prop='purchaseOrder'>
            <el-input v-model="addData.purchaseOrder" style='width: 150px' placeholder="请输入采购单号"></el-input>
          </el-form-item>
          <el-form-item label="物料编码" prop='deliveryNumber'>
            <el-input v-model="addData.productNumber" style='width: 150px' placeholder="请输入物料编码"></el-input>
          </el-form-item>
          <el-form-item label="扣款金额" prop='deductionAmount'>
            <el-input v-model="addData.deductionAmount" style='width: 150px' placeholder="请输入扣款金额"></el-input>
          </el-form-item>
          <el-form-item label="简述概要" prop='remark'>
            <el-input v-model="addData.remark" style='width: 150px' placeholder="请输入概要"></el-input>
          </el-form-item>
          <!--保存-->
          <el-button type="primary" size='mini' style='margin-left:20px' @click='saveAdd'>保存</el-button>
        </el-form>
      </div>
    </el-dialog>
    <!--备品看板-->
    <el-dialog
      title="备品看板"
      :visible.sync="SpareShow"
      width="85%"
      @close='SpareClose'>
      <!--显示异常-->
      <div style='margin-bottom:10px;'>
        <el-button type="primary" @click='Abnormal' size='mini'>异常过滤</el-button>
      </div>
      <!--表格-->
      <el-table
        :data="SpareObject"
        border
        style="width: 100%"
        height='515px'
        size='mini'
      >
        <el-table-column
          type="index"
          align='center'
          width="50">
        </el-table-column>
        <el-table-column
          label="采购单号"
          align='center'
          width="100">
          <template slot-scope="scope">
            <span :class='[{"isAbnormal":scope.row.isAbnormal==1}]'>{{scope.row.purchaseOrder}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="产品名称"
          align='center'
          min-width="250">
          <template slot-scope="scope">
            <span :class='[{"isAbnormal":scope.row.isAbnormal==1}]'>{{scope.row.productName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="物料编码"
          align='center'
          width="130">
          <template slot-scope="scope">
            <span :class='[{"isAbnormal":scope.row.isAbnormal==1}]'>{{scope.row.productNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="物料名称"
          align='center'
          min-width="250">
          <template slot-scope="scope">
            <span :class='[{"isAbnormal":scope.row.isAbnormal==1}]'>{{scope.row.productName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="原采购单行号"
          align='center'
          width="130">
          <template slot-scope="scope">
            <span :class='[{"isAbnormal":scope.row.isAbnormal==1}]'>{{scope.row.item}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="数量"
          align='center'
          width="100">
          <template slot-scope="scope">
            <span :class='[{"isAbnormal":scope.row.isAbnormal==1}]'>{{scope.row.count}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="备品率"
          align='center'
          width="100">
          <template slot-scope="scope">
            <span :class='[{"isAbnormal":scope.row.isAbnormal==1}]'>{{scope.row.bpl}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="备品数量"
          align='center'
          width="100">
          <template slot-scope="scope">
            <span :class='[{"isAbnormal":scope.row.isAbnormal==1}]'>{{scope.row.bpCount}}</span>
          </template>
        </el-table-column>
      </el-table>
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
  // 引入公共校验
  import {validateNumber} from 'api/Validate.js'
  // VUEX
  import {mapState} from 'Vuex'

  export default {
    name:'financialReconciliation',
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
        // 选中的列表
        deliveryProductList:'',
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
        synStatus:'',
        // 查看详情
        dialogVisible: false,
        // 选中的详情
        detailSelect:'',
        // 是否新增类型
        AddDialog: false,
        // 新增数据
        addData: {
          // 数据类型
          dataType: '2',
          // 物料单号
          deliveryNumber: '',
          // 采购单号
          purchaseOrder: '',
          // 扣款金额
          deductionAmount: '',
          // 概要
          remark:'',
          billUuid:''
        },
        // 备品看板显示
        SpareShow:false,
        // 备品对象
        SpareObject:[],
        // 备品异常过滤
        SpareFilter:false,
        // 筛选备份异常
        Sparebackups:[],
        // 校验
        rules: {
          // 物料单号
          deliveryNumber: [
            { required: false, message: '物料单号不能为空', trigger: 'blur' }
          ],
          // 采购单号
          purchaseOrder:[
            { required: false, message: '采购单号不能为空', trigger: 'change' }
          ],
          // 扣款金额
          deductionAmount:[
            { required: true, validator: validateNumber, trigger: 'blur'}
          ],
          // 概要
          remark:[
            { required: false, trigger: 'blur' }
          ]
        }
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
    computed:{
      ...mapState(['userRole'])
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
          this.deliveryProductList=row
        }else if(selection.length==1){
          this.deliveryProductList=row
        }else{
          this.deliveryProductList=''
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
        axios.post(config.api, '/aStatement/getFinancialAccountList.do', params).then((res) => {
          if (res.status == 0) {
            this.form=res.data
            // 分页
            if(res.data.length>0){
              this.screen_data.totalNum=res.data[0].totalNum
            }
          }
        })
      },
      // 审核通过
      financeAccount(data){
        if(data=='pass'){
          // 后台要求增加状态字段
          this.deliveryProductList.status=2
        }else if(data=='examine'){
          this.deliveryProductList.status=3
        }
        axios.post(config.api, '/aStatement/updateBillStatus.do', this.deliveryProductList).then((res) => {
          if (res.status == 0) {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true,
              callback: action => {
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
      },
      // 查看详情
      see(scope) {
        this.dialogVisible = true
        // 获取详情uuid
        this.uuid = scope.row.uuid
        // 获取详情status
        this.status=scope.row.status
        // 清除缓存
        this.detailedScreen.search=''
        // 订单号码
        this.detailedScreen.purchaseOrder='',
        // 物料编码
        this.detailedScreen.productNumber='',
        // 物料名称
        this.detailedScreen.productName=''
        // 获取详情列表
        this.getDetailsList()

      },
      // 下载文档
      downloadFiles(scope){
        const params={
          uuid:scope.row.uuid,
          search:'',
          purchaseOrder:"",
          productNumber:'',
          productName:""
        }
        axios.getFile(config.noNeedLogionApi, 'skip/exportGeneratedBillDetail.do', params).then((response) => {
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(new Blob([response]));
          link.target = "_blank";
          link.download = '核对单.xlsx';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
      },
      // 获取详情
      getDetailsList() {
        const params = {
          purchaseOrder: this.detailedScreen.purchaseOrder,
          productNumber: this.detailedScreen.productNumber,
          productName: this.detailedScreen.productName,
          // 送货单号
          search:this.detailedScreen.search,
          uuid: this.uuid
        }
        axios.post(config.api, '/aStatement/getGeneratedBillDetail.do', params).then((res) => {
          if (res.status == 0) {
            if (res.data == null) {
              this.detailList = {}
            } else {
              this.detailList = res.data
              this.addData.billUuid=res.data.uuid
              this.synStatus=res.data.synStatus
            }
          }
        })
      },
      // 删除详情
      deleteDetails(){
        const params={
          deliveryNumber:this.detailedScreen.search,
          uuid:this.uuid
        }
        axios.post(config.api, '/aStatement/deleteBillDetail.do', params).then((res) => {
          if (res.status == 0) {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true,
              callback: action => {
                this.detailedScreen.search=''
                // 重新获取详情
                this.getDetailsList()
              }
            })
          } else {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      // 选择详情
      DetailListSelection(selection, row){
        // 只有退款的可以选
        if(row.dataType!=2){
          this.$refs.SeeDetailList.toggleRowSelection(row);
        }else{
          // 选中的复制
          this.detailSelect=selection
        }
      },
      // 全选详情
      AllDetail(){
        this.detailSelect=''
        this.$refs.SeeDetailList.clearSelection();
      },
      // 点击新增详情类型
      addType() {
        // 隐藏详情弹框
        this.dialogVisible = false
        // 显示新增类型
        this.AddDialog = true
      },
      // 保存新增
      saveAdd() {
        this.$refs['addData'].validate((valid) => {
          if (valid) {
            const params={
              // 数据类型
              dataType: this.addData.dataType,
              // 物料单号
              productNumber: this.addData.productNumber,
              // 采购单号
              purchaseOrder: this.addData.purchaseOrder,
              // 扣款金额
              deductionAmount:this.addData.deductionAmount,
              // 概要
              remark:this.addData.remark,
              billUuid:this.addData.billUuid
            }
            axios.post(config.api, '/aStatement/addBillDetail.do', params).then((res) => {
              if (res.status == 0) {
                // 重置新增表单
                this.$refs['addData'].resetFields();
                // 隐藏新增类型
                this.AddDialog = false
                // 显示详情弹框
                this.dialogVisible = true
                // 重新获取详情
                this.getDetailsList()
              } else {
                this.$alert(res.msg, {
                  confirmButtonText: '确定',
                  center: true
                })
              }
            })
          }
        })
      },
      // 关闭新增
      AddClose(){
        this.AddDialog=false
        this.dialogVisible = true
      },
      // 同步退货
      synchronizedReturn(){
        const params={
          uuid:this.uuid,
          status:this.status,
          synStatus:this.synStatus
        }
        // 同步数据列表
        axios.post(config.api, '/aStatement/synReturnGoodData.do', params).then((res) => {
          if (res.status == 0) {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true,
              callback: action => {
                // 重新获取数据
                this.getDetailsList()
              }
            })

          }else {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      // 备品看板展示
      SpareKanban(){
        this.dialogVisible = false
        this.SpareShow = true

        const params={
          accoutStatementList:this.detailList.accoutStatementList
        }
        // 同步数据
        axios.post(config.api, '/aStatement/seeSparePartBoard.do',params).then((res) => {
          if (res.status == 0) {
            // 备品对象
            this.SpareObject=res.data
            // 筛选备份异常
            this.Sparebackups=res.data
          }else {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      // 备品看板关闭
      SpareClose(){
        this.SpareShow=false
        this.dialogVisible = true
      },
      // 备品异常过滤
      Abnormal(){
        this.SpareFilter=!this.SpareFilter
        // 筛选备份异常
        let a=this.Sparebackups
        // 清除缓存
        this.SpareObject=[]
        a.map((item)=>{
          // 正常
          if(item.isAbnormal==0&&this.SpareFilter==false){
            this.SpareObject=this.Sparebackups
          }
          // 异常
          if(item.isAbnormal==1&&this.SpareFilter==true){

            this.SpareObject.push(item)
          }
        })
      },
      // 删除扣款
      deleteDeduction(){
        this.detailList.accoutStatementList=this.detailSelect
        // 获取采购单号列表
        axios.post(config.api, '/aStatement/deleteBillDeduction.do', this.detailList).then((res) => {
          if (res.status == 0) {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true,
              callback: action => {
                this.detailedScreen.search=''
                this.detailSelect=''
                // 重新获取详情
                this.getDetailsList()
              }
            })
          }else {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
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


  .isAbnormal{
    color: #F56C6C

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
