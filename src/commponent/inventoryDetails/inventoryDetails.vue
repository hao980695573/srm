<template>
  <div>
    <div>
      <!--显示订单基础信息-->
      <div class='baseWarp'>
        <div class='headerWarp'>
          <el-form ref="form" :model="form" label-width="80px" size="mini" label-position="right">
            <el-row>
              <el-col :span="9">
                <el-form-item label="单号">
                  <el-input v-model="form.deliveryNumber" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="9">
                <el-form-item label="进货日期">
                  <el-date-picker
                    style='width: 100%'
                    v-model="form.stockDate"
                    readonly
                    type="date"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="币种">
                  <el-input v-model="form.currency" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="11">
                <el-form-item label="收货单位">
                  <el-input v-model="form.receivingUnit" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="7">
                <el-form-item label="经办人">
                  <el-input v-model="form.operatorName" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </div>
      <!--表格-->
      <el-table
        :data="form.stockProductList"
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
          min-width="150">
        </el-table-column>
        <el-table-column
          label="数量"
          align='center'
          min-width="170">
          <template slot-scope="scope">
            <span>{{scope.row.count|filterCount}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="unit"
          label="单位"
          align='center'
          min-width="100">
        </el-table-column>
        <el-table-column
          label="规格"
          align='center'
          show-overflow-tooltip
          min-width="80">
          <template slot-scope="scope">
            <span>{{scope.row.specification}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="仓位"
          width='100'>
          <template slot-scope="scope">
            <span>{{scope.row.warehouse}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="specification"
          label="是否赠品"
          align='center'
          show-overflow-tooltip
          min-width="80">
          <template slot-scope="scope">
            <span>{{scope.row.isGift|filterIsGift}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
    name:'inventoryDetails',
    data(){
      return{
        // 基础显示信息
        form:{
          // 单号
          deliveryNumber:'',
          // 日期
          deliveryDate:'',
          // 预计到货日期
          arrivalDate:'',
          // 收货单位
          receivingUnit:'',
          // 币种
          currency:'',
          // 操作人
          operatorName:'',
          // 表格
          deliveryProductList:[]
        },
      }
    },
    computed:{
      ...mapState(['uuid'])
    },
    mounted(){
      this.getList()
    },
    filters:{
      // 取小数点后4位
      filterCount:function(val){
        if(val){
          return Interface.Remainder(val)
        }
      },
      // 金额后几位
      filterPice: function (val) {
        if (val) {
          return Interface.RemainderPice(val)
        }
      },
      // 是否赠品
      filterIsGift(val){
        if(val=='0'){
          return "否"
        }else{
          return '是'
        }
      }
    },
    methods:{
      getList(){
        // 获取详情信息
        const params={
          uuid:this.uuid
        }
        console.log(params);
        axios.post(config.api, '/stock/getStockInfo.do', params).then((res) => {
          console.log(res);
          if(res.status==0){
            this.form=res.data
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
</script>

<style lang='stylus' scoped>
  .baseWarp
    width 100%
    height 85px;
    padding-top:10px;
    border-bottom:1px solid #DDD;
    background #ddd;
  .headerWarp
    width 60%

  .Printing_warp
    width 100%
    height:40px
    margin-top 20px;
    display flex
    justify-content center
    align-items center
</style>
