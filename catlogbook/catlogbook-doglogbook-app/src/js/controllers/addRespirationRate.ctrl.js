(function(){
  'use strict';

  angular.module('app.controllers')
    .controller('AddRespirationRateCtrl',AddRespirationRateCtrl);


    function AddRespirationRateCtrl( $ionicPlatform, $scope, $state, 
              $filter, $timeout, $stateParams,
              BagService, TimeService,
              $ionicScrollDelegate, PetService, 
              $q, $ionicLoading, PopupFactory,
              $cordovaDatePicker,
              ErrorMapper, config, translations){

    var vm = this;
    
    vm.save = save;
    vm.getBreathsFormat = getBreathsFormat;

    function initForms(){

      vm.selectedPet = null;

      // Creation
      vm.formData = {};
      vm.formData.dateRegistered = new Date();
      vm.formData.breaths = 0;
      vm.formData.comment = '';

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

    function save(formData){
      var newRespirationRate = {},
          petId = null;

      // setting pet Id
      petId = vm.selectedPet.id;

      newRespirationRate.breaths      = formData.breaths;
      newRespirationRate.dateRegistered     = TimeService.dateToString(formData.dateRegistered);
      newRespirationRate.comment            = formData.comment;

      $ionicLoading.show();

      PetService.setRespirationRate(petId,newRespirationRate).then(
        (response) => {

          // Saving Symptom
          $ionicLoading.hide();
          PopupFactory.show('show',{
            title:'',
            template: translations.AddRespirationRateMsgSetOk,    
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
          errorMsg = ErrorMapper.getErrorMsgs(errors) || translations.AddRespirationRateMsgSetError;

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

    function getBreathsFormat(amount){
      var strResult = '';

      strResult +=  amount + ' ' + translations.AddRespirationRateBreathFormat;

      return strResult;    
    }

    function showNoSelectedPetMsg(){
      PopupFactory.show('show',{
        title:'',
        template: translations.CommonMsgGetPetError,    
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


  }


})();

