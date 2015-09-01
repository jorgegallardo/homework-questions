var app = angular.module('quiz', []);

app.controller('QuizController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
	$scope.score = 0;
	$scope.activeQuestion = -1;
	$scope.activeQuestionAnswered = 0;
	$scope.percentage = 0;

	$http.get('questions.json').then(function (questions) {
		$scope.myQuestions = questions.data;
		$scope.totalQuestions = $scope.myQuestions.length;
	});

	$scope.selectAnswer = function(questionIndex, answerIndex) {
		var questionState = $scope.myQuestions[questionIndex].questionState;
		if(questionState != 'answered') {
			$scope.myQuestions[questionIndex].selectedAnswer = answerIndex;
			var correctAnswer = $scope.myQuestions[questionIndex].correct;
			$scope.myQuestions[questionIndex].correctAnswer = correctAnswer;

			if(answerIndex === correctAnswer) {
				$scope.myQuestions[questionIndex].correctness = 'correct';
				$scope.score += 1
			} else {
				$scope.myQuestions[questionIndex].correctness = 'incorrect';
			}
			$scope.myQuestions[questionIndex].questionState = 'answered';
		}
		$scope.percentage = (($scope.score / $scope.totalQuestions) * 100).toFixed(1);
	}

	$scope.isSelected = function(questionIndex, answerIndex) {
		return $scope.myQuestions[questionIndex].selectedAnswer === answerIndex;
	}

	$scope.isCorrect = function(questionIndex, answerIndex) {
		return $scope.myQuestions[questionIndex].correctAnswer === answerIndex;
	}

	$scope.selectContinue = function() {
		return $scope.activeQuestion++;
	}
}]);