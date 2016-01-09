angular.module('pictureQuiz')
.service('quizService', function ($http) {
    
    this.getQuizData = function(quizUrl) {
        return $http({
            method: 'GET',
            url: quizUrl
        });
    };    

});