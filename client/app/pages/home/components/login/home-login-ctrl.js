'use strict';
angular.module('quizApp.controllers')
	.controller('HomeLoginCtrl',[
		'$scope',
		'LoginSvc',
		function($scope,LoginSvc){
			$scope.query = {
				username: '',
				password: ''
			};

			$scope.login = function(query){
				LoginSvc.login(query);
			};
		}])
;