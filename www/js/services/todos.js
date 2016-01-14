angular.module('todosService', [
  'authService',
  'fbase',
])
.factory('todos', ['auth', 'firebaseHost', '$firebaseArray', '$q', function(auth, host, $firebaseArray, $q) {
  var todoItems;

  function resetUser(authData) {
    if (!authData) {
      if (todoItems) { todoItems.destroy(); }
      todoItems = null;
      return;
    }
    // todoItems = $firebaseArray(new Firebase(host + '/Tasks')); Thomas Changes
    todoItems = $firebaseArray(new Firebase(host + '/' + authData.uid + '/todos'));
  }
  resetUser(auth.currentUser);
  auth.onChange(resetUser);

  return {
    getItems: function() {
      return todoItems || [];
    },
    addItem: function(item) {
      if (!todoItems) { return $q.reject(new Error('Could not add an item')); }
      // console.log(auth.currentUser);
      // return todoItems.$add({
      //     name: item.name,
      //     checked: 'false',
      //     createdBy: auth.currentUser.uid,
      //     family: '1234',
      //     type: 'todo'
      //    });
      return todoItems.$add(item);
    },
    removeItem: function(id) {
      if (!todoItems) { return $q.reject(new Error('Could not remove the item')); }
      return todoItems.$remove(id);
    },
    save: function(id) {
      if (!todoItems) { return $q.reject(new Error('Could not save the item')); }
      return todoItems.$save(id);
    },
  };

}]);
