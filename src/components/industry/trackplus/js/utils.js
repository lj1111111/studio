import Resource from './Resource.js'
import moment from 'moment';

/****
 * 计算方位角
 * @param x1
 * @param y1
 * @param x2
 * @param y2
 * @return
 */
export function azimuthAngle(x1, y1, x2, y2) {
	var dx, dy, angle = 0;
	dx = x2 - x1;
	dy = y2 - y1;
	if(x2 == x1) {
		angle = Math.PI / 2.0;
		if(y2 == y1) {
			angle = 0.0;
		} else if(y2 < y1) {
			angle = 3.0 * Math.PI / 2.0;
		}
	} else if((x2 > x1) && (y2 > y1)) {
		angle = Math.atan(dx / dy);
	} else if((x2 > x1) && (y2 < y1)) {
		angle = Math.PI / 2 + Math.atan(-dy / dx);
	} else if((x2 < x1) && (y2 < y1)) {
		angle = Math.PI + Math.atan(dx / dy);
	} else if((x2 < x1) && (y2 > y1)) {
		angle = 3.0 * Math.PI / 2.0 + Math.atan(dy / -dx);
	}
	return(angle * 180 / Math.PI);
}
/***
 * 计算旋转角度
 * a、b为Point
 */
export const computeSegmentHeading = (a, b) => ((Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI) + 90 + 360) % 360;

/****
 * 创建轨迹点消息DIV
 * @params: result格式{code:车牌号,lng:经度,lat:纬度,type:车辆类型,time:定位时间}
 */
export function getContentPosition(result,vil8n) {
	var div;
	var taxiNo = result["code"];
	var time = moment(result["time"] * 1000).format('YYYY-MM-DD HH:mm:ss');
	var lng = parseFloat(result["lng"]).toFixed(5);
	var lnt = parseFloat(result["lat"]).toFixed(5);
	var type = result["type"];
    var  charts=": ";
	div = document.createElement('div');
	div.setAttribute('class', 'c-popup-div');

	var title = document.createElement('div');
	title.setAttribute('class', 'c-popup-title');
	title.innerHTML = vil8n && vil8n.$t('popup.title')? vil8n.$t('popup.title'):'设备信息';
	div.appendChild(title);

	var item1 = document.createElement('div');
	item1.setAttribute('class', 'c-popup-item');
	var key= vil8n && vil8n.$t('popup.device_number')? vil8n.$t('popup.device_number')+charts:'设备号码 : ';
	item1.innerHTML = key + taxiNo;
	div.appendChild(item1);

	var item2 = document.createElement('div');
	item2.setAttribute('class', 'c-popup-item');
	key= vil8n && vil8n.$t('popup.longitude')? vil8n.$t('popup.longitude')+charts:'经度坐标 : ';
	item2.innerHTML = key + lng;
	div.appendChild(item2);

	var item3 = document.createElement('div');
	item3.setAttribute('class', 'c-popup-item');
	key= vil8n && vil8n.$t('popup.latitude')? vil8n.$t('popup.latitude')+charts:'纬度坐标 : ';
	item3.innerHTML = key + lnt;
	div.appendChild(item3);

	var item4 = document.createElement('div');
	item4.setAttribute('class', 'c-popup-item');
	key= vil8n && vil8n.$t('popup.location_time')? vil8n.$t('popup.location_time')+charts:'定位时间 : ';
	item4.innerHTML = key + time;
	div.appendChild(item4);

	var item5 = document.createElement('div');
	item5.setAttribute('class', 'c-popup-item');
	key= vil8n && vil8n.$t('popup.type')? vil8n.$t('popup.type')+charts:'设备类型 : ';
	item5.innerHTML = key + type;
	div.appendChild(item5);
	return div;
}

/****
 * 创建L.Icon图标
 * @params:  name表示车辆类型，比如：A1,B1....
 */
export function createIcon(name, bTrack) {
	var mSymbol = Resource.findSymbol(name);
	if(mSymbol) {
		if(bTrack) {
			var icon = L.icon({
				iconUrl: mSymbol.url,
				iconSize: [mSymbol.width, mSymbol.height],
				iconAnchor: [mSymbol.width / 2, mSymbol.height / 2] //图标的偏移
			});
			return icon;
		} else {
			var icon = L.icon({
				iconUrl: mSymbol.url,
				iconSize: [mSymbol.width, mSymbol.height],
				iconAnchor: [mSymbol.width / 2, 0] //图标的偏移
			});
			return icon;
		}
	} else {
		var icon = new L.IconDefault()
		return icon;
	}
}
/***
 * 根据名称查找符号
 * @param {Object} name 符号名称
 */
export function findSymbol(name) {
	return Resource.findSymbol(name);
}
export var lastId = 0;

export function stamp() {
	var id = ++lastId;
	return id;
}

export function breakApart(start) {
	// Split the hex # into the RGB components
	var temp = new Array()
	temp[0] = parseInt(start.substring(0, 2), 16)
	temp[1] = parseInt(start.substring(2, 4), 16)
	temp[2] = parseInt(start.substring(4, 6), 16)
	return temp
}

function diffParts(startInt, endInt, steps) {
	// Determine the increment amount for each step
	var temp = new Array()
	for(var i = 0; i < 3; i++)
		temp[i] = (endInt[i] - startInt[i]) / steps; //Math.round((endInt[i] - startInt[i]) / steps)
	return temp
}
/****
 * @params startColor格式 FF0000
 */
export function breakColorPart(startColor, endColor, stepCount) {
	var startInt = breakApart(startColor);
	var endInt = breakApart(endColor);
	return diffParts(startInt, endInt, stepCount);
}
export function getSpeedColor(d) {
	return d >= 80 ? '#00CE33' :
		d >= 60 ? '#FFCE0A' :
		d >= 30 ? '#EB0911' :
		'#8B0F05';
}
/***
 * 根据车速计算出样式
 */
export function createLineStyleBySpeed(dlen){
	var color=getSpeedColor(dlen);
	return {
		color: color,
		weight: 8
	}
}
/***
 * 把hex颜色值转成rgb数组
 */
export function colorRgb (scolor){
    var sColor = scolor.toLowerCase();
    //十六进制颜色值的正则表达式
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 如果是16进制颜色
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i=1; i<4; i+=1) {
                sColorNew += sColor.slice(i, i+1).concat(sColor.slice(i, i+1));    
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for (var i=1; i<7; i+=2) {
            sColorChange.push(parseInt("0x"+sColor.slice(i, i+2)));    
        }
        return sColorChange;
    }
    return null;
};
