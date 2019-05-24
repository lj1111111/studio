import track_start from "../symbols/track_start.png"
import track_end from "../symbols/track_end.png"
import track_car from "../symbols/track_car.png"

import track_czc_a1 from "../symbols/track_czc_a1.png" //出租车
import track_jc_b1 from "../symbols/track_jc_b1.png" //警车
import track_gjc_c1 from "../symbols/track_gjc_c1.png" //公交车
import track_sjc_d1 from "../symbols/track_sjc_d1.png" //私家车
import track_hc_e1 from "../symbols/track_hc_e1.png" //货车
import marker_icon from "../symbols/marker-icon.png" //marker
import CSymbol from '../../../../utils/CSymbol.js'

var w = 25,
	h = 39;
var DW = 40;
var DH = 20;
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
	new CSymbol({
		url: track_car,
		width: DW,
		height: DH,
		angle: 90,
		label: "汽车",
		name: "track_car",
		color:'#0000FF'
	}),
	new CSymbol({
		url: track_czc_a1,
		width: DW,
		height: DH,
		angle: 90,
		label: "出租车",
		name: "A1",
		color:'#00FFFF'
	}),
	new CSymbol({
		url: track_jc_b1,
		width: DW,
		height: DH,
		angle: 90,
		label: "警车",
		name: "B1",
		color:'#00E500'
	}),
	new CSymbol({
		url: track_gjc_c1,
		width: DW,
		height: DH,
		angle: 90,
		label: "公交车",
		name: "C1",
		color:'#FFF143'
	}),
	new CSymbol({
		url: track_sjc_d1,
		width: DW,
		height: DH,
		angle: 90,
		label: "私家车",
		name: "D1",
		color:'#FF23E4'
	}),
	new CSymbol({
		url: track_hc_e1,
		width: DW,
		height: DH,
		angle: 90,
		label: "货车",
		name: "E1",
		color:'#F00056'
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
	findSymbol,
	marker_icon
}