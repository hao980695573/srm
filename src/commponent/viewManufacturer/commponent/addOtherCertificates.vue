<template>
  <div>
    <div class='contacTitleWarp'>
      <div class='contacTitle'>添加其他证书</div>
    </div>
    <el-table
      :data="OtherCertificates"
      border
      style="width: 100%">
      <el-table-column
        align='center'
        prop="ertificateName"
        label="证书名称"
        min-width="180">
      </el-table-column>
      <el-table-column
        align='center'
        prop="ertificateNumber"
        label="证书编号"
        min-width="200">
      </el-table-column>
      <el-table-column
        align='center'
        label="生效日期"
        min-width='200'
      >
        <template slot-scope="scope">
          <span>{{scope.row.effectiveDate.slice(0,10)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align='center'
        label="有效日期至"
        min-width='200'
      >
        <template slot-scope="scope">
          <span>{{scope.row.invalidDate.slice(0,10)}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align='center'
        label="附件"
        min-width='200'
      >
        <template slot-scope="scope">
          <a :href='scope.row.filePath' download  target="_blank"><el-button size="mini" type="primary">下载</el-button></a>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    name:'addOtherCertificates',
    props: {
      OtherCertificates: {
        type: Array
      }
    },
    data(){
      return {}
    }
  }
</script>

<style lang='stylus' scoped>
  .contacTitleWarp
    width 100%
    height 50px;
    margin-top 10px;
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
