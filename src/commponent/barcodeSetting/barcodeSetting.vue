<template>
  <div>
    <!--显示订单基础信息-->
    <div class='baseWarp'>条码设置</div>
    <!--表格-->
    <el-table
      :data="form"
      border
      style="width: 100%"
      size="mini"
      height='400'
    >
      <el-table-column
        type="index"
        align='center'
        min-width="50">
      </el-table-column>
      <el-table-column
        label="条码类型"
        align='center'
        show-overflow-tooltip
        min-width="120">
        <template slot-scope="scope">
          <span>{{scope.row.type|filtersType}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="前缀"
        align='center'
        show-overflow-tooltip
        min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.prefix}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="日期格式"
        align='center'
        min-width="150">
        <template slot-scope="scope">
          <span>{{scope.row.dateStr}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="后缀"
        align='center'
        show-overflow-tooltip
        min-width="100">
        <template slot-scope="scope">
          <span>{{scope.row.suffix}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align='center'
        width="150">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="mini"
            @click='edit(scope.row)'
          >
            编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--编辑页面-->
    <el-dialog title="条码编辑" :visible.sync="editShow" width='800px'>
      <el-form ref="formEdit" :model="formEdit" label-width="80px" :inline="true" :rules="rules">
        <el-form-item label="日期格式" prop='dateStr'>
          <el-select v-model="formEdit.dateStr" placeholder="请选择日期格式">
            <el-option :label="item.label" :value="item.value" v-for='(item,index) in formEdit.dateStrArr' :key='index'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="后缀格式" prop='suffix'>
          <el-select v-model="formEdit.suffix" placeholder="请选择后缀格式">
            <el-option :label="item.label" :value="item.value" v-for='(item,index) in formEdit.suffixArr' :key='index'></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style='margin-left:20px;' @click='update'>确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  // 引入公共配置
  import {config} from 'api/config.js';
  //引入接口文件请求文件
  import axios from 'api/axios.js'
  // 引入公共方法
  import Interface from 'api/Interface.js'

  export default {
    name:'barcodeSetting',
    data(){
        return{
          form:[{
              // 条码类别
              type:'',
              // 前缀
              prefix:'',
              // 日期格式
              dateStr:'',
              // 后缀
              suffix:'',
              // 选择uuid
              uuid:''
            }],
          // 是否显示编辑模块
          editShow:false,
          // 编辑数据
          formEdit:{
            dateStr:'',
            suffix:'',
            // 日期格式数据选择
            dateStrArr:[
                {
              label:Interface.getToday().slice(2, 8),
              value:Interface.getToday().slice(2,8)
            },{
              label:Interface.getToday(),
              value:Interface.getToday()
            }],
            // 后缀数据选择
            suffixArr:[
                {
              label:'0000',
              value:'0000'
            },{
              label:'00000',
              value:'00000'
            },{
              label:'000000',
              value:'000000'
            },{
              label:'0000000',
              value:'0000000'
            },{
              label:'00000000',
              value:'00000000'
            }]
          },
          // 校验
          rules: {
            dateStr: [
              {required: true, message: '请选择日期格式', trigger: 'change'}
            ],
            suffix:[
              {required: true, message: '请选择后缀格式', trigger: 'change'}
            ]
          }
        }
    },
    filters:{
      filtersType(val){
          if(val=='0'){
              return '外箱条码'
          }else {
              return '内箱条码'
          }
      }
    },
    mounted(){
      // console.log(Interface.getToday());
      // 获取列表
      this.getList()
    },
    methods:{
        getList(){
          const params={}
          axios.post(config.api, '/barcode/listBarcodeSetting.do', params).then((res) => {
            if (res.status == 0) {
              console.log(res);
              this.form=res.data
            } else {
              this.$alert(res.msg, {
                confirmButtonText: '确定',
                center: true
              })
            }
          })
        },
      // 编辑
      edit(scope){
            this.editShow=true
            this.form.uuid=scope.uuid
      },
      // 确定更新
      update(){
        this.$refs['formEdit'].validate((valid) => {
          if (valid) {
            const params={
              dateStr:this.formEdit.dateStr,
              suffix:this.formEdit.suffix,
              uuid:this.form.uuid
            }
            axios.post(config.api, '/barcode/updateBarcodeSetting.do', params).then((res) => {
              if (res.status == 0) {
                this.$alert(res.msg, {
                  confirmButtonText: '确定',
                  center: true,
                  callback: action => {
                    this.editShow=false
                    // 清空数据
                    this.$refs['formEdit'].resetFields();
                    // 更新列表
                    this.getList()
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
        })
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .baseWarp
    width 100%
    line-height 40px;
    text-align center;
    background #f5f5f5;
</style>
