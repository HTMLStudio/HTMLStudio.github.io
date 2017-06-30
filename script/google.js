!function() {
	(window.HTMLStudio=window.HTMLStudio||{}).google = {
		loaded: function() {
			gapi.load('client', start);
			gapi.load('picker');
		},
		signedIn: false,
		exists: function() {
			return HTMLStudio.network.connected && !!window.gapi;
		},
		triedAutoAuth: false,
		user: {
			name: function() {
				return HTMLStudio.google.exists() && HTMLStudio.google.signedIn ? gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getName() : null;
			},
			email: function() {
				return HTMLStudio.google.exists() && HTMLStudio.google.signedIn ? gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail() : null;
			},
			image: function() {
				return HTMLStudio.google.exists() && HTMLStudio.google.signedIn ? gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getImageUrl() : null;	
			},
			token: function() {
				try {
					return gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
				} catch (e) {
					return null;
				}
			},
			listen: {
				// Wait until google api has loaded, or 5 seconds (the script probably isn't going to load)
				change: function(func, iter) {
					if (iter > 100) return;
					setTimeout(function() {
						HTMLStudio.google.user.listen.change(func, iter + 1 || 1);
					}, 50);
				},
				status: function(func, iter) {
					if (iter > 100) return;
					setTimeout(function() {
						HTMLStudio.google.user.listen.status(func, iter + 1 || 1);
					}, 50);
				}
			}
		},
		file: {
			get: function(id, callback, fields) {
				try {
					if (!HTMLStudio.google.exists() || !gapi.auth2.getAuthInstance().isSignedIn.get()) return false;
				} catch (_) {return false};
				var xhr = new XMLHttpRequest();
				if (fields) {
					xhr.open('GET', 'https://www.googleapis.com/drive/v3/files/' + id + '?fields=' + fields.join(','));
					xhr.setRequestHeader('Authorization', 'Bearer ' + HTMLStudio.google.user.token());
					xhr.addEventListener('readystatechange', function(e) {
						if (this.readyState == 4) callback.call(this, e);
					});
					xhr.send();
					return true;
				} else {
					xhr.open('GET', 'https://www.googleapis.com/drive/v3/files/' + id + '?alt=media');
					xhr.setRequestHeader('Authorization', 'Bearer ' + HTMLStudio.google.user.token());
					xhr.addEventListener('readystatechange', function(e) {
						if (this.readyState == 4) callback.call(this, e);
					});
					xhr.send();
					return true;
				}
			},
			picker: function(callback, views) {
				if (!HTMLStudio.google.exists() || !HTMLStudio.google.signedIn) return false;
				views = views || [new google.picker.View(google.picker.ViewId.DOCS).setMimeTypes('text/html,text/plain')];
				var picker = new google.picker.PickerBuilder()
					.setDeveloperKey('AIzaSyCUTE0sJNMkbBLScqExLbCBpmG0U2UU45I')
					.setOAuthToken(HTMLStudio.google.user.token())
					.setCallback(function(obj) {
						if (obj.action == 'picked') {
							if (typeof callback == 'function') callback.call(this,obj);
						}
					});
				views.forEach(function(view) {
					picker.addView(view);
				});
				return picker.build();
			}
		},
		upload: function(fileId, metadata, content, success, error) {
			if (!HTMLStudio.google.exists() || !HTMLStudio.google.signedIn) return false;
			var xhr = new XMLHttpRequest(),
				updateStatus = arguments.length > 5 ? arguments[5] : true,
				status = document.getElementById('section_saved_to_drive'),
				notice = document.getElementById('error_saving_to_drive'),
				iDy = document.getElementById('iDy');
			iDy.driveSaveAttempts = iDy.driveSaveAttempts || 0;

			xhr.open('PATCH','https://www.googleapis.com/upload/drive/v3/files/' + fileId + '?uploadType=resumable');
			xhr.setRequestHeader('Authorization', 'Bearer ' + HTMLStudio.google.user.token());
			xhr.setRequestHeader('X-Upload-Content-Type', 'text/html');
			xhr.setRequestHeader('X-Upload-Content-Length', content.length);
			xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
			xhr.addEventListener('readystatechange', function(e) {
				if (this.readyState == 4) {
					if (this.status >= 200 && this.status < 300) {
						var url = this.getResponseHeader('Location');

						xhr = new XMLHttpRequest();
						xhr.open('PUT', url);
						xhr.addEventListener('readystatechange', function() {
							if (this.readyState == 4) {
								if (this.status >= 200 && this.status < 300) {
									if (updateStatus) {
										status.innerText = 'Changes saved to Drive';
										notice.className = notice.className.replace(/\s*active\s*/g, '');
										notice.uploadXHR = null;
									}
									HTMLStudio.google.upload.errored = false;
									iDy.driveSaveAttempts = 0;
									iDy.style.display = '';
									HTMLStudio.document.toDrive(JSON.parse(this.responseText).id);
									if (typeof success == 'function') success.call(this,e);
								} else {
									iDy.driveSaveAttempts++;
									if (updateStatus) {
										status.innerText = 'Upload error encountered';
										notice.className += ' active';
										document.getElementById('driveSaveErrorCode').innerText = 'Error code: ' + this.status;
										if (iDy.driveSaveAttempts < 2) iDy.style.display = '';
										else iDy.style.display = 'block';
										iDy.innerText = 'Attempts made: ' + iDy.driveSaveAttempts;
										notice.uploadXHR = this;
									}
									HTMLStudio.document.toLocal();
									HTMLStudio.google.upload.errored = true;
									if (typeof error == 'function') error.call(this,e);
								}
							}
						});
						xhr.send(content);
					} else {
						iDy.driveSaveAttempts++;
						if (updateStatus) {
							status.innerText = 'Upload error encountered'
							notice.className += ' active';
							document.getElementById('driveSaveErrorCode').innerHTML = 'Error code: ' + this.status;
							if (iDy.driveSaveAttempts < 2) iDy.style.display = '';
							else iDy.style.display = 'block';
							iDy.innerText = 'Attempts made: ' + iDy.driveSaveAttempts;
							notice.uploadXHR = this;
						}
						HTMLStudio.document.toLocal();
						HTMLStudio.google.upload.errored = true;
						if (typeof error == 'function') error.call(this,e);
					}
				}
			});
			xhr.send(JSON.stringify(new Object(metadata)));
			if (updateStatus) {
				status.innerText = 'Uploading to Drive...';
				notice.className = notice.className.replace(/\s*active\s*/g, '');
				HTMLStudio.google.upload.errored = null;
			}
		},
		listenersAttached: false,
		scriptAdded: false,
		scriptLoaded: null
	};

	function start() {
		gapi.client.init({
			apiKey: 'AIzaSyCUTE0sJNMkbBLScqExLbCBpmG0U2UU45I',
			clientId: '939816137463-2tslcet7q6jq3iqoace6lff7qil4p0hc.apps.googleusercontent.com',
			discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
			scope: 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/userinfo.profile'
		}).then(function() {
			var auth = gapi.auth2.getAuthInstance(),
				symbol = Symbol();

			HTMLStudio.google.user.listen.change = function(func) {
				auth.currentUser.listen(func);
			}
			HTMLStudio.google.user.listen.status = function(func) {
				auth.isSignedIn.listen(func);
			}

			HTMLStudio.google.triedAutoAuth = true;
			HTMLStudio.google.scriptLoaded = true;

			function signInChange(status, notTrusted) {
				if (notTrusted != symbol) HTMLStudio.google.signedIn = status;
				var opener = document.getElementById('googOpen');
				opener.title = status ? 'Signed in as ' + HTMLStudio.google.user.email() : 'Connect to Google Drive';
				opener.className = opener.className.replace(/\s*signed(?:In|Out)\s*/g,'') + ' signed' + (status ? 'In' : 'Out');
				document.getElementById('googInterface').className = status ? 'signedIn' : 'signedOut';
				document.getElementById('driveLogo').src = status ? '/png/drive_mono_ffffff.png' : '/png/drive128.png';
				document.getElementById('googProfileIcon').src = HTMLStudio.google.user.image();
				document.getElementById('GII2').innerText = HTMLStudio.google.user.name();
				document.getElementById('GII3').innerText = '(' + HTMLStudio.google.user.email() + ')';
			}
			auth.isSignedIn.listen(signInChange);
			auth.currentUser.listen(function(user) {
				document.getElementById('googOpen').title = 'Signed in as ' + HTMLStudio.google.user.email();
				document.getElementById('googProfileIcon').src = HTMLStudio.google.user.image();
				document.getElementById('GII2').innerText = HTMLStudio.google.user.name();
				document.getElementById('GII3').innerText = '(' + HTMLStudio.google.user.email() + ')';
			});
			signInChange(HTMLStudio.google.signedIn = auth.isSignedIn.get());

			auth.attachClickHandler('GIO4', {});
			auth.attachClickHandler('GII5', {
				prompt: 'select_account'
			});
			auth.attachClickHandler('Idu', {});
			auth.attachClickHandler('IdN', {});
			auth.attachClickHandler('loadDriveSignInBtn', {});
			auth.attachClickHandler('iD1', {});
			auth.attachClickHandler('iDe', {});
			HTMLStudio.google.listenersAttached = true;
			var IdN = document.getElementById('IdN');
			IdN.innerText = 'Sign In';
			IdN.className = '';

			function networkCheck() {
				if (HTMLStudio.network) {
					HTMLStudio.network.listen(function(status) {
						signInChange(status ? HTMLStudio.google.signedIn : false, symbol);
					});
				} else setTimeout(networkCheck, 50);
			};
			networkCheck();
		});
	}

	// Prevents browser from using cached script without network since the script won't work
	function init() {
		if (HTMLStudio.network && HTMLStudio.network.connected) {
			var script = document.createElement('script');
			script.async = true;
			script.src = 'https://apis.google.com/js/api.js';
			script.addEventListener('load', HTMLStudio.google.loaded);
			HTMLStudio.google.scriptAdded = true;
			setTimeout(function() {
				HTMLStudio.google.scriptLoaded = HTMLStudio.google.scriptLoaded || false;
				if (!HTMLStudio.google.scriptLoaded) {
					var Idn = document.getElementById('IdN');
					IdN.innerText = 'No Connection';
					IdN.className = 'inactive';
				}
			}, 5000)
			document.body.appendChild(script);
		} else {
			setTimeout(init, HTMLStudio.network && typeof HTMLStudio.network.connected == 'boolean' ? 3000 : 50);
		}
	};
	init();
}();