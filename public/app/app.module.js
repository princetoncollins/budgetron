'use strict';

var app = angular.module('budgetron', ['ui.router', 'ngAnimate', 'ngCookies', 'ngMaterial']);

app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider, $stateParams) {

	$urlRouterProvider.otherwise('/main');

	$stateProvider
		.state('main', {
			url: '/main',
			templateUrl: '/main/main.html',
			controller: 'MainController',
			controllerAs: 'vm'
		})
		.state('main.home',  {
			url: '/home',
			templateUrl: '/home/home.html',
			controller: 'HomeController',
			controllerAs: 'vm'
		})
		.state('main.signup', {
			url: '/signup',
			templateUrl: '/login/signup.html',
			controller: 'LoginController',
			controllerAs: 'vm'
		})
		.state('main.login', {
			url: '/login',
			templateUrl: '/login/login.html',
			controller: 'LoginController',
			controllerAs: 'vm',
		})
		.state('main.dashboard', {
			url: '/dashboard',
			templateUrl: '/dashboard/dashboard.html',
			controller: 'DashboardController',
			controllerAs: 'vm'
		})

}]);