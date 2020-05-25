<template>
  <div class='warps'>
    <login_header></login_header>
    <!--登录和新闻模块-->
    <div class='greatech_center' v-show='LoginShow'>
      <!--登录模块-->
      <div class='login_warp'>
        <!--标题-->
        <div class='ms_title'>系统登录</div>
        <!--表单-->
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="ms-content">
          <!--如果没登录，显示登录框-->
          <div v-show='userCenterShow'>
            <!--用户名-->
            <el-form-item prop='username'>
              <el-input size="small" v-model='ruleForm.username' placeholder='用户名'>
              </el-input>
            </el-form-item>
            <!--用户密码-->
            <el-form-item prop="password">
              <el-input size="small" v-model='ruleForm.password' placeholder="密码" show-password>
              </el-input>
            </el-form-item>
            <!--验证码-->
            <el-form-item prop="yanzheng">
              <el-input size="small" placeholder="验证码" v-model='ruleForm.yanzheng'>
                <!--图形验证码-->
                <div slot="append" class='yanzheng'>
                  <!--canvas描绘图片-->
                  <canvas id="mycanvas" width='80' height='30'></canvas>
                </div>
              </el-input>
            </el-form-item>
            <!-- 记住密码 -->
            <el-checkbox v-model="checked">记住密码</el-checkbox>
            <!--登录按钮-->
            <div class='login_buttom_warp'>
              <el-button type="primary" size="small" class='login_buttom' @click='submitForm("ruleForm")'>登录</el-button>
            </div>
          </div>
          <!--如果已登录，显示显示用户名-->
          <div class='login_userName' @click='enterUserCenter' v-show='!userCenterShow'>
            点击进入系统
          </div>
          <!--登记、注册按钮-->
          <div class='zhu_btn_warp' @click='register("ruleForm")'>
            <el-button size="small" class='zhu_btn'>登记 / 注册供应商</el-button>
          </div>
        </el-form>
        <!--供应商资料下载-->
        <a href='../../../static/广正供应商系统使用手册.zip' download  target="_blank" class='file_download'>供应商操作指引下载</a>
      </div>
      <!--图片-->
      <div class='image_warp'>
        <div class="dingwei">
          <img src="../../../static/image/login/images_03.jpeg" alt="" class='image_img'>
          <div class="ben">本分</div>
          <span class="chang">品质</span>
          <span class="xin">创新</span>
        </div>
        <div class='image_title'>
          SRM为供应商登记合作的唯一且有效入口，只有SRM上登记后才可以进入合作历程。同时，广正会对每一个登记及时做出处理并反馈结果。
        </div>
      </div>
      <!--公司资讯-->
      <div class='newlist_warp'>
        <!--头部更多-->
        <div class='newlist_top'>
          <div class='new_title'>最新动态</div>
          <div class='new_more' @click='enterNewList'>更多</div>
        </div>
        <!--资讯列表-->
        <div class='informationList'>
          <div class='information_li' @click='enterDetail(item)' v-for='item in informationList' :key='item.uuid'>
            <span class='informationList_news' v-if='item.categoryUuid==1'>{{item.categoryName}}</span>
            <span class='informationList_notice' v-else-if='item.categoryUuid==2'>{{item.categoryName}}</span>
            <span class='informationList_xitong' v-else>{{item.categoryName}}</span>
            <span class='informationList_title' :title='item.title'>{{item.title}}</span>
            <span class='informationList_date'>{{item.publishDate.slice(0,10)}}</span>
          </div>
        </div>
      </div>
    </div>
    <!--注册模块-->
    <register :registerShow='registerShow'  @showLogin='showLogin'></register>
    <!--脚注-->
    <div class='footer'>
      <div class='footer_center'>
        2019东莞市广正模具塑胶有限公司SRM平台 Copyright © 2019 东莞市广正模具塑胶有限公司
      </div>
    </div>
  </div>
</template>

