import moment from 'moment';
export function format(time) {
	var y = time.getFullYear();
	var m = time.getMonth() + 1;
	var d = time.getDate();
	var h = time.getHours();
	var mm = time.getMinutes();
	var s = time.getSeconds();
	var ms = time.getMilliseconds();
	return y + '-' + add0(m) + '-' + add0(d) + ' ' + add0(h) + ':' + add0(mm) + ':' + add0(s);
	// return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s)+'.'+add0(ms);
}

function add0(m) {
	return m < 10 ? '0' + m : m;
}

export function sort(arr) {
	for(var j = 0; j < arr.length - 1; j++) {
		for(var i = 0; i < arr.length - 1 - j; i++) {
			if(arr[i].id > arr[i + 1].id) {
				var temp = arr[i];
				arr[i] = arr[i + 1];
				arr[i + 1] = temp;
			}
		}
	}
	return arr;
}

export function getDate(n) {
	var date = new Date();
	var milliseconds = date.getTime() - 1000 * 60 * 60 * 24 * n;
	var newDate = new Date(milliseconds);
	// console.log(format(newDate));
	return newDate;
}

export function handleData(data) {
	var boundVec = [];
	var carNo = [];
	var disVec = [];
	var posVec = [];
	var timeVec = [];
	for(var n = 0; n < data.length; n++) {
		//范围区间
		var maxX, minX = data[n].coordinates[0];
		var maxY, minY = data[n].coordinates[1];
		var km = 0;
		var pos = [];
		var date = [];
		for(var i = 0; i < (data[n].coordinates.length / 2); i++) {
			//比较X
			maxX >= data[n].coordinates[2 * i] ? maxX = maxX : maxX = data[n].coordinates[2 * i];
			minX <= data[n].coordinates[2 * i] ? minX = minX : minX = data[n].coordinates[2 * i];
			//比较Y
			maxY >= data[n].coordinates[2 * i + 1] ? maxY = maxY : maxY = data[n].coordinates[2 * i + 1];
			minY <= data[n].coordinates[2 * i + 1] ? minY = minY : minY = data[n].coordinates[2 * i + 1];
			//计算里程
			if(i < (data[n].coordinates.length / 2 - 1)) {
				//使用方法
				var mile = GetDistance(data[n].coordinates[2 * i + 1], data[n].coordinates[2 * i], data[n].coordinates[2 * i + 3], data[n].coordinates[2 * i + 2]);
				km = km + mile;
			}
			//封装轨迹数据
			pos.push([data[n].coordinates[2 * i + 1], data[n].coordinates[2 * i]]);
			//转换时间格式
			var time = new Date(data[n].times[i]);
			date.push(format(time));
		}
		boundVec.push([
			[minX, maxY],
			[maxX, minY]
		]);
		carNo.push(data[n].carNo);
		disVec.push(km);
		posVec.push(pos);
		timeVec.push(date);
	}
	//定义json参数
	var handle = {
		boundVec: boundVec,
		carNo: carNo,
		deptVec: ["暂无数据"],
		disVec: disVec,
		posVec: posVec,
		returned: 1,
		timeVec: timeVec,
		totalNum: 1
	};
	return handle;
}

function Rad(d) {
	return d * Math.PI / 180.0; //经纬度转换成三角函数中度分表形式。
}

//计算距离，参数分别为第一点的纬度，经度；第二点的纬度，经度
function GetDistance(lat1, lng1, lat2, lng2) {
	var radLat1 = Rad(lat1);
	var radLat2 = Rad(lat2);
	var a = radLat1 - radLat2;
	var b = Rad(lng1) - Rad(lng2);
	var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
	s = s * 6378.137; // 地球半径，千米;
	s = Math.round(s * 10000) / 10000; //输出为公里
	// s = Math.round(s * 1000) / 1; //单位修改为米,取整
	// s = s.toFixed(4);
	return s;
}

