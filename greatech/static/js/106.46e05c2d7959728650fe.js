webpackJsonp([106],{"6fnR":function(t,a){},N4x4:function(t,a,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=s("Dd8w"),i=s.n(e),r=s("T452"),d=s("pxwZ"),n=s("uUlv"),o=s("lStc"),_=s("4HuK"),c={name:"middleCodePrint",data:function(){return{printMargin:"printMargin",barCodeList:[],remarkFalse:!1,remarkTrue:!0}},filters:{filterDate:function(t){if(t)return o.a.renderTime(t).slice(0,10)}},computed:i()({},Object(n.c)(["uuid","barcodeCategory"])),mounted:function(){this.getList(),setTimeout(function(){o.a.Font_Max("guige",20),o.a.Font_Max("pinming",24)},700)},methods:{getList:function(){var t=this,a={uuid:this.uuid,type:this.barcodeCategory};d.a.post(r.a.api,"/barcode/getBarcodeDetailList.do",a).then(function(a){if(0==a.status)return t.barCodeList=a.data,t.barCodeList.length<=0?1:t.barCodeList.length})},printPdf:function(){var t=this,a={uuid:this.barCodeList[0].biUuid,type:this.barcodeCategory};d.a.post(r.a.api,"/barcode/updateBarcodeStatus.do",a).then(function(a){if(0==a.status){var s=t;s.remarkTrue=!1,s.remarkFalse=!0,setTimeout(function(){LODOP=Object(_.a)();var t="<head><link href='../../../static/styles/MiddlePrint.css' type='text/css' rel='stylesheet'></head><body>"+document.getElementById("Printing").innerHTML+"</body>";LODOP.ADD_PRINT_HTM("5mm","8mm","RightMargin:5cm","1200",t),LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT","Auto-Width"),LODOP.SET_PRINT_MODE("RESELECT_PAGESIZE",!0),LODOP.PREVIEW()},500)}else t.$alert(a.msg,{confirmButtonText:"确定",center:!0})})}}},l={render:function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("div",{staticClass:"barCodeWarp"},[s("div",{attrs:{id:"Printing"}},t._l(t.barCodeList,function(a,e){return s("div",{key:e,staticClass:"a",class:t.printMargin},[s("div",{staticClass:"tab_company_out"},[s("table",{attrs:{cellpadding:"0",cellspacing:"0"}},[s("tr",[t._m(0,!0),t._v(" "),s("td",{staticClass:"imgWarp"},[s("img",{staticClass:"img_code",attrs:{src:t.barCodeList[e].filePath}})])]),t._v(" "),s("tr",[s("td",{staticClass:"td_width"},[t._v("二维码")]),t._v(" "),s("td",{attrs:{colspan:"2"}},[t._v(t._s(t.barCodeList[e].barcodeNumber))]),t._v(" "),s("td",{attrs:{colspan:"2"}},["0"==t.barCodeList[e].type?s("span",[t._v("外箱码")]):s("span",[t._v("内箱码")]),s("span",{directives:[{name:"show",rawName:"v-show",value:"1"==t.barCodeList[e].isTailbox,expression:'barCodeList[index].isTailbox=="1"'}]},[t._v(" / 尾箱")])])]),t._v(" "),s("tr",[s("td",{staticClass:"td_width"},[t._v("供应商")]),t._v(" "),s("td",{attrs:{colspan:"4"}},[t._v(t._s(t.barCodeList[e].supplierName))])]),t._v(" "),s("tr",[s("td",{staticClass:"td_width"},[t._v("品名")]),t._v(" "),s("td",{staticClass:"pinming",attrs:{colspan:"4"}},[t._v(t._s(t.barCodeList[e].productName))])]),t._v(" "),s("tr",[s("td",{staticClass:"td_width"},[t._v("规格")]),t._v(" "),s("td",{staticClass:"guige",attrs:{colspan:"4"}},[t._v(t._s(t.barCodeList[e].specification))])]),t._v(" "),s("tr",[s("td",{staticClass:"td_width"},[t._v("料号")]),t._v(" "),s("td",{staticClass:"liaohao"},[t._v(t._s(t.barCodeList[e].productNumber))]),t._v(" "),s("td",{staticClass:"td_width"},[t._v("订单")]),t._v(" "),s("td",{attrs:{colspan:"3"}},[t._v(t._s(t.barCodeList[e].purchaseOrder))])]),t._v(" "),s("tr",[s("td",{staticClass:"td_width"},[t._v("数量/单位")]),t._v(" "),s("td",{staticClass:"shuliangdanwei"},[t._v(t._s(t.barCodeList[e].count)+" / "+t._s(t.barCodeList[e].unit))]),t._v(" "),s("td",{staticClass:"td_width"},[t._v("日期")]),t._v(" "),s("td",{attrs:{colspan:"2"}},[t._v(t._s(t._f("filterDate")(t.barCodeList[e].issuanceDate)))])]),t._v(" "),"1"==t.barCodeList[e].type?s("tr",[s("td",{staticClass:"td_width"},[t._v("所属外箱")]),t._v(" "),s("td",[t._v(t._s(t.barCodeList[e].belongBNumber))]),t._v(" "),s("td",{staticClass:"td_width"},[t._v("批号")]),t._v(" "),s("td",{attrs:{colspan:"3"}},[t._v(t._s(t.barCodeList[e].batchNumber))])]):s("tr",[s("td",{staticClass:"td_width"},[t._v("内箱数")]),t._v(" "),s("td",[t._v(t._s(t.barCodeList[e].cboxNumber))]),t._v(" "),s("td",{staticClass:"td_width"},[t._v("批号")]),t._v(" "),s("td",{attrs:{colspan:"3"}},[t._v(t._s(t.barCodeList[e].batchNumber))])]),t._v(" "),s("tr",[s("td",{staticClass:"td_width"},[t._v("备注")]),t._v(" "),s("td",{directives:[{name:"show",rawName:"v-show",value:t.remarkTrue,expression:"remarkTrue"}],attrs:{colspan:"4"}},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.barCodeList[e].remark,expression:"barCodeList[index].remark"}],staticStyle:{width:"100%",height:"100%",outline:"none",border:"none"},attrs:{type:"text",name:"remark"},domProps:{value:t.barCodeList[e].remark},on:{input:function(a){a.target.composing||t.$set(t.barCodeList[e],"remark",a.target.value)}}})]),t._v(" "),s("td",{directives:[{name:"show",rawName:"v-show",value:t.remarkFalse,expression:"remarkFalse"}],attrs:{colspan:"4"}},[s("span",[t._v(t._s(t.barCodeList[e].remark))])])])])])])}),0),t._v(" "),s("div",{staticClass:"printBth"},[s("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.printPdf}},[t._v("打印")])],1)])},staticRenderFns:[function(){var t=this.$createElement,a=this._self._c||t;return a("td",{staticStyle:{width:"800px",height:"100px"},attrs:{colspan:"3"}},[a("div",{staticStyle:{width:"100%",height:"100%",position:"relative"}},[a("img",{staticStyle:{width:"60px",height:"60px",position:"absolute",left:"23px",top:"30px"},attrs:{src:s("/kaw")}}),this._v(" "),a("div",{staticStyle:{"margin-left":"20px","font-size":"25px",position:"absolute",left:"76px",top:"30px"}},[a("div",[this._v("东莞市广正模具塑胶有限公司")]),this._v(" "),a("div",[this._v("Greatech Moulding CO.,Ltd")])])])])}]};var v=s("VU/8")(c,l,!1,function(t){s("6fnR")},"data-v-195af9f1",null);a.default=v.exports}});
//# sourceMappingURL=106.46e05c2d7959728650fe.js.map