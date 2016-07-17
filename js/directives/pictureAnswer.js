angular.module('pictureQuiz')
.directive('pictureAnswer', function() {
    return {
        restrict: 'E',
        templateUrl: 'html/directives/pictureAnswer.html', 
        scope: {
            title: '@',
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
            getNextQuestion: '&',
            gotoTop: '&'
        },
        controller: function($scope) {
            $scope.userAnswered = false;
            $scope.userAnsweredCorrectly = false;
            $scope.processUserInput = function(selection) {
                if (!$scope.userAnswered) { // if haven't already answered question
                    
                    $scope.userAnswered = true;
                    if (selection === $scope.correctAnswer) {
                        $scope.userCorrect[$scope.questionId] = true;
                        $scope.userAnsweredCorrectly = true;
                    }
                    else {
                        $scope.userCorrect[$scope.questionId] = false;
                        $scope.userAnsweredCorrectly = false;
                    }
					$scope.gotoTop({numPixels: 0});
                }
            }    
        }
    }
});