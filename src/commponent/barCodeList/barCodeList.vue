<template>
  <div>
    <!--搜索-->
    <div class='inquiry_warp'>
      <el-form ref="screen_data" :model="screen_data" label-width="80px" :inline="true" size='mini'>
        <el-form-item label="条码类型">
          <el-select v-model="screen_data.barcodeType" placeholder="请选择条码类型" @change='changeBarcode'>
            <el-option label="正常" value="normal"></el-option>
            <el-option label="补货" value="replenish"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模糊搜索">
          <el-input v-model="screen_data.search" placeholder="模糊搜索" style='width: 150px'></el-input>
        </el-form-item>
        <el-button type="primary" class='Fuzzy' size="mini" @click='handleCurrentChange("screen")'>搜索</el-button>
      </el-form>
    </div>

    <!--正常列表-->
    <norMalbarCodeList :InquiryList='InquiryList'></norMalbarCodeList>
    <!--分页-->
    <div class='page_fen' v-show='InquiryList.length>0'>
      <el-pagination
        size='mini'
        background
        :page-size="screen_data.pageSize"
        layout="prev, pager, next"
        :total="screen_data.totalNum"
        @current-change="handleCurrentChange"
        :current-page.sync="screen_data.pageNum">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  // 引入公共配置
  import {config} from 'api/config.js';
  //引入接口文件请求文件
  import axios from 'api/axios.js'
  //引入正常条码列表
  import norMalbarCodeList from 'commponent/barCodeList/commponent/norMalbarCodeList'
  // Vuex语法糖
  import {mapMutations} from 'Vuex'


  export default{
      name:'barCodeList',
      data(){
          return{
            // 搜索
            screen_data:{
              search:'',
              // 请求条数
              pageSize: 5,
              // 当前页码
              pageNum: 1,
              // 总条数
              totalNum: 0,
              // 条码类型（正常还是补货）
              barcodeType:'normal'
            },
            // 列表
            InquiryList:[]
          }
      },
      mounted(){
          this.handleCurrentChange()
      },

      methods: {
        ...mapMutations(['changeBarcodeCategory']),
        // 条码类型改变
        changeBarcode(data){
          // 转换数据类型
          this.screen_data.barcodeType=data
          // 从新获取数据
          this.handleCurrentChange()
        },
          // 获取详情
        handleCurrentChange(data){
            if(data=='screen'){
              this.screen_data.pageNum=1
            }

          // 判断是标签类型（是正常还是补货）
          let typeState=''
          if(this.screen_data.barcodeType=="normal"){
            typeState=0
            this.changeBarcodeCategory('0')
          }else{
            typeState=1
            this.changeBarcodeCategory('1')
          }
          const params={
            search:this.screen_data.search,
            // 请求条数
            pageSize: this.screen_data.pageSize,
            // 当前页码
            pageNum: this.screen_data.pageNum,
            // 类型
            type:typeState
          }
          axios.post(config.api, '/barcode/getBarcodeList.do', params).then((res) => {
            if (res.status == 0) {
              this.InquiryList=res.data
              if (res.data.length > 0) {
                this.screen_data.totalNum = res.data[0].totalNum
              }
            }
          })
        }
      },
    components: {
      norMalbarCodeList
    }
  }
</script>

<style lang='stylus' scoped>
  .inquiry_warp{
    width: 100%;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  /*分页*/
  .page_fen {
    width: 100%;
    height: 50px;
    background: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    padding: 0px 20px;
    box-sizing: border-box;
  }
</style>
