webpackJsonp([124],{d6dZ:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=n("Dd8w"),r=n.n(l),i=n("lStc"),a=n("uUlv"),s={name:"norMalbarCodeList",props:["InquiryList"],filters:{filterCreateDate:function(e){if(i.a.renderTime(e))return i.a.renderTime(e).slice(0,10)},filterAlreadyPrint:function(e){return 0==e?"没打印":1==e?"已打印":void 0},filtersIsAccessoryLabel:function(e){return 0==e?"否":1==e?"是":void 0}},methods:r()({},Object(a.b)(["changeUuid"]),{enterDetail:function(e,t){this.changeUuid(e.row.biUuid),0==e.row.isAccessoryLabel?"small"==t?this.$router.push("smallPrint"):"middle"==t?this.$router.push("middleCodePrint"):this.$router.push("largePrint"):1==e.row.isAccessoryLabel&&("large"==t?this.$router.push("auxiliaryLargePrint"):"middle"==t?this.$router.push("auxiliaryMiddleCodePrint"):this.$router.push("auxiliarySmallPrint"))}})},u={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("el-table",{staticStyle:{width:"100%"},attrs:{data:e.InquiryList,border:"",height:"415px",size:"mini"}},[n("el-table-column",{attrs:{type:"index",align:"center",width:"50"}}),e._v(" "),n("el-table-column",{attrs:{label:"送货单号",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.deliveryNumber))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"外箱条码",align:"center",width:"150"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.barcodeNumber))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"物料编码",align:"center",width:"120"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.productNumber))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"物料名称",align:"center",width:"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.productName))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"物料规格",align:"center","min-width":"250"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.specification))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"单位",align:"center",width:"80"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.unit))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"批次",align:"center",width:"130"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.batchNumber))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"创建时间",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(e._f("filterCreateDate")(t.row.createDate)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"批次",align:"center",width:"140"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(t.row.batchNumber))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"是否辅料",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(e._f("filtersIsAccessoryLabel")(t.row.isAccessoryLabel)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{label:"是否打印",align:"center",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("span",[e._v(e._s(e._f("filterAlreadyPrint")(t.row.isAlreadyPrint)))])]}}])}),e._v(" "),n("el-table-column",{attrs:{align:"center",label:"操作",width:"250"},scopedSlots:e._u([{key:"default",fn:function(t){return[n("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(n){return e.enterDetail(t,"large")}}},[e._v("\n          打印100*70\n        ")]),e._v(" "),n("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(n){return e.enterDetail(t,"middle")}}},[e._v("\n          打印100*60\n        ")]),e._v(" "),n("el-button",{attrs:{type:"text",size:"mini"},on:{click:function(n){return e.enterDetail(t,"small")}}},[e._v("\n          打印70*45\n        ")])]}}])})],1)],1)},staticRenderFns:[]},o=n("VU/8")(s,u,!1,null,null,null);t.default=o.exports}});
//# sourceMappingURL=124.43ce49db15f419ba50eb.js.map