/****
 * 矢量平台API交互
 * author:LJ
 * data:2018-12-05
 */
import { Message } from 'element-ui';

const setConfig = L.Ajax.setConfig;
const StatusEnum = L.Ajax.StatusEnum;
const ERROR_UNKNOW = "未知";
/****
 * 查询用户地图列表
 * @param {Object} url
 * @param {Object} token
 */
function queryMapByUser(url, token) {
	const GET_MAP_LIST = "getMapList";
	setConfig({
		token: token,
		serviceUrl: url
	});
	return new Promise((resolve, reject) => {
		L.Ajax.httpRequest(GET_MAP_LIST, {
			success: function(data) {
				if(data && data.status == StatusEnum.SUCCESS) {
					resolve(data);
				} else {
					var msg = data && data.msg ? data.msg : ERROR_UNKNOW;
					Message.error(msg);
				}
			},
			error: function(error) {
				var msg = error ? data.msg : ERROR_UNKNOW;
				Message.error(msg);
			}
		});
	})
}
export {queryMapByUser}
