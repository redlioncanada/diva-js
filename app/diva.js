module.exports = (function() {
	var evts = [];
	var self = this;
	window.onscroll = onScroll;

	function onScroll(e) {
		for (var i in evts) {
			var evt = evts[i];
			if ((evt.total == -1 || evt.count < evt.total)) {
				if (elementIsInView(evt.element, evt.offset)) {
					if (!evt.triggered) {
						evt.callback.call(self,evt);
						evt.triggered = true;
						evt.count++;
					}
				} else {
					if (evt.triggered) {
						evt.triggered = false;
					}
				}
			} else {
				removeEvent(i);
			}
		}
	}

	function elementIsInView(element, offset) {
		var el = getElementPosition(element), percentOffset = false;
		el.width = element.offsetWidth;
		el.height = element.offsetHeight;

		var windowHeight = Math.min(window.screen.height, window.innerHeight, window.outerHeight);
		var windowWidth = Math.min(window.screen.width, window.innerWidth, window.innerHeight);
		offset = computeBoundsOffset(offset, windowHeight, windowWidth);
		var screenUpperBound = window.scrollY + offset;
		var screenLowerBound = window.scrollY + windowHeight - offset;
		var elementUpperBound = el.top;
		var elementLowerBound = el.top + el.height;
		var screenLeftBound = window.scrollX + offset;
		var screenRightBound = window.scrollX + windowWidth - offset;
		var elementLeftBound = el.left;
		var elementRightBound = el.left + el.width;

		return ((elementUpperBound <= screenUpperBound && elementUpperBound < screenLowerBound && elementLowerBound > screenLowerBound && elementLowerBound > screenUpperBound) || (elementUpperBound >= screenUpperBound && elementUpperBound < screenLowerBound && elementLowerBound > screenLowerBound) || (elementLowerBound >= screenUpperBound && elementLowerBound < screenLowerBound && elementUpperBound < screenUpperBound)) && 
				((elementLeftBound <= screenLeftBound && elementLeftBound < screenRightBound && elementRightBound > screenRightBound && elementRightBound > screenLeftBound) || (elementLeftBound >= screenLeftBound && elementLeftBound < screenRightBound && elementRightBound > screenRightBound) || (elementRightBound >= screenLeftBound && elementRightBound < screenRightBound && elementLeftBound < screenLeftBound));
	}

	function computeBoundsOffset(offset, windowHeight) {
		if (!offset) return 0;
		if (typeof offset === 'number') return offset;
		if (typeof offset !== 'string') return 0;
		if (offset.indexOf('%') > -1) percentOffset = true;
		else percentOffset = false;

		offset = parseFloat(offset.replace(/%|px/g, ''));
		if (isNaN(offset)) offset = 0;
		if (percentOffset) offset = windowHeight*offset;
		if (offset > 100) offset = 100;
		if (offset < 0) offset = 0;
		return offset;
	}

	function getElementPosition(el) {
	    var el2 = el;
	    var curtop = 0;
	    var curleft = 0;
	    if (document.getElementById || document.all) {
	        do  {
	            curleft += el.offsetLeft-el.scrollLeft;
	            curtop += el.offsetTop-el.scrollTop;
	            el = el.offsetParent;
	            el2 = el2.parentNode;
	            while (el2 != el) {
	                curleft -= el2.scrollLeft;
	                curtop -= el2.scrollTop;
	                el2 = el2.parentNode;
	            }
	        } while (el.offsetParent);

	    } else if (document.layers) {
	        curtop += el.y;
	        curleft += el.x;
	    }
	    return {top:curtop, left:curleft};
	}

	function addEvent(selector, opts, callback) {
		if (typeof opts === 'function') {
			callback = opts;
			opts = {};
		}

		var element = selector;
		if (typeof element === 'string') {
			if (element.indexOf('#') > -1 || element.indexOf('.') == -1) {
				element = element.replace(/\.|#/g, '');
				element = document.getElementById(element);
			} else if (element.indexOf('.') > -1) {
				element = element.replace(/\.|#/g, '');
				element = document.getElementsByClassName(element)[0];
			}
		}
		if (!element || element === null || typeof callback !== 'function') return;
		evts.push({
			selector: typeof selector === 'string' ? selector : element,
			element: element,
			count: 0,
			offset: opts.offset ? opts.offset : 0,
			total: opts.count ? opts.count : -1,
			callback: callback,
			triggered: false
		});
		onScroll();
	}

	function removeEvent(at) {
		if (typeof at === 'number') {
			evts.splice(index, 1);
		} else if (typeof at === 'string') {
			for (var i in evts) {
				if (evts[i].selector === at) {
					evts.splice(i, 1);
				}
			}
		} else if (typeof at === 'object') {
			for (var j in evts) {
				if (evts[j].element === at) {
					evts.splice(j, 1);
				}
			}
		}
	}

	return {
		events: evts,
		once: function(selector, opts, callback) {
			addEvent(selector, opts, callback);
		},
		always: function(selector, opts, callback) {
			addEvent(selector, opts, callback);
		},
		sometimes: function(selector, opts, callback) {
			addEvent(selector, opts, callback);
		},
		destroy: function(element) {
			if (typeof element === 'string' || typeof element === 'object') removeEvent(element);
		}
	};
})();