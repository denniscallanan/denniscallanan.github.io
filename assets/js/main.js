
GAA_API_BASE_URL = "https://gaa-api-dev.herokuapp.com"

function verifyIdToken(url, key){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.setRequestHeader("ID-TOKEN", key);
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

function onSignIn(googleUser) {
	var profile = googleUser.getBasicProfile();
	document.getElementById("profileName").innerHTML = "Hi " + profile.getName(); + "."
	var id_token = googleUser.getAuthResponse().id_token;
	response = verifyIdToken(GAA_API_BASE_URL + "/google-auth-verify", id_token)
	console.log(response)
}

function signOut() {
	var auth2 = gapi.auth2.getAuthInstance();
	auth2.signOut().then(function () {
		console.log('User signed out.');
	});
}

(function ($) {

	skel.breakpoints({
		xlarge: '(max-width: 1680px)',
		large: '(max-width: 1280px)',
		medium: '(max-width: 980px)',
		small: '(max-width: 736px)',
		xsmall: '(max-width: 480px)'
	});

	$(function () {

		var $window = $(window),
			$body = $('body');

		// Disable animations/transitions until the page has loaded.
		$body.addClass('is-loading');

		$window.on('load', function () {
			window.setTimeout(function () {
				$body.removeClass('is-loading');
			}, 100);
		});

		// Fix: Placeholder polyfill.
		$('form').placeholder();

		// Prioritize "important" elements on medium.
		skel.on('+medium -medium', function () {
			$.prioritize(
				'.important\\28 medium\\29',
				skel.breakpoint('medium').active
			);
		});

		// Off-Canvas Navigation.

		// Navigation Panel Toggle.
		$('<a href="#navPanel" class="navPanelToggle"></a>')
			.appendTo($body);

		// Navigation Panel.
		$(
			'<div id="navPanel">' +
			$('#nav').html() +
			'<a href="#navPanel" class="close"></a>' +
			'</div>'
		)
			.appendTo($body)
			.panel({
				delay: 500,
				hideOnClick: true,
				hideOnSwipe: true,
				resetScroll: true,
				resetForms: true,
				side: 'left'
			});

		// Fix: Remove transitions on WP<10 (poor/buggy performance).
		if (skel.vars.os == 'wp' && skel.vars.osVersion < 10)
			$('#navPanel')
				.css('transition', 'none');

	});

})(jQuery);