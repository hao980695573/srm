<template>
  <div>
    <!--主要材料来源-->
    <div class='contacTitleWarp'>
      <div class='contacTitle'>主要材料来源</div>
      <div class='contacTitleButton'>
        <el-button type="info" size="mini" @click='haldAddPmaterial'>新增材料</el-button>
        <el-button type="danger" size="mini" @click='fastDeleteBth'>一键删除</el-button>
      </div>
    </div>
    <!--材料列表-->
    <div class='contacTinformation'>
      <el-table
        :data="materialSourcesList"
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
          prop="materialName"
          label="材料名称"
          align='center'
          width="220">
        </el-table-column>
        <el-table-column
          prop="supplier"
          label="供应厂商"
          align='center'
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
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
    <!--新增材料来源-->
    <el-dialog title="新增材料来源" :visible.sync="materialShow" top='40px'>
      <div class='addContactsWarp'>
        <el-form ref="addMaterialData" :model="addMaterialData" :rules='rules' label-width="80px" size='medium'
                 label-position='top'>
          <el-form-item label="材料名称:" prop='materialName'>
            <el-input v-model="addMaterialData.materialName" placeholder="请输入材料名称"></el-input>
          </el-form-item>
          <el-form-item label="供应厂商" label-width='120px' prop='supplier'>
            <el-input v-model="addMaterialData.supplier" placeholder="请输入供应厂商"></el-input>
          </el-form-item>
          <el-form-item label="备注说明:" prop='remark'>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入备注说明"
              v-model="addMaterialData.remark"
              resize='none'
            >
            </el-input>
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

    name: 'materialSources',
    props: {
      materialSourcesList: {
        type: Array
      }
    },
    data() {
      return {
        // 是否显示新增材料模块
        materialShow: false,
        // 多选
        multipleSelection:[],
        // 新增主要材料
        addMaterialData: {
          // 材料名称
          materialName: '',
          // 供应厂商
          supplier: '',
          // 备注
          remark: ''
        },
        // 正则校验
        rules: {
          materialName: [
            {required: true, message: '材料名称不能为空', trigger: 'blur'},
          ],
          supplier: [
            {required: true, message: '供应厂商不能为空', trigger: 'blur'},
          ],
          remark: [
            {required: true, message: '备注不能为空', trigger: 'blur'},
          ]
        }
      }
    },
    computed: {
      // 获取 uuid
      ...mapState(['uuid']),
    },
    methods: {
      // 列表全选
      handleSelectionChange(val){
        this.multipleSelection=[]
        val.map((item)=>{
          this.multipleSelection.push(item.uuid)
        })
      },
      // 新增主要材料来源模块显示
      haldAddPmaterial() {
        this.materialShow = true
        // 清除数据
        this.addMaterialData.materialName='',
        this.addMaterialData.supplier='',
        this.addMaterialData.remark=''

      },
      // 确定新增主要材料
      additions() {
        // 正则校验通过，发起请求
        this.$refs['addMaterialData'].validate((valid) => {
          if (valid) {
            const params = {
              supplierUuid: this.uuid,
              // 材料名称
              materialName: this.addMaterialData.materialName,
              // 供应厂商
              supplier: this.addMaterialData.supplier,
              // 备注
              remark: this.addMaterialData.remark
            }
            axios.post(config.api, '/supplier/addSupplierMaterialSource.do', params).then((res) => {
              if (res.status == 0) {
                this.$alert('保存成功', {
                  confirmButtonText: '确定',
                  center: true,
                  callback: action => {
                    // 隐藏新增联系人
                    this.materialShow = false
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
      // 一键删除联系人
      fastDeleteBth(){
        const params={
          tableName: "supplier_material_source",
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
      deleteBth(scope) {
        const params = {
          tableName: "supplier_material_source",
          uuidList: Array(scope.uuid)
        }
        axios.post(config.api, '/supplier/deleteSupplierExtraInformation.do', params).then((res) => {
          if (res.status == 0) {
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
      height: 45px;
      margin-top 20px;
      margin-left 20px;
      display flex
      justify-content center
      align-items center
</style>
