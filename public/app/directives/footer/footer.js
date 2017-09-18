var app = angular.module('budgetron');

app.directive('footer', function () {
    return {
        restrict: 'A', 
        templateUrl: 'directives/footer/footer.html',
        controller: 'MainController'
    }
});