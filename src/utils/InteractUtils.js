import interact from 'interactjs' //http://interactjs.io/

let transformProp = 'transform',
	transitionProp = 'transition';
//transform和transition的兼容性
if(document && document.body && document.body.style) {
	transformProp = 'transform' in document.body.style ?
		'transform' : 'webkitTransform' in document.body.style ?
		'webkitTransform' : 'mozTransform' in document.body.style ?
		'mozTransform' : 'oTransform' in document.body.style ?
		'oTransform' : 'msTransform' in document.body.style ?
		'msTransform' : null;
	transitionProp = 'transition' in document.body.style ?
		'transition' : 'webkitTransition' in document.body.style ?
		'webkitTransition' : 'mozTransition' in document.body.style ?
		'mozTransition' : 'oTransition' in document.body.style ?
		'oTransition' : 'msTransition' in document.body.style ?
		'msTransition' : null;
	if(!transformProp || !transitionProp) {
		console.log('浏览器版本太低了? 不支持transform和transition，升级下吧！')
	}
}

/****
 * 设置元素可拖拽
 * @param {Object} el
 */
function drag(el, options, callback, endFunc, startFunc) {
	options = options || {};
	let obj = {
		onstart: function(event) {
//			event.preventDefault();
//			event.stopPropagation();
			//console.log('drag-onstart')
//			console.log(event);
			if(startFunc) {
				startFunc();
			}
		},
		onmove: function(event) {
			//console.log('drag-onmove')
			//console.log(event)
			callback({
				"id": el,
				left: event.dx,
				top: event.dy,
				width: 0,
				height: 0
			});
			//			scroll(event.pageX,event.pageY);
		},
		onend: function(event) {
			//console.log('drag-onend')
			endFunc && endFunc();
		},
		...options
	};
	interact(el).draggable(obj);
}

function close(el) {
	interact(el).draggable(false).resizable(false);
}

function scroll(x, y) {
	let ele = document.querySelector(".app-content");
	ele.scrollTo(x, y);
}
/***
 * 设置元素大小调整
 * @param {Object} el
 * @param {Object} options
 * @param {Object} callback
 */
function resize(el, options, callback, endFunc) {
	options = options || {};
	let obj = {
		onstart: function(event) {
			//console.log('resize-onstart')
		},
		onmove: function(event) {
			//console.log('resize-onmove')
			//x += event.deltaRect.left;
			//y += event.deltaRect.top;
			//console.log(event);
			//console.log(event.deltaRect);
			//console.log(event.rect);
			//处理超出画布区处理
			var dLeft = 0,
				dTop = 0,
				dWidth = 0,
				dHeight = 0;
			var bounds = null;
			var parent = event.target.offsetParent;
			bounds = parent && parent.getBoundingClientRect();
			var d = 2; //误差
			if(bounds) {
				//限制在画布区
				if(event.pageX + d >= bounds.left && event.pageX - d <= bounds.left + bounds.width && event.pageY + d >= bounds.top && event.pageY - d <= bounds.top + bounds.height) {
					if(bounds.left > event.rect.left) {
						dLeft = 0;
					} else {
						dLeft = Math.ceil(event.deltaRect.left);
					}
					if(bounds.top > event.rect.top) {
						dTop = 0;
					} else {
						dTop = Math.ceil(event.deltaRect.top);
					}
					if(bounds.width < event.rect.width) {
						dWidth = 0;
					} else {
						dWidth = Math.ceil(event.deltaRect.width);
					}
					if(bounds.height < event.rect.height) {
						dHeight = 0;
					} else {
						dHeight = Math.ceil(event.deltaRect.height);
					}
				}
			} else {
				dLeft = Math.ceil(event.deltaRect.left);
				dTop = Math.ceil(event.deltaRect.top);
				dWidth = Math.ceil(event.deltaRect.width);
				dHeight = Math.ceil(event.deltaRect.height);
			}
			callback({
				"id": el,
				"left": dLeft,
				"top": dTop,
				"width": dWidth,
				"height": dHeight
			});
		},
		onend: function(event) {
			//console.log('resize-onend')
			endFunc && endFunc();
		},
		...options
	};
	interact(el).resizable(obj);
	//	interact(el).on("down",function(event){
	//		event.preventDefault();
	//		event.stopPropagation();
	//	})
}
export {
	drag as interactDrag,
	resize as interactResize
}