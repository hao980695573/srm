<template>
  <div>
    <!--搜索-->
    <div class='inquiry_warp'>
      <el-form ref="screen_data" :model="screen_data" :inline="true" size='mini'>
        <el-form-item label="模糊搜索">
          <el-input v-model="screen_data.search" placeholder="模糊搜索"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  class='Fuzzy' size="mini" @click='handleCurrentChange("screen")'>搜索</el-button>
          <el-button type="danger" class='Fuzzy' size="mini" @click='launchAccount'>发起对账</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!--列表-->
    <el-table
      :data="form"
      border
      style="width: 100%"
      height='415px'
      size='mini'
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column
        type="index"
        align='center'
        width="50">
      </el-table-column>
      <el-table-column
        label="进货日期"
        align='center'
        min-width="130">
        <template slot-scope="scope">
          <span>{{scope.row.stockDate|filterDate}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="送货单号"
        align='center'
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.deliveryNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="进货单号"
        align='center'
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.stockNumber}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="类别"
        align='center'
        min-width="120">
        <template slot-scope="scope">
          <span>送货</span>
        </template>
      </el-table-column>
      <el-table-column
        label="状态"
        align='center'
        min-width="120">
        <template slot-scope="scope">
          <span>{{scope.row.status|filterState}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="含税金额"
        align='center'
        min-width="140">
        <template slot-scope="scope">
          <span>{{scope.row.totalAmount|filterPice}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="90" align="center">
        <template slot-scope="scope">
          <el-button type="text" size='mini' @click='enterInventory(scope)'>查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <div class='page_fen' v-show='form.length>0'>
      <!--总金额-->
      <div class='zongjiner'>已选总金额: {{selectjiner}}元</div>
      <el-pagination
        background
        :page-size="screen_data.pageSize"
        layout="prev, pager, next"
        :total="screen_data.totalNum"
        @current-change="handleCurrentChange"
        :current-page.sync="screen_data.pageNum">
      </el-pagination>
      <!--请求条数-->
      <div class='tiaoshu'>
        <el-input placeholder="请输入内容" v-model="hladpageSize" size='mini'>
          <template slot="append">最多{{screen_data.totalNum}}条</template>
        </el-input>
      </div>
      <div style='margin-left:10px;'>
        <el-button type="primary"  class='Fuzzy' size="mini" @click='handleCurrentChange("screen")' :disabled='hladpageSize>screen_data.totalNum'>搜索</el-button>
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
  import {mapMutations} from 'Vuex'

  export default {
    name:'Reconciliation',
    data(){
      return{
        // 搜索
        screen_data:{
          // 模糊查询
          search:'',
          // 当前页
          pageNum:1,
          // 请求条数参数
          pageSize:8,
          // 总条数
          totalNum:1
        },
        // 列表
        form:[],
        // 选中列表
        deliveryProductList:[],
        // 手动输入请求条数
        hladpageSize:8,
        // 选中列表中的总金额
        selectjiner:0,
        //
        a:0
      }
    },
    mounted(){
      this.handleCurrentChange()
    },
    filters:{
      filterDate(val){
        if(val){
          return Interface.renderTime(val).slice(0,10)
        }
      },
      filterPice(val){
        if(val){
          return Interface.RemainderPice(val)
        }
      },
      filterState(val){
        if(val=='0'){
          return '待发起'
        }else if(val=='1'){
          return '已发起'
        }else if(val=='2'){
          return '财务确认'
        }else if(val=='4'){
          return '已填入发票'
        }else if(val=='5'){
          return '已生成账单'
        }
      }
    },
    methods:{
      ...mapMutations(["changeUuid"]),
      // 多选
      handleSelectionChange(val){
        this.deliveryProductList=val

        // 显示选中总金额
        let _this=this
        _this.selectjiner=0
        val.map(function(item,index){
          if(index==0){
            _this.selectjiner= _this.add(0, item.totalAmount)
          }else{
            _this.selectjiner= _this.add(_this.selectjiner, item.totalAmount)
          }

        })

      },
      // 获取列表
      handleCurrentChange(data){
        if(data=='screen'){
          this.screen_data.pageNum=1
          this.screen_data.pageSize=Number(this.hladpageSize)
        }
        const params={
          search:this.screen_data.search,
          pageNum:this.screen_data.pageNum,
          pageSize:this.screen_data.pageSize,
          startDate:'',
          endDate:''
        }
        axios.post(config.api, '/aStatement/getCounteractList.do', params).then((res) => {
          console.log(res);
          if (res.status == 0) {
            this.form=res.data
            // 分页
            if(res.data.length>0){
              this.screen_data.totalNum=res.data[0].totalNum
            }
          }
        })
      },
      // 发起对账
      launchAccount(){
        // 增加状态字段

        axios.post(config.api, '/aStatement/confirmReconciliation.do', this.deliveryProductList).then((res) => {
          if (res.status == 0) {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true,
              callback: action => {
                // 重新获取数据
                this.handleCurrentChange()
              }
            })
          }else{
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      // 进入详情
      enterInventory(scope){
        this.changeUuid(scope.row.uuid)
        this.$router.push('initiatedDetail')
      },
      // 加法（处理小数想加精度）
      add(arg1,arg2){
        arg1 = arg1.toString(), arg2 = arg2.toString();
        var arg1Arr = arg1.split("."), arg2Arr = arg2.split("."), d1 = arg1Arr.length == 2 ? arg1Arr[1] : "", d2 = arg2Arr.length == 2 ? arg2Arr[1] : "";
        var maxLen = Math.max(d1.length, d2.length);
        var m = Math.pow(10, maxLen);
        var result = Number(((arg1 * m + arg2 * m) / m).toFixed(maxLen));
        var d = arguments[2];
        return typeof d === "number" ? Number((result).toFixed(d)) : result;
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .inquiry_warp{
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
    position relative
  }

  .zongjiner
    position absolute
    left:0px;
    font-size 14px;


  // 请求条数
  .tiaoshu
    width 200px;

</style>
