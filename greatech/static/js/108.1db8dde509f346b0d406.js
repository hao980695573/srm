webpackJsonp([108],{XosW:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("Dd8w"),n=a.n(r),i=a("T452"),l=a("pxwZ"),o=a("lStc"),s=a("uUlv"),u={name:"inspectRmProduct",data:function(){return{screen_data:{rmNumber:""},form:{},arrivalDate:"",tableData:[],CountState:!0,entryEumber:"",submitState:!0,fullscreenLoading:!1}},computed:n()({},Object(s.c)(["username"])),filters:{filtersCount:function(e){return o.a.Remainder(e)},filtersDate:function(e){if(e)return o.a.renderTime(e).slice(0,10)},filterIsGift:function(e){return"0"==e?"否":"是"}},methods:{getList:function(){var e=this,t={rmNumber:this.screen_data.rmNumber};l.a.post(i.a.api,"/replenishment/getRmProductDetailByNumber.do",t).then(function(t){0==t.status?null==t.data?(e.form={},e.arrivalDate="",e.tableData=[]):(e.form=t.data,"11484"==e.username&&t.data.rmProductList.map(function(e){e.wh="S06"}),"00042"==e.username&&t.data.rmProductList.map(function(e){e.wh="S05"}),e.tableData=t.data.rmProductList,e.arrivalDate=o.a.getToday("-"),t.data.rmProductList.map(function(e){e.count=e.quantity})):e.$alert(data.msg,{confirmButtonText:"确定",center:!0})})},saveBth:function(){var e=this;if(this.submitState){this.submitState=!1,this.fullscreenLoading=!0;for(var t=0;t<this.tableData.length;t++){if(this.tableData[t].count>this.tableData[t].quantity){this.CountState=!1;break}this.CountState=!0}if(this.CountState){var a=[];this.tableData.map(function(e){a.push({purchaseDate:e.createDate,bilNo:e.purchaseOrder,prdNo:e.productNumber,prdName:e.productName,unit:e.unit,qty:e.count,freeId:!1,prdMark:e.characteristics,itm:e.item,wh:e.wh,shNoCus:e.rmNumber,osNo:e.purchaseOrder,estItem:e.estItem,serialNumber:e.serialNumber})});var r={tiDd:new Date(this.arrivalDate+" 00:00:00"),receivingUnit:this.form.receivingUnit,currency:this.form.currency,useOfDepartmentName:this.form.useOfDepartmentName,deliveryNumber:this.form.rmNumber,erpno:this.form.erpno,remark:this.form.remark,tfTiList:a,cusNo:this.form.erpno};l.a.post(i.a.api,"/replenishment/inspectRmProduct.do",r).then(function(t){(e.submitState=!0,e.fullscreenLoading=!1,0==t.status)?e.$alert("保存成功",{confirmButtonText:"确定",center:!0,callback:function(a){e.form={},e.arrivalDate="",e.screen_data.rmNumber="",e.tableData=[],e.entryEumber=t.data.tiNo}}):e.$alert(t.msg,{confirmButtonText:"确定",center:!0})})}}}}},c={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"inquiry_warp"},[a("el-form",{ref:"screen_data",attrs:{model:e.screen_data,"label-width":"80px",inline:!0,size:"mini"}},[a("el-form-item",{attrs:{label:"补货单号"}},[a("el-input",{attrs:{placeholder:"请输入送货单号"},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.getList(t)}},model:{value:e.screen_data.rmNumber,callback:function(t){e.$set(e.screen_data,"rmNumber",t)},expression:"screen_data.rmNumber"}})],1),e._v(" "),a("el-form-item",[a("el-button",{staticClass:"Fuzzy",attrs:{type:"primary"},on:{click:e.getList}},[e._v("搜索")])],1),e._v(" "),a("el-form-item",{attrs:{label:"送检单号"}},[a("el-input",{attrs:{placeholder:"空",readonly:""},model:{value:e.entryEumber,callback:function(t){e.entryEumber=t},expression:"entryEumber"}})],1)],1)],1),e._v(" "),a("div",{staticClass:"baseWarp"},[a("div",{staticClass:"headerWarp"},[a("el-form",{ref:"form",attrs:{model:e.form,"label-width":"80px",size:"mini","label-position":"right",inline:!0}},[a("el-form-item",{attrs:{label:"补货日期"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{type:"date",readonly:"",placeholder:"选择日期"},model:{value:e.form.createDate,callback:function(t){e.$set(e.form,"createDate",t)},expression:"form.createDate"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"到货日期"}},[a("el-date-picker",{staticStyle:{width:"100%"},attrs:{"value-format":"yyyy-MM-dd",type:"date",placeholder:"选择日期"},model:{value:e.arrivalDate,callback:function(t){e.arrivalDate=t},expression:"arrivalDate"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"收货单位"}},[a("el-input",{staticStyle:{width:"190px"},attrs:{readonly:""},model:{value:e.form.receivingUnit,callback:function(t){e.$set(e.form,"receivingUnit",t)},expression:"form.receivingUnit"}})],1),e._v(" "),a("el-form-item",{attrs:{label:"供货商"}},[a("el-input",{staticStyle:{width:"190px"},attrs:{readonly:""},model:{value:e.form.supplierName,callback:function(t){e.$set(e.form,"supplierName",t)},expression:"form.supplierName"}})],1),e._v(" "),a("div",[a("el-form-item",{attrs:{label:"备注"}},[a("el-input",{staticStyle:{width:"470px"},attrs:{type:"textarea",rows:2,placeholder:"请输入内容",resize:"none"},model:{value:e.form.remark,callback:function(t){e.$set(e.form,"remark",t)},expression:"form.remark"}})],1)],1)],1)],1)]),e._v(" "),a("el-table",{directives:[{name:"loading",rawName:"v-loading.fullscreen.lock",value:e.fullscreenLoading,expression:"fullscreenLoading",modifiers:{fullscreen:!0,lock:!0}}],staticStyle:{width:"100%"},attrs:{data:e.tableData,border:"","element-loading-background":"rgba(0, 0, 0, 0.8)",height:"415",size:"mini"}},[a("el-table-column",{attrs:{align:"center",type:"index",width:"55"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"补货日期","show-overflow-tooltip":"",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("filtersDate")(t.row.createDate)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"补货单号",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.psNo))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"productNumber",label:"品号",width:"120"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",prop:"productName",label:"品名","min-width":"170"}}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"单位",width:"70"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(t.row.unit))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"仓位",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("input",{directives:[{name:"model",rawName:"v-model",value:t.row.wh,expression:"scope.row.wh"}],staticStyle:{width:"100%","line-height":"20px","padding-left":"5px","box-sizing":"border-box",outline:"none"},attrs:{type:"text"},domProps:{value:t.row.wh},on:{input:function(a){a.target.composing||e.$set(t.row,"wh",a.target.value)}}})]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"送货数量",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v(e._s(e._f("filtersCount")(t.row.quantity)))])]}}])}),e._v(" "),a("el-table-column",{attrs:{align:"center",label:"收货数量","show-overflow-tooltip":"",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("input",{directives:[{name:"model",rawName:"v-model",value:t.row.count,expression:"scope.row.count"}],staticStyle:{width:"100%","line-height":"20px","padding-left":"5px","box-sizing":"border-box",outline:"none"},attrs:{type:"text"},domProps:{value:t.row.count},on:{input:function(a){a.target.composing||e.$set(t.row,"count",a.target.value)}}}),e._v(" "),a("div",{directives:[{name:"show",rawName:"v-show",value:t.row.count>t.row.quantity,expression:"scope.row.count>scope.row.quantity"}],staticStyle:{"font-size":"9px",color:"red"}},[e._v("收货数大于送货数")])]}}])})],1),e._v(" "),a("div",{staticClass:"save"},[a("el-button",{attrs:{type:"primary",size:"small",disabled:"0"==e.tableData.length},on:{click:e.saveBth}},[e._v("保存")])],1)],1)},staticRenderFns:[]};var m=a("VU/8")(u,c,!1,function(e){a("doeW")},"data-v-17a76df3",null);t.default=m.exports},doeW:function(e,t){}});
//# sourceMappingURL=108.1db8dde509f346b0d406.js.map