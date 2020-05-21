export * from './miniAppCode'

/**
 * 解密数据，可同时处理 userInfo 和 phoneNumber 等。返回 { wxContext, data } 这样的格式
 * @param {*} code wx.login 拿到的 code
 * @param {*} encryptedData
 * @param {*} iv
 */
export const decrypt = (code, encryptedData, iv) => {
  return wx.cloud.callFunction({
    name: 'decrypt',
    data: {
      code,
      encryptedData,
      iv
    },
  })
}

/**
 * 通过 cloudID 来获取解密信息，此方式 2.7.0 才支持，兼容性不好。返回格式 { cloudID, data }
 * @param {string} cloudID
 */
export const decryptByCloudID = cloudID => {
  return wx.cloud.callFunction({
    name: 'decryptByCloudID',
    data: {
      decryptedData: wx.cloud.CloudID(cloudID),
    },
  })
}

/**
 * 统一的云函数调用
 * @param {{ apiName: string, data: { [key: string]: any } }} data
 * @param {string} data.apiName 调用云函数的名称，比如 auth.getPaidUnionId
 * @param {{[key: string]: any}} 传递给云函数的参数
 */
export const common = data =>
  wx.cloud.callFunction({
    name: 'common',
    data,
  })