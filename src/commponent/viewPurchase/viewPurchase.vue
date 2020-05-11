<template>
  <div>
    <!--显示订单基础信息-->
    <div class='baseWarp'>
      <div class='headerWarp'>
        <el-form ref="form" :model="form" label-width="80px" size="mini" label-position="right">
          <el-row>
            <el-col :span="8">
              <el-form-item label="采购日期">
                <el-date-picker
                  style='width: 100%'
                  v-model="form.purchaseDate"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="采购单号">
                <el-input v-model="form.purchaseOrder"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="供货商">
                <el-input v-model="form.supplierName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="采购员">
                <el-input v-model="form.purchaseUserName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="使用部门">
                <el-input v-model="form.useOfDepartmentName"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <!--表格-->
    <el-table
      :data="form.orderProductList"
      border
      style="width: 100%"
      size="mini"
      height='610'
    >
      <el-table-column
        type="index"
        align='center'
        width="50">
      </el-table-column>
      <el-table-column
        prop="productName"
        label="品名"
        align='center'
        show-overflow-tooltip
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="productNumber"
        label="品号"
        align='center'
        show-overflow-tooltip
        min-width="80">
      </el-table-column>
      <el-table-column
        label="单价"
        align='center'
        width="130">
        <template slot-scope="scope">
          <span>{{scope.row.price|filterPrice}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="summary"
        label="摘要"
        align='center'
        show-overflow-tooltip
        min-width="100">
      </el-table-column>
      <el-table-column
        label="数量"
        align='center'
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.count|filterCount}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="unit"
        label="单位"
        align='center'
        width="80">
      </el-table-column>
      <el-table-column
        prop="specification"
        label="规格"
        align='center'
        show-overflow-tooltip
        width="130">
      </el-table-column>
      <el-table-column
        label="总价"
        align='center'
        width="120">
        <template slot-scope="scope">
          <span>{{scope.row.totalAmount|filtertotalAmount}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align='center'
        width="70">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini" @click='enterScheduling(scope)'>
            排程
          </el-button>
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
  import Interface from "api/Interface";
  // Vuex语法糖
  import {mapState,mapMutations} from 'Vuex'

  export default {
    name:'viewPurchase',
    data(){
      return{
        // 加载loading
        loading:false,
        // 订单基础信息
        form:{
          // 采购日期
          purchaseDate:'',
          // 采购单号
          purchaseOrder:'',
          // 供货商名称
          supplierName:'',
          // 采购员
          purchaseUserName:'',
          // 使用部门
          useOfDepartmentName:'',
          // 表格详情
          orderProductList:[
            {
              // 采购日期
              purchaseDate:'2019-12-21',
              // 采购订单
              purchaseOrder:'PO19051321',
              // 供货商名称
              supplierName:'东莞市广正模具塑胶有限公司',
              // 品号
              productNumber:'PO19051321',
              // 品名
              productName:'基本防尘网自带背胶',
              // 规格
              specification:'大大所多撒大所多撒大多多大多阿阿斯达撒多斯达',
              // 订单数量
              count:'112221',
              // 单位
              unit:'阿达啊',
              // 单价
              price:'112',
              // 状态
              status:'已完成'
            }
          ]
        },
      }
    },
    computed:{
      ...mapState(['uuid'])
    },
    mounted(){
      // 获取详情信息
      this.getList()
    },
    filters:{
      // 单价
      filterPrice:function(val){
        if(val){
          return Interface.Remainder(val)
        }
      },
      // 数量
      filterCount:function(val){
        if(val){
          return Interface.Remainder(val)
        }
      },
      // 总价
      filtertotalAmount:function (val) {
        if(val){
          return Interface.Remainder(val)
        }

      }
    },
    methods:{
      // 排程订单 排程uuid 排程总数量
      ...mapMutations(['changePurchaseOrder','changeProductUuid','changeOrderCount']),
      getList(){
        // 获取详情信息
        const params={
          uuid:this.uuid
        }
        axios.post(config.api, '/procurement/getOrderDetail.do', params).then((res) => {
          console.log(res);
          if(res.status==0){
            this.form=res.data
          }
        })
      },
      // 进入排程
      enterScheduling(scope){
        // 改变公共订单状态
        this.changePurchaseOrder(this.form.purchaseOrder)
        // 改变排程产品公用uuid
        this.changeProductUuid(scope.row.uuid)
        // 改变排程总数量
        this.changeOrderCount(scope.row.count)
        // 跳转页面 改变公共uuid
        this.$router.push('addOrderScheduling')
      }
    }
  }
</script>

<style lang='stylus' scoped>
  // 表格样式
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }



  .baseWarp
    width 100%
    border-bottom:1px solid #DDD;
  .headerWarp
    width 60%
</style>
