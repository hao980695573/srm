<template>
  <div>
    <div ref="editor" style="text-align:left"></div>
  </div>
</template>

<script>
  import E from 'wangeditor'
  // Vuex语法糖
  import {mapState} from 'Vuex'
  // 引入公共配置
  import {config} from 'api/config.js';

  export default {
    name: 'editor',
    data() {
      return {
        // 外层需要用的文本源
        editorContent: '',
        // 实例化用的editor
        editor: ""
      }
    },
    computed: {
      // 获取  后台返回消息富文本编辑内容
      ...mapState(['editorData','editorClear']),
    },
    methods: {
      // 初始化
      createEditor() {
        this.editor = new E(this.$refs.editor)
        // 发生改变的时候
        this.editor.customConfig.onchange = (html) => {
          this.editorContent = html
        }
        // 设置token
        this.editor.customConfig.uploadImgHeaders = {
          'Authorization': localStorage.getItem('token')
        }
        // 设置文件名
        this.editor.customConfig.uploadFileName = 'file'
        //上传图片到服务器
        console.log(config.api);
        this.editor.customConfig.uploadImgServer = config.api+"/file/upFile.do?fileType=information.path"
        // 初始化
        this.editor.create()
      },
      // 获取文本数据
      getContent: function () {
        return this.editorContent
      },
    },
    mounted() {
      // 实例化富文本
      this.createEditor()
    },
    watch: {
      // 如果是编辑数据
      editorData(val,old){
        if(val!=old){
          this.editorContent=val
          this.editor.txt.html(val)
        }else{
          this.editorContent=old
          this.editor.txt.html(old)
        }
      },
      // 清空数据
      editorClear(){
        this.editorContent=''
        this.editor.txt.clear()
      }
    }
  }
</script>

<style scoped>
</style>
