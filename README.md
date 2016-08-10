#Angular Picture Quiz

This app is a online quiz with the option of using a picture as part of the question, or pictures as answer options. It allows for multiple choice, short answer, and true-false types questions. There are 3 text-only questions types, 3 picture questions, and one picture answer multiple choice, for a total of 7 question types. Quizzes are defined in json configuration files. This is strictly a front-end Angular app, that can be served as static HTML.

##Getting Started
### Prerequisites
- Familiarity with JSON file format to build quizzes.
- Familiarity with Angular JS ver 1 and HTML / CSS helpful if you want to modify code or integrate into another site.

###Installation
 git clone https://github.com/dougalderman/angular-pictureQuiz.git

##Design Goals
This app is intended to provide the user with an online picture quiz experience. It can be used on its own or integrated into a separate site. A possible use case is an addition to an informational website that will provide interactivity without requiring login or server code.

##Detailed Usage

###JSON confiration files

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
  "title":      "US Presidents",
  "config": {
      "randomizeQuestionSequence": false,
      "autoSubmit": false,
      "percentGreatJob": 60,
      "rightSide": "giphy"
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
    }
  ]
}
```	
    
There are 4 configuration options:

 - randomizeQuestionSequence--if set to true, uses the Durstenfeld  shuffle algorithm to randomize the question sequence. Otherwise shows questions in the order they were specified in the .json file.
 - autoSubmit--if set to true, automatically submits client's selection (with the exception of short answers, which wait for user to hit a submit button). Otherwise has user click a submit button after selecting the option (with the exception of picture answers, which are automatically submitted when clicked).
 - percentGreatJob--this is the % correct that is needed to display the giphy corresponding to CSS class giphy-great-job in the results page. If % is below this level, then giphy-ok-job will be displayed.
 - rightSide (optional)--set to 'giphy' to display a stream of giphys in the right side of the quiz page. If blank, or the option doesn't exist, the right side will be blank.
 - rightSideGiphyKeywords (optional)--set to the keyword to use for calling the Giphy API for the right side giphy stream. If blank, or this option doesn't exist, giphy will default to using the keywords in the "title" property.



###Angular Code

This app uses only front-end Javascript frameworks Angular 1.x and Angular UI Router, and can be served as static HTML. There are 3 routes and 8 directives.

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
		percentGreatJob: 0
            },
            controller: 'resultsCtrl'
        });
});

```
As can be seen from the code, each route has its own controller and templateUrl. 


###Home Route

The home controller and template are fairly straightforward. The controller calls a service function to perform an $http request to read the quizzes.json file. It then displays the quiz image, title and description in flex boxes. 

