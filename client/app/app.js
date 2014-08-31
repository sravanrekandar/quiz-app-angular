'use strict';
angular.module('quizApp.globals', [])
  .value('_', _);

angular.module('quizApp.filters', []);
angular.module('quizApp.services', []);
angular.module('quizApp.directives', []);
angular.module('quizApp.controllers', []);

// Declare app level module which depends on filters, and services
angular.module('quizApp', [
  'ui.router',
  'angularLocalStorage',
  'quizApp.globals',
  'quizApp.filters',
  'quizApp.services',
  'quizApp.directives',
  'quizApp.controllers'
]).
config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	// For any unmatched url, redirect to /home
	//$urlRouterProvider.otherwise("/home/login");

	$stateProvider
		// Home Page
		.state('home', {
			url: "/home",
			templateUrl: "app/pages/home/home.html",
			controller: 'HomeCtrl'
		})
		.state('home.login', {
			url: "/login",
			templateUrl: "app/pages/home/components/login/home-login.html",
			controller: 'HomeLoginCtrl'
		})
		.state('home.register', {
			url: "/register",
			templateUrl: "app/pages/home/components/register/home-register.html",
			controller: 'HomeRegisterCtrl'
		})
		
		// Quiz page
		.state('quiz', {
			url: "/quiz",
			templateUrl: "app/pages/quiz/quiz.html",
			controller: 'QuizCtrl'
		})
		.state('quiz.instructions', {
			url: "/instructions",
			templateUrl: "app/pages/quiz/components/instructions/quiz-instructions.html",
			controller: 'QuizInstructionsCtrl'
		})
		.state('quiz.question', {
			url: "/question::id",
			templateUrl: "app/pages/quiz/components/question/quiz-question.html",
			controller: 'QuizQuestionCtrl',
			resolve:{
				question: ['$stateParams', 'QuizSvc', function($stateParams, QuizSvc){
					var questionId = $stateParams.id,
						question = QuizSvc.getQuestion(questionId);
					return question;
				}],
				choice : ['$stateParams', 'AnswerSvc', function($stateParams, AnswerSvc){
					var questionId = $stateParams.id,
						choiceValue = AnswerSvc.getChoice(questionId);
					return {
						id: questionId,
						value: choiceValue
					};
				}]
			}
		})
		.state('quiz.evaluate', {
			url: "/evaluate",
			templateUrl: "app/pages/quiz/components/evaluate/quiz-evaluate.html",
			controller: 'quizEvaluateCtrl'
		})
		.state('quiz.results', {
			url: "/results",
			templateUrl: "app/pages/quiz/components/results/quiz-results.html",
			controller: 'QuizResultsCtrl'
		});
}]);