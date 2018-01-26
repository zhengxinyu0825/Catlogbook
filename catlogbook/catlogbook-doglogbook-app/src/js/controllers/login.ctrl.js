(function(){
  'use strict';
  
  angular.module('app.controllers')
  .controller('LoginCtrl',LoginCtrl);

  function LoginCtrl($scope, $state, AuthService , $ionicLoading, PopupFactory,ErrorMapper, translations) {
    var vm = this;

    // defaults
    vm.passwordType = 'password';

    vm.login = login;
    vm.showPassword = showPassword;

    $scope.$on('$ionicView.beforeEnter',() => {
      
    });

    function login(formData) {

      $ionicLoading.show();
      AuthService.getUsersToken(formData).then((token) => {

      $ionicLoading.hide();
      $state.go('app.home');

      }, function(errors) {

          PopupFactory.show('show',{
            title:'',
            template: translations.LoginDefaultError,    
            buttons: [
              {
                text: translations.CommonOk,
                type:'button-assertive',
                onTap:function(e){

                }
              }
            ]
          });

        $ionicLoading.hide();
      });

    }

    function showPassword(currentType) {
      vm.passwordType = (currentType === 'password') ? 'text': 'password';
    }

  }

})();