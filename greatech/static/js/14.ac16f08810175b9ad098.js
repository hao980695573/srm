webpackJsonp([14,67],{"9KGw":function(e,t){},NupU:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("Dd8w"),i=r.n(a),n=r("T452"),l=r("pxwZ"),d=r("lStc"),s=r("uUlv"),u={name:"addLeivery",data:function(){var e=this;return{DeliveryShow:!1,deLiveryForm:[],addLeiveryList:{quantity:"",planTime:""},deliveryNumber:"请选择时间",avaiableDate:"",pickerOptions:{disabledDate:function(t){return""==e.avaiableDate?t.getTime()<Date.parse(e.orderOneDate)-864e5:t.getTime()<Date.parse(e.avaiableDate)}},rules:{quantity:[{validator:function(t,r,a){""===r?a(new Error("请输入数量")):/^[0-9]*[1-9][0-9]*$/.test(r)?Number(r)>e.deliveryNumber?a(new Error("排程数量大于总数量")):a():a(new Error("只能填写整数"))},required:!0,trigger:"blur"}],planTime:[{required:!0,message:"请选择日期",trigger:"change"}]}}},computed:i()({},Object(s.c)(["purchaseOrder","orderCount","productUuid","orderOneDate"]),{filterOrderCount:function(){return d.a.Remainder(this.orderCount).slice(0,10)}}),filters:{filterQuantity:function(e){if(substring,e)return d.a.Remainder(e)},filterPlanTime:function(e){if(e)return d.a.renderTime(e).slice(0,10)}},mounted:function(){this.getDelivery()},methods:{addDeliveryShow:function(){this.DeliveryShow=!0},changeDate:function(e){var t=this;this.$refs.addLeiveryList.clearValidate("quantity");var r={purchaseOrder:this.purchaseOrder,uuid:this.productUuid,createDate:e};l.a.post(n.a.api,"/delivery/getMaxDeliveryCount.do",r).then(function(e){0==e.status&&(e.data>0?t.deliveryNumber=e.data:t.deliveryNumber="0.00")})},addSure:function(){var e=this;this.$refs.addLeiveryList.validate(function(t){if(t){var r={quantity:e.addLeiveryList.quantity,planTime:e.addLeiveryList.planTime,purchaseOrder:e.purchaseOrder,orderCount:e.orderCount,productUuid:e.productUuid};l.a.post(n.a.api,"/delivery/saveDeliveryPlan.do",r).then(function(t){0==t.status&&e.$alert(t.msg,{confirmButtonText:"确定",center:!0,callback:function(t){e.deliveryNumber="请选择时间",e.$refs.addLeiveryList.resetFields(),e.DeliveryShow=!1,e.getDelivery()}})})}})},getDelivery:function(){var e=this,t={uuid:this.productUuid,purchaseOrder:this.purchaseOrder};l.a.post(n.a.api,"/delivery/getDeliveryPlanList.do",t).then(function(t){0==t.status&&(e.deLiveryForm=t.data,t.data.length>0&&(e.avaiableDate=d.a.renderTime(t.data[t.data.length-1].planTime).slice(0,10)))})}}},o={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{staticClass:"contacTitleWarp",staticStyle:{"margin-top":"20px"}},[r("div",{staticClass:"contacTitle"},[e._v("送货排程")]),e._v(" "),r("div",{staticClass:"contacTitleButton"},[r("el-button",{attrs:{type:"primary",size:"mini",disabled:""==e.orderOneDate},on:{click:e.addDeliveryShow}},[e._v("新增")])],1)]),e._v(" "),r("el-table",{staticStyle:{width:"100%","margin-bottom":"20px"},attrs:{data:e.deLiveryForm,border:"",height:"400px",size:"mini","show-summary":""}},[r("el-table-column",{attrs:{type:"index",align:"center",width:"50"}}),e._v(" "),r("el-table-column",{attrs:{prop:"quantity",label:"数量",align:"center","min-width":"140"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(e._f("filterQuantity")(t.row.quantity)))])]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"日期",align:"center","min-width":"130"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(e._f("filterPlanTime")(t.row.planTime)))])]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"操作",align:"center",width:"130"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{type:"text",size:"small"}},[e._v("\n          申请调整\n        ")])]}}])})],1),e._v(" "),r("el-dialog",{attrs:{title:"新增送货排程",visible:e.DeliveryShow,width:"600px"},on:{"update:visible":function(t){e.DeliveryShow=t}}},[r("el-form",{ref:"addLeiveryList",attrs:{model:e.addLeiveryList,rules:e.rules,size:"mini"}},[r("el-form-item",{attrs:{label:"需求总数量"}},[r("el-input",{attrs:{placeholder:"无数据",disabled:""},model:{value:e.filterOrderCount,callback:function(t){e.filterOrderCount=t},expression:"filterOrderCount"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"可排程数量"}},[r("el-input",{attrs:{placeholder:"请选择时间",disabled:""},model:{value:e.deliveryNumber,callback:function(t){e.deliveryNumber=t},expression:"deliveryNumber"}})],1),e._v(" "),r("el-row",[r("el-col",{attrs:{span:10}},[r("el-form-item",{attrs:{label:"数量",prop:"quantity"}},[r("el-input",{attrs:{placeholder:"请输入数量",disabled:"0.00"==e.deliveryNumber||"请选择时间"==e.deliveryNumber},model:{value:e.addLeiveryList.quantity,callback:function(t){e.$set(e.addLeiveryList,"quantity",t)},expression:"addLeiveryList.quantity"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:10,offset:4}},[r("el-form-item",{attrs:{label:"时间",prop:"planTime"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date","value-format":"yyyy-MM-dd","picker-options":e.pickerOptions,placeholder:"选择日期"},on:{change:e.changeDate},model:{value:e.addLeiveryList.planTime,callback:function(t){e.$set(e.addLeiveryList,"planTime",t)},expression:"addLeiveryList.planTime"}})],1)],1)],1)],1),e._v(" "),r("div",{staticClass:"bth"},[r("el-button",{attrs:{type:"primary",size:"mini",disabled:"0.00"==e.deliveryNumber||"请选择时间"==e.deliveryNumber},on:{click:e.addSure}},[e._v("确定")])],1)],1)],1)},staticRenderFns:[]};var c=r("VU/8")(u,o,!1,function(e){r("lxeM")},"data-v-5e936d64",null);t.default=c.exports},Q4HI:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=r("Dd8w"),i=r.n(a),n=r("T452"),l=r("pxwZ"),d=r("lStc"),s=r("NupU"),u=r("uUlv"),o={name:"addOrderScheduling",data:function(){var e=this;return{orderShow:!1,form:[],addOrderList:{quantity:"",planTime:""},totalNumber:0,ContinueNumber:0,avaiableDate:"",pickerOptions:{disabledDate:function(t){return t.getTime()<Date.parse(e.avaiableDate)}},rules:{quantity:[{validator:function(t,r,a){""===r?a(new Error("请输入数量")):/^[0-9]*[1-9][0-9]*$/.test(r)?Number(r)>e.ContinueNumber?a(new Error("排程数量大于总数量")):a():a(new Error("只能填写整数"))},required:!0,trigger:"blur"}],planTime:[{required:!0,message:"请选择日期",trigger:"change"}]}}},computed:i()({},Object(u.c)(["purchaseOrder","orderCount","productUuid"]),{filterOrderCount:function(){return d.a.Remainder(this.orderCount).slice(0,10)}}),mounted:function(){this.getList()},filters:{filterQuantity:function(e){if(e)return d.a.Remainder(e)},filterPlanTime:function(e){if(e)return d.a.renderTime(e).slice(0,10)}},methods:i()({},Object(u.b)(["changeOrderOneDate"]),{addShow:function(){this.orderShow=!0},getList:function(){var e=this,t={uuid:this.productUuid,purchaseOrder:this.purchaseOrder};l.a.post(n.a.api,"/procurement/getOrderAllPlan.do",t).then(function(t){if(0==t.status){e.form=t.data;var r=e;r.totalNumber=0,r.ContinueNumber=0,t.data.map(function(e){r.totalNumber+=Number(e.quantity)}),r.totalNumber=d.a.Remainder(r.totalNumber),r.ContinueNumber=d.a.Remainder(d.a.Remainder(e.orderCount)-r.totalNumber),e.changeOrderOneDate(""),t.data[0]&&e.changeOrderOneDate(d.a.renderTime(t.data[0].planTime).slice(0,10)),t.data.length>0&&(e.avaiableDate=d.a.renderTime(t.data[t.data.length-1].planTime).slice(0,10))}})},addSure:function(){var e=this;this.$refs.addOrderList.validate(function(t){if(t){var r={quantity:e.addOrderList.quantity,planTime:e.addOrderList.planTime,purchaseOrder:e.purchaseOrder,orderCount:e.orderCount,productUuid:e.productUuid};l.a.post(n.a.api,"/procurement/saveOrderPlan.do",r).then(function(t){0==t.status&&e.$alert(t.msg,{confirmButtonText:"确定",center:!0,callback:function(t){e.$refs.addOrderList.resetFields(),e.orderShow=!1,e.getList()}})})}})}}),components:{addLeivery:s.default}},c={render:function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("div",{staticClass:"navWrp"},[r("el-breadcrumb",[r("el-breadcrumb-item",{attrs:{to:{path:"/purchase/viewPurchase"}}},[e._v("采购订单详情")]),e._v(" "),r("el-breadcrumb-item",[e._v("排程详细")])],1)],1),e._v(" "),r("div",{staticClass:"contacTitleWarp"},[r("div",{staticClass:"contacTitle"},[e._v("订单排程")]),e._v(" "),r("div",{staticClass:"contacTitleButton"},[r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:e.addShow}},[e._v("新增")])],1)]),e._v(" "),r("el-table",{staticStyle:{width:"100%"},attrs:{data:e.form,border:"",height:"400px",size:"mini","show-summary":""}},[r("el-table-column",{attrs:{type:"index",align:"center",width:"50"}}),e._v(" "),r("el-table-column",{attrs:{prop:"quantity",label:"数量",align:"center","min-width":"140"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(e._f("filterQuantity")(t.row.quantity)))])]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"日期",align:"center","min-width":"130"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("span",[e._v(e._s(e._f("filterPlanTime")(t.row.planTime)))])]}}])}),e._v(" "),r("el-table-column",{attrs:{label:"操作",align:"center",width:"130"},scopedSlots:e._u([{key:"default",fn:function(t){return[r("el-button",{attrs:{type:"text",size:"small"}},[e._v("\n          申请调整\n        ")])]}}])})],1),e._v(" "),r("el-dialog",{attrs:{title:"新增订单排程",visible:e.orderShow,width:"600px"},on:{"update:visible":function(t){e.orderShow=t}}},[r("el-form",{ref:"addOrderList",attrs:{model:e.addOrderList,rules:e.rules,size:"mini"}},[r("el-form-item",{attrs:{label:"需求总数量"}},[r("el-input",{attrs:{placeholder:"无数据",disabled:""},model:{value:e.filterOrderCount,callback:function(t){e.filterOrderCount=t},expression:"filterOrderCount"}})],1),e._v(" "),r("el-form-item",{attrs:{label:"可排程数量"}},[r("el-input",{attrs:{placeholder:"无数据",disabled:""},model:{value:e.ContinueNumber,callback:function(t){e.ContinueNumber=t},expression:"ContinueNumber"}})],1),e._v(" "),r("el-row",[r("el-col",{attrs:{span:10}},[r("el-form-item",{attrs:{label:"数量",prop:"quantity"}},[r("el-input",{attrs:{placeholder:"请输入数量",disabled:"0.00"==e.ContinueNumber},model:{value:e.addOrderList.quantity,callback:function(t){e.$set(e.addOrderList,"quantity",t)},expression:"addOrderList.quantity"}})],1)],1),e._v(" "),r("el-col",{attrs:{span:10,offset:4}},[r("el-form-item",{attrs:{label:"时间",prop:"planTime"}},[r("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date","value-format":"yyyy-MM-dd",disabled:"0.00"==e.ContinueNumber,"picker-options":e.pickerOptions,placeholder:"选择日期"},model:{value:e.addOrderList.planTime,callback:function(t){e.$set(e.addOrderList,"planTime",t)},expression:"addOrderList.planTime"}})],1)],1)],1)],1),e._v(" "),r("div",{staticClass:"bth"},[r("el-button",{attrs:{type:"primary",size:"mini",disabled:"0.00"==e.ContinueNumber},on:{click:e.addSure}},[e._v("确定")])],1)],1),e._v(" "),r("addLeivery")],1)},staticRenderFns:[]};var m=r("VU/8")(o,c,!1,function(e){r("9KGw")},"data-v-edddec98",null);t.default=m.exports},lxeM:function(e,t){}});
//# sourceMappingURL=14.ac16f08810175b9ad098.js.map