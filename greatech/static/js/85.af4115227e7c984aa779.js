webpackJsonp([85],{U6h4:function(e,t){},WwBe:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("Dd8w"),i=n.n(a),r=n("T452"),l=n("pxwZ"),s=n("uUlv"),u={name:"advice",data:function(){return{screen_data:{tenderType:"",tenderID:"",fuzzySearch:""},InquiryList:[],pageSize:8,pageIndex:1,totalNum:0,loading:!0}},computed:i()({},Object(s.c)(["uuid","userRole"])),mounted:function(){this.handleCurrentChange()},methods:i()({},Object(s.b)(["changeUuid"]),{Release:function(){this.$router.push("advicePublish")},handleCurrentChange:function(e){var t=this;"screen"==e&&(this.pageIndex=1),this.loading=!0;var n={tenderType:this.screen_data.tenderType,tenderID:this.screen_data.tenderID,fuzzySearch:this.screen_data.fuzzySearch,pageIndex:this.pageIndex,pageSize:this.pageSize};l.a.post(r.a.api,"/offermanagement/listAllqueries.do",n).then(function(e){t.InquiryList=e.data,t.loading=!1,e.data.length>0&&(t.totalNum=e.data[0].totalNum)})},deleteAdvice:function(e){var t=this,n=[{uuid:e.row.uuid}];l.a.post(r.a.api,"/offermanagement/deleteOfferManagement.do",n).then(function(e){0==e.status?t.$alert("删除成功",{confirmButtonText:"确定",center:!0,callback:function(e){t.handleCurrentChange()}}):t.$alert(e.msg,{confirmButtonText:"确定",center:!0})})},enterView:function(e){this.changeUuid(e.row.uuid),this.$router.push("viewQuotation")},examine:function(e){this.changeUuid(e.row.uuid),this.$router.push("updateOfferManagement")}})},o={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"inquiry_warp"},[n("el-form",{ref:"screen_data",attrs:{model:e.screen_data,"label-width":"80px",inline:!0,size:"mini"}},[n("el-form-item",{attrs:{label:"报价类型"}},[n("el-select",{staticStyle:{width:"120px"},attrs:{placeholder:"请选择询报价类型"},model:{value:e.screen_data.tenderType,callback:function(t){e.$set(e.screen_data,"tenderType",t)},expression:"screen_data.tenderType"}},[n("el-option",{attrs:{label:"请选择",value:""}}),e._v(" "),n("el-option",{attrs:{label:"指定供应商",value:"0"}}),e._v(" "),n("el-option",{attrs:{label:"所有供应商",value:"1"}})],1)],1),e._v(" "),n("el-form-item",{attrs:{label:"报价标号"}},[n("el-input",{staticStyle:{width:"140px"},attrs:{placeholder:"请输入询报价标号"},model:{value:e.screen_data.tenderID,callback:function(t){e.$set(e.screen_data,"tenderID",t)},expression:"screen_data.tenderID"}})],1),e._v(" "),n("el-form-item",{attrs:{label:"模糊搜索"}},[n("el-input",{staticStyle:{width:"140px"},attrs:{placeholder:"模糊搜索"},model:{value:e.screen_data.fuzzySearch,callback:function(t){e.$set(e.screen_data,"fuzzySearch",t)},expression:"screen_data.fuzzySearch"}})],1),e._v(" "),n("el-button",{staticClass:"Fuzzy",attrs:{type:"primary",size:"mini"},on:{click:function(t){return e.handleCurrentChange("screen")}}},[e._v("搜索")]),e._v(" "),n("el-button",{staticClass:"Fuzzy",attrs:{type:"danger",size:"mini"},on:{click:e.Release}},[e._v("发布")])],1)],1),e._v(" "),n("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"},{name:"loading",rawName:"v-loading.fullscreen.lock",value:e.loading,expression:"loading",modifiers:{fullscreen:!0,lock:!0}}],staticStyle:{width:"100%"},attrs:{data:e.InquiryList,border:"",height:"415px","element-loading-text":"拼命加载中","element-loading-background":"rgba(0, 0, 0, 0.8)",size:"mini"}},[n("el-table-column",{attrs:{type:"index",align:"center",width:"50"}}),e._v(" "),n("el-table-column",{attrs:{prop:"tenderID",label:"报价编码",align:"center","min-width":"140"}}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"项目名称","min-width":"220"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.projectName))])]}}])}),e._v(" "),n("el-table-column",{attrs:{prop:"tenderingType",label:"询报价类别",align:"center","min-width":"100"}}),e._v(" "),n("el-table-column",{attrs:{prop:"temderNumber",label:"轮次",align:"center",width:"100"}}),e._v(" "),n("el-table-column",{attrs:{label:"活动时间",align:"center","min-width":"240"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.activityTime))])]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"操作","min-width":"130"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return e.examine(t)}}},[e._v("\n          修改\n        ")]),e._v(" "),n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return e.deleteAdvice(t)}}},[e._v("\n          删除\n        ")]),e._v(" "),n("el-button",{attrs:{type:"text",size:"small"},on:{click:function(n){return e.enterView(t)}}},[e._v("\n          查看\n        ")])]}}])})],1),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.InquiryList.length>0,expression:"InquiryList.length>0"}],staticClass:"page_fen"},[n("el-pagination",{attrs:{size:"mini",background:"","page-size":e.pageSize,layout:"prev, pager, next",total:e.totalNum,"current-page":e.pageIndex},on:{"current-change":e.handleCurrentChange,"update:currentPage":function(t){e.pageIndex=t},"update:current-page":function(t){e.pageIndex=t}}})],1)],1)},staticRenderFns:[]};var c=n("VU/8")(u,o,!1,function(e){n("U6h4")},"data-v-3a561485",null);t.default=c.exports}});
//# sourceMappingURL=85.af4115227e7c984aa779.js.map