<template>
  <div class='register'>
    <div class='register_center'>
      <el-form label-width="150px" :model="form" :rules="rules" ref="form" class='register_center_center' size='mini'>
        <!--左侧-->
        <div class='register_center_left'>
          <el-form-item label="补货单号" prop='rmNumber'>
            <el-autocomplete
              size='small'
              style="width:100%"
              class="inline-input"
              v-model="form.rmNumber"
              :fetch-suggestions="querySearch"
              placeholder="请输入送货单号"
              @select="handleSelect"
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="可打印数量" prop='printableQuantity'>
            <el-input v-model="form.printableQuantity" size="small" class='register_input' placeholder='打印数量'
                      readonly></el-input>
          </el-form-item>
          <el-form-item label="最小包装量" prop='mpAmount'>
            <el-input v-model="form.mpAmount" size="small" class='register_input' placeholder='请输入最小包装数'
                      @blur='mpAmountBlur' :disabled='form.deliveryCount==""'></el-input>
          </el-form-item>
          <el-form-item label="外箱含最小包装量" prop='mpioQuantity'>
            <el-input v-model="form.mpioQuantity" size="small" class='register_input' placeholder='请输入外箱含最小包装数'
                      :disabled='form.deliveryCount==""' @blur='opCountBlur'></el-input>
          </el-form-item>
          <el-form-item label="保质期" prop='qgPeriod'>
            <el-date-picker
              v-model="form.qgPeriod"
              value-format='yyyy-MM-dd'
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="form.remark" size="small" class='register_input' placeholder='请输入备注'></el-input>
          </el-form-item>
        </div>
        <!--右侧-->
        <div class='register_center_right'>
          <el-form-item label="物料编码" prop='materialCodingName'>
            <el-autocomplete
              size='small'
              style="width:100%"
              class="inline-input"
              v-model="form.materialCodingName"
              :fetch-suggestions="materielSearch"
              placeholder="请输入物料编码"
              @select='materielSelect'
            ></el-autocomplete>
          </el-form-item>
          <el-form-item label="送货数" prop='deliveryCount'>
            <el-input v-model="form.deliveryCount" size="small" class='register_input' placeholder='请输入送货数'
                      :disabled='form.printableQuantity==""' @blur='mpAmountBlur'></el-input>
          </el-form-item>
          <el-form-item label="最小包装数">
            <el-input v-model="form.mpCount" size="small" class='register_input' placeholder='最小包装数'
                      readonly></el-input>
          </el-form-item>
          <el-form-item label="外箱包装数" prop='opCount'>
            <el-input v-model="form.opCount" size="small" class='register_input' placeholder='外箱包装数'
                      readonly></el-input>
          </el-form-item>
          <el-form-item label="送货日期" prop='issuanceDate'>
            <el-date-picker
              v-model="form.issuanceDate"
              type="date"
              value-format='yyyy-MM-dd'
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="生产日期" prop='manufactureDate'>
            <el-date-picker
              v-model="form.manufactureDate"
              type="date"
              value-format='yyyy-MM-dd'
              placeholder="生产日期">
            </el-date-picker>
          </el-form-item>
        </div>
      </el-form>
      <!--注册按钮-->
      <div class='register_bth_warp'>
        <el-button type="success" @click='generatingBarcode("label")'>生成条形码(100*70)</el-button>
        <el-button type="success" @click='generatingBarcode("middle")'>生成条形码（100*60）</el-button>
        <el-button type="success" @click='generatingBarcode("accessories")'>生成条形码（70*45）</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  // 公共配置
  import {config} from 'api/config.js';
  // 接口文件请求文件
  import axios from 'api/axios.js'
  // 定义验证规则
  import {validateInteger} from 'api/Validate.js'
  // 引入公共方法
  import Interface from 'api/Interface.js'
  // vuex语法糖
  import {mapMutations} from 'Vuex'
  // 引入loading
  import loadEvents from 'common/loading/loading.js'
  // 实例化loading加载
  let loads = new loadEvents();

  export default {
    name:'replenish',
    data() {
      // 送货数不能大于可打印数
      var validateDeliveries = (rule, value, callback) => {
        let rest = /^[0-9]*[1-9][0-9]*$/
        if (value === '') {
          return callback(new Error('送货数不能为空'))
        } else if (!rest.test(value)) {
          return callback(new Error('只能输入整数'))
        } else if (Number(this.form.deliveryCount) > Number(this.form.printableQuantity)) {
          return callback(new Error('送货数不能大于可打印数'))
        } else {
          callback()
        }
      }
      return {
        // 条码数量
        form: {
          // 补货单号
          rmNumber: '',
          // 可打印数量
          printableQuantity: '',
          // 最小包装量
          mpAmount: '',
          // 外箱含最小包装量
          mpioQuantity: '',
          // 备注
          remark: '',
          // 产品uuid
          dProductUuid: '',
          // 物料编码名称
          materialCodingName: '',
          // 物料编码
          materialCoding: '',
          // 物料数量
          quantity: '',
          // 送货数
          deliveryCount: '',
          // 最小包装数
          mpCount: '',
          // 外箱包装数
          opCount: '',
          // 送货日期
          issuanceDate: Interface.getToday('-'),
          // 保质期
          qgPeriod: '',
          // 生产日期
          manufactureDate: Interface.getToday('-')
        },
        // 送货单号列表
        restaurants: [],
        // 物料编码列表
        materielList: [],
        // 生产的条码类型
        PrintType: '',
        // 校验
        rules: {
          rmNumber: [
            {required: true, message: '请输入补货单号', trigger: ['blur', 'change']},
          ],
          printableQuantity: [
            {validator: validateInteger, required: true, trigger: 'blur'},
          ],
          deliveryCount: [
            {validator: validateDeliveries, required: true, trigger: 'blur'},
          ],
          mpAmount: [
            {validator: validateInteger, required: true, trigger: 'blur'},
          ],
          mpioQuantity: [
            {validator: validateInteger, required: true, trigger: 'blur'},
          ],
          issuanceDate: [
            {required: true, message: '请选择日期', trigger: ['change', 'blur']}
          ],
          materialCodingName: [
            {required: true, message: '内容不能为空', trigger: ['blur', 'change']}
          ],
          manufactureDate: [
            {required: true, message: '请选择日期', trigger: ['change', 'blur']}
          ],
          qgPeriod: [
            {required: true, message: '请选择日期', trigger: ['change', 'blur']}
          ]
        },
        // 选中的送货单号
        selcetRmNumber: '',
        // erpno
        erpno: ''

      }
    },
    mounted(){
      this.getDeliveryNote()
      this.changeBarCodeList([])
    },
    methods:{
      ...mapMutations(['changeBarCodeList']),
      // 送货单号输入建议
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      // 物料编码输入建议
      materielSearch(queryString, cb) {
        var restaurants = this.materielList;
        var results = queryString ? restaurants.filter(this.materielFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      materielFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      // 获取补货单列表
      getDeliveryNote(){
        const params = {
          uuid: "",
          search: '',
          startDate: "",
          endDate: "",
          pageNum: 1,
          pageSize: 1000
        }
        axios.post(config.api, '/replenishment/getReplenishmentList.do', params).then((res) => {
          if (res.status == 0) {
            // 送货单号存储数组
            let rmNumber = []
            res.data.map((item) => {
              rmNumber.push({value: item.rmNumber, uuid: item.uuid, erpno: item.erpno})
            })
            this.restaurants = rmNumber
          } else {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      // 选择了送货单号
      handleSelect(data){
        // 选中的送货单号
        this.selcetRmNumber = data.value
        const params = {
          rmNumber: data.value,
          uuid: data.uuid
        }
        // erpno
        this.erpno = data.erpno
        // 清空物料编码
        this.form.materialCodingName = ''
        // 获取物料编码接口
        axios.post(config.api, '/replenishment/getReplenishmentInfo.do', params).then((res) => {
          if (res.status == 0) {
            let Arr = []
            res.data.rmProductList.map((item) => {
              Arr.push({value: item.productName, dproductUuid: item.uuid, quantity: item.quantity})
            })
            this.materielList = Arr
          } else {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      // 选择了物料编码
      materielSelect(item){
        // 产品uuid
        this.form.dproductUuid = item.dproductUuid
        this.form.quantity = item.quantity
        this.getPrintableCount()
      },
      // 获取可打印数量
      getPrintableCount(){
        // 加载loading
        loads.open()
        const params = {
          opid: this.form.dproductUuid,
          deliveryNumber: this.selcetRmNumber,
          quantity: this.form.quantity
        }
        axios.post(config.api, '/barcode/getMaxPrintableCount.do', params).then((res) => {
          if (res.status == 0) {
            this.form.printableQuantity = res.data
            // 加载关闭
            loads.close()
          } else {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true,
              callback: action => {
                // 加载关闭
                loads.close()
              }
            })
          }
        })
      },
      // 填写了最小包装量
      mpAmountBlur(){
        this.form.mpCount = Math.ceil(this.form.deliveryCount / this.form.mpAmount) == 'Infinity' ? 0 : Math.ceil(this.form.deliveryCount / this.form.mpAmount)
        // 如果外箱含最小包装量有值
        if (this.form.mpioQuantity != '') {
          this.opCountBlur()
        }
      },
      // 填写了外箱含最小包装量
      opCountBlur(){
        this.form.opCount = Math.ceil(this.form.mpCount / this.form.mpioQuantity) == 'Infinity' ? 0 : Math.ceil(this.form.mpCount / this.form.mpioQuantity)
      },
      // 生成条形码的uuid
      generatingBarcode(PrintShowType){
        // 判断显示种规格标签
        if (PrintShowType == "label") {
          this.PrintType = "label"
        }else if(PrintShowType == "middle"){
          this.PrintType = "middle"
        }else {
          this.PrintType = "accessories"
        }

        // 通知父组件 PrintType 的打印类型
        this.$emit('PrintType',this.PrintType)

        this.$refs['form'].validate((valid) => {
          if (valid) {
            // 加载loading
            loads.open()

            const params = {
              // 补货单号
              deliveryNumber: this.form.rmNumber,
              // 可打印数量
              printableQuantity: this.form.printableQuantity,
              // 最小包装量
              mpAmount: this.form.mpAmount,
              // 外箱含最小包装量
              mpioQuantity: this.form.mpioQuantity,
              // 备注
              remark: this.form.remark,
              // 产品uuid
              dproductUuid: this.form.dproductUuid,
              // 物料编码
              materialCoding: this.form.materialCoding,
              // 送货数
              deliveryCount: this.form.deliveryCount,
              // 最小包装数
              mpCount: this.form.mpCount,
              // 外箱包装数
              opCount: this.form.opCount,
              // 发货日期
              issuanceDate: this.form.issuanceDate,
              // erpno
              erpno: this.erpno,
              // 保质期
              qgPeriod: this.form.qgPeriod,
              // 生产日期
              manufactureDate: this.form.manufactureDate,
            }
            // 获取生成条码列表的uuid
            axios.post(config.api, '/barcode/addBarcodeInformation.do', params).then((res) => {
              if (res.status == 0) {
                this.getBarcodeList(res.data)
                // 加载关闭
                loads.close()
              } else {
                this.$alert(res.msg, {
                  confirmButtonText: '确定',
                  center: true,
                  callback: action => {
                    // 加载关闭
                    loads.close()
                  }
                })
              }
            })
          }
        })
      },
      // 生成条形码的列表
      getBarcodeList(data){
        const params = {
          uuid: data,
          type:1
        }
        axios.post(config.api, '/barcode/getBarcodeDetailList.do', params).then((res) => {
          if (res.status == 0) {
            this.changeBarCodeList(res.data)
            // 清空选择数据
            this.$refs['form'].resetFields()
            this.form.remark = ''
            this.form.mpCount = ''
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
  .el-form-item {
    margin-bottom: 20px;
  }

  .register
    margin-left: 20px;
    .register_center
      height 500px;
      border 1px solid #edeff2
      background #fff
      padding-top: 40px
      box-sizing border-box
      .register_center_center
        display flex
        justify-content space-between
        .register_center_left
          margin-left 20px
        .register_center_right
          margin-right 50px
        .register_input
          width 295px
      .register_bth_warp
        margin-top 70px;
        margin-bottom 50px;
        width 100%
        display flex
        justify-content center


</style>
