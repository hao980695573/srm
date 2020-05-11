export default {
  // 添加tabstabState
  add_tabs (state, data) {
    if(data==0){
      this.state.openTab=[]
    }else{
      this.state.openTab.push(data);
    }

  },
  // 删除tabs
  delete_tabs (state, route) {
    let index = 0;
    for (let option of state.openTab) {
      if (option.route === route) {
        break;
      }
      index++;
    }
    this.state.openTab.splice(index, 1);
  },
  // 设置当前激活的tab
  set_active_index (state, index) {
    this.state.activeIndex = index;
  },
  // 报错图形验证码的值
  verifyChange (state, data) {
    state.verify = data
  },
  // 遮罩层加载
  loadMack(state, data){
    state.mark=data
  },
  // 存储用户名
  usernameChange(state, data){
    state.username=data
  },
  // 联系人
  changeContacts(state, data){
    state.Contacts=data
  },
  // 联系人电话
  changePhone(state, data){
    state.phone=data
  },
  // 存储用户id
  changeUserId(state, data){
    state.userId=data
  },
  // 存储供应商名称
  changeCompanyName(state, data){
    state.companyName=data
  },
  // 供应商erpno
  changeSupplierErpno(state, data){
    state.supplierErpno=data
  },
  // 供应商基础资料状态
  changeSupplierState(state, data){
    state.supplierState=data
  },
  // 供应商审核状态
  changeAuditStatus(state, data){
    state.auditStatus=data
  },
  changeSupplierBillType(state, data){
    state.supplierBillType=data
  },
  // 供应商uuid状态
  changeSupplierUUid(state, data){
    state.supplierUUid=data
  },
  // 存储用户地址
  changeManufacturerAddress(state, data){
    state.manufacturerAddress=data
  },
  // 存储用户电话
  changeEnterprisePhone(state, data){
    state.enterprisePhone=data
  },
  // 存储用户传真
  changeFax(state, data){
    state.fax=data
  },
  // 存储用户角色身份
  changeUserRole(state, data){
    state.userRole=data
  },
  // 首页消息详情数据
  changeNewsDetailsData(state, data){
    state.newsDetailsData=data
  },
  // 用户管理后台列表数据
  changeloadData(state, data){
    state.loadData=data
  },
  // 用户管理修改数据源
  changehlderUserData(state, data){
    console.log(data);
    state.changeUserData=data
  },
  // 用户管理列表展示数据
  changetableData(state, data){
    if(data===null){
      state.tableData=[]
    }else{
      state.tableData.push(data)
    }
  },
  // 权限角色列表
  ChangeroleList(state, data){
    state.roleList=data
  },
  // 消息管理分类
  changeCategoryList(state, data){
    state.categoryList=data
  },
  // 改变uuid
  changeUuid(state,data){
    state.uuid=data
  },
  // 改变排程公共uuid状态
  changeProductUuid(state,data){
    state.productUuid=data
  },
  // 改变排程公共总数量
  changeOrderCount(state,data){
    state.orderCount=data
  },
  // 改变公共状态
  changeState(state,data){
    state.publicState=data
  },
  // 改变排程公共订单
  changePurchaseOrder(state,data){
    state.purchaseOrder=data
  },

  // 订单排程第一个日期
  changeOrderOneDate(state,data){
    state.orderOneDate=data
  },

  // 后台返回消息富文本编辑内容
  changeEditorData(state,data){
    state.editorData=data
  },
  // 是否清除富文本的数据
  changeEditorClear(state,data){
    state.editorClear=data
  },
  // 改变生成送货单数据
  changeStateDelivery(state,data){
    state.stateDelivery=data
  },
  changePagePresentState(state,data){
    state.pagePresentState=data
  },
  // 改变条码打印列表
  changeBarCodeList(state,data){
    state.barCodeList=data
  },
  // 铃铛详情
  changeMessageDetail(state,data){
    state.messageDetail=data
  },
  // 抽屉显示
  changeDrawerShow(state,data){
    state.DrawerShow=data
  },
  // 抽屉是否可以编辑
  changeDrawerEdit(state,data){
    state.DrawerEdit=data
  },
  // 外箱清单列表
  changeBoxListState(state,data){
    state.boxListState=data
  },
  // 条码列表类别（正常还是补货）
  changeBarcodeCategory(state,data){
    state.barcodeCategory=data
  },
  // 存储待送货列表对比列表中所有和选中数组中相同的对象
  changeSelectOrder(state,data){
    state.selectOrder=data
  }
}
