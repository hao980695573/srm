<template>
  <div>
    <!--面包屑导航-->
    <div class='navWrp'>
      <el-breadcrumb>
        <el-breadcrumb-item :to="{ path: '/purchase/viewPurchase' }">采购订单详情</el-breadcrumb-item>
        <el-breadcrumb-item>排程详细</el-breadcrumb-item>
      </el-breadcrumb>
      <!--订单总览-->
    </div>
    <!--订单排程 头部标题-->
    <div class='contacTitleWarp'>
      <!--标题-->
      <div class='contacTitle'>订单排程</div>
      <!--新增-->
      <div class='contacTitleButton'>
        <el-button type="primary" size="mini" @click='addShow'>新增</el-button>
      </div>
    </div>
    <!--表格-->
    <el-table
      :data="form"
      border
      style="width: 100%"
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
    <!--新增订单排程-->
    <el-dialog title="新增订单排程" :visible.sync="orderShow" width='600px'>
      <el-form ref='addOrderList' :model="addOrderList" :rules="rules"  size='mini'>
        <el-form-item label="需求总数量">
          <el-input placeholder="无数据" disabled v-model='filterOrderCount'></el-input>
        </el-form-item>
        <el-form-item label="可排程数量">
          <el-input placeholder="无数据" disabled v-model='ContinueNumber'></el-input>
        </el-form-item>
        <el-row>
          <el-col :span="10">
            <el-form-item label="数量" prop="quantity">
              <el-input v-model="addOrderList.quantity" placeholder="请输入数量" :disabled='ContinueNumber=="0.00"'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10" :offset='4'>
            <el-form-item label="时间" prop='planTime'>
              <el-date-picker
                style='width:100%'
                v-model="addOrderList.planTime"
                type="date"
                value-format='yyyy-MM-dd'
                :disabled='ContinueNumber=="0.00"'
                :picker-options="pickerOptions"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <!--确定按钮-->
      <div class='bth'>
        <el-button type="primary" size='mini' @click='addSure' :disabled='ContinueNumber=="0.00"'>确定</el-button>
      </div>
    </el-dialog>

    <!--送货排程-->
    <addLeivery></addLeivery>

  </div>
</template>

<script>
  // 引入公共配置
  import {config} from 'api/config.js';
  //引入接口文件请求文件
  import axios from 'api/axios.js'
  // 引入公共方法
  import Interface from "api/Interface";
  // 引入送货订单模块
  import addLeivery from 'commponent/addOrderScheduling/commponent/addLeivery'
  // Vuex语法糖
  import {mapState,mapMutations} from 'Vuex'

  export default {
    name: 'addOrderScheduling',
    data() {
      var numberCompare = (rule, value, callback) => {
        let rest = /^[0-9]*[1-9][0-9]*$/
        if (value === '') {
          callback(new Error('请输入数量'));
        }else if (!rest.test(value)) {
          callback(new Error('只能填写整数'));
        }else if (Number(value)>this.ContinueNumber) {
          callback(new Error('排程数量大于总数量'));
        }else{
          callback();
        }
      };
      return {
        // 显示新增订单排程
        orderShow: false,
        // 订单排程表格数据
        form: [],
        // 新增订单排程数据
        addOrderList: {
          // 数量
          quantity: '',
          // 时间
          planTime: ''
        },
        // 订单排程计算后台已提交的数量
        totalNumber:0,
        // 订单排程还可以继续提交数量
        ContinueNumber:0,
        // 禁用送货排程的日期
        avaiableDate:'',
        // 禁用送货排程选择日期
        pickerOptions:{
          disabledDate: (time) => {
              return time.getTime() < Date.parse(this.avaiableDate)
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
      ...mapState(['purchaseOrder','orderCount','productUuid']),
      // 需求总数
      filterOrderCount:function(){
        return Interface.Remainder(this.orderCount).slice(0, 10)
      },
    },
    mounted() {
      // 获取订单排程数据
      this.getList()
    },
    filters:{
      // 订单排程数量
      filterQuantity:function(val){
        if(val){
          return Interface.Remainder(val)
        }
      },
      // 订单排程日期
      filterPlanTime:function(val){
        if(val){
          return Interface.renderTime(val).slice(0, 10)
        }
      }
    },
    methods: {
      ...mapMutations(['changeOrderOneDate']),
      // 点击新增订单排程
      addShow() {
        this.orderShow = true
      },
      // 获取订单排程数据
      getList() {
          const params={
            uuid:this.productUuid,
            purchaseOrder:this.purchaseOrder
          }
          axios.post(config.api, '/procurement/getOrderAllPlan.do', params).then((res) => {
            if(res.status==0){
              this.form=res.data
              // 新增数量不能大于已提交的总数和需求总数
              let _this=this
              // 还可以提交数量清空，还可以继续提交数量清空
              _this.totalNumber=0
              _this.ContinueNumber=0
              // 遍历获取已提交总数
              res.data.map(function(item){
                _this.totalNumber+=Number(item.quantity)
              })
              _this.totalNumber=Interface.Remainder(_this.totalNumber)
              // 可以继续提交的数量 (总数-已提交数)
              _this.ContinueNumber=Interface.Remainder(Interface.Remainder(this.orderCount) - _this.totalNumber)
              // 存储第一个订单日期
              this.changeOrderOneDate('')
              if(res.data[0]){
                this.changeOrderOneDate(Interface.renderTime(res.data[0].planTime).slice(0,10))
              }
              // 获取最后一个订单日期
              if(res.data.length>0){
                this.avaiableDate=Interface.renderTime(res.data[res.data.length-1].planTime).slice(0,10)
              }
            }
          })
        },
      // 确定新增订单排程
      addSure() {
        this.$refs['addOrderList'].validate((valid) => {
          if (valid) {
            const params = {
              quantity: this.addOrderList.quantity,
              planTime: this.addOrderList.planTime,
              purchaseOrder: this.purchaseOrder,
              orderCount:this.orderCount,
              productUuid: this.productUuid
            }
            console.log(params)
            axios.post(config.api,'/procurement/saveOrderPlan.do',params).then((res) => {
              console.log(res);
              if (res.status == 0) {
                this.$alert(res.msg,{
                  confirmButtonText:'确定',
                  center:true,
                  callback: action => {
                    //清除新增数据
                    this.$refs["addOrderList"].resetFields()
                    // 隐藏新增
                    this.orderShow = false
                    // 重新获取数据
                    this.getList()
                  }
                });
              }
            })
          }
        })
      },
    },
    components:{
      addLeivery
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

  .navWrp
    width 400px;
    font-size 14px
    margin 15px 0px;

  /*确定按钮*/
  .bth
    width 100%
    display flex
    justify-content center
    align-items center
</style>
