'use strict';
angular.module('quizApp.controllers')
	.controller('QuizInstructionsCtrl',[
		'$scope', 
		'QuizSvc',
		function($scope, QuizSvc){
			$scope.start = QuizSvc.start;
		}])
;