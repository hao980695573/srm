<template>
  <div>
    <!--注册中心-->
    <div class='register_describe'>申请成为广正供应商</div>
    <div class='register_center'>
      <el-form label-width="120px" :model="form" ref="form" class='register_center_center'>
        <!--左侧-->
        <div class='register_center_left'>
          <!--企业类型-->
          <el-form-item label="企业类型">
            <el-select v-model="companyType" placeholder="请选择企业类型" style='width: 100%' disabled>
              <el-option label="请选择" value=" "></el-option>
              <el-option label="生产商" value="0"></el-option>
              <el-option label="代理商" value="1"></el-option>
              <el-option label="承运商" value="2"></el-option>
              <el-option label="服务类" value="3"></el-option>
              <el-option label="其他" value="4"></el-option>
            </el-select>
          </el-form-item>
          <!--单位名称-->
          <el-form-item label="单位名称 :">
            <el-input v-model="form.companyName" size="small" class='register_input' placeholder='请输入单位名称' readonly></el-input>
          </el-form-item>
          <!--地址-->
          <el-form-item label="地址 :">
            <el-input v-model="form.address" size="small" class='register_input' placeholder='请输入地址' readonly></el-input>
          </el-form-item>
          <!--公司员工总数-->
          <el-form-item label="公司员工总数 :">
            <el-input v-model="form.staffNum" size="small" class='register_input' placeholder='请输入员工总数' readonly>
              <template slot="append">人</template>
            </el-input>
          </el-form-item>
          <!--联系人-->
          <el-form-item label="联系人 :">
            <el-input v-model="name" size="small" class='register_input' placeholder='请输入联系人' readonly></el-input>
          </el-form-item>
          <!--联系电话-->
          <el-form-item label="手机号码 :">
            <el-input v-model="phone" size="small" class='register_input' placeholder='请输入手机号码' readonly></el-input>
          </el-form-item>
        </div>
        <!--右侧-->
        <div class='register_center_right'>
          <!--注册资本-->
          <el-form-item label="注册资本 :">
            <el-input v-model="form.registeredCapital" size="small" class='register_input' placeholder='请输入注册资本' readonly>
              <template slot="append">人民币</template>
            </el-input>
          </el-form-item>
          <!--公司性质-->
          <el-form-item label="公司性质">
            <el-select v-model="companyNature" placeholder="请选择公司性质" style='width: 100%' disabled>
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
          <!--公司经营范围-->
          <el-form-item label="公司经营范围 :">
            <el-input v-model="form.businessScope" size="small" class='register_input' placeholder='请输入经营范围' readonly></el-input>
          </el-form-item>
          <!--工厂面积-->
          <el-form-item label="工厂面积 :">
            <el-input v-model="form.area" size="small" class='register_input' placeholder='请输入公司面积' readonly>
              <template slot="append">平方米</template>
            </el-input>
          </el-form-item>
          <!--职位-->
          <el-form-item label="职位 :">
            <el-input v-model="post" size="small" class='register_input' placeholder='请输入职位'></el-input readonly>
          </el-form-item>
          <!--备注-->
          <el-form-item label="备注:">
            <el-input
              type="textarea"
              :rows="4"
              resize='none'
              placeholder="无"
              readonly
              v-model="form.remark">
            </el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
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
    name:'seeBeAudited',
    data(){
      return{
        form:{},
        // 企业类型
        companyType:'',
        // 公司性质
        companyNature:'',
        // 联系人
        name:'',
        // 电话
        phone:'',
        // 职位
        post:''
      }
    },
    computed: {
      // 获取 uuid
      ...mapState(['uuid']),
    },
    mounted(){
      this.getArchives()
    },
    methods:{
      // 获取档案信息
      getArchives(){
        const params={
          uuid:this.uuid
        }
        axios.post(config.api, '/supplier/getSupplierInfo.do', params).then((res) => {
          // 基础资料数据
          this.form=res.data
          // 联系人
          this.name=res.data.contractList[0].name
          //电话
          this.phone=res.data.contractList[0].phone
          // 职位
          this.post=res.data.contractList[0].post

          //生产厂商
          if(this.form.companyType!=null){
            this.companyType=String(this.form.companyType)
          }
          // 公司性质
          if(this.form.companyNature!=null){
            this.companyNature=String(this.form.companyNature)
          }
        })
      }
    }
  }
</script>

<style lang='stylus' scoped>

  .register_describe
    width 100%
    text-align center
    margin-top 20px;
    font-size 22px;
  .register_center
    width 1000px
    border 1px solid #edeff2
    background #fff
    margin 0px auto
    margin-top 25px
    padding-top: 20px
    position relative
    .register_center_center
      display flex
      justify-content space-between
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
