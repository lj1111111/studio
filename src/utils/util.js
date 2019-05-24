let lastId = 0;

export function stamp(obj) {
	/*eslint-disable */
	obj._popo_id = obj._popo_id || ++lastId;

	return obj._popo_id;
	/*eslint-enable */
}

export function bind(fn, obj) {
	if(!obj) return fn;
	const slice = Array.prototype.slice,
		args = slice.call(arguments, 2);

	if(fn.bind) {
		return fn.bind.apply(fn, slice.call(arguments, 1));
	}

	return function _fn() {
		return fn.apply(obj, args.length ? args.concat(slice.call(arguments)) : arguments);
	};
}

export function extend(dest) {
	for(let j = 1, len = arguments.length; j < len; j++) {
		const src = arguments[j];

		for(const i in src) {
			dest[i] = src[i];
		}
	}

	return dest;
}

export function legalNumber(v, min, max) {
	if(!isNumber(v)) {
		return v;
	}
	if(isNumber(min)) {
		if(v < min) return min;
	}
	if(isNumber(max)) {
		if(v > max) return max;
	}

	return v;
}

export function trim(str) {

	if(!isString(str)) {
		return str;
	}

	return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

export function splitWords(str) {
	return trim(str).split(/\s+/);
}

function type(o, t) {
	return(Object.prototype.toString.call(o) === `[object ${t}]`);
}

export function isArray(obj) {
	return type(obj, 'Array');
}

export function isString(obj) {
	return type(obj, 'String');
}

export function isNumber(obj) {
	return type(obj, 'Number');
}

export function isFunction(obj) {
	return type(obj, 'Function');
}

export function isObject(obj) {
	return type(obj, 'Object');
}

export function isEmptyObject(e) {
	if(!isObject(e)) return false;

	for(const t in e) {
		return !1;
	}

	return !0;
}

export function validateNumber(num) {
	return !isNaN(Number(num));
}

export function mixin(obj, sources) {
	if(isObject(sources)) {
		for(const key in sources) {
			if(isObject(sources[key])) {
				if(!isObject(obj[key])) {
					obj[key] = {};
				}
				mixin(obj[key], sources[key]);
			} else {
				obj[key] = sources[key];
			}
		}
	}

	return obj;
}

export function mixins(obj, sourcesArr) {
	if(isArray(sourcesArr)) {
		sourcesArr.forEach((source) => {
			mixin(obj, source);
		});
	}

	return obj;
}

export function getObjectFromArray(arr, key, value) {
	return arr.filter((i) => i[key] === value)[0];
}

export function removeObjectFromArray(arr, key, value) {
	for(let i = 0, len = arr.length; i < len; i++) {
		if(arr[i][key] === value) {
			return arr.splice(i, 1);
		}
	}

	return [];
}

export function get(dom) {
	return dom && typeof dom === 'string' ? document.getElementById(dom) : dom;
}

function _isDOM1(obj) {
	return obj instanceof HTMLElement;
}

function _isDOM2(obj) {
	return !!obj && typeof obj === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
}

export const isDOM = (typeof HTMLElement === 'object') ? _isDOM1 : _isDOM2;

export function cloneJsonObject(obj) {
	return isObject(obj) ? JSON.parse(JSON.stringify(obj)) : obj;
}

export function merge(target, source) {
	const copyObj = {},
		copyFuns = {};

	for(const key in target) {
		if(!isFunction(target[key])) {
			copyObj[key] = target[key];
		} else {
			copyFuns[key] = target[key];
		}
	}
	/*eslint-disable */
	const newObj = mixin(JSON.parse(JSON.stringify(copyObj)), source);
	/*eslint-enable */
	for(const key in copyFuns) {
		newObj[key] = copyFuns[key];
	}

	return newObj;
}

export function getPercentage(number, init) {
	return legalNumber(number || init || 0, 0, 1) * 100;
}

export function capitalize(str) {
	return isString(str) ? (str.charAt(0).toUpperCase() + str.slice(1)) : str;
};

export function reverseCamelcase(n) {
	return n.replace(/[A-Z]/g, (l) => `-${l.toLowerCase()}`);
}

export function camelize(target) {
	if(!target || (target.indexOf('-') < 0 && target.indexOf('_') < 0)) {
		return target;
	}

	return target.replace(/[-_][^-_]/g, (match) => match.charAt(1).toUpperCase());
}

export function unique(array) {
	const r = [];

	for(let i = 0, l = array.length; i < l; i++) {
		for(let j = i + 1; j < l; j++) {
			if(array[i] === array[j]) j = ++i;
		}
		r.push(array[i]);
	}

	return r;
}

export function firstUpperCase(str) {
	return str.toLowerCase().replace(/( |^)[a-z]/g, (L) => L.toUpperCase());
}

export function isPercentage(num) {
	return(isString(num) && num.indexOf('%') > 0) || (num >= -1 && num <= 1);
}

export function translatePercentage(num) {

	if(isString(num)) {
		const index = num.indexOf('%');

		if(index > 0) {
			return Number(num.substring(0, index)) / 100;
		}

		if(validateNumber(num)) {
			return Number(num);
		}

	}

	return num;
}

export function translateNumberToPercentage(num) {
	return `${num * 100}%`;
}

export function contain(arr, item) {
	for(let i = 0; i < arr.length; i++) {
		if(arr[i] === item) {
			return i;
		}
	}

	return -1;
}

export function throttle(fn, time, context) {
	let lock = null,
		args = null;

	function later() {
		lock = false;
		if(args) {
			wrapperFn.apply(context, args);
			args = false;
		}
	}

	function wrapperFn() {
		if(lock) {
			args = arguments;
		} else {
			fn.apply(context, arguments);
			setTimeout(later, time);
			lock = true;
		}
	}

	return wrapperFn;
}

export function formatNum(num, digits) {
	const pow = Math.pow(10, digits || 5);

	return Math.round(num * pow) / pow;
}

// 56, 56%, 0, 1, 0.5
export function formatNumber(n) {
	if(isNumber(n) && !isNaN(n)) {
		return n;
	}
	if(isString(n)) {
		if(validateNumber(n)) return Number(n);

		return translatePercentage(n);
	}

	return 0;
}

export function getCssSize(size, scale) {
	scale = scale || 1;
	if(isString(size)) {
		if(size.indexOf('%') > 0) {
			return size;
		}
		if(size.indexOf('px') > 0) {
			return `${getPureValue(size) * scale}px`;
		}
		if(validateNumber(size)) {
			return `${Number(size) * scale}px`;
		}
	}
	if(validateNumber(size)) {
		return `${size * scale}px`;
	}

	return '0px';
}

export function multiplyBy(n, m) {
	n = formatNumber(n);
	m = m || 1;
	if(n === 0) return n;
	if(n <= 1) {
		return m * n;
	}
	if(n > 1) {
		return n;
	}

	return n;
}

export function getPureValue(val) {
	if(isString(val) && val.indexOf('px') > 0) {
		val = trim(val);

		return Number(val.substring(0, val.indexOf('px')));
	}

	return val;
}

export function formatMargin(margin, scale) {
	scale = scale || 1;
	if(!margin) {
		margin = '0 0';
	}
	if(isString(margin)) {
		const p = splitWords(margin).map((m) => getPureValue(m));

		if(isArray(p)) {
			if(p.length === 4) {
				return {
					top: Number(p[0]) * scale,
					right: Number(p[1]) * scale,
					bottom: Number(p[2]) * scale,
					left: Number(p[3]) * scale,
				};
			}
			if(p.length === 2) {
				return {
					top: Number(p[0]) * scale,
					right: Number(p[1]) * scale,
					bottom: Number(p[0]) * scale,
					left: Number(p[1]) * scale,
				};
			}
			if(p.length === 1) {
				margin = Number(margin);
			}
		}
	}
	if(isNumber(margin) && margin >= 0) {
		return {
			top: margin * scale,
			right: margin * scale,
			bottom: margin * scale,
			left: margin * scale,
		};
	}

	return null;
}

function _getScaleMargin(margin, scale) {
	scale = scale || 1;
	if(margin && isString(margin)) {
		if(margin.indexOf('%') > 0) {
			return `${translatePercentage(margin) * 100}%`;
		}
		if(margin.indexOf('px') > 0) {
			return `${Number(getPureValue(margin)) * scale}px`;
		}
	}
	if(validateNumber(margin)) {
		return `${Number(margin) * scale}px`;
	}

	return '0px';
}

export function formatMargin2(margin, scale) {
	if(!margin) {
		margin = '0 0';
	}
	scale = scale || 1;
	if(validateNumber(margin)) {
		margin = String(margin);
	}
	let p = [];

	if(isString(margin)) {
		p = splitWords(margin);

		if(p.length === 2) {
			p = p.concat([p[0], p[1]]);
		}
		if(p.length === 3) {
			p.push(p[2]);
		}
		if(p.length === 1) {
			p = p.concat([p[0], p[0], p[0]]);
		}
	}

	return p.length === 4 ? {
		top: _getScaleMargin(p[0], scale),
		right: _getScaleMargin(p[1], scale),
		bottom: _getScaleMargin(p[2], scale),
		left: _getScaleMargin(p[3], scale),
	} : null;
}
export const deepClone = (obj) => {
	return JSON.parse(JSON.stringify(obj));
}
/****
 * 产生随机数
 * return 1~n
 */
export const randomNum = (n) => {
	n = n || 500;
	return Math.floor(Math.random() * n + 1);
}
//当前已存在的code
var codes = [];
/****
 * 生成指定位数的Code
 */
export function makeCode(len) {
	len = len || 6;
	var codeChars = new Array(
		0, 1, 2, 3, 4,
		5, 6, 7, 8, 9,
		'a', 'b', 'c', 'd', 'e',
		'f', 'g', 'h', 'i', 'j',
		'k', 'l', 'm', 'n', 'o',
		'p', 'q', 'r', 's', 't',
		'u', 'v', 'w', 'x', 'y',
		'z',
		'A', 'B', 'C', 'D', 'E',
		'F', 'G', 'H', 'I', 'J',
		'K', 'L', 'M', 'N', 'O',
		'P', 'Q', 'R', 'S', 'T',
		'U', 'V', 'W', 'X', 'Y',
		'Z');
	var count = codeChars.length;
	var code = "";
	for(var i = 0; i < len; i++) {
		var charNum = Math.floor(Math.random() * count);
		code += codeChars[charNum];
	}
	if(codes.indexOf(code) >= 0) {
		makeCode(len);
	} else {
		codes.push(code);
	}
	return code;
}
/****
 * 查找字段映射名称
 * 
 */
export function getField(fieldName, fields) {
	var name = "";
	var len = fields ? fields.length : 0;
	for(var i = 0; i < len; i++) {
		if(fieldName == fields[i].source) {
			name = fields[i].target ? fields[i].target : fields[i].source;
			break;
		}
	}
	return name;
};
export function isInteger(obj) {
	return typeof obj === 'number' && obj % 1 === 0; //是整数，则返回true，否则返回false  
}
export function numberFormat(number, decimals, dec_point, thousands_sep, roundtag) {
	/*
	 * 参数说明：
	 * number：要格式化的数字
	 * decimals：保留几位小数
	 * dec_point：小数点符号
	 * thousands_sep：千分位符号
	 * roundtag:舍入参数，默认 "ceil" 向上取,"floor"向下取,"round" 四舍五入
	 * */
	number = (number + '').replace(/[^0-9+-Ee.]/g, '');
	roundtag = roundtag || "ceil"; //"ceil","floor","round"
	var n = !isFinite(+number) ? 0 : +number,
		prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
		sep = (typeof thousands_sep === 'undefined') ? '' : thousands_sep,
		dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
		s = '',
		toFixedFix = function(n, prec) {
			var k = Math.pow(10, prec);
			return '' + parseFloat(Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(prec * 2)) / k;
		};
	s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	var re = /(-?\d+)(\d{3})/;
	if(sep) {
		while(re.test(s[0])) {
			s[0] = s[0].replace(re, "$1" + sep + "$2");
		}
	}
	if((s[1] || '').length < prec) {
		s[1] = s[1] || '';
		s[1] += new Array(prec - s[1].length + 1).join('0');
	}
	return s.join(dec);
}
/****
 * 把带有'-'字符串转成首字符为大写，例如 border-bottom-color->BorderBottomColor
 */
export function tranformStr(str) {
	var strArr = str.split('-');
	for(var i = 0; i < strArr.length; i++) {
		strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].substring(1);
	}
	return strArr.join('');
}
//获取dom节点距离屏幕左上角的距离
export function getOffsetNew(el) {
	if(!(el instanceof HTMLElement)) {
		console.log('getOffset发生错误，传进来的参数不是一个dom节点');
		return;
	}
	let left = 0,
		top = 0;
	while(el) {
		left += el.offsetLeft;
		top += el.offsetTop;
		el = el.offsetParent;
	}
	return {
		left: left,
		top: top
	}
}
//获取dom节点距离屏幕左上角的距离
export function getOffsetNew2(el,parentid) {
	if(!(el instanceof HTMLElement)) {
		console.log('getOffset发生错误，传进来的参数不是一个dom节点');
		return;
	}
	let left = 0,
		top = 0;
	while(el) {
		left += el.offsetLeft;
		top += el.offsetTop;
		if(parentid)
		{
			el = el.offsetParent && el.offsetParent.id!=parentid?el.offsetParent:null;
		}
		else
		{
			el = el.offsetParent;
		}
	}
	return {
		left: left,
		top: top
	}
}