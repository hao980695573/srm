<template>
  <div>
    <div class='contacTitleWarp'>
      <div class='contacTitle'>添加其他证书</div>
      <div class='contacTitleButton'>
        <el-button type="info" size="mini" @click='addOtherCertificates'>新增其他证书</el-button>
      </div>
    </div>
    <el-table
      :data="OtherCertificates"
      border
      style="width: 100%">
      <el-table-column
        align='center'
        prop="ertificateName"
        label="证书名称"
        min-width="180">
      </el-table-column>
      <el-table-column
        align='center'
        prop="ertificateNumber"
        label="证书编号"
        min-width="200">
      </el-table-column>
      <el-table-column
        align='center'
        label="生效日期"
        min-width='200'
      >
        <template slot-scope="scope">
          <span>{{scope.row.effectiveDate.slice(0,10)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align='center'
        label="有效日期至"
        min-width='200'
      >
        <template slot-scope="scope">
          <span>{{scope.row.invalidDate.slice(0,10)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align='center'
        label="附件"
        min-width='200'
      >
        <template slot-scope="scope">
          <a :href='scope.row.filePath' download  target="_blank"><el-button size="mini" type="primary">下载</el-button></a>
        </template>
      </el-table-column>
    </el-table>

    <!--新增其他证书-->
    <el-dialog title="新增其他证书" :visible.sync="otherCertificatesShow">
      <div class='addContactsWarp'>
        <el-form ref="addCertificateOthen" :model="addCertificateOthen" :rules='rules' label-width="80px" size='medium' label-position='top'>
          <el-form-item label="证书名称" prop='ertificateName'>
            <el-input v-model="addCertificateOthen.ertificateName" placeholder="请输入证书名称"></el-input>
          </el-form-item>
          <el-form-item label="证书编号" prop='ertificateNumber'>
            <el-input v-model="addCertificateOthen.ertificateNumber" placeholder="请输入证书编码"></el-input>
          </el-form-item>
          <el-form-item label="生效日期" prop='effectiveDate'>
            <el-date-picker
              v-model="addCertificateOthen.effectiveDate"
              type="date"
              placeholder="请选择生效日期"
              value-format='yyyy-MM-dd'
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="有效日期至" prop='invalidDate'>
            <el-date-picker
              v-model="addCertificateOthen.invalidDate"
              type="date"
              placeholder="请选择失效日期"
              value-format='yyyy-MM-dd'
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="上传附件">
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
    name:'addOtherCertificates',
    props: {
      OtherCertificates: {
        type: Array
      }
    },
    data(){
      return{
        // 文件上传设置token
        header:{
          Authorization: localStorage.getItem('token')
        },
        // 新增其他证书模块是否显示
        otherCertificatesShow:false,
        // 新增其他证书
        addCertificateOthen:{
          // 证书名称
          ertificateName:'',
          // 证书编号
          ertificateNumber:'',
          // 生效日期
          effectiveDate:'',
          // 有效日期至
          invalidDate:'',
          // 类型
          type:5,
          // 附件
          filePath:''
        },
        // 正则校验
        rules: {
          ertificateName: [
            {required: true, message: '证书名称不能为空', trigger: 'blur'},
          ],
          ertificateNumber:[
            {required: true, message: '证书编码不能为空', trigger: 'blur'},
          ],
          effectiveDate:[
            {required: true, message: '生效日期不能为空', trigger: 'blur'},
          ],
          invalidDate:[
            {required: true, message: '失效日期不能为空', trigger: 'blur'},
          ]
        }
      }
    },
    computed: {
      // 获取 uuid
      ...mapState(['uuid']),
    },
    methods:{
      // 点击新增证书
      addOtherCertificates(){
        this.otherCertificatesShow=true
        // 清除数据
        this.addCertificateOthen.ertificateName=''
        this.addCertificateOthen.ertificateNumber=''
        this.addCertificateOthen.effectiveDate=''
        this.addCertificateOthen.invalidDate=''
        this.addCertificateOthen.filePath=''
      },
      // 附件上传成功
      otherFileChange(response){
        this.addCertificateOthen.filePath=response.data[0]
      },
      // 删除附件
      removeOtherFile(){
        this.addCertificateOthen.filePath=''
      },
      // 确定新增其他证书
      additions() {
        // 正则校验通过，发起请求
        this.$refs['addCertificateOthen'].validate((valid) => {
          if (valid) {
            const params = {
              supplierUuid:this.uuid,
              // 证书名称
              ertificateName:this.addCertificateOthen.ertificateName,
              // 证书编码
              ertificateNumber:this.addCertificateOthen.ertificateNumber,
              // 生效日期
              effectiveDate:this.addCertificateOthen.effectiveDate,
              // 失效日期
              invalidDate:this.addCertificateOthen.invalidDate,
              // 文件路径
              filePath:this.addCertificateOthen.filePath,
              // 类型
              type:'5'
            }
            axios.post(config.api, '/supplier/addSupplierCertificate.do', params).then((res) => {
              if (res.status == 0) {
                this.$alert('保存成功', {
                  confirmButtonText: '确定',
                  center: true,
                  callback: action => {
                    // 隐藏新增其他证书模块
                    this.otherCertificatesShow = false
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
    }
  }
</script>

<style lang='stylus' scoped>
  .contacTitleWarp
    width 100%
    height 50px;
    margin-top 10px;
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
