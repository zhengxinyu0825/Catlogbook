(function(){
  'use strict';
  
  angular.module('app.controllers')
  .controller('PetHomeCtrl',PetHomeCtrl);

  function PetHomeCtrl(
      $scope, $state, $stateParams,
      PopupFactory, BagService,
      config, translations) {

    var vm = this;

    vm.openProfile = openProfile;
    vm.openInitialActivityRate = openInitialActivityRate;
    vm.check = check;

    function initForms(){
      vm.selectedPet = null;
      vm.avatar = null;
    }

    $scope.$on('$ionicView.beforeEnter', function() {
      
      initForms();

      if ($stateParams.id){
        vm.selectedPet = BagService.get('SelectedPet');
        if (!vm.selectedPet || $stateParams.id != vm.selectedPet.id) {
          showNoSelectedPetMsg();
        }
      }
      else {
        showNoSelectedPetMsg();
      }      

    });    


    function openProfile() {
      $state.go('app.addPet', {id: vm.selectedPet.id });  
    }


    function openInitialActivityRate() {
      $state.go('app.initialActivityRate', {id: vm.selectedPet.id});  
    } 

    function check(feature){
      if (feature == 'Profile') { 
        return (vm.selectedPet);
      }
      else if (feature == 'SeizureBackground') {
        return (vm.selectedPet && vm.selectedPet.petSeizure);
      }
      else {
        return false;
      }
    }

    function showNoSelectedPetMsg(){
      PopupFactory.show('show',{
        title:'',
        template: translations.PetHomeMsgGetPetError,    
        buttons: [
          {
            text: translations.CommonOk,
            type:'button-assertive',
            onTap:function(e){
              $state.go(config.homeState);
            }
          }
        ]
      });
    }


  };

})();