<template>
  <div>
    <!--tab切换-->
    <el-tabs v-model="activeName">
      <el-tab-pane label="基础信息" name="first">
        <div>
          <!--标题-->
          <div class='contacTitleWarp'>
            <div class='contacTitle'>询报价基础信息</div>
          </div>
          <!--表单-->
          <div class='inquiry_warp'>
            <el-form :model="form" label-width="100px" size='mini'>
              <el-form-item label="询报价类型">
                <el-select v-model="form.tenderType" placeholder="请选择询报价类型" disabled>
                  <el-option label="指定供应商" value="0"></el-option>
                  <el-option label="所有供应商" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="询报价编号">
                <el-input v-model="form.tenderId" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item label="项目名称">
                <el-input v-model="form.projectName" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item label="询报价类别" prop='tenderingType'>
                <el-input v-model="form.tenderingType" readonly></el-input>
              </el-form-item>
              <el-form-item label="投标数量" prop='needNumber'>
                <el-input v-model="form.needNumber" readonly></el-input>
              </el-form-item>
              <el-form-item label="询报价轮数">
                <el-input v-model="form.temderNumber" :readonly="true">
                  <template slot="append">次</template>
                </el-input>
              </el-form-item>
              <el-form-item label="活动时间">
                <el-date-picker
                  v-model="BiddingTime"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format='yyyy-MM-dd HH:mm:ss'
                  format="yyyy-MM-dd HH:mm:ss"
                  readonly
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="其他需求">
                <el-input
                  type="textarea"
                  :rows="6"
                  placeholder="无"
                  v-model="form.otherrequirment"
                  resize='none'
                  :readonly="true"
                >
                </el-input>
              </el-form-item>
            </el-form>
          </div>
          <!--联系方式标题-->
          <div class='contacTitleWarp'>
            <div class='contacTitle'>联系方式</div>
          </div>
          <!--联系方式内容-->
          <div class='contacTinformation'>
            <el-table
              :data="form.contactList"
              border
              style="width: 100%"
              size="mini"
            >
              <el-table-column
                type="index"
                align='center'
                width="50">
              </el-table-column>
              <el-table-column
                prop="contactDept"
                label="部门"
                align='center'
                width="220">
              </el-table-column>
              <el-table-column
                prop="contactName"
                label="姓名"
                align='center'
                min-width="220">
              </el-table-column>
              <el-table-column
                prop="contactPosition"
                label="职位"
                align='center'
                min-width="220">
              </el-table-column>
              <el-table-column
                prop="contactPhone"
                label="手机"
                align='center'
                min-width="220">
              </el-table-column>
              <el-table-column
                prop="contactMailbox"
                label="邮箱"
                align='center'
                min-width="220">
              </el-table-column>
            </el-table>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="询报价内容" name="second">
        <!--标题-->
        <div class='contacTitleWarp'>
          <div class='contacTitle'>商品组成部分</div>
        </div>
        <!--商品组成部分-->
        <div class='contacTinformation'>
          <el-table :data="contentsShen" align="center" border size='mini' height='345'>
            <el-table-column prop="modelNumber" :label="headerDate.modelNumber" min-width="120" align="center"></el-table-column>
            <el-table-column prop="sparepartsName" :label="headerDate.sparepartsName" width="120" align="center"></el-table-column>
            <el-table-column prop="accessoriesSize" :label="headerDate.accessoriesSize" width="200" align="center"></el-table-column>
            <el-table-column prop="valuation" :label="headerDate.valuation" width="130" align="center"></el-table-column>
            <el-table-column prop="materialCost" :label="headerDate.materialCost" width="150" align="center"></el-table-column>
            <el-table-column prop="colour" :label="headerDate.colour" width="100%" align="center"></el-table-column>
            <el-table-column prop="productNumber" :label="headerDate.productNumber" width="120" align="center"></el-table-column>
            <el-table-column prop="company" :label="headerDate.company" width="150" align="center"></el-table-column>
            <el-table-column prop="untaxedPrice" :label="headerDate.untaxedPrice" width="150" align="center"></el-table-column>
            <el-table-column prop="unitPrice" :label="headerDate.unitPrice" width="80" align="center"></el-table-column>
            <el-table-column prop="moldFee" :label="headerDate.moldFee" width="100" align="center"></el-table-column>
            <el-table-column prop="loss" :label="headerDate.loss" width="100" align="center"></el-table-column>
            <el-table-column prop="sparePart" :label="headerDate.sparePart" width="100" align="center"></el-table-column>
            <el-table-column prop="packingMethod" :label="headerDate.packingMethod" width="100" align="center"></el-table-column>
            <el-table-column prop="steppedPrice0End50" :label="headerDate.steppedPrice0End50" width="150" align="center"></el-table-column>
            <el-table-column prop="steppedPrice50End100" :label="headerDate.steppedPrice50End100" width="150" align="center"></el-table-column>
            <el-table-column prop="steppedPrice100End200" :label="headerDate.steppedPrice100End200" width="150" align="center"></el-table-column>
            <el-table-column prop="steppedPrice200End300" :label="headerDate.steppedPrice200End300" width="150" align="center"></el-table-column>
            <el-table-column prop="steppedPrice300End500" :label="headerDate.steppedPrice300End500" width="150" align="center"></el-table-column>
          </el-table>
        </div>

        <!--供应商回复内容-->
        <div class='contacTitleWarp'>
          <div class='contacTitle'>供应商回复内容</div>
        </div>
        <!--回复表单-->
        <div class='inquiry_warp'>
          <el-form :model="form" label-width="80px" label-position='top'
                   size='mini'>
            <el-form-item label="其他回复">
              <el-input
                type="textarea"
                :rows="6"
                placeholder="无"
                v-model="form.otherreply"
                resize='none'
                readonly
              >
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  // Vuex语法糖
  import {mapState} from 'Vuex'
  // 引入公共配置
  import {config} from 'api/config.js';
  // 引入公共方法
  import Interface from 'api/Interface.js'
  //引入接口文件请求文件
  import axios from 'api/axios.js'

  export default {
    name: 'selectView',
    data() {
      return {
        // 默认显示tab
        activeName:'first',
        // 数据
        form:{},
        // 商品组成部分头部
        headerDate:{
          sparepartsName: "",
          company: "",
          productNumber: "",
          accessoriesSize: "",
          valuation: "",
          modelNumber: "",
          materialCost: "",
          colour: "",
          untaxedPrice: "",
          unitPrice: "",
          moldFee: "",
          loss: "",
          sparePart: "",
          packingMethod: "",
          totalAmount: "",
          steppedPrice0End50: "",
          steppedPrice50End100: "",
          steppedPrice100End200: "",
          steppedPrice200End300: "",
          steppedPrice300End500: ""
        },
        // 商品组成部分表身
        contentsShen:[],
        // 日期
        BiddingTime:[]
      }
    },
    computed: {
      ...mapState(['uuid','pagePresentState'])
    },
    filters: {
      // 开始时间
      filterStartTime(val) {
        if (Interface.renderTime(val)) {
          return Interface.renderTime(val).slice(0, 10)
        }
      },
      // 结束时间
      filterEndTime(val) {
        if (Interface.renderTime(val)) {
          return Interface.renderTime(val).slice(0, 10)
        }
      },
    },
    mounted() {
      // 获取基本信息
      this.getViewData()
    },
    methods: {
      // 获取基本信息
      getViewData() {
        const params = {
          replyUuid: this.uuid,
          pagePresentation:this.pagePresentState
        }
        axios.post(config.api, '/replymanagement/inquiryDisplay.do', params).then((res) => {
          if (res.status == 0) {
            this.form = res.data
            // 活动时间
            this.BiddingTime.push(res.data.startTime, res.data.endTime)
            // 商品组成部分头部
            this.headerDate=res.data.replyQuotation
            // 商品组成部分表身
            this.contentsShen=res.data.inquiryList
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
    background #f5f5f5;
    position relative
    .contacTitle
      width 130px;
      line-height 50px;
      font-size 18px;
      text-align center
      position absolute
      left 50%;
      margin-left: -65px;
    .contacTitleButton
      position absolute
      right 100px;
      top: 13px;

  .inquiry_warp
    width 800px;
    margin 30px auto

  .contacTinformation
    margin-bottom 50px;
</style>
