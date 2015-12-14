// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js



var example = angular.module('starter', ['ionic' , 'firebase']);


example.factory('Items', ['$firebaseArray', function($firebaseArray, $state) {

var userid;

  var ref = new Firebase("https://dazzling-torch-81.firebaseio.com");
ref.onAuth(function(authData) {
  if (authData) {
    console.log("Authenticated with uid:", authData.uid);
    userid = authData.uid;
  } else {

  }
});

console.log(userid +" useridid");

var itemsRef = new Firebase(' https://dazzling-torch-81.firebaseio.com/'+userid+'/todos');

return itemsRef;
//console.log($firebaseArray(itemsRef) + " Really ? ");

/*  itemsRef.on('value', function(snap) {
    if (snap.val() ===null) {
      console.log("ISt Null");
    }
    else {

      userid = snap.val();
console.log(userid + 'Member');}
  }); */




//itemsRef = new Firebase(' https://dazzling-torch-81.firebaseio.com/'+userid);


}]);

example.factory('Auth', ['$firebaseArray', function($firebaseArray, $state) {

var ref = new Firebase("https://dazzling-torch-81.firebaseio.com");
  ref.onAuth(function(authData) {

    if (authData) {
      console.log("Authenticated with uid:", authData.uid);


    } else {
    $state.go('app.login2');
    }
  });

  return ref;

}]);




example.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

  });
});




example.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html'
      }
    }
  })

  .state('app.todo', {
      url: '/todo',
      views: {
        'menuContent': {
          templateUrl: 'templates/todo.html',
          controller: 'FirebaseCtrl'
        }
      }
    })
    .state('app.chores', {
      url: '/chores',
      views: {
        'menuContent': {
          templateUrl: 'templates/chores.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

    .state('app.signup', {
      url: '/signup',
      views: {
        'menuContent': {
          templateUrl: 'templates/SignUp.html',
          controller: 'SignUpCtrl'
        }
      }
    })

    .state('app.login2', {
      url: '/login2',
      views: {
        'menuContent': {
          templateUrl: 'templates/login2.html',
          controller: 'LoginCtrl'
        }
      }
    })

    .state('app.members', {
      url: '/members',
      views: {
        'menuContent': {
          templateUrl: 'templates/members.html',
          controller: 'MembersCtrl'
        }
      }
    })
  .state('app.calendar', {
    url: '/calendar',
    views: {
      'menuContent': {
        templateUrl: 'templates/calendar.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login2');
});
