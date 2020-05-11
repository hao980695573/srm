<template>
  <div>
    <el-header>
      <!--折叠面板-->
      <div class="collapse-btn">
        <i class="el-icon-menu"></i>
      </div>
      <!--系统名称-->
      <div class='system_name'>广正供应商管理系统</div>
      <!--右侧部分-->
      <div class='system_right'>
        <img src="../../../static/image/header/Notebook.png" class='Notebook' @click='enterRenewal'>
        <!--消息提醒-->
        <div class='message'>
          <div class='message_ico_warp' id='message_ico_warp'>
            <img src="../../../static/image/header/lingdang.png" style='width: 30px;height:30px;' @click='handLingDang'>
            <span class='message_ico' v-show='numberOfbells!=0'>{{numberOfbells}}</span>
          </div>
          <!--消息提醒弹窗-->
          <div class='message_warp' v-show='message_show&&numberOfbells!=0'>
            <!--头部选择按钮-->
            <div class='message_warp_title_warp'>
              <div class='message_warp_title'>消息提醒</div>
              <div>
                <el-button type="danger" size='mini' @click='allRead'>当页已读</el-button>
              </div>
            </div>
            <!--通知列表-->
            <div class='message_list_warp'>
              <div class='message_item_div' v-for='item in messageList' @click='handMessageItem(item)'>
                <div class='message_item_div_title'>{{item.title}}</div>
                <div class='message_item_div_center'>{{item.introduction}}</div>
                <div class='message_item_div_time'><span class='message_item_div_name'>{{item.messageSender}}</span><span>{{item.createDate|filtersDate}}</span></div>
              </div>
            </div>
            <!--分页-->
            <div class='fenye' v-show='total>4'>
              <el-pagination
                small
                :page-size="pageSize"
                layout="prev, pager, next"
                @current-change='getMessage'
                :current-page.sync="pageNum"
                :total="total">
              </el-pagination>
            </div>
          </div>
        </div>
        <!-- 用户头像 -->
        <div class="user-avator"><img src="../../../static/image/usercenter/img.jpg" class='user_img'></div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click">
                    <span class="el-dropdown-link">
                        {{username}} <i class="el-icon-caret-bottom"></i>
                    </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <span @click='goBack' class="nav_dropdown">回到首页</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <span @click='changePassword' class="nav_dropdown">修改密码</span>
            </el-dropdown-item>
            <el-dropdown-item>
              <span @click='loginout' class="nav_dropdown">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span class='Welcome'>欢迎您</span>
      </div>
    </el-header>
    <!--忘记密码-->
    <changePass ref='userInfo'></changePass>
  </div>

</template>

<script>
  // 引入公共配置
  import {config} from 'api/config.js';
  // 引入vuex
  import {mapState, mapMutations} from 'Vuex'
  // 引入公共方法
  import Interface from 'api/Interface.js'
  //引入接口文件请求文件
  import axios from 'api/axios.js'
  // 修改密码
  import changePass from 'common/changePass/changePass.vue'


  export default {
    name: 'Header',
    data() {
      return {
        // 是否收缩
        isCollapse: false,
        // 消息提醒
        message_show: false,
        // 消息铃铛显示数量
        numberOfbells:0,
        // 消息提醒列表
        messageList:[],
        // 消息当前页
        pageNum:1,
        // 消息总条数
        total:0,
        // 消息请求条数
        pageSize:5
      }
    },
    filters: {
      filtersDate: function (val) {
        return Interface.renderTime(val).slice(0,10)
      }
    },
    computed: {
      ...mapState(['username'])
    },
    mounted(){
      // 定时器
      setInterval(()=>{
          // this.getMessage()
      },5000)
    },
    methods: {
      ...mapMutations(['changeCollapse','changeMessageDetail','changeDrawerShow']),
      // 退出登录
      loginout() {
        // 清除所有的localStrong
        localStorage.clear();
        // 返回首页
        window.location.href = '/'
      },
      // 回到首页
      goBack() {
        // 返回首页
        window.location.href = '/'
      },
      // 修改密码
      changePassword() {
        this.$refs.userInfo.changePassShow()
      },
      // 点击铃铛
      handLingDang() {
        if(this.total!=0){
          this.message_show = !this.message_show
        }
      },
      // 获取通知列表信息
      getMessage(){
        const params = {
          pageNum: this.pageNum,
          pageSize: this.pageSize,
        }
        axios.post(config.MessageApi, '/message/getUnReadMessageList.do', params).then((res) => {
          this.messageList=res.data
          // 总条数
          if(res.data.length>0){
            this.total=res.data[0].totalNum
            // 铃铛显示数量
            if(Number(res.data[0].totalNum)>10){
              this.numberOfbells="10+"
            }else{
              this.numberOfbells=res.data[0].totalNum
            }
          }else{
            // 铃铛显示数恢复0
            this.numberOfbells=0
          }
        })
      },
      // 全部已读
      allRead(){
        axios.post(config.api, '/message/readMessage.do', this.messageList).then((res) => {
            this.getMessage()
        })
      },
      // 进入详情
      handMessageItem(item){
        // 存储详情内容
        this.changeMessageDetail(item)
        let params=Array(item)
        axios.post(config.api, '/message/readMessage.do', params).then((res) => {
          // 隐藏铃铛消息框
          this.message_show = false;
          // 展开抽屉显示详情
          this.changeDrawerShow(true)

        })
      },
      // 进入版本更新列表
      enterRenewal(){
        this.$router.push('/renewalProcess/getRenewalProcessList')
      }
    },
    watch: {
      message_show(val) {
        if (val == true) {
          // 监听移除
          document.body.addEventListener("click", e => {
            if (!this.$el.contains(e.target)){
              this.message_show = false;
            }
          })
        }else{
          //重新获取信息数据
          this.getMessage()
        }
      }
    },
    components: {
      changePass
    }
  }
