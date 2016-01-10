angular.module('pictureQuiz')
.directive('textMultipleChoice', function() {
    return {
        restrict: 'E',
        templateUrl: 'html/directives/textMultipleChoice.html', 
        scope: {
            
        },
        link: function(scope, elem, attrs) {
            console.log("In text multiple choice link")
        },
        controller: function($scope) {
            console.log("In text multiple choice controller")
        }
    }
});