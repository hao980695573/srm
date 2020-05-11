<template>
  <!--编辑用户-->
  <el-dialog title="编辑用户" :visible.sync="showEdit" @click='hlandEditDialogs'>
    <el-form ref="editUserADD" :model="editUserADD" label-width="80px" size='small'>
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="用户名" prop='username'>
            <el-input v-model="editUserADD.username" :disabled="true"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="公司名" prop='manufacturer'>
            <el-select v-model="editUserADD.manufacturerName" placeholder="请选择" style='width: 100%'
                       @change='changeManufacturer' disabled>
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
          <el-form-item label="联系人" prop='name'>
            <el-input v-model="editUserADD.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别">
            <el-select v-model="editUserADD.sex" placeholder="请选择性别" style="width: 100%;">
              <el-option label="男" value="1"></el-option>
              <el-option label="女" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="联系方式" prop='phone'>
            <el-input v-model="editUserADD.phone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮箱" prop='email'>
            <el-input v-model="editUserADD.email"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="11">
          <el-form-item label="选择角色">
            <el-select v-model="editUserADD.role" placeholder="请选择角色" style="width: 100%;" @change='get_levels'>
              <el-option label="请选择角色" value=""></el-option>
              <el-option v-for="item in this.roleList"
                         :key="item.uuid"
                         :label="item.name"
                         :value="item.uuid"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="直属上级">
            <el-select
              default-first-option
              v-model="editUserADD.puuid"
              filterable
              placeholder="请优先选择角色，再选择直属上级"
              style="width:100%"
            >
              <el-option label="请选择" value="1"></el-option>
              <el-option
                v-for="item in height_level"
                :key="item.uuid"
                :label="item.name"
                :value="item.uuid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <!--确定-->
      <div class='define'>
        <el-button type="primary" @click='addUser'>确定修改</el-button>
      </div>
    </el-form>
  </el-dialog>
</template>

<script>
  // 引入公共配置
  import {config} from 'api/config.js';
  //引入接口文件请求文件
  import axios from 'api/axios.js'
  // Vuex语法糖
  import {mapState} from 'Vuex'

  export default {
    name: 'editUser',
    data() {
      return {
        // 默认隐藏添加用户模块
        showEdit: false,
        // 编辑用户
        editUserADD: {
          // 用户名
          username: '',
          // 公司名
          manufacturerName: '',
          // 公司id
          manufacturer: '',
          // 联系人
          name: '',
          // 电话
          phone: '',
          // 角色Id
          role: '',
          // 角色中文名
          roleName: '',
          // 直属上级id
          puuid: '',
          // 性别
          sex: '',
          // 邮箱
          email: ''
        },
        // 直属上级数据源
        height_level: [],
        // 获取点击传过来的编辑对象的uuid
        eduituuid: '',
        // 公司列表
        options: []
      }
    },
    computed: {
      // 获取 角色列表
      ...mapState(['roleList']),
    },
    mounted() {
      // 获取公司列表
      this.getCorporateList()
    },
    methods: {
      // 显示编辑用户模块
      hlandEditDialogs(data) {
        // 接受传入过来的当前对象的uuid
        this.eduituuid = data
        this.showEdit = true
        // 获取编辑用户信息
        this.getUser()
      },
      // 获取直属上级
      get_levels(val) {
        let obj = {};
        obj = this.roleList.find((item) => {
          return item.uuid === val;
        });
        // 角色中文名
        this.editUserADD.roleName = obj.englishName
        // 清除直属上级id和name
        this.editUserADD.puuid = ''
        this.height_level = []
        // 请求直属上级
        const params = {
          roleuuid: this.editUserADD.role
        }
        axios.post(config.api, '/user/getParentUserByCurrentUser.do', params).then((res) => {
          this.height_level = res.data
        })
      },
      // 获取公司名称
      changeManufacturer(val) {
        console.log(val);
        let obj = {};
        obj = this.options.find((item) => {
          return item.uuid === val;
        });
        // 公司uuid
        this.editUserADD.manufacturer = obj.uuid
        // 公司uuid
        this.editUserADD.manufacturerName = obj.companyName
      },
      // 修改用户数据
      addUser() {
        const params = {
          // 用户名
          username: this.editUserADD.username,
          // 公司名
          manufacturerName: this.editUserADD.manufacturerName,
          // 公司uuid
          manufacturer: this.editUserADD.manufacturer,
          // 联系人
          name: this.editUserADD.name,
          // 密码
          password: '123456',
          // 电话
          phone: this.editUserADD.phone,
          // 角色id
          roleuuid: this.editUserADD.role,
          // 角色name
          role: this.editUserADD.roleName,
          // 直属上级id
          puuid: this.editUserADD.puuid,
          // 性别
          sex: this.editUserADD.sex,
          // 邮箱
          email: this.editUserADD.email,
          // 获取点击传过来的编辑对象的uuid
          uuid: this.eduituuid
        }

        // 请求
        axios.post(config.api, '/user/updateUserInfo.do', params).then((res) => {
          if (res.status==0) {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true,
              callback: action => {
                // 清空数据
                this.height_level = []
                // 用户名
                this.editUserADD.username = ''
                // 公司名
                this.editUserADD.manufacturer = ''
                // 联系人
                this.editUserADD.name = ''
                // 联系方式
                this.editUserADD.phone = ''
                // 角色id
                this.editUserADD.role = ''
                this.editUserADD.roleName = ''
                // 性别
                this.editUserADD.sex = ''
                // 邮箱
                this.editUserADD.email = ''
                // 直属上级id
                this.editUserADD.uuid = ''
                // 直属上级的name
                this.editUserADD.puuid = ''
                // 编辑时传入的当前对象的uuid
                this.eduituuid = ''
                // 关闭编辑页面
                this.showEdit = false
                // 通知父组件,重新获取用户列表
                this.$emit('getUserList')
              }
            });
          } else {
            this.$alert(res.msg, {
              confirmButtonText: '确定',
              center: true,
            })
          }
        })
      },
      // 获取编辑用户信息
      getUser() {
        const params = {
          // 获取点击传过来的编辑对象的uuid
          uuid: this.eduituuid
        }
        axios.post(config.api, '/user/getUserInfo.do', params).then((res) => {

          //用户名
          this.editUserADD.username = res.data.username
          // // 密码
          this.editUserADD.password = res.data.password
          // // 公司名
          this.editUserADD.manufacturerName = res.data.manufacturerName
          // // 公司uuid
          this.editUserADD.manufacturer = res.data.manufacturer
          // // 联系人
          this.editUserADD.name = res.data.name
          // // 联系方式
          this.editUserADD.phone = res.data.phone
          //  角色
          this.editUserADD.role = res.data.roleuuid
          // 性别
          this.editUserADD.sex = res.data.sex
          // 邮箱
          this.editUserADD.email = res.data.email
          //直属上级id
          this.editUserADD.puuid = res.data.puuid
          // 英文名
          this.editUserADD.roleName = res.data.role
          // 如果角色存在，请求直属上级接口
          if (res.data.roleuuid) {
            // 请求直属上级
            const params = {
              roleuuid: res.data.roleuuid
            }
            axios.post(config.api, '/user/getParentUserByCurrentUser.do', params).then((res) => {
              // 获取直属上级列表
              this.height_level = res.data
            })
          }
        })
      },
      // 获取公司列表
      getCorporateList() {
        const params = {
          pageNum: 1,
          pageSize: 100000
        }
        axios.post(config.api, '/supplier/getSupplierList.do', params).then((res) => {
          if (res.status == '0') {
            this.options = res.data
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
