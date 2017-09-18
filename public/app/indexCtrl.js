(function() {
'use strict';

	var app = angular.module('budgetron');

	app.controller('IndexController', IndexController)

	IndexController.$inject = ['$scope', '$state', 'LoginService', '$cookies', '$q', '$stateParams'];

	function IndexController($scope, $state, LoginService, $cookies, $q, $stateParams) {

		var vm = this;

		// Variables.
		vm.companyName = "COMPANY";
		vm.companyLogo = "LOGO";

		vm.notifications = LoginService.notifications;
		vm.user = $cookies.getObject('user');
		
		// Methods.
		activate();
		function activate() {

		}


	} //End IndexController.

})();