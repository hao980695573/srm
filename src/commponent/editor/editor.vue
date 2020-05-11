<template>
  <el-dialog title="编辑信息" :visible.sync="eduitShow" top='40px' width='1300px'>
    <!--标题内容-->
    <el-form :model="screen_form" label-width="80px"  size='mini' class='screen_form'>
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
      <editor ref='editors'></editor>
    </div>
    <!--按钮-->
    <div class='button_warp'>
      <el-button type="primary" class='primary' @click='SureButtom'>确定</el-button>
      <el-button type="danger" class='danger' @click='showEditor'>取消</el-button>
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
    name:'publish',
    data(){
      return{
        // 显示编辑信息
        eduitShow:false,
        // 搜索列表
        screen_form:{
          // 分类用户名
          categoryName:'',
          // 分类id
          categoryUuid:'',
          // 标题
          title:'',
          // 概要
          summary:''
        },
        // 分类列表
        category:[]
      }
    },
    computed: {
      // 获取 消息管理分类列表 消息管理分类列表
      ...mapState(['uuid','categoryList']),
    },
    methods:{
      // 修改 修改后台返回消息富文本编辑内容
      ...mapMutations(['changeEditorData']),
      // 当select的值发生改变，获取对应的对象
      categoryChange(val){
        let obj = {};
        obj = this.categoryList.find((item)=>{
          return item.uuid === val;
        });
        // 获取选中的name
        this.screen_form.categoryName=obj.name
        // 获取选中的uuid
        this.screen_form.categoryUuid=obj.uuid
      },
      // 点击确定
      SureButtom(){
        const params= {
          categoryUuid:this.screen_form.categoryUuid,
          categoryName:this.screen_form.categoryName,
          title:this.screen_form.title,
          summary:this.screen_form.summary,
          content:this.$refs.editors.getContent(),
          uuid:this.uuid
        }
        axios.post(config.api,'/information/editInformation.do',params).then((res) => {
          let _this=this
          this.$alert(res.msg,{
            confirmButtonText:'确定',
            center:true,
            callback: action => {
              _this.showEditor()
            }
          })
        })
      },
      // 获取编辑数据
      getInformation(){
        let params={
          uuid:this.uuid
        }
        axios.post(config.api,'/information/getInformationInfo.do',params).then((res) => {
                // 绑定uuid
                this.screen_form.categoryUuid=res.data.categoryUuid
                // 绑定Name
                this.screen_form.categoryName=res.data.categoryName
                // 绑定标题
                this.screen_form.title=res.data.title
                // 绑定概要
                this.screen_form.summary=res.data.summary
                // 后台返回消息富文本编辑内容
                this.changeEditorData(res.data.content)
        })
      },
      // 显示隐藏编辑消息
      showEditor(){
        this.eduitShow=!this.eduitShow
        // 获取编辑数据
        if(this.eduitShow==true){
          this.getInformation()
        }
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
    z-index 1000!important

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
