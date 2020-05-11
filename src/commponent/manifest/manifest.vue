<template>
  <div>
    <!--搜索框-->
    <div class='inquiry_warp'>
      <el-form ref="screen_list" :model="screen_list" :inline="true" label-width="80px" size='mini'>
        <el-form-item label="模糊搜索">
          <el-input v-model="screen_list.search" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList">搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="generate" :disabled='stateDelivery.length<="0"'>生成送货单</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="duplicate" :disabled='stateDelivery.length<="0"'>生成赠品</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--表格-->
    <el-table :data="tableData" style="width: 100%"
              border
              heigh='415'
              element-loading-background="rgba(0, 0, 0, 0.8)"
              size='mini'
              ref='tableData'
              @selection-change="handleSelectionChange"
              @select-all='AllDetail'
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        align="center"
        label="紧急状态"
        show-overflow-tooltip
        width="95">
        <template slot-scope="scope">
          <span :class='[{"jinji":scope.row.isHurry==1}]'>{{scope.row.isHurry|filteHurry}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="采购日期"
        show-overflow-tooltip
        width="95">
        <template slot-scope="scope">
          <span :class='[{"zhensong":scope.row.isGift==1}]'>{{scope.row.purchaseDate|filtersPurchaseDate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="排程日期"
        width='95'>
        <template slot-scope="scope">
          <span :class='[{"zhensong":scope.row.isGift==1}]'>{{scope.row.planTime}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="采购单号"
        width='100'>
        <template slot-scope="scope">
          <span :class='[{"zhensong":scope.row.isGift==1}]'>{{scope.row.purchaseOrder}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="品号"
        width='120'>
        <template slot-scope="scope">
          <span :class='[{"zhensong":scope.row.isGift==1}]'>{{scope.row.productNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="品名"
        show-overflow-tooltip
        min-width='140'>
        <template slot-scope="scope">
          <span :class='[{"zhensong":scope.row.isGift==1}]'>{{scope.row.productName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        show-overflow-tooltip
        label="供货商"
        min-width='140'>
        <template slot-scope="scope">
          <span :class='[{"zhensong":scope.row.isGift==1}]'>{{scope.row.supplierName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="单位"
        width='70'>
        <template slot-scope="scope">
          <span :class='[{"zhensong":scope.row.isGift==1}]'>{{scope.row.unit}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="是否赠送"
        width='75'>
        <template slot-scope="scope">
          <span :class='[{"zhensong":scope.row.isGift==1}]'>{{scope.row.isGift|filterIsGift}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="订单数量"
        width='110'>
        <template slot-scope="scope">
          <span :class='[{"zhensong":scope.row.isGift==1}]'>{{scope.row.count|filtersQuantity}}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="当前可送数量"
        show-overflow-tooltip
        width='100'>
        <template slot-scope="scope">
          <span :class='[{"zhensong":scope.row.isGift==1}]'>{{scope.row.deliverableQuantity|filtersQuantity}}</span>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <div class='page_fen' v-show='!tableData.length=="0"'>
      <el-pagination
        background
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="totalNum"
        @current-change="getList"
        :current-page.sync="pageNum">
      </el-pagination>
      <!--请求条数-->
      <div class='tiaoshu'>
        <el-input placeholder="请输入内容" v-model="hladpageSize" size='mini'>
          <template slot="append">最多{{totalNum}}条</template>
        </el-input>
      </div>
      <div style='margin-left:10px;'>
        <el-button type="primary" class='Fuzzy' size="mini" @click='getList("search")'
                   :disabled='hladpageSize>totalNum'>搜索
        </el-button>
      </div>
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
  import {mapMutations, mapState} from 'Vuex'

  export default {
    name: 'manifest',
    data() {
      return {
        // 快捷搜索
        screen_list: {
          // 模糊搜索
          search: '',
        },
        // 送货列表
        tableData: [],
        // 当前页
        pageNum: 1,
        // 请求条数
        pageSize: 50,
        // 总条数
        totalNum: 0,
        // 手动输入请求条数
        hladpageSize: 4,
        // 存储被选中的索引和选中的复制后的值
        a: [],
        // 存储被选中的opid
        bb: [],
        //已选择
        selectData: []
      }
    },
    computed: {
      ...mapState(['stateDelivery'])
    },
    filters: {
      filtersPurchaseDate(val) {
        if (val) {
          return Interface.renderTime(val).slice(0, 10)
        }
      },
      filtersQuantity(val) {
        return Interface.Remainder(val)
      },
      filterIsGift(val) {
        if (val == '0') {
          return "否"
        } else {
          return '是'
        }
      },
      filteHurry(val){
        if (val == '1') {
          return "紧急"
        } else {
          return '否'
        }
      }
    },
    mounted() {
      // 获取列表
      this.getList()
      // 清空生成送货单
      this.changeStateDelivery([])
    },
    methods: {
      ...mapMutations(['changeStateDelivery']),
      // 获取列表
      getList(type) {
        if (type == 'search') {
          this.pageNum = 1
          this.pageSize = Number(this.hladpageSize)
        }
        const params = {
          uuid: '',
          search: this.screen_list.search,
          pageNum: this.pageNum,
          pageSize: this.pageSize
        }
        axios.post(config.api, '/delivery/beDeliveryList.do', params).then((res) => {
          if (res.status == 0) {
            this.tableData = res.data
            // 本地新增一个是否正送字段
            this.tableData.map(item => {
              item.isGift = '0'
            })

            // 总条数

            this.totalNum=res.data[0].totalNum


          } else {
            this.$alert(data.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      // // 单选
      // handleSelectionChange(val, row) {
      //   // 是否保存标志
      //   let sign=true
      //   for (let i = 0; i < this.tableData.length; i++) {
      //     // 如果品名相同
      //     if (this.tableData[i].productNumber == row.productNumber) {
      //       // 比较采购单号大小
      //       if (this.tableData[i].purchaseOrder.substr(2)<row.purchaseOrder.substr(2)) {
      //         // 有更大的值。禁止选中
      //         this.$refs.tableData.toggleRowSelection(row,false);
      //         // 不允许保存
      //         sign=false
      //         //提示
      //         this.$alert(`该${this.tableData[i].productNumber}品号下，${this.tableData[i].purchaseOrder}订单还未送完`, {
      //           confirmButtonText: '确定',
      //           center: true
      //         })
      //       }
      //     }
      //   }
      //
      //   if(sign){
      //     this.selectData = val
      //     this.changeStateDelivery(val)
      //   }
      // },
      // // 单选
      handleSelectionChange(selection) {
        // 是否保存标志
        let sign = true
        for(let y=0;y<selection.length;y++) {
          if (selection[y].isGift == 1) {
            continue;
          }
          for (let i = 0; i < this.tableData.length; i++) {
            // 如果品名相同
            if (this.tableData[i].productNumber == selection[y].productNumber) {
              // 比较采购单号大小
              if (this.tableData[i].purchaseOrder.substr(2) < selection[y].purchaseOrder.substr(2)) {
                // 有更大的值。禁止选中
                this.$refs.tableData.toggleRowSelection(selection[y], false);
                // 不允许保存
                sign = false
                //提示
                this.$alert(`该${this.tableData[i].productNumber}品号下，${this.tableData[i].purchaseOrder}订单还未送完`, {
                  confirmButtonText: '确定',
                  center: true
                })
              }
            }
          }
        }

          if(sign){
            this.selectData = selection
            this.changeStateDelivery(selection)
          }
      },

      // 全选详情
      AllDetail(){
        this.selectData=''
        // 清空生成送货单
        this.changeStateDelivery([])
        this.$refs.tableData.clearSelection();
      },
      // 生成送货单
      generate() {
        this.$router.push('deliveryNote')
      },
      // 复制赠送列表
      duplicate() {
        const _this = this
        for (var j = 0; j < _this.stateDelivery.length; j++) {
          var skip = 0
          for (var k = 0; k < _this.tableData.length; k++) {
            for (var i = 0; i < _this.bb.length; i++) {
              if (_this.bb[i].opid == _this.stateDelivery[j].opid && _this.bb[i].planTime == _this.stateDelivery[j].planTime
                && _this.bb[i].purchaseDate == _this.stateDelivery[j].purchaseDate) {
                skip = 1
                break
              }
            }
            if (skip == 1) {
              break;
            }
            if (_this.tableData[k].opid == _this.stateDelivery[j].opid && _this.tableData[k].planTime == _this.stateDelivery[j].planTime
              && _this.tableData[k].purchaseDate == _this.stateDelivery[j].purchaseDate) {
              // 深复制
              const cloneObj = JSON.parse(JSON.stringify(_this.stateDelivery[j]));
              cloneObj.deliverableQuantity = _this.tableData[k].bpCount
              cloneObj.isGift = '1'
              this.a.push({
                index: k,
                b: cloneObj
              })
            }
          }
        }
        // 遍历数组id
        this.a.map((item, index) => {
          for (var i = 0; i < _this.tableData.length; i++) {
            if (item.b.opid == _this.tableData[i].opid && _this.tableData[i].planTime == item.b.planTime
              && _this.tableData[i].purchaseDate == item.b.purchaseDate) {
              // 生成的赠品存入数组
              this.bb.push(item.b)
              // 把赠品数组插入列表
              this.tableData.splice(i + 1, 0, item.b)
              break
            }
          }
        })
        this.a = []
        // 存储已选中的数组
        var arr = this.selectData
        this.$refs.tableData.clearSelection()
        // 把生成的数据也勾选上
        _this.tableData.map((item, index) => {
          for (var i = 0; i < arr.length; i++) {
            if (item.opid == arr[i].opid && item.planTime == arr[i].planTime && item.purchaseDate == arr[i].purchaseDate) {
              this.$refs.tableData.toggleRowSelection(item);
              break;
            }
          }
        })
      }
    }
  }
</script>

<style lang='stylus' scoped>
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

  .inquiry_warp
    width: 100%;
    margin-top: 20px;
    margin-bottom: 10px;
    .Fuzzy
      width: 65px;
      margin: 0px 10px;

  .demo-table-expand {
    font-size: 0;
  }

  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }

  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .zhensong
    color: #409EFF

  .jinji
    font-size 18px;
    color:red
</style>
p
