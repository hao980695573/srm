<template>
  <div>
    <!--基础资料联系人-->
    <div class='contacTitleWarp'>
      <div class='contacTitle'>设备情况</div>
      <div class='contacTitleButton'>
        <el-button type="info" size="mini" @click='haldAddEquipment'>新增设备</el-button>
        <el-button type="danger" size="mini" @click='fastDeleteBth'>一键删除</el-button>
      </div>
    </div>
    <!--联系人列表-->
    <div class='contacTinformation'>
      <el-table
        :data="equipmentList"
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
          label="设备名称"
          align='center'
          width="220">
        </el-table-column>
        <el-table-column
          prop="number"
          label="台数"
          align='center'
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="instrumentSituation"
          label="检查仪器校对情况"
          align='center'
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注说明"
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
    <!--新增设备-->
    <el-dialog title="新增设备" :visible.sync="equipmentShow" top='40px'>
      <div class='addContactsWarp'>
        <el-form ref="addEquipmentList" :model="addEquipmentList" :rules='rules' label-width="80px" size='medium'
                 label-position='top'>
          <el-form-item label="设备名称:" prop='name'>
            <el-input v-model="addEquipmentList.name" placeholder="请输入设备名称"></el-input>
          </el-form-item>
          <el-form-item label="台数:" prop='number'>
            <el-input v-model="addEquipmentList.number" placeholder="请输入台数"></el-input>
          </el-form-item>
          <el-form-item label="仪器校对情况:" label-width='120px' prop='instrumentSituation'>
            <el-input v-model="addEquipmentList.instrumentSituation" placeholder="请输入仪器校对情况"></el-input>
          </el-form-item>
          <el-form-item label="备注说明:" prop='remark'>
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入备注说明"
              v-model="addEquipmentList.remark"
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
    name: 'equipmentList',
    props: {
      equipmentList: {
        type: Array
      }
    },
    data() {
      return {
        // 是否显示新增设备信息
        equipmentShow: false,
        // 列表全选
        multipleSelection: [],
        // 新增银行
        addEquipmentList: {
          // 设备名称
          name: '',
          // 台数
          number: '',
          // 仪器校对情况
          instrumentSituation: '',
          // 备注说明
          remark: '',
        },
        // 正则校验
        rules: {
          name: [
            {required: true, message: '设备名称不能为空', trigger: 'blur'},
          ],
          number: [
            {required: true, message: '台数不能为空', trigger: 'blur'},
          ],
          instrumentSituation: [
            {required: true, message: '仪器校对情况不能为空', trigger: 'blur'},
          ],
          remark: [
            {required: true, message: '备注说明不能为空', trigger: 'blur'},
          ]
        }
      }
    },
    computed: {
      // 获取 uuid
      ...mapState(['uuid']),
    },
    methods: {
      // 新增银行信息模块显示
      haldAddEquipment() {
        this.equipmentShow = true
        // 清除数据
        this.addEquipmentList.name = '',
        this.addEquipmentList.number = '',
        this.addEquipmentList.instrumentSituation = '',
        this.addEquipmentList.remark = ''
      },
      // 确定新增设备
      additions() {
        // 正则校验通过，发起请求
        this.$refs['addEquipmentList'].validate((valid) => {
          if (valid) {
            const params = {
              supplierUuid: this.uuid,
              // 设备名称
              name: this.addEquipmentList.name,
              // 台数
              number: this.addEquipmentList.number,
              // 仪器校对情况
              instrumentSituation: this.addEquipmentList.instrumentSituation,
              // 备注说明
              remark: this.addEquipmentList.remark
            }
            axios.post(config.api, '/supplier/addSupplierEquipment.do', params).then((res) => {
              console.log(res)
              if (res.status == 0) {
                this.$alert('保存成功', {
                  confirmButtonText: '确定',
                  center: true,
                  callback: action => {
                    // 隐藏新增联系人
                    this.equipmentShow = false
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
      handleSelectionChange(val) {
        this.multipleSelection = []
        val.map((item) => {
          this.multipleSelection.push(item.uuid)
        })
      },
      // 一键删除设备信息
      fastDeleteBth() {
        const params = {
          tableName: "supplier_equipment",
          uuidList: this.multipleSelection
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
      },
      // 单个删除
      deleteBth(scope) {
        const params = {
          tableName: "supplier_equipment",
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
      width 110px;
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
