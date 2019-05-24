import axios from 'axios';

import { Message } from 'element-ui';

axios.defaults.timeout = 10000;
axios.defaults.baseURL = '';


////http request 拦截器
//axios.interceptors.request.use(
//config => {
//  // const token = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
//  config.data = JSON.stringify(config.data);
//  config.headers = {
//    'Content-Type':'application/x-www-form-urlencoded'
//  }
//  // if(token){
//  //   config.params = {'token':token}
//  // }
//  return config;
//},
//error => {
//  return Promise.reject(err);
//}
//);
//
//
////http response 拦截器
//axios.interceptors.response.use(
//response => {
//  if(response.data.errCode ==2){
//    router.push({
//      path:"/login",
//      querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
//    })
//  }
//  return response;
//},
//error => {
//  return Promise.reject(error)
//}
//)
/**
 * 拦截响应response，并做一些错误处理
 */
axios.interceptors.response.use((response) => {
	const data = response.data
	//console.info("response", response)
	if(data) {
		var code=0;
		if(data.code!=undefined){
			 code =data.code;
		}
		else if(data.status!=undefined)//表格和矢量平台返回格式
		{
			 code=data.status;
		}
		switch(code) {
			case 0:
			case "200":
			case 200:
				//处理相关业务
				return response;
			default:
				{
					Message.error(data.msg);
					break;
				}
		}
		return response
	} else {
		const err = new Error("未知错误，请重试")
		err.data = data
		err.response = response
		throw err
	}
	// 根据返回的code值来做不同的处理（和后端约定）
}, function(err) {
	if(err && err.response) {
		switch(err.response.status) {
			case 400:
				err.message = '请求参数错误'
				break
			case 401:
				err.message = '未授权，请登录'
				break

			case 403:
				err.message = '跨域拒绝访问'
				break

			case 404:
				err.message = `请求地址出错: ${err.response.config.url}`
				break

			case 408:
				err.message = '请求超时'
				break

			case 500:
				err.message = '服务器内部错误'
				break

			case 501:
				err.message = '服务未实现'
				break

			case 502:
				err.message = '网关错误'
				break

			case 503:
				err.message = '服务不可用'
				break

			case 504:
				err.message = '网关超时'
				break

			case 505:
				err.message = 'HTTP版本不受支持'
				break

			default:
		}
		Message.error(err.message);
	}

	return Promise.reject(err)
})

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function fetch(url, params = {}, headers = {}) {
	return new Promise((resolve, reject) => {
		axios.get(url, {
				params: params,
				headers: headers
			})
			.then(response => {
				resolve(response.data);
			})
			.catch(err => {
				reject(err)
			})
	})
}
/**
 * 封装all请求->封装所有Get请求
 * @param requests url数组
 * @returns {Promise}
 */

export function all(requests, paramslist = [], headerslist = []) {
	var len = requests ? requests.length : 0;
	var array = [];
	for(var i = 0; i < len; i++) {
		var params = (paramslist && paramslist[i]) ? paramslist[i] : {};
		var headers = (headerslist && headerslist[i]) ? headerslist[i] : {};
		array.push(axios.get(requests[i], {
			params,
			headers
		}));
	}
	return axios.all(array);
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data = {}, headers = {}) {
	return new Promise((resolve, reject) => {
		axios.post(url, data, {
				headers: headers
			})
			.then(response => {
				resolve(response.data);
			}, err => {
				reject(err)
			})
	})
}

/**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.patch(url, data)
			.then(response => {
				resolve(response.data);
			}, err => {
				reject(err)
			})
	})
}

/**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url, data = {}) {
	return new Promise((resolve, reject) => {
		axios.put(url, data)
			.then(response => {
				resolve(response.data);
			}, err => {
				reject(err)
			})
	})
}