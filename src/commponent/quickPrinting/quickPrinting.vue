<template>
  <div class='duickPrintWarp'>
    <!--左边-->
    <div class='duickPrintLeft'>
      <div class='duickPrintChoice'>
        <el-form ref="form" :model="form" label-width="80px" size='mini' :inline="true">
          <el-form-item label="送货单号">
            <el-input v-model="form.deliveryNumber" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click='getList'>搜索</el-button>
          </el-form-item>
          <div>
            <el-form-item>
              <el-select v-model="form.PrintSize" placeholder="请选择">
                <el-option label="100*70" value="large"></el-option>
                <el-option label="100*60" value="middle"></el-option>
                <el-option label="70*45" value="small"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click='printLoad' :disabled='selectList.length<1||form.PrintSize==""'>打印条形码
              </el-button>
            </el-form-item>
            <el-form-item>
              <el-button type="warning" @click='LoadChoice' :disabled='LoadChoiceList.length<1'>辅料筛选</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <!--表格-->
      <el-table
        :data="tableData"
        style="width: 100%"
        height='700px'
        size='mini'
        border
        @selection-change="handleSelectionChange"
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
          prop="productNumber"
          label="品号"
          align='center'
          width="130">
        </el-table-column>
        <el-table-column
          prop="productName"
          label="品名"
          align='center'
          min-width="180">
        </el-table-column>
        <el-table-column
          label="是否辅料"
          align='center'
          min-width="80">
          <template slot-scope="scope">
            <span :class='scope.row.isAccessoryLabel?"redColor":""'>{{scope.row.isAccessoryLabel | filtersIsAccessory}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--右边-->
    <div>
      <!-- 正常标签 100*70 -->
      <div v-show='PrintType=="label"'>
        <labelPrinting></labelPrinting>
      </div>
      <!--正常标签 100*60-->
      <div v-show='PrintType=="secondary"'>
        <middlePrint></middlePrint>
      </div>
      <!-- 正常标签 70*40 -->
      <div v-show='PrintType=="samll"'>
        <samllPrint></samllPrint>
      </div>


      <!-- 辅料 70*40 -->
      <div v-show='PrintType=="auxiliarySamll"'>
        <quickAuxiliarySamllPrint></quickAuxiliarySamllPrint>
      </div>
      <!-- 辅料 100*60 -->
      <div v-show='PrintType=="auxiliaryMiddle"'>
        <quickAuxiliaryMiddlePrint></quickAuxiliaryMiddlePrint>
      </div>
      <!-- 辅料 100*70 -->
      <div  v-show='PrintType=="auxiliaryLarge"'>
        <quickAuxiliaryLargePrint></quickAuxiliaryLargePrint>
      </div>
    </div>
  </div>
</template>

<script>
  // 公共配置
  import {config} from 'api/config.js';
  // 接口文件请求文件
  import axios from 'api/axios.js'
  // 正常条形码预览100*70
  import labelPrinting from 'commponent/quickPrinting/commponent/labelPrinting'
  // 正常条形码预览100*60
  import middlePrint from 'commponent/quickPrinting/commponent/middlePrint'
  // 正常条形码预览70*40
  import samllPrint from 'commponent/quickPrinting/commponent/samllPrint'
  // 辅料条码预览70*40
  import quickAuxiliarySamllPrint from 'commponent/quickPrinting/commponent/quickAuxiliarySamllPrint'
  // 辅料条码预览100*60
  import quickAuxiliaryMiddlePrint from 'commponent/quickPrinting/commponent/quickAuxiliaryMiddlePrint'
  // 辅料条码预览100*70
  import quickAuxiliaryLargePrint from 'commponent/quickPrinting/commponent/quickAuxiliaryLargePrint'
  // 引入公共方法
  import Interface from 'api/Interface.js'
  // vuex语法糖
  import {mapMutations} from 'Vuex'

  export default {
    name: 'quickPrinting',
    data(){
      return {
        // 搜索送货单号
        form: {
          deliveryNumber: '',
          // 打印条码尺寸
          PrintSize:''
        },
        // 表格
        tableData: [],
        // 显示类型
        PrintType: "",
        // 表格选中列表
        selectList: [],
        // 筛选后辅料列表
        LoadChoiceList: [],
        // 筛选前的列表
        LoadChoiceListBefore:[],
        // 辅料筛选状态
        LoadChoiceType: false
      }
    },
    filters: {
      filtersIsAccessory(val) {
        if (val == 0) {
          return '否'
        } else {
          return '是'
        }
      }
    },
    mounted(){
      // 清除打印列表缓存
      this.changeBarCodeList([])
    },
    methods: {
      ...mapMutations(['changeBarCodeList']),
      // 获取条码列表
      getList(){
        // 获取物料编码接口
        const params = {
          search: this.form.deliveryNumber
        }
        // 清除缓存
        this.tableData = []
        this.LoadChoiceList=[]
        axios.post(config.api, '/barcode/getQuickBarcodeList.do', params).then((res) => {
          if (res.status == 0) {
            let _this = this
            // 筛选前的列表
            _this.LoadChoiceListBefore=res.data
            // 过滤
            var array = [];
            for (var i = 0; i < res.data.length; i++) {
              if (array.indexOf(res.data[i].productNumber) === -1) {
                // 过滤重复
                array.push(res.data[i].productNumber)
                // 显示和筛选列表(默认显示辅料)
                if(res.data[i].isAccessoryLabel == 1){
                  _this.tableData.push(res.data[i])
                }
                _this.LoadChoiceList.push(res.data[i])
              }
            }
          } else {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      // 选中那些标签
      handleSelectionChange(val){
        this.selectList = val
      },
      // 辅料筛选
      LoadChoice(){
        this.LoadChoiceType = !this.LoadChoiceType
        let _this = this
        // 存储备份
        let a = this.LoadChoiceList
        // 清除缓存列表
        this.tableData = []
        // 如果筛选辅料
        if (_this.LoadChoiceType) {
          a.map((item) => {
            // 辅料
            if (item.isAccessoryLabel == 0) {
              _this.tableData.push(item)
            }
          })
        } else {
          a.map((item) => {
            // 不是辅料
            if (item.isAccessoryLabel == 1) {
              _this.tableData.push(item)
            }
          })
        }

      },
      // 打印
      printLoad(){
        //  isAccessoryLabel=0是正常标签，1是辅料标签  PrintSize是打印的尺寸
        if (this.selectList[0].isAccessoryLabel == 0) {
          if(this.form.PrintSize=='large'){
            this.PrintType = "label"
          }else if(this.form.PrintSize=='middle'){
            this.PrintType = "secondary"
          }else{
            this.PrintType = "samll"
          }
        } else {
          if(this.form.PrintSize=='large'){
            this.PrintType = "auxiliaryLarge"
          }else if(this.form.PrintSize=='middle'){
            this.PrintType = "auxiliaryMiddle"
          }else{
            this.PrintType = "auxiliarySamll"
          }
        }

        // 给后台发送选择的标签和已经筛选过的标签，后台返回打印列表
        const params={
          productNumberList:this.selectList,
          barcodeDetailVoList:this.LoadChoiceListBefore
        }
        axios.post(config.api, '/barcode/matchingBarcodeList.do', params).then((res) => {
          if (res.status == 0) {
            this.changeBarCodeList(res.data)
          } else {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })

        // 字数省略
        setTimeout(function () {
          Interface.Font_Max('guige', 18)
          Interface.Font_Max('pinming', 24)
        }, 700)
      }
    },
    components: {
      labelPrinting,
      middlePrint,
      samllPrint,
      quickAuxiliarySamllPrint,
      quickAuxiliaryMiddlePrint,
      quickAuxiliaryLargePrint
    }
  }
</script>

<style lang='stylus' scoped>
  .duickPrintWarp
    margin-top: 20px;
    display flex
    justify-content space-between
    .duickPrintLeft
      width 600px
      height: 700px;
      .duickPrintChoice
        width 600px;



    .redColor
      color:red


</style>
