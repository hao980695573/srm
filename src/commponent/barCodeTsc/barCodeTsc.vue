<template>
  <div class='warp'>
    <!--选择左侧标签类型-->
    <div class='barcode_warp'>
      <el-form :model="barcode" label-width="80px" size='mini'>
        <el-form-item label="条码类型">
          <el-select v-model="barcode.barcodeType" placeholder="请选择标签类型" @change='changeBarcode'>
            <el-option label="正常" value="normal"></el-option>
            <el-option label="补货" value="replenish"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!--引入左侧正常标签选项-->
      <normal @PrintType='PrintTypePros' v-if='barcode.barcodeType=="normal"'></normal>
      <!--引入左侧补货标签选项-->
      <replenish @PrintType='PrintTypePros' v-else></replenish>
    </div>
    <!--条形码预览 100*70-->
    <div v-show='PrintType=="label"'>
      <barPrint></barPrint>
    </div>
    <!--条形码预览 100*60-->
    <div v-show='PrintType=="middle"'>
      <MiddlePrint></MiddlePrint>
    </div>
    <!--条形码预览 70*40-->
    <div v-show='PrintType=="accessories"'>
      <smallBarPrint></smallBarPrint>
    </div>
  </div>
</template>

<script>
  // 引入左侧正常标签选项
  import normal from 'commponent/barCodeTsc/commponent/normal'
  // 引入左侧补货标签选项
  import replenish from 'commponent/barCodeTsc/commponent/replenish'
  // 条形码预览(100*70)
  import barPrint from 'commponent/barCodeTsc/commponent/barPrint'
  // 条形码预览(100*60)
  import MiddlePrint from 'commponent/barCodeTsc/commponent/MiddlePrint'
  // 条码预览（70*40）
  import smallBarPrint from 'commponent/barCodeTsc/commponent/smallBarPrint'


  export default {
    name: 'register',
    data(){
      return{
        // 标签打印类型（具体哪种此尺寸）
        PrintType:'',
        // 条码类型 （正常或者补货）
        barcode:{
          barcodeType:'normal'
        }
      }
    },
    methods:{
      PrintTypePros(data){
        this.PrintType=data
      },
      // 改变条码类型
      changeBarcode(data){
        this.barcode.barcodeType=data
      }
    },
    components: {
      barPrint,
      smallBarPrint,
      MiddlePrint,
      normal,
      replenish
    }
  }
</script>

<style scoped lang='stylus'>
  .warp {
    width 2200px;
    display flex
  }

  .barcode_warp{
    margin-top 20px;

  }
</style>
