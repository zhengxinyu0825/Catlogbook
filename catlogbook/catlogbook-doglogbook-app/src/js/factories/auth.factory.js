(function() {
  'use strict';

  angular.module('app')
  .factory('AuthService',AuthService);

  function AuthService(Restangular, $q, $httpParamSerializerJQLike, $localStorage, config){
    var authService = this;
    
    // methods
    authService.createUser    = createUser;
    authService.getUsersToken = getUsersToken;
    authService.logoutUser    = logoutUser;
    authService.isTokenValid  = isTokenValid;
    authService.forgotPassword = forgotPassword;

    return authService;

    function createUser(user) {
      var base = Restangular.all('account/register');
      return base.post(user);
    }

    function getUsersToken(user) {
      var defer = $q.defer();
      var base = Restangular.all('token');

      user.grant_type = 'password';
      base.post(
        $httpParamSerializerJQLike(user), {}, 
        {'Content-Type': 'application/x-www-form-urlencoded'})
        .then(
        function(result){
          $localStorage.setObject('s1token', result);
          defer.resolve(result);

       },function(error){
          defer.reject(error);

      });

      return defer.promise;
    }

    function logoutUser() {
      $localStorage.removeKey('s1token');
    }

    function isTokenValid() {
      var token = $localStorage.getObject('s1token');

      if(token) {
        var expDate = new Date(token[".expires"]);
        var nowDate = moment();

        if (expDate > nowDate){
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }

    function forgotPassword(username) {
      var base = Restangular.all('account/forgotpassword');
      return base.customPOST(undefined, undefined, {userName: username}, {});
    }

  }

})();