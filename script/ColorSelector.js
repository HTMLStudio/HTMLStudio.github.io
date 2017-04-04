!function(){
	// Converts H,S,L to [R,G,B]
	function toRGB(hue, saturation, lightness) {
		lightness /= 100;
		saturation /= 100;
		var rgb = [],
			h = ~~(hue / 60) % 6,
			c = (1 - Math.abs(2 * lightness - 1)) * saturation,
			m = lightness - c / 2;
		rgb[h == 0 || h == 5 ? 0 : h < 3 ? 1 : 2] = Math.round((c + m) * 255);
		rgb[h == 1 || h == 4 ? 0 : h == 0 || h == 3 ? 1 : 2] = Math.round(((1 - Math.abs(hue / 60 % 2 - 1)) * c + m) * 255);
		rgb[h < 2 ? 2 : h < 4 ? 0 : 1] = Math.round((0 + m) * 255);
		return rgb;
	}


	var listeners = [];


	// Import JSON with all CSS named color values
	var colors;
	!function() {
		var request = new XMLHttpRequest();
		request.open('GET', 'script/CSS_colors.json', true);

		request.onreadystatechange = function() {
			if (this.readyState === 4) colors = this.status >= 200 && this.status < 400 ? JSON.parse(this.responseText) : {};
		};

		request.send();
		request = null;
	}();


	(window.HTMLStudio=window.HTMLStudio||{}).ColorSelector=function(){
		"use strict";
		var self = this;
		this.node = document.createElement('div');


		this.hue = 0;
		this.saturation = 100;
		this.lightness = 100;
		this.opacity = 1;
		this.color = this.trueColor = 'hsla(0,100%,50%,1)';


		// Create color displayer
		this.colorDisplay = document.createElement('div');
		this.colorDisplay.className = 'colorSelectorDisplay';
		this.colorDisplay.style.background = 'url("svg/transparency_back.svg") 0 0 / auto 100%';
		this.node.appendChild(this.colorDisplay);
		var colorDisplay = document.createElement('div');
		colorDisplay.style.width = colorDisplay.style.height = '100%';
		this.colorDisplay.appendChild(colorDisplay);



		// Create color text display
		this.input = document.createElement('input');
		this.input.type = 'text';
		this.input.className = 'colorSelectorInput';
		this.node.appendChild(this.input);
		this.input.addEventListener('keyup', function(e) {
			var value = this.value.trim().toLowerCase();
			if (e.keyCode == 13) return this.blur();
			var rgb = self.parse(value);
			opacityText.innerText = '';
			if (rgb) {
				// Prevents resetting opacity to 100% when user uses CSS named color
				if (colors && value in colors && rgb[3] == 1) {
					rgb[3] = self.parse(self.trueColor)[3];
				}
				self.goTo(rgb);
				this.color = 'rgba(' + rgb[0] + ',' + rgb[1] + ',' + rgb[2] + ',' + rgb[3] + ')';
				this.style.color = '';
				opacityText.innerText = Math.round(rgb[3] * 1000) / 1000 == 1 ? 'rgb(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ')' : 'rgba(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ', ' + Math.round(rgb[3] * 1000) / 1000 + ')';
			} else {
				var orig = self.parse(self.trueColor) || [255,0,0];
				self.goTo(orig);
				this.color = self.trueColor;
				this.style.color = '#c00';
			}
		});
		this.input.addEventListener('blur', function() {
			self.trueColor = this.color;
			opacityText.innerText = '';
			var rgb = toRGB(self.hue, self.saturation, self.lightness).map(function(num) {
					return Math.round(num);
				});
			this.value = Math.round(self.opacity * 1000) / 1000 == 1 ? 'rgb(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ')' : 'rgba(' + rgb[0] + ', ' + rgb[1] + ', ' + rgb[2] + ', ' + Math.round(self.opacity * 1000) / 1000 + ')';
			this.style.color = '';
		});
		this.input.addEventListener('focus', function() {
			this.dispatchEvent(new Event('keyup'));
		})

		// Create "actual color" display for <input>
		var opacityText = document.createElement('div');
		opacityText.style.position = 'absolute';
		opacityText.style.marginTop = '-1.6rem';
		opacityText.style.width = 'calc(100% - 3.5rem)';
		opacityText.className = 'colorSelectorTranslatedDisplay';
		this.node.appendChild(opacityText);



		// Create color gradient rectangle
		this.display = document.createElement('div');
		this.display.className = 'colorSelectorRectContainer';
		this.display.style.position = 'relative';
		var displayBack = document.createElement('div'),
			displayFront = document.createElement('div');
		displayBack.style.background = 'linear-gradient(to right, #fff 0%, red 100%)';
		displayBack.style.position = displayFront.style.position = 'absolute';
		displayBack.style.height = displayBack.style.width = displayFront.style.height = displayFront.style.width = '100%';
		this.display.appendChild(displayBack);
		displayFront.style.background = 'linear-gradient(to bottom, transparent 0%, #000 100%)';
		var rect = displayFront.getBoundingClientRect();
		this.display.appendChild(displayFront);
		this.node.appendChild(this.display);

		function changeColor(e) {
			var rect = this.getBoundingClientRect(),
				saturation = ~~(~~(e.clientX - rect.left) / rect.width * 100) / 100,
				value = 1 - ~~(~~(e.clientY - rect.top) / rect.height * 100) / 100,
				hue = self.hue;
			self.indicator.style.left = (e.clientX - rect.left) / rect.width * 100 + '%';
			self.indicator.style.top = (e.clientY - rect.top) / rect.height * 100 + '%';
			self.color = 'hsla(' + self.hue + ',' + (self.saturation = ~~((saturation * value / ((hue = (2 - saturation) * value) < 1 ? hue : 2 - hue)) * 100)) + '%,' + (self.lightness = ~~(((2 - saturation) * value / 2) * 100)) + '%,' + self.opacity + ')';
			self.indicator.style.background = 'hsl(' + self.hue + ',' + self.saturation + '%,' + self.lightness + '%)';
			colorDisplay.style.background = self.color;
			opacityGradient.style.background = 'linear-gradient(to right, transparent 0%, hsl(' + self.hue + ',' + self.saturation + '%,' + self.lightness + '%) 100%)';
			this.mousePositions = {x: e.clientX - rect.left, y: e.clientY - rect.top};
			var rgb = toRGB(self.hue, self.saturation, self.lightness);
			if (e.type == 'click') self.display.className = 'colorSelectorRectContainer';
			if (e.isTrusted) self.trueColor = 'hsla(' + self.hue + ',' + self.saturation + '%,' + self.lightness + '%,' + self.opacity + ')';
			if (document.activeElement != this.input) {
				var trgb = rgb.map(function(num) {
					return Math.round(num);
				});
				self.input.value = Math.round(self.opacity * 1000) / 1000 == 1 ? 'rgb(' + trgb[0] + ', ' + trgb[1] + ', ' + trgb[2] + ')' : 'rgba(' + trgb[0] + ', ' + trgb[1] + ', ' + trgb[2] + ', ' + Math.round(self.opacity * 1000) / 1000 + ')';
			}
			hueIndicator.style.left = self.hue / 3.6 + '%';
			opacityIndicator.style.left = self.opacity * 100 + '%';
			self.indicator.style.borderColor = Math.min(rgb[0], rgb[1], rgb[2]) > 178 ? '#000' : '#fff';

			listeners.forEach(function(item) {
				if (item[0] == self) item[1].call(self, {type: e.origin || 'colorChange', color: Math.round(self.opacity * 1000) / 1000 == 1 ? 'rgb(' + trgb[0] + ', ' + trgb[1] + ', ' + trgb[2] + ')' : 'rgba(' + trgb[0] + ', ' + trgb[1] + ', ' + trgb[2] + ', ' + Math.round(self.opacity * 1000) / 1000 + ')'});
			});
		}

		displayFront.addEventListener('mousedown', function() {
			this.mouseDown = true;
			self.display.className = 'colorSelectorRectContainer mousedown';
			function mouseUp() {
				this.removeEventListener('mouseup', mouseUp);
				this.removeEventListener('mousemove', mouseMove);
				displayFront.mouseDown = false;
				self.display.className = 'colorSelectorRectContainer';
			}
			function mouseMove(e) {
				if (displayFront.mouseDown) {
					var rect = displayFront.getBoundingClientRect();
					changeColor.call(displayFront, {
						clientX: Math.max(rect.left, Math.min(rect.right, e.clientX)),
						clientY: Math.max(rect.top, Math.min(rect.bottom, e.clientY)),
						origin: 'colorChange'
					});
				}
			}
			window.addEventListener('mouseup', mouseUp);
			window.addEventListener('mousemove', mouseMove);
		});
		displayFront.addEventListener('click', changeColor);

		// Create draggable dot indicator thingy
		this.indicator = document.createElement('div');
		this.indicator.className = 'colorSelectorIndicator';
		this.indicator.style.position = 'absolute';
		this.display.appendChild(this.indicator);



		// Create hue changer
		this.hueSlider = document.createElement('div');
		this.hueSlider.className = 'colorSelectorSlider colorSelectorHueSlider';
		this.hueSlider.style.background = 'linear-gradient(to right, red 0%, #ff0 16.66%, #0f0 33.33%, #0ff 50%, #00f 66.66%, #f0f 83.33%, red 100%)';

		function changeHue(e) {
			var rect = this.getBoundingClientRect(),
				color = [],
				position = ((e.clientX >= rect.right - 2 ? rect.right : e.clientX <= rect.left + 2 ? rect.left : e.clientX) - rect.left) / rect.width,
				section = ~~(position * 6) % 6;
			color[section == 0 || section == 5 ? 0 : section == 1 || section == 2 ? 1 : 2] = 255;
			color[section == 2 || section == 3 ? 0 : section == 4 || section == 5 ? 1 : 2] = 0;
			color[section == 1 || section == 4 ? 0 : section == 0 || section == 3 ? 1 : 2] = Math.abs((position * 6 % 1) * 255 - (section == 1 || section == 3 || section == 5 ? 255 : 0));
			displayBack.style.background = 'linear-gradient(to right, #fff 0%, rgb(' + ~~color[0] + ',' + ~~color[1] + ',' + ~~color[2] + ') 100%)';
			self.hue = ~~(((e.clientX >= rect.right - 2 ? rect.right : e.clientX <= rect.left + 2 ? rect.left : e.clientX) - ~~rect.left) / rect.width * 360);
			rect = displayFront.getBoundingClientRect();
			if (displayFront.mousePositions) changeColor.call(displayFront, {clientX: displayFront.mousePositions.x + rect.left, clientY: displayFront.mousePositions.y + rect.top, isTrusted: true, origin: 'hueChange'});
			else {
				changeColor.call(displayFront, {clientX: rect.right, clientY: rect.top, isTrusted: true, origin: 'hueChange'});
			}
		}
		this.hueSlider.addEventListener('mousedown', function() {
			this.mouseDown = true;
			var self = this;
			function mouseUp() {
				this.removeEventListener('mouseup', mouseUp);
				this.removeEventListener('mousemove', mouseMove);
				self.mouseDown = false;
			}
			function mouseMove(e) {
				if (self.mouseDown) {
					var rect = self.getBoundingClientRect();
					changeHue.call(self, {
						clientX: Math.max(rect.left, Math.min(rect.right, e.clientX)),
						clientY: Math.max(rect.top, Math.min(rect.bottom, e.clientY)),
						origin: 'hueChange'
					});
				}
			}
			window.addEventListener('mouseup', mouseUp);
			window.addEventListener('mousemove', mouseMove);
		});
		this.hueSlider.addEventListener('click', changeHue);

		// Allows for the user to use the indicator to drag
		var hueExtender = document.createElement('div');
		hueExtender.style.position = 'absolute';
		hueExtender.className = 'colorSelectorSliderExtender';
		hueExtender.style.width = '100%';
		hueExtender.style.top = '100%';
		this.hueSlider.appendChild(hueExtender);
		// Visual indicator of the user's current position
		var hueIndicator = document.createElement('div');
		hueIndicator.className = 'colorSelectorSliderIndicator';
		hueIndicator.style.pointerEvents = 'none';
		this.hueSlider.appendChild(hueIndicator);
		this.node.appendChild(this.hueSlider);



		// Create opacity changer
		this.opacitySlider = document.createElement('div');
		this.opacitySlider.className = 'colorSelectorSlider colorSelectorOpacitySlider';
		this.opacitySlider.style.background = 'url("svg/transparency_back.svg") 0 0 / auto 100%';

		function changeOpacity(e) {
			var rect = this.getBoundingClientRect();
			displayBack.style.background = 'linear-gradient(to right, #fff 0%, ' + this.color + ' 100%)';
			self.opacity = Math.round(((e.clientX >= rect.right - 2 ? rect.right : e.clientX <= rect.left + 2 ? rect.left : e.clientX) - rect.left) / rect.width * 1000) / 1000;
			rect = displayFront.getBoundingClientRect();
			if (displayFront.mousePositions) changeColor.call(displayFront, {clientX: displayFront.mousePositions.x + rect.left, clientY: displayFront.mousePositions.y + rect.top, isTrusted: true, origin: 'opacityChange'});
			else {
				changeColor.call(displayFront, {clientX: rect.right, clientY: rect.top, isTrusted: true, origin: 'opacityChange'});
			}
		}
		this.opacitySlider.addEventListener('mousedown', function() {
			this.mouseDown = true;
			var self = this;
			function mouseUp() {
				this.removeEventListener('mouseup', mouseUp);
				this.removeEventListener('mousemove', mouseMove);
				self.mouseDown = false;
			}
			function mouseMove(e) {
				if (self.mouseDown) {
					var rect = self.getBoundingClientRect();
					changeOpacity.call(self, {
						clientX: Math.max(rect.left, Math.min(rect.right, e.clientX)),
						clientY: Math.max(rect.top, Math.min(rect.bottom, e.clientY)),
						origin: 'opacityChange'
					});
				}
			}
			window.addEventListener('mouseup', mouseUp);
			window.addEventListener('mousemove', mouseMove);
		});
		this.opacitySlider.addEventListener('click', changeOpacity);
		
		// Controls the opacity gradient
		var opacityGradient = document.createElement('div');
		opacityGradient.style.height = opacityGradient.style.width = '100%';
		opacityGradient.style.background = 'linear-gradient(to right, transparent 0%, red 100%)';
		this.opacitySlider.appendChild(opacityGradient);
		// Allows for the user to use the indicator to drag
		var opacityExtender = document.createElement('div');
		opacityExtender.style.position = 'absolute';
		opacityExtender.className = 'colorSelectorSliderExtender';
		opacityExtender.style.width = '100%';
		opacityExtender.style.top = '100%';
		this.opacitySlider.appendChild(opacityExtender);
		// Visual indicator of the user's current position
		var opacityIndicator = document.createElement('div');
		opacityIndicator.className = 'colorSelectorSliderIndicator';
		opacityIndicator.style.pointerEvents = 'none';
		this.opacitySlider.appendChild(opacityIndicator);
		this.node.appendChild(this.opacitySlider);

		// Start on #ff0000
		this.indicator.style.left = '100%';
		this.indicator.style.background = 'red';
		colorDisplay.style.background = 'red';
		opacityIndicator.style.left = '100%';
		this.input.value = 'rgba(255, 0, 0, 1)';
	}

	// Sets the color selector's color using an array of [R,G,B] values (or [R,G,B,A])
	HTMLStudio.ColorSelector.prototype.goTo = function(array) {
		array[0] = Math.min(255, Math.max(0, array[0])) || 0;
		array[1] = Math.min(255, Math.max(0, array[1])) || 0;
		array[2] = Math.min(255, Math.max(0, array[2])) || 0;
		array[3] = Math.min(1, Math.max(0, array[3]));
		if (isNaN(array[3])) array[3] = 1;
		var r = array[0] / 255,
			g = array[1] / 255,
			b = array[2] / 255,
			a = array[3],
			max = Math.max(r,g,b),
			min = Math.min(r,g,b),
			delta = max - min,
			hue = (delta == 0 ? 0 : max == r ? (g - b) / delta % 6 : max == g ? (b - r) / delta + 2 : (r - g) / delta + 4) * 60,
			lightness = (max + min) / 2,
			saturation = delta / (1 - Math.abs(2 * lightness - 1)) || 0,
			self = this;
		this.hue = hue;
		this.saturation = saturation * 100;
		this.lightness = lightness * 100;
		this.opacity = a;
		this.color = 'hsla(' + hue + ',' + this.saturation + '%,' + this.lightness + '%,' + this.opacity + ')';
		this.colorDisplay.firstChild.style.background = this.color;
		this.hueSlider.lastElementChild.style.left = hue / 3.6 + '%';
		this.opacitySlider.lastElementChild.style.left = a * 100 + '%';
		this.opacitySlider.firstElementChild.style.background = 'linear-gradient(to right, transparent 0%, hsl(' + hue + ',' + this.saturation + '%,' + this.lightness + '%))';
		var sat2 = saturation * (lightness < .5 ? lightness : 1 - lightness),
			hsv = [hue, 2 * sat2 / (lightness + sat2) || 0, lightness + sat2];
		this.indicator.style.left = hsv[1] * 100 + '%';
		this.indicator.style.top = 100 - hsv[2] * 100 + '%';
		this.indicator.style.background = 'hsl(' + hue + ',' + this.saturation + '%,' + this.lightness + '%)';
		this.indicator.style.borderColor = Math.min(r,g,b) >.7 ? '#000' : '#fff';
		this.display.firstElementChild.style.background = 'linear-gradient(to right, transparent 0%, hsl(' + hue + ',100%,50%) 100%)';
		var rect = this.display.children[1].getBoundingClientRect();
		this.display.children[1].mousePositions = {
			x: rect.width * hsv[1],
			y: rect.height - rect.height * hsv[2]
		}
		if (document.activeElement != this.input) this.input.value = this.trueColor = Math.round(this.opacity * 1000) / 1000 == 1 ? 'rgb(' + (array[0]) + ', ' + array[1] + ', ' + array[2] + ')' : 'rgba(' + array[0] + ', ' + array[1] + ', ' + array[2] + ', ' + Math.round(this.opacity * 1000) / 1000 + ')';

		listeners.forEach(function(item) {
			if (item[0] == self) item[1].call(self, {type: 'goToCall', color: Math.round(self.opacity * 1000) / 1000 == 1 ? 'rgb(' + (array[0]) + ', ' + array[1] + ', ' + array[2] + ')' : 'rgba(' + array[0] + ', ' + array[1] + ', ' + array[2] + ', ' + Math.round(self.opacity * 1000) / 1000 + ')'});
		});
	};

	// Parses color string into [R,G,B,A] array (so it can be used in this.goTo)
	HTMLStudio.ColorSelector.prototype.parse = HTMLStudio.ColorSelector.parse = function(str) {
		if (typeof str != 'string') return null;
		var match;
		if (colors && (str = str.trim().toLowerCase()) in colors) {
			return this.parse(colors[str]);
		} else if (match = str.trim().match(/^rgba?\s*\(\s*(\d+(?:\.\d+)?|\.\d+)(%?)\s*,\s*(\d+(?:\.\d+)?|\.\d+)(%?)\s*,\s*(\d+(?:\.\d+)?|\.\d+)(%?)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)(%?)\s*)?\)?$/i)) {
			// rgba( [# | #%] , [# | #%] , [# | #%] [ , [# | #%] | ] )
			return [Math.round(match[2] ? Math.min(match[1], 100) * 2.55 : Math.min(match[1], 255)), Math.round(match[4] ? Math.min(match[3], 100) * 2.55 : Math.min(match[3], 255)), Math.round(match[6] ? Math.min(match[5], 100) * 2.55 : Math.min(match[5], 255)), isNaN(match[7]) ? 1 : match[8] ? Math.min(match[7], 100) / 100 : Math.min(match[7], 1)];
		} else if (match = str.trim().match(/^\(?\s*(\d+(?:\.\d+)?|\.\d+)(%?)\s*,\s*(\d+(?:\.\d+)?|\.\d+)(%?)\s*,\s*(\d+(?:\.\d+)?|\.\d+)(%?)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)(%?)\s*)?\)?$/i)) {
			// [# | #%], [# | #%], [# | #%]
			return [Math.round(match[2] ? Math.min(match[1], 100) * 2.55 : Math.min(match[1], 255)), Math.round(match[4] ? Math.min(match[3], 100) * 2.55 : Math.min(match[3], 255)), Math.round(match[6] ? Math.min(match[5], 100) * 2.55 : Math.min(match[5], 255)), isNaN(match[7]) ? 1 : match[8] ? Math.min(match[7], 100) / 100 : Math.min(match[7], 1)];
		} else if (match = str.trim().match(/^hsla?\s*\(\s*(\d+(?:\.\d+)?|\.\d+)(%?)\s*,\s*(\d+(?:\.\d+)?|\.\d+)(%?)\s*,\s*(\d+(?:\.\d+)?|\.\d+)(%?)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)(%?)\s*)?\)?$/i)) {
			// hsla( [# | #%] , [# | #%] , [# | #%] [ , [# | #%] | ] )
			return toRGB(match[2] ? (Math.min(match[1], 100) * 3.6) : Math.min(match[1], 360), match[4] ? Math.min(match[3], 100) : Math.min(match[3], 1) * 100, match[6] ? Math.min(match[5], 100) : Math.min(match[5], 1) * 100).concat(isNaN(match[7]) ? 1 : match[8] ? Math.min(match[7], 100) / 100 : Math.min(match[7], 1));
		} else if (match = str.trim().match(/^#?([\da-f])([\da-f])([\da-f])(?:([\da-f])(?:([\da-f])([\da-f])(?:([\da-f])([\da-f]))?)?)?$/i)) {
			// #[ [0-9 | a-f] * {3,4,6,8} ]
			return [parseInt(match[1] + (match[5] ? match[2] : match[1]), 16), parseInt(match[5] ? match[3] + match[4] : match[2] + match[2], 16),  parseInt(match[5] ? match[5] + match[6] : match[3] + match[3], 16), parseInt(match[7] ? match[7] + match[8] : match[5] ? 'ff' : match[4] + match[4] || 'ff', 16) / 255];
		} else {
			return null;
		}
	};

	HTMLStudio.ColorSelector.prototype.addColorChangeListener = function(callback) {
		listeners.push([this, callback]);
	};

	HTMLStudio.ColorSelector.prototype.removeColorChangeListener = function(callback) {
		var self = this;
		listeners = listeners.filter(function(item) {
			return item[0] != self || item[1] != callback;
		});
	};

	HTMLStudio.ColorSelector.prototype.clearColorChangeListeners = function() {
		var self = this;
		listeners = listeners.filter(function(item) {
			return item[0] != self;
		});
	}
}();