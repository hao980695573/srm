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
                <el-input v-model="form.tenderID" :readonly="true"></el-input>
              </el-form-item>
              <el-form-item label="项目名称">
                <el-input v-model="form.projectName" :readonly="true"></el-input>
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
              <el-form-item label="BOM文件">
                <a :href='form.enclosure' download target="_blank"><el-button type="primary" size='mini'>查看</el-button></a>
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
        <!--商品组成部分-->
        <div class='contacTitleWarp'>
          <div class='contacTitle'>商品组成部分</div>
          <div class='contacTitleButton'>
            <el-button size="mini" type="success" @click='downloadFiles'>下载模板</el-button>
            <el-button type="danger" size="mini" @click='onekeyClearance'>一键清空</el-button>
          </div>
        </div>
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
          <el-table-column
            align='center'
            label="操作"
            width="80">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small" @click='deleteAdvice(scope)'>
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--附件-->
        <div>
          <el-upload
            ref="upload"
            :multiple='false'
            :limit='1'
            class="upload-demo"
            :action='path'
            :on-success="otherFileChange"
            :headers='header'
            :on-exceed="handleExceed"
          >
            <el-button size="small" type="primary" style='margin-top:10px;width: 100px'>上传</el-button>
          </el-upload>
        </div>
        <!--供应商回复内容-->
        <div class='contacTitleWarp'>
          <div class='contacTitle'>供应商回复内容</div>
        </div>
        <!--回复表单-->
        <div class='inquiry_warp'>
          <el-form ref='ReplyData' :model="ReplyData" label-width="80px" label-position='top'
                   size='mini'>
            <el-form-item>
              <el-input
                type="textarea"
                :rows="6"
                placeholder="请输入回复内容"
                v-model="ReplyData.otherreply"
                resize='none'
              >
              </el-input>
            </el-form-item>
          </el-form>
          <!--保存按钮-->
          <div class='queding'>
            <el-button type="primary" size='mini' @click='hlandSave'>保存</el-button>
          </div>

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
  //引入接口文件请求文件
  import axios from 'api/axios.js'

  export default {
    name: 'quoteReply',
    data() {
      return {
        // 文件上传设置token
        header:{
          Authorization: localStorage.getItem('token')
        },
        // 文件地址
        path:config.api+"/replymanagement/upFile.do?fileType=other.path",
        // tab默认进入
        activeName: 'first',
        // 询报价保存信息
        BiddingTime: [],// 开始日期和截止日期
        // 显示基础数据
        form: {},
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
        // 供应商回复内容
        ReplyData: {
          // 其他回复
          otherreply: ''
        }
      }
    },
    computed: {
      ...mapState(['uuid'])
    },
    mounted() {
      // 获取基本信息
      this.getViewData()
    },
    methods: {
      // 获取基本信息
      getViewData() {
        const params = {
          uuid: this.uuid
        }
        axios.post(config.api, '/offermanagement/getInformationList.do', params).then((res) => {
          if (res.status == 0) {
            this.form = res.data
            // 询报价开始时间和介绍时间
            this.BiddingTime.push(res.data.startTime, res.data.endTime)
            // 商品组成部分头部
            this.headerDate=res.data.replyQuotation
            // 商品组成部分表身
            this.contentsShen=res.data.inquiryList
          }
        })
      },
      // 保存发送后台
      hlandSave() {
              // 跳回列表
              const params = {
                offeruuid: this.uuid,
                // 商品成分
                inquiryList: this.contentsShen,
                // 其他回复
                otherreply: this.ReplyData.otherreply
              }
              axios.post(config.api, '/replymanagement/replyManagementInsert.do', params).then((res) => {
                if (res.status == 0) {
                  this.$alert(res.msg, {
                    confirmButtonText: '确定',
                    center: true,
                    callback: action => {
                      //跳转回询报价管理页面
                      this.$router.push("Bidding")
                    }
                  })
                }else{
                  this.$alert(res.msg, {
                    confirmButtonText: '确定',
                    center: true
                  })
                }
          })
      },
      // 附件上传成功
      otherFileChange(response){
        if(response.status==0){
          response.data.map((item,index)=>{
            this.contentsShen.push({
              // 机型编码
              modelNumber: item.modelNumber,
              // 物料名称
              sparepartsName: item.sparepartsName,
              // 材料规格
              accessoriesSize: item.accessoriesSize,
              // 材料单价
              valuation: item.valuation,
              // 材料成本
              materialCost: item.materialCost,
              // 颜色
              colour: item.colour,
              // 数量
              productNumber: item.productNumber,
              // 单位
              company: item.company,
              // 单价未税
              untaxedPrice: item.untaxedPrice,
              // 单价含税
              unitPrice: item.unitPrice,
              // 模具含税
              moldFee: item.moldFee,
              // 损耗
              loss: item.loss,
              // 备品
              sparePart: item.sparePart,
              // 包装方式
              packingMethod: item.packingMethod,
              // 阶梯价 0-50K
              steppedPrice0End50: item.steppedPrice0End50,
              // 阶梯价 50-100K
              steppedPrice50End100: item.steppedPrice50End100,
              // 阶梯价 100-200K
              steppedPrice100End200: item.steppedPrice100End200,
              // 阶梯价 200-300K
              steppedPrice200End300: item.steppedPrice200End300,
              //阶梯价 300-500K
              steppedPrice300End500: item.steppedPrice300End500,
              // 总金额
              totalAmount: item.productNumber * item.untaxedPrice
            })
          })

        }else {
          this.$alert(response.msg, {
            confirmButtonText: '确定',
            center: true,
            callback: action => {
              // 清除文件
              this.$refs.upload.clearFiles();
            }
          })
        }
      },
      // 删除表格数据
      deleteAdvice(scope) {
        // 删除当前数组
        this.contentsShen.splice(scope.$index, 1)
      },
      // 一键清除
      onekeyClearance(){
        this.contentsShen=[]
      },
      // 上传超出数量
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，已选择了 ${files.length} 个文件`);
      },
      // 下载文件
      downloadFiles(){
        const params={
          uuid:this.uuid
        }
        axios.getFile(config.noNeedLogionApi, 'skip/exportTemplate.do', params).then((response) => {
          let link = document.createElement("a");
          link.href = window.URL.createObjectURL(new Blob([response]));
          link.target = "_blank";
          link.download = '询报价上传模板.xls';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .contacTitleWarp
    width 100%
    height 50px;
    margin-top 10px;
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

  .queding
    margin-top 10px;
    margin-left -10px;
    width 100%
    display flex
    justify-content center

  .addFormWarp
    height: 500px;
    overflow scroll
</style>
