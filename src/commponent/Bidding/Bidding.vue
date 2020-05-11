<template>
  <div>
    <!--搜索-->
    <div class='inquiry_warp'>
      <el-form ref="screen_data" :model="screen_data" label-width="80px" :inline="true" size='mini'>
        <el-form-item label="状态">
          <el-select v-model="screen_data.approval1"  style='width: 100px'>
            <el-option label="请选择" value=" "></el-option>
            <el-option label="参与报价" value="1"></el-option>
            <el-option label="放弃报价" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="报价标号">
          <el-input v-model="screen_data.tenderID" placeholder="请输入询报价标号" style='width: 140px'></el-input>
        </el-form-item>
        <el-form-item label="模糊搜索">
          <el-input v-model="screen_data.fuzzySearch" placeholder="模糊搜索" style='width: 140px'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class='Fuzzy' @click='handleCurrentChange("screen")'>搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--竞标列表-->
    <el-table
      :data="BiddingList"
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
        min-width="150">
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
        label="报价状态"
        align='center'
        width="100">
        <template slot-scope="scope">
          <span :class="[{'pass':scope.row.approval1==1},{'fail':scope.row.approval1==2}]">{{scope.row.approval1|filterApproval}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否中标"
        align='center'
        width="100">
        <template slot-scope="scope">
          <span :class="[{'pass':scope.row.whetherbid==1},{'fail':scope.row.whetherbid==2}]">{{scope.row.whetherbid|filterWhetherbid}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="是否完结"
        align='center'
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.isitover|filterIsitover}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align='center'
        label="操作"
        width="130">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small" @click='enterQuoteReply(scope.row)' :disabled="scope.row.approval1==1||scope.row.approval1==2||scope.row.isitover==1">
            参与
          </el-button>
          <el-button
            type="text"
            size="small"
            @click='giveUp(scope.row)'
            :disabled="scope.row.approval1==1||scope.row.approval1==2||scope.row.isitover==1"
          >
            放弃
          </el-button>
          <el-button
            type="text"
            size="small"
            @click='enterSelectView(scope.row)'
            :disabled="scope.row.approval1!=1&&scope.row.approval1!=2"
          >
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class='page_fen' v-show='BiddingList.length>0'>
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
  // 引入公共方法
  import Interface from 'api/Interface.js'
  // Vuex语法糖
  import {mapMutations} from 'Vuex'

  export default {
    name:'Bidding',
    data(){
      return{
        screen_data:{
          approval1:'',
          tenderID:'',
          fuzzySearch:''
        },
        // 是否加载完成
        loading:true,
        // 参与竞标
        BiddingList:[{
          // 询报价类型
          tenderType:'',
          // 询报价编码
          tenderID:'',
          // 询报价轮次
          temderNumber:'',
          // 竞标状态
          approval1:''
        }],
        // 请求条数
        pageSize: 16,
        // 当前页码
        pageIndex: 1,
        // 总条数
        totalNum: 0,
      }
    },
    mounted(){
      // 获取列表数据
      this.handleCurrentChange()
    },
    filters:{
      // 竞标状态
      filterApproval(val){
        if(val==0){
          return '待确定'
        }else if (val == 1) {
          return '参与报价'
        } else if (val == 2) {
          return '放弃报价'
        }
      },
      // 是否中标
      filterWhetherbid(val){
        if(val==0){
          return '未选择'
        }else if (val == 1) {
          return '中标'
        } else if (val == 2) {
          return '未中标'
        }
      },
      filterIsitover(val){
        if(val==0){
          return '未完结'
        }else if(val==1){
          return '完结'
        }
      }
    },
    methods:{
      ...mapMutations(['changeUuid','changePagePresentState']),
      // 获取列表数据
      handleCurrentChange(type){
        // 如果是快捷搜索，当前页返回1
        if (type == 'screen') {
          this.pageIndex = 1
        }
        this.loading = true
        const params = {
          tenderType:'',
          approval1: this.screen_data.approval1,
          tenderID: this.screen_data.tenderID,
          fuzzySearch: this.screen_data.fuzzySearch,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
        }
        axios.post(config.api, '/bidmanagement/listByApproval.do', params).then((res) => {
          if(res.status==0){
            console.log(res);
            this.BiddingList = res.data
            // 加载完成
            this.loading = false
            // 总数
            if (res.data.length > 0) {
              this.totalNum = res.data[0].totalNum
            }
          }else{
            this.$alert(data.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      // 进入参与竞标
      enterQuoteReply(scope){
        // 改变公共uuid
        this.changeUuid(scope.uuid)
        this.$router.push('quoteReply')
      },
      // 放弃竞标
      giveUp(scope){
        const params={
          uuid:scope.uuid,
          approval:"2"
        }
        console.log(params);
        axios.post(config.api, '/bidmanagement/updateBid.do', params).then((res) => {
          console.log(res)
          if(res.status==0){
            let _this=this;
            this.$alert(res.msg,{
              confirmButtonText:'确定',
              center:true,
              callback: action => {
                // 重新获取数据
                _this.handleCurrentChange()
              }
            })
          }else{
            this.$alert(data.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      // 进入查看详情
      enterSelectView(scope){
        // 改变公共uuid
        this.changeUuid(scope.uuid)
        // 改变查看详情类型状态
        this.changePagePresentState('Details')
        this.$router.push('selectView')
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .inquiry_warp{
    width: 100%;
    margin-top: 20px;
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
