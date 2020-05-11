<template>
  <div>
    <!--搜索-->
    <div class='inquiry_warp'>
      <el-form ref="screen_data" :model="screen_data" label-width="80px" :inline="true" size='mini'>
        <el-form-item label="企业类型">
          <el-select v-model="screen_data.companyType" placeholder="请选择" style='width: 100px;'>
            <el-option label="请选择" value=" "></el-option>
            <el-option label="生产商" value="0"></el-option>
            <el-option label="代理商" value="1"></el-option>
            <el-option label="承运商" value="2"></el-option>
            <el-option label="服务类" value="3"></el-option>
            <el-option label="其他" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="现场审厂">
          <el-select v-model="screen_data.isNeedExamination" placeholder="请选择" style='width: 100px;'>
            <el-option label="请选择" value=" "></el-option>
            <el-option label="否" value="0"></el-option>
            <el-option label="是" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模糊搜索">
          <el-input v-model="screen_data.conditionContent" placeholder="模糊搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class='Fuzzy' @click='changePage("screen")'>搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--表单-->
    <el-table :data="tableData" style="width: 100%"
              border
              element-loading-background="rgba(0, 0, 0, 0.8)"
              height='415'
              size='mini'
    >
      <el-table-column
        align="center"
        prop="companyName"
        label="公司名称"
        show-overflow-tooltip
        width="200">
      </el-table-column>
      <el-table-column
        align="center"
        label="企业性质"
        width='140'>
        <template slot-scope="scope">
          <span>{{scope.row.companyNature|formatType}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="contractList[0].name"
        show-overflow-tooltip
        label="联系人"
        min-width='100'>
      </el-table-column>
      <el-table-column
        align="center"
        prop="contractList[0].post"
        label="职位"
        width='120'>
      </el-table-column>
      <el-table-column
        align="center"
        prop="contractList[0].phone"
        label="电话"
        width='100'>
      </el-table-column>
      <el-table-column
        align="center"
        label="是否审厂"
        width='90'>
        <template slot-scope="scope">
          <span>{{scope.row.isNeedExamination|formatAuditor}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="状态"
        width='150'>
        <template slot-scope="scope">
          <span :class="[{'pass':scope.row.status==2||scope.row.status==4||scope.row.status==6},{'fail':scope.row.status==3||scope.row.status==5||scope.row.status==7}]">{{scope.row.status|formatState}}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if='userRole=="ROLE_ADMIN"'
        align="center"
        label="审厂资料"
        width='100'>
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click='downloadfile(scope)' v-show='scope.row.certificateList[0]'>下载</el-button>
        </template>
      </el-table-column>
      <el-table-column
        v-if='userRole=="ROLE_ADMIN"'
        align="center"
        prop="auditOpinion"
        label="审厂意见"
        show-overflow-tooltip
        min-width='200'>
      </el-table-column>
      <el-table-column
        align="center"
        prop="remark"
        label="备注"
        show-overflow-tooltip
        min-width='200'>
      </el-table-column>
      <el-table-column
        v-if='userRole=="ROLE_ADMIN"||userRole=="PURCHASER"||userRole=="PURCHASER_MANAGER"'
        align="center"
        label="操作"
        width="170">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click='hladAuditorShow(scope)' :disabled='scope.row.status!=0||scope.row.isNeedExamination==0'>
            审厂
          </el-button>
          <el-button type="text" size="mini" @click='refuseApply(scope,"agree")' :disabled='scope.row.status!="0"&&scope.row.status!="1"&&scope.row.status!="4"' >
            通过
          </el-button>
          <el-button type="text" size="mini" @click='refuseApply(scope,"reject")' :disabled='scope.row.status!="0"&&scope.row.status!="1"&&scope.row.status!="4"'>
            拒绝
          </el-button>
          <el-button type="text" size="mini" @click='ViewAudit(scope)'>
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class='page_fen'>
      <el-pagination
        background
        :page-size="ShowPage"
        layout="prev, pager, next"
        :total="totalNum"
        @current-change='changePage'
        :current-page.sync="currentPage">
      </el-pagination>
    </div>
    <!--是否需要审厂表单模块-->
    <el-dialog title="是否审厂" :visible.sync="AuditorShow" center width='350px'>
      <el-form ref="form" :model="form" label-width="80px" inline>
        <el-form-item label="是否审厂">
          <el-radio-group v-model="form.isAuditor">
            <el-radio label="0">否</el-radio>
            <el-radio label="1">是</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button size='mini' style='margin-left: 20px' type="primary" @click='setAuditor'>确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--审厂资料和审厂意见模块-->
    <el-dialog title="意见和资料" :visible.sync="AuditorDataShow">
      <el-form ref="AuditorData" :model="AuditorData" :rules="rules" label-width="80px" label-position='top'>
        <el-form-item label="审厂意见" prop='auditorOpinion'>
          <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入审厂意见"
            v-model="AuditorData.auditorOpinion"
            resize='none'
          >
          </el-input>
        </el-form-item>
        <el-form-item label="厂商资料上传" prop='dataUpload'>
          <el-upload
            :multiple='false'
            :limit='1'
            class="upload-demo"
            action="http://www.srm-greatech.com/gzSrm/system/file/upFile.do?fileType=qualification.path"
            :on-success="AuditorFileChange"
            :on-remove='removeAuditorFile'
            :headers="headerToken"
            :file-list=[]
          >
            <el-button size="small" type="success" style='margin-left:30px;margin-top:3px;width: 200px'>上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div style='width: 100%;display:flex;justify-content:center;align-items: center'>
        <el-button type="primary" size='small' @click='addOpinionData'>确定</el-button>
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
  import {mapMutations, mapState} from 'Vuex'

  export default {
    name: 'Inquiry',
    data() {
      return {
        // 文件上传token
        headerToken:{
          Authorization: localStorage.getItem('token')
        },
        // 搜索
        screen_data: {
          // 类型
          companyType: '',
          // 现场审厂
          isNeedExamination: '',
          // 内容
          conditionContent: '',
        },
        // 档案列表
        tableData: [],
        // 总条数
        totalNum: 1,
        // 当前页
        currentPage: 1,
        // 展示条数
        ShowPage: 15,
        // 是否需要审厂数据
        AuditorShow: false,
        form: {
          // 是否需要审厂
          isAuditor: ''
        },
        // 审厂意见和审厂资料
        AuditorDataShow:false,
        AuditorData:{
          // 审厂意见
          auditorOpinion:'',
          // 审厂资料文件路径
          dataUpload:'',
          // 审厂意见和审厂资料的操作类型
          type:'',
          // 是否审厂
          isNeedExamination:''
        },
        // 正则校验
        rules: {
          // 名字要和data里定义的数据一致，否则value获取不到值
          auditorOpinion: [
            {required: true, message: '审厂意见不能为空', trigger: 'blur'}
          ],
          dataUpload: [
            {required: true, message: '审厂资料不能为空', trigger: 'change'}
          ]
        }
      }
    },
    filters: {
      // 用户状态转换
      formatState: function (val) {
        if (val == 0) {
          return '待审核'
        } else if (val == 1) {
          return '现场审核中'
        } else if (val == 2) {
          return '审厂通过'
        } else if (val == 3) {
          return '审厂不通过'
        } else if (val == 4) {
          return '初步审核通过'
        } else if (val == 5) {
          return '初步审核不通过'
        } else if (val == 6) {
          return '终审通过'
        }else if (val == 7) {
          return '终审不通过'
        }
      },
      // 企业性质
      formatType: function (val) {
        if (val == 0) {
          return '国有企业'
        } else if (val == 1) {
          return '集体企业'
        } else if (val == 2) {
          return '私营企业'
        } else if (val == 3) {
          return '个体工商户'
        } else if (val == 4) {
          return '合作企业'
        }else if (val == 5) {
          return '联营企业'
        }else if (val == 6) {
          return '股份合作制企业'
        }else if (val == 7) {
          return '有限责任公司'
        }else if (val == 8) {
          return '股份有限公司'
        }
      },
      // 是否审厂
      formatAuditor: function (val) {
        if (val == 0) {
          return '否'
        } else if (val == 1) {
          return '是'
        }
      }
    },
    mounted() {
      // 获取档案列表
      this.changePage()
    },
    computed: {
      // 获取 uuid 公共state 角色身份
      ...mapState(['uuid', 'publicState','userRole']),
    },
    methods: {
      // 改变uuid，改变公共状态
      ...mapMutations(['changeUuid', 'changeState']),
      // 分页,获取档案列表
      changePage(type) {
        // 如果是来自搜索请求，当前页返回1
        if (type == "screen") {
          this.currentPage = 1
        }
        const params = {
          uuid:this.uuid,
          // 类型
          companyType: this.screen_data.companyType,
          // 现场审厂
          isNeedExamination: this.screen_data.isNeedExamination,
          // 内容
          conditionContent: this.screen_data.conditionContent,
          // 条数
          pageSize: this.ShowPage,
          // 当前页码
          pageNum: this.currentPage
        }
        axios.post(config.api, '/supplier/getBeAuditSupplierList.do', params).then((res) => {
          // 赋值档案列表
          this.tableData = res.data
          if(res.data.length>0){
            // 总条数
            this.totalNum = res.data[0].totalNum
          }
        })
      },
      // 下载资料
      downloadfile(scope) {
        window.open(scope.row.certificateList[0].filePath)
      },
      // 是否显示审厂表单模块
      hladAuditorShow(scope) {
        this.AuditorShow = true
        // 改变uuid
        this.changeUuid(scope.row.uuid)
        // 改变公共状态
        this.changeState(scope.row.status)
      },
      // 确定审厂状态
      setAuditor() {
        const params = {
          uuid: this.uuid,
          // 操作类型
          operateType: 'check',
          // 状态
          status: this.publicState,
          isNeedExamination: this.form.isAuditor
        }
        axios.post(config.api, '/supplier/auditSupplier.do', params).then((res) => {
          let _this = this;
          if (res.status == 0) {
            this.$alert('保存成功', {
              confirmButtonText: '确定',
              center: true,
              callback: action => {
                // 隐藏审厂表单
                _this.AuditorShow = false
                // 重新获取数据
                _this.changePage()
              }
            })
          } else {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true,
            })
          }

        })
      },
      // 拒绝申请或同意申请
      refuseApply(scope, type) {
        // 判断类型是否审核是拒绝还是通过
        let operation = ''
        this.changeUuid(scope.row.uuid)
        if (type == 'agree') {
          operation = type
          if(scope.row.status=='1'){
            // 显示上传审厂资料模块
            this.AuditorDataShow=true
            // 改变公共状态
            this.changeState(scope.row.status)
            // 审厂意见和审厂资料的操作类型
            this.AuditorData.type=operation
            // 是否审厂
            this.AuditorData.isNeedExamination=scope.row.isNeedExamination
          }else{
            // 如果是待审核的状态，直接拒绝或者同意，不需要填写审厂资料和审厂信息
            const params = {
              uuid: scope.row.uuid,
              // 操作类型
              operateType: operation,
              // 状态
              status: scope.row.status,
              // 审厂意见
              auditOpinion: '',
              // 是否审厂
              isNeedExamination: scope.row.isNeedExamination
            }

            axios.post(config.api, '/supplier/auditSupplier.do', params).then((res) => {
              let _this = this;
              if (res.status == 0) {
                this.$alert('保存成功', {
                  confirmButtonText: '确定',
                  center: true,
                  callback: action => {
                    // 重新获取数据
                    _this.changePage()
                  }
                })
              } else {
                this.$alert(res.msg, {
                  confirmButtonText: '确定',
                  center: true,
                })
              }
            })
          }

        } else if (type == 'reject') {
          operation = type
          // 判断是否需要填写审厂资料和上传审厂资料
          if(scope.row.status=='1'){
            // 显示上传审厂资料模块
            this.AuditorDataShow=true
            // 改变公共状态
            this.changeState(scope.row.status)
            // 审厂意见和审厂资料的操作类型
            this.AuditorData.type=operation
            // 是否审厂
            this.AuditorData.isNeedExamination=scope.row.isNeedExamination
          }else{
            // 如果是待审核的状态，直接拒绝或者同意，不需要填写审厂资料和审厂信息
            const params = {
              uuid: scope.row.uuid,
              // 操作类型
              operateType: operation,
              // 状态
              status: scope.row.status,
              // 审厂意见
              auditOpinion: '',
              // 是否审厂
              isNeedExamination: scope.row.isNeedExamination
            }
            axios.post(config.api, '/supplier/auditSupplier.do', params).then((res) => {
              let _this = this;
              if (res.status == 0) {
                this.$alert('保存成功', {
                  confirmButtonText: '确定',
                  center: true,
                  callback: action => {
                    // 重新获取数据
                    _this.changePage()
                  }
                })
              } else {
                this.$alert(res.msg, {
                  confirmButtonText: '确定',
                  center: true,
                })
              }
            })
          }
        }
      },
      // 厂商文件上传成功时
      AuditorFileChange(response){
        this.AuditorData.dataUpload=response.data[0]
        // 移除当前项的校验
        this.$refs['AuditorData'].clearValidate(['dataUpload']);
      },
      // 厂商文件移除时
      removeAuditorFile(){
        this.AuditorData.dataUpload=''
      },
      // 确定上传审厂资料和审厂意见
      addOpinionData(){
        this.$refs['AuditorData'].validate((valid) => {
          if (valid) {
            // 上传审厂资料和意见
            const params={
              uuid:this.uuid,
              // 审厂意见
              auditOpinion:this.AuditorData.auditorOpinion,
              // 审厂资料路径
              filePath:this.AuditorData.dataUpload,
              // 操作类型
              operateType: this.AuditorData.type,
              // 状态
              status: this.publicState,
              // 是否审厂
              isNeedExamination: this.AuditorData.isNeedExamination
            }
            axios.post(config.api, '/supplier/auditSupplier.do', params).then((res) => {
              let _this = this;
              if (res.status == 0) {
                this.$alert('保存成功', {
                  confirmButtonText: '确定',
                  center: true,
                  callback: action => {
                    // 隐藏上传审厂资料和意见模块
                    _this.AuditorDataShow = false
                    // 清除数据
                    _this.AuditorData.auditorOpinion=''
                    _this.AuditorData.dataUpload=''
                    // 重新获取数据
                    _this.changePage()
                  }
                })
              } else {
                this.$alert(res.msg, {
                  confirmButtonText: '确定',
                  center: true,
                })
              }

            })
          }
        })

      },
      // 查看详情
      ViewAudit(scope){
          this.changeUuid(scope.row.uuid)
          if(scope.row.status==0){
            this.$router.push('seeBeAudited')
          }else {
            this.$router.push('viewManufacturer')
          }
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .inquiry_warp
    width: 100%;
    margin-top 20px;
    padding-top: 10px;
    margin-bottom: 10px;
    .Fuzzy
      width: 65px;
      margin: 0px 10px;

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

