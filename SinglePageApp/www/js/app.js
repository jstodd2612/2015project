// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('tabs',{
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    .state('tabs.list', {
      url: '/list',
      views: {
        'list-tab': {
          templateUrl: 'templates/list.html',
          controller: 'ListController'
        }
      }
    })

    //child of tabs.list
    .state('tabs.detail', {
      url: '/list/:aId',
      views: {
        'list-tab': {
          templateUrl: 'templates/detail.html',
          controller: 'ListController'
        }
      }
    })



    .state('tabs.home', {
      url: '/home',
      views: {
        'home-tab': {
          templateUrl: 'templates/home.html'
        }
      }
    })

    .state('tabs.calendar', {
      url: '/calendar',
      views: {
        'calendar-tab': {
          templateUrl: 'templates/calendar.html',
          controller: 'CalendarController'
        }
      }
    })

    .state('tabs.to-do', {
      url: '/to-do',
      views: {
        'to-do-tab': {
          templateUrl: 'templates/to-do.html',
          controller: 'To-DoController'
        }
      }
    })

    .state('tabs.checked', {
      url: '/checked',
      views: {
        'checked-tab': {
          templateUrl: 'templates/checked.html',
          controller: 'CheckedController'
        }
      }
    })

    .state('tabs.home2', {
      url: '/home2',
      views: {
        'home2-tab': {
          templateUrl: 'templates/home2.html',
          controller: 'Home2Controller'
        }
      }
    })

    $urlRouterProvider.otherwise('/tab/home');

})

.controller('CalendarController',['$scope', '$http', '$state', function($scope, $http, $state){ //$state to send data (variable) from artist in detail.html
  $http.get('js/data.json').success(function(data){
  $scope.calendar = data.calendar;

  $scope.onItemDelete = function (dayIndex, item) {
    $scope.calendar[dayIndex].schedule.splice($scope.calendar[dayIndex].schedule.indexOf(item),1);
  };

  $scope.toggleStar = function(item){
    item.star = !item.star;

  };
  $scope.doRefresh = function(){

    $http.get('js/data.json').success(function(data){
    $scope.calendar = data.calendar;
    $scope.$broadcast('scroll.refreshComplete');
  }

)};
});

}])




.controller('ListController',['$scope', '$http', '$state', function($scope, $http, $state){ //$state to send data (variable) from artist in detail.html
  $http.get('js/data.json').success(function(data){
  $scope.artists = data.artists;
  $scope.whichartist = $state.params.aId;
  $scope.data = {showDelete:false, showReorder: false}

  $scope.onItemDelete = function (item) {
    $scope.artists.splice($scope.artists.indexOf(item),1);
  };
  $scope.moveItem = function(item, fromIndex, toIndex){
    $scope.artists.splice(fromIndex,1);
    $scope.artists.splice(toIndex,0, item);

  };
  $scope.toggleStar = function(item){
    item.star = !item.star;

  };
  $scope.doRefresh = function(){

    $http.get('js/data.json').success(function(data){
    $scope.artists = data.artists;
    $scope.$broadcast('scroll.refreshComplete');
  }

)};
});
}])

.controller('To-DoController',['$scope', '$http', '$state', function($scope, $http, $state){ //$state to send data (variable) from artist in detail.html
  $http.get('js/data.json').success(function(data){
  $scope.todo = data.todo;
  $scope.gemacht = false;
  $scope.toggleChecked = function(item){
    item.gemacht = !item.gemacht;

  };
});

}])

.controller('CheckedController', function($scope) {

  $scope.devList = [
    { text: "Go to school", checked: false },
    { text: "Do the homework", checked: false },
    { text: "Drink water", checked: false },
    { text: "Sleep enough", checked: false},
    { text: "Learn ionic framewrok", checked: false},
    { text: "Learn angular framewrok", checked: false}
  ];


})


.controller('Home2Controller', function($scope, $location) {

$scope.redirectTo = function(location){
   $location.path('#/tab/' + location);
};

});


;
