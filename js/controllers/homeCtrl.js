angular.module('pictureQuiz')
.controller('homeCtrl', function ($scope, homeService, dataUrl) {
    
   console.log('in homeCtrl');
    
    homeService.getQuizzes(dataUrl + 'quizzes.json')
    .then(function(response) {
        $scope.quizzes = response;
    })
    .catch(function(err) {
         console.log('Error', err);
    });      
       

    
});