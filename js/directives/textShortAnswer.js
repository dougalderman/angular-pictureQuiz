angular.module('pictureQuiz')
.directive('textShortAnswer', function() {
    return {
        restrict: 'E',
        templateUrl: 'html/directives/textShortAnswer.html', 
        scope: {
            autoSubmit: '=',
            numQuestions: '@',
            currentQuestion: '@',
            questionId: '=',
            question: '@',
            correctAnswerArray: '=',
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
                    var temp = ((whereFrom === 'fromTextBox') && $scope.autoSubmit);
                    var temp2 = ((whereFrom === 'fromButton') && !$scope.autoSubmit);
                    if (temp || temp2) {
                        $scope.userAnswered = true;
                        selection = selection.toLowerCase();
                        for (var i = 0; i < $scope.correctAnswerArray.length; i++) {
                            var correctAns = $scope.correctAnswerArray[i].toLowerCase();
                            if (selection === correctAns) {
                                $scope.userCorrect[$scope.questionId] = true;
                                $scope.userAnsweredCorrectly = true;
                                return;
                            }
                        }
                        
                        $scope.userCorrect[$scope.questionId] = false;
                        $scope.userAnsweredCorrectly = false;
                        
                    }
                }
            }    
        }
    }
});