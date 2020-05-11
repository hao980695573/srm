<template>
  <div>
    <div id="Printing">
      <!--显示订单基础信息-->
      <div class='baseWarp'>
        <div class='headerWarp'>
          <el-form ref="form" :model="form" size="mini" label-position="right" :inline="true">
            <el-form-item label="退货单号">
              <el-input v-model="form.psno" readonly></el-input>
            </el-form-item>
            <el-form-item label="日期">
              <el-date-picker
                style='width: 100%'
                v-model="form.psdd"
                type="date"
                readonly
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="同步日期">
              <el-date-picker
                style='width: 100%'
                v-model="form.createdate"
                readonly
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <div>
              <el-form-item label="收货单位">
                <el-input v-model="form.cusname" readonly></el-input>
              </el-form-item>
              <el-form-item label="币种">
                <el-input v-model="form.curid" readonly style='width:100%'></el-input>
              </el-form-item>
              <el-form-item label="操作人">
                <el-input v-model="form.usrno" readonly style='width:100%'></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
      </div>
      <!--表格-->
      <el-table
        :data="form.tfPbList"
        border
        style="width: 100%"
        size="mini"
        height='410'
        @row-click="getReplenish"
      >
        <el-table-column
          align='center'
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          label="送货单号"
          align='center'
          show-overflow-tooltip
          width="140">
          <template slot-scope="scope">
            <span :class='scope.row.status=="2"?"":colorRed'>{{scope.row.shnocus}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="单据日期"
          align='center'
          width="110">
          <template slot-scope="scope">
            <span :class='scope.row.status=="2"?"":colorRed'>{{scope.row.psdd|filtersDate}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="订单号"
          align='center'
          show-overflow-tooltip
          width="130">
          <template slot-scope="scope">
            <span :class='scope.row.status=="2"?"":colorRed'>{{scope.row.bilno}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="仓库名称"
          align='center'
          width="110">
          <template slot-scope="scope">
            <span :class='scope.row.status=="2"?"":colorRed'>{{scope.row.whname}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="货品名称"
          align='center'
          min-width="200">
          <template slot-scope="scope">
            <span :class='scope.row.status=="2"?"":colorRed'>{{scope.row.prdname}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="单位"
          align='center'
          show-overflow-tooltip
          width="100">
          <template slot-scope="scope">
            <span :class='scope.row.status=="2"?"":colorRed'>{{scope.row.unit}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="数量"
          align='center'
          show-overflow-tooltip
          width="100">
          <template slot-scope="scope">
            <span :class='scope.row.status=="2"?"":colorRed'>{{scope.row.qty}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="税率"
          align='center'
          show-overflow-tooltip
          width="100">
          <template slot-scope="scope">
            <span :class='scope.row.status=="2"?"":colorRed'>{{scope.row.taxrto}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="补货状态"
          align='center'
          show-overflow-tooltip
          width="100">
          <template slot-scope="scope">
            <span :class='scope.row.status=="2"?"":colorRed'>{{scope.row.status|filtersStatus}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--补货记录-->
    <div class='inquiry_warp'>补货记录</div>
    <!--表格-->
    <el-table
      :data="Replenishment"
      border
      style="width: 100%"
      size="mini"
      height='410'
    >
      <el-table-column
        align='center'
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        label="补货单号"
        align='center'
        show-overflow-tooltip
        min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.rmNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="补货日期"
        align='center'
        min-width="110">
        <template slot-scope="scope">
          <span>{{scope.row.createDate|filtersDate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="whName"
        label="仓库名称"
        align='center'
        min-width="110">
      </el-table-column>
      <el-table-column
        prop="wh"
        label="仓位"
        align='center'
        min-width="110">
      </el-table-column>
      <el-table-column
        label="货品名称"
        align='center'
        min-width="200">
        <template slot-scope="scope">
          <span>{{scope.row.productName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="单位"
        align='center'
        show-overflow-tooltip
        width="100">
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
    name:'returnGoodDetail',
    data(){
      return{
        // 基础显示信息
        form:{},
        // 补货记录
        Replenishment:[],
        // 红色
        colorRed:'colorRed'
      }
    },
    computed:{
      ...mapState(['uuid'])
    },
    mounted(){
      this.getList()
    },
    filters:{
      filtersDate(val) {
        if (val) {
          return Interface.renderTime(val).slice(0, 10)
        }
      },
      filtersStatus(val){
        if (val==0) {
          return '未补货'
        }else if (val==1) {
          return '部份补货'
        }else{
          return '已补完'
        }
      }
    },
    methods: {
      // 获取详情列表数据
      getList() {
        // 获取详情信息
        const params = {
          uuid: this.uuid
        }
        axios.post(config.api, '/returnGood/getReturnGoodInfo.do', params).then((res) => {
          if (res.status == 0) {
            this.form = res.data
          } else {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      // 获取补货记录
      getReplenish(row){
        // 获取详情信息
        const params = {
          // 退货单号
          psNo:row.psNo,
          itm:row.itm
        }
        axios.post(config.api, '/returnGood/getRmInfoByPsNo.do', params).then((res) => {
          if (res.status == 0) {
            console.log(res)
            this.Replenishment = res.data
          } else {
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
    margin-top 20px;
    margin-bottom:10px;
  .headerWarp
    width 80%

  .inquiry_warp{
    width: 100%;
    line-height: 40px;
    background: #f5f5f5;
    margin-top:10px;
    text-align center
    margin-bottom: 10px;
  }

  .colorRed
    color:red;
</style>

