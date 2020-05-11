<template>
  <div>
    <!--步骤条-->
    <div class='step_warp'>
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="选择供应商"></el-step>
        <el-step title="选择角色"></el-step>
        <el-step title="选择用户"></el-step>
        <el-step title="填写内容"></el-step>
      </el-steps>
    </div>
    <!--选择供应商-->
    <div class='chuansuokuang_warp' v-show='active==1'>
      <div class='chuansuo'>
        <el-transfer
          filterable
          :titles="['可选供应商', '已选供应商']"
          v-model="SupplierList.SelectSupplier"
          :data="SupplierList.backSupplierList"
        >
        </el-transfer>
      </div>
      <!--下一步-->
      <div class='xiayibu'>
        <el-button type="success"  @click='nextStep1'>下一步</el-button>
      </div>
    </div>
    <!--选择角色-->
    <div class='chuansuokuang_warp' v-show='active==2'>
      <div class='chuansuo'>
        <el-transfer
          filterable
          :titles="['可选角色', '已选角色']"
          v-model="RoleList.SelectRole"
          :data="RoleList.backRoleList">
        </el-transfer>
      </div>
      <!--下一步-->
      <div class='xiayibu'>
        <el-button type="danger"   @click='previousStep2' style='margin-right:40px'>上一步</el-button>
        <el-button type="success"  @click='nextStep2'>下一步</el-button>
      </div>
    </div>
    <!--选择发布人-->
    <div class='chuansuokuang_warp' v-show='active==3'>
      <div class='chuansuo'>
        <el-transfer
          filterable
          :titles="['可选用户', '已选用户']"
          v-model="user.selectUser"
          :data="user.backUserList">
        </el-transfer>
      </div>
      <!--下一步-->
      <div class='xiayibu'>
        <el-button type="danger"   @click='previousStep3' style='margin-right:40px'>上一步</el-button>
        <el-button type="success"  @click='nextStep3'>下一步</el-button>
      </div>
    </div>
    <!--填写内容-->
    <div class='chuansuokuang_warp' v-show='active==4'>
      <div class='content_warp'>
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
          <el-form-item label="标题" prop="title">
            <el-input v-model="form.title" placeholder="请输入标题"></el-input>
          </el-form-item>
          <el-form-item label="简介" prop='introduction'>
            <el-input v-model="form.introduction" placeholder="请输入描述"></el-input>
          </el-form-item>
          <el-form-item label="内容描述" prop='content'>
            <el-input
              type="textarea"
              :rows="15"
              placeholder="请输入内容"
              resize='none'
              v-model="form.content">
            </el-input>
          </el-form-item>
        </el-form>
        <!--确定发布-->
        <div class='confirmPublication'>
          <el-button type="danger"   @click='previousStep' style='margin-right:40px'>上一步</el-button>
          <el-button type="primary" @click='publication'>确定发布</el-button>
        </div>
      </div>
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
    data() {
      return {
        // 第几步
        active:1,
        // 供应商列表
        SupplierList: {
          // 选中的供应商
          SelectSupplier: [],
          backSupplierList: [],
        },
        // 角色列表
        RoleList: {
          // 选中的角色
          SelectRole: [],
          backRoleList: [],
        },
        // 用户列表
        user: {
          // 选中的用户
          selectUser: [],
          backUserList: [],
        },
        // 表单
        form:{
          // 标题
          title:'',
          // 描述
          introduction:'',
          // 内容
          content:''
        },
        // 正则判断
        rules: {
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          introduction:[
            { required: true, message: '请输入描述', trigger: 'blur' }
          ],
          content:[
            { required: true, message: '请输入内容', trigger: 'blur' }
          ]
        }
      }
    },
    mounted(){
      this.getSupplierList()
      // 获取角色
      this.getRoleList()
    },
    computed: {
      // 获取 uuid 角色身份
      ...mapState(['supplierUUid']),
    },
    methods: {
      // 获取供应商列表
      getSupplierList(){
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
          // 赋值档案列表
          if (res.status == 0) {
            let _this = this
            res.data.map((item) => {
              _this.SupplierList.backSupplierList.push({
                label: item.companyName,
                key: item.erpno
              });
            });
          } else {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      // 下一步1
      nextStep1(){
        this.active=2
      },
      // 获取角色列表
      getRoleList() {
        // 请求
        const params = {
          name:''
        }
        axios.post(config.api, '/role/getRoleList.do', params).then((res) => {
          // 赋值档案列表
          if (res.status == 0) {
            let _this = this
            res.data.map((item) => {
              _this.RoleList.backRoleList.push({
                label: item.name,
                key: item.uuid,
                item: item
              });
            });
          } else {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      // 下一步2
      nextStep2(){
        this.active=3
        this.getUserList()
      },
      // 上一步2
      previousStep2(){
        this.active=1
      },
      // 获取用户列表
      getUserList() {
        this.user.selectUser=[]
        this.user.backUserList=[]
        // 请求
        const params = {
          erpno:this.SupplierList.SelectSupplier,
          role:this.RoleList.SelectRole,
          content:''
        }
        axios.post(config.api, '/message/getReablePeople.do', params).then((res) => {
          let _this=this
          // 赋值档案列表
          if (res.status == 0) {
            res.data.map((item, index) => {
              _this.user.backUserList.push({
                label: item.username+'('+item.name+')',
                key: item.username
              });
            });
          } else {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true
            })
          }
        })
      },
      // 下一步3
      nextStep3(){
        this.active=4
      },
      // 上一步3
      previousStep3(){
        this.active=2
      },
      // 确定发布
      publication(){
        this.$refs['form'].validate((valid) => {
          if (valid) {
            let params={
              title:this.form.title,
              introduction:this.form.introduction,
              content:this.form.content,
              reablePeople:String(this.user.selectUser),
              reableRole:String(this.RoleList.SelectRole),
              reableSupplier:String(this.SupplierList.SelectSupplier)
            }
            axios.post(config.api, '/message/addMessage.do', params).then((res) => {
              // 赋值档案列表
              if (res.status == 0) {
                this.$alert(res.msg, {
                  confirmButtonText: '确定',
                  center: true,
                  callback: action => {
                    // 清除数据
                    this.user.selectUser=[]
                    this.RoleList.SelectRole=[]
                    this.SupplierList.SelectSupplier=[]
                    this.form.title=''
                    this.form.introduction=''
                    this.form.content='',
                      // 回到步骤1
                      this.active=1
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

      },
      // 上一步
      previousStep(){
        // 回到步骤1
        this.active=3
      }
    }
  }
</script>

<style lang='stylus' scoped>
  .chuansuokuang_warp >>> .el-transfer-panel {
    width: 400px;
    height 500px;
  }

  .chuansuokuang_warp >>>.el-transfer-panel__list{
    height 500px;
  }

  .step_warp
    width 1000px;
    margin 0px auto;
    margin-top:50px;


   .chuansuokuang_warp
     width 1000px
     margin 0px auto;
     margin-top:30px;

   .chuansuo
      display flex
      justify-content center


  .xiayibu
    width 100%;
    margin-top 20px;
    display flex
    justify-content center


  .content_warp
    width 1200px;
    height 500px;
    margin-top 30px;

  .confirmPublication
    width 100%
    display flex
    justify-content center

</style>
