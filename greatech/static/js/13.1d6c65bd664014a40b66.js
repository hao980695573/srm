webpackJsonp([13,53],{Mlnz:function(e,t){},"N/lP":function(e,t){},ZpXI:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("Dd8w"),r=a.n(n),l=a("T452"),s=a("pxwZ"),i=a("uUlv"),o=a("O3XP"),c=a("8aUl"),u=a("8Qaq"),h={name:"UserList",data:function(){return{total:1,currentPage:1,ShowPage:15,searchfrom:{username:"",name:"",phone:"",liaisonType:""}}},filters:{formatState:function(e){return 0===e?"使用中":"禁用"}},computed:r()({},Object(i.c)(["mark","loadData","tableData","roleList","userRole"])),mounted:function(){this.gettableData(),this.getroleList()},methods:r()({},Object(i.b)(["loadMack","changeloadData","changetableData","ChangeroleList","changehlderUserData"]),{addUsers:function(){this.$refs.dialog.hlandDialogs()},changeUser:function(e){this.$refs.changeDialog.hanldaccessShow(),this.changehlderUserData(e)},hlandEditDialogs:function(e){this.$refs.editUserdialog.hlandEditDialogs(e.uuid)},getroleList:function(){var e=this;s.a.post(l.a.api,"/role/getRoleList.do",{englishName:""}).then(function(t){e.ChangeroleList(t.data)})},searchfor:function(){var e=this,t={username:this.searchfrom.username,name:this.searchfrom.name,phone:this.searchfrom.phone,roleuuid:this.searchfrom.role};s.a.post(l.a.api,"/user/listUser.do",t).then(function(t){e.loadMack(!1),0!==t.data.length?(e.changeloadData(t.data),e.handleCurrentChange()):e.changetableData(null)})},gettableData:function(){var e=this;this.changetableData(null),this.loadMack(!0);s.a.post(l.a.api,"/user/listUser.do",{username:"",name:"",phone:""}).then(function(t){e.loadMack(!1),0!==t.data.length?(e.changeloadData(t.data),e.handleCurrentChange()):e.changetableData(null)})},handleCurrentChange:function(){if(this.changetableData(null),this.total=this.loadData.length,this.total%this.ShowPage==0)for(var e=(this.currentPage-1)*this.ShowPage;e<this.currentPage*this.ShowPage;e++)this.changetableData(this.loadData[e]);else{var t=this.total%this.ShowPage,a=this.currentPage*this.ShowPage;this.currentPage===Math.ceil(this.total/this.ShowPage)&&(a=(this.currentPage-1)*this.ShowPage+t);for(var n=(this.currentPage-1)*this.ShowPage;n<a;n++)this.changetableData(this.loadData[n])}},resetPassword:function(e){var t=this,a={uuid:e.uuid};s.a.post(l.a.api,"/user/resetPassword.do",a).then(function(e){0==e.status?t.$alert("重置密码成功",{confirmButtonText:"确定",center:!0}):t.$alert(e.msg,{confirmButtonText:"确定",center:!0})})},forbiddenUser:function(e){var t=this;if(1!=e.status){var a={uuid:e.uuid,status:e.status};s.a.post(l.a.api,"/user/forbiddenUser.do",a).then(function(e){if(0==e.status){var a=t;t.$alert("禁用成功",{confirmButtonText:"确定",center:!0,callback:function(e){a.gettableData()}})}else t.$alert(e.msg,{confirmButtonText:"确定",center:!0})})}else this.$alert("该账户已被禁用",{confirmButtonText:"确定",center:!0})}}),components:{editUser:o.default,UserAdd:c.default,changeUser:u.default}},d={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"inquiry_warp"},[a("el-form",{ref:"searchfrom",attrs:{model:e.searchfrom,"label-width":"auto",size:"mini",inline:!0}},[a("el-form-item",{attrs:{label:"用户名","label-width":"80px"}},[a("el-input",{staticStyle:{width:"150px"},model:{value:e.searchfrom.username,callback:function(t){e.$set(e.searchfrom,"username",t)},expression:"searchfrom.username"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"联系人"}},[a("el-input",{staticStyle:{width:"150px"},model:{value:e.searchfrom.name,callback:function(t){e.$set(e.searchfrom,"name",t)},expression:"searchfrom.name"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"联系电话"}},[a("el-input",{staticStyle:{width:"150px"},model:{value:e.searchfrom.phone,callback:function(t){e.$set(e.searchfrom,"phone",t)},expression:"searchfrom.phone"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"角色"}},[a("el-select",{staticStyle:{width:"150px"},attrs:{placeholder:"请选择角色"},model:{value:e.searchfrom.role,callback:function(t){e.$set(e.searchfrom,"role",t)},expression:"searchfrom.role"}},[a("el-option",{attrs:{label:"请选择角色",value:""}}),e._v(" "),e._l(this.roleList,function(e){return a("el-option",{key:e.uuid,attrs:{label:e.name,value:e.uuid}})})],2)],1),e._v(" "),a("el-form-item",[a("el-button",{attrs:{type:"primary"},on:{click:e.searchfor}},[e._v("搜索")]),e._v(" "),a("el-button",{on:{click:e.addUsers}},[e._v("新增用户")])],1)],1)],1),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:this.mark,expression:"this.mark",modifiers:{fullscreen:!0,lock:!0}}],staticStyle:{width:"100%"},attrs:{data:this.tableData,border:"",size:"mini","max-height":"415","element-loading-text":"拼命加载中","element-loading-spinner":"el-icon-loading","element-loading-background":"rgba(0, 0, 0, 0.8)"}},[a("el-table-column",{attrs:{align:"center",type:"index",width:"60"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"username",label:"用户名","min-width":"100"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"manufacturerName",label:"公司名","min-width":"130"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"name",label:"联系人",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"phone",label:"电话",width:"110"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"状态",width:"90"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",{class:{forbidden:1==t.row.status}},[e._v(e._s(e._f("formatState")(t.row.status)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"role",label:"角色","min-width":"130"}}),e._v(" "),a("el-table-column",{attrs:{label:"操作",width:"170",align:"center"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(a){return e.hlandEditDialogs(t.row)}}},[e._v("编辑")]),e._v(" "),"ROLE_ADMIN"==e.userRole?a("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(a){return e.changeUser(t.row)}}},[e._v("权限")]):e._e(),e._v(" "),a("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(a){return e.resetPassword(t.row)}}},[e._v("重置")]),e._v(" "),a("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(a){return e.forbiddenUser(t.row)}}},[e._v("禁用")])]}}])})],1),e._v(" "),a("div",{staticClass:"page_fen"},[a("el-pagination",{attrs:{background:"","page-size":e.ShowPage,layout:"prev, pager, next",total:e.total,"current-page":e.currentPage},on:{"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.currentPage=t},"update:current-page":function(t){e.currentPage=t}}})],1),e._v(" "),a("editUser",{ref:"editUserdialog",on:{getUserList:e.gettableData}}),e._v(" "),a("UserAdd",{ref:"dialog",on:{upUserList:e.gettableData}}),e._v(" "),a("changeUser",{ref:"changeDialog"})],1)},staticRenderFns:[]};var f=a("VU/8")(h,d,!1,function(e){a("Mlnz")},"data-v-782f487a",null);t.default=f.exports},jSwW:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={name:"usermanage",components:{UserList:a("ZpXI").default}},r={render:function(){var e=this.$createElement;return(this._self._c||e)("UserList")},staticRenderFns:[]};var l=a("VU/8")(n,r,!1,function(e){a("N/lP")},"data-v-d3087778",null);t.default=l.exports}});
//# sourceMappingURL=13.1d6c65bd664014a40b66.js.map