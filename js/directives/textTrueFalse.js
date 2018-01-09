angular.module('pictureQuiz')
.directive('textTrueFalse', function() {
  return {
    restrict: 'E',
    templateUrl: 'html/directives/textTrueFalse.html',
    scope: {
      title: '@',
      autoSubmit: '=',
      numQuestions: '@',
      currentQuestion: '@',
      questionId: '=',
      question: '@',
      correctAnswer: '@',
      userCorrect: '=',
      userAnswered: '=',
      userAnsweredCorrectly: '=',
      getNextQuestion: '&',
      borderOnYes: '=',
      borderOnNo: '='
    },
    controller: function($scope) {
      $scope.answer = '';
      $scope.userAnswered = false;
      $scope.userAnsweredCorrectly = false;
      $scope.processUserInput = function(selection, whereFrom) {
        if (!$scope.userAnswered) { // if haven't already answered question
          var temp = ((whereFrom === 'fromSelect') && $scope.autoSubmit);
          var temp2 = ((whereFrom === 'fromSubmit') && !$scope.autoSubmit);
          if (temp || temp2) {
            $scope.userAnswered = true;
            if (selection === $scope.correctAnswer) {
              $scope.userCorrect[$scope.questionId] = true;
              $scope.userAnsweredCorrectly = true;
            }
            else {
              $scope.userCorrect[$scope.questionId] = false;
              $scope.userAnsweredCorrectly = false;
            }
          }
          else { // selected but not submitted / autosubmit
            $scope.answer = selection;
            if (selection === 'True') {
              $scope.borderOnYes = true;
              $scope.borderOnNo = false;
            }
            else {
              $scope.borderOnYes = false;
              $scope.borderOnNo = true;
            }
          }
        }
      }
    }
  }
});
