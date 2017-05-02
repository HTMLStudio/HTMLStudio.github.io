(function(){
	"use strict";
	var settings = new Date().getTime() + Math.round(Math.random() * 1000000);
	// If an element has no offsetParent, then body is used, event if body is set to 'position: static', so this ensures that there's always an offsetParent, even if it's a 'position: relative' body
	window.addEventListener('load', function () {
		if (document.body.style.position == 'static' || getComputedStyle(document.body).position == 'static') document.body.style.position='relative';
	});

	// Event constructors
	function DragInitEvent (element) {
		var ref = element.draggableElement[settings];
		this.target = element;
		this.bounds = ref.bounds;
		this.callbacks = {init: ref.init, start: ref.start, move: ref.move, end: ref.end, done: ref.done};
		this.axes = {x: ref.doX, y: ref.doY};
		ref.coordinates.init.timestamp = this.timestamp = performance && typeof performance.now == 'function' ? performance.now() : new Date().getTime();
		this.coordinates = {
			init: ref.coordinates.init
		};
		this.type = 'draginit';
	};

	function DragStartEvent (element) {
		var ref = element.draggableElement[settings];
		this.target = element;
		this.bounds = ref.bounds;
		this.callbacks = {init: ref.init, start: ref.start, move: ref.move, end: ref.end, frame: ref.frame, done: ref.done};
		this.axes = {x: ref.doX, y: ref.doY};
		this.coordinates = {
			init: ref.coordinates.init,
			start: ref.coordinates.start
		};
		this.timestamp = performance && typeof performance.now == 'function' ? performance.now() : new Date().getTime();
		this.type = 'dragstart';
	};

	function DragMoveEvent (element) {
		var ref = element.draggableElement[settings];
		this.target = element;
		this.bounds = ref.bounds;
		this.callbacks = {init: ref.init, start: ref.start, move: ref.move, end: ref.end, frame: ref.frame, done: ref.done};
		this.axes = {x: ref.doX, y: ref.doY};
		this.coordinates = {
			init: ref.coordinates.init,
			start: ref.coordinates.start,
			move: ref.coordinates.move
		};
		this.distance = ref.coordinates.move.last.distance;
		this.timestamp = performance && typeof performance.now == 'function' ? performance.now() : new Date().getTime();
		this.type = 'dragmove'
	};

	function DragEndEvent (element, hasInertia) {
		var ref = element.draggableElement[settings];
		this.target = element;
		this.bounds = ref.bounds;
		this.callbacks = {init: ref.init, start: ref.start, move: ref.move, end: ref.end, frame: ref.frame, done: ref.done};
		this.axes = {x: ref.doX, y: ref.doY};
		this.coordinates = {
			init: ref.coordinates.init,
			start: ref.coordinates.start,
			move: ref.coordinates.move,
			end: ref.coordinates.end
		};
		this.distance = ref.coordinates.end.distance;
		this.timestamp = performance && typeof performance.now == 'function' ? performance.now() : new Date().getTime();
		this.endDistance = ref.endDistance;
		this.endTime = ref.coordinates.end.timestamp - ref.coordinates.start.timestamp;
		this.hasInertia = hasInertia;
		this.type = 'dragend';
	};

	function DragFrameEvent (element, direction) {
		var ref = element.draggableElement[settings];
		this.target = element;
		this.bounds = ref.bounds;
		this.callbacks = {init: ref.init, start: ref.start, move: ref.move, end: ref.end, frame: ref.frame, done: ref.done};
		this.axes = {x: ref.doX, y: ref.doY};
		this.coordinates = {
			init: ref.coordinates.init,
			start: ref.coordinates.start,
			move: ref.coordinates.move,
			end: ref.coordinates.end,
			frame: ref.coordinates.frame
		};
		this.timestamp = performance && typeof performance.now == 'function' ? performance.now() : new Date().getTime();
		this.distance = this.coordinates.frame.last.distance;
		this.endDistance = ref.endDistance;
		this.endTime = ref.coordinates.end.timestamp - ref.coordinates.start.timestamp;
		this.direction = direction;
		this.type = 'dragframe';
	}

	function DragDoneEvent (element, brokeThreshold, interrupted) {
		var ref = element.draggableElement[settings];
		this.target = element;
		this.bounds = ref.bounds;
		this.callbacks = {init: ref.init, start: ref.start, move: ref.move, end: ref.end, frame: ref.frame, done: ref.done};
		this.axes = {x: ref.doX, y: ref.doY};
		this.coordinates = {
			init: ref.coordinates.init,
			start: ref.coordinates.start,
			move: ref.coordinates.move,
			end: ref.coordinates.end,
			frame: ref.coordinates.frame,
			done: {
				x: element.getBoundingClientRect().left + window.scrollX,
				y: element.getBoundingClientRect().top + window.scrollY,
				timestamp: performance && typeof performance.now == 'function' ? performance.now () : new Date().getTime(),
				distance: {
					x: element.getBoundingClientRect().left + window.scrollX - ref.coordinates.end.x,
					y: element.getBoundingClientRect().top + window.scrollY - ref.coordinates.end.y
				}
			}
		};
		this.timestamp = performance && typeof performance.now == 'function' ? performance.now() : new Date().getTime();
		this.endDistance = ref.endDistance;
		this.doneDistance = {
			x: this.coordinates.done.x - this.coordinates.start.x,
			y: this.coordinates.done.y - this.coordinates.start.y
		};
		this.endTime = ref.coordinates.end.timestamp - ref.coordinates.start.timestamp;
		this.doneTime = ref.coordinates.done.timestamp - ref.coordinates.start.timestamp;
		this.brokeThreshold = brokeThreshold;
		this.interrupted = !interrupted;
		this.type = 'dragdone';
	};


	// Main DraggableElement constructors
	(window.HTMLStudio = window.HTMLStudio || {}).DraggableElement = function DraggableElement (element, args) {
		// Ensures that constructor is always called with 'new'
		if (this == window) return new HTMLStudio.DraggableElement(element, args);
		// Check that element references a valid HTMLElement
		if (!(element instanceof HTMLElement)) {
			if (!arguments.length) throw TypeError('Not enough arguments to DraggableElement.')
			throw TypeError('First argument given must be an instance of HTMLElement.');
		}
		// Gives element reference to DraggableElement
		element.draggableElement = this;
		// Also gives DraggableElement reference back to element
		this.element = element;
		// Allows use of 'in' for non-objects like numbers or strings
		args = new Object(args);
		// Where the settings for the Draggable Element will be stored
		Object.defineProperty(this, settings, {
			configurable: true,
			value: {},
			enumerable: false
		});



		// Sets up .config object
		// Allows user to set properties through assignment, while still filtering invalid values and converting them to the correct data types
		this.config = {};
		Object.defineProperties(this.config, {
			doX: {
				get: function () {return element.draggableElement[settings].doX},
				set: function (v) {element.draggableElement[settings].doX = Boolean(v)},
				enumerable: true
			},
			doY: {
				get: function () {return element.draggableElement[settings].doY},
				set: function (v) {element.draggableElement[settings].doY = Boolean(v)},
				enumerable: true
			},
			css: {
				get: function () {return element.draggableElement[settings].css},
				set: function (v) {element.draggableElement[settings].css = new Object(v)},
				enumerable: true
			},
			inertia: {
				get: function () {return element.draggableElement[settings].inertia},
				set: function (v) {element.draggableElement[settings].inertia = Boolean(v)},
				enumerable: true
			},
			inertiaThreshold: {
				get: function () {return element.draggableElement[settings].inertiaThreshold},
				set: function (v) {if (!isNaN(v)) element.draggableElement[settings].inertiaThreshold = Math.max(0, v)},
				enumerable: true
			},
			inertiaResistance: {
				get: function () {return element.draggableElement[settings].inertiaResistance},
				set: function (v) {if (!isNaN(v)) element.draggableElement[settings].inertiaResistance = Math.min(2.5, Math.max(0, v))},
				enumerable: true
			},
			inertiaCollision: {
				get: function () {return element.draggableElement[settings].inertiaCollision},
				set: function (v) {if (v && v.toString() in {bounce: 0, slide: 0, stop: 0}) element.draggableElement[settings].inertiaCollision = v.toString()},
				enumerable: true
			},
			init: {
				get: function () {return element.draggableElement[settings].init},
				set: function (v) {if (typeof v == 'function') element.draggableElement[settings].init = v; else element.draggableElement[settings].init = null},
				enumerable: true
			},
			start: {
				get: function () {return element.draggableElement[settings].start},
				set: function (v) {if (typeof v == 'function') element.draggableElement[settings].start = v; else element.draggableElement[settings].start = null},
				enumerable: true
			},
			move: {
				get: function () {return element.draggableElement[settings].move},
				set: function (v) {if (typeof v == 'function') element.draggableElement[settings].move = v; else element.draggableElement[settings].move = null},
				enumerable: true
			},
			end: {
				get: function () {return element.draggableElement[settings].end},
				set: function (v) {if (typeof v == 'function') element.draggableElement[settings].end = v; else element.draggableElement[settings].end = null},
				enumerable: true
			},
			frame: {
				get: function () {return element.draggableElement[settings].frame},
				set: function (v) {if (typeof v == 'function') element.draggableElement[settings].frame = v; else element.draggableElement[settings].frame = null;}
			},
			done: {
				get: function () {return element.draggableElement[settings].done},
				set: function (v) {if (typeof v == 'function') element.draggableElement[settings].done = v; else element.draggableElement[settings].done = null},
				enumerable: true
			},
			cursor: {
				get: function () {return element.draggableElement[settings].cursor},
				set: function (v) {element.draggableElement[settings].cursor = typeof v in {string: 0, boolean: 0} && v != true ? typeof v == 'string' ? v : '' : element.draggableElement[settings].doX ? element.draggableElement[settings].doY ? 'all-scroll' : 'ew-resize' : element.draggableElement[settings].doY ? 'ns-resize' : 'not-allowed'},
				enumerable: true
			},
			keepSelection: {
				get: function () {return element.draggableElement[settings].keepSelection},
				set: function (v) {element.draggableElement[settings].keepSelection = Boolean(v)},
				enumerable: true
			},
			bounds: {
				get: function () {return element.draggableElement[settings].bounds},
				set: function (v) {
					element.draggableElement[settings].bounds = Array.isArray(v) && v.length == 4 && !isNaN(v[0]) && !isNaN(v[1]) && !isNaN(v[2]) && !isNaN(v[3]) ? v : v instanceof Element && typeof v.getBoundingClientRect == 'function' ? (function (rect) {
						element[settings].boundParent = v;
						return [rect.left + window.scrollX, rect.top + window.scrollY, rect.right + window.scrollX, rect.bottom + window.scrollY];
					})(v.getBoundingClientRect()) : [-Infinity, -Infinity, Infinity, Infinity];
					v = element.draggableElement[settings].bounds;
					element.draggableElement[settings].bounds = [Math.min(v[0], v[2]), Math.min(v[1], v[3]), Math.max(v[0], v[2]), Math.max(v[1], v[3])];
				},
				enumerable: true
			},
			dependents: {
				get: function () {return element.draggableElement[settings].dependents},
				set: function () {
					Array.isArray(v) ? v.filter(function (val) {return val instanceof HTMLElement}) : v instanceof HTMLCollection || v instanceof NodeList ? (function (v) {
						for (var i = 0, l = v.length, arr = []; i < l; i++) {
							arr[i] = v[i];
						}
						return arr;
					})() : v instanceof Element ? [v] : []
				},
				enumerable: true
			}
		})



		// Using args to set settings or default values if args values aren't valid
		this[settings].css = 'css' in args ? new Object(args.css) : {};
		this[settings].doX = 'doX' in args ? Boolean(args.doX) : true;
		this[settings].doY = 'doY' in args ? Boolean(args.doY) : true;
		args.bounds = args.bounds && typeof args.bounds.toString == 'function' && typeof args.bounds.toString().toLowerCase == 'function' ? args.bounds.toString().toLowerCase() == 'parent' ? element.parentNode : args.bounds.toString().toLowerCase() == 'body' ? document.body : args.bounds : args.bounds;
		this[settings].bounds = 'bounds' in args ? Array.isArray(args.bounds) && args.bounds.length == 4 && !isNaN(args.bound[0]) && !isNaN(args.bounds[1]) && !isNaN(args.bounds[2]) && !isNaN(args.bounds[3]) ? args.bounds : args.bounds instanceof Element && typeof args.bounds.getBoundingClientRect == 'function' ? (function (rect) {
			this[settings].boundParent = args.bounds;
			return [rect.left + window.scrollX, rect.top + window.scrollY, rect.right + window.scrollX, rect.bottom + window.scrollY];
		}).call(this, args.bounds.getBoundingClientRect()) : [-Infinity, -Infinity, Infinity, Infinity] : [-Infinity, -Infinity, Infinity, Infinity];
		this[settings].bounds = [Math.min(this[settings].bounds[0], this[settings].bounds[2]), Math.min(this[settings].bounds[1], this[settings].bounds[3]), Math.max(this[settings].bounds[0], this[settings].bounds[2]), Math.max(this[settings].bounds[1], this[settings].bounds[3])];
		this[settings].inertia = 'inertia' in args ? Boolean(args.inertia) : false;
		this[settings].inertiaThreshold = 'inertiaThreshold' in args && !isNaN(args.inertiaThreshold) ? Math.max(0, args.inertiaThreshold) : 5;
		this[settings].inertiaResistance = 'inertiaResistance' in args && !isNaN(args.inertiaResistance) ? Math.min(Math.max(0, args.inertiaResistance), 2.5) : 1;
		this[settings].inertiaCollision = 'inertiaCollision' in args && args.inertiaCollision in {bounce: 0, slide: 0, stop: 0} ? args.inertiaCollision.toString() : 'bounce';
		this[settings].init = 'init' in args && typeof args.init == 'function' ? args.init : null;
		this[settings].start = 'start' in args && typeof args.start == 'function' ? args.start : null;
		this[settings].move = 'move' in args && typeof args.move == 'function' ? args.move : null;
		this[settings].end = 'end' in args && typeof args.end == 'function' ? args.end : null;
		this[settings].frame = 'frame' in args && typeof args.frame == 'function' ? args.frame : null;
		this[settings].done = 'done' in args && typeof args.done == 'function' ? args.done : null;
		this[settings].cursor = 'cursor' in args && typeof args.cursor in {string: 0, boolean: 0} && args.cursor != true ? typeof args.cursor == 'string' ? args.cursor : '' : this[settings].doX ? this[settings].doY ? 'all-scroll' : 'ew-resize' : this[settings].doY ? 'ns-resize' : 'not-allowed';
		this[settings].dependents = 'dependents' in args ? Array.isArray(args.dependents) ? args.dependents.filter(function (dep) {return dep instanceof HTMLElement}) : args.dependents instanceof HTMLCollection || args.dependents instanceof NodeList ? (function (deps) {
			for (var i = 0, l = deps.length, arr = []; i < l; i++) {
				arr[i] = deps[i];
			}
			return arr;
		})(args.dependents) : args.dependents instanceof Element ? [args.dependents] : [] : [];
		this[settings].keepSelection = 'keepSelection' in args ? Boolean(args.keepSelection) : false;

		this[settings].oldCursors = {elem: element.style.cursor, html: document.documentElement.style.cursor};
		this[settings].boundParent = this[settings].boundParent || null;
		this[settings].marginOffset = {x: 0, y: 0};
		this[settings].oldCSS = Object.freeze(freeze(getComputedStyle(element)));
		this[settings].beingHeld = false;
		this[settings].coordinates = {
			init: {
				x: element.getBoundingClientRect().left + window.scrollX,
				y: element.getBoundingClientRect().top + window.scrollY
			}
		}


		// Converts units like 'em' and '%' to 'px' units
		var style = getComputedStyle(element);
		element.style.left = style.left;
		element.style.top = style.top;
		var offset = {x: element.offsetLeft, y: element.offsetTop};

		// marginOffset determines how the element was positioned in its initial state
		// When moving, these values are considered so that the element is moved form its original position, not form the top left corner of its parent like most elements are positioned
		if (!isNaN(parseFloat(style.left))){
			if (Math.abs(offset.x - parseFloat(style.left)) >= 1) {
				this[settings].marginOffset.x = offset.x - parseFloat(style.left)
			}
		} else {
			this[settings].marginOffset.x = offset.x;
		};
		if (!isNaN(parseFloat(style.top))) {
			if (Math.abs(offset.y - parseFloat(style.top)) >= 1) {
				this[settings].marginOffset.y = offset.y - parseFloat(style.top)
			}
		} else {
			this[settings].marginOffset.y = offset.y;
		};


		// To move the element, it can't be in a static position, so we change it to relative
		if (element.style.position == 'static' || style.position=='static') {
			element.style.position = 'relative';
			element.style.top = '0px';
			element.style.left = '0px';
		}
		

		// Sets event listeners for both mouse event and touc events
		element.addEventListener('mousedown', onmousedown);
		element.addEventListener('touchstart', onmousedown);

		// Adds an attribute so that CSS can access all draggable elements using [data-draggable-element]
		element.setAttribute('data-draggable-element', 1);

		// Calls init event if one is defined
		if (typeof this[settings].init == 'function') {
			this[settings].init.call(element, new DragInitEvent(element))
		}
	};

	// Static method that checks whether an element is a Draggable Element
	HTMLStudio.DraggableElement.isInstance = function isInstance (element) {
		if (!(element instanceof HTMLElement)) return false;
		return element.draggableElement instanceof HTMLStudio.DraggableElement;
	}

	// Destroy method for making the element un-draggable
	HTMLStudio.DraggableElement.prototype.destroy = function destroy () {
		this.element.removeAttribute('data-draggable-element');
		this.element.removeAttribute('data-draggable-element-axis-x');
		this.element.removeAttribute('data-draggable-element-axis-y');
		this.element.removeAttribute('data-draggable-element-being-dragged');
		this.element.removeEventListener('touchstart', onmousedown);
		this.element.removeEventListener('mousedown', onmousedown);
		this.element.draggableElement = HTMLElement.prototype.draggableElement;
		return this.element;
	}

	// Allows user to reconfigure CSS to reference back to when the user releases
	HTMLStudio.DraggableElement.prototype.updateCSS = function updateCSS () {
		this[settings].oldCursors = {elem: this.element.style.cursor, html: document.documentElement.style.cursor}
		return this[settings].oldCSS = Object.freeze(freeze(getComputedStyle(this.element)));
	}

	HTMLStudio.DraggableElement.prototype.element = null;

	// Returns default values
	HTMLStudio.DraggableElement.prototype.config = {};
	Object.defineProperties(HTMLStudio.DraggableElement.prototype.config, {
		doX: {
			get: function () {return true},
			set: function (v) {},
			enumerable: true
		},
		doY: {
			get: function () {return true},
			set: function (v) {},
			enumerable: true
		},
		css: {
			get: function () {return {}},
			set: function (v) {},
			enumerable: true
		},
		inertia: {
			get: function () {return false},
			set: function (v) {},
			enumerable: true
		},
		inertiaThreshold: {
			get: function () {return 5},
			set: function (v) {},
			enumerable: true
		},
		inertiaResistance: {
			get: function () {return 1},
			set: function (v) {},
			enumerable: true
		},
		inertiaCollision: {
			get: function () {return 'bounce'},
			set: function (v) {},
			enumerable: true
		},
		init: {
			get: function () {return null},
			set: function (v) {},
			enumerable: true
		},
		start: {
			get: function () {return null},
			set: function (v) {},
			enumerable: true
		},
		move: {
			get: function () {return null},
			set: function (v) {},
			enumerable: true
		},
		end: {
			get: function () {return null},
			set: function (v) {},
			enumerable: true
		},
		frame: {
			get: function () {return null},
			set: function (v) {}
		},
		done: {
			get: function () {return null},
			set: function (v) {},
			enumerable: true
		},
		cursor: {
			get: function () {return 'all-scroll'},
			set: function (v) {},
			enumerable: true
		},
		keepSelection: {
			get: function () {return false},
			set: function (v) {},
			enumerable: true
		},
		bounds: {
			get: function () {return [-Infinity, -Infinity, Infinity, Infinity]},
			set: function (v) {},
			enumerable: true
		},
		dependents: {
			get: function () {return []},
			set: function () {},
			enumerable: true
		}
	});



	// Used for getting CSS before element is dragged
	// Object.freeze doesn't always work on CSSStyleDeclaration objects
	// This function creates a new object that won't update every time the element's CSS changes
	function freeze (css) {
		var obj = {}
		for (var property in css) {
			obj[property] = css[property];
		}
		return obj;
	}

	// Function called when user starts a drag
	// Sets where element is and what data should be used when calculating the offset of the element while moving
	function onmousedown (event) {
		if (!HTMLStudio.DraggableElement.isInstance(this)) return this.removeEventListener('mousedown', onmousedown), this.removeEventListener('touchstart', onmousedown);
		// Prevents body scrolling on touch devices
		if (event.type == 'touchstart') event.stopPropagation();
		var style = getComputedStyle(this);
		this.style.left = style.left;
		this.style.top = style.top;
		this.style.cursor = document.documentElement.style.cursor = this.draggableElement[settings].cursor;
		var offset = {x: this.offsetLeft, y: this.offsetTop};

		if (!isNaN(parseFloat(style.left))){
			if (Math.abs(offset.x - parseFloat(style.left)) >= 1) {
				this.draggableElement[settings].marginOffset.x = offset.x - parseFloat(style.left)
			}
		} else {
			this.draggableElement[settings].marginOffset.x = offset.x;
		}

		if (!isNaN(parseFloat(style.top))) {
			if (Math.abs(offset.y - parseFloat(style.top)) >= 1) {
				this.draggableElement[settings].marginOffset.y = offset.y - parseFloat(style.top)
			}
		} else {
			this.draggableElement[settings].marginOffset.y = offset.y;
		}

		this.draggableElement[settings].beingHeld = true;

		// mouseOffset saves where the mouse was located when it clicked down on the element
		// When we move the element, we don't want it positioned AT the mouse
		// Instead, it gets positioned relative to where the mouse was when it started dragging
		this.draggableElement[settings].mouseOffset = {x: (event.clientX ? event.clientX : event.changedTouches ? event.changedTouches[0].clientX : 0) - this.getBoundingClientRect().left, y: (event.clientY ? event.clientY : event.changedTouches ? event.changedTouches[0].clientY : 0) - this.getBoundingClientRect().top};

		this.draggableElement[settings].coordinates = {init: this.draggableElement[settings].coordinates.init};
		this.draggableElement[settings].coordinates.start = {
			x: this.getBoundingClientRect().left + window.scrollX,
			y: this.getBoundingClientRect().top + window.scrollY,
			timestamp: performance && typeof performance.now == 'function' ? performance.now() : new Date().getTime()
		}

		if (this.draggableElement[settings].doX) this.setAttribute('data-draggable-element-axis-x', 1);
		if (this.draggableElement[settings].doY) this.setAttribute('data-draggable-element-axis-y', 1);
		this.setAttribute('data-draggable-element-being-dragged', 1);

		if (typeof this.draggableElement[settings].start == 'function') {
			this.draggableElement[settings].start.call(this, new DragStartEvent(this), event, function() {
				onmouseup(new MouseEvent('mouseup'));
			}.bind(this))
		}

		// Applies CSS styles if any are defined
		for (var property in this.draggableElement[settings].css) {
			if (property in {left: 0, top: 0, right: 0, bottom: 0, position: 0, cursor: 0}) continue;
			this.style[property] = this.draggableElement[settings].css[property];
		}
	}



	HTMLElement.prototype.draggableElement = function draggableElement(args) {
		new HTMLStudio.DraggableElement(this, args);
		return this;
	}

	// Function for mousemove events
	var onmousemove = function (event) {
		// Move elements in x-axis
		Array.prototype.forEach.call(document.querySelectorAll('[data-draggable-element-being-dragged][data-draggable-element-axis-x]'), function (element) {
			// Updates element's boundaries if set to a node
			// This is to prevent resizing from letting the element outside it parent
			if (element.draggableElement[settings].boundParent && typeof element.draggableElement[settings].boundParent.getBoundingClientRect == 'function') {
				var parentRect = element.draggableElement[settings].boundParent.getBoundingClientRect(), parentStyle =getComputedStyle(element.draggableElement[settings].boundParent);
				element.draggableElement[settings].bounds = [parentRect.left + window.scrollX, parentRect.top + window.scrollY, parentRect.right + window.scrollX - parseFloat(parentStyle.borderLeftWidth) - parseFloat(parentStyle.borderRightWidth), parentRect.bottom + window.scrollY - parseFloat(parentStyle.borderTopWidth) - parseFloat(parentStyle.borderBottomWidth)];
			}
			// Saves values before move
			var dependentsLeft = element.draggableElement[settings].dependents.map(function (dependent) {
				return dependent.style.left || getComputedStyle(dependent).left;
			}), oldLeft = element.style.left;
			// Moves element, taking its bounding box into account
			if (element.offsetParent) element.style.left = Math.max(Math.min(element.draggableElement[settings].bounds[2] - element.offsetParent.getBoundingClientRect().left - window.scrollX - element.getBoundingClientRect().width - element.draggableElement[settings].marginOffset.x, (event.clientX ? event.clientX : event.changedTouches ? event.changedTouches[0].clientX : 0) - element.offsetParent.getBoundingClientRect().left - element.draggableElement[settings].mouseOffset.x - element.draggableElement[settings].marginOffset.x), element.draggableElement[settings].bounds[0] - element.offsetParent.getBoundingClientRect().left - window.scrollX - element.draggableElement[settings].marginOffset.x) + 'px';
			// Moves any dependents the same amount of distance as the original Draggable Element
			element.draggableElement[settings].dependents.forEach(function (dependent, number) {
				dependent.style.left = parseFloat(dependentsLeft[number]) + (parseFloat(element.style.left) - parseFloat(oldLeft)) + 'px';
			})
		});
		// Move elements in y-axis
		Array.prototype.forEach.call(document.querySelectorAll('[data-draggable-element-being-dragged][data-draggable-element-axis-y]'), function (element) {
			if (element.draggableElement[settings].boundParent && typeof element.draggableElement[settings].boundParent.getBoundingClientRect == 'function') {
				var parentRect = element.draggableElement[settings].boundParent.getBoundingClientRect(), parentStyle =getComputedStyle(element.draggableElement[settings].boundParent);
				element.draggableElement[settings].bounds = [parentRect.left + window.scrollX, parentRect.top + window.scrollY, parentRect.right + window.scrollX - parseFloat(parentStyle.borderLeftWidth) - parseFloat(parentStyle.borderRightWidth), parentRect.bottom + window.scrollY - parseFloat(parentStyle.borderTopWidth) - parseFloat(parentStyle.borderBottomWidth)];
			}
			var dependentsTop = element.draggableElement[settings].dependents.map(function (dependent) {
				return dependent.style.top || getComputedStyle(dependent).top;
			}), oldTop = element.style.top;
			if (element.offsetParent) element.style.top = Math.max(Math.min(element.draggableElement[settings].bounds[3] - element.offsetParent.getBoundingClientRect().top - window.scrollY - element.getBoundingClientRect().height - element.draggableElement[settings].marginOffset.y, (event.clientY ? event.clientY : event.changedTouches ? event.changedTouches[0].clientY : 0) - element.offsetParent.getBoundingClientRect().top - element.draggableElement[settings].mouseOffset.y - element.draggableElement[settings].marginOffset.y), element.draggableElement[settings].bounds[1] - element.offsetParent.getBoundingClientRect().top - window.scrollY - element.draggableElement[settings].marginOffset.y) + 'px';
			element.draggableElement[settings].dependents.forEach(function (dependent, number) {
				dependent.style.top = parseFloat(dependentsTop[number]) + (parseFloat(element.style.top) - parseFloat(oldTop)) + 'px';
			})
		});
		// Adds object to coordinates.move array to act as a log for all the movement events
		Array.prototype.forEach.call(document.querySelectorAll('[data-draggable-element-being-dragged][data-draggable-element-axis-x],[data-draggable-element-being-dragged][data-draggable-element-axis-y]'), function (element) {
			// Destroys selection in document while moving element to prevent accidental selection
			// Can be toggled using keepSelection settings
			if (!element.draggableElement[settings].keepSelection) {
				if (document.selection) {
					document.selection.empty();
				} else if (window.getSelection) {
					window.getSelection().removeAllRanges();
				}
			}

			element.draggableElement[settings].coordinates.move = element.draggableElement[settings].coordinates.move || [];
			element.draggableElement[settings].coordinates.move.push({
				x: element.getBoundingClientRect().left + window.scrollX,
				y: element.getBoundingClientRect().top + window.scrollY,
				timestamp: performance && typeof performance.now == 'function' ? performance.now() : new Date().getTime(),
				distance:{}
			});
			element.draggableElement[settings].coordinates.move[element.draggableElement[settings].coordinates.move.length-1].distance.x = element.draggableElement[settings].coordinates.move[element.draggableElement[settings].coordinates.move.length-1].x - (element.draggableElement[settings].coordinates.move[element.draggableElement[settings].coordinates.move.length-2] || element.draggableElement[settings].coordinates.start).x;
			element.draggableElement[settings].coordinates.move[element.draggableElement[settings].coordinates.move.length-1].distance.y = element.draggableElement[settings].coordinates.move[element.draggableElement[settings].coordinates.move.length-1].y - (element.draggableElement[settings].coordinates.move[element.draggableElement[settings].coordinates.move.length-2] || element.draggableElement[settings].coordinates.start).y;

			// Gives array 'last' property for quick access to the last element in the array
			Object.defineProperty(element.draggableElement[settings].coordinates.move, 'last', {
				value: element.draggableElement[settings].coordinates.move[element.draggableElement[settings].coordinates.move.length-1],
				configurable: true,
				enumerable: false
			})
			if (typeof element.draggableElement[settings].move == 'function') {
				element.draggableElement[settings].move.call(element, new DragMoveEvent(element), event);
			}
		});
	}

	// Adds event listeners for document instead of element so that it will continue to work even after the mouse leaves the element's boundaries
	document.addEventListener('mousemove', onmousemove);
	document.addEventListener('touchmove', onmousemove);


	// Function for mouseup events
	var onmouseup = function (event) {
		Array.prototype.forEach.call(document.querySelectorAll('[data-draggable-element-being-dragged]'), function (element) {
			// Changes element's CSS back to original cursor
			element.style.cursor = element.draggableElement[settings].oldCursors.elem;
			// Changes <html>'s CSS back to original cursor
			document.documentElement.style.cursor = element.draggableElement[settings].oldCursors.html;
			// Remove dragging attributes from element
			['being-dragged', 'axis-x', 'axis-y'].forEach(function (str) {
				element.removeAttribute('data-draggable-element-' + str);
			});

			// Reverts CSS back to original
			for (var property in element.draggableElement[settings].css) {
				if (property in {left: 0, top: 0, right: 0, bottom: 0, position: 0, cursor: 0}) continue;
				element.style[property] = element.draggableElement[settings].oldCSS[property];
			}

			// Ensure that element has at least one move object in its movement log
			if (!element.draggableElement[settings].coordinates.move || !element.draggableElement[settings].coordinates.move.length) {
				element.draggableElement[settings].coordinates.move = [element.draggableElement[settings].coordinates.start];
				Object.defineProperty(element.draggableElement[settings].coordinates.move, 'last', {
					value: element.draggableElement[settings].coordinates.move[0],
					configurable: true,
					enumerable: false
				})
				element.draggableElement[settings].coordinates.move[0].timestamp = performance && typeof performance.now == 'function' ? performance.now() : new Date().getTime();
				element.draggableElement[settings].coordinates.move[0].distance = {x: element.draggableElement[settings].coordinates.move.last.x - element.draggableElement[settings].coordinates.start.x, y: element.draggableElement[settings].coordinates.move.last.x - element.draggableElement[settings].coordinates.start.x};
			};
			element.draggableElement[settings].coordinates.end = {
				x: element.getBoundingClientRect().left + window.scrollX,
				y: element.getBoundingClientRect().top + window.scrollY,
				timestamp: performance && typeof performance.now == 'function' ? performance.now() : new Date().getTime(),
				distance: {}
			}
			element.draggableElement[settings].coordinates.end.distance.x = element.draggableElement[settings].coordinates.move.last.x;
			element.draggableElement[settings].coordinates.end.distance.y = element.draggableElement[settings].coordinates.move.last.y;
			element.draggableElement[settings].coordinates.endDistance = {
				x: element.draggableElement[settings].coordinates.end.x - element.draggableElement[settings].coordinates.start.x,
				y: element.draggableElement[settings].coordinates.end.y - element.draggableElement[settings].coordinates.start.y
			};
			element.draggableElement[settings].beingHeld = false;

			// Inertia Stuff
			if (element.draggableElement[settings].inertia && event.isTrusted) {
				var arr = [], hasInertia = false;
				// Iterates through the element's move log in coordinates.move
				for (var i = element.draggableElement[settings].coordinates.move.length-1; i >= 0; i--) {
					// Checks if the movement happened within 120 milliseconds of the release
					if (element.draggableElement[settings].coordinates.move[i].timestamp+120 < element.draggableElement[settings].coordinates.end.timestamp) break;
					// Pushes the movement to arr for further processing
					arr.push(element.draggableElement[settings].coordinates.move[i]);
				};

				// Checks whether any of the move objects in arr exceeded the inertiaThreshold setting
				if (arr.length && ~arr.map(function (arrElem) {
					return Math.max(Math.abs(arrElem.distance.x), Math.abs(arrElem.distance.y)) > element.draggableElement[settings].inertiaThreshold;
				}).indexOf(true)) hasInertia = true;

				// Invokes end callback if one is defined
				if (typeof element.draggableElement[settings].end == 'function') element.draggableElement[settings].end.call(element, new DragEndEvent(element, hasInertia), event, function () {hasInertia = false});

				// Continues only if the element was traveling fast enough to trigger its inertia state
				if (hasInertia) {
					var direction, returnedDirections = [];
					// Clones move log
					var arr = element.draggableElement[settings].coordinates.move;
					// Iterates through move log backwards
					// Gathers the last significant movement (distance > 3px) and determines their direction and speed
					// Direction is determined by whether the movement was in the positive or negative direction in each axis
					// If the distance in that axis was less than 2px, then the direction is assumed to be going somewhat-perpendicular to that axis
					arr.reverse().forEach(function (arrElem) {
						if (Math.max(Math.abs(arrElem.distance.x), Math.abs(arrElem.distance.y)) < 3 || returnedDirections.length > 9) return;
						direction = direction || {
							x: Math.abs(arrElem.distance.x) < 2 ? null : arrElem.distance.x >= 0,
							y: Math.abs(arrElem.distance.y) < 2 ? null : arrElem.distance.y >= 0
						};

						// Compares the current direction to the directions gathered thus far
						// First comparison (>=) returns boolean indicating sign of that direction (true = positive, false = negative)
						// Second comparison (==) compares the sign (as a boolean) to the sign of the directions already gathered
						// If directions in a certain axis is null then the sign doesn't matter as it is an insignificant distance (< 2px)
						// timestamp checks whether the movement was in the last 200 milliseconds before the element was released
						if ((arrElem.distance.x >= 0 == direction.x || direction.x == null) && (arrElem.distance.y >= 0 == direction.y || direction.y == null) && arrElem.timestamp + 200 > element.draggableElement[settings].coordinates.end.timestamp) returnedDirections.push(arrElem);
					});
					// returnedDirections now has a filtered list of movements that go roughly the same direction


					// Gives more precedence towards the most previous movements (First third of the movements)
					var length = returnedDirections.length, lengthArr = length % 3 ? length % 3 == 1 ? [Math.floor(length / 3), Math.ceil(length / 3), Math.floor(length / 3)] : [Math.ceil(length / 3), Math.floor(length / 3), Math.ceil(length / 3)] : [length / 3, length / 3, length / 3], arr = [{x: 0, y: 0}, {x: 0, y: 0}, {x: 0, y: 0}];
					for (var i = 0; i < length; i++) {
						arr[i < lengthArr[0] ? 0 : i < lengthArr[0] + lengthArr[1] ? 1 : 2].x += returnedDirections[i].distance.x;
						arr[i < lengthArr[0] ? 0 : i < lengthArr[0] + lengthArr[1] ? 1 : 2].y += returnedDirections[i].distance.y;
					}
					arr[1].x = ((arr[1].x - arr[0].x) / 3) + arr[0].x;
					arr[1].y = ((arr[1].y - arr[0].y) / 3) + arr[0].y;
					arr[2].x = ((arr[2].x - arr[0].x) / 6) + arr[0].x;
					arr[2].y = ((arr[2].y - arr[0].y) / 6) + arr[0].y;

					// speed will contain the combined distances of the previously-filtered movements
					var speed = {x: 0, y: 0};
					arr.forEach(function (currElem) {
						speed.x += currElem.x;
						speed.y += currElem.y;
					});

					// If speed is still 0 in both axes, then the movements were too small to be registered and inertia will not move the element enough to move any pixels, so inertia is done and 'done' callback is invoked
					if (!speed.x && !speed.y) {
						if (typeof element.draggableElement[settings].done == 'function') {
							element.draggableElement[settings].done.call(element, new DragDoneEvent(element, true));
						}
						// Ends inertia
						return;
					}

					element.draggableElement[settings].coordinates.frame = [{
						x: element.getBoundingClientRect().left + window.scrollX,
						y: element.getBoundingClientRect().top + window.scrollY,
						timestamp: performance && typeof performance.now == 'function' ? performance.now() : new Date().getTime(),
						distance: {x: 0, y: 0}
					}];
					Object.defineProperty(element.draggableElement[settings].coordinates.frame, 'last', {
						value: element.draggableElement[settings].coordinates.frame[0],
						configurable: true,
						enumerable: false
					})

					// Interval that actually moves the element form inertia
					var interval = setInterval(function () {
						// If the element is being held by the user before finishing its inertia state, end the state early so that it stays with the user's cursor
						if (element.draggableElement[settings].beingHeld) {
							clearInterval(interval);
							if (typeof element.draggableElement[settings].done == 'function') {
								element.draggableElement[settings].done.call(element, new DragDoneEvent(true, true));
							}
							return;
						}

						// Speed is decreased each iteration to gradually slow down every 25 milliseconds
						// Inertia Resistance affects how much the speed is decreased by
						speed.x *= 0.4 * element.draggableElement[settings].inertiaResistance;
						speed.y *= 0.4 * element.draggableElement[settings].inertiaResistance;

						// Gets positioning information
						var style = {
							x: parseFloat(element.style.left),
							y: parseFloat(element.style.top)
						},
						bounds = element.draggableElement[settings].bounds,
						rect = element.getBoundingClientRect(),
						parentRect = element.parentNode.getBoundingClientRect();


						if (element.draggableElement[settings].inertiaCollision == 'bounce') {
							// Code block for each possibility: bouncing off left bounding wall, bouncing off right bounding wall, and not bouncing off any wall
							if (style.x + speed.x < bounds[0] - parentRect.left - window.scrollX - element.draggableElement[settings].marginOffset.x) {
								// Bouncing off left wall
								element.style.left = bounds[0] - parentRect.left - window.scrollX - element.draggableElement[settings].marginOffset.x + Math.abs(speed.x + (style.x - (bounds[0] - parentRect.left - window.scrollX))) - element.draggableElement[settings].marginOffset.x + 'px';
								speed.x = -speed.x
							} else if (style.x + speed.x > bounds[2] - parentRect.left - window.scrollX - rect.width - element.draggableElement[settings].marginOffset.x) {
								// Bouncing off right wall
								element.style.left = bounds[2] - rect.width - parentRect.left - window.scrollX - element.draggableElement[settings].marginOffset.x - Math.abs(speed.x - ((bounds[2] - parentRect.left - window.scrollX - rect.width) - style.x) + element.draggableElement[settings].marginOffset.x) + 'px';
								speed.x = -speed.x
							} else {
								// Not bouncing off any walls
								element.style.left = style.x + speed.x + 'px';
							}

							// Same code as above, but controls vertical y movement instead of horizontal x
							if (style.y + speed.y < bounds[1] - parentRect.top - window.scrollY - element.draggableElement[settings].marginOffset.y) {
								element.style.top = bounds[1] - parentRect.top - window.scrollY - element.draggableElement[settings].marginOffset.y + Math.abs(speed.y + (style.y - (bounds[1] - parentRect.top - window.scrollY))) - element.draggableElement[settings].marginOffset.y + 'px';
								speed.y = -speed.y
							} else if (style.y + speed.y > bounds[3] - parentRect.top - window.scrollY - rect.height) {
								element.style.top = bounds[3] - rect.height - parentRect.top - window.scrollY - element.draggableElement[settings].marginOffset.y - Math.abs(speed.y - ((bounds[3] - parentRect.top - window.scrollY - rect.height) - style.y) + element.draggableElement[settings].marginOffset.y) + 'px';
								speed.y = -speed.y
							} else {
								element.style.top = style.y + speed.y + 'px';
							}
						} else if (element.draggableElement[settings].inertiaCollision == 'slide') {
							if (style.x + speed.x < bounds[0] - parentRect.left - window.scrollX - element.draggableElement[settings].marginOffset.x) {
								element.style.left = bounds[0] - parentRect.left - window.scrollX - element.draggableElement[settings].marginOffset.x + 'px';
								speed.x = 0
							} else if (style.x + speed.x > bounds[2] - parentRect.left - window.scrollX - rect.width) {
								element.style.left = bounds[2] - rect.width - parentRect.left - window.scrollX - element.draggableElement[settings].marginOffset.x + 'px';
								speed.x = 0
							} else {
								element.style.left = style.x + speed.x + 'px';
							}
							if (style.y + speed.y < bounds[1] - parentRect.top - window.scrollY - element.draggableElement[settings].marginOffset.y) {
								element.style.top = bounds[1] - parentRect.top - window.scrollY - element.draggableElement[settings].marginOffset.y + 'px';
								speed.y = 0
							} else if (style.y + speed.y > bounds[3] - parentRect.top - window.scrollY - rect.height) {
								element.style.top = bounds[3] - rect.height - parentRect.top - window.scrollY - element.draggableElement[settings].marginOffset.y + 'px';
								speed.y = 0
							} else {
								element.style.top = style.y + speed.y + 'px';
							}
						} else if (element.draggableElement[settings].inertiaCollision == 'stop') {
							if (style.x + speed.x < bounds[0] - parentRect.left - window.scrollX || style.x + speed.x > bounds[2] - parentRect.left - window.scrollX - rect.width || style.y + speed.y < bounds[1] - parentRect.top - window.scrollY - element.draggableElement[settings].marginOffset.y || style.y + speed.y > bounds[3] - parentRect.top-scrollY - rect.height - element.draggableElement[settings].marginOffset.y) {
								element.style.left = (style.x + speed.x < bounds[0] - parentRect.left - window.scrollX - element.draggableElement[settings].marginOffset.x ? bounds[0] - parentRect.left - window.scrollX - element.draggableElement[settings].marginOffset.x : style.x + speed.x > bounds[2] - parentRect.left - window.scrollX - rect.width - element.draggableElement[settings].marginOffset.x ? bounds[2] - rect.width - parentRect.left - window.scrollX - element.draggableElement[settings].marginOffset.x : style.x + speed.x) + 'px';
								element.style.top = (style.y + speed.y < bounds[1] - parentRect.top - window.scrollY - element.draggableElement[settings].marginOffset.y ? bounds[1] - parentRect.top - window.scrollY - element.draggableElement[settings].marginOffset.y : style.y + speed.y > bounds[3] - parentRect.top - window.scrollY - rect.height - element.draggableElement[settings].marginOffset.y ? bounds[3] - rect.height - parentRect.top - window.scrollY - element.draggableElement[settings].marginOffset.y : style.y + speed.y) + 'px';
								speed.x = speed.y = 0;
							} else {
								element.style.left = style.x + speed.x + 'px';
								element.style.top = style.y + speed.y + 'px';
							}
						}

						element.draggableElement[settings].coordinates.frame.push({
							x: element.getBoundingClientRect().left + window.scrollX,
							y: element.getBoundingClientRect().top + window.scrollY,
							timestamp: performance && typeof performance.now == 'function' ? performance.now() : new Date().getTime(),
							distance: {
								x: element.getBoundingClientRect().left + window.scrollX - element.draggableElement[settings].coordinates.frame.last.x,
								y: element.getBoundingClientRect().top + window.scrollY - element.draggableElement[settings].coordinates.frame.last.y}
						});
						Object.defineProperty(element.draggableElement[settings].coordinates.frame, 'last', {
							value: element.draggableElement[settings].coordinates.frame[element.draggableElement[settings].coordinates.frame.length-1],
							configurable: true,
							enumerable: false
						})

						// Fires inertia event if one is defined
						if (typeof element.draggableElement[settings].frame == 'function') {
							element.draggableElement[settings].frame.call(element, new DragFrameEvent(element, speed), function () {speed = {x: 0, y: 0}});
						}

						// Checks whether the speed has slowed down too much for inertia to continue;
						if (Math.abs(speed.x) <= 0.1 && Math.abs(speed.y) <= 0.1) {
							clearInterval(interval);
							if (typeof element.draggableElement[settings].done == 'function') {
								element.draggableElement[settings].done.call(element, new DragDoneEvent(element, true));
							}
						}
					}, 25)
				} else if (typeof element.draggableElement[settings].done == 'function') {
					element.draggableElement[settings].done.call(element, new DragDoneEvent(element, false))
				}
			} else if (typeof element.draggableElement[settings].end == 'function' && event.isTrusted) {
				element.draggableElement[settings].end.call(element, new DragEndEvent(element, false), event, function () {});
			}
		});
	};

	document.addEventListener('mouseup', onmouseup);
	document.addEventListener('touchend', onmouseup);


	// Updates element's bounding boxes for when window resizing causes elements to also resize
	window.addEventListener('resize', function () {
		Array.prototype.forEach.call(document.querySelectorAll('[data-draggable-element]'), function (element) {
			var style = getComputedStyle(element), offset = {x: element.offsetLeft, y: element.offsetTop};

			// Updates elements with their x axis enabled
			if (element.draggableElement[settings] && element.draggableElement[settings].doX) {
				// Reconfigures bounds
				if (element.draggableElement[settings].boundParent && typeof element.draggableElement[settings].boundParent.getBoundingClientRect == 'function') {
					var parentRect = element.draggableElement[settings].boundParent.getBoundingClientRect(), parentStyle =getComputedStyle(element.draggableElement[settings].boundParent);
					element.draggableElement[settings].bounds = [parentRect.left + window.scrollX, parentRect.top + window.scrollY, parentRect.right + window.scrollX - parseFloat(parentStyle.borderLeftWidth) - parseFloat(parentStyle.borderRightWidth), parentRect.bottom + window.scrollY - parseFloat(parentStyle.borderTopWidth) - parseFloat(parentStyle.borderBottomWidth)];
				}

				// Reconfigures marginOffset
				if (!isNaN(parseFloat(style.left))){
					if (Math.abs(offset.x - parseFloat(style.left)) >= 1) {
						element.draggableElement[settings].marginOffset.x = offset.x - parseFloat(style.left)
					}
				} else {
					element.draggableElement[settings].marginOffset.x = offset.x;
				}

				// Moves the element using the updated values
				var dependentsTop = element.draggableElement[settings].dependents.map(function (dependent) {
					return dependent.style.left || getComputedStyle(dependent).left;
				}), oldTop = element.style.left;
				if (element.offsetParent) element.style.left = Math.max(Math.min(element.draggableElement[settings].bounds[2] - element.offsetParent.getBoundingClientRect().left - window.scrollX - element.getBoundingClientRect().width - element.draggableElement[settings].marginOffset.x, parseFloat(element.style.left)), element.draggableElement[settings].bounds[0] - element.offsetParent.getBoundingClientRect().left - window.scrollX - element.draggableElement[settings].marginOffset.x) + 'px';
				element.draggableElement[settings].dependents.forEach(function (dependent, number) {
					dependent.style.left = parseFloat(dependentsTop[number]) + (parseFloat(element.style.left) - parseFloat(oldLeft)) + 'px';
				});
			}
				

			// Updates elements with their y axis enabled
			if (element.draggableElement[settings] && element.draggableElement[settings].doY) {
				// Reconfigures bounds
				if (element.draggableElement[settings].boundParent && typeof element.draggableElement[settings].boundParent.getBoundingClientRect == 'function') {
					var parentRect = element.draggableElement[settings].boundParent.getBoundingClientRect(), parentStyle =getComputedStyle(element.draggableElement[settings].boundParent);
					element.draggableElement[settings].bounds = [parentRect.left + window.scrollX, parentRect.top + window.scrollY, parentRect.right + window.scrollX - parseFloat(parentStyle.borderLeftWidth) - parseFloat(parentStyle.borderRightWidth), parentRect.bottom + window.scrollY - parseFloat(parentStyle.borderTopWidth) - parseFloat(parentStyle.borderBottomWidth)];
				}

				// Reconfigures marginOffset
				if (!isNaN(parseFloat(style.top))){
					if (Math.abs(offset.y - parseFloat(style.top)) >= 1) {
						element.draggableElement[settings].marginOffset.y = offset.y - parseFloat(style.top)
					}
				} else {
					element.draggableElement[settings].marginOffset.y = offset.y;
				}

				// Moves the element using the updated values
				var dependentsTop = element.draggableElement[settings].dependents.map(function (dependent) {
					return dependent.style.top || getComputedStyle(dependent).top;
				}), oldTop = element.style.top;
				if (element.offsetParent) element.style.top = Math.max(Math.min(element.draggableElement[settings].bounds[3] - element.offsetParent.getBoundingClientRect().top - window.scrollY - element.getBoundingClientRect().height - element.draggableElement[settings].marginOffset.y, parseFloat(element.style.top)), element.draggableElement[settings].bounds[1] - element.offsetParent.getBoundingClientRect().top - window.scrollY - element.draggableElement[settings].marginOffset.y) + 'px';
				element.draggableElement[settings].dependents.forEach(function (dependent, number) {
					dependent.style.top = parseFloat(dependentsTop[number]) + (parseFloat(element.style.top) - parseFloat(oldTop)) + 'px';
				});
			}
		})
	})
})();