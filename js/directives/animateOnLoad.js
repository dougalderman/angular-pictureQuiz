angular.module('pictureQuiz')
.directive('animateOnLoad', function($animateCss) {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {
            /* scope.giphyUrl = 'https://media.giphy.com/media/iabcSfUB6VZYc/giphy.gif';
            scope.cssParam = 'url("' + scope.giphyUrl + '")'; */
            $animateCss(elem, {
            'event': 'enter',
            structural: true,
            /* duration: 6000 // 100 minutes, i.e. don't end */
            /* from: {'background-image': scope.cssParam } */
            }).start();
            
            // scope.giphyUrl = 'https://media.giphy.com/media/iabcSfUB6VZYc/giphy.gif';
            // elem.css('background-image', 'url("' + scope.giphyUrl + '")'); 
        }
    }
});