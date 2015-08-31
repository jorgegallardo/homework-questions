var app = angular.module('questionsApp', []);

app.controller('CreateQuestionController', ['$scope', function ($scope) {
  Parse.initialize("2Hok8QvZcIKAfvyNu28JPTzjhhJwimSC9t26xq6w", "v6GrWsGgtqU8maRaSK1JUQ0mkvS7FKdn8ohQkFVf");
  var Question = Parse.Object.extend("Question");

  $scope.submitQuestion = function() {
    var newQuestion = new Question();
    newQuestion.set("questionText", $scope.question.text);
    newQuestion.set("answerChoices", [$scope.question.answerChoice1, $scope.question.answerChoice2, $scope.question.answerChoice3, $scope.question.answerChoice4]);
    newQuestion.save(null, {
      success: function(newQuestion) {
        console.log("New object created with objectId: " + newQuestion.id);
      },
      error: function(error) {
        console.log("Error: " + error.message);
      }
    });

    $scope.question = {};
  }
}]);