<template>
  <div>
    <!--搜索-->
    <div class='inquiry_warp'>
      <el-form ref="screen_data" :model="screen_data" label-width="80px" :inline="true" size='mini'>
        <el-form-item label="送货单号">
          <el-input v-model="screen_data.deliveryNumber" placeholder="请输入送货单号" @keyup.enter.native='getList'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class='Fuzzy' @click='getList'>搜索</el-button>
        </el-form-item>
        <el-form-item label="送检单号">
          <el-input v-model="tiNo" placeholder="请输入送货单号"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <!--显示订单基础信息-->
    <div class='baseWarp'>
      <div class='headerWarp'>
        <el-form ref="form" :model="form" label-width="80px" size="mini" label-position="right" :inline="true">
          <el-form-item label="进货日期">
            <el-date-picker
              style='width: 100%'
              v-model="form.deliveryDate"
              type="date"
              readonly
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="送检日期">
            <el-date-picker
              style='width: 100%'
              v-model="arrivalDate"
              value-format='yyyy-MM-dd'
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="收货单位">
            <el-input v-model="form.receivingUnit" readonly></el-input>
          </el-form-item>
          <el-form-item label="供货商">
            <el-input v-model="form.supplierName" readonly></el-input>
          </el-form-item>
          <el-form-item label="币种">
            <el-input v-model="form.currency" readonly></el-input>
          </el-form-item>
          <div>
            <el-form-item label="备注">
              <el-input
                type="textarea"
                :rows="2"
                style='width:470px'
                placeholder="请输入内容"
                resize="none"
                v-model="form.remark">
              </el-input>
            </el-form-item>
            <!--保存-->
            <el-form-item class='save'>
              <el-button type="primary" size="small" @click='saveBth' :disabled='tableData.length=="0"'>保存</el-button>
            </el-form-item>
          </div>


        </el-form>
      </div>
    </div>
    <!--表格-->
    <el-table :data="tableData" style="width: 100%"
              border
              v-loading.fullscreen.lock="fullscreenLoading"
              element-loading-background="rgba(0, 0, 0, 0.8)"
              height='415'
              size='mini'
    >
      <el-table-column
        align="center"
        type="index"
        width="55">
      </el-table-column>
      <el-table-column
        align="center"
        prop="productNumber"
        label="品号"
        width='110'>
      </el-table-column>
      <el-table-column
        align="center"
        prop="productName"
        label="品名"
        min-width='170'>
      </el-table-column>
      <el-table-column
        align="center"
        label="是否赠品"
        width='80'>
        <template slot-scope="scope">
          <span>{{scope.row.isGift|filterIsGift}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="仓位"
        width='100'>
        <template slot-scope="scope">
          <input type="text" v-model="scope.row.warehouse" style='width:100%;line-height: 20px;padding-left:5px;box-sizing:border-box;outline: none'>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="送货数量"
        width='130'>
        <template slot-scope="scope">
          <span>{{scope.row.quantity|filtersCount}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="送检数量"
        show-overflow-tooltip
        width='100'>
        <template slot-scope="scope">
          <input type="text" v-model="scope.row.count" style='width:100%;line-height: 20px;padding-left:5px;box-sizing:border-box;outline: none' @blur="watchCount">
          <div style='font-size:9px;color:red' v-show='!CountState&&errIndex==scope.$index'>送检数大于送货数</div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="采购日期"
        show-overflow-tooltip
        width="110">
        <template slot-scope="scope">
          <span>{{scope.row.purchaseDate|filtersDate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="采购单号"
        width='130'>
        <template slot-scope="scope">
          <span>{{scope.row.purchaseOrder}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="单位"
        width='80'>
        <template slot-scope="scope">
          <span>{{scope.row.unit}}</span>
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
  // 引入vuex
  import {mapState} from 'Vuex'

  import moment from 'moment';

  export default {
    name: 'addInspectionSlip',
    data() {
      return {
        screen_data: {
          deliveryNumber: ''
        },
        form: {},
        // 送检日期
        arrivalDate:'',
        // 表格
        tableData: [],
        // 收到数量是否大于送货数量
        CountState:true,
        // 哪个超出数量
        errIndex:'',
        // 保存成功后回显送检单号
        tiNo:'',
        // 禁止重复提交
        submitState:true,
        // 加载图标
        fullscreenLoading:false
      }
    },
    filters:{
      filtersCount:function(val){
        return Interface.Remainder(val)
      },
      filtersDate:function(val){
        if(val){
          return Interface.renderTime(val).slice(0,10)
        }
      },
      filterIsGift(val){
        if(val=='0'){
          return "否"
        }else{
          return '是'
        }
      }
    },
    computed:{
      ...mapState(['userId','username'])
    },
    methods: {
      // 获取列表
      getList() {
        const params = {
          deliveryNumber: this.screen_data.deliveryNumber
        }
        axios.post(config.api, '/stock/getDeliveryDetailByNumber.do', params).then((res) => {
          if (res.status == 0) {
            if(res.data==null){
              this.form = {}
              this.tableData = []
            }else{
              this.form = res.data
              // 针对这两个账户名设置默认仓位
              if(this.username=='11484'){
                res.data.deliveryProductList.map((item)=>{
                  item.warehouse='S06'
                })
              }if(this.username=='00042'){
                res.data.deliveryProductList.map((item)=>{
                  item.warehouse='S05'
                })
              }
              this.tableData = res.data.deliveryProductList
              // 到货日期 判断是今天否是最后一个月并且超过下午2点，是跳到下个月的第一天
              if(moment().format("YYYY-MM-DD HH:mm")>=moment().endOf('month').format("YYYY-MM-DD")+" "+"14:00"){
                // 下个月1号
                this.arrivalDate=moment().month(moment().month() + 1).startOf('month').format("YYYY-MM-DD")
              }else{
                this.arrivalDate=moment().format("YYYY-MM-DD")
              }

              // 后台需要修改对象里的字段值
              res.data.deliveryProductList.map(function (item) {
                item.count = item.quantity
              })
            }
          } else {
            this.$alert(data.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      // 收货数量判断
      watchCount(){
        for(var i=0;i<this.tableData.length;i++){
          if(this.tableData[i].count>this.tableData[i].quantity){
            this.CountState=false
            this.errIndex=i
            break
          }else{
            this.CountState=true
          }
        }
      },
      // 保存
      saveBth() {
        // 是否允许提交
        if(this.submitState) {
          // 禁止重复提交
          this.submitState = false
          // 加载显示
          this.fullscreenLoading = true

          // 校验通过
          if(this.CountState){
            // 改变传过去列表的键
            let _this=this
            this.tableData.map((item)=>{
              item.bilNo=item.purchaseOrder
              // 产品名
              item.prdName=item.productName
              //品号
              item.prdNo=item.productNumber
              // 货品特征
              item.prdMark=item.characteristics
              // 送检数
              item.qty=item.count
              // 项次
              item.itm=item.item
              //库位
              item.wh=item.warehouse
              // 赠品
              if(item.isGift==0){
                item.freeId='false'
              }else if(item.isGift==1){
                item.freeId='true'
              }
              // 送货单号
              item.shNoCus=_this.form.deliveryNumber
              // 产品订单
              item.osNo=item.purchaseOrder
            })

            const params = {
              // 收货单位
              receivingUnit: this.form.receivingUnit,
              // 币种
              currency: this.form.currency,
              // 送货单号
              deliveryNumber:this.form.deliveryNumber,
              // 送检日期
              tiDd:this.arrivalDate,
              // 备注
              rem:this.form.remark,
              // 厂商
              cusNo:this.form.erpno,
              // 送检产品
              tfTiList:this.tableData,
              // 制单人
              usr:this.userId,
              //供应商名字
              companyName:this.form.supplierName,
              uuid:this.form.uuid,
              // 使用部门
              dep:this.tableData[0].useOfDepartmentName,
            }

            axios.post(config.api, '/stock/saveInspectionSlip.do', params).then((res) => {
              // 允许提交
              _this.submitState=true
              // 关闭加载显示
              _this.fullscreenLoading=false

              if (res.status == 0) {
                let _this=this
                // 如果保存成功
                  _this.$alert('保存成功', {
                    confirmButtonText: '确定',
                    center: true,
                    callback: action => {
                      // 清除数据
                      this.form
                      this.form.receivingUnit=''
                      this.form.currency=''
                      this.arrivalDate=''
                      this.form.deliveryDate=''
                      this.screen_data.deliveryNumber=''
                      this.form.erpno=''
                      this.form.remark=''
                      this.form.supplierName=''
                      this.tableData=[]
                      // 填充送检单号
                      this.tiNo=res.data.tiNo
                    }
                  })
              }else{
                this.$alert(res.msg, {
                  confirmButtonText: '确定',
                  center: true
                })
              }
            })
          }
        }

      }
    }
  }
</script>

<style lang='stylus' scoped>
  .inquiry_warp {
    width: 100%;
    margin-top: 20px;
  }

  .baseWarp
    width 100%
    border-bottom: 1px solid #DDD;

  .headerWarp
    width 100%

  .save
    margin-top 8px;
</style>

