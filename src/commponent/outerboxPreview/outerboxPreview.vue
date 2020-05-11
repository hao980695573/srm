<template>
  <div>
    <div id="Printing">
      <div v-for="(page,index) in pages" :key="index" class='a' :class='printWrap'>
        <div class='tab_company_out'>
          <!--标题-->
          <div class="title">外箱清单</div>
          <!--表格内容-->
          <table cellpadding='0' cellspacing='0'>
              <tr>
                <th class="xuhao">序号</th>
                <th class="pinming">品名</th>
                <th class="pinhao">品号</th>
                <th class="danwei">单位</th>
                <th class='shuliang'>数量</th>
                <th class='beipin'>备品</th>
              </tr>
              <!-- 每页显示onePageRow条数据 -->
              <tr v-for="(row,index) in tableData.deliveryProductList.slice((page-1)*onePageRow,page*onePageRow)"
                  :key="index">
                <td>{{(page - 1) * onePageRow + index + 1}}</td>
                <td>{{row.productName}}</td>
                <td>{{row.productNumber}}</td>
                <td>{{row.unit}}</td>
                <td>{{row.quantity}}</td>
                <td>{{row.bpCount}}</td>
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
  // 引入公共方法
  import Interface from 'api/Interface.js'
  // Vuex语法糖
  import {mapState} from 'Vuex'
  // 打印
  import {getLodop} from 'api/LodopFuncs.js'

  export default {
    name: 'orderPreview',
    data() {
      return {
        printWrap: 'printWrap',
        // 接受的打印数据
        tableData: {
          deliveryProductList: []
        },
        // 每页多少行
        onePageRow: "35",
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
      }
    },
    methods: {
      // 获取列表
      getList(){
        this.tableData.deliveryProductList = this.boxListState
      },
      // 打印
      printPdf() {
        LODOP = getLodop();
        var strStyleCSS2 = "<link href='../../../static/styles/outerboxPreview.css' type='text/css' rel='stylesheet'>";
        var strFormHtml = "<head>" + strStyleCSS2 + "</head><body style='margin:0;background-color: white'>" + document.getElementById("Printing").innerHTML + "</body>";

        LODOP.ADD_PRINT_HTM("2cm", "30mm", "RightMargin:0cm", "BottomMargin:0cm", strFormHtml);


        LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT", "Auto-Width");
        LODOP.PREVIEW()
      }
    },
    computed: {
      ...mapState(['boxListState']),
      // 打印分页
      pages() {
        // 求当前数据能打印的页数
        var pages_ = Math.ceil(
          this.tableData.deliveryProductList.length / this.onePageRow
        ); // 向上取整数
        return pages_ <= 0 ? 1 : pages_
      }
    }
  }
</script>

<style lang='stylus' scoped>
  * {
    font-size: 12px;
  }

  .title {
    width: 100%;
    line-height: 20px;
    font-size: 20px;
    text-align: center;
    margin-bottom: 20px;
  }

  .printWrap {
    margin-top: 20px;
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

  .printBth {
    width 100%;
    margin-top 30px;
    display flex
    justify-content center
  }

  .xuhao {
    width: 20px;
  }

  .pinming {
    width: 100px
  }

  .pinhao {
    width: 50px
  }

  .danwei {
    width: 50px
  }

  .shuliang {
    width: 50px
  }

  .beipin {
    width: 50px
  }

</style>
