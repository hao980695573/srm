webpackJsonp([56],{"1NP3":function(t,e){},j2dW:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("Dd8w"),i=a.n(s),n=a("T452"),r=a("pxwZ"),_=a("lStc"),c=a("uUlv"),l=a("4HuK"),v={name:"print",data:function(){return{printWrap:"printWrap",printTime:_.a.getToday("-"),tableData:{deliveryNumber:"GZSH19070900001",deliveryDate:"2019-07-08T16:00:00.000+0000",arrivalDate:"2019-07-08T16:00:00.000+0000",currency:"RMB",operatorName:"",deliveryProductList:[]},onePageRow:"17",PurchasingArr:[],productNumberArr:[]}},mounted:function(){this.getList()},filters:{filterCount:function(t){if(t)return _.a.Remainder(t)},supplierBillType:function(t){return 0==t?"专用发票":1==t?"普通发票":void 0},filterDate:function(t){if(t)return _.a.renderTime(t).slice(0,10)},filterPice:function(t){if(t)return _.a.RemainderPice(t)}},methods:{getList:function(){var t=this,e={uuid:this.uuid};r.a.post(n.a.api,"/delivery/getDeliveryInfo.do",e).then(function(e){0==e.status?(t.tableData=e.data,e.data.deliveryProductList.length>0&&e.data.deliveryProductList.map(function(e){t.PurchasingArr.push(e.purchaseOrder),t.productNumberArr.push(e.productNumber)})):t.$alert(data.msg,{confirmButtonText:"确定",center:!0})})},printPdf:function(){LODOP=Object(l.a)();var t="<head><link href='../../../static/styles/ww.css' type='text/css' rel='stylesheet'></head><body style='margin:0;background-color: white'>"+document.getElementById("Printing").innerHTML+"</body>";LODOP.ADD_PRINT_HTM("0cm","30mm","RightMargin:0cm","BottomMargin:0cm",t),LODOP.SET_PRINT_MODE("PRINT_PAGE_PERCENT","Auto-Width"),LODOP.PREVIEW()}},computed:i()({},Object(c.c)(["uuid","manufacturerAddress","enterprisePhone","fax","Contacts","phone","supplierBillType","companyName"]),{pages:function(){var t=Math.ceil(this.tableData.deliveryProductList.length/this.onePageRow);return t<=0?1:t}})},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{attrs:{id:"Printing"}},t._l(t.pages,function(e,s){return a("div",{key:s,staticClass:"a",class:t.printWrap},[a("div",{staticClass:"tab_company_out"},[a("div",{staticClass:"title_warp"},[a("div",{staticClass:"title_top"},[t._m(0,!0),t._v(" "),a("div",{staticClass:"title_top_code"},[a("img",{staticStyle:{width:"100%",height:"100%"},attrs:{src:t.tableData.qrCodePath}})]),t._v(" "),a("div",{staticClass:"title_top_right"},[a("div",[a("span",[t._v("单号 ：")]),a("span",[t._v(t._s(t.tableData.deliveryNumber))])]),t._v(" "),a("div",[a("span",[t._v("送货日期 ：")]),a("span",[t._v(t._s(t._f("filterDate")(t.tableData.deliveryDate)))])]),t._v(" "),a("div",[a("span",[t._v("打印日期：")]),a("span",[t._v(t._s(t.printTime))])]),t._v(" "),a("div",[a("span",[t._v("页码：")]),a("span",[t._v(t._s(s+1))])]),t._v(" "),a("div",[a("span",[t._v("单据类别：")]),a("span",[t._v(t._s(t._f("supplierBillType")(t.supplierBillType)))])])])]),t._v(" "),a("div",{staticClass:"title_center"},[t._v("发货单")]),t._v(" "),a("div",{staticClass:"title_bottom"},[a("div",{staticClass:"title_bottom_left"},[a("div",[a("span",[t._v("供应商名称: ")]),a("span",[t._v(t._s(t.companyName))])]),t._v(" "),a("div",[a("span",[t._v("电话: ")]),a("span",[t._v(t._s(t.phone))])])]),t._v(" "),a("div",{staticClass:"title_bottom_right"},[a("div",[a("span",[t._v("联系人: ")]),t._v(t._s(t.Contacts)),a("span")])])]),t._v(" "),a("div",{staticClass:"PurchaseWrap"},[a("div",[a("div",{staticClass:"kehubianma"},[t._v("客户编码:"+t._s(t.tableData.erpno))]),t._v(" "),a("div",{staticClass:"Purchase_item"},[t._v("订单号:"),t._l(t.PurchasingArr.slice((e-1)*t.onePageRow,e*t.onePageRow),function(s,i){return a("span",[t._v(" "+t._s(s)),a("span",{directives:[{name:"show",rawName:"v-show",value:1!=t.PurchasingArr.slice((e-1)*t.onePageRow,e*t.onePageRow).length&&i!=t.PurchasingArr.slice((e-1)*t.onePageRow,e*t.onePageRow).length-1,expression:"PurchasingArr.slice((page-1)*onePageRow,page*onePageRow).length!=1&&index!=PurchasingArr.slice((page-1)*onePageRow,page*onePageRow).length-1"}]},[t._v(" |")])])})],2)])])]),t._v(" "),a("div",{staticClass:"table_warp"},[a("table",{attrs:{cellpadding:"0",cellspacing:"0"}},[t._m(1,!0),t._v(" "),t._l(t.tableData.deliveryProductList.slice((e-1)*t.onePageRow,e*t.onePageRow),function(s,i){return a("tr",{key:i},[a("td",[t._v(t._s((e-1)*t.onePageRow+i+1))]),t._v(" "),a("td",[t._v(t._s(s.productName))]),t._v(" "),a("td",[t._v(t._s(s.productNumber))]),t._v(" "),a("td",[t._v(t._s(s.unit))]),t._v(" "),a("td",[t._v(t._s(s.quantity))]),t._v(" "),a("td",[t._v(t._s(s.bpCount))]),t._v(" "),a("td",{staticClass:"specification"},[t._v(t._s(s.specification))])])}),t._v(" "),t._m(2,!0),t._v(" "),t._m(3,!0),t._v(" "),t._m(4,!0)],2),t._v(" "),t._m(5,!0)])])])}),0),t._v(" "),a("div",{staticClass:"printBth"},[a("el-button",{attrs:{type:"primary",size:"mini"},on:{click:t.printPdf}},[t._v("打印")])],1)])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"title_top_left"},[e("img",{staticClass:"title_img",attrs:{src:a("Brc3")}})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("tr",[a("th",{staticClass:"xuhao"},[t._v("序号")]),t._v(" "),a("th",{staticClass:"pinming"},[t._v("品名")]),t._v(" "),a("th",{staticClass:"pinhao"},[t._v("品号")]),t._v(" "),a("th",{staticClass:"danwei"},[t._v("单位")]),t._v(" "),a("th",{staticClass:"shuliang"},[t._v("数量")]),t._v(" "),a("th",{staticClass:"beipin"},[t._v("备品")]),t._v(" "),a("th",{staticClass:"guige"},[t._v("规格")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("tr",[e("td",{attrs:{rowspan:"3"}},[this._v("备注")]),this._v(" "),e("td",{staticStyle:{"text-align":"left"},attrs:{colspan:"8"}},[this._v(" 1: 以上货品已收妥,核对无误")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("tr",[e("td",{staticStyle:{"text-align":"left"},attrs:{colspan:"8"}},[this._v(" 2: 如有数量及质量问题请在三天内反馈到我司,如无反馈则我司默认数量及质量无误,不再接受退货")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("tr",[e("td",{staticStyle:{"text-align":"left"},attrs:{colspan:"8"}},[this._v(" 3: 如发生纠纷,任何一方均可向东莞市第二人民法院起诉")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"footer_warp"},[e("span",{staticClass:"footer_warp1"},[e("span",[this._v("审核人：")])]),this._v(" "),e("span",{staticClass:"footer_warp2"},[e("span",[this._v("发货人：")])]),this._v(" "),e("span",{staticClass:"footer_warp3"},[e("span",[this._v("制单人：")])]),this._v(" "),e("span",{staticClass:"footer_warp4"},[e("span",[this._v("客户签收：")])])])}]};var p=a("VU/8")(v,o,!1,function(t){a("1NP3")},"data-v-72aec1e4",null);e.default=p.exports}});
//# sourceMappingURL=56.e9a4df64c02dd0d9a3bb.js.map