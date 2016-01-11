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
        $scope.userCorrect = [];
       
        $scope.questions = $scope.quiz.config.randomizeQuestions ? 
            quizService.randomizeQuestions($scope.quiz.questions) :
            $scope.quiz.questions;
        /* for (var i = 0; i < $scope.questions.length; i++) {
            $scope.questionType = $scope.questions[i].type;
        } */
        
        $scope.numQuestions = $scope.questions.length;
        
        /* Get first question information */
        $scope.questionId = $scope.questions[0].id;
        $scope.questionType = $scope.questions[0].type; 
        $scope.question = $scope.questions[0].question;
        $scope.correctAnswer = $scope.questions[0].correctAnswer;
        $scope.pictureQuestion = $scope.questions[0].pictureQuestion;
        $scope.options = $scope.questions[0].options;
        
        $scope.startTimeObject = new Date();
        
        /* quizService.checkAllQuestionsAnswered($scope.numQuestions,                               $scope.userCorrect)
        .then(function() {
            $state.go('Results');
        }); */
        
    }
        
    $scope.getNextQuestion = function() {
        // Search array for questionId
        for (var i = 0; i < $scope.numQuestions; i++) {
             if ($scope.questionId === $scope.questions[i].id) {
                 if (i < $scope.numQuestions - 1) { // if not at end of array
                    $scope.questionId = $scope.questions[i + 1].id;
                    $scope.questionType = $scope.questions[i + 1].type; 
                    $scope.question = $scope.questions[i + 1].question;
                    $scope.correctAnswer = $scope.questions[i + 1].correctAnswer;
                    $scope.pictureQuestion = $scope.questions[i + 1].pictureQuestion;
                    $scope.options = $scope.questions[i + 1].options; 
                    $scope.userAnswered = false;
                    $scope.userAnsweredCorrectly = false;
                    return;
                 }
                 else {
                    $scope.endTimeObject = new Date();
                    $scope.secondsElapsed = ($scope.startTimeObject.getTime() - $scope.endTimeObject.getTime()) / 1000;
                    $state.go('Results');
                 }
             }
        }
    
    }
    
      
    
});