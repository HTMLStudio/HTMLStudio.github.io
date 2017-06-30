!function() {
	"use strict";

	// Import JSON with all CSS properties
	// https://www.chromestatus.com/metrics/css/timeline/popularity
	var properties;
	!function() {
		var request = new XMLHttpRequest();
		request.open('GET', '/script/CSS_properties.json', true);

		request.onreadystatechange = function() {
			if (this.readyState === 4) properties = this.status >= 200 && this.status < 400 ? JSON.parse(this.responseText) : [];
		};

		request.send();
		request = null;
	}();

	var includeSelectors = false;
	(window.HTMLStudio = window.HTMLStudio || {}).CSSEditor = function CSSEditor() {
		var root = this.node = document.createElement('div');
		root.className = 'cssEditContainer';
		this.list = new HTMLStudio.CSSEditor.CSSRuleList(this);
		this.originalStylesheet = null;
		this.onQuerySelector = function(){};
		if (!arguments.length || arguments[0].constructor.name != 'CSSStyleSheet') {
			root.appendChild(this.list.newRule(true).node);
		} else {
			var stylesheet = arguments[0];
			this.originalStylesheet = stylesheet;
			if (arguments[1]) includeSelectors = true;
			for (var rules = stylesheet.cssRules, i = 0; i < rules.length; i++) {
				if (rules[i].constructor.name != 'CSSStyleRule') continue;
				var rule = this.list.newRule(rules[i].selectorText);
				root.appendChild(rule.node);
				rules[i].cssText.replace(/(?:{\s*|;\s*)([a-z-]+)\s*:\s*((?:[^;'"}]|("|')(?:(?:(?!\3).(?=\3|\\))?(?:(?=\3)|\\.(?:(?!\3)[^\\](?=\3|\\))?|(?:.(?!\\|\3))+.)*?)\3)+)/g, function($0, $1, $2) {
					return rule.list.node.appendChild(rule.list.newStyle($1.trim(), $2.trim()).node), $0;
				});
				if (!rule.list.node.children.length) rule.list.node.appendChild(rule.list.newStyle().node);
			}
		}
		this.generateStylesheet = function() {
			var stylesheet = document.createElement('style');
			stylesheet.innerHTML = (function(rules) {
				var text = '';
				rules.forEach(function(rule) {
					if (!rule.selector) return;
					var styles = '';
					rule.list.styles.forEach(function(style) {
						if (!style.name || !style.value) return;
						styles += '\n    ' + style.name + ': ' + style.value + ';';
					});
					if (styles == '') return;
					text += rule.selector + ' {' + styles + '\n}';
				});
				return text;
			})(this.list.rules);
			return stylesheet;
		}
		this.getInvalid = function() {
			var array = [];
			this.list.rules.forEach(function(rule) {
				rule.selector = rule.selectorNode.value;
				if (!rule.selector.trim()) array.push(rule);
				else {
					rule.node.className = 'cssRule';
					rule.selectorNode.className = '';
				}
				rule.list.styles.forEach(function(style) {
					if (style.name ? !style.value : style.value) array.push(style);
					else style.node.className = 'cssStyle';
					if (style.name || !style.value) style.nameNode.className = 'cssStyleName';
					if (style.value || !style.name) style.valueNode.className = 'cssStyleValue';
				});
			});
			return array;
		}
	}

	HTMLStudio.CSSEditor.CSSRuleList = function CSSRuleList(parent) {
		this.rules = [];
		this.push = function() {
			this.rules.push.apply(this.rules, arguments);
		}
		this.newRule = function(selector) {
			var rule = new HTMLStudio.CSSEditor.CSSRule(this, selector == true ? undefined : selector);
			if (selector == true) {
				rule.list.node.appendChild(rule.list.newStyle().node);	
			}
			this.push(rule);
			return rule;
		}
		this.root = parent;
	}

	HTMLStudio.CSSEditor.CSSRule = function CSSRule(list, selector) {
		this.deleteSelf = function() {
			self.parentList.rules.splice(self.parentList.rules.indexOf(self), 1);
			self.node.parentNode.removeChild(self.node);
		}

		var self = this;
		this.parentList = list;
		this.root = list.root;
		this.styles = [];
		var rule = this.node = document.createElement('div');
		rule.CSSRuleObject = this;
		rule.className = 'cssRule';
		this.list = new HTMLStudio.CSSEditor.CSSStyleList(this);
		this.selector = selector || '';
		// Create exit button
		var exit = document.createElement('div');
		exit.className = 'clb';
		exit.tabIndex = 0;
		exit.title = 'Delete this CSS rule'
		rule.appendChild(exit);
		exit.addEventListener('click', self.deleteSelf);
		exit.addEventListener('keydown', onEnter);
		// Create input box for CSS selector
		var selector = this.selectorNode = document.createElement('input');
		selector.type = 'text';
		selector.addEventListener('keyup', function() {
			self.selector = this.value;
		});
		selector.addEventListener('keydown', selectorInputKeypress);
		selector.addEventListener('focus', selectorInputKeypress);
		selector.addEventListener('scroll', sync);
		selector.addEventListener('wheel', sync);
		selector.addEventListener('mousewheel', sync);
		selector.value = this.selector;
		selector.placeholder = 'CSS selector';
		selector.autocomplete = selector.autocorrect = selector.autocapitalize = 'off';
		selector.spellcheck = false;
		selector.CSSRuleObject = this;
		rule.appendChild(selector);
		// Create syntax highlighter
		var display = this.selectorDisplay = document.createElement('div');
		display.className = 'cssSelectorDisplay';
		display.CSSRuleObject = this;
		rule.appendChild(display);
		if (includeSelectors) {
			rule.appendChild(document.createTextNode(' '));
			this.docSelector = document.createElement('img');
			this.docSelector.addEventListener('click', selectorClick);
			this.docSelector.tabIndex = 0;
			this.docSelector.addEventListener('keydown', selectorKeypress);
			this.docSelector.title = 'Find elements with this selector'
			this.docSelector.CSSRuleObject = this;
			this.docSelector.src = '/svg/select_from_selector.svg';
			this.docSelector.className = 'cld';
			rule.appendChild(this.docSelector);
		} else this.docSelector = null;
		rule.appendChild(document.createTextNode(' {'));
		rule.appendChild(this.list.node);
		rule.appendChild(document.createTextNode('}'));
		this.add = document.createElement('div');
		this.add.className = 'clc';
		this.add.tabIndex = 0;
		this.add.title = 'Create a new CSS rule';
		rule.appendChild(this.add);
		this.add.addEventListener('click', addFollowRule);
		this.add.addEventListener('keydown', onEnter);
		this.add.CSSRuleObject = this;
	}


	HTMLStudio.CSSEditor.CSSStyleList = function CSSStyleList(rule) {
		var self = this;
		this.styles = [];
		this.push = function() {
			this.styles.push.apply(this.styles, arguments);
		}
		this.newStyle = function(name, value) {
			var style = new HTMLStudio.CSSEditor.CSSStyle(self, name, value);
			this.push(style);
			return style;
		}
		this.node = document.createElement('div');
		this.node.className = 'cssStyleContainer';
		this.rule = rule;
		this.root = rule.root;
	}


	HTMLStudio.CSSEditor.CSSStyle = function CSSStyle(list, name, value) {
		this.deleteSelf = function() {
			if (!self.node.nextElementSibling && !self.node.previousElementSibling) return;
			self.parentList.styles.splice(self.parentList.styles.indexOf(self), 1);
			self.node.parentNode.removeChild(self.node);
		}

		var self = this;
		this.parentList = list;
		this.root = list.root;
		this.name = name || '';
		this.value = value || '';
		var container = this.node = document.createElement('div');
		container.className = 'cssStyle';
		container.CSSStyleObject = this;
		container.addEventListener('click', styleClick);
		var exit = this.exit = document.createElement('div');
		exit.className = 'clb';
		exit.tabIndex = 0;
		exit.title = 'Delete this CSS style'
		container.appendChild(exit);
		exit.addEventListener('click', self.deleteSelf);
		exit.addEventListener('blur', blur);
		exit.addEventListener('keydown', onEnter);
		exit.CSSStyleObject = this;
		this.nameNode = document.createElement('input');
		this.nameNode.className = 'cssStyleName';
		this.nameNode.type = 'text';
		if (HTMLStudio.autoFill && properties) HTMLStudio.autoFill(this.nameNode, properties, true);
		container.appendChild(this.nameNode);
		this.nameNode.addEventListener('keydown', nameKeyPress);
		this.nameNode.addEventListener('blur', blur);
		this.nameNode.addEventListener('keyup', function() {
			self.name = this.value.trim();
		});
		this.nameNode.value = this.name;
		this.nameNode.placeholder = 'property'
		this.nameNode.CSSStyleObject = this;
		var colon = document.createElement('span');
		colon.className = 'cssStyleColon';
		container.appendChild(colon);
		this.valueNode = document.createElement('textarea');
		this.valueNode.className = 'cssStyleValue';
		container.appendChild(this.valueNode);
		this.valueNode.addEventListener('keydown', valueKeypress);
		this.valueNode.addEventListener('keyup', valueKeyup);
		this.valueNode.addEventListener('blur', blur);
		this.valueNode.addEventListener('keyup', function() {
			self.value = this.value.trim();
		});
		this.valueNode.value = this.value;
		this.valueNode.placeholder = 'value';
		this.valueNode.CSSStyleObject = this;
		var semicolon = document.createElement('span');
		semicolon.className = 'cssStyleSemicolon';
		container.appendChild(semicolon);
	}




	function nameKeyPress(e) {
		if (((e.keyCode == 59 || e.keyCode == 186) && e.shiftKey) || e.keyCode == 61 || e.keyCode == 13) {
			e.preventDefault();
			this.CSSStyleObject.valueNode.select();
		}
	}

	function valueKeypress(e) {
		setTimeout(function() {
			this.style.height = this.value.match(/\n|$/g).length * 1.25 + 'em';
		}.bind(this), 0);
		if (e.keyCode == 59 || e.keyCode == 186 || e.keyCode == 13 || (e.keyCode == 9 && !e.shiftKey)) {
			var obj = this.CSSStyleObject;
			if (e.keyCode == 59 || e.keyCode == 186) {
				var position = 0;
				if (document.selection) {
					this.select();
					var range = document.selection.createRange();
					range.moveStart('character', -this.value.length);
					position = range.text.length;
				} else if (typeof this.selectionStart == 'number') position = this.selectionStart;

				var context = this.value.substring(0, position);
				if (context) {
					var match = context.match(/^(?:[^'"]|"(?:\\.|[^"])*"|'(?:\\.[^'])*')+/);
					if (!match || match[0].length != context.length) return;
				}
			} else if (e.keyCode == 13) {
				testForComma: { 
					if (!e.shiftKey && !e.ctrlKey && !e.altKey && !e.metaKey) {
						var position = 0;
						if (document.selection) {
							this.select();
							var range = document.selection.createRange();
							range.moveStart('character', -this.value.length);
							position = range.text.length;
						} else if (typeof this.selectionStart == 'number') position = this.selectionStart;

						var context = this.value.substring(0, position);
						if (context) {
							var match = context.match(/^(?:[^'"]|"(?:\\.|[^"])*"|'(?:\\.|[^'])*')+/);
							if (match && match[0].length == context.length && context.trim()[context.trim().length - 1] != ',') break testForComma;
						} else {
							break testForComma;
						}
					}
					return;
				}
			} 

			if (!this.parentNode.nextElementSibling && (this.value || obj.nameNode.value)) {
				e.preventDefault();
				var newStyle = obj.parentList.newStyle();
				obj.parentList.node.appendChild(newStyle.node);
				newStyle.nameNode.focus();
			} else if (this.parentNode.nextElementSibling) {
				e.preventDefault();
				this.parentNode.nextElementSibling.CSSStyleObject.nameNode.focus();
				this.parentNode.nextElementSibling.CSSStyleObject.nameNode.select();
			} else if (!(this.value || obj.nameNode.value)) {
				e.preventDefault();
				obj.parentList.rule.add.focus();
			}
		}
	}

	function valueKeyup() {
		this.style.height = this.value.match(/\n|$/g).length * 1.25 + 'em';
	}

	function onEnter(e) {
		if (e.keyCode == 13) {
			this.dispatchEvent(new Event('click'));
		}
	}

	function selectorInputKeypress(e) {
		setTimeout(function() {
			var div = this.CSSRuleObject.selectorDisplay,
				val = this.value;
			div.className = 'cssSelectorDisplay ' + this.dir;
			div.innerHTML = '';
			var span = document.createElement('span');
			span.className = 'cssSelectorSyntaxComma';
			span.innerText = val.match(/^\s*/)[0];
			if (span.innerText) div.appendChild(span);
			HTMLStudio.parseSelector(val).forEach(function(selector, i, a) {
				selector.components.forEach(function(component) {
					var span = document.createElement('span');
					span.className = 'cssSelectorSyntax' + component.type;
					span.innerText = component.str;
					div.appendChild(span);
					if (component.nextFiller) {
						span = document.createElement('span');
						span.className = 'cssSelectorSyntaxComma';
						span.innerText = component.nextFiller;
						div.appendChild(span);
					}
				});


				if (selector.invalid) {
					var span = document.createElement('span'),
						index = val.match(/^\s*/)[0].length;
					span.className = 'cssSelectorSyntaxInvalid';
					selector.components.forEach(function(component) {
						index += component.str.length;
					});
					span.innerText = selector.selector.substring(index);
					if (!span.innerText) {
						span.style.display = 'inline-block';
						span.style.width = '.2em';
						span.innerText = '\u00a0';
					}
					div.appendChild(span);
				} else if (a[i + 1]) {
					var span = document.createElement('span');
					span.className = 'cssSelectorSyntaxComma';
					val = val.substring(selector.selector.length);
					span.innerText = a[i + .5];
					val = val.replace(span.innerText, '');
					div.appendChild(span);
				} else if (val.match(/(?:\\\s|)(\s*$|$)/)[1]) {
					var span = document.createElement('span');
					span.className = 'cssSelectorSyntaxComma';
					span.innerText = val.match(/(?:\\\s|)(\s*$|$)/)[1];
					div.appendChild(span);
				}
			});
			if (!div.innerText) div.innerHTML = '<span class="cssSelectorSyntaxEmpty">' + this.placeholder + '</span>';
			div.scrollLeft = this.scrollLeft;
			div.scrollTop = this.scrollTop;
		}.bind(this), 0);
		if (e.keyCode == 13 || (e.keyCode == 9 && !e.shiftKey)) {
			e.preventDefault();
			this.CSSRuleObject.docSelector ? this.CSSRuleObject.docSelector.focus() : this.CSSRuleObject.list.styles[0].nameNode.select();
		}
	}

	function addFollowRule() {
		this.parentNode.parentNode.insertBefore(this.CSSRuleObject.parentList.newRule(true).node, this.parentNode.nextElementSibling);
		this.CSSRuleObject.node.nextElementSibling.CSSRuleObject.selectorNode.focus();
	}

	function styleClick(e) {
		if (e.target.nodeType == 1 && (e.target.nodeName == 'INPUT' || e.target.nodeName == 'TEXTAREA')) return;
		this.CSSStyleObject.nameNode.select();
	}

	function selectorClick() {
		this.CSSRuleObject.root.onQuerySelector(this.CSSRuleObject.selectorNode.value.trim());
	}

	function selectorKeypress(e) {
		if (e.keyCode == 13) selectorClick.call(this);
		else if (e.keyCode == 9 && !e.shiftKey) {
			e.preventDefault();
			this.CSSRuleObject.list.styles[0].nameNode.select();
		}
	}

	function sync() {
		var disp = this.CSSRuleObject.selectorDisplay;
		disp.scrollLeft = this.scrollLeft;
		disp.scrollTop = this.scrollTop;
	}

	function blur() {
		setTimeout(function() {
			var obj = this.CSSStyleObject;
			if (document.activeElement == obj.nameNode || document.activeElement == obj.valueNode || document.activeElement == obj.exit || obj.nameNode.value || obj.valueNode.value) return;
			obj.deleteSelf();
		}.bind(this), 0);
	}
}();