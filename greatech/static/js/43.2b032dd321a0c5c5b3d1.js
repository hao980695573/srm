webpackJsonp([43],{qBQW:function(e,t){},rCGA:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("Dd8w"),l=r.n(a),n=r("T452"),o=r("pxwZ"),i=r("lStc"),s=r("uUlv"),u={name:"viewPurchase",data:function(){return{loading:!1,form:{purchaseDate:"",purchaseOrder:"",supplierName:"",purchaseUserName:"",useOfDepartmentName:"",orderProductList:[{purchaseDate:"2019-12-21",purchaseOrder:"PO19051321",supplierName:"东莞市广正模具塑胶有限公司",productNumber:"PO19051321",productName:"基本防尘网自带背胶",specification:"大大所多撒大所多撒大多多大多阿阿斯达撒多斯达",count:"112221",unit:"阿达啊",price:"112",status:"已完成"}]}}},computed:l()({},Object(s.c)(["uuid"])),mounted:function(){this.getList()},filters:{filterPrice:function(e){if(e)return i.a.Remainder(e)},filterCount:function(e){if(e)return i.a.Remainder(e)},filtertotalAmount:function(e){if(e)return i.a.Remainder(e)}},methods:l()({},Object(s.b)(["changePurchaseOrder","changeProductUuid","changeOrderCount"]),{getList:function(){var e=this,t={uuid:this.uuid};o.a.post(n.a.api,"/procurement/getOrderDetail.do",t).then(function(t){0==t.status&&(e.form=t.data)})},enterScheduling:function(e){this.changePurchaseOrder(this.form.purchaseOrder),this.changeProductUuid(e.row.uuid),this.changeOrderCount(e.row.count),this.$router.push("addOrderScheduling")}})},c={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{staticClass:"baseWarp"},[r("div",{staticClass:"headerWarp"},[r("el-form",{ref:"form",attrs:{model:e.form,"label-width":"80px",size:"mini","label-position":"right"}},[r("el-row",[r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"采购日期"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",placeholder:"选择日期"},model:{value:e.form.purchaseDate,callback:function(t){e.$set(e.form,"purchaseDate",t)},expression:"form.purchaseDate"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"采购单号"}},[r("el-input",{model:{value:e.form.purchaseOrder,callback:function(t){e.$set(e.form,"purchaseOrder",t)},expression:"form.purchaseOrder"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"供货商"}},[r("el-input",{model:{value:e.form.supplierName,callback:function(t){e.$set(e.form,"supplierName",t)},expression:"form.supplierName"}})],1)],1)],1),e._v(" "),r("el-row",[r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"采购员"}},[r("el-input",{model:{value:e.form.purchaseUserName,callback:function(t){e.$set(e.form,"purchaseUserName",t)},expression:"form.purchaseUserName"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:8}},[r("el-form-item",{attrs:{label:"使用部门"}},[r("el-input",{model:{value:e.form.useOfDepartmentName,callback:function(t){e.$set(e.form,"useOfDepartmentName",t)},expression:"form.useOfDepartmentName"}})],1)],1)],1)],1)],1)]),e._v(" "),r("el-table",{staticStyle:{width:"100%"},attrs:{data:e.form.orderProductList,border:"",size:"mini",height:"610"}},[r("el-table-column",{attrs:{type:"index",align:"center",width:"50"}}),e._v(" "),r("el-table-column",{attrs:{prop:"productName",label:"品名",align:"center","show-overflow-tooltip":"","min-width":"100"}}),e._v(" "),r("el-table-column",{attrs:{prop:"productNumber",label:"品号",align:"center","show-overflow-tooltip":"","min-width":"80"}}),e._v(" "),r("el-table-column",{attrs:{label:"单价",align:"center",width:"130"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(e._f("filterPrice")(t.row.price)))])]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"summary",label:"摘要",align:"center","show-overflow-tooltip":"","min-width":"100"}}),e._v(" "),r("el-table-column",{attrs:{label:"数量",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(e._f("filterCount")(t.row.count)))])]}}])}),e._v(" "),r("el-table-column",{attrs:{prop:"unit",label:"单位",align:"center",width:"80"}}),e._v(" "),r("el-table-column",{attrs:{prop:"specification",label:"规格",align:"center","show-overflow-tooltip":"",width:"130"}}),e._v(" "),r("el-table-column",{attrs:{label:"总价",align:"center",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(e._f("filtertotalAmount")(t.row.totalAmount)))])]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"操作",align:"center",width:"70"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(r){return e.enterScheduling(t)}}},[e._v("\n          排程\n        ")])]}}])})],1)],1)},staticRenderFns:[]};var p=r("VU/8")(u,c,!1,function(e){r("qBQW")},"data-v-90ae81f0",null);t.default=p.exports}});
//# sourceMappingURL=43.2b032dd321a0c5c5b3d1.js.map