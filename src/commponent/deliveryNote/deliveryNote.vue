<template>
  <div>
    <!--显示订单基础信息-->
    <div class='inquiry_warp'>
      <el-form ref="form" :model="form" label-width="80px" size="mini" label-position="right">
        <el-row>
          <el-col :span="4">
            <el-form-item label="日期">
              <el-date-picker
                style='width: 150px'
                v-model="form.deliveryDate"
                type="date"
                disabled
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset='1'>
            <el-form-item label="收货单位">
              <el-input v-model="form.receivingUnit" placeholder="请输入收货单位"  style='width: 200px'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset='2'>
            <el-form-item label="送货日期">
              <el-date-picker
                style='width: 150px;'
                v-model="form.arrivalDate"
                type="date"
                value-format='yyyy-MM-dd'
                placeholder="请选择送货日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item label="币种">
              <el-select v-model="form.currency" placeholder="币种" disabled  style='width: 150px;'>
                <el-option label="人民币" value="RMB"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="4" :offset='1'>
            <el-form-item label="操作人">
              <el-input v-model="username" disabled  style='width: 150px;'></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3" :offset='2'>
            <el-form-item>
              <el-button type="primary" @click='save' size='mini'>保存</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
    </div>
    <!--表格-->
    <el-table
      :data="stateDelivery"
      border
      style="width: 100%"
      size="mini"
      v-loading.fullscreen.lock="fullscreenLoading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      height='550'
    >
      <el-table-column
        type="index"
        align='center'
        width="50">
      </el-table-column>
      <el-table-column
        label="采购日期"
        align='center'
        show-overflow-tooltip
        width="130">
        <template slot-scope="scope">
          <span :class='[{"zhensong":scope.row.isGift==1}]'>{{scope.row.purchaseDate|filtersPurchaseDate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="采购单号"
        align='center'
        show-overflow-tooltip
        width="120">
        <template slot-scope="scope">
          <span :class='[{"zhensong":scope.row.isGift==1}]'>{{scope.row.purchaseOrder}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="供货商"
        align='center'
        min-width="200">
        <template slot-scope="scope">
          <span :class='[{"zhensong":scope.row.isGift==1}]'>{{scope.row.supplierName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="品号"
        align='center'
        show-overflow-tooltip
        min-width="100">
        <template slot-scope="scope">
          <span :class='[{"zhensong":scope.row.isGift==1}]'>{{scope.row.productNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="品名"
        align='center'
        show-overflow-tooltip
        min-width="250">
        <template slot-scope="scope">
          <span :class='[{"zhensong":scope.row.isGift==1}]'>{{scope.row.productName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="规格"
        align='center'
        show-overflow-tooltip
        width="150">
        <template slot-scope="scope">
          <span :class='[{"zhensong":scope.row.isGift==1}]'>{{scope.row.specification}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="是否赠送"
        width='120'>
        <template slot-scope="scope">
          <span :class='[{"zhensong":scope.row.isGift==1}]'>{{scope.row.isGift|filterIsGift}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="单位"
        align='center'
        width="100">
        <template slot-scope="scope">
          <span :class='[{"zhensong":scope.row.isGift==1}]'>{{scope.row.unit}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="收货数量"
        show-overflow-tooltip
        width='130'>
        <template slot-scope="scope">
          <input type="text" v-model="scope.row.deliverableQuantity" style='width:100%;line-height: 20px;padding-left:5px;box-sizing:border-box;outline: none'>
          <div style='font-size:9px;color:red' v-show='scope.row.deliverableQuantity<1'>数量不能为0</div>
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
    name: 'deliveryNote',
    data() {
      return {
        form: {
          // 日期
          deliveryDate: Interface.renderTime(new Date()).slice(0, 10),
          // 收货单位
          receivingUnit: '东莞市广正模具塑胶有限公司',
          // 送货日期
          arrivalDate: Interface.renderTime(new Date()).slice(0, 10),
          // 币种
          currency: 'RMB'
        },
        // 判断数量状态是否为0
        CountState:true,
        // 禁止重复提交
        submitState:true,
        // 加载图标
        fullscreenLoading:false
      }
    },
    computed: {
      ...mapState(['username', 'stateDelivery']),
    },
    filters: {
      filtersPurchaseDate(val) {
        if (val) {
          return Interface.renderTime(val).slice(0, 10)
        }
      },
      filtersQuantity(val) {
        return Interface.Remainder(val)
      },
      filterIsGift(val) {
        if (val == '0') {
          return "否"
        } else {
          return '是'
        }
      },
    },
    methods: {
      // 保存
      save() {
        if(this.submitState){
          // 校验
          this.$refs['form'].validate((valid) => {
            if (valid) {
              // 数量判断，数量不能为零
              for(var i=0;i<this.stateDelivery.length;i++){
                if(this.stateDelivery[i].deliverableQuantity<1){
                  this.CountState=false
                  break
                }else{
                  this.CountState=true
                }
              }
              // 如果数量不为零，正常请求
              if(this.CountState){
                // 禁止重复提交
                this.submitState=false
                // 加载显示
                this.fullscreenLoading=true

                // 后台需要修改对象里的字段值
                this.stateDelivery.map(function (item) {
                  item.quantity = item.deliverableQuantity
                })

                const params = {
                  deliveryDate: this.form.deliveryDate,
                  arrivalDate: this.form.arrivalDate,
                  // 送货单位
                  receivingUnit: this.form.receivingUnit,
                  currency: this.form.currency,
                  erpno: this.stateDelivery[0].erpno,
                  deliveryProductList: this.stateDelivery
                }
                axios.post(config.api, '/delivery/saveDelivery.do', params).then((res) => {
                  // 允许提交
                  this.submitState=true
                  // 关闭加载显示
                  this.fullscreenLoading=false
                  if (res.status == 0) {
                    this.$alert(res.msg, {
                      confirmButtonText: '确定',
                      center: true,
                      callback: action => {
                        this.$router.push('detailed')
                      }
                    })
                  } else {
                    this.$alert(res.msg, {
                      confirmButtonText: '确定',
                      center: true
                    })
                  }
                })
              }
            }
          })
        }
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

  .save_warp
    width 100%
    height 40px;
    display flex
    margin-top 20px;
    justify-content center
    align-items center

  .saveBth
    width 150px;
    line-height 40px;
    text-align center
    background #409EFF
    border: 1px solid #CCC;
    border-radius 10px;
    color: #fff
    cursor pointer

  .zhensong
    color: #409EFF
</style>
