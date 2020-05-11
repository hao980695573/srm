<template>
  <div>
    <div style='display: flex;justify-content: left;align-items: center;margin-top: 20px;margin-bottom: 20px'>
      <!--保存-->
      <el-button type="primary" size='mini'
                 @click='saveInfor'>保存
      </el-button>
    </div>
    <!--基础信息-->
    <div>
      <!--标题-->
      <div class='contacTitleWarp'>
        <div class='contacTitle'>询报价信息</div>
      </div>
      <!--表单填写-->
      <div class='inquiry_warp'>
        <el-form ref="base" :model="form" :rules="rules" label-width="100px">
          <el-form-item label="询报价类型" prop="tenderType">
            <el-select v-model="form.tenderType" placeholder="请选择询报价类型" @change="currentSel">
              <el-option label="指定供应商" value="0"></el-option>
              <el-option label="所有供应商" value="1"></el-option>
            </el-select>
          </el-form-item>
          <!--新增厂商-->
          <div v-show="form.tenderType == 0" class='xinadd'>
            <el-form size="small" ref="manufacturerList" :model="form">
              <el-row v-for="(item,index) in form.manufacturerList" :key="index">
                <el-col :span="8">
                  <el-form-item label="厂商" :prop="'manufacturerList.' + index + '.manufacturerName'"
                                :rules="[{ required: true, message: '厂商不能为空',trigger: 'change'}]"
                  >
                    <el-select v-model="item.manufacturerName" placeholder="请选择厂商" style='width: 100%'
                               @change="((val)=>{changeFacturerList(val, index)})">
                      <el-option :label="item.companyName" :value="item.companyName" v-for='(item,index) in options'
                                 :key='index'></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :span="8" :offset='1'>
                  <el-form-item label="代号" :prop="'manufacturerList.' + index + '.manufacturerId'"
                                :rules="[{ required: true, message: '代号不能为空',trigger:['change','blur']}]">
                    <el-input v-model="item.manufacturerId" placeholder="请选择厂商名称" @blur='hanldChange'/>
                  </el-form-item>
                </el-col>
                <el-col :span="6" :offset='1'>
                  <el-form-item>
                    <el-button type="danger" v-if="form.manufacturerList.length > 1" size="mini" style='margin-top:30px'
                               @click='deleteRules(index)'>
                      删除
                    </el-button>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-button @click="addDomain">新增厂商</el-button>
            </el-form>
          </div>
          <el-form-item label="询报价编号">
            <el-input v-model="form.tenderID" disabled placeholder="自动生成询报价编号"></el-input>
          </el-form-item>
          <el-form-item label="项目名称" prop='projectName'>
            <el-input v-model="form.projectName"></el-input>
          </el-form-item>
          <el-form-item label="询报价类别" prop='tenderingType'>
            <el-autocomplete
              class="inline-input"
              v-model="form.tenderingType"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
            ></el-autocomplete>
          </el-form-item>

          <el-form-item label="数量" prop='needNumber'>
            <el-input v-model="form.needNumber"></el-input>
          </el-form-item>
          <el-form-item label="询报价轮数">
            <el-input v-model="form.temderNumber" disabled>
              <template slot="append">次</template>
            </el-input>
          </el-form-item>
          <el-form-item label="活动时间" prop='BiddingTime'>
            <el-date-picker
              v-model="form.BiddingTime"
              type="datetimerange"
              range-separator="至"
              @change='BiddingTimeChange'
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format='yyyy-MM-dd HH:mm:ss'
              format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
      </div>
      <!--联系方式内容-->
      <div class='inquiry_warp'>
        <el-form ref="formContact" :rules="rules" :model="form" label-width="100px">
          <el-form-item label="阶梯标准" prop='ladderPrice'>
            <el-input v-model="form.ladderPrice" placeholder="如有多个 已;隔开 例如:0-50;50-100;最多5个;默认以K为单位"></el-input>
          </el-form-item>
          <el-form-item label="其他需求">
            <el-input
              type="textarea"
              :rows="6"
              placeholder="请输入其他需求"
              v-model="form.otherrequirment"
              resize='none'
            >
            </el-input>
          </el-form-item>
          <el-form-item label="上传附件" prop='enclosure'>
            <el-upload
              :multiple='false'
              :limit='1'
              class="upload-demo"
              :action='path'
              :on-success="otherFileChange"
              :headers='header'
              :on-remove='removeOtherFile'
              :on-error='flieErr'
              :file-list='fileList'
              :on-exceed="handleExceed"
            >
              <el-button size="small" type="primary" style='margin-left:30px;margin-top:3px;width: 200px'>上传</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!--询报价方设置-->
    <div class='inquiry_warp'>
      <!--联系方式-->
      <div class='lianxi'>
        <el-form :model="form" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="用户名">
                <el-input v-model="form.contactDept" placeholder="无" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="姓名">
                <el-input v-model="form.contactName" placeholder="无" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="职位">
                <el-input v-model="form.contactPosition" placeholder="无" readonly></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="手机号" prop='contactPhone'>
                <el-input v-model="form.contactPhone" placeholder="无" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="邮箱" prop='contactMailbox'>
                <el-input v-model="form.contactMailbox" placeholder="无" readonly></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>


  </div>
