<template>
  <div class='register' v-show='registerShow'>
    <!--注册标题-->
    <div class='register_title'>
      <div class='enter_login' @click='showLogin("form")'>登录</div>
      <div class='register_title_margin'> ></div>
      <div class='register_title_right'>注册账号</div>
    </div>
    <!--注册中心-->
    <div class='register_describe'>申请成为广正供应商</div>
    <div class='register_center'>
      <el-form label-width="120px" :rules="rules" :model="form" ref="form" class='register_center_center'>
        <!--左侧-->
        <div class='register_center_left'>
          <!--企业类型-->
          <el-form-item label="企业类型" prop='companyType'>
            <el-select v-model="form.companyType" placeholder="请选择企业类型" style='width: 100%'>
              <el-option label="请选择" value=" "></el-option>
              <el-option label="生产商" value="0"></el-option>
              <el-option label="代理商" value="1"></el-option>
              <el-option label="承运商" value="2"></el-option>
              <el-option label="服务类" value="3"></el-option>
              <el-option label="其他" value="4"></el-option>
            </el-select>
          </el-form-item>
          <!--单位名称-->
          <el-form-item label="单位名称 :" prop='companyName'>
            <el-input v-model="form.companyName" size="small" class='register_input' placeholder='请输入单位名称'></el-input>
          </el-form-item>
          <!--地址-->
          <el-form-item label="地址 :" prop='address'>
            <el-input v-model="form.address" size="small" class='register_input' placeholder='请输入地址'></el-input>
          </el-form-item>
          <!--公司员工总数-->
          <el-form-item label="公司员工总数 :" prop='staffNum'>
            <el-input v-model="form.staffNum" size="small" class='register_input' placeholder='请输入员工总数'>
              <template slot="append">人</template>
            </el-input>
          </el-form-item>
          <!--联系人-->
          <el-form-item label="联系人 :" prop='contract'>
            <el-input v-model="form.contract" size="small" class='register_input' placeholder='请输入联系人'></el-input>
          </el-form-item>
          <!--联系电话-->
          <el-form-item label="手机号码 :" prop='contractPhone'>
            <el-input v-model="form.contractPhone" size="small" class='register_input' placeholder='请输入手机号码'></el-input>
          </el-form-item>
        </div>
        <!--右侧-->
        <div class='register_center_right'>
          <!--注册资本-->
          <el-form-item label="注册资本 :" prop='registeredCapital'>
            <el-input v-model="form.registeredCapital" size="small" class='register_input' placeholder='请输入注册资本'>
              <template slot="append">人民币</template>
            </el-input>
          </el-form-item>
          <!--公司性质-->
          <el-form-item label="公司性质" prop='companyNature'>
            <el-select v-model="form.companyNature" placeholder="请选择公司性质" style='width: 100%'>
              <el-option label="请选择" value=" "></el-option>
              <el-option label="个体工商户" value="3"></el-option>
              <el-option label="有限责任公司" value="7"></el-option>
              <el-option label="股份有限公司" value="8"></el-option>
              <el-option label="其他" value="9"></el-option>
            </el-select>
          </el-form-item>
          <!--公司经营范围-->
          <el-form-item label="公司经营范围 :" prop='businessScope'>
            <el-input v-model="form.businessScope" size="small" class='register_input' placeholder='请输入经营范围'></el-input>
          </el-form-item>
          <!--工厂面积-->
          <el-form-item label="工厂面积 :" prop='area'>
            <el-input v-model="form.area" size="small" class='register_input' placeholder='请输入公司面积'>
              <template slot="append">平方米</template>
            </el-input>
          </el-form-item>
          <!--职位-->
          <el-form-item label="职位 :" prop='contractJob'>
            <el-select v-model="form.contractJob" placeholder="请选择职位" style='width:100%'>
              <el-option label="报价员" value="报价员"></el-option>
              <el-option label="跟单员" value="跟单员"></el-option>
              <el-option label="财务员" value="财务员"></el-option>
              <el-option label="仓库员" value="仓库员"></el-option>
              <el-option label="其他" value="其他"></el-option>
            </el-select>
          </el-form-item>
          <!--备注-->
          <el-form-item label="备注:" prop='remark'>
            <el-input
              type="textarea"
              :rows="4"
              resize='none'
              placeholder="请输入备注内容"
              v-model="form.remark">
            </el-input>
          </el-form-item>
        </div>
      </el-form>

      <!--注册按钮-->
      <div class='register_bth_warp'>
        <el-button type="success" @click='restBth("form")'>重置</el-button>
        <el-button type="primary" class='register_bth' @click='registerBth("form")' style='margin-left:50px'>注册
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  // 引入公共配置
  import {config} from 'api/config.js';
  //引入接口文件请求文件
  import axios from 'api/axios.js'
  // 引入定义验证规则
  import {validateInteger,NanInteger,validateIphone,NanNumber} from 'api/Validate.js'

  export default {
    name: 'register',
    props: {
      registerShow: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        // 注册数据
        form: {
          // 企业类型
          companyType: '',
          // 单位名称
          companyName: '',
          // 公司性质
          companyNature: '',
          // 地址
          address: '',
          // 联系人
          contract: '',
          // 联系人手机号码
          contractPhone: '',
          // 注册资本
          registeredCapital: '',
          // 职位
          contractJob: '',
          // 公司经营范围
          businessScope: '',
          // 工厂面积
          area: '',
          // 员工总数
          staffNum: '',
          // 备注
          remark: ''
        },
        rules: {
          // 名字要和data里定义的数据一致，否则value获取不到值
          companyType: [
            {required: true, message: '请选择公司类别', trigger: 'change'},
          ],
          companyName: [
            {required: true, message: '单位名称不能为空', trigger: 'blur'},
          ],
          companyNature: [
            {required: true, message: '请选择公司性质', trigger: 'change'},
          ],
          address: [
            {required: true, message: '地址不能为空', trigger: 'blur'},
          ],
          contract: [
            {required: true, message: '联系人不能为空', trigger: 'blur'},
          ],
          registeredCapital: [
            {validator: NanInteger, trigger: 'blur'}
          ],
          contractPhone: [
            {validator: validateIphone, trigger: 'blur', required: true}
          ],
          businessScope: [
            {required: true, message: '公司经营范围不能为空', trigger: 'blur'},
          ],
          area: [
            {validator: NanNumber, trigger: 'blur', required: false,},
          ],
          staffNum: [
            {validator: validateInteger, trigger: 'blur', required: true,},
          ],
          remark: [
            {required: false, message: '备注不能为空', trigger: 'blur'},
          ],
          contractJob:[
            {required: true, message: '职位不能为空', trigger: 'change'},
          ]
        }
      }
    },
    methods: {
      // 返回登录页
      showLogin(form) {
        // 清空注册框数据
        this.$refs[form].resetFields()
        // 通知首页
        this.$emit('showLogin')
      },
      // 点击注册按钮
      registerBth(form) {
        // 校验规则
        this.$refs[form].validate((valid) => {
          if (valid) {
            const params = {
              // 企业类型
              companyType: this.form.companyType,
              // 单位名称
              companyName: this.form.companyName,
              // 公司性质
              companyNature: this.form.companyNature,
              // 公司地址
              address: this.form.address,
              // 联系人
              contract: this.form.contract,
              // 手机号码
              contractPhone: this.form.contractPhone,
              // 注册资本
              registeredCapital: this.form.registeredCapital,
              // 职位
              contractJob: this.form.contractJob,
              // 公司经营范围
              businessScope: this.form.businessScope,
              // 工厂面积
              area: this.form.area,
              // 员工总数
              staffNum: this.form.staffNum,
              // 备注
              remark: this.form.remark,
            }
            axios.post(config.noNeedLogionApi, 'skip/addSupplier.do', params).then((res) => {
              if(res.status==0){
                this.$alert(res.msg,{
                  confirmButtonText:'确定',
                  center:true,
                  callback: action => {
                    // 返回首页
                    window.location.href='/'
                  }
                })
              }
            })
          }
        })
      },
      // 重置
      restBth(form){
        // 清空注册框数据
        this.$refs[form].resetFields()
      }
    }
  }
