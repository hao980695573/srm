<template>
  <div class='warp'>
    <div class='barcode_warp'>
      <el-form :model="barcode" label-width="80px" size='mini'>
        <el-form-item label="条码类型">
          <el-select v-model="barcode.barcodeType" placeholder="请选择标签类型" @change='changeBarcode'>
            <el-option label="正常" value="normal"></el-option>
            <el-option label="补货" value="replenish"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!--引入正常的辅料左边模块-->
      <normalAuxillary @PrintType='PrintTypePros' v-if='barcode.barcodeType=="normal"'></normalAuxillary>
      <!--引入补货的辅料左边模块-->
      <replenishAuxiliary @PrintType='PrintTypePros' v-else></replenishAuxiliary>
    </div>
     <!--条码预览100*70-->
    <div v-show='PrintType=="label"'>
      <LargeSizePrint></LargeSizePrint>
    </div>
    <!--条码预览100*60-->
    <div v-show='PrintType=="middle"'>
      <auxiliaryMiddlePrint></auxiliaryMiddlePrint>
    </div>
     <!--条形码预览70*40-->
    <div v-show='PrintType=="accessories"'>
      <LabelPrinting></LabelPrinting>
    </div>

  </div>
</template>

<script>

  // 条形码预览70*40
  import LabelPrinting from 'commponent/auxiliaryLabelPrinting/commponent/LabelPrinting.vue'
  // 条码预览100*60
  import auxiliaryMiddlePrint from 'commponent/auxiliaryLabelPrinting/commponent/auxiliaryMiddlePrint.vue'
  // 条码预览100*70
  import LargeSizePrint from 'commponent/auxiliaryLabelPrinting/commponent/LargeSizePrint.vue'
  // 引入正常的辅料左边模块
  import normalAuxillary from 'commponent/auxiliaryLabelPrinting/commponent/normalAuxillary.vue'
  // 引入补货的辅料左边模块
  import replenishAuxiliary from 'commponent/auxiliaryLabelPrinting/commponent/replenishAuxiliary.vue'



  export default {
    name: 'auxiliaryLabelPrinting',
    data() {
      return {
        // 显示状态
        PrintType:'',
        // 条码类型 （正常或者补货）
        barcode:{
          barcodeType:'replenish'
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
    components:{
      LabelPrinting,
      LargeSizePrint,
      auxiliaryMiddlePrint,
      normalAuxillary,
      replenishAuxiliary
    }
  }
</script>

<style lang='stylus' scoped>
  .warp{
    width 2200px;
    display flex
  }

  .el-form-item {
    margin-bottom: 20px;
  }

  .barcode_warp{
    margin-top 20px;

  }
</style>
