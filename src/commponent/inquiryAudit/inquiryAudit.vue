<template>
  <div>
    <!--搜索-->
    <div class='inquiry_warp'>
      <el-form ref="screen_data" :model="screen_data" label-width="80px" :inline="true" size='mini'>
        <el-form-item label="报价编号">
          <el-input v-model="screen_data.tenderId" placeholder="请输入报价标号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class='Fuzzy' @click='handleCurrentChange("screen")'>搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--表单-->
    <el-table :data="formList" style="width: 100%"
              border
              element-loading-background="rgba(0, 0, 0, 0.8)"
              height='415'
              size='mini'
              ref='table'
              :row-key="getRowKeys"
              :expand-row-keys="expands"
              @expand-change='openRowExpansions'
    >
      <el-table-column
        type="index"
        align='center'
        width="50">
      </el-table-column>
      <el-table-column
        align="center"
        prop="tenderId"
        label="询报价编号"
        width="150">
      </el-table-column>
      <el-table-column
        align="center"
        label="项目名称"
        prop='projectName'
        min-width='220'>
      </el-table-column>
      <el-table-column
        prop="tenderingType"
        label="询报价类别"
        align='center'
        width="100">
      </el-table-column>
      <el-table-column
        align="center"
        label="活动时间"
        min-width='240'>
        <template slot-scope="scope">
          <span>{{scope.row.activityTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="username"
        label="发起人"
        width='100'>
      </el-table-column>
      <el-table-column
        align="center"
        label="已审核人"
        width='100'>
        <template slot-scope="scope">
          <span>{{scope.row.approverName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="参与人数"
        width='80'>
        <template slot-scope="scope">
          <span>{{scope.row.participants}}</span>
        </template>
      </el-table-column>

      <el-table-column
        align='center'
        label="操作"
        width="80">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click='hlderDialogShow(scope)'
            :disabled='scope.row.participants==0||scope.row.approverCount==3'
          >
            审批
          </el-button>
        </template>
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <div v-if="props.row.approverCount==3">
            <div v-for="item in props.row.managementSpecificVOList" :key='item.replyUuid' class='xiala'>
              <el-form label-position="center" inline class="demo-table-expand">
                <el-form-item label="询报价编号">
                  <span>{{item.tenderId}}</span>
                </el-form-item>
                <el-form-item label="投标公司">
                  <span>{{item.supplierName}}</span>
                </el-form-item>
                <el-form-item label="轮次">
                  <span>{{item.temderNumber}}</span>
                </el-form-item>
                <el-form-item label="项目名称">
                  <span>{{item.projectName}}</span>
                </el-form-item>
                <el-form-item label="单价">
                  <span>{{item.unitprice}}</span>
                </el-form-item>
                <el-form-item label="是否参与竞标">
                  <span>{{item.approval|filterApproval}}</span>
                </el-form-item>
                <el-form-item label="中标状态">
                  <span
                    :class="[item.whetherbid=='1'?'yesAbnormal':'noAbnormal']">{{item.whetherbid|filterWhetherbid}}</span>
                </el-form-item>
                <el-form-item>
                  <el-button type="danger" size='mini' @click='WinningBid(item,1)' :disabled='props.row.isitover==1'>
                    中标
                  </el-button>
                  <el-button type="info" size='mini' @click='enterDetails(item)'>详情</el-button>
                  <el-button type="success" size='mini' @click='downloadFiles(item)'>下载</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
          <div v-if="props.row.participants==0" class="zanwu">暂无</div>
          <div v-if='props.row.approverCount!=3&&props.row.participants!=0' class="zanwu">全部人审核后方可查看</div>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class='page_fen'>
      <el-pagination
        background
        :page-size="screen_data.pageSize"
        layout="prev, pager, next"
        :total="screen_data.totalNum"
        @current-change="handleCurrentChange"
        :current-page.sync="screen_data.pageIndex">
      </el-pagination>
    </div>

    <!--审核弹窗-->
    <el-dialog
      title="询报价审核"
      :visible.sync="dialogVisible"
      width="400px"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="form" label-width="80px" :inline="true" size='mini'>
        <el-form-item label="审核状态">
          <el-select v-model="form.Audit" placeholder="请选择活动区域">
            <el-option label="未选择" value="0"></el-option>
            <el-option label="通过" value="1"></el-option>
            <el-option label="不通过" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">确定</el-button>
        </el-form-item>
      </el-form>

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
    name: 'inquiryAudit',
    data() {
      return {
        // 搜索
        screen_data: {
          // 询报价编码
          tenderId: '',
          // 当前页
          pageIndex: 1,
          // 请求条数
          pageSize: 10,
          //总数
          totalNum: 0,
        },
        // 列表
        formList: [],
        // 中标颜色状态
        yesAbnormal: 'yesAbnormal',
        noAbnormal: 'noAbnormal',
        // 审核弹窗显示状态
        dialogVisible: false,
        // 选中的审核内容
        selectId: '',
        // 审核状态
        form: {
          Audit: '0'
        },
        // 一次只能展开一行
        expands: [],
        getRowKeys(row) {
          return row.offeruuid
        }
      }
    },
    filters: {
      // 中标状态
      filterWhetherbid: (val) => {
        if (val == 0) {
          return '未选择'
        } else if (val == 1) {
          return '中标'
        } else if (val == 2) {
          return '未中标'
        }
      },
      // 参与状态
      filterApproval: (val) => {
        if (val == 0) {
          return '未选择'
        } else if (val == 1) {
          return '参与竞标'
        } else if (val == 2) {
          return '放弃竞标'
        }
      }
    },
    mounted() {
      this.handleCurrentChange()
    },
    computed: {
      ...mapState(['uuid'])
    },
    methods: {
      ...mapMutations(['changeUuid', 'changePagePresentState']),
      // 获取列表数据
      handleCurrentChange(data) {
        if (data == 'screen') {
          this.screen_data.pageIndex = 1
        }
        const params = {
          tenderId: this.screen_data.tenderId,
          fuzzySearch: this.screen_data.fuzzySearch,
          pageIndex: this.screen_data.pageIndex,
          pageSize: this.screen_data.pageSize,
        }
        axios.post(config.api, '/replymanagement/listByInquiryVo.do', params).then((res) => {
          if (res.status == 0) {
            this.formList = res.data
            if (res.data.length > 0) {
              this.screen_data.totalNum = res.data[0].totalNum
            }
          }
        })
      },
      // 审核状态显示
      hlderDialogShow(scope) {
        // 存储选中的id
        this.selectId = scope.row.offeruuid
        // 显示审核弹窗
        this.dialogVisible = true
      },
      // 审核状态
      onSubmit() {
        const params = {
          offeruuid: this.selectId,
          whetherToAudit: this.form.Audit
        }
        console.log(params)
        axios.post(config.api, '/replymanagement/insertAndUpdateInquiryVo.do', params).then((res) => {
          console.log(res)
          if (res.status == 0) {
            // 错误提示
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true,
              callback: action => {
                // 重新获取数据
                this.handleCurrentChange()
                // 关闭审核
                this.handleClose()
              }
            })
          } else {
            // 错误提示
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true,
              callback: action => {
                // 关闭审核
                this.handleClose()
              }
            })
          }
        })
      },
      // 关闭审核状态显示
      handleClose() {
        this.form.Audit = '0'
        this.dialogVisible = false
      },
      // 中标
      WinningBid(item, type) {
        const params = {
          uuid: item.replyUuid,
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
            })
          } else {
            // 错误提示
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      // 进入详情
      enterDetails(item) {
        // 改变查看详情类型状态
        this.changePagePresentState('Choice')
        this.changeUuid(item.replyUuid)
        this.$router.push('selectView')
      },
      // 下载文件
      downloadFiles(item) {
        const params = {
          pagePresentation: "Details",
          uuid: item.replyUuid
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
      },
      // 记录展开的是哪一行
      openRowExpansions(row, expandedRows){
        var that = this
        if (expandedRows.length) {
          that.expands = []
          if (row) {
            that.expands.push(row.offeruuid)// 每次push进去的是每行的ID
          }
        } else {
          that.expands = []// 默认不展开
        }
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .inquiry_warp
    width: 100%;
    margin-top: 20px;
    margin-bottom: 10px;



  .xiala {
    margin 10px 0px;
    padding 10px 20px;
    background #f5f5f5;
  }

  .yesAbnormal {
    color: #F56C6C
  }

  .noAbnormal {
    color: #ccc;
  }

  .zanwu
    width 100%
    text-align center


  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

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
