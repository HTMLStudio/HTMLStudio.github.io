!function(){
	var listeners = [];

	(window.HTMLStudio=window.HTMLStudio||{}).network={
		listen: listeners.push.bind(listeners),
		unlisten: function(func) {
			var index = listeners.indexOf(func);
			if (!~index) return false;
			listeners.splice(index, 1);
			return true;
		},
		connected: null,
		disconnected: null,
		lastPing: 0,
		__force__: null
	};

	setInterval(test, 3000);
	test();

	function test() {
		var xhr = new XMLHttpRequest();
		xhr.open('HEAD', 'help.html?t=' + new Date().getTime());
		xhr.addEventListener('readystatechange', function() {
			if (this.readyState == 4) {
				var connection = HTMLStudio.network.__force__ === true ? true : HTMLStudio.network.__force__ === false ? false : this.status >= 200 && this.status < 304,
					hasChanged = HTMLStudio.network.connected !== connection;

				HTMLStudio.network.connected = connection;
				HTMLStudio.network.disconnected = !connection;
				HTMLStudio.network.lastPing = new Date();

				if (hasChanged) {
					for (var i = listeners.length - 1; i >= 0; i--) {
						if (typeof listeners[i] == 'function') listeners[i](connection);
					}
				}
			}
		});
		xhr.send();
	}
}();