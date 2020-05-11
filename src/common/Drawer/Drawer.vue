<template>
    <!--抽屉-->
    <el-drawer
      title="消息提醒详情"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
    >
      <div class='content_warp'>
        <el-form ref="openDrawerDetail" :model="openDrawerDetail" label-width="80px" label-position="top">
          <el-form-item label="标题" prop="title">
            <el-input v-model="openDrawerDetail.title" placeholder="请输入标题" :readonly='!DrawerEditState'></el-input>
          </el-form-item>
          <el-form-item label="发布人" prop="title">
            <el-input v-model="openDrawerDetail.messageSender" placeholder="请输入标题" :readonly='!DrawerEditState'></el-input>
          </el-form-item>
          <el-form-item label="描述" prop='introduction'>
            <el-input v-model="openDrawerDetail.introduction" placeholder="请输入描述" :readonly='!DrawerEditState'></el-input>
          </el-form-item>
          <el-form-item label="内容描述" prop='content'>
            <el-input
              type="textarea"
              :rows="9"
              placeholder="请输入内容"
              resize='none'
              :readonly='!DrawerEditState'
              v-model="openDrawerDetail.content">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" size='small' v-show='DrawerEditState' @click='EditBth'>确定修改</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-drawer>
</template>

<script>
  // Vuex语法糖
  import {mapMutations,mapState} from 'Vuex'
  // 引入公共配置
  import {config} from 'api/config.js';
  //引入接口文件请求文件
  import axios from 'api/axios.js'

  export default {
    name: 'Drawer',
    data() {
      return {
        // 侧边抽屉
        drawer: false,
        direction: 'rtl',
        // 抽屉消息提醒详情
        openDrawerDetail: {
          // 标题
          title: '',
          // 描述
          introduction: '',
          // 内容
          content: ''
        },
        // 抽屉是否可以编辑
        DrawerEditState: true
      }
    },
    methods: {
      ...mapMutations(['changeDrawerShow', 'changeDrawerEdit']),
      // 关闭
      handleClose() {
        this.changeDrawerShow(false)
      },
      // 确定修改编辑
      EditBth() {
        let params = {
          title:this.openDrawerDetail.title,
          introduction:this.openDrawerDetail.introduction,
          content:this.openDrawerDetail.content,
          uuid:this.openDrawerDetail.uuid
        }
        console.log(params);
        axios.post(config.api, '/message/editMessage.do', params).then((res) => {
          // 赋值档案列表
          this.$alert(res.msg, {
            confirmButtonText: '确定',
            center: true
          })
        })
      }
    },
    computed: {
      ...mapState(['DrawerShow', 'messageDetail', 'DrawerEdit']),
    },
    mounted() {
      this.drawer = this.DrawerShow
    },
    watch: {
      // 监听抽屉是否展开
      DrawerShow(val) {
        if (val) {
          this.drawer = true
          this.openDrawerDetail = this.messageDetail
          // 抽屉是否可以编辑
          this.DrawerEditState = this.DrawerEdit
        } else {
          this.drawer = false
          // 抽屉是否可以编辑
          this.changeDrawerEdit(false)
        }
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .content_warp
    width 400px;
    margin 0px auto;
    height 500px;
</style>
