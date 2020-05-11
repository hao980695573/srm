<template>
  <div>
    <div class='contacTitleWarp'>
      <div class='contacTitle'>主要产品</div>
      <div class='contacTitleButton'>
        <el-button type="info" size="mini" @click='haldAddproduct'>新增产品</el-button>
        <el-button type="danger" size="mini" @click='fastDeleteBth'>一键删除</el-button>
      </div>
    </div>
    <!--主要产品列表-->
    <div class='contacTinformation'>
      <el-table
        :data="productList"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          type="index"
          align='center'
          width="50">
        </el-table-column>
        <el-table-column
          prop="productName"
          label="产品名称"
          align='center'
          width="220">
        </el-table-column>
        <el-table-column
          prop="normalDeliveryDate"
          label="正常交货周期"
          align='center'
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="minimumDeliveryDate"
          label="最短交货周期"
          align='center'
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="averageMonthMaxCount"
          label="月均最大产量"
          align='center'
          width="180">
        </el-table-column>
        <el-table-column
          align='center'
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small" @click='deleteBth(scope.row)'>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--新增主要产品-->
    <el-dialog title="新增主要产品" :visible.sync="productsShow">
      <div class='addContactsWarp'>
        <el-form ref="addproductData" :model="addproductData" :rules='rules'  size='medium' label-width='140px'label-position='top' >
          <el-form-item label="产品名称 :" prop='productName'>
            <el-input v-model="addproductData.productName" placeholder="请输入产品名称"></el-input>
          </el-form-item>
          <el-form-item label="正常交货周期 :" prop='normalDeliveryDate'>
            <el-input v-model="addproductData.normalDeliveryDate" placeholder="请输入正常交货周期"></el-input>
          </el-form-item>
          <el-form-item label="最短交货周期 :" prop='minimumDeliveryDate'>
            <el-input v-model="addproductData.minimumDeliveryDate" placeholder="请输入最短交货周期"></el-input>
          </el-form-item>
          <el-form-item label="月均最大产量 :" prop='averageMonthMaxCount'>
            <el-input v-model="addproductData.averageMonthMaxCount" placeholder="请输入月均最大产量"></el-input>
          </el-form-item>
        </el-form>
        <!--确定-->
        <div class='defineWarp'>
          <el-button type="primary" size='medium' @click='additions'>确定</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  // 引入公共配置
  import {config} from 'api/config.js';
  //引入接口文件请求文件
  import axios from 'api/axios.js'
  // Vuex语法糖
  import {mapState} from 'Vuex'

  export default {
    name: 'bankAccount',
    props: {
      productList: {
        type: Array
      }
    },
    data() {
      return {
        // 是否显示新增主要产品模块
        productsShow:false,
        // 列表全选
        multipleSelection: [],
        // 新增主要产品
        addproductData:{
          // 产品名称
          productName:'',
          // 正常交货周期
          normalDeliveryDate:'',
          // 最短交货周期
          minimumDeliveryDate:'',
          // 月均最大产量
          averageMonthMaxCount:''
        },
        // 正则校验
        rules: {
          productName: [
            {required: true, message: '主要产品不能为空', trigger: 'blur'},
          ],
          normalDeliveryDate:[
            {required: true, message: '正常交货周期不能为空', trigger: 'blur'},
          ],
          minimumDeliveryDate:[
            {required: true, message: '最短交货周期不能为空', trigger: 'blur'},
          ],
          averageMonthMaxCount:[
            {required: true, message: '月均最大产量不能为空', trigger: 'blur'},
          ]
        }
      }
    },
    computed: {
      // 获取 uuid
      ...mapState(['uuid']),
    },
    methods:{
      // 新增主要产品模块显示
      haldAddproduct(){
        this.productsShow=true
        // 清除数据
        this.addproductData.productName=''
        this.addproductData.normalDeliveryDate=''
        this.addproductData.minimumDeliveryDate=''
        this.addproductData.averageMonthMaxCount=''

      },
      // 列表全选
      handleSelectionChange(val){
        this.multipleSelection=[]
        val.map((item)=>{
          this.multipleSelection.push(item.uuid)
        })
      },
      // 确定新增主要产品
      additions() {
        // 正则校验通过，发起请求
        this.$refs['addproductData'].validate((valid) => {
          if (valid) {
            const params = {
              supplierUuid: this.uuid,
              // 产品名称
              productName:this.addproductData.productName,
              // 正常交货周期
              normalDeliveryDate: this.addproductData.normalDeliveryDate,
              // 最短交货周期
              minimumDeliveryDate: this.addproductData.minimumDeliveryDate,
              // 月均最大产量
              averageMonthMaxCount: this.addproductData.averageMonthMaxCount,
            }
            axios.post(config.api, '/supplier/addSupplierProduct.do', params).then((res) => {
              if (res.status == 0) {
                this.$alert('保存成功', {
                  confirmButtonText: '确定',
                  center: true,
                  callback: action => {
                    // 隐藏新增主要产品模块
                    this.productsShow = false
                    // 重新获取数据
                    this.$emit('againLoad')
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
        })
      },
      // 一键删除主要产品
      fastDeleteBth(){
        const params={
          tableName: "supplier_product",
          uuidList: this.multipleSelection
        }
        axios.post(config.api, '/supplier/deleteSupplierExtraInformation.do', params).then((res) => {
          if(res.status == 0){
            this.$alert('删除成功', {
              confirmButtonText: '确定',
              center: true,
              callback: action => {
                // 重新获取数据
                this.$emit('againLoad')
              }
            })
          } else {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      // 单个删除
      deleteBth(scope){
        const params={
          tableName: "supplier_product",
          uuidList: Array(scope.uuid)
        }
        axios.post(config.api, '/supplier/deleteSupplierExtraInformation.do', params).then((res) => {
          if(res.status == 0){
            this.$alert('删除成功', {
              confirmButtonText: '确定',
              center: true,
              callback: action => {
                // 重新获取数据
                this.$emit('againLoad')
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
  }
</script>

<style lang='stylus' scoped>
  .contacTitleWarp
    width 100%
    height 50px;
    margin-top 30px;
    background: #f5f5f5;
    position relative
    .contacTitle
      width 130px;
      line-height 50px;
      font-size 20px;
      text-align center
      position absolute
      left 50%;
      margin-left: -65px;
    .contacTitleButton
      position absolute
      right 100px;
      top: 11px;

  .contacTinformation
    width: 100%;
    margin 0px auto
    margin-bottom 10px;

  .addContactsWarp
    width 80%
    margin 0px auto
    .defineWarp
      width 100%
      height:45px;
      margin-top 20px;
      margin-left 20px;
      display flex
      justify-content center
      align-items center
</style>
