angular.module('pictureQuiz')
.directive('textMultipleChoice', function() {
    return {
        restrict: 'E',
        templateUrl: 'html/directives/textMultipleChoice.html', 
        scope: {
            autoSubmit: '=',
            numQuestions: '@',
            currentQuestion: '@',
            questionId: '=',
            question: '@',
            options: '=',
            correctAnswer: '@',
            userCorrect: '=',
            userAnswered: '=',
            userAnsweredCorrectly: '=',
            getNextQuestion: '&'

        },
        link: function(scope, elem, attrs) {
          
        },
        controller: function($scope) {
            $scope.userAnswered = false;
            $scope.userAnsweredCorrectly = false;
            $scope.processUserInput = function(selection, whereFrom) {
                if (!$scope.userAnswered) { // if haven't already answered question
                    
                    if (selection) // if selection has value
                        $scope.selection = selection;
                    var temp = ((whereFrom === 'fromRadio') && $scope.autoSubmit);
                    var temp2 = ((whereFrom === 'fromButton') && !$scope.autoSubmit);
                    if (temp || temp2) {
                        $scope.userAnswered = true;
                        if ($scope.selection === $scope.correctAnswer) {
                            $scope.userCorrect[$scope.questionId] = true;
                            $scope.userAnsweredCorrectly = true;
                        }
                        else {
                            $scope.userCorrect[$scope.questionId] = false;
                            $scope.userAnsweredCorrectly = false;
                        }

                    }
                }
            }    
         
        }
    }
});