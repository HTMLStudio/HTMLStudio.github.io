"use strict";


var debug = {
	start: function (ref) {
		var s = performance.now();
		console.log('New Debugger,',ref,', started at',Math.round(s*1000)/1000);
		return {
			cur: 0,
			last: s,
			step: function(num) {
				var t=performance.now();
				this.cur += 1;
				this.cur = num || this.cur;
				console.log('Debugger',ref,'stepped at',Math.round((t-s)*1000)/1000,'| Step:',this.cur,'| Last:',Math.round((t-this.last)*1000)/1000);
				this.last = t;
			}
		}
	}
}

!function(){

/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-csspositionsticky-setclasses !*/
!function(e,n,s){function t(e,n){return typeof e===n}function o(){var e,n,s,o,a,i,f;for(var c in r)if(r.hasOwnProperty(c)){if(e=[],n=r[c],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(s=0;s<n.options.aliases.length;s++)e.push(n.options.aliases[s].toLowerCase());for(o=t(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],f=i.split("."),1===f.length?Modernizr[f[0]]=o:(!Modernizr[f[0]]||Modernizr[f[0]]instanceof Boolean||(Modernizr[f[0]]=new Boolean(Modernizr[f[0]])),
Modernizr[f[0]][f[1]]=o),l.push((o?"":"no-")+f.join("-"))}}function a(e){var n=c.className,s=Modernizr._config.classPrefix||"";if(u&&(n=n.baseVal),Modernizr._config.enableJSClass){var t=new RegExp("(^|\\s)"+s+"no-js(\\s|$)");n=n.replace(t,"$1"+s+"js$2")}Modernizr._config.enableClasses&&(n+=" "+s+e.join(" "+s),u?c.className.baseVal=n:c.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):u?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,
arguments)}var l=[],r=[],f={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var s=this;setTimeout(function(){n(s[e])},0)},addTest:function(e,n,s){r.push({name:e,fn:n,options:s})},addAsyncTest:function(e){r.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=f,Modernizr=new Modernizr;var c=n.documentElement,u="svg"===c.nodeName.toLowerCase(),p=f._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];f._prefixes=p,
Modernizr.addTest("csspositionsticky",function(){var e="position:",n="sticky",s=i("a"),t=s.style;return t.cssText=e+p.join(n+";"+e).slice(0,-e.length),-1!==t.position.indexOf(n)}),o(),a(l),delete f.addTest,delete f.addAsyncTest;for(var m=0;m<Modernizr._q.length;m++)Modernizr._q[m]();e.Modernizr=Modernizr}(window,document);


(window.HTMLStudio = window.HTMLStudio || {}).initiated = false;

function main(){
	/*
		TODO:
		 - Resizable dialogs
		 - Edit prefs dialog
		 - Better grid
		 - Toggleable toolbar
		 - Import style sheets
		 - Node duplicator
		 - Fix <a> Edit Text auto-blur
		 - HTML Prettifier
		 - Fix Edit Text bottom scrolling bug
	*/


	if (HTMLStudio.initiated) return;


	// Returns one em's worth of pixels
	window.em = function(){
		return Math.round(document.getElementById('measurementReference').getBoundingClientRect().height * (arguments.length ? +arguments[0]: 1) * 1000) / 1000 + (arguments[1] ? 'px' : 0);
	}
	// Same for one pt
	window.pt = function(){
		return Math.round(document.getElementById('measurementReference').getBoundingClientRect().width * (arguments.length ? +arguments[0] : 1) * 1000) / 1000 + (arguments[1] ? 'px' : 0);
	}


	// Run on page load
	if (+localStorage.getItem('HTML-Studio_session')) alreadyActive();
	// Tests if user on mobile
	if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(navigator.userAgent||navigator.vendor||window.opera)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((navigator.userAgent||navigator.vendor||window.opera).substr(0,4))) userOnMobileDevice();
	localStorage.setItem('HTML-Studio_session', '1');
	var iframe = document.getElementById('frame'),
		framewindow = iframe.contentWindow,
		overlay = document.getElementById('frameoverlay'),
		backdialog = document.getElementById('dialogcover'),
		history = {
			entries: JSON.parse(localStorage.getItem('HTML-Studio_documentHistoryEntries')) || [],
			update: function(action) {
				var stylesheethtml = [],
					testStyle;
				for (var stylesheets = framewindow.document.querySelectorAll('style'), i = stylesheets.length - 1; i >= 0; i--) {
					testStyle = stylesheets[i].cloneNode();
					testStyle.innerHTML = stylesheets[i].innerHTML.replace(/(^|;|\{|\}|:)\s+/g,'$1').replace(/\s+(?=\{)|;(?=})/g,'');
					stylesheethtml.push(testStyle.outerHTML);
				}
				var obj = {
					html: framewindow.document.body.outerHTML,
					title: document.getElementById('title').value,
					action: action,
					stylesheets: stylesheethtml
				};
				if (obj.html == (this.entries[this.currentEntry] || {html: ''}).html && obj.title == (this.entries[this.currentEntry] || {title: ''} ).title && JSON.stringify(obj.stylesheets) == JSON.stringify((this.entries[this.currentEntry] || {stylesheets: '[]'}).stylesheets)) return;

				this.currentEntry++;
				this.entries[this.currentEntry] = obj;
				localStorage.setItem('HTML-Studio_stylesheets', JSON.stringify(stylesheethtml))
				this.entries = this.entries.slice(0,this.currentEntry + 1);
				localStorage.setItem('HTML-Studio_documentHistoryEntries', JSON.stringify(this.entries.slice().splice(Math.max(this.currentEntry - 10, 0), 16)));
				localStorage.setItem('HTML-Studio_documentHistoryCurrentEntry', Math.min(this.currentEntry, 10));
				contextmenus[3].getItem('undo').disabled = !this.currentEntry;
				contextmenus[3].getItem('redo').disabled = this.currentEntry == this.entries.length - 1;
				contextmenus[3].getItem('undo').getElementsByClassName('contextmenuitemtext')[0].innerText = 'Undo' + (history.currentEntry == 0 || !history.entries[history.currentEntry].action ? '' : ' • ' + history.entries[history.currentEntry].action);
				contextmenus[3].getItem('redo').getElementsByClassName('contextmenuitemtext')[0].innerText = 'Redo' + (history.currentEntry + 2 > history.entries.length || !history.entries[history.currentEntry + 1].action ? '' : ' • ' + history.entries[history.currentEntry + 1].action);
				setTimeout(overlayUpdate, 1000);
			}
		}, locale = {
			isMac: /mac/i.test(navigator.platform),
			cmdKey: /mac/i.test(navigator.platform) ? "\u2318" : "Ctrl",
			cmdKeyPressed: function(keyboardEvent) {
				return this.isMac ? keyboardEvent.metaKey : keyboardEvent.ctrlKey;
			}
		}, contextmenus = [
			new HTMLStudio.ContextMenu({
				items: [{
					name: '[Node Info]',
					disabled: true,
					pad: false,
					css: {
						fontFamily: 'Consolas,Monaco,"Ubuntu Mono","Courier New",Courier,monospace'
					},
					separate: true,
					id: 'info'
				},{
					name: 'Edit Styles&#133;',
					func: function(_,close) {
						close();
						backdialog.style.display = 'block';
						document.getElementById('dialog_edit_styles').style.display = 'block';
						var html = '<table id="idu">',
							selectedElement = document.querySelector('[data-selected-element=selected]'),
							style = selectedElement.alias.getAttribute('style') || '';
						style.replace(/(?:^\s*|;\s*)([a-z-]+)?\s*:\s*((?:[^;'"}]|("|')(?:(?:(?!\3).(?=\3|\\))?(?:(?=\3)|\\.(?:(?!\3)[^\\](?=\3|\\))?|(?:.(?!\\|\3))+.)*?)\3)*)/g, function($0,$1,$2) {
							if (!$1 && !$2) return $0;
							html += '<tr class="cl4"><td><input type="text" value="' + quoteEscape($1) + '" placeholder="style name" class="cl1 cl3"></td><td><input type="text" value="' + quoteEscape($2) + '" placeholder="style value" class="cl2 cl3"></td></td>';
							return $0; 
						});
						html += '<tr class="cl4"><td><input type="text" placeholder="style name" class="cl1 cl3"></td><td><input type="text" placeholder="style value" class="cl2 cl3"></td></tr><tr class="cl4" id="idw"><td><input type="text" placeholder="style name" class="cl1 cl3" id="idx"></td><td><input type="text" tabindex="-1" placeholder="style value" class="cl2 cl3"></td></tr></table>';
						document.getElementById('idv').innerHTML = html;
						document.getElementById('idu').linkedElement = document.querySelector('[data-selected-element=selected]').alias;
						var finaltr = document.getElementById('idw').previousElementSibling;
						document.getElementById('idx').addEventListener('focus', function() {
							var tr = document.createElement('tr');
							tr.className = 'cl4';
							tr.innerHTML = '<td><input type="text" placeholder="style name" class="cl1 cl3"></td><td><input type="text" placeholder="style value" class="cl2 cl3"></td>';
							this.parentNode.parentNode.parentNode.insertBefore(tr, this.parentNode.parentNode);
							finaltr = tr;
							tr.children[0].children[0].focus();
							[tr.children[0].children[0], tr.children[1].children[0]].forEach(function(element) {
								element.addEventListener('blur', function() {
									setTimeout(function() {
										var tr = element.parentNode.parentNode;
										tr.inputs = [tr.children[0].children[0], tr.children[1].children[0]];
										element.active = false;
										if (!tr.inputs[0].value && !tr.inputs[1].value && !tr.inputs[0].active && !tr.inputs[1].active && tr != tr.parentNode.firstElementChild) {
											tr.parentNode.removeChild(tr);
										};
									},0);
								});
								element.addEventListener('focus', function() {
									element.active = true;
								});
								element.addEventListener('keydown', function(e) {
									if ((e.keyCode == 9 && !e.shiftKey) || e.keyCode == 13 || ((((e.keyCode == 59 || e.keyCode == 186) && e.shiftKey) || e.keyCode == 61) && element.parentNode.nextElementSibling) || ((e.keyCode == 59 || e.keyCode == 186) && element.parentNode.previousElementSibling)) {
										if (e.keyCode == 59 || e.keyCode == 186) {
											var position = 0;
											if (document.selection) {
												element.focus();
												var range = document.selection.createRange();
												range.moveStart('character', -element.value.length);
												position = range.text.length;
											} else if (typeof element.selectionStart == 'number') position = element.selectionStart;

											var context = this.value.substring(0, position);
											if (context) {
												var match = context.match(/^(?:[^'"]|("|')(((?!\1).(?=\1|\\))?((?=\1)|\\.((?!\1)[^\\](?=\1|\\))?|(.(?!\\|\1))+.)*?)\1)+/);
												if (!match || match[0].length != context.length) return;
											}
										}
										e.preventDefault();
										(element.parentNode.parentNode == finaltr && !element.parentNode.nextElementSibling && !finaltr.children[0].children[0].value && !finaltr.children[1].children[0].value ? document.getElementById('idt') : element.parentNode.nextElementSibling ? element.parentNode.nextElementSibling.children[0] : element.parentNode.parentNode.nextElementSibling.children[0].children[0]).focus();
									}
								});
							});
						});
						Array.prototype.forEach.call(document.querySelectorAll('#idv input:not(#idx)'), function(element) {
							element.addEventListener('blur', function(e) {
								setTimeout(function() {
									var tr = element.parentNode.parentNode;
									tr.inputs = [tr.children[0].children[0], tr.children[1].children[0]];
									element.active = false;
									if (!tr.inputs[0].value && !tr.inputs[1].value && !tr.inputs[0].active && !tr.inputs[1].active && tr != tr.parentNode.firstElementChild) {
										tr.parentNode.removeChild(tr);
									};
								},0);
							});
							element.addEventListener('focus', function(e) {
								element.active = true;
							});
							element.addEventListener('keydown', function(e) {
								if ((e.keyCode == 9 && !e.shiftKey) || e.keyCode == 13 || ((((e.keyCode == 59 || e.keyCode == 186) && e.shiftKey) || e.keyCode == 61) && element.parentNode.nextElementSibling) || ((e.keyCode == 59 || e.keyCode == 186) && element.parentNode.previousElementSibling)) {
									if (e.keyCode == 59 || e.keyCode == 186) {
										var position = 0;
										if (document.selection) {
											element.focus();
											var range = document.selection.createRange();
											range.moveStart('character', -element.value.length);
											position = range.text.length;
										} else if (typeof element.selectionStart == 'number') position = element.selectionStart;

										var context = this.value.substring(0, position);
										if (context) {
											var match = context.match(/^(?:[^'"]|("|')(((?!\1).(?=\1|\\))?((?=\1)|\\.((?!\1)[^\\](?=\1|\\))?|(.(?!\\|\1))+.)*?)\1)+/);
											if (!match || match[0].length != context.length) return;
										}
									}
									e.preventDefault();
									(element.parentNode.parentNode == finaltr && !element.parentNode.nextElementSibling && !finaltr.children[0].children[0].value && !finaltr.children[1].children[0].value ? document.getElementById('idt') : element.parentNode.nextElementSibling ? element.parentNode.nextElementSibling.children[0] : element.parentNode.parentNode.nextElementSibling.children[0].children[0]).focus();
								}
							});
						});
						document.querySelector('#idv tr:first-child input').focus();
					},
					image: 'svg/edit_styles.svg',
					title: 'Allows you to edit the element\'s CSS',
					id: 'editStyle'
				},{
					name: 'Edit Attributes&#133;',
					func: function(_,close) {
						close();
						backdialog.style.display = 'block';
						document.getElementById('dialog_edit_attributes').style.display = 'block';
						var html = '<table id="idi">';
						Array.prototype.forEach.call(document.querySelector('[data-selected-element=selected]').alias.attributes, function(attribute) {
							html += '<tr class="cl4"><td><input type="text" value="' + quoteEscape(attribute.name) + '" placeholder="attribute" class="cl1 cl3"></td><td><input type="text" value="' + quoteEscape(attribute.value) + '" placeholder="value" class="cl2 cl3"></td></td>';
						});
						html += '<tr class="cl4"><td><input type="text" placeholder="attribute" class="cl1 cl3"></td><td><input type="text" placeholder="value" class="cl2 cl3"></td></tr><tr class="cl4" id="idk"><td><input type="text" placeholder="attribute" class="cl1 cl3" id="idj"></td><td><input type="text" tabindex="-1" placeholder="value" class="cl2 cl3"></td></tr></table>';
						document.getElementById('idg').innerHTML = html;
						document.getElementById('idi').linkedElement = document.querySelector('[data-selected-element=selected]').alias;
						var finaltr = document.getElementById('idk').previousElementSibling;
						document.getElementById('idj').addEventListener('focus', function() {
							var tr = document.createElement('tr');
							tr.className = 'cl4';
							tr.innerHTML = '<td><input type="text" placeholder="attribute" class="cl1 cl3"></td><td><input type="text" placeholder="value" class="cl2 cl3"></td>';
							this.parentNode.parentNode.parentNode.insertBefore(tr, this.parentNode.parentNode);
							finaltr = tr;
							tr.children[0].children[0].focus();
							[tr.children[0].children[0], tr.children[1].children[0]].forEach(function(element) {
								element.addEventListener('blur', function() {
									setTimeout(function() {
										var tr = element.parentNode.parentNode;
										tr.inputs = [tr.children[0].children[0], tr.children[1].children[0]];
										element.active = false;
										if (!tr.inputs[0].value && !tr.inputs[1].value && !tr.inputs[0].active && !tr.inputs[1].active && tr != tr.parentNode.firstElementChild) {
											tr.parentNode.removeChild(tr);
										};
									},0);
								});
								element.addEventListener('focus', function() {
									element.active = true;
								});
								element.addEventListener('keydown', function(e) {
									if ((e.keyCode == 9 && !e.shiftKey) || e.keyCode == 13 || ((((e.keyCode == 59 || e.keyCode == 186) && e.shiftKey) || e.keyCode == 61) && element.parentNode.nextElementSibling)) {
										e.preventDefault();
										(element.parentNode.parentNode == finaltr && !element.parentNode.nextElementSibling && !finaltr.children[0].children[0].value && !finaltr.children[1].children[0].value ? document.getElementById('idh') : element.parentNode.nextElementSibling ? element.parentNode.nextElementSibling.children[0] : element.parentNode.parentNode.nextElementSibling.children[0].children[0]).focus();
									};
								});
							});
						});
						Array.prototype.forEach.call(document.querySelectorAll('#idg input:not(#idj)'), function(element) {
							element.addEventListener('blur', function(e) {
								setTimeout(function() {
									var tr = element.parentNode.parentNode;
									tr.inputs = [tr.children[0].children[0], tr.children[1].children[0]];
									element.active = false;
									if (!tr.inputs[0].value && !tr.inputs[1].value && !tr.inputs[0].active && !tr.inputs[1].active && tr != tr.parentNode.firstElementChild) {
										tr.parentNode.removeChild(tr);
									};
								},0);
							});
							element.addEventListener('focus', function(e) {
								element.active = true;
							});
							element.addEventListener('keydown', function(e) {
								if ((e.keyCode == 9 && !e.shiftKey) || e.keyCode == 13 || (((e.keyCode == 58 && e.shiftKey) || e.keyCode == 61) && element.parentNode.nextElementSibling)) {
									e.preventDefault();
									(element.parentNode.parentNode == finaltr && !element.parentNode.nextElementSibling && !finaltr.children[0].children[0].value && !finaltr.children[1].children[0].value ? document.getElementById('idh') : element.parentNode.nextElementSibling ? element.parentNode.nextElementSibling.children[0] : element.parentNode.parentNode.nextElementSibling.children[0].children[0]).focus();
								};
							});
						});
						document.querySelector('#idg tr:first-child input').focus();
					},
					title: 'Allows you to edit the element\'s attributes',
					image: 'svg/edit_attributes.svg',
					separate: true,
					id: 'editAttributes'
				},{
					name: 'Edit Class Name&#133;',
					func: function(_,close) {
						close();
						var editor = document.getElementById('classEditor'), idQ = document.getElementById('idQ'), elements = document.querySelectorAll('[data-selected-element=selected]');
						if (!elements.length) return;
						closeTopTexts();
						editor.className = 'topText active';
						if (elements.length > 1) {
							var classes = elements[0].alias.className.baseVal ? elements[0].alias.className.baseVal : typeof elements[0].alias.className == 'string' ? elements[0].alias.className : '';
							for (var i = elements.length - 1; classes && i >= 0; i--) {
								if ((elements[i].alias.className.baseVal ? elements[i].alias.className.baseVal : typeof elements[i].alias.className == 'string' ? elements[i].alias.className : '') != classes) classes = false;
							}

							idQ.elements = Array.prototype.slice.call(elements);
							if (classes) {
								idQ.method = 'replace';
								idQ.value = classes;
							} else {
								idQ.method = 'append';
								idQ.value = '';
								idQ.origClass = idQ.elements.map(function(element) {
									return element.alias.className.baseVal ? element.alias.className.baseVal.trim() : typeof element.alias.className == 'string' ? element.alias.className.trim() : '';
								});
							}
						} else {
							var element = elements[0]
							idQ.value = element.alias.className ? element.alias.className.baseVal ? element.alias.className.baseVal : element.alias.className : '';
							idQ.method = 'replace';
							idQ.elements = [element];
						}
						idQ.focus();
					},
					title: '(' + locale.cmdKey + ' + . ) Allows you to quickly edit the element\'s classes',
					image: 'svg/edit_class.svg',
					id: 'editClass'
				},{
					name: 'Edit ID&#133;',
					func: function(_,close) {
						close();
						var editor = document.getElementById('idEditor'), idR = document.getElementById('idR'), elements = document.querySelectorAll('[data-selected-element=selected]');
						if (!elements.length) return;
						closeTopTexts();
						if (elements.length > 1) {
							document.getElementById('idNoEdit').className = 'topText active';
						} else {
							editor.className = 'topText active';
							idR.element = elements[0].alias;
							idR.value = elements[0].alias.id;
							idR.focus();
						}
					},
					title: '(' + locale.cmdKey + ' + Shift + 3) Allows you to quickly edit the element\'s ID',
					separate: true,
					image: 'svg/edit_id.svg',
					id: 'editId'
				},{
					name: 'Insert Child&#133;',
					func: function(_,close) {
						close();
						var element = document.querySelector('[data-selected-element="selected"]');
						if (!element) return;
						backdialog.style.display = 'block';
						document.getElementById('dialog_new_child').style.display = 'block';
						Array.prototype.forEach.call(document.querySelectorAll('.clf.clg'), function(element) {
							element.className = 'clf';
						});
						var obj;
						document.getElementById('ida').insertChild = obj = {textNode: Symbol(), element: element.alias, children: null};
						var idc = document.getElementById('idc');
						idc.value = '';
						idc.focus();
						var hasChildren = false;
						function esc(str) {
							str = str.replace(/^\s+|\s+$/g,' ').replace(/\$/g,'$$');
							str = (str.length < 33 ? str : str.substring(0,15) + '-$-' + str.substring(str.length - 15))
							var test = document.createElement('span');
							test.innerText = str;
							return test.innerHTML.replace(/<br>/g, '<span style="color:#009;font-weight:700">&#8629;</span>').replace(/-\$-/,'<span style="color:#009;font-weight:700">&#133;</span>').replace(/\$\$/g,'$');
						}
						Array.prototype.forEach.call(element.alias.childNodes, function(child, i) {
							if (child.nodeType == 1) {
								hasChildren = true;
								var format = formatElementInfo(child);
								(obj.children = obj.children || []).push({str: '<span style="font-family:Consolas,Monaco,\'Ubuntu Mono\',\'Courier New\',Courier,monospace"><span style="font-weight:700">&lt;</span>' + format.name + format.id + format.class + '<span style="font-weight:700">&gt;</span></span>', i: i, n: child});
							} else if (child.nodeType == 3 && child.textContent.trim()) {
								hasChildren = true;
								(obj.children = obj.children || []).push({str: '<span style="color:#F44;font-family:Consolas,Monaco,\'Ubuntu Mono\',\'Courier New\',Courier,monospace" title="#text &quot;' + quoteEscape(child.textContent) + '&quot;">#text "<span style="color:#33F;white-space:pre-wrap">' + esc(child.textContent) + '</span>"</span>', i: i, n: child});
							}
						});
						document.getElementById('idT').style.display = hasChildren ? '' : 'none';
						if (hasChildren) {
							var html = '';
							for (var i = obj.children.length - 1; i >= 0; i--) {
								html = '<div class="clh" tabindex="0" data-index="' + obj.children[i].i + '">' + obj.children[i].str + '</div>' + html;
							}
							var idU = document.getElementById('idU');
							idU.innerHTML = '<div id="idV" tabindex="0">Your Node</div>' + html;

							var index = obj.children[0].i,
								clicked = false,
								replace = function(e) {
									var attr = this.getAttribute('data-index');
									if (index < attr || this.previousElementSibling == idV) {
										idU.insertBefore(idV, this.nextElementSibling);
									} else {
										idU.insertBefore(idV, this);
									}
									index = +this.getAttribute('data-index');
									obj.index = Array.prototype.indexOf.call(idU.children, idV);
									if (e.type == 'focus' || e.type == 'keydown') idV.focus();
								},
								clickEvent = function(e) {
									if (!clicked) Array.prototype.forEach.call(document.querySelectorAll('.clh'), function(element) {
										element.removeEventListener('mouseenter', replace);
										element.removeEventListener('focus', replace);
										element.addEventListener('click', replace);
										element.addEventListener('keydown', function(e) {
											if (e.keyCode == 13) replace.call(this,e);
										});
									});
									clicked = true;
								};

							// On hover for [Right Click] > Insert Child... > [Node Position <div>s]
							Array.prototype.forEach.call(document.querySelectorAll('.clh'), function(element) {
								element.addEventListener('mouseenter', replace);
								element.addEventListener('focus', replace);
							});
							idV.addEventListener('click', clickEvent);
							idV.addEventListener('keydown', function(e) {
								if (e.keyCode == 13) clickEvent.call(this);
							})
						}
					},
					title: 'Inserts a child node into the selected node',
					image: 'svg/insert_child.svg',
					separate: true,
					id: 'insertChild'
				},{
					name: 'Select Parent',
					image: 'svg/select_parent.svg',
					disabledimage: 'svg/select_parent_disabled.svg',
					func: function(e,close) {
						close();
						if (document.querySelector('[data-selected-element=selected]') == overlay) {
							clickhandler.call(overlay, {
								stopPropagation: function(){},
								clientX: 0,
								clientY: Math.round(em(4.45)),
								isTrusted: true
							});
							updateTooltip();
							return this.disabled = true;
						}
						var node = document.querySelector('[data-selected-element=selected]').parentNode;
						if (!e.shiftKey) deselect();
						clickhandler.call(node, pseudoEvent.__extend__({set: true}));

						updateTooltip();
						updateTreeSelections();
						selection = Array.prototype.slice.call(document.querySelectorAll('[data-selected-element=selected]'));
					},
					title: '(' + locale.cmdKey + ' + Up) or (' + locale.cmdKey + ' + Shift + Up) Selects the immediate parent of the node',
					disabledtitle: '(' + locale.cmdKey + ' + Up) or (' + locale.cmdKey + ' + Shift + Up) This node\'s parent cannot be selected',
					id: 'selectParent'
				},{
					name: 'Select Children',
					image: 'svg/select_children.svg',
					disabledimage: 'svg/select_children_disabled.svg',
					func: function(e,close) {
						close();
						var element = document.querySelector('[data-selected-element=selected]');
						if (!e.shiftKey) deselect();
						forEach(element.children, function() {
							clickhandler.call(this, (pseudoEvent.__extend__({set: true})));
						});
						updateTooltip();
						updateTreeSelections();
						selection = Array.prototype.slice.call(document.querySelectorAll('[data-selected-element=selected]'));
					},
					title: '(' + locale.cmdKey + ' + Down) or (' + locale.cmdKey + ' + Shift + Down) Selects all immediate children of the node',
					disabledtitle: '(' + locale.cmdKey + ' + Down) or (' + locale.cmdKey + ' + Shift + Down) This node has no children',
					separate: true,
					id: 'selectChildren'
				},{
					name: 'Edit Text',
					image: 'svg/edit_text.svg',
					func: function(_,close) {
						close();
						var element = document.querySelector('[data-selected-element=selected]');
						if (!element) return;
						var boxshadow = element.alias.style.boxShadow, pendingUpdate = false, contenteditable = element.alias.hasAttribute('contenteditable') ? element.alias.getAttribute('contenteditable') : false, hasBlurred = false;
						// Makes element contenteditable
						element.alias.setAttribute('contenteditable','');
						// Prevent the user from interacting with the overlay
						overlay.style.pointerEvents = 'none';
						// Focus the editable element
						if (element.alias.focus) element.alias.focus();
						deselect();
						// Allows for CSS selectors to target the element
						// Used for changing the box-shadow of the element
						element.setAttribute('data-html-studio-text-being-edited','true');
						// Since the overlay element could be replaced (from a call to overlayUpdate())
						// any elements that are cloned from element.alias will inherit the attribute mentioned above
						element.alias.htmlStudioTextBeingEdited = true;
						// Used for keeping track of how many child elements are in the editable element
						var elemcount = element.alias.children.length,
						// Used for HTML entity replacers
						regex = {
							pre: /(?=(?:<[a-zA-Z][a-zA-Z\d_-]*(?:\[[a-zA-Z][a-zA-Z\d_-]*(?:=(?:"(?:[^\\"]|\\.)*"|'(?:[^\\']|\\.)*'|[a-zA-Z\d_:;/,().#-]+))?]|\.[a-zA-Z_][a-zA-Z\d_-]*|#[a-zA-Z][a-zA-Z:\d_-]*)*>|&(?:(?:[A-Za-z]+|#\d+|#x[A-Fa-f\d]+)(?:;|(?=\s)|$))))/g,
							post: /(?:<[a-zA-Z][a-zA-Z\d_-]*(?:\[[a-zA-Z][a-zA-Z\d_-]*(?:=(?:"(?:[^\\"]|\\.)*"|'(?:[^\\']|\\.)*'|[a-zA-Z\d_:;/,().#-]+))?]|\.[a-zA-Z_][a-zA-Z\d_-]*|#[a-zA-Z][a-zA-Z:\d_-]*)*>|&(?:(?:[A-Za-z]+|#\d+|#x[A-Fa-f\d]+)(?:;|(?=\s)|$)))/g,
							entity: /&(?:(?:[A-Za-z]+|#\d+|#x[A-Fa-f\d]+)(?:;|(?=\s)|$))/,
							tag: /<[a-zA-Z][a-zA-Z\d_-]*(?:\[[a-zA-Z][a-zA-Z\d_-]*(?:=(?:"(?:[^\\"]|\\.)*"|'(?:[^\\']|\\.)*'|[a-zA-Z\d_:;/,().#-]+))?]|\.[a-zA-Z_][a-zA-Z\d_-]*|#[a-zA-Z][a-zA-Z:\d_-]*)*>/,
							tag_name: /<([a-zA-Z][a-zA-Z\d_-]*)/,
							attrs: /<[a-zA-Z][a-zA-Z\d_-]*((?:\[[a-zA-Z][a-zA-Z\d_-]*(?:=(?:"(?:[^\\"]|\\.)*"|'(?:[^\\']|\\.)*'|[a-zA-Z\d_:;/,().#-]+))?]|\.[a-zA-Z_][a-zA-Z\d_-]*|#[a-zA-Z][a-zA-Z:\d_-]*)*)>/,
							getAttr: /\[[a-zA-Z][a-zA-Z\d_-]*(?:=(?:"(?:[^\\"]|\\.)*"|'(?:[^\\']|\\.)*'|[a-zA-Z\d_:;/,().#-]+))?]|\.[a-zA-Z_][a-zA-Z\d_-]*|#[a-zA-Z][a-zA-Z:\d_-]*/g,
							divide: /\[([a-zA-Z][a-zA-Z\d_-]*)(?:=("(?:[^\\"]|\\.)*"|'(?:[^\\']|\\.)*'|[a-zA-Z\d_:;/,().#-]+))?]/
						},
						// Used for testing if the entity actually translates into something
						testElement = document.createElement('span'),
						// Used for styling later
						opacity = -Math.abs(currentFrame - 25) + 25,
						vh = framewindow.innerHeight / 100,
						vw = framewindow.innerWidth / 100,
						scrollTop = document.getElementById('framecontainer').scrollTop;

						// Runs when the element is blurred
						function blur() {
							if (hasBlurred || preventEditTextBlurring) return;
							// Browsers sometimes add an extra <br> to the end of the element for no reason
							// This deletes that redundant <br>
							if (element.alias.childNodes.length > element.alias.alias.childNodes.length && element.alias.lastChild.nodeName == 'BR') element.alias.removeChild(element.alias.lastChild);
							element.alias.blurred = true;

							// Restores the element's original contenteditable attribute
							if (contenteditable === false) element.alias.removeAttribute('contenteditable');
							else element.alias.setAttribute('contenteditable', contenteditable);
							// Allows the user to continue interacting with the overlay
							overlay.style.pointerEvents = '';
							// Restores the element's box-shadow
							element.alias.style.boxShadow = boxshadow;
							// Reverts attribute
							element.alias.htmlStudioTextBeingEdited = false;
							// Keep track that the element has blurred
							hasBlurred = true;
							// Update the entire overlay to sync it with the updated element
							overlayUpdate();
							// Add the whole thing to history
							history.update('Edit text');
						}

						// Runs when an HTML entity replacer is clicked on (when the user wants to replace it)
						function onClickEntityReplacer(e) {
							e.preventDefault();
							e.stopPropagation();
							// Save the user's selection
							var selection = framewindow.document.getSelection(),
								range = selection.getRangeAt(0),
								rangeData = {
									start: range.startOffset,
									startNode: range.startContainer,
									end: range.endOffset,
									endNode: range.endContainer
								};

							function replace(override) {
								if (framewindow.document.queryCommandSupported('insertText')) {
									// Setup custom range to replace the old text
									if (document.getSelection && document.createRange) {
										var selection = framewindow.document.getSelection();
										var range = framewindow.document.createRange();
										range.setStart(this.alias, this.charIndex);
										range.setEnd(this.alias, this.charIndex + this.entityLength);
										selection.removeAllRanges();
										selection.addRange(range);
									}
									// Execcommand to allow for undoing/redoing
									// If it fails for some reason, revert to the manual node insertion method
									if (!framewindow.document.execCommand('insertText', null, this.character)) return replace.call(this,true);
								} else {
									// Replace text with the escaped character
									this.alias.textContent = this.alias.textContent.substring(0, this.charIndex) + this.character + this.alias.textContent.substring(this.charIndex + this.entityLength);
								}
							}
							replace.call(this);

							if (rangeData.startNode != this.alias) return keypress.call(element.alias, {});

							// Restore the user's selection
							selection.removeAllRanges();
							range.setStart(rangeData.startNode, rangeData.start < this.charIndex ? rangeData.start : rangeData.start < this.charIndex + this.entityLength ? this.charIndex + this.character.length : rangeData.start - (this.entityLength - this.character.length));
							range.setEnd(rangeData.endNode, rangeData.endNode != this.alias || rangeData.end < this.charIndex ? rangeData.end : rangeData.end < this.charIndex + this.entityLength ? this.charIndex + this.character.length : rangeData.end - (this.entityLength - this.character.length));
							selection.addRange(range);
							keypress.call(element.alias, {});
						}

						// Runs when an HTML element replacer is clicked on (when the user wants to replace it)
						function onClickTagReplacer(e) {
							e.preventDefault();
							e.stopPropagation();

							// Create element as child of a document fragment
							var origNode = this.alias,
								origText = this.alias.textContent,
								frag = document.createDocumentFragment(),
								replacee = document.createElement(this.tag_name);
							replacee.appendChild(document.createTextNode('Inserted Element'))
							frag.appendChild(document.createTextNode(origText.substring(0, this.charIndex) + '['));
							frag.appendChild(replacee);
							frag.appendChild(document.createTextNode(']' + origText.substring(this.charIndex + this.tagLength)));
							for (var attribute in this.tag_attrs) {
								replacee.setAttribute(attribute, this.tag_attrs[attribute]);
							}

							function replace(override) {
								// If the browser supports adding HTML to the contenteditable element
								// Allows for undoing/redoing by the user
								if (framewindow.document.queryCommandSupported('insertHTML') && !override) {
									// Setup custom range to replace the old text
									if (document.getSelection && document.createRange) {
										var selection = framewindow.document.getSelection();
										var range = framewindow.document.createRange();
										range.setStart(origNode, this.charIndex);
										range.setEnd(origNode, this.charIndex + this.tagLength);
										selection.removeAllRanges();
										selection.addRange(range);
									}
									// Execcommand to allow for undoing/redoing
									// If it fails for some reason, revert to the manual node insertion method
									if (!framewindow.document.execCommand('insertHTML', null, '[' + frag.firstElementChild.outerHTML + ']')) return replace.call(this,true);
									// Select the new element
									if (document.getSelection && document.createRange) {
										var selection = framewindow.document.getSelection();
										var range = framewindow.document.createRange(),
											newElement = selection.anchorNode.previousElementSibling;
										if (newElement.nodeName.toLowerCase() != this.tag_name.toLowerCase() || newElement.innerText != 'Inserted Element') return;
										range.setStart(newElement.firstChild, 0);
										range.setEnd(newElement.firstChild, 16);
										selection.removeAllRanges();
										selection.addRange(range);
									}
								// The browser does not support insertHTML command
								// The HTML will still be added, but the user won't be able to undo/redo
								} else {
									origNode.parentNode.replaceChild(frag, origNode);
									if (document.getSelection && document.createRange) {
										var selection = framewindow.document.getSelection();
										var range = framewindow.document.createRange();
										range.selectNodeContents(replacee);
										selection.removeAllRanges();
										selection.addRange(range);
									}
								}
							}
							replace.call(this);
							keypress.call(element.alias, {});
						}

						// Function used to prevent blurring when the user clicks a replacer
						function prevent(e) {
							e.stopPropagation();
							e.preventDefault();
						}

						// More efficient version of overlayUpdate
						// No event listeners (other than HTML entity replacers)
						// Only updates the element being edited and its children
						// The other elements don't need to be updated
						// Finds any HTML entities, edits them, and gives all nodes an alias to refer to (even text nodes)
						function createReplacers(clone, node) {
							if (clone.nodeType == 3 && clone.nextSibling && clone.nextSibling.nodeType == 3 && node.nodeType == 3 && node.nextSibling && node.nextSibling.nodeType == 3) {
								clone.textContent += clone.nextSibling.textContent;
								node.textContent += node.nextSibling.textContent;
								clone.parentNode.removeChild(clone.nextSibling);
								node.parentNode.removeChild(node.nextSibling);
							}
							// Sets the alias to the proper element
							clone.alias = node;
							node.alias = clone;
							if (clone.nodeType == 1 && node.nodeType == 1) {
								clone.stylePrecedence = {};
								css.forEach(function(stylesheet) {
									stylesheet[1].forEach(function(query) {
										if (node.matches(query[0])) {
											query[1].forEach(function(rule) {
												if (query[2] < clone.stylePrecedence[rule[0]]) return;
												clone.style[rule[0]] = node.style[rule[0]] || rule[1];
												clone.stylePrecedence[rule[0]] = query[2];
											})
										}
									})
								});
								clone.style.color = 'transparent';
								clone.style.background = 'transparent';
								clone.style.fontFamily = getComputedStyle(node).fontFamily;
								if (clone.nodeName == 'A') clone.removeAttribute('href');
								if (clone.nodeName == 'IMG') {
									if (node.getAttribute('src')) clone.setAttribute('src','svg/transparent.svg')
									clone.setAttribute('width', Math.round(clone.alias.getAttribute('width') || clone.alias.getBoundingClientRect().width));
									clone.setAttribute('height', Math.round(clone.alias.getAttribute('height') || clone.alias.getBoundingClientRect().height));
								}
								if (clone != overlay) {
									clone.removeAttribute('id');
									clone.removeAttribute('class');
								}
								clone.removeAttribute('contenteditable');
							}
							if (clone.getAttribute && /v(w|h)/.test(clone.getAttribute('style'))) clone.setAttribute('style', clone.getAttribute('style').replace(/(\d+(?:\.\d+))vw/g, function($_, $1) {
								return vw * $1 + 'px';
							}).replace(/(\d+(?:\.\d+))vh/g, function($_, $1) {
								return vh * $1 + 'px';
							}));
							if (clone.style && node.style) clone.style.fontSize = getComputedStyle(node).fontSize;
							// Iterate over all the element's childNodes
							Array.prototype.slice.call(clone.childNodes).forEach(function(child, index) {
								// If the node is a text node and has an ampersand
								if (child.nodeType == 3 && (child.textContent.includes("&") || regex.tag.test(child.textContent))) {
									// Keeps track of how many character precede replacer
									var charIndex = 0;

									// Splits strings right before an entity or tag
									// e.g. "filler&nbsp;filler" ==> ["filler", "&nbsp;filler"]
									// "filler<code>filler" ==> ["filler", "<code>filler"]
									var before = child.textContent.split(regex.pre), array = [];
									// Get the entity for each string
									before.forEach(function(str, ind) {
										// The first string never contains an entity or tag
										if (!ind && !str) return;
										// Match the entity/tag
										var object = str.match(regex.post);
										// This happens if the text node contains no entities
										if (!object) return array.push({object: false, val: str});
										// Get the actual match instead of an array
										object = object[0];
										// Add to an array that keeps all the string in order
										array.push({object: true, entity: regex.entity.test(object), tag: regex.tag.test(object), val: object}, {object: false, val: str.replace(object, '')});
									});

									// Used to replace the child
									var fragment = document.createDocumentFragment();

									// Iterate over the array
									array.forEach(function(str, ind) {
										// If the array element is an entity
										if (str.entity) {
											// If the html entity does not actually translate into anything,
											// create a text node and continue
											testElement.innerHTML = str.val;
											if ((character = testElement.innerText) == str.val || character.length > 1) {
												array[ind] = document.createTextNode(str.val);
												array[ind].alias = node.childNodes[index];
											} else {
												// Create a <html-entity-replacer> custom tag
												var replacer = document.createElement('html-entity-replacer'), character;
												// Store it in the array
												array[ind] = replacer
												// Set the innerText
												replacer.innerText = str.val;
												// Sets attributes that are used when the replacer is click on
												replacer.alias = node.childNodes[index];
												replacer.charIndex = charIndex;
												replacer.character = testElement.innerText;
												replacer.entityLength = str.val.length;

												// Configures the replacer
												// Adds a title so the user can see which character it will be replaced with
												replacer.title = 'Click to replace with "' + character + '"';
												// Adds styles now so that it doesn't have to wait until the next interval loop
												// Without this, the text appears transparent for an instant before being updated
												replacer.style.color = 'rgba(0,172,193,' + (.03 * opacity + .25) + ')';
												replacer.style.textShadow = '0 0 1px rgba(0,172,193,' + (.02 * opacity + .5) + ')';

												// Adds click listener for when the user wants to replace the replacer
												replacer.addEventListener('touchstart', onClickEntityReplacer);
												replacer.addEventListener('click', onClickEntityReplacer);
												// Adds more event listeners to preventDefault and stopPropagation
												// This prevents the editable element from blurring
												replacer.addEventListener('mousedown', prevent);
												replacer.addEventListener('mouseup', prevent);
												replacer.addEventListener('dblclick', prevent);
												replacer.addEventListener('touchend', prevent);
												replacer.addEventListener('touchcancel', prevent);
											}
										// If the array element is a tag
										} else if (str.tag) {
											// Create a <html-element-replacer> custom tag
											var replacer = document.createElement('html-element-replacer');
											// Store it in the array
											array[ind] = replacer;
											// Set the innerText
											replacer.innerText = str.val;
											// Sets attributes that are used when the replacer is clicked on
											replacer.alias = node.childNodes[index];
											replacer.charIndex = charIndex;
											replacer.tagLength = str.val.length;
											replacer.tag_name = str.val.match(regex.tag_name)[1];
											replacer.tag_attrs = (function() {
												var obj = {};
												var attrs = str.val.match(regex.attrs)[1];
												if (!attrs) return obj;
												attrs.match(regex.getAttr).forEach(function(attribute) {
													if (attribute[0] == '.') obj.class = ((obj.class || '') + ' ' + attribute.substring(1)).trim();
													else if (attribute[0] == '#') obj.id = attribute.substring(1);
													else {
														var values = attribute.match(regex.divide);
														obj[values[1]] = values[2] && values[2][0] != '"' && values[2][0] != "'" ? values[2] : values[2] ? values[2].substring(1, values[2].length - 1) : '';
													}
												});
												return obj;
											})();

											// Configures the replacer
											// Adds a title so the user can see which tag it will be replaced with
											replacer.title = 'Click to replace with a ' + replacer.tag_name + ' element';
											// Adds styles now so that it doesn't have to wait until the next interval loop
											// Without this, the text appears transparent for an instant before being updated
											replacer.style.color = 'rgba(0,172,193,' + (.03 * opacity + .25) + ')';
											replacer.style.textShadow = '0 0 1px rgba(0,172,193,' + (.02 * opacity + .5) + ')';

											// Adds click listener for when the user wants to replace the replacer
											replacer.addEventListener('touchstart', onClickTagReplacer);
											replacer.addEventListener('click', onClickTagReplacer);
											// Adds more event listeners to preventDefault and stopPropagation
											// This prevents the editable element from blurring
											replacer.addEventListener('mousedown', prevent);
											replacer.addEventListener('mouseup', prevent);
											replacer.addEventListener('dblclick', prevent);
											replacer.addEventListener('touchend', prevent);
											replacer.addEventListener('touchcancel', prevent);

										// The array element is just plain text
										} else {
											// Create a regular text node
											array[ind] = document.createTextNode(str.val);
											// Set its alias
											array[ind].alias = node.childNodes[index];
										}
										charIndex += str.val.length;
										if (ind && array[ind].nodeType == 3 && array[ind - 1].nodeType == 3) {
											fragment.lastChild.textContent += array[ind].textContent;
										} else {
											fragment.appendChild(array[ind]);
										}
									});

									child.parentNode.replaceChild(fragment, child);
								} else {
									createReplacers(child, node.childNodes[index])
								};
							});
						}

						// Runs on keyup and right after the browser has updated the element's innerHTML for keypress
						function keypress(e) {
							// Blur on Enter + any function key
							if (e.keyCode == 13 && (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey)) return blur();
							if (hasBlurred) return;

							opacity = -Math.abs(currentFrame - 25) + 25;

							// fragment and clone are used as opposed to the actual DOM since DocumentFragments run faster
							var fragment = document.createDocumentFragment();
							if (element == overlay) {
								// Can't get a speed boost from using a document fragment
								// since we are recycling the same element each time
								element.innerHTML = element.alias.innerHTML;
								createReplacers(element, element.alias);
							} else {
								var clone = element.cloneNode(true);
								fragment.appendChild(clone);
								// Runs a more efficient overlayUpdate() for the element being edited only
								// The rest of the overlay is unaffected
								clone.innerHTML = element.alias.innerHTML;
								createReplacers(clone, element.alias);
								

								clone.alias = element.alias;
								clone.DOM = element.DOM;
								element.parentNode.replaceChild(clone, element);
								element = clone;
							}

							// User pressed tab
							// Try to auto-click a replacer if the caret is inside one
							if (e.type == 'keydown' && e.keyCode == 9 && !e.shiftKey) {
								var selection = framewindow.document.getSelection(),
									children = selection.anchorNode.parentNode.alias.childNodes,
									index = 0,
									offset = selection.anchorOffset,
									origOffset = offset,
									focusedNode,
									temp = selection.anchorNode,
									replacerOffset,
									range = selection.getRangeAt(0);

								// If the user has characters selected, don't continue
								if (!selection.isCollapsed) return document.getElementById('framecontainer').scrollTop = scrollTop;

								// Used to find the caret's position relative to the text node's parent
								while (temp = temp.previousSibling) {
									offset += (temp.textContent || temp.innerText).length
								}

								// Find the node that caret is in (i.e. check if it is in a replacer)
								forEach(children, function() {
									if ((index += (this.innerText || this.textContent).length) < offset) return;
									focusedNode = this;
									replacerOffset = index - (this.innerText || this.textContent).length - offset + origOffset;
									return 'break';
								});

								// If the node is a <html-(entity|element)-replacer>, simulate a click
								focusedNode.nodeName.toLowerCase() == 'html-entity-replacer' && onClickEntityReplacer.call(focusedNode, pseudoEvent) || focusedNode.nodeName.toLowerCase() == 'html-element-replacer' && onClickTagReplacer.call(focusedNode, pseudoEvent);
							} else if (e.type == 'keydown' && e.keyCode == 73 && locale.cmdKeyPressed(e)) {
								if (framewindow.document.queryCommandSupported('italic')) framewindow.document.execCommand('italic');
							} else if (e.type == 'keydown' && e.keyCode == 66 && locale.cmdKeyPressed(e)) {
								if (framewindow.document.queryCommandSupported('bold')) framewindow.document.execCommand('bold');
							}
							document.getElementById('framecontainer').scrollTop = scrollTop;
						}

						// Add some events for blurring the element
						element.alias.addEventListener('blur', blur);
						element.alias.addEventListener('dblclick', blur);
						// Adds the events for keypress and keyup
						element.alias.addEventListener('keydown', function(e) {
							scrollTop = document.getElementById('framecontainer').scrollTop;
							if (e.keyCode == 9 && !e.shiftKey || e.keyCode == 73 && locale.cmdKeyPressed(e) || e.keyCode == 66 && locale.cmdKeyPressed(e)) { 
								e.preventDefault();
								e.stopPropagation();
							}
							setTimeout(function() {
								keypress.call(this, e);
							},0);
						});
						element.alias.addEventListener('keyup', keypress);

						// Fires a key event to look for any HTML entities as soon as the user focuses the element
						// instead of waiting for the user to press a key
						keypress.call(element.alias, {});
					},
					title: 'Allows you to edit the element\'s textual content',
					disabledtitle: 'This element cannot contain textual content',
					id: 'editText'
				},{
					name: 'Edit as HTML&#133;',
					image: 'svg/edit_as_html.svg',
					func: function(_,close) {
						close();
						var element = document.querySelector('[data-selected-element=selected]');
						if (!element) return;
						backdialog.style.display = 'block';
						document.getElementById('dialog_edit_html').style.display = 'block';
						document.getElementById('idf').value = element.alias[(element.alias == framewindow.document.body ? 'inn' : 'out')+ 'erHTML'];
						document.getElementById('idf').linkedElement = element.alias;
					},
					title: 'Allows you to edit the node\'s HTML',
					separate: true,
					id: 'editHTML'
				},{
					name: 'Unwrap Element',
					image: 'svg/transparent.svg',
					func: function(_,close) {
						close();
						var element = document.querySelector('[data-selected-element="selected"]');
						if (!element || element == overlay) return;
						element = element.alias;
						var frag = document.createDocumentFragment();
						for (var i = element.childNodes.length - 1; i >= 0; i--) {
							frag.insertBefore(element.childNodes[i], frag.firstChild);
						}
						var children = Array.prototype.slice.call(frag.childNodes);
						element.parentNode.replaceChild(frag, element);

						history.update('Unwrap element');
						overlayUpdate();
						deselect();
						var y = Math.round(em(4.45));
						children.forEach(function(child) {
							if (child.nodeType == 1) {
								clickhandler.call(child.alias, {
									stopPropagation: function(){},
									clientX: 0,
									clientY: y,
									isTrusted: true,
									shiftKey: true
								});
							}
						});
					},
					title: 'Replaces the element with all its child nodes',
					disabledtitle: 'This element cannot be unwrapped',
					separate: true,
					id: 'unwrap'
				},{
					name: 'Delete Node',
					func: function(_,close) {
						document.querySelector('[data-selected-element=selected]').alias.parentNode.removeChild(document.querySelector('[data-selected-element=selected]').alias);
						overlayUpdate();
						history.update('Delete node');
						close();
					},
					title: 'Removes node from the document',
					disabledtitle: 'This node cannot be removed from the document',
					image: 'svg/delete.svg',
					disabledimage: 'svg/delete_disabled.svg',
					separate: true,
					id: 'delete'
				},{
					name: 'Duplicate Element',
					func: function(_,close) {
						close();
						var element = document.querySelector('[data-selected-element=selected]');
						if (!element) return;
						var clone = element.alias.cloneNode(true),
							re = /^Duplicate_\d+_of_/;
						function changeId(node) {
							if (node.id) {
								node.id = node.id.replace(re,'');
								for (var index = 1; framewindow.document.getElementById('Duplicate_' + index + '_of_' + node.id); index++);
								node.id = 'Duplicate_' + index + '_of_' + node.id;
							}
							forEach(node.children, changeId);
						}
						changeId(clone);
						element.alias.insertAdjacentElement('afterEnd', clone);
						history.update('Duplicate element');
						overlayUpdate();
						deselect();
						clickhandler.call(clone.alias, pseudoEvent);
					},
					title: '(' + locale.cmdKey + ' + Shift  + D) Create a duplicate of the selected element as a sibling',
					separate: true,
					id: 'duplicate'
				},{
					name: 'Copy Element',
					func: function(e,close) {
						close();
						prepareCopy(e.shiftKey);
						if (document.queryCommandSupported('copy')) document.execCommand('copy');
						else {
							backdialog.style.display = 'block';
							document.getElementById('dialog_pseudo_paste').style.display = 'block';
						}
					},
					title: '(' + locale.cmdKey + ' + C) or (' + locale.cmdKey + ' + Shift + C) Copies the selected elements',
					image: 'svg/copy.svg',
					id: 'copy'
				},{
					name: 'Cut Element',
					func: function(e,close) {
						close();
						prepareCopy(e.shiftKey);
						if (document.queryCommandSupported('copy') && document.execCommand('copy')) {
							var cmi = contextmenus[1].getItem('delete');
							cmi.cut = true;
							cmi.dispatchEvent(new MouseEvent('click'));
						} else {
							backdialog.style.display = 'block';
							document.getElementById('dialog_pseudo_paste').style.display = 'block';
						}
						if (document.activeElement == clipboard) userClipboard = clipboard.value;
					},
					title: '(' + locale.cmdKey + ' + X) Cuts the selected element\n(' + locale.cmdKey + ' + Shift + X) Cuts the selected element and all its descendants',
					image: 'svg/cut.svg',
					id: 'cut'
				},{
					name: 'Paste in Element',
					func: function(e,close) {
						close();
						if (document.queryCommandSupported('paste') && document.execCommand('paste')) {
						} else {
							dialogcover.style.display = 'block';
							document.getElementById('dialog_pseudo_paste').style.display = 'block';
						}
					},
					title: '(' + locale.cmdKey + ' + V) Pastes any copied HTML into the selected node',
					image: 'svg/paste.svg',
					id: 'paste'
				}]
			}),
			new HTMLStudio.ContextMenu({
				items: [{
					name: 'Delete Nodes',
					func: function(_,close) {
						var elements = document.querySelectorAll('[data-selected-element=selected]');
						for (var i = elements.length - 1; i >= 0; i--) {
							if (elements[i].alias.parentNode && elements[i].alias != framewindow.document.body) elements[i].alias.parentNode.removeChild(elements[i].alias);
						}
						overlayUpdate();
						history.update((this.cut ? 'Cut element' : 'Delete node') + (elements.length > 1 ? 's' : ''));
						this.cut = false;
						close();
						updateTooltip();
					},
					image: 'svg/delete.svg',
					separate: true,
					title: 'Removes nodes from the document',
					id: 'delete'
				},{
					name: 'Edit Class Names&#133;',
					func: function(_,close) {
						close();
						contextmenus[0].getItem('editClass').dispatchEvent(new MouseEvent('click'));
					},
					title: '(' + locale.cmdKey + ' + . ) Allows you to quickly edit the elements\' classes',
					separate: true,
					image: 'svg/edit_class.svg',
					if: 'editClass'
				},{
					name: 'Select Parent(s)',
					image: 'svg/select_parent.svg',
					disabledimage: 'svg/select_parent_disabled.svg',
					func: function(e,close) {
						if (document.querySelectorAll('[data-selected-element=selected]').length == 1) return contextmenus[0].getItem('selectParent').dispatchEvent(new MouseEvent('click', {shiftKey: e.shiftKey}));
						else if (!document.querySelector('[data-selected-element=selected]')) return;
						close();
						var nodes = Array.prototype.filter.call(document.querySelectorAll('[data-selected-element=selected]'), function(node) {
							return node != overlay;
						}).map(function(node) {
							return node.parentNode;
						});
						if (!e.shiftKey) deselect();
						nodes.forEach(function(node) {
							clickhandler.call(node, pseudoEvent.__extend__({set: true}));
						});

						updateTooltip();
						updateTreeSelections();
						selection = Array.prototype.slice.call(document.querySelectorAll('[data-selected-element=selected]'));
					},
					title: '(' + locale.cmdKey + ' + Up) or (' + locale.cmdKey + ' + Shift + Up) Selects the immediate parents of the nodes',
					disabledtitle: '(' + locale.cmdKey + ' + Up) or (' + locale.cmdKey + ' + Shift + Up) None of the selected nodes have selectable parents',
					id: 'selectParent'
				},{
					name: 'Select Children',
					func: function(e,close) {
						close();
						var elements = document.querySelectorAll('[data-selected-element=selected]');
						if (!elements.length) return;
						if (!e.shiftKey) deselect();
						forEach(elements, function() {
							forEach(this.children, function() {
								clickhandler.call(this, pseudoEvent.__extend__({set: true}));
							});
						})
						updateTooltip();
						updateTreeSelections();
						selection = Array.prototype.slice.call(document.querySelectorAll('[data-selected-element=selected]'));
					},
					image: 'svg/select_children.svg',
					disabledimage: 'svg/select_children_disabled.svg',
					title: '(' + locale.cmdKey + ' + Down) or (' + locale.cmdKey + ' + Shift + Down) Selects all immediate children of the nodes',
					disabledtitle: '(' + locale.cmdKey + ' + Down) or (' + locale.cmdKey + ' + Shift + Down) None of the selected nodes have any children',
					separate: true,
					id: 'selectChildren'
				},{
					name: 'Copy Elements',
					func: function(e,close) {
						close();
						prepareCopy(e.shiftKey);
						if (document.queryCommandSupported('copy') && document.execCommand('copy')) {
						} else {
							backdialog.style.display = 'block';
							document.getElementById('dialog_pseudo_paste').style.display = 'block';
						}
					},
					title: '(' + locale.cmdKey + ' + C) or (' + locale.cmdKey + ' + Shift + C) Copies the selected elements',
					image: 'svg/copy.svg',
					id: 'copy'
				},{
					name: 'Cut Elements',
					func: function(e,close) {
						close();
						prepareCopy(e.shiftKey);
						if (document.queryCommandSupported('copy') && document.execCommand('copy')) {
							var cmi = contextmenus[1].getItem('delete');
							cmi.cut = true;
							cmi.dispatchEvent(new MouseEvent('click'));
						} else {
							backdialog.style.display = 'block';
							document.getElementById('dialog_pseudo_paste').style.display = 'block';
						}
						if (document.activeElement == clipboard) userClipboard = clipboard.value;
					},
					title: '(' + locale.cmdKey + ' + X) Cuts the selected elements\n(' + locale.cmdKey + ' + Shift + X) Cuts the selected elements and all their descendants',
					image: 'svg/cut.svg',
					id: 'cut'
				},{
					name: 'Paste in Elements',
					func: function(e,close) {
						close();
						if (document.queryCommandSupported('paste') && document.execCommand('paste')) {
						} else {
							dialogcover.style.display = 'block';
							document.getElementById('dialog_pseudo_paste').style.display = 'block';
						}
					},
					title: '(' + locale.cmdKey + ' + V) Pastes any copied HTML into the selected nodes',
					image: 'svg/paste.svg',
					id: 'paste'
				}]
			}),
			new HTMLStudio.ContextMenu({
				items: [{
					name: 'New&#133;',
					func: function newFile(_,close) {
						document.getElementById('dialogcover').style.display = 'block';
						document.getElementById('dialog_new_file').style.display = 'block';
						document.querySelector('#idm tbody').innerHTML = '';
						var useSrc = Symbol();
						var presets = [
							[useSrc, './presets/1.html', 'Blank'],
							[useSrc, './presets/2.html', 'Picture Strips'],
							[useSrc, './presets/3.html', 'Image w/ Content']
						];
						presets.push.apply(presets, JSON.parse(localStorage.getItem('HTML-Studio_presets') || '[]'));
						presets.forEach(function(preset, index) {
							var tr = index % 2 ? document.querySelector('#idm tr:last-child') : document.createElement('tr'), td = document.createElement('td'), h4 = document.createElement('h4'), frame = document.createElement('iframe');
							frame.className = 'cl5';
							h4.className = 'cl6';
							document.querySelector('#idm tbody').appendChild(tr);
							tr.appendChild(td);
							td.appendChild(frame);
							td.appendChild(h4);
							h4.innerText = preset[preset[0] == useSrc ? 2 : 1];
							if (preset[0] == useSrc) {
								frame.src = preset[1];
								td.className = 'cl8';
							} else {
								var div = document.createElement('div');
								div.className = 'cl9';
								div.setAttribute('tabindex', '0');
								div.addEventListener('click', function() {
									var array = JSON.parse(localStorage.getItem('HTML-Studio_presets'));
									array.splice(index - 3,1);
									localStorage.setItem('HTML-Studio_presets', JSON.stringify(array));
									var scroll = document.getElementById('idm').parentNode.scrollTop;
									newFile(_,close);
									document.getElementById('idm').parentNode.scrollTop = scroll;
								});
								td.appendChild(div);
								frame.onload = function() {
									frame.contentWindow.document.documentElement.innerHTML = preset[0];
								}
							};
							frame.addEventListener('load', function() {
								var iwindow = this.contentWindow;
								iwindow.addEventListener('click',function(){
									td.dispatchEvent(new MouseEvent('click'));
								});
								iwindow.document.documentElement.style.cursor = 'pointer';
								td.bodyDefaultFontSize = iwindow.document.body.style.fontSize;
								iwindow.document.body.style.fontSize = '4vh';
								frame.style.background = '#FFF';
							});
						});
						if (document.querySelectorAll('#idm tr:last-child td').length < 2) {
							var td = document.createElement('td');
							td.innerHTML = '<iframe src="./presets/add.html" class="cl5" id="idn"></iframe><h4 class="cl6">Create New Preset&#133;</h4>';
							td.id = 'ido';
							document.querySelector('#idm tr:last-child').appendChild(td);
						} else {
							var tr = document.createElement('tr');
							tr.innerHTML = '<td id="ido"><iframe src="./presets/add.html" class="cl5" id="idn"></iframe><h4 class="cl6">Create New Preset&#133;</h4></td>'
							document.querySelector('#idm tbody').appendChild(tr);
						}
						close();
						closeHeaders();
						// Selection of File > New... preset
						Array.prototype.forEach.call(document.querySelectorAll('#idm td:not(#ido)'), function(element) {
							element.addEventListener('click', function(e) {
								document.getElementById('idl').className = 'option';
								Array.prototype.forEach.call(document.querySelectorAll('#idm td'), function(element) {
									element.style.background = '';
								})
								element.style.background = 'rgba(0,172,193,.7)';
							});
						});
						// Click event for File > New... > Create New Preset...
						document.getElementById('ido').addEventListener('click', function() {
							closeDialogs();
							backdialog.style.display = 'block';
							document.getElementById('dialog_new_preset').style.display = 'block';
							var frame = document.getElementById('idy');
							frame.contentWindow.document.documentElement.innerHTML = framewindow.document.documentElement.innerHTML;
							var fontSize = getComputedStyle(frame.contentWindow.document.body).fontSize;
							frame.bodyDefaultFontSize = frame.contentWindow.document.body.style.fontSize;
							frame.contentWindow.document.body.style.fontSize = parseFloat(fontSize) * .31 + fontSize.replace(parseFloat(fontSize).toString(),'');
						});
						var frame = document.querySelector('#ido iframe');
						frame.addEventListener('load', function() {
							var iwindow = this.contentWindow;
							iwindow.addEventListener('click',function(){
								frame.parentNode.dispatchEvent(new MouseEvent('click'));
							});
							iwindow.document.documentElement.style.cursor = 'pointer';
							iwindow.document.body.style.fontSize = '4vh';
							frame.style.background = '#FFF';
						});
					},
					title: '(' + locale.cmdKey + ' + N) Create a new document to replace the current one',
					image: 'svg/new.svg',
					id: 'new'
				},{
					name: 'Open&#133;',
					func: function(_,close) {
						document.getElementById('dialogcover').style.display = 'block';
						document.getElementById('dialog_open_file_html').style.display = 'block';
						document.getElementById('id2').innerHTML = '<div id="id1" ondragover="return this.className=\'active\',false" ondragend="return this.className=\'\',false" ondragleave="return this.className=\'\',false"><div id="id4"><span id="id3">Drop a file here</span><span id="id5">or click to select one</span></div></div>';
						document.getElementById('idb').scrollTop = 0;
						document.getElementById('id9').className = 'option disabled';
						document.getElementById('id1').addEventListener('drop', function(e) {
							e.preventDefault();
							e.stopPropagation();
							this.className='';
							if (!e.dataTransfer.files.length) return;
							document.getElementById('id4').innerHTML = '<div id="id6"><div id="id7">' + (e.dataTransfer.files[0].name) + '<span style="float:right">' + (e.dataTransfer.files[0].size < 1000 ? e.dataTransfer.files[0].size + ' bytes' : Math.round(e.dataTransfer.files[0].size / 100) / 10 + 'KB') + '</span></div><span id="id8"></span></div>';
							if (e.dataTransfer.files[0].type != 'text/html') return document.getElementById('id8').innerHTML = 'This file format is not allowed. Please only select an HTML file ending in an ".html" extension.',document.getElementById('id7').style.background = '#FFB7B7',document.getElementById('id9').className='option disabled';
							document.getElementById('id7').style.background = '#A6FFA6';
							document.getElementById('id8').innerHTML = 'Make sure your work is saved before pressing "Open File"';
							document.getElementById('id9').className = 'option';
							document.getElementById('id2').file = e.dataTransfer.files[0];
						});
						close();
						closeHeaders();
					},
					title: '(' + locale.cmdKey + ' + O) Open an HTML file to replace the current document',
					image: 'svg/open.svg',
					id: 'open'
				},{
					name: 'Download File&#133;',
					func: function(_,close) {
						close();
						closeHeaders();
						backdialog.style.display = 'block';
						document.getElementById('dialog_download').style.display = 'block';
						var textbox = document.getElementById('Ida');
						textbox.placeholder = document.getElementById('title').value.trim() || 'index.html';
						textbox.value = '';
					},
					title: 'Download the document as an HTML file',
					separate: true,
					id: 'download'
				},{
					name: 'Edit Metadata',
					func: function(_,close) {
						close();
						closeHeaders();
					},
					title: 'Edit the meta data of the HTML document',
					disabled: true,
					disabledtitle: 'Work in Progress',
					id: 'meta'
				}],
				pseudoParent: document.getElementById('section_file')
			}),
			new HTMLStudio.ContextMenu({
				items: [{
					name: 'Undo',
					func: undo,
					title: '(' + locale.cmdKey + ' + Z) Reverts most recent change',
					disabledtitle: '(' + locale.cmdKey + '+Z) There are no changes to be undone',
					image: 'svg/undo.svg',
					id: 'undo'
				},{
					name: 'Redo',
					func: redo,
					title: '(' + locale.cmdKey + ' + Y) Restores most recent change',
					disabledtitle: '(' + locale.cmdKey + '+Y) There are no changes to be redone',
					image: 'svg/redo.svg',
					id: 'redo'
				},{
					name: 'Preferences',
					title: 'Edit preferences',
					subcontext: {
						items: [
							{
								name: 'Node Selection Color&#183;',
								title: 'Edit the color of a selected node',
								disabled: true,
								disabledtitle: 'Work in Progress',
								id: 'nodeSelectionColor'
							},{
								name: 'Grid',
								title: 'Edit the grid properties',
								disabled: true,
								disabledtitle: 'Work in Progress',
								id: 'grid'
							},{
								name: 'CSS Units',
								title: 'Change the CSS unit for measurements',
								id: 'cssUnits',
								subcontext: {
									items: [
										{
											name: 'Pixels (px)',
											toggle: true,
											toggled: true,
											disabled: true,
											image: 'svg/checkmark.svg',
											imageoff: 'svg/transparent.svg',
											disabledtitle: 'Work in Progress',
											id: 'px'
										},{
											name: 'Points (pt)',
											toggle: true,
											disabled: true,
											image: 'svg/checkmark.svg',
											imageoff: 'svg/transparent.svg',
											disabledtitle: 'Work in Progress',
											id: 'pt'
										},{
											name: 'Inches (in)',
											toggle: true,
											disabled: true,
											image: 'svg/checkmark.svg',
											imageoff: 'svg/transparent.svg',
											disabledtitle: 'Work in Progress',
											id: 'in'
										},{
											name: 'Centimeters (cm)',
											toggle: true,
											disabled: true,
											image: 'svg/checkmark.svg',
											imageoff: 'svg/transparent.svg',
											disabledtitle: 'Work in Progress',
											id: 'cm'
										},{
											name: 'Viewport Units (vh / vw)',
											toggle: 'true',
											disabled: true,
											image: 'svg/checkmark.svg',
											imageoff: 'svg/transparent.svg',
											disabledtitle: 'Work in Progress',
											id: 'vhvw'
										}
									]
								}
							}
						]
					},
					id: 'prefs'
				}],
				pseudoParent: document.getElementById('section_edit')
			}),
			new HTMLStudio.ContextMenu({
				items: [{
					name: 'Toolbar',
					disabled: true,
					disabledtitle: 'Work in Progress',
					toggle: true,
					toggled: true,
					image: 'svg/checkmark.svg',
					imageoff: 'svg/transparent.svg',
					id: 'toolbar'
				},{
					name: 'Fullscreen',
					func: function(_,close) {
						this.toggled = !this.toggled;
						close();
						closeHeaders();
						if (this.toggled) {
							var body = document.body;
							if (body.requestFullscreen) body.requestFullscreen();
							else if (body.mozRequestFullScreen) body.mozRequestFullScreen();
							else if (body.webkitRequestFullscreen) body.webkitRequestFullscreen();
							else if (body.msRequestFullscreen) body.msRequestFullscreen();
						} else {
							if (document.exitFullscreen) document.exitFullscreen();
							else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
							else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
							else if (document.msExitFullscreen) document.msExitFullscreen();
						}
					},
					disabled: !(HTMLElement.prototype.requestFullscreen || HTMLElement.prototype.mozRequestFullScreen || HTMLElement.prototype.webkitRequestFullscreen || HTMLElement.prototype.msRequestFullscreen),
					title: '(F11) Goes into fullscreen mode',
					disabledtitle: 'Your browser does not support fullscreen mode',
					toggle: true,
					image: 'svg/checkmark.svg',
					imageoff: 'svg/transparent.svg',
					id: 'fullscreen'
				},{
					name: 'HTML Tree',
					func: function(_,close) {
						this.toggled = !this.toggled;
						document.getElementById('html_editor_display').style.display = this.toggled ? 'block' : '';
						var idq = document.getElementById('idq');
						updateTree();
						updateTreeSelections();
						close();
						closeHeaders();
						idq.setAttribute('viewBox', '0 0 ' + idq.getAttribute('width') + ' ' + idq.getAttribute('height'));
					},
					title: 'Displays the HTML tree of the document',
					toggle: true,
					image: 'svg/checkmark.svg',
					imageoff: 'svg/transparent.svg',
					id: 'htmlTree'
				},{
					name: 'Grid',
					func: function(_,close) {
						this.toggled = !this.toggled;
						document.getElementById('overlaygrid').style.display = this.toggled ? 'block' : '';
						close();
						closeHeaders();
					},
					title: 'Toggles the overlay grid for the document',
					toggle: true,
					image: 'svg/checkmark.svg',
					imageoff: 'svg/transparent.svg',
					id: 'grid'
				},{
					name: 'Tooltip',
					func: function(_,close) {
						this.toggled = !this.toggled;
						close();
						closeHeaders();
						document.getElementById('tooltip').style.display = this.toggled ? '' : 'none';
						localStorage.setItem('HTML-Studio_tooltipShown', this.toggled ? 1 : 0);
					},
					title: 'Toggles the tooltip at the bottom of the screen',
					toggle: true,
					toggled: true,
					image: 'svg/checkmark.svg',
					imageoff: 'svg/transparent.svg',
					id: 'tooltip'
				},{
					name: 'Bounding Boxes',
					func: function(_,close) {
						this.toggled = !this.toggled;
						close();
						closeHeaders();
						document.getElementById('rectDisplays').style.display = this.toggled ? 'block' : 'none';

						if (this.toggled) {
							var scrollX = framewindow.document.documentElement.scrollLeft || framewindow.document.body.scrollLeft,
								scrollY = (framewindow.document.documentElement.scrollTop || framewindow.document.body.scrollTop) - document.getElementById('toolbarcontainer').getBoundingClientRect().height;
							forEach(document.getElementsByClassName('rectX'), function() {
								var rect = this.boundNode.getBoundingClientRect();
								this.boundNode.boundRects[2].innerHTML = Math.round(rect.width).toString().match(/^..?(?=(...)*$)|.../g).join(',') + ' <span class="rectTU">px</span>';
								this.boundNode.boundRects[3].innerHTML = Math.round(rect.height).toString().match(/^..?(?=(...)*$)|.../g).join(',') + ' <span class="rectTU">px</span>';
								var rect2 = this.boundNode.boundRects[2].getBoundingClientRect(),
									rect3 = this.boundNode.boundRects[3].getBoundingClientRect();
								forEach(this.boundNode.boundRects, function(_,i) {
									switch (i) {
										case 0:
											this.style.top = rect.top + scrollY + 'px';
											this.style.height = rect.height + 'px';
											break;
										case 1:
											this.style.left = rect.left + scrollX + 'px';
											this.style.width = rect.width + 'px';
											break;
										case 2:
											this.style.top = rect.top + scrollY + rect.height + 'px';
											this.style.left = Math.max(rect.left + scrollX + rect2.width / 2, rect.left + scrollX + rect.width / 2) + 'px';
											break;
										case 3:
											this.style.top = Math.min(rect.top + scrollY + rect.height - rect3.width / 2 - rect3.height / 2, rect.top + scrollY + rect.height / 2 - rect3.width / 2) + 'px';
											this.style.left = rect.left + scrollX - rect3.height / 2 - rect3.width / 2 + 'px';
											break;
									}
								});
							});
						}
					},
					title: 'Toggled the bounding box line displays',
					toggle: true,
					image: 'svg/checkmark.svg',
					imageoff: 'svg/transparent.svg',
					id: 'boundingBox'
				}],
				pseudoParent: document.getElementById('section_view')
			}),
			new HTMLStudio.ContextMenu({
				// Placeholder for Stylesheets header
				items: [{
					name: 'Oops! Something went wrong!',
					disabled: true,
					disabledtitle: 'Looks like something went wrong in the code and this context menu couldn\'t be displayed.',
					id: 'cssPlaceholder'
				}],
				pseudoParent: document.getElementById('section_stylesheets')
			}),
			new HTMLStudio.ContextMenu({
				items: [{
					name: 'Select All',
					func: function(_,close) {
						close();
						closeHeaders();
						var elements = document.querySelectorAll('#frameoverlay *,#frameoverlay');
						forEach(document.querySelectorAll('#frameoverlay, #frameoverlay *'), function() {
							clickhandler.call(this, pseudoEvent.__extend__({set: true}));
						});
						updateTooltip();
						updateTreeSelections();
						selection = Array.prototype.slice.call(document.querySelectorAll('[data-selected-element=selected]'));
					},
					title: '(' + locale.cmdKey + ' + A) Selects all elements in the document',
					image: 'svg/select_all.svg',
					id: 'selectAll'
				},{
					name: 'Deselect All',
					func: function(_,close) {
						deselect();
						close();
						closeHeaders();
						updateTooltip();
						updateTreeSelections();
					},
					title: '(' + locale.cmdKey + ' + D) Deselects all elements in the document',
					image: 'svg/deselect_all.svg',
					separate: true,
					id: 'deselectAll'
				},{
					name: 'Select &lt;body&gt;',
					func: function(e, close) {
						close();
						closeHeaders();
						clickhandler.call(overlay, {
							stopPropagation: function(){},
							clientX: e.clientX,
							clientY: e.clientY,
							isTrusted: true,
							shiftKey: e.shiftKey
						});
					},
					title: '(' + locale.cmdKey + ' + B) or (' + locale.cmdKey + ' + Shift + B) Selects the root <body> element',
					image: 'svg/select_body.svg',
					separate: true,
					id: 'selectBody'
				},{
					name: 'Invert Selection',
					func: function(_,close) {
						close();
						closeHeaders();
						for (var elements = document.querySelectorAll('#frameoverlay, #frameoverlay *'), i = elements.length - 1; i >= 0; i--) {
							clickhandler.call(elements[i], {
								stopPropagation: function(){},
								clientX: 0,
								clientY: 0,
								isTrusted: true,
								shiftKey: true
							});
						};
						updateTreeSelections();
						updateTooltip();
					},
					title: '(' + locale.cmdKey + ' + I) Selects all not-selected elements',
					separate: true,
					image: 'svg/invert.svg',
					id: 'invert'
				},{
					name: 'Select Parent(s)',
					func: function(_,close) {
						close();
						closeHeaders();
						contextmenus[1].getItem('selectParent').dispatchEvent(new MouseEvent('click'));
					},
					title: '(' + locale.cmdKey + ' + Up) or (' + locale.cmdKey + ' + Shift + Up) Selects the immediate parents of the nodes',
					image: 'svg/select_parent.svg',
					disabledimage: 'svg/select_parent_disabled.svg',
					disabledtitle: '(' + locale.cmdKey + ' + Up) or (' + locale.cmdKey + ' + Shift + Up) None of the selected nodes have selectable parents',
					id: 'selectParent'
				},{
					name: 'Select Previous Sibling(s)',
					func: function(e,close) {
						close();
						closeHeaders();
						var elements = document.querySelectorAll('[data-selected-element="selected"]');
						if (!elements.length) return;
						var y = Math.round(em(4.45));
						if (e.shiftKey) {
							function unique(array) {
								var uniques = [], counter = 0;
								for (var i = 0; i < array.length; i++ ) {
									var current = array[i];
									for (var n = 0;n < uniques.length;n++) {
										if (current != uniques[n]) {
											counter++;
										}
									}
									if (counter == uniques.length) {
										uniques.push(current);
									}
									counter = 0;
								}

								array.length = 0;
								for (i = 0;i < uniques.length;i++) {
									array.push(uniques[i]);
								}

								return array;
							}

							elements = Array.prototype.slice.call(elements);
							deselect();
							
							unique(elements.concat(elements.map(function(elem) {
								return elem == overlay ? overlay : elem.previousElementSibling || elem.parentNode.lastElementChild;
							}))).forEach(function(element) {
								clickhandler.call(element, pseudoEvent.__extend__({set: true}));
							});
						} else {
							deselect();
							forEach(elements, function(element) {
								clickhandler.call(element == overlay ? overlay : element.previousElementSibling || element.parentNode.lastElementChild, pseudoEvent.__extend__({set: true}));
							});
						}
						
						updateTooltip();
					},
					title: '(' + locale.cmdKey + ' + Left) or (' + locale.cmdKey + ' + Shift + Left) Selects the elements\' previous sibling.',
					disabledtitle: '(' + locale.cmdKey + ' + Left) or (' + locale.cmdKey + ' + Shift + Left) No nodes are selected.',
					id: 'selectPreviousSibling'
				},{
					name: 'Select Next Sibling(s)',
					func: function(e,close) {
						close();
						closeHeaders();
						var elements = document.querySelectorAll('[data-selected-element=selected]');
						if (!elements.length) return;
						var y = Math.round(em(4.45));
						if (e.shiftKey) {
							function unique(array) {
								var uniques = [], counter = 0;
								for (var i = 0; i < array.length; i++ ) {
									var current = array[i];
									for (var n = 0;n < uniques.length;n++) {
										if (current != uniques[n]) {
											counter++;
										}
									}
									if (counter == uniques.length) {
										uniques.push(current);
									}
									counter = 0;
								}

								array.length = 0;
								for (i = 0;i < uniques.length;i++) {
									array.push(uniques[i]);
								}

								return array;
							}

							elements = Array.prototype.slice.call(elements);
							deselect();
							
							unique(elements.concat(elements.map(function(elem) {
								return elem == overlay ? overlay : elem.nextElementSibling || elem.parentNode.firstElementChild;
							}))).forEach(function(element) {
								clickhandler.call(element, pseudoEvent.__extend__({set: true}));
							});
						} else {
							deselect();
							forEach(elements, function(element) {
								clickhandler.call(element == overlay ? overlay : element.nextElementSibling || element.parentNode.firstElementChild, pseudoEvent.__extend__({set: true}));
							});
						}
						
						updateTooltip();
					},
					title: '(' + locale.cmdKey + ' + Right) or (' + locale.cmdKey + ' + Shift + Right) Selects the elements\' next sibling.',
					disabledtitle: '(' + locale.cmdKey + ' + Right) or (' + locale.cmdKey + ' + Shift + Right) No nodes are selected.',
					id: 'selectNextSibling'
				},{
					name: 'Select Children',
					func: function(_,close) {
						close();
						closeHeaders();
						contextmenus[1].getItem('selectChildren').dispatchEvent(new MouseEvent('click'));
					},
					title: '(' + locale.cmdKey + ' + Down) or (' + locale.cmdKey + ' + Shift + Down) Selects the immediate children of the nodes',
					disabledtitle: '(' + locale.cmdKey + ' + Down) or (' + locale.cmdKey + ' + Shift + Down) None of the selected nodes have any children',
					image: 'svg/select_children.svg',
					disabledimage: 'svg/select_children_disabled.svg',
					separate: true,
					id: 'selectChildren'
				},{
					name: 'Select by CSS Selector&#133;',
					func: function(_,close) {
						var querySelector = document.getElementById('querySelector');
						closeTopTexts();
						querySelector.className = 'topText active';
						close();
						closeHeaders();
						var idP = document.getElementById('idP')
						idP.focus();
						idP.dispatchEvent(new Event('keyup'));
					},
					title: 'Select element(s) using a CSS selector',
					image: 'svg/select_by_selector.svg',
					id: 'selectByCSS'
				}],
				pseudoParent: document.getElementById('section_selection')
			})
		],
		css = [],
		DOM = {},
		generations = [],
		clipboard = document.getElementById('clipboard'),
		userClipboard = '',
		selection = [],
		cssContextMenuArg = {
			items: [{
				name: 'Create New&#133;',
				func: function(_,close) {
					var editor = new HTMLStudio.CSSEditor();
					backdialog.style.display = 'block';
					var idH = document.getElementById('idH');
					idH.editor = editor;
					editor.node.addEventListener('keypress', function(e) {
						if (e.target.nodeName == 'INPUT' && e.charCode) this.modified = true;
					});
					editor.node.modified = true;
					idH.innerHTML = '<h3>Create CSS rules below, give your new style sheet a name to remember it by, and save it.</h3><br><input type="checkbox" checked id="cssSyntaxHighlighter"><label for="cssSyntaxHighlighter">Syntax Highlighting</label><br><br><input type="text" id="idK" placeholder="Style Sheet Name">';
					idH.appendChild(editor.node);
					document.getElementById('dialog_new_stylesheet').style.display = 'block';
					function prevent(e) {
						e.stopPropagation();
						e.preventDefault();
					};
					forEach(document.querySelectorAll('#cssSyntaxHighlighter, #cssSyntaxHighlighter + label'), function() {
						this.addEventListener('touchstart', function(e) {
							setTimeout(function() {
								this.checked = !this.checked;
								var focusedNode = document.querySelector('input:checked ~ .cssEditContainer .cssRule > input:focus');
								if (focusedNode) focusedNode.dispatchEvent(new Event('keydown'));
							}.bind(this.nodeName == 'LABEL' ? document.getElementById('cssSyntaxHighlighter') : this), 0);
							e.stopPropagation();
							e.preventDefault();
						});
						this.addEventListener('click', function(e) {
							setTimeout(function() {
								this.checked = !this.checked;
								var focusedNode = document.querySelector('input:checked ~ .cssEditContainer .cssRule > input:focus');
								if (focusedNode) focusedNode.dispatchEvent(new Event('keydown'));
							}.bind(this.nodeName == 'LABEL' ? document.getElementById('cssSyntaxHighlighter') : this), 0);
							e.stopPropagation();
							e.preventDefault();
						});
						this.addEventListener('mousedown', prevent);
						this.addEventListener('mouseup', prevent);
						this.addEventListener('dblclick', prevent);
						this.addEventListener('touchend', prevent);
						this.addEventListener('touchcancel', prevent);
					});
					close();
					closeHeaders();
				},
				title: 'Creates a new style sheet',
				id: 'createNew',
				image: 'svg/new.svg'
			},{
				name: 'Import from File&#133;',
				disabled: true,
				disabledtitle: 'Work in Progress',
				id: 'importFile'
			},{
				name: 'Import from URL&#133;',
				disabled: true,
				disabledtitle: 'Work in Progress',
				separate: true,
				id: 'importURL'
			}],
			pseudoParent: document.getElementById('section_stylesheets')
		},
		preventUpdates = false,
		preventEditTextBlurring = false,
		documentMeta = JSON.parse(localStorage.getItem('HTML-Studio_meta') || '{"charset":"utf-8"}'),
		pseudoEvent = {
			stopPropagation: function(){},
			preventDefault: function(){},
			clientX: 0,
			clientY: 0,
			isTrusted: true,
			__extend__: function(obj) {
				var event = {};
				for (var key in this) {
					event[key] = this[key];
				}
				for (key in obj) {
					event[key] = obj[key];
				}
				return event;
			}
		};

	// Check if tooltip should be shown
	document.getElementById('tooltip').style.display = localStorage.getItem('HTML-Studio_tooltipShown') == 0 ? 'none' : '';
	contextmenus[4].getItem('tooltip').toggled = localStorage.getItem('HTML-Studio_tooltipShown') != 0;

	// Add some debugging options for developers
	(window.HTMLStudio = window.HTMLStudio || {}).debug = {};
	HTMLStudio.debug.localStorage = {};
	Object.defineProperties(HTMLStudio.debug, {
		selection: {
			get: function() {
				return selection;
			},
			set: function(v) {
				return selection = v;
			}
		},
		updateOverlay: {
			get: function() {
				return overlayUpdate;
			}
		},
		updateStylesheets: {
			get: function() {
				return updateStylesheets;
			}
		},
		DOM: {
			get: function() {
				return DOM;
			},
			set: function(v) {
				return DOM = v;
			}
		},
		preventUpdates: {
			get: function() {
				return preventUpdates;
			},
			set: function(v) {
				return preventUpdates = !!v;
			}
		},
		preventEditTextBlurring: {
			get: function() {
				return preventEditTextBlurring;
			},
			set: function(v) {
				return preventEditTextBlurring = !!v;
			}
		},
		history: {
			get: function() {
				return history;
			},
			set: function(v) {
				return history = v;
			}
		},
		styleSheets: {
			get: function() {
				return css;
			},
			set: function(v) {
				return css = v;
			}
		},
		generations: {
			get: function() {
				return generations;
			},
			set: function(v) {
				return generations = v;
			}
		},
		contextMenus: {
			get: function() {
				return contextmenus;
			}
		},
		fullReset: {
			get: function() {
				return console.warn('Calling this function will destroy all your saved work and force HTML Studio to reload thinking that it\'s your first time on this page. All your current work is stored in localStorage, which will be wiped clean if you continue. This is only for debugging purposes. Place two pairs of parentheses to reset HTML Studio (i.e. window.HTMLStudio.debug.fullReset()(); )'),function ReadTheWarningFirst(){return function DidYouReadTheWarning(){['blockNoPaste','stylesheets','documentHistoryEntries','documentHistoryCurrentEntry','presets','session','tooltipShown'].forEach(function(a){localStorage.removeItem('HTML-Studio_'+a)});location.reload()}}
			}
		}
	});
	Object.defineProperties(HTMLStudio.debug.localStorage, {
		styleSheets: {
			get: function() {
				return JSON.parse(localStorage.getItem('HTML-Studio_stylesheets'));
			}
		},
		history: {
			get: function() {
				return {
					entries: JSON.parse(localStorage.getItem('HTML-Studio_documentHistoryEntries')),
					currentEntry: +localStorage.getItem('HTML-Studio_documentHistoryCurrentEntry')
				}
			}
		},
		tooltipShown: {
			get: function() {
				return localStorage.getItem('HTML-Studio_tooltipShown') != 0;
			}
		}
	});
	// Load document from localStorage or create a new one
	history.currentEntry = +(localStorage.getItem('HTML-Studio_documentHistoryCurrentEntry') || history.entries.length - 1);

	if (history.entries.length) {
		framewindow.document.body.outerHTML = history.entries[history.currentEntry].html;
		if (framewindow.document.querySelectorAll('html>head').length > 1) framewindow.document.documentElement.removeChild(framewindow.document.querySelectorAll('html>head')[1]);
		document.getElementById('title').value = history.entries[history.currentEntry].title;
		framewindow.document.body.style.margin = framewindow.document.body.style.margin || '0';
	} else {
		framewindow.document.body.innerHTML = 'This is the <span style="color: #00acc1; font-family: Consolas,Monaco,\'Ubuntu Mono\',\'Courier New\',Courier,monospace;">&lt;<span>body</span>&gt;</span> element.<div>And this a <span style="color: #00acc1; font-family: Consolas,Monaco,\'Ubuntu Mono\',\'Courier New\',Courier,monospace;">&lt;div&gt;</span> element.</div><div>Try clicking on elements<br>to select them</div>';
		framewindow.document.body.style.background = 'white';
		framewindow.document.body.style.textAlign = 'center';
		framewindow.document.body.style.fontSize = '1.5em';
		framewindow.document.body.style.fontFamily = 'Arial, sans-serif';
		framewindow.document.body.style.margin = '0';
		framewindow.document.documentElement.style.overflowY = framewindow.document.body.style.overflowY = 'hidden';
	}
	// Get stylesheets
	updateStylesheets();
	// Make sure <head> has a proper title
	framewindow.document.head.appendChild(framewindow.document.createElement('title'));
	framewindow.document.querySelector('title').innerText = document.getElementById('title').value;
	// Set charset of document
	framewindow.document.head.appendChild(framewindow.document.createElement('meta'));
	framewindow.document.querySelector('meta').setAttribute('charset',documentMeta.charset);
	// Disable undo and redo buttons if necessary
	contextmenus[3].getItem('undo').disabled = !history.currentEntry;
	contextmenus[3].getItem('redo').disabled = history.currentEntry == history.entries.length - 1;
	if (history.entries.length) {
		contextmenus[3].getItem('undo').getElementsByClassName('contextmenuitemtext')[0].innerText = 'Undo' + (history.currentEntry == 0 || !history.entries[history.currentEntry].action ? '' : ' • ' + history.entries[history.currentEntry].action);
		contextmenus[3].getItem('redo').getElementsByClassName('contextmenuitemtext')[0].innerText = 'Redo' + (history.currentEntry + 2 > history.entries.length || !history.entries[history.currentEntry + 1].action ? '' : ' • ' + history.entries[history.currentEntry + 1].action);
	}
	// Connect <body> and #overlay elements
	overlay.alias = framewindow.document.body;
	// Prepare for user copying
	prepareCopy();
	


	// Overlay event listeners
	overlay.addEventListener('contextmenu', function(e){
		if (e.shiftKey) return;
		e.preventDefault();
		e.stopPropagation();
		var index = document.querySelectorAll('[data-selected-element=selected]').length > 1 ? 1 : 0;
		if (!index) (document.querySelector('[data-selected-element=selected]') || overlay).dispatchEvent(new MouseEvent('click'));
		if ((e.target.className.baseVal == undefined ? e.target.className : e.target.className.baseVal).includes('contextmenu')) document.getElementsByClassName('contextmenu')[0].close();
		if (!index) {
			var node = document.querySelector('[data-selected-element=selected]') || overlay,
				format = formatElementInfo(node.alias),
				re = /(?:([a-z])(?=[A-Z\d])|(\d)(?=[a-zA-Z])|([a-zA-Z\d])(?=[^a-zA-Z\d])|([^a-zA-Z\d])(?=[a-zA-Z\d]))/g;
			contextmenus[0].getItem('info').firstChild.firstChild.innerHTML = '<span style="font-family:Consolas,Monaco\'Ubuntu Mono\',\'Courier New\',Courier,monospace"><span style="color:#33f">' + format.name.value.replace(re,'$1$2$3$4<wbr>') + '</span>' + (format.id.value ? '<wbr><span style="color:#009">#<wbr>' + format.id.value.replace(re,'$1$2$3$4<wbr>') + '</span>' : '') + (format.class.value ? '<wbr><span style="color:#F44">.<wbr>' + format.class.value.replace(/\s+/g,'.').replace(re,'$1$2$3$4<wbr>') : '');
			contextmenus[0].getItem('delete').disabled = node.alias == framewindow.document.body;
			contextmenus[0].getItem('selectChildren').disabled = !node.children.length;
			contextmenus[0].getItem('editText').disabled = node instanceof SVGElement || /^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i.test(node.nodeName);
			contextmenus[0].getItem('selectParent').disabled = node.alias == framewindow.document.body;
			contextmenus[0].getItem('unwrap').disabled = node.alias == framewindow.document.body;
		} else {
			contextmenus[1].getItem('selectChildren').disabled = (function() {
				for (var elements = document.querySelectorAll('[data-selected-element=selected]'), i = elements.length - 1; i >= 0; i--) {
					if (elements[i].children.length) return false;
				}
				return true;
			})();
		}
		closeHeaders();
		contextmenus[index].open();
		var style = contextmenus[index].node.getBoundingClientRect();
		contextmenus[index].node.style.left = e.clientX - (style.width + e.clientX > window.innerWidth ? style.width - window.innerWidth + e.clientX : 0) + 'px';
		contextmenus[index].node.style.top = e.clientY - (style.height + e.clientY > window.innerHeight ? style.height - window.innerHeight + e.clientY : 0) - em() + 'px';
		contextmenus[index].node.originElement = overlay;
	});
	overlay.addEventListener('click', function(e) {
		e.stopPropagation();
		if (e.shiftKey) {
			overlay.style.background = 'rgba(0,0,0,0)';
			overlay.setAttribute('data-selected-element', overlay.getAttribute('data-selected-element') != 'selected' ? 'selected' : '');
			var nodes = document.querySelectorAll('[data-selected-element=selected]');
			updateTooltip();
		} else {
			overlay.style.background = 'rgba(0,0,0,0)';
			var selected = overlay.getAttribute('data-selected-element') == 'selected', length = document.querySelectorAll('[data-selected-element=selected]').length;
			deselect();
			overlay.setAttribute('data-selected-element', length > 1 || !e.isTrusted ? 'selected' : selected ? '' : 'selected');
			updateTooltip();
		}
		if (document.selection) document.selection.empty(),iframewindow.document.selection.empty();
		else if (getSelection) getSelection().removeAllRanges(),framewindow.getSelection().removeAllRanges();
		updateTreeSelections();
		selection = Array.prototype.slice.call(document.querySelectorAll('[data-selected-element=selected]'));
		updateTooltip();
	});
	overlay.addEventListener('dblclick', function(e) {
		e.stopPropagation();
		e.preventDefault();
		deselect();
		this.dispatchEvent(new MouseEvent('click'));
		contextmenus[0].getItem('editText').dispatchEvent(new MouseEvent('click'));
	});
	overlay.addEventListener('mousemove', function(e) {
		this.mousePositions = {x: e.clientX, y: (e.clientY - Math.floor(document.getElementById('toolbarcontainer').getBoundingClientRect().height) + Math.round(document.getElementById('framecontainer').scrollTop))};
		updateTooltip();
	});
	overlay.addEventListener('mouseleave', function() {
		this.mousePositions = null;
		updateTooltip();
	});

	// Other stuff
	// Polyfill for Element.prototype.matches
	if (!Element.prototype.matches) {
		Element.prototype.matches = 
			Element.prototype.matchesSelector || 
			Element.prototype.mozMatchesSelector ||
			Element.prototype.msMatchesSelector || 
			Element.prototype.oMatchesSelector || 
			Element.prototype.webkitMatchesSelector ||
			function(s) {
				var matches = (this.document || this.ownerDocument).querySelectorAll(s),
					i = matches.length;
				while (--i >= 0 && matches.item(i) !== this) {}
				return i > -1;
			};
	}
	// Lets dialogs && .topText <div>s be draggable
	Array.prototype.forEach.call(document.getElementsByClassName('dialog'), function(element) {
		new DraggableElement(element,{bounds:'body',init:function(){this.style.left = innerWidth / 4 + 'px'}});
	});
	Array.prototype.forEach.call(document.getElementsByClassName('topText'), function(element) {
		element.style.left = '0';
		new DraggableElement(element,{bounds:'body',doY:false,cursor:'grabbing'});
		element.style.left = '';
	});
	// Prevents certain elements from letting their parent be dragged
	Array.prototype.forEach.call(document.querySelectorAll('.content,.option,#idD,.topText input,.cle'), function(element) {
		element.addEventListener('mousedown', function(e) {
			e.stopPropagation();
		})
	});
	// Makes some other things draggable
	new DraggableElement(document.getElementById('html_editor_display'), {bounds: document.getElementById('framecontainer')});
	new DraggableElement(document.getElementById('idr'), {start: function(event,e) {
		e.stopPropagation();
		this.start = {timestamp: event.timestamp, x: event.coordinates.start.x, y: event.coordinates.start.y};
	}, move: function(event) {
		var viewBox = document.getElementById('idq').getAttribute('viewBox').split(' ');
		viewBox[0] = Math.min((Math.max.apply(Math, generations) * 60 + 10) - viewBox[2], Math.max(0, viewBox[0] - event.coordinates.move.last.distance.x * viewBox[2] / this.clientWidth));
		viewBox[1] = Math.min((generations.length * 80 + 10) - Math.min(generations.length * 80 + 10, viewBox[2] * 2 / 3), Math.max(0, viewBox[1] - event.coordinates.move.last.distance.y * (viewBox[2] * 2 / 3) / this.clientHeight));
		document.getElementById('idq').setAttribute('viewBox', viewBox.join(' '));
	}, end: function(event,e) {
		this.style.top = 0;
		this.style.left = 0;
		if (event.timestamp - this.start.timestamp < 400 && Math.hypot(event.coordinates.end.x - this.start.x, event.coordinates.end.y - this.start.y) < 5) {
			this.style.display = 'none';
			var element = document.elementFromPoint(e.clientX, e.clientY);
			this.style.display = '';
			if (!element || element == document.getElementById('idq') || element.nodeName != 'rect') return;
			clickhandler.call(element.DOM.node.alias, {
				stopPropagation: function(){},
				clientX: e.clientX,
				clientY: e.clientY,
				isTrusted: true,
				shiftKey: e.shiftKey
			});
		}
	}, cursor: 'grabbing', inertia: true});


	Array.prototype.forEach.call(document.getElementsByClassName('localeCmdKey'), function(elem) {
		elem.innerText = locale.cmdKey;
	});



	// Function to update overlay to match iframe
	function overlayUpdate (skipListeners) {
		if (preventUpdates) return;
		if (!document.getElementById('frame').contentWindow.document.body) {
			var doc = document.getElementById('frame').contentWindow.document, body = doc.createElement('body');
			doc.documentElement.appendChild(body);
			document.getElementById('frameoverlay').alias = body;
			body.innerHTML = 'The <span style="color: #00acc1; font-family: Consolas,Monaco,\'Ubuntu Mono\',\'Courier New\',Courier,monospace;">&lt;body&gt;</span> element should not be deleted.<br>All content in the document should be kept as children of the <span style="color: #00acc1; font-family: Consolas,Monaco,\'Ubuntu Mono\',\'Courier New\',Courier,monospace;">&lt;body&gt;</span> element.';
			body.style.margin = '0';
			body.style.textAlign = 'center';
			body.style.fontFamily = 'Arial, sans-serif';
			body.style.background = 'white';
			body.style.fontSize = '1.5em';
		}

		var firstHead = false;
		Array.prototype.slice.call(framewindow.document.documentElement.children).forEach(function(element) {
			if (element.nodeName == 'HEAD') {
				if (firstHead) element.parentNode.removeChild(element);
				else firstHead = true;
			}
		});

		framewindow.document.documentElement.style.overflowY = "hidden";

		var elements = framewindow.document.body.childNodes, overlay = document.getElementById('frameoverlay'), body = framewindow.document.body;
		body.alias = overlay;
		overlay.alias = body;
		overlay.isOverlay = true;
		overlay.innerHTML = '';
		if (body.htmlStudioTextBeingEdited) overlay.setAttribute('data-html-studio-text-being-edited', 'true');
		else overlay.removeAttribute('data-html-studio-text-being-edited');

		var contextmenuhandler = function(e){
			if (e.shiftKey) return;
			var clonednode = this;
			if (document.querySelectorAll('[data-selected-element=selected]').length) clonednode.preventClick = true;
			e.preventDefault();
			e.stopPropagation();
			var index = document.querySelectorAll('[data-selected-element=selected]').length > 1 ? 1 : 0;
			if (!index) clonednode.dispatchEvent(new MouseEvent('click'));
			if ((e.target.className.baseVal == undefined ? e.target.className : e.target.className.baseVal).includes('contextmenu')) document.getElementsByClassName('contextmenu')[0].close();
			if (!index) {
				var node = document.querySelector('[data-selected-element=selected]') || clonednode,
					format = formatElementInfo(node.alias),
					re = /(?:([a-z])(?=[A-Z\d])|(\d)(?=[a-zA-Z])|([a-zA-Z\d])(?=[^a-zA-Z\d])|([^a-zA-Z\d])(?=[a-zA-Z\d]))/g;
				contextmenus[0].getItem('info').firstChild.firstChild.innerHTML = '<span style="font-family:Consolas,Monaco\'Ubuntu Mono\',\'Courier New\',Courier,monospace"><span style="color:#33f">' + format.name.value.replace(re,'$1$2$3$4<wbr>') + '</span>' + (format.id.value ? '<wbr><span style="color:#009">#<wbr>' + format.id.value.replace(re,'$1$2$3$4<wbr>') + '</span>' : '') + (format.class.value ? '<wbr><span style="color:#F44">.<wbr>' + format.class.value.replace(/\s+/g,'.').replace(re,'$1$2$3$4<wbr>') : '');
				contextmenus[0].getItem('delete').disabled = node.alias == framewindow.document.body;
				contextmenus[0].getItem('selectChildren').disabled = !node.children.length;
				contextmenus[0].getItem('editText').disabled = node instanceof SVGElement || /^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i.test(node.nodeName);
				contextmenus[0].getItem('selectParent').disabled = node.alias == framewindow.document.body;
				contextmenus[0].getItem('unwrap').disabled = node.alias == framewindow.document.body;
			} else {
				contextmenus[1].getItem('selectChildren').disabled = (function() {
					for (var elements = document.querySelectorAll('[data-selected-element=selected]'), i = elements.length - 1; i >= 0; i--) {
						if (elements[i].children.length) return false;
					}
					return true;
				})();
			}
			closeHeaders();
			contextmenus[index].open();
			var style = contextmenus[index].node.getBoundingClientRect();
			contextmenus[index].node.style.left = e.clientX - (style.width + e.clientX > window.innerWidth ? style.width - window.innerWidth + e.clientX : 0) + 'px';
			contextmenus[index].node.style.top = e.clientY - (style.height + e.clientY > window.innerHeight ? style.height - window.innerHeight + e.clientY : 0) - em() + 'px';
			contextmenus[index].node.originElement = clonednode
		};
		var dblclickhandler = function(e) {
			e.stopPropagation();
			e.preventDefault();
			deselect();
			this.dispatchEvent(new MouseEvent('click'));
			contextmenus[0].getItem('editText').dispatchEvent(new MouseEvent('click'));
		}


		overlay.stylePrecedence = {};
		css.forEach(function(stylesheet) {
			stylesheet[1].forEach(function(query) {
				if (body.matches(query[0])) {
					query[1].forEach(function(rule) {
						if (query[2] < overlay.stylePrecedence[rule[0]]) return;
						overlay.style[rule[0]] = rule[1];
						overlay.stylePrecedence[rule[0]] = query[2];
					})
				}
			})
		});
		body.style.margin = body.style.margin || 0;
		var vh = framewindow.innerHeight / 100,
			vw = framewindow.innerWidth / 100;
		if (/v(w|h)/.test(overlay.getAttribute('style'))) overlay.setAttribute('style', overlay.getAttribute('style').replace(/(\d+(?:\.\d+))vw/g, function($_, $1) {
			return vw * $1 + 'px';
		}).replace(/(\d+(?:\.\d+))vh/g, function($_, $1) {
			return vh * $1 + 'px';
		}));
		overlay.style.fontSize = getComputedStyle(body).fontSize;

		DOM = {
			name: 'BODY',
			node: body,
			generation: 0,
			children: []
		};

		DOM.parent = DOM;


		for (var i = elements.length - 1; i >= 0; i--) {
			function clone (parent, DOM) {
				var clonednode = this.cloneNode();
				this.alias = clonednode;
				forEach(this.boundRects, function() {
					if (this.parentNode) this.parentNode.removeChild(this);
				});
				clonednode.alias = this;
				clonednode.isOverlay = true;
				clonednode.stylePrecedence = {};
				if (clonednode instanceof Element || clonednode.nodeType == 1) {
					var DOMNodeObject = {
						name: clonednode.alias.nodeName,
						node: clonednode.alias,
						generation: DOM.generation + 1,
						children: [],
						parent: DOM
					};
					clonednode.DOM = DOMNodeObject;
					DOM.children.unshift(DOMNodeObject);
					if (!skipListeners) {
						// On right click pseudo element
						clonednode.addEventListener('contextmenu', contextmenuhandler);
						// On left click pseudo element
						clonednode.addEventListener('click', clickhandler);
						// Edit Text on dblclick
						clonednode.addEventListener('dblclick', dblclickhandler);
					}

					// Applies stylesheet rules to cloned node as style attribute
					css.forEach(function(stylesheet) {
						stylesheet[1].forEach(function(query) {
							if (this.matches(query[0])) {
								query[1].forEach(function(rule) {
									if (query[2] < clonednode.stylePrecedence[rule[0]]) return;
									clonednode.style[rule[0]] = this.style[rule[0]] || rule[1];
									clonednode.stylePrecedence[rule[0]] = query[2];
								}.bind(this));
							}
						}.bind(this))
					}.bind(this));

					// Since iframe height is changed to match its content (required for synchronized scrolling),
					// vh and vw units will be proportioned incorrectly
					// This fixes that by changing them to px units instead that correctly reflect vh and vw units
					if (/v(w|h)/.test(clonednode.getAttribute('style'))) clonednode.setAttribute('style', clonednode.getAttribute('style').replace(/(\d+(?:\.\d+)?)vw/g, function($_, $1) {
						return vw * $1 + 'px';
					}).replace(/(\d+(?:\.\d+)?)vh/g, function($_, $1) {
						return vh * $1 + 'px';
					}));

					var comStyles = getComputedStyle(this);
					clonednode.style.fontFamily = comStyles.fontFamily;
					// Saves the computed styles as a hidden attribute of the original node
					this.htmlStudioComputedStyles = clonednode.getAttribute('style') || '';
					// Other styles to make them transparent (since they are just an overlay)
					// And to keep the crosshair cursor throughout the entire document
					if (!skipListeners) clonednode.style.cursor = 'crosshair';
					clonednode.style[clonednode instanceof SVGElement && clonednode.nodeName.toLowerCase() != 'svg' ? 'fill' : 'background'] = clonednode.style.color = clonednode.style[clonednode instanceof SVGElement ? 'stroke' : 'borderColor'] = 'rgba(0,0,0,0)'
					clonednode.style.boxShadow = '';
					if (this.htmlStudioTextBeingEdited) clonednode.setAttribute('data-html-studio-text-being-edited', 'true');

					// Remove some harmful attributes
					// Prevent actually clicking on links, instead just select them
					if (clonednode.nodeName == 'A') clonednode.removeAttribute('href');
					// Prevent <img>s from blocking the actual nodes (their background was already changed, but not their src)
					if (clonednode.nodeName == 'IMG') {
						clonednode.style.verticalAlign = clonednode.style.verticalAlign || 'text-bottom';
						clonednode.setAttribute('src',clonednode.alias.getAttribute('src') == '' ? '' : 'svg/transparent.svg');

						var resize = function() {
							var newStyles = getComputedStyle(clonednode.alias);
							clonednode.style.width = (clonednode.width = Math.round(clonednode.alias.getAttribute('width') || clonednode.alias.clientWidth)) + 'px';
							clonednode.style.height = (clonednode.height = Math.round(clonednode.alias.getAttribute('height') || clonednode.alias.clientHeight)) + 'px';

							clonednode.removeEventListener('load',resize);
							clonednode.removeEventListener('error',resize);
						}
						if (clonednode.alias.complete || !clonednode.alias.hasAttribute('src') || clonednode.alias.getAttribute('src').trim() == '') resize();
						else { 
							clonednode.alias.addEventListener('load',resize);
							clonednode.alias.addEventListener('error',resize);
						}
					}
					// Prevent conflicting ids and incorrect inheritance from non-user style sheets
					clonednode.removeAttribute('id');
					// Prevent incorrect inheritance from non-user stylesheets
					clonednode.removeAttribute('class');
					// Prevents the user from editting the inner text
					clonednode.removeAttribute('contenteditable');
				}

				if (this.childNodes.length) {
					for (var i = this.childNodes.length - 1; i >= 0; i--) {
						clone.call(this.childNodes[i], clonednode, DOMNodeObject);
					}
				}

				if (clonednode.nodeType == 3 && parent.firstChild && parent.firstChild.nodeType == 3) {
					parent.firstChild.textContent = clonednode.textContent + parent.firstChild.textContent;
					parent.firstChild.alias.textContent = this.textContent + parent.firstChild.alias.textContent;
					this.parentNode.removeChild(this);
				} else parent.insertBefore(clonednode, parent.firstChild);
			};
			clone.call(elements[i], overlay, DOM);
		}
		var styles = framewindow.document.body.style;
		for (var style in styles) {
			try {
				overlay.style[style] = framewindow.document.body.style[style];
			} catch (_) {}
		};
		overlay.style.cursor = 'crosshair';
		overlay.style.color = 'rgba(0,0,0,0)';
		overlay.style.background = 'rgba(0,0,0,0)';
		overlay.style.boxShadow = '';
		overlay.style.fontFamily = (overlay.style.fontFamily || '') + ', serif';

		document.getElementById('overlaygrid').style.height = document.getElementById('rectDisplays').style.height = document.getElementById('frameback').style.height = Math.ceil(overlay.getBoundingClientRect().height) + 'px';

		restoreSelection();
		updateTree();
	}



	// Some global functions used in different areas
	// Array.prototype.forEach
	function forEach(array, func) {
		if (!array) return;
		for (var i = 0; i < array.length; i++) {
			if (func.call(array[i], array[i], i, array) == 'break') return;
		}
	}


	// Checks if a dialog is open
	function dialogOpen() {
		var elements = document.getElementsByClassName('dialog');
		for (var i = elements.length - 1; i >= 0; i--) {
			if (elements[i].style.display == 'block') return true;
		}
		return false;
	}

	// Used for event listeners to trigger blur when the user presses enter
	function onEnter(e) {
		if (e.keyCode == 13) this.blur();
	}

	// Used for event listeners to input tab into text element instead of blurring it
	function onTab(e) {
		if (e.keyCode == 9) {
			var position = false;
			if (document.selection) {
				this.focus();
				var range = document.selection.createRange();
				range.moveStart('character', -this.value.length);
				position = range.text.length;
			} else if (typeof this.selectionStart == 'number') position = this.selectionStart;

			if (position === false) return;
			if (this.createTextRange) {
				e.preventDefault();
				this.value = this.value.substring(0,position) + '\t' + this.value.substring(position);
				var range = this.createTextRange();
				this.move('character', position + 1);
				range.select();
			} else if (typeof this.selectionStart == 'number') {
				e.preventDefault();
				this.value = this.value.substring(0,position) + '\t' + this.value.substring(position);
				this.focus();
				this.setSelectionRange(position + 1, position + 1);
			}
		}
	}

	// Prevent blurring when the user presses tab for Edit HTML <textarea>
	document.getElementById('idf').addEventListener('keydown', onTab);

	// Restores a user's selection (like when the window is resized and selected element are deleted)
	function restoreSelection(preset) {
		var position = overlay.mousePositions || {x:0, y: Math.round(em(4.45))};
		// Ensure nothing is selected
		preset = preset || selection;
		deselect();
		preset.forEach(function(element) {
			clickhandler.call(element.alias.alias, {
				stopPropagation: function(){},
				clientX: position.x,
				clientY: position.y,
				isTrusted: true,
				shiftKey: true
			});
			updateTooltip();
		});
	}

	// Closes all .topText <div>s
	function closeTopTexts() {
		Array.prototype.forEach.call(document.getElementsByClassName('topText active'), function(element) {
			element.className = 'topText';
		});
	}

	// Update document CSS stylesheets
	function updateStylesheets() {
		localStorage.setItem('HTML-Studio_stylesheets', localStorage.getItem('HTML-Studio_stylesheets') || '[]');
		css = [];
		Array.prototype.forEach.call(framewindow.document.querySelectorAll('style'), function(stylesheet) {
			stylesheet.parentNode.removeChild(stylesheet);
		});
		!function() {
			var iframe = document.getElementById('cssTest'), allstylesheets = [], win = iframe.contentWindow;
			for (var stylesheets = JSON.parse(localStorage.getItem('HTML-Studio_stylesheets')), i = stylesheets.length - 1; i >= 0; i--) {
				win.document.head.innerHTML = stylesheets[i];
				var style = win.document.querySelector('style'),
					ref = style.getAttribute('data-name') || '',
					stylesheet = document.createElement('style'),
					fontstylesheet = document.createElement('style'),
					html = '',
					fontHtml = '';

				stylesheet.setAttribute('data-name', ref);
				css.push([ref,[]]);
				var rules = style.sheet.cssRules,
					// Makes sure the each CSSRule object is from the correct document
					// Firefox sees no difference between the two, but Chrome does
					CSSStyleRule = win.document.defaultView.CSSStyleRule,
					CSSFontFaceRule = win.document.defaultView.CSSFontFaceRule,
					CSSKeyframesRule = win.document.defaultView.CSSKeyframesRule;
				for (var n = 0, l = rules.length; n < l; n++, html += '\n\n') {
					if (rules[n] instanceof CSSStyleRule) {
						html += rules[n].selectorText + ' {\n';
						var precedence = HTMLStudio.parseSelector(rules[n].selectorText);
						forEach(precedence, function(_,i,p) {
							if (!i) {
								rules[n].cssText.replace(/(?:{\s*|;\s*)([a-z-]+)\s*:\s*((?:[^;'"}]|("|')(?:(?:(?!\3).(?=\3|\\))?(?:(?=\3)|\\.(?:(?!\3)[^\\](?=\3|\\))?|(?:.(?!\\|\3))+.)*?)\3)+)/g, function($0,$1,$2) {
									html += '\t' + $1 + ': ' + $2 + ';\n';
									(p.styles = p.styles || []).push([$1, $2]);
									return $0;
								});
							}
							css[css.length - 1][1].push([this.selector,p.styles,this]);
						});
						html += '}'
					} else if (rules[n] instanceof CSSFontFaceRule) {
						html += '@font-face {\n';
						fontHtml += '@font-face{'
						rules[n].cssText.replace(/(?:{\s*|;\s*)([a-z-]+)\s*:\s*((?:[^;'"}]|("|')(?:(?:(?!\3).(?=\3|\\))?(?:(?=\3)|\\.(?:(?!\3)[^\\](?=\3|\\))?|(?:.(?!\\|\3))+.)*?)\3)+)/g, function($0,$1,$2) {
							html += '\t' + $1 + ': ' + $2 + ';\n';
							fontHtml += $1 + ':' + $2 + ';';
							return $0;
						});
						html += '}';
						fontHtml += '}';
					} else if (rules[n] instanceof CSSKeyframesRule) {
						console.info('A CSS @keyframes declaration was ignored for compatibility: ' + rules[n].name);
					}
				}
				stylesheet.innerHTML = html;
				framewindow.document.head.appendChild(stylesheet);
				allstylesheets.push(stylesheet.outerHTML);
				var prevFontSS = document.getElementById('user-font-stylesheet');
				if (prevFontSS) prevFontSS.parentNode.removeChild(prevFontSS);
				fontstylesheet.innerHTML = fontHtml;
				fontstylesheet.id = 'user-font-stylesheet';
				document.head.appendChild(fontstylesheet);
			}
			localStorage.setItem('HTML-Studio_stylesheets', JSON.stringify(allstylesheets.reverse()));
		}();
	}
	// Deselects all elements and set their background back to transparent
	function deselect () {
		Array.prototype.forEach.call(document.querySelectorAll('[data-selected-element=selected]'), function(element) {
			element.removeAttribute('data-selected-element');
			element.style[element instanceof SVGElement && element.nodeName.toLowerCase() != 'svg' ? 'fill' : 'background'] = 'rgba(0,0,0,0)';
			forEach(element.boundRects, function() {
				if (this.parentNode) this.parentNode.removeChild(this);
			});
		});
		selection = Array.prototype.slice.call(document.querySelectorAll('[data-selected-element=selected]'));
		forEach(document.querySelectorAll('.rectX, .rectY, .rectXT, .rectYT'), function() {
			if (this.parentNode) this.parentNode.removeChild(this);
		});;
	}
	// Closes header context menus and sets the buttons to the correct background color
	function closeHeaders() {
		Array.prototype.forEach.call(document.getElementsByClassName('headersection'), function(element) {
			sectionopen = false;
			contextmenus.forEach(function(context) {
				context.close();
			});
			element.style.background = '';
		})
	}
	// Closes dialogs and hides the background overlay
	function closeDialogs() {
		document.getElementById('dialogcover').style.display = '';
		Array.prototype.forEach.call(document.getElementsByClassName('dialog'), function(element) {
			element.style.display = '';
		})
	};
	function quoteEscape(string) {
		return string.replace(/&/g,'&amp;').replace(/"/g, "&quot;");
	};
	// Returns an object with the info of the provided element
	function formatElementInfo(elem) {
		return {
			toString: function() {
				return '<span style="font-family:Consolas,Monaco,\'Ubuntu Mono\',\'Courier New\',Courier,monospace;font-size:1rem">' + this.name + this.id + this.class + '</span>';
			},
			name: {
				toString: function() {
					return '<span style="color:#33f">' + this.value + '</span>';
				},
				value: elem.nodeName.toLowerCase(),
				format: function(str1, str2) {
					return this.value ? str1 + this.value + str2 : '';
				}
			},
			id: {
				toString: function() {
					return this.value ? '<span style="color:#009">#' + this.value + '</span>' : '';
				},
				value: elem.id.trim(),
				format: function(str1, str2) {
					return this.value ? str1 + '#' + this.value + str2 : '';
				}
			},
			class: {
				toString: function() {
					return this.value ? '<span style="color:#F44">.' + this.value.replace(/\s+/g,'.') + '</span>' : '';
				},
				value: (elem.className ? elem.className.baseVal ? elem.className.baseVal : typeof elem.className == 'string' ? elem.className : '' : '').trim(),
				format: function() {
					return this.value ? str1 + '.' + this.value.replace(/\s+/g,'.') + str2 : '';
				}
			}
		}
	}
	// Updates the text shown in the tooltip
	function updateTooltip(custom) {
		var nodes = custom || document.querySelectorAll('[data-selected-element=selected]');
		if (nodes.length > 1) {
			document.getElementById('tooltiptext').innerHTML = nodes.length + ' nodes selected';
			document.getElementById('tooltip').style.opacity = '';
		} else if (nodes[0]) {
			var node = nodes[0].alias;
			document.getElementById('tooltiptext').innerHTML = formatElementInfo(node);
			document.getElementById('tooltip').style.opacity = '';
		} else if (overlay.mousePositions) {
			document.getElementById('tooltiptext').innerHTML = 'x: ' + overlay.mousePositions.x + ', y: ' + overlay.mousePositions.y;
			document.getElementById('tooltip').style.opacity = '';
		} else {
			document.getElementById('tooltiptext').innerHTML = '';
			document.getElementById('tooltip').style.opacity = '.5';
		}
	};
	// Updates which nodes are selected in the HTML tree
	function updateTreeSelections() {
		Array.prototype.forEach.call(document.querySelectorAll('#idq rect.html_editor'), function(rect) {
			rect.style.fill = rect.DOM.node.alias.getAttribute('data-selected-element') == 'selected' ? '#00acc1' : '#456';
		});
	};
	// Updates the HTML tree to have the same nodes as the document
	function updateTree() {
		if (!document.getElementById('html_editor_display').style.display) return;
		generations = [];
		function count(DOM, generation) {
			generations[generation] = (generations[generation] || 0) + 1;
			if (DOM.children.length) {
				for (var i = DOM.children.length - 1; i >= 0; i--) {
					count(DOM.children[i], generation + 1);
				}
			}
		};
		count(DOM, 0);
		var fullwidth = Math.max.apply(Math, generations), svg = document.getElementById('idq');
		svg.setAttribute('width', fullwidth * 60 + 10);
		svg.setAttribute('height', generations.length * 80 + 10);

		function fill(arr) {
			return arr.fill ? arr.fill(0) : (function() {
				for (var i = arr.length - 1; i >= 0; i--) {
					arr[i] = 0;
				};
				return arr;
			})();
		}

		var donegenerations = [];
		generations.forEach(function(gen, ind) {
			donegenerations[ind] = fill(new Array(gen));
		});

		function split(num, ind) {
			return num == 1 ? (fullwidth * 60 + 10) / 2 - 25 : (60 + ((fullwidth - num) * 60 / (num - 1))) * (ind) + 10;
		}

		function generateTree(DOM, child) {
			var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect'), line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
			DOM.rect = rect;
			DOM.line = line;
			rect.DOM = DOM;
			line.DOM = DOM;
			rect.setAttribute('y', DOM.generation * 80 + 10);
			rect.setAttribute('x', split(generations[DOM.generation], donegenerations[DOM.generation].lastIndexOf(0)));
			donegenerations[DOM.generation][donegenerations[DOM.generation].lastIndexOf(0)] = 1;
			rect.setAttribute('height', '30');
			rect.setAttribute('width', '50');
			rect.setAttribute('ry', '6');
			rect.setAttribute('class', 'html_editor');
			rect.setAttribute('stroke-width', '1px');
			rect.setAttribute('stroke', '#000')
			rect.style.fill = '#456';
			if (DOM.parent != DOM) {
				line.setAttribute('x1', +DOM.parent.rect.getAttribute('x') + 25);
				line.setAttribute('y1', +DOM.parent.rect.getAttribute('y') + 30);
				line.setAttribute('x2', +rect.getAttribute('x') + 25);
				line.setAttribute('y2', rect.getAttribute('y'));
				line.style.stroke = '#000';
				line.style.strokeWidth = '1.5px';
				line.style.lineCap = 'butt';
				svg.appendChild(line);
			}
			svg.appendChild(rect);
			if (DOM.children) {
				for (var i = DOM.children.length - 1; i >= 0; i--) {
					generateTree(DOM.children[i], i)
				}
			}
		}
		svg.innerHTML = '';
		generateTree(DOM, 0);
	};
	function clickhandler(e) {
		var clonednode = this;
		e.stopPropagation();
		if (clonednode.preventClick) return clonednode.preventClick = false;
		if ('set' in e) {
			clonednode.style[clonednode instanceof SVGElement && clonednode.nodeName.toLowerCase() != 'svg' ? 'fill' : 'background'] = 'rgba(0,0,0,0)';
			clonednode.setAttribute('data-selected-element', e.set ? 'selected' : '');
			var nodes = document.querySelectorAll('[data-selected-element=selected]');
			updateTooltip();
		} else if (e.shiftKey) {
			clonednode.style[clonednode instanceof SVGElement && clonednode.nodeName.toLowerCase() != 'svg' ? 'fill' : 'background'] = 'rgba(0,0,0,0)';
			clonednode.setAttribute('data-selected-element', clonednode.getAttribute('data-selected-element') != 'selected' ? 'selected' : '');
			var nodes = document.querySelectorAll('[data-selected-element=selected]');
			updateTooltip();
		} else {
			clonednode.style[clonednode instanceof SVGElement && clonednode.nodeName.toLowerCase() != 'svg' ? 'fill' : 'background'] = 'rgba(0,0,0,0)';
			var selected = clonednode.getAttribute('data-selected-element') == 'selected', length = document.querySelectorAll('[data-selected-element=selected]').length;
			deselect();
			clonednode.setAttribute('data-selected-element', length > 1 || !e.isTrusted ? 'selected' : selected ? '' : 'selected');
			updateTooltip();
		}
		if (document.selection) document.selection.empty(),iframewindow.document.selection.empty();
		else if (getSelection) getSelection().removeAllRanges(),framewindow.getSelection().removeAllRanges();
		updateTreeSelections();
		selection = Array.prototype.slice.call(document.querySelectorAll('[data-selected-element=selected]'));
		updateTooltip();

		// Create bounding box lines
		if (this.getAttribute('data-selected-element') == 'selected') {
			if (this.boundRects && this.boundRects[0].parentNode) return;
			this.boundRects = [document.createElement('div'), document.createElement('div'), document.createElement('span'), document.createElement('span')];
			this.boundRects[0].className = 'rectX';
			this.boundRects[1].className = 'rectY';
			this.boundRects[2].className = 'rectXT';
			this.boundRects[3].className = 'rectYT';
			// Append them to the document
			forEach(this.boundRects, function() {
				this.boundNode = clonednode;
				document.getElementById('rectDisplays').appendChild(this);
			});

			// If they are hidden, don't continue
			if (!contextmenus[4].getItem('boundingBox').toggled) return;

			var rect = this.getBoundingClientRect();
			// Set the dimension <span>s text
			this.boundRects[2].innerHTML = Math.round(rect.width).toString().match(/^..?(?=(...)*$)|.../g).join(',') + ' <span class="rectTU">px</span>';
			this.boundRects[3].innerHTML = Math.round(rect.height).toString().match(/^..?(?=(...)*$)|.../g).join(',') + ' <span class="rectTU">px</span>';
			var scrollX = framewindow.document.documentElement.scrollLeft || framewindow.document.body.scrollLeft,
				scrollY = (framewindow.document.documentElement.scrollTop || framewindow.document.body.scrollTop) - document.getElementById('toolbarcontainer').getBoundingClientRect().height;
			this.boundRects[0].style.top = rect.top + scrollY + 'px';
			this.boundRects[0].style.height = rect.height + 'px';
			this.boundRects[1].style.left = rect.left + scrollX + 'px';
			this.boundRects[1].style.width = rect.width + 'px';
			var rect2 = this.boundRects[2].getBoundingClientRect(),
				rect3 = this.boundRects[3].getBoundingClientRect();
			this.boundRects[2].style.top = rect.top + scrollY + rect.height + 'px';
			this.boundRects[2].style.left = Math.max(rect.left + scrollX + rect2.width / 2, rect.left + scrollX + rect.width / 2) + 'px';
			this.boundRects[3].style.top = Math.min(rect.top + scrollY + rect.height - rect3.width / 2 - rect3.height / 2, rect.top + scrollY + rect.height / 2 - rect3.width / 2) + 'px';
			this.boundRects[3].style.left = rect.left + scrollX - rect3.height / 2 - rect3.width / 2 + 'px';
		} else {
			forEach(this.boundRects, function() {
				if (this.parentNode) this.parentNode.removeChild(this);
			});
		}
	};



	// A bunch of event listeners for elements
	// Shows dialogs when the user clicks certain empty <a> tags
	!function() {
		function select() {
			closeDialogs();
			backdialog.style.display = 'block';
			document.getElementById('dialog_' + this.id.substring(5)).style.display = 'block';
		}
		function keypress(e) {
			if (e.keyCode == 13) select.call(this);
		}

		var about = document.getElementById('meta_about'), license = document.getElementById('meta_license');
		about.addEventListener('click', select);
		about.addEventListener('keydown', keypress);
		license.addEventListener('click', select);
		license.addEventListener('keydown', keypress);
	}();

	// File > Download File... > Minified
	document.getElementById('idY').addEventListener('click', function() {
		function toFileName(filename) {
			filename = filename.trim();
			if (!filename) return '';
			if (filename.substring(filename.length - 5) == '.html' || filename.substring(filename.length - 4) == '.htm' || filename.substring(filename.length - 6) == '.xhtml') return filename;
			return filename + '.html';
		}
		framewindow.document.documentElement.style.overflowY = '';
		HTMLStudio.saveAs(new Blob(['<!DOCTYPE html>' + HTMLStudio.minifyHTML()], {type: 'text/html'}), toFileName(document.getElementById('Ida').value) || toFileName(document.getElementById('title').value) || 'index.html');
		framewindow.document.documentElement.style.overflowY = 'hidden';
	});

	// File > Download File... > Unchanged
	document.getElementById('Idb').addEventListener('click', function() {
		function toFileName(filename) {
			filename = filename.trim();
			if (!filename) return '';
			if (filename.substring(filename.length - 5) == '.html' || filename.substring(filename.length - 4) == '.htm' || filename.substring(filename.length - 6) == '.xhtml') return filename;
			return filename + '.html';
		}
		framewindow.document.documentElement.style.overflowY = '';
		HTMLStudio.saveAs(new Blob(['<!DOCTYPE html>' + framewindow.document.documentElement.outerHTML], {type: 'text/html'}), toFileName(document.getElementById('Ida').value) || toFileName(document.getElementById('title').value) || 'index.html');
		framewindow.document.documentElement.style.overflowY = 'hidden';
	});

	// Insert Node button for [Right Click] > Insert Child...
	document.getElementById('idS').addEventListener('click', function() {
		var obj = document.getElementById('ida').insertChild,
			node = obj.nodeName == obj.textNode ? document.createTextNode(document.getElementById('idX').value) : document.createElement(obj.nodeName);
		var symbol = Symbol();
		var refNode = obj.children[obj.index] || {n:{s:symbol, previousSibling: obj.children[obj.children.length - 1].n}};

		if (node.nodeType == 3 && (refNode.n.previousSibling || {nodeType: 0}).nodeType == 3) {
			refNode.n.previousSibling.textContent += node.textContent;
		} else if (node.nodeType == 3 && (refNode.n || {nodeType: 0}).nodeType == 3) {
			refNode.n.textContent = node.textContent + refNode.n.textContent;
		} else if (node.nodeType == 1 && refNode.n.nodeType == 1 && refNode.n.previousSibling.nodeType == 3 && !refNode.n.previousSibling.textContent.trim()) {
			var text = refNode.n.previousSibling.textContent;
			obj.element.insertBefore(node, refNode.n)
			obj.element.insertBefore(document.createTextNode(text), refNode.n);
		} else {
			obj.element.insertBefore(node, refNode.n.s == symbol ? null : refNode.n);
		}

		document.getElementById('dialog_new_child').style.display = '';
		backdialog.style.display = '';

		history.update('Insert Child');
		overlayUpdate();
		clickhandler.call(node.nodeType == 1 ? node.alias : obj.element, {
			stopPropagation: function(){},
			clientX: 0,
			clientY: Math.round(em(4.45)),
			isTrusted: true
		});
		updateTooltip();
	});

	// On click for node name selector <div>s in [Right Click] > Insert Child...
	Array.prototype.forEach.call(document.querySelectorAll('.clf:not(input)'), function(element) {
		element.addEventListener('click', function() {
			Array.prototype.forEach.call(document.querySelectorAll('.clf.clg'), function(element) {
				element.className = 'clf';
			});
			element.className = 'clf clg';
			document.getElementById('idS').className = 'option';
			var ida = document.getElementById('ida');
			if (element.innerText == '#text') {
				ida.insertChild.nodeName = ida.insertChild.textNode;
				document.getElementById('idW').style.display = 'block';
			} else {
				ida.insertChild.nodeName = element.innerText.replace(/^<|>$/g,'');
				document.getElementById('idW').style.display = '';
			}
		});
		element.addEventListener('keydown', function(e) {
			if (e.keyCode == 13) this.dispatchEvent(new MouseEvent('click'));
		});
	});

	// On keyup for [Right Click] > Insert Child... > Custom HTML Element
	document.getElementById('idc').addEventListener('keyup', function() {
		Array.prototype.forEach.call(document.querySelectorAll('.clf.clg'), function(element) {
			element.className = 'clf';
		});
		if (/^<?[a-zA-Z][a-zA-Z\d-]*>?$/.test(this.value.trim())) {
			this.className = 'clf clg';
			document.getElementById('idS').className = 'option';
			document.getElementById('ida').insertChild.nodeName = this.value.trim().replace(/^<|>$/g,'');
			document.getElementById('idW').style.display = '';
		} else if (this.value.trim().toLowerCase() == '#text') {
			this.className = 'clf clg';
			document.getElementById('idS').className = 'option';
			var obj = document.getElementById('ida').insertChild;
			obj.nodeName = obj.textNode;
			document.getElementById('idW').style.display = 'block';
		} else {
			this.className = 'clf';
			document.getElementById('idS').className = 'option disabled';
			document.getElementById('ida').insertChild.nodeName = null;
			document.getElementById('idW').style.display = '';
		}
	});
	document.getElementById('idc').addEventListener('focus', function() {
		this.dispatchEvent(new Event('keyup'));
	});

	// On mouseover for #logo
	// Clears header context menus when user enters #logo
	document.getElementById('logo').addEventListener('mouseover', function() {
		closeHeaders();
	});

	// Update selection when user types in #querySelector
	document.getElementById('idP').addEventListener('keyup', function() {
		try {
			this.style.background = '';
			var elements = framewindow.document.querySelectorAll(this.value.trim());
			deselect();
			var y = Math.round(em(4.45));
			Array.prototype.forEach.call(elements, function(element) {
				if (element.alias) {
					clickhandler.call(element.alias, {
						stopPropagation: function(){},
						clientX: 0,
						clientY: y,
						isTrusted: true,
						shiftKey: true
					});
				}
			});
			updateTooltip();
			updateTreeSelections();
		} catch (e) {
			if (this.value.trim()) this.style.background = '#FFE1E1';
			else {
				deselect();
				updateTreeSelections();
				updateTooltip();
			}
		}
	});
	document.getElementById('idP').addEventListener('focus', function() {
		this.dispatchEvent(new Event('keyup'));
	});

	// Updates the element's className
	document.getElementById('idQ').addEventListener('keyup', function() {
		({
			append: function() {
				for (var i = this.elements.length - 1; i >= 0; i--) {
					if (typeof this.elements[i].alias.className == 'string') this.elements[i].alias.className = this.origClass[i] + ' ' + this.value.trim();
					else this.elements[i].alias.className.baseVal = this.origClass[i] + ' ' + this.value.trim();
				}
			},
			replace: function() {
				for (var i = this.elements.length - 1; i >= 0; i--) {
					this.elements[i].alias.className = this.value.trim();
				}
			}
		})[this.method].call(this);
		deselect();
		updateTooltip();
	});
	// Triggered when the user is finished editing
	document.getElementById('idQ').addEventListener('blur', function() {
		history.update('Edit class name' + (this.elements.length == 1 ? '' : 's'));
		overlayUpdate();
		this.parentNode.className = 'topText';
	});
	document.getElementById('idQ').addEventListener('keydown', onEnter);

	// Updates the element's id
	document.getElementById('idR').addEventListener('keyup', function() {
		this.element.id = this.value.trim();
		deselect();
		updateTooltip();
	});
	document.getElementById('idR').addEventListener('blur', function() {
		history.update('Edit ID');
		overlayUpdate();
		this.parentNode.className = 'topText';
	});
	document.getElementById('idR').addEventListener('keydown', onEnter);

	Array.prototype.forEach.call(document.getElementsByClassName('cle'), function(element) {
		element.addEventListener('click', function() {
			element.parentNode.className = 'topText';
		});
	});

	// On click for Style Sheets > Create New... > Save Style Sheet
	document.getElementById('idI').addEventListener('click', function() {
		var idH = document.getElementById('idH');
		var editor = idH.editor,
			invalid = editor.getInvalid();
		if (invalid.length && editor.node.modified) {
			invalid.forEach(function(object) {
				if (object instanceof HTMLStudio.CSSEditor.CSSRule) {
					object.node.className = 'cssRule invalid';
					object.selectorNode.className = 'invalid';
				} else if (object instanceof HTMLStudio.CSSEditor.CSSStyle) {
					object.node.className = 'cssStyle invalid';
					if (!object.name) object.nameNode.className = 'cssStyleName invalid';
					if (!object.value) object.valueNode.className = 'cssStyleValue invalid';
					object.className = 'cssStyle invalid';
				}
			});
			idH.scrollTop = 0;
			if (!document.getElementById('idJ')) {
				var div = document.createElement('div');
				div.id = 'idJ';
				div.innerHTML = 'Wait! Your CSS is malformed. Errors are shown in red below and will not be included in your style sheet if left unfixed. Select Save Style Sheet again to continue anyway.'
				idH.insertBefore(div, editor.node);
				editor.node.modified = false;
			}
		} else {
			// Removes warning notice if one exists
			if (document.getElementById('idJ')) idH.removeChild(document.getElementById('idJ'));
			// Get stylesheet from CSSEditor
			var stylesheet = editor.generateStylesheet();
			// Set the stylesheet data-name
			stylesheet.setAttribute('data-name', document.getElementById('idK').value.trim());
			// Minify the stylesheets innerHTML
			var testStyle = stylesheet.cloneNode();
			testStyle.innerHTML = stylesheet.innerHTML.replace(/(^|;|\{|\}|:)\s+/g,'$1').replace(/\s+(?=\{)|;(?=})/g,'');
			var html = testStyle.outerHTML;
			// Get current stylesheets
			var array = JSON.parse(localStorage.getItem('HTML-Studio_stylesheets') || '[]');
			// Add new stylesheet
			array.push(html);
			// Set the new set of stylesheets in localStorage
			localStorage.setItem('HTML-Studio_stylesheets', JSON.stringify(array));
			// Register the new stylesheet into the document
			updateStylesheets();
			// Give the browser enough time to render styles
			// getComputedStyle returns old styles until the styles have updated
			setTimeout(overlayUpdate, 500);
			setTimeout(overlayUpdate, 1000);
			// Close the current dialog
			closeDialogs();
			// Add a new entry into the user's history
			history.update('Create style sheet');
		}
	});

	// On click for Style Sheets > [Style Sheet] > Edit... > Save Style Sheet
	document.getElementById('idN').addEventListener('click', function() {
		var idL = document.getElementById('idL');
		var editor = idL.editor,
			invalid = editor.getInvalid();
		if (invalid.length && editor.node.modified) {
			invalid.forEach(function(object) {
				if (object instanceof HTMLStudio.CSSEditor.CSSRule) {
					object.node.className = 'cssRule invalid';
					object.selectorNode.className = 'invalid';
				} else if (object instanceof HTMLStudio.CSSEditor.CSSStyle) {
					object.node.className = 'cssStyle invalid';
					if (!object.name) object.nameNode.className = 'cssStyleName invalid';
					if (!object.value) object.valueNode.className = 'cssStyleValue invalid';
					object.className = 'cssStyle invalid';
				}
			});
			idL.scrollTop = 0;
			if (!document.getElementById('idO')) {
				var div = document.createElement('div');
				div.id = 'idO';
				div.innerHTML = 'Wait! Your CSS is malformed. Errors are shown in red below and will not be included in your style sheet if left unfixed. Select Save Style Sheet again to continue anyway.'
				idL.insertBefore(div, editor.node);
				editor.node.modified = false;
			}
		} else {
			if (document.getElementById('idO')) idL.removeChild(document.getElementById('idO'));
			var stylesheet = editor.generateStylesheet(), testStyle, array = [];
			stylesheet.setAttribute('data-name', document.getElementById('idM').value.trim());
			editor.originalStylesheet.ownerNode.parentNode.replaceChild(stylesheet, editor.originalStylesheet.ownerNode);

			for (var stylesheets = framewindow.document.querySelectorAll('style'), i = stylesheets.length - 1; i >= 0; i--) {
				testStyle = stylesheets[i].cloneNode();
				testStyle.innerHTML = stylesheets[i].innerHTML.replace(/(^|;|\{|\}|:)\s+/g,'$1').replace(/\s+(?=\{)|;(?=})/g,'');
				array.push(testStyle.outerHTML);
			}

			localStorage.setItem('HTML-Studio_stylesheets', JSON.stringify(array));
			updateStylesheets();
			// Gives browser enough time to render styles
			// getComputedStyle returns old styles until the styles have updated
			setTimeout(overlayUpdate, 500);
			setTimeout(overlayUpdate, 1000);
			closeDialogs();
			history.update('Edit style sheet');
		}
	});

	//Prevents #no_paste dialog from being shown if checkbox is clicked
	document.getElementById('idB').addEventListener('change', function() {
		localStorage.setItem('HTML-Studio_blockNoPaste', this.checked ? '1' : '0');
	});

	document.getElementById('idD').addEventListener('click', function() {
		contextmenus[4].getItem('htmlTree').dispatchEvent(new MouseEvent('click'));
	});

	// Scrolls iframe depending on #framecontainer's scrollTop
	document.getElementById('framecontainer').addEventListener('scroll', Modernizr.csspositionsticky ? function() {
		// Browser with support for position:sticky that might use asynchronous scrolling
		framewindow.document.documentElement.scrollTop = framewindow.document.body.scrollTop = this.scrollTop;
	} : function() {
		// Browsers with no support for position:sticky that probably doesn't use asynchronous scrolling
		framewindow.document.documentElement.scrollTop = framewindow.document.body.scrollTop = this.scrollTop;
		iframe.style.top = this.scrollTop + 'px';
	});

	// Can't be run on window because the event propogates and ends up toggling Inspect Element for developer tools
	clipboard.addEventListener('keydown', function(e) {
		// Ctrl + Shift + C
		if (e.keyCode == 67 && locale.cmdKeyPressed(e) && e.shiftKey) {
			e.stopPropagation();
			e.preventDefault();
			prepareCopy(true);
			if (e.isTrusted && document.queryCommandSupported('copy')) document.execCommand('copy');
		}
	});

	// Controls opening and closing of header sections
	var sectionopen = false;
	Array.prototype.forEach.call(document.getElementsByClassName('headersection'), function(element,index,array){
		function open(e) {
			e.stopPropagation();
			sectionopen = !sectionopen;
			var open = true;
			for (var i = array.length - 1; i >= 0 && open; i--) {
				if (contextmenus[i + 2].node.parentNode) open = false;
			}
			if (open) {
				dispatchEvent(new MouseEvent('mousedown'));
				if (index == 3) contextmenus[5] = (function(){
					var arg = {items: cssContextMenuArg.items.slice(), pseudoParent: cssContextMenuArg.pseudoParent};
					Array.prototype.forEach.call(framewindow.document.querySelectorAll('style'), function(stylesheet, index) {
						arg.items.push({
							name: (stylesheet.getAttribute('data-name') || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;') || '<span style="font-style:italic">Unnamed Style Sheet</span>',
							subcontext: {
								items: [{
									name: 'Edit&#133;',
									func: function(_,close) {
										var editor = new HTMLStudio.CSSEditor(this.root.parentNode.stylesheet.sheet, true, framewindow.document);
										editor.onQuerySelector = function(query) {
											deselect();
											forEach(framewindow.document.querySelectorAll(query), function() {
												if (!this.alias) return;
												clickhandler.call(this.alias, pseudoEvent.__extend__({set: true}));
											});
											closeDialogs();
											updateTooltip();
										};
										backdialog.style.display = 'block';
										var idL = document.getElementById('idL');
										idL.editor = editor;
										editor.node.addEventListener('keypress', function(e) {
											if (e.target.nodeName == 'INPUT' && e.charCode) this.modified = true;
										});
										editor.node.modified = true;
										idL.innerHTML = '<h3>Edit the style sheet styles below or click a <img class="cld" src="svg/select_from_selector.svg" style="cursor:initial"> to select all elements matching the corresponding CSS selector.</h3><br><input type="checkbox" checked id="cssSyntaxHighlighter"> <label for="cssSyntaxHighlighter">Syntax Highlighting</label><br><br><input type="text" id="idM" placeholder="Style Sheet Name">';
										idL.appendChild(editor.node);
										document.getElementById('dialog_edit_stylesheet').style.display = 'block';
										document.getElementById('idM').value = this.root.parentNode.stylesheet.getAttribute('data-name') || '';
										function prevent(e) {
											e.stopPropagation();
											e.preventDefault();
										};
										forEach(document.querySelectorAll('#cssSyntaxHighlighter, #cssSyntaxHighlighter + label'), function() {
											this.addEventListener('touchstart', function(e) {
												setTimeout(function() {
													this.checked = !this.checked;
													var focusedNode = document.querySelector('input:checked ~ .cssEditContainer .cssRule > input:focus');
													if (focusedNode) focusedNode.dispatchEvent(new Event('keydown'));
												}.bind(this.nodeName == 'LABEL' ? document.getElementById('cssSyntaxHighlighter') : this), 0);
												e.stopPropagation();
												e.preventDefault();
											});
											this.addEventListener('click', function(e) {
												setTimeout(function() {
													this.checked = !this.checked;
													var focusedNode = document.querySelector('input:checked ~ .cssEditContainer .cssRule > input:focus');
													if (focusedNode) focusedNode.dispatchEvent(new Event('keydown'));
												}.bind(this.nodeName == 'LABEL' ? document.getElementById('cssSyntaxHighlighter') : this), 0);
												e.stopPropagation();
												e.preventDefault();
											});
											this.addEventListener('mousedown', prevent);
											this.addEventListener('mouseup', prevent);
											this.addEventListener('dblclick', prevent);
											this.addEventListener('touchend', prevent);
											this.addEventListener('touchcancel', prevent);
										});
										close();
										closeHeaders();
									},
									id: 'edit',
									image: 'svg/edit_attributes.svg'
								},{
									name: 'Delete',
									func: function(_,close) {
										//this.root.parentNode.root.parentNode.removeChild(this.root.parentNode.root);
										this.root.parentNode.stylesheet.parentNode.removeChild(this.root.parentNode.stylesheet);
										var array = [], testStyle;
										for (var stylesheets = framewindow.document.querySelectorAll('style'), i = stylesheets.length - 1; i >= 0; i--) {
											testStyle = stylesheets[i].cloneNode();
											testStyle.innerHTML = stylesheets[i].innerHTML.replace(/(^|;|\{|\}|:)\s+/g,'$1').replace(/\s+(?=\{)|;(?=})/g,'');
											array.push(testStyle.outerHTML);
										}
										localStorage.setItem('HTML-Studio_stylesheets', JSON.stringify(array));
										close();
										closeHeaders();
										updateStylesheets();
										overlayUpdate();
										history.update('Delete style sheet');
									},
									id: 'delete',
									image: 'svg/delete.svg'
								}]
							},
							id: 'styleSheet' + index,
							attributes: {
								stylesheet: stylesheet
							}
						});
					});

					if (arg.items.length == 3) {
						arg.items.push({
							name: '<span style="color:#000;font-style:italic">No style sheets found</span>',
							disabled: true,
							title: 'Create or import a style sheet above',
							id: 'noStyleSheets'
						});
					}
					return new HTMLStudio.ContextMenu(arg);
				})();
				else if (index == 4) {
					var elements = document.querySelectorAll('[data-selected-element=selected]');
					contextmenus[6].getItem('selectChildren').disabled = (function() {
						for (var i = elements.length - 1; i >= 0; i--) {
							if (elements[i].children.length) return false;
						}
						return true;
					})();
					contextmenus[6].getItem('selectParent').disabled = elements.length == 0 || (elements.length == 1 && overlay.getAttribute('data-selected-element') == 'selected');
					contextmenus[6].getItem('selectPreviousSibling').disabled = contextmenus[6].getItem('selectNextSibling').disabled = elements.length == 0;
				}
				contextmenus[index + 2].open();
				contextmenus[index + 2].node.style.left = this.getBoundingClientRect().left + 'px';
				contextmenus[index + 2].node.style.top = this.getBoundingClientRect().bottom - em() + 'px';
				this.style.background = '#DDD';
			} else {
				contextmenus[index + 2].close();
				this.style.background = '';
			};
			setTimeout(function(){
				if (document.selection) document.selection.empty();
				else if (getSelection) getSelection().removeAllRanges();
			},0)
		}
		function enter(e) {
			var open = false;
			for (var i = array.length - 1; i >= 0 && !open; i--) {
				if (contextmenus[i + 2].node.parentNode) open = true;
			}
			if (!open) return;
			Array.prototype.forEach.call(array, function(element, index) {
				element.style.background = '';
				try{
					contextmenus[index + 2].close();
				}catch(_){}
			});
			dispatchEvent(new MouseEvent('mousedown'));
			if (index == 3) contextmenus[5] = (function(){
				var arg = {items: cssContextMenuArg.items.slice(), pseudoParent: cssContextMenuArg.pseudoParent};
				Array.prototype.forEach.call(framewindow.document.querySelectorAll('style'), function(stylesheet, index) {
					arg.items.push({
						name: (stylesheet.getAttribute('data-name') || '').replace(/</g,'&lt;').replace(/>/g,'&gt;') || '<span style="font-style:italic">Unnamed Style Sheet</span>',
						subcontext: {
							items: [{
								name: 'Edit&#133;',
								func: function(_,close) {
									var editor = new HTMLStudio.CSSEditor(this.root.parentNode.stylesheet.sheet, true, framewindow.document);
									editor.onQuerySelector = function(query) {
										deselect();
										var y = Math.round(em(4.45));
										Array.prototype.forEach.call(framewindow.document.querySelectorAll(query), function(element) {
											if (!element.alias) return;
											clickhandler.call(element.alias, {
												stopPropagation: function(){},
												clientX: 0,
												clientY: y,
												isTrusted: true,
												shiftKey: true
											});
										});
										closeDialogs();
									};
									backdialog.style.display = 'block';
									var idL = document.getElementById('idL');
									idL.editor = editor;
									editor.node.addEventListener('keypress', function(e) {
										if (e.target.nodeName == 'INPUT' && e.charCode) this.modified = true;
									});
									editor.node.modified = true;
									idL.innerHTML = '<h3>Edit the style sheet styles below or click a <img class="cld" src="svg/select_from_selector.svg" style="cursor:initial"> to select all elements matching the corresponding CSS selector.</h3><br><input type="checkbox" checked id="cssSyntaxHighlighter"> <label for="cssSyntaxHighlighter">Syntax Highlighting</label><br><br><input type="text" id="idM" placeholder="Style Sheet Name">';
									idL.appendChild(editor.node);
									document.getElementById('dialog_edit_stylesheet').style.display = 'block';
									document.getElementById('idM').value = this.root.parentNode.stylesheet.getAttribute('data-name') || '';
									function prevent(e) {
											e.stopPropagation();
											e.preventDefault();
										};
									forEach(document.querySelectorAll('#cssSyntaxHighlighter, #cssSyntaxHighlighter + label'), function() {
										this.addEventListener('touchstart', function(e) {
											setTimeout(function() {
												this.checked = !this.checked;
												var focusedNode = document.querySelector('input:checked ~ .cssEditContainer .cssRule > input:focus');
												if (focusedNode) focusedNode.dispatchEvent(new Event('keydown'));
											}.bind(this.nodeName == 'LABEL' ? document.getElementById('cssSyntaxHighlighter') : this), 0);
											e.stopPropagation();
											e.preventDefault();
										});
										this.addEventListener('click', function(e) {
											setTimeout(function() {
												this.checked = !this.checked;
												var focusedNode = document.querySelector('input:checked ~ .cssEditContainer .cssRule > input:focus');
												if (focusedNode) focusedNode.dispatchEvent(new Event('keydown'));
											}.bind(this.nodeName == 'LABEL' ? document.getElementById('cssSyntaxHighlighter') : this), 0);
											e.stopPropagation();
											e.preventDefault();
										});
										this.addEventListener('mousedown', prevent);
										this.addEventListener('mouseup', prevent);
										this.addEventListener('dblclick', prevent);
										this.addEventListener('touchend', prevent);
										this.addEventListener('touchcancel', prevent);
									});
									close();
									closeHeaders();
								},
								id: 'edit',
								image: 'svg/edit_attributes.svg'
							},{
								name: 'Delete',
								func: function(_,close) {
									//this.root.parentNode.root.parentNode.removeChild(this.root.parentNode.root);
									this.root.parentNode.stylesheet.parentNode.removeChild(this.root.parentNode.stylesheet);
									var array = [], testStyle;
									for (var stylesheets = framewindow.document.querySelectorAll('style'), i = stylesheets.length - 1; i >= 0; i--) {
										testStyle = stylesheets[i].cloneNode();
										testStyle.innerHTML = stylesheets[i].innerHTML.replace(/(^|;|\{|\}|:)\s+/g,'$1').replace(/\s+(?=\{)|;(?=})/g,'');
										array.push(testStyle.outerHTML);
									}
									localStorage.setItem('HTML-Studio_stylesheets', JSON.stringify(array));
									close();
									closeHeaders();
									updateStylesheets();
									overlayUpdate();
									history.update('Delete style sheet');
								},
								id: 'delete',
								image: 'svg/delete.svg'
							}]
						},
						id: 'styleSheet' + index,
						attributes: {
							stylesheet: stylesheet
						}
					});
				});

				if (arg.items.length == 3) {
					arg.items.push({
						name: '<span style="color:#000;font-style:italic">No style sheets found</span>',
						disabled: true,
						title: 'Create or import a style sheet above',
						id: 'noStyleSheets'
					});
				}
				return new HTMLStudio.ContextMenu(arg);
			})();
			contextmenus[index + 2].open();
			contextmenus[index + 2].node.style.left = this.getBoundingClientRect().left + 'px';
			contextmenus[index + 2].node.style.top = this.getBoundingClientRect().bottom - em() + 'px';
			this.style.background = '#DDD';
		}
		element.addEventListener('mousedown', open);
		element.addEventListener('mouseenter', enter);
		element.addEventListener('keydown', function(e) {
			if (e.keyCode == 13) open.call(this,e);
			else if (e.keyCode == 40) {
				if (!contextmenus[index + 2].node.parentNode) closeHeaders(), open.call(this, e);
				contextmenus[index + 2].getItem(0).focus();
			} else if (e.keyCode == 37) {
				(array[index - 1] || array[array.length - 1]).focus();
			} else if (e.keyCode == 39) {
				(array[index + 1] || array[0]).focus();
			} else if (e.keyCode == 38) {
				if (!contextmenus[index + 2].node.parentNode) closeHeaders(), open.call(this, e);
				contextmenus[index + 2].node.lastElementChild.focus();
			}
		});
		element.addEventListener('focus', enter);
	});

	contextmenus.forEach(function(cm) {
		forEach(cm.node.children, function(child, index) {
			if (child.nodeName == 'LI') {
				child.addEventListener('keydown', function(e) {
					if (e.keyCode == 40 && child.nextElementSibling) {
						(child.nextSibling.nodeName == 'LI' ? child.nextElementSibling : child.nextElementSibling.nextElementSibling).focus();
					}
				});
			}
		});
	});

	// Sets document title to match the title on the header
	document.getElementById('title').addEventListener('keydown', function(e) {
		if (e.keyCode == 13) return this.blur();
		setTimeout(function(){
			if (!this.value) this.style.fontStyle = 'italic';
			else this.style.fontStyle = '';
			var width = document.getElementById('titlewidth');
			width.innerHTML = '&nbsp;<i>Untitled HTML Document</i>&nbsp;';
			this.style.minWidth = Math.min(innerWidth * .85, Math.max(innerWidth / 5, width.scrollWidth)) + 'px';
			width.innerText = this.value;
			document.getElementById('title').style.width = width.scrollWidth + em(.6) + 'px';
			document.title = (this.value.trim() ? this.value.trim() + ' - ' : '') + 'HTML Studio \xb7 ChristianFigueroa.GitHub.io';
			framewindow.document.querySelector('title').innerText = this.value;
		}.bind(this),0);
	});

	// Updates document title in history
	document.getElementById('title').addEventListener('blur', function(){
		history.update('Update document title');
		if (!this.value) this.style.fontStyle = 'italic';
		else this.style.fontStyle = '';
	});

	document.getElementById('title').dispatchEvent(new Event('keydown'));
	// Event listener for file upload window
	document.getElementById('open_file_html').addEventListener('change', function(e) {
		if (!this.files.length) return;
		document.getElementById('id4').innerHTML = '<div id="id6"><div id="id7">' + (this.files[0].name) + '<span style="float:right">' + (this.files[0].size < 1000 ? e.files[0].size + ' bytes' : Math.round(this.files[0].size / 100) / 10 + 'KB') + '</span></div><span id="id8"></span></div>';
		if (this.files[0].type != 'text/html') return document.getElementById('id8').innerHTML = 'This file format is not allowed. Please only select an HTML file ending in an ".html" extension.',document.getElementById('id7').style.background = '#FFB7B7',document.getElementById('id9').className='option disabled';
		document.getElementById('id7').style.background = '#A6FFA6';
		document.getElementById('id8').innerHTML = 'Make sure your work is saved before pressing "Open File"';
		document.getElementById('id9').className='option';
		document.getElementById('id2').file = this.files[0];
	});

	// Onclick event listener for file uploader for File > Open...
	document.getElementById('id2').addEventListener('click', function() {
		document.getElementById('open_file_html').click();
	});

	// Hide warning if button is clicked (2 or more tabs open)
	document.getElementById('overwrite_continue').addEventListener('click', function() {
		document.getElementById('overwrite_warning').style.display = '';
	});

	// Hide warning if button is clicked (user is on mobile device)
	document.getElementById('mobile_continue').addEventListener('click', function() {
		document.getElementById('mobile_warning').style.display = '';
	});

	// Open File button for File > Open...
	document.getElementById('id9').addEventListener('click', function() {
		if (this.className.includes('disabled')) return;
		var reader = new FileReader(), html;
		reader.onload = function() {
			try {
				html = reader.result;
				var body, doc;
				try {
					doc = new DOMParser().parseFromString(html, 'text/html');
					body = doc.body;
				} catch (_) {
					doc = new DOMParser().parseFromString(html, 'text/xml');
					if (doc.children[0].nodeName == 'parsererror') throw Error('The file could not be read as HTML (Update or change your browser!) and was interpretted as malformed XML. Try removing <script> elements or updating/changing your browser to be interpretted correctly.');
					body = doc.getElementsByTagName('body')[0]
				}
				if (!body) throw Error('A <body> element could not be found or the file is malformed. Try updating/changing your browser.');
				var stylesheethtml = [], testStyle;
				for (var stylesheets = doc.getElementsByTagName('style'), i = stylesheets.length - 1; i >= 0; i--) {
					testStyle = stylesheets[i].cloneNode();
					testStyle.innerHTML = stylesheets[i].innerHTML.replace(/(^|;|\{|\}|:)\s+/g,'$1').replace(/\s+(?=\{)|;(?=})/g,'');
					stylesheethtml.push(testStyle.outerHTML);
				}
				localStorage.setItem('HTML-Studio_documentHistoryEntries', JSON.stringify([{
					html: (body).outerHTML,
					title: (doc.getElementsByTagName('title') ? doc.getElementsByTagName('title')[0] : {innerText:''}).innerText,
					action: undefined,
					stylesheets: stylesheethtml
				}]));
				localStorage.setItem('HTML-Studio_stylesheets', JSON.stringify(stylesheethtml));
				localStorage.setItem('HTML-Studio_documentHistoryCurrentEntry', 0);
				closeDialogs();
				location.reload();
			} catch(_) {
				console.error(_);
				document.getElementById('id8').innerHTML = 'An error occurred while parsing the file. Make sure the file is valid HTML (and includes a &lt;body&gt;) or try another browser.'
			}
		}
		reader.readAsText(document.getElementById('id2').file);
	});

	// Save HTML button for [Right Click] > Edit as HTML...
	document.getElementById('idd').addEventListener('click', function() {
		var textarea = document.getElementById('idf'), template = document.createElement('template');
		if (textarea.linkedElement == framewindow.document.body) {
			return framewindow.document.body.innerHTML = textarea.value,closeDialogs(),overlayUpdate(),history.update('Edit HTML');
		}
		template.innerHTML = textarea.value;
		var children = template.content.childNodes;
		for (var i = children.length - 1; i >= 0; i--) {
			textarea.linkedElement.parentNode.insertBefore(children[i], i == children.length - 1 ? textarea.linkedElement.nextSibling : children[i + 1]);
		}
		textarea.linkedElement.parentNode.removeChild(textarea.linkedElement);
		overlayUpdate(false, true);
		history.update('Edit HTML');
		closeDialogs();
	});

	// Top right exit button and Cancel button event listener
	Array.prototype.forEach.call(document.getElementsByClassName('exit'), function(element) {
		element.addEventListener('click', function() {
			if (!this.className.includes('disabled')) closeDialogs();
		})
	});

	// Save Attributes button for [Right Click] > Edit Attributes...
	document.getElementById('idh').addEventListener('click', function() {
		for (var element = document.getElementById('idi').linkedElement, i = element.attributes.length - 1; i >= 0; i--) {
			element.removeAttribute(element.attributes[i].name);
		};
		for (var children = document.getElementById('idi').children[0].children, i = children.length - 1; i >= 0; i--) {
			try {
				element.setAttribute(children[i].children[0].children[0].value, children[i].children[1].children[0].value);
			} catch (_) {};
		};
		overlayUpdate(false, true);
		history.update('Edit attributes');
		closeDialogs();
	});
	// Save Styles button for [Right Click] > Edit Styles...
	document.getElementById('idt').addEventListener('click', function() {
		var styleAttr = '';
		Array.prototype.forEach.call(document.querySelectorAll('#idu .cl4:not(#idw)'), function(element) {
			styleAttr += element.children[0].children[0].value.trim() + ':' + element.children[1].children[0].value.trim() + ';';
		});
		document.getElementById('idu').linkedElement.setAttribute('style', styleAttr);
		overlayUpdate(false, true);
		history.update('Edit styles');
		closeDialogs();
	});

	// Allows for pressing enter on buttons to click them
	Array.prototype.forEach.call(document.querySelectorAll('.option,.exit'), function(element) {
		element.addEventListener('keypress', function(e) {
			if (e.keyCode == 13) element.dispatchEvent(new MouseEvent('click'));
		})
	});
	// Create New Preset button for File > New... > Create New Preset...
	document.getElementById('idz').addEventListener('click', function() {
		var presets = JSON.parse(localStorage.getItem('HTML-Studio_presets') || '[]');
		document.getElementById('idy').contentWindow.document.body.style.fontSize = document.getElementById('idy').bodyDefaultFontSize;
		presets.push([document.getElementById('idy').contentWindow.document.documentElement.innerHTML, document.getElementById('idA').value]);
		localStorage.setItem('HTML-Studio_presets', JSON.stringify(presets));
		closeDialogs();
	})
	// Open New File button for File > New...
	document.getElementById('idl').addEventListener('click', function() {
		var element = document.querySelector('#idm td[style*=background]');
		if (this.className.includes('disabled') || !element) return;
		var stylesheethtml = [], testStyle;
		for (var stylesheets = element.children[0].contentWindow.document.querySelectorAll('style'), i = stylesheets.length - 1; i >= 0; i--) {
			testStyle = stylesheets[i].cloneNode();
			testStyle.innerHTML = stylesheets[i].innerHTML.replace(/(^|;|\{|\}|:)\s+/g,'$1').replace(/\s+(?=\{)|;(?=})/g,'');
			stylesheethtml.push(testStyle.outerHTML);
		}
		closeDialogs();
		element.children[0].contentWindow.document.body.style.fontSize = element.bodyDefaultFontSize;
		localStorage.setItem('HTML-Studio_documentHistoryEntries', JSON.stringify([{
			html: element.children[0].contentWindow.document.body.outerHTML,
			title: element.children[0].contentWindow.document.querySelector('title').innerText,
			action: undefined,
			stylesheets: stylesheethtml
		}]));
		localStorage.setItem('HTML-Studio_stylesheets', JSON.stringify(stylesheethtml));
		localStorage.setItem('HTML-Studio_documentHistoryCurrentEntry', 0);
		location.reload();
	});
	document.getElementById('idr').addEventListener('wheel', function(e) {
		this.delta += Math.min(this.clientHeight / 4, e.deltaY);
		if (this.timeout) return;
		this.delta = 0;
		this.timeout = setTimeout(function() {
			this.timeout = false;
			var rect = this.getBoundingClientRect();
			var xPos = (e.clientX - rect.left) / this.clientWidth * 1.5,
				yPos = (e.clientY - rect.top) / this.clientHeight
			var viewBox = document.getElementById('idq').getAttribute('viewBox').split(' ');
			var delta = this.delta * viewBox[2] / 300;
			viewBox[2] = Math.max(1, Math.min(Math.max.apply(Math, generations) * 60 + 10, +viewBox[2] + delta * 1.5));
			viewBox[3] = Math.max(1, Math.min(generations.length * 80 + 10, viewBox[2] * 2 / 3));
			viewBox[0] = Math.max(0, Math.min(Math.max.apply(Math,generations) * 60 + 10 - viewBox[2], +viewBox[0] - delta * xPos));
			viewBox[1] = Math.max(0, Math.min(generations.length * 80 + 10 - viewBox[3], +viewBox[1] - delta * yPos))
			document.getElementById('idq').setAttribute('viewBox', viewBox.join(' '));
		}.bind(this), 100);
	});




	// window event listeners
	addEventListener('load', function() {
		Array.prototype.forEach.call(document.querySelectorAll('.cl5:not(#idy)'),function(element){
			element.contentWindow.addEventListener('click',function(){
				element.parentNode.dispatchEvent(new MouseEvent('click'));
			});
			element.contentWindow.document.documentElement.style.cursor = 'pointer';
			element.contentWindow.document.body.style.fontSize = '4vh';
		});
		document.getElementById('framecontainer').dispatchEvent(new Event('scroll'));
	});
	addEventListener('mousedown',function(e){
		if (e.shiftKey && e.target.isOverlay) {
			if (document.selection) document.selection.empty(),iframewindow.document.selection.empty();
			else if (getSelection) getSelection().removeAllRanges(),framewindow.getSelection().removeAllRanges();
			e.stopPropagation();
			e.preventDefault();
		}
		if (!document.getElementsByClassName('contextmenu')[0] || (e.target.className && e.target.className.baseVal == undefined && e.target.className.includes('contextmenu'))) return;
		document.getElementsByClassName('contextmenu')[0].close();
		if (sectionopen) {
			Array.prototype.forEach.call(document.getElementsByClassName('headersection'), function(element, index) {
				element.style.background = '';
			});
			sectionopen = false;
		}
	});
	framewindow.addEventListener('load', function() {
		document.getElementById('framecontainer').dispatchEvent(new Event('scroll'));
	});
	function undo () {
		history.currentEntry = Math.max(history.currentEntry - 1, 0);
		framewindow.document.body.outerHTML = history.entries[history.currentEntry].html;
		var title = document.getElementById('title');
		title.value = history.entries[history.currentEntry].title;
		if (!title.value) title.style.fontStyle = 'italic';
		else title.style.fontStyle = '';
		var width = document.getElementById('titlewidth');
		width.innerText = title.value;
		title.style.width = width.scrollWidth + em(.6) + 'px';
		localStorage.setItem('HTML-Studio_stylesheets', JSON.stringify(history.entries[history.currentEntry].stylesheets || []));
		updateStylesheets();
		overlayUpdate();
		localStorage.setItem('HTML-Studio_documentHistoryCurrentEntry', Math.max(+localStorage.getItem('HTML-Studio_documentHistoryCurrentEntry') - 1, 0));
		contextmenus[3].getItem('undo').disabled = !history.currentEntry;
		contextmenus[3].getItem('redo').disabled = history.currentEntry == history.entries.length - 1;
		contextmenus[3].getItem('undo').getElementsByClassName('contextmenuitemtext')[0].innerText = 'Undo' + (history.currentEntry == 0 || !history.entries[history.currentEntry].action ? '' : ' • ' + history.entries[history.currentEntry].action);
		contextmenus[3].getItem('redo').getElementsByClassName('contextmenuitemtext')[0].innerText = 'Redo' + (history.currentEntry + 2 > history.entries.length || !history.entries[history.currentEntry + 1].action ? '' : ' • ' + history.entries[history.currentEntry + 1].action);
		deselect();
	}
	function redo () {
		history.currentEntry = Math.min(history.currentEntry + 1, history.entries.length - 1);
		framewindow.document.body.outerHTML = history.entries[history.currentEntry].html;
		var title = document.getElementById('title');
		title.value = history.entries[history.currentEntry].title;
		title.value = history.entries[history.currentEntry].title;
		if (!title.value) title.style.fontStyle = 'italic';
		else title.style.fontStyle = '';
		var width = document.getElementById('titlewidth');
		width.innerText = title.value;
		title.style.width = width.scrollWidth + em(.6) + 'px';
		localStorage.setItem('HTML-Studio_stylesheets', JSON.stringify(history.entries[history.currentEntry].stylesheets || []));
		updateStylesheets();
		overlayUpdate();
		localStorage.setItem('HTML-Studio_documentHistoryCurrentEntry', Math.min(+localStorage.getItem('HTML-Studio_documentHistoryCurrentEntry') + 1, 10));
		contextmenus[3].getItem('redo').disabled = history.currentEntry == history.entries.length - 1;
		contextmenus[3].getItem('undo').disabled = !history.currentEntry;
		contextmenus[3].getItem('undo').getElementsByClassName('contextmenuitemtext')[0].innerText = 'Undo' + (history.currentEntry == 0 || !history.entries[history.currentEntry].action ? '' : ' • ' + history.entries[history.currentEntry].action);
		contextmenus[3].getItem('redo').getElementsByClassName('contextmenuitemtext')[0].innerText = 'Redo' + (history.currentEntry + 2 > history.entries.length || !history.entries[history.currentEntry + 1].action ? '' : ' • ' + history.entries[history.currentEntry + 1].action);
		deselect();
	}
	// Adds the selected nodes outerHTML to #clipboard
	function prepareCopy(strict) {
		// Copy the outerHTML of the selected nodes and add it to #clipboard
		// Strict copying means the children of the element are not copied into the element
		// unless they are also selected
		// If !strict, all the children of a selected element will be cloned with it,
		// whether or not they are selected.
		// If strict, the child element has to be selected to be cloned
		// Text nodes and comments and other stuff are always copied however since they can't be selected in the editor
		clipboard.value = (function() {
			// Convert selected nodes into array
			var html = '', nodes = Array.prototype.slice.call(document.querySelectorAll('[data-selected-element=selected]'));
			// Function to add children to a parent node only if they are selected
			function addChildren(clone, node) {
				// Iterate over the childnodes of a parent element
				Array.prototype.slice.call(node.childNodes).forEach(function(child) {
					// If the node is an HTML element && either !strict or the element is selected
					if (child.nodeType == 1 && (!strict || child.alias.getAttribute('data-selected-element') == 'selected')) {
						// Clone the child node (but not its children)
						var clonedchild = child.cloneNode();
						// Append the child node to the parent
						clone.appendChild(clonedchild);
						// If the node is in the original `nodes` array, remove it since it's being added already
						// unless shallow == true (shift is being held)
						if (~nodes.indexOf(child.alias)) nodes.splice(nodes.indexOf(child.alias), 1);
						// Iterate over the children of the child node
						addChildren(clonedchild, child);
					} else if (child.nodeType != 1) {
						// The node is not an HTML element and should be added either way
						clone.appendChild(child.cloneNode(true));
					}
				});
			}
			// Iterate over the original `nodes` array
			nodes.forEach(function(selectedNode, index) {
				// Get the required arguments for addChildren()
				var clonednode = selectedNode.alias.cloneNode();
				// Begin the whole process of adding children to a parent node
				addChildren(clonednode, selectedNode.alias);
				// Append the outerHTML (including all the appended children) to `html`
				html += clonednode.outerHTML;
			});
			// Returns `html` to be set as #clipboards innerText
			return html;
		})();

		// Selects clipboard's value
		var target = document.activeElement == iframe ? framewindow.document.activeElement : document.activeElement;
		if (!target.hasAttribute || target == clipboard || ((!target.hasAttribute('contenteditable') || target.getAttribute('contenteditable') == 'false') && target.nodeName != 'INPUT' && target.nodeName != 'TEXTAREA')) clipboard.select();
	}

	// Controls keyboard shortcuts
	function windowkeydown(e) { 
		// Pseudo e.target
		// Since #clipboard is usually selected (to allow for Ctrl + C) and #clipboard is a <textarea>,
		// the e.target has to be changed to document.body
		// Otherwise, none of the command would work
		// It would think the user wants to edit #clipboard when they actually want to edit the document
		// Also if the element doesn't have getAttribute function, it would throw an error, so change that to document.body as well
		// Only keeps #clipboard as target if user is interacting with elements
		var target = (e.target == clipboard && e.keyCode != 88) || !e.target.getAttribute ? document.body : e.target;
		// Ctrl + Z
		if (e.keyCode == 90 && locale.cmdKeyPressed(e) && !dialogOpen() && (!target.hasAttribute('contenteditable') || target.getAttribute('contenteditable') == 'false') && target.nodeName != 'INPUT' && target.nodeName != 'TEXTAREA') undo();
		// Ctrl + Y
		else if (e.keyCode == 89 && locale.cmdKeyPressed(e) && !dialogOpen() && (!target.hasAttribute('contenteditable') || target.getAttribute('contenteditable') == 'false') && target.nodeName != 'INPUT' && target.nodeName != 'TEXTAREA') redo();
		// Ctrl + A
		else if (e.keyCode == 65 && locale.cmdKeyPressed(e) && !dialogOpen() && (!target.hasAttribute('contenteditable') || target.getAttribute('contenteditable') == 'false') && target.nodeName != 'INPUT' && target.nodeName != 'TEXTAREA') {
			e.preventDefault();
			e.stopPropagation();
			forEach(document.querySelectorAll('#frameoverlay, #frameoverlay *'), function() {
				clickhandler.call(this, pseudoEvent.__extend__({set: true}));
			});
			updateTooltip();
			updateTreeSelections();
			selection = Array.prototype.slice.call(document.querySelectorAll('[data-selected-element=selected]'));
		// Ctrl + D
		} else if (e.keyCode == 68 && locale.cmdKeyPressed(e) && !e.shiftKey && !dialogOpen()) {
			e.preventDefault();
			e.stopPropagation();
			deselect();
			updateTooltip();
			updateTreeSelections();
		// Ctrl + O
		} else if (e.keyCode == 79 && locale.cmdKeyPressed(e) && !dialogOpen()) {
			e.preventDefault();
			e.stopPropagation();
			contextmenus[2].getItem('open').dispatchEvent(new MouseEvent('click'));
		// Ctrl + N
		} else if (e.keyCode == 78 && locale.cmdKeyPressed(e) && !dialogOpen()) {
			e.preventDefault();
			e.stopPropagation();
			contextmenus[2].getItem('new').dispatchEvent(new MouseEvent('click'));
		// F11
		} else if (e.keyCode == 122) {
			e.preventDefault();
			e.stopPropagation();
			contextmenus[4].getItem('fullscreen').dispatchEvent(new MouseEvent('click'));
		// Ctrl + B
		} else if (e.keyCode == 66 && locale.cmdKeyPressed(e) && !dialogOpen()) {
			e.preventDefault();
			e.stopPropagation();
			clickhandler.call(overlay, {
				stopPropagation: function(){},
				clientX: 0,
				clientY: Math.round(em(4.45)),
				isTrusted: true,
				shiftKey: e.shiftKey
			});

			updateTooltip();
		// Ctrl + I
		} else if (e.keyCode == 73 && locale.cmdKeyPressed(e) && !dialogOpen()) {
			e.preventDefault();
			e.stopPropagation();
			contextmenus[6].getItem('invert').dispatchEvent(new MouseEvent('click'));
		// Ctrl + Up Arrow
		} else if (e.keyCode == 38 && locale.cmdKeyPressed(e) && !dialogOpen()) {
			e.preventDefault();
			e.stopPropagation();
			contextmenus[1].getItem('selectParent').dispatchEvent(new MouseEvent('click', {shiftKey: e.shiftKey}));
		// Ctrl + Down Arrow
		} else if (e.keyCode == 40 && locale.cmdKeyPressed(e) && !dialogOpen()) {
			e.preventDefault();
			e.stopPropagation();
			contextmenus[1].getItem('selectChildren').dispatchEvent(new MouseEvent('click', {shiftKey: e.shiftKey}));
		// Ctrl + Left Arrow
		} else if (e.keyCode == 37 && locale.cmdKeyPressed(e) && !dialogOpen()) {
			e.preventDefault();
			e.stopPropagation();
			contextmenus[6].getItem('selectPreviousSibling').dispatchEvent(new MouseEvent('click', {shiftKey: e.shiftKey}));
		// Ctrl + Right Arrow
		} else if (e.keyCode == 39 && locale.cmdKeyPressed(e) && !dialogOpen()) {
			e.preventDefault();
			e.stopPropagation();
			contextmenus[6].getItem('selectNextSibling').dispatchEvent(new MouseEvent('click', {shiftKey: e.shiftKey}));
		// Ctrl + X
		} else if (e.keyCode == 88 && locale.cmdKeyPressed(e) && target == clipboard && !dialogOpen()) {
			prepareCopy(e.shiftKey);
			if (e.isTrusted && document.queryCommandSupported('copy')) document.execCommand('copy') && e.stopPropagation() && e.preventDefault();
			userClipboard = clipboard.value;
			var cmi = contextmenus[1].getItem('delete');
			cmi.cut = true;
			cmi.dispatchEvent(new MouseEvent('click'));
		// Del or Backspace
		} else if ((e.keyCode == 46 || e.keyCode == 8) && !dialogOpen() && (target == clipboard || ((!target.hasAttribute('contenteditable') || target.getAttribute('contenteditable') == 'false') && target.nodeName != 'INPUT' && target.nodeName != 'TEXTAREA'))) {
			e.stopPropagation();
			e.preventDefault();
			contextmenus[1].getItem('delete').dispatchEvent(new MouseEvent('click'));
		// Ctrl + Shift + 3 (Ctrl + #)
		} else if (e.keyCode == 51 && locale.cmdKeyPressed(e) && e.shiftKey && !dialogOpen()) {
			e.stopPropagation();
			e.preventDefault();
			contextmenus[0].getItem('editId').dispatchEvent(new MouseEvent('click'));
		// Ctrl + .
		} else if (e.keyCode == 190 && locale.cmdKeyPressed(e) && !dialogOpen()) {
			e.stopPropagation();
			e.preventDefault();
			contextmenus[0].getItem('editClass').dispatchEvent(new MouseEvent('click'));
		// Ctrl + H
		} else if (e.keyCode == 72 && locale.cmdKeyPressed(e) && !dialogOpen()) {
			e.stopPropagation();
			e.preventDefault();
			if (document.querySelectorAll('[data-selected-element="selected"]').length == 1) contextmenus[0].getItem('editHTML').dispatchEvent(new MouseEvent('click'));
			else document.getElementById('htmlNoEdit').className = 'topText active';
		// Ctrl + Shift + D
		} else if (e.keyCode == 68 && locale.cmdKeyPressed(e) && e.shiftKey && !dialogOpen()) {
			e.stopPropagation();
			e.preventDefault();
			contextmenus[0].getItem('duplicate').dispatchEvent(new MouseEvent('click'));
		}

		// Allows Ctrl + C to be handled natively by the browser
		if (locale.cmdKeyPressed(e)) prepareCopy();
	}
	addEventListener('keydown', windowkeydown);
	framewindow.addEventListener('keydown', windowkeydown);
	addEventListener('onfullscreenchange' in window ? 'fullscreenchange' : 'onmozfullscreenchange' in window ? 'mozfullscreenchange' : 'onwebkitfullscreenchange' in window ? 'webkitfullscreenchange' : '', function(e) {
			contextmenus[4].getItem('fullscreen').toggled = (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement);
	});

	// Explicitly adds data to the clipboard in three formats
	addEventListener('copy', function(e) {
		if (e.target != clipboard) return;
		if (clipboard.value) {
			userClipboard = clipboard.value;
			e.clipboardData.setData('text/html', clipboard.value);
			e.clipboardData.setData('text/plain', clipboard.value);
			e.clipboardData.setData('text', clipboard.value);
		}
	});

	addEventListener('paste', function(e) {
		var target = document.activeElement == iframe ? framewindow.document.activeElement : document.activeElement, re = /^Copy_\d+_of_/;
		if (!(target == clipboard || ((!target.hasAttribute('contenteditable') || target.getAttribute('contenteditable') == 'false') && target.nodeName != 'INPUT' && target.nodeName != 'TEXTAREA'))) return;
		try {
			var type = Array.prototype.slice.call(e.clipboardData.types);
			var type = ~type.indexOf('text/html') ? 'text/html' : ~type.indexOf('text/plain') ? 'text/plain' : ~type.indexOf('text') ? 'text' : false;
			if (!type) return;
			var markup = e.clipboardData.getData(type), fragment = document.createElement('template');
			fragment.innerHTML = markup;

			var cache = [], inDoc;
			function changeId(node) {
				if (node.id) {
					node.id = node.id.replace(re, '');
					for (var index = 1; ~cache.indexOf('Copy_' + index + '_of_' + node.id) || (inDoc = framewindow.document.getElementById('Copy_' + index + '_of_' + node.id)); index++) {
						if (inDoc) cache.push('Copy_' + index + '_of_' + node.id);
						inDoc = false;
					}
					cache.push(node.id = 'Copy_' + index + '_of_' + node.id);
				}
				forEach(node.children, changeId);
			}
			changeId(fragment.content);

			var selectedElements = document.querySelectorAll('[data-selected-element=selected]');
			Array.prototype.forEach.call(selectedElements, function(element) {
				element.alias.appendChild(fragment.cloneNode(true).content);
				changeId(fragment.content);
			});
			overlayUpdate();
			history.update('Paste HTML');
			Array.prototype.forEach.call(selectedElements, function(element) {
				clickhandler.call(element.alias.alias, {
					stopPropagation: function(){},
					clientX: 0,
					clientY: Math.round(em(4.45)),
					isTrusted: true,
					shiftKey: true
				});
			});
		} catch (e) {
			if (localStorage.getItem('HTML-Studio_blockNoPaste') != '1') {
				backdialog.style.display = 'block';
				document.getElementById('dialog_no_paste').style.display = 'block';
			}
			if (userClipboard) {
				var markup = userClipboard, fragment = document.createElement('template');
				fragment.innerHTML = markup;

				var cache = [], inDoc;
				function changeId(node) {
					if (node.id) {
						node.id = node.id.replace(re, '');
						for (var index = 1; ~cache.indexOf('Copy_' + index + '_of_' + node.id) || (inDoc = framewindow.document.getElementById('Copy_' + index + '_of_' + node.id)); index++) {
							if (inDoc) cache.push('Copy_' + index + '_of_' + node.id);
							inDoc = false;
						}
						cache.push(node.id = 'Copy_' + index + '_of_' + node.id);
					}
					forEach(node.children, changeId);
				}
				changeId(fragment.content);

				var selectedElements = document.querySelectorAll('[data-selected-element=selected]');
				Array.prototype.forEach.call(selectedElements, function(element) {
					element.alias.appendChild(fragment.cloneNode(true).content);
					changeId(framement.content);
				});
				overlayUpdate();
				history.update('Paste HTML');
				Array.prototype.forEach.call(selectedElements, function(element) {
					clickhandler.call(element.alias.alias, {
						stopPropagation: function(){},
						clientX: 0,
						clientY: Math.round(em(4.45)),
						isTrusted: true,
						shiftKey: true
					});
				});
			}
		}
	})
	addEventListener('resize', function() {
		document.getElementById('overlaygrid').style.height = document.getElementById('rectDisplays').style.height = document.getElementById('frameback').style.height = overlay.getBoundingClientRect().height + 'px';
		var oldSelection = selection.slice();
		overlayUpdate();
		restoreSelection(oldSelection);

		var width = document.getElementById('titlewidth'),
			title = document.getElementById('title');
		width.innerHTML = '&nbsp;<i>Untitled HTML Document</i>&nbsp;';
		title.style.minWidth = Math.min(innerWidth * .85, Math.max(innerWidth / 5, width.scrollWidth)) + 'px';
		width.innerText = title.value;
	});
	addEventListener('unload', function() {
		if (!document.getElementById('overwrite_warning').style.display) localStorage.setItem('HTML-Studio_session', '0');
	});


	forEach(document.querySelectorAll('.headersection.loading, #title.loading'), function(element) {
		element.className = 'headersection';
	});


	// Main interval
	var currentFrame = 0;
	setInterval(function() {
		currentFrame = (currentFrame + 1) % 50;
		var opacity = -Math.abs(currentFrame - 25) + 25, bgcolor = 'rgb(' + opacity * 2 + ',' + Math.round(opacity * 2 + 172) + ',' + Math.round(opacity * 2 + 193) +')', tcolor = 'rgb(' + Math.round((-opacity + 25) * 2.55 + 191) + ',' + Math.round((-opacity + 25) * 2.55 + 191) + ',' + Math.round((-opacity + 25) * 2.55 + 191) +')';
		Array.prototype.forEach.call(document.querySelectorAll('[data-selected-element=selected]'), function(element) {
			element.style[element instanceof SVGElement && element.nodeName.toLowerCase() != 'svg' ? 'fill' : 'background'] = 'rgba(0,172,193,'+(.008*opacity+.15)+')';
		});
		Array.prototype.forEach.call(document.querySelectorAll('[data-html-studio-text-being-edited=true]'), function(element) {
			element.style.boxShadow = '0 0 20px ' + (currentFrame) + 'px rgba(0,172,193,' + (1 - currentFrame / 50) + ')';
		});
		Array.prototype.forEach.call(document.querySelectorAll('html-entity-replacer, html-element-replacer'), function(element) {
			element.style.color = 'rgba(0,172,193,'+(.02*opacity+.5)+')';
			element.style.textShadow = '0 0 1px rgba(0,172,193,' + (.03 * opacity + .25) + ')'
		});

	if (!currentFrame) document.documentElement.scrollTop = document.body.scrollTop = window.scrollY = 0;
	}, 20);


	// Runs if HTML-Studio is already active in another window
	function alreadyActive() {
		document.getElementById('overwrite_warning').style.display = 'block';
	}

	// Runs if the user opens the page on a mobile device
	function userOnMobileDevice() {
		document.getElementById('mobile_warning').style.display = 'block';
	}


	// Updates the overlay after all imgs have finished loading
	// This ensures the overlay is aligned correctly
	// Only calls updateOverlay after the last img has finished loading (or returns a 404 status)
	var imgs = framewindow.document.querySelectorAll('img[src]'), completeimgs = 0;
	if (imgs.length) {
		forEach(imgs, function(img,_,array) {
			// If img is already loaded
			// Includes a second kinda-if statement to test if it was the last img
			if (img.complete) ++completeimgs == array.length && overlayUpdate();
			// If the img has yet to be loaded
			else {
				function func(e) {
					// If the img was the last to be loaded
					if (++completeimgs == array.length) overlayUpdate();
					// Remove event listeners
					this.removeEventListener('load', func);
					this.removeEventListener('error', func);
				}
				// Test for load and error (for 404 srcs)
				img.addEventListener('load', func);
				img.addEventListener('error', func)
			}
		})
	// Runs if no imgs are present
	} else overlayUpdate();
	// Ensure history has at least one entry to start from
	if (!history.entries.length) history.update();

	document.documentElement.scrollTop = document.body.scrollTop = window.scrollY = 0;
};


(function waitUntilLoaded() {
	if (window.HTMLStudio && HTMLStudio.CSSEditor && HTMLStudio.ContextMenu && HTMLStudio.saveAs && window.DraggableElement && window.Blob && !HTMLStudio.initiated) {
		main();
		HTMLStudio.initiated = true;
	} else if (!HTMLStudio.initiated) setTimeout(waitUntilLoaded, 50);
})();

}();