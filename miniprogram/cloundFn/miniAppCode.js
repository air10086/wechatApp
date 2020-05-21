/*
 * @Descripttion: 
 * @Date: 2020-05-22 00:01:06
 * @LastEditTime: 2020-05-22 00:01:28
 */
export const createQRCode = (data = {}) =>
  wx.cloud.callFunction({
    name: 'miniAppCode',
    data: {
      action: 'createQRCode',
      data,
    },
  })