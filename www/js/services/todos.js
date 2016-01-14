angular.module('todosService', [
  'authService',
  'fbase',
])
.factory('todos', ['auth', 'firebaseHost', '$firebaseArray', '$q', function(auth, host, $firebaseArray, $q) {
  var todoItems;

  function resetUser(authData) {
    if (!authData) {
      if (todoItems) { todoItems.destroy(); }
<<<<<<< HEAD
      //return todoItems = null;
      todoItems = null;
      return todoItems;
    }
    todoItems = $firebaseArray(new Firebase(host + '/Tasks'));

=======
      return todoItems = null;
    }
    todoItems = $firebaseArray(new Firebase(host + '/' + authData.uid + '/todos'));
>>>>>>> master
  }
  resetUser(auth.currentUser);
  auth.onChange(resetUser);

<<<<<<< HEAD


=======
>>>>>>> master
  return {
    getItems: function() {
      return todoItems || [];
    },
    addItem: function(item) {
      if (!todoItems) { return $q.reject(new Error('Could not add an item')); }
<<<<<<< HEAD
      console.log(auth.currentUser);
      return todoItems.$add({
          name: item.name,
          checked: 'false',
          createdBy: auth.currentUser.uid,
          family: '1234',
          type: 'todo'
         });
=======
      return todoItems.$add(item);
>>>>>>> master
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
