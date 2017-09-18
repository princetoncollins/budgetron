var app = angular.module('budgetron');

app.directive('navigationToolbar', function () {
    return {
        restrict: 'A', 
        templateUrl: 'directives/navigation-toolbar/navigation-toolbar.html',
        controller: 'MainController'
    }
});