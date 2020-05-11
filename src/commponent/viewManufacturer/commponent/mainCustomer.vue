<template>
  <div>
    <div class='contacTitleWarp'>
      <div class='contacTitle'>主要客户</div>
    </div>
    <!--银行账号列表-->
    <div class='contacTinformation'>
      <el-table
        :data="customerList"
        border
        style="width: 100%">
        <el-table-column
          type="index"
          align='center'
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="客户名称"
          align='center'
          width="300">
        </el-table-column>
        <el-table-column
          prop="saleRate"
          label="销售占比"
          align='center'
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="productionCapacityRate"
          label="占月生产产能"
          align='center'
          min-width="120">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'mainCustomer',
    props: {
      customerList: {
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
      margin-left: -53px;
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
