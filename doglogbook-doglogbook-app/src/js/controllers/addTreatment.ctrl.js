(function(){
  'use strict';

  angular.module('app.controllers')
    .controller('AddTreatmentCtrl',AddTreatmentCtrl);


    function AddTreatmentCtrl( $ionicPlatform, $scope, $state, 
              $filter, $timeout, $stateParams,
              $ionicScrollDelegate, PetService, 
              $q, PopupFactory,
              $cordovaDatePicker,
              treatmentTypes,BagService,
              ReminderService,TimeService,
              ErrorMapper, LoadingMsg,
              config, translations){

    var vm = this;
    
    vm.save = save;
    vm.update = update;
    vm.getTreatmentById = getTreatmentById;
    vm.updateReminders = updateReminders;
    vm.remove = remove;

    function initForms(){

      $ionicScrollDelegate.scrollTop();

      vm.selectedPet = null;
      vm.selectedTreatment = null;
      vm.treatmentTypes = treatmentTypes;

      // Creation
      vm.formData = {};
      vm.formData.dateAdministered = new Date();      
      vm.formData.customType = null;
      vm.formData.dose = null;
      vm.formData.instructions = null;

    }


    $scope.$on('$ionicView.beforeEnter', function() {

      initForms();

      if ($stateParams.petId){

        vm.selectedPet = BagService.get('SelectedPet');
        if (!vm.selectedPet || $stateParams.petId != vm.selectedPet.id) {
          showNoSelectedPetMsg();
        }

        if ($stateParams.treatmentId) {

          vm.selectedTreatment = BagService.get('SelectedTreatment');
          if (!vm.selectedTreatment || $stateParams.treatmentId != vm.selectedTreatment.id) {
            showNoSelectedTreatmentMsg();
          }

          // filling up the form
          vm.formData = objToFormMap(vm.selectedTreatment);
        }
      }
      else {
        showNoSelectedPetMsg();
      }

    });    

    function save(formData){
      var newTreatment = {},
          petId = null,
          petName = '';

      // setting pet Id
      petId = vm.selectedPet.id;
      petName = vm.selectedPet.name;

      // setting treatments attributes
      newTreatment = formToObjMap(formData);

      LoadingMsg.show();

      PetService.setTreatment(petId,newTreatment).then(
        (treatment) => {

          // updating treatment
          newTreatment.id = treatment.id;
          BagService.set('SelectedTreatment',treatment);

          LoadingMsg.hide();
          PopupFactory.show('show',{
            title:'',
            template: translations.AddTreatmentMsgTreatmentOk,    
            buttons: [
              {
                text: translations.CommonClose,
                type:'button button-outline',
                onTap:function(e){
                  vm.formData = {};
                  $state.go(config.homeState);  
                }
              },
              {
                text: ' ' + translations.AddTreatmentAddReminders,
                type:'ion-android-alarm-clock button-assertive',
                onTap:function(e){
                  vm.formData = {};

                  $state.go('app.treatmentReminders',{ 
                    petId: petId, 
                    petName: petName,
                    treatmentId: newTreatment.id
                  });
                }
              }
            ]
          });

        },
        (errors) => {
          // Error adding Treatment 

          LoadingMsg.hide();

          var errorMsg = '';
          errorMsg = ErrorMapper.getErrorMsgs(errors) || translations.AddTreatmentMsgSetError;

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

    function update(formData){
      var treatment = {},
          petId = null,
          petName = "";

      treatment = formToObjMap(formData);

      petId = vm.selectedPet.id;

      LoadingMsg.show();
      PetService.updateTreatment(petId, vm.selectedTreatment.id, treatment).then(
        (response) => {

          LoadingMsg.hide();
          PopupFactory.show('show',{
            title:'',
            template: translations.AddTreatmentMsgTreatmentUpdatedOk,    
            buttons: [
              {
                text: translations.CommonClose,
                type:'button button-outline',
                onTap:function(e){
                  vm.formData = {};
                  $state.go(config.homeState);  
                }
              },
              {
                text: ' ' + translations.AddTreatmentUpdateReminders,
                type:'ion-android-alarm-clock button-assertive',
                onTap:function(e){
                  vm.formData = {};

                  $state.go('app.treatmentReminders',{ 
                    petId: petId, 
                    treatmentId: vm.selectedTreatment.id
                  });
                }
              }
            ]
          });


        },
        (error) => {

          LoadingMsg.hide();
          PopupFactory.show('show',{
            title:'',
            template: translations.AddTreatmentMsgUpdateError,    
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

    function updateReminders(){

        $state.go('app.treatmentReminders',{ 
          petId: vm.selectedPet.id, 
          treatmentId: vm.selectedTreatment.id
        });
    }


    function getTreatmentById(id){
      return treatmentTypes.find((o)=>{ return o.id == id });
    }


    function formToObjMap(formData){
      var treatment = {};

      treatment.treatmentTypeId  = formData.treatmentType.id;
      treatment.customType       = formData.customType;
      treatment.dateAdministered = TimeService.dateToString(formData.dateAdministered);
      treatment.dose             = formData.dose;
      treatment.instructions     = formData.instructions;

      return treatment;
    }

    function objToFormMap(obj){
      var treatment = {};

      treatment.treatmentType     = vm.getTreatmentById(obj.treatmentTypeId);
      treatment.customType        = obj.customType;
      treatment.dateAdministered  = new Date(moment(obj.dateAdministered).format("YYYY"), moment(obj.dateAdministered).format("M"), moment(obj.dateAdministered).format("D"));
      treatment.dose = obj.dose;
      treatment.instructions = obj.instructions;

      return treatment;
    }

    function remove(){
      if (vm.selectedPet && vm.selectedTreatment){
        PopupFactory.show('show',{
          title:'',
          template: translations.CommonMsgAreYouSure,    
          buttons: [
            {
              text: translations.CommonCancel,
              type:'button-outline',
              onTap:function(e){ }
            },
            { 
              text: translations.CommonOk,
              type:'button-assertive',
              onTap:function(e){
                PetService.removeTreatment(vm.selectedPet.id, vm.selectedTreatment.id).then(
                  function(result){
                    $state.go(config.homeState);
                });

              }
            }
          ]
        });
      }
    }

    function showNoSelectedPetMsg(){
      PopupFactory.show('show',{
        title:'',
        template: translations.AddTreatmentMsgGetPetError,    
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

    function showNoSelectedTreatmentMsg(){
      PopupFactory.show('show',{
        title:'',
        template: translations.AddTreatmentMsgGetTreatmentError,    
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