</script>

<style lang='stylus' scoped>
  .el-header
    background-color #2bb3d5;
    color #333;
    text-align center;
    .collapse-btn
      float left;
      width: 64px;
      height 60px;
      .el-icon-menu
        line-height 60px;
        font-size 22px;
        color #fff;
    .system_name
      float left;
      color: #fff;
      font-size 22px;
      line-height 60px;
    .system_right
      width 350px;
      float right;
      height 100%;
      position relative
      .Notebook
        width 40px;
        height 40px;
        position absolute
        top: 12px;
        left: 0px;
        cursor pointer
      .message
        position absolute
        top: 18px;
        left: 60px;
      .user-avator
        width 40px;
        height 40px;
        position absolute
        top: 10px;
        left: 135px;
        .user_img
          width 100%;
          height 100%;
      .user-name
        line-height 60px;
        color #fff;
        cursor pointer;
        position absolute
        left: 190px;
      .Welcome
        color: #fff;
        font-size 14px;
        position absolute
        top: 20px;
        right: 0px;

  .nav_dropdown {
    width: 100%;
    height: 100%;
    display inline-block
  }

  //  消息提醒
  .message_ico_warp
    width 50px;
    position relative
    .message_ico
      width 30px;
      color:#fff;
      line-height 20px;
      text-align center
      background #F56C6C;
      font-size 12px;
      border-radius 20px;
      position absolute
      right 0px;
      top:-10px;
      animation: fade 600ms infinite;
      -webkit-animation: fade 600ms infinite;




  .message_warp
    width: 360px;
    background #f0f0f0;
    border: 1px solid #ccc;
    z-index 2000;
    padding: 0px 10px 12px 10px;
    position absolute
    top: 30px;
    left: -330px;
    .message_warp_title_warp
      width 100%
      height 40px;
      border-bottom: 1px solid #ddd;
      display flex
      justify-content space-between
      align-items center

  .message_list_warp
    width 100%
    margin-top: 6px;
    .message_item_div
      width: 100%;
      height: 64px;
      cursor pointer
      background:#fff;
      padding 2px;
      box-sizing border-box;
      margin-top:5px;
      .message_item_div_title
        text-align left
        font-size 14px;
        color:#00aeef;
      .message_item_div_center
        width 330px;
        margin-top:5px;
        font-size 13px;
        text-align left;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      .message_item_div_time
        margin-top 3px;
        text-align right;
        font-size 12px;
        color:#999;
        .message_item_div_name
          margin-right 10px;
  .fenye
    margin-top: 10px;


  @keyframes fade {
    from {
      opacity: 1.0;
    }
    50% {
      opacity: 0.4;
    }
    to {
      opacity: 1.0;
    }
  }

  @-webkit-keyframes fade {
    from {
      opacity: 1.0;
    }
    50% {
      opacity: 0.4;
    }
    to {
      opacity: 1.0;
    }
  }


</style>
