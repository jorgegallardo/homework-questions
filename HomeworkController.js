var app = angular.module('homeworkQuestions', []);

app.controller('HomeworkController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
	$scope.activeQuestion = 0;
	$scope.score = 0;
	$scope.percentage = 0;

	$http.get('homeworkQuestions.json').then(function (questions) {
		$scope.allQuestions = questions.data;
		$scope.totalQuestions = $scope.allQuestions.length;
	});

  $scope.selectAnswer = function(questionIndex, answerIndex) {
    var questionState = $scope.allQuestions[questionIndex].questionState;

    if(questionState != 'answered') {
      var correctAnswer = $scope.allQuestions[questionIndex].correct;
      $scope.allQuestions[questionIndex].correctAnswer = correctAnswer;

      $scope.allQuestions[questionIndex].selectedAnswer = answerIndex;

      if(answerIndex === correctAnswer) {
        $scope.allQuestions[questionIndex].correctness = 'correct';
        alert("right");
        $scope.score++;
      } else {
        $scope.allQuestions[questionIndex].correctness = 'incorrect';
        alert("wrong");
      }
      $scope.allQuestions[questionIndex].questionState = 'answered';
    }
  }

  $scope.isSelected = function(questionIndex, answerIndex) {
    return $scope.allQuestions[questionIndex].selectedAnswer === answerIndex;
  };

  $scope.isCorrect = function(questionIndex, answerIndex) {
    return $scope.allQuestions[questionIndex].correctAnswer === answerIndex;
  };

  $scope.nextQuestion = function() {
    return $scope.activeQuestion++;
  };
}]);