</template>

<script>
  // 引入公共配置
  import {config} from 'api/config.js';
  //引入接口文件请求文件
  import axios from 'api/axios.js'
  // 引入公共校验
  import {validateIphoneEmpty, validateEmailEmpty} from 'api/Validate.js'
  // Vuex语法糖
  import {mapState} from 'Vuex'

  export default {
    name: 'advicePublish',
    data() {
      return {
        // 防止多次点击
        flag:true,
        // 文件上传设置token
        header: {
          Authorization: localStorage.getItem('token')
        },
        // 文件地址
        path: config.api + "/file/upFile.do?fileType=other.path",
        fileList: [],
        // 询报价保存信息
        form: {
          // 询报价类型
          tenderType: '',
          // 询报价编码
          tenderID: '',
          // 项目名称
          projectName: '',
          // 询报价轮数
          temderNumber: '1',
          BiddingTime: [],// 开始日期和截止日期
          // 投标开始时间
          startTime: '',
          // 投标结束时间
          endTime: '',
          // 询报价类别
          tenderingType: '',
          // 询报价数量
          needNumber: '',
          // 其他需求
          otherrequirment: '',
          // 用户名
          contactDept: '',
          // 阶梯
          ladderPrice: '',
          // 姓名
          contactName: '',
          // 职位
          contactPosition: '',
          // 手机号
          contactPhone: '',
          // 邮箱
          contactMailbox: '',
          // 询报价方设置
          manufacturerList: [{
            manufacturerName: '',
            manufacturerId: ''
          }],
          //附件
          enclosure: '',
        },
        // 校验规则
        rules: {
          tenderType: [
            {required: true, message: '询报价类型不能为空', trigger: 'change'}
          ],
          projectName: [
            {required: true, message: '项目名称不能为空', trigger: 'blur'},
          ],
          BiddingTime: [
            {required: true, message: '活动时间不能为空', trigger: 'change'}
          ],
          enclosure: [
            {required: true, message: '附件不能为空', trigger: 'change'}
          ],
          tenderingType: [
            {required: true, message: '询报价类别不能为空', trigger: ['blur','change']}
          ],
          needNumber: [
            {required: true, message: '投标数量不能为空', trigger: 'blur'}
          ],
          ladderPrice: [
            {required: false, message: '标价未税不能为空', trigger: 'blur'}
          ]
        },
        // 厂商列表
        options: [],
        // 厂商类别
        restaurants: [{"value": "请选择"},
          {"value": "原料"},
          {"value": "色粉抽粒"},
          {"value": "油漆"},
          {"value": "油墨"},
          {"value": "辅料"},
          {"value": "包材"},
          {"value": "模胚"},
          {"value": "钢料"},
          {"value": "铜料"},
          {"value": "刀具"},
          {"value": "模具配件"},
          {"value": "模具加工"},
          {"value": "热流道"},
          {"value": "电镀"},
          {"value": "精雕"},
          {"value": "烫金"},
          {"value": "锌合金"},
          {"value": "镁合金"},
          {"value": "镁合金点胶"},
          {"value": "五金钢壳"},
          {"value": "超声波"},
          {"value": "治具"},
          {"value": "钢片清洗"},
          {"value": "皮套"},
          {"value": "伙食"},
          {"value": "复印费"},
          {"value": "电脑配件"},
          {"value": "机器配件"},
          {"value": "机物料"},
          {"value": "快递"},
          {"value": "水转印"},
          {"value": "水处理"},
          {"value": "水保养"},
          {"value": "工程改造"},
          {"value": "注塑加工"},
          {"value": "机器"},
          {"value": "ERP系统"},
          {"value": "考勤系统"},
          {"value": "铝片"},
          {"value": "福利"},
          {"value": "喷油"},
          {"value": "抛光打砂"},
          {"value": "自动化"},
          {"value": "T处理"},
          {"value": "冷冻批锋"},
          {"value": "天线"},
          {"value": "铝钛合金"},
          {"value": "铝条"},
          {"value": "按键"},
          {"value": "组装"},
          {"value": "镭雕"},
          {"value": "硅胶"},
          {"value": "散热膜"},
          {"value": "光学散光镜"},
          {"value": "镜片"},
          {"value": "工衣"},
          {"value": "软件"},
          {"value": "打标机"},
          {"value": "环保"},
          {"value": "废品"},
          {"value": "日用品"},
          {"value": "劳务派遣"},
          {"value": "培训"},
          {"value": "汽修"},
          {"value": "食品"},
          {"value": "运输"},
          {"value": "租金"},
          {"value": "装修"},
        ]
      }

    },
    computed: {
      // 获取 uuid
      ...mapState(['uuid']),
    },
    mounted() {
      // 获取厂商列表数据
      this.getList()
      // 获取联系人信息
      this.getInformation()
    },
    methods: {
      // 选取日期
      BiddingTimeChange() {
        // 招商开始时间
        this.form.startTime = this.form.BiddingTime[0]
        // 招商结束时间
        this.form.endTime = this.form.BiddingTime[1]
      },
      // 添加询报价方设置，手动新增
      addDomain() {
        this.form.manufacturerList.push({
          manufacturerName: '',
          manufacturerId: ''
        });
      },
      // 删除询报价方设置
      deleteRules(index) {
        if (index !== -1) {
          this.form.manufacturerList.splice(index, 1)
        }
      },
      // 改变询报价类型
      currentSel(val) {
        // 当选择全部供应商时，清除询报价方设置
        if (val == 1) {
          this.form.manufacturerList = [{
            manufacturerName: '',
            manufacturerId: ''
          }]
        }
      },
      // 保存信息
      saveInfor() {
        // 是否多次点击
        if(this.flag){
          // 禁止重复保存
          this.flag=false
          // 正则校验
          this.$refs['base'].validate((valid) => {
            // 询报价信息校验
            if (valid) {
              // 联系人校验
              this.$refs['formContact'].validate((valid) => {
                if (valid) {
                  // 如果选择的是指定供应商,询报价方设置必填
                  if (this.form.tenderType == '0') {
                    // 校验
                    this.$refs['manufacturerList'].validate((valid) => {
                      if (valid) {
                        // 校验通过
                        const params = {
                          // 询报价类型
                          tenderType: this.form.tenderType,
                          // 询报价编码
                          tenderID: this.form.tenderID,
                          // 项目名称
                          projectName: this.form.projectName,
                          // 询报价轮数
                          temderNumber: Number(this.form.temderNumber),
                          // 投标开始时间
                          startTime: this.form.startTime,
                          // 投标结束时间
                          endTime: this.form.endTime,
                          // 询报价类别
                          tenderingType: this.form.tenderingType,
                          // 询报价数量
                          needNumber: String(this.form.needNumber),
                          // 其他需求
                          otherrequirment: this.form.otherrequirment,
                          // 阶梯
                          ladderPrice: this.form.ladderPrice,
                          // 部门
                          contactDept: this.form.contactDept,
                          // 姓名
                          contactName: this.form.contactName,
                          // 职位
                          contactPosition: this.form.contactPosition,
                          // 手机号
                          contactPhone: this.form.contactPhone,
                          // 邮箱
                          contactMailbox: this.form.contactMailbox,
                          // 附件
                          enclosure: this.form.enclosure,
                          // 询报价方设置
                          manufacturerList: this.form.manufacturerList,
                        }
                        axios.post(config.api, '/offermanagement/insertOfferManagement.do', params).then((res) => {
                          if (res.status == 0) {
                            this.$alert('保存成功', {
                              confirmButtonText: '确定',
                              center: true,
                              callback: action => {
                                this.$refs['base'].resetFields();
                                this.$refs['formContact'].resetFields();
                                this.$refs['manufacturerList'].resetFields();
                                this.form.BiddingTime = []
                                this.form.otherrequirment = ""
                                this.form.contactDept = ""
                                this.form.contactName = ""
                                this.form.contactPosition = ""
                                //跳转回询报价管理页面
                                this.$router.push('advice')
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
                  } else {
                    const params = {
                      // 询报价类型
                      tenderType: this.form.tenderType,
                      // 询报价编码
                      tenderID: this.form.tenderID,
                      // 项目名称
                      projectName: this.form.projectName,
                      // 询报价轮数
                      temderNumber: Number(this.form.temderNumber),
                      // 投标开始时间
                      startTime: this.form.startTime,
                      // 投标结束时间
                      endTime: this.form.endTime,
                      // 询报价类别
                      tenderingType: this.form.tenderingType,
                      // 询报价数量
                      needNumber: String(this.form.needNumber),
                      // 其他需求
                      otherrequirment: this.form.otherrequirment,
                      // 阶梯
                      ladderPrice: this.form.ladderPrice,
                      // 部门
                      contactDept: this.form.contactDept,
                      // 姓名
                      contactName: this.form.contactName,
                      // 职位
                      contactPosition: this.form.contactPosition,
                      // 手机号
                      contactPhone: this.form.contactPhone,
                      // 邮箱
                      contactMailbox: this.form.contactMailbox,
                      // 附件
                      enclosure: this.form.enclosure,
                      // 询报价方设置
                      manufacturerList: this.form.manufacturerList
                    }
                    axios.post(config.api, '/offermanagement/insertOfferManagement.do', params).then((res) => {
                      if (res.status == 0) {
                        this.$alert('保存成功', {
                          confirmButtonText: '确定',
                          center: true,
                          callback: action => {
                            this.$refs['base'].resetFields();
                            this.$refs['formContact'].resetFields();
                            this.$refs['manufacturerList'].resetFields();
                            this.form.BiddingTime = []
                            this.form.otherrequirment = ""
                            this.form.contactDept = ""
                            this.form.contactName = ""
                            this.form.contactPosition = ""
                            //跳转回询报价管理页面
                            this.$router.push('advice')
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
                }
              })
            }
          })
        }else{
          this.$alert("正在保存...", {
            confirmButtonText: '确定',
            center: true
          })
        }
      },
      // 获取厂商列表
      getList() {
        axios.post(config.api, '/offermanagement/userList.do').then((res) => {
          if (res.status == 0) {
            this.options = res.data
          }
        })
      },
      // 厂商改变 (根据选取的值，绑定value值)
      changeFacturerList(val, index) {
        // 后台返回的id
        let queryId = val
        // json数据组
        let params = this.options
        for (let i = 0; i < params.length; i++) {
          if (params[i].companyName == queryId) {
            this.form.manufacturerList[index].manufacturerId = params[i].erpno
          }
        }
      },
      // 手动输入厂商代码
      hanldChange() {
        let _this = this
        _this.options.map((item, index) => {
          for (var i = 0; i < _this.form.manufacturerList.length; i++) {
            if (item.erpno == _this.form.manufacturerList[i].manufacturerId) {
              _this.form.manufacturerList[i].manufacturerName = item.companyName
            }
          }
        })

      },
      // 附件上传成功
      otherFileChange(response) {
        if (response.errno == 0) {
          this.form.enclosure = response.data[0]
          // 显示上传的文件
          this.fileList.push({name: '附件', url: this.form.enclosure})
          // 清除附件校验
          this.$refs['formContact'].clearValidate('enclosure')
        } else {
          this.$alert(res.msg, {
            confirmButtonText: '确定',
            center: true
          })
        }
      },
      // 删除上传附件
      removeOtherFile() {
        this.form.enclosure = ''
        this.fileList = []
      },
      // 上传时失败
      flieErr() {
        this.$alert('文件上传失败', {
          confirmButtonText: '确定',
          center: true
        })
      },
      // 上传超出数量
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，已选择了 ${files.length} 个文件`);
      },
      // 获取联系人信息
      getInformation() {
        axios.post(config.api, '/offermanagement/getUserInformation.do').then((res) => {
          if (res.status == 0) {
            // 用户名
            this.form.contactDept = res.data.username,
              // 姓名
              this.form.contactName = res.data.name,
              // 职位
              this.form.contactPosition = res.data.role,
              // 手机号
              this.form.contactPhone = res.data.phone,
              // 邮箱
              this.form.contactMailbox = res.data.email
          } else {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      // 选择厂商类别
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
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

  .xinadd {
    margin 20px 0px;
    padding-left 100px;
  }

  .lianxi {
    margin-top 20px;
  }
</style>
