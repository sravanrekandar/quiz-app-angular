'use strict';
angular.module('quizApp')
	.factory('AnswerSvc', [function(){
		var factory = {},
			answers = {};
		factory.answers = answers;

		factory.setChoice = function(id, choice) {
			answers[id] = choice;
		};

		factory.getChoice = function(id) {
			return answers[id];
		};

		factory.reset = function() {
			answers = {};
		};

		factory.getAnswers = function(){
			return answers;
		};
		
		return factory;
	}])
;