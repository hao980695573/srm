<template>
  <div>
    <!--基础资料联系人-->
    <div class='contacTitleWarp'>
      <div class='contacTitle'>联系人方式</div>
      <div class='contacTitleButton'>
        <el-button type="info" size="mini" @click='haldAddContacts'>新增联系人</el-button>
        <el-button type="danger" size="mini" @click='fastDeleteBth'>一键删除</el-button>
      </div>
    </div>
    <!--联系人列表-->
    <div class='contacTinformation'>
      <el-table
        :data="contractList"
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
          label="姓名"
          align='center'
          width="150">
        </el-table-column>
        <el-table-column
          label="性别"
          align='center'
          width="120">
          <template slot-scope="scope">
            <span>{{scope.row.sex|filtersSex}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="post"
          label="职位"
          align='center'
          width="130">
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="电话"
          align='center'
          width="160">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机"
          align='center'
          width="120">
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
    <!--新增联系人-->
    <el-dialog title="新增联系人" :visible.sync="addContacts">
      <div class='addContactsWarp'>
        <el-form ref="addContactsData" :rules='rules' :model="addContactsData" label-width="80px" size='medium'>
          <el-form-item label="姓名" prop='name'>
            <el-input v-model="addContactsData.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop='sex'>
            <el-radio-group v-model="addContactsData.sex">
              <el-radio label="1">男</el-radio>
              <el-radio label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="职位" prop='post'>
            <el-select v-model="addContactsData.post" placeholder="请选择职位" style='width:100%'>
              <el-option label="报价员" value="报价员"></el-option>
              <el-option label="跟单员" value="跟单员"></el-option>
              <el-option label="财务员" value="财务员"></el-option>
              <el-option label="仓库员" value="仓库员"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电话" prop='telephone'>
            <el-input v-model="addContactsData.telephone" placeholder="请输入联系电话"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop='phone'>
            <el-input v-model="addContactsData.phone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop='remark'>
            <el-input
              type="textarea"
              :rows="4"
              resize='none'
              placeholder="请输入内容"
              v-model="addContactsData.remark">
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
    name: 'contaclnformation',
    props: {
      contractList: {
        type: Array
      }
    },
    data() {
      return {
        // 是否显示新增联系人
        addContacts: false,
        // 列表全选
        multipleSelection: [],
        // 新增联系人
        addContactsData: {
          // 姓名
          name: '',
          // 性别
          sex: '',
          // 职务
          post: '',
          // 电话
          telephone: '',
          // 手机
          phone: '',
          // 备注
          remark: ''
        },
        // 正则校验
        rules: {
          name: [
            {required: true, message: '名字不能为空', trigger: 'blur'},
          ],
          sex: [
            {required: true, message: '请选择性别', trigger: 'blur'},
          ],
          post: [
            {required: true, message: '职位不能为空', trigger: 'change'},
          ],
          telephone: [
            {required: false, message: '电话不能为空', trigger: 'blur'},
          ],
          phone: [
            {required: true, message: '手机不能为空', trigger: 'blur'},
          ],
          remark: [
            {required: false, message: '备注不能为空', trigger: 'blur'},
          ]
        }
      }
    },
    computed: {
      // 获取 uuid
      ...mapState(['uuid']),
    },
    filters:{
      filtersSex(data){
        if(data==0){
          return '女'
        }else if(data==1){
          return '男'
        }
      }
    },
    methods: {
      // 新增联系人模块显示
      haldAddContacts() {
        this.addContacts = true
        // 清除数据
        this.addContactsData.name = '',
        this.addContactsData.sex = '',
        this.addContactsData.post = '',
        this.addContactsData.telephone = '',
        this.addContactsData.phone = '',
        this.addContactsData.remark = ''
      },
      // 确定新增联系人
      additions() {
        // 正则校验通过，发起请求
        this.$refs['addContactsData'].validate((valid) => {
          if (valid) {
            const params = {
              supplierUuid: this.uuid,
              // 姓名
              name: this.addContactsData.name,
              // 性别
              sex: this.addContactsData.sex,
              // 职位
              post: this.addContactsData.post,
              // 电话
              telephone: this.addContactsData.telephone,
              // 手机
              phone: this.addContactsData.phone,
              // 备注
              remark: this.addContactsData.remark
            }
            axios.post(config.api, '/supplier/addSupplierContract.do', params).then((res) => {
              if (res.status == 0) {
                this.$alert('保存成功', {
                  confirmButtonText: '确定',
                  center: true,
                  callback: action => {
                    // 隐藏新增联系人
                    this.addContacts = false
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
      // 一键删除联系人
      fastDeleteBth(){
        const params={
          tableName: "supplier_contract",
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
          tableName: "supplier_contract",
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
