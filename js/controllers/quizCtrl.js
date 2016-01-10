angular.module('pictureQuiz')
.controller('quizCtrl', function ($scope, quizService, dataUrl, $stateParams) {
    
    console.log('in quizCtrl');
    
    quizService.getQuizData(dataUrl.url + $stateParams.quizBriefName + '.json')
    .then(function(response) {
            console.log(response);
            if (response.status === 200) {
                $scope.quiz = response.data;
                $scope.processQuiz();
            }
            else {
                console.log('status code is ' + response.status);
            }
    })
    .catch(function(err) {
        console.log('Error', err);
    });
    
    $scope.processQuiz = function() {
        $scope.autoAdvance = $scope.quiz.config.autoAdvance;
        $scope.quiz.config.randomizeQuestions = false; // take out after testing
        $scope.questions = $scope.quiz.config.randomizeQuestions ? 
            quizService.randomizeQuestions($scope.quiz.questions) :
            $scope.quiz.questions;
        /* for (var i = 0; i < $scope.questions.length; i++) {
            $scope.questionType = $scope.questions[i].type;
        } */
        
        /* Move following into for loop after testing */
        $scope.questionType = $scope.questions[0].type; 
        $scope.question = $scope.questions[0].question;
        $scope.correctAnswer = $scope.questions[0].correctAnswer;
        $scope.pictureQuestion = $scope.questions[0].pictureQuestion;
       
    }

    
    
});