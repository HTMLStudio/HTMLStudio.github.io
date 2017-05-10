!function() {
	"use strict";

	(window.HTMLStudio=window.HTMLStudio||{}).autoFill = function(input,list,ignoreCase,preventTabBlur,keepOrder) {
		if (!window.rangy) throw new Error('window.rangy hasn\'t loaded');
		if (!input) throw new TypeError('input must be a valid <input> element of type="text"');
		if (!list) throw new TypeError('list must be a list of autocomplete-able words');
		list = keepOrder ? Array.prototype.reverse.call(list) : Array.prototype.sort.call(list).reverse();
		if (ignoreCase) list = list.map(function(string) {
			return string.toLowerCase();
		});

		if (preventTabBlur) input.addEventListener('keydown', function(e) {
			if (e.keyCode == 9 && this.autoFillSelected && this.selectionStart != this.selectionEnd) {
				e.preventDefault();
				this.selectionStart = this.selectionEnd;
			};
		});

		input.addEventListener('keypress', function(e) {
			var value = this.autoFillSelected ? ignoreCase ? this.value.substring(0, this.selectionStart).toLowerCase() : this.value.substring(0, this.selectionStart) : ignoreCase ? this.value.toLowerCase() : this.value;
			if (this.autoFillSelected && this.selectionStart != this.selectionEnd && (ignoreCase ? this.value[this.selectionStart].toLowerCase() == e.key.toLowerCase() : this.value[this.selectionStart] == e.key)) {
				if (e.key != this.value[this.selectionStart] && this.ownerDocument.queryCommandSupported('insertText')) {
					e.preventDefault();
					var start = this.selectionStart,
						end = this.selectionEnd;
					this.selectionStart = 0;
					this.ownerDocument.execCommand('insertText', null, this.value.substring(0, start) + this.value.substring(start)[e.key.toUpperCase() == e.key ? 'toUpperCase' : 'toLowerCase']());
					this.selectionStart = start + 1;
					this.selectionEnd = end;
					return;
				} else if (this.ownerDocument.queryCommandSupported('insertText')) {
					e.preventDefault();
					this.selectionStart++;
					return;
				}
			}
			setTimeout(function() {
				if (this.value.length <= value.length) return;
				autofill.call(this);
			}.bind(this),0);
		});

		function autofill(e) {


			if (!this.value) return;
			var length = this.value.length,
				value = this.autoFillSelected ? ignoreCase ? this.value.substring(0, this.selectionStart).toLowerCase() : this.value.substring(0, this.selectionStart) : ignoreCase ? this.value.toLowerCase() : this.value,
				casedValue = this.autoFillSelected ? this.value.substring(0, this.selectionStart) : this.value;


			for (var i = list.length - 1; i >= 0; i--) {
				if (list[i].substring(0,length) == value) break;
			}
			if (list[i]) {
				if (this.ownerDocument.queryCommandSupported('insertText') && this.ownerDocument.execCommand('insertText', null, ignoreCase ? convertCase(casedValue, list[i].substring(length)) : list[i].substring(length)));
				else console.log(this.value = value + (ignoreCase ? convertCase(casedValue, list[i].substring(length)) : list[i].substring(length)));
				this.selectionStart = length;
				this.selectionEnd = this.value.length;
				this.autoFillSelected = true;
			} else this.autoFillSelected = false;
		}

		function autocomplete() {

		}

		function convertCase(ref, str) {
			for (var i = ref.length - 1; i >= 0 && ref[i]; i--) {
				if (ref[i].toUpperCase() == ref[i] && ref[i].toLowerCase() != ref[i]) return str.toUpperCase();
				else if (ref[i].toLowerCase() == ref[i] && ref[i].toUpperCase() != ref[i]) return str.toLowerCase();
			}
			return str.toLowerCase();
		}
	}
}();