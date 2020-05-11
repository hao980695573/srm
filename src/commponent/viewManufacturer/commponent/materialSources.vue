<template>
  <div>
    <!--主要材料来源-->
    <div class='contacTitleWarp'>
      <div class='contacTitle'>主要材料来源</div>
    </div>
    <!--材料列表-->
    <div class='contacTinformation'>
      <el-table
        :data="materialSourcesList"
        border
        style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          align='center'
          width="50">
        </el-table-column>
        <el-table-column
          prop="materialName"
          label="材料名称"
          align='center'
          width="220">
        </el-table-column>
        <el-table-column
          prop="supplier"
          label="供应厂商"
          align='center'
          min-width="120">
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
    name: 'materialSources',
    props: {
      materialSourcesList: {
        type: Array
      }
    },
    data() {
      return {}
    },
    methods: {}
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
      height: 45px;
      margin-top 20px;
      margin-left 20px;
      display flex
      justify-content center
      align-items center
</style>
