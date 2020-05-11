// 引入store仓库
import store from '../store'

export default {
// 生成图形验证码
  dentifying() {
    /*生成4位随机数*/
    function rand() {
      var str = "0123456789";
      var arr = str.split("");
      var validate = "";
      var ranNum;
      for (var i = 0; i < 4; i++) {
        ranNum = Math.floor(Math.random() * 9);   //随机数在[0,35]之间
        validate += arr[ranNum];
      }
      store.commit('verifyChange', validate);
      return validate;
    }
    /*干扰线的随机x坐标值*/
    function lineX() {
      var ranLineX = Math.floor(Math.random() * 90);
      return ranLineX;
    }
    /*干扰线的随机y坐标值*/
    function lineY() {
      var ranLineY = Math.floor(Math.random() * 40);
      return ranLineY;
    }
    function clickChange() {
      var mycanvas = document.getElementById('mycanvas');
      var cxt = mycanvas.getContext('2d');
      cxt.fillStyle = '#fff';
      cxt.fillRect(0, 0, 90, 40);

      /*生成干扰线20条*/
      for (var j = 0; j < 20; j++) {
        cxt.strokeStyle = '#777777';
        cxt.beginPath();    //若省略beginPath，则每点击一次验证码会累积干扰线的条数
        cxt.moveTo(lineX(), lineY());
        cxt.lineTo(lineX(), lineY());
        cxt.lineWidth = 0.5;
        cxt.closePath();
        cxt.stroke();
      }

      cxt.fillStyle = 'blue';
      cxt.font = 'bold 20px Arial';
      cxt.fillText(rand(), 25, 25);   //把rand()生成的随机数文本填充到canvas中
    }
    clickChange();
    /*点击验证码更换*/
    mycanvas.onclick = function (e) {
      e.preventDefault();   //阻止鼠标点击发生默认的行为
      clickChange();
    };
  },
// 取小数点后2几位
  Remainder(data) {
    return Number(data).toFixed(2)
  },
  // 取金额小数点后4位
  RemainderPice(data) {
    return Number(data).toFixed(4)
  },
  // 时间转换
  renderTime(date) {
    if (date) {
      var dateee = new Date(date).toJSON();
      return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
    }
  },
  // 获取当前日期
  getToday(data){
    //创建补0函数
    function bu(s) {
      return s < 10 ? '0' + s: s
    }
    var today= new Date()
    if(data=="-"){
      return today.getFullYear() + "-" + bu((today.getMonth() + 1)) + "-" + bu(today.getDate());
    }else{
      return today.getFullYear()+'' + bu((today.getMonth() + 1)) +""+ bu(today.getDate())
    }

  },
// 获取指定N天前、后的日期
  fun_date(date,type,numberDay) {
    //创建补0函数
    function bu(s) {
      return s < 10 ? '0' + s: s
    }
    var date1
    if(type==='addition'){
      if(date==''){
        date1= new Date()
      }else{
        date1= new Date(date)
      }
      var time1 = date1.getFullYear() + "-" + bu((date1.getMonth() + 1)) + "-" + bu(date1.getDate());//time1表示当前时间
      var date2 = new Date(date1);
      date2.setDate(date1.getDate() + numberDay);
      var time2 = date2.getFullYear() + "-" + bu((date2.getMonth() + 1)) + "-" + bu(date2.getDate());
      return time2

    }else if(type==='reduce'){
      if(date==''){
        date1= new Date()
      }else{
        date1= new Date(date)
      }
     var time1 = date1.getFullYear() + "-" + bu((date1.getMonth() + 1)) + "-" + date1.getDate();//time1表示当前时间
      var date2 = new Date(date1);
      date2.setDate(date1.getDate() - numberDay);
      var time2 = date2.getFullYear() + "-" + bu((date2.getMonth() + 1)) + "-" + bu(date2.getDate());
      return time2
    }
  },
  //限制最大字数
  Font_Max(dom, num) {
    var targe = document.getElementsByClassName(dom)
    for (var i = 0; i < targe.length; i++) {
      var maxwidth = num;
      if (targe[i].innerText.length > maxwidth) {
        targe[i].innerText = targe[i].innerText.substring(0, maxwidth);
        targe[i].innerText = targe[i].innerText + '…'

      }
    }
  }
}