<script>
  // 引入公共配置
  import {config} from 'api/config.js';
  //引入接口文件请求文件
  import axios from 'api/axios.js'
  //引入接口文件请求文件
  import Interface from 'api/Interface.js'
  // Vuex语法糖
  import {mapState,mapMutations} from 'Vuex'
  // 引入头部文件
  import login_header from 'common/login_header/login_header'
  // 引入注册模块
  import register from './commponent/register'

  export default {
    name: 'login',
    data() {
      // 验证码校验
      let validateYanzhen=(rule, value, callback) => {
        if (value === '') {
          return callback(new Error('验证码不能为空'))

        } else if (value.toUpperCase()!=this.verify.toUpperCase()&&value.toUpperCase()!=this.verify) {
          return callback(new Error('验证码不正确'))
        } else {
          this.$message({
            message: '登陆成功',
            type: 'success'
          });
          callback()
        }
      }
      // 数据获取
      return {
        // 登录模块是否显示
        LoginShow:true,
        // 是否显示用户名回到个人中心
        userCenterShow:false,
        // 注册模块是否显示
        registerShow:false,
        // 记住密码
        checked:true,
        // 消息列表
        informationList:[],
        // 登录数据
        ruleForm: {
          username: '',
          password: '',
          // 验证码
          yanzheng: '',
          yanzhengImg:''
        },
        rules: {
          // 名字要和data里定义的数据一致，否则value获取不到值
          username: [
            {required: true, message: '用户名不能为空', trigger: 'blur'},
            {min: 3, max: 14, message: '长度在 3 到 14 个字符', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ],
          yanzheng:[
            {validator: validateYanzhen, trigger: 'blur'}
          ]
        }
      }
    },
    filters: {
      // 发布时间
      publishDate:function(val){
        if(val){
          return Interface.renderTime(val)
        }else{
          return ''
        }
      }
    },
    computed: {
      // 获取State中的值
      ...mapState(['verify','username','userRole']),
    },
    mounted() {
      // 获取记住密码
      this.getCookie();
      // 生成图形验证码
      Interface.dentifying()
      // 获取资讯列表
      this.getList()
      // 判断是否登录
      if(localStorage.getItem('token')!=null&&localStorage.getItem('token')!="undefined"){
        this.userCenterShow=false
      }else{
        this.userCenterShow=true
      }
    },
    methods: {
      // 修改 用户名 用户角色身份 消息详情数据
      ...mapMutations(['usernameChange','changeUserRole','changeNewsDetailsData','changeUuid','changeManufacturerAddress','changeEnterprisePhone','changeFax','changeCompanyName','changeSupplierState','changeUserId','changeAuditStatus','changeSupplierUUid','changeContacts','changePhone','changeSupplierBillType','changeSupplierErpno']),
      // 进入注册供应商
      register(ruleForm) {
        // 隐藏登录模块
        this.LoginShow=false,
          // 显示注册模块
          this.registerShow=true
        // 清空登录框数据
        this.$refs[ruleForm].resetFields()
      },
      // 返回登录页
      showLogin(){
        // 显示登录模块
        this.LoginShow=true,
          // 隐藏注册模块
          this.registerShow=false
      },
      // 点击登录按钮
      submitForm(ruleForm) {
        // 规则校验
        this.$refs[ruleForm].validate((valid) => {
          if (valid) {
            // 重复提交校验
            console.log(config);
            if(config.submitSign){
              // 禁止重复提交
              config.submitSign=false


              const self = this;
              //判断复选框是否被勾选 勾选则调用配置cookie方法
              if (self.checked == true) {
                //传入账号名，密码，和保存天数3个参数
                self.setCookie(this.ruleForm.username, this.ruleForm.password, 30);
              }else {
                //清空Cookie
                self.clearCookie();
              }

              // 用户登录
              let params={
                username:this.ruleForm.username,
                password:this.ruleForm.password
              }
              axios.post(config.api,'/user/login',params).then((res) => {

                // 允许提交
                config.submitSign=true
                console.log(res);
                if(res.status===0){
                  // 存储用户名(登录账户)
                  this.usernameChange(res.data.username)
                  // 存储用户id
                  this.changeUserId(res.data.userId)
                  // 存储联系人
                  this.changeContacts(res.data.name)
                  // 存储联系人电话
                  this.changePhone(res.data.phone)
                  // 存储供应商数据
                  if(res.data.supplier!==''&&res.data.supplier!==null&&res.data.supplier!==undefined){
                    // 存储供应商名称
                    this.changeCompanyName(res.data.supplier.companyName)
                    // 存储供应商基础档案状态
                    this.changeSupplierState(res.data.supplier.isCompleteInformation)
                    // 存储供应商地址
                    this.changeManufacturerAddress(res.data.supplier.address)
                    // 存储供应商电话
                    this.changeEnterprisePhone(res.data.supplier.enterprisePhone)
                    // 供应商票据类型
                    this.changeSupplierBillType(res.data.supplier.billType)
                    // 供应商基础资料审核状态
                    this.changeAuditStatus(res.data.supplier.status)
                    // 供应商基础资料uuid
                    this.changeSupplierUUid(res.data.supplier.uuid)
                    // 存储供应商传真
                    this.changeFax(res.data.supplier.fax)
                    // 存储供应商erpno
                    this.changeSupplierErpno(res.data.supplier.erpno)
                  }
                  // 存储用户角色身份
                  this.changeUserRole(res.data.authorities[0].authority)

                  //根据角色跳转
                  if(res.data.authorities[0].authority=='OWN_CLERK'){
                    this.$router.push('financialManagement/financialReconciliation')
                  }else if(res.data.authorities[0].authority=='OWN_WAREHOUSE'){
                    this.$router.push('collectGoods/addPromotionBill')
                  }else if(res.data.authorities[0].authority=='PLANNER'){
                    this.$router.push('purchase/orderScheduling')
                  }else if(res.data.authorities[0].authority=='INVITE_TENDER_MEMBER'){
                    this.$router.push('quote/advice')
                  }else if(res.data.authorities[0].authority=='QuotationOfficer'){
                    this.$router.push('quote/Bidding')
                  }else{
                    this.$router.push('record/home')
                  }
                }else{
                  // 清除所有的localStrong
                  localStorage.clear();
                  // 错误提示
                  this.$alert(res.msg,{
                    confirmButtonText:'确定',
                    center:true
                  });
                }
              })
            }else{
              this.$alert('请勿重复提交',{
                confirmButtonText:'确定',
                center:true
              });
            }
          }
        })
      },
      // 获取资讯列表
      getList(){
        const params={
          startDate:'',
          endDate:'',
          categoryUuid:'',
          pageNum:1,
          pageSize:12
        }
        axios.post(config.noNeedLogionApi,'skip/getInformationList.do',params).then((res) => {
          this.informationList=res.data
        })
      },
      // 进入资讯列表
      enterNewList(){
        this.$router.push('newsList')
      },
      // 进入详情页面
      enterDetail(data){
        this.changeNewsDetailsData(data)
        this.$router.push('newsDetails')
      },
      // 返回内页
      enterUserCenter(){;
        //根据角色跳转
        if(this.userRole=='OWN_CLERK'){
          this.$router.push('financialManagement/financialReconciliation')
        }else if(this.userRole=='OWN_WAREHOUSE'){
          this.$router.push('collectGoods/addPromotionBill')
        }else if(this.userRole=='PLANNER'){
          this.$router.push('purchase/orderScheduling')
        }else{
          this.$router.push('record/home')
        }
      },
      //设置cookie
      setCookie(c_name, c_pwd, exdays) {
        var exdate = new Date(); //获取时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
        //字符串拼接cookie
        window.document.cookie = "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
        window.document.cookie = "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
      },
      //读取cookie
      getCookie: function() {
        if (document.cookie.length > 0) {
          var arr = document.cookie.split('; '); //这里显示的格式需要切割一下自己可输出看下
          for (var i = 0; i < arr.length; i++) {
            var arr2 = arr[i].split('='); //再次切割
            //判断查找相对应的值
            if (arr2[0] == 'userName') {
              this.ruleForm.username = arr2[1]; //保存到保存数据的地方
            } else if (arr2[0] == 'userPwd') {
              this.ruleForm.password = arr2[1];
            }
          }
        }
      },
      //清除cookie
      clearCookie: function() {
        this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
      }
    },
    components:{
      login_header,
      register
    }
  }
</script>

<style lang='stylus' scoped>
  //引入css变量,使用快速定位文件夹时在css中要加~
  @import '~styles/mixins.styl'

  .ms-content >>> .el-form-item__error
    margin-left: 45px;

  .ms-content >>> .el-input-group__append
    padding 0px

  .ms-content >>>.el-form-item {
    margin-bottom: 19px;
  }

  .warps
    width 100%
    .greatech_center
      width: 1200px;
      height 400px;
      margin 0 auto
      margin-top: 4%;
      display flex
      justify-content space-between
      align-items center
      .login_warp
        width 335px;
        height 430px;
        border: 1px solid #c9c9c9
        border-radius: 5px;
        background: hsla(0, 0%, 100%, .3);
        .ms_title
          width: 100%;
          line-height 50px;
          text-align center;
          font-size: 18px;
          color #ffffff
          background #2bb3d5
          border-bottom: 1px solid #ddd;
        .ms-content
          padding 15px 30px 20px 30px
          .ico
            width 15px
            height 13px
          .yanzheng
            width 70px;
            height 30px
            #mycanvas
              width 70px;
              height 30px
              cursor: pointer;
          .login_buttom_warp
            width 100%;
            height 36px;
            margin-top 8px
            .login_buttom
              width 100%;
              height 100%;
          .login_userName
            width 100%
            font-size 18px
            text-align center
            cursor pointer
            margin 50px 0px 50px 0px
          .zhu_btn_warp
            width 100%
            margin-top 19px
            display flex
            justify-content center
            border 1px solid $BackgroundColor
            border-radius 6px
            .zhu_btn
              width 100%
              color $BackgroundColor
              border none
              border-radius 6px
        .file_download
          color:#67C23A
          font-size 14px;
          margin-top:10px;
          margin-left:30px;
      .image_warp
        width 380px
        height 420px
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .dingwei
          position:relative
          .image_img
            margin-top: 20px
            width 380px
            height 330px
          .ben
            width:50px;
            height:50px;
            line-height:50px;
            text-align:center;
            font-size:17px;
            font-weight:700
            box-shadow: 3px 3px 5px #ccc;
            color:#2bb3d5
            border:5px solid #2bb3d5;
            border-radius:50%;
            position:absolute
            left:0px
            top:0px
          .chang
            width:50px;
            height:50px;
            line-height:50px;
            text-align:center;
            font-size:17px;
            font-weight:700
            box-shadow: 3px 3px 5px #ccc;
            color:#cc33cc
            border:5px solid #cc33cc;
            border-radius:50%;
            position:absolute
            left:160px
            top:0px
          .xin
            width:50px;
            height:50px;
            line-height:50px;
            text-align:center;
            font-size:17px;
            font-weight:700
            box-shadow: 3px 3px 5px #ccc;
            color:#FF7F24
            border:5px solid #FF7F24;
            border-radius:50%;
            position:absolute
            right:0px
            top:0px
        .image_title
          width 100%
          font-size 13px
          color $BackgroundColor
      .newlist_warp
        width: 400px;
        height: 420px;
        padding 15px 15px
        border-radius 10px
        border: 1px solid #c9c9c9
        box-sizing border-box
        .newlist_top
          width: 100%
          height: 30px
          margin-bottom 15px
          display flex
          justify-content space-between
          align-items center
          border-bottom: 1px solid $BackgroundColor
          box-sizing border-box
          .new_title
            width 85px
            text-align center
            font-size 16px
            color $BackgroundColor
            margin-top: 4px
            border-bottom 4px solid $BackgroundColor
          .new_more
            cursor pointer
            font-size 12px
            color $BackgroundColor
        .informationList
          width: 100%
          height: 395px
          box-sizing border-box
          .information_li
            width 100%
            height: 25px
            margin-top 8px;
            display flex
            justify-content space-between
            align-items center
            .informationList_xitong
              text-align center
              font-size 13px
              width: 30px;
              line-height: 20px
              color: #ffffff
              background #67C23A
              border-radius 4px
            .informationList_notice
              text-align center
              font-size 13px
              width: 30px;
              line-height: 20px
              color: #ffffff
              background $BackgroundColor
              border-radius 4px
            .informationList_news
              text-align center
              font-size 13px
              width: 30px;
              line-height: 20px
              color: #ffffff
              background #E6A23C
              border-radius 4px
            .informationList_title
              cursor: pointer
              width: 250px
              margin-left: -3px
              white-space: nowrap;
              font-size 13px
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap
            .informationList_date
              font-size 13px

    .footer
      position fixed
      bottom: 0px
      left: 0px
      width 100%
      height: 60px
      background: #EEEEEE
      z-index 1000
      .footer_center
        font-size 16px
        width: 1200px;
        line-height 60px
        margin 0 auto
        text-align center


</style>

