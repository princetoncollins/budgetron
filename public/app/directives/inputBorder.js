var app = angular.module('budgetron');

app.directive('input', function() {
    return {
        link: function (scope, element, attrs) {

            element.on('focus', function() {
                element.parent().removeClass('input-wrapper');
                element.parent().addClass('focused');
            })

            element.on('blur', function() {
                element.parent().removeClass('focused');
                element.parent().addClass('input-wrapper');
            })
        }
    };
}); //End directive.