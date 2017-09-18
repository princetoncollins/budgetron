(function() {
'use strict';

	var app = angular.module('budgetron');

	app.controller('DashboardController', DashboardController)

	DashboardController.$inject = ['$rootScope', '$scope', '$state', 'LoginService', '$cookies', '$stateParams'];

	function DashboardController($rootScope, $scope, $state, LoginService, $cookies, $stateParams) {

		var vm = this;

		// Variables.
		vm.user = $cookies.getObject('user');
		
		// Methods.
		activate();

		function activate() {

			if (!vm.user) {
				LoginService.notifications.push(LoginService.alerts.unauthorized);
				LoginService.showNotification();
				$state.go('main.home');
			}

			// if(!vm.user.username) {
			// 	LoginService.logout()
			// 	.then(function() {
			// 		$state.go('signup');

			// 		// vm.alerts.splice(0, 1, { message: 'User Already Exists.'});

			//         var toast = document.getElementById("toast")
			// 	    toast.className = "show";
			// 	    setTimeout(function(){ 
			// 	    	toast.className = toast.className.replace("show", ""); 
			// 	    }, 3000);
			// 	});
			// }
		}

		// Methods.


        // SIDE MENU RIGHT

		var menuRight = document.getElementById( 'side-menu-s1' ),
			showRightPush = document.getElementById( 'showRightPush' ),
			matte = document.getElementById( 'matte' ),
			body = document.body;

		showRightPush.onclick = function() {
			classie.toggle( this, 'active' );
			classie.toggle( body, 'side-menu-push-toLeft' );
			classie.toggle( menuRight, 'side-menu-open' );
			classie.toggle( matte, 'bg-change');
		};

		matte.onclick = function() {
			classie.toggle( this, 'active' );
			classie.toggle( body, 'side-menu-push-toLeft' );
			classie.toggle( menuRight, 'side-menu-open' );
			classie.toggle( matte, 'bg-change');
		}

		function disableOther( button ) {
			if( button !== 'showRightPush' ) {
				classie.toggle( showRightPush, 'disabled' );
			}
		}









	} //End LoginController.

})();