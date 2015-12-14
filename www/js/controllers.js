angular.module('starter.controllers', []);

example.controller('AppCtrl', function($scope, $ionicModal, $timeout) {



});

example.controller('FirebaseCtrl', function($scope,Items, $ionicListDelegate, $state, $firebaseArray) {

//Auth.onAuth();

  var ref = new Firebase("https://dazzling-torch-81.firebaseio.com");
ref.onAuth(function(authData) {
  if (authData) {
    console.log("Authenticated with uid:", authData.uid);
    $scope.user = authData.uid;

  } else {
  $state.go('app.login2');
  }
});

  //var itemsRef = new Firebase(' https://dazzling-torch-81.firebaseio.com/').orderByChild($scope.user).equalTo("true");
  //var itemsRef = new Firebase(' https://dazzling-torch-81.firebaseio.com/').orderByChild($scope.user).equalTo("true");

  //itemsRef = itemsRef.child();
//var itemsRef = new Firebase(' https://dazzling-torch-81.firebaseio.com/'+$scope.user);
//itemsRef = Items.child('todos');


$scope.items = $firebaseArray(Items);
console.log($scope.items);


  $scope.addItem = function() {
    var name = prompt('What needs to be done?');
    if (name) {
/*
      $scope.items.$add({
        'name': name,
        'checked': false
      });*/

     Items.push({
         name: name,
         checked: 'false'
        });

    }
  };

  $scope.checkItem = function(item) {
    //$scope.checked = item.checked;
    //console.log("Firdst" + $scope.checked);
  //  $scope.checked = !$scope.checked;
    //console.log($scope.checked);



if (item.checked === 'true') {

    Items.child(item.$id).child('checked').set('false');
    //  $ionicListDelegate.closeOptionButtons();



}
else if (item.checked === 'false') {
  Items.child(item.$id).child('checked').set('true');
  //  $ionicListDelegate.closeOptionButtons();


}


  /*   if (item.checked) {
      Items.child(item.$id).child('checked').set('false');
      $ionicListDelegate.closeOptionButtons();
      console.log("Bevor "+item.checked);
      item.checked = !item.checked;
        console.log("Danach "+item.checked);
    } else if (!item.checked) {
      console.log("Bevor "+item.checked);
      item.checked = !item.checked;
      Items.child(item.$id).child('checked').set('true');
      $ionicListDelegate.closeOptionButtons();

      console.log("Danach "+item.checked);

   } */

  };
  $scope.deleteTodo = function(item){

    var deleteTodo = Items.child(item.$id);
  //  var deleteTodo = new Firebase('https://dazzling-torch-81.firebaseio.com/'+$scope.user+'/todos/' + item.$id);
    deleteTodo.remove();

  };
});


example.controller('SignUpCtrl', function($scope, $state) {


$scope.signup = function(useremail, password){
  var ref = new Firebase("https://dazzling-torch-81.firebaseio.com");
  ref.createUser({
    email    : useremail,
    password : password,

  }, function(error, userData) {
    if (error) {
      console.log("Error creating user:", error);
    } else {
      console.log("Successfully created user account with uid:", userData.uid);

      $state.go('app.login2');
    }
  });
};
});


example.controller('LoginCtrl', function($scope, $state) {


$scope.login = function(useremail, password){

  var ref = new Firebase("https://dazzling-torch-81.firebaseio.com");
  console.log("test");
  ref.authWithPassword({
    email    : useremail,
    password : password

  }, function(error, authData) {
    if (error) {
      console.log("Login Failed!", error);
    } else {
      console.log("Authenticated successfully with payload:", authData);
       $state.go('app.todo');
    }
  },{ remember: "sessionOnly"});
};
});

example.controller('MembersCtrl', function($scope, $state) {


  var ref = new Firebase("https://dazzling-torch-81.firebaseio.com");
  ref.onAuth(function(authData) {
  if (authData) {
    console.log("Authenticated with UserID:", authData.uid);
    $scope.user = authData.uid;
  } else {
  $state.go('app.login2');
  }
  });


$scope.addMember = function($MembersUser){
  var Ref = new Firebase('https://dazzling-torch-81.firebaseio.com/'+$MembersUser);
  console.log($MembersUser);
  Ref.child('Member').set($scope.user);


};
});
