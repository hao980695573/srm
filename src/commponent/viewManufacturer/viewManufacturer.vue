<template>
  <div>
    <!--tab切换-->
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="基础" name="base">
        <!--基础表单内容-->
        <div class='base_warp'>
          <el-form ref="editForm" :model="editForm" size='medium' label-width='100px'>
            <el-row :gutter="16">
              <el-col :span="11">
                <el-form-item label="ERP内代码">
                  <el-input v-model="editForm.erpno" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="公司全称">
                  <el-input v-model="editForm.companyName" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="16">
              <el-col :span="11">
                <el-form-item label="公司性质">
                  <el-select v-model="editForm.companyNature" placeholder="请选择企业类型" style='width:100%' disabled>
                    <el-option label="请选择" value=" "></el-option>
                    <el-option label="国有企业" value="0"></el-option>
                    <el-option label="集体企业" value="1"></el-option>
                    <el-option label="私营企业" value="2"></el-option>
                    <el-option label="个体工商户" value="3"></el-option>
                    <el-option label="合作企业" value="4"></el-option>
                    <el-option label="联营企业" value="5"></el-option>
                    <el-option label="股份合作制企业" value="6"></el-option>
                    <el-option label="有限责任公司" value="7"></el-option>
                    <el-option label="股份有限公司" value="8"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="电子邮箱" prop='email'>
                  <el-input v-model="editForm.email" placeholder="请输入电子邮箱" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="16">
              <el-col :span="11">
                <el-form-item label="供应商类型">
                  <el-select v-model="editForm.supplyType" placeholder="请选择企业类型" style='width:100%' disabled>
                    <el-option label="请选择" value=" "></el-option>
                    <el-option label="原料" value="D01"></el-option>
                    <el-option label="色粉抽粒" value="D02"></el-option>
                    <el-option label="油漆" value="D03"></el-option>
                    <el-option label="油墨" value="D04"></el-option>
                    <el-option label="辅料" value="D05"></el-option>
                    <el-option label="包材" value="D06"></el-option>
                    <el-option label="模胚" value="D07"></el-option>
                    <el-option label="钢料" value="D08"></el-option>
                    <el-option label="铜料" value="D09"></el-option>
                    <el-option label="刀具" value="D10"></el-option>
                    <el-option label="模具配件" value="D11"></el-option>
                    <el-option label="模具加工" value="D12"></el-option>
                    <el-option label="热流道" value="D13"></el-option>
                    <el-option label="电镀" value="D14"></el-option>
                    <el-option label="精雕" value="D15"></el-option>
                    <el-option label="烫金" value="D16"></el-option>
                    <el-option label="锌合金" value="D17"></el-option>
                    <el-option label="镁合金" value="D18"></el-option>
                    <el-option label="镁合金点胶" value="D19"></el-option>
                    <el-option label="五金钢壳" value="D20"></el-option>
                    <el-option label="超声波" value="D21"></el-option>
                    <el-option label="治具" value="D22"></el-option>
                    <el-option label="钢片清洗" value="D23"></el-option>
                    <el-option label="皮套" value="D24"></el-option>
                    <el-option label="伙食" value="D25"></el-option>
                    <el-option label="复印费" value="D26"></el-option>
                    <el-option label="电脑配件" value="D27"></el-option>
                    <el-option label="机器配件" value="D28"></el-option>
                    <el-option label="机物料" value="D29"></el-option>
                    <el-option label="快递" value="D30"></el-option>
                    <el-option label="水转印" value="D31"></el-option>
                    <el-option label="水处理" value="D32"></el-option>
                    <el-option label="水保养" value="D33"></el-option>
                    <el-option label="工程改造" value="D34"></el-option>
                    <el-option label="注塑加工" value="D35"></el-option>
                    <el-option label="机器" value="D36"></el-option>
                    <el-option label="ERP系统" value="D37"></el-option>
                    <el-option label="考勤系统" value="D38"></el-option>
                    <el-option label="铝片" value="D39"></el-option>
                    <el-option label="福利" value="D40"></el-option>
                    <el-option label="喷油" value="D41"></el-option>
                    <el-option label="抛光打砂" value="D42"></el-option>
                    <el-option label="自动化" value="D43"></el-option>
                    <el-option label="T处理" value="D44"></el-option>
                    <el-option label="冷冻批锋" value="D45"></el-option>
                    <el-option label="天线" value="D46"></el-option>
                    <el-option label="铝钛合金" value="D47"></el-option>
                    <el-option label="铝条" value="D48"></el-option>
                    <el-option label="按键" value="D49"></el-option>
                    <el-option label="组装" value="D50"></el-option>
                    <el-option label="镭雕" value="D51"></el-option>
                    <el-option label="粉末制金" value="D52"></el-option>
                    <el-option label="硅胶" value="D53"></el-option>
                    <el-option label="散热膜" value="D54"></el-option>
                    <el-option label="光学散光镜" value="D55"></el-option>
                    <el-option label="镜片" value="D56"></el-option>
                    <el-option label="工衣" value="D57"></el-option>
                    <el-option label="软件" value="D58"></el-option>
                    <el-option label="打标机" value="D59"></el-option>
                    <el-option label="环保" value="D60"></el-option>
                    <el-option label="废品" value="F01"></el-option>
                    <el-option label="日用品" value="JYP"></el-option>
                    <el-option label="劳务派遣" value="LW"></el-option>
                    <el-option label="培训" value="PX"></el-option>
                    <el-option label="汽修" value="QX"></el-option>
                    <el-option label="食品" value="SP"></el-option>
                    <el-option label="运输" value="YS"></el-option>
                    <el-option label="租金" value="ZJ"></el-option>
                    <el-option label="装修" value="ZX"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="厂房面积">
                  <el-input placeholder="请输入（数字）" v-model="editForm.area" type="number"
                            onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode)))" readonly>
                    <template slot="append">平方米</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="16">
              <el-col :span="11">
                <el-form-item label="企业电话">
                  <el-input v-model="editForm.enterprisePhone" placeholder="请输入企业电话" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="传真号码">
                  <el-input v-model="editForm.fax" placeholder="请输入传真号码" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="16">
              <el-col :span="11">
                <el-form-item label="一般纳税人">
                  <el-radio-group v-model="editForm.isTaxpayers" disabled>
                    <el-radio label="1">是</el-radio>
                    <el-radio label="0">否</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="成立时间">
                  <el-date-picker
                    v-model="editForm.establishDate"
                    disabled
                    type="date"
                    style='width:100%'
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期">
                  </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="16">
              <el-col :span="11">
                <el-form-item label="法人代表">
                  <el-input v-model="editForm.legalPerson" placeholder="请输入法人代表" readonly></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="生产规模">
                  <el-input v-model="editForm.productionScale" placeholder="请输入 (数字)" type="number"
                            onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode)))" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="16">
              <el-col :span="11">
                <el-form-item label="所属地区">
                  <el-cascader
                    :options="regionData"
                    disabled
                    v-model="editForm.region"
                    style='width:100%'
                  >
                  </el-cascader>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="详细地址" prop='address'>
                  <el-input v-model="editForm.address" placeholder="请输入详细地址" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="16">
              <el-col :span="11">
                <el-form-item label="单位英文名" prop='englishName'>
                  <el-input v-model="editForm.englishName" placeholder="请输入英文名称" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="16">
              <el-col :span="23">
                <el-form-item label="业绩简介">
                  <el-input
                    style='width:100%'
                    type="textarea"
                    :rows="5"
                    readonly
                    resize='none'
                    placeholder="请输入业绩简介"
                    v-model="editForm.achievement">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="16">
              <el-col :span="23">
                <el-form-item label="供货类别">
                  <el-input
                    style='width:100%'
                    type="textarea"
                    :rows="5"
                    resize='none'
                    placeholder="请输入供货类别"
                    v-model="editForm.supplyCategory"
                    readonly
                  >
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="16">
              <el-col :span="23">
                <el-form-item label="供货补充说明">
                  <el-input
                    style='width:100%'
                    type="textarea"
                    :rows="5"
                    resize='none'
                    readonly
                    placeholder="请输入供货补充说明"
                    v-model="editForm.supplyAdditionalRemark">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <!--联系人方式-->
        <contaclnformation :contractList='editForm.contractList' @againLoad='getArchives'></contaclnformation>
      </el-tab-pane>
      <el-tab-pane label="财务资料" name="payable">
        <!--财务资料内容-->
        <div class='base_warp'>
          <el-form ref="financeData" :model="financeData" size='medium' label-width='100px'>
            <el-row :gutter="16">
              <el-col :span="11">
                <el-form-item label="注册资本">
                  <el-input v-model="financeData.registeredCapital" readonly>
                    <template slot="append">万</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="银行信贷">
                  <el-input v-model="financeData.bankCredit" readonly></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="16">
              <el-col :span="11">
                <el-form-item label="付款方式">
                  <el-select v-model="financeData.payType" placeholder="请选择付款方式" disabled style='width:100%'>
                    <el-option label="电汇" value="电汇"></el-option>
                    <el-option label="电子承兑" value="电子承兑"></el-option>
                    <el-option label="支票" value="支票"></el-option>
                    <el-option label="银行承兑" value="银行承兑"></el-option>
                    <el-option label="商业承兑" value="商业承兑"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="票据类型">
                  <el-select v-model="financeData.billType" disabled style='width:100%'>
                    <el-option label="专用发票" value="0"></el-option>
                    <el-option label="普通发票" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="16">
              <el-col :span="11">
                <el-form-item label="付款条件">
                  <el-select v-model="financeData.payCondition" disabled placeholder="请选择付款条件" style='width:100%'>
                    <el-option label="月结30天" value="月结30天"></el-option>
                    <el-option label="月结60天" value="月结60天"></el-option>
                    <el-option label="月结75天" value="月结75天"></el-option>
                    <el-option label="月结90天" value="月结90天"></el-option>
                    <el-option label="月结120天" value="月结120天"></el-option>
                    <el-option label="月结135天" value="月结135天"></el-option>
                    <el-option label="月结150天" value="月结150天"></el-option>
                    <el-option label="见票30天" value="见票30天"></el-option>
                    <el-option label="见票60天" value="见票60天"></el-option>
                    <el-option label="见票75天" value="见票75天"></el-option>
                    <el-option label="见票90天" value="见票90天"></el-option>
                    <el-option label="见票120天" value="见票120天"></el-option>
                    <el-option label="见票135天" value="见票135天"></el-option>
                    <el-option label="见票150天" value="见票150天"></el-option>
                    <el-option label="当月结款" value="当月结款"></el-option>
                    <el-option label="现金付款" value="现金付款"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="币种">
                  <el-select v-model="financeData.currency" disabled placeholder="请选择币种" style='width:100%'>
                    <el-option label="人民币" value="0"></el-option>
                    <el-option label="美元" value="1"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="16">
              <el-col :span="11">
                <el-form-item label="年销售额度">
                  <el-input placeholder="请输入年销售额度" readonly v-model="financeData.salesVolume" style='width: 100%'>
                    <template slot="append">万</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="年产值">
                  <el-input placeholder="请输入年产值" readonly v-model="financeData.outputValue" style='width: 100%'>
                    <template slot="append">万</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="16">
              <el-col :span="11">
                <el-form-item label="固定资产">
                  <el-input placeholder="请输入固定资产" readonly v-model="financeData.fixedAssets" style='width: 100%'>
                    <template slot="append">万</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="税率">
                  <el-select v-model="financeData.taxRate" placeholder="请选择税率" disabled>
                    <el-option :label="'10%'" :value="10"></el-option>
                    <el-option :label="'5%'" :value="5"></el-option>
                    <el-option :label="'6%'" :value="6"></el-option>
                    <el-option :label="'3%'" :value="3"></el-option>
                    <el-option :label="'9%'" :value="9"></el-option>
                    <el-option :label="'13%'" :value="13"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <!--银行信息账号-->
        <bankAccount @againLoad='getArchives' :bankList='financeData.bankList'></bankAccount>
      </el-tab-pane>
      <el-tab-pane label="供应商证书" name="certificate">
        <!--供应商证书-->
        <div class='base_warp'>
          <el-form ref="CertificateData" :model="CertificateData"  :inline="true">
            <el-form-item label="统一社会信用代码" label-width="150px">
              <el-input v-model="CertificateData.Business" placeholder="请输入营业执照编码" readonly></el-input>
            </el-form-item>
            <el-form-item label="生效日期">
              <el-date-picker
                disabled
                v-model="CertificateData.BusinessDate"
                type="date"
                placeholder="选择日期"
                value-format='yyyy-MM-dd'
              >
              </el-date-picker>
              <!--下载按钮-->
              <a :href="CertificateData.BusinessEnclosure" download target="_blank" v-if='CertificateData.BusinessEnclosure'><el-button size="small" type="info" style='margin-left:15px'>下载</el-button></a>
            </el-form-item>
          </el-form>
        </div>
        <!--添加其他证书-->
        <addOtherCertificates :OtherCertificates='OtherCertificates' @againLoad='getArchives'></addOtherCertificates>
      </el-tab-pane>
      <el-tab-pane label="人员及设备" name="equipment">
        <!--人员及设备资料内容-->
        <div class='base_warp'>
          <el-form ref="equipmentData" :model="equipmentData" size='medium' label-width='100px' label-position='top'>
            <el-row :gutter="16">
              <el-col :span="11">
                <el-form-item label="管理人员">
                  <el-input placeholder="请输入内容" v-model="equipmentData.managerNum" readonly>
                    <template slot="append">人</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset='1'>
                <el-form-item label="技术人员" prop='technologyNum'>
                  <el-input placeholder="请输入内容" v-model="equipmentData.technologyNum" readonly>
                    <template slot="append">人</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="16">
              <el-col :span="11" >
                <el-form-item label="质量管理人员" prop='qualityManagerNum'>
                  <el-input placeholder="请输入内容" v-model="equipmentData.qualityManagerNum" readonly>
                    <template slot="append">人</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="11" :offset='1'>
                <el-form-item label="公司员工总数">
                  <el-input placeholder="请输入内容" v-model="equipmentData.staffNum" readonly>
                    <template slot="append">人</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="16">
              <el-col :span="11">
                <el-form-item label="大专以上">
                  <el-input placeholder="请输入内容" v-model="equipmentData.juniorCollegeNum" readonly>
                    <template slot="append">人</template>
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <!--人员及设备列表-->
        <equipmentList :equipmentList='equipmentData.equipmentList' @againLoad='getArchives'></equipmentList>
      </el-tab-pane>
      <el-tab-pane label="主要产品" name="mainProducts">
        <!--主要材料来源-->
        <materialSources :materialSourcesList='equipmentData.materialSourcesList' @againLoad='getArchives'></materialSources>
        <!--主要产品-->
        <mainProducts :productList='equipmentData.productList' @againLoad='getArchives'></mainProducts>
      </el-tab-pane>
      <el-tab-pane label="其他" name="Other">
        <!--质量认证内容-->
        <div class='base_warp'>
          <el-form ref="certificationData" :model="certificationData" size='medium' label-width='100px' >
            <el-form-item label="产品遵守标准">
              <el-radio-group v-model="certificationData.productStandard" disabled>
                <el-radio label="0">国际标准</el-radio>
                <el-radio label="1">国家标准</el-radio>
                <el-radio label="2">行业标准</el-radio>
                <el-radio label="3">企业标准</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="产品认证情况">
              <el-input v-model="certificationData.productCertification" readonly></el-input>
            </el-form-item>
          </el-form>
        </div>
        <!--主要客户-->
        <mainCustomer :customerList='equipmentData.customerList' @againLoad='getArchives'></mainCustomer>
      </el-tab-pane>
    </el-tabs>
  </div>

