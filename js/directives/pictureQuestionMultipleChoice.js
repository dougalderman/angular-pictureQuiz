angular.module('pictureQuiz')
.directive('pictureQuestionMultipleChoice', function() {
    return {
        restrict: 'E',
        templateUrl: 'html/directives/pictureQuestionMultipleChoice.html', 
        scope: {
            title: '@',
            autoSubmit: '=',
            numQuestions: '@',
            currentQuestion: '@',
            questionId: '=',
            question: '@',
            options: '=',
            pictureQuestion: '@',
            correctAnswer: '@',
            userCorrect: '=',
            userAnswered: '=',
            userAnsweredCorrectly: '=',
            getNextQuestion: '&', 
			borderOn: '=',
		    gotoTopAfterSubmit: '&'
        },
        controller: function($scope) {
			$scope.answer = '';
            $scope.userAnswered = false;
            $scope.userAnsweredCorrectly = false;
			$scope.processUserInput = function(selection, whereFrom) {
				if (!$scope.userAnswered) { // if haven't already answered question
                    
                    if (selection) // if selection has value
                        $scope.selection = $scope.options[selection].answer;
                    var temp = ((whereFrom === 'fromSelect') && $scope.autoSubmit);
                    var temp2 = ((whereFrom === 'fromSubmit') && !$scope.autoSubmit);
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
						$(".afterSubmit").animate({ scrollTop: 0 }, "fast");
//						$scope.gotoTopAfterSubmit();
	                }
					else { // selected but not submitted / autosubmit
						for (var i = 0; i < $scope.options.length; i++) {
							$scope.borderOn[i] = false; // initialize to false for all options
						}
						$scope.answer = selection;
						$scope.borderOn[selection] = true;
					}
                }
            }    
        }
	}
});