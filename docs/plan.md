Pages/Routes
===================
--Home/
	Display links 'login' and 'register'
	Display 'login' as active
	Actions:
	On-click 'login' link : redirect to login page (default)
	On-click 'register' link: redirect to register page
--Home/login
	Display Form
		On login success: redirect to Quiz
		On login failure: display error message
--Home/register
	Display Form
		On register success: redirect to Quiz
		On register failure: display error message
--Quiz/
	Display logged-in user info
	Display logout button
	Display restart button
	Display Instructions
	Display continue Button	
	Display timer.
	Actions:
	on-click: logout, redirect to login page
	on-click: 'continue' button, redirect to first question
				Kick off timer	
	on-click: button of nth question: redirect to nth question
	on-click: Restart
				Restart the test
--Quiz/question/
	Display question status chart: There should be n number of buttons indicating the n number of questions.
--Quiz/question/:questionId
	Display question
	Display answer form
	Display 'Next Question' button
	Display 'Previous Question' button
	Conditions:
		If the question No. is 1.
			Don't display the 'Prev Question'
		If the question No. is n (last question)
			Don't display the Next Button
			Display 'Complete Test' button
	Actions:
	on-click: 'Next Question'
		redirect to next question
	on-click: 'Prev Question'
		redirect to prev question
	on-click: 'nth question'

--Quiz/results/
	Display Score
	Display Total time took for the test
	Display 'Evaluate the Questions and answers'
	Display 'Retake the test' Button
	Actions:
	on-click: 'Evaluate the Questions and answers'
		Redirect to evaluate page
	on-click: 'Retake the test'
		Store Current score and evaluated time details for later user
		Reset the game, redirect to Quiz page
--Quiz/evaluate/
	Display question status chart
--Quiz/evaluate/:questionId
	Display Question
	Display Options
	Display Right/Wrong Icon for 'Does the user answered correct?'
	Display 'Next Button'
	Display 'Prev Button'
	Indicate the correct answer
	Indicate the wrong answer
	
Controllers
===================
--HomeCtrl
	Methods: Switch to 'login/register'
--LoginCtrl
	Methods:
		Validate the form
		Handle login success
		Handle login failure
	Dependency: LoginSvc
--RegisterCtrl
	Methods:
		Validate the form
		Handle register success
		Handle register failure
	Dependency: LoginSvc
--QuizCtrl
	Methods:
		logout
		start
		restart
		startTimer
	Dependencies: QuizSvc, LoginSvc
--QuestionCtrl
	Methods:
		getQuestion
		nextQuestion
		prevQuestion
		gotoQuestion
		submitAnswers
--EvaluateCtrl
	Methods:
		nextQuestion
		prevQuestion
		gotoQuestion
--ResultsCtrl
	Methods:
		getCurrentScore
		evaluateResults
		restart

		
Services
====================
--LoginSvc
	Methods: 
		login
		logout
		register
		getLoggedInUser

	Data: currentUser
	Dependencies: $http, $localStorage
	Comments: store the currentUser in $localStorage

--QuizSvc
	Responsible for managing the quiz.
	Methods:
		getQuestions
		getQuestion
		setCurrentQuestionId
		getAnswers
		getUserHistory
		submitAnswers
		getScore
		startTimer
		endTimer
		resetTimer
--AnswerSvc
	REsponsible for storing the user entered answers
	Methods:
		setChoice
		getChoice
		getUserAnswers
Components
====================
--Timer
	responsible for display the timer
	Methods:
		start
		stop
		reset
--QuestionNav
	responsible for displaying the graph which contains n number of buttons
	handles click on every button
	highlights the currentQuestion
