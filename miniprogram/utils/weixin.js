/*
 * @Descripttion: 小程序自带wx api转化成promise形式
 * @Date: 2020-05-21 23:07:25
 * @LastEditTime: 2020-05-21 23:17:44
 */

/**
 * 将wx api回调形式转成promise形式
 * @param {*} wxApiName  wx api名字
 */
const promisify = wxApiName => (options = {}) =>
  new Promise((resolve, reject) =>
    wx[wxApiName]({
      ...options,
      success: resolve,
      fail: reject,
    }),
  )

export default {
  // 获取用户信息
  getUserInfo: promisify('getUserInfo'),

  //获取授权信息
  getSetting: promisify('getSetting'),

  // 获取临时令牌
  getLogin: promisify('login'),

  // 获取当前的地理位置、速度。当用户离开小程序后，此接口无法调用
  getLocation: promisify('getLocation'),
}