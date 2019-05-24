import interact from 'interactjs' //http://interactjs.io/
export {
	interactDrag,
	interactDrop,
	interactDrag_noDrop,
	interactResize
}

let _transformProp = 'transform',
	_transitionProp = 'transition',
	_isDrop = false, //组件是否可放置
	_pageX = 0, //组件放下时鼠标距离左上角的x距离
	_pageY = 0, //组件放下时鼠标距离左上角的y距离
	_x0 = 0, //组件开始拖拽时鼠标距离左上角的x距离
	_y0 = 0, //组件开始拖拽时鼠标距离左上角的y距离
	_tempX = 0, //组件开始拖拽时组件左上角距离屏幕左上角的x距离
	_tempY = 0, //组件开始拖拽时组件左上角距离屏幕左上角的y距离
	_name = '', //拖拽放下的组件名
	_storage = {}; //用来缓存需要大量计算而且重复的操作

//获取dom节点距离屏幕左上角的距离
function _getOffset(el) {
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

//设置组件可放置的容器
function interactDrop(el, acceptTarget, dropCallback) {
	interact(el).dropzone({
		accept: acceptTarget,
		overlap: 1,
		//计算出放置下去的组件相对于 可放置容器的left，top距离。		
		ondrop(event) {
			let target = event.target,
				offset = _getOffset(target),
				targetX = offset.left,
				targetY = offset.top,
				width = target.offsetWidth,
				height = target.offsetHeight,
				scale = target.getAttribute('data-scale');
			if(scale === undefined) {
				console.log('target没有data-scale属性，目标错误？')
				return;
			}
			let contain = target.parentNode;
			let left = (_pageX - _x0 + _tempX - targetX + contain.scrollLeft) / scale;
			let top = (_pageY - _y0 + _tempY - targetY + contain.scrollTop) / scale;
			dropCallback({
				left,
				top
			}, _name);
			_isDrop = true;
		}
	});
}

//设置可拖拽，然后放置在容器里
function interactDrag(el) {
	interact(el).draggable({
		restrict: {
			restriction: '#app',
			elementRect: {
				top: 0,
				left: 0,
				bottom: 1,
				right: 1
			}
		},
		onstart(event) {
			let target = event.target,
				offset = _getOffset(target);
			_tempX = offset.left;
			_tempY = offset.top;

			_isDrop = false;
			_name = target.getAttribute('data-name');
			let clonedTarget = target.cloneNode(true);
			target.parentNode.insertBefore(clonedTarget, target);
			Object.assign(target.style, {
				position: 'fixed',
				top: _tempY + 'px',
				left: _tempX + 'px',
				width: target.offsetWidth + 'px',
				height: target.offsetHeight + 'px',
				zIndex: 99999
			})
			//复制一个拖拽中的组件，把他的复制品放在它原来位置，在onend处移除本体。解决组件拖拽后留白的问题。

			target.setAttribute('data-x', _tempX);
			target.setAttribute('data-y', _tempY);
		},
		onmove: _dragMoveListener,
		//onend事件在ondrop之后发生。
		onend(event) {
			let target = event.target,
				time = 0,
				_this = this;
			if(_isDrop) {
				target.style[_transitionProp] = 'none';
				time = 0;
			} else {
				target.style[_transitionProp] = 'all 0.3s';
				time = 300;
			}
			target.style.left = _tempX + 'px';
			target.style.top = _tempY + 'px';
			setTimeout(function() {
				target.parentNode.removeChild(target);
			}, time)
		}
	})
}

//设置可拖拽，在缩放后容器里拖拽
function interactDrag_noDrop(el, endCallback, startCallback) {
	interact(el).draggable({
		restrict: {
			// restriction: 'parent',
			restriction(x, y, target) {
				//如果存在缓存的数据，直接返回。不存在则计算。缓存的数据在onend的时候被清空。
				//'restriction'的函数在onstart之前会执行一次，所以这里不能放到onstart计算。
				if(_storage.InteractDrag_noDrop_Data) {
					return _storage.InteractDrag_noDrop_Data;
				}

				//处理多选的情况
				let allChosentemp = document.querySelectorAll('[data-chosen=true]'),
					{
						left,
						top,
						width,
						height
					} = target.style,
					arr = [];
				for(let temp of allChosentemp) {
					let {
						left,
						top,
						width,
						height
					} = temp.style,
						obj = {
							left: parseInt(left),
							top: parseInt(top),
							width: parseInt(width),
							height: parseInt(height)
						};
					arr.push(obj);
				}
				let minLeftObj = arr.reduce((a, b) => a.left < b.left ? a : b),
					minTopObj = arr.reduce((a, b) => a.top < b.top ? a : b),
					maxWidthObj = arr.reduce((a, b) => (a.left + a.width) > (b.left + b.width) ? a : b),
					maxHeightObj = arr.reduce((a, b) => (a.top + a.height) > (b.top + b.height) ? a : b);

				let dLeft = parseInt(left) - minLeftObj.left,
					dTop = parseInt(top) - minTopObj.top,
					dWidth = (maxWidthObj.left + maxWidthObj.width) - (parseInt(left) + parseInt(width)),
					dHeight = (maxHeightObj.top + maxHeightObj.height) - (parseInt(top) + parseInt(height));

				let parentNode = target.parentNode,
					grandPrentNode = parentNode.parentNode,
					offset = _getOffset(parentNode),
					{
						borderWidth
					} = getComputedStyle(parentNode),
					offsetDistance = parseFloat(borderWidth),
					scale = parentNode.getAttribute('data-scale');
				_storage.InteractDrag_noDrop_Data = {
					x: offset.left + offsetDistance * scale - grandPrentNode.scrollLeft + dLeft * scale,
					y: offset.top + offsetDistance * scale - grandPrentNode.scrollTop + dTop * scale,
					width: parentNode.offsetWidth * scale - 2 * offsetDistance * scale - dWidth * scale - dLeft * scale,
					height: parentNode.offsetHeight * scale - 2 * offsetDistance * scale - dHeight * scale - dTop * scale
				};
				//parent限制的时候，组件可以拖拽到border部分，这里限制到content部分
				return _storage.InteractDrag_noDrop_Data
			},
			elementRect: {
				top: 0,
				left: 0,
				bottom: 1,
				right: 1
			}
		},
		onstart: startCallback,
		onmove: _dragMoveListener_noDrop,
		//放置的时候，根据transform的距离，计算出left，top偏移的距离。
		//把transform的距离归0，放到加到left，top上面。
		onend(event) {
			_storage.InteractDrag_noDrop_Data = null;
			//在拖拽结束的时候把移动的距离记录下来，根据data-id知道是哪个div，传到endCallback里面处理top和left
			let target = event.target,
				offsetLeft = parseFloat(target.getAttribute('data-x')),
				offsetTop = parseFloat(target.getAttribute('data-y'));

			//这里处理多选的情况
			let allChosentemp = document.querySelectorAll('[data-chosen=true]'),
				arr = [];
			for(let temp of allChosentemp) {
				let id = temp.getAttribute('data-id');
				let obj = {
					location: {
						offsetLeft,
						offsetTop
					},
					id
				};
				arr.push(obj);
				temp.setAttribute('data-x', 0);
				temp.setAttribute('data-y', 0);
				temp.style[_transformProp] = 'translate(' + 0 + 'px, ' + 0 + 'px)';
			}
			endCallback(arr);
		}
	})
}

//设置可缩放，包括在缩放后容器里缩放
function interactResize(el, callback, edges) {
	interact(el).resizable({
		edges,
		//edges是组件允许拖拽的位置
		restrict: {
			// restriction: 'parent',
			restriction(x, y, target) {
				//如果存在缓存的数据，直接返回。不存在则计算。缓存的数据在onend的时候被清空。
				//'restriction'的函数在onstart之前会执行一次，所以这里不能放到onstart计算。
				if(_storage.InteractResize_Data) {
					return _storage.InteractResize_Data;
				}

				//处理多选的情况
				let allChosentemp = document.querySelectorAll('[data-chosen=true]'),
					{
						left,
						top,
						width,
						height
					} = target.style,
					arr = [];
				for(let temp of allChosentemp) {
					let {
						left,
						top,
						width,
						height
					} = temp.style,
						obj = {
							left: parseInt(left),
							top: parseInt(top),
							width: parseInt(width),
							height: parseInt(height)
						};
					arr.push(obj);
				}
				let minLeftObj = arr.reduce((a, b) => a.left < b.left ? a : b),
					minTopObj = arr.reduce((a, b) => a.top < b.top ? a : b),
					maxWidthObj = arr.reduce((a, b) => (a.left + a.width) > (b.left + b.width) ? a : b),
					maxHeightObj = arr.reduce((a, b) => (a.top + a.height) > (b.top + b.height) ? a : b);

				let dLeft = parseInt(left) - minLeftObj.left,
					dTop = parseInt(top) - minTopObj.top,
					dWidth = (maxWidthObj.left + maxWidthObj.width) - (parseInt(left) + parseInt(width)),
					dHeight = (maxHeightObj.top + maxHeightObj.height) - (parseInt(top) + parseInt(height));

				let parentNode = target.parentNode,
					grandPrentNode = parentNode.parentNode,
					offset = _getOffset(parentNode),
					{
						borderWidth
					} = getComputedStyle(parentNode),
					offsetDistance = parseFloat(borderWidth),
					scale = parentNode.getAttribute('data-scale');
				_storage.InteractResize_Data = {
					x: offset.left + offsetDistance * scale - grandPrentNode.scrollLeft + dLeft * scale,
					y: offset.top + offsetDistance * scale - grandPrentNode.scrollTop + dTop * scale,
					width: parentNode.offsetWidth * scale - 2 * offsetDistance * scale - dWidth * scale - dLeft * scale,
					height: parentNode.offsetHeight * scale - 2 * offsetDistance * scale - dHeight * scale - dTop * scale
				};
				console.log(_storage.InteractResize_Data)
				//parent限制的时候，组件可以拖拽到border部分，这里限制到content部分
				return _storage.InteractResize_Data
			},
			elementRect: {
				top: 1,
				left: 1,
				bottom: 1,
				right: 1
			}
		},
		onstart(event) {

		},
		onmove: _resizeMoveListener,
		//缩放结束的时候，根据transform的距离，计算出left，top，width，height偏移的距离。
		//把transform的距离归0，放到加到left，top，width，height上面。
		onend(event) {
			_storage.InteractResize_Data = null;

			let target = event.target,
				offsetLeft = parseFloat(target.getAttribute('data-x')),
				offsetTop = parseFloat(target.getAttribute('data-y')),
				id = target.getAttribute('data-id'),
				width = target.offsetWidth,
				height = target.offsetHeight;
			callback({
				offsetLeft,
				offsetTop,
				width,
				height
			}, id);
			target.setAttribute('data-x', 0);
			target.setAttribute('data-y', 0);
			target.style[_transformProp] = 'translate(' + 0 + 'px, ' + 0 + 'px)';
		}
	})
}

//调整大小时触发的函数
function _resizeMoveListener(event) {
	let target = event.target,
		x = (parseFloat(target.getAttribute('data-x')) || 0),
		y = (parseFloat(target.getAttribute('data-y')) || 0);

	let parent = event.target.parentNode,
		scale = parent.getAttribute('data-scale');

	if(scale === undefined) {
		console.log('target没有data-scale属性，目标错误？');
		return;
	}
	// update the element's style
	target.style.width = event.rect.width / scale + 'px';
	target.style.height = event.rect.height / scale + 'px';

	x += (event.deltaRect.left / scale);
	y += (event.deltaRect.top / scale);

	target.style[_transformProp] = 'translate(' + x + 'px,' + y + 'px)';

	target.setAttribute('data-x', x);
	target.setAttribute('data-y', y);
}

//中间组件拖拽时触发的函数
function _dragMoveListener_noDrop(event) {
	// console.log('_dragMoveListener_noDrop')
	let parent = event.target.parentNode,
		scale = parent.getAttribute('data-scale');

	if(scale === undefined) {
		console.log('放置的target没有data-scale属性，目标错误？')
		return;
	}
	// _tempX = _getOffset(target).left;
	// _tempY = _getOffset(target).top;
	let target = event.target,
		x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx / scale,
		y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy / scale;

	//这里处理多选的情况
	let allChosentemp = document.querySelectorAll('[data-chosen=true]');
	for(let temp of allChosentemp) {
		if(target !== temp) {
			temp.style[_transformProp] = 'translate(' + x + 'px, ' + y + 'px)';
			temp.style[_transitionProp] = 'none';
			temp.setAttribute('data-x', x);
			temp.setAttribute('data-y', y);
		}
	}

	target.style[_transformProp] = 'translate(' + x + 'px, ' + y + 'px)';
	target.style[_transitionProp] = 'none';
	target.setAttribute('data-x', x);
	target.setAttribute('data-y', y);
}

//左边组件拖拽时触发的函数
function _dragMoveListener(event) {
	//因为onend事件是在ondrop后面发生，同时drop的事件对象里面没有具体的鼠标信息，所以这里记录下鼠标的一些位置
	_pageX = event.pageX;
	_pageY = event.pageY;
	_x0 = event.x0;
	_y0 = event.y0;
	let target = event.target,
		x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
		y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
	target.style.left = x + 'px';
	target.style.top = y + 'px';
	target.setAttribute('data-x', x);
	target.setAttribute('data-y', y);
}

//transform和transition的兼容性
if(document && document.body && document.body.style) {
	_transformProp = 'transform' in document.body.style ?
		'transform' : 'webkitTransform' in document.body.style ?
		'webkitTransform' : 'mozTransform' in document.body.style ?
		'mozTransform' : 'oTransform' in document.body.style ?
		'oTransform' : 'msTransform' in document.body.style ?
		'msTransform' : null;
	_transitionProp = 'transition' in document.body.style ?
		'transition' : 'webkitTransition' in document.body.style ?
		'webkitTransition' : 'mozTransition' in document.body.style ?
		'mozTransition' : 'oTransition' in document.body.style ?
		'oTransition' : 'msTransition' in document.body.style ?
		'msTransition' : null;
	if(!_transformProp || !_transitionProp) {
		console.log('浏览器版本太低了? 不支持transform和transition，升级下吧！')
	}
}