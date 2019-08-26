import store from '@/store/index'

let validateCode = async function (rule, value, callback) {
  let mattern = /^[0-9a-zA-Z]*$/
  if (value === '') {
    callback(new Error('必填项'))
  } else if (!mattern.test(value)) {
    callback(new Error('必须是字母或数字'))
  } else {
    // 发请求验证
    value = value.toUpperCase()
    let data = await store.dispatch('ytoBase/validate/unique', {
      key: 'code',
      value: value
    })
    if (data.status === -1) {
      callback(new Error('已经存在'))
    }
  }
}

let validateName = async function (rule, value, callback) {
  if (value === '') {
    callback(new Error('必填项'))
  } else {
    // 发请求验证
    let data = await store.dispatch('ytoBase/validate/unique', {
      key: 'name',
      value: value
    })
    if (data.status !== 0) {
      callback(new Error('已经存在'))
    }
  }
}

let validateNetCode = async function (rule, value, callback) {
  if (value === '') {
    callback(new Error('必填项'))
  } else {
    // 发请求验证
    value = value.slice(0, 6)
    let data = await store.dispatch('ytoBase/validate/unique', {
      key: 'org_Code',
      value: value
    })
    if (data.status !== 0) {
      callback(new Error('已经存在'))
    }
  }
}

export const required = { message: '必填项' }
export const number = { pattern: /^[0-9]*$/, message: '请输入数字' }
export const number8 = { pattern: /^\d{8}$/, message: '请输入8位数字' }
export const integer = { pattern: /^[1-9]\d*$/, message: '必须是整数' }
export const date = { type: 'date', message: '必须是时间格式' }
export const url = { type: 'url', message: '必须是网址格式' }
export const email = { type: 'email', message: '必须是email' }
export const grapheme = { pattern: /^[a-zA-Z]*$/, message: '必须是字母' }
export const letterNumber = {
  pattern: /^[0-9a-zA-Z]*$/,
  message: '必须是字母或数字'
}
export const certificate = {
  pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
  message: '请正确输入您的身份证号码'
}
export const mailbox = {
  pattern: /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/,
  message: '请输入正确格式的电子邮箱'
}
export const phone = {
  pattern: /^1[3456789]\d{9}$/,
  message: '请输入正确的手机号码'
}
export const code = { validator: validateCode, trigger: 'blur' }
export const name = { validator: validateName, trigger: 'blur' }
export const netCode = { validator: validateNetCode, trigger: 'change' }
