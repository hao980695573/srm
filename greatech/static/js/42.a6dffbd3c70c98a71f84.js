webpackJsonp([42],{t9ic:function(e,t){},"wm+n":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=a("Dd8w"),r=a.n(l),n=a("uUlv"),i=a("T452"),o=a("pxwZ"),s={name:"quoteReply",data:function(){return{header:{Authorization:localStorage.getItem("token")},path:i.a.api+"/replymanagement/upFile.do?fileType=other.path",activeName:"first",BiddingTime:[],form:{},headerDate:{sparepartsName:"",company:"",productNumber:"",accessoriesSize:"",valuation:"",modelNumber:"",materialCost:"",colour:"",untaxedPrice:"",unitPrice:"",moldFee:"",loss:"",sparePart:"",packingMethod:"",totalAmount:"",steppedPrice0End50:"",steppedPrice50End100:"",steppedPrice100End200:"",steppedPrice200End300:"",steppedPrice300End500:""},contentsShen:[],ReplyData:{otherreply:""}}},computed:r()({},Object(n.c)(["uuid"])),mounted:function(){this.getViewData()},methods:{getViewData:function(){var e=this,t={uuid:this.uuid};o.a.post(i.a.api,"/offermanagement/getInformationList.do",t).then(function(t){0==t.status&&(e.form=t.data,e.BiddingTime.push(t.data.startTime,t.data.endTime),e.headerDate=t.data.replyQuotation,e.contentsShen=t.data.inquiryList)})},hlandSave:function(){var e=this,t={offeruuid:this.uuid,inquiryList:this.contentsShen,otherreply:this.ReplyData.otherreply};o.a.post(i.a.api,"/replymanagement/replyManagementInsert.do",t).then(function(t){0==t.status?e.$alert(t.msg,{confirmButtonText:"确定",center:!0,callback:function(t){e.$router.push("Bidding")}}):e.$alert(t.msg,{confirmButtonText:"确定",center:!0})})},otherFileChange:function(e){var t=this;0==e.status?e.data.map(function(e,a){t.contentsShen.push({modelNumber:e.modelNumber,sparepartsName:e.sparepartsName,accessoriesSize:e.accessoriesSize,valuation:e.valuation,materialCost:e.materialCost,colour:e.colour,productNumber:e.productNumber,company:e.company,untaxedPrice:e.untaxedPrice,unitPrice:e.unitPrice,moldFee:e.moldFee,loss:e.loss,sparePart:e.sparePart,packingMethod:e.packingMethod,steppedPrice0End50:e.steppedPrice0End50,steppedPrice50End100:e.steppedPrice50End100,steppedPrice100End200:e.steppedPrice100End200,steppedPrice200End300:e.steppedPrice200End300,steppedPrice300End500:e.steppedPrice300End500,totalAmount:e.productNumber*e.untaxedPrice})}):this.$alert(e.msg,{confirmButtonText:"确定",center:!0,callback:function(e){t.$refs.upload.clearFiles()}})},deleteAdvice:function(e){this.contentsShen.splice(e.$index,1)},onekeyClearance:function(){this.contentsShen=[]},handleExceed:function(e,t){this.$message.warning("当前限制选择 1 个文件，已选择了 "+e.length+" 个文件")},downloadFiles:function(){var e={uuid:this.uuid};o.a.getFile(i.a.noNeedLogionApi,"skip/exportTemplate.do",e).then(function(e){var t=document.createElement("a");t.href=window.URL.createObjectURL(new Blob([e])),t.target="_blank",t.download="询报价上传模板.xls",document.body.appendChild(t),t.click(),document.body.removeChild(t)})}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("el-tabs",{model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{label:"基础信息",name:"first"}},[a("div",[a("div",{staticClass:"contacTitleWarp"},[a("div",{staticClass:"contacTitle"},[e._v("询报价基础信息")])]),e._v(" "),a("div",{staticClass:"inquiry_warp"},[a("el-form",{attrs:{model:e.form,"label-width":"100px",size:"mini"}},[a("el-form-item",{attrs:{label:"询报价类型"}},[a("el-select",{attrs:{placeholder:"请选择询报价类型",disabled:""},model:{value:e.form.tenderType,callback:function(t){e.$set(e.form,"tenderType",t)},expression:"form.tenderType"}},[a("el-option",{attrs:{label:"指定供应商",value:"0"}}),e._v(" "),a("el-option",{attrs:{label:"所有供应商",value:"1"}})],1)],1),e._v(" "),a("el-form-item",{attrs:{label:"询报价编号"}},[a("el-input",{attrs:{readonly:!0},model:{value:e.form.tenderID,callback:function(t){e.$set(e.form,"tenderID",t)},expression:"form.tenderID"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"项目名称"}},[a("el-input",{attrs:{readonly:!0},model:{value:e.form.projectName,callback:function(t){e.$set(e.form,"projectName",t)},expression:"form.projectName"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"询报价轮数"}},[a("el-input",{attrs:{readonly:!0},model:{value:e.form.temderNumber,callback:function(t){e.$set(e.form,"temderNumber",t)},expression:"form.temderNumber"}},[a("template",{slot:"append"},[e._v("次")])],2)],1),e._v(" "),a("el-form-item",{attrs:{label:"活动时间"}},[a("el-date-picker",{attrs:{type:"datetimerange","range-separator":"至","start-placeholder":"开始日期","end-placeholder":"结束日期","value-format":"yyyy-MM-dd HH:mm:ss",format:"yyyy-MM-dd HH:mm:ss",readonly:""},model:{value:e.BiddingTime,callback:function(t){e.BiddingTime=t},expression:"BiddingTime"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"其他需求"}},[a("el-input",{attrs:{type:"textarea",rows:6,placeholder:"无",resize:"none",readonly:!0},model:{value:e.form.otherrequirment,callback:function(t){e.$set(e.form,"otherrequirment",t)},expression:"form.otherrequirment"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"BOM文件"}},[a("a",{attrs:{href:e.form.enclosure,download:"",target:"_blank"}},[a("el-button",{attrs:{type:"primary",size:"mini"}},[e._v("查看")])],1)])],1)],1),e._v(" "),a("div",{staticClass:"contacTitleWarp"},[a("div",{staticClass:"contacTitle"},[e._v("联系方式")])]),e._v(" "),a("div",{staticClass:"contacTinformation"},[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.form.contactList,border:"",size:"mini"}},[a("el-table-column",{attrs:{type:"index",align:"center",width:"50"}}),e._v(" "),a("el-table-column",{attrs:{prop:"contactDept",label:"部门",align:"center",width:"220"}}),e._v(" "),a("el-table-column",{attrs:{prop:"contactName",label:"姓名",align:"center","min-width":"220"}}),e._v(" "),a("el-table-column",{attrs:{prop:"contactPosition",label:"职位",align:"center","min-width":"220"}}),e._v(" "),a("el-table-column",{attrs:{prop:"contactPhone",label:"手机",align:"center","min-width":"220"}}),e._v(" "),a("el-table-column",{attrs:{prop:"contactMailbox",label:"邮箱",align:"center","min-width":"220"}})],1)],1)])]),e._v(" "),a("el-tab-pane",{attrs:{label:"询报价内容",name:"second"}},[a("div",{staticClass:"contacTitleWarp"},[a("div",{staticClass:"contacTitle"},[e._v("商品组成部分")]),e._v(" "),a("div",{staticClass:"contacTitleButton"},[a("el-button",{attrs:{size:"mini",type:"success"},on:{click:e.downloadFiles}},[e._v("下载模板")]),e._v(" "),a("el-button",{attrs:{type:"danger",size:"mini"},on:{click:e.onekeyClearance}},[e._v("一键清空")])],1)]),e._v(" "),a("el-table",{attrs:{data:e.contentsShen,align:"center",border:"",size:"mini",height:"345"}},[a("el-table-column",{attrs:{prop:"modelNumber",label:e.headerDate.modelNumber,"min-width":"120",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"sparepartsName",label:e.headerDate.sparepartsName,width:"120",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"accessoriesSize",label:e.headerDate.accessoriesSize,width:"200",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"valuation",label:e.headerDate.valuation,width:"130",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"materialCost",label:e.headerDate.materialCost,width:"150",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"colour",label:e.headerDate.colour,width:"100%",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"productNumber",label:e.headerDate.productNumber,width:"120",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"company",label:e.headerDate.company,width:"150",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"untaxedPrice",label:e.headerDate.untaxedPrice,width:"150",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"unitPrice",label:e.headerDate.unitPrice,width:"80",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"moldFee",label:e.headerDate.moldFee,width:"100",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"loss",label:e.headerDate.loss,width:"100",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"sparePart",label:e.headerDate.sparePart,width:"100",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"packingMethod",label:e.headerDate.packingMethod,width:"100",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"steppedPrice0End50",label:e.headerDate.steppedPrice0End50,width:"150",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"steppedPrice50End100",label:e.headerDate.steppedPrice50End100,width:"150",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"steppedPrice100End200",label:e.headerDate.steppedPrice100End200,width:"150",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"steppedPrice200End300",label:e.headerDate.steppedPrice200End300,width:"150",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{prop:"steppedPrice300End500",label:e.headerDate.steppedPrice300End500,width:"150",align:"center"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"操作",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return e.deleteAdvice(t)}}},[e._v("\n              删除\n            ")])]}}])})],1),e._v(" "),a("div",[a("el-upload",{ref:"upload",staticClass:"upload-demo",attrs:{multiple:!1,limit:1,action:e.path,"on-success":e.otherFileChange,headers:e.header,"on-exceed":e.handleExceed}},[a("el-button",{staticStyle:{"margin-top":"10px",width:"100px"},attrs:{size:"small",type:"primary"}},[e._v("上传")])],1)],1),e._v(" "),a("div",{staticClass:"contacTitleWarp"},[a("div",{staticClass:"contacTitle"},[e._v("供应商回复内容")])]),e._v(" "),a("div",{staticClass:"inquiry_warp"},[a("el-form",{ref:"ReplyData",attrs:{model:e.ReplyData,"label-width":"80px","label-position":"top",size:"mini"}},[a("el-form-item",[a("el-input",{attrs:{type:"textarea",rows:6,placeholder:"请输入回复内容",resize:"none"},model:{value:e.ReplyData.otherreply,callback:function(t){e.$set(e.ReplyData,"otherreply",t)},expression:"ReplyData.otherreply"}})],1)],1),e._v(" "),a("div",{staticClass:"queding"},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.hlandSave}},[e._v("保存")])],1)],1)],1)],1)],1)},staticRenderFns:[]};var d=a("VU/8")(s,c,!1,function(e){a("t9ic")},"data-v-97d8286a",null);t.default=d.exports}});
//# sourceMappingURL=42.a6dffbd3c70c98a71f84.js.map