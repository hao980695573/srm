<template>
  <div>
    <!--基础资料联系人-->
    <div class='contacTitleWarp'>
      <div class='contacTitle'>联系人方式</div>
    </div>
    <!--联系人列表-->
    <div class='contacTinformation'>
      <el-table
        :data="contractList"
        border
        style="width: 100%">
        <el-table-column
          prop="name"
          label="姓名"
          align='center'
          width="100">
        </el-table-column>
        <el-table-column
          prop="sex"
          label="性别"
          align='center'
          width="100">
        </el-table-column>
        <el-table-column
          prop="department"
          label="部门"
          align='center'
          width="120">
        </el-table-column>
        <el-table-column
          prop="post"
          label="职务"
          align='center'
          width="130">
        </el-table-column>
        <el-table-column
          prop="telephone"
          label="电话"
          align='center'
          min-width="160">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="手机"
          align='center'
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注"
          align='center'
          min-width="120">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'contaclnformation',
    props: {
      contractList: {
        type: Array
      }
    },
    data() {
      return {}
    }
  }
</script>

<style lang='stylus' scoped>
  .contacTitleWarp
    width 100%
    height 50px;
    margin-top 30px;
    background: #f5f5f5;
    position relative
    .contacTitle
      width 110px;
      line-height 50px;
      font-size 20px;
      text-align center
      position absolute
      left 50%;
      margin-left: -65px;
    .contacTitleButton
      position absolute
      right 100px;
      top: 11px;

  .contacTinformation
    width: 100%;
    margin 0px auto
    margin-bottom 10px;

  .addContactsWarp
    width 80%
    margin 0px auto
    .defineWarp
      width 100%
      height: 45px;
      margin-top 20px;
      margin-left 20px;
      display flex
      justify-content center
      align-items center
</style>
