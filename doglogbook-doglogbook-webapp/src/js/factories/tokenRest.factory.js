(function() {
  'use strict';

  angular.module('app')
  .factory('TokenRest',TokenRest);

  function TokenRest(Restangular, $localStorage) {
    return Restangular.withConfig((RestangularConfigurer) => {
      
      RestangularConfigurer.setDefaultHeaders({Authorization: 
        function(){ 
          var token = $localStorage.getObject("s1token").access_token;
          return 'Bearer '+ token }
      });
    });
  }

})();