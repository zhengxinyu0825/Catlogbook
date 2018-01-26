(function(){
  'use strict';
  
  angular.module('app.controllers')
  .controller('SignUpCtrl',SignUpCtrl);

  function SignUpCtrl($scope, $state, $filter, AuthService ,$ionicLoading, PopupFactory,ErrorMapper, translations,  config) {
    var vm = this;

    // defaults
    vm.minValidDate = config.minValidDate;
    vm.passwordType = 'password';

    // methods
    vm.send = send;
    vm.showPassword = showPassword;

    $scope.$on('$ionicView.beforeEnter',() => {
     
    });

    function send(formData) {
      var newUser = {};

      newUser.email            = formData.email;
      newUser.password         = formData.password;
      newUser.confirmPassword  = formData.password;
      newUser.firstName        = formData.firstName;
      newUser.lastName         = formData.lastName;

      $ionicLoading.show();
      AuthService.createUser(newUser).then((response) => {

        $ionicLoading.hide();
        $state.go('login');

      }, function(err) {
          var errorMsg = '';
          errorMsg = err.message || ErrorMapper.getErrorMsgs(err) || translations.SignUpDefaultError;

          PopupFactory.show('show',{
            title:'',
            template: errorMsg,    
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