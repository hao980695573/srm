<template>
  <div>
    <!--送货排程 头部标题-->
    <div class='contacTitleWarp' style='margin-top:20px;'>
      <!--标题-->
      <div class='contacTitle'>送货排程</div>
      <!--新增-->
      <div class='contacTitleButton'>
        <el-button type="primary" size="mini" @click='addDeliveryShow' :disabled='orderOneDate==""'>新增</el-button>
      </div>
    </div>
    <!--表格-->
    <el-table
      :data="deLiveryForm"
      border
      style="width: 100%;margin-bottom: 20px;"
      height='400px'
      size='mini'
      show-summary
    >
      <el-table-column
        type="index"
        align='center'
        width="50">
      </el-table-column>
      <el-table-column
        prop="quantity"
        label="数量"
        align='center'
        min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.quantity|filterQuantity}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="日期"
        align='center'
        min-width="130">
        <template slot-scope="scope">
          <span>{{scope.row.planTime|filterPlanTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align='center'
        width="130">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small">
            申请调整
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--新增送货排程-->
    <el-dialog title="新增送货排程" :visible.sync="DeliveryShow" width='600px'>
      <el-form ref='addLeiveryList' :model="addLeiveryList" :rules="rules"  size='mini'>
        <el-form-item label="需求总数量">
          <el-input placeholder="无数据" disabled v-model='filterOrderCount'></el-input>
        </el-form-item>
        <el-form-item label="可排程数量">
          <el-input placeholder="请选择时间" disabled v-model='deliveryNumber'></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="10">
            <el-form-item label="数量" prop="quantity">
              <el-input v-model="addLeiveryList.quantity" placeholder="请输入数量" :disabled="deliveryNumber=='0.00'||deliveryNumber=='请选择时间'"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset='4'>
            <el-form-item label="时间" prop='planTime'>
              <el-date-picker
                style='width:100%'
                v-model="addLeiveryList.planTime"
                type="date"
                value-format='yyyy-MM-dd'
                :picker-options="pickerOptions"
                placeholder="选择日期"
                @change='changeDate'
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!--确定按钮-->
      <div class='bth'>
        <el-button type="primary" size='mini' @click='addSure' :disabled="deliveryNumber=='0.00'||deliveryNumber=='请选择时间'">确定</el-button>
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
  import Interface from "api/Interface";
  // Vuex语法糖
  import {mapState} from 'Vuex'

  export default {
    name:'addLeivery',
    data(){
      var numberCompare = (rule, value, callback) => {
        let rest = /^[0-9]*[1-9][0-9]*$/
        if (value === '') {
          callback(new Error('请输入数量'));
        } else if (!rest.test(value)) {
          callback(new Error('只能填写整数'));
        } else if (Number(value) > this.deliveryNumber) {
          callback(new Error('排程数量大于总数量'));
        } else {
          callback();
        }
      }
      return{
        // 显示新增送货排程
        DeliveryShow:false,
        // 送货排程表格数据
        deLiveryForm:[],
        // 新增送货排程数据
        addLeiveryList: {
          // 数量
          quantity: '',
          // 时间
          planTime: ''
        },
        // 送货排程还可以继续提交数量
        deliveryNumber:'请选择时间',
        // 禁用送货排程的日期
        avaiableDate:'',
        // 禁用送货排程选择日期
        pickerOptions:{
          disabledDate: (time) => {
              if(this.avaiableDate==""){
                return time.getTime() < Date.parse(this.orderOneDate)- 3600 * 1000 * 24
              }else{
                return time.getTime() < Date.parse(this.avaiableDate)
              }
          }
        },
        // 校验
        rules:{
          quantity:[{validator: numberCompare,required: true, trigger: 'blur'}],
          planTime:[{required: true, message: '请选择日期', trigger: 'change'}]
        }
      }
    },
    computed: {
      ...mapState(['purchaseOrder','orderCount','productUuid','orderOneDate']),
      // 需求总数
      filterOrderCount:function(){
        return Interface.Remainder(this.orderCount).slice(0, 10)
      }
    },
    filters:{
      // 送货订单排程数量
      filterQuantity:function(val){substring
        if(val){
          return Interface.Remainder(val)
        }
      },
      // 送货订单排程日期
      filterPlanTime:function(val){
        if(val){
          return Interface.renderTime(val).slice(0, 10)
        }
      }
    },
    mounted(){
      // 获取送货排程表格数据
      this.getDelivery()
    },
    methods:{
      // 点击新增送货排程
      addDeliveryShow(){
        this.DeliveryShow = true
      },
      // 当日期改变时，获取可以送货订单可排程数量
      changeDate(val){
        this.$refs['addLeiveryList'].clearValidate('quantity')
        const params={
          purchaseOrder:this.purchaseOrder,
          uuid:this.productUuid,
          createDate:val
        }
        axios.post(config.api,'/delivery/getMaxDeliveryCount.do',params).then((res) => {
          console.log(res.data);
          if (res.status == 0) {
            if(res.data>0){
              this.deliveryNumber=res.data
            }else{
              this.deliveryNumber="0.00"
            }
          }
        })
      },
      // 确定新增送货排程
      addSure(){
        this.$refs['addLeiveryList'].validate((valid) => {
          if (valid) {
            const params={
              quantity: this.addLeiveryList.quantity,
              planTime: this.addLeiveryList.planTime,
              purchaseOrder: this.purchaseOrder,
              orderCount:this.orderCount,
              productUuid: this.productUuid
            }
            axios.post(config.api,'/delivery/saveDeliveryPlan.do',params).then((res) => {
              console.log(res);
              if (res.status == 0) {
                this.$alert(res.msg,{
                  confirmButtonText:'确定',
                  center:true,
                  callback: action => {
                    //清除新增送货排程数据
                    this.deliveryNumber='请选择时间'
                    this.$refs["addLeiveryList"].resetFields()
                    // 隐藏新增排程送货
                    this.DeliveryShow = false
                    // // 重新获取送货排程数据
                    this.getDelivery()
                  }
                });
              }
            })
          }
        })
      },
      // 获取送货排程表格数据
      getDelivery(){
        const params={
          uuid:this.productUuid,
          purchaseOrder:this.purchaseOrder
        }
        axios.post(config.api, '/delivery/getDeliveryPlanList.do', params).then((res) => {
          if(res.status==0){
            this.deLiveryForm=res.data
            // 存入禁用日期
            if(res.data.length>0){
              this.avaiableDate=Interface.renderTime(res.data[res.data.length-1].planTime).slice(0,10)
            }
          }
        })
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .contacTitleWarp
    width 100%
    height 45px;
    background #c9c9c9;
    position relative
    .contacTitle
      width 130px;
      line-height 45px;
      font-size 16px;
      text-align center
      position absolute
      left 50%;
      margin-left: -80px;
    .contacTitleButton
      position absolute
      right 100px;
      top: 10px;
      font-size 15px

  /*确定按钮*/
  .bth
    width 100%
    display flex
    justify-content center
    align-items center
</style>
