'use strict';
angular.module('quizApp.controllers')
	.controller('QuizCtrl',[
		'$scope',
		'LoginSvc',
		'QuizSvc',
		function($scope, LoginSvc, QuizSvc){
			$scope.logout = LoginSvc.logout;
			$scope.resetQuiz = QuizSvc.reset;
			$scope.currentUser = $scope.$parent.currentUser;
		}])
;