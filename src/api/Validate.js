// 引入公共函数文件
import Interface from 'api/Interface.js'

// 不能为空且只能数字只保留一位小数
export function validateNumber(rule, value, callback){
      let rest = /^\d*\.{0,1}\d{0,3}$/;
      if (value === '') {
        return callback(new Error('内容不能为空'))
      } else if (!rest.test(value)) {
        return callback(new Error('只能输入数字,且只保留三位小数'))
      } else {
        callback()
      }
  }

// 可以为空但只能数字只保留一位小数
export function NanNumber(rule, value, callback){
      let rest = /^\d*\.{0,1}\d{0,3}$/
      if (!rest.test(value) && value !== '') {
        return callback(new Error('只能输入数字,且只保留三位小数'))
      } else {
        callback()
      }
  }



// 不能为空且只能整数
export function validateInteger(rule, value, callback){
  let rest = /^[1-9]\d*$/
  if (value === '') {
    return callback(new Error('内容不能为空'))
  } else if (!rest.test(value)) {
    return callback(new Error('只能输入整数'))
  } else {
    callback()
  }
}


// 可以为空但只能整数
export function NanInteger(rule, value, callback){
  let rest = /^[1-9]\d*$/
  if (!rest.test(value) && value !== '') {
    return callback(new Error('只能输入整数'))
  } else {
    callback()
  }
}

// 电子邮箱判断(不为空)
export function validateEmail(rule, value, callback){
    let rest = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (value === '') {
      return callback(new Error('邮箱不能为空'))
    } else if (!rest.test(value)) {
      return callback(new Error('邮箱格式不正确'))
    } else {
      callback()
    }
  }

// 电子邮箱判断(可以为空)
export function validateEmailEmpty(rule, value, callback){
  let rest = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (value != '') {
    if (!rest.test(value)) {
      return callback(new Error('邮箱格式不正确'))
    } else {
      callback()
    }
  }else {
    callback()
  }
}


// 企业电话(座机)正则判断
export function validatedianhua(rule, value, callback){
  let rest = /^[0-9]{3,4}-[0-9]{7,8}$/
    if (value === ''||value === null) {
      return callback(new Error('内容不能为空'))
    } else if (!rest.test(value)) {
      return callback(new Error('格式不正确'))
    } else {
      callback()
    }
  }

// 手机号码自定义判断(不能为空)
export function validateIphone(rule, value, callback){
  let rest = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (value === '') {
    return callback(new Error('手机号码不能为空'))
  } else if (!rest.test(value)) {
    return callback(new Error('手机号码格式不正确'))
  } else {
    callback()
  }
}

// 手机号码自定义判断(可以为空)
export function validateIphoneEmpty(rule, value, callback){
  let rest = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (value != '') {
    if (!rest.test(value)) {
      return callback(new Error('手机号码格式不正确'))
    } else {
      callback()
    }
  }else {
    callback()
  }
}


// 用户密码自定义判断
export function validatePass(rule, value, callback) {
  let rest = /\D/g
  if (value === '') {
    return callback(new Error('密码不能为空'))
  } else if (value.length <= 5 || value.length >= 9) {
    return callback(new Error('密码长度不小于5位且不大于9位'))
  } else if (rest.test(value)) {
    return callback(new Error('只能输入数字'))
  } else {
    callback()
  }
}




// 身份证校验
export function validatedID(rule, value, callback){
    if(value != ''&&value != null){
      if (!Interface.checkIDCard(value)) {
        return callback(new Error('身份证格式不正确'))
      }else {
        callback()
      }
    }else {
      callback()
    }
 }



