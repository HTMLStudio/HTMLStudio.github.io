!function() {
	(window.HTMLStudio=window.HTMLStudio||{}).google = {
		loaded: function() {
			gapi.load('client', start);
		},
		signedIn: false,
		exists: function() {
			return !!window.gapi;
		},
		user: {
			name: function() {
				return HTMLStudio.google.exists() && HTMLStudio.google.signedIn ? gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getName() : null;
			},
			email: function() {
				return HTMLStudio.google.exists() && HTMLStudio.google.signedIn ? gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getEmail() : null;
			},
			image: function() {
				return HTMLStudio.google.exists() && HTMLStudio.google.signedIn ? gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getImageUrl() : null;	
			}
		}
	};

	function start() {
		gapi.client.init({
			apiKey: 'AIzaSyCUTE0sJNMkbBLScqExLbCBpmG0U2UU45I',
			clientId: '939816137463-2tslcet7q6jq3iqoace6lff7qil4p0hc.apps.googleusercontent.com',
			discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'],
			scope: 'https://www.googleapis.com/auth/drive https://www.googleapis.com/auth/userinfo.profile'
		}).then(function() {
			var auth = gapi.auth2.getAuthInstance();
			function signInChange(status) {
				HTMLStudio.google.signedIn = status;
				var opener = document.getElementById('googOpen');
				opener.title = status ? 'Signed in as ' + HTMLStudio.google.user.email() : 'Sign into Google Drive';
				opener.className = document.getElementById('googInterface').className = status ? 'signedIn' : 'signedOut';
				document.getElementById('driveLogo').src = status ? 'png/drive_mono128.png' : 'png/drive128.png';
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

			auth.attachClickHandler('GIO4');
			auth.attachClickHandler('GII5', {
				prompt: 'select_account'
			});
		});
	}
}();