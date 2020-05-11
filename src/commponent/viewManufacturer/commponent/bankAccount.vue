<template>
  <div>
    <div class='contacTitleWarp'>
      <div class='contacTitle'>银行信息账号</div>
    </div>
    <!--银行账号列表-->
    <div class='contacTinformation'>
      <el-table
        :data="bankList"
        border
        style="width: 100%"
        size='mini'>
        <el-table-column
          label="序号"
          type="index"
          align='center'
          width="50">
        </el-table-column>
        <el-table-column
          prop="accountName"
          label="开户名称"
          align='center'
          width="220">
        </el-table-column>
        <el-table-column
          prop="openAccountBankName"
          label="开户银行 (具体到分行)"
          align='center'
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="account"
          label="银行账号"
          align='center'
          min-width="90">
        </el-table-column>
        <el-table-column
          prop="bankCode"
          label="银行代码"
          align='center'
          width="180">
        </el-table-column>
        <el-table-column
          align='center'
          label="附件"
          min-width='100'
        >
          <template slot-scope="scope">
            <a :href='scope.row.invoiceDocuments' download target="_blank" style='color:#409EFF;font-size:12px;cursor: pointer' >下载</a>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'bankAccount',
    props: {
      bankList: {
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
      width 130px;
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
      height:45px;
      margin-top 20px;
      margin-left 20px;
      display flex
      justify-content center
      align-items center
</style>
