angular.module('starter.controllers')
.controller('TodosCtrl', ['$scope', 'todos', function($scope, todos) {
  $scope.todos = todos;

  $scope.complete = function(index) {
    $scope.todos[index].checked = true;
    todos.save(index);
  };

  $scope.create = function(todo) {
    todos.addItem(todo).then(function() {
      console.log('Todo created');
    });
  };

  $scope.remove = function(id) {
    todos.removeItem(id).then(function() {
      console.log('Todo removed');
    });
  };

  $scope.save = function(id) {
    todos.save(id).then(function() {
      console.log('Todo saved');
    });
  };

}]);
