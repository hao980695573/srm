<template>
  <div>
    <!--搜索-->
    <div class='inquiry_warp'>
      <el-form ref="screen_data" :model="screen_data" label-width="80px" :inline="true" size='mini'>
        <el-form-item label="模糊搜索">
          <el-input v-model="screen_data.search" placeholder="模糊搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class='Fuzzy' @click='getList("search")'>搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--表单-->
    <el-table :data="tableData" style="width: 100%"
              border
              element-loading-background="rgba(0, 0, 0, 0.8)"
              height='415px'
              size='mini'
    >
      <el-table-column
        align="center"
        label="采购日期"
        show-overflow-tooltip
        width="100">
        <template slot-scope="scope">
          <span>{{scope.row.os_DD|filtersPurchaseDate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="采购单号"
        prop='os_NO'
        width='110'>
      </el-table-column>
      <el-table-column
        align="center"
        prop="cus_NAME"
        show-overflow-tooltip
        label="供应商"
        min-width='220'>
      </el-table-column>
      <el-table-column
        align="center"
        prop="prd_NAME"
        show-overflow-tooltip
        label="品名"
        min-width='200'>
      </el-table-column>
      <el-table-column
        align="center"
        prop="prd_NO"
        label="品号"
        width='120'>
      </el-table-column>
      <el-table-column
        align="center"
        label="规格"
        width='250'>
        <template slot-scope="scope">
          <span>{{scope.row.spc}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="订单数"
        show-overflow-tooltip
        width='100'>
        <template slot-scope="scope">
          <span>{{scope.row.qty|filtersCount}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="ut"
        label="单位"
        show-overflow-tooltip
        width='80'>
      </el-table-column>
    </el-table>


    <!--分页-->
    <div class='page_fen' v-show='tableData.length>"0"'>
      <el-pagination
        background
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="totalNum"
        @current-change="getList"
        :current-page.sync="pageNum">
      </el-pagination>
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

  export default {
    name: 'orderPreview',
    data() {
      return {
        // 搜索
        screen_data: {
          search:""
        },
        // 表格
        tableData: [],
        // 当前页
        pageNum: 1,
        // 请求条数
        pageSize: 13,
        // 总条数
        totalNum: 0,
      }
    },
    computed: {
      // 获取State中的值
      ...mapState(['supplierErpno']),
    },
    mounted() {
      // 获取列表数据
      this.getList()

    },
    filters: {
      filtersPurchaseDate(val) {
        if (val) {
          return Interface.renderTime(val).slice(0, 10)
        }
      },
      filtersCount(val) {
        if (val == null || val == undefined || val == "undefined" || val == "") {
          return '无'
        } else {
          return Interface.Remainder(val)
        }
      }
    },
    methods: {
      // 获取列表
      getList(type) {
        if (type == "search") {
          this.pageNum = 1
        }
        const params = {
          search:this.screen_data.search,
          pageNum:this.pageNum,
          pageSize:this.pageSize,
          erpno:this.supplierErpno

        }
        console.log(params);
        axios.post(config.apiSongtao, '/POS/findPOS', params).then((res) => {
          console.log(res);
          if (res.status == 0) {
            this.tableData = res.data
            if (res.data.length > 0) {
              this.totalNum = res.data[0].totalNum
            }

          } else {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true,
            })
          }
        })
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .inquiry_warp
    width: 100%;
    margin-top: 20px;
    margin-bottom: 10px;
    .Fuzzy
      width: 65px;
      margin: 0px 10px;

  /*分页*/
  .page_fen {
    width: 100%;
    height: 50px;
    background: #f5f5f5;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    padding: 0px 20px;
    box-sizing: border-box;
  }
</style>
