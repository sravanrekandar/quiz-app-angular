'use strict';
angular.module('quizApp')
	.factory('QuizSvc',[
		'$http',
		'$state',
		'_',
		'AnswerSvc',
		function($http, $state, _, AnswerSvc){
			var questions = null;
			var factory = {};
			
			factory.getQuestions = function(callback){
				return $http.get('assets/questions.json').then(function(response){
					questions = response.data;
					callback && callback(questions);
				});
			};

			factory.getQuestion = function(id) {
				/* If the question list is not ready,
					we return an object.
					when the call is resolved, we update the object
				*/
				var question = {
						id: id
					};
				if(questions){
					question = _.find(questions, {id: id});
				} else {

					factory.getQuestions(function(){
						var q = _.find(questions, {id: id});
						angular.extend(question, q);
					});
				}

				return question;
			};


			factory.getNextQuestionId = function(currentQuestion){
				var currentIdx = _.findIndex(questions, currentQuestion),
					nextIdx = currentIdx + 1;
				if(questions[nextIdx]) {
					return questions[nextIdx].id;
				}
				return undefined;
			};

			factory.getPrevQuestionId = function(currentQuestion){
				var currentIdx = _.findIndex(questions, currentQuestion),
					prevIdx = currentIdx - 1;
				if(questions[prevIdx]) {
					return questions[prevIdx].id;
				}
				return undefined;
			};

			factory.start = function(){
				//console.log('Starting quiz');
				$state.go('quiz.question',{id:1});
			};

			factory.end = function(){
				//console.log('Ending Quiz');
				$state.go('quiz.results');
			};

			factory.reset = function(){
				AnswerSvc.reset();
				$state.go('quiz.instructions');
			};

			factory.startEvaluation = function(){
				$state.go('quiz.evaluate');
			};

			factory.getResulsts = function(callback){
				var userAnswers = AnswerSvc.getAnswers();
				$http.get('assets/answers-map.json').then(function(response){
					var systemAnswers = response.data,
						map = {},
						key,
						data,
						totalCount = 0,
						correctCount = 0,
						mistakeCount = 0;
					for(key in systemAnswers) {
						map[key] = {
							userValue: userAnswers[key],
							systemValue: systemAnswers[key]  
						};
						totalCount++;
						if(systemAnswers[key] === userAnswers[key]) {
							correctCount++;
						} else {
							mistakeCount++;
						}
					}

					data = {
						totalCount: totalCount,
						correctCount: correctCount, 
						mistakeCount: mistakeCount,
						map: map
					};
					callback && callback(data);
				});
			};

			return factory;
		}])
;