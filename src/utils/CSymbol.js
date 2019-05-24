/****
 * 符号结构
 * @param {Object} url
 * @param {Object} width
 * @param {Object} height
 * @param {Object} angle
 */
function CSymbol(options){
	this.url=options && options.url?options.url:'';
	this.width=options && options.width?options.width:0;
	this.height=options && options.height?options.height:0;
	this.angle=options && options.angle?options.angle:0;//旋转角度,默认图片与正北方向的角度
	this.label=options && options.label?options.label:"";//用于显示
	this.name=options && options.name?options.name:"";//用于标识
	this.color=options && options.color?options.color:"";//用于标识
}
export default CSymbol;
