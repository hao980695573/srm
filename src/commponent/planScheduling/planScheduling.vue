<template>
  <div>
    <div v-contextmenu:contextmenu>
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
            <el-input v-model="screen_data.purchaseOrder" placeholder="请输入采购单" style='width: 120px;'></el-input>
          </el-form-item>
          <el-form-item label="是否结案">
            <el-select v-model="screen_data.isEnd" placeholder="请选择" size='mini' style='width: 80px;'>
              <el-option label="否" value="F"></el-option>
              <el-option label="是" value="T"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="排程完结">
            <el-select v-model="screen_data.isEndOfSchedule" placeholder="请选择" size='mini' style='width: 80px;'>
              <el-option label="否" value="0"></el-option>
              <el-option label="是" value="1"></el-option>
              <el-option label="全部" value=""></el-option>
            </el-select>
          </el-form-item>
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
              <el-button type="primary" style='margin-left:10px' size='mini' @click=' '
                         :disabled='tableData.length==0'>导出
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style='margin-left:10px' size='mini' @click='save()'
                         :disabled='tableData.length==0'>保存
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style='margin-left:10px' size='mini' @click='templateDown'
                         v-if='userRole=="PURCHASER_MANAGER"||userRole=="ROLE_ADMIN"||userRole=="PLANNER"||userRole=="PURCHASER"'>
                下载模板
              </el-button>
            </el-form-item>
            <el-form-item style='margin-left:-20px;margin-top:-2px;'>
              <el-upload
                :multiple='false'
                :limit='1'
                :action='path'
                :on-success="otherFileChange"
                :headers='header'
                :on-remove='removeOtherFile'
                :on-error='flieErr'
                :file-list='fileList'
                :on-exceed="handleExceed"
              >
                <el-button size="mini" type="primary" style='margin-left:30px;margin-top:3px;width: 100px'
                           v-if='userRole=="PURCHASER_MANAGER"||userRole=="ROLE_ADMIN"||userRole=="PLANNER"||userRole=="PURCHASER"'>
                  上传模板
                </el-button>
              </el-upload>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style='margin-left:10px' size='mini' @click='handleShow'>排程匹配</el-button>
            </el-form-item>
          </div>

        </el-form>
      </div>
      <!--表格-->
      <div class='dataTable'>
        <el-table :data="tableData"
                  border
                  row-key="unique"
                  size='mini'
                  :row-class-name="tableRowClassName"
        >
          <el-table-column v-for="(item, index) in col"
                           :key="`col_${index}`"
                           align='center'
                           :width='dropCol[index].width'
                           v-if='item.showState'
                           :fixed='item.fixedStatu'

          >
            <!--表头-->
            <template slot="header" slot-scope="scope">
              <span>{{col[index].lable}}</span>
              <span class='img_warp' v-if='col[index].prop=="status"' @click='stateShow'>
                <img src="../../../static/image/table/timg.jpeg" alt="">
              </span>
            </template>
            <!-- 内容-->
            <template slot-scope="scope">
              <span
                v-if='dropCol[index].prop=="count"'>{{tableData[scope.$index][dropCol[index].prop]|filtersCount}}</span>
              <span v-else>{{tableData[scope.$index][dropCol[index].prop]}}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            v-for="(item,index) in headDateData"
            :key='index'
            width='150px'
            :label="item"
          >
            <template slot-scope="scope">
              <!--span-->
              <span v-if='tableData[scope.$index].status!=="计划数量"'>{{bodyDateData[scope.$index][index].data}}</span>
              <!--第一行输入框-->
              <input v-else class='editInput' :class='item'  placeholder="请输入内容" v-model='bodyDateData[scope.$index][index].data' @keyup="show($event,scope.$index)"/>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!--分页-->
      <div class='page_fen' v-show='!bodyDateData.length=="0"'>
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
          <el-button type="primary" class='Fuzzy' size="mini" @click='handleCurrentChange("search")'
                     :disabled='hladpageSize>totalNum'>搜索
          </el-button>
        </div>
      </div>
    </div>

    <!--table状态筛选-->
    <el-dialog
      title="排程显示状态"
      :visible.sync="dialogVisible"
      width="200px"
      >
      <el-checkbox-group v-model="censusArr"  :min="1">
        <el-checkbox v-for="(item,index) in filerState" :label="item.value" :key="index">{{item.lable}}</el-checkbox>
      </el-checkbox-group>
      <div class='Right_warp'>
        <el-button @click='statequeding' size='mini'>确定</el-button>
      </div>
    </el-dialog>

    <!--排程匹配-->
    <el-dialog
      title="提示"
      :visible.sync="dialogpaiVisible"
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
        <div class='Right_warp'>
          <el-button type="primary" size='mini' @click='Schedule'>确定</el-button>
        </div>
      </el-form>
    </el-dialog>

    <!--鼠标右键事件-->
    <v-contextmenu ref="contextmenu">
      <div style='padding: 0px 10px'>
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedCities" style='display: inline-grid;'>
          <el-checkbox v-for="item in checkedList" :label="item.prop" :key="item.productNumber">{{item.lable}}
          </el-checkbox>
        </el-checkbox-group>
        <div class='Right_warp'>
          <el-button @click='RigthClick' size='mini'>确定</el-button>
        </div>
      </div>
    </v-contextmenu>
  </div>
