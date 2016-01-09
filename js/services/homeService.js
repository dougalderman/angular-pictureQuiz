angular.module('pictureQuiz')
.service('homeService', function ($http) {
    
    this.getQuizzes = function(quizzesUrl) {
        return $http({
            method: 'GET',
            url: quizzesUrl
        });
    };        

});