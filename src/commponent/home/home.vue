<template>
  <div>
    <!--搜索-->
    <div class='inquiry_warp'>
      <el-form ref="screen_data" :model="screen_data" label-width="80px" :inline="true" size='mini'>
        <el-form-item label="企业类型">
          <el-select v-model="screen_data.companyType" placeholder="请选择" style='width: 100px'>
            <el-option label="请选择" value=" "></el-option>
            <el-option label="生产商" value="0"></el-option>
            <el-option label="代理商" value="1"></el-option>
            <el-option label="承运商" value="2"></el-option>
            <el-option label="服务类" value="3"></el-option>
            <el-option label="其他" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="现场审厂">
          <el-select v-model="screen_data.isNeedExamination" placeholder="请选择" style='width: 100px'>
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
        width='130'>
      </el-table-column>
      <el-table-column
        align="center"
        prop="contractList[0].phone"
        label="电话"
        width='120'>
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
        width='100'>
        <template slot-scope="scope">
          <span :class="[{'pass':scope.row.status==2||scope.row.status==4||scope.row.status==6},{'fail':scope.row.status==3||scope.row.status==5||scope.row.status==7}]">{{scope.row.status|formatState}}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if='userRole=="ROLE_ADMIN"'
        align="center"
        label="审厂资料"
        width='90'>
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
        width='200'>
      </el-table-column>
      <el-table-column
        align="center"
        prop="remark"
        label="备注"
        show-overflow-tooltip
        width='200'>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="70">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click='haldEditor(scope)' >
            编辑
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
      // 获取 uuid 角色身份
      ...mapState(['supplierUUid','userRole']),
    },
    methods: {
      // 改变uuid，改变公共状态
      ...mapMutations(['changeUuid']),
      // 进入编辑模块
      haldEditor(scope) {
        // 存储uuid
        this.changeUuid(scope.row.uuid)
        // 跳转
        this.$router.push('manufacturer')
      },
      // 分页,获取档案列表
      changePage(type) {
        // 如果是来自搜索请求，当前页返回1
        if (type == "screen") {
          this.currentPage = 1
        }
        const params = {
          uuid:this.supplierUUid,
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
        axios.post(config.api, '/supplier/getSupplierList.do', params).then((res) => {
          // 赋值档案列表
          if(res.status==0){
            this.tableData = res.data
            // 总条数
            if(res.data.length>0){
              this.totalNum = res.data[0].totalNum
            }
          }else{
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      // 下载资料
      downloadfile(scope) {
        window.open(scope.row.certificateList[0].filePath)
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .inquiry_warp
    width: 100%;
    margin-top 20px;
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
