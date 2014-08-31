'use strict';
angular.module('quizApp.controllers')
	.controller('QuizQuestionCtrl',[
		'$scope', 
		'$state',
		'QuizSvc',
		'AnswerSvc',
		'question',
		'choice',
		function($scope, $state, QuizSvc, AnswerSvc, question, choice){
			$scope.question = question;
			$scope.selectedChoice = choice.value;
			$scope.nextQuestionId = QuizSvc.getNextQuestionId(question);
			$scope.isNextQuestionAvailable = true;
			if($scope.nextQuestionId === undefined) {
				$scope.isNextQuestionAvailable = false;	
			}
			
			$scope.prevQuestionId = QuizSvc.getPrevQuestionId(question);
			$scope.isPrevQuestionAvailable = true;
			if($scope.prevQuestionId === undefined) {
				$scope.isPrevQuestionAvailable = false;	
			}

			$scope.updateChoice = function(){
				AnswerSvc.setChoice($scope.question.id, $scope.selectedChoice);
			};

			$scope.resetChoice = function(){
				$scope.selectedChoice = undefined;
				AnswerSvc.setChoice($scope.question.id, $scope.selectedChoice);
			};

			$scope.nextQuestion = function(){
				$scope.updateChoice();
				$state.go('quiz.question', {id:$scope.nextQuestionId});
			};

			$scope.prevQuestion = function(){
				$scope.updateChoice();
				$state.go('quiz.question', {id:$scope.prevQuestionId});
			};

			$scope.submitAnswers = function(){
				QuizSvc.end();
			};

		}])
;