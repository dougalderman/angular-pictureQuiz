angular.module('pictureQuiz')
.service('quizService', function ($http, $q) {
    
    this.getQuizData = function(quizUrl) {
        return $http({
            method: 'GET',
            url: quizUrl
        });
    };   
    
    this.randomizeQuestionSequence = function(questions) {
    /*
        Randomize array element order in-place.
        Using Durstenfeld shuffle algorithm.
    */
        for (var i = questions.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = questions[i];
            questions[i] = questions[j];
            questions[j] = temp;
        }
        return questions;
    };
	
	this.streamGiphys = function(keyword) {
		var url = 'http://api.giphy.com/v1/gifs/search?q=' + keyword + '&api_key=dc6zaTOxFJmzC';
		var respArray = [];		
    	$http.get(url)
    	.then(function(response) {
      		console.log(response);
      		if (response.data.data) {
        		respArray = response.data.data;
        		deferred.resolve(respArray);
			}
      	})
    	.catch(function(err) {
      		deferred.reject(err);
    	})
    	return deferred.promise;
	};
    
});