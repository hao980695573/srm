webpackJsonp([82],{"3YCN":function(t,s,a){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var e=a("Dd8w"),i=a.n(e),r=a("T452"),d=a("pxwZ"),n=a("lStc"),o=a("uUlv"),_=a("4HuK"),c={name:"MiddlePrint",data:function(){return{printMargin:"printMargin",beizhu:"",remarkFalse:!1,remarkTrue:!0}},filters:{filterDate:function(t){if(t)return n.a.renderTime(t).slice(0,10)}},computed:i()({},Object(o.c)(["barCodeList","companyName"]),{pages:function(){if(setTimeout(function(){n.a.Font_Max("guige",20),n.a.Font_Max("pinming",24)},700),this.barCodeList.length>0){var t=this.barCodeList.length;return t<=0?1:t}}}),methods:{printPdf:function(){var t=this,s={uuid:this.barCodeList[0].biUuid};d.a.post(r.a.api,"/barcode/updateBarcodeStatus.do",s).then(function(s){if(0==s.status){var a=t;a.remarkTrue=!1,a.remarkFalse=!0,setTimeout(function(){LODOP=Object(_.a)();var t="<head><link href='../../../../static/styles/MiddlePrint.css' type='text/css' rel='stylesheet'></head><body>"+document.getElementById("middlePrinting").innerHTML+"</body>";LODOP.ADD_PRINT_HTM("5mm","8mm","RightMargin:5cm","1200",t),LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT","Auto-Width"),LODOP.SET_PRINT_MODE("RESELECT_PAGESIZE",!0),LODOP.PREVIEW()},500)}else t.$alert(s.msg,{confirmButtonText:"确定",center:!0})})}}},l={render:function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{directives:[{name:"show",rawName:"v-show",value:t.pages>0,expression:"pages>0"}],staticClass:"yulan_warp"},[a("div",{attrs:{id:"middlePrinting"}},t._l(t.barCodeList,function(s,e){return a("div",{key:e,staticClass:"a",class:t.printMargin},[a("div",{staticClass:"tab_company_out"},[a("table",{attrs:{cellpadding:"0",cellspacing:"0"}},[a("tr",[t._m(0,!0),t._v(" "),a("td",{staticClass:"imgWarp"},[a("img",{staticClass:"img_code",attrs:{src:t.barCodeList[e].filePath}})])]),t._v(" "),a("tr",[a("td",{staticClass:"td_width"},[t._v("二维码")]),t._v(" "),a("td",{attrs:{colspan:"2"}},[t._v(t._s(t.barCodeList[e].barcodeNumber))]),t._v(" "),a("td",{attrs:{colspan:"2"}},["0"==t.barCodeList[e].type?a("span",[t._v("外箱码")]):a("span",[t._v("内箱码")]),a("span",{directives:[{name:"show",rawName:"v-show",value:"1"==t.barCodeList[e].isTailbox,expression:'barCodeList[index].isTailbox=="1"'}]},[t._v(" / 尾箱")])])]),t._v(" "),a("tr",[a("td",{staticClass:"td_width"},[t._v("供应商")]),t._v(" "),a("td",{attrs:{colspan:"4"}},[t._v(t._s(t.barCodeList[e].supplierName))])]),t._v(" "),a("tr",[a("td",{staticClass:"td_width"},[t._v("品名")]),t._v(" "),a("td",{staticClass:"pinming",attrs:{colspan:"4"}},[t._v(t._s(t.barCodeList[e].productName))])]),t._v(" "),a("tr",[a("td",{staticClass:"td_width"},[t._v("规格")]),t._v(" "),a("td",{staticClass:"guige",attrs:{colspan:"4"}},[t._v(t._s(t.barCodeList[e].specification))])]),t._v(" "),a("tr",[a("td",{staticClass:"td_width"},[t._v("料号")]),t._v(" "),a("td",{staticClass:"liaohao"},[t._v(t._s(t.barCodeList[e].productNumber))]),t._v(" "),a("td",{staticClass:"td_width"},[t._v("订单")]),t._v(" "),a("td",{attrs:{colspan:"3"}},[t._v(t._s(t.barCodeList[e].purchaseOrder))])]),t._v(" "),a("tr",[a("td",{staticClass:"td_width"},[t._v("数量/单位")]),t._v(" "),a("td",{staticClass:"shuliangdanwei"},[t._v(t._s(t.barCodeList[e].count)+" / "+t._s(t.barCodeList[e].unit))]),t._v(" "),a("td",{staticClass:"td_width"},[t._v("日期")]),t._v(" "),a("td",{attrs:{colspan:"2"}},[t._v(t._s(t._f("filterDate")(t.barCodeList[e].issuanceDate)))])]),t._v(" "),"1"==t.barCodeList[e].type?a("tr",[a("td",{staticClass:"td_width"},[t._v("所属外箱")]),t._v(" "),a("td",[t._v(t._s(t.barCodeList[e].belongBNumber))]),t._v(" "),a("td",{staticClass:"td_width"},[t._v("批号")]),t._v(" "),a("td",{attrs:{colspan:"3"}},[t._v(t._s(t.barCodeList[e].batchNumber))])]):a("tr",[a("td",{staticClass:"td_width"},[t._v("内箱数")]),t._v(" "),a("td",[t._v(t._s(t.barCodeList[e].cboxNumber))]),t._v(" "),a("td",{staticClass:"td_width"},[t._v("批号")]),t._v(" "),a("td",{attrs:{colspan:"3"}},[t._v(t._s(t.barCodeList[e].batchNumber))])]),t._v(" "),a("tr",[a("td",{staticClass:"td_width"},[t._v("备注")]),t._v(" "),a("td",{directives:[{name:"show",rawName:"v-show",value:t.remarkTrue,expression:"remarkTrue"}],attrs:{colspan:"4"}},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.barCodeList[e].remark,expression:"barCodeList[index].remark"}],staticStyle:{width:"100%",height:"100%",outline:"none",border:"none"},attrs:{type:"text",name:"remark"},domProps:{value:t.barCodeList[e].remark},on:{input:function(s){s.target.composing||t.$set(t.barCodeList[e],"remark",s.target.value)}}})]),t._v(" "),a("td",{directives:[{name:"show",rawName:"v-show",value:t.remarkFalse,expression:"remarkFalse"}],attrs:{colspan:"4"}},[a("span",[t._v(t._s(t.barCodeList[e].remark))])])])])])])}),0),t._v(" "),a("div",{staticClass:"printBth"},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.printPdf}},[t._v("打印")])],1)])},staticRenderFns:[function(){var t=this.$createElement,s=this._self._c||t;return s("td",{staticStyle:{width:"800px",height:"100px"},attrs:{colspan:"3"}},[s("div",{staticStyle:{width:"100%",height:"100%",position:"relative"}},[s("img",{staticStyle:{width:"60px",height:"60px",position:"absolute",left:"23px",top:"30px"},attrs:{src:a("/kaw")}}),this._v(" "),s("div",{staticStyle:{"margin-left":"20px","font-size":"25px",position:"absolute",left:"76px",top:"30px"}},[s("div",[this._v("东莞市广正模具塑胶有限公司")]),this._v(" "),s("div",[this._v("Greatech Moulding CO.,Ltd")])])])])}]};var v=a("VU/8")(c,l,!1,function(t){a("bhzJ")},"data-v-494b301a",null);s.default=v.exports},bhzJ:function(t,s){}});
//# sourceMappingURL=82.f7dff9f07b97aeb29a1d.js.map