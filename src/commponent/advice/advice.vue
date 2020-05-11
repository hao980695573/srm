<template>
  <div>
    <!--搜索-->
    <div class='inquiry_warp'>
      <el-form ref="screen_data" :model="screen_data" label-width="80px" :inline="true" size='mini'>
        <el-form-item label="报价类型">
          <el-select v-model="screen_data.tenderType" placeholder="请选择询报价类型" style='width: 120px'>
            <el-option label="请选择" value=""></el-option>
            <el-option label="指定供应商" value="0"></el-option>
            <el-option label="所有供应商" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报价标号">
          <el-input v-model="screen_data.tenderID" placeholder="请输入询报价标号" style='width: 140px'></el-input>
        </el-form-item>
        <el-form-item label="模糊搜索">
          <el-input v-model="screen_data.fuzzySearch" placeholder="模糊搜索" style='width: 140px'></el-input>
        </el-form-item>
          <el-button type="primary" class='Fuzzy' @click='handleCurrentChange("screen")' size="mini">搜索</el-button>
          <el-button type="danger" class='Fuzzy' @click='Release' size="mini">发布</el-button>
      </el-form>
    </div>
    <!--管理列表-->
    <el-table
      :data="InquiryList"
      border
      style="width: 100%"
      height='415px'
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      v-loading.fullscreen.lock="loading"
      size='mini'
    >
      <el-table-column
        type="index"
        align='center'
        width="50">
      </el-table-column>
      <el-table-column
        prop="tenderID"
        label="报价编码"
        align='center'
        min-width="140">
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
        min-width="100">
      </el-table-column>
      <el-table-column
        prop="temderNumber"
        label="轮次"
        align='center'
        width="100">
      </el-table-column>
      <el-table-column
        label="活动时间"
        align='center'
        min-width="240">
        <template slot-scope="scope">
          <span>{{scope.row.activityTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align='center'
        label="操作"
        min-width="130">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small" @click='examine(scope)'>
            修改
          </el-button>
          <el-button
            type="text"
            size="small" @click='deleteAdvice(scope)'>
            删除
          </el-button>
          <el-button
            type="text"
            size="small" @click='enterView(scope)'>
            查看
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class='page_fen' v-show='InquiryList.length>0'>
      <el-pagination
        size='mini'
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
  import {mapMutations,mapState} from 'Vuex'

  export default {
    name: 'advice',
    data() {
      return {
        // 搜索
        screen_data: {
          // 询报价类型
          tenderType: '',
          // 询报价编码
          tenderID: '',
          // 模糊搜索
          fuzzySearch: ''
        },
        // 列表管理
        InquiryList: [],
        // 请求条数
        pageSize: 8,
        // 当前页码
        pageIndex: 1,
        // 总条数
        totalNum: 0,
        // 是否加载完成
        loading: true
      }
    },
    computed:{
      ...mapState(['uuid','userRole'])
    },
    mounted() {
      this.handleCurrentChange()
    },
    methods: {
      ...mapMutations(['changeUuid']),
      // 进入发布页面
      Release() {
        this.$router.push('advicePublish')
      },
      // 获取列表数据
      handleCurrentChange(type) {
        // 如果是快捷搜索，当前页返回1
        if (type == 'screen') {
          this.pageIndex = 1
        }
        // loading类型
        this.loading = true;

        const params = {
          tenderType: this.screen_data.tenderType,
          tenderID: this.screen_data.tenderID,
          fuzzySearch: this.screen_data.fuzzySearch,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        }
        axios.post(config.api, '/offermanagement/listAllqueries.do', params).then((res) => {
          this.InquiryList = res.data
          // 加载完成
          this.loading = false
          // 总数
          if (res.data.length > 0) {
            this.totalNum = res.data[0].totalNum
          }

        })
      },
      // 删除
      deleteAdvice(scope) {
        const params = [{
          uuid: scope.row.uuid
        }]
        axios.post(config.api, '/offermanagement/deleteOfferManagement.do', params).then((res) => {
          if (res.status == 0) {
            this.$alert('删除成功', {
              confirmButtonText: '确定',
              center: true,
              callback: action => {
                // 重新获取数据
                this.handleCurrentChange()
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
      // 进入查看页面
      enterView(scope) {
        // 改变公共uuid
        this.changeUuid(scope.row.uuid)
        // 跳转页面
        this.$router.push('viewQuotation')
      },
      // 进入修改页面
      examine(scope) {
        // 修改公共uuid
        this.changeUuid(scope.row.uuid)
        this.$router.push('updateOfferManagement')
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .inquiry_warp{
    width: 100%;
    margin-top 20px;
    padding-top: 10px;
    margin-bottom: 10px;
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

  .Fuzzy{
    width: 65px;
    margin: 0px 10px;
  }
</style>
