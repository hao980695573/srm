webpackJsonp([79],{Nhz7:function(t,e){},zPly:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=i("Dd8w"),s=i.n(a),r=i("T452"),n=i("pxwZ"),c=i("lStc"),d=i("uUlv"),_=i("4HuK"),l={name:"barPrint",data:function(){return{printMargin:"printMargin",remarkFalse:!1,remarkTrue:!0}},filters:{filterDate:function(t){if(t)return c.a.renderTime(t).slice(0,10)}},computed:s()({},Object(d.c)(["barCodeList","companyName"]),{pages:function(){if(this.barCodeList.length>0){var t=this.barCodeList.length;return t<=0?1:t}}}),watch:{pages:function(){setTimeout(function(){c.a.Font_Max("specification",26),c.a.Font_Max("pinming",14)},500)}},methods:{largePrintPdf:function(){var t=this,e={uuid:this.barCodeList[0].biUuid};n.a.post(r.a.api,"/barcode/updateBarcodeStatus.do",e).then(function(e){if(0==e.status){var i=t;i.remarkTrue=!1,i.remarkFalse=!0,setTimeout(function(){LODOP=Object(_.a)();var t="<head><link href='../../../../static/styles/LargeSizePrint.css' type='text/css' rel='stylesheet'></head><body>"+document.getElementById("largePrinting").innerHTML+"</body>";LODOP.ADD_PRINT_HTM("2.5mm","3mm","RightMargin:5cm","1100",t),LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT","Auto-Width"),LODOP.SET_PRINT_MODE("RESELECT_PAGESIZE",!0),LODOP.PREVIEW()},500)}else t.$alert(e.msg,{confirmButtonText:"确定",center:!0})})}}},o={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{directives:[{name:"show",rawName:"v-show",value:t.pages>0,expression:"pages>0"}],staticClass:"yulan_warp"},[i("div",{attrs:{id:"largePrinting"}},t._l(t.pages,function(e,a){return i("div",{key:a,staticClass:"a"},[i("div",{staticClass:"tab_company_out"},[i("table",{attrs:{cellpadding:"0",cellspacing:"0"}},[t._m(0,!0),t._v(" "),i("tr",[i("td",{staticStyle:{height:"42px"}},[t._v("供应商")]),t._v(" "),i("td",{attrs:{colspan:"4"}},[t._v(t._s(t.companyName))])]),t._v(" "),i("tr",[i("td",{staticStyle:{width:"90px",height:"44px"}},[t._v("订单号")]),t._v(" "),i("td",[t._v(t._s(t.barCodeList[a].purchaseOrder))]),t._v(" "),i("td",{staticStyle:{width:"90px",height:"44px"}},[t._v("保质期")]),t._v(" "),i("td",[t._v(t._s(t._f("filterDate")(t.barCodeList[a].qgPeriod)))])]),t._v(" "),i("tr",[i("td",{staticStyle:{width:"90px",height:"44px"}},[t._v("料号")]),t._v(" "),i("td",[t._v(t._s(t.barCodeList[a].productNumber))]),t._v(" "),i("td",{staticStyle:{width:"90px",height:"44px"}},[t._v("批次")]),t._v(" "),i("td",[t._v(t._s(t.barCodeList[a].batchNumber))])]),t._v(" "),i("tr",[i("td",{staticStyle:{width:"90px",height:"44px"}},[t._v("规格")]),t._v(" "),i("td",{staticClass:"specification",staticStyle:{"text-align":"left"},attrs:{colspan:"4"}},[t._v(t._s(t.barCodeList[a].specification))])]),t._v(" "),i("tr",[i("td",{staticStyle:{width:"120px",height:"25px"}},[t._v("数量/单位")]),t._v(" "),i("td",{staticStyle:{height:"25px"},attrs:{colspan:"2"}},[t._v(t._s(t.barCodeList[a].count)+" / "+t._s(t.barCodeList[a].unit))]),t._v(" "),i("td",{attrs:{rowspan:"3"}},[i("img",{staticStyle:{width:"147px",height:"147px"},attrs:{src:t.barCodeList[a].filePath}})])]),t._v(" "),i("tr",[i("td",{staticStyle:{width:"120px",height:"30px"}},[t._v("生产日期")]),t._v(" "),i("td",{attrs:{colspan:"2"}},[t._v(t._s(t._f("filterDate")(t.barCodeList[a].manufactureDate)))])]),t._v(" "),i("tr",[i("td",{staticStyle:{width:"120px",height:"30px"}},[t._v("品名")]),t._v(" "),i("td",{staticClass:"pinming",staticStyle:{"font-size":"18px"},attrs:{colspan:"2"}},[t._v(t._s(t.barCodeList[a].productName))])])])])])}),0),t._v(" "),i("div",{staticClass:"printBth"},[i("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.largePrintPdf}},[t._v("打印")])],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("tr",[e("td",{staticClass:"title",attrs:{colspan:"4"}},[this._v("\n              东莞市广正模具塑胶有限公司\n            ")])])}]};var p=i("VU/8")(l,o,!1,function(t){i("Nhz7")},"data-v-4caf48a1",null);e.default=p.exports}});
//# sourceMappingURL=79.a99c137c9a2b3f9f472f.js.map