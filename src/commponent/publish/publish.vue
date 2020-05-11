<template>
  <!--标题内容-->
  <el-dialog title="新增信息" :visible.sync="addShow" width='1300px' top='40px' @close='clearData'>
    <el-form ref="screen" :model="screen_form" label-width="80px" size='mini' class='screen_form'>
      <el-form-item label="分类">
        <el-select v-model="screen_form.categoryUuid" placeholder="请选择类别" @change='categoryChange'>
          <el-option :label='item.name' :value='item.uuid' v-for="item in categoryList" :key='item.uuid'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="screen_form.title" placeholder="请输入标题"></el-input>
      </el-form-item>
      <el-form-item label="概要">
        <el-input
          type="textarea"
          Rows='5'
          resize='none'
          placeholder="请输入概要内容"
          v-model="screen_form.summary">
        </el-input>
      </el-form-item>
    </el-form>
    <!--内容-->
    <div class='center'>
      <!--富文本公共组件-->
      <editor ref='editor'></editor>
    </div>
    <!--按钮-->
    <div class='button_warp'>
      <el-button type="primary" class='primary' @click='publish_buttom'>新增</el-button>
      <el-button type="danger" class='danger' @click='addUserShow'>取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
  // 富文本公共组件
  import editor from 'common/wangeditor/wangeditor'
  // 引入公共配置
  import {config} from 'api/config.js';
  //引入接口文件请求文件
  import axios from 'api/axios.js'
  // Vuex语法糖
  import {mapState,mapMutations} from 'Vuex'

  export default {
    name: 'publish',
    data() {
      return {
        // 显示新增消息
        addShow:false,
        // 搜索列表
        screen_form: {
          // 分类用户名
          categoryName: '',
          // 分类id
          categoryUuid: '',
          // 标题
          title: '',
          // 概要
          summary: ''
        },
        // 分类列表
        category: []
      }
    },
    computed: {
      // 获取 消息管理分类列表
      ...mapState(['categoryList']),
    },
    methods: {
      ...mapMutations(['changeEditorClear']),
      // 当select的值发生改变，获取对应的对象
      categoryChange(val) {
        let obj = {};
        obj = this.categoryList.find((item) => {
          return item.uuid === val;
        });
        // 获取选中name
        this.screen_form.categoryName = obj.name
        // 获取选中的uuid
        this.screen_form.categoryUuid = obj.uuid
      },
      // 点击新增
      publish_buttom() {
        const params = {
          categoryUuid: this.screen_form.categoryUuid,
          categoryName: this.screen_form.categoryName,
          title: this.screen_form.title,
          summary: this.screen_form.summary,
          content: this.$refs.editor.getContent()
        }
        axios.post(config.api, '/information/addInformation.do', params).then((res) => {
          if (res.status == 0) {
            let _this = this
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true,
              callback: action => {
                // 清除数据
                _this.clearData()
                // 隐藏新增
                _this.addUserShow()
                // 通知父节点重新获取数据
                _this.$emit('againload')
              }
            })
          }
        })
      },
      // 清除所有数据
      clearData(data) {
        this.screen_form.categoryUuid=''
        this.screen_form.categoryName=''
        this.screen_form.title=''
        this.screen_form.summary=''

        this.changeEditorClear(data)
      },
      // 显示隐藏添加弹框
      addUserShow(){
        this.addShow=!this.addShow
        // 清除所有数据
        this.clearData(this.addShow)
      }
    },
    // 2、注册组件
    components: {
      editor
    },
  }
</script>

<style lang='stylus' scoped>
  .screen_form
    width 500px;
    margin-top 40px;

  .center >>> .w-e-text-container
    z-index 1000 !important

  .center
    width 1200px;
    margin-left 40px;
    margin-top 40px;

  .button_warp
    width 100%;
    height 50px;
    margin-top 60px;
    display flex
    justify-content center
    align-items center

  .danger
    margin-left 100px;

</style>
