/* eslint-disable no-console */
window["FB"] = FB; 
window.fbAsyncInit = function() {
	FB.init({
		appId            : '1538850546484971',
		autoLogAppEvents : true,
		xfbml            : true,
		version          : 'v12.0'
	});
	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			// The user is logged in and has authenticated your
			// app, and response.authResponse supplies
			// the user's ID, a valid access token, a signed
			// request, and the time the access token 
			// and signed request each expire.
			sessionStorage.setItem("fb_uid", response.authResponse.userID);
			sessionStorage.setItem("fb_accessToken", response.authResponse.accessToken);
      
		} else if (response.status === 'not_authorized') {
			// The user hasn't authorized your application.  They
			// must click the Login button, or you must call FB.login
			// in response to a user gesture, to launch a login dialog.
			console.log("not_authorized");
		} else {
			// The user isn't logged in to Facebook. You can launch a
			// login dialog with a user gesture, but the user may have
			// to log in to Facebook before authorizing your application.
			console.log(response.status);
		}
	});
};
window.onbeforeunload = function(){
	FB.logout(function(response) {
		// user is now logged out
	});	
};