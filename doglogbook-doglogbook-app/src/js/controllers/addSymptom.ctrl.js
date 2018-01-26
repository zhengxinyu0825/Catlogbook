(function(){
  'use strict';

  angular.module('app.controllers')
    .controller('AddSymptomCtrl',AddSymptomCtrl);


    function AddSymptomCtrl( $ionicPlatform, $scope, $state,
              $filter, $timeout, $stateParams,
              $ionicScrollDelegate, PetService, 
              $q, $ionicLoading, PopupFactory,
              $cordovaDatePicker,
              symptomTypes, symptomFrequencies,
              ErrorMapper, config, translations){

    var vm = this;
    
    vm.save = save;

    function initForms(){

      $ionicScrollDelegate.scrollTop();

      vm.selectedPet = null;
      vm.symptomTypes = symptomTypes;
      vm.symptomFrequencies = symptomFrequencies;

      // Creation
      vm.formData = {};
      vm.formData.symptomTypeId = null;
      vm.formData.symptomFrequencyId = null;
      vm.formData.comment = '';

    }

    $scope.$on('$ionicView.beforeEnter', function() {

      initForms();

      if ($stateParams.id) {
        vm.selectedPetId = $stateParams.id;
      }

    });    

    function save(formData){
      var newSymptom = {},
          petId = null;

      // setting pet Id
      petId = vm.selectedPetId;

      newSymptom.symptomTypeId      = formData.symptomType.id;
      newSymptom.symptomFrequencyId = formData.symptomFrequency.id;
      newSymptom.comment            = formData.comment;

      $ionicLoading.show();

      PetService.setSymptom(petId,newSymptom).then(
        (response) => {

          // Saving Symptom
          $ionicLoading.hide();
          PopupFactory.show('show',{
            title:'',
            template: translations.AddSymtomMsgSetOk,    
            buttons: [
              {
                text: translations.CommonOk,
                type:'button-assertive',
                onTap:function(e){
                  vm.formData = {};

                  $state.go(config.homeState);  
                }
              }
            ]
          });
        },
        (errors) => {

          $ionicLoading.hide();

          var errorMsg = '';
          errorMsg = ErrorMapper.getErrorMsgs(errors) || translations.AddSymtomMsgSetError;

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

  }


})();

