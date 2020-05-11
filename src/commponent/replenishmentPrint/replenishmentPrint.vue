<template>
  <div>
    <div id="Printing">
      <div v-for="(page,index) in pages" :key="index" class='a' :class='printWrap'>
        <div class='tab_company_out'>
          <div class='title_warp'>
            <!--头部-->
            <div class='title_top'>
              <div class='title_top_left'>
                <img src="../../../static/image/usercenter/WechatIMG25.jpeg" class='title_img'>
              </div>
              <div class='title_top_right'>
                <div>
                  <span>单号 ：</span><span>{{tableData.rmNumber}}</span>
                </div>
                <div>
                  <span>补货日期 ：</span><span>{{tableData.createDate | filterDate}}</span>
                </div>
                <div>
                  <span>打印日期：</span><span>{{printTime}}</span>
                </div>
                <div>
                  <span>页码：</span><span>{{index + 1}}</span>
                </div>
                <div>
                  <span>单据类别：</span><span>{{supplierBillType | supplierBillType}}</span>
                </div>
              </div>
              <div class='title_top_code'>
                <img :src="tableData.qrCodePath" style='width: 100%;height:100%'>
              </div>
            </div>
            <div class='title_center'>补货单</div>
            <div class='title_bottom'>
              <div class='title_bottom_left'>
                <div>
                  <span>供应商名称: </span><span>{{tableData.supplierName}}</span>
                </div>
                <div>
                  <span>电话: </span><span>{{phone}}</span>
                </div>
              </div>
              <div class='title_bottom_right'>
                <div>
                  <span>联系人: </span>{{Contacts}}<span></span>
                </div>
              </div>
            </div>
            <!--品号和采购单号-->
            <div class='PurchaseWrap'>
              <div>
                <div class="Purchase_item">订单号:<span
                  v-for="(item,index) in PurchasingArr.slice((page-1)*onePageRow,page*onePageRow)"> {{item}}<span
                  v-show='PurchasingArr.slice((page-1)*onePageRow,page*onePageRow).length!=1&&index!=PurchasingArr.slice((page-1)*onePageRow,page*onePageRow).length-1'> |</span></span>
                </div>
                <div class='kehubianma'>客户编码: <span>{{tableData.erpno}}</span></div>
              </div>
            </div>
          </div>
          <!--表格内容-->
          <div class="table_warp">
            <table cellpadding='0' cellspacing='0'>
              <tr>
                <th class="xuhao">序号</th>
                <th class="pinming">品名</th>
                <th class="pinhao">品号</th>
                <th class="danwei">单位</th>
                <th class='shuliang'>数量</th>
                <th class='beipin'>备品</th>
                <th class='guige'>规格</th>
              </tr>
              <!-- 每页显示onePageRow条数据 -->
              <tr v-for="(row,index) in tableData.rmProductList.slice((page-1)*onePageRow,page*onePageRow)"
                  :key="index">
                <td>{{(page - 1) * onePageRow + index + 1}}</td>
                <td class='productName'>{{row.productName}}</td>
                <td>{{row.productNumber}}</td>
                <td>{{row.unit}}</td>
                <td>{{row.quantity}}</td>
                <td>0</td>
                <td class="specification"></td>
              </tr>
              <tr>
                <td rowspan="3" class='beizhu'>备注</td>
                <td colspan='8' style='text-align: left' class='beizhutitle'>&nbsp1: 以上货品已收妥,核对无误</td>
              </tr>
              <tr>
                <td colspan='8' style='text-align: left' class='beizhutitle'>&nbsp2: 如有数量及质量问题请在三天内反馈到我司,如无反馈则我司默认数量及质量无误,不再接受退货</td>
              </tr>
              <tr>
                <td colspan='8' style='text-align: left' class='beizhutitle'>&nbsp3: 如发生纠纷,任何一方均可向东莞市第二人民法院起诉</td>
              </tr>
            </table>
            <!--尾页-->
            <div class='footer_warp'>
            <span class="footer_warp1">
              <span>审核人：</span>
            </span>
              <span class="footer_warp2">
              <span>发货人：</span>
            </span>
              <span class="footer_warp3">
              <span>制单人：</span>
            </span>
              <span class="footer_warp4">
              <span>客户签收：</span>
            </span>
            </div>
          </div>
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
  // 引入公共方法
  import Interface from 'api/Interface.js'
  // Vuex语法糖
  import {mapState} from 'Vuex'
  // 打印
  import {getLodop} from 'api/LodopFuncs.js'

  export default {
    name: 'print',
    data() {
      return {
        printWrap: 'printWrap',
        // 当前打印时间
        printTime: Interface.getToday("-"),
        // 接受的打印数据
        tableData: {
          // 单号
          deliveryNumber: "GZSH19070900001",
          // 送货日期
          deliveryDate: "2019-07-08T16:00:00.000+0000",
          // 到货日期
          arrivalDate: "2019-07-08T16:00:00.000+0000",
          // 币种
          currency: "RMB",
          // 操作人
          operatorName: "",
          rmProductList: []
        },
        // 每页多少行
        onePageRow: "7",

        // 因为要绑定多个采购单号和品号
        PurchasingArr: [],
        productNumberArr: []
      }
    },
    mounted() {
      // 获取列表数据
      this.getList()
    },
    filters: {
      // 取小数点后几位
      filterCount: function (val) {
        if (val) {
          return Interface.Remainder(val)
        }
      },
      // 发票类型
      supplierBillType: function (val) {
        if (val == 0) {
          return '专用发票'
        } else if (val == 1) {
          return '普通发票'
        }
      },
      // 日期转换
      filterDate: function (val) {
        if (val) {
          return Interface.renderTime(val).slice(0, 10)
        }
      },
      // 金额后几位
      filterPice: function (val) {
        if (val) {
          return Interface.RemainderPice(val)
        }
      }
    },
    methods: {
      // 列表数据
      getList() {
        const params = {
          uuid: this.uuid
        }
        axios.post(config.api, '/replenishment/getReplenishmentInfo.do', params).then((res) => {
          if (res.status == 0) {
            this.tableData = res.data
            console.log(res.data.rmProductList);
            if (res.data.rmProductList.length > 0) {
              res.data.rmProductList.map((item) => {
                console.log(item.purchaseOrder);
                console.log(item.productNumber);
                this.PurchasingArr.push(item.purchaseOrder)
                this.productNumberArr.push(item.productNumber)
              })
            }
          } else {
            this.$alert(data.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      // 打印
      printPdf() {
        LODOP = getLodop();
        var strStyleCSS2 = "<link href='../../../static/styles/xixi14.css' type='text/css' rel='stylesheet'>";
        var strFormHtml = "<head>" + strStyleCSS2 + "</head><body style='margin:0;background-color: white'>" + document.getElementById("Printing").innerHTML + "</body>";

        LODOP.ADD_PRINT_HTM("0cm", "30mm", "RightMargin:0cm", "BottomMargin:0mm", strFormHtml);
        LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", "Auto-Width");
        LODOP.PREVIEW()
      }
    },
    computed: {
      ...mapState(['uuid', 'manufacturerAddress', 'enterprisePhone', 'fax', 'Contacts', 'phone', 'supplierBillType']),
      // 打印分页
      pages() {
        setTimeout(function(){
          Interface.Font_Max('specification',16)
          Interface.Font_Max('productName',27)

        },700)
        // 求当前数据能打印的页数
        var pages_ = Math.ceil(
          this.tableData.rmProductList.length / this.onePageRow
        ); // 向上取整数
        console.log(pages_);
        return pages_ <= 0 ? 1 : pages_
      }
    }
  }
</script>

<style lang='stylus' scoped>
  * {
    font-size: 12px;
  }

  .printWrap {
    margin-top: 30px;
  }

  .printWrap:first-child {
    margin: 30px;
  }

  .tab_company_out {
    text-align: center;
    width: 100%;
    margin: auto;
    letter-spacing: 1px
  }

  .title_warp {
    margin: 0px auto;
    margin-bottom: 20px;
  }

  .title_top {
    width: 100%;
    line-height: 19px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;
    font-size: 14px;
  }

  .title_img {
    width: 300px;
    height: 50px;
    margin-bottom: 10px;
  }

  .title_top_code {
    width: 80px;
    height: 80px;
    background pink;
  }

  .title_top_right {
    width 220px;
    margin-left: 250px;
  }

  .title_center {
    font-size: 22px;
  }

  .title_bottom {
    width 100%;
    height 40px;
    line-height: 19px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .title_bottom_left {
    width 300px;
    text-align left;
  }

  .title_bottom_right {
    width: 220px;
    text-align: left;
  }

  .PurchaseWrap {
    width: 100%;
    text-align: left;
    line-height: 19px;
  }

  table {
    width: 100%;
    border: 1px solid #000;
    border-left: none
  }

  table th {
    line-height 30px;
    border-left: 1px solid #000;
  }

  table tr td {
    border: 1px solid #000;
    border-right: none;
    border-bottom: none;
    height: 20px;
    line-height: 20px;
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


  .xuhao{
    width:20px;
  }
  .pinming{
    width:300px
  }
  .pinhao{
    width:50px
  }
  .danwei{
    width:50px
  }
  .shuliang{
    width:50px
  }
  .beipin{
    width:50px
  }
  .guige{
    width:200px;
  }

</style>
