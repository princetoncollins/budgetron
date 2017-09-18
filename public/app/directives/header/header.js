var app = angular.module('budgetron');

app.directive('header', function () {
    return {
        restrict: 'A', 
        templateUrl: 'directives/header/header.html',
        controller: 'MainController'
    }
});