webpackJsonp([117],{"1q2h":function(e,t){},q4IA:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("Dd8w"),o=r.n(a),s=r("Cv63"),n=r("T452"),i=r("pxwZ"),c=r("uUlv"),l={name:"publish",data:function(){return{addShow:!1,screen_form:{categoryName:"",categoryUuid:"",title:"",summary:""},category:[]}},computed:o()({},Object(c.c)(["categoryList"])),methods:o()({},Object(c.b)(["changeEditorClear"]),{categoryChange:function(e){var t;t=this.categoryList.find(function(t){return t.uuid===e}),this.screen_form.categoryName=t.name,this.screen_form.categoryUuid=t.uuid},publish_buttom:function(){var e=this,t={categoryUuid:this.screen_form.categoryUuid,categoryName:this.screen_form.categoryName,title:this.screen_form.title,summary:this.screen_form.summary,content:this.$refs.editor.getContent()};i.a.post(n.a.api,"/information/addInformation.do",t).then(function(t){if(0==t.status){var r=e;e.$alert(t.msg,{confirmButtonText:"确定",center:!0,callback:function(e){r.clearData(),r.addUserShow(),r.$emit("againload")}})}})},clearData:function(e){this.screen_form.categoryUuid="",this.screen_form.categoryName="",this.screen_form.title="",this.screen_form.summary="",this.changeEditorClear(e)},addUserShow:function(){this.addShow=!this.addShow,this.clearData(this.addShow)}}),components:{editor:s.default}},m={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("el-dialog",{attrs:{title:"新增信息",visible:e.addShow,width:"1300px",top:"40px"},on:{"update:visible":function(t){e.addShow=t},close:e.clearData}},[r("el-form",{ref:"screen",staticClass:"screen_form",attrs:{model:e.screen_form,"label-width":"80px",size:"mini"}},[r("el-form-item",{attrs:{label:"分类"}},[r("el-select",{attrs:{placeholder:"请选择类别"},on:{change:e.categoryChange},model:{value:e.screen_form.categoryUuid,callback:function(t){e.$set(e.screen_form,"categoryUuid",t)},expression:"screen_form.categoryUuid"}},e._l(e.categoryList,function(e){return r("el-option",{key:e.uuid,attrs:{label:e.name,value:e.uuid}})}),1)],1),e._v(" "),r("el-form-item",{attrs:{label:"标题"}},[r("el-input",{attrs:{placeholder:"请输入标题"},model:{value:e.screen_form.title,callback:function(t){e.$set(e.screen_form,"title",t)},expression:"screen_form.title"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"概要"}},[r("el-input",{attrs:{type:"textarea",Rows:"5",resize:"none",placeholder:"请输入概要内容"},model:{value:e.screen_form.summary,callback:function(t){e.$set(e.screen_form,"summary",t)},expression:"screen_form.summary"}})],1)],1),e._v(" "),r("div",{staticClass:"center"},[r("editor",{ref:"editor"})],1),e._v(" "),r("div",{staticClass:"button_warp"},[r("el-button",{staticClass:"primary",attrs:{type:"primary"},on:{click:e.publish_buttom}},[e._v("新增")]),e._v(" "),r("el-button",{staticClass:"danger",attrs:{type:"danger"},on:{click:e.addUserShow}},[e._v("取消")])],1)],1)},staticRenderFns:[]};var u=r("VU/8")(l,m,!1,function(e){r("1q2h")},"data-v-04515326",null);t.default=u.exports}});
//# sourceMappingURL=117.49323efcc600317d4de8.js.map