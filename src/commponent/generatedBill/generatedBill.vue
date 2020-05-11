<template>
  <div>
    <!--搜索-->
    <div class='inquiry_warp'>
      <el-form ref="screen_data" :model="screen_data" :inline="true" size='mini'>
        <el-form-item label="对账单号">
          <el-input v-model="screen_data.statementNumber" placeholder="请输入对账单号"></el-input>
        </el-form-item>
        <el-form-item label="供应商名称" label-width='100px'>
          <el-input v-model="screen_data.supplierName" placeholder="请输入供应商名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  class='Fuzzy' size="mini" @click='handleCurrentChange("screen")'>搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--列表-->
    <el-table
      :data="form"
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
        label="ERP代码"
        align='center'
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.erpno}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="供应商名称"
        align='center'
        min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.supplierName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="账单日期"
        align='center'
        width="140">
        <template slot-scope="scope">
          <span>{{scope.row.billingTime|filterbillingTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="生成日期"
        align='center'
        width="140">
        <template slot-scope="scope">
          <span>{{scope.row.createDate|filterDate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align='center'
        label="操作"
        width="200">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small" @click='enterPrint(scope.row)'>
            打印
          </el-button>
          <el-button
            type="text"
            size="small" @click='downloadFiles(scope)'>
            下载
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class='page_fen' v-show='form.length>0'>
      <el-pagination
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
  // 引入公共方法
  import Interface from 'api/Interface.js'
  // Vuex语法糖
  import {mapMutations} from 'Vuex'
  export default {
    name:'generatedBill',
    data(){
      return{
        // 搜索
        screen_data:{
          // 当前页
          pageNum:1,
          // 请求条数参数
          pageSize:8,
          // 总条数
          totalNum:1,
          // 对账单号
          statementNumber: '',
          // 供应商名称
          supplierName: '',
        },
        // 列表
        form:[]
      }
    },
    filters:{
      filterDate(val){
        if(val){
          return Interface.renderTime(val).slice(0,10)
        }
      },
      filterbillingTime(val){
        // 日期
        var timeDate=val.split('')
        timeDate.splice(4, 0, "-")
        return timeDate.join('')
      }
    },
    mounted(){
      this.handleCurrentChange()
    },
    methods:{
      ...mapMutations(['changeUuid']),
      // 获取列表
      handleCurrentChange(data){
        if(data=="screen"){
          this.screen_data.pageNum=1
        }
        const params={
          pageNum:this.screen_data.pageNum,
          pageSize:this.screen_data.pageSize,
          // 对账单号
          statementNumber: this.screen_data.statementNumber,
          // 供应商名称
          supplierName: this.screen_data.supplierName,
        }
        axios.post(config.api, '/aStatement/getGeneratedBillList.do',params).then((res) => {
          if (res.status == 0) {
              console.log(res)
              this.form=res.data

              // 分页
              if(res.data.length>0){
                this.screen_data.totalNum=res.data[0].totalNum
              }
          }else{
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      // 进入打印
      enterPrint(scope){
        this.changeUuid(scope.uuid)
        this.$router.push('financialPrinting')
      },
      // 下载文件
      downloadFiles(scope){
        const params={
          uuid:scope.row.uuid,
          search:'',
          purchaseOrder:"",
          productNumber:'',
          productName:""
        }
        axios.getFile(config.noNeedLogionApi, 'skip/exportGeneratedBillDetail.do', params).then((response) => {
          console.log(response);
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(new Blob([response]));
          link.target = "_blank";
          link.download = '对账单.xlsx';
          document.body.appendChild(link);
          link.click();
          console.log('aaaa')
          document.body.removeChild(link);
        })
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
