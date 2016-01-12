angular.module('pictureQuiz')
.controller('homeCtrl', function ($scope, homeService, dataUrl) {
    
   console.log('in homeCtrl');
    
    homeService.getQuizzes(dataUrl.url + 'quizzes.json')
    .then(function(response) {
            console.log(response);
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
    
//    $scope.rotate = function() {
//        var elem = angular.element(document.querySelector('.quiz'));
//        elem.addClass('openDoor');
//    }
     
    
});