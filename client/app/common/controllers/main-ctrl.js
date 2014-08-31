'use strict';
angular.module('quizApp.controllers')
	.controller('MainCtrl',[
		'$scope',
		'$state',
		'storage',
		'$location',
		'LoginSvc',
		function($scope, $state, localStorage, $location, LoginSvc){
			$scope.handleLoginSuccess = function(evt, username){
				$scope.currentUser = username;
				$state.go('quiz.instructions');
			};

			$scope.handleLogout = function(evt){
				$scope.currentUser = null;
				$state.go('home.login');
			};

			$scope.init = function(){
				//Binding the loggedInUser to the local storage | using ['angularLocalStorage']
				localStorage.bind($scope,'currentUser',{defaultValue: null ,storeName: 'quizApp'});
				
				if($scope.currentUser) {
					//TODO: Ideally the $state.go should work, which is not happening
					//$state.go('quiz.instructions');
					$location.path('/quiz/instructions');
				} else {
					//$state.go('home.login');
					$location.path('/home/login');
				}

				$scope.$on('Event:Loginsuccess', $scope.handleLoginSuccess);
				$scope.$on('Event:Logout', $scope.handleLogout);
			};
		}])
;