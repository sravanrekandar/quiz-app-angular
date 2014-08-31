'use strict';
angular.module('quizApp.controllers')
	.controller('QuizResultsCtrl',[
		'$scope',
		'QuizSvc', 
		function($scope, QuizSvc){
			QuizSvc.getResulsts(function(results){
				$scope.results = results;
			});
			$scope.restart = QuizSvc.reset;
			$scope.evaluate = QuizSvc.startEvaluation;
		}])
;