</script>

<style lang='stylus' scoped>
  //引入css变量,使用快速定位文件夹时在css中要加~
  @import '~styles/mixins.styl'

  .el-form-item {
    margin-bottom: 20px;
  }

  .contacTitleWarp
    width 100%
    height 60px;
    margin-top 30px;
    margin-bottom: 30px;
    background #c9c9c9;
    position relative
    .contacTitle
      width 130px;
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

  .register
    width 1200px
    margin 0px auto
    margin-top 30px
    .register_title
      width 100%
      line-height 40px
      border-bottom 1px solid $BackgroundColor
      color $BackgroundColor
      font-size 20px
      display flex
      align-items center
      .enter_login
        cursor pointer
      .register_title_margin
        margin-left 5px
        margin-right 5px
      .register_title_right
        border-bottom: 2px solid $BackgroundColor
    .register_describe
      width 100%
      text-align center
      margin-top 20px;
      font-size 22px;

    .register_center
      width 1000px
      border 1px solid #edeff2
      background #fff
      margin 0px auto
      margin-top 25px
      padding-top: 20px
      position relative
      .register_center_center
        display flex
        justify-content space-between
        .register_center_right
          margin-right 50px
        .register_input
          width 295px

      .register_bth_warp
        margin-top 70px;
        margin-bottom 50px;
        width 100%
        display flex
        justify-content center
</style>
