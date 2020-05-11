<template>
  <div>
    <!--基础资料联系人-->
    <div class='contacTitleWarp'>
      <div class='contacTitle'>设备情况</div>
    </div>
    <!--联系人列表-->
    <div class='contacTinformation'>
      <el-table
        :data="equipmentList"
        border
        style="width: 100%">
        <el-table-column
          label="序号"
          type="index"
          align='center'
          width="50">
        </el-table-column>
        <el-table-column
          prop="name"
          label="设备名称"
          align='center'
          width="220">
        </el-table-column>
        <el-table-column
          prop="number"
          label="台数"
          align='center'
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="instrumentSituation"
          label="检查仪器校对情况"
          align='center'
          min-width="120">
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注说明"
          align='center'
          width="180">
        </el-table-column>
        <el-table-column
          align='center'
          label="操作"
          width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small" @click='deleteBth(scope.row)'>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'equipmentList',
    props: {
      equipmentList: {
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
