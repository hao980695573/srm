<template>
  <div>
    <!--搜索-->
    <div class='inquiry_warp'>
      <el-form ref="screen_data" :model="screen_data" label-width="80px" :inline="true" size='mini' >
        <el-form-item label="采购单号">
          <div class='line_item'>
            <el-input v-model="screen_data.purchaseOrderStart"></el-input> - <el-input v-model="screen_data.purchaseOrderEnd"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="送货单号">
          <div class='line_item'>
            <el-input v-model="screen_data.deliveryNumberStart"></el-input> - <el-input v-model="screen_data.deliveryNumberEnd"></el-input>
          </div>
        </el-form-item>
        <el-form-item label="送货日期">
          <el-date-picker
            v-model="screen_data.deliveryDate"
            type="daterange"
            align="right"
            unlink-panels
            style='width:220px'
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format='yyyy-MM-dd'
            @change='changeDate'
          >
          </el-date-picker>
        </el-form-item>
        <div>
          <el-form-item label="品号">
            <el-input v-model="screen_data.productNumber"></el-input>
          </el-form-item>
          <el-form-item label="品名">
            <el-input v-model="screen_data.productName"></el-input>
          </el-form-item>
          <el-form-item label="供应商">
            <el-select   v-model="screen_data.erpno"  value-key="uuid" filterable placeholder="请选择厂商" style='width:200px;' >
              <el-option
                label="请选择"
                value="">
              </el-option>
              <el-option
                v-for="item in options"
                :key="item.uuid"
                :label="item.companyName"
                :value="item.erpno">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class='Fuzzy' @click='getTable'>搜索</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>

    <!--表格-->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      size="mini"
      min-height="400"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
    >
      <el-table-column
        type="index"
        align='center'
        width="50">
      </el-table-column>
      <el-table-column
        label="送货日期"
        align='center'
        show-overflow-tooltip
        width="130">
        <template slot-scope="scope">
          <span>{{scope.row.deliveryDate|filtersDate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="排程日期"
        align='center'
        show-overflow-tooltip
        width="130">
        <template slot-scope="scope">
          <span>{{scope.row.planTime|filtersDate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="deliveryNumber"
        label="送货单号"
        align='center'
        show-overflow-tooltip
        width="170">
      </el-table-column>
      <el-table-column
        prop="purchaseOrder"
        label="采购单号"
        align='center'
        show-overflow-tooltip
        width="170">
      </el-table-column>
      <el-table-column
        label="品号"
        align='center'
        width="170">
        <template slot-scope="scope">
          <span>{{scope.row.productNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="productName"
        label="品名"
        align='center'
        min-width="200">
      </el-table-column>
      <el-table-column
        label="是否赠品"
        align='center'
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.isGift|filtersGift}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="送货数量"
        align='center'
        width="120">
        <template slot-scope="scope">
          <span>{{scope.row.quantity}}</span>
        </template>
      </el-table-column>
    </el-table>
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
    name:'deliveryReport',
    data(){
      return{
        screen_data:{
          //采购单号开始
          purchaseOrderStart:'',
          purchaseOrderEnd:'',
          // 送货单号
          deliveryNumberStart:'',
          deliveryNumberEnd:'',
          // 送货日期
          deliveryDate:'',
          deliveryDateStart:'',
          deliveryDateEnd:'',
          // 品号
          productNumber:'',
          // 品名
          productName:'',
          // 供应商代号
          erpno:'',
        },
        // 厂商列表
        options:[],
        // 表单展示
        tableData:[],
        loading: false
      }
    },
    mounted(){
      // 获取厂商
      this.getList()
    },
    filters: {
      filtersDate(val) {
        if (val) {
          return Interface.renderTime(val).slice(0, 10)
        }
      },
      filtersGift(val){
        if (val==0) {
          return '否'
        }else{
          return '是'
        }
      }
    },
    computed: {
      // 获取 uuid 角色身份
      ...mapState(['supplierUUid']),
    },
    methods:{
      // 送货日期拆分
      changeDate() {
        if (this.screen_data.deliveryDate != null) {
          this.screen_data.deliveryDateStart = this.screen_data.deliveryDate[0]
          this.screen_data.deliveryDateEnd = this.screen_data.deliveryDate[1]
        } else {
          this.screen_data.deliveryDateStart = ''
          this.screen_data.deliveryDateEnd = ''
        }
      },
      // 获取厂商列表
      getList() {
        const params = {
          uuid:this.supplierUUid,
          // 条数
          pageSize: 1000,
          // 当前页码
          pageNum: 1
        }
        axios.post(config.api, '/supplier/getSupplierList.do', params).then((res) => {
          // 赋值档案列表
          if(res.status==0){
            this.options = res.data
            // 默认选中
            for(let i=0;i<this.options.length;i++){
              if(this.options[i].uuid==this.supplierUUid){
                this.screen.erpno=this.options[i]
              }
            }
          }else{
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      // 获取表单
      getTable(){
        const params = {
          //采购单号开始
          purchaseOrderStart:this.screen_data.purchaseOrderStart,
          purchaseOrderEnd:this.screen_data.purchaseOrderEnd,
          // 送货单号
          deliveryNumberStart:this.screen_data.deliveryNumberStart,
          deliveryNumberEnd:this.screen_data.deliveryNumberEnd,
          // 送货日期
          deliveryDateStart:this.screen_data.deliveryDateStart,
          deliveryDateEnd:this.screen_data.deliveryDateEnd,
          // 品号
          productNumber:this.screen_data.productNumber,
          // 品名
          productName:this.screen_data.productName,
          // 供应商代号
          erpno:this.screen_data.erpno,
        }
        this.loading = true
        axios.post(config.api, '/delivery/deliveryReport.do', params).then((res) => {
          // 赋值档案列表
          this.tableData = res.data
          if(res.data.length>0){
            // 总条数
            this.totalNum = res.data[0].totalNum
          }
          this.loading = false
        })

      }
    }
  }
</script>

<style lang='stylus' scoped>
  .inquiry_warp
    width: 100%;
    margin-top 20px;
    padding-top: 10px;
    margin-bottom: 10px;
    .line_item
      display flex
      justify-content space-between

</style>
