<template>
  <div>
    <!--显示订单基础信息-->
    <div class='inquiry_warp'>
      <el-form ref="form" :model="form" label-width="80px" size="mini" label-position="right" :inline="true">

        <el-form-item label="厂商" label-width="50px" v-if="userRole!='FIRMMANAGER'&&userRole!='FIRMUSER'">
          <el-select v-model="form.erpno" placeholder="请选择厂商" style='width:220px;'>
            <el-option label="请选择" value=""></el-option>
            <el-option
              v-for="item in form.erpnoList"
              :key="item.uuid"
              :label="item.companyName"
              :value="item.erpno">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模糊搜索" prop='receivingUnit'>
          <el-input v-model="form.search" placeholder="请输入内容"></el-input>
        </el-form-item>
        <el-form-item label="入库条件">
          <el-select v-model="form.stockStatus" placeholder="请选择入库条件">
            <el-option label="未入库" value="0"></el-option>
            <el-option label="已入库" value="1"></el-option>
            <el-option label="全部" value="2"></el-option>
          </el-select>
        </el-form-item>
        <div>
          <el-form-item label="日期" label-width="50px">
            <el-date-picker
              v-model="form.dateArr"
              type="daterange"
              align="right"
              unlink-panels
              style='width:220px'
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format='yyyy-MM-dd'
              @change='changeDate'
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class='Fuzzy' @click='handleCurrentChange("screen")'>搜索</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <!--表格-->
    <el-table
      :data="deliveryList"
      border
      style="width: 100%"
      size="mini"
      :height='414'
    >
      <el-table-column
        type="index"
        align='center'
        width="50">
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
        prop="deliveryNumber"
        label="送货单号"
        align='center'
        show-overflow-tooltip
        min-width="150">
      </el-table-column>
      <el-table-column
        label="送货日期"
        align='center'
        show-overflow-tooltip
        width="120">
        <template slot-scope="scope">
          <span>{{scope.row.deliveryDate|filtersDate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="预计到货时间"
        align='center'
        width="120">
        <template slot-scope="scope">
          <span>{{scope.row.arrivalDate|filtersDate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="receivingUnit"
        label="送货单位"
        align='center'
        min-width="200">
      </el-table-column>
      <el-table-column
        prop="currency"
        label="币种"
        align='center'
        width="80">
      </el-table-column>
      <el-table-column
        label="入库状态"
        align='center'
        min-width="100">
        <template slot-scope="scope">
          <span>{{scope.row.stockNumber|filerStockStatus}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作员名字"
        align='center'
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.operatorName}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align='center'
        width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click='enterDeliveryDetail(scope)'
          >
            详情
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class='page_fen'>
      <el-pagination
        background
        :page-size="form.pageSize"
        layout="prev, pager, next"
        :total="form.totalNum"
        @current-change="handleCurrentChange"
        :current-page.sync="form.pageNum">
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
  import {mapMutations, mapState} from 'Vuex'

  export default {
    name: 'detailed',
    data() {
      return {
        // 快捷搜索
        form: {
          // 日期
          dateArr: [],
          startDate: '',
          endDate: '',
          search: '',
          stockStatus:"2",
          // 供应商
          erpno: '',
          // 厂商列表
          erpnoList: [],
          // 总条数
          totalNum: 0,
          // 当前页
          pageNum: 1,
          // 请求条数
          pageSize: 6,
        },

        // 表格
        deliveryList: [],
        // 选择日期快捷方式
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }
      }
    },
    filters: {
      filtersDate(val) {
        if (val) {
          return Interface.renderTime(val).slice(0, 10)
        }
      },
      filerStockStatus(val){
        if (val) {
          return '已入库'
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
    activated(){
      this.handleCurrentChange()
      // 获取供应商列表
      this.getSupplierList()
    },
    computed: {
      // 获取 uuid 角色身份
      ...mapState(['supplierUUid', 'userRole']),
    },
    methods: {
      ...mapMutations(['changeUuid']),
      // 修改日期
      changeDate() {
        if (this.form.dateArr != null) {
          this.form.startDate = this.form.dateArr[0]
          this.form.endDate = this.form.dateArr[1]
        } else {
          this.form.startDate = ''
          this.form.endDate = ''
        }
      },
      // 获取供应商列表
      getSupplierList() {
        // 请求
        const params = {
          uuid: this.supplierUUid,
          // 类型
          companyType: '',
          // 现场审厂
          isNeedExamination: '',
          // 内容
          conditionContent: '',
          // 条数
          pageSize: 3000,
          // 当前页码
          pageNum: 1
        }
        axios.post(config.api, '/supplier/getSupplierList.do', params).then((res) => {
          console.log(res)
          // 赋值档案列表
          if (res.status == 0) {
            this.form.erpnoList = res.data
          } else {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      // 获取送货单列表
      handleCurrentChange(type) {
        if (type == 'screen') {
          this.form.pageNum = 1
        }
        const params = {
          uuid: "",
          stockStatus:this.form.stockStatus,
          search: this.form.search,
          startDate: this.form.startDate,
          endDate: this.form.endDate,
          pageNum: this.form.pageNum,
          pageSize: this.form.pageSize,
          erpno: this.form.erpno
        }
        console.log(params)
        axios.post(config.api, '/delivery/getDeliveryList.do', params).then((res) => {
          if (res.status == 0) {
            this.deliveryList = res.data
            // 总条数
            if (res.data.length > 0) {
              this.form.totalNum = res.data[0].totalNum
            }
          } else {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      // 进入详情
      enterDeliveryDetail(scope) {
        // 改变公共uuid
        this.changeUuid(scope.row.uuid)
        // 跳转
        this.$router.push('deliveryDetail')
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .inquiry_warp {
    width: 100%;
    margin-top: 20px;
    margin-bottom: 10px;
  }

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

  .jinji
    font-size 18px;
    color:red
</style>
