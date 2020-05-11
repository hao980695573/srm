<template>
  <div>
    <!--搜索-->
    <div class='inquiry_warp'>
      <el-form ref="screen_data" :model="screen_data" label-width="80px" :inline="true" size='mini'>
        <el-form-item label="报价标号">
          <el-input v-model="screen_data.tenderId" placeholder="请输入询报价标号"></el-input>
        </el-form-item>
        <el-form-item label="模糊搜索">
          <el-input v-model="screen_data.fuzzySearch" placeholder="模糊搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class='Fuzzy' @click='handleCurrentChange("screen")'>搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--表单-->
    <el-table :data="form" style="width: 100%"
              border
              element-loading-background="rgba(0, 0, 0, 0.8)"
              height='415'
              size='mini'
    >
      <el-table-column
        align="center"
        prop="tenderId"
        label="报价编号"
        show-overflow-tooltip
        min-width="130">
      </el-table-column>
      <el-table-column
        align="center"
        prop="vendorname"
        label="供应商"
        min-width='180'>
      </el-table-column>
      <el-table-column
        align="center"
        label="项目名称"
        min-width='220'>
        <template slot-scope="scope">
          <span>{{scope.row.projectName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="tenderingType"
        label="询报价类别"
        align='center'
        width="100">
      </el-table-column>
      <el-table-column
        align="center"
        label="轮次"
        prop='temderNumber'
        width='60'>
      </el-table-column>
      <el-table-column
        align="center"
        prop="unitprice"
        label="单价"
        width='100'>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="92">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click='enterDetails(scope)'>
            详情
          </el-button>
          <el-button type="text" size="mini" @click='downloadFiles(scope)'>
            下载
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class='page_fen'>
      <el-pagination
        background
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="totalNum"
        @current-change="handleCurrentChange"
        :current-page.sync="pageIndex">
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
  import {mapMutations} from 'Vuex'

  export default {
    name: 'InquiryChoice',
    data() {
      return {
        // 选择
        screen_data: {
          // 标号
          tenderId: '',
          // 模糊搜索
          fuzzySearch: ''
        },
        // 表格
        form: [],
        // 当前页码
        pageIndex: 1,
        // 请求页数
        pageSize: 12,
        // 总条数
        totalNum: 0
      }
    },
    mounted() {
      // 获取列表
      this.handleCurrentChange()
    },
    filters: {
      // 状态
      filterWhetherbid: function (val) {
        if (val == 0) {
          return '未选择'
        } else if (val == 1) {
          return '中标'
        } else if (val == 2) {
          return '未中标'
        }
      }
    },
    methods: {
      ...mapMutations(['changeUuid','changePagePresentState']),
      // 获取列表
      handleCurrentChange(type) {
        // 如果是快捷搜索
        if (type == 'screen') {
          this.pageIndex = 1
        }
        const params = {
          approval: this.screen_data.approval,
          tenderId: this.screen_data.tenderId,
          fuzzySearch: this.screen_data.fuzzySearch,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
        axios.post(config.api, '/replymanagement/listBySupplier.do', params).then((res) => {
          console.log(res)
          if (res.status == 0) {
            this.form = res.data

            if(res.data.length>0){
              this.totalNum = res.data[0].totalNum
            }
          }
        })
      },
      // 中标
      WinningBid(scope, type) {
        const params = {
          uuid: scope.row.uuid,
          whetherbid: type
        }
        axios.post(config.api, '/replymanagement/updateByWhetherbid.do', params).then((res) => {
          console.log(res)
          if (res.status == 0) {
            // 错误提示
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true,
              callback: action => {
                // 重新获取数据
                this.handleCurrentChange()
              }
            });
          }
        })
      },
      // 进入详情
      enterDetails(scope) {
        // 改变查看详情类型状态
        this.changePagePresentState('Choice')
        this.changeUuid(scope.row.uuid)
        this.$router.push('selectView')
      },
      // 下载文件
      downloadFiles(scope){
        const params={
          pagePresentation:"Details",
          uuid:scope.row.uuid
        }
        axios.getFile(config.noNeedLogionApi, 'skip/exportData.do', params).then((response) => {
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(new Blob([response]));
          link.target = "_blank";
          link.download = '报价单.xls';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .inquiry_warp
    width: 100%;
    height: 40px;
    background: #ddd;
    padding-top: 10px;
    margin-bottom: 10px;


  /*分页*/
  .page_fen {
    width: 100%;
    height: 50px;
    background: #ddd;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    padding: 0px 20px;
    box-sizing: border-box;
  }

  .Fuzzy {
    width: 65px;
    margin: 0px 10px;
  }
</style>
