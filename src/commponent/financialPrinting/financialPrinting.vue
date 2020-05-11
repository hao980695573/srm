<template>
  <div>
    <div id="Printing">
      <div v-for="(page,index) in pages" :key="index" class='a' :class='printWrap'>
        <div class='tab_company_out'>
          <!--标题-->
          <div class='title_warp'>
            <div style='font-size:23px;'>东莞市广正模具塑胶有限公司</div>
            <div style='font-size:15px;margin-top:10px;'>{{tableData.billingTime}} 对账单</div>
          </div>
          <!--供应商基本信息-->
          <div style='text-align:left;font-size:16px;'>供应商基本信息</div>
          <div class='commpany_warp'>
            <div>公司编码: <span>{{tableData.erpno}}</span></div>
            <div style='width:200px;text-align:left;'>对账期间: <span>{{tableData.bilingInterval}}</span></div>
          </div>
          <div class='commpany_warp'>
            <div>公司名称: <span>{{tableData.supplierName}}</span></div>
            <div style='width:200px;text-align: left'>币种: <span>{{tableData.currency}}</span></div>
          </div>
          <div class='commpany_warp'>
            <div>地址: <span>{{tableData.address}}</span></div>
            <div style='width:200px;text-align: left'>票据种类: <span>{{tableData.billType|supplierBillType}}</span></div>
          </div>
          <div class='commpany_warp1'>
            <div>业务联系人: <span>{{BusinessContacts}}</span></div>
            <div>财务联系人: <span>{{FinancialContacts}}</span></div>
            <div>传真: <span>{{tableData.fax?tableData.fax:'无'}}</span></div>
          </div>
          <div class='commpany_warp2'>
            <div style='width: 250px;text-align: left'>电话: <span>{{BusinessPhone}}</span></div>
            <div style='width: 250px;text-align: left'>电话: <span>{{bankContractPhone}}</span></div>
            <div style='width: 250px;text-align: left'>E-mail: <span>{{tableData.email}}</span></div>

          </div>
          <div class='commpany_warp3'>
            <div style='width:200px;text-align: left'>税率: <span>{{tableData.taxRate}}</span></div>
            <div style='width:200px;text-align: left'>付款条件: <span>{{tableData.payCondition}}</span></div>
            <div style='width:200px;text-align: left'>付款方式: <span>{{tableData.payType}}</span></div>
          </div>
          <!--表格内容-->
          <table cellpadding='0' cellspacing='0' style='margin-top:5px;'>
            <tr>
              <th style='width: 7%;'>送货日期</th>
              <th width='width: 4%;'>采购订单号</th>
              <th width='width: 4%;'>送货/退补货单号</th>
              <th width='width: 4%;'>物料品号</th>
              <th width='width: 4%;'>数据来源</th>
              <th style='width: 14%;'>物料名称</th>
              <th width='width: 4%;'>物料规格</th>
              <th width='width: 4%;'>单位</th>
              <th width='width: 4%;'>数量</th>
              <th width='width: 4%;'>扣货金额</th>
              <th width='width: 4%;'>未税单价</th>
              <th width='width: 4%;'>未税金额</th>
              <th width='width: 4%;'>含税金额</th>
              <th width='width: 4%;'>备品</th>
              <th width='width: 3%;'>备注</th>
            </tr>
            <!-- 每页显示onePageRow条数据 -->
            <tr v-for="(row,index) in tableData.accoutStatementList.slice((page-1)*onePageRow,page*onePageRow)"
                :key="index">
              <td>{{row.deliveryDate}}</td>
              <td>{{row.purchaseOrder}}</td>
              <td>{{row.deliveryNumber}}</td>
              <td>{{row.productNumber}}</td>
              <td>{{row.dataType|dataTypefiles}}</td>
              <td class='pinming'>{{row.productName}}</td>
              <td class='guige'>{{row.specification}}</td>
              <td>{{row.unit}}</td>
              <td>{{row.quantity|filterCount}}</td>
              <td>{{row.deductionAmount}}</td>
              <td>{{row.price|filterPice}}</td>
              <td>{{row.untaxedAmount|filterPice}}</td>
              <td>{{row.totalAmount|filterPice}}</td>
              <td>{{row.giftCount}}</td>
              <td>{{row.remark}}</td>
            </tr>
            <tr>
              <td colspan='5'>未税金额合计</td>
              <td style='text-align: center' colspan='10'>{{tableData.untaxedAmount}}</td>
            </tr>
            <tr>
              <td colspan='5'>税额合计</td>
              <td style='text-align: center' colspan='10'>{{tableData.taxStatistics}}</td>
            </tr>
            <tr>
              <td colspan='5'>含税金额合计</td>
              <td style='text-align: center' colspan='10'>{{tableData.taxableAmount}}</td>
            </tr>
          </table>
          <!--尾页-->
          <div class='footer_warp'>
            <div class='footer_title'>备注</div>
            <div class='commpany_warp'>
              <div>1:除'送货单号'来自供应商以外,其他物料品号、物料名称等信息均以广正公司填写</div>
              <div style='width:200px;text-align: left'>供应商名称:  <span>{{tableData.supplierName}}</span></div>
            </div>
            <div class='commpany_warp'>
              <div>2:备品勿做账，如需可以注名在在备注栏里面</div>
              <div style='width:200px;text-align: left'>签章:</div>
            </div>
            <div class='commpany_warp'>
              <div>3:账单请按日期及单据排序</div>
              <div style='width:200px;text-align: left'>日期:</div>
            </div>
            <div class='commpany_warp'>
              <div>3:此对账单原件为我司安排付款的唯一有效凭证</div>
            </div>
            <!--<div class='bg'></div>-->
            <img border="0" transcolor="#FFFFFF" src="../../../static/image/usercenter/gongzhang.png"
                 style="z-index: -1; position: absolute; left:100px; top:0px;" v-show='tableData.status=="5"'/>
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
  //引入接口文件请求文件
  import axios from 'api/axios.js'
  // 引入公共配置
  import {config} from 'api/config.js';
  // 引入公共方法
  import Interface from 'api/Interface.js'
  // 打印
  import {getLodop} from 'api/LodopFuncs.js'
  // Vuex语法糖
  import {mapState} from 'Vuex'

  export default {
    name: 'print',
    data() {
      return {
        printWrap: 'financialPrinting',
        // 当前打印时间
        printTime: Interface.getToday("-"),
        // 接受的打印数据
        tableData: {
          // 单号
          deliveryNumber: "",
          // 送货日期
          deliveryDate: "",
          // 到货日期
          arrivalDate: "",
          // 币种
          currency: "",
          // 操作人
          operatorName: "",
          // 列表
          accoutStatementList: []
        },
        // 业务联系人
        BusinessContacts: '',
        // 业务联系人电话
        BusinessPhone: '',
        // 财务联系人
        FinancialContacts: '',
        // 财务联系人电话
        bankContractPhone: '',
        // 每页多少行
        onePageRow: "17",
        // 是否插入空白行
        blankLines: true,
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
      },
      // 发票类型
      supplierBillType: function (val) {
        if (val == 0) {
          return '专用发票'
        } else if (val == 1) {
          return '普通发票'
        }
      },
      // 发票类型
      dataTypefiles: function (val) {
        if (val == 0) {
          return '进货'
        } else if (val == 1) {
          return '退货'
        } else if (val == 2) {
          return '扣款'
        }
      },
    },
    methods: {
      // 打印
      printPdf() {
        LODOP = getLodop();
        var strStyleCSS2 = "<link href='../../../static/styles/financialPrinting.css' type='text/css' rel='stylesheet'>";
        var strFormHtml = "<head>" + strStyleCSS2 + "</head><body>" + document.getElementById("Printing").innerHTML + "</body>";

        LODOP.ADD_PRINT_HTM("0cm", "30mm", "RightMargin:0cm", "BottomMargin:0mm", strFormHtml);
        LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", "Auto-Width");
        LODOP.PREVIEW();
      },
      // 获取列表
      getList() {
        const params = {
          productName:'',
          productNumber:'',
          purchaseOrder:'',
          search:'',
          uuid: this.uuid,
        }
        axios.post(config.api, '/aStatement/getGeneratedBillDetail.do', params).then((res) => {
          if (res.status == 0) {
            this.tableData = res.data
            console.log(res.data);
            //业务联系人
            this.BusinessContacts = res.data.mainContract.name
            // 业务联系人电话
            this.BusinessPhone = res.data.mainContract.phone
            // 财务联系人
            this.FinancialContacts = res.data.bankContract.name
            // 财务联系人电话
            this.bankContractPhone = res.data.bankContract.phone

            // 字数限制
            setTimeout(function () {
              Interface.Font_Max('guige', 13)
              Interface.Font_Max('pinming', 11)

            }, 500)
          } else {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      }
    },
    computed: {
      ...mapState(['uuid']),
      // 打印分页
      pages() {
        // 求当前数据能打印的页数
        var pages_ = Math.ceil(
          this.tableData.accoutStatementList.length / this.onePageRow
        ); // 向上取整数
        return pages_ <= 0 ? 1 : pages_
      }
    }
  }
</script>

<style lang='stylus' scoped>

  .printWrap {
    margin-top: 30px;

  }

  .printWrap:first-child {
    margin: 0px;
  }

  //  标题
  .title_warp {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .commpany_warp {
    margin: 2px 0px;
    display: flex;
    font-size: 12px;
    justify-content: space-between;
  }

  .commpany_warp1 {
    display inline-block;
    width 250px;
    font-size: 12px;
    text-align left;
    float left;
    margin-top -1px;
  }

  .commpany_warp2 {
    display inline-block;
    font-size: 12px;
    width 250px;
    text-align left;
  }

  .commpany_warp3 {
    display inline-block;
    font-size: 12px;
    width 200px;
    margin-top -1px;
    text-align left;
    float right
  }

  .tab_company_out {
    text-align: center;
    width: 100%;
    margin: auto;
    letter-spacing: 1px
  }

  table {
    width: 100%;
    border: 1px solid #000;
    border-top: none;
    border-left: none;
    font-size: 12px;
  }

  table tr td {
    border: 1px solid #000;
    border-bottom: none;
    border-right: none;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 12px;
  }

  table tr th {
    border-top: 1px solid #000;
    border-left: 1px solid #000;
    height: 22px;
    line-height: 22px;

  }

  .footer_warp {
    width: 100%;
    height 150px;
    margin-top: 20px;
    position relative;
  }

  .footer_title {
    text-align left;
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

