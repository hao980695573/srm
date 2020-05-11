<template>
    <!--搜索-->
    <div>
      <div  class='outerBoxList_warp'>
        <el-form ref="form" :model="form" label-width="80px" size='mini' :inline="true">
          <el-form-item label="送货单号">
            <el-input v-model="form.deliveryNumber" placeholder="请输入内容"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click='getList' :disabled='form.deliveryNumber==""'>添加</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click='clearList' :disabled='form.deliveryNumber==""'>清空列表</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="success" @click='printLoad' :disabled='selectList.length<1'>打印预览</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--表格-->
      <el-table
        :data="tableData"
        style="width: 100%"
        height='500px'
        size='mini'
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          align='center'
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          align='center'
          width="50">
        </el-table-column>
        <el-table-column
          prop="deliveryNumber"
          label="送货单号"
          align='center'
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="productName"
          label="品名"
          align='center'
          width="200">
        </el-table-column>
        <el-table-column
          prop="productNumber"
          label="品号"
          align='center'
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="unit"
          label="单位"
          align='center'
          width="80">
        </el-table-column>
        <el-table-column
          label="数量"
          align='center'
          width="150">
          <template slot-scope="scope">
            <el-input v-model="scope.row.quantity" placeholder="无"></el-input>
          </template>
        </el-table-column>
        <el-table-column
          label="备品"
          align='center'
          width="150">
          <template slot-scope="scope">
            <el-input v-model="scope.row.bpCount" placeholder="无"></el-input>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script>
  // 公共配置
  import {config} from 'api/config.js';
  // 接口文件请求文件
  import axios from 'api/axios.js'
  // vuex语法糖
  import {mapMutations} from 'Vuex'

  export default {
    name:'outerBoxList',
    data(){
      return {
        // 搜索送货单号
        form: {
          deliveryNumber: ''
        },
        // 表格
        tableData: [],
        // 选中的那些标签
        selectList:[]
      }
    },
    mounted(){

    },
    methods: {
      ...mapMutations(['changeBoxListState']),
      // 获取条码列表
      getList(){
        //送货单号
        const params={
          deliveryNumber:this.form.deliveryNumber
        }
        // 获取采购单号列表
        axios.post(config.api, '/delivery/getDeliveryInfoByNumber.do', params).then((res) => {
          if (res.status == 0) {
            // 采购单号列表
            res.data.deliveryProductList.map((item)=>{
              this.tableData.push(item)
            })
          }else {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      // 清空列表
      clearList(){
        this.tableData=[]
      },
      // 选中那些标签
      handleSelectionChange(val){
        this.selectList = val
      },
      // 打印
      printLoad(){
        this.changeBoxListState(this.selectList)
        // 跳转打印预览页面
        this.$router.push('outerboxPreview')
      }
    }
  }
</script>

<style lang='stylus' scoped>
.outerBoxList_warp
  margin-top:20px;
</style>
