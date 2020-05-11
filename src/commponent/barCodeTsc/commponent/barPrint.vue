<template>
  <div class='yulan_warp' v-show='pages>0'>
    <div id="Printing">
      <div v-for="(page,index) in barCodeList" :key="index" class='a' :class='printMargin'>
        <div class='tab_company_out'>
          <!--表格内容-->
          <table cellpadding='0' cellspacing='0'>
            <tr>
              <td colspan='3' style='width: 800px;height:100px;'>
                <div style="width:100%;height:100%;position: relative;">
                  <img src="../../../../static/image/usercenter/guangzheng.jpg" style='width: 60px;height: 60px;position: absolute;left:23px;top:30px;'>
                  <div style='margin-left:20px;font-size: 25px;position: absolute;left:76px;top:30px;'>
                    <div>东莞市广正模具塑胶有限公司</div>
                    <div>Greatech Moulding CO.,Ltd</div>
                  </div>
                </div>
              </td>
              <td class='imgWarp'>
                <img :src="barCodeList[index].filePath" class='img_code'>
              </td>
            </tr>
            <!--center-->
            <tr>
              <td class="td_width">二维码</td>
              <td colspan='2'>{{barCodeList[index].barcodeNumber}}</td>
              <td colspan='2'><span v-if='barCodeList[index].type=="0"'>外箱码</span><span v-else>内箱码</span><span v-show='barCodeList[index].isTailbox=="1"'> / 尾箱</span></td>
            </tr>
            <tr>
              <td class="td_width">供应商</td>
              <td colspan='4'>{{barCodeList[index].supplierName}}</td>
            </tr>
            <tr>
              <td class="td_width">品名</td>
              <td colspan='4' class='pinming'>{{barCodeList[index].productName}}</td>
            </tr>
            <tr>
              <td class="td_width">规格</td>
              <td colspan='4' class="guige">{{barCodeList[index].specification}}</td>
            </tr>
            <tr>
              <td class="td_width">料号</td>
              <td class='liaohao'>{{barCodeList[index].productNumber}}</td>
              <td class="td_width">订单</td>
              <td colspan='3'>{{barCodeList[index].purchaseOrder}}</td>
            </tr>
            <tr>
              <td class="td_width">数量/单位</td>
              <td class='shuliangdanwei'>{{barCodeList[index].count}} / {{barCodeList[index].unit}}</td>
              <td class="td_width">日期</td>
              <td colspan='2'>{{barCodeList[index].issuanceDate|filterDate}}</td>
            </tr>
            <tr v-if='barCodeList[index].type=="1"'>
              <td class="td_width">所属外箱</td>
              <td>{{barCodeList[index].belongBNumber}}</td>
              <td class="td_width">批号</td>
              <td colspan='3'>{{barCodeList[index].batchNumber}}</td>
            </tr>
            <tr v-else>
              <td class="td_width">内箱数</td>
              <td>{{barCodeList[index].cboxNumber}}</td>
              <td class="td_width">批号</td>
              <td colspan='3'>{{barCodeList[index].batchNumber}}</td>
            </tr>
            <tr>
              <td class="td_width">备注</td>
              <td colspan='4' v-show='remarkTrue'><input type="text" name="remark" style='width:100%;height:100%;outline:none;border:none' v-model='barCodeList[index].remark'/></td>
              <td colspan="4" v-show='remarkFalse'><span>{{barCodeList[index].remark}}</span></td>
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
    name:'barPrint',
    data(){
      return{
        printMargin:'printMargin',
        beizhu:'1312',
        //备注是否显示
        remarkFalse:false,
        remarkTrue:true
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
      ...mapState(['barCodeList','companyName']),
      // 打印分页
      pages() {
        setTimeout(function(){
          Interface.Font_Max('guige',20)
          Interface.Font_Max('pinming',24)
        },700)
        // 求当前数据能打印的页数
        if(this.barCodeList.length>0){
          var pages_ = this.barCodeList.length
          return pages_ <= 0 ? 1 : pages_
        }
      }
    },
    methods:{
      // 打印
      printPdf() {
        const params={
          uuid:this.barCodeList[0].biUuid
        }
        axios.post(config.api, '/barcode/updateBarcodeStatus.do', params).then((res) => {
          if (res.status == 0) {
            // 处理备注显示
            let _this=this
            _this.remarkTrue=false,
            _this.remarkFalse=true
            setTimeout(function(){
              LODOP=getLodop();
              var strStyleCSS2="<link href='../../../../static/styles/uu.css' type='text/css' rel='stylesheet'>";
              var strFormHtml="<head>"+strStyleCSS2+"</head><body>"+document.getElementById("Printing").innerHTML+"</body>";

              LODOP.ADD_PRINT_HTM("5mm","8mm","RightMargin:5cm","1100", strFormHtml);
              LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", "Auto-Width");
              LODOP.SET_PRINT_MODE("RESELECT_PAGESIZE",true);
              LODOP.PREVIEW();
            },500)
          }else {
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
  .yulan_warp
    margin-left:200px;
    margin-marin:30px;
    border:1px solid #ccc;
    white-space:normal;
    font-size:12px;
    margin-bottom:40px;
    margin-top 30px;

  #Printing{
    width 800px;
    margin:0px auto
  }

  .login_warp{
    display: flex;justify-content: center;align-items: center;
  }

  .td_width{
    width:150px;
  }


  .printMargin {
    margin-top:30px;
  }

  .printMargin:first-child {
    margin: 0px;
  }

  .tab_company_out {
    text-align: center;
    width: 100%;
    margin: auto;
    letter-spacing:1px
  }

  .imgWarp{
    width:196px;
    height:160px;
  }

  .img_code{
    width 100%
    height:100%
  }


  table {
    width: 800px;
    height:700px;
    font-size:24px;
    border: 1px solid #000;
    border-left: none;
    border-right: none;
  }

  table tr td {
    border: 1px solid #000;
    text-align:center
  }




  .footer_warp {
    width:100%;
    display:flex;
    justify-content:space-around;
    align-items:center;
    margin-top:20px;
  }


  .printBth{
    width:100%;
    height:40px;
    margin-top:40px;
    display:flex;
    justify-content:center;
    align-items:center
  }
</style>
