<template>
  <div>
    <!--列表-->
    <el-table
      :data="InquiryList"
      border
      style="width: 100%"
      height='415px'
      size='mini'
    >
      <el-table-column
        type="index"
        align='center'
        width="50">
      </el-table-column>
      <el-table-column
        label="送货单号"
        align='center'
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.deliveryNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="外箱条码"
        align='center'
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.barcodeNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="物料编码"
        align='center'
        width="120">
        <template slot-scope="scope">
          <span>{{scope.row.productNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="物料名称"
        align='center'
        width="200">
        <template slot-scope="scope">
          <span>{{scope.row.productName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="物料规格"
        align='center'
        min-width="250">
        <template slot-scope="scope">
          <span>{{scope.row.specification}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="单位"
        align='center'
        width="80">
        <template slot-scope="scope">
          <span>{{scope.row.unit}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="批次"
        align='center'
        width="130">
        <template slot-scope="scope">
          <span>{{scope.row.batchNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        align='center'
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.createDate|filterCreateDate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="批次"
        align='center'
        width="140">
        <template slot-scope="scope">
          <span>{{scope.row.batchNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否辅料"
        align='center'
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.isAccessoryLabel|filtersIsAccessoryLabel}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否打印"
        align='center'
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.isAlreadyPrint|filterAlreadyPrint}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align='center'
        label="操作"
        width="250">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini" @click='enterDetail(scope,"large")'>
            打印100*70
          </el-button>
          <el-button
            type="text"
            size="mini" @click='enterDetail(scope,"middle")'>
            打印100*60
          </el-button>
          <el-button
            type="text"
            size="mini" @click='enterDetail(scope,"small")'>
            打印70*45
          </el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

<script>
  // 引入公共方法
  import Interface from 'api/Interface.js'
  // Vuex语法糖
  import {mapMutations} from 'Vuex'

  export default {
    name:'norMalbarCodeList',
    props:['InquiryList'],
    filters:{
      // 创建时间
      filterCreateDate(val) {
        if (Interface.renderTime(val)) {
          return Interface.renderTime(val).slice(0, 10)
        }
      },
      // 是否已打印
      filterAlreadyPrint(val){
        if (val==0) {
          return '没打印'
        }else if(val==1){
          return '已打印'
        }
      },
      // 是否辅料
      filtersIsAccessoryLabel(val){
        if (val==0) {
          return '否'
        }else if(val==1){
          return '是'
        }
      }
    },
    methods:{
      ...mapMutations(['changeUuid']),
      // 点击打印
      enterDetail(scope,data){
        this.changeUuid(scope.row.biUuid)
        // 根据标志，选择进入正常标签或者辅料标签
        if(scope.row.isAccessoryLabel==0){
          // small= 70*40 large=100*70  middle=100*60
          if(data=='small'){
            this.$router.push('smallPrint')
          }else if(data=='middle'){
            this.$router.push('middleCodePrint')
          }
          else{
            this.$router.push('largePrint')
          }
        }else if(scope.row.isAccessoryLabel==1){
          if(data=='large'){
            this.$router.push('auxiliaryLargePrint')
          }else if(data=='middle'){
            this.$router.push('auxiliaryMiddleCodePrint')
          } else{
            this.$router.push('auxiliarySmallPrint')
          }
        }
      }
    }
  }
</script>
