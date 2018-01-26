(function(){
  'use strict';

  angular.module('app.controllers')
  .controller('PetSeizureCtrl',PetSeizureCtrl);

    function PetSeizureCtrl(
        $scope, $state, $stateParams, 
        PopupFactory, ErrorMapper, BagService, LoadingMsg,
        PetService, 
        ageFirstTimeSeizures , seizureDiagnosis, 
        seizureTestTypes,
        config, translations){

    var vm = this;

    // methods
    vm.save = save;
    vm.ageFirstTimeById = ageFirstTimeById;
    vm.seizureDiagnosisById = seizureDiagnosisById;
    vm.testCheckboxChange = testCheckboxChange;

    function initForms(){

      vm.selectedPet = null;
      vm.ageFirstTimeSeizures = ageFirstTimeSeizures;
      vm.seizureDiagnosis = seizureDiagnosis;
      vm.seizureTestTypes = seizureTestTypes;

      // Creation
      vm.formData = {};
      vm.formData.everHadASeizure = false;
      vm.formData.ageFirstTime = null;
      vm.formData.clusterSeizures = false;
      vm.formData.statusEpilepticus = false;
      vm.formData.seizureDiagnosisId = null;
      vm.formData.seizureTests = {};

    }

    $scope.$on('$ionicView.beforeEnter', function() {

      initForms();

      if ($stateParams.id){
        
        PopupFactory.show('show',{
          title:'',
          template: translations.PetSeizureMsgVideo,    
          buttons: [
            {
              text: translations.CommonOk,
              type:'button-assertive',
              onTap:function(e){}
            }
          ]
        });

        vm.selectedPet = BagService.get('SelectedPet');
        if (!vm.selectedPet || $stateParams.id != vm.selectedPet.id) {
          showNoSelectedPetMsg();
        }
        if (vm.selectedPet && vm.selectedPet.petSeizure){

          var seizure = vm.selectedPet.petSeizure;

          // load seizure background
          vm.formData.everHadASeizure = true;

          vm.formData.ageFirstTime = vm.ageFirstTimeById(seizure.ageFirstTime);
        
          // setting tests options
          seizure.seizureTests.forEach((s) => {
            vm.formData.seizureTests[s.seizureTestTypeId] = true;
          });
 
          vm.formData.seizureDiagnosis = seizureDiagnosisById(seizure.seizureDiagnosisId);
          vm.formData.clusterSeizures = seizure.clusterSeizures;
          vm.formData.statusEpilepticus = seizure.statusEpilepticus;

        }
      }
      else {
        showNoSelectedPetMsg();
      }    
    });    

    function save(formData){
      var newSeizure = {},
          petId = null;

      // setting up seizure
      newSeizure.ageFirstTime  = formData.ageFirstTime.id;
      newSeizure.seizureTests  = 
        _.chain(formData.seizureTests).keys()
            .value()
            .filter((e)=> { 
              return formData.seizureTests[e]==true  
            })
            .map((e) => { 
            return { 'seizureTestTypeId' : parseInt(e) 
          }});
            
      newSeizure.seizureDiagnosisId = formData.seizureDiagnosis.id;
      newSeizure.clusterSeizures    = formData.clusterSeizures || false;
      newSeizure.statusEpilepticus  = formData.statusEpilepticus || false;
      
      LoadingMsg.show();
      PetService.updateSeizureBackground(vm.selectedPet.id,newSeizure).then(
        (result) => {

          // will force to update list
          BagService.set("Pets",null);

          LoadingMsg.hide();
          PopupFactory.show('show',{
            title:'',
            template: translations.PetSeizureMsgSeizureOk,    
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
        (error)  => {

          LoadingMsg.hide();
          PopupFactory.show('show',{
            title:'',
            template: translations.PetSeizureMsgSeizureError,    
            buttons: [
              {
                text: translations.CommonOk,
                type:'button-assertive',
                onTap:function(e){}
              }
            ]
          });

        }
      );
    }

    function testCheckboxChange(id, value){
      vm.formData.seizureTests[id] = value;
    }

    function ageFirstTimeById(id){
      return vm.ageFirstTimeSeizures.find((e) => {
        return e.id == id
      });
    }

    function seizureDiagnosisById(id){
      return vm.seizureDiagnosis.find((e) => {
        return e.id == id
      });
    }

    function showNoSelectedPetMsg(){
      PopupFactory.show('show',{
        title:'',
        template: translations.PetSeizureMsgGetPetError,    
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

