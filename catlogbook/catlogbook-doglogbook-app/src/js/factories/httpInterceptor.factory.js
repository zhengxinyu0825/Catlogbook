(function() {
  'use strict';

  angular.module('app')
  .factory('HttpInterceptor', HttpInterceptor);

  function HttpInterceptor($rootScope,$injector,$q,$localStorage,config) {

    var factory = {
      request:request,
      response:response,
      responseError:responseError
    };

    return factory;

    function request(config) {
      var deferred = $q.defer(); 
      var AuthService = $injector.get('AuthService');

      if (!AuthService.isTokenValid()){
        deferred.reject(config);
        $rootScope.$broadcast('app.relogin');
      }
      else {
        deferred.resolve(config);
      }
      return config;
    };

    function response(response){
      var deferred = $q.defer(); 

      var resource = response.config.headers.Resource || undefined;

      // Sync.setResourse(resource,response.data);

      deferred.resolve(response);

      return deferred.promise;
    }

    function responseError(response) {
      var deferred = $q.defer();

      if (response.status === 0) {

        // Server is not responding or not connected to internet.
        $rootScope.$broadcast('app.offline');

        var resource = response.config.headers.Resource || undefined;
        
        deferred.reject(response);

        // if (resource){
        //   var syncResource = Sync.getResourse(resource);  
        //   if (syncResource){
        //     response.data = syncResource;
        //     deferred.resolve(response);          
        //   }
        //   else {
        //     deferred.reject(response);
        //   }
        // }
        // else {
        //   deferred.reject(response);
        // }

      }
      else if (response.status === 401) {
        deferred.reject(response);

        // 401 Unauthorized 
        $rootScope.$broadcast('app.relogin');

        var UserService = $injector.get('UserService');
        UserService.logout();
      }
      else {
        deferred.reject(response);
      }

      return deferred.promise;
    };

  }

})();
