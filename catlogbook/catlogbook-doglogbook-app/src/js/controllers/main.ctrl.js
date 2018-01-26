(function(){
  'use strict';
  
  angular.module('app.controllers')
  .controller('MainCtrl',MainCtrl);

  function MainCtrl(UserService) {
    var vm = this;

    vm.logout = logout;

    function logout(){
      UserService.logout();
    }
  };

})();