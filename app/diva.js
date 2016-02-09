var diva = (function() {
	var evts = [];
	var self = this;
	window.onscroll = onScroll;

	function onScroll(e) {
		for (var i in evts) {
			var evt = evts[i];
			if ((evt.total == -1 || evt.count < evt.total)) {
				if (elementIsInView(evt.element)) {
					if (!evt.triggered) {
						evt.callback.call(self);
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

	function elementIsInView(element) {
		var el = getElementPosition(element);
		el.width = element.offsetWidth;
		el.height = element.offsetHeight;

		var screenUpperBound = window.scrollY;
		var screenLowerBound = window.scrollY + Math.min(window.screen.height, window.innerHeight, window.outerHeight);
		var elementUpperBound = el.top;
		var elementLowerBound = el.top + el.height;
		var screenLeftBound = window.scrollX;
		var screenRightBound = window.scrollX + Math.min(window.screen.width, window.innerWidth, window.innerHeight);
		var elementLeftBound = el.left;
		var elementRightBound = el.left + el.width;

		return ((elementUpperBound <= screenUpperBound && elementUpperBound < screenLowerBound && elementLowerBound > screenLowerBound && elementLowerBound > screenUpperBound) || (elementUpperBound >= screenUpperBound && elementUpperBound < screenLowerBound && elementLowerBound > screenLowerBound) || (elementLowerBound >= screenUpperBound && elementLowerBound < screenLowerBound && elementUpperBound < screenUpperBound)) && 
				((elementLeftBound <= screenLeftBound && elementLeftBound < screenRightBound && elementRightBound > screenRightBound && elementRightBound > screenLeftBound) || (elementLeftBound >= screenLeftBound && elementLeftBound < screenRightBound && elementRightBound > screenRightBound) || (elementRightBound >= screenLeftBound && elementRightBound < screenRightBound && elementLeftBound < screenLeftBound));
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

	function addEvent(selector, count, callback) {
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
			total: count,
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
		once: function(selector, callback) {
			addEvent(selector, 1, callback);
		},
		always: function(selector, callback) {
			addEvent(selector, -1, callback);
		},
		sometimes: function(selector, num, callback) {
			addEvent(selector, num, callback);
		},
		destroy: function(element) {
			if (typeof element === 'string' || typeof element === 'object') removeEvent(element);
		}
	};
})();