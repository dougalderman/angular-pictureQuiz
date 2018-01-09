angular.module('pictureQuiz')
.directive('animateOnLoad', function($animateCss) {
  return {
    restrict: 'A',
    scope: {
      percentCorrect: '=',
      percentGreatJob: '='
    },
    link: function(scope, elem, attrs) {
      var className = '';
      if (scope.percentCorrect >= scope.percentGreatJob) {
        className = 'giphy-great-job';
      }
      else {
        className = 'giphy-ok-job';
      }

      $animateCss(elem, {
        event: 'enter',
        structural: true,
        addClass: className
      }).start();
    }
  }
});
