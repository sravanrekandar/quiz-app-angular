'use strict';
angular.module('quizApp')
	.factory('LoginSvc', [
		'$http',
		'$q',
		'$rootScope',
		function($http, $q, $rootScope){
			var currentUser = {
				username: null
			};
			var factory = {};
			factory.login = function(query){
				var deferred = $q.defer();
				/*
				$http.get('/login', query).then(function(response){
					if(response.success === 'OK')
					deferred.resolve(_orders);
				});
				*/
				if(query.username.toLowerCase() === query.password.toLowerCase()) {
					$rootScope.$broadcast('Event:Loginsuccess', query.username);
					deferred.resolve({
						success: 'OK',
						msg: 'Login Successful',
						username: query.username
					});
				}
				return deferred.promise;
			};

			factory.logout = function(){
				// $http.post('logout/');
				$rootScope.$broadcast('Event:Logout');
				currentUser.username = null;
			};

			factory.setCurrentUser = function(username){
				currentUser.username = username;
			};

			factory.getCurrentUser = function(username){
				return currentUser.username;
			};

			factory.register = function(){
				// TODO.
			};
			return factory;
		}])
;