webpackJsonp([95],{b6jV:function(t,i,e){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var a=e("Dd8w"),s=e.n(a),r=e("T452"),n=e("pxwZ"),d=e("uUlv"),c=e("lStc"),o=e("4HuK"),_={name:"auxiliarySmallPrint",data:function(){return{printMargin:"printMargin",beizhu:"1312",remarkFalse:!1,remarkTrue:!0,barCodeList:[]}},filters:{filterDate:function(t){if(t)return c.a.renderTime(t).slice(0,10)}},computed:s()({},Object(d.c)(["uuid","barcodeCategory"])),mounted:function(){this.getList()},methods:{getList:function(){var t=this,i={uuid:this.uuid,type:this.barcodeCategory};n.a.post(r.a.api,"/barcode/getAuxiliaryDetailList.do",i).then(function(i){if(0==i.status)return t.barCodeList=i.data,t.barCodeList.length<=0?1:t.barCodeList.length}),setTimeout(function(){c.a.Font_Max("specification",26),c.a.Font_Max("pinming",14)},500)},printPdf:function(){this.remarkTrue=!1,this.remarkFalse=!0,setTimeout(function(){LODOP=Object(o.a)();var t="<head><link href='../../../../static/styles/labelPringting11.css' type='text/css' rel='stylesheet'></head><body>"+document.getElementById("Printing").innerHTML+"</body>";LODOP.ADD_PRINT_HTM("2.5mm","2.5mm","RightMargin:5cm","1150",t),LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT","Auto-Width"),LODOP.SET_PRINT_MODE("RESELECT_PAGESIZE",!0),LODOP.PREVIEW()},500)}}},l={render:function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"barCodeWarp"},[e("div",{attrs:{id:"Printing"}},t._l(t.barCodeList,function(i,a){return e("div",{key:a,class:[a%2==0?"":["a","margintow"]]},[e("div",{staticClass:"tab_company_out"},[e("table",{attrs:{cellpadding:"0",cellspacing:"0"}},[t._m(0,!0),t._v(" "),e("tr",[e("td",{staticStyle:{height:"42px"}},[t._v("供应商")]),t._v(" "),e("td",{attrs:{colspan:"4"}},[t._v(t._s(t.barCodeList[a].supplierName))])]),t._v(" "),e("tr",[e("td",{staticStyle:{width:"90px",height:"44px"}},[t._v("订单号")]),t._v(" "),e("td",[t._v(t._s(t.barCodeList[a].purchaseOrder))]),t._v(" "),e("td",{staticStyle:{width:"90px",height:"44px"}},[t._v("保质期")]),t._v(" "),e("td",[t._v(t._s(t._f("filterDate")(t.barCodeList[a].qgPeriod)))])]),t._v(" "),e("tr",[e("td",{staticStyle:{width:"90px",height:"44px"}},[t._v("料号")]),t._v(" "),e("td",[t._v(t._s(t.barCodeList[a].productNumber))]),t._v(" "),e("td",{staticStyle:{width:"90px",height:"44px"}},[t._v("批次")]),t._v(" "),e("td",[t._v(t._s(t.barCodeList[a].batchNumber))])]),t._v(" "),e("tr",[e("td",{staticStyle:{width:"90px",height:"44px"}},[t._v("规格")]),t._v(" "),e("td",{staticClass:"specification",staticStyle:{"text-align":"left"},attrs:{colspan:"4"}},[t._v(t._s(t.barCodeList[a].specification))])]),t._v(" "),e("tr",[e("td",{staticStyle:{width:"120px",height:"25px"}},[t._v("数量/单位")]),t._v(" "),e("td",{staticStyle:{height:"25px"},attrs:{colspan:"2"}},[t._v(t._s(t.barCodeList[a].count)+" / "+t._s(t.barCodeList[a].unit))]),t._v(" "),e("td",{attrs:{rowspan:"3"}},[e("img",{staticStyle:{width:"140px",height:"140px"},attrs:{src:t.barCodeList[a].filePath}})])]),t._v(" "),e("tr",[e("td",{staticStyle:{width:"120px",height:"30px"}},[t._v("生产日期")]),t._v(" "),e("td",{attrs:{colspan:"2"}},[t._v(t._s(t._f("filterDate")(t.barCodeList[a].manufactureDate)))])]),t._v(" "),e("tr",[e("td",{staticStyle:{width:"120px",height:"30px"}},[t._v("品名")]),t._v(" "),e("td",{staticClass:"pinming",staticStyle:{"font-size":"18px"},attrs:{colspan:"2"}},[t._v(t._s(t.barCodeList[a].productName))])])])])])}),0),t._v(" "),e("div",{staticClass:"printBth"},[e("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.printPdf}},[t._v("打印")])],1)])},staticRenderFns:[function(){var t=this.$createElement,i=this._self._c||t;return i("tr",[i("td",{staticClass:"title",attrs:{colspan:"4"}},[this._v("\n              东莞市广正模具塑胶有限公司\n            ")])])}]};var p=e("VU/8")(_,l,!1,function(t){e("yUVK")},"data-v-2ca5db2b",null);i.default=p.exports},yUVK:function(t,i){}});
//# sourceMappingURL=95.b7bd7d02098f316605dc.js.map