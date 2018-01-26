(function(){
  'use strict';
  
  angular.module('app.controllers')
  .controller('ForgotPasswordCtrl',ForgotPasswordCtrl);

  function ForgotPasswordCtrl($scope, $state, AuthService ,$ionicLoading, PopupFactory,ErrorMapper, translations) {
    var vm = this;

    vm.send = send;

    $scope.$on('$ionicView.beforeEnter',() => {
      
    });

    function send(formData) {

      $ionicLoading.show();
      AuthService.forgotPassword(formData.email).then((response) => {

        $ionicLoading.hide();
        PopupFactory.show('show',{
          title:'',
          template: response.message,    
          buttons: [
            {
              text: translations.CommonOk,
              type:'button-assertive',
              onTap:function(e){
                $state.go('login');
              }
            }
          ]
        });

      }, function(errors) {
          var errorMsg = '';
          errorMsg = errors.message || ErrorMapper.getErrorMsgs(errors) || translations.ForgotPasswordDefaultError;

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
  }

})();