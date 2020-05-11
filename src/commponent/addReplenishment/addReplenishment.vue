<template>
  <div>
    <div class='addWarp'>
      <!--新增-->
      <el-button type="primary" size='mini' @click='addReplenStateShow'>新增</el-button>
      <!--保存-->
      <el-button type="success" size='mini' :disabled='defineReplenlist.length==0' @click='Savelist'>保存</el-button>
    </div>
    <!--选中后的退补货列表-->
    <el-table
      :data="defineReplenlist"
      border
      style="width: 100%"
      height='415px'
      size='mini'
    >
      <el-table-column
        type="index"
        align='center'
        width="50">
      </el-table-column>
      <el-table-column
        label="退货单号"
        align='center'
        width="110">
        <template slot-scope="scope">
          <span>{{scope.row.psNo}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="品号"
        align='center'
        width="120">
        <template slot-scope="scope">
          <span>{{scope.row.prdno}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="品名"
        align='center'
        min-width="120">
        <template slot-scope="scope">
          <span>{{scope.row.prdname}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="特征"
        align='center'
        width="150">
        <template slot-scope="scope">
          <span>{{scope.row.prdmark}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="仓库"
        align='center'
        width="60">
        <template slot-scope="scope">
          <span>{{scope.row.wh}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="单位"
        align='center'
        width="60">
        <template slot-scope="scope">
          <span>{{scope.row.unit}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="数量"
        align='center'
        width="110">
        <template slot-scope="scope">
          <input type='text' class='input_class' v-model="scope.row.quantity"/>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="80">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click='delItem(scope)'>
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>


    <!--弹出框-->
    <el-dialog
      title="新增"
      :visible.sync="addReplenState"
      width="1200px"
    >
      <!--搜索-->
      <el-form :model="screen" label-width="80px" :inline="true" size='mini'>
        <el-form-item label="厂商" label-width="50px">
          <el-select v-model="screen.item"  value-key="uuid" filterable placeholder="请选择厂商" style='width:200px;' :disabled="defineReplenlist.length!=0">
            <el-option
              v-for="item in manufacturerList"
              :key="item.uuid"
              :label="item.companyName"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="转入单号">
         <input type='text' v-model='screen.startPsNo' class='screen_number'/> -- <input type='text' v-model='screen.endPsNo' class='screen_number'/>
        </el-form-item>
        <el-form-item label="订单号">
          <el-input v-model="screen.bilNo"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click='getReplenishment'>搜索</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click='saveRelenishment'>确定新增</el-button>
        </el-form-item>
      </el-form>
      <!--新增列表-->
      <el-table
        ref='tableData'
        :data="addFormList"
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
          label="退货单号"
          align='center'
          width="110">
          <template slot-scope="scope">
            <span>{{scope.row.psNo}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="订单号"
          align='center'
          width="100">
          <template slot-scope="scope">
            <span>{{scope.row.bilno}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="品号"
          align='center'
          width="110">
          <template slot-scope="scope">
            <span>{{scope.row.prdno}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="品名"
          show-overflow-tooltip
          align='center'
          min-width="130">
          <template slot-scope="scope">
            <span>{{scope.row.prdname}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="特征"
          align='center'
          min-width="100">
          <template slot-scope="scope">
            <span>{{scope.row.prdmark}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="仓库"
          align='center'
          width="70">
          <template slot-scope="scope">
            <span>{{scope.row.wh}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="单位"
          align='center'
          width="60">
          <template slot-scope="scope">
            <span>{{scope.row.unit}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="退货数"
          align='center'
          width="90">
          <template slot-scope="scope">
            <span>{{scope.row.qty}}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="已补数"
          align='center'
          width="90">
          <template slot-scope="scope">
            <span>{{scope.row.replenishedQty}}</span>
          </template>
        </el-table-column>
      </el-table>

    </el-dialog>
  </div>
</template>

<script>
  // 引入公共配置
  import {config} from 'api/config.js';
  //引入接口文件请求文件
  import axios from 'api/axios.js'
  // Vuex语法糖
  import {mapState} from 'Vuex'

  export default {
    name:'addReplenishment',
    data(){
      return{
        // 新增状态框
        addReplenState:false,
        // 搜索
        screen:{
          // 厂商代号
          item:'',
          // 转入单号
          startPsNo:'',
          endPsNo:'',
          // 订单号
          bilNo:''
        },
        // 厂商角色列表
        manufacturerList:[],
        // 新增列表
        addFormList:[],
        // 选中后的退补货列表
        selectReplenlist:[],
        // 确定已选退补货列表
        defineReplenlist:[]
      }
    },
    mounted(){
      this.getSupplierRole()
    },
    computed: {
      // 获取 uuid 角色身份
      ...mapState(['supplierUUid']),
    },
    methods: {
      // 点击新增退补货
      addReplenStateShow(){
        this.addReplenState=true
      },
      // 获取厂商角色列表
      getSupplierRole() {
        const params = {
          uuid:this.supplierUUid,
          // 条数
          pageSize: 1000,
          // 当前页码
          pageNum: 1
        }
        axios.post(config.api, '/supplier/getSupplierList.do', params).then((res) => {
          // 赋值档案列表
          if(res.status==0){
            this.manufacturerList = res.data
            // 默认选中
            for(let i=0;i<this.manufacturerList.length;i++){
              if(this.manufacturerList[i].uuid==this.supplierUUid){
                this.screen.item=this.manufacturerList[i]
              }
            }
          }else{
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      // 获取退补货列表
      getReplenishment() {
        const params = {
          erpno:this.screen.item.erpno,
          startPsNo:this.screen.startPsNo,
          endPsNo:this.screen.endPsNo,
          bilNo:this.screen.bilNo
        }
        axios.post(config.api, '/replenishment/getBeReplenishmentList.do', params).then((res) => {
          // 赋值档案列表
          if(res.status==0){

            this.addFormList=res.data
            // 如果之前已经保存选中有
            if(this.defineReplenlist.length>0){
              let _this=this
              // 把生成的数据也勾选上
              _this.addFormList.map((item,index)=>{
                for(var i=0;i<_this.defineReplenlist.length;i++){
                  if(item.uuid==_this.defineReplenlist[i].uuid){
                    // 加延迟异步处理，把之前已经保存的也勾上
                    setTimeout(()=>{
                      this.$refs.tableData.toggleRowSelection(item);
                    },200)
                    break;
                  }
                }
              })
            }
          }else{
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      // 选中需要的退补货列表
      handleSelectionChange(val){
        this.selectReplenlist=val
      },
      // 确定新增选中后的退补货列表
      saveRelenishment(){
        // 计算出补货数量  退货数量-已补货数量
        this.selectReplenlist.map((item)=>{
          item.quantity=item.qty-item.replenishedQty
        })
        // 确定新增已选中的列表
        this.defineReplenlist=this.selectReplenlist
        //关闭弹窗
        this.addReplenState=false
        // 清除缓存
        this.screen.startPsNo=''
        this.screen.endPsNo=''
        this.addFormList=[]
      },
      // 删除确定已选中的某个
      delItem(scope){
        this.defineReplenlist.splice(scope.$index, 1)
      },
      // 最后的保存
      Savelist() {
        let arr=[]
        // 因为后台需要传过去的字段和穿过来的字段不一样，需要重新更换字段给他
        this.defineReplenlist.map((item)=>{
          arr.push({
            // 退货单号
            psNo:item.psNo,
            // 退货单号item
            item:item.itm,
            // 仓库代号
            wh:item.wh,
            // 仓库名
            whName:item.whname,
            // 产品代号
            productNumber:item.prdno,
            // 产品名称
            productName:item.prdname,
            // 特征
            characteristics:item.prdmark,
            // 单位
            unit:item.unit,
            // 数量
            psQuantity:item.qty,
            // 单价
            price:item.up,
            // 税率
            taxRate:item.taxrto,
            // 采购单号
            purchaseOrder:item.bilno,
            // 已补货数量
            replenishedQty:item.replenishedQty,
            // 数量
            quantity: item.quantity,
            estItem:item.estItem
          })
        })

        const params = {
          erpno:this.screen.item.erpno,
          supplierName:this.screen.item.companyName,
          remark:'',
          rmProductList:arr,
          receivingUnit:'广正模具塑胶有限公司'
        }

        axios.post(config.api, '/replenishment/addReplenishment.do', params).then((res) => {
          // 赋值档案列表
          if (res.status == 0) {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true,
              callback: action => {
                // 清除列表
                this.defineReplenlist=[]
              }
            })
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
  .addWarp
    margin-top 10px;
    margin-bottom:10px;

  .screen_number
    width 150px;
    height 27px;
    outline none;
    border-radius 3px;
    border 1px solid #ccc
    padding-left 15px;
    box-sizing border-box

  .input_class
    width 80px;
    outline none
    text-align center
    font-size:14px;



  .screen_number:focus {
    outline:none;
    border: 1px solid #409EFF;
  }
</style>
