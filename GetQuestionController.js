var app = angular.module('quiz', []);

app.controller('QuizController', ['$scope', '$http', '$sce', function ($scope, $http, $sce) {
	$scope.score = 0;
	$scope.activeQuestion = 0;
	$scope.activeQuestionAnswered = 0;
	$scope.percentage = 0;

	$http.get('questions.json').then(function(questions) {
		$scope.myQuestions = questions.data;
		$scope.totalQuestions = $scope.myQuestions.length;
	});
}]);