angular.module('pictureQuiz')
.controller('quizCtrl', function ($scope, quizService, dataUrl, $stateParams, $state, $interval) {
  var stop;
  quizService.getQuizData(dataUrl.url + $stateParams.quizBriefName + '.json')
    .then(function(response) {
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
    $scope.title = $scope.quiz.title;
    $scope.autoSubmit = $scope.quiz.config.autoSubmit;
    $scope.percentGreatJob = $scope.quiz.config.percentGreatJob;
    $scope.rightSide = $scope.quiz.config.rightSide;
    $scope.rightSideGiphy = '';
    $scope.rightSideGiphyKeywords = $scope.quiz.config.rightSideGiphyKeywords ? $scope.quiz.config.rightSideGiphyKeywords : $scope.title;
    $scope.userCorrect = [];
    $scope.borderOn = [];
    $scope.borderOnYes = false;
    $scope.borderOnNo = false;
    $scope.questions = $scope.quiz.config.randomizeQuestionSequence ?         quizService.randomizeQuestionSequence($scope.quiz.questions) : $scope.quiz.questions;
    $scope.numQuestions = $scope.questions.length;

    /* Get first question information */
    $scope.currentQuestion = 1;
    $scope.questionId = $scope.questions[0].id;
    $scope.questionType = $scope.questions[0].type;
    $scope.question = $scope.questions[0].question;
    $scope.correctAnswer = $scope.questions[0].correctAnswer;
    $scope.correctAnswerArray = $scope.questions[0].correctAnswerArray;
    $scope.pictureQuestion = $scope.questions[0].pictureQuestion;
    $scope.options = $scope.questions[0].options;

    $scope.startTimeObject = new Date();

    if ($scope.rightSide === 'giphy') {
      quizService.streamGiphys($scope.rightSideGiphyKeywords)
        .then(function(response) {
          var giphyArrayLength = response.data.data.length;
          if (giphyArrayLength) {
            var i = 0;
            $scope.rightSideGiphy = response.data.data[i].images.downsized_medium.url;
            stop = $interval(function() {
              i++;
              if (i >= giphyArrayLength) {
                i = 0 // reset to 0 if at end of array
              }
              $scope.rightSideGiphy = response.data.data[i].images.downsized_medium.url;
            }, 7000);
          }
        })
        .catch(function(err) {
          console.log(err);
        })
    }
  };

  $scope.getNextQuestion = function() {
    var i = $scope.currentQuestion - 1; // index one less than question #
    if (i < $scope.numQuestions - 1) { // if not at end
      $scope.questionId = $scope.questions[i + 1].id;
      $scope.questionType = $scope.questions[i + 1].type;
      $scope.question = $scope.questions[i + 1].question;
      $scope.correctAnswer = $scope.questions[i + 1].correctAnswer;
      $scope.correctAnswerArray = $scope.questions[i + 1].correctAnswerArray;
      $scope.pictureQuestion = $scope.questions[i + 1].pictureQuestion;
      $scope.options = $scope.questions[i + 1].options;
      $scope.currentQuestion++;
      $scope.userAnswered = false;
      $scope.userAnsweredCorrectly = false;
      $scope.borderOn = [];
      $scope.borderOnYes = false;
      $scope.borderOnNo = false;
      $scope.gotoTop(0);
      return;
    }
    else { // completed all questions
      if (angular.isDefined(stop)) {
        $interval.cancel(stop);
        stop = undefined;
      }
      $scope.endTimeObject = new Date();
      $scope.secondsElapsed = Math.floor(($scope.endTimeObject.getTime() - $scope.startTimeObject.getTime()) / 1000);
      $state.go('Results', {
         title: $scope.title,
         secondsElapsed: $scope.secondsElapsed,
         userCorrectArray: $scope.userCorrect,
         percentGreatJob: $scope.percentGreatJob
      });
    }
  }

  $scope.gotoTop = function(numPixels) {
    $(".questionBody").animate({ scrollTop: numPixels }, "fast");
  };
});
