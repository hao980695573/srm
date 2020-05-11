<template>
  <div>
    <div class='contacTitleWarp'>
      <div class='contacTitle'>主要客户</div>
      <div class='contacTitleButton'>
        <el-button type="info" size="mini" @click='haldAddBank'>新增客户</el-button>
        <el-button type="danger" size="mini" @click='fastDeleteBth'>一键删除</el-button>
      </div>
    </div>
    <!--银行账号列表-->
    <div class='contacTinformation'>
      <el-table
        :data="customerList"
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
          prop="name"
          label="客户名称"
          align='center'
          width="300">
        </el-table-column>
        <el-table-column
          prop="saleRate"
          label="销售占比"
          align='center'
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="productionCapacityRate"
          label="占月生产产能"
          align='center'
          min-width="120">
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
    <!--新增银行账号-->
    <el-dialog title="新增主要客户" :visible.sync="CustomerShow">
      <div class='addContactsWarp'>
        <el-form ref="addCustomerData" :model="addCustomerData" :rules='rules'  label-width="80px" size='medium' label-position='top'>
          <el-form-item label="客户名称" prop='name'>
            <el-input v-model="addCustomerData.name" placeholder="客户名称"></el-input>
          </el-form-item>
          <el-form-item label="销售占比" prop='saleRate'>
            <el-input v-model="addCustomerData.saleRate" placeholder="请输入销售占比"></el-input>
          </el-form-item>
          <el-form-item label="占月生产产能" prop='productionCapacityRate'>
            <el-input v-model="addCustomerData.productionCapacityRate" placeholder="请输入占月生产产能"></el-input>
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
    name: 'mainCustomer',
    props: {
      customerList: {
        type: Array
      }
    },
    data() {
      return {
        // 是否显示新增客户
        CustomerShow:false,
        // 列表全选
        multipleSelection: [],
        // 新增客户
        addCustomerData:{
          // 客户名称
          name:'',
          // 销售占比
          saleRate:'',
          // 占月生产产能
          productionCapacityRate:''
        },
        // 正则校验
        rules: {
          name: [
            {required: true, message: '客户名称不能为空', trigger: 'blur'},
          ],
          saleRate:[
            {required: true, message: '销售占比不能为空', trigger: 'blur'},
          ],
          productionCapacityRate:[
            {required: true, message: '占月生产产能不能为空', trigger: 'blur'},
          ]
        }
      }
    },
    computed: {
      // 获取 uuid
      ...mapState(['uuid']),
    },
    methods:{
      // 新增主要客户模块显示
      haldAddBank(){
        this.CustomerShow=true
        // 清除数据
        this.addCustomerData.name=''
        this.addCustomerData.saleRate=''
        this.addCustomerData.productionCapacityRate=''
      },
      // 确定新增主要客户
      additions() {
        // 正则校验通过，发起请求
        this.$refs['addCustomerData'].validate((valid) => {
          if (valid) {
            const params = {
              supplierUuid: this.uuid,
              // 客户名称
              name:this.addCustomerData.name,
              // 销售占比
              saleRate: this.addCustomerData.saleRate,
              // 占月生产产能
              productionCapacityRate: this.addCustomerData.productionCapacityRate
            }

            axios.post(config.api, '/supplier/addSupplierCustomer.do', params).then((res) => {
              if (res.status == 0) {
                this.$alert('保存成功', {
                  confirmButtonText: '确定',
                  center: true,
                  callback: action => {
                    // 隐藏新增主要客户
                    this.CustomerShow = false
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
      // 列表全选
      handleSelectionChange(val){
        this.multipleSelection=[]
        val.map((item)=>{
          this.multipleSelection.push(item.uuid)
        })
      },
      // 一键删除主要客户
      fastDeleteBth(){
        const params={
          tableName: "supplier_customer",
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
          tableName: "supplier_customer",
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
      margin-left: -53px;
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
