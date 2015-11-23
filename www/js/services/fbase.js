angular.module('fbase', ['firebase'])
.constant('firebaseHost', 'https://dazzling-torch-81.firebaseio.com')
.factory('fbase', ['firebaseHost', function(host) {
  return new Firebase(host);
}]);
