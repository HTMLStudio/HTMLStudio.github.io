(window.HTMLStudio=window.HTMLStudio||{}).parseSelector=function(selector){
	var array = [],
		obj = {
			invalid: false,
			toString: function() {
				// Allows for inline comparison of precendences using comparison operators (<, >, ==, etc.)
				// Concatenates the three precedenes but uses string characters for a larger number base
				return String.fromCharCode(this.precedence[0]) + String.fromCharCode(this.precedence[1]) + String.fromCharCode(this.precedence[2]);
			}
		},
		parsedComponents = [],
		precedence = [0,0,0],
		parsedStr = '',
		match,
		failIndex = selector.match(/^\s*/)[0].length,
		whitespace = [selector.match(/^\s*/)[0], selector.match(/(?:\\\s|)(\s*$|$)/)[1]],
		initWS = failIndex,
		first = true,
		regex = {
			elemName: /^(?:[a-z_]|-(?!\d)|\\.)(?:[a-z\d-_]|\\.)*/i,
			class: /^\.(?:[a-z_]|-(?!\d)|\\.)(?:[a-z\d-_]|\\.)*/i,
			id: /^#(?:[a-z_]|-(?!\d)|\\.)(?:[a-z\d-_]|\\.)*/i,
			relation: /^\s*(>>|[\s+~>])\s*(?!\s*,|$)/,
			attr: /^\[\s*(?:[a-z_]|-(?!\d)|\\.)(?:[a-z\d-_]|\\.)*(?:(|~|\||\^|\$|\*)=(?:"(?:[^\\"]|\\.)*"(?:\s*i)?|'(?:[^\\']|\\.)*'(?:\s*i)?|(?:[a-z_]|-(?!\d)|\\.)(?:[a-z\d-_]|\\.)*(?:\s+i)?))?\s*]/i,
			pseudoElement: /^:(?::?(?:-webkit-|-moz-|-ms-|-o-)?(?:after|before|first-letter|first-line|selection|backdrop|placeholder|marker|spelling-error|grammar-error)|:(?:-webkit-|-moz-|-ms-|-o-)[a-z-]+)/i,
			pseudoClass: /^:(?:(?:-webkit-|-moz-|-ms-|-o-)?(?:active|any-link|checked|default|dir\((?:ltr|rtl)\)|disabled|empty|enabled|first(?:-child|-of-type)?|fullscreen|focus(?:-within)?|hover|indeterminate|in-range|invalid|lang\((?:(?:[a-z_]|-(?!\d)|\\.)(?:[a-z\d_-]|\\.)*)\)|last-(?:child|of-type)|left|link|nth-(?:last-)?(?:child|of-type)\(\s*(-?\d*n(?:\s*\+\s*\d+)?|-?\d+|even|odd)\s*\)|only-(?:child|of-type)|optional|out-of-range|placeholder-shown|read-(?:write|only)|required|right|root|scope|target|valid|visited)|(?:-webkit-|-moz-|-ms-|-o-)[a-z-]+)/i,
			pseudoClassAny: /^:any\(/i,
			pseudoClassNot: /^:not\(/i,
			universal: /^\*/,
			new: /^\s*,\s*(?!$)/
		};
	array.invalid = false;


	selector = selector.substring(whitespace[0].length, selector.length - whitespace[1].length);
	while (selector) {
		var before = selector;

		// Test for element names (e.g. "div")
		if (match = selector.match(regex.elemName)) {
			parsedComponents.push({
				str: match[0],
				type: 'elemName',
				precedence: 1
			});
			precedence[2]++;
			selector = selector.substring(match[0].length);
			parsedStr += match[0];
		// Test for classes (e.g. ".class")
		} else if (match = selector.match(regex.class)) {
			parsedComponents.push({
				str: match[0],
				type: 'class',
				precedence: 2
			});
			precedence[1]++;
			selector = selector.substring(match[0].length);
			parsedStr += match[0];
		// Test for ids (e.g. "#id")
		} else if (match = selector.match(regex.id)) {
			parsedComponents.push({
				str: match[0],
				type: 'id',
				precedence: 3
			});
			precedence[0]++;
			selector = selector.substring(match[0].length);
			parsedStr += match[0];
		// Test for relationships (e.g. "* > *" or "* *")
		} else if ((match = selector.match(regex.relation)) && parsedStr && selector.substring(match[0].length)) {
			parsedComponents.push({
				str: match[0],
				type: 'relationship',
				precedence: 0
			});
			selector = selector.substring(match[0].length);
			parsedStr += match[0];
		// Test for attributes (e.g. "[href]" or "[href='https://google.com']")
		} else if (match = selector.match(regex.attr)) {
			parsedComponents.push({
				str: match[0],
				type: 'attribute',
				precedence: 2
			});
			precedence[1]++;
			selector = selector.substring(match[0].length);
			parsedStr += match[0];
		// Test for pseudo-elements (e.g. "::before")
		} else if (match = selector.match(regex.pseudoElement)) {
			parsedComponents.push({
				str: match[0],
				type: 'pseudo-element',
				precedence: 1
			});
			precedence[2]++;
			selector = selector.substring(match[0].length);
			parsedStr += match[0];
		// Test for pseudo-classes (e.g. :hover)
		} else if (match = selector.match(regex.pseudoClass)) {
			parsedComponents.push({
				str: match[0],
				type: 'pseudo-class',
				precedence: 2
			});
			precedence[1]++;
			selector = selector.substring(match[0].length);
			parsedStr += match[0];
		} else if (match = selector.match(regex.pseudoClassAny)) {
			parsedComponents.push({
				str: match[0],
				type: 'pseudo-class',
				precedence: 2
			});
			precedence[1]++;
			selector = selector.substring(match[0].length);
			parsedStr += match[0];
			parsedComponents[parsedComponents.length - 1].nextFiller = selector.match(/^\s*/)[0];

			var failed = false,
				innerSelector = HTMLStudio.parseSelector(selector);
			innerSelector.forEach(function(selector, i, a) {
				selector.components.forEach(function(component) {
					component.precedence = 0;
				});
				if (!selector.invalid) {
					parsedComponents.push.apply(parsedComponents, selector.components);
				} else {
					parsedComponents.push.apply(parsedComponents, selector.components);
					if (selector.selector.substring(selector.failedAtIndex)[0] != ')' || selector.selector == ')') failed = true;
				}
				if (a[i + .5]) parsedComponents[parsedComponents.length - 1].nextFiller = a[i + .5];
			});

			if (innerSelector.length == 0) failed = true;

			parsedStr += selector.substring(0, innerSelector.failedAtIndex);
			selector = selector.substring(innerSelector.failedAtIndex);

			if (failed || !innerSelector.invalid) {
				array.push({
					selector: (first ? whitespace[0] : '') + parsedStr + selector + whitespace[1] || '',
					components: parsedComponents,
					precedence: precedence,
					invalid: true,
					failedAtIndex: parsedStr.length + initWS
				});
				array.invalid = true;
				array.failedAtIndex = failIndex + parsedStr.length;
				break;
			} else {
				parsedStr += ')';
				selector = selector.substring(1);
				parsedComponents.push({
					str: ')',
					type: 'pseudo-class',
					precedence: 2
				});
			}
		} else if (match = selector.match(regex.pseudoClassNot)) {
			parsedComponents.push({
				str: match[0],
				type: 'pseudo-class',
				precedence: 0
			});
			selector = selector.substring(match[0].length);
			parsedStr += match[0];

			var failed = false,
				innerSelector = HTMLStudio.parseSelector(selector);
			if (innerSelector.length != 1 || selector[0] == ')') {
				failed = true;
				if (selector[0] == ')') innerSelector = [];
				if (innerSelector.length) {
					parsedStr += innerSelector[0].selector;
					selector = selector.substring(innerSelector[0].selector.length);
					parsedComponents.push.apply(parsedComponents, innerSelector[0].components);
				}
			} else {
				parsedComponents.push.apply(parsedComponents, innerSelector[0].components);
				if (!innerSelector[0].invalid || innerSelector[0].selector.substring(innerSelector[0].failedAtIndex)[0] != ')') failed = true;
				parsedStr += selector.substring(0, innerSelector[0].failedAtIndex || Infinity);
				selector = selector.substring(innerSelector.failedAtIndex || Infinity);
			}
			if (innerSelector.length) innerSelector[0].precedence.forEach(function(n,i) {
				precedence[i] += n;
			});


			if (failed) {
				array.push({
					selector: (first ? whitespace[0] : '') + parsedStr + selector + whitespace[1] || '',
					components: parsedComponents,
					precedence: precedence,
					invalid: true,
					failedAtIndex: parsedStr.length + initWS
				});
				array.invalid = true;
				array.failedAtIndex = failIndex + parsedStr.length;
				break;
			} else {
				parsedStr += ')';
				selector = selector.substring(1);
				parsedComponents.push({
					str: ')',
					type: 'pseudo-class',
					precedence: 0
				});
			}
		} else if (match = selector.match(regex.universal)) {
			parsedComponents.push({
				str: match[0],
				type: 'universal',
				precedence: 0
			});
			selector = selector.substring(match[0].length);
			parsedStr += match[0];
		// Split up selector into multiple parts
		} else if ((match = selector.match(regex.new)) && parsedStr) {
			selector = selector.substring(match[0].length);
			failIndex += parsedStr.length + match[0].length;
			obj.selector = (first ? whitespace[0] : '') + parsedStr || null;
			obj.components = parsedComponents;
			obj.precedence = precedence;
			first = false;
			array.push(obj);
			array[array.length - 1 + .5] = match[0];
			obj = {
				invalid: false
			};
			parsedComponents = [];
			parsedStr = '';
			precedence = [0,0,0];
			initWS = 0;
			continue;
		}

		if (selector == before) {
			array.push({
				selector: (first ? whitespace[0] : '') + parsedStr + selector + whitespace[1] || '',
				components: parsedComponents,
				precedence: precedence,
				invalid: true,
				failedAtIndex: parsedStr.length + initWS
			});
			array.invalid = true;
			array.failedAtIndex = failIndex + parsedStr.length;
			break;
		}
	}
	if (!(array[array.length - 1] || {}).invalid) {
		obj.selector = (first ? whitespace[0] : '') + parsedStr + whitespace[1] || '';
		obj.components = parsedComponents;
		obj.precedence = precedence;
		array.push(obj);
	}
	if (!array[0].selector || !array[0].selector.trim()) {
		array.length = [];
		array.invalid = true;
		array.failedAtIndex = 0;
	}
	return array;
}
