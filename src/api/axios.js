/**
 2  * Created by zxf on 2017/9/6.
 3  * 封装统一的ajax请求，统一拦截请求，对不同的请求状态封装
 4  * 通常说, ajax 请求错误有两种, 一种是网络问题或者代码问题所造成的 400, 500错误等,需要checkStatus方法拦截
 5  * 另外一种是请求参数后端通不过验证, 由后端抛出的错误，需要checkCode拦截处理
 6  * 第二种根据后台开发人员直接返回 json, 用一个 特别的 code 来区别正常请求返回的数据
 7  */

import axios from 'axios'
// 引入vue使用element的ui
import Vue from 'vue'
let v = new Vue();


/**
 12  * axios请求拦截器
 13  * @param {object} config axios请求配置对象
 14  * @return {object} 请求成功或失败时返回的配置对象或者promise error对象
 15  **/
axios.interceptors.request.use(config => {
  // 设置token值
  const token = localStorage.getItem('token');

  if (token) {
    // 这里将token设置到headers中，header的key是Authorization，这个key值根据你的需要进行修改即可
    config.headers.Authorization = token;
  }
  return config
}, error => {
  // 请求错误
  return Promise.reject(error)
})

/**
 * axios 响应拦截器
 * @param {object} response 从服务端响应的数据对象或者error对象
 * @return {object} 响应成功或失败时返回的响应对象或者promise error对象
 **/
axios.interceptors.response.use(response => {
  // 208 token过期
  if (response.data.status === 208) {
    // 登录超时
    v.$alert('登录过期，请重新登录', {
      confirmButtonText: '确定',
      center: true,
      callback: action => {
        // 清除所有的localStrong
        localStorage.clear();
        // 返回首页
        window.location.href="/";
      }
    })
  } else if (response.headers.token) { // 判断token是否存在，如果存在说明需要更新token
      localStorage.setItem('token', response.headers.token);  // 覆盖原来的token
  }
  return response
}, error => {
  return Promise.resolve(error)
})

/**
 34  * 请求发出后检查返回的状态码,统一捕获正确和错误的状态码，正确就直接返回response,错误就自定义一个返回对象
 35  * @param {object} response 响应对象
 36  * @return {object} 响应正常就返回响应数据否则返回错误信息
 37  **/
function checkStatus(response) {
  // 如果状态码正常就直接返回数据,这里的状态码是htttp响应状态码
  if (response && ((response.status === 200 || response.status === 304))) {
    return response.data // 直接返回http response响应的data,此data会后端返回的数据数据对象，包含后端自定义的code,message,data属性
  }

  return {
    // 自定义网络异常对象
    message: '请求异常报错'
  }
}


export default {
  // post请求
  post(baseUrl, url, params) {
    return axios.post(baseUrl + url, params)
      .then(res => {
        return checkStatus(res);
      })
      .catch(err => {
        return checkStatus(err)
      })
  },


// get请求
get(baseUrl,url, params) {
  return axios.get(baseUrl + url, {
    params: params
  }).then(res => {
    return checkStatus(res);
  }).catch(err => {
    return checkStatus(err)
  })
 },

  // get文件请求
  getFile(baseUrl,url, params) {
    return axios.get(baseUrl + url, {
      params: params,
      responseType: 'blob'
    }).then(res => {
      return checkStatus(res);
    }).catch(err => {
      return checkStatus(err)
    })
  }






}
