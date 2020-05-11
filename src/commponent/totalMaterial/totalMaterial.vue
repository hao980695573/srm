<template>
  <div>
    <!--搜索-->
    <div class='inquiry_warp'>
      <el-form ref="screen_data" :model="screen_data"  :rules="rules" :inline="true" size='mini'>
        <el-form-item label="供应商名称" label-width="100px" prop='supplierName'>
          <el-input v-model="screen_data.supplierName" placeholder="请输入供应商名称"></el-input>
        </el-form-item>
        <el-form-item label="产品品号" prop='productNumber'>
          <el-input v-model="screen_data.productNumber" placeholder="请输入产品品号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class='Fuzzy' @click='handleCurrentChange' size="mini">搜索</el-button>
          <el-button type="primary" class='Fuzzy' @click='downloadFile' size="mini" :disabled='formList.length==0'>导出</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--列表-->
    <el-table
      :data="formList"
      border
      style="width: 100%"
      height='415px'
      size='mini'
    >
      <el-table-column
        label="供应商名称"
        align='center'
        min-width="130">
        <template slot-scope="scope">
          <span>{{scope.row.supplierName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="产品品号"
        align='center'
        min-width="100">
        <template slot-scope="scope">
          <span>{{scope.row.productNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="产品名称"
        align='center'
        min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.productName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="startTime"
        label="数量名称"
        align='center'
        min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.totalQuantity}}</span>
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

  export default {
    name:'totalMaterial',
    data(){
      return{
        screen_data:{
          // 供应商名称
          supplierName:'',
          // 产品品号
          productNumber:''
        },
        formList:[],
        // 校验
        rules: {
          productNumber: [
            { required: true, message: '品号不能为空', trigger: 'blur' },
          ]
        }
      }
    },
    methods:{
      handleCurrentChange(){
        this.$refs['screen_data'].validate((valid) => {
          if (valid) {
            const params={
              supplierName:this.screen_data.supplierName,
              productNumber:this.screen_data.productNumber
            }
            axios.post(config.api, '/procurement/getProductCountList.do', params).then((res) => {
              console.log(res)
              if (res.status == 0) {
                this.formList=res.data
              }
            })
          }
        })
      },
      // 导出下载
      downloadFile(){
        const params={
          supplierName:this.screen_data.supplierName,
          productNumber:this.screen_data.productNumber,
      }
        axios.getFile(config.noNeedLogionApi, 'skip/exportProductCountList.do', params).then((response) => {
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(new Blob([response]));
          link.target = "_blank";
          link.download = '物料总和报表.xlsx';
          document.body.appendChild(link);
          link.click();
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
</style>
