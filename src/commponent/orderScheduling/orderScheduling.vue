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
        <el-form-item label="采购单">
          <el-input v-model="screen_data.purchaseOrder" placeholder="请输入采购单" style='width: 220px;'></el-input>
        </el-form-item>
        <div>
          <el-form-item label="排程完结">
            <el-select v-model="screen_data.isEndOfSchedule" placeholder="请选择" size='mini' style='width: 220px;'>
              <el-option label="否" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="供应商">
            <el-input v-model="screen_data.supplierName" placeholder="输入供应商名称" style='width: 220px;'></el-input>
          </el-form-item>
          <el-form-item label="是否结案">
            <el-select v-model="screen_data.isEnd" placeholder="请选择" size='mini' style='width: 220px;'>
              <el-option label="否" value="F"></el-option>
              <el-option label="是" value="T"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
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
            <el-button type="primary" style='margin-left:10px' size='mini' @click='handleShow'>排程匹配</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style='margin-left:10px' size='mini' @click='downloadFiles'
                       :disabled='orderTableDataList.length==0'>导出</el-button>
          </el-form-item>
        </div>
        <div>
          <el-form-item>
            <el-button type="primary" style='margin-left:10px' size='mini' @click='templateDown' :disabled='screen_data.purchaseOrder==""' v-if='userRole=="PURCHASER_MANAGER"||userRole=="ROLE_ADMIN"||userRole=="PLANNER"||userRole=="PURCHASER"'>下载排程模板</el-button>
          </el-form-item>
          <el-form-item>
            <el-upload
              :multiple='false'
              :limit='1'
              class="upload-demo"
              :action='path'
              :on-success="otherFileChange"
              :headers='header'
              :on-remove='removeOtherFile'
              :on-error='flieErr'
              :file-list='fileList'
              :on-exceed="handleExceed"
            >
              <el-button size="mini" type="primary" style='margin-left:30px;margin-top:3px;width: 200px' v-if='userRole=="PURCHASER_MANAGER"||userRole=="ROLE_ADMIN"||userRole=="PLANNER"||userRole=="PURCHASER"'>上传排程模板</el-button>
            </el-upload>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <!--订单总览-->
    <el-table :data="orderTableDataList" align="center" border size='mini'
              :span-method="objectSpanMethod" ref='orderTableDataList'
    >
      <el-table-column :label="orderTableHeader.summary" width="150" align="center" v-if='userRole=="PLANNER"||userRole=="ROLE_ADMIN"'  fixed="left">
        <template slot-scope="scope">
          <span>{{scope.row.summary}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="purchaseDate" :label="orderTableHeader.purchaseDate" width="120"
                       align="center"></el-table-column>
      <el-table-column prop="purchaseOrder" :label="orderTableHeader.purchaseOrder" width="120"
                       align="center"></el-table-column>
      <el-table-column prop="supplierName" :label="orderTableHeader.supplierName" width="200"
                       align="center"></el-table-column>
      <el-table-column prop="productNumber" :label="orderTableHeader.productNumber" width="130"
                       align="center" fixed="left"></el-table-column>
      <el-table-column prop="productName" :label="orderTableHeader.productName" width="150"
                       align="center" fixed="left"></el-table-column>
      <el-table-column prop="unit" :label="orderTableHeader.unit" width="100%" align="center"></el-table-column>
      <el-table-column prop="purchaseUserName" :label="orderTableHeader.purchaseUserName" width="120"
                       align="center"></el-table-column>
      <el-table-column prop="specification" :label="orderTableHeader.specification" width="250"
                       align="center"></el-table-column>
      <el-table-column :label="orderTableHeader.count" width="90" align="center" fixed="left">
        <template slot-scope="scope">
          <span>{{scope.row.count|filtersCount}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" :label="orderTableHeader.status" width="80" align="center"
                       fixed="left"></el-table-column>
      <el-table-column prop="statistics" :label="orderTableHeader.statistics" width="100" align="center"
                       fixed="left"></el-table-column>
      <el-table-column label="操作" width="70" align="center" v-if='userRole=="ROLE_ADMIN"||userRole=="PLANNER"||userRole=="PURCHASER"'
                       fixed="right">
        <template slot-scope="scope">
          <el-button type="text" size='mini' v-if='scope.$index%3=="0"' @click='save(scope)'>保存</el-button>
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
          <!--显示数据-->
          <span v-if='scope.$index%3'>{{orderTableDataList[scope.$index].dateList[index].data|filtersOrderCount}}</span>
          <!--第一行输入框-->
          <input type="text" class='editInput' v-else v-model='orderTableDataList[scope.$index].dateList[index].data' :readonly="!Boolean(orderTableDataList[scope.$index].dateList[index].editable)"  @dblclick="modify(orderTableDataList[scope.$index].dateList[index],index,scope.row)"/>
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
      <!--请求条数-->
      <div class='tiaoshu'>
        <el-input placeholder="请输入内容" v-model="hladpageSize" size='mini'>
          <template slot="append">最多{{totalNum}}条</template>
        </el-input>
      </div>
      <div style='margin-left:10px;'>
        <el-button type="primary"  class='Fuzzy' size="mini" @click='handleCurrentChange("search")' :disabled='hladpageSize>totalNum'>搜索</el-button>
      </div>
    </div>
    <!--排程匹配-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
      >
      <el-form ref="form" :model="form" label-width="80px" size='mini' :rules="rules">
        <el-form-item label="订单号" prop="purchaseOrder">
          <el-input v-model="form.purchaseOrder"></el-input>
        </el-form-item>
        <el-form-item label="排程时间" prop="planTime">
          <el-date-picker
            v-model="form.planTime"
            type="date"
            value-format='yyyy-MM-dd'
            placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="数量" prop="quantity">
          <el-input v-model="form.quantity"></el-input>
        </el-form-item>
        <el-form-item label="匹配内容" prop="machingContent">
          <el-input v-model="form.machingContent"></el-input>
        </el-form-item>
        <div class='bth'>
          <el-button type="primary" size='mini' @click='Schedule'>确定</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!--修改排程-->
    <el-dialog
      title="修改排程"
      :visible.sync="editForShow"
      width="400px"

    >
      <el-form ref="editFor" :model="editFor" label-width="80px" size='mini'>
        <el-form-item label="创建人">
          <el-input v-model="editFor.createTrueName" readonly></el-input>
        </el-form-item>
        <el-form-item label="创建时间">
          <el-input v-model="editFor.createDate" readonly></el-input>
        </el-form-item>
        <el-form-item label="排程日期">
          <el-input v-model="editFor.planTime" readonly></el-input>
        </el-form-item>
        <el-form-item label="数量">
          <el-input v-model="editFor.quantity"></el-input>
        </el-form-item>
        <el-form-item label="是否紧急">
          <el-select v-model="editFor.isHurry">
            <el-option label="否" value="0"></el-option>
            <el-option label="紧急" value="1"></el-option>
          </el-select>
        </el-form-item>
        <div class='bth'>
          <el-button type="primary" size='mini' @click='sureEdit'>确定</el-button>
        </div>
      </el-form>
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
  // Vuex语法糖
  import {mapState} from 'Vuex'
  // 正则
  import {validateInteger} from 'api/Validate.js'


  export default {
    name: 'orderScheduling',
    data() {
      return {
        // 文件地址
        path:config.api+"/procurement/analysisExcelForPlan.do?fileType=other.path",
        fileList: [],
        // 文件上传设置token
        header:{
          Authorization: localStorage.getItem('token')
        },
        // 快捷搜索
        screen_data: {
          // 模糊搜索
          search: '',
          // 采购日期数组
          purchaseArr: [],
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
          isEndOfSchedule: "",
          //供应商、
          supplierName: '',
          //采购单
          purchaseOrder: '',
          // 品号
          productNumber: '',
          // 品名
          productName: '',
          // 是否结案
          isEnd:''
        },
        form:{
          // 订单号
          purchaseOrder:'',
          // 排程时间
          planTime:'',
          // 数量
          quantity:'',
          // 匹配内容
          machingContent:''
        },
        // 表头
        orderTableHeader: "",
        // 内容
        orderTableDataList: [],
        // 当前页
        pageNum: 1,
        // 请求条数
        pageSize: 4,
        // 总条数
        totalNum: 0,
        // 手动输入请求条数
        hladpageSize:4,
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
        selectAll: [],
        selectSate: false,
        // 排程匹配显示
        dialogVisible:false,
        // 正则判断
        rules: {
          purchaseOrder: [
            { required: true, message: '订单号不能为空', trigger: 'blur' }
          ],
          planTime:[
            { required: true, message: '时间不能为空', trigger: 'change' }
          ],
          quantity:[
            { validator: validateInteger,required: true, trigger: 'blur' }
          ],
          machingContent:[
            { required: true, message: '匹配内容不能为空', trigger: 'blur' }
          ]
        },
        // 修改排程
        editForShow:false,
        editFor:{
          // 排程时间
          planTime:'',
          // 数量
          quantity:'',
          // uuid
          editUuid:'',
          isEnd:'',
          count:'',
          purchaseOrder:'',
          purchaseDate:'',
          createTrueName:'',
          createDate:'',
          isHurry:'0'
        }
      }
    },
    filters: {
      filtersCount: function (val) {
        return Interface.Remainder(val)
      },
      filtersOrderCount:function(val){
        if(val=='0.00'){
          return Interface.Remainder(val)
        }else{
          return val
        }
      },
      filteHurry(val){
        if (val == '1') {
          return "紧急"
        } else {
          return '否'
        }
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
    },
    methods: {
      // 获取采购选中日期
      changeDate() {
        this.screen_data.startDate = this.screen_data.purchaseArr[0]
        this.screen_data.endDate = this.screen_data.purchaseArr[1]
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
      // 单元格合并
      objectSpanMethod({row, column, rowIndex, columnIndex}) {
        if(this.userRole=="PLANNER"||this.userRole=="ROLE_ADMIN"){
          if (columnIndex === 0) {
            if (rowIndex % 3 === 0) {
              return {
                rowspan: 3,
                colspan: 1
              }
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          } else if (columnIndex === 1) {
            if (rowIndex % 3 === 0) {
              return {
                rowspan: 3,
                colspan: 1
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          } else if (columnIndex === 2) {
            if (rowIndex % 3 === 0) {
              return {
                rowspan: 3,
                colspan: 1
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          }else if (columnIndex === 3) {
            if (rowIndex % 3 === 0) {
              return {
                rowspan: 3,
                colspan: 1
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          }else if (columnIndex === 6) {
            if (rowIndex % 3 === 0) {
              return {
                rowspan: 3,
                colspan: 1
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          } else if (columnIndex === 7) {
            if (rowIndex % 3 === 0) {
              return {
                rowspan: 3,
                colspan: 1
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          } else if (columnIndex === 8) {
            if (rowIndex % 3 === 0) {
              return {
                rowspan: 3,
                colspan: 1
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          } else if (columnIndex === 9) {
            if (rowIndex % 3 === 0) {
              return {
                rowspan: 3,
                colspan: 1
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          } else if (columnIndex === 10) {
            if (rowIndex % 3 === 0) {
              return {
                rowspan: 3,
                colspan: 1
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          }else if (columnIndex === 11) {
            if (rowIndex % 3 === 0) {
              return {
                rowspan: 3,
                colspan: 1
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          }
        }else{
          if (columnIndex === 0) {
            if (rowIndex % 3 === 0) {
              return {
                rowspan: 3,
                colspan: 1
              }
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          } else if (columnIndex === 1) {
            if (rowIndex % 3 === 0) {
              return {
                rowspan: 3,
                colspan: 1
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          } else if (columnIndex === 2) {
            if (rowIndex % 3 === 0) {
              return {
                rowspan: 3,
                colspan: 1
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          }else if (columnIndex === 5) {
            if (rowIndex % 3 === 0) {
              return {
                rowspan: 3,
                colspan: 1
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          }else if (columnIndex === 5) {
            if (rowIndex % 3 === 0) {
              return {
                rowspan: 3,
                colspan: 1
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          }else if (columnIndex === 6) {
            if (rowIndex % 3 === 0) {
              return {
                rowspan: 3,
                colspan: 1
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          }else if (columnIndex === 7) {
            if (rowIndex % 3 === 0) {
              return {
                rowspan: 3,
                colspan: 1
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          }else if (columnIndex === 8) {
            if (rowIndex % 3 === 0) {
              return {
                rowspan: 3,
                colspan: 1
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          }else if (columnIndex === 9) {
            if (rowIndex % 3 === 0) {
              return {
                rowspan: 3,
                colspan: 1
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          }else if (columnIndex === 10) {
            if (rowIndex % 3 === 0) {
              return {
                rowspan: 3,
                colspan: 1
              };
            } else {
              return {
                rowspan: 0,
                colspan: 0
              }
            }
          }
        }
      },
      // 获取用订单列表
      handleCurrentChange(type) {
        if (type == 'search') {
          this.pageNum = 1
          this.pageSize=Number(this.hladpageSize)
          console.log(this.pageSize)
        }
        const params = {
          search: this.screen_data.search,
          planStartDate: this.screen_data.planStartDate,
          planEndDate: this.screen_data.planEndDate,
          startDate: this.screen_data.startDate,
          endDate: this.screen_data.endDate,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          isEndOfSchedule: this.screen_data.isEndOfSchedule,
          //供应商、
          supplierName: this.screen_data.supplierName,
          //采购单
          purchaseOrder: this.screen_data.purchaseOrder,
          // 品号
          productNumber: this.screen_data.productNumber,
          // 品名
          productName: this.screen_data.productName,
          // 是否结案
          isEnd:this.screen_data.isEnd
        }

        axios.post(config.api, '/procurement/getOrderPlanList.do', params).then((res) => {
          // 如果请求成功
          if (res.status == 0) {
            this.orderTableHeader = res.data.orderTableHeader
            this.orderTableDataList = res.data.orderTableDataList
            if (res.data.orderTableDataList.length > 0) {
              // 总条数
              this.totalNum = res.data.orderTableDataList[0].totalNum
            }

          } else {
            // 错误提示
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      // 保存排程
      save(scope) {
        let schedulingPlanList = []
        this.orderTableHeader.dateList.map((item, index)=>{
          schedulingPlanList.push({
            purchaseOrder: this.orderTableDataList[scope.$index].purchaseOrder,
            planTime: item.substring(0, 4) + "-" + item.substring(4, 6) + "-" + item.substring(6, 8),
            quantity: this.orderTableDataList[scope.$index].dateList[index].data,
            productUuid: this.orderTableDataList[scope.$index].uuid,
            orderCount: this.orderTableDataList[scope.$index].count,
            purchaseDate: this.orderTableDataList[scope.$index].purchaseDate,
            startSchedulingRange: this.screen_data.planStartDate,
            endSchedulingRange: this.screen_data.planEndDate,
            isEnd:this.orderTableDataList[scope.$index].isEnd
          })
        })

        axios.post(config.api, '/procurement/saveOrderPlan.do', schedulingPlanList).then((res) => {
          if (res.status == 0) {
            // 错误提示
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true,
              callback: action => {
                // 重新获取数据
                this.handleCurrentChange()
              }
            });
          } else {
            // 错误提示
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            });
          }
        })
      },
      // 下载文件
      downloadFiles() {
        const params = {
          search: this.screen_data.search,
          planStartDate: this.screen_data.planStartDate,
          planEndDate: this.screen_data.planEndDate,
          startDate: this.screen_data.startDate,
          endDate: this.screen_data.endDate,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          isEndOfSchedule: this.screen_data.isEndOfSchedule,
          //供应商、
          supplierName: this.screen_data.supplierName,
          //采购单
          purchaseOrder: this.screen_data.purchaseOrder,
          // 品号
          productNumber: this.screen_data.productNumber,
          // 品名
          productName: this.screen_data.productName,
          // 是否结案
          isEnd:this.screen_data.isEnd,

        }
        axios.getFile(config.noNeedLogionApi, 'skip/exportDetailedOrderPlan.do', params).then((response) => {
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(new Blob([response]));
          link.target = "_blank";
          link.download = '排程.xlsx';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
      },
      // 匹配排程确定
      Schedule(){
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let params={
              // 订单号
              purchaseOrder:this.form.purchaseOrder,
              // 排程时间
              planTime:this.form.planTime,
              // 数量
              quantity:this.form.quantity,
              // 匹配内容
              machingContent:this.form.machingContent
            }
            axios.post(config.api, '/procurement/saveBatchOrderPlan.do', params).then((res) => {
              // 如果请求成功
              if (res.status == 0) {
                // 错误提示
                this.$alert(res.msg, {
                  confirmButtonText: '确定',
                  center: true,
                  callback: action => {
                    this.handleClose()
                    // 重新获取数据
                    this.handleCurrentChange()
                  }
                })
              } else {
                // 错误提示
                this.$alert(res.msg, {
                  confirmButtonText: '确定',
                  center: true
                })
              }
            })
          }
        })
      },
      // 打开匹配排程显示
      handleShow(){
        this.dialogVisible=true
      },
      // 关闭匹配排程
      handleClose(){
        this.dialogVisible=false;
        this.$refs['form'].resetFields();
      },
      // 修改编辑
      modify(data,index,scope){
        // 如果是一件保存过的
        if(!data.editable&&this.userRole=="ROLE_ADMIN"||!data.editable&&this.userRole=="PLANNER"||!data.editable&&this.userRole=="PURCHASER"){
          this.editForShow=true
          // 日期
          var timeDate=this.orderTableHeader.dateList[index].split('')
          timeDate.splice(4, 0, "-")
          timeDate.splice(7, 0, "-")

          this.editFor.planTime=timeDate.join('')
          this.editFor.quantity=data.data
          this.editFor.editUuid=scope.uuid
          this.editFor.isEnd=scope.isEnd
          this.editFor.count=scope.count
          this.editFor.purchaseOrder=scope.purchaseOrder
          this.editFor.purchaseDate=scope.purchaseDate
          this.editFor.createTrueName=data.createTrueName
          this.editFor.createDate=data.createDate
          this.editFor.isHurry=String(data.isHurry)


        }
      },
      // 确定修改
      sureEdit(){
        const params={
          productUuid:this.editFor.editUuid,
          planTime:this.editFor.planTime,
          quantity:this.editFor.quantity,
          isEnd:this.editFor.isEnd,
          orderCount:this.editFor.count,
          purchaseOrder:this.editFor.purchaseOrder,
          purchaseDate:this.editFor.purchaseDate,
          createUserName:this.editFor.createUserName,
          createDate:this.editFor.createDate,
          isHurry:this.editFor.isHurry
        }
        axios.post(config.api, '/procurement/editOrderPlan.do', params).then((res) => {
          if (res.status == 0) {
            let _thsi = this
            // 错误提示
            _thsi.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true,
              callback: action => {
                this.editForShow=false
                // 重新获取数据
                _thsi.handleCurrentChange()
              }
            });
          } else {
            // 错误提示
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            });
          }
        })
      },
      // 排程模板下载
      templateDown(){
        const params={
          search: this.screen_data.search,
          planStartDate: this.screen_data.planStartDate,
          planEndDate: this.screen_data.planEndDate,
          startDate: this.screen_data.startDate,
          endDate: this.screen_data.endDate,
          pageNum: this.pageNum,
          pageSize: this.pageSize,
          isEndOfSchedule: this.screen_data.isEndOfSchedule,
          //供应商、
          supplierName: this.screen_data.supplierName,
          //采购单
          purchaseOrder: this.screen_data.purchaseOrder,
          // 品号
          productNumber: this.screen_data.productNumber,
          // 品名
          productName: this.screen_data.productName,
          // 是否结案
          isEnd:this.screen_data.isEnd
        }
        axios.getFile(config.noNeedLogionApi, 'skip/exportPlanTemplate.do', params).then((response) => {
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(new Blob([response]));
          link.target = "_blank";
          link.download = '采购排程模板.xlsx';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
      },
      // 附件上传成功
      otherFileChange(response){
        if(response.status==0){
          this.$alert(response.msg, {
            confirmButtonText: '确定',
            center: true
          })
        }else{
          this.$alert(response.msg, {
            confirmButtonText: '确定',
            center: true
          })
        }
      },
      // 删除上传附件
      removeOtherFile(){
        this.form.enclosure=''
        this.fileList=[]
      },
      // 上传时失败
      flieErr(){
        this.$alert('文件上传失败', {
          confirmButtonText: '确定',
          center: true
        })
      },
      // 上传超出数量
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，已选择了 ${files.length} 个文件`);
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





.editInput{
  width 100px;
  height 25px;
  border 1px solid #ccc;
  text-align center
  border-radius 3px;
  outline none
}


  .bth{
    width 100%;
    display flex
    justify-content center
    align-items center
  }


  .inquiry_warp
    width: 100%;
    margin-top 20px;
    margin-bottom: 10px;

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

