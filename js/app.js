angular.module('pictureQuiz', ['ui.router'])
.constant('dataUrl', {'url': 'data/'})
.config(function ($stateProvider, $urlRouterProvider) {

    // routing configuration code

    $urlRouterProvider
      .otherwise('/');

      $stateProvider
  	    .state('home', {
  			    templateUrl: 'html/routes/homeTmpl.html',
  			    url: '/',
            controller: 'homeCtrl',
//            resolve: {
//              quizData: function(homeService) {
//                return homeService.getQuizzes(dataUrl+'quizzes.json');
//              }
//            }
  		  })
        .state('quiz', {
  			    templateUrl: 'html/routes/quizTmpl.html',
  			    url: '/quiz/:quizBriefName',
            controller: 'quizCtrl',
            resolve: {
              quizData: function(quizService, $stateParams) {
                return quizService.getQuizData(dataUrl + $stateParams.quizBriefName + '.json');
              }
            }
  		  })
        .state('results', {
            templateUrl: 'html/routes/resultsTmpl.html',
            url: '/results',
            controller: 'resultsCtrl'
        });

});
