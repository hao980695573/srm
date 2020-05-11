<template>
  <div>
    <!--新增用户-->
    <el-dialog title="新增用户" :visible.sync="showDialog" @click='hlandDialogs'>
      <el-form ref="userADD" :model="userADD" :rules="rules" label-width="80px" size='small'>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="用户名" prop='username'>
              <el-input v-model="userADD.username"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司名" prop='manufacturerName' v-if='userRole=="ROLE_ADMIN"'>
              <el-select v-model="userADD.manufacturerName" filterable placeholder="请选择" style='width: 100%' @change='changeManufacturer'>
                <el-option
                  v-for="item in options"
                  :key="item.uuid"
                  :label="item.companyName"
                  :value="item.uuid">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="密码" prop='password'>
              <el-input v-model="userADD.password"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系人" prop='name'>
              <el-input v-model="userADD.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="手机号码" prop='phone'>
              <el-input v-model="userADD.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop='email'>
              <el-input v-model="userADD.email"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="11">
            <el-form-item label="性别" prop='sex'>
              <el-select v-model="userADD.sex" placeholder="请选择性别" style="width: 100%;">
                <el-option label="男" value="1"></el-option>
                <el-option label="女" value="0"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="选择角色" prop='role'>
              <el-select v-model="userADD.role" placeholder="请选择角色" style="width: 100%;" @change='get_levels'>
                <el-option label="请选择角色" value=""></el-option>
                <el-option v-for="item in this.roleList"
                           :key="item.uuid"
                           :label="item.name"
                           :value="item.uuid"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="23">
            <el-form-item label="直属上级" prop='puuid'>
              <el-select
                default-first-option
                v-model="userADD.puuid"
                filterable
                placeholder="请优先选择角色，再选择直属上级"
                style="width:100%"
              >
                <el-option
                  v-for="item in height_level"
                  :key="item.id"
                  :label="item.name"
                  :value="item.uuid">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!--确定-->
        <div class='define'>
          <el-button type="primary" @click='addUser'>确定添加</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  // 引入公共配置
  import {config} from 'api/config.js';
  //引入接口文件请求文件
  import axios from 'api/axios.js'
  // 引入公共校验
  import {validateEmailEmpty,validateIphone} from 'api/Validate.js'
  // Vuex语法糖
  import {mapState} from 'Vuex'

  export default {
    name:'UserAdd',
    data(){
      return {
        // 默认隐藏添加用户模块
        showDialog: false,
        // 新增用户
        userADD: {
          // 用户名
          username: '',
          // 密码
          password: '',
          // 公司名
          manufacturerName: '',
          // 公司uuid
          manufacturer:'',
          // 联系人
          name: '',
          // 电话
          phone: '',
          // 角色Id
          role: '',
          // 角色中文名
          roleName: '',
          // 直属上级id
          uuid: '',
          // 性别
          sex: '',
          // 邮箱
          email: ''
        },
        // 公司名称列表数据
        options: [],
        // 直属上级数据源
        height_level: [],
        // 正则校验
        rules: {
          // 名字要和data里定义的数据一致，否则value获取不到值
          username: [
            {required: true, message: '用户名不能为空', trigger: 'blur'}
          ],
          manufacturerName: [
            {required: true, message: '公司名不能为空', trigger: 'change'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ],
          name: [
            {required: true, message: '联系人不能为空', trigger: 'blur'}
          ],
          phone: [
            {validator:validateIphone, required:true, trigger: 'blur'}
          ],
          email: [
            {validator: validateEmailEmpty, required:false, trigger: 'blur'}
          ],
          sex: [
            {required: true, message: '性别不能为空', trigger: 'change'}
          ],
          role:[
            {required: true, message: '请选择角色', trigger: 'change'}
          ],
          puuid:[
            {required: true, message: '请选择直属上级', trigger: 'change'}
          ]
        },
      }
    },
    computed: {

      // 获取 角色列表 用户角色
      ...mapState(['roleList','userRole','companyName','supplierUUid']),
    },
    mounted(){
      // 获取公司列表
      this.getCorporateList()
    },
    methods:{
      // 显示新增用户
      hlandDialogs(){
        this.showDialog=true

      },
      // 获取直属上级
      get_levels(val){
        let obj = {};
        obj = this.roleList.find((item)=>{
          return item.uuid === val;
        });
        // 角色中文名
        this.userADD.roleName=obj.englishName

        // 清除直属上级id和name
        this.userADD.uuid=''
        this.height_level=[]
        // 请求直属上级
        const params={
          roleuuid:this.userADD.role
        }
        axios.post(config.api,'/user/getParentUserByCurrentUser.do', params).then((res) => {
          this.height_level=res.data
        })
      },
      // 获取公司名称
      changeManufacturer(val){
        let obj = {};
        obj = this.options.find((item)=>{
          return item.uuid === val;
        });
        // 公司uuid
        this.userADD.manufacturer=obj.uuid
        this.userADD.manufacturerName=obj.companyName
      },
      // 新增用户
      addUser(){
        this.$refs['userADD'].validate((valid) => {
          if (valid) {
            if(this.companyName!=''){
              this.userADD.manufacturerName=this.companyName
              this.userADD.manufacturer=this.supplierUUid
            }
            const params={
              // 用户名
              username: this.userADD.username,
              // 密码
              password: this.userADD.password,
              // 公司名
              manufacturerName: this.userADD.manufacturerName,
              // 公司uuid
              manufacturer:this.userADD.manufacturer,
              // 联系人
              name: this.userADD.name,
              // 电话
              phone: this.userADD.phone,
              // 角色id
              roleuuid: this.userADD.role,
              // 角色name
              role: this.userADD.roleName,
              // 直属上级id
              puuid:this.userADD.puuid,
              // 性别
              sex: this.userADD.sex,
              // 邮箱
              email: this.userADD.email
            }

            // 请求
            axios.post(config.api,'/user/addUser.do', params).then((res) => {
              if(res.status==0){
                this.$alert(res.msg,{
                  confirmButtonText:'确定',
                  center:true,
                  callback: action => {
                    // 清除数据
                    this.$refs['userADD'].resetFields();
                    // 隐藏添加弹框
                    this.showDialog=false
                    // 重新获取数据列表
                    this.$emit('upUserList')
                  }
                })
              }else{
                this.$alert(res.msg,{
                  confirmButtonText:'确定',
                  center:true,
                })
              }

            })
          }
        });
      },
      // 获取公司列表
      getCorporateList(){
        const params={
          pageNum:1,
          pageSize:100000
        }
        axios.post(config.api,'/supplier/getAvailableSupplier.do',params).then((res) => {
          if(res.status=='0'){
            this.options=res.data
          }
        })
      }
    }
  }
</script>

<style lang='stylus' scoped>
  // 确定
  .define
    width 100%
    height 50px;
    margin-top: 20px;
    display: flex;
    justify-content center
    align-items center
</style>
