angular.module('pictureQuiz')
.directive('animateOnLoad', function($animateCss) {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            $animateCss(elem, {
				'event': 'enter',
				structural: true,
            }).start();
            
        }
    }
});