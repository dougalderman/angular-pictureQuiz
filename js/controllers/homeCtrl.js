angular.module('pictureQuiz')
.controller('homeCtrl', function ($scope, homeService, dataUrl) {
  homeService.getQuizzes(dataUrl.url + 'quizzes.json')
    .then(function(response) {
      if (response.status === 200) {
        $scope.quizzes = response.data.quizzes;
      }
      else {
        console.log('status code is ' + response.status);
      }
    })
    .catch(function(err) {
      console.log('Error', err);
    });
});
