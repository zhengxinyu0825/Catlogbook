(function(){
  'use strict';

  angular.module('app.controllers')
  .controller('AddSeizureCtrl',AddSeizureCtrl);

    function AddSeizureCtrl(
        $scope, $state, $stateParams, $ionicScrollDelegate,
        PopupFactory, ErrorMapper, BagService, LoadingMsg,
        PetService, 
        seizureTypes, seizureSignTypes, seizureBodyStates,
        seizureBodyStatePositions, seizureAfterSignTypes, 
        config, translations){

    var vm = this;

    // defaults
    vm.maxSeizureDurationMin = config.maxSeizureDurationMin;

    // methods
    vm.save = save;
    vm.testCheckboxChange = testCheckboxChange;
    vm.getDurationFormat = getDurationFormat;

    function initForms(){

      $ionicScrollDelegate.scrollTop();

      vm.selectedPet = null;

      // dependencies 
      vm.seizureTypes = seizureTypes;
      vm.seizureSignTypes = seizureSignTypes;
      vm.seizureBodyStates = seizureBodyStates;
      vm.seizureBodyStatePositions = seizureBodyStatePositions;
      vm.seizureAfterSignTypes = seizureAfterSignTypes;

      // Creation
      vm.formData = {};
      vm.formData.seizureTypeId = null;
      vm.formData.duration = 0;
      vm.formData.seizureBodyStateId = null;
      vm.formData.seizureBodyStatePositionId = null;
      vm.formData.seizureSigns = {};
      vm.formData.seizureAfterSigns = {};
    }

    $scope.$on('$ionicView.beforeEnter', function() {

      initForms();

      if ($stateParams.id){
        vm.selectedPet = BagService.get('SelectedPet');
        if (!vm.selectedPet || $stateParams.id != vm.selectedPet.id) {
          showNoSelectedPetMsg();
        }
        else {
          if (vm.selectedPet && !vm.selectedPet.petSeizure){
            showNoSeizureBackgroundMsg();
          }
          else {
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
          }
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
      newSeizure.seizureTypeId  = formData.seizureType.id;
      newSeizure.duration      = parseInt(formData.duration);
      newSeizure.seizureBodyStatePositionId  = (formData.seizureBodyStatePosition)?formData.seizureBodyStatePosition.id : null;
      newSeizure.seizureBodyStateId = (formData.seizureBodyState)?formData.seizureBodyState.id : null;

      newSeizure.seizureSigns  = 
        _.chain(formData.seizureSignTypes).keys()
            .value()
            .filter((e)=> { 
              return formData.seizureSignTypes[e]==true  
            })
            .map((e) => { 
            return { 'seizureSignTypeId' : parseInt(e) 
          }});


      newSeizure.seizureAfterSigns  = 
        _.chain(formData.seizureAfterSigns).keys()
            .value()
            .filter((e)=> { 
              return formData.seizureAfterSigns[e]==true  
            })
            .map((e) => { 
            return { 'SeizureAfterSignTypeId' : parseInt(e) 
          }});            

      LoadingMsg.show();
      PetService.setSeizure(vm.selectedPet.id,newSeizure).then(
        (response) => {
          vm.formData = {};

          LoadingMsg.hide();
          PopupFactory.show('show',{
            title:'',
            template: translations.AddSeizureMsgSetOk,    
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

        },
        (error) => {

          LoadingMsg.hide();
          PopupFactory.show('show',{
            title:'',
            template: translations.AddSeizureMsgSetError,    
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
      );

    }

    function testCheckboxChange(id, value){

    }

    function getDurationFormat(min){
      var strResult = '',
          minutes   = moment.duration(parseInt(min), "minutes").minutes(),
          hours     = moment.duration(parseInt(min), "minutes").hours();

      strResult += hours + ' '   + translations.CommonHours;
      strResult += ' ';
      strResult += minutes + ' ' + translations.CommonMinutes;

      return strResult;    
    }

    function showNoSelectedPetMsg(){
      PopupFactory.show('show',{
        title:'',
        template: translations.AddSeizureMsgGetPetError,    
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

    function showNoSeizureBackgroundMsg(){
      PopupFactory.show('show',{
        title:'',
        template: translations.AddSeizureMsgNoSeizureBackground,    
        buttons: [
          {
            text: translations.CommonOk,
            type:'button-assertive',
            onTap:function(e){
              $state.go('app.petSeizure', { id: vm.selectedPet.id});
            }
          }
        ]
      });
    }

  }

})();