export function getDiv2(result, j) {
	var div;

	div = document.createElement('div');
	div.setAttribute('class', 'c-popup-div');

	var title = document.createElement('div');
	title.setAttribute('class', 'c-popup-title');
	title.innerHTML = '设备信息'
	div.appendChild(title);

	var item1 = document.createElement('div');
	item1.setAttribute('class', 'c-popup-item');
	item1.innerHTML = '车牌号码 : ' + result.carNo[0];
	div.appendChild(item1);

	var item2 = document.createElement('div');
	item2.setAttribute('class', 'c-popup-item');
	item2.innerHTML = '设备类型 : 出租车';
	div.appendChild(item2);

	var item3 = document.createElement('div');
	item3.setAttribute('class', 'c-popup-item');
	item3.innerHTML = '定位时间 : ' + result.timeVec[0][j];
	div.appendChild(item3);

	var item4 = document.createElement('div');
	item4.setAttribute('class', 'c-popup-item');
	item4.innerHTML = '经度纬度 : ( ' + result.posVec[0][j][1].toFixed(6) + ' , ' + result.posVec[0][j][0].toFixed(6) + ' )';
	div.appendChild(item4);

	return div;
}

export function getDiv3(list, s, e) {
	var div;
	var label = list.label;
	var department = list.department;
	var mile = list.mile.toFixed(2);
	var sTime = new Date(s);
	var eTime = new Date(e);

	div = document.createElement('div');
	div.setAttribute('class', 'c-popup-div');

	var title = document.createElement('div');
	title.setAttribute('class', 'c-popup-title');
	title.innerHTML = '设备信息'
	div.appendChild(title);

	var item1 = document.createElement('div');
	item1.setAttribute('class', 'c-popup-item');
	item1.innerHTML = '车牌号码 : ' + label;
	div.appendChild(item1);

	// var item2= document.createElement('div');
	// item2.setAttribute('class','c-popup-item');
	// item2.setAttribute('title',department);
	// item2.innerHTML = '所属部门 : ' + department;
	// div.appendChild(item2);

	var item3 = document.createElement('div');
	item3.setAttribute('class', 'c-popup-item');
	item3.innerHTML = '起始时间 : ' + format(sTime);
	div.appendChild(item3);

	var item4 = document.createElement('div');
	item4.setAttribute('class', 'c-popup-item');
	item4.innerHTML = '终止时间 : ' + format(eTime);
	div.appendChild(item4);

	var item5 = document.createElement('div');
	item5.setAttribute('class', 'c-popup-item');
	item5.innerHTML = '总里程数 : ' + mile + ' (公里)';
	div.appendChild(item5);

	return div;
}
/****
 * 创建轨迹点消息DIV
 */
export function getContentPosition(result) {
	var div;
	var taxiNo = result["code"];
	var time = moment(result["time"]).format('YYYY-MM-DD HH:mm:ss');
	var lng = parseFloat(result["lng"]).toFixed(5);
	var lnt = parseFloat(result["lat"]).toFixed(5);

	div = document.createElement('div');
	div.setAttribute('class', 'c-popup-div');

	var title = document.createElement('div');
	title.setAttribute('class', 'c-popup-title');
	title.innerHTML = '设备信息'
	div.appendChild(title);

	var item1 = document.createElement('div');
	item1.setAttribute('class', 'c-popup-item');
	item1.innerHTML = '设备号码 : ' + taxiNo;
	div.appendChild(item1);

	var item2 = document.createElement('div');
	item2.setAttribute('class', 'c-popup-item');
	item2.innerHTML = '经度坐标 : ' + lng;
	div.appendChild(item2);

	var item3 = document.createElement('div');
	item3.setAttribute('class', 'c-popup-item');
	item3.innerHTML = '纬度坐标 : ' + lnt;
	div.appendChild(item3);

	var item4 = document.createElement('div');
	item4.setAttribute('class', 'c-popup-item');
	item4.innerHTML = '定位时间 : ' + time;
	div.appendChild(item4);
	return div;
}
/***
 * 计算旋转角度
 * a、b为Point
 */
export const computeSegmentHeading = (a, b) =>
	((Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI) + 90 + 360) % 360;


export default {
	format,
	getDate,
	sort,
	azimuthAngle
}