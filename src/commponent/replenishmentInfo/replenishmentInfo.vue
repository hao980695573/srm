<template>
  <div>
    <div id="Printing">
      <!--显示订单基础信息-->
      <div class='baseWarp'>
        <div class='headerWarp'>
          <el-form ref="form" :model="form" label-width="80px" size="mini" label-position="right" :inline="true">
            <el-form-item label="补货单号">
              <el-input v-model="form.rmNumber" readonly></el-input>
            </el-form-item>
            <el-form-item label="创建日期">
              <el-date-picker
                style='width: 100%'
                v-model="form.createDate"
                type="date"
                readonly
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <div>
              <el-form-item label="收货单位">
                <el-input v-model="form.receivingUnit" readonly></el-input>
              </el-form-item>
              <el-form-item label="操作人">
                <el-input v-model="form.operatorName" readonly style='width:189px'></el-input>
              </el-form-item>
              <el-button type="primary" size='mini' style='margin-left:20px;' @click='saveData'>保存</el-button>
            </div>

          </el-form>
        </div>
      </div>
      <!--表格-->
      <el-table
        :data="form.rmProductList"
        border
        style="width: 100%"
        size="mini"
        @row-dblclick='changeData'
        height='610'
      >
        <el-table-column
          align='center'
          type="index"
          width="50">
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
        <el-table-column
          label="退货单号"
          align='center'
          show-overflow-tooltip
          width="140">
          <template slot-scope="scope">
            <span>{{scope.row.psNo}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="补货单号"
          align='center'
          show-overflow-tooltip
          width="140">
          <template slot-scope="scope">
            <span>{{scope.row.rmNumber}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="创建日期"
          align='center'
          width="110">
          <template slot-scope="scope">
            <span>{{scope.row.createDate|filtersDate}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="品名"
          align='center'
          show-overflow-tooltip
          min-width="130">
          <template slot-scope="scope">
            <span>{{scope.row.productName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="productNumber"
          label="品号"
          align='center'
          width="120">
        </el-table-column>
        <el-table-column
          prop="whName"
          label="仓库名称"
          align='center'
          width="110">
        </el-table-column>
        <el-table-column
          prop="wh"
          label="仓位"
          align='center'
          width="90">
        </el-table-column>
        <el-table-column
          label="单位"
          align='center'
          show-overflow-tooltip
          width="80">
          <template slot-scope="scope">
            <span>{{scope.row.unit}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="数量"
          align='center'
          show-overflow-tooltip
          width="100">
          <template slot-scope="scope">
            <span v-if='quantityFalse'><el-input v-model="scope.row.quantity" onkeyup="this.value=this.value.replace(/[^\d.]/g,'');" size='mini' placeholder="请输入内容"></el-input></span>
            <span v-else>{{scope.row.quantity|filterCount}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="税率"
          align='center'
          show-overflow-tooltip
          width="80">
          <template slot-scope="scope">
            <span>{{scope.row.taxRate}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--打印-->
    <div class='Printing_warp'>
      <el-button type="primary" size='mini' @click='enterPint'>多联打印</el-button>
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
    name:'replenishmentInfo',
    data(){
      return{
        // 基础显示信息
        form:{},
        // 数量输入框是否显示
        quantityFalse:false
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
      filtersDate(val) {
        if (val) {
          return Interface.renderTime(val).slice(0, 10)
        }
      }
    },
    methods: {
      // 双击编辑
      changeData(){
        this.quantityFalse=true
      },
      getList() {
        // 获取详情信息
        const params = {
          uuid: this.uuid
        }
        axios.post(config.api, '/replenishment/getReplenishmentInfo.do', params).then((res) => {
          if (res.status == 0) {
            this.form = res.data
            console.log(this.form)
          } else {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      // 保存修改数据后的数据
      saveData(){
        // 传递对象
        const params = {
          uuid:this.form.uuid,
          rmNumber:this.form.rmNumber,
          rmProductList:this.form.rmProductList
        }
        axios.post(config.api, '/replenishment/editReplenishment.do', params).then((res) => {
          if(res.status==0){
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true,
              callback: action => {
                // 隐藏输入框
                this.quantityFalse=false
                // 重新获取数据
                this.getList()
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
        this.form.rmProductList.map((item,index)=>{
          if(item.uuid==scope.row.uuid){
            this.form.rmProductList.splice(index,1)
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
        // 跳转 (根据id判断是进货详情还是退补货详情)
        this.$router.push('replenishmentPrint')
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .baseWarp
    width 100%
    margin-top 20px;
    margin-bottom:10px;
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
