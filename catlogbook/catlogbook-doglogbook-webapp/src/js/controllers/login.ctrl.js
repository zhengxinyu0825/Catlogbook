(function(){
  'use strict';
  
  angular.module('app.controllers')
  .controller('LoginCtrl',LoginCtrl);

  function LoginCtrl($scope, $state, AuthService ,ErrorMapper,ngDialog,  translations) {
    var vm = this;

    // defaults
    vm.passwordType = 'password';

    vm.login = login;
    vm.showPassword = showPassword;

    function login(formData) {

      AuthService.getUsersToken(formData).then(
        (token) => {
          $state.go('app.home');

        }, 
        (errors) => {

          var errorMsg = '';
          errorMsg = ErrorMapper.getErrorMsgs(errors) || errors.data.error_description || translations.LoginDefaultError;;

          ngDialog.open({
              template: errorMsg,
              plain: true
          });
      });

    }

    function showPassword(currentType) {
      vm.passwordType = (currentType === 'password') ? 'text': 'password';
    }

  }

})();