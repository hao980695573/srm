<template>
  <div class='yulan_warp' v-show='pages>0'>
    <div id="largePrinting">
      <div v-for="(page,index) in pages" :key="index" class='a'>
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
              <td colspan='4'>{{companyName}}</td>
            </tr>
            <tr>
              <td style='width: 90px;height:44px;'>订单号</td>
              <td>{{barCodeList[index].purchaseOrder}}</td>
              <td style='width: 90px;height:44px;'>保质期</td>
              <td>{{barCodeList[index].qgPeriod|filterDate}}</td>
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
              <td rowspan='3'><img :src='barCodeList[index].filePath' style='width:147px;height:147px;'></td>
            </tr>
            <tr>
              <td style='width: 120px;height:30px;'>生产日期</td>
              <td colspan='2'>{{barCodeList[index].manufactureDate|filterDate}}</td>
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
      <el-button type="primary" size='mini' @click='largePrintPdf'>打印</el-button>
    </div>
  </div>

</template>

<script>
  // 公共配置
  import {config} from 'api/config.js';
  // 接口文件请求文件
  import axios from 'api/axios.js'
  // 引入公共方法
  import Interface from 'api/Interface.js'
  // Vuex语法糖
  import {mapState} from 'Vuex'
  // 打印
  import {getLodop} from 'api/LodopFuncs.js'

  export default {
    name: 'barPrint',
    data() {
      return {
        printMargin: 'printMargin',
        //备注是否显示
        remarkFalse: false,
        remarkTrue: true
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
      ...mapState(['barCodeList', 'companyName']),
      // 打印分页
      pages() {
        // 求当前数据能打印的页数
        if (this.barCodeList.length > 0) {
          var pages_ = this.barCodeList.length
          return pages_ <= 0 ? 1 : pages_
        }
      }
    },
    watch: {
      pages() {
        setTimeout(function () {
          Interface.Font_Max('specification', 26)
          Interface.Font_Max('pinming', 14)
        }, 500)
      }
    },
    methods: {
      // 打印
      largePrintPdf() {
        const params = {
          uuid: this.barCodeList[0].biUuid
        }
        axios.post(config.api, '/barcode/updateBarcodeStatus.do', params).then((res) => {
          if (res.status == 0) {
            // 处理备注显示
            let _this = this
            _this.remarkTrue = false,
              _this.remarkFalse = true
            setTimeout(function () {
              LODOP = getLodop();
              var strStyleCSS2 = "<link href='../../../../static/styles/auxiliaryMiddlePrint.css' type='text/css' rel='stylesheet'>";
              var labelstrFormHtml = "<head>" + strStyleCSS2 + "</head><body>" + document.getElementById("largePrinting").innerHTML + "</body>";

              LODOP.ADD_PRINT_HTM("3mm", "12mm", "RightMargin:5cm", "1300", labelstrFormHtml);
              LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", "Auto-Width");
              LODOP.SET_PRINT_MODE("RESELECT_PAGESIZE",true);
              LODOP.PREVIEW();
            }, 500)
          } else {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .a {
    page-break-after: always !important
  }

  .yulan_warp {
    margin-left: 200px;
    margin-marin: 30px;
    margin-top 25px;
    border: 1px solid #ccc;
    white-space: normal;
    font-size: 12px;
    margin-bottom: 40px;
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