</template>

<script>
  // 引入公共配置
  import {config} from 'api/config.js';
  //引入接口文件请求文件
  import axios from 'api/axios.js'
  // Vuex语法糖
  import {mapState} from 'Vuex'

  // 引入基础资料联系人方式
  import contaclnformation from '@/commponent/viewManufacturer/commponent/contaclnformation.vue'
  // 引入银行信息账号
  import bankAccount  from '@/commponent/viewManufacturer/commponent/bankAccount.vue'
  // 引入其他证书
  import addOtherCertificates from '@/commponent/viewManufacturer/commponent/addOtherCertificates.vue'
  // 引入人员设备列表
  import equipmentList from '@/commponent/viewManufacturer/commponent/equipmentList.vue'
  // 引入主要材料来源
  import materialSources from '@/commponent/viewManufacturer/commponent/materialSources.vue'
  // 引入主要产品
  import mainProducts from '@/commponent/viewManufacturer/commponent/mainProducts.vue'
  // 引入主要客户
  import mainCustomer from '@/commponent/viewManufacturer/commponent/mainCustomer.vue'

  export default {
    name: 'manufacturer',
    data() {
      return {
        // 文件上传设置token
        header: {
          Authorization: localStorage.getItem('token')
        },
        // tab默认显示哪个模块
        activeName: 'base',
        // 新增其他证书数据
        OtherCertificates: [],
        // 基础资料数据
        regionData: [],// 所属地区数据源
        editForm: {
          // ERP内代码
          erpno: '',
          // 公司性质
          companyNature: '',
          // 公司全称
          companyName: '',
          // 供应商类型
          supplyType: null,
          // 厂房面积
          area: '',
          // 企业电话
          enterprisePhone: null,
          // 传真号码
          fax: '',
          // 电子邮箱
          email: '',
          // 一般纳税人
          isTaxpayers: '',
          // 公司成立时间
          establishDate: '',
          // 法人代表
          legalPerson: '',
          // 生产规模
          productionScale: '',
          // 地区,不传到后台，仅做判断使用，因为后台省市县分开存储
          region: [],
          // 国家
          countryUuid: '',
          // 省份
          provinceUuid: '',
          // 城市
          cityUuid: '',
          // 详细地址
          address: '',
          // 英语名称
          englishName: '',
          // 进出口业务
          ieBusiness: '',
          // 业绩简介
          achievement: '',
          // 企业简介
          briefIntroduction: '',
          // 供货类别
          supplyCategory: '',
          // 供货补充说明
          supplyAdditionalRemark: '',
        },
        // 财务资料数据
        financeData: {
          // 注册资本
          registeredCapital: '',
          // 银行信贷
          bankCredit: '',
          // 付款方式
          payType: null,
          // 票据类型
          billType: null,
          // 付款条件
          payCondition: null,
          // 币种
          currency: null,
          // 年销售额
          salesVolume: '',
          // 年产值
          outputValue: '',
          // 固定资产
          fixedAssets: '',
          // 税率
          taxRate: ''
        },
        // 供应商证书数据
        CertificateData: {
          // 三证合一执照编码
          Business: '',
          // 三证合一生效日期
          BusinessDate: '',
          // 三针合一执照附件
          BusinessEnclosure: ''
        },
        // 人员及设备
        equipmentData: {
          // 管理人员数量
          managerNum: '',
          // 技术人员数量
          technologyNum: '',
          // 质量管理人员
          qualityManagerNum: '',
          // 公司员工总数
          staffNum: '',
          // 大专及以上
          juniorCollegeNum: ''
        },
        // 产品标准
        certificationData: {
          // 产品遵守标准
          productStandard: '',
          // 产品认证情况
          productCertification: ''
        }
      }
    },
    computed: {
      // 获取 uuid
      ...mapState(['uuid','supplierState']),
    },
    mounted(){
      // 获取档案信息
      this.getArchives()
      // 获取省市县数据
      this.getRegion()
    },
    methods:{
      // 获取档案信息
      getArchives(){
        const params={
          uuid:this.uuid
        }
        axios.post(config.api, '/supplier/getSupplierInfo.do', params).then((res) => {
          // 基础资料数据
          this.editForm=res.data
          // 财务资料数据
          this.financeData=res.data
          // 人员及设备
          this.equipmentData=res.data
          // 产品标准
          this.certificationData=res.data
          // 基础数据公司性质
          if(res.data.companyNature!=null){
            this.editForm.companyNature=String(res.data.companyNature)
          }
          // 基础数据供应商类型
          if(res.data.supplyType!=null){
            this.editForm.supplyType=String(res.data.supplyType)
          }
          // 基础数据一般纳税人
          if(res.data.isTaxpayers!=null){
            this.editForm.isTaxpayers=String(res.data.isTaxpayers)
          }
          // 基础数据产品所属地区
          if(res.data.countryUuid!=null){
            this.editForm.region=[]
            this.editForm.region.push(res.data.countryUuid,res.data.provinceUuid,res.data.cityUuid)
          }
          // 财务数据支付数据
          if(res.data.payType!=null){
            this.financeData.payType=String(res.data.payType)
          }
          if(res.data.payCondition!=null){
            this.financeData.payCondition=String(res.data.payCondition)
          }
          if(res.data.billType!=null){
            this.financeData.billType=String(res.data.billType)
          }
          // 产品遵守标准
          if(res.data.productStandard!=null){
            this.certificationData.productStandard=String(res.data.productStandard)
          }

          // 供应商证书（营业执照）
          let _this=this
          // 先清除其他证件数据
          _this.OtherCertificates=[]
          console.log(_this.CertificateData.BusinessEnclosure);
          res.data.certificateList.map(function(item){
            // 营业执照数据
            if(item.type==0){
              // 三证合一编码
              _this.CertificateData.Business=item.ertificateNumber
              // 三证合一生效日期
              _this.CertificateData.BusinessDate=item.effectiveDate
              // 三证合一附件
              _this.CertificateData.BusinessEnclosure=item.filePath

            }else if(item.type==5){
              _this.OtherCertificates.push(item)
            }
          })
        })
      },
      // 获取省市县数据
      getRegion(){
        axios.get('../static/','region.json').then((res) => {
          this.regionData=res
        })
      }
    },
    components: {
      // 基础资料联系人方式组件
      contaclnformation,
      // 银行信息账号
      bankAccount,
      // 人员设备情况列表
      equipmentList,
      // 主要材料来源
      materialSources,
      // 主要产品
      mainProducts,
      // 主要客户
      mainCustomer,
      // 引入其他证书
      addOtherCertificates
    }
  }
</script>

<style lang='stylus' scoped>
  .upload-demo
    display inline-block

  .savaBth
    margin-top 20px;
    margin-bottom 20px;

  .Bread_warp
    margin-top 10px;

  .base_warp
    width 1000px
    margin 0px auto
    margin-top 20px;
</style>