</template>


<script>
  import Sortable from 'sortablejs'
  // 公共配置
  import {config} from 'api/config.js';
  // 接口文件请求文件
  import axios from 'api/axios.js'
  // 引入公共方法
  import Interface from 'api/Interface.js'
  // Vuex语法糖
  import {mapState} from 'Vuex'
  // 正则
  import {validateInteger} from 'api/Validate.js'

  export default {
    name: 'planScheduling',
    data() {
      return {
        // 排程匹配
        dialogpaiVisible:false,
        // table状态显示
        dialogVisible:false,
        filerState:[{lable:'计划数量',value:4},{lable:'已交数量',value:2},{lable:'差异',value:1}],
        censusArr:[4,2,1],
        censusScore:7,
        // 文件地址
        path: config.api + "/procurement/analysisExcelForPlan.do?fileType=other.path",
        fileList: [],
        // 文件上传设置token
        header: {
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
          isEnd: ''
        },
        // 当前页
        pageNum: 1,
        // 请求条数
        pageSize: 4,
        // 总条数
        totalNum: 0,
        // 手动输入请求条数
        hladpageSize: 4,
        // 可选的表头列表显示
        checkedList: [
          {
            lable: "概要",
            prop: "summary"
          },
          {
            lable: "品号",
            prop: "productNumber"
          },
          {
            lable: "品名",
            prop: "productName"
          },
          {
            lable: "数量",
            prop: "count"
          },
          {
            lable: "状态",
            prop: "status"
          },
          {
            lable: "统计",
            prop: "statistics"
          },
          {
            lable: "采购日期",
            prop: "purchaseDate"
          },
          {
            lable: "采购单号",
            prop: "purchaseOrder"
          }, {
            lable: "供货商",
            prop: "supplierName"
          }, {
            lable: "单位",
            prop: "unit"
          }, {
            lable: "采购员",
            prop: "purchaseUserName"
          }, {
            lable: "规格",
            prop: "specification"
          }],
        // 已选中的表头列表显示
        checkedCities: ['summary', 'productNumber', 'productName', 'count', 'status', 'statistics', 'purchaseDate', 'purchaseOrder', 'supplierName', 'unit', 'purchaseUserName', 'specification'],
        // 右键全选
        checkAll: true,
        isIndeterminate: true,
        // 原始表头
        col: [
          {
            lable: "概要",
            prop: "summary",
            width: 150,
            showState: true,
            fixedStatu:'left'
          }, {
            lable: "品号",
            prop: "productNumber",
            width: 130,
            showState: true,
            fixedStatu:'left'
          },
          {
            lable: "品名",
            prop: "productName",
            width: 250,
            showState: true,
            fixedStatu:'left'
          },
          {
            lable: "数量",
            prop: "count",
            width: 100,
            showState: true,
            fixedStatu:'left'

          },
          {
            lable: "状态",
            prop: "status",
            width: 80,
            showState: true,
            fixedStatu:'left'
          },
          {
            lable: "统计",
            prop: "statistics",
            width: 100,
            showState: true,
            fixedStatu:'left'
          },
          {
            lable: "采购日期",
            prop: "purchaseDate",
            width: 120,
            showState: true,
            fixedStatu:false
          },
          {
            lable: "采购单号",
            prop: "purchaseOrder",
            width: 120,
            showState: true,
            fixedStatu:false
          }, {
            lable: "供货商",
            prop: "supplierName",
            width: 200,
            showState: true,
            fixedStatu:false
          }, {
            lable: "单位",
            prop: "unit",
            width: 100,
            showState: true,
            fixedStatu:false
          }, {
            lable: "采购员",
            prop: "purchaseUserName",
            width: 120,
            showState: true,
            fixedStatu:false
          }, {
            lable: "规格",
            prop: "specification",
            width: 320,
            showState: true,
            fixedStatu:false
          }
        ],
        // 对比下的pro
        dropCol: [
          {
            lable: "概要",
            prop: "summary",
            width: 150,
            showState: true
          }, {
            lable: "品号",
            prop: "productNumber",
            width: 130,
            showState: true
          },
          {
            lable: "品名",
            prop: "productName",
            width: 250,
            showState: true
          },
          {
            lable: "数量",
            prop: "count",
            width: 100,
            showState: true
          },
          {
            lable: "状态",
            prop: "status",
            width: 80,
            showState: true
          },
          {
            lable: "统计",
            prop: "statistics",
            width: 100,
            showState: true
          },
          {
            lable: "采购日期",
            prop: "purchaseDate",
            width: 120,
            showState: true
          },
          {
            lable: "采购单号",
            prop: "purchaseOrder",
            width: 120,
            showState: true
          }, {
            lable: "供货商",
            prop: "supplierName",
            width: 200,
            showState: true
          }, {
            lable: "单位",
            prop: "unit",
            width: 100,
            showState: true
          }, {
            lable: "采购员",
            prop: "purchaseUserName",
            width: 120,
            showState: true
          }, {
            lable: "规格",
            prop: "specification",
            width: 320,
            showState: true
          }],
        // 不可移动日期表头
        headDateData: [],
        // 不可移动日期内容列表
        bodyDateData: [],
        // 可移动列表
        tableData: [],
        // 合并单元格
        spanArr: [],
        pos: 0,
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
        // 排程匹配
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
        }
      }
    },
    filters: {
      filtersCount: function (val) {
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
      // 拖拽
      this.columnDrop()
      // 获取列表
      this.handleCurrentChange()
    },
    methods: {
      //键盘触发事件
      show(ev,index){
        let newIndex ;
        // 得出是具体第几行
        let activeIndex=''
        if(this.censusScore==4){
          activeIndex=index
        }else if(this.censusScore==6||this.censusScore==5){
          activeIndex=index/2
        }else if(this.censusScore==7){
          activeIndex=index/3
        }

        //通过ev 获取 当前input 名称 用于判断属于哪列
        let clssName = ev.target.className;
        this.headDateData.map((item,indexs)=>{
          if(clssName.indexOf(item) != -1){
            newIndex=activeIndex*this.headDateData.length+indexs
          }
        })
        //获取所有个input
        let inputAll = document.querySelectorAll('.editInput');
        //向上 =38
        if(ev.keyCode == 38){
          //当焦点在第一行的时候 按向上的时候焦点要聚焦到前一列的最后一个
          newIndex -=this.headDateData.length ;
          if( inputAll[newIndex] ){
            inputAll[newIndex].focus();
          }
        }
        //下 = 40
        if(ev.keyCode == 40){
          //当newIndex 在最后一行的时候 焦点要聚焦到 下一列的第一个
          newIndex += this.headDateData.length ;
          if( inputAll[newIndex] ){
            inputAll[newIndex].focus();
          }
        }
        //左 = 37
        if(ev.keyCode == 37){
          newIndex -= 1 ;
          if( inputAll[newIndex] ){
            inputAll[newIndex].focus();
          }
        }
        //右 = 39
        if(ev.keyCode == 39){
          newIndex += 1 ;
          if( inputAll[newIndex] ){
            inputAll[newIndex].focus();
          }
        }
      },
      //列拖拽
      columnDrop() {
        const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
        this.sortable = Sortable.create(wrapperTr, {
          animation: 180,
          delay: 0,
          onStart: evt => {
            if (evt.oldIndex > 11) {
              // 销毁拖动
              let sortAble = Sortable.create(evt.item)
              sortAble.destroy();
            }
          },
          onEnd: evt => {
            const oldItem = this.dropCol[evt.oldIndex]
            this.dropCol.splice(evt.oldIndex, 1)
            this.dropCol.splice(evt.newIndex, 0, oldItem)
          },
        })
      },
      // 获取列表
      handleCurrentChange(type) {
        if (type == 'search') {
          this.pageNum = 1
          this.pageSize = Number(this.hladpageSize)
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
          isEnd: this.screen_data.isEnd,
          censusScore:this.censusScore
        }

        // 获取采购单号列表
        axios.post(config.api, '/procurement/getOrderPlanListForPlan.do', params).then((res) => {
          if (res.status == 0) {
            this.headDateData = res.data.headDateData
            this.bodyDateData = res.data.bodyDateData
            this.tableData = res.data.tableData

            // 总数
            if (res.data.tableData[0]) {
              this.totalNum = res.data.tableData[0].totalNum
            }

            // 合并数组。判断哪些是同一类型的数据
            this.getSpanArrs(this.tableData)
          } else {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
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
      // 导出下载文件
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
          isEnd: this.screen_data.isEnd,

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
      // 排程模板下载
      templateDown() {
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
          isEnd: this.screen_data.isEnd
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
      otherFileChange(response) {
        if (response.status == 0) {
          this.$alert(response.msg, {
            confirmButtonText: '确定',
            center: true
          })
        } else {
          this.$alert(response.msg, {
            confirmButtonText: '确定',
            center: true
          })
        }
      },
      // 删除上传附件
      removeOtherFile() {
        this.form.enclosure = ''
        this.fileList = []
      },
      // 上传时失败
      flieErr() {
        this.$alert('文件上传失败', {
          confirmButtonText: '确定',
          center: true
        })
      },
      // 上传超出数量
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，已选择了 ${files.length} 个文件`);
      },
      // 一键保存排程
      save() {
        let arr = []
        // this.spanArr判断几条数据是不一样的，处理数据给后台
        this.spanArr.map((items, indexs) => {
          if (items > 0) {
            this.bodyDateData[indexs].map((item, index) => {
              arr.push({
                purchaseOrder: this.tableData[indexs].purchaseOrder,
                planTime: this.headDateData[index].substring(0, 4) + "-" + this.headDateData[index].substring(4, 6) + "-" + this.headDateData[index].substring(6, 8),
                quantity: item.data,
                productUuid: this.tableData[indexs].uuid,
                orderCount: this.tableData[indexs].count,
                purchaseDate: this.tableData[indexs].purchaseDate,
                startSchedulingRange: this.screen_data.planStartDate,
                endSchedulingRange: this.screen_data.planEndDate,
                isEnd: this.tableData[indexs].isEnd,
                productNumber: this.tableData[indexs].productNumber
              })
            })
          }
        })
        axios.post(config.api, '/procurement/onClickSavePlan.do', arr).then((res) => {
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
      // 右键全选
      handleCheckAllChange(val) {
        let data = []
        this.checkedList.map((item) => {
          data.push(item.prop)
        })
        this.checkedCities = val ? data : []
        this.isIndeterminate = false
      },
      // 右键确定筛选列表
      RigthClick() {
        // 获取筛选中的索引
        let a = []
        this.col.map((item, index) => {
          this.checkedCities.map((items) => {
            if (item.prop == items) {
              a.push(index)
            } else {
              item.showState = false
              this.dropCol[index].showState = false
            }
          })
        })
        // 选中的列表显示
        if (a.length > 0) {
          a.map((item) => {
            this.col[item].showState = true
            this.dropCol[item].showState = true
          })
        } else {
          this.col.map((item, index) => {
            this.col[index].showState = false
            this.dropCol[index].showState = false
          })
        }
      },
      // 合并单元格数据
      getSpanArrs(data) {
        this.spanArr=[]
        for (var i = 0; i < data.length; i++) {
          if (i === 0) {
            this.spanArr.push(1);
            this.pos = 0
          } else {
            // 判断当前元素与上一个元素是否相同
            if (data[i].uuid === data[i - 1].uuid) {
              this.spanArr[this.pos] += 1;
              this.spanArr.push(0);
            } else {
              this.spanArr.push(1);
              this.pos = i;
            }
          }
        }
      },
      // 隔行变色
      tableRowClassName({row}) {
        if(row.lei==1){
          return "warning-row"
        }else{
          return ''
        }
      },
      // 显示table筛选状态
      stateShow(){
        this.dialogVisible=true
      },
      // 筛选显示状态
      statequeding(){
        console.log(this.censusArr);
        this.censusScore=0

        this.censusArr.map((item)=>{
          this.censusScore+=item
        })
        //
        console.log(this.censusScore);
        //  隐藏弹框
        this.dialogVisible=false
        // 重新获取数据
        this.handleCurrentChange('search')
      },
      // 打开匹配排程显示
      handleShow(){
        this.dialogpaiVisible=true
      },
      // 关闭匹配排程
      handleClose(){
        this.dialogpaiVisible=false;
        this.$refs['form'].resetFields();
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
    }
  }
</script>


<style scoped lang="stylus">
  .dataTable >>> .el-table .warning-row {
    background: #E8F4F4;
  }

  .img_warp {
    width: 10px;
    height: 10px;
    display: inline-block;
  }

  .img_warp img {
    width: 100%;
    height: 100%;
  }

  .inquiry_warp
    width: 100%;
    margin-top 20px;
    margin-bottom: 10px;

  .editInput {
    width 100px;
    height 25px;
    border 1px solid #ccc;
    text-align center
    border-radius 3px;
    outline none
  }

  .editInput:focus {
    border: 1px solid red
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

  .Right_warp {
    width 100%;
    display flex
    margin-top 5px;
    justify-content center
  }


</style>
