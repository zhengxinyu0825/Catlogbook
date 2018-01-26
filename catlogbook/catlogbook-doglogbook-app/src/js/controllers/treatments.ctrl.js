(function(){
  'use strict';

  angular.module('app.controllers')
    .controller('TreatmentsCtrl',TreatmentsCtrl);


    function TreatmentsCtrl( 
              $scope, $state, 
              LoadingMsg,PopupFactory,
              PetService, BagService,$ionicHistory,
              userPets, translations){

    var vm = this;

    vm.hasResults = hasResults;
    vm.petChange  = petChange;
    vm.edit = edit;

    function initForms(){

      vm.selectedPet = null;
      vm.pets = userPets;
    }

    $scope.$on('$ionicView.beforeEnter', function() {

      initForms();

    });    

    function petChange(pet){
      vm.selectedPet = pet;

      LoadingMsg.show();
      PetService.getTreatment(vm.selectedPet.id).then(
        (treatments) => {
          LoadingMsg.hide();
          vm.treatments = treatments;
        },
        (error) => {
          LoadingMsg.hide();

          var errorMsg = '';
          errorMsg = translations.TreatmentsMsgTreatmentsError;

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

        }
      );

    }

    function edit(pet,treatment){
      BagService.set('SelectedPet',pet);
      BagService.set('SelectedTreatment',treatment);

      $ionicHistory.clearCache().then(function(){ 
        $state.go('app.addTreatment',{ 'petId': pet.id, 'treatmentId': treatment.id });
      });
    }

    function hasResults(){
      return (
        vm.selectedPet && 
        vm.treatments && vm.treatments.length > 0);
    }

  }



})();

