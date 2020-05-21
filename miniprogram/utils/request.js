/**
 * 微信小程序不支持axios，使用flyio封装微信小程序请求
 * flyio文档 https://wendux.github.io/dist/#/doc/flyio/compare
 */
import qs from 'qs'
import whiteList from './whiteList'

const Fly = require('../lib/fly.min.js')
const fly = new Fly()

// 设置超时
fly.config.timeout = 30000
const base = ''

const request = ({
  url,
  baseURL = base,
  method = 'GET',
  header = {},
  data = {},
}) => {
  if (url[0] !== '/') {
    url = `${url}/`
  }

  method = method.toUpperCase();

  const urlencodedMethods = ['POST', 'PUT']
  const defaultMethod = {}
  if (urlencodedMethods.includes(urlencodedMethods)) {
    defaultMethod['content-type'] = 'application/x-www-form-urlencoded'
  }

  // 请求拦截器
  fly.interceptors.request.use(
    request => {
      if (whiteList.useHeaderToken.indexOf(request.url) !== -1) {
        // 在接口的header加上token
      }
      if (whiteList.noloading.indexOf(request.url) !== -1) {
        return request
      }
      wx.showLoading({
        title: '加载中',
        mask: true,
      })
    }, (error, promise) => {
      console.log(error)
      promise.reject(error)
    },
  )

  // 响应拦截器
  fly.interceptors.response.use(
    response => {
      // wx.hideLoading()
      //只将请求结果的data字段返回
      return response.data
    },
    (err, promise) => {
      // wx.hideLoading() 
      let msg = ''
      if (err.status === 0) {
        msg = '网络连接异常'
      } else if (err.status === 1) {
        msg = '网络连接超时'
      } else if (err.status === 415) {
        msg = '用户未登录'
      } else {
        if (err.response.data.message) {
          msg = err.response.data.message
        } else {
          msg = '请求数据失败,请稍后再试'
        }
      }
      wx.showToast({
        title: msg,
        icon: 'none',
        duration: 2000,
      })
      return promise.resolve(err)
    },
  )

  let instance = fly.request({
    url: baseURL + url,
    body: data,
    headers: {
      ...defaultHeader,
      ...header
    },
    method,
  })

  return instance
}

export default request