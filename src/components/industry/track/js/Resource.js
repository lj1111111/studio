import track_start from "../symbols/track_start.png"
import track_end from "../symbols/track_end.png"
import track_car from "../symbols/track_car.png"
import CSymbol from '../../../../utils/CSymbol.js'

var w = 25,
	h = 39;
const trackStart = new CSymbol({
	url: track_start,
	width: w,
	height: h,
	angle: 0,
	label: "起点",
	name: "track_start"
})
const trackEnd = new CSymbol({
	url: track_end,
	width: w,
	height: h,
	angle: 0,
	label: "终点",
	name: "track_end"
})
//轨迹符号库
const trackSymbols = [
	new CSymbol ({
		url: track_car,
		width: 52,
		height: 26,
		angle: 90,
		label: "汽车",
		name: "track_car"
	})
]
/***
 * 根据名称查找符号
 * @param {Object} name 符号名称
 */
function findSymbol(name) {
	var len = trackSymbols.length;
	for(var i = 0; i < len; i++) {
		if(trackSymbols[i].name == name) {
			return trackSymbols[i];
		}
	}
    return trackSymbols[0];
}
export default {
	trackStart,
	trackEnd,
	findSymbol
}