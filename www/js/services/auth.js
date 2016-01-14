angular.module('authService', [
  'fbase'
])
.factory('auth', ['fbase', '$firebaseAuth', function(fbase, $firebaseAuth) {
  var authObj = $firebaseAuth(fbase);

  return {

    loginOath: function(provider) {
      provider = provider || 'google';
<<<<<<< HEAD
      return authObj.$authWithOAuthPopup(provider);
=======
      return authObj.$authWithOAuthPopup(provider)
>>>>>>> master
    },

    login: function(email, password) {
      return authObj.$authWithPassword({
        email: email,
        password: password,
      });
    },

    logout: function() {
      authObj.$unauth();
    },

    get currentUser() {
      return authObj.$getAuth();
    },

    onChange: function(cb) {
      authObj.$onAuth(cb);
<<<<<<< HEAD
    }
=======
    },
>>>>>>> master

  };
}]);
