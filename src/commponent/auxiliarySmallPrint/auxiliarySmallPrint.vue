<template>
  <div class="barCodeWarp">
    <div id="Printing">
      <div v-for="(page,index) in barCodeList" :key="index" :class='[index%2==0?"":["a","margintow"]]'>
        <div class='tab_company_out'>
          <!--表格内容-->
          <table cellpadding='0' cellspacing='0'>
            <tr>
              <td colspan='4' class="title">
                东莞市广正模具塑胶有限公司
              </td>
            </tr>
            <!--center-->
            <tr>
              <td style='height:42px;'>供应商</td>
              <td colspan='4'>{{barCodeList[index].supplierName}}</td>
            </tr>
            <tr>
              <td style='width: 90px;height:44px;'>订单号</td>
              <td>{{barCodeList[index].purchaseOrder}}</td>
              <td style='width: 90px;height:44px;'>保质期</td>
              <td>{{barCodeList[index].qgPeriod | filterDate}}</td>
            </tr>
            <tr>
              <td style='width: 90px;height:44px;'>料号</td>
              <td>{{barCodeList[index].productNumber}}</td>
              <td style='width:90px;height:44px;'>批次</td>
              <td>{{barCodeList[index].batchNumber}}</td>
            </tr>
            <tr>
              <td style='width: 90px;height:44px;'>规格</td>
              <td colspan='4' class='specification' style='text-align: left'>{{barCodeList[index].specification}}</td>
            </tr>
            <tr>
              <td style='width: 120px;height:25px;'>数量/单位</td>
              <td colspan='2' style='height:25px;'>{{barCodeList[index].count}} / {{barCodeList[index].unit}}</td>
              <td rowspan='3'><img :src='barCodeList[index].filePath' style='width:140px;height:140px;'></td>
            </tr>
            <tr>
              <td style='width: 120px;height:30px;'>生产日期</td>
              <td colspan='2'>{{barCodeList[index].manufactureDate | filterDate}}</td>
            </tr>
            <tr>
              <td style='width: 120px;height:30px;'>品名</td>
              <td colspan='2' class="pinming" style='font-size: 18px'>{{barCodeList[index].productName}}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <!--打印按钮-->
    <div class='printBth'>
      <el-button type="primary" size='mini' @click='printPdf'>打印</el-button>
    </div>
  </div>
</template>

<script>
  // 引入公共配置
  import {config} from 'api/config.js';
  //引入接口文件请求文件
  import axios from 'api/axios.js'
  // Vuex语法糖
  import {mapState} from 'Vuex'
  // 引入公共方法
  import Interface from 'api/Interface.js'
  // 打印
  import {getLodop} from 'api/LodopFuncs.js'

  export default {
    name: 'auxiliarySmallPrint',
    data(){
      return {
        printMargin: 'printMargin',
        beizhu: '1312',
        //备注是否显示
        remarkFalse: false,
        remarkTrue: true,
        //条码列表
        barCodeList:[]
      }
    },
    filters: {
      // 日期转换
      filterDate: function (val) {
        if (val) {
          return Interface.renderTime(val).slice(0, 10)
        }
      }
    },
    computed: {
      ...mapState(['uuid','barcodeCategory']),
    },
    mounted(){
      this.getList();
    },
    methods: {
      getList(){
        const params = {
          uuid: this.uuid,
          type:this.barcodeCategory
        }
        axios.post(config.api, '/barcode/getAuxiliaryDetailList.do', params).then((res) => {
          if (res.status == 0) {
            this.barCodeList=res.data
            return this.barCodeList.length <= 0 ? 1 : this.barCodeList.length
          }
        })
        setTimeout(function(){
          Interface.Font_Max('specification',26)
          Interface.Font_Max('pinming',14)
        },500)
      },
      // 打印
      printPdf() {
        // 处理备注显示
        let _this = this
        _this.remarkTrue = false,
          _this.remarkFalse = true
        setTimeout(function () {
          LODOP = getLodop();
          var strStyleCSS2 = "<link href='../../../../static/styles/labelPringting11.css' type='text/css' rel='stylesheet'>";
          var strFormHtml = "<head>" + strStyleCSS2 + "</head><body>" + document.getElementById("Printing").innerHTML + "</body>";

          LODOP.ADD_PRINT_HTM("2.5mm", "2.5mm", "RightMargin:5cm", "1150", strFormHtml);
          LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", "Auto-Width");
          LODOP.SET_PRINT_MODE("RESELECT_PAGESIZE",true);
          LODOP.PREVIEW();
        }, 500)
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .a {
    page-break-after: always !important
  }

  .barCodeWarp {
    width 1000px;
    min-height 500px;
    border: 1px solid #000;
    margin: 0px auto;
  }

  #Printing {
    width 800px;
    margin: 0px auto
  }

  .tab_company_out {
    text-align: center;
    width: 100%;
    margin: auto;
    letter-spacing: 1px
  }

  .register_center {
    height: 700px;
  }

  table {
    width: 630px;
    height: 470px;
    font-size: 24px;
    border: 1px solid #000;
    border-left: none;
    border-right: none;
  }

  table tr td {
    border: 1px solid #000;
    text-align: center
  }

  .footer_warp {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 20px;
  }

  .printBth {
    width: 100%;
    height: 40px;
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center
  }
</style>
