webpackJsonp([84],{MOXX:function(e,t){},oYcy:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("T452"),s=r("pxwZ"),o=r("/ksa"),l={name:"register",props:{registerShow:{type:Boolean,default:!1}},data:function(){return{form:{companyType:"",companyName:"",companyNature:"",address:"",contract:"",contractPhone:"",registeredCapital:"",contractJob:"",businessScope:"",area:"",staffNum:"",remark:""},rules:{companyType:[{required:!0,message:"请选择公司类别",trigger:"change"}],companyName:[{required:!0,message:"单位名称不能为空",trigger:"blur"}],companyNature:[{required:!0,message:"请选择公司性质",trigger:"change"}],address:[{required:!0,message:"地址不能为空",trigger:"blur"}],contract:[{required:!0,message:"联系人不能为空",trigger:"blur"}],registeredCapital:[{validator:o.a,trigger:"blur"}],contractPhone:[{validator:o.f,trigger:"blur",required:!0}],businessScope:[{required:!0,message:"公司经营范围不能为空",trigger:"blur"}],area:[{validator:o.b,trigger:"blur",required:!1}],staffNum:[{validator:o.e,trigger:"blur",required:!0}],remark:[{required:!1,message:"备注不能为空",trigger:"blur"}],contractJob:[{required:!0,message:"职位不能为空",trigger:"change"}]}}},methods:{showLogin:function(e){this.$refs[e].resetFields(),this.$emit("showLogin")},registerBth:function(e){var t=this;this.$refs[e].validate(function(e){if(e){var r={companyType:t.form.companyType,companyName:t.form.companyName,companyNature:t.form.companyNature,address:t.form.address,contract:t.form.contract,contractPhone:t.form.contractPhone,registeredCapital:t.form.registeredCapital,contractJob:t.form.contractJob,businessScope:t.form.businessScope,area:t.form.area,staffNum:t.form.staffNum,remark:t.form.remark};s.a.post(a.a.noNeedLogionApi,"skip/addSupplier.do",r).then(function(e){0==e.status&&t.$alert(e.msg,{confirmButtonText:"确定",center:!0,callback:function(e){window.location.href="/"}})})}})},restBth:function(e){this.$refs[e].resetFields()}}},i={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{directives:[{name:"show",rawName:"v-show",value:e.registerShow,expression:"registerShow"}],staticClass:"register"},[r("div",{staticClass:"register_title"},[r("div",{staticClass:"enter_login",on:{click:function(t){return e.showLogin("form")}}},[e._v("登录")]),e._v(" "),r("div",{staticClass:"register_title_margin"},[e._v(" >")]),e._v(" "),r("div",{staticClass:"register_title_right"},[e._v("注册账号")])]),e._v(" "),r("div",{staticClass:"register_describe"},[e._v("申请成为广正供应商")]),e._v(" "),r("div",{staticClass:"register_center"},[r("el-form",{ref:"form",staticClass:"register_center_center",attrs:{"label-width":"120px",rules:e.rules,model:e.form}},[r("div",{staticClass:"register_center_left"},[r("el-form-item",{attrs:{label:"企业类型",prop:"companyType"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择企业类型"},model:{value:e.form.companyType,callback:function(t){e.$set(e.form,"companyType",t)},expression:"form.companyType"}},[r("el-option",{attrs:{label:"请选择",value:" "}}),e._v(" "),r("el-option",{attrs:{label:"生产商",value:"0"}}),e._v(" "),r("el-option",{attrs:{label:"代理商",value:"1"}}),e._v(" "),r("el-option",{attrs:{label:"承运商",value:"2"}}),e._v(" "),r("el-option",{attrs:{label:"服务类",value:"3"}}),e._v(" "),r("el-option",{attrs:{label:"其他",value:"4"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"单位名称 :",prop:"companyName"}},[r("el-input",{staticClass:"register_input",attrs:{size:"small",placeholder:"请输入单位名称"},model:{value:e.form.companyName,callback:function(t){e.$set(e.form,"companyName",t)},expression:"form.companyName"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"地址 :",prop:"address"}},[r("el-input",{staticClass:"register_input",attrs:{size:"small",placeholder:"请输入地址"},model:{value:e.form.address,callback:function(t){e.$set(e.form,"address",t)},expression:"form.address"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"公司员工总数 :",prop:"staffNum"}},[r("el-input",{staticClass:"register_input",attrs:{size:"small",placeholder:"请输入员工总数"},model:{value:e.form.staffNum,callback:function(t){e.$set(e.form,"staffNum",t)},expression:"form.staffNum"}},[r("template",{slot:"append"},[e._v("人")])],2)],1),e._v(" "),r("el-form-item",{attrs:{label:"联系人 :",prop:"contract"}},[r("el-input",{staticClass:"register_input",attrs:{size:"small",placeholder:"请输入联系人"},model:{value:e.form.contract,callback:function(t){e.$set(e.form,"contract",t)},expression:"form.contract"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"手机号码 :",prop:"contractPhone"}},[r("el-input",{staticClass:"register_input",attrs:{size:"small",placeholder:"请输入手机号码"},model:{value:e.form.contractPhone,callback:function(t){e.$set(e.form,"contractPhone",t)},expression:"form.contractPhone"}})],1)],1),e._v(" "),r("div",{staticClass:"register_center_right"},[r("el-form-item",{attrs:{label:"注册资本 :",prop:"registeredCapital"}},[r("el-input",{staticClass:"register_input",attrs:{size:"small",placeholder:"请输入注册资本"},model:{value:e.form.registeredCapital,callback:function(t){e.$set(e.form,"registeredCapital",t)},expression:"form.registeredCapital"}},[r("template",{slot:"append"},[e._v("人民币")])],2)],1),e._v(" "),r("el-form-item",{attrs:{label:"公司性质",prop:"companyNature"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择公司性质"},model:{value:e.form.companyNature,callback:function(t){e.$set(e.form,"companyNature",t)},expression:"form.companyNature"}},[r("el-option",{attrs:{label:"请选择",value:" "}}),e._v(" "),r("el-option",{attrs:{label:"个体工商户",value:"3"}}),e._v(" "),r("el-option",{attrs:{label:"有限责任公司",value:"7"}}),e._v(" "),r("el-option",{attrs:{label:"股份有限公司",value:"8"}}),e._v(" "),r("el-option",{attrs:{label:"其他",value:"9"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"公司经营范围 :",prop:"businessScope"}},[r("el-input",{staticClass:"register_input",attrs:{size:"small",placeholder:"请输入经营范围"},model:{value:e.form.businessScope,callback:function(t){e.$set(e.form,"businessScope",t)},expression:"form.businessScope"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"工厂面积 :",prop:"area"}},[r("el-input",{staticClass:"register_input",attrs:{size:"small",placeholder:"请输入公司面积"},model:{value:e.form.area,callback:function(t){e.$set(e.form,"area",t)},expression:"form.area"}},[r("template",{slot:"append"},[e._v("平方米")])],2)],1),e._v(" "),r("el-form-item",{attrs:{label:"职位 :",prop:"contractJob"}},[r("el-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择职位"},model:{value:e.form.contractJob,callback:function(t){e.$set(e.form,"contractJob",t)},expression:"form.contractJob"}},[r("el-option",{attrs:{label:"报价员",value:"报价员"}}),e._v(" "),r("el-option",{attrs:{label:"跟单员",value:"跟单员"}}),e._v(" "),r("el-option",{attrs:{label:"财务员",value:"财务员"}}),e._v(" "),r("el-option",{attrs:{label:"仓库员",value:"仓库员"}}),e._v(" "),r("el-option",{attrs:{label:"其他",value:"其他"}})],1)],1),e._v(" "),r("el-form-item",{attrs:{label:"备注:",prop:"remark"}},[r("el-input",{attrs:{type:"textarea",rows:4,resize:"none",placeholder:"请输入备注内容"},model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1)],1)]),e._v(" "),r("div",{staticClass:"register_bth_warp"},[r("el-button",{attrs:{type:"success"},on:{click:function(t){return e.restBth("form")}}},[e._v("重置")]),e._v(" "),r("el-button",{staticClass:"register_bth",staticStyle:{"margin-left":"50px"},attrs:{type:"primary"},on:{click:function(t){return e.registerBth("form")}}},[e._v("注册\n      ")])],1)],1)])},staticRenderFns:[]};var n=r("VU/8")(l,i,!1,function(e){r("MOXX")},"data-v-47b73fd0",null);t.default=n.exports}});
//# sourceMappingURL=84.912bc8d736fbf4ea7b25.js.map