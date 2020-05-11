<template>
  <div>
        <div>
          <!--标题-->
          <div class='contacTitleWarp'>
            <div class='contacTitle'>询报价信息</div>
          </div>
          <!--表单填写-->
          <div class='inquiry_warp'>
            <el-form :model="form" label-width="100px">
              <el-form-item label="询报价类型">
                <el-select v-model="form.tenderType" placeholder="请选择询报价类型" disabled>
                  <el-option label="指定供应商" value="0"></el-option>
                  <el-option label="所有供应商" value="1"></el-option>
                </el-select>
              </el-form-item>
              <div class='changshang' v-if='form.tenderType==0'>
                <el-form size="small" :model="form">
                  <el-row v-for="(item,index) in form.manufacturerList" :key="index">
                    <el-col :span="8">
                      <el-form-item label="代号">
                        <el-input v-model="item.manufacturerId" placeholder="无" readonly/>
                      </el-form-item>
                    </el-col>
                    <el-col :span="8" :offset='1'>
                      <el-form-item label="厂商">
                        <el-input v-model="item.manufacturerName" placeholder="无" readonly/>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form>
              </div>
              <el-form-item label="询报价编号">
                <el-input v-model="form.tenderID" readonly></el-input>
              </el-form-item>
              <el-form-item label="项目名称">
                <el-input v-model="form.projectName" readonly></el-input>
              </el-form-item>
              <el-form-item label="询报价类别" prop='tenderingType'>
                <el-input v-model="form.tenderingType" readonly></el-input>
              </el-form-item>
              <el-form-item label="投标数量" prop='needNumber'>
                <el-input v-model="form.needNumber" readonly></el-input>
              </el-form-item>
              <el-form-item label="询报价轮数">
                <el-input v-model="form.temderNumber" readonly>
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
            >
              <el-table-column
                type="index"
                align='center'
                width="50">
              </el-table-column>
              <el-table-column
                prop="contactDept"
                label="用户名"
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
        <!--标题-->
        <div class='contacTitleWarp'>
          <div class='contacTitle'>询报价内容</div>
        </div>
        <!--询报价内容-->
        <div class='inquiry_warp'>
          <el-form :model="form" label-width="80px">
            <el-form-item label="其他需求">
              <el-input
                type="textarea"
                :rows="6"
                v-model="form.otherrequirment"
                resize='none'
                :readonly="true"
              >
              </el-input>
            </el-form-item>
            <el-form-item label="附件">
              <a :href='form.enclosure' download target="_blank"><el-button type="primary" size='mini'>预览</el-button></a>
            </el-form-item>
          </el-form>
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
  import {mapState} from 'Vuex'
  // 时间转换
  import moment from 'moment';

  export default {
    name: 'advicePublish',
    data() {
      return {
        // 默认展示哪个tab
        activeName: 'first',
        // 询报价保存信息
        BiddingTime: [],// 开始日期和截止日期
        // 表格信息
        form:{},
        formArr:[]
      }
    },
    computed:{
      ...mapState(['uuid'])
    },
    mounted(){
      // 获取查看数据
      this.getViewData()
    },
    filters:{
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
      }
    },
    methods:{
      // 获取列表数据
      getViewData() {
        const params = {
          uuid:this.uuid
        }
        axios.post(config.api, '/offermanagement/getInformationList.do', params).then((res) => {
          if(res.status==0){
            this.form=res.data
            // 询报价开始时间和介绍时间
            this.BiddingTime.push(moment(res.data.startTime).format("YYYY-MM-DD hh:mm:ss"),moment(res.data.endTime).format("YYYY-MM-DD hh:mm:ss"))
          }
        })
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .contacTitleWarp
    width 100%
    height 60px;
    background #f5f5f5;
    position relative
    .contacTitle
      width 110px;
      line-height 60px;
      font-size 20px;
      text-align center
      position absolute
      left 50%;
      margin-left: -65px;
    .contacTitleButton
      position absolute
      right 100px;
      top: 17px;

  .inquiry_warp
    width 800px;
    margin 30px auto

  .contacTinformation
    margin-bottom 50px;

  .changshang
    margin-left 100px;
</style>

