(window.HTMLStudio=window.HTMLStudio||{}).minifyHTML=function(css){
	"use strict";
	var win = document.getElementById('frame').contentWindow,
		html = win.document.documentElement,
		frag = document.createDocumentFragment(),
		string = '';

	function minify(node, parent) {
		var clone = node.cloneNode();
		parent.insertBefore(clone, parent.firstChild);
		for (var children = node.childNodes, i = children.length - 1; i >= 0; i--) {
			// Child is element node
			if (children[i].nodeType == 1) {
				// Repeat the cloning process for the child element
				var childClone = minify(children[i], clone);
				// Remove redundant attributes
				[['class'],['id'],['style'],['title'],['lang'],['dir'],['colspan',1,'td'],['colspan',1,'th'],['rowspan',1,'td'],['rowspan',1,'th'],['method','get','form'],['type','text','input'],['type','list','menu'],['type','text/javascript','script'],['type','text/css','style']].forEach(function(attr) {
					if (childClone.getAttribute(attr[0]) == (attr[1] || '') && (!attr[2] || childClone.nodeName.toLowerCase() == attr[2])) childClone.removeAttribute(attr);
				});
				// Remove blank event listeners
				['afterprint','beforeprint','beforeunload','hashchange','languagechange','message','offline','online','pageshow','pagehide','popstate','storage','unload','copy','cut','paste','abort','blur','focus','canplay','canplaythrough','change','click','contextmenu','dblclick','drag','dragend','dragenter','dragexit','dragleave','dragover','dragstart','drop','durationchange','emptied','ended','input','invalid','keydown','keypress','keyup','load','loadeddata','loadedmetadata','loadend','loadstart','mousedown','mouseenter','mouseleave','mousemove','mouseout','mouseover','mouseup','pause','play','playing','progress','ratechange','reset','resize','scroll','seeked','seeking','select','show','stalled','submit','suspend','timeupdate','volumechange','waiting','selectstart','toggle','mozfullscreenchange','mozfullscreenerror','animationend','animationiteration','animationstart','transitionend','webkitanimationend','webkitanimationiteration','webkitanimationstart','webkittransitionend','error','wheel','rejectionhandled','unhandledrejection','cancel','close','cuechange','mousewheel','auxclick','pointercancel','pointerdown','pointerenter','pointerleave','pointermove','pointerout','pointerover','pointerup','beforecopy','beforecut','beforepaste','search','webkitfullscreenchange','webkitfullscreenerror','gotpointercapture','lostpointercapture','activate','beforeactivate','deactivate','beforedeactivate','mscontentzoom','msmanipulationstatechanged','ariarequest','command','msgesturechange','msgesturedoubletap','msgestureend','msgesturehold','msgesturestart','msgesturetap','msinertiastart'].forEach(function(attr) {
					if (childClone.getAttribute('on' + attr) == '') childClone.removeAttribute('on' + attr);
				});

			// Child is text node
			} else if (children[i].nodeType == 3) {
				// If the parent node is a <style> or a <script>, don't try to shorten the whitespace
				if (clone.nodeName in {STYLE:0,SCRIPT:0}) {
					clone.insertBefore(children[i].cloneNode(), clone.firstChild);
					continue;
				}

				// `styles` checks the parent's white-space
				// `childClone` is the clone we are working with
				var styles = getComputedStyle(node), childClone = children[i].cloneNode();
				// Collapse new lines
				if (styles.whiteSpace in {normal:0,nowrap:0}) childClone.textContent = childClone.textContent.replace(/\n/g,' ');
				// Collapse tabs, spaces, etc.
				if (styles.whiteSpace in {normal:0,nowrap:0,'pre-line':0}) childClone.textContent = childClone.textContent.replace((children[i].textContent.trim() ? /^[^\S\n]|[^\S\n]$/ : /[^\S\n]+/g),' ');
				// If the textnode has no content, don't even add it to the parent
				if (childClone.textContent) clone.insertBefore(childClone, clone.firstChild);
			}
		}
		return clone;
	}

	function escape(node) {
		if (node.parentNode.nodeName in {STYLE:0,SCRIPT:0}) return node.textContent;
		var a = document.createElement('a');
		a.innerText = node.textContent;
		return a.innerHTML;
	}

	function stringify(node) {
		string += '<' + node.nodeName.toLowerCase();
		for (var i = node.attributes.length - 1; i >= 0; i--) {
			string += ' ' + node.attributes[i].name + (node.attributes[i].value == '' ? '' : '="' + node.attributes[i].value.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&apos;').replace(/</g,'&lt;').replace(/>/g,'&gt;') + '"');
		}
		string += '>';

		if (/^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i.test(node.nodeName)) return string;

		for (var children = node.childNodes, i = 0; i < children.length; i++) {
			if (children[i].nodeType == 1) stringify(children[i]);
			else if (children[i].nodeType == 3) string += escape(children[i]);
		}

		return string += '</' + node.nodeName.toLowerCase() + '>';
	}
	return stringify(minify(html, frag)).trim();
}