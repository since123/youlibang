
function httpReq(params = {}){
  let url = params.url || 'http://www.ylb.com';
  let data = params.data || '';
  let header = params.header || {};
  let method = params.method || 'GET';
  // 使用Promise来解决异步问题
  return new Promise((resolve, reject) => {
    // 发起网络请求
    wx.request({
      url,
      data,
      header,
      method,
      // 成功
      success: resolve,
      // 失败
      fail: reject
    })
  })
}


// 导出模块
export {httpReq};