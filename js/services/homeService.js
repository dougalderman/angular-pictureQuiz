angular.module('pictureQuiz')
.service('homeService', function ($http, url) {
    
    this.getQuizzes = function(quizzesUrl) {
        return $http({
            method: 'GET',
            url: url
        })
        .then(function(response) {
            console.log(response);
            if (response.status === 200) {
                return response.data;
            }
            else {
                console.log('status code is ' + response.status);
            }
        })
        .catch(function(err) {
            console.log('Error', err);
        });
    };

});