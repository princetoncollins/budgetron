(function() {
'use strict';

	var app = angular.module('budgetron');

	app.controller('LoginController', LoginController)

	LoginController.$inject = ['$state', 'LoginService', '$cookies', '$q', '$stateParams'];

	function LoginController($state, LoginService, $cookies, $q, $stateParams) {

		var vm = this;

		// Variables.
		vm.notifications = LoginService.notifications;
		vm.user = $cookies.getObject('user');
		console.log(vm.user);

		// Methods.
		activate();

		function activate() {
			if (vm.user) {
				$state.go('main.dashboard');
				LoginService.notifications.unshift(LoginService.alerts.alreadyLoggedIn);
				return LoginService.showNotification();
			}
		}

		vm.createUser = function(userInfo) {
			if (!userInfo) {
				LoginService.notifications.unshift(LoginService.alerts.fillOutFields);
				return LoginService.showNotification();
			}
			if (userInfo && !userInfo.password || userInfo && !userInfo.username || userInfo && !userInfo.passwordRetyped) {
				LoginService.notifications.unshift(LoginService.alerts.fillOutFields);
				return LoginService.showNotification();
			}
			if (userInfo.password !== userInfo.passwordRetyped) {
				LoginService.notifications.unshift(LoginService.alerts.passwordsDoNotMatch);
				return LoginService.showNotification();
			}
			if (userInfo.password === userInfo.passwordRetyped) {
			  	LoginService.createUser(userInfo)
		    	.then(function(response) {
		    		console.log(response);
		    		if (response && !response.username) {
		    			LoginService.notifications.unshift(LoginService.alerts.userExists);
						return LoginService.showNotification();
		    		}
		    	});
			} else {
				console.log('Error logging in.');
			}	
		};

		vm.loginUser = function(userInfo) {
			if (userInfo && userInfo.username && userInfo.password) {
				LoginService.loginUser(userInfo)
				.then(function(response) {
			  		if (response && response.username) {
			    		LoginService.notifications.unshift(LoginService.alerts.login);
						return LoginService.showNotification();
			  		}
				});
			}

			if (typeof userInfo === 'undefined' || typeof userInfo.username === 'undefined' && typeof userInfo.password === 'undefined') {
				LoginService.notifications.unshift(LoginService.alerts.noUserInfo);
				return LoginService.showNotification();
			}
			if (userInfo.password && !userInfo.hasOwnProperty('username') && !userInfo.username || !userInfo.username) {
				LoginService.notifications.unshift(LoginService.alerts.noUserInfoUsername);
				return LoginService.showNotification();
			}
			if (userInfo.username && !userInfo.hasOwnProperty('password') && !userInfo.password || !userInfo.password) {
				LoginService.notifications.unshift(LoginService.alerts.noUserInfoPassword);
				return LoginService.showNotification();
			}
		};

	} //End LoginController.

})();