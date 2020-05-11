<template>
  <div>
    <div class='addBth'>
      <el-button type="primary" @click='newaddShow' size='mini' v-if='userRole=="ROLE_ADMIN"'>新增</el-button>
    </div>
    <!--新增信息-->
    <addInformation ref='Information' @againload='getList'></addInformation>

    <!--内容-->
    <div class='center' v-for='item in formList'>
        <!--标题-->
        <div class='center_title'>{{item.version}}</div>
        <!--创建时间-->
        <div class='center_date'>{{item.createDate|filterDate}}</div>
        <!--内容-->
        <div class='center_text' v-html='item.updateContent'></div>
    </div>
  </div>
</template>

<script>
  import addInformation from 'commponent/getRenewalProcessList/commponent/addInformation'
  // 引入公共配置
  import {config} from 'api/config.js';
  //引入接口文件请求文件
  import axios from 'api/axios.js'
  // 时间转换
  import moment from 'moment';

  // Vuex语法糖
  import {mapState} from 'Vuex'

  export default {
    name:'getRenewalProcessList',
    data(){
      return{
        // 列表内容
        formList:[]
      }
    },
    filters: {
      // 日期转换
      filterDate: function (val) {
        if (val) {
          return moment(val).format("YYYY-MM-DD");
        }
      }
    },
    computed: {
      // 用户角色
      ...mapState(['userRole'])
    },
    mounted(){
      this.getList()
    },
    methods:{
      // 新增显示
      newaddShow(){
        this.$refs.Information.addUserShow()
      },
      // 获取列表
      getList(){
        const params={
          pageSize:100000,
          pageNum:1
        }
        axios.post(config.api, '/renewalProcess/getRenewalProcessList.do',params).then((res) => {
          if (res.status == 0) {
            console.log(res.data)
            this.formList=res.data
          }else{
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      }

    },
    components:{
      addInformation
    }
  }
</script>

<style lang='stylus' scoped>
  .center_text>>>li{
    margin 7px 0px;
  }

  .addBth
    margin-top 20px;

  .center
    width 1000px;
    background #f5f5f5;
    margin 0px auto
    margin-top 10px;
    padding 20px 20px;
    .center_title
      font-size 24px;
    .center_date
      font-size 14px;
      margin-top 10px;

</style>
