(function(){
  'use strict';

  angular.module('app.controllers')
  .controller('AddProfileCtrl',function($ionicPlatform, $scope, $state, $timeout, $ionicScrollDelegate, $ionicActionSheet,$cordovaCamera, $ionicLoading, PopupFactory, translations){

    var vm = this;
    vm.cancel = cancel;
    vm.done = done;

    // inits

    $scope.$on('$ionicView.beforeEnter', function() {


    });    


    function closeWizardModal(){
      vm.modal.hide();
    }

    function cancel(){
      $state.go('app.home');
    }

    function done(){
      PopupFactory.show('show',{
        title:'',
        template:'<p>Successfully added</p>',    
        buttons: [
          {
            text:'Complete',
            type:'button-assertive',
            onTap:function(e){
              $state.go('app.home');
            }
          }
        ]
      });
    }


  });
})();