![Sample Home Screen](https://github.com/dougalderman/angular-pictureQuiz/blob/master/images/Sample_Home_Screen.jpg)

It directs the user to choose a quiz. When the user clicks on the quiz picture, it does a ui-sref link, passing to the quiz controller the brief name of the quiz. 


###Quiz Route

The quiz controller first calls a service function to do an $http request to read the name.json file, where 'name' is the quiz name passed as a parameter to this route. It then calls a processQuiz() function which sets some $scope variables. The quiz template is a series of 7 element directives. The directives are set to only ng-show when the question type is set to that question type. Here is the beginning part of the quizTmpl.html file:

```html
<div class="questionContainer">
    
    <div class="questionHeader">
        <div class="topLeft">{{title}} Quiz</div>
        <div class="topRight">Question {{currentQuestion}} of {{numQuestions}}</div>
    </div>

    <div class="questionBody">
        <picture-answer title="{{title}}" auto-submit="autoSubmit" num-questions="{{numQuestions}}" current-question="{{currentQuestion}}" question-id="questionId" question="{{question}}" options= "options" correct-answer="{{correctAnswer}}" user-correct="userCorrect" user-answered="userAnswered" user-answered-correctly="userAnsweredCorrectly" get-next-question="getNextQuestion()" goto-top = "gotoTop(numPixels)" ng-show="questionType === 'pictureAnswer'"></picture-answer>

        <picture-question-multiple-choice title="{{title}}" auto-submit="autoSubmit" num-questions="{{numQuestions}}" current-question="{{currentQuestion}}" question-id="questionId" question="{{question}}" options= "options" correct-answer="{{correctAnswer}}" picture-question="{{pictureQuestion}}" user-correct="userCorrect" user-answered="userAnswered" user-answered-correctly="userAnsweredCorrectly" get-next-question="getNextQuestion()" border-on="borderOn" goto-top = "gotoTop(numPixels)" ng-show="questionType === 'pictureQuestionMultipleChoice'"></picture-question-multiple-choice>
```

In the screen shot below, the pictureQuestionTrueFalse directive is active. Notice also the right side giphy.

![Sample Quiz Screen](https://github.com/dougalderman/angular-pictureQuiz/blob/master/images/Sample_Quiz_Screen.jpg)

Each directive handles the user experience for its question type. For example, here is the picture answer question type directive template html:

```html
<div>{{question}}</div>
<br>
<div class="pictureAnswerContainer">
	<form class="pictureAnswerForm" ng-submit="processUserInput(answer, 'fromSubmit')">
		<div class="pictureAnswers" ng-repeat = "option in options">
			<div class="left"> {{option.id}}) </div>
			 <img ng-src="{{option.pictureAnswer}}" ng-class="{black_border: borderOn[$index]}" ng-click="processUserInput($index, 'fromSelect')" alt="President Image" width="130">
		 </div>
		<input class="button multiple_choice_button" type="submit" value="Submit" ng-hide="autoSubmit">
	</form>
    <div class="afterSubmit">
        <div class="green" ng-show="userAnswered && userAnsweredCorrectly">
            You got it right!! Great job!!
        </div>
        <div class="red" ng-show="userAnswered && !userAnsweredCorrectly">
            Sorry, the correct answer is "{{correctAnswer}}"
        </div>
        <br>
        <button ng-show="userAnswered" ng-click="getNextQuestion()">Next</button>
    </div>
</div>



```

Here is the corresponding directive script:
```javascript
angular.module('pictureQuiz')
.directive('pictureAnswer', function() {
    return {
        restrict: 'E',
        templateUrl: 'html/directives/pictureAnswer.html', 
        scope: {
            title: '@',
            autoSubmit: '=',
            numQuestions: '@',
            currentQuestion: '@',
            questionId: '=',
            question: '@',
            options: '=',
            correctAnswer: '@',
            userCorrect: '=',
            userAnswered: '=',
            userAnsweredCorrectly: '=',
            getNextQuestion: '&',
			borderOn: '=',
            gotoTop: '&'
        },
        controller: function($scope) {
            $scope.userAnswered = false;
            $scope.userAnsweredCorrectly = false;
            $scope.processUserInput = function(selection, whereFrom) {
                if (!$scope.userAnswered) { // if haven't already answered question
                   if (selection) // if selection has value
                        $scope.selection = $scope.options[selection].id;
                    var temp = ((whereFrom === 'fromSelect') && $scope.autoSubmit);
                    var temp2 = ((whereFrom === 'fromSubmit') && !$scope.autoSubmit);
                    if (temp || temp2) {
                        $scope.userAnswered = true;
                        if ($scope.selection === $scope.correctAnswer) {
                            $scope.userCorrect[$scope.questionId] = true;
                            $scope.userAnsweredCorrectly = true;
                        }
                        else {
                            $scope.userCorrect[$scope.questionId] = false;
                            $scope.userAnsweredCorrectly = false;
                        }
			$scope.gotoTop({numPixels: 0});
                   }
		   else { // selected but not submitted / autosubmit
			for (var i = 0; i < $scope.options.length; i++) {
				$scope.borderOn[i] = false; // initialize to false for all options
			}
			$scope.answer = selection;
			$scope.borderOn[selection] = true;
		   }
                }    
            }    
        }
    }
});
```

processUserInput() is the directive function that handles the user input. It checks if the answer is correct, and updates $scope.userCorrect array, which is the array quizCtrl.js uses to track right or wrong answers for the quiz. Div class="afterSubmit" in the template handles letting the user know whether his answer is correct or incorrect. The user is in control of going to the next question by clicking the "Next" button. This button calls quizCtrl.js function getNextQuestion():

```javascript
$scope.getNextQuestion = function() {
        
	var i = $scope.currentQuestion - 1; // index one less than question #
	if (i < $scope.numQuestions - 1) { // if not at end
	    $scope.questionId = $scope.questions[i + 1].id;
	    $scope.questionType = $scope.questions[i + 1].type; 
	    $scope.question = $scope.questions[i + 1].question;
	    $scope.correctAnswer = $scope.questions[i + 1].correctAnswer;
	    $scope.correctAnswerArray = $scope.questions[i + 1].correctAnswerArray;
	    $scope.pictureQuestion = $scope.questions[i + 1].pictureQuestion;
	    $scope.options = $scope.questions[i + 1].options; 
	    $scope.currentQuestion++;
	    $scope.userAnswered = false;
	    $scope.userAnsweredCorrectly = false;
	    $scope.borderOn = [];
	    $scope.borderOnYes = false;
	    $scope.borderOnNo = false;
	    
	    $scope.gotoTop(0);
	    
	    return;
	 }
	 else { // completed all questions
	     $scope.endTimeObject = new Date();
	     $scope.secondsElapsed = Math.floor(($scope.endTimeObject.getTime() - $scope.startTimeObject.getTime()) / 1000);
	     $state.go('Results', {
	         title: $scope.title,
	         secondsElapsed: $scope.secondsElapsed, 
	         userCorrectArray: $scope.userCorrect,
		 percentGreatJob: $scope.percentGreatJob
	     });
	 }
}
```    

Here is a screen shot of an example of the picture answer question type in the US Presidents quiz:

![Picture Answer Example](https://github.com/dougalderman/angular-pictureQuiz/blob/master/images/Picture_Answer_Example.jpg)

###Results Route

After completing all the questions in the quiz, a $state.go statement() changes to the results route. The quiz route passes the following parameters to the results route: title, secondsElapsed, userCorrectArray, and percentGreatJob. resultsCtrl.js calculates the total number of questions from the length of userCorrectArray. It calculates the percent correct by calculating how many elements in userCorrectArray are true (set by the individual directives in the quiz route). 

```javascript
angular.module('pictureQuiz')
.controller('resultsCtrl', function ($scope, quizService, $stateParams) {
    
    $scope.title = $stateParams.title;
	$scope.percentGreatJob = $stateParams.percentGreatJob;
    
    $scope.numQuestions = $stateParams.userCorrectArray.length;
	$scope.numCorrect = 0;
    for (var i = 0; i < $scope.numQuestions; i++) {
         if ($stateParams.userCorrectArray[i] === true)
             $scope.numCorrect++;
    } 
    
    
    $scope.percentCorrect = 0;
    if ($scope.numQuestions != 0)
        $scope.percentCorrect = Math.round(($scope.numCorrect / $scope.numQuestions) * 100);
    
    $scope.secondsElapsed = $stateParams.secondsElapsed;
    
});
```

If $scope.percentCorrect >= $scope.percentGreatJob (set in the configuration json file), then animateOnLoad.js assigns className to 'giphy-great-job', else className is assigned to 'giphy-ok-job'. 

```javascript
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
			if (scope.percentCorrect >= scope.percentGreatJob)
				className = 'giphy-great-job';
			else 
				className = 'giphy-ok-job';
			
			$animateCss(elem, {
				'event': 'enter',
				structural: true,
				addClass: className
			}).start();
           
        }
    }
});
```

style.css sets the appropriate great job or ok job giphy background-image depending on the class name. It also uses the .ng-enter .ng-enter.active syntax to do an Angular animation, including a 90 degree x axis transformation.

```css
.resultsContainer .giphy {
    margin-top: 30px;
    width: 300px;
    height: 200px;
}

.resultsContainer .giphy-great-job.ng-enter {
    transition: transform 7s ease-in;
    background-image: url("https://media.giphy.com/media/iabcSfUB6VZYc/giphy.gif"); 
    background-size: cover; 
}

.resultsContainer .giphy-ok-job.ng-enter {
    transition: transform 7s ease-in;
    background-image: url("https://media.giphy.com/media/aLdiZJmmx4OVW/giphy.gif"); 
    background-size: cover; 
}

.resultsContainer .giphy-great-job.ng-enter.ng-enter-active, .resultsContainer .giphy-ok-job.ng-enter.ng-enter-active {
    transform: perspective(400px) rotateX(90deg);
}
```

The user sees the giphy for 7 seconds, as it gradually becomes rotated until it is no longer visible. The user also sees quiz stats like number correct out of total questions, percent correct and time elapsed. The user can then click a link to return to the home screen:

![Sample Results Screen](https://github.com/dougalderman/angular-pictureQuiz/blob/master/images/Sample_Results_Screen.jpg)


##License
This code is open source under the MIT license:  https://opensource.org/licenses/MIT
