angular.module('budgetron')
  .service('LoginService', function($http, $state, $cookies, $q, $timeout) {

    var notifications = [];
    var alerts = {
      fillOutFields: "Please fill out all fields.",
      alreadyLoggedIn: "You are already logged in.",
      login: "Logged in.",
      logout: "Logged out.",
      unauthorized: "Unauthorized, you must first login.",
      noUserInfo: "Please enter a username and password.",
      noUserInfoUsername: "Please enter a username.",
      noUserInfoPassword: "Please enter a password.",
      noUserFound: "Incorrect username or password.",
      passwordsDoNotMatch: "Passwords do not match.",
      passwordLength: "Password must be at least 8 characters.",
      passwordWrong: "Incorrect password.",
      userExists: 'User already exists.',
      userCreated: 'Created user!'
    };
    var service;
    var user;

    service = {
      getUser: getUser,
      showNotification: showNotification,
      notifications: notifications,
      alerts: alerts,
      // getCurrentUser: getCurrentUser,
      createUser: createUser,
      loginUser: loginUser,
      logout: logout,
    }

    return service;

    function createUser(userInfo) {
      return $http({
        method: 'POST',
        url: '/api/signup',
        data: {
          username: userInfo.username,
          password: userInfo.password
        }
      })
      .then(function(response) {
        console.log('Response from service for signup', response);
        if (response.data.username) {
          var user = response.data;

          $cookies.putObject('user', user);
          $state.go('main.dashboard')
          .then(function() {
            $state.reload('main');
          });

          notifications.unshift(alerts.userCreated);
          showNotification();
          return user;
        }
        if (response.data === 'user exists') {
          notifications.unshift(alerts.userExists);
          return showNotification();
        }
      })
      .catch(function(error) {
        if (error.data.errors.password.kind = 'minlength') {
          notifications.unshift(alerts.passwordLength);
          console.log('Password length.', notifications);
          return showNotification();
        }
      });
    };

    function loginUser(userInfo) {
      return $http({
        method: 'POST',
        url: '/api/login',
        data: {
          username: userInfo.username,
          password: userInfo.password
        }
      })
      .then(function(response) {
        console.log('LoginService.loginUser: ', response);
        if (response.data === false) {
          notifications.unshift(alerts.noUserFound);
          console.log('Got it.', notifications);
          return showNotification();
        }
        if (response.data !== false) {
          var user = response.data;
          $cookies.putObject('user', user);
          $state.go('main.dashboard')
          .then(function() {
            $state.reload('main');
          });
          return user;
        }
        return false;
      })
      .catch(function(error) {
        console.log('Wrong password.', error);
      });
    };

    function getUser(userInfo) {
      return $http({
        method: 'GET',
        url: '/api/getUser',
        data: {
          username: userInfo.username,
          password: userInfo.password
        }
      })
      .then(function(response) {
        console.log(response);
        return response;
      });
    };

    function logout() {
      return $http({
        method: 'GET',
        url: '/api/logout'
      })
      .then(function(response) {
        console.log('Logout', response);
        $cookies.remove('user');
        $state.go('main.home')
        .then(function() {
          $state.reload('main');
        })
        return response;
      });
    };

    function showNotification() {
      var toast = document.getElementById("toast");
      toast.className = "show";
      setTimeout(function(){ 
        toast.className = toast.className.replace("show", ""); 
      }, 3000);
    }

  });