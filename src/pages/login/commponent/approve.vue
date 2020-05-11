<template>
  <div class='register' v-show='approvalShow'>
    <!--审批标题-->
    <div class='register_title'>
      <div class='enter_login' @click='showLogin'>登录</div>
      <div class='register_title_margin'> ></div>
      <div class='register_title_right'>查询审批</div>
    </div>
    <!--审批中心-->
    <div class='approve_center'>
      <!--搜索框-->
      <div class='search_warp'>
        <el-input v-model="inputValue" placeholder="请输入回执码" class='search_input' size='small'></el-input>
        <!--按钮-->
        <el-button size='small'>查询</el-button>
      </div>
      <!--内容-->
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column
          prop="Receipt"
          label="回执码"
          width="150"
          align='center'>
        </el-table-column>
        <el-table-column
          prop="supplier"
          label="供应商"
          width="270"
          align='center'>
        </el-table-column>
        <el-table-column
          prop="application"
          label="申请日期"
          width='150'
          align='center'>
        </el-table-column>
        <el-table-column
          prop="passdate"
          label="通过日期"
          width='150'
          align='center'>
        </el-table-column>
        <el-table-column
          prop="ren"
          label="审核人"
          width='130'
          align='center'
        >
        </el-table-column>
        <el-table-column
          prop="status"
          label="申请状态"
          width='120'
          align='center'
        >
        </el-table-column>
        <el-table-column>
        </el-table-column>
        <el-table-column label="操作" width='110' fixed='right' align='center'>
          <template slot-scope="scope">
            <el-button size="mini" v-show='scope.row.sign'>重新提交</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'approve',
    props: {
      approvalShow: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        inputValue: "",
        // 当前页
        currentPage: 1,
        // 展示条数
        ShowPage: 20,
        // 总页数
        total: 40,
        // 审批列表
        tableData:[{'Receipt':'adasdsadad','supplier':'东莞市广正模具塑胶有限公司','application':'2019-10-21','passdate':'2019-02-12','status':'成功','ren':'吴涛','sign':false}]
      }
    },
    methods: {
      // 通知父组件
      showLogin() {
        // 清空搜索框数据
        this.inputValue=''
        // 通知首页
        this.$emit('showLogin')
      }
    }
  }
</script>

<style lang='stylus' scoped>
  //引入css变量,使用快速定位文件夹时在css中要加~
  @import '~styles/mixins.styl'

  .register
    width 1200px
    height 700px
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
    .approve_center
      width 1200px
      margin 0px auto
      margin-top 50px
      .search_warp
        width 100%
        height: 50px
        display flex
        justify-content flex-end
        align-items center
        margin-bottom 20px
        .search_input
          width 200px
          margin-right 10px
    .page_warp
      width 100%
      margin-top 20px
      display flex
      justify-content center
      align-items center
</style>
