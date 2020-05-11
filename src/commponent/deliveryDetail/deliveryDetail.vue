<template>
  <div>
    <div id="Printing">
      <!--显示订单基础信息-->
      <div class='baseWarp'>
        <div class='headerWarp'>
          <el-form ref="form" :model="form" label-width="80px" size="mini" label-position="right" :inline="true">
            <el-form-item label="单号">
              <el-input v-model="form.deliveryNumber" readonly></el-input>
            </el-form-item>
            <el-form-item label="日期">
              <el-date-picker
                style='width: 130px;'
                v-model="form.deliveryDate"
                type="date"
                readonly
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="到货日期">
              <el-date-picker
                style='width: 130px;'
                v-model="form.arrivalDate"
                readonly
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <div>
              <el-form-item label="收货单位">
                <el-input v-model="form.receivingUnit" readonly style='width: 190px;'></el-input>
              </el-form-item>
              <el-form-item label="币种" label-width="50px">
                <el-input v-model="form.currency" readonly style='width:90px;'></el-input>
              </el-form-item>
              <el-form-item label="操作人">
                <el-input v-model="form.operatorName" readonly style='width: 130px;'></el-input>
              </el-form-item>
              <el-button type="primary" size='mini' style='margin-left:20px;' @click='saveData'>保存</el-button>
            </div>
          </el-form>
        </div>
      </div>
      <!--表格-->
      <el-table
        :data="form.deliveryProductList"
        border
        style="width: 100%"
        size="mini"
        height='610'
        @row-dblclick='changeData'
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
          v-if='aa'
          min-width="100">
        </el-table-column>
        <el-table-column
          label="排程时间"
          align='center'
          show-overflow-tooltip
          width="150">
          <template slot-scope="scope">
            <span>{{scope.row.planTime|filterDate}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="productNumber"
          label="品号"
          align='center'
          show-overflow-tooltip
          width="150">
        </el-table-column>
        <el-table-column
          label="数量"
          align='center'
          width="140">
          <template slot-scope="scope">
            <span v-if='quantityFalse'><el-input v-model="scope.row.quantity" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" size='mini' placeholder="请输入内容"></el-input></span>
            <span v-else>{{scope.row.quantity|filterCount}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="unit"
          label="单位"
          align='center'
          width="120">
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
          label="是否备品"
          align='center'
          show-overflow-tooltip
          width="100">
          <template slot-scope="scope">
            <span>{{scope.row.isGift|filterisGift}}</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click='remove(scope)'>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--打印-->
    <div class='Printing_warp'>
      <el-button type="primary" size='mini' @click='enterPint'>多联打印</el-button>
      <el-button type="primary" size='mini' @click='enterA4'>A4式打印</el-button>
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
    name:'deliveryDetail',
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
        aa:true,
        // 数量输入框是否显示
        quantityFalse:false,
        // 判断是否删除某行
        removeRow:false
      }
    },
    computed:{
      ...mapState(['uuid'])
    },
    mounted(){
      this.getList()
    },
    filters:{
      // 取小数点后几位
      filterCount:function(val){
        if(val){
          return Interface.Remainder(val)
        }
      },
      filterisGift:function (val) {
        if(val==0){
          return '否'
        }else{
          return '是'
        }
      },
      // 日期转换
      filterDate: function (val) {
        if (val) {
          return Interface.renderTime(val).slice(0, 10)
        }
      },
    },
    methods:{
      a(){
        this.aa=!this.aa
      },
      getList(){
        // 获取详情信息
        const params={
          uuid:this.uuid
        }
        axios.post(config.api, '/delivery/getDeliveryShowBp.do', params).then((res) => {
          if(res.status==0){
            this.form=res.data
          }else{
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      // 双击编辑
      changeData(){
        this.quantityFalse=true
      },
      // 保存修改数据后的数据
      saveData(){
        // 传递对象
        const params = {
          deliveryDate: this.form.deliveryDate,
          arrivalDate: this.form.arrivalDate,
          // 收货单位
          receivingUnit: this.form.receivingUnit,
          currency: this.form.currency,
          deliveryProductList: this.form.deliveryProductList,
          // 送货单
          deliveryNumber:this.form.deliveryNumber,
          uuid:this.form.uuid
        }
        axios.post(config.api, '/delivery/editDelivery.do', params).then((res) => {
          if(res.status==0){
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true,
              callback: action => {
                // 隐藏输入框
                this.quantityFalse=false
                // 重新获取数据
                this.getList()
                // 取消删除后的标志
                this.removeRow=false
              }
            })
          }else{
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true,
              callback: action => {
                // 重新获取数据
                this.getList()
              }
            })
          }
        })

      },
      // 删除某行
      remove(scope){
        this.form.deliveryProductList.map((item,index)=>{
          if(item.uuid==scope.row.uuid){
            this.form.deliveryProductList.splice(index,1)
            // 设置删除后的标志
            this.removeRow=true
          }
        })
      },
      // 多联打印
      enterPint(){
        // 判断是否删除后没保存
        if(this.removeRow||this.quantityFalse){
          this.$alert('修改后请保存', {
            confirmButtonText: '确定',
            center: true
          })
          return
        }
        // 跳转
        this.$router.push('deliveryPrint')
      },
      // A4打印
      enterA4(){
        // 判断是否删除后没保存
        if(this.removeRow||this.quantityFalse){
          this.$alert('修改后请保存', {
            confirmButtonText: '确定',
            center: true
          })
          return
        }
        // 跳转
        this.$router.push('deliveryPrintA4')
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .baseWarp
    width 100%
    margin-top:20px;

  .headerWarp
    width 80%
  .Printing_warp
    width 100%
    height:40px
    margin-top 20px;
    display flex
    justify-content center
    align-items center
</style>
