#Angular Picture Quiz


This app is a online quiz with the option of using a picture as part of the question, or pictures as answer options. It allows for multiple choice, short answer, and true-false types questions. There are 3 text-only questions types, 3 picture questions, and one picture answer multiple choice, for a total of 7 question types. 

A quizzes.json configuration file is the master configuration which lists the different quizzes available and some basic information about the quizzes. Here's an example of a quizzes.json file with 3 quizzes:

```javascript
{
  "quizzes" : [
      {
        "briefName": 	"presidents",
        "title":      "American Presidents",
        "picture":	"images/George_Washington.jpg",
        "description": "General knowledge about American presidents"
      },
      {
        "briefName": 	"science",
        "title":      "Basic Science",
        "picture":	"images/Atom.jpg",
        "description": "General knowledge about science"
      },
      {
        "briefName": 	"celebrities",
        "title":      "Celebrities",
        "picture":	"images/Tom_Cruise.jpg",
        "description": "General knowledge about celebrities"
      }
   ]
}
```

Each quiz has its own json file with configuration options and specifications of each question in the quiz. The json file name is the briefName in the quizzes.json file above. So, for example, the American Presidents quiz will be in the file presidents.json. Here's an example of a presidents.json file with 3 questions:

```javascript
{
  "briefName": 	"presidents",
  "title":      "American Presidents",
  "config":{
      "randomizeQuestionSequence": false,
      "autoSubmit": false
    },
  "questions": [
    {
      "id":      0,
      "question": "This president pictured was the fourth president",
	  "pictureQuestion":  "images/Thomas_Jefferson.jpg",
      "type":     "pictureQuestionTrueFalse",
      "correctAnswer": "False"
    },
   	{
      "id":      1,
      "question": "Select the year Franklin D. Roosevelt first took office as president",
      "type":     "textMultipleChoice",
	  "options": [
            { "id": "a", "answer": "1932"},
            { "id": "b", "answer": "1929"},
            { "id": "c", "answer": "1935"},
            { "id": "d", "answer": "1933"}
	  ],		
      "correctAnswer": "1933"
    },
	{
      "id":      2,
      "question": "Click on the picture of the President who was NOT assassinated while in office",
      "type":     "pictureAnswer",
	  "options": [
            { "id": "a", "pictureAnswer": "images/William_McKinley.jpg"},
            { "id": "b", "pictureAnswer": "images/Abraham_Lincoln.jpg"},
            { "id": "c", "pictureAnswer": "images/Grover_Cleveland.jpg" },
            { "id": "d", "pictureAnswer": "images/John_F_Kennedy.jpg"}
	  ],		
      "correctAnswer": "c"
    },
	{
      "id":      3,
      "question": "Give the first and last name of the president who said 'Speak softly and carry a big stick'",
      "type":     "textShortAnswer",
	  "correctAnswerArray": [
		"Ted Roosevelt",
		"Teddy Roosevelt",
		"Theodore Roosevelt"
	  ]
    }
  ]
}
```	
    
As can be seen from the config object at the beginning, there are 2 configuration options:

 - randomizeQuestionSequence--if set to true, uses the Durstenfeld
	   shuffle algorithm to randomize the question sequence. Otherwise shows questions in the order they were specified in the .json file.
 - autoSubmit--if set to true, automatically submits client's selection
   (with the exception of short answers, which wait for user to hit a
   submit button). Otherwise has user click a submit button after
   selecting the option (with the exception of picture answers, which
   are automatically submitted when clicked).

It uses only front-end Javascript frameworks Angular 1.x and Angular UI Router. There are 3 routes and 8 directives.

Routes:

 1. Home
 2. Quiz
 3. Results

7 Directives corresponding to the different question types:

 1. pictureAnswer
 2. pictureQuestionMultipeChoice
 3. pictureQuestionShortAnswer
 4. pictureQuestionTrueFalse
 5. textMultipleChoice
 6. textShortAnswer
 7. textTrueFalse

One directive (animateOnLoad) to allow the giphy rotation (CSS transform) to occur upon loading the results page.

The main UI Router application logic is in app.js:

```javascript
angular.module('pictureQuiz', ['ui.router', 'ngAnimate'])
.constant('dataUrl', {'url': 'data/'})
.config(function ($stateProvider, $urlRouterProvider) {

    // routing configuration code

    $urlRouterProvider
      .otherwise('/');

      $stateProvider
  	    .state('Home', {
  			    templateUrl: 'html/routes/homeTmpl.html',
  			    url: '/',
                controller: 'homeCtrl'
  		})
        .state('Quiz', {
  			    templateUrl: 'html/routes/quizTmpl.html',
  			    url: '/quiz/:quizBriefName',
            controller: 'quizCtrl',
        })
        .state('Results', {
            templateUrl: 'html/routes/resultsTmpl.html',
            url: '/results',
            params : {
                title: '',
                secondsElapsed: 0,
                userCorrectArray: [],
            },
            controller: 'resultsCtrl'
        });

});
```
As can be seen from the code, each route has its own controller and template. 


###Home Route

The home controller and template are fairly straightforward. The controller calls a service function to perform an $http request to read the quizzes.json file. It then displays the quiz image, title and description in flex boxes. 

![Sample Home Screen](/tree/master/images/Sample_Home_Screen.jpg)

It directs the user to choose a quiz. When the user clicks on the quiz picture, it does a ui-sref link, passing to the quiz controller the brief name of the quiz. 


###Quiz Route

The quiz controller first calls a service function to do an $http request to read the name.json file, where 'name' is the quiz name passed as a parameter to this route. It then calls a processQuiz() function which sets some $scope variables. quiz template is a series of 7 element directives. The directives are set to only ng-show when the question type is set to that question type.

> Written with [StackEdit](https://stackedit.io/).## Heading ##