(function() {
'use strict';

	var app = angular.module('budgetron');

	app.controller('HomeController', HomeController)

	HomeController.$inject = ['$state', 'LoginService', '$cookies'];

	function HomeController($state, LoginService, $cookies, $q) {

		var vm = this;

		// Variables
		vm.bannerTitle = 'banner title.';
		vm.bannerSubTitle = 'banner subtitle.'

		vm.alert = LoginService.alert;
		vm.user = $cookies.getObject('user');

		activate()

		function activate() {

		}


	} //End HomeController.

})();