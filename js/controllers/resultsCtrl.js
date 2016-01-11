angular.module('pictureQuiz')
.controller('resultsCtrl', function ($scope, quizService, $stateParams) {
    
    $scope.numQuestions = $stateParams.userCorrectArray.length;
    $scope.numCorrect = 0;
    for (var i = 0; i < $scope.numQuestions; i++) {
         if ($stateParams.userCorrectArray[i] === true)
             $scope.numCorrect++;
    } 
    $scope.secondsElapsed = $stateParams.secondsElapsed;
        
    

});