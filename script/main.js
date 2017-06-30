"use strict";


var debug = {
	start: function (ref) {
		var s = performance.now();
		console.log('New Debugger, [',ref,'], started at',Math.round(s*1000)/1000);
		return {
			cur: 0,
			last: s,
			step: function(num) {
				var t=performance.now();
				this.cur += 1;
				this.cur = num || this.cur;
				console.log('Debugger [',ref,'] stepped at',Math.round((t-s)*1000)/1000,'| Step:',this.cur,'| Last:',Math.round((t-this.last)*1000)/1000);
				this.last = t;
			}
		}
	}
}


!function(){

var cssProperties

!function() {
	var request = new XMLHttpRequest();
	request.open('GET', 'script/CSS_properties.json', true);

	request.onreadystatechange = function() {
		if (this.readyState === 4) cssProperties = this.status >= 200 && this.status < 400 ? JSON.parse(this.responseText) : [];
	};

	request.send();
	request = null;
}();

/*! modernizr 3.3.1 (Custom Build) | MIT *
 * https://modernizr.com/download/?-csspositionsticky-setclasses !*/
!function(e,n,s){function t(e,n){return typeof e===n}function o(){var e,n,s,o,a,i,f;for(var c in r)if(r.hasOwnProperty(c)){if(e=[],n=r[c],n.name&&(e.push(n.name.toLowerCase()),n.options&&n.options.aliases&&n.options.aliases.length))for(s=0;s<n.options.aliases.length;s++)e.push(n.options.aliases[s].toLowerCase());for(o=t(n.fn,"function")?n.fn():n.fn,a=0;a<e.length;a++)i=e[a],f=i.split("."),1===f.length?Modernizr[f[0]]=o:(!Modernizr[f[0]]||Modernizr[f[0]]instanceof Boolean||(Modernizr[f[0]]=new Boolean(Modernizr[f[0]])),
Modernizr[f[0]][f[1]]=o),l.push((o?"":"no-")+f.join("-"))}}function a(e){var n=c.className,s=Modernizr._config.classPrefix||"";if(u&&(n=n.baseVal),Modernizr._config.enableJSClass){var t=new RegExp("(^|\\s)"+s+"no-js(\\s|$)");n=n.replace(t,"$1"+s+"js$2")}Modernizr._config.enableClasses&&(n+=" "+s+e.join(" "+s),u?c.className.baseVal=n:c.className=n)}function i(){return"function"!=typeof n.createElement?n.createElement(arguments[0]):u?n.createElementNS.call(n,"http://www.w3.org/2000/svg",arguments[0]):n.createElement.apply(n,
arguments)}var l=[],r=[],f={_version:"3.3.1",_config:{classPrefix:"",enableClasses:!0,enableJSClass:!0,usePrefixes:!0},_q:[],on:function(e,n){var s=this;setTimeout(function(){n(s[e])},0)},addTest:function(e,n,s){r.push({name:e,fn:n,options:s})},addAsyncTest:function(e){r.push({name:null,fn:e})}},Modernizr=function(){};Modernizr.prototype=f,Modernizr=new Modernizr;var c=n.documentElement,u="svg"===c.nodeName.toLowerCase(),p=f._config.usePrefixes?" -webkit- -moz- -o- -ms- ".split(" "):["",""];f._prefixes=p,
Modernizr.addTest("csspositionsticky",function(){var e="position:",n="sticky",s=i("a"),t=s.style;return t.cssText=e+p.join(n+";"+e).slice(0,-e.length),-1!==t.position.indexOf(n)}),o(),a(l),delete f.addTest,delete f.addAsyncTest;for(var m=0;m<Modernizr._q.length;m++)Modernizr._q[m]();e.Modernizr=Modernizr}(window,document);

// Given a reference text node, returns the next text node in the DOM
// Uses the text node passed as an argument, or the text node set as `this`
Text.prototype.nextTextNode = function(arg) {
	function check(node) {
		for (var returnedCheck; node; node = node.nextSibling) {
			if (node.nodeType == 1 && (returnedCheck = check(node.firstChild))) return returnedCheck;
			if (node.nodeType == 3) return node;
		}
	}
	if (!arg && !this) return null;
	var node = (function get(node) {
		if (node.nextSibling) return node.nextSibling;
		if (node.parentNode) return get(node.parentNode);
	})(arg || this);
	if (!node) return null;
	for (var value; node && !(value = check(node)) && node.parentNode; node = node.parentNode.nextSibling);
	return value;
};

Text.prototype.previousTextNode = function(arg) {
	function check(node) {
		for (var returnedCheck; node; node = node.previousSibling) {
			if (node.nodeType == 1 && (returnedCheck = check(node.firstChild))) return returnedCheck;
			if (node.nodeType == 3) return node;
		}
	}
	if (!arg && !this) return null;
	var node = (function get(node) {
		if (node.previousSibling) return node.previousSibling;
		if (node.parentNode) return get(node.parentNode);
	})(arg || this);
	if (!node) return null;
	for (var value; node && !(value = check(node)) && node.parentNode; node = node.parentNode.previousSibling);
	return value;
};

Text.firstChild = function(arg) {
	if (!arg) return null;
	function check(node) {
		if (node.nodeType == 3) return node;
		if (node.nodeType == 1) {
			for (var i = 0, returnedCheck; i < node.childNodes.length; i++) {
				if (returnedCheck = check(node.childNodes[i])) return returnedCheck;
			}
		}
		return null;
	}
	return check(arg);
};

Text.lastChild = function(arg) {
	if (!arg) return null;
	function check(node) {
		if (node.nodeType == 3) return node;
		if (node.nodeType == 1) {
			for (var i = node.childNodes.length - 1, returnedCheck; i >= 0; i--) {
				if (returnedCheck = check(node.childNodes[i])) return returnedCheck;
			}
		}
		return null;
	}
	return check(arg);
};


(window.HTMLStudio = window.HTMLStudio || {}).initiated = false;

function main(){
	/*
		TODO:
		 - Better SVG element positioning
		 - Better grid
		 - Import style sheets
		 - Fix <a> Edit Text auto-blur
		 - Fix Edit Text bottom scrolling bug
		 - Fix Edit as HTML for svg elements
		 - Better svg element handling
		 - Options for saving
		   - Collapsed/Expanded CSS
		   - Save as PDF
		 - Fix CSS rule insertion bug
		 - Fix edit text bug when html-entity-replacing \t or \n
		 - Aria stuff
		 - Background color selector preference
		 - Other preferences
		 - Meta data editor (author, description, keywords, [application name, generator])
		 - Element Selection submenu == Right click context menu
		 - Open Google Docs using file.export to text/html
		 - Open Google Sheets using file.export to text/csv then to <table>
		 - Fix Edit Text showing scroll bars (Match #framecontainer > * height/width with #frameback scrollHeight)
		 - Duplicate multi-element selection
		 - Better toolbar grabber
		 - Better HTML Formatting for white-space (Spec: https://www.w3.org/TR/css-text-3/#white-space-processing)
		 - Support saving to folder (Choose folder from file picker before saving to Drive)
		 - Support export to Google Doc
		 - Better titles
		 - Find (Ctrl + F)
		 - Better .topText and notices
		 - Draggable dialogs from header span only
		 - Fix Draggable Elements stopping on top of overlay iframe
		 - Separate bounding boxes and bounding box size options
		 - Locale keyboard (i.e. Ctrl + Shift + 3 => Ctrl + # using KeyboardEvent.charCode)
		 - Treat <iframe>s as <div>s
		 - Fix '[Right Click] > Edit Attributes/Styles > Save' being moved when blurring an empty row
		 - Some sort of <script> support
		 - Add <base> support
		 - Bind Ctrl + S in certain dialogs
		 - More visible bounding box size <div>s
	*/


	if (HTMLStudio.initiated) return;


	// Returns one em's worth of pixels
	window.em = function(){
		return Math.round(document.getElementById('measurementReference').getBoundingClientRect().height * (arguments.length ? +arguments[0]: 1) * 1000) / 1000 + (arguments[1] ? 'px' : 0);
	}
	// Same for one pt
	window.scrollBar = function(){
		var ref = document.getElementById('measurementReference');
		return Math.round((ref.offsetWidth - ref.scrollWidth) * (arguments.length ? +arguments[0] : 1) * 1000) / 1000;
	}


	// Run on page load
	// Tests if user on mobile
	if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(navigator.userAgent||navigator.vendor||window.opera)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test((navigator.userAgent||navigator.vendor||window.opera).substring(0,4))) userOnMobileDevice();
	var storage = {
			prefix: 'HS',
			set: function(str, val) {
				try {
					localStorage.setItem(storage.prefix + str, JSON.stringify(val));
					return true;
				} catch (e) {
					if (e.code == e.QUOTA_EXCEEDED_ERR) {
						// Storage is full
						var docs = JSON.parse(localStorage.getItem(storage.prefix + 'd')),
							successful = false;

						// Remove last-edited local doc
						forEach(docs, function(_,i) {
							// Skip Google files and current file
							if (this.g || this.u == HTMLStudio.document.u) return;

							successful = i + 1;
							return "break";
						});

						// If a local doc was found, delete and try again
						if (successful) {
							var map = {};
							docs.splice(--successful, 1);
							forEach(docs, function(_,i) {
								map[this.u] = this.i = i;
							});
							localStorage.setItem(storage.prefix + 'u', JSON.stringify(map));
							localStorage.setItem(storage.prefix + 'd', JSON.stringify(docs));
							return storage.set.apply(storage, arguments);
						} else {
							// There are no local docs left to delete
							// Remove last-edited Google doc
							forEach(docs, function(_, i) {
								// Include Google files, skip current file
								if (this.u == HTMLStudio.document.u) return;

								successful = i + 1;
								return "break";
							});

							// If a Google doc was found, delete and try again
							if (successful) {
								var map = {};
								docs.splice(-- successful, 1);
								forEach(docs, function(_, i) {
									map[this.u] = this.i = i;
								});
								localStorage.setItem(storage.prefix + 'u', JSON.stringify(map));
								localStorage.setItem(storage.prefix + 'd', JSON.stringify(docs));
								return storage.set.apply(storage, arguments);
							} else {
								// There are no more documents at all left to delete
								// Show full storage dialog
								openDialog('full_storage');
								if (HTMLStudio.document.o) {
									// This is an offline Google doc
									document.getElementById('iDF').innerText = 'Nothing will be uploaded to Google Drive until you reconnect to the Internet.';
									document.getElementById('iDG').className = 'option disabled';
								} else {
									// This is a local doc
									document.getElementById('iDF').innerText = 'Save the current document to Google Drive to save space in storage and continue editing.';
									document.getElementById('iDG').className = 'option';
								}
								return false;
							}
						}
					} else if (arguments[2]) {
						return false;
					} else {
						return storage.set(str, val, true);
					}
				}
			},
			get: function(str) {
				return JSON.parse(localStorage.getItem(storage.prefix + str));
			},
			delete: function(str) {
				localStorage.removeItem(storage.prefix + str);
				return this;
			}
		},
		iframe = document.getElementById('frame'),
		framewindow = iframe.contentWindow,
		overlayframe = document.getElementById('frameoverlay'),
		overlay = overlayframe.contentWindow.document.body,
		backdialog = document.getElementById('dialogcover'),
		printDisplay = document.getElementById('printDisplay'),
		pseudoEmptyNodes = [],
		history = {
			entries: [],
			update: function(action) {
				var obj = new (function HTMLStudioDocument() {
					this.i = HTMLStudio.document.i;
					this.g = HTMLStudio.document.g;
					this.n = HTMLStudio.document.n;
					this.h = HTMLStudio.document.h;
					this.o = HTMLStudio.document.o;
					this.d = HTMLStudio.document.d;
					this.u = HTMLStudio.document.u;
					this.meta = cloneData(HTMLStudio.document.meta);
					this.originalHTML = HTMLStudio.document.originalHTML;
					this.stylesheets = cloneData(HTMLStudio.document.stylesheets);
					this.html = HTMLStudio.formatHTML.minify(false, framewindow.document.documentElement);
					this.loaded = true;
					this.action = action;
				});

				if (obj.html == (this.entries[this.currentEntry] || {html: ''}).html) return;

				this.currentEntry = this.currentEntry == null ? 0 : this.currentEntry + 1;
				this.entries[this.currentEntry] = obj;
				this.entries = this.entries.slice(0,this.currentEntry + 1);

				// If user is editing as Google doc
				if (HTMLStudio.google.exists() && HTMLStudio.google.signedIn && this.method == 'drive' && this.googleDocId) {

					// Upload to Google
					HTMLStudio.google.upload(
						this.googleDocId, // File ID
						{}, // Empty metadata object
						'<!DOCTYPE html>\n<!-- Created with HTML Studio (https://christianfigueroa.github.io/HTML-Studio) -->\n' + (userPrefs.textFormat == 'prettify' ? '\n' : '') + (userPrefs.textFormat == 'minify' ? HTMLStudio.formatHTML.minify(userPrefs.encodeEntities) : HTMLStudio.formatHTML.prettify({encodeEntities: userPrefs.encodeEntities, indentation: userPrefs.indentation})), // HTML to upload
						function() {
							// Upload was successful
							HTMLStudio.document.g = 1;
							HTMLStudio.document.o = HTMLStudio.document.h = history.googleDocId;
							HTMLStudio.document.update();
						},
						function() {
							// Upload was unsuccessful
							HTMLStudio.document.update({
								g: 0,
								n: document.getElementById('title').value,
								h: HTMLStudio.formatHTML.minify(false, framewindow.document.documentElement)
							});
						}
					);
				} else {
					// Happens if at least one of the following:
					// - the user is not signed in
					// - there is no network connection
					// - the user hasn't assigned a file for the current document
					HTMLStudio.document.update({
						g: 0,
						n: document.getElementById('title').value,
						h: HTMLStudio.formatHTML.minify(false, framewindow.document.documentElement)
					});
				}
				contextmenus[3].getItem('undo').disabled = !this.currentEntry;
				contextmenus[3].getItem('redo').disabled = this.currentEntry == this.entries.length - 1;
				contextmenus[3].getItem('undo').editText('Undo' + (history.currentEntry == 0 || !history.entries[history.currentEntry].action ? '' : ' \u2022 ' + history.entries[history.currentEntry].action));
				contextmenus[3].getItem('redo').editText('Redo' + (history.currentEntry + 2 > history.entries.length || !history.entries[history.currentEntry + 1].action ? '' : ' \u2022 ' + history.entries[history.currentEntry + 1].action));
			},
			method: 'local',
			googleDocId: null,
			changeMethod: function(method, fileId, dontUpdate, callback) {
				if (method == 'drive' && fileId) {
					this.method = 'drive';
					this.googleDocId = fileId;
					HTMLStudio.document.g = 1;
					HTMLStudio.document.o = HTMLStudio.document.h = fileId;
					HTMLStudio.document.update();
					document.getElementById('section_saved_to_drive').className = 'pseudoheadersection';
					HTMLStudio.google.file.get(fileId, function() {
						if (this.status >= 200 && this.status < 300) {
							contextmenus[2].getItem('driveOpen').webViewLink = JSON.parse(this.responseText).webViewLink;
							contextmenus[2].getItem('driveOpen').disabled = false;
						} else {
							contextmenus[2].getItem('driveOpen').disabled = true;
						}
					}, ['webViewLink'])
					if (!dontUpdate) {
						HTMLStudio.google.upload(fileId, {}, '<!DOCTYPE html>\n<!-- Created with HTML Studio (https://christianfigueroa.github.io/HTML-Studio) -->\n' + (userPrefs.textFormat == 'prettify' ? '\n' : '') + (userPrefs.textFormat == 'minify' ? HTMLStudio.formatHTML.minify(userPrefs.encodeEntities) : HTMLStudio.formatHTML.prettify({encodeEntities: userPrefs.encodeEntities, indentation: userPrefs.indentation})), typeof callback == 'function' ? callback : null);
					}
				} else {
					this.method = 'local';
					this.googleDocId = null;
					HTMLStudio.document.g = 0;
					HTMLStudio.document.update();
					if (HTMLStudio.document.o) {
						HTMLStudio.google.file.get(HTMLStudio.document.o, function() {
							if (this.status >= 200 && this.status < 300) {
								contextmenus[2].getItem('driveOpen').webViewLink = JSON.parse(this.responseText).webViewLink;
								contextmenus[2].getItem('driveOpen').disabled = false;
							} else {
								contextmenus[2].getItem('driveOpen').disabled = true;
							}
						}, ['webViewLink']);
					} else {
						contextmenus[2].getItem('driveOpen').disabled = true;
					}
					if (fileId === undefined) document.getElementById('section_saved_to_drive').className = 'pseudoheadersection inactive';
				}
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
					id: 'info',
					condition: function() {
						var node = selection.get.first() || overlay,
							format = formatElementInfo(node.alias),
							re = /(?:([a-z])(?=[A-Z\d])|(\d)(?=[a-zA-Z])|([a-zA-Z\d])(?=[^a-zA-Z\d])|([^a-zA-Z\d])(?=[a-zA-Z\d]))/g;
						this.editText('<span style="font-family:Consolas,Monaco\'Ubuntu Mono\',\'Courier New\',Courier,monospace"><span style="color:#33f">' + format.name.value.replace(re,'$1$2$3$4<wbr>') + '</span>' + (format.id.value ? '<wbr><span style="color:#009">#<wbr>' + format.id.value.replace(re,'$1$2$3$4<wbr>') + '</span>' : '') + (format.class.value ? '<wbr><span style="color:#F44">.<wbr>' + format.class.value.replace(/\s+/g,'.').replace(re,'$1$2$3$4<wbr>') : ''));
						return false;
					}
				},{
					name: 'Open in New Tab',
					func: function(_,close) {
						close();
						var node = selection.get.first();
						if (!node || !(node.alias.nodeName in {a:0,A:0})) return;
						open(node.alias.getAttribute('href'));
					},
					title: 'Opens the link in a new tab',
					disabled: true,
					separate: true,
					hideOnDisabled: true,
					hideSeparatorOnDisabled: true,
					condition: function() {
						var node = selection.get.first();
						if (!node) return;
						this.title = 'Opens the link in a new tab (' + node.alias.href + ')';
						return node.alias.nodeName in {a:0,A:0} && node.alias.href && node.alias.getAttribute('href').trim()[0] != '#';
					},
					image: 'svg/open_in.svg',
					id: 'openLink'
				},{
					name: 'Copy Element',
					func: function(e,close) {
						close();
						prepareCopy(e.shiftKey);
						if (document.queryCommandSupported('copy')) document.execCommand('copy');
						else openDialog('pseudo_paste');
					},
					title: '(' + locale.cmdKey + ' + C) Copies the selected element\n(' + locale.cmdKey + ' + Shift + C) Copies the selected element without its descendants',
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
						} else openDialog('pseudo_paste');
						if (document.activeElement == clipboard) userClipboard = clipboard.value;
					},
					title: '(' + locale.cmdKey + ' + X) Cuts the selected element\n(' + locale.cmdKey + ' + Shift + X) Cuts the selected element without its descendants',
					image: 'svg/cut.svg',
					id: 'cut'
				},{
					name: 'Paste into Element',
					func: function(e,close) {
						close();
						if (document.queryCommandSupported('paste') && document.execCommand('paste')) {
						} else openDialog('pseudo_paste');
					},
					title: '(' + locale.cmdKey + ' + V) Pastes any copied HTML into the selected node',
					image: 'svg/paste.svg',
					separate: true,
					id: 'paste'
				},{
					name: 'Duplicate Element',
					func: function(_,close) {
						close();
						var element = selection.get.first();
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
					image: 'svg/duplicate.svg',
					disabledimage: 'svg/duplicate_disabled.svg',
					disabledtitle: '(' + locale.cmdKey + ' + Shift + D) This element cannot be duplicated',
					separate: true,
					id: 'duplicate',
					condition: function() {
						var node = selection.get.first();
						if (!node) return;
						return node.alias != framewindow.document.body;
					}
				},{
					name: 'Prepend Row',
					func: function(_,close) {
						close();
						var node = selection.get.all();
						if (node.length != 1) return this.disabled = true;
						if ((node = node[0]).nodeName == 'TABLE') forEach(node.children, function() {
							if (this.nodeName in {THEAD:0,TBODY:0,TFOOT:0}) return node = this, "break";
						});
						if (node.nodeName == 'TABLE') {
							var tbody = framewindow.document.createElement('tbody');
							tbody.innerHTML = '<tr><td>&nbsp;</td></tr>';
							node.alias.appendChild(tbody);
							deselect();
							overlayUpdate();
							history.update('Insert Row');
							clickhandler.call(tbody.firstElementChild.alias, pseudoEvent.__extend__({set: true}));
							return;
						} else if (!node.firstElementChild) {
							var tr = framewindow.document.createElement('tr');
							tr.innerHTML = '<td>&nbsp;</td>';
							node.alias.appendChild(tr);
							deselect();
							overlayUpdate();
							history.update('Insert Row');
							clickhandler.call(tr.alias, pseudoEvent.__extend__({set: true}));
							return;
						}
						deselect();
						clickhandler.call(node.firstElementChild, pseudoEvent.__extend__({set: true}));
						contextmenus[0].getItem('insertRowAbove').execute(new MouseEvent('click', {shiftKey: true}), true);
					},
					title: 'Inserts a row at the beginning of the selected element',
					condition: function() {
						var nodes = selection.get.all();
						if (nodes.length != 1) return;
						return nodes[0].nodeName in {table:0,TABLE:0,thead:0,THEAD:0,tbody:0,TBODY:0,tfoot:0,TFOOT:0};
					},
					hideOnDisabled: true,
					id: 'prependRow'
				},{
					name: 'Append Row',
					func: function(_,close) {
						close();
						var node = selection.get.all();
						if (node.length != 1) return this.disabled = true;
						if ((node = node[0]).nodeName == 'TABLE') forEach(node.children, function() {
							if (this.nodeName in {THEAD:0,TBODY:0,TFOOT:0}) return node = this, "break";
						});
						if (node.nodeName == 'TABLE') {
							var tbody = framewindow.document.createElement('tbody');
							tbody.innerHTML = '<tr><td>&nbsp;</td></tr>';
							node.alias.appendChild(tbody);
							deselect();
							overlayUpdate();
							history.update('Insert Row');
							clickhandler.call(tbody.firstElementChild.alias, pseudoEvent.__extend__({set: true}));
							return;
						} else if (!node.firstElementChild) {
							var tr = framewindow.document.createElement('tr');
							tr.innerHTML = '<td>&nbsp;</td>';
							node.alias.appendChild(tr);
							deselect();
							overlayUpdate();
							history.update('Insert Row');
							clickhandler.call(tr.alias, pseudoEvent.__extend__({set: true}));
							return;
						}
						deselect();
						clickhandler.call(node.lastElementChild, pseudoEvent.__extend__({set: true}));
						contextmenus[0].getItem('insertRowBelow').execute(new MouseEvent('click', {shiftKey: true}), true);
					},
					title: 'Inserts a row at the end of the selected element',
					condition: function() {
						var nodes = selection.get.all();
						if (nodes.length != 1) return;
						return nodes[0].nodeName in {table:0,TABLE:0,thead:0,THEAD:0,tbody:0,TBODY:0,tfoot:0,TFOOT:0};
					},
					hideOnDisabled: true,
					id: 'appendRow'
				},{
					name: 'Prepend Column',
					func: function(_,close) {
						close();
						var node = selection.get.all();
						if (node.length != 1) return this.disabled = true;
						if ((node = node[0]).nodeName == 'TABLE') forEach(node.children, function() {
							if (this.nodeName in {THEAD:0,TBODY:0,TFOOT:0}) return node = this, "break";
						});
						if (node.nodeName == 'TABLE') {
							var tbody = framewindow.document.createElement('tbody');
							tbody.innerHTML = '<tr><td>&nbsp;</td></tr>';
							node.alias.appendChild(tbody);
							deselect();
							overlayUpdate();
							history.update('Insert Column');
							clickhandler.call(tbody.firstElementChild.firstElementChild.alias, pseudoEvent.__extend__({set: true}));
							return;
						} else if (!node.firstElementChild) {
							var tr = framewindow.document.createElement('tr');
							tr.innerHTML = '<td>&nbsp;</td>';
							node.alias.appendChild(tr);
							deselect();
							overlayUpdate();
							history.update('Insert Column');
							clickhandler.call(tr.firstElementChild.alias, pseudoEvent.__extend__({set: true}));
							return;
						}
						deselect();
						clickhandler.call(node.firstElementChild.firstElementChild, pseudoEvent.__extend__({set: true}));
						contextmenus[0].getItem('insertColLeft').execute(new MouseEvent('click', {shiftKey: true}), true);
					},
					title: 'Inserts a column at the beginning of the selected element',
					condition: function() {
						var nodes = selection.get.all();
						if (nodes.length != 1) return;
						return nodes[0].nodeName in {table:0,TABLE:0,thead:0,THEAD:0,tbody:0,TBODY:0,tfoot:0,TFOOT:0};
					},
					hideOnDisabled: true,
					id: 'prependCol'
				},{
					name: 'Append Column',
					func: function(_,close) {
						close();
						var node = selection.get.all();
						if (node.length != 1) return this.disabled = true;
						if ((node = node[0]).nodeName == 'TABLE') forEach(node.children, function() {
							if (this.nodeName in {THEAD:0,TBODY:0,TFOOT:0}) return node = this, "break";
						});
						if (node.nodeName == 'TABLE') {
							var tbody = framewindow.document.createElement('tbody');
							tbody.innerHTML = '<tr><td>&nbsp;</td></tr>';
							node.alias.appendChild(tbody);
							deselect();
							overlayUpdate();
							history.update('Insert Column');
							clickhandler.call(tbody.firstElementChild.firstElementChild.alias, pseudoEvent.__extend__({set: true}));
							return;
						} else if (!node.firstElementChild) {
							var tr = framewindow.document.createElement('tr');
							tr.innerHTML = '<td>&nbsp;</td>';
							node.alias.appendChild(tr);
							deselect();
							overlayUpdate();
							history.update('Insert Column');
							clickhandler.call(tr.firstElementChild.alias, pseudoEvent.__extend__({set: true}));
							return;
						}
						var info = {};
						// Store <table> in info
						info.table = node.alias.parentNode.nodeName == 'TABLE' ? node.alias.parentNode : null;
						if (!info.table) return;
						// Store the rows of the table
						info.rows = Array.prototype.slice.call(info.table.rows);

						// The following stores each table cell 
						// Increases the length of all the row arrays so that they are always the same length (as a table should be)
						function length(num) {
							forEach(info.cells, function() {
								while (this.length < num) {
									this.push([]);
								}
							});
						}
						// Used to append a <td> to a <tr>
						// Places the <td> in the next unoccupied slot in the <tr>
						// Or force places it in a certain spot if an index is provided
						// which helps with intersecting cells and cells with rowSpan > 1
						// Automatically expands the array using length function above if the row runs out of spots
						function push(row, item, index) {
							if (index == -1 || !arguments[2]) {
								for (var i = 0, r; i < row.length; i++) {
									if (row[i].length) continue;
									r = row[i].push(item);
									return i + 1;
								}
								if (!r) return length(i + 1), row[i].push(item), i + 1;
							} else {
								return length(index + 1), row[index].push(item), index + 1;
							}
						};
						// Create array of arrays where each sub-array represents a <tr>
						info.cells = info.rows.map(function(){return[]});
						// Fill in the cells using a bunch of for loops
						// All the for loops allow for rowSpan and colSpan and intersecting cells
						forEach(info.rows, function(row, ind) {
							forEach(row.children, function(_,i) {
								for (var j = 0, q; j < this.rowSpan; j++) {
									if (info.rows[ind + j]) {
										for (var n = this.colSpan - 1, p = q || -1; n >= 0; n--) {
											p = push(info.cells[ind + j], this, p);
											if (j == 0 && n == this.colSpan - 1) q = p - 1;
										}
									}
								}
							});
						});

						deselect();

						forEach(info.cells, function() {
							if (this[this.length - 1].length) return clickhandler.call(this[this.length - 1][0].alias, pseudoEvent.__extend__({set: true})), contextmenus[0].getItem('insertColRight').execute(new MouseEvent('click', {shiftKey: true}), true), "break";
						});
					},
					title: 'Inserts a column at the end of the selected element',
					condition: function() {
						var nodes = selection.get.all();
						if (nodes.length != 1) return;
						return nodes[0].nodeName in {table:0,TABLE:0,thead:0,THEAD:0,tbody:0,TBODY:0,tfoot:0,TFOOT:0};
					},
					hideOnDisabled: true,
					hideSeparatorOnDisabled: true,
					separate: true,
					id: 'appendCol'
				},{
					name: 'Insert Row Above',
					func: function(e,close) {
						close();
						contextmenus[1].getItem('insertRowAbove').execute(e, true);
					},
					title: 'Inserts a row above the selected element\n(Shift to ignore merged cells)',
					condition: function() {
						var nodes = selection.get.all();
						if (nodes.length != 1) return;
						return nodes[0].nodeName in {td:0,TD:0,tr:0,TR:0};
					},
					hideOnDisabled: true,
					id: 'insertRowAbove'
				},{
					name: 'Insert Row Below',
					func: function(e,close) {
						close();
						contextmenus[1].getItem('insertRowBelow').execute(e, true);
					},
					title: 'Inserts a row below the selected element\n(Shift to ignore merged cells)',
					condition: function() {
						var nodes = selection.get.all();
						if (nodes.length != 1) return;
						return nodes[0].nodeName in {td:0,TD:0,tr:0,TR:0};
					},
					separateCondition: function() {
						if (this.disabled) return false;
						var nodes = selection.get.all();
						if (nodes.length != 1) return;
						return !(nodes[0].nodeName in {td:0,TD:0,col:0,COL:0,colgroup:0,COLGROUP:0});
					},
					hideOnDisabled: true,
					separate: true,
					id: 'insertRowBelow'
				},{
					name: 'Insert Column Left',
					func: function(e,close) {
						close();
						contextmenus[1].getItem('insertColLeft').execute(e, true);
					},
					title: 'Inserts a column to the left of the selected element',
					condition: function() {
						var nodes = selection.get.all();
						if (nodes.length != 1) return;
						return nodes[0].nodeName in {td:0,TD:0,col:0,COL:0,colgroup:0,COLGROUP:0};
					},
					hideOnDisabled: true,
					id: 'insertColLeft'
				},{
					name: 'Insert Column Right',
					func: function(e,close) {
						close();
						contextmenus[1].getItem('insertColRight').execute(e, true);
					},
					title: 'Inserts a column to the right of the selected element',
					condition: function() {
						var nodes = selection.get.all();
						if (nodes.length != 1) return;
						return nodes[0].nodeName in {td:0,TD:0,col:0,COL:0,colgroup:0,COLGROUP:0};
					},
					hideOnDisabled: true,
					hideSeparatorOnDisabled: true,
					separate: true,
					id: 'insertColRight'
				},{
					name: 'Edit Text',
					image: 'svg/edit_text.svg',
					disabledimage: 'svg/edit_text_disabled.svg',
					func: function(_,close) {
						close();
						var element = selection.get.first();
						if (!element) return;
						var boxshadow = element.alias.style.boxShadow, pendingUpdate = false,
							contenteditable = element.alias.hasAttribute('contenteditable') ? element.alias.getAttribute('contenteditable') : false,
							hasBlurred = false,
							originalScrollTop = document.getElementById('framecontainer').scrollTop,
							elementAlias = element.alias;
						// Makes element contenteditable
						element.alias.setAttribute('contenteditable','');
						// Prevent the user from interacting with the overlay
						overlayframe.style.pointerEvents = 'none';
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
								pre: /(?=(?:<\\?[a-zA-Z:_](?:\\\.|\\?[a-zA-Z\d:_-])*(?:\[\\?[a-zA-Z:_](?:\\?[a-zA-Z\d:_.-])*(?:=(?:"(?:[^\\"]|\\.)*"|'(?:[^\\']|\\.)*'|(?:[^"'\\\]]|\\.)(?:\\.|[^\]])*))?]|\.(?:[^{[#.\\]|\\.)+|#(?:[^{[#.\\]|\\.)+|\{(?:"(?:[^\\"]|\\.)*"|'(?:[^\\']|\\.)*'|(?:[^"'\\]|\\.)(?:\\.|[^}])*)})*>|&(?:(?:[A-Za-z]+|#\d+|#x[A-Fa-f\d]+)(?:;|(?=\s)|$))))/g,
								post: /(?:<\\?[a-zA-Z:_](?:\\\.|\\?[a-zA-Z\d:_-])*(?:\[\\?[a-zA-Z:_](?:\\?[a-zA-Z\d:_.-])*(?:=(?:"(?:[^\\"]|\\.)*"|'(?:[^\\']|\\.)*'|(?:[^"'\\\]]|\\.)(?:\\.|[^\]])*))?]|\.(?:[^{[#.\\]|\\.)+|#(?:[^{[#.\\]|\\.)+|\{(?:"(?:[^\\"]|\\.)*"|'(?:[^\\']|\\.)*'|(?:[^"'\\]|\\.)(?:\\.|[^}])*)})*>|&(?:(?:[A-Za-z]+|#\d+|#x[A-Fa-f\d]+)(?:;|(?=\s)|$)))/g,
								entity: /&(?:(?:[A-Za-z]+|#\d+|#x[A-Fa-f\d]+)(?:;|(?=\s)|$))/,
								tag: /<\\?[a-zA-Z:_](?:\\\.|\\?[a-zA-Z\d:_-])*(?:\[\\?[a-zA-Z:_](?:\\?[a-zA-Z\d:_.-])*(?:=(?:"(?:[^\\"]|\\.)*"|'(?:[^\\']|\\.)*'|(?:[^"'\\\]]|\\.)(?:\\.|[^\]])*))?]|\.(?:[^{[#.\\]|\\.)+|#(?:[^{[#.\\]|\\.)+|\{(?:"(?:[^\\"]|\\.)*"|'(?:[^\\']|\\.)*'|(?:[^"'\\]|\\.)(?:\\.|[^}])*)})*>/,
								tag_name: /<([a-zA-Z:_](?:\\\.|\\?[a-zA-Z\d:_-])*)/,
								attrs: /<[a-zA-Z:_](?:\\\.|\\?[a-zA-Z\d:_-])*((?:\[\\?[a-zA-Z:_](?:\\?[a-zA-Z\d:_.-])*(?:=(?:"(?:[^\\"]|\\.)*"|'(?:[^\\']|\\.)*'|(?:[^"'\\\]]|\\.)(?:\\.|[^\]])*))?]|\.(?:[^{[#.\\]|\\.)+|#(?:[^{[#.\\]|\\.)+|\{(?:"(?:[^\\"]|\\.)*"|'(?:[^\\']|\\.)*'|(?:[^"'\\]|\\.)(?:\\.|[^}])*)})*)>/,
								getAttr: /\[\\?[a-zA-Z:_](?:\\?[a-zA-Z\d:_.-])*(?:=(?:"(?:[^\\"]|\\.)*"|'(?:[^\\']|\\.)*'|(?:[^"'\\\]]|\\.)(?:\\.|[^\]])*))?]|\.(?:[^{[#.\\]|\\.)+|#(?:[^{[#.\\]|\\.)+|\{(?:"(?:[^\\"]|\\.)*"|'(?:[^\\']|\\.)*'|(?:[^"'\\]|\\.)(?:\\.|[^}])*)}/g,
								divide: /\[(\\?[a-zA-Z:_](?:\\?[a-zA-Z\d:_.-])*)(?:=("(?:[^\\"]|\\.)*"|'(?:[^\\']|\\.)*'|(?:[^"'\\\]]|\\.)(?:\\.|[^\]])*))?]/
							},
							// Used for testing if the entity actually translates into something
							testElement = document.createElement('span'),
							// Used for styling later
							opacity = -Math.abs(currentFrame - 25) + 25,
							vh = framewindow.innerHeight / 100,
							vw = framewindow.innerWidth / 100,
							scrollTop = document.getElementById('framecontainer').scrollTop,
							symbol = {
								entity: Symbol(),
								element: Symbol()
							};
						pseudoEmptyNodes = [];
						// Update tooltip to show what user is editing
						updateTooltip('Editing text of ' + formatElementInfo(element.alias), true);

						// Runs when the element is blurred
						function blur() {
							if (hasBlurred || preventEditTextBlurring) return;
							// Browsers sometimes add an extra <br> to the end of the element for no reason
							// This deletes that redundant <br>
							if (element.alias.childNodes.length > element.alias.alias.childNodes.length && element.alias.lastChild.nodeName == 'BR') element.alias.removeChild(element.alias.lastChild);
							element.alias.blurred = true;

							// Makes #edittextbar disappear
							document.getElementById('edittextbar').className = '';

							// Restores the element's original contenteditable attribute
							if (contenteditable === false) element.alias.removeAttribute('contenteditable');
							else element.alias.setAttribute('contenteditable', contenteditable);
							// Allows the user to continue interacting with the overlay
							overlayframe.style.pointerEvents = '';
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
							// Update the tooltip
							updateTooltip(null, false);
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
								replacee = document.createElement(this.tag_name),
								tempAttr = (function(tempAttr) {
									for (tempAttr = tempAttr.replace('.',''); framewindow.document.querySelector('[' + tempAttr + ']') || tempAttr in this.tag_attrs; tempAttr += (Math.random() * 10 + '').replace('.',''));
										return tempAttr;
								}).call(this, 'data-html-studio-placeholder-' + Math.random() * 10);
							this.tag_attrs[tempAttr] = '';
							replacee.appendChild(document.createTextNode(this.tag_attrs[this.attr_symbol] || '[Inserted Element]'));
							frag.appendChild(document.createTextNode(origText.substring(0, this.charIndex)));
							frag.appendChild(replacee);
							frag.appendChild(document.createTextNode(origText.substring(this.charIndex + this.tagLength)));
							for (var attribute in this.tag_attrs) {
								if (typeof attribute != 'string') continue;
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
									if (!framewindow.document.execCommand('insertHTML', null, frag.firstElementChild.outerHTML)) return replace.call(this,true);
									// Select the new element
									if (document.getSelection && document.createRange) {
										var selection = framewindow.getSelection();
										var range = framewindow.document.createRange(),
											element = framewindow.document.querySelector('[' + tempAttr + ']');
										element = element || selection.anchorNode;
										if (element.nodeType == 3) {
											range.setStart(element, this.charIndex);
											range.setEnd(element, this.charIndex + (this.tag_attrs[this.attr_symbol] || '[Inserted Element]').length);
										} else if (element.nodeType == 1 && element.nodeName.toLowerCase() == this.tag_name.toLowerCase()) {
											range.selectNodeContents(element)
											element.removeAttribute(tempAttr);
										}
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
							if (!node) return;
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
								// Combine adjacent child text nodes
								for (var child = node.firstChild; child; child = child.nextSibling) {
									if (child.nodeType == 3 && child.nextSibling && child.nextSibling.nodeType == 3) {
										// Add to current node's text content
										child.textContent += child.nextSibling.textContent;
										// Remove other text node
										child.parentNode.removeChild(child.nextSibling);
										// Do this again in case there are 3+ adjacent nodes
										child = {nextSibling: child};
									}
								}

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
								clone.style.fontSize = getComputedStyle(node).fontSize;

								if ((clone instanceof clone.ownerDocument.defaultView.SVGElement || clone.ownerSVGElement) && clone.nodeName.toLowerCase() != 'svg') {
									clone.style.fill = 'transparent';
									clone.style.stroke = 'transparent';
									clone.setAttribute('fill', 'rgba(0,0,0,0)');
									clone.setAttribute('stroke', 'rgba(0,0,0,0)');
								} else {
									clone.style.background = 'transparent';
									clone.style.borderColor = 'transparent';
								}

								clone.removeAttribute('data-selected-element');
								clone.removeAttribute('data-html-studio-placeholder');
								clone.removeAttribute('data-html-studio-entity-replacer');
								clone.removeAttribute('data-html-studio-element-replacer');
								if (clone != elementAlias.alias) clone.removeAttribute('data-html-studio-text-being-edited');
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

							if (clone.style && node.style) clone.style.fontSize = getComputedStyle(node).fontSize;

							// Iterate over all the element's childNodes
							// Slice the NodeList to prevent it from changing length as it is iterated upon
							forEach(Array.prototype.slice.call(clone.childNodes), function(child, index) {
								// Check if node is text node and includes a possible replacer sequence
								if (child.nodeType == 3 && (child.textContent.includes("&") || regex.tag.test(child.textContent))) {
									// Keeps track of how many character precede replacer
									var charIndex = 0;

									// Splits strings right before an entity or tag
									// e.g. "filler&nbsp;filler" ==> ["filler", "&nbsp;filler"]
									// "filler<code>filler" ==> ["filler", "<code>filler"]
									var before = child.textContent.split(regex.pre), array = [];
									// Get the entity for each string
									before.forEach(function(str, ind) {
										// Discard empty strings
										if (!str) return;
										// Match the entity/tag
										var object = str.match(regex.post);
										// This happens if the text node contains no entities
										if (!object) return array.push({object: false, val: str});
										// Get the actual match instead of an array
										object = object[0];
										// Add to an array that keeps the entire string in order
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
												// Create a replacer element
												var replacer = document.createElement('span'), character;
												replacer.setAttribute('data-html-studio-entity-replacer', '');
												replacer[symbol.entity] = true;
												replacer.style.pointerEvents = 'initial';
												replacer.style.cursor = 'pointer';
												// Store it in the array
												array[ind] = replacer
												// Set the innerText to the original sequence
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
											// Create a replacer element
											var replacer = document.createElement('span');
											replacer.setAttribute('data-html-studio-element-replacer','')
											replacer[symbol.element] = true;
											replacer.style.pointerEvents = 'initial';
											replacer.style.cursor = 'pointer';
											// Store it in the array
											array[ind] = replacer;
											// Set the innerText to the original sequence
											replacer.innerText = str.val;
											// Sets attributes that are used when the replacer is clicked on
											replacer.alias = node.childNodes[index];
											replacer.charIndex = charIndex;
											replacer.tagLength = str.val.length;
											replacer.tag_name = str.val.match(regex.tag_name)[1].replace(/\\(.)/g,'$1');
											replacer.attr_symbol = Symbol();
											replacer.tag_attrs = (function() {
												// Keeps track of attributes using name-value pairs
												var obj = {};
												// Gets all the attributes from the sequence
												var attrs = str.val.match(regex.attrs)[1];
												// If there are no attributes, return an empty object
												if (!attrs) return obj;
												forEach(attrs.match(regex.getAttr), (function(attribute) {
													if (attribute[0] == '.') {
														var value = attribute.substring(1).replace(/\\(.)/g, '$1');
														obj.class = obj.class ? obj.class + ' ' + value : value;
													} else if (attribute[0] == '#') {
														obj.id = attribute.substring(1).replace(/\\(.)/g, '$1');
													} else if (attribute[0] == '{') {
														var value = attribute.substring(1, attribute.length - 1);
														if (value[0] == '"' || value[0] == "'") value = value.substring(1, value.length - 1);
														obj[replacer.attr_symbol] = value.replace(/\\(.)/g, '$1');
													} else {
														var values = attribute.match(regex.divide),
															name = values[1],
															value = values[2] || '';
														if (value[0] == '"' || value[0] == "'") value = value.substring(1, value.length - 1);
														obj[name] = value.replace(/\\(.)/g, '$1');
													}
												}));
												return obj;
											})();

											// Configures the replacer
											// Adds a title so the user can see which tag it will be replaced with
											replacer.title = 'Click to replace with <' + replacer.tag_name + '>';
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

							// Combine adjacent child text nodes
							for (var child = element.alias.firstChild; child; child = child.nextSibling) {
								if (child.nodeType == 3 && child.nextSibling && child.nextSibling.nodeType == 3) {
									// Add to current node's text content
									child.textContent += child.nextSibling.textContent;
									// Remove other text node
									child.parentNode.removeChild(child.nextSibling);
									// Do this again in case there are 3+ adjacent nodes
									child = {nextSibling: child};
								}
							}
							if (element == overlay) {
								// Can't get a speed boost from using a document fragment
								// since we are reusing the same base element (overlay <body>) each time
								element.innerHTML = element.alias.innerHTML;
								createReplacers(element, element.alias);
							} else {
								// fragment and clone are used as opposed to the actual DOM since DocumentFragments run faster
								var fragment = document.createDocumentFragment();

								if (!element.parentNode) return;
								var clone = element.cloneNode(true);
								fragment.appendChild(clone);
								// Runs a more efficient overlayUpdate() that starts from the element being edited
								// The rest of the overlay is unaffected since it's not being edited
								clone.innerHTML = element.alias.innerHTML;
								createReplacers(clone, element.alias);
								

								clone.alias = element.alias;
								clone.DOM = element.DOM;
								element.parentNode.replaceChild(clone, element);
								element = clone;
							}

							onClick.call(this);

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
								if (!selection.isCollapsed && selection.anchorNode != selection.focusNode) return document.getElementById('framecontainer').scrollTop = scrollTop;

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
								focusedNode[symbol.entity] && onClickEntityReplacer.call(focusedNode, pseudoEvent) || focusedNode[symbol.element] && onClickTagReplacer.call(focusedNode, pseudoEvent);
							// Ctrl + I
							} else if (e.type == 'keydown' && e.keyCode == 73 && locale.cmdKeyPressed(e)) {
								if (framewindow.document.queryCommandSupported('italic')) framewindow.document.execCommand('italic');
							// Ctrl + B
							} else if (e.type == 'keydown' && e.keyCode == 66 && locale.cmdKeyPressed(e)) {
								if (framewindow.document.queryCommandSupported('bold')) framewindow.document.execCommand('bold');
							// Ctrl + U
							} else if (e.type == 'keydown' && e.keyCode == 85 && locale.cmdKeyPressed(e)) {
								if (framewindow.document.queryCommandSupported('underline')) framewindow.document.execCommand('underline');
							// Ctrl + =
							} else if (e.type == 'keydown' && e.keyCode == 187 && locale.cmdKeyPressed(e) && e.shiftKey) {
								if (framewindow.document.queryCommandSupported('superscript')) framewindow.document.execCommand('superscript');
							// Ctrl + Shift + =
							} else if (e.type == 'keydown' && e.keyCode == 187 && locale.cmdKeyPressed(e)) {
								if (framewindow.document.queryCommandSupported('subscript')) framewindow.document.execCommand('subscript');
							// Ctrl + Shift + L
							} else if (e.type == 'keyup' && e.keyCode == 76 && locale.cmdKeyPressed(e) && e.shiftKey) {
								for (var node = framewindow.document.getSelection().anchorNode.parentNode; !(node.style.display in {block:0,'inline-block':0} || getComputedStyle(node).display in {block:0,'inline-block':0} || node == this); node = node.parentNode);
								node.style.textAlign = 'left';
								node.alias.style.textAlign = 'left';
							// Ctrl + Shift + E
							} else if (e.type == 'keyup' && e.keyCode == 69 && locale.cmdKeyPressed(e) && e.shiftKey) {
								for (var node = framewindow.document.getSelection().anchorNode.parentNode; !(node.style.display in {block:0,'inline-block':0} || getComputedStyle(node).display in {block:0,'inline-block':0} || node == this); node = node.parentNode);
								node.style.textAlign = 'center';
								node.alias.style.textAlign = 'center';
							// Ctrl + Shift + R
							} else if (e.type == 'keyup' && e.keyCode == 82 && locale.cmdKeyPressed(e) && e.shiftKey) {
								for (var node = framewindow.document.getSelection().anchorNode.parentNode; !(node.style.display in {block:0,'inline-block':0} || getComputedStyle(node).display in {block:0,'inline-block':0} || node == this); node = node.parentNode);
								node.style.textAlign = 'right';
								node.alias.style.textAlign = 'right';
							// Ctrl + Shift + J
							} else if (e.type == 'keyup' && e.keyCode == 74 && locale.cmdKeyPressed(e) && e.shiftKey) {
								for (var node = framewindow.document.getSelection().anchorNode.parentNode; !(node.style.display in {block:0,'inline-block':0} || getComputedStyle(node).display in {block:0,'inline-block':0} || node == this); node = node.parentNode);
								node.style.textAlign = 'justify';
								node.alias.style.textAlign = 'justify';
							// Ctrl + Shift + >
							} else if (e.type == 'keydown' && e.keyCode == 190 && e.shiftKey) {
								document.getElementById('etopt_increase_font').dispatchEvent(new MouseEvent('click'));
							// Ctrl + Shift + <
							} else if (e.type == 'keydown' && e.keyCode == 188 && e.shiftKey) {
								document.getElementById('etopt_decrease_font').dispatchEvent(new MouseEvent('click'));
							}
							document.getElementById('framecontainer').scrollTop = scrollTop;
						}

						function keyPressWrapper(e) {
							scrollTop = document.getElementById('framecontainer').scrollTop;
							if (e.keyCode == 9 && !e.shiftKey || e.keyCode == 66 && locale.cmdKeyPressed(e) || e.keyCode == 69 && locale.cmdKeyPressed && e.shiftKey || e.keyCode == 73 && locale.cmdKeyPressed(e) || e.keyCode == 74 && locale.cmdKeyPressed(e) && e.shiftKey || e.keyCode == 76 && locale.cmdKeyPressed(e) && e.shiftKey || e.keyCode == 82 && locale.cmdKeyPressed(e) && e.shiftKey || e.keyCode == 187 && locale.cmdKeyPressed(e) || e.keyCode == 85 && locale.cmdKeyPressed(e)) { 
								e.preventDefault();
								e.stopPropagation();
							}

							setTimeout(function() {
								keypress.call(this, e);
							}.bind(this),0);
						}

						function onClick() {
							setTimeout(function() {
								document.getElementById('etopt_bold').className = framewindow.document.queryCommandState('bold') ? 'edittextopt active' : 'edittextopt';
								document.getElementById('etopt_italic').className = framewindow.document.queryCommandState('italic') ? 'edittextopt active' : 'edittextopt';
								document.getElementById('etopt_underline').className = framewindow.document.queryCommandState('underline') ? 'edittextopt active' : 'edittextopt';
								document.getElementById('etopt_superscript').className = framewindow.document.queryCommandState('superscript') ? 'edittextopt active' : 'edittextopt';
								document.getElementById('etopt_subscript').className = framewindow.document.queryCommandState('subscript') ? 'edittextopt active' : 'edittextopt';
								for (var node = framewindow.document.getSelection().anchorNode.parentNode; !(node.style.display in {block:0,'inline-block':0} || getComputedStyle(node).display in {block:0,'inline-block':0} || node == this); node = node.parentNode);
								var alignment = node.style.textAlign || getComputedStyle(node).textAlign;
								document.getElementById('etopt_justify_left').className = alignment == 'left' ? 'edittextopt active' : 'edittextopt';
								document.getElementById('etopt_justify_center').className = alignment == 'center' ? 'edittextopt active' : 'edittextopt';
								document.getElementById('etopt_justify_right').className = alignment == 'right' ? 'edittextopt active' : 'edittextopt';
								document.getElementById('etopt_justify_full').className = alignment == 'justify' ? 'edittextopt active' : 'edittextopt';
							}.bind(this), 0);
						}

						// Add some events for blurring the element
						element.alias.addEventListener('blur', blur);
						element.alias.addEventListener('dblclick', blur);
						// Adds the events for keypress and keyup
						element.alias.addEventListener('keydown', keyPressWrapper);
						element.alias.addEventListener('mousedown', onClick);
						element.alias.addEventListener('touchstart', onClick);

						element.alias.addEventListener('keyup', keypress);

						// Fires a key event to look for any HTML entities as soon as the user focuses the element
						// instead of waiting for the user to press a key
						keypress.call(element.alias, {});
						// Makes #edittextbar appear
						document.getElementById('edittextbar').className = 'active';
						document.getElementById('framecontainer').scrollTop = originalScrollTop;
					},
					title: '(Double Click) Lets you edit the element\'s textual content',
					disabledtitle: '(Double Click) This element cannot contain textual content',
					condition: function() {
						var node = selection.get.first();
						if (!node) return;
						return !(node instanceof node.ownerDocument.defaultView.SVGElement || node.ownerSVGElement || /^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i.test(node.nodeName));
					},
					id: 'editText'
				},{
					name: 'Edit as HTML&#133;',
					image: 'svg/edit_as_html.svg',
					func: function(_,close) {
						close();
						var element = selection.get.first();
						if (!element) return;
						var idf = document.getElementById('idf');
						idf.value = HTMLStudio.formatHTML.prettify(element.alias, element.alias == framewindow.document.body);
						idf.linkedElement = element.alias;
						idf.dispatchEvent(new KeyboardEvent('keydown'));
						openDialog('edit_html');
					},
					title: '(' + locale.cmdKey + ' + H) Lets you edit the node\'s HTML',
					separate: true,
					condition: function() {
						var node = selection.get.first();
						if (!node) return;
						this.editText((node.alias instanceof node.alias.ownerDocument.defaultView.SVGElement || node.alias.ownerSVGElement) && node.alias.nodeName.toLowerCase() != 'svg' ? 'Edit as XML&#133;' : 'Edit as HTML&#133;');
						return true;
					},
					id: 'editHTML'
				},{
					name: 'Edit <span style="font-family:Consolas,Monaco,\'Ubuntu Mono\',\'Courier New\',Courier,monospace;">src</span> Attribute',
					func: function(_,close) {
						close();
						var editor = document.getElementById('attrEditor'), Idk = document.getElementById('Idk'), elements = selection.get.all();
						if (!elements.length) return;
						closeTopTexts();
						if (elements.length > 1) {
							document.getElementById('attrNoEdit').className = 'topText active';
						} else {
							if (!(elements[0].alias.nodeName == 'IMG')) return true;
							editor.className = 'topText active';
							Idk.element = elements[0].alias;
							Idk.value = elements[0].alias.getAttribute('src') || '';
							Idk.placeholder = 'Edit src';
							Idk.focus();
						}
					},
					title: '(' + locale.cmd + ' + Shift + 8) Lets you quickly edit the element\'s src attribute',
					image: 'svg/edit_attr_s.svg',
					disabled: true,
					hideOnDisabled: true,
					condition: function() {
						var node = selection.get.first();
						if (!node) return;
						return node.alias.nodeName == 'IMG';
					},
					id: 'editSrc'
				},{
					name: 'Edit <span style="font-family:Consolas,Monaco,\'Ubuntu Mono\',\'Courier New\',Courier,monospace;">href</span> Attribute',
					func: function(_,close) {
						close();
						var editor = document.getElementById('attrEditor'), Idk = document.getElementById('Idk'), elements = selection.get.all();
						if (!elements.length) return;
						closeTopTexts();
						if (elements.length > 1) {
							document.getElementById('attrNoEdit').className = 'topText active';
						} else {
							if (!(elements[0].alias.nodeName in {a:0,A:0})) return true;
							editor.className = 'topText active';
							Idk.element = elements[0].alias;
							Idk.value = elements[0].alias.getAttribute('href') || '';
							Idk.placeholder = 'Edit href';
							Idk.focus();
						}
					},
					title: '(' + locale.cmdKey + ' + Shift + 8) Lets you quickly edit the element\'s href attribute',
					image: 'svg/edit_attr_h.svg',
					disabled: true,
					hideOnDisabled: true,
					condition: function() {
						var node = selection.get.first();
						if (!node) return;
						return node.alias.nodeName in {a:0,A:0}
					},
					id: 'editHref'
				},{
					name: 'Edit Attributes&#133;',
					func: function(_,close) {
						close();
						var node = selection.get.first();
						if (!node) return;
						openDialog('edit_attributes');
						var html = '<table id="idi">';
						forEach(node.alias.attributes, function(attribute) {
							html += '<tr class="cl4"><td><input type="text" value="' + quoteEscape(attribute.name) + '" placeholder="attribute" class="cl1 cl3"></td><td><input type="text" value="' + quoteEscape(attribute.value) + '" placeholder="value" class="cl2 cl3"></td></td>';
						});
						html += '<tr class="cl4"><td><input type="text" placeholder="attribute" class="cl1 cl3"></td><td><input type="text" placeholder="value" class="cl2 cl3"></td></tr><tr class="cl4" id="idk"><td><input type="text" placeholder="attribute" class="cl1 cl3" id="idj"></td><td><input type="text" tabindex="-1" placeholder="value" class="cl2 cl3"></td></tr></table>';
						document.getElementById('idg').innerHTML = html;
						document.getElementById('idi').linkedElement = selection.get.first().alias;
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
						forEach(document.querySelectorAll('#idg input:not(#idj)'), function(element) {
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
								if ((e.keyCode == 9 && !e.shiftKey) || e.keyCode == 13 || (((e.keyCode == 58 && e.shiftKey) || e.keyCode == 61 || e.keyCode == 187) && element.parentNode.nextElementSibling)) {
									e.preventDefault();
									(element.parentNode.parentNode == finaltr && !element.parentNode.nextElementSibling && !finaltr.children[0].children[0].value && !finaltr.children[1].children[0].value ? document.getElementById('idh') : element.parentNode.nextElementSibling ? element.parentNode.nextElementSibling.children[0] : element.parentNode.parentNode.nextElementSibling.children[0].children[0]).focus();
								};
							});
						});
						document.querySelector('#idg tr:first-child input').focus();
					},
					title: '(' + locale.cmdKey + ' + E) Lets you edit the element\'s attributes',
					image: 'svg/edit_attributes.svg',
					id: 'editAttributes'
				},{
					name: 'Edit Styles&#133;',
					func: function(_,close) {
						close();
						openDialog('edit_styles');
						var html = '<table id="idu">',
							selectedElement = selection.get.first(),
							style = selectedElement.alias.getAttribute('style') || '';
						style.replace(/(?:^\s*|;\s*)([a-z-]+)?\s*:\s*((?:[^;'"}]|("|')(?:(?:(?!\3).(?=\3|\\))?(?:(?=\3)|\\.(?:(?!\3)[^\\](?=\3|\\))?|(?:.(?!\\|\3))+.)*?)\3)*)/g, function($0,$1,$2) {
							if (!$1 && !$2) return $0;
							html += '<tr class="cl4"><td><input type="text" value="' + quoteEscape($1) + '" placeholder="style name" class="cl1 cl3"></td><td><input type="text" value="' + quoteEscape($2) + '" placeholder="style value" class="cl2 cl3"></td></td>';
							return $0; 
						});
						html += '<tr class="cl4"><td><input type="text" placeholder="style name" class="cl1 cl3"></td><td><input type="text" placeholder="style value" class="cl2 cl3"></td></tr><tr class="cl4" id="idw"><td><input type="text" placeholder="style name" class="cl1 cl3" id="idx"></td><td><input type="text" tabindex="-1" placeholder="style value" class="cl2 cl3"></td></tr></table>';
						document.getElementById('idv').innerHTML = html;
						document.getElementById('idu').linkedElement = selection.get.first().alias;
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
						forEach(document.querySelectorAll('#idv input:not(#idx)'), function(element) {
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
						forEach(document.querySelectorAll('.cl1'), function() {
							HTMLStudio.autoFill(this, cssProperties, true);
						});
						document.querySelector('#idv tr:first-child input').focus();
					},
					image: 'svg/edit_styles.svg',
					title: '(' + locale.cmdKey + ' + Q) Lets you edit the element\'s CSS',
					separate: true,
					id: 'editStyle'
				},{
					name: 'Edit Classes&#133;',
					func: function(_,close) {
						close();
						var editor = document.getElementById('classEditor'), idQ = document.getElementById('idQ'), elements = selection.get.all();
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
					title: '(' + locale.cmdKey + ' + . ) Lets you quickly edit the element\'s classes',
					image: 'svg/edit_class.svg',
					id: 'editClass'
				},{
					name: 'Edit ID&#133;',
					func: function(_,close) {
						close();
						var editor = document.getElementById('idEditor'), idR = document.getElementById('idR'), elements = selection.get.all();
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
					title: '(' + locale.cmdKey + ' + Shift + 3) Lets you quickly edit the element\'s ID',
					separate: true,
					image: 'svg/edit_id.svg',
					id: 'editId'
				},{
					name: 'Select Parent',
					image: 'svg/select_parent.svg',
					disabledimage: 'svg/select_parent_disabled.svg',
					func: function(e,close) {
						close();
						if (selection.get.first() == overlay) {
							clickhandler.call(overlay, {
								stopPropagation: function(){},
								clientX: 0,
								clientY: Math.round(em(4.45)),
								isTrusted: true
							});
							updateTooltip();
							return this.disabled = true;
						}
						var node = selection.get.first().parentNode;
						if (!e.shiftKey) deselect();
						clickhandler.call(node, pseudoEvent.__extend__({set: true}));

						updateTooltip();
						updateTreeSelections();
						selection.update();
					},
					title: '(' + locale.cmdKey + ' + Up) or (' + locale.cmdKey + ' + Shift + Up) Selects the immediate parent of the node',
					disabledtitle: '(' + locale.cmdKey + ' + Up) or (' + locale.cmdKey + ' + Shift + Up) This node\'s parent cannot be selected',
					id: 'selectParent',
					condition: function() {
						var node = selection.get.first();
						if (!node) return;
						return node.alias != framewindow.document.body;
					}
				},{
					name: 'Select Children',
					image: 'svg/select_children.svg',
					disabledimage: 'svg/select_children_disabled.svg',
					func: function(e,close) {
						close();
						var element = selection.get.first();
						if (!e.shiftKey) deselect();
						forEach(element.children, function() {
							clickhandler.call(this, (pseudoEvent.__extend__({set: true})));
						});
						updateTooltip();
						updateTreeSelections();
						selection.update();
					},
					title: '(' + locale.cmdKey + ' + Down) or (' + locale.cmdKey + ' + Shift + Down) Selects all immediate children of the node',
					disabledtitle: '(' + locale.cmdKey + ' + Down) or (' + locale.cmdKey + ' + Shift + Down) This node has no children',
					separate: true,
					id: 'selectChildren',
					condition: function() {
						var node = selection.get.first();
						if (!node) return;
						return node.children.length;
					}
				},{
					name: 'Insert Child&#133;',
					func: function(_,close) {
						close();
						var element = selection.get.first();
						if (!element) return;
						openDialog('new_child');
						forEach(document.querySelectorAll('.clf.clg'), function(element) {
							element.className = 'clf';
						});
						var obj;
						document.getElementById('ida').insertChild = obj = {textNode: Symbol(), element: element.alias, children: null, index: 0};
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
						forEach(element.alias.childNodes, function(child, i) {
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
									if (!clicked) forEach(document.querySelectorAll('.clh'), function(element) {
										element.removeEventListener('mouseenter', replace);
										element.removeEventListener('focus', replace);
										element.addEventListener('click', replace);
										element.addEventListener('keydown', function(e) {
											if (e.keyCode == 13 || e.keyCode == 32) replace.call(this,e);
										});
									});
									clicked = true;
								};

							// On hover for [Right Click] > Insert Child... > [Node Position <div>s]
							forEach(document.querySelectorAll('.clh'), function(element) {
								element.addEventListener('mouseenter', replace);
								element.addEventListener('focus', replace);
							});
							idV.addEventListener('click', clickEvent);
							idV.addEventListener('keydown', function(e) {
								if (e.keyCode == 13 || e.keyCode == 32) clickEvent.call(this);
							})
						}
					},
					title: '(' + locale.cmdKey + ' + Shift + I) Inserts a child node into the selected node',
					image: 'svg/insert_child.svg',
					separate: true,
					id: 'insertChild'
				},{
					name: 'Unwrap Element',
					image: 'svg/transparent.svg',
					func: function(_,close) {
						close();
						var element = selection.get.first();
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
					title: '(' + locale.cmdKey + ' + U) Replaces the element with all its child nodes',
					disabledtitle: '(' + locale.cmdKey + ' + U) This element cannot be unwrapped',
					separate: true,
					image: 'svg/unwrap.svg',
					disabledimage: 'svg/unwrap_disabled.svg',
					id: 'unwrap',
					condition: function() {
						var node = selection.get.first();
						if (!node) return;
						return node.alias != framewindow.document.body;
					}
				},{
					name: 'Delete Element',
					func: function(_,close) {
						contextmenus[1].getItem('delete').execute(false, true);
						close();
					},
					title: '(Backspace) or (Delete) Removes the element from the document',
					image: 'svg/delete.svg',
					id: 'delete'
				}]
			}),
			new HTMLStudio.ContextMenu({
				items: [{
					name: '[Node Count]',
					disabled: true,
					pad: false,
					separate: true,
					id: 'count',
					condition: function() {
						this.editText('<span style="color:#000">' + selection.get.all().length + ' nodes selected</span>');
						return true;
					}
				},{
					name: 'Copy Elements',
					func: function(e,close) {
						close();
						prepareCopy(e.shiftKey);
						if (document.queryCommandSupported('copy') && document.execCommand('copy')) {
						} else openDialog('pseudo_paste');
					},
					title: '(' + locale.cmdKey + ' + C) Copies the selected elements\n(' + locale.cmdKey + ' + Shift + C) Copies the selected elements without their descendants',
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
						} else openDialog('pseudo_paste');
						if (document.activeElement == clipboard) userClipboard = clipboard.value;
					},
					title: '(' + locale.cmdKey + ' + X) Cuts the selected elements\n(' + locale.cmdKey + ' + Shift + X) Cuts the selected elements without their their descendants',
					image: 'svg/cut.svg',
					id: 'cut'
				},{
					name: 'Paste into Elements',
					func: function(e,close) {
						close();
						if (document.queryCommandSupported('paste') && document.execCommand('paste')) {
						} else openDialog('pseudo_paste');
					},
					title: '(' + locale.cmdKey + ' + V) Pastes any copied HTML into the selected nodes',
					image: 'svg/paste.svg',
					separate: true,
					id: 'paste'
				},{
					name: 'Insert Row Above',
					func: function(e,close) {
						close();
						var nodes = selection.get.all();
						if (nodes.length == 0) return;
						nodes = Array.prototype.map.call(nodes, function(node) {
							return node.alias;
						});
						var rows = [],
							iRows = [];
						forEach(nodes, function() {
							var r = this.nodeName.toLowerCase() == 'td' ? this.parentNode : this;
							if (!~rows.indexOf(r)) rows.push(r);
						});


						forEach(rows, function(row) {
							// Store the <table> as a more program-friendly object so that each cell can be tracked
							var info = {};
							// Store <table> in info
							info.table = row.parentNode.parentNode.nodeName.toLowerCase() == 'table' ? row.parentNode.parentNode : row.parentNode.nodeName.toLowerCase() == 'table' ? row.parentNode : null;
							if (!info.table) return;
							// Store the rows of the table
							info.rows = Array.prototype.slice.call(row.parentNode.children);

							// The following stores each table cell 
							// Increases the length of all the row arrays so that they are always the same length (as a table should be)
							function length(num) {
								forEach(info.cells, function() {
									while (this.length < num) {
										this.push([]);
									}
								});
							}
							// Used to append a <td> to a <tr>
							// Places the <td> in the next unoccupied slot in the <tr>
							// Or force places it in a certain spot if an index is provided
							// which helps with intersecting cells and cells with rowSpan > 1
							// Automatically expands the array using length function above if the row runs out of spots
							function push(row, item, index) {
								if (index == -1 || !arguments[2]) {
									for (var i = 0, r; i < row.length; i++) {
										if (row[i].length) continue;
										r = row[i].push(item);
										return i + 1;
									}
									if (!r) return length(i + 1), row[i].push(item), i + 1;
								} else {
									return length(index + 1), row[index].push(item), index + 1;
								}
							};
							// Create array of arrays where each sub-array represents a <tr>
							info.cells = info.rows.map(function(){return[]});
							// Fill in the cells using a bunch of for loops
							// All the for loops allow for rowSpan and colSpan and intersecting cells
							forEach(info.rows, function(row, ind) {
								forEach(row.children, function(_,i) {
									for (var j = 0, q; j < this.rowSpan; j++) {
										if (info.rows[ind + j]) {
											for (var n = this.colSpan - 1, p = q || -1; n >= 0; n--) {
												p = push(info.cells[ind + j], this, p);
												if (j == 0 && n == this.colSpan - 1) q = p - 1;
											}
										}
									}
								});
							});

							// Clone the selected row
							// Maintain rowSpan and colSpan for each element
							// Keeps each <td>'s attributes (except id) but not its child nodes
							var clone = row.cloneNode(),
								index = info.rows.indexOf(row),
								handled = [];
							forEach(info.cells[index], function(_,i) {
								if (e.shiftKey) {
									if ((this.length > 1 || this[0] && this[0].rowSpan > 1 && this[0].parentNode != info.rows[index]) && !~handled.indexOf(this[0])) {
										forEach(this, function() {
											if (this.rowSpan > 1 && this.parentNode != info.rows[index]) {
												this.rowSpan++;
												handled.push(this);
												return "break";
											}
										});
									} else {
										var td = framewindow.document.createElement('td');
										td.appendChild(framewindow.document.createTextNode('\u00a0'));
										clone.appendChild(td);
									}
								} else {
									forEach(this, function() {
										// Skip over <td>s with colSpan > 1 since they only need to be cloned once
										if (i && ~info.cells[index][i - 1].indexOf(this)) return;
										// If the element's parent is another row, but it intersects the selected row
										// (i.e. it has a rowSpan > 1)
										if (this.parentNode != info.rows[index]) {
											this.rowSpan++;
										// If the <td> is only part of one row
										} else if (this.rowSpan == 1) {
											var tdClone = this.cloneNode();
											tdClone.appendChild(framewindow.document.createTextNode('\u00a0'));
											tdClone.removeAttribute('id');
											clone.appendChild(tdClone);
										// If the <td> extends to rows below the selected one
										} else {
											clone.appendChild(this);
											this.rowSpan++;
										}
									});
								}
							});
							// Prevent id conflicts
							row.removeAttribute('id');
							// Insert new <tr>
							row.parentNode.insertBefore(clone, row);
							iRows.push(clone);
						});
						// Select the inserted row and save to the user's history
						deselect();
						overlayUpdate();
						history.update('Insert row' + (iRows.length > 1 ? 's' : ''));
						forEach(iRows, function() {
							clickhandler.call(this.alias, pseudoEvent.__extend__({set: true}));
						});
						updateTreeSelections();
					},
					title: 'Inserts a row above the selected elements\n(Shift to ignore merged cells)',
					condition: function() {
						var nodes = selection.get.all();
						if (nodes.length < 2) return;
						var returnValue = false;
						forEach(nodes, function() {
							if (!(this.nodeName in {td:0,TD:0,tr:0,TR:0})) return returnValue = 'break';
						});
						return !returnValue;
					},
					hideOnDisabled: true,
					id: 'insertRowAbove'
				},{
					name: 'Insert Row Below',
					func: function(e,close) {
						close();
						var nodes = selection.get.all();
						if (nodes.length == 0) return;
						nodes = Array.prototype.map.call(nodes, function(node) {
							return node.alias;
						});
						var rows = [],
							iRows = [];
						forEach(nodes, function() {
							if (this.nodeName == 'TR') return !~rows.indexOf(this) && rows.push(this);
							if (this.nodeName == 'TD' && this.rowSpan <= 1) return !~rows.indexOf(this.parentNode) && rows.push(this.parentNode);
							if (this.nodeName.toLowerCase() != 'td') return;
							var row = this.parentNode;
							loop(this.rowSpan - 1, function(i,n) {
								row = row.nextElementSibling;
								if (!row) return row = row.previousElementSibling, "break";
							}, this);
							if (!~rows.indexOf(row)) rows.push(row);
						});


						forEach(rows, function(row) {
							// Store the <table> as a more program-friendly object so that each cell can be tracked
							var info = {};
							// Store <table> in info
							info.table = row.parentNode.parentNode.nodeName.toLowerCase() == 'table' ? row.parentNode.parentNode : row.parentNode.nodeName.toLowerCase() == 'table' ? row.parentNode : null;
							if (!info.table) return;
							// Store the rows of the table
							info.rows = Array.prototype.slice.call(row.parentNode.children);

							// The following stores each table cell 
							// Increases the length of all the row arrays so that they are always the same length (as a table should be)
							function length(num) {
								forEach(info.cells, function() {
									while (this.length < num) {
										this.push([]);
									}
								});
							}
							// Used to append a <td> to a <tr>
							// Places the <td> in the next unoccupied slot in the <tr>
							// Or force places it in a certain spot if an index is provided
							// which helps with intersecting cells and cells with rowSpan > 1
							// Automatically expands the array using length function above if the row runs out of spots
							function push(row, item, index) {
								if (index == -1 || !arguments[2]) {
									for (var i = 0, r; i < row.length; i++) {
										if (row[i].length) continue;
										r = row[i].push(item);
										return i + 1;
									}
									if (!r) return length(i + 1), row[i].push(item), i + 1;
								} else {
									return length(index + 1), row[index].push(item), index + 1;
								}
							};
							// Create array of arrays where each sub-array represents a <tr>
							info.cells = info.rows.map(function(){return[]});
							// Fill in the cells using a bunch of for loops
							// All the for loops allow for rowSpan and colSpan and intersecting cells
							forEach(info.rows, function(row, ind) {
								forEach(row.children, function(_,i) {
									for (var j = 0, q; j < this.rowSpan; j++) {
										if (info.rows[ind + j]) {
											for (var n = this.colSpan - 1, p = q || -1; n >= 0; n--) {
												p = push(info.cells[ind + j], this, p);
												if (j == 0 && n == this.colSpan - 1) q = p - 1;
											}
										}
									}
								});
							});

							// Clone the selected row
							// Maintain rowSpan and colSpan for each element
							// Keeps each <td>'s attributes (except id) but not its child nodes
							var clone = row.cloneNode(),
								index = info.rows.indexOf(row),
								handled = [];
							forEach(info.cells[index], function(_,i) {
								if (e.shiftKey) {
									if (this.length > 1) {
										forEach(this, function() {
											if (this.rowSpan > 1 && info.cells[index + 1] && info.cells[index + 1][i][0] == this && !~handled.indexOf(this[0])) {
												this.rowSpan++;
												handled.push(this);
											}
										});
									} else if (this.length == 0) {
										var td = framewindow.document.createElement('td');
										td.appendChild(framewindow.document.createTextNode('\u00a0'));
										clone.appendChild(td);
									} else {
										if (this[0].rowSpan > 1 && info.cells[index + 1] && info.cells[index + 1][i][0] == this[0]) {
											if (!~handled.indexOf(this[0])) this[0].rowSpan++;
											handled.push(this[0]);
										} else {
											var td = framewindow.document.createElement('td');
											td.appendChild(framewindow.document.createTextNode('\u00a0'));
											clone.appendChild(td);
										}
									}
								} else {
									forEach(this, function() {
										// Skip over <td>s with colSpan > 1 since they only need to be cloned once
										if (i && ~info.cells[index][i - 1].indexOf(this)) return;
										// If the element's parent is another row, but it intersects the selected row
										// (i.e. it has a rowSpan > 1)
										if (this.rowSpan > 1) {
											this.rowSpan++;
										// If the <td> is only part of one row
										} else {
											var tdClone = this.cloneNode();
											tdClone.appendChild(framewindow.document.createTextNode('\u00a0'));
											tdClone.removeAttribute('id');
											clone.appendChild(tdClone);
										}
									});
								}
							});
							// Prevent id conflicts
							row.removeAttribute('id');
							// Insert new <tr>
							row.parentNode.insertBefore(clone, row.nextElementSibling);
							iRows.push(clone);
						});
						// Select the inserted row and save to the user's history
						deselect();
						overlayUpdate();
						history.update('Insert row' + (iRows.length > 1 ? 's' : ''));
						forEach(iRows, function() {
							clickhandler.call(this.alias, pseudoEvent.__extend__({set: true}));
						});
					},
					title: 'Inserts a row below the selected elements\n(Shift to ignore merged cells)',
					condition: function() {
						var nodes = selection.get.all();
						if (nodes.length == 0) return;
						var returnValue = false;
						forEach(nodes, function() {
							if (!(this.nodeName in {td:0,TD:0,tr:0,TR:0})) return returnValue = 'break';
						});
						return !returnValue;
					},
					separateCondition: function() {
						if (this.disabled) return false;
						var nodes = selection.get.all();
						if (nodes.length == 0) return;
						var returnValue = false;
						forEach(nodes, function() {
							if (!(this.nodeName in {td:0,TD:0,col:0,COL:0,colgroup:0,COLGROUP:0})) return returnValue = 'break';
						});
						return returnValue;
					},
					hideOnDisabled: true,
					separate: true,
					id: 'insertRowBelow'
				},{
					name: 'Insert Column Left',
					func: function(e,close) {
						close();
						var nodes = selection.get.all();
						if (nodes.length == 0) return;
						nodes = Array.prototype.map.call(nodes, function(node) {
							return node.alias;
						});
						var cols = [],
							iCells = [];


						forEach(nodes, function(node) {
							// Store the <table> as a more program-friendly object so that each cell can be tracked
							var info = {},
								colIndex;
							// Store <table> in info
							info.table = node.parentNode.parentNode.parentNode.nodeName == 'TABLE' ? node.parentNode.parentNode.parentNode : node.parentNode.parentNode.nodeName == 'TABLE' ? node.parentNode.parentNode : node.parentNode.nodeName == 'TABLE' ? node.parentNode : null;
							if (!info.table) return;
							// Store the rows of the table
							info.rows = Array.prototype.slice.call(info.table.rows);

							// The following stores each table cell 
							// Increases the length of all the row arrays so that they are always the same length (as a table should be)
							function length(num) {
								forEach(info.cells, function() {
									while (this.length < num) {
										this.push([]);
									}
								});
							}
							// Used to append a <td> to a <tr>
							// Places the <td> in the next unoccupied slot in the <tr>
							// Or force places it in a certain spot if an index is provided
							// which helps with intersecting cells and cells with rowSpan > 1
							// Automatically expands the array using length function above if the row runs out of spots
							function push(row, item, index) {
								if (index == -1 || !arguments[2]) {
									for (var i = 0, r; i < row.length; i++) {
										if (row[i].length) continue;
										r = row[i].push(item);
										return i + 1;
									}
									if (!r) return length(i + 1), row[i].push(item), i + 1;
								} else {
									return length(index + 1), row[index].push(item), index + 1;
								}
							};
							// Create array of arrays where each sub-array represents a <tr>
							info.cells = info.rows.map(function(){return[]});
							// Fill in the cells using a bunch of for loops
							// All the for loops allow for rowSpan and colSpan and intersecting cells
							forEach(info.rows, function(row, ind) {
								forEach(row.children, function(_,i) {
									for (var j = 0, q; j < this.rowSpan; j++) {
										if (info.rows[ind + j]) {
											for (var n = this.colSpan - 1, p = q || -1; n >= 0; n--) {
												p = push(info.cells[ind + j], this, p);
												if (j == 0 && n == this.colSpan - 1) q = p - 1;
												if (this == node && n == this.colSpan - 1) colIndex = p - 1;
											}
										}
									}
								});
							});

							if (node.nodeName == 'COL') {
								colIndex = 0;
								forEach(info.table.children, function() {
									if (this.nodeName == 'COLGROUP') {
										if (this.children.length) {
											if (!forEach(this.children, function() {
												if (this == node) return "break";
												colIndex += this.span;
											})) return "break";
										} else {
											colIndex += this.span;
										}
									}
								});
							} else if (node.nodeName == 'COLGROUP') {
								colIndex = 0;
								forEach(info.table.children, function() {
									if (this.nodeName == 'COLGROUP') {
										if (this == node) {
											return "break";
										} else if (this.children.length) {
											forEach(this.children, function() {
												colIndex += this.span;
											});
										} else {
											colIndex += this.span;
										}
									}
								});
							}

							if (isNaN(colIndex) || ~cols.indexOf(colIndex)) return;

							var handled = [];
							forEach(info.cells, function(_,ind) {
								if (!this[colIndex].length) return;
								if (e.shiftKey) {
									if ((this[colIndex][1] || this[colIndex][0]).colSpan > 1 && colIndex && (this[colIndex - 1][1] || this[colIndex - 1][0]) == (this[colIndex][1] || this[colIndex][0])) {
										var td = this[colIndex][1] || this[colIndex][0];
										if (~handled.indexOf(td)) return;
										td.colSpan++;
										handled.push(td);
									} else {
										var td = framewindow.document.createElement('td'),
											childIndex = 0;
										td.appendChild(framewindow.document.createTextNode('\u00a0'));
										loop(colIndex, function(i) {
											if ((this[i][1] || this[i][0]).parentNode == info.rows[ind] && (!i || (this[i - 1][1] || this[i - 1][0]) != (this[i][1] || this[i][0]))) childIndex++;
										}, this);
										info.rows[ind].insertBefore(td, info.rows[ind].children[childIndex] || null);
										iCells.push(td);
									}
								} else {
									forEach(this[colIndex], function() {
										if (~handled.indexOf(this)) return;
										if (this.colSpan > 1) {
											this.colSpan++;
										} else {
											var clone = this.cloneNode();
											clone.removeAttribute('id');
											clone.appendChild(framewindow.document.createTextNode('\u00a0'));
											this.parentNode.insertBefore(clone, this);
											iCells.push(clone);
										}
										handled.push(this);
									});
								}
							});

							forEach(cols, function(_,i) {
								if (this > colIndex) cols[i]++;
							});
							cols.push(colIndex + 1);

							var col = 0;
							forEach(info.table.children, function() {
								if (this.nodeName == 'COLGROUP') {
									if (this.children.length) {
										if (!forEach(this.children, function() {
											if (col + this.span > colIndex) {
												this.span++;
												return "break";
											}
											col += this.span;
										})) return "break";
									} else {
										if (col + this.span > colIndex) {
											this.span++;
											return "break";
										}
									}
								}
							});
						});
						// Select the inserted row and save to the user's history
						deselect();
						overlayUpdate();
						history.update('Insert column' + (iCells.length > 1 ? 's' : ''));
						forEach(iCells, function() {
							clickhandler.call(this.alias, pseudoEvent.__extend__({set: true}));
						});
						updateTreeSelections();
					},
					title: 'Inserts a column to the left of the selected elements\n(Shift to ignore merged cells)',
					condition: function() {
						var nodes = selection.get.all();
						if (nodes.length == 0) return;
						var returnValue = false;
						forEach(nodes, function() {
							if (!(this.nodeName in {td:0,TD:0,col:0,COL:0,colgroup:0,COLGROUP:0})) return returnValue = 'break';
						});
						return !returnValue;
					},
					hideOnDisabled: true,
					id: 'insertColLeft'
				},{
					name: 'Insert Column Right',
					func: function(e,close) {
						close();
						var nodes = selection.get.all();
						if (nodes.length == 0) return;
						nodes = Array.prototype.map.call(nodes, function(node) {
							return node.alias;
						});
						var cols = [],
							iCells = [];


						forEach(nodes, function(node) {
							// Store the <table> as a more program-friendly object so that each cell can be tracked
							var info = {},
								colIndex;
							// Store <table> in info
							info.table = node.parentNode.parentNode.parentNode.nodeName == 'TABLE' ? node.parentNode.parentNode.parentNode : node.parentNode.parentNode.nodeName == 'TABLE' ? node.parentNode.parentNode : node.parentNode.nodeName == 'TABLE' ? node.parentNode : null;
							if (!info.table) return;
							// Store the rows of the table
							info.rows = Array.prototype.slice.call(info.table.rows);

							// The following stores each table cell 
							// Increases the length of all the row arrays so that they are always the same length (as a table should be)
							function length(num) {
								forEach(info.cells, function() {
									while (this.length < num) {
										this.push([]);
									}
								});
							}
							// Used to append a <td> to a <tr>
							// Places the <td> in the next unoccupied slot in the <tr>
							// Or force places it in a certain spot if an index is provided
							// which helps with intersecting cells and cells with rowSpan > 1
							// Automatically expands the array using length function above if the row runs out of spots
							function push(row, item, index) {
								if (index == -1 || !arguments[2]) {
									for (var i = 0, r; i < row.length; i++) {
										if (row[i].length) continue;
										r = row[i].push(item);
										return i + 1;
									}
									if (!r) return length(i + 1), row[i].push(item), i + 1;
								} else {
									return length(index + 1), row[index].push(item), index + 1;
								}
							};
							// Create array of arrays where each sub-array represents a <tr>
							info.cells = info.rows.map(function(){return[]});
							// Fill in the cells using a bunch of for loops
							// All the for loops allow for rowSpan and colSpan and intersecting cells
							forEach(info.rows, function(row, ind) {
								forEach(row.children, function(_,i) {
									for (var j = 0, q; j < this.rowSpan; j++) {
										if (info.rows[ind + j]) {
											for (var n = this.colSpan - 1, p = q || -1; n >= 0; n--) {
												p = push(info.cells[ind + j], this, p);
												if (j == 0 && n == this.colSpan - 1) q = p - 1;
												if (this == node && n == 0) colIndex = p - 1;
											}
										}
									}
								});
							});

							if (node.nodeName == 'COL') {
								colIndex = 0;
								forEach(info.table.children, function() {
									if (this.nodeName == 'COLGROUP') {
										if (this.children.length) {
											if (!forEach(this.children, function() {
												if (this == node) return colIndex += this.span - 1, "break";
												colIndex += this.span;
											})) return "break";
										} else {
											colIndex += this.span;
										}
									}
								});
							} else if (node.nodeName == 'COLGROUP') {
								colIndex = 0;
								forEach(info.table.children, function() {
									if (this.nodeName == 'COLGROUP') {
										if (this == node) {
											colIndex += this.span - 1;
											return "break";
										} else if (this.children.length) {
											forEach(this.children, function() {
												colIndex += this.span;
											});
										} else {
											colIndex += this.span;
										}
									}
								});
							}

							if (isNaN(colIndex) || ~cols.indexOf(colIndex)) return;

							var handled = [];
							forEach(info.cells, function(_,ind) {
								if (!this[colIndex].length) return;
								if (e.shiftKey) {
									if ((this[colIndex][1] || this[colIndex][0]).colSpan > 1 && this[colIndex + 1] && (this[colIndex + 1][1] || this[colIndex + 1][0]) == (this[colIndex][1] || this[colIndex][0])) {
										var td = this[colIndex][1] || this[colIndex][0];
										if (~handled.indexOf(td)) return;
										td.colSpan++;
										handled.push(td);
									} else {
										var td = framewindow.document.createElement('td'),
											childIndex = 0;
										td.appendChild(framewindow.document.createTextNode('\u00a0'));
										loop(colIndex + 1, function(i) {
											if ((this[i][1] || this[i][0]).parentNode == info.rows[ind] && (!i || (this[i - 1][1] || this[i - 1][0]) != (this[i][1] || this[i][0]))) childIndex++;
										}, this);
										info.rows[ind].insertBefore(td, info.rows[ind].children[childIndex] || null);
										iCells.push(td);
									}
								} else {
									forEach(this[colIndex], function() {
										if (~handled.indexOf(this)) return;
										if (this.colSpan > 1) {
											this.colSpan++;
										} else {
											var clone = this.cloneNode();
											clone.removeAttribute('id');
											clone.appendChild(framewindow.document.createTextNode('\u00a0'));
											this.parentNode.insertBefore(clone, this.nextElementSibling);
											iCells.push(clone);
										}
										handled.push(this);
									});
								}
							});
							forEach(cols, function(_,i) {
								if (this > colIndex) cols[i]++;
							});
							cols.push(colIndex);

							var col = 0;
							forEach(info.table.children, function() {
								if (this.nodeName == 'COLGROUP') {
									if (this.children.length) {
										if (!forEach(this.children, function() {
											if (col + this.span >= colIndex) {
												this.span++;
												return "break";
											}
											col += this.span;
										})) return "break";
									} else {
										if (col + this.span >= colIndex) {
											this.span++;
											return "break";
										}
										col += this.span;
									}
								}
							});
						});
						// Select the inserted row and save to the user's history
						deselect();
						overlayUpdate();
						history.update('Insert column' + (iCells.length > 1 ? 's' : ''));
						forEach(iCells, function() {
							clickhandler.call(this.alias, pseudoEvent.__extend__({set: true}));
						});
						updateTreeSelections();
					},
					title: 'Inserts a column to the right of the selected elements\n(Shift to ignore merged cells)',
					condition: function() {
						var nodes = selection.get.all();
						if (nodes.length == 0) return;
						var returnValue = false;
						forEach(nodes, function() {
							if (!(this.nodeName in {td:0,TD:0,col:0,COL:0,colgroup:0,COLGROUP:0})) return returnValue = 'break';
						});
						return !returnValue;
					},
					hideOnDisabled: true,
					separate: true,
					hideSeparatorOnDisabled: true,
					id: 'insertColRight'
				},{
					name: 'Delete Elements',
					func: function(_,close) {
						var elements = selection.get.all();
						for (var i = elements.length - 1; i >= 0; i--) {
							if (elements[i].alias.parentNode && elements[i].alias != framewindow.document.body) elements[i].alias.parentNode.removeChild(elements[i].alias);
							else if (elements[i].alias == framewindow.document.body) elements[i].alias.innerHTML = '';
						}
						overlayUpdate();
						history.update((this.cut ? 'Cut element' : 'Delete element') + (elements.length > 1 ? 's' : ''));
						this.cut = false;
						close();
						updateTooltip();
					},
					image: 'svg/delete.svg',
					separate: true,
					title: '(Backspace) or (Delete) Removes the elements from the document',
					id: 'delete'
				},{
					name: 'Edit Classes&#133;',
					func: function(_,close) {
						close();
						contextmenus[0].getItem('editClass').dispatchEvent(new MouseEvent('click'));
					},
					title: '(' + locale.cmdKey + ' + . ) Lets you quickly edit the elements\' classes',
					separate: true,
					image: 'svg/edit_class.svg',
					if: 'editClass'
				},{
					name: 'Select Parent(s)',
					image: 'svg/select_parent.svg',
					disabledimage: 'svg/select_parent_disabled.svg',
					func: function(e,close) {
						if (selection.get.all().length == 1) return contextmenus[0].getItem('selectParent').dispatchEvent(new MouseEvent('click', {shiftKey: e.shiftKey}));
						else if (!selection.get.first()) return;
						close();
						var nodes = Array.prototype.filter.call(selection.get.all(), function(node) {
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
						selection.update();
					},
					title: '(' + locale.cmdKey + ' + Up) or (' + locale.cmdKey + ' + Shift + Up) Selects the immediate parents of the nodes',
					disabledtitle: '(' + locale.cmdKey + ' + Up) or (' + locale.cmdKey + ' + Shift + Up) None of the selected nodes have selectable parents',
					id: 'selectParent'
				},{
					name: 'Select Children',
					func: function(e,close) {
						close();
						var elements = selection.get.all();
						if (!elements.length) return;
						if (!e.shiftKey) deselect();
						forEach(elements, function() {
							forEach(this.children, function() {
								clickhandler.call(this, pseudoEvent.__extend__({set: true}));
							});
						})
						updateTooltip();
						updateTreeSelections();
						selection.update();
					},
					image: 'svg/select_children.svg',
					disabledimage: 'svg/select_children_disabled.svg',
					title: '(' + locale.cmdKey + ' + Down) or (' + locale.cmdKey + ' + Shift + Down) Selects all immediate children of the nodes',
					disabledtitle: '(' + locale.cmdKey + ' + Down) or (' + locale.cmdKey + ' + Shift + Down) None of the selected nodes have any children',
					id: 'selectChildren',
					condition: function() {
						for (var elements = selection.get.all(), i = elements.length - 1; i >= 0; i--) {
							if (elements[i].children.length) return true;
						}
						return false;
					}
				}]
			}),
			new HTMLStudio.ContextMenu({
				items: [{
					name: 'View in Drive',
					func: function(_,close) {
						open(this.webViewLink);
						close();
						closeHeaders();
					},
					title: 'Open this document in Google Drive',
					id: 'driveOpen',
					image: 'png/drive_mono_445566.png',
					hideOnDisabled: true,
					disabled: true,
					separate: true,
					hideSeparatorOnDisabled: true
				},{
					name: 'New&#133;',
					func: function(_,close) {
						document.getElementById('iD3').value = '';
						openDialog('new_file');
						close();
						closeHeaders();
					},
					title: '(' + locale.cmdKey + ' + N) Create a new document to replace the current one',
					image: 'svg/new.svg',
					id: 'new'
				},{
					name: 'Open&#133;',
					func: function(_,close) {
						openDialog('open_file_html');
						document.getElementById('id6').innerHTML = '<h4>No File Selected</h4><div>Open a file above</div>';
						document.getElementById('id9').className = 'option disabled';
						close();
						closeHeaders();
					},
					title: '(' + locale.cmdKey + ' + O) Opens another HTML file to edit',
					image: 'svg/open.svg',
					id: 'open'
				},{
					name: 'Save&#133;',
					func: function(_,close) {
						close();
						closeHeaders();
						openDialog('download');
						var textbox = document.getElementById('Ida');
						textbox.placeholder = document.getElementById('title').value.trim() || 'index.html';
						document.getElementById('IdY').className = '';
						document.getElementById('IdZ').className = '';
						textbox.value = '';
					},
					title: '(' + locale.cmdKey + ' + S) Lets you download the document or save it to Google Drive',
					separate: true,
					image: 'svg/save.svg',
					id: 'download'
				},{
					name: 'Print&#133;',
					func: function(_,close) {
						close();
						closeHeaders();
						print();
					},
					title: 'Prints the document',
					image: 'svg/print.svg',
					separate: true,
					id: 'print'
				},{
					name: 'View in New Tab',
					func: function(_,close) {
						close();
						closeHeaders();
						var win = open();
						framewindow.document.documentElement.style.overflow = '';
						var html = framewindow.document.documentElement.outerHTML;
						framewindow.document.documentElement.style.overflow = 'hidden';
						try {
							win.document.open();
							win.document.write(html);
							win.document.close();
						} catch (e) {
							win.close();
							win = open('data:text/html,' + encodeURIComponent(html));
						}
					},
					title: '(' + locale.cmdKey + ' + Shift + O) Opens the document by itself in a new tab',
					image: 'svg/open_in.svg',
					separate: true,
					id: 'viewInTab'
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
					disabled: true,
					image: 'svg/undo.svg',
					id: 'undo'
				},{
					name: 'Redo',
					func: redo,
					title: '(' + locale.cmdKey + ' + Y) Restores most recent change',
					disabledtitle: '(' + locale.cmdKey + '+Y) There are no changes to be redone',
					disabled: true,
					image: 'svg/redo.svg',
					id: 'redo'
				},{
					name: 'Preferences',
					title: 'Edit preferences',
					subcontext: {
						items: [{
								name: 'Colors',
								title: 'Edit color preferences',
								subcontext: {
									items: [
										{
											name: 'Selected Elements&#133;',
											func: function(_,close) {
												close();
												closeHeaders();
												openDialog('pref_selected_elem_color');
												var Idc = document.getElementById('Idc');
												if (Idc.colorSelector) Idc.colorSelector.clearColorChangeListeners();
												Idc.colorSelector = new HTMLStudio.ColorSelector();
												var Idd = document.getElementById('Idd');
												if (Idd.firstElementChild) Idd.removeChild(Idd.firstElementChild);
												Idd.appendChild(Idc.colorSelector.node);
												forEach(document.querySelectorAll('#Ide div'), function(_,i) {
													this.className = i ? '' : 'active';
													this.userColor = null;
												});
												Idc.colorSelector.goTo(userPrefs.nodeSelectionColor[0]);
												document.querySelector('#Ide div:first-child').userColor = userPrefs.nodeSelectionColor[0];
												document.querySelector('#Ide div:last-child').userColor = userPrefs.nodeSelectionColor[1];
												Idc.colorSelector.addColorChangeListener(function(e) {
													document.querySelector('#Ide div.active').userColor = this.parse(e.color || this.trueColor);
													var c1 = document.querySelector('#Ide div:first-child').userColor,
														c2 = document.querySelector('#Ide div:last-child').userColor;
													if (!c1 || !c2) return;
													if (c1[0] == 0 && c1[1] == 172 && c1[2] == 193 && c2[0] == 0 && c2[1] == 172 && c2[2] == 193 && ((c1[3] == .15 && c2[3] == .5) || (c1[3] == .5 && c2[3] == .15))) document.getElementById('Idh').className = 'option disabled';
													else document.getElementById('Idh').className = 'option';
												});
											},
											title: 'Edit the color of selected elements',
											image: parseHTML('<div id="iDK"></div>'),
											id: 'selectedElement'
										},{
											name: 'Background&#133;',
											func: function(_,close) {
												close();
												closeHeaders();
											},
											title: 'Edit the color of the background',
											id: 'background',
											disabled: true,
											disabledtitle: 'Work in Progress'
										}
									]
								},
								image: 'svg/edit_styles.svg',
								id: 'colors'
							},{
								name: 'Grid',
								title: 'Edit the grid properties',
								disabled: true,
								disabledtitle: 'Work in Progress',
								id: 'grid'
							},{
								name: 'CSS Units',
								title: 'Change the CSS unit for measurements',
								subcontext: {
									items: [
										{
											name: 'Pixels (px)',
											toggle: true,
											toggled: true,
											disabled: true,
											image: 'svg/checkmark.svg',
											imageoff: 'svg/css_unit_px.svg',
											disabledtitle: 'Work in Progress',
											id: 'px'
										},{
											name: 'Points (pt)',
											toggle: true,
											disabled: true,
											image: 'svg/checkmark.svg',
											imageoff: 'svg/css_unit_pt.svg',
											disabledtitle: 'Work in Progress',
											id: 'pt'
										},{
											name: 'Inches (in)',
											toggle: true,
											disabled: true,
											image: 'svg/checkmark.svg',
											imageoff: 'svg/css_unit_in.svg',
											disabledtitle: 'Work in Progress',
											id: 'in'
										},{
											name: 'Centimeters (cm)',
											toggle: true,
											disabled: true,
											image: 'svg/checkmark.svg',
											imageoff: 'svg/css_unit_cm.svg',
											disabledtitle: 'Work in Progress',
											id: 'cm'
										},{
											name: 'Viewport Units (vh / vw)',
											toggle: 'true',
											disabled: true,
											image: 'svg/checkmark.svg',
											imageoff: 'svg/css_unit_hw.svg',
											disabledtitle: 'Work in Progress',
											id: 'vhvw'
										}
									]
								},
								id: 'cssUnits',
								image: parseHTML('<div id="iDL" style="background-image:url(&quot;svg/css_unit_px.svg&quot;)"></div>')
							}
						]
					},
					image: 'svg/prefs.svg',
					id: 'prefs'
				}],
				pseudoParent: document.getElementById('section_edit')
			}),
			new HTMLStudio.ContextMenu({
				items: [{
					name: 'Toolbar',
					func: function(_,close) {
						close();
						closeHeaders();
						document.getElementById('toolbarcontainer').className = (this.toggled = !this.toggled) ? '' : 'inactive';
						if (userPrefs) userPrefs.set('toolbar', this.toggled);
						setTimeout(overlayUpdate, 300);
					},
					toggle: true,
					toggled: true,
					image: 'svg/checkmark.svg',
					imageoff: 'svg/transparent.svg',
					title: 'Toggles the display of this toolbar',
					id: 'toolbar'
				},{
					name: 'Fullscreen',
					func: function(_,close) {
						this.toggled = !this.toggled;
						close();
						closeHeaders();
						if (userPrefs) userPrefs.set('fullscreen', this.toggled);
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
					title: '(' + locale.cmdKey + ' + Shift + F) or (F11) Toggles fullscreen mode',
					hideOnDisabled: true,
					toggle: true,
					image: 'svg/checkmark.svg',
					imageoff: 'svg/transparent.svg',
					id: 'fullscreen'
				},{
					name: 'HTML Tree',
					func: function(_,close) {
						this.toggled = !this.toggled;
						if (userPrefs) userPrefs.set('tree', this.toggled);
						document.getElementById('html_editor_display').style.display = this.toggled ? 'block' : '';
						var idq = document.getElementById('idq');
						updateTree();
						updateTreeSelections();
						close();
						closeHeaders();
						idq.setAttribute('viewBox', '0 0 ' + idq.getAttribute('width') + ' ' + idq.getAttribute('height'));
					},
					title: 'Toggles the display the document\'s HTML tree',
					toggle: true,
					image: 'svg/checkmark.svg',
					imageoff: 'svg/transparent.svg',
					id: 'htmlTree'
				},{
					name: 'Grid',
					func: function(_,close) {
						this.toggled = !this.toggled;
						if (userPrefs) userPrefs.set('grid', this.toggled);
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
						if (userPrefs) userPrefs.set('tooltip', this.toggled);
						document.getElementById('tooltip').style.display = this.toggled ? '' : 'none';
					},
					title: 'Toggles the display of the tooltip at the bottom of the screen',
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
						if (userPrefs) userPrefs.set('bounds',this.toggled);
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
					title: 'Toggles the display of bounding box lines',
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
					disabledtitle: 'Looks like something went wrong in the code and this context menu couldn\'t be displayed',
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
						forEach(overlay.querySelectorAll('*'), function() {
							clickhandler.call(this, pseudoEvent.__extend__({set: true}));
						});
						clickhandler.call(overlay, pseudoEvent.__extend__({set: true}));
						updateTooltip();
						updateTreeSelections();
						selection.update();
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
						forEach(overlay.querySelectorAll('*'), function() {
							clickhandler.call(this, pseudoEvent.__extend__({shiftKey: true}));
						});
						clickhandler.call(overlay, pseudoEvent.__extend__({shiftKey: true}))
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
						var elements = selection.get.all();
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
					title: '(' + locale.cmdKey + ' + Left) or (' + locale.cmdKey + ' + Shift + Left) Selects the elements\' previous siblings',
					image: 'svg/select_previous.svg',
					disabledimage: 'svg/select_previous_disabled.svg',
					disabledtitle: '(' + locale.cmdKey + ' + Left) or (' + locale.cmdKey + ' + Shift + Left) No nodes are selected',
					id: 'selectPreviousSibling'
				},{
					name: 'Select Next Sibling(s)',
					func: function(e,close) {
						close();
						closeHeaders();
						var elements = selection.get.all();
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
					title: '(' + locale.cmdKey + ' + Right) or (' + locale.cmdKey + ' + Shift + Right) Selects the elements\' next sibling',
					image: 'svg/select_next.svg',
					disabledimage: 'svg/select_next_disabled.svg',
					disabledtitle: '(' + locale.cmdKey + ' + Right) or (' + locale.cmdKey + ' + Shift + Right) No nodes are selected',
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
						idP.dispatchEvent(new KeyboardEvent('keyup'));
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
					var idH = document.getElementById('idH');
					idH.editor = editor;
					editor.node.addEventListener('keypress', function(e) {
						if (e.target.nodeName == 'INPUT' && e.charCode) this.modified = true;
					});
					editor.node.modified = true;
					idH.innerHTML = '<h3>Create CSS rules below, give your new style sheet a name to remember it by, and save it.</h3><br><input type="checkbox" checked id="cssSyntaxHighlighter"><label for="cssSyntaxHighlighter">Syntax Highlighting</label><br><br><input type="text" id="idK" placeholder="Style Sheet Name" data-focus>';
					idH.appendChild(editor.node);
					openDialog('new_stylesheet');
					function prevent(e) {
						e.stopPropagation();
						e.preventDefault();
					};
					forEach(document.querySelectorAll('#cssSyntaxHighlighter, #cssSyntaxHighlighter + label'), function() {
						this.addEventListener('touchstart', function(e) {
							setTimeout(function() {
								this.checked = !this.checked;
								var focusedNode = document.querySelector('input:checked ~ .cssEditContainer .cssRule > input:focus');
								if (focusedNode) focusedNode.dispatchEvent(new KeyboardEvent('keydown'));
							}.bind(this.nodeName == 'LABEL' ? document.getElementById('cssSyntaxHighlighter') : this), 0);
							e.stopPropagation();
							e.preventDefault();
						});
						this.addEventListener('click', function(e) {
							setTimeout(function() {
								this.checked = !this.checked;
								var focusedNode = document.querySelector('input:checked ~ .cssEditContainer .cssRule > input:focus');
								if (focusedNode) focusedNode.dispatchEvent(new KeyboardEvent('keydown'));
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
		documentMeta = storage.get('meta') || {charset: "utf-8"},
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
		},
		userPrefs = (function(prefs) {
			var obj = {},
				arr = [],
				indentationArray = ['\t',' ','  ','   ','    ','     ','      ','       ','        '],
				n = (typeof prefs.n == 'string' ? prefs.n || '\u00a9' : '\u00a9').charCodeAt(0) - 300;
			if (typeof n != 'number') n = 169;
			if (typeof prefs.c != 'string') prefs.c = '\u012c\u01d8\u01ed\u013b\u012c\u01d8\u01ed\u015e\u012c\u01d8\u01ed\u0145\u012c\u01d8\u01ed\u0190';
			if (typeof prefs.u != 'number') prefs.u = 0;
			if (typeof prefs.i != 'number') prefs.i = 0;

			// Converts number stored in localStorage to boolean array
			// Basically creates an array from the bytes of the number
			// This saves room in the localStorage object
			while (n) {
				arr.push(!!(n & 1));
				n = n >> 1;
			};
			if (!(obj.toolbar = arr[0] || false)) {
				contextmenus[4].getItem('toolbar').dispatchEvent(new MouseEvent('click'));
			};
			if (obj.tree = arr[1] || false) {
				document.getElementById('html_editor_display').style.display = 'block';
				contextmenus[4].getItem('htmlTree').toggled = true;
			};
			if (obj.grid = arr[2] || false) {
				contextmenus[4].getItem('grid').dispatchEvent(new MouseEvent('click'));
			};
			if (!(obj.tooltip = arr[3] || false)) {
				document.getElementById('tooltip').style.display = 'none';
				contextmenus[4].getItem('tooltip').toggled = false;
			}
			if (obj.bounds = arr[4] || false) {
				contextmenus[4].getItem('boundingBox').dispatchEvent(new MouseEvent('click'));
			}
			if ((obj.textFormat = arr[5] ? 'minify' : 'prettify') == 'minify') {
				document.getElementById('Idx').checked = true;
			};
			if (obj.encodeEntities = arr[6] || false) {
				document.getElementById('Idz').checked = true;
			}
			if (obj.noStyleNames = arr[7] || false) {
				document.getElementById('IdC').checked = true;
			}

			// Reads color values by storing them as a four character string
			// Each letter's charCode is the value corresponding to "rgba"
			obj.nodeSelectionColor = [
				[prefs.c.charCodeAt(0) - 300, prefs.c.charCodeAt(1) - 300, prefs.c.charCodeAt(2) - 300, (prefs.c.charCodeAt(3) - 300) / 100],
				[prefs.c.charCodeAt(4) - 300, prefs.c.charCodeAt(5) - 300, prefs.c.charCodeAt(6) - 300, (prefs.c.charCodeAt(7) - 300) / 100]
			];
			obj.replacerColor = [
				[prefs.c.charCodeAt(8) - 300, prefs.c.charCodeAt(9) - 300, prefs.c.charCodeAt(10) - 300, (prefs.c.charCodeAt(11) - 300) / 100],
				[prefs.c.charCodeAt(12) - 300, prefs.c.charCodeAt(13) - 300, prefs.c.charCodeAt(14) - 300, (prefs.c.charCodeAt(15) - 300) / 100]
			];

			obj.units = ['px','pt','in','cm','vh / vw'][prefs.u] || 'px';
			obj.indentation = indentationArray[prefs.i] || '\t';
			document.getElementById('IdB').selectedIndex = indentationArray.indexOf(obj.indentation);

			obj.set = function(key, val) {
				obj[key] = val;
				this.store();
			}

			obj.store = function() {
				var n = 0,
					c = '',
					u = 0,
					temp = {};
				if (this.toolbar) n++;
				if (this.tree) n+=2;
				if (this.grid) n+=4;
				if (this.tooltip) n+=8;
				if (this.bounds) n+=16;
				if (this.textFormat == 'minify') n+=32;
				if (obj.encodeEntities) n+=64;
				if (obj.noStyleNames) n+=128;
				temp.n = String.fromCharCode(n + 300);
				forEach([this.nodeSelectionColor, this.replacerColor], function() {
					forEach(this, function() {
						forEach(this, function(_,i) {
							c += String.fromCharCode((i == 3 ? this * 100 : this) + 300);
						});
					});
				});
				temp.c = c;
				temp.u = ['px','pt','in','cm','vh / vw'].indexOf(this.units);
				temp.i = indentationArray.indexOf(this.indentation);
				temp.u = ~temp.u ? temp.u : 0;
				temp.i = ~temp.i ? temp.i : 0;
				storage.set('p', temp);
			}

			return obj;
		})(storage.get('p') || {n: '\u0175', c: '\u012c\u01d8\u01ed\u013b\u012c\u01d8\u01ed\u015e\u012c\u01d8\u01ed\u0145\u012c\u01d8\u01ed\u0190', u: 0, i: 0});

	HTMLStudio.network.listen(function(connected) {
		document.getElementById('googInterface').style.display = connected ? '' : 'none';
		var googOpen = document.getElementById('googOpen');
		googOpen.className = connected ? googOpen.className.replace(/\s*noNetwork\s*/g,'') : googOpen.className + ' noNetwork';
		document.getElementById('googOpenNoNetwork').className = connected ? '' : 'active';
	})

	// Returns the user-selected node(s)
	selection.get = {
		all: function() {
			var a = Array.prototype.slice.call(overlay.querySelectorAll('[data-selected-element=selected]'));
			if (overlay.getAttribute('data-selected-element') == 'selected') a.unshift(overlay);
			return a;
		},
		first: function() {
			return overlay.getAttribute('data-selected-element') == 'selected' ? overlay : overlay.querySelector('[data-selected-element=selected]');
		},
		query: function(query) {
			var a = Array.prototype.slice.call(overlay.querySelectorAll(query));
			if (overlay.matches(query)) a.unshift(overlay);
			return a;
		}
	};

	selection.update = function() {
		var array = selection.get.all();
		array.get = selection.get;
		array.update = selection.update;
		selection = array;
		return selection;
	}

	!function() {
		// Add some debugging options for developers
		(window.HTMLStudio = window.HTMLStudio || {}).debug = {};

		Object.defineProperties(HTMLStudio.debug, {
			preferences: {
				get: function() {
					return userPrefs;
				},
				set: function(v) {
					return userPrefs = v;
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
					return console.warn('Calling this function will destroy all your saved work and force HTML Studio to reload thinking that it\'s your first time on this page. All your current work is stored in localStorage, which will be wiped clean if you continue. This is only for debugging purposes. Place two pairs of parentheses to reset HTML Studio (i.e. window.HTMLStudio.debug.fullReset()(); )'),function ReadTheWarningFirst(){return function DidYouReadTheWarning(){['b','d','u','p'].forEach(function(a){storage.delete(a)});location.replace('')}}
				}
			},
			forceNetwork: {
				get: function() {
					return HTMLStudio.network.__force__;
				},
				set: function(v) {
					return HTMLStudio.network.__force__ = typeof v == 'boolean' ? v : null;
				}
			},
			selection: {
				get: function() {
					return selection;
				},
				set: function(v) {
					return selection = v;
				}
			},
			storage: {
				get: function() {
					return storage;
				}
			}
		});
	}();



	// Stores information about the document
	HTMLStudio.document = new (function HTMLStudioDocument() {
	 // The real "constructor" is at loadHTML();

	 // this.i = index in localStorage document array (Saved in localStorage)
	 // this.g = boolean indicating whether this is a Google file (Saved in localStorage)
	 // this.n = name of the document (stored in <title>) (Saved in localStorage)
	 // this.h = this.g ? ID of the Google file : minified HTML of the page (Saved in localStorage),
	 // this.d = last edited date as Date.getTime() (Saved in localStorage)
	 // this.u = HTML Studio file ID to keep track of document index (Saved in localStorage)
	 // this.o = ID of the Google file to keep track of its Google doc even when being saved as local file (undefined for files that have never been saved in Google Drive)
		this.meta = {
		// charset: charset of the document (<meta charset="[THIS DATA]">)
		}
	 // this.stylesheets = [{
	 //     html: outerHTML of the stylesheet,
	 //     node: the <style> element,
	 //     name: the "data-name" attribute of the stylesheet
	 // }, one object per <style>]
	 // this.originalHTML = argument passed into loadHTML (what the original document is parsed from)
	 // this.html = current html of the document (updated in history.update, so may not always be up-to-date)
		this.loaded = false // Keeps track of whether a document has already been loaded
		this.toLocal = function() {
			history.changeMethod('local', true);
		}
		this.toDrive = function(id) {
			if (history.method != 'drive' || history.googleDocId != id) history.changeMethod('drive', id);
		}
		this.update = function(override) {
			if (!HTMLStudio.document.loaded || !~HTMLStudio.document.i) return;
			var docs = storage.get('d');
			override = new Object(override);
			if (HTMLStudio.document.g && HTMLStudio.google.signedIn && HTMLStudio.google.exists() && !('d' in override)) {
				if (!HTMLStudio.google.file.get(HTMLStudio.document.h, function() {
					if (this.status >= 200 && this.status < 300) {
						framewindow.document.documentElement.style.overflow = '';
						docs[HTMLStudio.document.i] = {
							i: 'i' in override ? override.i : HTMLStudio.document.i,
							g: 'g' in override ? override.g : HTMLStudio.document.g ? 1 : 0,
							n: 'n' in override ? override.n : document.getElementById('title').value,
							h: 'h' in override ? override.h : HTMLStudio.document.h = HTMLStudio.document.g ? HTMLStudio.document.h : HTMLStudio.formatHTML.minify(false, framewindow.document.documentElement),
							o: 'o' in override ? override.o : HTMLStudio.document.o || undefined,
							d: HTMLStudio.document.d = new Date(JSON.parse(this.response).modifiedTime).getTime(),
							u: +('u' in override ? override.u : HTMLStudio.document.u)
						};
						framewindow.document.documentElement.style.overflow = 'hidden';
						storage.set('d', docs);
					} else {
						framewindow.document.documentElement.style.overflow = '';
						docs[HTMLStudio.document.i] = {
							i: 'i' in override ? override.i : HTMLStudio.document.i,
							g: 'g' in override ? override.g : HTMLStudio.document.g ? 1 : 0,
							n: 'n' in override ? override.n : document.getElementById('title').value,
							h: 'h' in override ? override.h : HTMLStudio.document.h = HTMLStudio.document.g ? HTMLStudio.document.h : HTMLStudio.formatHTML.minify(false, framewindow.document.documentElement),
							o: 'o' in override ? override.o : HTMLStudio.document.o || undefined,
							d: 'd' in override ? override.d : HTMLStudio.document.d = new Date().getTime(),
							u: +('u' in override ? override.u : HTMLStudio.document.u)
						};
						framewindow.document.documentElement.style.overflow = 'hidden';
						storage.set('d', docs);
					}
				}, ['modifiedTime'])) {
					framewindow.document.documentElement.style.overflow = '';
					docs[HTMLStudio.document.i] = {
						i: 'i' in override ? override.i : HTMLStudio.document.i,
						g: 'g' in override ? override.g : HTMLStudio.document.g ? 1 : 0,
						n: 'n' in override ? override.n : document.getElementById('title').value,
						h: 'h' in override ? override.h : HTMLStudio.document.h = HTMLStudio.document.g ? HTMLStudio.document.h : HTMLStudio.formatHTML.minify(false, framewindow.document.documentElement),
						o: 'o' in override ? override.o : HTMLStudio.document.o || undefined,
						d: 'd' in override ? override.d : HTMLStudio.document.d = new Date().getTime(),
						u: +('u' in override ? override.u : HTMLStudio.document.u)
					};
					framewindow.document.documentElement.style.overflow = 'hidden';
					storage.set('d', docs);
				}
			} else {
				framewindow.document.documentElement.style.overflow = '';
				docs[HTMLStudio.document.i] = {
					i: 'i' in override ? override.i : HTMLStudio.document.i,
					g: 'g' in override ? override.g : HTMLStudio.document.g ? 1 : 0,
					n: 'n' in override ? override.n : document.getElementById('title').value,
					h: 'h' in override ? override.h : HTMLStudio.document.h = HTMLStudio.document.g ? HTMLStudio.document.h : HTMLStudio.formatHTML.minify(false, framewindow.document.documentElement),
					o: 'o' in override ? override.o : HTMLStudio.document.o || undefined,
					d: HTMLStudio.document.d = 'd' in override ? override.d : new Date().getTime(),
					u: +('u' in override ? override.u : HTMLStudio.document.u)
				};
				framewindow.document.documentElement.style.overflow = 'hidden';
				storage.set('d', docs);
			}
		}
	});

	// This is where specific documents are loaded into the editor
	// If there are no saved documents, a new one is loaded into the editor (First visit to HTML Studio)
	// If there is only one saved, it is loaded into the editor
	// If multiple are saved, the document selector screen appears and asks the selector to choose a document to edit
	// The hash key-value pairs are shown below after loadFromLocal()
	!function() {
		// Remove old files from localStorage
		var newDocs = [],
			oldDocs = storage.get('d'),
			date = new Date().getTime(),
			udocs = [];

		// Removes old documents and reassigns their .i value
		forEach(oldDocs, function(_,$,docs) {
			// Remove duplicate Google files by comparing Google file IDs
			if (this.g) {
				if (~udocs.indexOf(this.h)) return;
				// Google docs are removed from Recents after 3 months on inactivity
				// They are still saved in the user's Google Drive to be reopened later
				if (date - this.d <= 7776e6) this.i = newDocs.push(this) - 1;
				udocs.push(this.h);
			} else {
				// If this document hasn't been edited in 30 days, remove it to save space in localStorage
				// Unless it's the only one in storage
				if (date - this.d <= 2592e6) this.i = newDocs.push(this) - 1;
			}
		});
		// Save the changes to localStorage
		storage.set('d', newDocs);


		// Load document from URL hash, from localStorage, or create a new one
		var hash = location.hash.substring(1);

		// Tries to load document from localStorage
		// Called after checking for hash in URL
		function loadFromLocal() {
			// Sort docs into local and drive
			// Sorts based on last modification to move more recent documents to the front
			var gdocs = [],
				userDocs = [],
				storageDocs = storage.get('d').sort(function(a,b) {
					return a.d - b.d;
				});
			forEach(storageDocs, function() {
				(this.g ? gdocs : userDocs).unshift(this);
			});

			if (storageDocs.length > 1 || gdocs.length > 0 || location.hash.trim().toLowerCase() == '#v=s') {

				function createFileSelector(r1, r2, r3, isDrive, classname, attrs) {
					var div = document.createElement('div'), date;
					div.className = 'docSelect' + (classname ? ' ' + classname.join(' ') : '');
					if (isDrive && !isNaN(r3)) {
						var now = new Date().getTime();
						date = now - r3 < 36e5 ? Math.floor((now - r3) / 6e4) + ' minute' : now - r3 < 864e5 ? Math.floor((now - r3) / 36e5) + ' hour' : Math.floor((now - r3) / 864e5) + ' day';
						date += parseInt(date) == 1 ? ' ago' : 's ago';
						date = now - r3 < 6e4 ? '&lt; 1 minute ago' : date;
					}
					div.innerHTML = '<div class="cln">' + (r1 || '<span style="font-style:italic">Untitled Document</span>') + '</div><div class="clo">' + (r2 || ' ') + '</div><div class="clp"' + (isDrive && !isNaN(r3) ? ' data-time="' + r3 + '"' : '') + '>' + (date || r3 || ' ') + '</div>';
					div.title = r1 + '\n' + r2 + '\n' + (date || r3);
					div.tabIndex = 0;
					div.addEventListener('click', function() {
						forEach(document.querySelectorAll('.docSelect.active'), function() {
							this.className = this.className.replace(/\s*active\s*/g,'');
						});
						this.className += ' active';
						this.parentNode.className = 'active';
						document.getElementById(isDrive ? 'localDocsSelect' : 'driveDocsSelect').className = '';
						this.parentNode.selectedDocument = this;
						document.getElementById('iDj').style.display = '';
					});
					div.addEventListener('dblclick', function() {
						forEach(document.querySelectorAll('.docSelect.active'), function() {
							this.className = this.className.replace(/\s*active\s*/g,'');
						});
						this.className += ' active';
						this.parentNode.className = 'active';
						document.getElementById(isDrive ? 'localDocsSelect' : 'driveDocsSelect').className = '';
						this.parentNode.selectedDocument = this;

						document.getElementById(isDrive ? 'IdR' : 'IdU').dispatchEvent(new MouseEvent('click'));
					});
					div.isDocSelector = true;
					for (var attr in attrs) div[attr] = attrs[attr];
					div.addEventListener('keydown', function(e) {
						if (e.keyCode == 13 || e.keyCode == 32) this.dispatchEvent(new MouseEvent('click'));
					})
					document.getElementById(isDrive ? 'driveDocsSelect' : 'localDocsSelect').appendChild(div);
				}

				function getGoogleDocs(chooseFirst) {
					gdocs = storage.get('d').filter(function(a) {
						return a.g;
					}).sort(function(a,b) {
						return b.d - a.d;
					});
					if (gdocs.length && HTMLStudio.google.exists() && HTMLStudio.google.signedIn) {
						var batch = gapi.client.newBatch(),
							access_token = HTMLStudio.google.user.token(),
							deletedDocs = [],
							successfulDocs = [],
							udocs = [];

						// Remove files with duplicate IDs just as a backup
						gdocs = gdocs.filter(function(a) {
							if (~udocs.indexOf(a.h)) return false;
							udocs.push(a.h);
							return true;
						});

						forEach(gdocs, function(doc,i) {
							// Only batch requests the first 40 Google docs in storage (stops the user from eating up the quota)
							if (i >= 40) return "break";
							try {
								batch.add(gapi.client.request({
									path: 'https://www.googleapis.com/drive/v3/files/' + this.h,
									params: {
										fields: 'capabilities, name'
									},
									headers: {
										Authorization: 'Bearer ' + access_token
									}
								}), {id: this.h});
							} catch (_) {}
						});

						batch.then(function(response) {
							if (response.status >= 200 && response.status < 300) {
								forEach(gdocs, function() {

									// File is permanently gone or cannot be found in the first place, delete from localStorage
									if (response.result[this.h].status == 410) {
										deletedDocs.push(this);
									// Request was successful
									} else if (response.result[this.h].status >= 200 && response.result[this.h].status < 300 && response.result[this.h].result.capabilities.canEdit && !~successfulDocs.indexOf(this)) {
										this.n = response.result[this.h].result.name;
										successfulDocs.push(this);
									}
								});
							} else {
								var selector = document.getElementById('driveDocsSelect');
								selector.innerHTML = '<div id="IdK">There was a problem connecting to Google. Make sure you have a valid Internet connection and refresh.</div>';
								selector.className = 'active';
							};

							// Remove deleted Google files from localStorage
							if (deletedDocs.length) {
								var udocs = storageDocs.map(function(a) {
									return a.u;
								});
								forEach(deletedDocs, function() {
									var index = udocs.indexOf(this.u);
									if (!~index) return;
									storageDocs.splice(index, 1);
									udocs.splice(index, 1);
								});

								// Give each item the correct index
								forEach(storageDocs, function(_,i) {
									this.i = i;
								});

								storage.set('d', storageDocs);
							}

							if (successfulDocs.length) {
								document.getElementById('driveDocsSelect').innerHTML = '';
								forEach(successfulDocs, function() {
									createFileSelector(this.n, 'Last Modified:', this.d, true, null, {googleDoc: this});
								});
								if (chooseFirst) document.getElementById('driveDocsSelect').firstElementChild.dispatchEvent(new MouseEvent('click'));
							} else {
								document.getElementById('driveDocsSelect').innerHTML = '<div id="IdK">No recent Google Docs found. Open or create a new one below.</div>';
								googleLogInStatus(true);
							}
						}, function() {
							document.getElementById('driveDocsSelect').innerHTML = '<div id="IdK">There was a problem connecting to Google. Make sure you have a valid Internet connection and refresh.</div>';
						});
					} else if (HTMLStudio.google.triedAutoAuth && gapi.auth2 && gapi.auth2.getAuthInstance().isSignedIn.get()) {
						document.getElementById('driveDocsSelect').innerHTML = '<div id="IdK">No recent Google Docs found. Open or create a new one below.</div>';
						googleLogInStatus(true);
					} else if (HTMLStudio.network.connected) document.getElementById('driveDocsSelect').innerHTML = '<div id="IdK">Sign into Google Drive below to access files from Drive.</div>';
					else document.getElementById('driveDocsSelect').innerHTML = '<div id="IdK">Connect to the Internet to access files from Google Drive.</div>';
				};

				function getLocalDocs() {
					var now = new Date().getTime(),
						docs = storage.get('d');
					// Remove expired local documents
					docs = docs.filter(function(a) {
						return a.g || now - a.d <= 2592e6;
					});
					// Get only local docs and sort inversely by last modification date
					userDocs = docs.filter(function(a) {
						return !a.g;
					}).sort(function(a,b) {
						return b.d - a.d;
					});
					// Set in storage unless it's the only local document
					if (userDocs.length > 1) storage.set('d',docs);
					if (userDocs.length) {
						document.getElementById('localDocsSelect').innerHTML = '';
						forEach(userDocs, function() {
							var difference = now - this.d,
								mdifference = this.d + 2592e6 - now,
								expiration = difference < 16416e5 ? false : difference < 20736e5 ? 1 : difference < 23328e5 ? 2 : difference < 25056e5 ? 3 : 4,
								relativeTime = !expiration || userDocs.length < 2 ? (difference < 36e5 ? Math.floor(difference / 6e4) + ' minute' : difference < 864e5 ? Math.floor(difference / 36e5) + ' hour' : Math.floor(difference / 864e5) + ' day') : (mdifference < 36e5 ? Math.floor(mdifference / 6e4) + ' minute' : mdifference < 864e5 ? Math.floor(mdifference / 36e5) + ' hour' : Math.floor(mdifference / 864e5) + ' day');
							if (expiration && userDocs.length > 1) relativeTime += parseInt(relativeTime) == 1 ? '' : 's';
							else relativeTime += parseInt(relativeTime) == 1 ? ' ago' : 's ago';

							relativeTime = difference < 6e4 ? expiration ? '&lt; 1 minute!' : '&lt; 1 minute ago' : relativeTime;

							createFileSelector(this.n, expiration && userDocs.length > 1 ? 'Expires In:' : 'Last Modified:', relativeTime, false, !expiration || userDocs.length < 2 ? false : ['e' + expiration], {localDoc: this});
						});
					} else {
						document.getElementById('localDocsSelect').innerHTML = '<div id="IdS">No recent documents in Temporary Storage.</div>'
					}
				}

				// Wait for user to sign in or change account
				HTMLStudio.google.user.listen.change(function() {
					// Wait for HTMLStudio.google.signedIn to be updated
					if (!HTMLStudio.document.loaded) setTimeout(getGoogleDocs, 0);
				});
				// Show Sign In / Sign Out button depending on whether user is logged in
				HTMLStudio.google.user.listen.status(googleLogInStatus);
				function googleLogInStatus(status) {
					if (status) {
						var IdM = document.getElementById('IdM'),
							IdN = document.getElementById('IdN'),
							IdO = document.getElementById('IdO'),
							IdP = document.getElementById('IdP');
						IdM.className = '';
						IdM.tabIndex = 0;
						document.getElementById('IdN').style.display = 'none';
						IdO.className = '';
						IdO.tabIndex = 0;
						document.getElementById('IdP').style.display = 'block';
					} else {
						var IdM = document.getElementById('IdM'),
							IdN = document.getElementById('IdN'),
							IdO = document.getElementById('IdO'),
							IdP = document.getElementById('IdP');
						IdM.className = 'inactive';
						IdM.removeAttribute('tabIndex');
						document.getElementById('IdN').style.display = 'block';
						IdO.className = 'inactive';
						IdO.removeAttribute('tabindex');
						document.getElementById('IdP').style.display = 'none';
					}
				}
				// Add listener for Sign Out button
				document.getElementById('IdP').addEventListener('click', function() {
					gapi.auth2.getAuthInstance().signOut();
				});
				// Change text depending on network connection
				HTMLStudio.network.listen(function(status) {
					if (status) getGoogleDocs();
					else document.getElementById('driveDocsSelect').innerHTML = '<div id="IdK">Connect to the Internet to access files from Google Drive.</div>';
				});

				// Attempt
				getGoogleDocs();
				getLocalDocs();

				// Update documents every 3 seconds to hide deleted documents and update time stamps
				var interval = setInterval(function() {
					if (HTMLStudio.document.loaded) return clearInterval(interval);

					var selected = document.querySelector('.docSelect.active'),
						focus = document.activeElement;
					if (!selected && (!focus || !focus.isDocSelector)) {
						getGoogleDocs();
						getLocalDocs();
						return;
					}
					if (selected) selected = (selected.localDoc || selected.googleDoc).u;
					focus = focus && focus.isDocSelector ? (focus.localDoc || focus.googleDoc).u : false;
					getGoogleDocs();
					getLocalDocs();
					var ended = 0;

					forEach(document.querySelectorAll('.docSelect'), function() {
						if ((this.localDoc || this.googleDoc).u == selected) {
							this.dispatchEvent(new MouseEvent('click'));
							if (!focus) return "break";
							ended++;
						}
						if ((this.localDoc || this.googleDoc).u == focus) {
							this.focus();
							if (!selected) return "break";
							ended++;
						}
						if (ended == 2) return "break";
					});
				},3000);

				// Button event listeners
				// Open Document button for Drive Document Selector
				document.getElementById('IdR').addEventListener('click', function() {
					var doc = document.getElementById('driveDocsSelect').selectedDocument;
					if (!(doc && doc.googleDoc)) return;
					if (!HTMLStudio.google.file.get(doc.googleDoc.h, function() {
						if (this.status >= 200 && this.status < 300) {
							var index;
							forEach(storage.get('d'), function(_,i) {
								if (this.u == doc.googleDoc.u) {
									index = i;
									return "break"
								}
							});
							if (isNaN(index)) return getLocalDocs(), getGoogleDocs
							HTMLStudio.document.i = index;
							HTMLStudio.document.g = true;

							loadHTML(this.responseText, doc.googleDoc.h, true)
						} else {
							var selector = document.getElementById('driveDocsSelect');
							selector.innerHTML = '<div id="IdK">There was a problem connecting to Google. Make sure you have a valid Internet connection and refresh.</div>';
							selector.className = '';
						}
					})) {
						var selector = document.getElementById('driveDocsSelect');
						selector.innerHTML = '<div id="IdK">There was a problem connecting to Google. Make sure you have a valid Internet connection and refresh.</div>';
						selector.className = '';
					}
				});
				// Open Document button for Local Document Selector
				document.getElementById('IdU').addEventListener('click', function() {
					var doc = document.getElementById('localDocsSelect').selectedDocument;
					if (!(doc && doc.localDoc)) return;
					var index;
					forEach(storage.get('d'), function(_,i) {
						if (this.u == doc.localDoc.u) {
							index = i;
							return "break"
						}
					});
					if (isNaN(index)) return getLocalDocs(), getGoogleDocs();
					HTMLStudio.document.i = index;

					loadHTML(doc.localDoc.h, doc.localDoc.o, false);
				});
				// Create New File button for Local Document Selector
				document.getElementById('IdW').addEventListener('click', function() {
					var div = document.createElement('div');
					div.className = 'docSelect';
					div.innerHTML = '<div class="cln"><input type="text" id="iDh"></div><div class="clo">New Document</div><div class="clp">Enter a Title</div>';
					div.title = 'Enter a title for the new document';
					div.tabIndex = 0;
					document.getElementById('iDq').appendChild(div);
					var iDh = document.getElementById('iDh');
					iDh.addEventListener('keydown', onEnter);
					iDh.addEventListener('blur', function() {
						var docs = storage.get('d');
						userDocs.unshift(docs[docs.length] = {
							i: docs.length,
							g: 0,
							n: this.value.trim(),
							h: '<html><head><title>' + this.value.trim() + '</title><meta charset="utf-8"></head><body style="background:white;padding:1em"><div style="text-align:center;font-family:Arial,sans-serif">New document saved in Temporary Storage.</div></body></html>',
							o: undefined,
							d: new Date().getTime(),
							u: +(new Date().getTime() + Math.random() + '').replace('.','')
						});
						storage.set('d', docs);
						getLocalDocs();
						document.getElementById('iDq').innerHTML = '';

						document.getElementById('localDocsSelect').firstElementChild.dispatchEvent(new MouseEvent('click'));
					});
					iDh.focus();
				});
				// Open New File button for Local Document Selector
				document.getElementById('IdV').addEventListener('click', function() {
					document.getElementById('iDi').click();
				});
				// Open file <input> onchange event for Local Document Selector
				document.getElementById('iDi').addEventListener('change', function() {
					if (!this.files.length) return;
					if (this.files[0].type.substring(0,5) != 'text/') {
						var iDj = document.getElementById('iDj');
						iDj.innerText = 'The file format for ' + this.files[0].name + ' is not allowed. Only HTML and plain text files can be opened.';
						iDj.style.display = 'block';
						return;
					}
					document.getElementById('iDj').style.display = '';

					var reader = new FileReader();
					reader.onload = function() {
						var doc = new DOMParser().parseFromString(reader.result, 'text/html');

						var docs = storage.get('d');
						userDocs.unshift(docs[docs.length] = {
							i: docs.length,
							g: 0,
							n: (doc.querySelector('title') || {innerText: ''}).innerText.trim(),
							h: HTMLStudio.formatHTML.minify(false, doc.documentElement),
							o: undefined,
							d: new Date().getTime(),
							u: +(new Date().getTime() + Math.random() + '').replace('.','')
						});
						storage.set('d',docs);

						getLocalDocs();
					}
					reader.readAsText(this.files[0]);
					this.value = null;
				});
				// Delete Document button for Local Document Selector
				document.getElementById('IdT').addEventListener('click', function() {
					document.getElementById('iDk').style.display = 'block';
					var dialog = document.getElementById('dialog_delete_storage_file');
					if (!HTMLStudio.DraggableElement.isInstance(dialog)) {
						new HTMLStudio.DraggableElement(dialog, {bounds: 'body'});
					}
					dialog.querySelector('.content').scrollTop = 0;
					document.getElementById('iDl').focus();
					var resizer = dialog.querySelector('.dialog_resizer_right');
					if (!HTMLStudio.DraggableElement.isInstance(resizer)) {
						new HTMLStudio.DraggableElement(resizer, {
							doY: false,
							bounds: 'body',
							start: function(_,e) {
								e.stopPropagation();
								this.startWidth = parseFloat(getComputedStyle(this.parentNode).width);
								this.distance = 0;
							},
							move: function(e) {
								this.distance += e.coordinates.move.last.distance.x;
								this.parentNode.style.width = Math.max(this.startWidth + this.distance, innerWidth / 2) + 'px';
							},
							end: function() {
								this.style.left = parseFloat(getComputedStyle(this.parentNode).width) - em(.5) + 'px';
							}
						});
						new HTMLStudio.DraggableElement(resizer.previousElementSibling, {
							doY: false,
							bounds: 'body',
							start: function(_,e) {
								e.stopPropagation();
								var style = getComputedStyle(this.parentNode);
								this.startWidth = parseFloat(style.width);
								this.startLeft = parseFloat(style.left);
								this.distance = 0;
							},
							move: function(e) {
								this.distance += e.coordinates.move.last.distance.x;
								this.parentNode.style.width = Math.max(this.startWidth - this.distance, innerWidth / 2) + 'px';
								this.parentNode.style.left = (this.startWidth - this.distance >= innerWidth / 2 ? this.startLeft + this.distance : this.startLeft + this.startWidth - innerWidth / 2) + 'px';
							},
							end: function() {
								this.style.left = '-1px';
								resizer.style.left = parseFloat(getComputedStyle(this.parentNode).width) - em(.5) + 'px';
							}
						});
					}
				});
				// Delete Document button for Local Document Selector > Permanently Delete button
				document.getElementById('iDl').addEventListener('click', function() {
					var selector = document.getElementById('localDocsSelect'),
						doc = selector.selectedDocument;
					if (!doc) return;
					if (!doc.localDoc) return;

					var docs = storage.get('d');
					forEach(docs, function(_,i) {
						if (this.u == doc.localDoc.u) {
							docs.splice(i, 1);
							return "break";
						}
					});
					storage.set('d', docs);

					getLocalDocs();

					selector.className = '';
					selector.selectedDocument = null;

					document.getElementById('iDk').style.display = '';
				});
				// Open New File button for Drive Document Selector
				document.getElementById('IdM').addEventListener('click', function() {
					HTMLStudio.google.file.picker(function(e) {
						document.getElementById('iDm').style.display = document.getElementById('iDo').style.display = '';
						var doc = e.docs[0];
						if (!doc) return;

						if (!HTMLStudio.google.file.get(doc.id, function() {
							if (this.status >= 200 && this.status < 300) {
								var html = this.responseText;

								var docs = storage.get('d');
								docs[docs.length] = {
									i: docs.length,
									g: 1,
									n: doc.name,
									h: doc.id,
									o: doc.id,
									d: doc.lastEditedUtc,
									u: +(new Date().getTime() + Math.random() + '').replace('.','')
								};
								storage.set('d', docs);
								getGoogleDocs();

								document.getElementById('driveDocsSelect').firstElementChild.dispatchEvent(new MouseEvent('click'));
							} else {
								var iDm = document.getElementById('iDm');
								idM.innerText = 'There was a problem retrieving information for ' + doc.name + '. Make sure you have an Internet connection and try again, or select another document.';
								iDm.style.display = 'block';
								document.getElementById('iDo').style.display = '';
							}
						})) {
							var iDm = document.getElementById('iDm');
							iDm.innerText = 'There was a problem retrieving information for ' + doc.name + '. Make sure you have an Internet connection and try again, or select another document.';
							iDm.style.display = 'block';
							document.getElementById('iDo').style.display = '';
						}
					}).setVisible(true);
				});
				// Create New File button for Drive Document Selector
				document.getElementById('IdO').addEventListener('click', function() {
					document.getElementById('iDm').style.display = document.getElementById('iDo').style.display = '';
					var div = document.createElement('div');
					div.className = 'docSelect';
					div.innerHTML = '<div class="cln"><input type="text" id="iDh"></div><div class="clo">New Document</div><div class="clp">Enter a Title</div>';
					div.title = 'Enter a title for the new document';
					div.tabIndex = 0;
					var selector = document.getElementById('driveDocsSelect');
					if (selector.firstElementChild.id == 'IdK') selector.innerHTML = '';
					document.getElementById('iDr').appendChild(div);
					var iDh = document.getElementById('iDh');
					iDh.addEventListener('keydown', onEnter);
					iDh.addEventListener('blur', function() {
						// Send XHR to create new document
						var xhr = new XMLHttpRequest(),
							name = this.value.trim() || '';

						xhr.open('POST','https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable');
						xhr.setRequestHeader('Authorization', 'Bearer ' + HTMLStudio.google.user.token());
						xhr.addEventListener('readystatechange', function() {
							if (this.readyState == 4) {
								if (this.status >= 200 && this.status < 300) {
									var uploadUrl = this.getResponseHeader('Location');
									
									xhr = new XMLHttpRequest();
									xhr.open('PUT', uploadUrl);
									xhr.addEventListener('readystatechange', function() {
										if (this.readyState == 4) {
											if (this.status >= 200 && this.status < 300) {
												var doc = JSON.parse(this.response);

												var docs = storage.get('d');
												docs[docs.length] = {
													i: docs.length,
													g: 1,
													n: doc.name,
													h: doc.id,
													o: doc.id,
													d: new Date().getTime(),
													u: +(new Date().getTime() + Math.random() + '').replace('.','')
												};
												storage.set('d', docs);

												getGoogleDocs(true);

												document.getElementById('iDr').innerHTML = '';
											} else {
												document.getElementById('iDm').style.display = '';
												document.getElementById('iDo').style.display = 'block';
											}
										}
									});
									xhr.send('<!DOCTYPE html>\n<!-- Created with HTML Studio (https://christianfigueroa.github.io/HTML-Studio) -->\n<html>\n\t<head>\n\t\t<title>' + name.replace(/\.html?$/,'') + '</title>\n\t\t<meta charset="utf-8">\n\t</head>\n\t<body style="background:white;padding:1em">\n\t\t<div style="text-align:center;font-family:Arial,sans-serif">New document saved in Google Drive.</div>\n\t</body>\n</html>');
								} else {
									document.getElementById('iDm').style.display = '';
									document.getElementById('iDo').style.display = 'block';
								}
							}
						});
						xhr.setRequestHeader('X-Upload-Content-Type', 'text/html');
						xhr.setRequestHeader('X-Upload-Content-Length', 285 + name.replace(/\.html?$/,'').length + location.origin.length + location.pathname.length);
						xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
						xhr.send(name ? JSON.stringify({name: name.substring(name.length - 5) == '.html' ? name : name.substring(name.length - 4) == '.htm' ? name : name + '.html'}) : '{}');
					});
					iDh.focus();
				});
				// Hide from Recents button for Drive Document Selector
				document.getElementById('IdQ').addEventListener('click', function() {
					var selector = document.getElementById('driveDocsSelect'),
						doc = selector.selectedDocument;
					if (!doc) return;
					if (!doc.googleDoc) return;

					var docs = storage.get('d');
					forEach(docs, function(_,i) {
						if (this.u == doc.googleDoc.u) {
							docs.splice(i, 1);
							return "break";
						}
					});
					storage.set('d', docs);

					getGoogleDocs();

					selector.className = '';
					selector.selectedDocument = null;
				});


				// Show the document selector
				document.getElementById('loadDriveSignIn').style.display = 'none';
				document.getElementById('loadingScreen').style.display = 'none';
				document.getElementById('loadSelectDoc').style.display = 'block';

			// User has only edited one document
			} else if (storageDocs.length == 1 && userDocs.length == 1) {
				HTMLStudio.document.i = 0;
				loadHTML(storageDocs[0].h, storageDocs[0].o, false);
			} else {
				HTMLStudio.document.i = 0;
				loadHTML('<html><head><title>Welcome to HTML Studio!</title><meta charset="utf-8"><style data-name="Starter Style Sheet">#title{font:bold 7.5vw "Roboto Slab",Arial,sans-serif;text-align:center;margin:0}body{background:#F5F5F5;color:rgba(0,0,0,.87);padding:1em 0 2em}#subtitle{font:1.5em "Open Sans",Arial,sans-serif;text-align:center;width:80%;margin:auto;font-weight:initial}p{font-family:"Open Sans",Arial,sans-serif;width:80%;margin:2em auto;text-align:justify}</style></head><body><h1 id="title">Welcome to HTML Studio!</h1><h3 id="subtitle">A web app to create custom HTML files by interacting directly with the document and its nodes</h3><p style="margin:5em auto 2em">HTML Studio lets you build custom webpages easily by letting you interact and edit all the elements on the webpage. Try double clicking on this paragraph. Now you can start changing the text inside the paragraph right away! When you\'re done, click on anything else and press Ctrl + Z or &#8984; + Z to undo.</p><p>Now click on this paragraph and right click on it to see all the options available to edit elements on the page. Click on an element again to deselect it. For more help getting started, hover over the blue <span style=\'font-family:"Roboto Slab",Arial,sans-serif;font-weight:bold\'>HTML Studio</span> logo in the top left corner and click Help.</p><p>Once you\'ve gotten the hang of things, use File &gt; New to create a new file and start making your own HTML documents. You can also open an existing HTML file using File &gt; Open. Sign into Google Drive™ using the Drive icon in the top right corner to access and edit files in your Google Drive. Once you\'re done, save the document as an HTML file using File &gt; Save.</p></body></html>')
			}
		}


		// Check for hash values in URL
		try {
			// Check if hash is valid
			// #d=[Google Doc ID]
			// #c=[Encoded HTML] (for small files only)
			// #i=[Index of document in localStorage to open]
			// #o=[ID of document to open in sessionStorage]
			// #v=s (shows document selector no matter the amount of documents in storage)
			// If an error occurs along the way, load from localStorage
			if (/^(?:d|c|i|o)=/i.test(hash)) {

				// Load document from drive
				if (hash[0].toLowerCase() == 'd') {
					// Set `hash` == [Google Doc ID]
					hash = hash.substring(2).match(/[^&]+|/)[0];
					if (!hash) throw new Error;

					// If user doesn't have a connection, load from localStorage
					if (HTMLStudio.network.disconnected) throw new Error;

					// Waits for Google API to load
					function testForGoogle() {
						// If Google API has loaded
						if (window.gapi) {
							// Keeps track of whether a Google user change listener has been applied
							var waitForChange = false;
							// Wait for Google to log user in
							function testForSignInStatus() {
								// Check if user has been auto-signed in
								if (HTMLStudio.google.exists() && HTMLStudio.google.signedIn) {
									// Get text content of file
									HTMLStudio.google.file.get(hash, function() {
										// If XHR was successful, load the HTML into the document
										if (this.status >= 200 && this.status < 300) {

											HTMLStudio.document.i = storage.get('d').length;
											HTMLStudio.document.g = true;

											loadHTML(this.responseText, hash, true);
										// Else, show error <div>
										} else {
											document.getElementById('iDg').style.display = 'block';
											// The rest of this only applies when the user is auto-logged on but doesn't have permission
											document.getElementById('loadDriveSignIn').style.display = 'block';
											document.getElementById('loadingScreen').style.display = 'none';
											if (!waitForChange) HTMLStudio.google.user.listen.change(function() {
												testForSignInStatus();
											});
											waitForChange = true;
										}
									});

								// User hasn't been signed in after auto-login period has passed
								} else if (HTMLStudio.google.triedAutoAuth) {
									// Ask user to log in manually
									document.getElementById('loadDriveSignIn').style.display = 'block';
									document.getElementById('loadingScreen').style.display = 'none';
									HTMLStudio.google.user.listen.change(function(status) {
										// User should be signed in;
										// Try getting file now
										var authExists = false;
										try {
											gapi.auth2.getAuthInstance().isSignedIn.get();
											authExists = true;
										} catch (_) {};
										if (!HTMLStudio.document.loaded && authExists) testForSignInStatus();
									});

									HTMLStudio.google.user.listen.status(function(status) {
										if (status) testForSignInStatus();
									});
									waitForChange = true;

									document.getElementById('IdL').addEventListener('click', loadFromLocal);
								// User hasn't been logged in; try again in 50 ms
								} else {
									setTimeout(function() {
										testForSignInStatus();
									}, 50)
								}
							}

							testForSignInStatus();
						// Else if user lost connection, load from localStorage
						} else if (HTMLStudio.network.disconnected) loadFromLocal();
						// Else, user has connection, but Google is still loading; try again in 50ms
						else setTimeout(testForGoogle, 50);
					}
					// Initiate the whole thing
					testForGoogle();
				// Load document from provided HTML
				} else if (hash[0].toLowerCase() == 'c') {
					// Set `hash` == [Encoded HTML]
					hash = hash.substring(2).match(/[^&]+|/)[0];
					if (!hash) throw new Error;

					HTMLStudio.document.i = storage.get('d').length;
					loadHTML(decodeURIComponent(hash));
				} else if (hash[0].toLowerCase() == 'i') {
					hash = parseInt(hash.substring(2).match(/[^&]+|/)[0]);
					if (isNaN(hash) || storage.get('d').length - 1 < hash || hash < 0) throw new Error;

					HTMLStudio.document.i = hash;
					var doc = storage.get('d')[hash];
					if (doc.g) {
						if (HTMLStudio.network.disconnected) throw new Error;

						// Waits for Google API to load
						function testForGoogle() {
							// If Google API has loaded
							if (window.gapi) {
								// Wait for Google to log user in
								// `Iteration` Keeps track of how time has passed
								function testForSignInStatus() {
									// Keeps track of whether a Google user change listener has already been applied
									var waitForChange = false;
									// Check if user has been auto-signed in
									if (HTMLStudio.google.exists() && gapi.auth2 && gapi.auth2.getAuthInstance().isSignedIn.get()) {
										// Get text content of file
										HTMLStudio.google.file.get(doc.h, function() {
											// If XHR was successful, load the HTML into the document
											if (this.status >= 200 && this.status < 300) {

												HTMLStudio.document.i = storage.get('d').length;
												HTMLStudio.document.g = true;

												loadHTML(this.responseText, doc.h, true);
											// Else, show error <div>
											} else {
												document.getElementById('iDg').style.display = 'block';
												// The rest of this only applies when the user is auto-logged on but doesn't have permission
												document.getElementById('loadDriveSignIn').style.display = 'block';
												document.getElementById('loadingScreen').style.display = 'none';
												if (!waitForChange) HTMLStudio.google.user.listen.change(function() {
													testForSignInStatus();
												});
												waitForChange = true;
											}
										});

									// User hasn't been signed in after auto-login period has passed
									} else if (HTMLStudio.google.triedAutoAuth) {
										// Ask user to log in manually
										document.getElementById('loadDriveSignIn').style.display = 'block';
										document.getElementById('loadingScreen').style.display = 'none';
										HTMLStudio.google.user.listen.change(function(status) {
											// User should be signed in;
											// Try getting file now
											var authExists = false;
											try {
												gapi.auth2.getAuthInstance().isSignedIn.get();
												authExists = true;
											} catch (_) {};
											if (!HTMLStudio.document.loaded && authExists) testForSignInStatus();
										});

										HTMLStudio.google.user.listen.status(function(status) {
											if (status) testForSignInStatus();
										});
										waitForChange = true;

										document.getElementById('IdL').addEventListener('click', loadFromLocal);
									// User hasn't been logged in; try again in 50 ms
									} else {
										setTimeout(function() {
											testForSignInStatus();
										}, 50)
									}
								}

								testForSignInStatus();
							// Else if user lost connection, load from localStorage
							} else if (HTMLStudio.network.disconnected) loadFromLocal();
							// Else, user has connection, but Google is still loading; try again in 50ms
							else setTimeout(testForGoogle, 50);
						}
						// Initiate the whole thing
						testForGoogle();
					} else {
						HTMLStudio.document.i = hash;
						loadHTML(doc.h, doc.o, false);
					}
				} else {
					// Large files can't be encoded into the URL since the browser might think HTML Studio is actually
					// stealing sensitive information instead of just an HTML file
					// Instead, #o= is equal to a pre-generated string of numbers that corresponds to a key in sessionStorage
					// The key is set to the HTML text so that HTML Studio can read it from there instead of the URL
					// IDs expire after 10 seconds or after being read

					hash = hash.substring(2).match(/[^&]+|/)[0];
					var html = sessionStorage.getItem(hash);

					if (!hash || typeof html != 'string') throw new Error;

					sessionStorage.removeItem(hash);

					HTMLStudio.document.i = storage.get('d').length;
					loadHTML(html);
				}
			} else loadFromLocal();
		} catch (e) {
			loadFromLocal();
		}

		// HTMLStudioDocument constructor
		// Initial function to load HTML into the document editor and gather/set data for HTMLStudio.document
		function loadHTML(html, id, isDriveFile) {
			if (isDriveFile) {
				var preExisting = false;
				forEach(storage.get('d'), function(_,i) {
					if (this.g && this.h == id) return preExisting = i + 1, "break";
				});
				if (preExisting) {
					var doc = storage.get('d')[preExisting - 1];
					HTMLStudio.document.i = doc.i;
					HTMLStudio.document.g = doc.g;
					HTMLStudio.document.n = doc.n;
					HTMLStudio.document.h = HTMLStudio.document.o = doc.h;
				}
			}

			// Set new last-edit date
			HTMLStudio.document.d = new Date().getTime();
			// Set HTMLStudio.document.g to a boolean
			HTMLStudio.document.g = HTMLStudio.document.g ? 1 : 0;
			// Set id of document
			HTMLStudio.document.u = (storage.get('d')[HTMLStudio.document.i] || {u: +(new Date().getTime() + Math.random() + '').replace('.','')}).u || (new Date().getTime() + Math.random() + '').replace('.','');

			// Resort docs in storage and assign URL hash for current document
			var oldDocs = storage.get('d'),
				newDocs = [],
				doc = oldDocs[HTMLStudio.document.i] || {i: HTMLStudio.document.i},
				hashChanged = false,
				charset;
			doc.d = HTMLStudio.document.d;

			forEach(oldDocs, function(_,i) {
				this.i = newDocs.push(this) - 1;
				if (this == doc) {
					location.replace('#i=' + (HTMLStudio.document.i = this.i));
					hashChanged = true
				}
			});
			if (!hashChanged) {
				location.replace('#i=' + (HTMLStudio.document.i = newDocs.length));
			}
			storage.set('d',newDocs);


			// Parse the HTML into an HTML document
			var doc = new DOMParser().parseFromString(html, 'text/html');

			// Set stylesheets into HTMLStudio.document
			var stylesheets = Array.prototype.slice.call(doc.querySelectorAll('style')),
				stylesheetObjects = stylesheets.map(function(stylesheet) {
					return {
						html: stylesheet.outerHTML,
						node: stylesheet,
						name: stylesheet.getAttribute('data-name') || ''
					}
				});
			HTMLStudio.document.stylesheets = stylesheetObjects;

			// Get title of document from <title>
			var title = doc.querySelector('title');
			if (!title) doc.head.appendChild(title = document.createElement('title'));
			HTMLStudio.document.n = title.innerText;
			framewindow.document.head.appendChild(title);

			// Set charset of document
			if (charset = doc.querySelector('meta[charset]')) {
				HTMLStudio.document.meta.charset = charset.getAttribute('charset') || 'utf-8';
				framewindow.document.head.appendChild(charset);
			} else if (charset = doc.querySelector('meta[http-equiv][content*="charset="]')) {
				HTMLStudio.document.meta.charset = charset.getAttribute('content').match(/charset=(.*?)(?=;|$)/)[1] || 'utf-8';
				framewindow.document.head.appendChild(charset);
			}

			// Put HTML into document
			framewindow.document.body.outerHTML = doc.body.outerHTML;
			// Removes duplicate <head>s
			var firstHead = false;
			Array.prototype.slice.call(framewindow.document.documentElement.children).forEach(function(element) {
				if (element.nodeName == 'HEAD') {
					if (firstHead) element.parentNode.removeChild(element);
					else firstHead = true;
				}
			});
			// Save HTML into HTMLStudio.document
			HTMLStudio.document.h = HTMLStudio.document.g ? id : HTMLStudio.formatHTML.minify(false,framewindow.document.documentElement);
			HTMLStudio.document.o = id || null;
			// Save original HTML
			HTMLStudio.document.originalHTML = html;

			// Give history its first entry
			history.entries = [new (function HTMLStudioDocument() {
				this.i = HTMLStudio.document.i;
				this.g = HTMLStudio.document.g;
				this.n = HTMLStudio.document.n;
				this.h = HTMLStudio.document.h;
				this.o = HTMLStudio.document.o;
				this.d = HTMLStudio.document.d;
				this.u = HTMLStudio.document.u;
				this.meta = cloneData(HTMLStudio.document.meta);
				this.originalHTML = HTMLStudio.document.originalHTML;
				this.stylesheets = cloneData(HTMLStudio.document.stylesheets);
				this.html = HTMLStudio.formatHTML.minify(false, framewindow.document.documentElement);
				this.loaded = true;
			})];
			history.currentEntry = 0;

			history.changeMethod(HTMLStudio.document.g ? 'drive' : 'local', HTMLStudio.document.h, true);

			// Extra stuff to format document to edit in HTML Studio
			framewindow.document.body.style.margin = framewindow.document.body.style.margin || '0';
			framewindow.document.documentElement.style.overflow = overlay.parentNode.style.overflow = 'hidden';

			updateStylesheets();


			// Set document load boolean to true
			HTMLStudio.document.loaded = true;

			// Show document editor
			document.body.className = '';
			document.getElementById('loadDriveSignIn').style.display = 'none';
			document.getElementById('loadingScreen').style.display = 'none';
			document.getElementById('loadSelectDoc').style.display = 'none';
			overlayUpdate();

			// Update #title
			document.getElementById('title').value = title.innerText;
			title = document.getElementById('title');
			if (!title.value) title.style.fontStyle = 'italic';
			else title.style.fontStyle = '';
			var width = document.getElementById('titlewidth');
			width.innerHTML = '&nbsp;<i>Untitled HTML Document</i>&nbsp;';
			title.style.minWidth = Math.min(innerWidth * .85, Math.max(innerWidth / 5, width.scrollWidth)) + 'px';
			width.innerText = title.value.replace(/ /g, '\u00a0');
			title.style.width = width.scrollWidth + em(.6) + 'px';
			document.title = (title.value.trim() ? title.value.trim() + ' - ' : '') + 'HTML Studio \xb7 ChristianFigueroa.GitHub.io';
			framewindow.document.querySelector('title').innerText = HTMLStudio.document.n;

			if (!HTMLStudio.document.g) HTMLStudio.document.h = HTMLStudio.formatHTML.minify(false, framewindow.document.documentElement);

			HTMLStudio.document.update();

			var map = {};
			forEach(storage.get('d'), function(_,i) {
				map[this.u] = this.i;
			});
			storage.set('u', map);

			if (id && !isDriveFile && HTMLStudio.document.o && !HTMLStudio.network.disconnected) {
				function check() {
					if (HTMLStudio.network.connected) {
						openDialog('ex_drive_file');
					} else if (!HTMLStudio.network.disconnected) {
						setTimeout(check, 50);
					}
				}
				check();
			}

			function checkConnection(status) {
				if (HTMLStudio.network.disconnected && HTMLStudio.document.g) {
					// The user is not connected to the Internet but is editing a Google Doc
					document.getElementById('error_saving_to_drive').className = 'notice error';
					document.getElementById('error_resaving').className = 'notice error';
					document.getElementById('no_network_editing').className = 'notice error active';
					history.changeMethod('local');
					function listener(status) {
						if (status) {
							HTMLStudio.network.unlisten(listener);
							history.changeMethod('drive', HTMLStudio.document.o, false, function() {
								document.getElementById('no_network_editing').className = 'notice error';
								var notice = document.getElementById('success_saving_to_drive');
								notice.className = 'notice success active';
								setTimeout(function() {
									notice.className = 'notice success';
								}, 2500);
							});
						}
					}
					HTMLStudio.network.listen(listener);
				}
			}
			checkConnection();
			HTMLStudio.network.listen(checkConnection);

			setInterval(function() {
				function refreshDoc(html, date, isDrive) {
					HTMLStudio.document.d = date;

					framewindow.document.documentElement.style.overflow = '';
					HTMLStudio.document.html = HTMLStudio.formatHTML.minify(false, framewindow.document.documentElement);
					HTMLStudio.document.h = isDrive ? isDrive : HTMLStudio.document.html;
					framewindow.document.documentElement.style.overflow = 'hidden';

					if (html == HTMLStudio.document.html || HTMLStudio.document.g != isDrive) return;
					
					HTMLStudio.document.g = isDrive ? 1 : 0;
					// The current document needs to be synced to match `html`
					var doc = new DOMParser().parseFromString(html, 'text/html');

					framewindow.document.documentElement.innerHTML = '<head></head><body></body>';

					// Set stylesheets into HTMLStudio.document
					var stylesheets = Array.prototype.slice.call(doc.querySelectorAll('style')),
						stylesheetObjects = stylesheets.map(function(stylesheet) {
							return {
								html: stylesheet.outerHTML,
								node: stylesheet,
								name: stylesheet.getAttribute('data-name') || ''
							}
						});
					HTMLStudio.document.stylesheets = stylesheetObjects;

					// Get title of document from <title>
					var title = doc.querySelector('title');
					if (!title) doc.head.appendChild(title = document.createElement('title'));
					HTMLStudio.document.n = title.innerText;
					framewindow.document.head.appendChild(title);
					

					// Set charset of document
					if (charset = doc.querySelector('meta[charset]')) {
						HTMLStudio.document.meta.charset = charset.getAttribute('charset') || 'utf-8';
						var existingCharset = framewindow.document.querySelector('meta[charset], meta[http-equiv][content*="charset="]');
						if (existingCharset) existingCharset.parentNode.removeChild(existingCharset);
						framewindow.document.head.insertBefore(charset, framewindow.document.head.firstChild);
					} else if (charset = doc.querySelector('meta[http-equiv][content*="charset="]')) {
						HTMLStudio.document.meta.charset = charset.getAttribute('content').match(/charset=(.*?)(?=;|$)/)[1] || 'utf-8';
						var existingCharset = framewindow.document.querySelector('meta[charset], meta[http-equiv][content*="charset="]');
						if (existingCharset) existingCharset.parentNode.removeChild(existingCharset);
						framewindow.document.head.insertBefore(charset, framewindow.document.head.firstChild);
					}

					// Put HTML into document
					framewindow.document.body.outerHTML = doc.body.outerHTML;
					// Removes duplicate <head>s
					var firstHead = false;
					Array.prototype.slice.call(framewindow.document.documentElement.children).forEach(function(element) {
						if (element.nodeName == 'HEAD') {
							if (firstHead) element.parentNode.removeChild(element);
							else firstHead = true;
						}
					});

					updateStylesheets();

					overlayUpdate();

					// Update #title
					document.getElementById('title').value = title.innerText;
					title = document.getElementById('title');
					if (!title.value) title.style.fontStyle = 'italic';
					else title.style.fontStyle = '';
					var width = document.getElementById('titlewidth');
					width.innerHTML = '&nbsp;<i>Untitled HTML Document</i>&nbsp;';
					title.style.minWidth = Math.min(innerWidth * .85, Math.max(innerWidth / 5, width.scrollWidth)) + 'px';
					width.innerText = title.value.replace(/ /g, '\u00a0');
					title.style.width = width.scrollWidth + em(.6) + 'px';
					document.title = (title.value.trim() ? title.value.trim() + ' - ' : '') + 'HTML Studio \xb7 ChristianFigueroa.GitHub.io';
					framewindow.document.querySelector('title').innerText = HTMLStudio.document.n;

					HTMLStudio.document.update(HTMLStudio.document.g && HTMLStudio.google.signedIn && HTMLStudio.google.exists() ? {} : {d:date});

					var map = {};
					forEach(storage.get('d'), function(_,i) {
						map[this.u] = this.i = i;
						if (this.u == HTMLStudio.document.u) HTMLStudio.document.i = i;
					});
					storage.set('u', map);

					history.update('Sync document');
				}

				var doc = storage.get('d')[storage.get('u')[HTMLStudio.document.u]];

				var docs = storage.get('d'),
					map = {},
					exists = false;
				forEach(docs, function(_,i) {
					map[this.u] = this.i = i;
					if (this.u == HTMLStudio.document.u) {
						exists = true;
						location.replace('#i=' + i);
						HTMLStudio.document.i = i;

						// Check if file has been modified somewhere else
						//  and update the current file in current tab to match
						if (this.g) {
							if (this.d != HTMLStudio.document.d) {
								HTMLStudio.google.file.get(HTMLStudio.document.h, function() {
									if (this.status >= 200 && this.status < 300) {
										refreshDoc(this.responseText, this.d, docs[i].h);
									}
								});
							} else {
								HTMLStudio.google.file.get(HTMLStudio.document.h, function() {
									var date
									if (this.status >= 200 && this.status < 300 && (date = new Date(JSON.parse(this.response).modifiedTime).getTime()) != HTMLStudio.document.d) {
										HTMLStudio.google.file.get(HTMLStudio.document.h, function() {
											if (this.status >= 200 && this.status < 300) {
												refreshDoc(this.responseText, date, docs[i].h);
											}
										});
									}
								}, ['modifiedTime']);
							}
						} else {
							if (this.d != HTMLStudio.document.d) {
								refreshDoc(this.h, this.d, false);
							}
						}
					}
				});

				// Document has been deleted; Show warning
				if (exists) {
					document.getElementById('deletedWarning').className = 'notice error';
				} else {
					var warning = document.getElementById('deletedWarning');
					if (warning.className.includes('active')) return;
					warning.className = 'notice error active';
					document.getElementById('idy').innerHTML = HTMLStudio.document.g ? 'This document is no longer saved in your recents and all changes made to this document are <strong>not</strong> being saved to Google Drive. Do you want to re-add this document to recents to edit it, or hide it?' : 'This document was just deleted somewhere else and all changes made to this document are <strong>not</strong> being saved. Do you want to re-save this document or permanently delete it?';
					document.getElementById(HTMLStudio.document.g ? 'iD6' : 'idz').className = 'active';
					document.getElementById('Idj').className = document.getElementById(HTMLStudio.document.g ? 'idz' : 'iD6').className = '';
					HTMLStudio.document.i = -1;
					location.replace('#i=-1');
				}

				storage.set('u',map);
				storage.set('d',docs);
			},3000);
		}
	}();


	// Connect <body> and #overlay elements
	overlay.alias = framewindow.document.body;
	// Prepare for user copying
	prepareCopy();
	


	// Overlay event listeners
	overlay.addEventListener('contextmenu', function(e){
		if (e.shiftKey) return;
		e.preventDefault();
		e.stopPropagation();
		var index = selection.get.all().length > 1 ? 1 : 0;
		if (!index) (selection.get.first() || this).dispatchEvent(new MouseEvent('click'));
		if ((e.target.className.baseVal == undefined ? e.target.className : e.target.className.baseVal).includes('contextmenu')) document.getElementsByClassName('contextmenu')[0].close();
		closeHeaders();
		contextmenus[index].open();
		var style = contextmenus[index].node.getBoundingClientRect(),
			clientY = e.clientY + document.getElementById('toolbarcontainer').getBoundingClientRect().height;
		contextmenus[index].node.style.left = e.clientX - (style.width + e.clientX > window.innerWidth ? style.width - window.innerWidth + e.clientX : 0) + 'px';
		contextmenus[index].node.style.top = clientY - (style.height + clientY > window.innerHeight ? style.height - window.innerHeight + clientY : 0) - em() + 'px';
		contextmenus[index].node.originElement = this;
	});
	overlay.addEventListener('click', function(e) {
		e.stopPropagation();
		if (e.shiftKey) {
			this.style.background = 'rgba(0,0,0,0)';
			this.setAttribute('data-selected-element', this.getAttribute('data-selected-element') != 'selected' ? 'selected' : '');
			var nodes = selection.get.all();
			updateTooltip();
		} else {
			this.style.background = 'rgba(0,0,0,0)';
			var selected = this.getAttribute('data-selected-element') == 'selected', length = selection.get.all().length;
			deselect();
			this.setAttribute('data-selected-element', length > 1 || !e.isTrusted ? 'selected' : selected ? '' : 'selected');
			updateTooltip();
		}
		if (document.selection) overlay.ownerDocument.selection.empty(),framewindow.document.selection.empty();
		else if (getSelection) overlayframe.contentWindow.getSelection().removeAllRanges(),framewindow.getSelection().removeAllRanges();
		updateTreeSelections();
		selection.update();
		updateTooltip();
	});
	overlay.addEventListener('dblclick', function(e) {
		e.stopPropagation();
		e.preventDefault();
		deselect();
		this.dispatchEvent(new MouseEvent('click'));
		contextmenus[0].getItem('editText').execute(false, true);
	});
	overlay.addEventListener('mousemove', function(e) {
		this.mousePositions = {x: e.clientX, y: (e.clientY + Math.round(document.getElementById('framecontainer').scrollTop))};
		updateTooltip();
		if (!userPrefs.toolbar) {
			if (e.clientY < innerWidth * .075) document.getElementById('toolbargrabber').className = 'cursorgrab';
			else document.getElementById('toolbargrabber').className = 'cursorgrab inactive'; 
		}
	});
	// Forward events on <html> to overlay <body>
	// Usually, overlay <body> will cover <html>, but it can be clicked on if <body>'s width/height is smaller than the viewport
	overlay.parentNode.addEventListener('contextmenu', function(e){
		if (e.shiftKey) return;
		e.preventDefault();
		e.stopPropagation();
		var index = selection.get.all().length > 1 ? 1 : 0;
		if (!index) (selection.get.first() || overlay).dispatchEvent(new MouseEvent('click'));
		if ((e.target.className.baseVal == undefined ? e.target.className : e.target.className.baseVal).includes('contextmenu')) document.getElementsByClassName('contextmenu')[0].close();
		closeHeaders();
		contextmenus[index].open();
		var style = contextmenus[index].node.getBoundingClientRect(),
			clientY = e.clientY + document.getElementById('toolbarcontainer').getBoundingClientRect().height;
		contextmenus[index].node.style.left = e.clientX - (style.width + e.clientX > window.innerWidth ? style.width - window.innerWidth + e.clientX : 0) + 'px';
		contextmenus[index].node.style.top = clientY - (style.height + clientY > window.innerHeight ? style.height - window.innerHeight + clientY : 0) - em() + 'px';
		contextmenus[index].node.originElement = overlay;
	});
	overlay.parentNode.addEventListener('click', function(e) {
		e.stopPropagation();
		if (e.shiftKey) {
			overlay.style.background = 'rgba(0,0,0,0)';
			overlay.setAttribute('data-selected-element', overlay.getAttribute('data-selected-element') != 'selected' ? 'selected' : '');
			var nodes = selection.get.all();
			updateTooltip();
		} else {
			overlay.style.background = 'rgba(0,0,0,0)';
			var selected = overlay.getAttribute('data-selected-element') == 'selected', length = selection.get.all().length;
			deselect();
			overlay.setAttribute('data-selected-element', length > 1 || !e.isTrusted ? 'selected' : selected ? '' : 'selected');
			updateTooltip();
		}
		if (document.selection) overlay.ownerDocument.selection.empty(),framewindow.document.selection.empty();
		else if (getSelection) overlayframe.contentWindow.getSelection().removeAllRanges(),framewindow.getSelection().removeAllRanges();
		updateTreeSelections();
		selection.update();
		updateTooltip();
	});
	overlay.parentNode.addEventListener('dblclick', function(e) {
		e.stopPropagation();
		e.preventDefault();
		deselect();
		overlay.dispatchEvent(new MouseEvent('click'));
		contextmenus[0].getItem('editText').execute(false, true);
	});
	overlay.parentNode.addEventListener('mousemove', function(e) {
		overlay.mousePositions = {x: e.clientX, y: (e.clientY + Math.round(document.getElementById('framecontainer').scrollTop))};
		updateTooltip();
		if (!userPrefs.toolbar) {
			if (e.clientY < innerWidth * .075) document.getElementById('toolbargrabber').className = 'cursorgrab';
			else document.getElementById('toolbargrabber').className = 'cursorgrab inactive'; 
		}
	});
	overlay.parentNode.addEventListener('mouseleave', function() {
		overlay.mousePositions = null;
		updateTooltip();
	});
	// Always maintain crosshair cursor
	overlay.parentNode.style.cursor = 'crosshair';

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
	
	// Lets .topText <div>s be draggable
	forEach(document.getElementsByClassName('topText'), function() {
		this.style.left = '0';
		this.className = this.className + ' cursorgrab';
		new HTMLStudio.DraggableElement(this,{bounds:'body',cursor:'',doY:false});
		this.style.left = '';
	});
	// Prevents certain elements from letting their parent be dragged
	forEach(document.querySelectorAll('.content,.option,#idD,.topText input,.cle'), function(element) {
		element.addEventListener('mousedown', function(e) {
			e.stopPropagation();
		})
	});
	// Makes some other things draggable
	new HTMLStudio.DraggableElement(document.getElementById('html_editor_display'), {bounds: document.getElementById('framecontainer'), init:function(){this.style.display = 'fixed'}});
	new HTMLStudio.DraggableElement(document.getElementById('idr'), {start: function(event,e) {
		e.stopPropagation();
		this.start = {timestamp: event.timestamp, x: event.coordinates.start.x, y: event.coordinates.start.y};
		forEach(contextmenus, function() {
			this.close();
		});
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
			if (!element || element.nodeName.toLowerCase() != 'rect' || !element.DOM) return;
			clickhandler.call(element.DOM.node.alias, pseudoEvent.__extend__({clientX: e.clientX, clientY: e.clientY, shiftKey: e.shiftKey}));
		}
	}, cursor: '', inertia: true});
	new HTMLStudio.DraggableElement(document.getElementById('toolbargrabber'), {doY: false, bounds: 'body', cursor: '', move: function(e) {
		if (e.coordinates.move.last.distance.x || e.coordinates.move.last.distance.y) this.dragged = true;
	}});

	// Replace .localeCmdKey elements' innerText with either `Ctrl` or the Mac command symbol
	forEach(document.getElementsByClassName('localeCmdKey'), function(elem) {
		elem.innerText = locale.cmdKey;
	});
	// Does the same except with their title
	forEach(document.getElementsByClassName('localeTitle'), function() {
		this.title = this.title.replace(/{localeCmdKey}/g, locale.cmdKey);
	});

	// Closes .topText <div>s when the user presses Escape while their text fields are focused
	forEach(document.querySelectorAll('.topText input[type=text]'), function() {
		this.addEventListener('keydown', function(e) {
			if (e.keyCode == 27) this.parentNode.className = 'topText';
		})
	});



	// Function to update overlay to match iframe
	function overlayUpdate (initialCall) {
		if (preventUpdates) return;
		if (!document.getElementById('frame').contentWindow.document.body) {
			var doc = document.getElementById('frame').contentWindow.document, body = doc.createElement('body');
			doc.documentElement.appendChild(body);
			frameoverlay.contentWindow.document.body.alias = body;
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

		var elements = framewindow.document.body.childNodes, overlay = overlayframe.contentWindow.document.body, body = framewindow.document.body;
		framewindow.document.documentElement.style.overflow = overlay.parentNode.style.overflow = "hidden";
		body.alias = overlay;
		overlay.alias = body;
		overlay.isOverlay = true;
		overlay.innerHTML = '';
		overlay.setAttribute('style', body.getAttribute('style') || '');
		if (body.htmlStudioTextBeingEdited) overlay.setAttribute('data-html-studio-text-being-edited', 'true');
		else overlay.removeAttribute('data-html-studio-text-being-edited');

		var contextmenuhandler = function(e){
			if (e.shiftKey) return;
			var clonednode = this;
			if (selection.get.all().length) clonednode.preventClick = true;
			e.preventDefault();
			e.stopPropagation();
			var index = selection.get.all().length > 1 ? 1 : 0;
			if (!index) clonednode.dispatchEvent(new MouseEvent('click'));
			if ((e.target.className.baseVal == undefined ? e.target.className : e.target.className.baseVal).includes('contextmenu')) document.getElementsByClassName('contextmenu')[0].close();
			closeHeaders();
			contextmenus[index].open();
			var style = contextmenus[index].node.getBoundingClientRect(),
				clientY = e.clientY + document.getElementById('toolbarcontainer').getBoundingClientRect().height;
			contextmenus[index].node.style.left = e.clientX - (style.width + e.clientX > window.innerWidth ? style.width - window.innerWidth + e.clientX : 0) + 'px';
			contextmenus[index].node.style.top = clientY - (style.height + clientY > window.innerHeight ? style.height - window.innerHeight + clientY : 0) - em() + 'px';
			contextmenus[index].node.originElement = clonednode;
		};
		var dblclickhandler = function(e) {
			e.stopPropagation();
			e.preventDefault();
			deselect();
			this.dispatchEvent(new MouseEvent('click'));
			if (!((this instanceof this.ownerDocument.defaultView.SVGElement || this.ownerSVGElement) || /^(?:area|br|col|embed|hr|img|input|link|meta|param|svg)$/i.test(this.nodeName))) contextmenus[0].getItem('editText').dispatchEvent(new MouseEvent('click'));
		}


		overlay.stylePrecedence = {};
		css.forEach(function(stylesheet) {
			stylesheet[1].forEach(function(query) {
				if (body.matches(query[0])) {
					query[1].forEach(function(rule) {
						if (query[2] < overlay.stylePrecedence[rule[0]]) return;
						overlay.style[rule[0]] = rule[1];
						overlay.stylePrecedence[rule[0]] = query[2];
					});
				};
			})
		});
		body.style.margin = body.style.margin || 0;

		var computedStyle = getComputedStyle(body);
		overlay.style.fontSize = computedStyle.fontSize;


		var printBody = document.createElement('div');
		overlay.printAlias = printBody;


		DOM = {
			name: 'BODY',
			node: body,
			generation: 0,
			children: []
		};

		DOM.parent = DOM;


		function clone (parent, DOM) {
			var clonednode = this.cloneNode(),
				printNode = this.cloneNode();
			this.alias = clonednode;
			forEach(this.boundRects, function() {
				if (this.parentNode) this.parentNode.removeChild(this);
			});
			clonednode.alias = this;
			clonednode.printAlias = printNode;
			clonednode.isOverlay = true;
			clonednode.stylePrecedence = {};
			if (clonednode instanceof clonednode.ownerDocument.defaultView.Element || clonednode.nodeType == 1) {
				var DOMNodeObject = {
					name: clonednode.alias.nodeName,
					node: clonednode.alias,
					generation: DOM.generation + 1,
					children: [],
					parent: DOM
				};
				clonednode.DOM = DOMNodeObject;
				DOM.children.unshift(DOMNodeObject);
				// On right click pseudo element
				clonednode.addEventListener('contextmenu', contextmenuhandler);
				// On left click pseudo element
				clonednode.addEventListener('click', clickhandler);
				// Edit Text on dblclick
				clonednode.addEventListener('dblclick', dblclickhandler);

				// Applies stylesheet rules to cloned node as style attribute
				css.forEach(function(stylesheet) {
					stylesheet[1].forEach(function(query) {
						if (this.matches(query[0])) {
							(query[1] || []).forEach(function(rule) {
								if (query[2] < clonednode.stylePrecedence[rule[0]]) return;
								clonednode.style[rule[0]] = this.style[rule[0]] || rule[1];
								clonednode.stylePrecedence[rule[0]] = query[2];
							}.bind(this));
						}
					}.bind(this))
				}.bind(this));

				forEach(this.style, function($,_,styles) {
					clonednode.style[this] = styles[this];
				});

				printNode.setAttribute('style', clonednode.getAttribute('style'));

				var comStyles = getComputedStyle(this);
				clonednode.style.fontSize = printNode.style.fontSize = comStyles.fontSize;
				// Saves the computed styles as a hidden attribute of the original node
				this.htmlStudioComputedStyles = clonednode.getAttribute('style') || '';
				// Other styles to make them transparent (since they are just an overlay)
				// And to keep the crosshair cursor throughout the entire document
				clonednode.style.cursor = 'crosshair';
				if ((clonednode instanceof this.ownerDocument.defaultView.SVGElement || clonednode.ownerSVGElement) && clonednode.nodeName.toLowerCase() != 'svg') {
					clonednode.setAttribute('fill', clonednode.style.fill = 'rgba(0,0,0,0)');
					clonednode.setAttribute('stroke', clonednode.style.stroke = 'rgba(0,0,0,0)');
					clonednode.setAttribute('opacity', clonednode.style.opacity = 1);
				} else {
					clonednode.style.background = clonednode.style.borderColor = clonednode.style.color = 'rgba(0,0,0,0)';
					clonednode.style.opacity = 1;
				}
				clonednode.style.boxShadow = '';
				if (this.htmlStudioTextBeingEdited) clonednode.setAttribute('data-html-studio-text-being-edited', 'true');

				// Remove some harmful attributes
				// Remove attributes used by HTML Studio
				clonednode.removeAttribute('data-selected-element');
				clonednode.removeAttribute('data-html-studio-placeholder');
				clonednode.removeAttribute('data-html-studio-text-being-edited');
				clonednode.removeAttribute('data-html-studio-element-replacer');
				clonednode.removeAttribute('data-html-studio-entity-replacer');
				// Prevent actually clicking on links, instead just selecting them
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
				// Keep track of SVG elements
				if (clonednode.nodeName.toLowerCase() == 'svg' || parent.htmlStudioIsSVG) {
					clonednode.htmlStudioIsSVG = true;
				}
				// Prevent conflicting ids and incorrect inheritance from non-user style sheets
				clonednode.removeAttribute('id');
				printNode.removeAttribute('id');
				if (this.getAttribute('id') == '') this.removeAttribute('id');
				if (this.getAttribute('class') == '') this.removeAttribute('class');
				// Prevent incorrect inheritance from non-user stylesheets
				clonednode.removeAttribute('class');
				printNode.removeAttribute('class');
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
			parent.printAlias.insertBefore(printNode, parent.printAlias.firstChild);
		};
		for (var i = elements.length - 1; i >= 0; i--) {
			clone.call(elements[i], overlay, DOM);
		}

		printDisplay.innerHTML = '';
		forEach(overlay.attributes, function() {
			printBody.setAttribute(this.name, this.value);
		});
		printDisplay.appendChild(printBody);

		forEach(body.style, function($,_,styles) {
			overlay.style[this] = styles[this];
		});

		overlay.style.cursor = 'crosshair';
		overlay.style.color = 'rgba(0,0,0,0)';
		overlay.style.background = 'rgba(0,0,0,0)';
		overlay.style.boxShadow = '';
		overlay.style.fontFamily = (overlay.style.fontFamily || '') + ', serif';
		overlay.style.margin = body.style.margin;


		// Some extra stuff to make everything match and look like one document
		// Used to update styles
		iframe.style.position = overlayframe.style.position = 'initial';
		// Reset it back
		iframe.style.position = overlayframe.style.position = '';
		var framecontainer = document.getElementById('framecontainer'),
			rect = framewindow.document.body.getBoundingClientRect(),
			grid = document.getElementById('overlaygrid'),
			rects = document.getElementById('rectDisplays'),
			frameback = document.getElementById('frameback');
		// Updates sizes of elements inside #framecontainer so that they all have the same dimensions as the document
		grid.style.height = rects.style.height = frameback.style.height = framewindow.document.body.scrollHeight - (framewindow.document.body.scrollWidth > framecontainer.offsetWidth ? scrollBar() : 0) + 'px';
		grid.style.width = frameback.style.width = framewindow.document.body.scrollWidth - (framecontainer.scrollHeight > framecontainer.offsetHeight ? scrollBar() : 0) + 'px';
		// Reposition so that the scroll matches that of the document
		var framecontainer = document.getElementById('framecontainer');
		framecontainer.scrollTop = framewindow.document.documentElement.scrollTop || framewindow.document.body.scrollTop;
		framecontainer.scrollLeft = framewindow.document.documentElement.scrollLeft || framewindow.document.body.scrollLeft;

		if (initialCall) {
			forEach(document.querySelectorAll('.headersection.loading, #title.loading'), function(element) {
				element.className = 'headersection';
			});
		}

		restoreSelection();
		updateTree();

		HTMLStudio.document.update();
	}



	// Some global functions used in different areas
	// Array.prototype.forEach that works for all iterable objects
	function forEach(array, func) {
		if (!array) return;
		for (var i = 0; i < array.length; i++) {
			if (func.call(array[i], array[i], i, array) == 'break') return false;
		}
		return true;
	}

	// Iterates over `func` `num` times
	function loop(num, func, thisVal) {
		if (!num) return;
		for (var i = 0; i < num; i++) {
			if (func.call(thisVal || i,i,num) == 'break') return;
		}
	}

	// Clones any objects and arrays (prevents references to the same object)
	function cloneData(data) {
		var clonedData = data;
		if (Array.isArray(data)) {
			clonedData = [];
			for (var i = data.length - 1; i >= 0; i--) {
				clonedData[i] = cloneData(data[i]);
			}
		} else if (data.constructor === Object) {
			clonedData = {};
			for (var key in data) {
				clonedData[key] = cloneData(data[key]);
			}
		} else if (data instanceof Node) {
			clonedData = data.cloneNode(true);
		}
		return clonedData;
	}

	// Parses stringified HTML (only returns the first node)
	// Useful for creating elements and assigning attributes and children in a single line (for ContextMenu JSON values)
	function parseHTML(string) {
		var a = document.createElement('a');
		a.innerHTML = string;
		return a.firstChild;
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
		forEach(document.getElementsByClassName('topText active'), function(element) {
			element.className = 'topText';
		});
	}

	// Update document CSS stylesheets
	function updateStylesheets() {
		HTMLStudio.document.stylesheets = HTMLStudio.document.stylesheets || [];
		css = [];

		// Keeps track of which nodes have been accounted for
		var stylesheetArray = HTMLStudio.document.stylesheets.map(function(obj) {
			return obj.node;
		}), objectArray = HTMLStudio.document.stylesheets;

		forEach(framewindow.document.querySelectorAll('style'), function(stylesheet) {
			if (~stylesheetArray.indexOf(stylesheet)) return;
			objectArray.push({
				html: stylesheet.outerHTML,
				node: stylesheet,
				name: stylesheet.getAttribute('data-name') || ''
			});
			stylesheetArray.push(stylesheet);
		});

		HTMLStudio.document.stylesheets = objectArray;

		!function() {
			var iframe = document.getElementById('cssTest'),
				allstylesheets = [],
				fontstylesheet = document.createElement('style'),
				fontHtml = '';

			forEach(HTMLStudio.document.stylesheets, function() {
				if (!this.node) return;
				iframe.contentWindow.document.head.innerHTML = '';
				iframe.contentWindow.document.head.appendChild(this.node);

				var style = this.node,
					ref = this.name,
					html = '',
					rules = this.node.sheet.cssRules,
					CSSStyleRule, CSSFontFaceRule, CSSKeyframesRule;
				if (this.node.ownerDocument && this.node.ownerDocument.defaultView && this.node.ownerDocument.defaultView.CSSStyleRule) {
					// Makes sure the each CSSRule object is from the correct document
					// Firefox sees no difference between the two, but Chrome does
					CSSStyleRule = this.node.ownerDocument.defaultView.CSSStyleRule;
					CSSFontFaceRule = this.node.ownerDocument.defaultView.CSSFontFaceRule;
					CSSKeyframesRule = this.node.ownerDocument.defaultView.CSSKeyframesRule;
				}

				css.push([this.name,[]]);

				forEach(rules, function(_,i) {
					if ((typeof CSSStyleRule == 'object' && this instanceof CSSStyleRule) || this instanceof window.CSSStyleRule) {
						html += this.selectorText + ' {\n';
						var precedence = HTMLStudio.parseSelector(this.selectorText);

						forEach(precedence, function(_,n,p) {
							if (!n) {
								rules[i].cssText.replace(/(?:{\s*|;\s*)([a-z-]+)\s*:\s*((?:[^;'"}]|("|')(?:(?:(?!\3).(?=\3|\\))?(?:(?=\3)|\\.(?:(?!\3)[^\\](?=\3|\\))?|(?:.(?!\\|\3))+.)*?)\3)+)/g, function($0,$1,$2) {
									html += '\t' + $1 + ': ' + $2 + ';\n';
									(p.styles = p.styles || []).push([$1, $2]);
									return $0;
								});
							}
							css[css.length - 1][1].push([this.selector,p.styles,this]);
						});
						html += '}\n';

					} else if ((typeof CSSFontFaceRule == 'object' && this instanceof CSSFontFaceRule) || this instanceof window.CSSFontFaceRule) {
						html += '@font-face {\n';
						fontHtml += '@font-face{'
						rules[n].cssText.replace(/(?:{\s*|;\s*)([a-z-]+)\s*:\s*((?:[^;'"}]|("|')(?:(?:(?!\3).(?=\3|\\))?(?:(?=\3)|\\.(?:(?!\3)[^\\](?=\3|\\))?|(?:.(?!\\|\3))+.)*?)\3)+)/g, function($0,$1,$2) {
							html += '\t' + $1 + ': ' + $2 + ';\n';
							fontHtml += $1 + ':' + $2 + ';';
							return $0;
						});
						html += '}\n';
						fontHtml += '}';
					} else if ((typeof CSSKeyframesRule == 'object' && this instanceof CSSKeyframesRule) || this instanceof window.CSSKeyframesRule) console.info('A CSS @keyframes declaration was ignored for compatibility: ' + this.name);
				});

				this.node.innerHTML = html;
				this.html = this.node.outerHTML;
				framewindow.document.head.appendChild(this.node);
			});
			var prevFontSS = overlayframe.contentWindow.document.getElementById('user-font-stylesheet');
			if (prevFontSS) prevFontSS.parentNode.removeChild(prevFontSS);
			fontstylesheet.innerHTML = fontHtml;
			fontstylesheet.id = 'user-font-stylesheet';
			overlayframe.contentWindow.document.head.appendChild(fontstylesheet);
		}();
	}
	// Deselects all elements and set their background back to transparent
	function deselect () {
		forEach(selection.get.all(), function(element) {
			element.removeAttribute('data-selected-element');
			if ((element instanceof element.ownerDocument.defaultView.SVGElement || element.ownerSVGElement) && element.nodeName.toLowerCase() != 'svg') element.setAttribute('fill', element.style.fill = 'rgba(0,0,0,0)');
			else element.style.background = 'rgba(0,0,0,0)';
			if (element.nodeName in {tr:0,TR:0,tbody:0,TBODY:0,thead:0,THEAD:0,tfoot:0,TFOOT:0}) {
				forEach(element.querySelectorAll('td'), function() {
					this.style.background = 'rgba(0,0,0,0)';
				});
			}
			forEach(element.boundRects, function() {
				if (this.parentNode) this.parentNode.removeChild(this);
			});
		});
		selection.update();
		forEach(document.querySelectorAll('.rectX, .rectY, .rectXT, .rectYT'), function() {
			if (this.parentNode) this.parentNode.removeChild(this);
		});;
	}
	// Closes header context menus and sets the buttons to the correct background color
	function closeHeaders() {
		forEach(document.getElementsByClassName('headersection'), function(element) {
			sectionopen = false;
			element.style.background = '';
		});
		forEach(contextmenus, function(_,i) {
			if (i >= 2) this.close();
		});
	}
	// Closes dialogs and hides the background overlay
	function closeDialogs() {
		document.getElementById('dialogcover').style.display = document.getElementById('iDk').style.display = '';
		forEach(document.getElementsByClassName('dialog'), function(element) {
			element.style.display = '';
		});
	};
	// Open a specific dialog
	function openDialog(id) {
		closeDialogs();
		backdialog.style.display = 'block';
		var dialog = document.getElementById('dialog_' + id);
		dialog.style.display = 'block';
		if (!HTMLStudio.DraggableElement.isInstance(dialog)) {
			new HTMLStudio.DraggableElement(dialog, {bounds: 'body'});
		}
		dialog.querySelector('.content').scrollTop = 0;
		(dialog.querySelector('.content [data-focus]') || dialog.querySelectorAll('.optioncontainer :not(.disabled)')[0]).focus();
		var resizer = dialog.querySelector('.dialog_resizer_right');
		if (!HTMLStudio.DraggableElement.isInstance(resizer)) {
			new HTMLStudio.DraggableElement(resizer, {
				doY: false,
				bounds: 'body',
				init: function() {
					this.style.right = '0';
					this.style.left = '';
				},
				start: function(_,e) {
					e.stopPropagation();
					this.startWidth = parseFloat(getComputedStyle(this.parentNode).width);
					this.distance = 0;
				},
				move: function(e) {
					this.distance += e.coordinates.move.last.distance.x;
					this.parentNode.style.width = Math.max(this.startWidth + this.distance, innerWidth / 2) + 'px';
				},
				end: function() {
					this.style.left = parseFloat(getComputedStyle(this.parentNode).width) - em(.5) + 'px';
				}
			});
			new HTMLStudio.DraggableElement(resizer.previousElementSibling, {
				doY: false,
				bounds: 'body',
				start: function(_,e) {
					e.stopPropagation();
					var style = getComputedStyle(this.parentNode);
					this.startWidth = parseFloat(style.width);
					this.startLeft = parseFloat(style.left);
					this.distance = 0;
				},
				move: function(e) {
					this.distance += e.coordinates.move.last.distance.x;
					this.parentNode.style.width = Math.max(this.startWidth - this.distance, innerWidth / 2) + 'px';
					this.parentNode.style.left = (this.startWidth - this.distance >= innerWidth / 2 ? this.startLeft + this.distance : this.startLeft + this.startWidth - innerWidth / 2) + 'px';
				},
				end: function() {
					this.style.left = '-1px';
					resizer.style.left = parseFloat(getComputedStyle(this.parentNode).width) - em(.5) + 'px';
				}
			});
		}
	};
	function quoteEscape(string) {
		return string.replace(/&/g,'&amp;').replace(/"/g, "&quot;");
	};
	function htmlEscape(string) {
		var a = document.createElement('a');
		a.innerText = string;
		return a.innerHTML;
	}
	// Returns an object with the info of the provided element
	function formatElementInfo(elem) {
		return {
			toString: function() {
				return '<span style="font-family:Consolas,Monaco,\'Ubuntu Mono\',\'Courier New\',Courier,monospace;font-size:1rem">' + this.name + this.id + this.class + '</span>';
			},
			name: {
				toString: function() {
					return '<span style="color:#33f">' + htmlEscape(this.value) + '</span>';
				},
				value: elem.nodeName.toLowerCase(),
				format: function(str1, str2) {
					return this.value ? str1 + this.value + str2 : '';
				}
			},
			id: {
				toString: function() {
					return this.value ? '<span style="color:#009">#' + htmlEscape(this.value) + '</span>' : '';
				},
				value: elem.id.trim(),
				format: function(str1, str2) {
					return this.value ? str1 + '#' + this.value + str2 : '';
				}
			},
			class: {
				toString: function() {
					return this.value ? '<span style="color:#F44">.' + htmlEscape(this.value.replace(/\s+/g,'.')) + '</span>' : '';
				},
				value: (elem.className ? elem.className.baseVal ? elem.className.baseVal : typeof elem.className == 'string' ? elem.className : '' : '').trim(),
				format: function() {
					return this.value ? str1 + '.' + this.value.replace(/\s+/g,'.') + str2 : '';
				}
			}
		}
	}
	// Updates the text shown in the tooltip
	function updateTooltip(custom, persist) {
		var text = document.getElementById('tooltiptext'),
			tooltip = document.getElementById('tooltip');
		if (tooltip.htmlStudioPersistant && persist !== false) return;
		tooltip.htmlStudioPersistant = !!persist;
		if (typeof custom == 'string') {
			if (!overlay.mousePositions) return;
			document.getElementById('tooltiptext').innerHTML = custom;
			document.getElementById('tooltip').style.opacity = '';
			return;
		}
		var nodes = custom || selection.get.all();
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
		forEach(document.querySelectorAll('#idq rect.html_editor'), function(rect) {
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
			rect.DOM = line.DOM = DOM;
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
			if ((clonednode instanceof clonednode.ownerDocument.defaultView.SVGElement || clonednode.ownerSVGElement) && clonednode.nodeName.toLowerCase() != 'svg') clonednode.setAttribute('fill', clonednode.style.fill = 'rgba(0,0,0,0)');
			else clonednode.style.background = 'rgba(0,0,0,0)';
			clonednode.setAttribute('data-selected-element', e.set ? 'selected' : '');
		} else if (e.shiftKey) {
			if ((clonednode instanceof clonednode.ownerDocument.defaultView.SVGElement || clonednode.ownerSVGElement) && clonednode.nodeName.toLowerCase() != 'svg') clonednode.setAttribute('fill', clonednode.style.fill = 'rgba(0,0,0,0)');
			else clonednode.style.background = 'rgba(0,0,0,0)';
			clonednode.setAttribute('data-selected-element', clonednode.getAttribute('data-selected-element') != 'selected' ? 'selected' : '');
		} else {
			if ((clonednode instanceof clonednode.ownerDocument.defaultView.SVGElement || clonednode.ownerSVGElement) && clonednode.nodeName.toLowerCase() != 'svg') clonednode.setAttribute('fill', clonednode.style.fill = 'rgba(0,0,0,0)');
			else clonednode.style.background = 'rgba(0,0,0,0)';
			var selected = clonednode.getAttribute('data-selected-element') == 'selected', length = selection.get.all().length;
			deselect();
			clonednode.setAttribute('data-selected-element', length > 1 || !e.isTrusted ? 'selected' : selected ? '' : 'selected');
		}
		if (document.selection) overlay.ownerDocument.selection.empty(),framewindow.document.selection.empty();
		else if (getSelection) overlayframe.contentWindow.getSelection().removeAllRanges(),framewindow.getSelection().removeAllRanges();
		updateTreeSelections();
		selection.update();
		updateTooltip();

		if (contextmenus[0].node.parentNode || contextmenus[1].node.parentNode) {
			var menu = contextmenus[0].node.parentNode ? contextmenus[0] : contextmenus[1];

			if (selection.length == 0 || e.target && e.target.isOverlay) menu.close();
			else if (selection.length == 1) {
				contextmenus[0].open();
				var style = menu.node.style,
					rect = contextmenus[0].node.getBoundingClientRect(),
					x = parseFloat(style.left),
					y = parseFloat(style.top);
				contextmenus[0].node.style.left = x - (rect.width + x > window.innerWidth ? rect.width - window.innerWidth + x : 0) + 'px';
				contextmenus[0].node.style.top = y - (rect.height + y > window.innerHeight ? rect.height - window.innerHeight + y + em() : 0) + 'px';
				menu.close();
				contextmenus[0].open();
			} else {
				contextmenus[1].open();
				var style = menu.node.style,
					rect = contextmenus[1].node.getBoundingClientRect(),
					x = parseFloat(style.left),
					y = parseFloat(style.top);
				contextmenus[1].node.style.left = x - (rect.width + x > window.innerWidth ? rect.width - window.innerWidth + x : 0) + 'px';
				contextmenus[1].node.style.top = y - (rect.height + y > window.innerHeight ? rect.height - window.innerHeight + y + em() : 0) + 'px';
				menu.close();
				contextmenus[1].open();
			}
		}

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
	// Shows dialogs when the user clicks certain no-href <a> tags
	!function() {
		function select() {
			openDialog(this.id.substring(5));
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

	// Full Storage Dialog > Save to Drive
	document.getElementById('iDG').addEventListener('click', function() {
		closeDialogs();
		openDialog('download');
		document.querySelector('#Idn div:nth-child(2)').dispatchEvent(new MouseEvent('click'));
		document.querySelector('#dialog_download .content').scrollTop = 999999;
	});

	// Full Storage dialog > Continue without Saving
	document.getElementById('iDH').addEventListener('click', function() {
		closeDialogs();
	});

	// Adds tabIndex=0 and the ability for users to press Enter/Space to select certain elements (those with role=button)
	forEach(document.querySelectorAll('[role=button]'), function() {
		if (!this.hasAttribute('data-no-tab')) this.tabIndex = 0;
		this.addEventListener('keydown', function(e) {
			if (e.keyCode == 13 || e.keyCode == 32) this.dispatchEvent(new MouseEvent('click'));
		});
	});

	// Ex-Drive file dialog > Save to Drive Storage
	document.getElementById('iDz').addEventListener('click', function() {
		if (!HTMLStudio.document.o) return closeDialogs();
		history.changeMethod('drive', HTMLStudio.document.o);
		closeDialogs();
	});

	// Ex-Drive file dialog > Save to Drive Storage
	document.getElementById('iDA').addEventListener('click', function() {
		HTMLStudio.document.o = null;
		HTMLStudio.document.update();
		closeDialogs();
	});

	// Error saving to Drive Warning > Try Again
	document.getElementById('iDt').addEventListener('click', function() {
		var notice = document.getElementById('error_saving_to_drive');
		if (!HTMLStudio.document.o) {
			notice.className = 'notice error';
			document.getElementById('error_resaving').className = 'notice error active';
			return;
		}
		notice.className = 'notice error';
		HTMLStudio.google.upload(HTMLStudio.document.o, {}, '<!DOCTYPE html>\n<!-- Created with HTML Studio (https://christianfigueroa.github.io/HTML-Studio) -->\n' + (userPrefs.textFormat == 'prettify' ? '\n' : '') + (userPrefs.textFormat == 'minify' ? HTMLStudio.formatHTML.minify(userPrefs.encodeEntities) : HTMLStudio.formatHTML.prettify({encodeEntities: userPrefs.encodeEntities, indentation: userPrefs.indentation})), function() {
			notice = document.getElementById('success_saving_to_drive');
			notice.className = 'notice success active';
			setTimeout(function() {
				notice.className = 'notice success';
			}, 2500);
		});
	});

	// Error saving to Drive Warning > Close
	document.getElementById('iDu').addEventListener('click', function() {
		document.getElementById('error_saving_to_drive').className = 'notice error';
		document.getElementById('section_saved_to_drive').className = 'pseudoheadersection inactive';
	});

	// Error saving to Drive Warning > Try Again > [No Google Doc ID found] > Error Resaving Warning Okay
	document.getElementById('iDn').addEventListener('click', function() {
		document.getElementById('error_resaving').className = 'notice error';
		document.getElementById('section_saved_to_drive').className = 'pseudoheadersection inactive';
	});

	// Delete Warning > (Local File) Delete Document
	document.getElementById('Idi').addEventListener('click', function() {
		this.parentNode.className = document.getElementById('iD6').style.display = '';
		document.getElementById('Idj').className = 'active';
		document.getElementById('idy').innerHTML = 'Are you sure you want to permanently delete this document? This action <strong>cannot be reversed</strong> and all unsaved changes will be lost.';
	});

	// Delete Warning > (Local File) Delete Document > Yes, Delete
	document.getElementById('iD5').addEventListener('click', function() {
		location.replace('');
	});

	// Delete Warning > (Local File) Delete Document > No, Don't Delete
	document.getElementById('iD4').addEventListener('click', function() {
		document.getElementById('idy').innerHTML = 'This document was just deleted somewhere else and all changes made to this document are <strong>not</strong> being saved. Do you want to re-save this document or permanently delete it?';
		document.getElementById('idz').className = 'active';
		document.getElementById('iD6').className = this.parentNode.className = '';
	});

	// Delete Warning > (Google Doc) Hide from Recents
	// Doesn't get an are-you-sure message since it can be reversed by reopening the file form Drive
	document.getElementById('iD7').addEventListener('click', function() {
		location.replace('');
	});

	// Delete Warning > (Google Doc) Re-add to Recents
	document.getElementById('iDf').addEventListener('click', function() {
		HTMLStudio.document.i = storage.get('d').length;
		HTMLStudio.document.g = 1;
		HTMLStudio.document.n = document.getElementById('title').value;
		HTMLStudio.document.update();
		document.getElementById('deletedWarning').className = 'notice error';
	});

	// Delete Warning > (Local File) Re-save Document
	document.getElementById('idA').addEventListener('click', function() {
		HTMLStudio.document.i = storage.get('d').length;
		HTMLStudio.document.g = 0;
		HTMLStudio.document.n = document.getElementById('title').value;
		HTMLStudio.document.update();
		document.getElementById('deletedWarning').className = 'notice error';
		var recovered = document.getElementById('restored_doc');
		recovered.className = 'notice success active';
		setTimeout(function() {
			recovered.className = 'notice success';
		}, 2500);
	});

	// On change for File > Save... > Extra Options > Encode non-ASCII characters
	document.getElementById('Idz').addEventListener('change', function() {
		userPrefs.set('encodeEntities', this.checked);
	});

	// On change for File > Save... > Extra Options > Exclude style sheet names
	document.getElementById('IdD').addEventListener('change', function() {
		userPrefs.set('noStyleNames', this.checked);
	});

	// On change for File > Save... > Extra Options > Indentation
	document.getElementById('IdB').addEventListener('change', function() {
		userPrefs.set('indentation', this.value);
	});

	// Controls File > Save... > Text Format change
	document.getElementById('Idx').addEventListener('change', function() {
		var Idw = document.getElementById('Idw');
		Idw.title = 'Applies only to pretty print files';
		Idw.style.opacity = .35;
		Idw.querySelector('select').style.pointerEvents = 'none';
		userPrefs.set('textFormat', 'minify');
	});
	document.getElementById('Idy').addEventListener('change', function() {
		var Idw = document.getElementById('Idw');
		Idw.title = 'Change the level of indentation';
		Idw.style.opacity = 1;
		Idw.querySelector('select').style.pointerEvents = 'initial';
		userPrefs.set('textFormat', 'prettify');
	});

	// Prevent form submission in File > Save...
	document.getElementById('Idm').addEventListener('submit', function(e) {
		e.preventDefault();
	});

	// Shows "Could not connect to Google" <div> for various Google sign in buttons
	forEach([['GIO4','googNoNetwork'],['Idu','Idv'],['iD1','iD0'],['iDe','iDd'],['IdN','iDw']], function(item) {
		document.getElementById(item[0]).addEventListener('click', function() {
			if (!HTMLStudio.google.exists()) {
				var noNetwork = document.getElementById(item[1]);
				if (noNetwork.timeout) clearTimeout(noNetwork.timeout);
				noNetwork.className = 'active';
				noNetwork.timeout = setTimeout(function() {
					noNetwork.timeout = null;
					noNetwork.className = '';
				}, 3000);
			}
		});
	});

	// Sign out button in Google interface
	document.getElementById('GII4').addEventListener('click', function() {
		if (HTMLStudio.google.exists()) {
			gapi.auth2.getAuthInstance().signOut();
		}
	})

	// Controls opening and closing of Google interface
	document.getElementById('googOpen').addEventListener('click', function(e) {
		e.stopPropagation();
		var inter = document.getElementById('googInterface');
		inter.className = HTMLStudio.google.exists() && HTMLStudio.google.signedIn ? 'signedIn' : 'signedOut';
		inter.style.display = inter.style.display == '' ? 'block' : '';
	});

	// Prevent closing of Google interface if user is interacting with it
	document.getElementById('googOpen').addEventListener('mousedown', function(e) {
		e.isGoogleInterface = true;
	});
	document.getElementById('googInterface').addEventListener('mousedown', function(e) {
		e.isGoogleInterface = true;
	})

	// Prevents options in Edit Text bar from blurring the element being edited on click
	forEach(document.querySelectorAll('.edittextopt, #edittextbar'), function() {
		function prevent(e) {
			e.stopPropagation();
			e.preventDefault();
		}
		this.addEventListener('mousedown', prevent);
		this.addEventListener('touchstart', prevent);
		this.addEventListener('mouseup', prevent);
		this.addEventListener('touchend', prevent);
		this.addEventListener('touchcancel', prevent);
		this.addEventListener('dblclick', prevent);
	});

	!function(idf) {
		// Allows for more code-friendly editing in the Edit as HTML/XML <textarea>
		idf.addEventListener('keydown', function(e) {
			this.lines = 0;
			// Inserts a tab character on Tab instead of focusing next element
			if (e.keyCode == 9 && !e.altKey && !e.metaKey && !e.ctrlKey) {
				var position = false;
				if (document.selection) {
					this.focus();
					var range = document.selection.createRange();
					range.moveStart('character', -this.value.length);
					position = range.text.length;
				} else if (typeof this.selectionStart == 'number') position = this.selectionStart;

				if (position === false) return;
				if (typeof this.selectionStart == 'number') {
					e.preventDefault();
					// Check if selection spans multiple lines
					// If yes, add tab to beginning of each selected line (or take away if shift is held)
					if (this.value.substring(this.selectionStart, this.selectionEnd).includes('\n')) {
						var start = this.selectionStart,
							end = this.selectionEnd,
							dir = this.selectionDirection;

						var newLines = (this.value.substring(0, this.selectionStart).match(/\n/g) || {length:0}).length;
						this.selectionStart = this.value.match(new RegExp('(?:.*\\n){' + newLines + '}'))[0].length;
						this.selectionEnd += this.value.substring(this.selectionEnd).match(/.*/)[0].length;

						// Take away a tab or four spaces from the beginning of each selected line
						if (e.shiftKey) {
							var lostTabs = (function(self) {
								var a = 0;
								forEach(self.value.substring(self.selectionStart, self.selectionEnd).match(/(?:^|\n)(?:\t|    )/g) || [], function() {
									a += this.match(/\t|    /)[0].length;
								});
								return a;
							})(this),
								startTab = this.value.substring(this.selectionStart, start).match(/^(\t| {1,3}$|    |)/)[1].length;
							if (document.queryCommandSupported('insertText') && document.execCommand('insertText', null, this.value.substring(this.selectionStart, this.selectionEnd).replace(/(^|\n)(?:\t|    )/g,'$1')));
							else this.value = this.value.substring(0, this.selectionStart) + this.value.substring(this.selectionStart, this.selectionEnd).replace(/(^|\n)(?:\t|    )/g,'$1') + this.value.substring(this.selectionEnd);
							this.selectionStart = start - startTab;
							this.selectionEnd = end - lostTabs;
						// Add a tab to the beginning of each selected line
						} else {
							var newTabs  = this.value.substring(this.selectionStart, this.selectionEnd).match(/(?:^|\n)/g).length;
							if (document.queryCommandSupported('insertText') && document.execCommand('insertText', null, this.value.substring(this.selectionStart, this.selectionEnd).replace(/(?:^|\n)/g,'$&\t')));
							else this.value = this.value.substring(0, this.selectionStart) + this.value.substring(this.selectionStart, this.selectionEnd).replace(/(?:^|\n)/g,'$&\t') + this.value.substring(this.selectionEnd);
							this.selectionStart = start + 1;
							this.selectionEnd = end + newTabs;
						}
						this.selectionDirection = dir;
					// Else add a tab at the caret
					} else {
						if (document.queryCommandSupported('insertText')) document.execCommand('insertText', null, '\t');
						else {
							this.value = this.value.substring(0,position) + '\t' + this.value.substring(position);
							this.focus();
							this.setSelectionRange(position + 1, position + 1);
						}
					}
				} else if (this.createTextRange) {
					e.preventDefault();
					if (document.queryCommandSupported('insertText')) document.execCommand('insertText', null, '\t');
					else {
						this.value = this.value.substring(0,position) + '\t' + this.value.substring(position);
						var range = this.createTextRange();
						this.move('character', position + 1);
						range.select();
					}
				}
				this.blur();
				this.focus();
			// Automatically adds current line's indentation on Enter
			} else if (e.keyCode == 13 && !e.altKey && !e.metaKey && !e.ctrlKey) {
				this.lines = this.value.match(/(?:\n|$)/g).length;
				var position = false;
				if (document.selection) {
					this.focus();
					var range = document.selection.createRange();
					range.moveStart('character', -this.value.length);
					position = range.text.length;
				} else if (typeof this.selectionStart == 'number') position = this.selectionStart;

				if (position === false) return;
				if (typeof this.selectionStart == 'number') {
					e.preventDefault();
					var indentation = this.value.substring(0, this.selectionStart).match(/(?:^|\n)([ \t]*).*$/)[1];
					if (document.queryCommandSupported('insertText') && document.execCommand('insertText', null, '\n' + indentation)) {
						if (!indentation) {
							this.selectionStart = position + 1;
						}
					} else {
						var start = this.selectionStart;
						this.value = this.value.substring(0, start) + '\n' + indentation + this.value.substring(this.selectionEnd);
						this.selectionStart = this.selectionEnd = start + 1 + indentation.length;
					}
				} else if (this.createTextRange) {
					var indentation = this.value.substring(0, position).match(/(?:^|\n)([ \t]*).*$/)[1];
					this.value = this.value.substring(0,position) + '\n' + indentation + this.value.substring(position);
					var range = this.createTextRange();
					this.move('character', position + 1 + indentation.length);
					range.select();
				}
				e.preventDefault();
				this.blur();
				this.focus();
			// Focus Save button on Enter + any function key
			} else if (e.keyCode == 13 && (e.altKey || e.metaKey || e.ctrlKey)) {
				document.getElementById('idd').focus();
				e.stopPropagation();
			// Go to beginning of line text on Home instead of the very beginning of the line
			} else if (e.keyCode == 36) {
				var position = false;
				if (document.selection) {
					this.focus();
					var range = document.selection.createRange();
					range.moveStart('character', -this.value.length);
					position = range.text.length;
				} else if (typeof this.selectionStart == 'number') position = this.selectionStart;

				if (position === false) return;
				if (typeof this.selectionStart == 'number') {
					var before = this.value.substring(0, this.selectionDirection == 'backward' ? this.selectionStart : this.selectionEnd).match(/(?:.*\n)*/)[0],
						line = this.value.replace(before, ''),
						wsLength = line.match(/^[ \t]*/)[0].length;
					if (!wsLength || (this.selectionDirection == 'backward' ? this.selectionStart : this.selectionEnd) == before.length + wsLength) return;
					e.preventDefault();
					var home = before.length + wsLength
					if (!e.shiftKey) this.selectionStart = this.selectionEnd = home;
					else if (this.selectionStart == this.selectionEnd && this.selectionStart < home) {
						this.selectionEnd = home;
						this.selectionDirection = 'forward';
					} else if (this.selectionStart == this.selectionEnd && this.selectionStart > home) {
						this.selectionStart = home;
						this.selectionDirection = 'backward';
					} else if (this.selectionDirection == 'backward' && this.selectionStart < home && this.selectionEnd <= home) {
						this.selectionStart = this.selectionEnd;
						this.selectionEnd = home;
						this.selectionDirection = 'forward';
					} else if (this.selectionDirection == 'backward' && this.selectionEnd > home) this.selectionStart = home;
					else if (this.selectionStart < home) this.selectionEnd = home;
					else if (this.selectionStart >= home && this.selectionEnd > home) {
						this.selectionEnd = this.selectionStart;
						this.selectionStart = home;
						this.selectionDirection = 'backward';
					}
				}
				this.blur();
				this.focus();
			}
		});

		idf.addEventListener('keydown', function(e) {
			this.lines = this.lines || this.value.match(/(?:\n|$)/g).length;
			setTimeout(function() {
				var lines = this.value.match(/(?:\n|$)/g).length,
					Idl = document.getElementById('Idl'),
					idf = document.getElementById('idf'),
					length = 0;
				if (this.lines == lines && e.isTrusted) return this.dispatchEvent(new Event('focus'));
				Idl.innerHTML = '';
				var digits = (lines + '').length,
					frag = document.createDocumentFragment(),
					position = false,
					lineNumber = false;

				if (document.selection) {
					this.focus();
					var range = document.selection.createRange();
					range.moveStart('character', -this.value.length);
					position = range.text.length;
				} else if (typeof this.selectionStart == 'number') position = this.selectionDirection != 'backward' ? this.selectionEnd : this.selectionStart;

				var lineNumber = !e.isTrusted && !this.matches(':hover') || position === false ? -1 : this.value.substring(0, position).match(/(\n|$)/g).length;

				loop(lines, function() {
					var div = document.createElement('div');
					div.innerText = ' '.repeat(digits - (this + 1 + '').length) + (this + 1);
					div.line = this + 1;
					if (this + 1 == lineNumber) div.className = 'activeLine';
					frag.appendChild(div);
				});
				Idl.appendChild(frag);
				Idl.style.width = digits + 'ch';
				Idl.style.paddingBottom = 'calc(.75rem + ' + scrollBar() + 'px)';
			}.bind(this), 0);
		});

		idf.addEventListener('selectionchange', function() {
			var position = false;

			if (document.selection) {
				this.focus();
				var range = document.selection.createRange();
				range.moveStart('character', -this.value.length);
				position = range.text.length;
			} else if (typeof this.selectionStart == 'number') position = this.selectionDirection != 'backward' ? this.selectionEnd : this.selectionStart;

			if (position === false) return;
			var lineNumber = this.value.substring(0, position).match(/(\n|$)/g).length,
				Idl = document.getElementById('Idl'),
				div = Idl.querySelector('.activeLine');
			if (div && div.line == lineNumber) return;
			if (div) div.className = '';
			if (Idl.children[lineNumber - 1]) Idl.children[lineNumber - 1].className = 'activeLine';
		});

		idf.addEventListener('mouseup', function() {
			var position = false;
			if (document.selection) {
				this.focus();
				var range = document.selection.createRange();
				range.moveStart('character', -this.value.length);
				position = range.text.length;
			} else if (typeof this.selectionStart == 'number') position = this.selectionDirection != 'backward' ? this.selectionEnd : this.selectionStart;

			if (position === false) return;
			var lineNumber = this.value.substring(0, position).match(/(\n|$)/g).length,
				Idl = document.getElementById('Idl'),
				div = Idl.querySelector('.activeLine');
			if (div && div.line == lineNumber) return;
			if (div) div.className = '';
			if (Idl.children[lineNumber - 1]) Idl.children[lineNumber - 1].className = 'activeLine';
		});

		idf.addEventListener('mousedown', function() {
			var position = false;

			if (document.selection) {
				this.focus();
				var range = document.selection.createRange();
				range.moveStart('character', -this.value.length);
				position = range.text.length;
			} else if (typeof this.selectionStart == 'number') position = this.selectionDirection != 'backward' ? this.selectionEnd : this.selectionStart;

			if (position === false) return;
			var lineNumber = this.value.substring(0, position).match(/(\n|$)/g).length,
				Idl = document.getElementById('Idl'),
				div = Idl.querySelector('.activeLine');
			if (div && div.line == lineNumber) return;
			if (div) div.className = '';
			if (Idl.children[lineNumber - 1]) Idl.children[lineNumber - 1].className = 'activeLine';
		});

		idf.addEventListener('focus', function() {
			var position = false;

			if (document.selection) {
				this.focus();
				var range = document.selection.createRange();
				range.moveStart('character', -this.value.length);
				position = range.text.length;
			} else if (typeof this.selectionStart == 'number') position = this.selectionDirection != 'backward' ? this.selectionEnd : this.selectionStart;

			if (position === false) return;
			var lineNumber = this.value.substring(0, position).match(/(\n|$)/g).length,
				Idl = document.getElementById('Idl'),
				div = Idl.querySelector('.activeLine');
			if (div && div.line == lineNumber) return;
			if (div) div.className = '';
			if (Idl.children[lineNumber - 1]) Idl.children[lineNumber - 1].className = 'activeLine';
		});

		idf.addEventListener('blur', function() {
			var div = document.getElementById('Idl').querySelector('.activeLine');
			if (div) div.className = '';
		});
	}(document.getElementById('idf'));

	document.getElementById('etopt_bold').addEventListener('click', function(e) {
		e.stopPropagation();
		e.preventDefault();
		if (framewindow.document.queryCommandSupported('bold')) framewindow.document.execCommand('bold');
		overlay.ownerDocument.querySelector('[data-html-studio-text-being-edited=true]').alias.dispatchEvent(new KeyboardEvent('keyup'));
	});

	document.getElementById('etopt_italic').addEventListener('click', function(e) {
		e.stopPropagation();
		e.preventDefault();
		if (framewindow.document.queryCommandSupported('italic')) framewindow.document.execCommand('italic');
		overlay.ownerDocument.querySelector('[data-html-studio-text-being-edited=true]').alias.dispatchEvent(new KeyboardEvent('keyup'));
	});

	document.getElementById('etopt_underline').addEventListener('click', function(e) {
		e.stopPropagation();
		e.preventDefault();
		if (framewindow.document.queryCommandSupported('underline')) framewindow.document.execCommand('underline');
		overlay.ownerDocument.querySelector('[data-html-studio-text-being-edited=true]').alias.dispatchEvent(new KeyboardEvent('keyup'));
	});

	document.getElementById('etopt_superscript').addEventListener('click', function(e) {
		e.stopPropagation();
		e.preventDefault();
		if (framewindow.document.queryCommandSupported('superscript')) framewindow.document.execCommand('superscript');
		overlay.ownerDocument.querySelector('[data-html-studio-text-being-edited=true]').alias.dispatchEvent(new KeyboardEvent('keyup'));
	});

	document.getElementById('etopt_subscript').addEventListener('click', function(e) {
		e.stopPropagation();
		e.preventDefault();
		if (framewindow.document.queryCommandSupported('superscript')) framewindow.document.execCommand('subscript');
		overlay.ownerDocument.querySelector('[data-html-studio-text-being-edited=true]').alias.dispatchEvent(new KeyboardEvent('keyup'));
	});

	document.getElementById('etopt_increase_font').addEventListener('click', function(e) {
		!function() {
			// Abunch of variables used later
			var selection = rangy.getSelection(frame),
				range = selection.getRangeAt(0),
				start = range.startContainer,
				node = start,
				match,
				re = [/(^\s*calc\(\s*(.+?)\+\s*)(-?(?:\.?\d+|\d+\.\d+))(pt\)\s*$)/,/(^\s*calc\(\s*(.+?)-\s*)(-?(?:\.?\d+|\d+\.\d+))(pt\)\s*$)/],
				num,
				span,
				frag = document.createDocumentFragment(),
				parent = document.createElement('div'),
				ancestor = (range.commonAncestorContainer.nodeType == 1 ? range.commonAncestorContainer : range.commonAncestorContainer.parentNode),
				newRange = document.createRange(),
				tempAttr = (function(tempAttr) {
					for (tempAttr = tempAttr.replace('.',''); this.querySelector('[' + tempAttr + ']'); tempAttr += (Math.random() * 10 + '').replace('.',''));
						return tempAttr;
				}).call(this, 'data-html-studio-placeholder-' + Math.random() * 10);

			// Change start node to a text node if it is not one already
			if (node.nodeType == 1) node = Text.firstChild(node);

			// Combine any text nodes adjacent to the starting one
			while (node.nextSibling && node.nextSibling.nodeType == 3) {
				node.textContent += node.nextSibling.textContent;
				node.parentNode.removeChild(node.nextSibling);
			}

			// Check if selection is inside a single text node
			if (selection.isCollapsed) {
				/*if (!node.parentNode.innerHTML && node.parentNode.style.fontSize) {
					frag.appendChild(parent);
					parent.appendChild(node.parentNode.cloneNode());
					if (match = node.parentNode.style.fontSize.match(re[0])) parent.firstChild.style.fontSize = (num = parseFloat(match[3]) + 1) ? match[1] + num + match[4] : match[2];
					else if (match = node.parentNode.style.fontSize.match(re[1])) {
						parent.firstChild.style.fontSize = (num = parseFloat(match[3]) - 1) ? match[1] + num + match[4] : match[2];
					} else {
						parent.firstChild.style.fontSize = 'calc(' + node.parentNode.style.fontSize + ' + 1pt)';
					}
					range.selectNode(start.parentNode);
					selection.removeAllRanges();
					selection.addRange(range);
					framewindow.document.execCommand('insertHTML',null,parent.innerHTML);

					var newRange = rangy.getSelection(frame).getRangeAt(0);
					range.selectNodeContents(newRange.startContainer.nextElementSibling || newRange.startContainer);
					selection.removeAllRanges();
					selection.addRange(range);
					node = framewindow.document.createTextNode('\u00ad');
					range.startContainer.appendChild(node);
					range.selectNodeContents(node);
					selection.removeAllRanges();
					selection.addRange(range);
					pseudoEmptyNodes.push(node);
					node.parentNode.addEventListener('keydown', function() {
						this.innerHTML = '';
					});
				} else {
					framewindow.document.execCommand('insertHTML',null,'<span ' + tempAttr + ' style="font-size:calc(1em + 1pt);"></span>');

					var replacedNode = this.querySelector('[' + tempAttr + ']');
					replacedNode.removeAttribute(tempAttr);
					replacedNode.appendChild(framewindow.document.createTextNode('\u00ad'));
					range.setStart(replacedNode.firstChild, 1);
					range.setEnd(replacedNode.firstChild, 1);
					selection.removeAllRanges();
					selection.addRange(range);
					pseudoEmptyNodes.push(replacedNode.firstChild);
					/*var newRange = rangy.getSelection(frame).getRangeAt(0);
					range.selectNode(newRange.startContainer.nextElementSibling || newRange.startContainer);
					selection.removeAllRanges();
					selection.addRange(range);
					node = framewindow.document.createTextNode('\u00ad');
					range.startContainer.appendChild(node);
					range.selectNodeContents(node);
					selection.removeAllRanges();
					selection.addRange(range);
					pseudoEmptyNodes.push(node);
					node.parentNode.addEventListener('keydown', function() {
						this.innerHTML = '';
					}); * /
				}*/
			} else if (start != range.endContainer) {
				// Used to get the innerHTML later
				frag.appendChild(parent);

				// Used to create a clone of the selection inside the document fragment
				function createClone(node, parent) {
					// Don't include the node if it isn't in the selection
					if (!selection.containsNode(node, true)) return;
					// Create the clone
					var clone = node.cloneNode();
					// Assign a reference to their aliases
					clone.alias2 = node;
					node.alias2 = clone;
					// Append the clone to its corresponding parent
					parent.appendChild(clone);
					// Clone any children of the node
					if (node.childNodes) {
						forEach(node.childNodes, function() {
							createClone(this, clone);
						});
					}
				}
				// Start cloning process
				forEach(ancestor.childNodes, function() {
					createClone(this, parent);
				});


				// If the first selected text node isn't fully selected
				if (range.startOffset) {
					// Used to split the partially-selected text node
					span = document.createElement('span');
					// Set a bigger font size
					span.style.fontSize = 'calc(1em + 1pt)';
					// Keep track of element later
					span.setAttribute(tempAttr, '');
					// Put the selected text into the <span>
					span.innerText = node.textContent.substring(range.startOffset);
					// Replace the text node with the <span>
					node.alias2.parentNode.insertBefore(span, node.alias2.nextSibling);
					node.alias2.textContent = node.alias2.textContent.substring(0,range.startOffset);
					// Select next text node
					node = Text.prototype.nextTextNode(node);
				}
				
				// Iterate through the other text nodes in the selection
				for (;node && selection.containsNode(node, true); node = Text.prototype.nextTextNode(node)) {
					// If the current node is the last node of the selection it is only partially selected
					if (node == range.endContainer && range.endOffset != range.endContainer.textContent.length) break;
					// Combine adjacent text nodes so they can be wrapped in a single element
					while (node.nextSibling && node.nextSibling.nodeType == 3 && node.nextSibling != range.endContainer) {
						node.textContent += node.nextSibling.textContent;
						node.alias2.textContent += node.nextSibling.textContent;
						node.parentNode.removeChild(node.nextSibling);
						node.alias2.parentNode.removeChild(node.alias2.nextSibling);
					}
					// If the node is the only child text node of its parent
					if (node == node.parentNode.firstChild && node == node.parentNode.lastChild && node.parentNode.style.fontSize) {
						// Change the parent's font size instead of making a new element
						if (match = node.parentNode.style.fontSize.match(re[0])) {
							node.alias2.parentNode.style.fontSize = (num = parseFloat(match[3]) + 1) ? match[1] + num + match[4] : match[2];
							node.alias2.parentNode.setAttribute(tempAttr, '');
						} else if (match = node.parentNode.style.fontSize.match(re[1])) {
							node.alias2.parentNode.style.fontSize = (num = parseFloat(match[3]) - 1) ? match[1] + num + match[4] : match[2];
							node.alias2.parentNode.setAttribute(tempAttr, '');
						} else {
							node.alias2.parentNode.style.fontSize = 'calc(' + node.parentNode.style.fontSize + ' + 1pt)';
							node.alias2.parentNode.setAttribute(tempAttr, '');
						}
					} else {
						// Create a new element to wrap the text node
						span = document.createElement('span');
						// Set a bigger font size
						span.style.fontSize = 'calc(1em + 1pt)';
						span.setAttribute(tempAttr, '');
						// Insert the <span> before the text node
						node.alias2.parentNode.insertBefore(span, node.alias2);
						// Place the text node inside the <span>
						span.appendChild(node.alias2);
					}
				};

				// If the last text node is only partially selected
				if (node == range.endContainer) {
					// Create a <span> to wrap the text node
					span = document.createElement('span');
					// Set a bigger font size
					span.style.fontSize = 'calc(1em + 1pt)';
					span.setAttribute(tempAttr, '');
					// Only put the selected text into the <span>
					span.innerText = node.textContent.substring(0, range.endOffset);
					// Replace the text node with the <span>
					node.alias2.parentNode.insertBefore(span, node.alias2);
					node.alias2.textContent = node.alias2.textContent.substring(range.endOffset);
				}

				range.setStart(range.startContainer, 0);
				range.setEnd(Text.lastChild(range.endContainer), Text.lastChild(range.endContainer).textContent.length);
				selection.removeAllRanges();
				selection.addRange(range);

				// Replace the selection with the updated nodes
				framewindow.document.execCommand('insertHTML', null, frag.firstChild.innerHTML);

				var replacedElements = [];
				forEach(ancestor.querySelectorAll('[' + tempAttr + ']'), function() {
					this.removeAttribute(tempAttr);
					replacedElements.push(this);
				});
				range.setStart(Text.firstChild(replacedElements[0]), 0);
				var end = Text.lastChild(replacedElements[replacedElements.length - 1]);
				range.setEnd(end, end.textContent.length);
				selection.removeAllRanges();
				selection.addRange(range);
			} else {
				// Selection is inside a single text node
				// Used to get the innerHTML later
				frag.appendChild(parent);
				// If the selection encompasses the entire only-child text node of an element, change the font size directly on that element
				if ((selection.containsNode(node, false) || !range.startOffset && range.endOffset == node.textContent.length) && node.parentNode.firstChild == node && node.parentNode.lastChild == node && node.parentNode.style.fontSize) {
					// Get reference to the parent
					span = node.parentNode.cloneNode(true);
					// Sets a new font size equal to the old font size + 1pt
					if (match = node.parentNode.style.fontSize.match(re[0])) {
						span.style.fontSize = (num = parseFloat(match[3]) + 1) ? match[1] + num + match[4] : match[2];
						span.setAttribute(tempAttr, '');
					} else if (match = node.parentNode.style.fontSize.match(re[1])) {
						span.style.fontSize = (num = parseFloat(match[3]) - 1) ? match[1] + num + match[4] : match[2];
						span.setAttribute(tempAttr, '');
					} else {
						span.style.fontSize = 'calc(' + node.parentNode.style.fontSize + ' + 1pt)';
						span.setAttribute(tempAttr, '');
					}
					// Append the element to the document fragment
					parent.appendChild(span);
					// Select the parent node to replace it
					range.selectNode(node.parentNode);
					var ancestorParent = node.parentNode.parentNode;
					// Update the selection so that it matches the range
					selection.removeAllRanges();
					selection.addRange(range);
					// Swap out the old parent for the new bigger-font clone
					framewindow.document.execCommand('insertHTML', null, parent.innerHTML);
					var replacedNode = this.querySelector('[' + tempAttr + ']');
					replacedNode.removeAttribute(tempAttr);
					range.selectNodeContents(replacedNode);
					selection.removeAllRanges();
					selection.addRange(range);
				} else {
					// Create an element wrapper for the text node
					span = document.createElement('span');
					// Set bigger font size
					span.style.fontSize = 'calc(1em + 1pt)';
					span.setAttribute(tempAttr, '');
					// Only put the selected text into the <span>
					span.innerText = node.textContent.substring(range.startOffset, range.endOffset);
					// Append the element to the document fragment
					parent.appendChild(span);
					// Insert new <span> in place of the part of the text node that was selected
					framewindow.document.execCommand('insertHTML', null, parent.innerHTML);
					// A bug in chromium doesn't really allow this to happen smoothly
					// https://bugs.chromium.org/p/chromium/issues/detail?id=258512
					// The parent element is divided instead of the html being added as a child
					// There's no good way to fix this until the bug gets fixed
					var replacedNode = this.querySelector('[' + tempAttr + ']');
					replacedNode.removeAttribute(tempAttr);
					range.selectNodeContents(replacedNode);
					selection.removeAllRanges();
					selection.addRange(range);
				}
			}
		}.call(overlay.ownerDocument.querySelector('[data-html-studio-text-being-edited=true]').alias);
	});

	document.getElementById('etopt_decrease_font').addEventListener('click', function(e) {
		!function() {
			// Abunch of variables used later
			var selection = rangy.getSelection(frame),
				range = selection.getRangeAt(0),
				start = range.startContainer,
				node = start,
				match,
				re = [/(^\s*calc\(\s*(.+?)\+\s*)(-?(?:\.?\d+|\d+\.\d+))(pt\)\s*$)/,/(^\s*calc\(\s*(.+?)-\s*)(-?(?:\.?\d+|\d+\.\d+))(pt\)\s*$)/],
				num,
				span,
				frag = document.createDocumentFragment(),
				parent = document.createElement('div'),
				ancestor = (range.commonAncestorContainer.nodeType == 1 ? range.commonAncestorContainer : range.commonAncestorContainer.parentNode),
				newRange = document.createRange(),
				tempAttr = (function(tempAttr) {
					for (tempAttr = tempAttr.replace('.',''); this.querySelector('[' + tempAttr + ']'); tempAttr += (Math.random() * 10 + '').replace('.',''));
						return tempAttr;
				}).call(this, 'data-html-studio-placeholder-' + Math.random() * 10);

			// Change start node to a text node if it is not one already
			if (node.nodeType == 1) node = Text.firstChild(node);

			// Combine any text nodes adjacent to the starting one
			while (node.nextSibling && node.nextSibling.nodeType == 3) {
				node.textContent += node.nextSibling.textContent;
				node.parentNode.removeChild(node.nextSibling);
			}

			// Check if selection is inside a single text node
			if (selection.isCollapsed) {
				/*if (!node.parentNode.innerHTML && node.parentNode.style.fontSize) {
					frag.appendChild(parent);
					parent.appendChild(node.parentNode.cloneNode());
					if (match = node.parentNode.style.fontSize.match(re[0])) parent.firstChild.style.fontSize = (num = parseFloat(match[3]) + 1) ? match[1] + num + match[4] : match[2];
					else if (match = node.parentNode.style.fontSize.match(re[1])) {
						parent.firstChild.style.fontSize = (num = parseFloat(match[3]) - 1) ? match[1] + num + match[4] : match[2];
					} else {
						parent.firstChild.style.fontSize = 'calc(' + node.parentNode.style.fontSize + ' + 1pt)';
					}
					range.selectNode(start.parentNode);
					selection.removeAllRanges();
					selection.addRange(range);
					framewindow.document.execCommand('insertHTML',null,parent.innerHTML);

					var newRange = rangy.getSelection(frame).getRangeAt(0);
					range.selectNodeContents(newRange.startContainer.nextElementSibling || newRange.startContainer);
					selection.removeAllRanges();
					selection.addRange(range);
					node = framewindow.document.createTextNode('\u00ad');
					range.startContainer.appendChild(node);
					range.selectNodeContents(node);
					selection.removeAllRanges();
					selection.addRange(range);
					pseudoEmptyNodes.push(node);
					node.parentNode.addEventListener('keydown', function() {
						this.innerHTML = '';
					});
				} else {
					framewindow.document.execCommand('insertHTML',null,'<span ' + tempAttr + ' style="font-size:calc(1em + 1pt);"></span>');

					var replacedNode = this.querySelector('[' + tempAttr + ']');
					replacedNode.removeAttribute(tempAttr);
					replacedNode.appendChild(framewindow.document.createTextNode('\u00ad'));
					range.setStart(replacedNode.firstChild, 1);
					range.setEnd(replacedNode.firstChild, 1);
					selection.removeAllRanges();
					selection.addRange(range);
					pseudoEmptyNodes.push(replacedNode.firstChild);
					/*var newRange = rangy.getSelection(frame).getRangeAt(0);
					range.selectNode(newRange.startContainer.nextElementSibling || newRange.startContainer);
					selection.removeAllRanges();
					selection.addRange(range);
					node = framewindow.document.createTextNode('\u00ad');
					range.startContainer.appendChild(node);
					range.selectNodeContents(node);
					selection.removeAllRanges();
					selection.addRange(range);
					pseudoEmptyNodes.push(node);
					node.parentNode.addEventListener('keydown', function() {
						this.innerHTML = '';
					}); * /
				}*/
			} else if (start != range.endContainer) {
				// Used to get the innerHTML later
				frag.appendChild(parent);

				// Used to create a clone of the selection inside the document fragment
				function createClone(node, parent) {
					// Don't include the node if it isn't in the selection
					if (!selection.containsNode(node, true)) return;
					// Create the clone
					var clone = node.cloneNode();
					// Assign a reference to their aliases
					clone.alias2 = node;
					node.alias2 = clone;
					// Append the clone to its corresponding parent
					parent.appendChild(clone);
					// Clone any children of the node
					if (node.childNodes) {
						forEach(node.childNodes, function() {
							createClone(this, clone);
						});
					}
				}
				// Start cloning process
				forEach(ancestor.childNodes, function() {
					createClone(this, parent);
				});


				// If the first selected text node isn't fully selected
				if (range.startOffset) {
					// Used to split the partially-selected text node
					span = document.createElement('span');
					// Set a bigger font size
					span.style.fontSize = 'calc(1em - 1pt)';
					// Keep track of element later
					span.setAttribute(tempAttr, '');
					// Put the selected text into the <span>
					span.innerText = node.textContent.substring(range.startOffset);
					// Replace the text node with the <span>
					node.alias2.parentNode.insertBefore(span, node.alias2.nextSibling);
					node.alias2.textContent = node.alias2.textContent.substring(0,range.startOffset);
					// Select next text node
					node = Text.prototype.nextTextNode(node);
				}
				
				// Iterate through the other text nodes in the selection
				for (;node && selection.containsNode(node, true); node = Text.prototype.nextTextNode(node)) {
					// If the current node is the last node of the selection it is only partially selected
					if (node == range.endContainer && range.endOffset != range.endContainer.textContent.length) break;
					// Combine adjacent text nodes so they can be wrapped in a single element
					while (node.nextSibling && node.nextSibling.nodeType == 3 && node.nextSibling != range.endContainer) {
						node.textContent += node.nextSibling.textContent;
						node.alias2.textContent += node.nextSibling.textContent;
						node.parentNode.removeChild(node.nextSibling);
						node.alias2.parentNode.removeChild(node.alias2.nextSibling);
					}
					// If the node is the only child text node of its parent
					if (node == node.parentNode.firstChild && node == node.parentNode.lastChild && node.parentNode.style.fontSize) {
						// Change the parent's font size instead of making a new element
						if (match = node.parentNode.style.fontSize.match(re[0])) {
							node.alias2.parentNode.style.fontSize = (num = parseFloat(match[3]) - 1) ? match[1] + num + match[4] : match[2];
							node.alias2.parentNode.setAttribute(tempAttr, '');
						} else if (match = node.parentNode.style.fontSize.match(re[1])) {
							node.alias2.parentNode.style.fontSize = (num = parseFloat(match[3]) + 1) ? match[1] + num + match[4] : match[2];
							node.alias2.parentNode.setAttribute(tempAttr, '');
						} else {
							node.alias2.parentNode.style.fontSize = 'calc(' + node.parentNode.style.fontSize + ' - 1pt)';
							node.alias2.parentNode.setAttribute(tempAttr, '');
						}
					} else {
						// Create a new element to wrap the text node
						span = document.createElement('span');
						// Set a bigger font size
						span.style.fontSize = 'calc(1em - 1pt)';
						span.setAttribute(tempAttr, '');
						// Insert the <span> before the text node
						node.alias2.parentNode.insertBefore(span, node.alias2);
						// Place the text node inside the <span>
						span.appendChild(node.alias2);
					}
				};

				// If the last text node is only partially selected
				if (node == range.endContainer) {
					// Create a <span> to wrap the text node
					span = document.createElement('span');
					// Set a bigger font size
					span.style.fontSize = 'calc(1em - 1pt)';
					span.setAttribute(tempAttr, '');
					// Only put the selected text into the <span>
					span.innerText = node.textContent.substring(0, range.endOffset);
					// Replace the text node with the <span>
					node.alias2.parentNode.insertBefore(span, node.alias2);
					node.alias2.textContent = node.alias2.textContent.substring(range.endOffset);
				}

				range.setStart(range.startContainer, 0);
				range.setEnd(Text.lastChild(range.endContainer), Text.lastChild(range.endContainer).textContent.length);
				selection.removeAllRanges();
				selection.addRange(range);

				// Replace the selection with the updated nodes
				framewindow.document.execCommand('insertHTML', null, frag.firstChild.innerHTML);

				var replacedElements = [];
				forEach(ancestor.querySelectorAll('[' + tempAttr + ']'), function() {
					this.removeAttribute(tempAttr);
					replacedElements.push(this);
				});
				range.setStart(Text.firstChild(replacedElements[0]), 0);
				var end = Text.lastChild(replacedElements[replacedElements.length - 1]);
				range.setEnd(end, end.textContent.length);
				selection.removeAllRanges();
				selection.addRange(range);
			} else {
				// Selection is inside a single text node
				// Used to get the innerHTML later
				frag.appendChild(parent);
				// If the selection encompasses the entire only-child text node of an element, change the font size directly on that element
				if ((selection.containsNode(node, false) || !range.startOffset && range.endOffset == node.textContent.length) && node.parentNode.firstChild == node && node.parentNode.lastChild == node && node.parentNode.style.fontSize) {
					// Get reference to the parent
					span = node.parentNode.cloneNode(true);
					// Sets a new font size equal to the old font size + 1pt
					if (match = node.parentNode.style.fontSize.match(re[0])) {
						span.style.fontSize = (num = parseFloat(match[3]) - 1) ? match[1] + num + match[4] : match[2];
						span.setAttribute(tempAttr, '');
					} else if (match = node.parentNode.style.fontSize.match(re[1])) {
						span.style.fontSize = (num = parseFloat(match[3]) + 1) ? match[1] + num + match[4] : match[2];
						span.setAttribute(tempAttr, '');
					} else {
						span.style.fontSize = 'calc(' + node.parentNode.style.fontSize + ' - 1pt)';
						span.setAttribute(tempAttr, '');
					}
					// Append the element to the document fragment
					parent.appendChild(span);
					// Select the parent node to replace it
					range.selectNode(node.parentNode);
					var ancestorParent = node.parentNode.parentNode;
					// Update the selection so that it matches the range
					selection.removeAllRanges();
					selection.addRange(range);
					// Swap out the old parent for the new bigger-font clone
					framewindow.document.execCommand('insertHTML', null, parent.innerHTML);
					var replacedNode = this.querySelector('[' + tempAttr + ']');
					replacedNode.removeAttribute(tempAttr);
					range.selectNodeContents(replacedNode);
					selection.removeAllRanges();
					selection.addRange(range);
				} else {
					// Create an element wrapper for the text node
					span = document.createElement('span');
					// Set bigger font size
					span.style.fontSize = 'calc(1em - 1pt)';
					span.setAttribute(tempAttr, '');
					// Only put the selected text into the <span>
					span.innerText = node.textContent.substring(range.startOffset, range.endOffset);
					// Append the element to the document fragment
					parent.appendChild(span);
					// Insert new <span> in place of the part of the text node that was selected
					framewindow.document.execCommand('insertHTML', null, parent.innerHTML);
					// A bug in chromium doesn't really allow this to happen smoothly
					// https://bugs.chromium.org/p/chromium/issues/detail?id=258512
					// The parent element is divided instead of the html being added as a child
					// There's no good way to fix this until the bug gets fixed
					var replacedNode = this.querySelector('[' + tempAttr + ']');
					replacedNode.removeAttribute(tempAttr);
					range.selectNodeContents(replacedNode);
					selection.removeAllRanges();
					selection.addRange(range);
				}
			}
		}.call(overlay.ownerDocument.querySelector('[data-html-studio-text-being-edited=true]').alias);
	});

	document.getElementById('etopt_justify_left').addEventListener('click', function() {
		var editable = overlay.ownerDocument.querySelector('[data-html-studio-text-being-edited=true]').alias;
		for (var node = framewindow.document.getSelection().anchorNode.parentNode; !(node.style.display in {block:0,'inline-block':0} || getComputedStyle(node).display in {block:0,'inline-block':0} || node == editable); node = node.parentNode);
		node.style.textAlign = 'left';
		node.alias.style.textAlign = 'left';
		editable.dispatchEvent(new KeyboardEvent('keyup'));
	});

	document.getElementById('etopt_justify_center').addEventListener('click', function() {
		var editable = overlay.ownerDocument.querySelector('[data-html-studio-text-being-edited=true]').alias;
		for (var node = framewindow.document.getSelection().anchorNode.parentNode; !(node.style.display in {block:0,'inline-block':0} || getComputedStyle(node).display in {block:0,'inline-block':0} || node == editable); node = node.parentNode);
		node.style.textAlign = 'center';
		node.alias.style.textAlign = 'center';
		editable.dispatchEvent(new KeyboardEvent('keyup'));
	});

	document.getElementById('etopt_justify_right').addEventListener('click', function() {
		var editable = overlay.ownerDocument.querySelector('[data-html-studio-text-being-edited=true]').alias;
		for (var node = framewindow.document.getSelection().anchorNode.parentNode; !(node.style.display in {block:0,'inline-block':0} || getComputedStyle(node).display in {block:0,'inline-block':0} || node == editable); node = node.parentNode);
		node.style.textAlign = 'right';
		node.alias.style.textAlign = 'right';
		editable.dispatchEvent(new KeyboardEvent('keyup'));
	});

	document.getElementById('etopt_justify_full').addEventListener('click', function() {
		var editable = overlay.ownerDocument.querySelector('[data-html-studio-text-being-edited=true]').alias;
		for (var node = framewindow.document.getSelection().anchorNode.parentNode; !(node.style.display in {block:0,'inline-block':0} || getComputedStyle(node).display in {block:0,'inline-block':0} || node == editable); node = node.parentNode);
		node.style.textAlign = 'justify';
		node.alias.style.textAlign = 'justify';
		editable.dispatchEvent(new KeyboardEvent('keyup'));
	});

	// Click event for top screen grabber when toolbar is inactive
	document.getElementById('toolbargrabber').addEventListener('click', function() {
		if (this.dragged) return this.dragged = false;
		userPrefs.set('toolbar', true);
		document.getElementById('toolbarcontainer').className = '';
		contextmenus[4].getItem('toolbar').toggled = true;
		setTimeout(overlayUpdate, 300);
	});

	// Save button for Edit > Preferences > Selected Element Color
	document.getElementById('Idf').addEventListener('click', function() {
		userPrefs.set('nodeSelectionColor', [document.querySelector('#Ide div:first-child').userColor || userPrefs.nodeSelectionColor[0], document.querySelector('#Ide div:last-child').userColor || userPrefs.nodeSelectionColor[1]]);
		document.getElementById('dialog_pref_selected_elem_color').style.display = '';
		backdialog.style.display = '';
	});

	// Restore Default button for Edit > Preferences > Selected Element Color
	document.getElementById('Idh').addEventListener('click', function() {
		userPrefs.set('nodeSelectionColor', [[0,172,193,.15],[0,172,193,.5]]);
		document.querySelector('#Ide :first-child').userColor = [0,172,193,.15];
		document.querySelector('#Ide :last-child').userColor = [0,172,193,.5];
		document.getElementById('Idc').colorSelector.goTo([0,172,193,document.querySelector('#Ide div.active').nextElementSibling ? .15 : .5]);
	});

	// On click for Edit > Preferences > Node Selection Color > Color #1 and Color #2
	forEach(document.querySelectorAll('#Ide div'), function(_,i) {
		this.addEventListener('click', function() {
			this.className = 'active';
			(this.previousElementSibling || this.nextElementSibling).className = '';
			document.getElementById('Idc').colorSelector.goTo(this.userColor || userPrefs.nodeSelectionColor[i]);
		});
	});

	// File > Save... > Local File / Google Drive buttons
	forEach(document.querySelectorAll('#Idn div'), function() {
		this.addEventListener('click', function() {
			this.className = 'active';
			(this.previousElementSibling || this.nextElementSibling).className = '';
			this.parentNode.className = this.previousElementSibling ? 'drive' : 'local';
			if (this.nextElementSibling) document.getElementById('IdY').className = document.getElementById('IdZ').className = '';
		});
	});

	// File > Open... > Local File / Google Drive buttons
	forEach(document.querySelectorAll('#id0 div'), function() {
		this.addEventListener('click', function() {
			this.className = 'active';
			(this.previousElementSibling || this.nextElementSibling).className = '';
			this.parentNode.className = this.previousElementSibling ? 'drive' : 'local';
		});
	});

	// File > Save... > Save as File
	document.getElementById('IdA').addEventListener('click', function() {
		function toFileName(filename) {
			filename = filename.trim();
			if (!filename) return '';
			return filename + (options.extension != 'pdf' ? filename.substring(filename.length - 5) == '.html' || filename.substring(filename.length - 4) == '.htm' ? '' : '.html' : filename.substring(filename.length - 5) == '.pdf' ? '' : '.pdf');
		}
		var options = {
			extension: 'html' /*document.querySelector('[name=saveFileFormat]:checked').value*/,
			format: document.querySelector('[name=saveTextFormat]:checked').value,
			encode: document.getElementById('Idz').checked,
			noStyleName: document.getElementById('IdC').checked,
			indentation: document.querySelector('#Idw select').value
		}

		// Allow for scrolling in saved document
		framewindow.document.documentElement.style.overflow = '';
		// If user wants to remove stylesheet names
		if (options.noStyleName) {
			forEach(framewindow.document.querySelectorAll('style'), function() {
				if ((this.htmlStudioStylesheetName = this.getAttribute('data-name')) !== null) {
					this.removeAttribute('data-name');
				};
			});
		} else {
			// Still remove `data-name` attribute if it has no value
			forEach(framewindow.document.querySelectorAll('style[data-name=""]'), function() {
				this.removeAttribute('data-name');
			});
		}

		// Save as HTML
		if (options.extension != 'pdf') {
			HTMLStudio.saveAs(
				new Blob(
					['<!DOCTYPE html>\n<!-- Created with HTML Studio (https://christianfigueroa.github.io/HTML-Studio) -->\n' + (options.format == 'prettify' ? '\n' : '') + (options.format == 'minify' ? HTMLStudio.formatHTML.minify(options.encode) : HTMLStudio.formatHTML.prettify({encodeEntities: options.encode, indentation: options.indentation}))],
					{type: 'text/html'}
				),
				toFileName(document.getElementById('Ida').value) || toFileName(document.getElementById('title').value) || 'index.html'
			);
		// Save as PDF
		} else {
			HTMLStudio.saveAs(
				new Blob(
					['PDF Text'],
					{type: 'application/pdf'}
				),
				toFileName(document.getElementById('Ida').value) || toFileName(document.getElementById('title').value) || 'index.pdf'
			);
		}

		// Re-disable scrolling for HTML Studio
		framewindow.document.documentElement.style.overflow = 'hidden';
		// Restore stylesheet names
		if (options.noStyleName) {
			forEach(framewindow.document.querySelectorAll('style'), function() {
				if (this.htmlStudioStylesheetName !== null) this.setAttribute('data-name', this.htmlStudioStylesheetName);
			});
		}
	});

	// File > Save...  > Save to Existing File in Drive
	document.getElementById('Idb').addEventListener('click', function() {
		var options = {
			extension: 'html' /*document.querySelector('[name=saveFileFormat]:checked').value*/,
			format: document.querySelector('[name=saveTextFormat]:checked').value,
			encode: document.getElementById('Idz').checked,
			noStyleName: document.getElementById('IdC').checked,
			indentation: document.querySelector('#Idw select').value
		}
		HTMLStudio.google.file.picker(function(e) {
			function toFileName(filename) {
				filename = filename.trim();
				if (!filename) return '';
				return filename + (options.extension != 'pdf' ? filename.substring(filename.length - 5) == '.html' || filename.substring(filename.length - 4) == '.htm' ? '' : '.html' : filename.substring(filename.length - 5) == '.pdf' ? '' : '.pdf');
			}

			// Allow for scrolling in saved document
			framewindow.document.documentElement.style.overflow = '';
			// If user wants to remove stylesheet names
			if (options.noStyleName) {
				forEach(framewindow.document.querySelectorAll('style'), function() {
					if ((this.htmlStudioStylesheetName = this.getAttribute('data-name')) !== null) {
						this.removeAttribute('data-name');
					};
				});
			} else {
				// Still remove `data-name` attribute if it has no value
				forEach(framewindow.document.querySelectorAll('style[data-name=""]'), function() {
					this.removeAttribute('data-name');
				});
			}

			// Save as HTML
			if (options.extension != 'pdf') {
				var html = '<!DOCTYPE html>\n<!-- Created with HTML Studio (https://christianfigueroa.github.io/HTML-Studio) -->\n' + (options.format == 'prettify' ? '\n' : '') + (options.format == 'minify' ? HTMLStudio.formatHTML.minify(options.encode) : HTMLStudio.formatHTML.prettify({encodeEntities: options.encode, indentation: options.indentation})),
					name = toFileName(document.getElementById('Ida').value) || toFileName(document.getElementById('title').value) || 'index.html';

				var xhr = new XMLHttpRequest;
				xhr.open('PATCH', 'https://www.googleapis.com/upload/drive/v3/files/' + e.docs[0].id + '?uploadType=resumable');
				xhr.setRequestHeader('Authorization', 'Bearer ' + HTMLStudio.google.user.token());
				xhr.setRequestHeader('X-Upload-Content-Type', e.docs[0].mimeType);
				xhr.setRequestHeader('X-Upload-Content-Length', html.length);
				xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
				xhr.addEventListener('readystatechange', function() {
					if (this.readyState == 4) {
						if (this.status >= 200 && this.status < 300) {
							var uploadUrl = this.getResponseHeader('Location');

							xhr = new XMLHttpRequest;
							xhr.open('PUT', uploadUrl);
							xhr.setRequestHeader('Authorization', 'Bearer ' + HTMLStudio.google.user.token());
							xhr.addEventListener('readystatechange', function() {
								if (this.readyState == 4) {
									if (this.status >= 200 && this.status < 300) {
										var response = JSON.parse(this.response);
										history.changeMethod('drive', response.id);
										document.getElementById('IdY').className = '';
										document.getElementById('IdZ').className = 'active';
									} else {
										document.getElementById('IdY').className = 'active';
										document.getElementById('IdZ').className = '';
									}
								}
							});
							xhr.send(html);
						} else {
							document.getElementById('IdY').className = 'active';
							document.getElementById('IdZ').className = '';
						}
					}
				});
				xhr.send();
			// Save as PDF
			} else {
				HTMLStudio.saveAs(
					new Blob(
						['PDF Text'],
						{type: 'application/pdf'}
					),
					toFileName(document.getElementById('Ida').value) || toFileName(document.getElementById('title').value) || 'index.pdf'
				);
			}

			// Re-disable scrolling for HTML Studio
			framewindow.document.documentElement.style.overflow = 'hidden';
			// Restore stylesheet names
			if (options.noStyleName) {
				forEach(framewindow.document.querySelectorAll('style'), function() {
					if (this.htmlStudioStylesheetName !== null) this.setAttribute('data-name', this.htmlStudioStylesheetName);
				});
			}
		}, [new google.picker.View(google.picker.ViewId.DOCS).setMimeTypes(options == 'pdf' ? 'application/pdf' : 'text/html,text/plain')]).setVisible(true);
	});

	// File > Save... > Save to New File in Drive
	document.getElementById('idY').addEventListener('click', function() {
		function toFileName(filename) {
			filename = filename.trim();
			if (!filename) return '';
			return filename + (options.extension != 'pdf' ? filename.substring(filename.length - 5) == '.html' || filename.substring(filename.length - 4) == '.htm' ? '' : '.html' : filename.substring(filename.length - 5) == '.pdf' ? '' : '.pdf');
		}
		var options = {
			extension: 'html' /*document.querySelector('[name=saveFileFormat]:checked').value*/,
			format: document.querySelector('[name=saveTextFormat]:checked').value,
			encode: document.getElementById('Idz').checked,
			noStyleName: document.getElementById('IdC').checked,
			indentation: document.querySelector('#Idw select').value
		}

		// Allow for scrolling in saved document
		framewindow.document.documentElement.style.overflow = '';
		// If user wants to remove stylesheet names
		if (options.noStyleName) {
			forEach(framewindow.document.querySelectorAll('style'), function() {
				if ((this.htmlStudioStylesheetName = this.getAttribute('data-name')) !== null) {
					this.removeAttribute('data-name');
				};
			});
		} else {
			// Still remove `data-name` attribute if it has no value
			forEach(framewindow.document.querySelectorAll('style[data-name=""]'), function() {
				this.removeAttribute('data-name');
			});
		}

		// Save as HTML
		if (options.extension != 'pdf') {
			var html = '<!DOCTYPE html>\n<!-- Created with HTML Studio (https://christianfigueroa.github.io/HTML-Studio) -->\n' + (options.format == 'prettify' ? '\n' : '') + (options.format == 'minify' ? HTMLStudio.formatHTML.minify(options.encode) : HTMLStudio.formatHTML.prettify({encodeEntities: options.encode, indentation: options.indentation})),
				name = toFileName(document.getElementById('Ida').value) || toFileName(document.getElementById('title').value) || 'index.html';

			var xhr = new XMLHttpRequest;
			xhr.open('POST', 'https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable');
			xhr.setRequestHeader('Authorization', 'Bearer ' + HTMLStudio.google.user.token());
			xhr.setRequestHeader('X-Upload-Content-Type', 'text/html');
			xhr.setRequestHeader('X-Upload-Content-Length', html.length);
			xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
			xhr.addEventListener('readystatechange', function() {
				if (this.readyState == 4) {
					if (this.status >= 200 && this.status < 300) {
						var uploadUrl = this.getResponseHeader('Location');

						xhr = new XMLHttpRequest;
						xhr.open('PUT', uploadUrl);
						xhr.setRequestHeader('Authorization', 'Bearer ' + HTMLStudio.google.user.token());
						xhr.addEventListener('readystatechange', function() {
							if (this.readyState == 4) {
								if (this.status >= 200 && this.status < 300) {
									var response = JSON.parse(this.response);
									history.changeMethod('drive', response.id);
									document.getElementById('IdY').className = '';
									document.getElementById('IdZ').className = 'active';
								} else {
									document.getElementById('IdY').className = 'active';
									document.getElementById('IdZ').className = '';
								}
							}
						});
						xhr.send(html);
					} else {
						document.getElementById('IdY').className = 'active';
						document.getElementById('IdZ').className = '';
					}
				}
			});
			xhr.send(JSON.stringify({name: name}));
		// Save as PDF
		} else {
			HTMLStudio.saveAs(
				new Blob(
					['PDF Text'],
					{type: 'application/pdf'}
				),
				toFileName(document.getElementById('Ida').value) || toFileName(document.getElementById('title').value) || 'index.pdf'
			);
		}

		// Re-disable scrolling for HTML Studio
		framewindow.document.documentElement.style.overflow = 'hidden';
		// Restore stylesheet names
		if (options.noStyleName) {
			forEach(framewindow.document.querySelectorAll('style'), function() {
				if (this.htmlStudioStylesheetName !== null) this.setAttribute('data-name', this.htmlStudioStylesheetName);
			});
		}
	});

	// Insert Node button for [Right Click] > Insert Child...
	document.getElementById('idS').addEventListener('click', function() {
		var obj = document.getElementById('ida').insertChild,
			node = obj.nodeName == obj.textNode ? document.createTextNode(document.getElementById('idX').value) : document.createElement(obj.nodeName);
		var symbol = Symbol();
		if (obj.children) {
			var refNode = obj.children[obj.index] || {n:{s:symbol, previousSibling: obj.children[obj.children.length - 1].n}};

			if (node.nodeType == 3 && (refNode.n.previousSibling || {}).nodeType == 3) {
				refNode.n.previousSibling.textContent += node.textContent;
			} else if (node.nodeType == 3 && (refNode.n || {}).nodeType == 3) {
				refNode.n.textContent = node.textContent + refNode.n.textContent;
			} else if (node.nodeType == 1 && refNode.n.nodeType == 1 && refNode.n.previousSibling && refNode.n.previousSibling.nodeType == 3 && !refNode.n.previousSibling.textContent.trim()) {
				var text = refNode.n.previousSibling.textContent;
				obj.element.insertBefore(node, refNode.n)
				obj.element.insertBefore(document.createTextNode(text), refNode.n);
			} else if (node.nodeType == 1 && !refNode.n.nodeType && refNode.n.previousSibling.nodeType == 1 && refNode.n.previousSibling.previousSibling && refNode.n.previousSibling.previousSibling.nodeType == 3 && !refNode.n.previousSibling.previousSibling.textContent.trim()) {
				var text = refNode.n.previousSibling.previousSibling.textContent;
				obj.element.appendChild(document.createTextNode(text));
				obj.element.appendChild(node);
			} else {
				obj.element.insertBefore(node, refNode.n.s == symbol ? null : refNode.n);
			}
		} else {
			obj.element.appendChild(node);
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
	forEach(document.querySelectorAll('.clf:not(input)'), function(element) {
		element.addEventListener('click', function() {
			forEach(document.querySelectorAll('.clf.clg'), function(element) {
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
	});

	// On keyup for [Right Click] > Insert Child... > Custom HTML Element
	document.getElementById('idc').addEventListener('keyup', function() {
		forEach(document.querySelectorAll('.clf.clg'), function(element) {
			element.className = 'clf';
		});
		if (/^<?[a-zA-Z:_][a-zA-Z\d:_.-]*>?$/.test(this.value.trim())) {
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
			var ida = document.getElementById('ida');
			document.getElementById('idS').className = 'option disabled';
			(ida.insertChild = ida.insertChild || {}).nodeName = null;
			document.getElementById('idW').style.display = '';
		}
	});
	document.getElementById('idc').addEventListener('focus', function() {
		this.dispatchEvent(new KeyboardEvent('keyup'));
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
			forEach(elements, function(element) {
				if (element.alias) {
					clickhandler.call(element.alias, pseudoEvent.__extend__({set: true}));
				}
			});
			updateTooltip();
			updateTreeSelections();
		} catch (e) {
			if (e.code != e.SYNTAX_ERR) throw e;
			if (this.value.trim()) this.style.background = '#FFE1E1';
			else {
				deselect();
				updateTreeSelections();
				updateTooltip();
			}
		}
	});
	document.getElementById('idP').addEventListener('focus', function() {
		this.dispatchEvent(new KeyboardEvent('keyup'));
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

	// Updates the element's attribute
	document.getElementById('Idk').addEventListener('keyup', function() {
		if (this.value.trim()) this.element.setAttribute(this.element.nodeName in {a:0,A:0} ? 'href' : 'src', this.value.trim());
		else this.element.removeAttribute(this.element.nodeName in {a:0,A:0} ? 'href' : 'src');
		deselect();
		updateTooltip();
	});
	document.getElementById('Idk').addEventListener('blur', function() {
		history.update('Edit ' + (this.element.nodeName in {a:0,A:0} ? 'href' : 'src'));
		overlayUpdate();
		this.parentNode.className = 'topText';
	});
	document.getElementById('Idk').addEventListener('keydown', onEnter);

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

	// Close .topText parents on click of exit button
	forEach(document.getElementsByClassName('cle'), function(element) {
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
			var idJ = document.getElementById('idJ');
			if (idJ) idH.removeChild(idJ);
			// Get stylesheet from CSSEditor
			var stylesheet = editor.generateStylesheet(), name = document.getElementById('idK').value.trim() || '';
			// Set the stylesheet data-name
			stylesheet.setAttribute('data-name', name);
			// Add new stylesheet
			HTMLStudio.document.stylesheets.push({
				html: stylesheet.outerHTML,
				node: stylesheet,
				name: name
			});
			// Add the stylesheet to the document (will be automatically moved later)
			framewindow.document.head.appendChild(stylesheet);
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
		// Modified version of #idI click listener above
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
			var idO = document.getElementById('idO');
			if (idO) idL.removeChild(idO);
			var stylesheet = editor.generateStylesheet(), name = document.getElementById('idM').value.trim() || '';
			stylesheet.setAttribute('data-name', name);
			var index = HTMLStudio.document.stylesheets.map(function(a) {
				return a.node;
			}).indexOf(idL.stylesheet.node);
			if (!~index) {
				// Add new style sheet
				HTMLStudio.document.stylesheets.push({
					html: stylesheet.outerHTML,
					node: stylesheet,
					name: name
				});
			} else {
				// Edit the existing stylesheet
				HTMLStudio.document.stylesheets[index].html = stylesheet.outerHTML;
				HTMLStudio.document.stylesheets[index].node.innerHTML = stylesheet.innerHTML;
				HTMLStudio.document.stylesheets[index].node.setAttribute('data-name', name);
				HTMLStudio.document.stylesheets[index].name = name;
			}
			updateStylesheets();
			setTimeout(overlayUpdate, 500);
			setTimeout(overlayUpdate, 1000);
			closeDialogs();
			history.update('Edit style sheet');
		}
	});

	//Prevents #no_paste dialog from being shown if checkbox is clicked
	document.getElementById('idB').addEventListener('change', function() {
		storage.set('b', this.checked ? '1' : '0');
	});

	document.getElementById('idD').addEventListener('click', function() {
		contextmenus[4].getItem('htmlTree').dispatchEvent(new MouseEvent('click'));
	});

	// Scrolls iframe depending on #framecontainer's scrollTop
	document.getElementById('framecontainer').addEventListener('scroll', Modernizr.csspositionsticky ? function() {
		// Browser with support for position:sticky that might use asynchronous scrolling
		framewindow.document.documentElement.scrollTop = framewindow.document.body.scrollTop = overlay.scrollTop = overlay.parentNode.scrollTop = this.scrollTop;
		framewindow.document.documentElement.scrollLeft = framewindow.document.body.scrollLeft = overlay.scrollLeft = overlay.parentNode.scrollLeft = this.scrollLeft;
		overlayframe.style.top = this.scrollTop + 'px';
		overlayframe.style.left = this.scrollLeft + 'px';
	} : function() {
		// Browsers with no support for position:sticky that probably doesn't use asynchronous scrolling
		framewindow.document.documentElement.scrollTop = framewindow.document.body.scrollTop = overlay.scrollTop = overlay.parentNode.scrollTop = this.scrollTop;
		framewindow.document.documentElement.scrollLeft = framewindow.document.body.scrollLeft = overlay.scrollLeft = overlay.parentNode.scrollLeft = this.scrollLeft;
		iframe.style.top = overlayframe.style.top = this.scrollTop + 'px';
		iframe.style.left = overlayframe.style.left = this.scrollLeft + 'px';
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
	forEach(document.getElementsByClassName('headersection'), function(element,index,array){
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
					forEach(HTMLStudio.document.stylesheets, function(stylesheet, index) {
						arg.items.push({
							name: stylesheet.name.replace(/</g,'&lt;').replace(/>/g,'&gt;') || '<span style="font-style:italic">Unnamed Style Sheet</span>',
							subcontext: {
								items: [{
									name: 'Edit&#133;',
									func: function(_,close) {
										var editor = new HTMLStudio.CSSEditor(this.root.parentNode.stylesheet.node.sheet, true, framewindow.document);
										editor.onQuerySelector = function(query) {
											deselect();
											forEach(framewindow.document.querySelectorAll(query), function() {
												if (!this.alias) return;
												clickhandler.call(this.alias, pseudoEvent.__extend__({set: true}));
											});
											closeDialogs();
											updateTooltip();
										};
										var idL = document.getElementById('idL');
										idL.editor = editor;
										idL.stylesheet = this.root.parentNode.stylesheet;
										editor.node.addEventListener('keypress', function(e) {
											if (e.target.nodeName == 'INPUT' && e.charCode) this.modified = true;
										});
										editor.node.modified = true;
										idL.innerHTML = '<h4 style="text-align:center">Edit the style sheet styles below or click a <img class="cld" src="svg/select_from_selector.svg" style="cursor:initial"> to select all elements matching the corresponding CSS selector.</h4><br><input type="checkbox" checked id="cssSyntaxHighlighter"> <label for="cssSyntaxHighlighter">Syntax Highlighting</label><br><br><input type="text" id="idM" placeholder="Style Sheet Name">';
										idL.appendChild(editor.node);
										openDialog('edit_stylesheet');
										document.getElementById('idM').value = this.root.parentNode.stylesheet.name || this.root.parentNode.stylesheet.node.getAttribute('data-name') || '';
										function prevent(e) {
											e.stopPropagation();
											e.preventDefault();
										};
										forEach(document.querySelectorAll('#cssSyntaxHighlighter, #cssSyntaxHighlighter + label'), function() {
											this.addEventListener('touchstart', function(e) {
												setTimeout(function() {
													this.checked = !this.checked;
													var focusedNode = document.querySelector('input:checked ~ .cssEditContainer .cssRule > input:focus');
													if (focusedNode) focusedNode.dispatchEvent(new KeyboardEvent('keydown'));
												}.bind(this.nodeName == 'LABEL' ? document.getElementById('cssSyntaxHighlighter') : this), 0);
												e.stopPropagation();
												e.preventDefault();
											});
											this.addEventListener('click', function(e) {
												setTimeout(function() {
													this.checked = !this.checked;
													var focusedNode = document.querySelector('input:checked ~ .cssEditContainer .cssRule > input:focus');
													if (focusedNode) focusedNode.dispatchEvent(new KeyboardEvent('keydown'));
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
										var index = HTMLStudio.document.stylesheets.indexOf(this.root.parentNode.stylesheet);
										if (!~index) return;
										HTMLStudio.document.stylesheets.splice(index, 1);
										this.root.parentNode.stylesheet.node.parentNode.removeChild(this.root.parentNode.stylesheet.node);

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
					var elements = selection.get.all();
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
			forEach(array, function(element, index) {
				element.style.background = '';
				try{
					contextmenus[index + 2].close();
				}catch(_){}
			});
			dispatchEvent(new MouseEvent('mousedown'));
			if (index == 3) contextmenus[5] = (function(){
				var arg = {items: cssContextMenuArg.items.slice(), pseudoParent: cssContextMenuArg.pseudoParent};
				forEach(HTMLStudio.document.stylesheets, function(stylesheet, index) {
					arg.items.push({
						name: stylesheet.name.replace(/</g,'&lt;').replace(/>/g,'&gt;') || '<span style="font-style:italic">Unnamed Style Sheet</span>',
						subcontext: {
							items: [{
								name: 'Edit&#133;',
								func: function(_,close) {
									var editor = new HTMLStudio.CSSEditor(this.root.parentNode.stylesheet.node.sheet, true, framewindow.document);
									editor.onQuerySelector = function(query) {
										deselect();
										var y = Math.round(em(4.45));
										forEach(framewindow.document.querySelectorAll(query), function(element) {
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
									var idL = document.getElementById('idL');
									idL.editor = editor;
									idL.stylesheet = this.root.parentNode.stylesheet
									editor.node.addEventListener('keypress', function(e) {
										if (e.target.nodeName == 'INPUT' && e.charCode) this.modified = true;
									});
									editor.node.modified = true;
									idL.innerHTML = '<h4 style="text-align:center">Edit the style sheet styles below or click a <img class="cld" src="svg/select_from_selector.svg" style="cursor:initial"> to select all elements matching the corresponding CSS selector.</h4><br><input type="checkbox" checked id="cssSyntaxHighlighter"> <label for="cssSyntaxHighlighter">Syntax Highlighting</label><br><br><input type="text" id="idM" placeholder="Style Sheet Name">';
									idL.appendChild(editor.node);
									openDialog('edit_stylesheet');
									document.getElementById('idM').value = this.root.parentNode.stylesheet.name || this.root.parentNode.stylesheet.node.getAttribute('data-name') || '';
									function prevent(e) {
											e.stopPropagation();
											e.preventDefault();
										};
									forEach(document.querySelectorAll('#cssSyntaxHighlighter, #cssSyntaxHighlighter + label'), function() {
										this.addEventListener('touchstart', function(e) {
											setTimeout(function() {
												this.checked = !this.checked;
												var focusedNode = document.querySelector('input:checked ~ .cssEditContainer .cssRule > input:focus');
												if (focusedNode) focusedNode.dispatchEvent(new KeyboardEvent('keydown'));
											}.bind(this.nodeName == 'LABEL' ? document.getElementById('cssSyntaxHighlighter') : this), 0);
											e.stopPropagation();
											e.preventDefault();
										});
										this.addEventListener('click', function(e) {
											setTimeout(function() {
												this.checked = !this.checked;
												var focusedNode = document.querySelector('input:checked ~ .cssEditContainer .cssRule > input:focus');
												if (focusedNode) focusedNode.dispatchEvent(new KeyboardEvent('keydown'));
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
									var index = HTMLStudio.document.stylesheets.indexOf(this.root.parentNode.stylesheet);
									if (!~index) return;
									HTMLStudio.document.stylesheets.splice(index, 1);
									this.root.parentNode.stylesheet.node.parentNode.removeChild(this.root.parentNode.stylesheet.node);

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
			if (e.keyCode == 13 || e.keyCode == 32) open.call(this,e);
			else if (e.keyCode == 40) {
				if (!contextmenus[index + 2].node.parentNode) closeHeaders(), open.call(this, e);
				var items = contextmenus[index + 2].items;
				for (var i = items.length - 1; i >= 0; i--) {
					if (!items[i].disabled || !items[i].arg.hideOnDisabled) {
						items[i].focus();
						break;
					}
				}
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
			width.innerText = this.value.replace(/ /g, '\u00a0');
			this.style.width = width.scrollWidth + em(.6) + 'px';
			document.title = (this.value.trim() ? this.value.trim() + ' - ' : '') + 'HTML Studio \xb7 ChristianFigueroa.GitHub.io';
			var title = framewindow.document.querySelector('title');
			if (!title) framewindow.document.head.insertBefore(title = document.createElement('title'), framewindow.document.head.firstChild); 
			title.innerText = this.value;
		}.bind(this),0);
	});

	// Updates document title in history
	document.getElementById('title').addEventListener('blur', function(){
		history.update('Update document title');
		if (!this.value) this.style.fontStyle = 'italic';
		else this.style.fontStyle = '';

		HTMLStudio.document.update();
	});

	// Event listener for File > Open... > Click to open file
	document.getElementById('Id0').addEventListener('change', function(e) {
		if (!this.files.length) return;
		document.getElementById('id6').innerHTML = '<h4>' + (this.files[0].name) + '</h4><div>' + (this.files[0].size < 1000 ? this.files[0].size + ' bytes' : Math.round(this.files[0].size / 100) / 10 + 'KB') + '</div>';
		if (this.files[0].type.substring(0,5) != 'text/') {
			document.getElementById('id8').style.display = document.getElementById('Id3').style.display = document.getElementById('Id4').style.display = document.getElementById('iD2').style.display = '';
			document.getElementById('id9').className = 'option disabled';
			document.getElementById('id8').style.display = '';
			return;
		}
		document.getElementById('id7').style.display = document.getElementById('id8').style.display = document.getElementById('Id3').style.display = document.getElementById('Id4').style.display = document.getElementById('iD2').style.display = '';
		document.getElementById('id9').className = 'option';
		document.getElementById('id2').file = {l:this.files[0]};
		this.value = null;
	});

	// Drop event for File > Open... > drop file window
	document.getElementById('id1').addEventListener('drop', function(e) {
		e.preventDefault();
		e.stopPropagation();
		this.className = '';
		var file = e.dataTransfer.files[0];
		if (!file) return;
		document.getElementById('id6').innerHTML = '<h4>' + (file.name) + '</h4><div>' + (file.size < 1000 ? e.files[0].size + ' bytes' : Math.round(file.size / 100) / 10 + 'KB') + '</div>';
		if (file.type.substring(0,5) != 'text/') {
			document.getElementById('id8').style.display = document.getElementById('Id3').style.display = document.getElementById('Id4').style.display = document.getElementById('iD2').style.display = '';
			document.getElementById('id7').style.display = 'block';
			document.getElementById('id9').className = 'option disabled';
			return;
		}
		document.getElementById('id7').style.display = document.getElementById('id8').style.display = document.getElementById('Id3').style.display = document.getElementById('Id4').style.display = document.getElementById('iD2').style.display = '';
		document.getElementById('id9').className = 'option';
		document.getElementById('id2').file = {l:file};
	});

	// Onclick event listener for File > Open... > Local File > Click to open a file
	document.getElementById('Id1').addEventListener('click', function() {
		document.getElementById('Id0').click();
	});
	document.getElementById('id1').addEventListener('click', function() {
		document.getElementById('Id0').click();
	});

	// Onclick event listener for File > Open... > Google Drive > Select a file from Drive
	document.getElementById('Id2').addEventListener('click', function() {
		HTMLStudio.google.file.picker(function(e) {
			var doc = e.docs[0];

			document.getElementById('id6').innerHTML = '<h4>' + (htmlEscape(doc.name) || '<i>Untitled Document</i>') + '</h4><div>' + (doc.sizeBytes < 1000 ? doc.sizeBytes + ' bytes' : Math.round(doc.sizeBytes / 100) / 10 + 'KB') + '</div>';
			if (doc.mimeType.substring(0,5) != 'text/') {
				document.getElementById('id8').style.display = document.getElementById('Id3').style.display = document.getElementById('Id4').style.display = document.getElementById('iD2').style.display = '';
				document.getElementById('id7').style.display = 'block';
				document.getElementById('id9').className = 'option disabled';
				return;
			}

			if (!HTMLStudio.google.file.get(doc.id, function() {
				if (this.status >= 200 && this.status < 300) {
					var response = JSON.parse(this.response)
					if (response.capabilities.canEdit) {
						document.getElementById('id7').style.display = document.getElementById('id8').style.display = document.getElementById('Id3').style.display = document.getElementById('Id4').style.display = document.getElementById('iD2').style.display = '';
						document.getElementById('id9').className = 'option';
						document.getElementById('id2').file = {d:doc};
					} else {
						document.getElementById('id7').style.display = document.getElementById('id8').style.display = document.getElementById('Id3').style.display = document.getElementById('iD2').style.display = '';
						var Id4 = document.getElementById('Id4');
						Id4.innerHTML = 'You can only open files you are allowed to edit. Request edit access from the document\'s owner' + (response.owners.length == 1 ? '' : ' ') + (response.owners[0].emailAddress ? ' (<a target="_blank" href="https://mail.google.com/mail/?view=cm&fs=1&to=' + response.owners[0].emailAddress + '">' + response.owners[0].emailAddress + '</a>' : ' (' + response.owners[0].displayName) + ') to edit in <span>HTML Studio</span>.'
						document.getElementById('Id4').style.display = 'block';
					}
				} else {
					document.getElementById('id7').style.display = document.getElementById('id8').style.display = document.getElementById('Id4').style.display = document.getElementById('Id3').style.display =  '';
					document.getElementById('iD2').style.display = 'block';
				}
			}, ['capabilities','owners'])) {
				document.getElementById('id7').style.display = document.getElementById('id8').style.display = document.getElementById('Id4').style.display = document.getElementById('iD2').style.display = '';
				document.getElementById('Id3').style.display = 'block';
			}
		}).setVisible(true);
	});

	// Hide warning if button is clicked (user is on mobile device)
	document.getElementById('mobile_continue').addEventListener('click', function() {
		document.getElementById('mobile_warning').style.display = '';
	});

	// Open File button for File > Open...
	document.getElementById('id9').addEventListener('click', function() {
		if (this.className.includes('disabled')) return;
		var file = document.getElementById('id2').file;
		if (file.l) {
			var reader = new FileReader(), html;
			reader.onload = function() {
				try {
					html = reader.result;
					var body, doc;
					try {
						doc = new DOMParser().parseFromString(html, 'text/html');
						body = doc.body;
					} catch (_) {
						throw Error('The file could not be read. Try switching/updating your browser.');
					}
					if (!body) throw Error('A <body> element could not be found or the file is malformed. Try switching/updating your browser.');
					var id = (new Date().getTime() + Math.random() + '').replace('.','');
					sessionStorage.setItem(id, html);
					open('#o=' + id);
					setTimeout(function() {
						sessionStorage.removeItem(id);
					}, 10000)
				} catch(e) {
					console.error(e);
					document.getElementById('id8').style.display = 'block';
				}
			}
			reader.readAsText(file.l);
		} else if (file.d) {
			if (!HTMLStudio.google.file.get(file.d.id, function() {
				if (this.status >= 200 && this.status < 300) {
					var html = this.response, body, doc;
					try {
						doc = new DOMParser().parseFromString(html, 'text/html');
						body = doc.body;
					} catch (_) {
						throw new Error('The file could not be read. Try switching/updating your browser.');
					}
					if (!body) throw new Error('A <body> element could not be found or the file is malformed. Try switching/updating your browser.');
					open('#d=' + file.d.id);
				} else {
					document.getElementById('id7').style.display = document.getElementById('id8').style.display = document.getElementById('Id4').style.display = document.getElementById('Id3').style.display = document.getElementById('iD2').style.display = '';
					document.getElementById('iD2').style.display = 'block';	
				}
			})) {
				document.getElementById('id7').style.display = document.getElementById('id8').style.display = document.getElementById('Id4').style.display = document.getElementById('iD2').style.display = '';
				document.getElementById('Id3').style.display = 'block';
			};
		}
	});

	// Save HTML button for [Right Click] > Edit as HTML...
	document.getElementById('idd').addEventListener('click', function() {
		var textarea = document.getElementById('idf'), template = document.createElement('template');
		if (textarea.linkedElement == framewindow.document.body) {
			framewindow.document.body.innerHTML = '\t' + textarea.value;
			closeDialogs();
			overlayUpdate();
			history.update('Edit HTML');
			return;
		}
		template.innerHTML = textarea.value;
		var firstChildren = Array.prototype.slice.call(template.content.children);
		textarea.linkedElement.parentNode.insertBefore(template.content, textarea.linkedElement);
		textarea.linkedElement.parentNode.removeChild(textarea.linkedElement);
		overlayUpdate();
		history.update('Edit HTML');
		deselect();
		forEach(firstChildren, function() {
			clickhandler.call(this.alias, pseudoEvent.__extend__({set: true}));
		});
		closeDialogs();
	});

	// Top right exit button and Cancel button event listener
	forEach(document.getElementsByClassName('exit'), function(element) {
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
				if (children[i].children[0].children[0].value.trim()) element.setAttribute(children[i].children[0].children[0].value.trim(), children[i].children[1].children[0].value);
			} catch (_) {};
		};
		overlayUpdate();
		history.update('Edit attributes');
		closeDialogs();
	});
	// Save Styles button for [Right Click] > Edit Styles...
	document.getElementById('idt').addEventListener('click', function() {
		var styleAttr = '';
		forEach(document.querySelectorAll('#idu .cl4:not(#idw)'), function(element) {
			if (element.children[0].children[0].value.trim() && element.children[1].children[0].value.trim()) styleAttr += element.children[0].children[0].value.trim() + ':' + element.children[1].children[0].value.trim() + ';';
		});
		document.getElementById('idu').linkedElement.setAttribute('style', styleAttr);
		overlayUpdate();
		history.update('Edit styles');
		closeDialogs();
	});

	// Create New File button for File > New...
	document.getElementById('idl').addEventListener('click', function() {
		if (this.className.includes('disabled')) return;

		if (HTMLStudio.google.signedIn && document.getElementById('idn').checked) {
			var xhr = new XMLHttpRequest(),
				name = document.getElementById('iD3').value.trim() || 'index.html',
				html = '<!DOCTYPE html>\n<!-- Created with HTML Studio (https://christianfigueroa.github.io/HTML-Studio) -->\n<html>\n\t<head>\n\t\t<title>' + name.replace(/\.html?$/,'') + '</title>\n\t\t<meta charset="utf-8">\n\t</head>\n\t<body style="background:white;padding:1em">\n\t\t<div style="text-align:center;font-family:Arial,sans-serif">New document saved in Google Drive.</div>\n\t</body>\n</html>';

			xhr.open('POST','https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable');
			xhr.setRequestHeader('Authorization', 'Bearer ' + HTMLStudio.google.user.token());
			xhr.addEventListener('readystatechange', function() {
				if (this.readyState == 4) {
					if (this.status >= 200 && this.status < 300) {
						var uploadUrl = this.getResponseHeader('Location');
						
						xhr = new XMLHttpRequest();
						xhr.open('PUT', uploadUrl);
						xhr.addEventListener('readystatechange', function() {
							if (this.readyState == 4) {
								if (this.status >= 200 && this.status < 300) {
									open('#d=' + JSON.parse(this.response).id);
								} else {
									document.getElementById('iD4').style.display = '';
									document.getElementById('iD5').style.display = 'block';
								}
							}
						});
						xhr.send(html);
					} else {
						document.getElementById('iD5').style.display = '';
						document.getElementById('iD4').style.display = 'block';
					}
				}
			});
			xhr.setRequestHeader('X-Upload-Content-Type', 'text/html');
			xhr.setRequestHeader('X-Upload-Content-Length', html.length);
			xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
			xhr.send(JSON.stringify({name: name.substring(name.length - 5) == '.html' ? name : name.substring(name.length - 4) == '.htm' ? name : name + '.html'}));
		} else {
			var id = (new Date().getTime() + Math.random() + '').replace('.','');
			sessionStorage.setItem(id, '<html><head><title>' + document.getElementById('iD3').value.replace(/\.html?$/,'') + '</title><meta charset="utf-8"></head><body style="background:white;padding:1em"><div style="text-align:center;font-family:Arial,sans-serif">New document saved in Temporary Storage.</div></body></html>');
			open('#o=' + id);
			setTimeout(function() {
				sessionStorage.removeItem(id);
			}, 10000);
		}
	});
	// Zoom in/out for HTML Tree
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
	// Allow for context menus in HTML Tree
	document.getElementById('idr').addEventListener('contextmenu', function(e) {
		this.style.display = 'none';
		var element = document.elementFromPoint(e.clientX, e.clientY);
		this.style.display = '';
		if (!element || element.nodeName.toLowerCase() != 'rect' || !element.DOM) return;
		e.preventDefault();
		element.DOM.node.alias.dispatchEvent(new MouseEvent('contextmenu', {clientX: e.clientX, clientY: e.clientY - document.getElementById('toolbarcontainer').getBoundingClientRect().height}));
	});




	// window event listeners
	var windowMouseDown = function(e){
		if (e.shiftKey && e.target.isOverlay) {
			if (document.selection) document.selection.empty(),framewindow.document.selection.empty();
			else if (getSelection) getSelection().removeAllRanges(),framewindow.getSelection().removeAllRanges();
			e.stopPropagation();
			e.preventDefault();
		}
		if (!e.isGoogleInterface) document.getElementById('googInterface').style.display = '';
		if (!document.getElementsByClassName('contextmenu')[0] || (e.target.className && e.target.className.baseVal == undefined && e.target.className.includes('contextmenu'))) return;
		document.getElementsByClassName('contextmenu')[0].close();
		if (sectionopen) {
			forEach(document.getElementsByClassName('headersection'), function(element, index) {
				element.style.background = '';
			});
			sectionopen = false;
		}
	};
	addEventListener('mousedown', windowMouseDown);
	overlayframe.contentWindow.addEventListener('mousedown', windowMouseDown);
	framewindow.addEventListener('load', function() {
		document.getElementById('framecontainer').dispatchEvent(new Event('scroll'));
	});
	function undo () {
		history.currentEntry = Math.max(history.currentEntry - 1, 0);

		framewindow.document.open();
		framewindow.document.write(history.entries[history.currentEntry].html);
		framewindow.document.close();
		forEach(framewindow.document.querySelectorAll('style'), function() {
			this.parentNode.removeChild(this);
		});

		HTMLStudio.document.g = history.entries[history.currentEntry].g;
		HTMLStudio.document.n = history.entries[history.currentEntry].n;
		HTMLStudio.document.h = history.entries[history.currentEntry].h;
		HTMLStudio.document.stylesheets = cloneData(history.entries[history.currentEntry].stylesheets);

		var title = document.getElementById('title');
		title.value = history.entries[history.currentEntry].n;
		if (!title.value) title.style.fontStyle = 'italic';
		else title.style.fontStyle = '';
		var width = document.getElementById('titlewidth');
		width.innerText = title.value.replace(/ /g, '\u00a0');
		title.style.width = width.scrollWidth + em(.6) + 'px';

		updateStylesheets();
		overlayUpdate();

		contextmenus[3].getItem('undo').disabled = !history.currentEntry;
		contextmenus[3].getItem('redo').disabled = history.currentEntry == history.entries.length - 1;
		contextmenus[3].getItem('undo').getElementsByClassName('contextmenuitemtext')[0].innerText = 'Undo' + (history.currentEntry == 0 || !history.entries[history.currentEntry].action ? '' : ' • ' + history.entries[history.currentEntry].action);
		contextmenus[3].getItem('redo').getElementsByClassName('contextmenuitemtext')[0].innerText = 'Redo' + (history.currentEntry + 2 > history.entries.length || !history.entries[history.currentEntry + 1].action ? '' : ' • ' + history.entries[history.currentEntry + 1].action);

		deselect();
		
		if (HTMLStudio.document.g) {
			HTMLStudio.google.upload(HTMLStudio.document.h, {}, '<!DOCTYPE html>\n<!-- Created with HTML Studio (https://christianfigueroa.github.io/HTML-Studio) -->\n' + (userPrefs.textFormat == 'prettify' ? '\n' : '') + (userPrefs.textFormat == 'minify' ? HTMLStudio.formatHTML.minify(userPrefs.encodeEntities) : HTMLStudio.formatHTML.prettify({encodeEntities: userPrefs.encodeEntities, indentation: userPrefs.indentation})), null);
		}
		HTMLStudio.document.update();
	}
	function redo () {
		history.currentEntry = Math.min(history.currentEntry + 1, history.entries.length - 1);

		framewindow.document.open();
		framewindow.document.write(history.entries[history.currentEntry].html);
		framewindow.document.close();
		forEach(framewindow.document.querySelectorAll('style'), function() {
			this.parentNode.removeChild(this);
		});

		HTMLStudio.document.g = history.entries[history.currentEntry].g;
		HTMLStudio.document.n = history.entries[history.currentEntry].n;
		HTMLStudio.document.h = history.entries[history.currentEntry].h;
		HTMLStudio.document.stylesheets = cloneData(history.entries[history.currentEntry].stylesheets);

		var title = document.getElementById('title');
		title.value = history.entries[history.currentEntry].n;
		if (!title.value) title.style.fontStyle = 'italic';
		else title.style.fontStyle = '';
		var width = document.getElementById('titlewidth');
		width.innerText = title.value.replace(/ /g, '\u00a0');
		title.style.width = width.scrollWidth + em(.6) + 'px';

		updateStylesheets();
		overlayUpdate();

		contextmenus[3].getItem('redo').disabled = history.currentEntry == history.entries.length - 1;
		contextmenus[3].getItem('undo').disabled = !history.currentEntry;
		contextmenus[3].getItem('undo').getElementsByClassName('contextmenuitemtext')[0].innerText = 'Undo' + (history.currentEntry == 0 || !history.entries[history.currentEntry].action ? '' : ' • ' + history.entries[history.currentEntry].action);
		contextmenus[3].getItem('redo').getElementsByClassName('contextmenuitemtext')[0].innerText = 'Redo' + (history.currentEntry + 2 > history.entries.length || !history.entries[history.currentEntry + 1].action ? '' : ' • ' + history.entries[history.currentEntry + 1].action);

		deselect();
		
		if (HTMLStudio.document.g) {
			HTMLStudio.google.upload(HTMLStudio.document.h, {}, '<!DOCTYPE html>\n<!-- Created with HTML Studio (https://christianfigueroa.github.io/HTML-Studio) -->\n' + (userPrefs.textFormat == 'prettify' ? '\n' : '') + (userPrefs.textFormat == 'minify' ? HTMLStudio.formatHTML.minify(userPrefs.encodeEntities) : HTMLStudio.formatHTML.prettify({encodeEntities: userPrefs.encodeEntities, indentation: userPrefs.indentation})), null);
		}
		HTMLStudio.document.update();
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
			var html = '', nodes = selection.get.all();
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
		// Otherwise, none of the commands would work
		// It would think the user wants to edit #clipboard when they actually want to edit the document
		// Also if the element doesn't have getAttribute function, it would throw an error, so change that to document.body as well
		// Only keeps #clipboard as target if user is interacting with elements
		var target = (e.target == clipboard && e.keyCode != 88) || !e.target.getAttribute ? document.body : e.target;
		// Ctrl + Z
		if (HTMLStudio.document.loaded && e.keyCode == 90 && locale.cmdKeyPressed(e) && !dialogOpen() && (!target.hasAttribute('contenteditable') || target.getAttribute('contenteditable') == 'false') && target.nodeName != 'INPUT' && target.nodeName != 'TEXTAREA') undo();
		// Ctrl + Y
		else if (HTMLStudio.document.loaded && e.keyCode == 89 && locale.cmdKeyPressed(e) && !dialogOpen() && (!target.hasAttribute('contenteditable') || target.getAttribute('contenteditable') == 'false') && target.nodeName != 'INPUT' && target.nodeName != 'TEXTAREA') redo();
		// Ctrl + A
		else if (HTMLStudio.document.loaded && e.keyCode == 65 && locale.cmdKeyPressed(e) && !dialogOpen() && (!target.hasAttribute('contenteditable') || target.getAttribute('contenteditable') == 'false') && target.nodeName != 'INPUT' && target.nodeName != 'TEXTAREA') {
			e.preventDefault();
			e.stopPropagation();
			forEach(overlay.querySelectorAll('*'), function() {
				clickhandler.call(this, pseudoEvent.__extend__({set: true}));
			});
			clickhandler.call(overlay, pseudoEvent.__extend__({set: true}));
			updateTooltip();
			updateTreeSelections();
			selection.update;
		// Ctrl + D
		} else if (HTMLStudio.document.loaded && e.keyCode == 68 && locale.cmdKeyPressed(e) && !e.shiftKey && !dialogOpen()) {
			e.preventDefault();
			e.stopPropagation();
			deselect();
			updateTooltip();
			updateTreeSelections();
		// Ctrl + O
		} else if (HTMLStudio.document.loaded && e.keyCode == 79 && locale.cmdKeyPressed(e) && !e.shiftKey && !dialogOpen()) {
			e.preventDefault();
			e.stopPropagation();
			contextmenus[2].getItem('open').dispatchEvent(new MouseEvent('click'));
		// Ctrl + N
		} else if (HTMLStudio.document.loaded && e.keyCode == 78 && locale.cmdKeyPressed(e) && !dialogOpen()) {
			e.preventDefault();
			e.stopPropagation();
			contextmenus[2].getItem('new').dispatchEvent(new MouseEvent('click'));
		// F11 or Ctrl + Shift + F
		} else if (e.keyCode == 122 || e.keyCode == 70 && locale.cmdKeyPressed(e) && e.shiftKey) {
			e.preventDefault();
			e.stopPropagation();
			contextmenus[4].getItem('fullscreen').dispatchEvent(new MouseEvent('click'));
		// Ctrl + B
		} else if (HTMLStudio.document.loaded && e.keyCode == 66 && locale.cmdKeyPressed(e) && !dialogOpen()) {
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
		} else if (HTMLStudio.document.loaded && e.keyCode == 73 && locale.cmdKeyPressed(e) && !e.shiftKey && !dialogOpen()) {
			e.preventDefault();
			e.stopPropagation();
			contextmenus[6].getItem('invert').dispatchEvent(new MouseEvent('click'));
		// Ctrl + Up Arrow
		} else if (HTMLStudio.document.loaded && e.keyCode == 38 && locale.cmdKeyPressed(e) && !dialogOpen()) {
			e.preventDefault();
			e.stopPropagation();
			contextmenus[1].getItem('selectParent').execute(new MouseEvent('click', {shiftKey: e.shiftKey}), true);
		// Ctrl + Down Arrow
		} else if (HTMLStudio.document.loaded && e.keyCode == 40 && locale.cmdKeyPressed(e) && !dialogOpen()) {
			e.preventDefault();
			e.stopPropagation();
			contextmenus[1].getItem('selectChildren').execute(new MouseEvent('click', {shiftKey: e.shiftKey}), true);
		// Ctrl + Left Arrow
		} else if (HTMLStudio.document.loaded && e.keyCode == 37 && locale.cmdKeyPressed(e) && !dialogOpen()) {
			e.preventDefault();
			e.stopPropagation();
			contextmenus[6].getItem('selectPreviousSibling').execute(new MouseEvent('click', {shiftKey: e.shiftKey}), true);
		// Ctrl + Right Arrow
		} else if (HTMLStudio.document.loaded && e.keyCode == 39 && locale.cmdKeyPressed(e) && !dialogOpen()) {
			e.preventDefault();
			e.stopPropagation();
			contextmenus[6].getItem('selectNextSibling').execute(new MouseEvent('click', {shiftKey: e.shiftKey}), true);
		// Ctrl + X
		} else if (HTMLStudio.document.loaded && e.keyCode == 88 && locale.cmdKeyPressed(e) && target == clipboard && !dialogOpen()) {
			prepareCopy(e.shiftKey);
			if (e.isTrusted && document.queryCommandSupported('copy')) document.execCommand('copy') && e.stopPropagation() && e.preventDefault();
			userClipboard = clipboard.value;
			var cmi = contextmenus[1].getItem('delete');
			cmi.cut = true;
			cmi.dispatchEvent(new MouseEvent('click'));
		// Del or Backspace
		} else if (HTMLStudio.document.loaded && (e.keyCode == 46 || e.keyCode == 8) && !dialogOpen() && (target == clipboard || ((!target.hasAttribute('contenteditable') || target.getAttribute('contenteditable') == 'false') && target.nodeName != 'INPUT' && target.nodeName != 'TEXTAREA'))) {
			e.stopPropagation();
			e.preventDefault();
			contextmenus[1].getItem('delete').dispatchEvent(new MouseEvent('click'));
		// Ctrl + Shift + 3 (Ctrl + #)
		} else if (HTMLStudio.document.loaded && e.keyCode == 51 && locale.cmdKeyPressed(e) && e.shiftKey && !dialogOpen()) {
			e.stopPropagation();
			e.preventDefault();
			contextmenus[0].getItem('editId').dispatchEvent(new MouseEvent('click'));
		// Ctrl + Shift + 8 (Ctrl + *)
		} else if (HTMLStudio.document.loaded && e.keyCode == 56 && locale.cmdKeyPressed(e) && e.shiftKey && !dialogOpen()) {
			e.stopPropagation();
			e.preventDefault();
			var nodes = selection.get.all();
			if (nodes.length == 1) {
				if (!contextmenus[0].getItem('editSrc').execute(false, true)) return;
				if (!contextmenus[0].getItem('editHref').execute(false, true)) return;
			} else if (nodes.length > 1) document.getElementById('attrNoEdit').className = 'topText active';
		// Ctrl + .
		} else if (HTMLStudio.document.loaded && e.keyCode == 190 && locale.cmdKeyPressed(e) && !dialogOpen()) {
			e.stopPropagation();
			e.preventDefault();
			contextmenus[0].getItem('editClass').dispatchEvent(new MouseEvent('click'));
		// Ctrl + H
		} else if (HTMLStudio.document.loaded && e.keyCode == 72 && locale.cmdKeyPressed(e) && !dialogOpen()) {
			e.stopPropagation();
			e.preventDefault();
			var nodes = selection.get.all();
			if (nodes.length == 1) contextmenus[0].getItem('editHTML').dispatchEvent(new MouseEvent('click'));
			else if (nodes.length > 1) document.getElementById('htmlNoEdit').className = 'topText active';
		// Ctrl + Shift + D
		} else if (HTMLStudio.document.loaded && e.keyCode == 68 && locale.cmdKeyPressed(e) && e.shiftKey && !dialogOpen()) {
			e.stopPropagation();
			e.preventDefault();
			contextmenus[0].getItem('duplicate').dispatchEvent(new MouseEvent('click'));
		// Ctrl + S
		} else if (HTMLStudio.document.loaded && e.keyCode == 83 && locale.cmdKeyPressed(e) && !dialogOpen()) {
			e.stopPropagation();
			e.preventDefault();
			openDialog('download');
		// Ctrl + Q
		} else if (HTMLStudio.document.loaded && e.keyCode == 81 && locale.cmdKeyPressed(e) && !dialogOpen()) {
			e.stopPropagation();
			e.preventDefault();
			var nodes = selection.get.all();
			if (nodes.length == 1) contextmenus[0].getItem('editStyle').execute(false, true);
		// Ctrl + E
		} else if (HTMLStudio.document.loaded && e.keyCode == 69 && locale.cmdKeyPressed(e) && !dialogOpen()) {
			e.stopPropagation();
			e.preventDefault();
			var nodes = selection.get.all();
			if (nodes.length == 1) contextmenus[0].getItem('editAttributes').execute(false, true);
		// Alt + F
		} else if (HTMLStudio.document.loaded && e.keyCode == 70 && e.altKey && !dialogOpen()) {
			e.stopPropagation();
			e.preventDefault();
			closeHeaders();
			document.getElementById('section_file').dispatchEvent(new MouseEvent('mousedown'));
			contextmenus[2].getItem(0).focus();
		// Alt + E
		} else if (HTMLStudio.document.loaded && e.keyCode == 69 && e.altKey && !dialogOpen()) {
			e.stopPropagation();
			e.preventDefault();
			closeHeaders();
			document.getElementById('section_edit').dispatchEvent(new MouseEvent('mousedown'));
			contextmenus[3].getItem(0).focus();
		// Alt + V
		} else if (HTMLStudio.document.loaded && e.keyCode == 86 && e.altKey && !dialogOpen()) {
			e.stopPropagation();
			e.preventDefault();
			closeHeaders();
			document.getElementById('section_view').dispatchEvent(new MouseEvent('mousedown'));
			contextmenus[4].getItem(0).focus();
		// Alt + S
		} else if (HTMLStudio.document.loaded && e.keyCode == 83 && e.altKey && !dialogOpen()) {
			e.stopPropagation();
			e.preventDefault();
			closeHeaders();
			document.getElementById('section_stylesheets').dispatchEvent(new MouseEvent('mousedown'));
			contextmenus[5].getItem(0).focus();
		// Alt + L
		} else if (HTMLStudio.document.loaded && e.keyCode == 76 && e.altKey && !dialogOpen()) {
			e.stopPropagation();
			e.preventDefault();
			closeHeaders();
			document.getElementById('section_selection').dispatchEvent(new MouseEvent('mousedown'));
			contextmenus[6].getItem(0).focus();
		// Ctrl + Shift + I
		} else if (HTMLStudio.document.loaded && e.keyCode == 73 && locale.cmdKeyPressed(e) && e.shiftKey && !dialogOpen()) {
			e.stopPropagation();
			e.preventDefault();
			var nodes = selection.get.all();
			if (nodes.length == 1) contextmenus[0].getItem('insertChild').execute(false, true);
		// Ctrl + U
		} else if (HTMLStudio.document.loaded && e.keyCode == 85 && locale.cmdKeyPressed(e) && !dialogOpen()) {
			e.stopPropagation();
			e.preventDefault();
			contextmenus[0].getItem('unwrap').execute(false, true);
		// Ctrl + Shift + O
		} else if (HTMLStudio.document.loaded && e.keyCode == 79 && locale.cmdKeyPressed(e) && e.shiftKey && !dialogOpen()) {
			contextmenus[2].getItem('viewInTab').execute(false, true);
		}

		// Allows Ctrl + C to be handled natively by the browser
		if (locale.cmdKeyPressed(e) && HTMLStudio.document.loaded) prepareCopy();
	}
	addEventListener('keydown', windowkeydown);
	framewindow.addEventListener('keydown', windowkeydown);
	overlayframe.contentWindow.addEventListener('keydown', windowkeydown);
	// Controls fullscreen
	if ('onfullscreenchange' in window || 'onmozfullscreenchange' in window || 'onwebkitfullscreenchange' in window) {
		window.addEventListener('onfullscreenchange' in window ? 'fullscreenchange' : 'onmozfullscreenchange' in window ? 'mozfullscreenchange' : 'webkitfullscreenchange', function() {
			contextmenus[4].getItem('fullscreen').toggled = (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement);
		});
	} else if ('onfullscreenchange' in document || 'onmozfullscreenchange' in document || 'onwebkitfullscreenchange' in document) {
		document.addEventListener('onfullscreenchange' in document ? 'fullscreenchange' : 'onmozfullscreenchange' in document ? 'mozfullscreenchange' : 'webkitfullscreenchange', function() {
			contextmenus[4].getItem('fullscreen').toggled = (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement);
		});
	} else {
		contextmenus[4].getItem('fullscreen').disabled = true;
	}

	overlayframe.contentWindow.addEventListener('mousemove', function(e) {
		parent.postMessage({
			clientX: e.clientX,
			clientY: e.clientY
		}, '*');
	});
	addEventListener('message', function(e) {
		if (e.source !== window && e.source !== overlayframe.contentWindow) return;
		
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
		var currentSelection = selection.get.all();
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

			var selectedElements = selection.get.all();
			forEach(selectedElements, function(element) {
				element.alias.appendChild(fragment.cloneNode(true).content);
				changeId(fragment.content);
			});
			overlayUpdate();
			history.update('Paste HTML');
			forEach(selectedElements, function(element) {
				clickhandler.call(element.alias.alias, {
					stopPropagation: function(){},
					clientX: 0,
					clientY: Math.round(em(4.45)),
					isTrusted: true,
					shiftKey: true
				});
			});
		} catch (e) {
			if (storage.get('b') != 1) {
				openDialog('no_paste');
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

				var selectedElements = selection.get.all();
				forEach(selectedElements, function(element) {
					element.alias.appendChild(fragment.cloneNode(true).content);
					changeId(framement.content);
				});
				overlayUpdate();
				history.update('Paste HTML');
				forEach(selectedElements, function(element) {
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
		restoreSelection(currentSelection);
	})
	addEventListener('resize', function() {
		// Used to update styles
		iframe.style.position = overlayframe.style.position = 'initial';
		// Reset it back
		iframe.style.position = overlayframe.style.position = '';
		var framecontainer = document.getElementById('framecontainer'),
			rect = framewindow.document.body.getBoundingClientRect(),
			grid = document.getElementById('overlaygrid'),
			rects = document.getElementById('rectDisplays'),
			frameback = document.getElementById('frameback');
		// Updates sizes of elements inside #framecontainer so that they all have the same dimensions as the document
		grid.style.height = rects.style.height = frameback.style.height = framewindow.document.body.scrollHeight - (framewindow.document.body.scrollWidth > framecontainer.offsetWidth ? scrollBar() : 0) + 'px';
		grid.style.width = frameback.style.width = framewindow.document.body.scrollWidth - (framecontainer.scrollHeight > framecontainer.offsetHeight ? scrollBar() : 0) + 'px';
		// Reposition so that the scroll matches that of the document
		framecontainer.scrollTop = framewindow.document.documentElement.scrollTop || framewindow.document.body.scrollTop;
		framecontainer.scrollLeft = framewindow.document.documentElement.scrollLeft || framewindow.document.body.scrollLeft;
		/*
		Old code
		setTimeout(function() {
			iframe.style.position = overlayframe.style.position = '';
			var framecontainer = document.getElementById('framecontainer');
			var styles = getComputedStyle(overlay);
			overlay.style.height = framewindow.document.body.scrollHeight - parseFloat(styles.paddingTop) - parseFloat(styles.paddingBottom) + 'px';
			overlay.style.width = framewindow.document.body.scrollWidth - parseFloat(styles.paddingLeft) - parseFloat(styles.paddingRight);
			framecontainer.dispatchEvent(new Event('scroll'));
		}, 500);
		*/
		var oldSelection = selection.slice();
		overlayUpdate();
		restoreSelection(oldSelection);

		var width = document.getElementById('titlewidth'),
			title = document.getElementById('title');
		width.innerHTML = '&nbsp;<i>Untitled HTML Document</i>&nbsp;';
		title.style.minWidth = Math.min(innerWidth * .85, Math.max(innerWidth / 5, width.scrollWidth)) + 'px';
		width.innerText = title.value;
		forEach(document.querySelectorAll('.dialog_resizer_right'), function() {
			this.style.left = parseFloat(getComputedStyle(this.parentNode).width) - em(.5) + 'px';
			this.previousElementSibling.style.left = '-1px';
		});
		var grabber = document.getElementById('toolbargrabber');
		grabber.style.left = Math.max(-innerWidth * .45, grabber.style.left) + 'px';
	});
	addEventListener('selectstart', function(e) {
		if (e.target.root && HTMLStudio.ContextMenu.isInstance(e.target.root)) e.preventDefault();
	});


	// Main interval
	var currentFrame = 0;
	setInterval(function() {
		currentFrame = (currentFrame + 1) % 50;
		var progress = (-Math.abs(currentFrame - 25) + 25) / 25;

		// Creates a gradient using the two [R,G,B,A] arguments and returns a single color along the gradient based on `progress`
		// This algorithm mimics the CSS linear-gradient function by not just interpolating over the RGBA values
		// See http://stackoverflow.com/a/41495284/6212261 to see how the CSS linear-gradient algorithm is better than regulat RGBA interpolation
		function gradient(c1, c2) {
			
			// iprogress = reversed progress
			// m1 & m2 = premultiplied versions of c1 & c2
			// alpha = opacity between opacity of c1 and opacity of c2, based on progress
			var iprogress = 1 - progress,
				m1 = [c1[0] * c1[3], c1[1] * c1[3], c1[2] * c1[3], c1[3]],
				m2 = [c2[0] * c2[3], c2[1] * c2[3], c2[2] * c2[3], c2[3]],
				alpha = (c2[3] - c1[3]) * progress + c1[3];

			// Averages each channel in the premultiplied colors, then divides them to get the un-premultiplied value
			return [
				Math.round((m1[0] * iprogress + m2[0] * progress) / alpha),
				Math.round((m1[1] * iprogress + m2[1] * progress) / alpha),
				Math.round((m1[2] * iprogress + m2[2] * progress) / alpha),
				alpha
			];
		}

		var selectionColor = gradient(userPrefs.nodeSelectionColor[0], userPrefs.nodeSelectionColor[1]),
			replacerColor = gradient(userPrefs.replacerColor[0], userPrefs.replacerColor[1]),
			tempColor = gradient(document.querySelector('#Ide div:first-child').userColor || userPrefs.nodeSelectionColor[0], document.querySelector('#Ide div:last-child').userColor || userPrefs.nodeSelectionColor[1]);

		var color = document.getElementById('Idg').style.background = 'rgba(' + tempColor[0] + ',' + tempColor[1] + ',' + tempColor[2] + ',' + tempColor[3] + ')',
			iDK = document.getElementById('iDK');
		if (iDK) iDK.style.background = color;

		forEach(overlay.ownerDocument.querySelectorAll('[data-selected-element=selected]:not(tr):not(thead):not(tbody):not(tfoot), tr[data-selected-element=selected] td, thead[data-selected-element=selected] td, tbody[data-selected-element=selected] td, tfoot[data-selected-element=selected] td'), function(element) {
			if ((element instanceof element.ownerDocument.defaultView.SVGElement || element.ownerSVGElement) && element.nodeName.toLowerCase() != 'svg') element.setAttribute('fill', element.style.fill = 'rgba(' + selectionColor[0] + ',' + selectionColor[1] + ',' + selectionColor[2] + ',' + selectionColor[3] + ')');
			else element.style.background = 'rgba(' + selectionColor[0] + ',' + selectionColor[1] + ',' + selectionColor[2] + ',' + selectionColor[3] + ')';
		});
		forEach(overlay.ownerDocument.querySelectorAll('[data-html-studio-text-being-edited=true]'), function(element) {
			element.style.boxShadow = '0 0 20px ' + (currentFrame) + 'px rgba(' + selectionColor[0] + ',' + selectionColor[1] + ',' + selectionColor[2] + ',' + progress * userPrefs.nodeSelectionColor[0][3] + ')';
		});
		forEach(overlay.ownerDocument.querySelectorAll('[data-html-studio-entity-replacer], [data-html-studio-element-replacer]'), function(element) {
			element.style.color = 'rgba(' + replacerColor[0] + ',' + replacerColor[1] + ',' + replacerColor[2] + ',' + replacerColor[3] + ')';
			element.style.textShadow = '0 0 1px rgba(' + replacerColor[0] + ',' + replacerColor[1] + ',' + replacerColor[2] + ',' + replacerColor[3] + ')';
		});

		if (!currentFrame) document.documentElement.scrollTop = document.body.scrollTop = window.scrollY = 0;
	}, 20);

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
			if (img.complete && ++completeimgs == array.length) overlayUpdate(true);
			// If the img has yet to be loaded
			else if (!img.complete) {
				function func(e) {
					// If the img was the last to be loaded
					if (++completeimgs == array.length) overlayUpdate(true);
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
	} else overlayUpdate(true);

	!function(idq){
		var str = '0 0 ' + idq.getAttribute('width') + ' ' + idq.getAttribute('height');
		if (!str.includes('null') && document.getElementById('html_editor_display').style.display == 'block') idq.setAttribute('viewBox', str);
	}(document.getElementById('idq'));

	document.documentElement.scrollTop = document.body.scrollTop = window.scrollY = 0;
};


(function waitUntilLoaded() {
	if (window.HTMLStudio && HTMLStudio.CSSEditor && HTMLStudio.ContextMenu && HTMLStudio.saveAs && HTMLStudio.ColorSelector && HTMLStudio.DraggableElement && HTMLStudio.google && HTMLStudio.network && window.Blob && !HTMLStudio.initiated) {
		main();
		HTMLStudio.initiated = true;
	} else if (!HTMLStudio.initiated) setTimeout(waitUntilLoaded, 50);
})();

}();