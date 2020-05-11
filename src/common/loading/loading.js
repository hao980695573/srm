// 引入element-ui的loading组件
import { Loading } from 'element-ui';
// 自定义loading配置项 其中：fullscreen：是否全屏，lock：是否需要锁定屏幕的滚动，text：自定义文案，spinner：自定义图标，background：自定义背景色
const loadOption={fullscreen: true ,lock: true, text: '正在加载...', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)'}

// 使用LoadingService 创建一个 Loading 实例
let loadingInstance;

export default class loadEvents {
  constructor(vueThis){
    this.vm = vueThis ;  //vue中的this  也可以不用
  }
  open(){
    loadingInstance = Loading.service(loadOption);
  }
  close(){
    loadingInstance.close();
  }
}



// 使用方法

// import loadEvents from '../utils/loading'
//
// let loads = new loadEvents();

//loads.open();loading效果出现；loads.close();关闭loading效果




