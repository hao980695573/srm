webpackJsonp([81],{CnRC:function(t,e){},zrM4:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r("T452"),i=r("pxwZ"),l=r("lStc"),n={name:"barcodeSetting",data:function(){return{form:[{type:"",prefix:"",dateStr:"",suffix:"",uuid:""}],editShow:!1,formEdit:{dateStr:"",suffix:"",dateStrArr:[{label:l.a.getToday().slice(2,8),value:l.a.getToday().slice(2,8)},{label:l.a.getToday(),value:l.a.getToday()}],suffixArr:[{label:"0000",value:"0000"},{label:"00000",value:"00000"},{label:"000000",value:"000000"},{label:"0000000",value:"0000000"},{label:"00000000",value:"00000000"}]},rules:{dateStr:[{required:!0,message:"请选择日期格式",trigger:"change"}],suffix:[{required:!0,message:"请选择后缀格式",trigger:"change"}]}}},filters:{filtersType:function(t){return"0"==t?"外箱条码":"内箱条码"}},mounted:function(){this.getList()},methods:{getList:function(){var t=this;i.a.post(a.a.api,"/barcode/listBarcodeSetting.do",{}).then(function(e){0==e.status?t.form=e.data:t.$alert(e.msg,{confirmButtonText:"确定",center:!0})})},edit:function(t){this.editShow=!0,this.form.uuid=t.uuid},update:function(){var t=this;this.$refs.formEdit.validate(function(e){if(e){var r={dateStr:t.formEdit.dateStr,suffix:t.formEdit.suffix,uuid:t.form.uuid};i.a.post(a.a.api,"/barcode/updateBarcodeSetting.do",r).then(function(e){0==e.status?t.$alert(e.msg,{confirmButtonText:"确定",center:!0,callback:function(e){t.editShow=!1,t.$refs.formEdit.resetFields(),t.getList()}}):t.$alert(e.msg,{confirmButtonText:"确定",center:!0})})}})}}},o={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("div",{staticClass:"baseWarp"},[t._v("条码设置")]),t._v(" "),r("el-table",{staticStyle:{width:"100%"},attrs:{data:t.form,border:"",size:"mini",height:"400"}},[r("el-table-column",{attrs:{type:"index",align:"center","min-width":"50"}}),t._v(" "),r("el-table-column",{attrs:{label:"条码类型",align:"center","show-overflow-tooltip":"","min-width":"120"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("span",[t._v(t._s(t._f("filtersType")(e.row.type)))])]}}])}),t._v(" "),r("el-table-column",{attrs:{label:"前缀",align:"center","show-overflow-tooltip":"","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("span",[t._v(t._s(e.row.prefix))])]}}])}),t._v(" "),r("el-table-column",{attrs:{label:"日期格式",align:"center","min-width":"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("span",[t._v(t._s(e.row.dateStr))])]}}])}),t._v(" "),r("el-table-column",{attrs:{label:"后缀",align:"center","show-overflow-tooltip":"","min-width":"100"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("span",[t._v(t._s(e.row.suffix))])]}}])}),t._v(" "),r("el-table-column",{attrs:{label:"操作",align:"center",width:"150"},scopedSlots:t._u([{key:"default",fn:function(e){return[r("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(r){return t.edit(e.row)}}},[t._v("\n          编辑\n        ")])]}}])})],1),t._v(" "),r("el-dialog",{attrs:{title:"条码编辑",visible:t.editShow,width:"800px"},on:{"update:visible":function(e){t.editShow=e}}},[r("el-form",{ref:"formEdit",attrs:{model:t.formEdit,"label-width":"80px",inline:!0,rules:t.rules}},[r("el-form-item",{attrs:{label:"日期格式",prop:"dateStr"}},[r("el-select",{attrs:{placeholder:"请选择日期格式"},model:{value:t.formEdit.dateStr,callback:function(e){t.$set(t.formEdit,"dateStr",e)},expression:"formEdit.dateStr"}},t._l(t.formEdit.dateStrArr,function(t,e){return r("el-option",{key:e,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),r("el-form-item",{attrs:{label:"后缀格式",prop:"suffix"}},[r("el-select",{attrs:{placeholder:"请选择后缀格式"},model:{value:t.formEdit.suffix,callback:function(e){t.$set(t.formEdit,"suffix",e)},expression:"formEdit.suffix"}},t._l(t.formEdit.suffixArr,function(t,e){return r("el-option",{key:e,attrs:{label:t.label,value:t.value}})}),1)],1),t._v(" "),r("el-form-item",[r("el-button",{staticStyle:{"margin-left":"20px"},attrs:{type:"primary"},on:{click:t.update}},[t._v("确定")])],1)],1)],1)],1)},staticRenderFns:[]};var s=r("VU/8")(n,o,!1,function(t){r("CnRC")},"data-v-49ca91cc",null);e.default=s.exports}});
//# sourceMappingURL=81.5fbd27470e2fff52503b.js.map