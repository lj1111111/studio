
L.extend(L.SeRequestUrl,{
  //获取服务列表[GET]
  "getServiceList": "/st?cmd=get_service_list&ak=",
})
L.extend(L.HttpInterface,{
	/**
   * 大数据分析获取服务列表
   * @param url {String} 矢量服务器地址
   * @param async {Boolean} 是否异步请求 true or false
   * @param success {Function} 成功回调 function
   * @param error {Function} 失败回调 function
   * @param option {Object} 回调参数 {}
   * @param data {Object}
   * data格式
   * {
   * 	 "ak":用户令牌，String类型,
   * }
   * @returns {Boolean}
   */
  getServiceList: function(url, data, async, success, error, option) {
    if (!data) return false;
    var ak = data.ak;
    var requestUrl = L.SeRequestUrl.createUrl(url, "getServiceList");
    requestUrl += ak;
    var xhr = L.HttpRequest.ajax(requestUrl, "GET", null, true, success, error, option);
    return true;
  },
})
