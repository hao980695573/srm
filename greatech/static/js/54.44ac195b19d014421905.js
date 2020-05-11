webpackJsonp([54],{JS1n:function(e,t,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=i("Dd8w"),r=i.n(a),l=i("T452"),n=i("pxwZ"),c=i("uUlv"),d={name:"addOtherCertificates",props:{OtherCertificates:{type:Array}},data:function(){return{header:{Authorization:localStorage.getItem("token")},otherCertificatesShow:!1,addCertificateOthen:{ertificateName:"",ertificateNumber:"",effectiveDate:"",invalidDate:"",type:5,filePath:""},rules:{ertificateName:[{required:!0,message:"证书名称不能为空",trigger:"blur"}],ertificateNumber:[{required:!0,message:"证书编码不能为空",trigger:"blur"}],effectiveDate:[{required:!0,message:"生效日期不能为空",trigger:"blur"}],invalidDate:[{required:!0,message:"失效日期不能为空",trigger:"blur"}]}}},computed:r()({},Object(c.c)(["uuid"])),methods:{addOtherCertificates:function(){this.otherCertificatesShow=!0,this.addCertificateOthen.ertificateName="",this.addCertificateOthen.ertificateNumber="",this.addCertificateOthen.effectiveDate="",this.addCertificateOthen.invalidDate="",this.addCertificateOthen.filePath=""},otherFileChange:function(e){this.addCertificateOthen.filePath=e.data[0]},removeOtherFile:function(){this.addCertificateOthen.filePath=""},additions:function(){var e=this;this.$refs.addCertificateOthen.validate(function(t){if(t){var i={supplierUuid:e.uuid,ertificateName:e.addCertificateOthen.ertificateName,ertificateNumber:e.addCertificateOthen.ertificateNumber,effectiveDate:e.addCertificateOthen.effectiveDate,invalidDate:e.addCertificateOthen.invalidDate,filePath:e.addCertificateOthen.filePath,type:"5"};n.a.post(l.a.api,"/supplier/addSupplierCertificate.do",i).then(function(t){0==t.status?e.$alert("保存成功",{confirmButtonText:"确定",center:!0,callback:function(t){e.otherCertificatesShow=!1,e.$emit("againLoad")}}):e.$alert(t.msg,{confirmButtonText:"确定",center:!0})})}})}}},f={render:function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",[i("div",{staticClass:"contacTitleWarp"},[i("div",{staticClass:"contacTitle"},[e._v("添加其他证书")]),e._v(" "),i("div",{staticClass:"contacTitleButton"},[i("el-button",{attrs:{type:"info",size:"mini"},on:{click:e.addOtherCertificates}},[e._v("新增其他证书")])],1)]),e._v(" "),i("el-table",{staticStyle:{width:"100%"},attrs:{data:e.OtherCertificates,border:""}},[i("el-table-column",{attrs:{align:"center",prop:"ertificateName",label:"证书名称","min-width":"180"}}),e._v(" "),i("el-table-column",{attrs:{align:"center",prop:"ertificateNumber",label:"证书编号","min-width":"200"}}),e._v(" "),i("el-table-column",{attrs:{align:"center",label:"生效日期","min-width":"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.effectiveDate.slice(0,10)))])]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"center",label:"有效日期至","min-width":"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("span",[e._v(e._s(t.row.invalidDate.slice(0,10)))])]}}])}),e._v(" "),i("el-table-column",{attrs:{align:"center",label:"附件","min-width":"200"},scopedSlots:e._u([{key:"default",fn:function(t){return[i("a",{attrs:{href:t.row.filePath,download:"",target:"_blank"}},[i("el-button",{attrs:{size:"mini",type:"primary"}},[e._v("下载")])],1)]}}])})],1),e._v(" "),i("el-dialog",{attrs:{title:"新增其他证书",visible:e.otherCertificatesShow},on:{"update:visible":function(t){e.otherCertificatesShow=t}}},[i("div",{staticClass:"addContactsWarp"},[i("el-form",{ref:"addCertificateOthen",attrs:{model:e.addCertificateOthen,rules:e.rules,"label-width":"80px",size:"medium","label-position":"top"}},[i("el-form-item",{attrs:{label:"证书名称",prop:"ertificateName"}},[i("el-input",{attrs:{placeholder:"请输入证书名称"},model:{value:e.addCertificateOthen.ertificateName,callback:function(t){e.$set(e.addCertificateOthen,"ertificateName",t)},expression:"addCertificateOthen.ertificateName"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"证书编号",prop:"ertificateNumber"}},[i("el-input",{attrs:{placeholder:"请输入证书编码"},model:{value:e.addCertificateOthen.ertificateNumber,callback:function(t){e.$set(e.addCertificateOthen,"ertificateNumber",t)},expression:"addCertificateOthen.ertificateNumber"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"生效日期",prop:"effectiveDate"}},[i("el-date-picker",{attrs:{type:"date",placeholder:"请选择生效日期","value-format":"yyyy-MM-dd"},model:{value:e.addCertificateOthen.effectiveDate,callback:function(t){e.$set(e.addCertificateOthen,"effectiveDate",t)},expression:"addCertificateOthen.effectiveDate"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"有效日期至",prop:"invalidDate"}},[i("el-date-picker",{attrs:{type:"date",placeholder:"请选择失效日期","value-format":"yyyy-MM-dd"},model:{value:e.addCertificateOthen.invalidDate,callback:function(t){e.$set(e.addCertificateOthen,"invalidDate",t)},expression:"addCertificateOthen.invalidDate"}})],1),e._v(" "),i("el-form-item",{attrs:{label:"上传附件"}},[i("el-upload",{staticClass:"upload-demo",attrs:{multiple:!1,limit:1,action:"http://www.srm-greatech.com/gzSrm/system/file/upFile.do?fileType=qualification.path","on-success":e.otherFileChange,headers:e.header,"on-remove":e.removeOtherFile,"file-list":[]}},[i("el-button",{staticStyle:{"margin-left":"30px","margin-top":"3px",width:"200px"},attrs:{size:"small",type:"primary"}},[e._v("上传")])],1)],1)],1),e._v(" "),i("div",{staticClass:"defineWarp"},[i("el-button",{attrs:{type:"primary",size:"medium"},on:{click:e.additions}},[e._v("确定")])],1)],1)])],1)},staticRenderFns:[]};var s=i("VU/8")(d,f,!1,function(e){i("UO30")},"data-v-75c4f7c9",null);t.default=s.exports},UO30:function(e,t){}});
//# sourceMappingURL=54.44ac195b19d014421905.js.map