<template>
  <div>
    <div class='contacTitleWarp'>
      <div class='contacTitle'>银行信息账号</div>
      <div class='contacTitleButton'>
        <el-button type="info" size="mini" @click='haldAddBank'>新增银行账号</el-button>
        <el-button type="danger" size="mini" @click='fastDeleteBth'>一键删除</el-button>
      </div>
    </div>
    <!--银行账号列表-->
    <div class='contacTinformation'>
      <el-table
        :data="bankList"
        border
        style="width: 100%"
        size='mini'
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
          prop="accountName"
          label="开户名称"
          align='center'
          width="220">
        </el-table-column>
        <el-table-column
          prop="openAccountBankName"
          label="开户银行 (具体到分行)"
          align='center'
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="account"
          label="银行账号"
          align='center'
          min-width="90">
        </el-table-column>
        <el-table-column
          prop="bankCode"
          label="银行代码"
          align='center'
          width="180">
        </el-table-column>
        <el-table-column
          align='center'
          label="附件"
          min-width='100'
        >
          <template slot-scope="scope">
            <a :href='scope.row.invoiceDocuments' download target="_blank" style='color:#409EFF;font-size:12px;cursor: pointer' >下载</a>
          </template>
        </el-table-column>
        <el-table-column
          align='center'
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small" @click='bankeDit(scope)'>
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!--新增银行账号-->
    <el-dialog title="新增银行账号" :visible.sync="bankAccountShow">
      <div class='addContactsWarp'>
        <el-form ref="addBankData" :model="addBankData" :rules='rules' label-width="80px" size='medium' label-position='top'>
          <el-form-item label="开户名称" prop='accountName'>
            <el-input v-model="addBankData.accountName" placeholder="请输入开户名称"></el-input>
          </el-form-item>
          <el-form-item label="开户银行（具体到分行）" prop='openAccountBankName'>
            <el-input v-model="addBankData.openAccountBankName" placeholder="请输入开户银行"></el-input>
          </el-form-item>
          <el-form-item label="银行账号" prop='account'>
            <el-input v-model="addBankData.account" placeholder="请输入银行账号"></el-input>
          </el-form-item>
          <el-form-item label="银行代码" prop='bankCode'>
            <el-input v-model="addBankData.bankCode" placeholder="请输入银行代码"></el-input>
          </el-form-item>
          <el-form-item label="上传附件" prop='invoiceDocuments'>
            <el-upload
              :multiple='false'
              :limit='1'
              class="upload-demo"
              action="http://www.srm-greatech.com/gzSrm/system/file/upFile.do?fileType=qualification.path"
              :on-success="otherFileChange"
              :headers='header'
              :on-remove='removeOtherFile'
              :file-list=[]
            >
              <el-button size="small" type="primary" style='margin-left:30px;margin-top:3px;width: 200px'>上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <!--确定-->
        <div class='defineWarp'>
          <el-button type="primary" size='medium' @click='additions'>确定</el-button>
        </div>
      </div>
    </el-dialog>
    <!--编辑银行附件-->
    <el-dialog title="更新附件" :visible.sync="bankeDitShow">
      <div class='addContactsWarp'>
        <el-form ref="bankeDit"  :rules='rules' label-width="80px" size='medium' label-position='top'>
          <el-form-item label="上传附件">
            <el-upload
              :multiple='false'
              :limit='1'
              class="upload-demo"
              action="http://www.srm-greatech.com/gzSrm/system/file/upFile.do?fileType=qualification.path"
              :on-success="editFileChange"
              :headers='header'
              :on-remove='removeeditFile'
              :file-list=[]
            >
              <el-button size="small" type="primary" style='margin-left:30px;margin-top:3px;width: 200px'>上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <!--确定-->
        <div class='defineWarp'>
          <el-button type="primary" size='medium' @click='upEdit'>确定</el-button>
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
      bankList: {
        type: Array
      }
    },
    data() {
      return {
        // 文件上传设置token
        header:{
          Authorization: localStorage.getItem('token')
        },
        // 是否显示新增银行信息账号
        bankAccountShow:false,
        // 是否显示编辑银行附件
        bankeDitShow:false,
        // 列表全选
        multipleSelection: [],
        // 新增银行
        addBankData:{
          // 开户名称
          accountName: '',
          // 开户银行
          openAccountBankName: '',
          // 银行账号
          account: '',
          // 银行代码
          bankCode: '',
          // 附件上传
          invoiceDocuments:''
        },
        // 正则校验
        rules: {
          accountName: [
            {required: true, message: '开户名不能为空', trigger: 'blur'},
          ],
          openAccountBankName:[
            {required: true, message: '开户行不能为空', trigger: 'blur'},
          ],
          account:[
            {required: true, message: '银行账户不能为空', trigger: 'blur'},
          ],
          bankCode:[
            {required: true, message: '银行代码不能为空', trigger: 'blur'},
          ],
          invoiceDocuments:[
            {required: true, message: '附件不能为空', trigger: ['change','blur']},
          ]
        },
        // 编辑银行用户uuid
        editUuid:'',
        // 编辑附件
        uploadfile:''
      }
    },
    computed: {
      // 获取 uuid
      ...mapState(['uuid']),
    },
    methods:{
      // 新增银行信息模块显示
      haldAddBank(){
          this.bankAccountShow=true
          setTimeout(()=>{
            // 清除数据
            this.$refs['addBankData'].resetFields()
          },50)
      },
      // 编辑银行附件
      bankeDit(scope){
        this.bankeDitShow=true
        this.editUuid=scope.row.uuid
        // 清除数据
        this.uploadfile=''
      },
      // 列表全选
      handleSelectionChange(val){
        this.multipleSelection=[]
        val.map((item)=>{
          this.multipleSelection.push(item.uuid)
        })
      },
      // 确定新增银行账户
      additions() {
        // 正则校验通过，发起请求
        this.$refs['addBankData'].validate((valid) => {
          if (valid) {
            const params = {
              supplierUuid: this.uuid,
              // 开户名称
              accountName:this.addBankData.accountName,
              // 开户银行
              openAccountBankName: this.addBankData.openAccountBankName,
              // 银行账号
              account: this.addBankData.account,
              // 银行代码
              bankCode: this.addBankData.bankCode,
              // 附件
              invoiceDocuments:this.addBankData.invoiceDocuments
            }
            axios.post(config.api, '/supplier/addSupplierBank.do', params).then((res) => {
              if (res.status == 0) {
                this.$alert('保存成功', {
                  confirmButtonText: '确定',
                  center: true,
                  callback: action => {
                    this.bankAccountShow = false
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
      // 确定编辑银行附件
      upEdit(){
        const params={
          uuid:this.editUuid,
          invoiceDocuments:this.uploadfile
        }
        axios.post(config.api, '/supplier/editSupplierBank.do', params).then((res) => {
          if (res.status == 0) {
            this.$alert('保存成功', {
              confirmButtonText: '确定',
              center: true,
              callback: action => {
                this.bankeDitShow = false
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
      // 一键删除联系人
      fastDeleteBth(){
        const params={
          tableName: "supplier_bank",
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
      // 新增附件上传成功
      otherFileChange(response){
        this.addBankData.invoiceDocuments=response.data[0]
        // 清除附件校验
        this.$refs['addBankData'].clearValidate('invoiceDocuments')
      },
      // 新增附件删除上传附件
      removeOtherFile(){
        this.addBankData.invoiceDocuments=''
      },
      // 编辑附件上传成功
      editFileChange(response){
        this.uploadfile=response.data[0]
      },
      // 编辑附件删除
      removeeditFile(){
        this.uploadfile=''
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
