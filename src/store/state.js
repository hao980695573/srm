export default {
  openTab:[],//所有打开的路由
  activeIndex:'/home', //激活状态,
  // 图形验证码
  verify:'',
  // 加载状态
  mark:true,
  // 用户名
  username:'',
  // 联系人
  Contacts:'',
  // 联系人电话
  phone:'',
  // 用户id
  userId:'',
  // 供应商名称
  companyName:'',
  // 供应商审核状态
  auditStatus:'',
  // 供应商基础资料状态
  supplierState:'',
  // 供应商票据类型
  supplierBillType:'',
  // 供应商uuid
  supplierUUid:'',
  // 供应商erpno
  supplierErpno:'',
  // 用户地址
  manufacturerAddress:'',
  // 用户电话
  enterprisePhone:'',
  // 用户传真
  fax:'',
  // 用户角色身份
  userRole:'',
  // 公用uuid
  uuid:'',
  // 排程产品公用uuid
  productUuid:'',
  // 排程总数量
  orderCount:'',
  // 排程公共订单
  purchaseOrder:'',
  // 订单排程第一个日期
  orderOneDate:'',
  // 公用操作状态
  publicState:'',
  // 首页消息详情数据
  newsDetailsData:'',
  // 用户管理列表展示数据源
  loadData: [],
  tableData: [],
  // 用户管理修改数据源
  changeUserData:[],
  // 权限角色列表
  roleList:[],
  // 消息管理分类列表
  categoryList:[],
  // 后台返回消息富文本编辑内容
  editorData:'',
  // 是否清除富文本的数据
  editorClear:false,
  // 生成送货单数据
  stateDelivery:[],
  // 询报价查看详情类型
  pagePresentState:'',
  // 条码打印列表
  barCodeList:[],
  // 消息提醒（铃铛）
  messageDetail:[],
  // 判断是否弹出消息详情抽屉
  DrawerShow:false,
  // 抽屉是否可以编辑
  DrawerEdit:false,
  // 外箱清单列表
  boxListState:[],
  // 条码列表类别（正常还是补货）
  barcodeCategory:0,
  // 存储待送货列表对比列表中所有和选中数组中相同的对象
  selectOrder:[]


}
