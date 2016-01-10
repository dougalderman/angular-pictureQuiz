angular.module('pictureQuiz')
.directive('pictureQuestionTrueFalse', function() {
    return {
        restrict: 'E',
        templateUrl: 'html/directives/pictureQuestionTrueFalse.html', 
        scope: {
            autoAdvance: '=',
            question: '=',
            correctAnswer: '=',
            pictureQuestion: '='
        },
        link: function(scope, elem, attrs) {
            console.log("In link");
        },
        controller: function($scope) {
           console.log("$scope.autoAdvance = " + $scope.autoAdvance);
           console.log("$scope.question = " + $scope.question);
           console.log("$scope.correctAnswer = " + $scope.correctAnswer);
           console.log("$scope.pictureQuestion = " + $scope.pictureQuestion);
                        
      
        }
    }
});