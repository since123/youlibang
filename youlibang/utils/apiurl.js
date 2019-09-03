
let ApiUrl = {};

// php列表
ApiUrl.phplist = 'https://wx.ylbtl.cn/api/';
// ApiUrl.phplist = 'http://www.ylb.com/api/';
// 详细信息
ApiUrl.detail = ApiUrl.phplist+'/';
ApiUrl.url ='https://wx.ylbtl.cn'
ApiUrl.phone = [{ serviceid: 0, serviceTel: '020-23787989', kefuNum: '客服003' },
  { serviceid: 1, serviceTel: '020-22324349', kefuNum: '客服005' }]

export {ApiUrl};