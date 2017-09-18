(function() {
'use strict';

	var app = angular.module('budgetron');

	app.controller('MainController', MainController)

	MainController.$inject = ['$rootScope', '$scope', '$state', 'LoginService', '$cookies', '$q', '$stateParams'];

	function MainController($rootScope, $scope, $state, LoginService, $cookies, $q, $stateParams) {

		var vm = this;

		// Variables.
		vm.companyName = "COMPANY";
		vm.companyLogo = "LOGO";

		vm.notifications = LoginService.notifications;
		vm.user = $cookies.getObject('user');

		// Methods.
		activate();
		function activate() {}

		vm.logout = function() {
		    LoginService.logout()
		      .then(function(response) {
		       	LoginService.notifications.unshift(LoginService.alerts.logout);
		       	LoginService.showNotification();
            });
        }

	} //End MainController.

})();