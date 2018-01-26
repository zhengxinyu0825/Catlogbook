(function(){
  'use strict';

  angular.module('app.controllers')
  .controller('AddBehaviourCtrl',AddBehaviourCtrl);

    function AddBehaviourCtrl(
        $scope, $state, $stateParams, $ionicScrollDelegate,
        PopupFactory, ErrorMapper, BagService, LoadingMsg,
        BehaviourService, TimeService, GenderService,
        types, observationTypes, locationTypes,
        nearResourceTypes, directedTowards,
        directedTowardTypes, dogTypes,
        destroyedObjects, behaviourDuringTypes,
        humanGenders, species,
        config, translations){

    var vm = this;

    // methods
    vm.save = save;
    vm.behaviourTypeChange = behaviourTypeChange;
    vm.behaviourDirectedTowardChange = behaviourDirectedTowardChange;

    function initForms(){

      $ionicScrollDelegate.scrollTop();

      vm.selectedPet = null;

      // dependencies 
      vm.types = types;
      vm.observationTypes = observationTypes;
      vm.locationTypes = locationTypes;
      vm.nearResourceTypes = nearResourceTypes;
      vm.directedTowards = directedTowards;
      vm.directedTowardTypes = directedTowardTypes;
      vm.dogTypes = dogTypes;
      vm.destroyedObjects = destroyedObjects;
      vm.behaviourDuringTypes = behaviourDuringTypes;
      vm.humanGenders = humanGenders;
      vm.species = species;
      vm.showSpeciesName = showSpeciesName;

      // Creation
      vm.itemTypes = [];
      vm.formData = {};
      vm.formData.dateRegistered = new Date();   
      resetBehavioursItems();

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

    function resetBehavioursItems(){
      vm.formData.behaviourItems = [];
      vm.formData.behaviourObservations = [];
      vm.formData.behaviourLocations = [];
      vm.formData.behaviourComments = [];
      vm.formData.destructive = {};
      vm.formData.aggresive = {};
      vm.formData.senior = {};
      vm.formData.fearrelated = {};

      vm.formData.destructive = {};
      vm.formData.destructive.ownerAtHome = false;
      vm.formData.destructive.destroyedObjects = {};

    }

    function behaviourTypeChange(behaviourType){

      // cleaning previous selections
      resetBehavioursItems();

      LoadingMsg.show();
      BehaviourService.getItemTypesByTypeId(behaviourType.id).then(
        (items) => {
          LoadingMsg.hide();
          vm.itemTypes = items;
        },
        (error) => {
          LoadingMsg.hide();
          vm.itemTypes = [];
        }
      );
    }

    function behaviourDirectedTowardChange(behaviourDirectedTowardId){
      if (behaviourDirectedTowardId) {
        vm.formData.aggresive.humanGender = null;
        vm.formData.aggresive.dogType = null;
        vm.formData.aggresive.speciesId = null;
      }
    }

    function generalFormToObj(formData){
      var newBehaviour = {};

      // general behaviour attributes
      newBehaviour.dateRegistered = TimeService.dateToString(formData.dateRegistered);
      newBehaviour.behaviourTypeId = formData.behaviourType.id;
      newBehaviour.behaviourItems = 
        _.chain(formData.behaviourItems).keys()
          .value()
          .filter((e)=> { 
            return formData.behaviourItems[e]==true  
          })
          .map((e) => {
            var obs = formData.behaviourObservations[e];
            var loc = formData.behaviourLocations[e];
            return { 
              'behaviourItemTypeId' : parseInt(e),
              'observationTypeId' : (obs)? obs.id : null,
              'locationTypeId' :  (loc)? loc.id : null,
              'comment': formData.behaviourComments[e] || ''
            }
        });
       return newBehaviour;      
    }

    function save(formData){
      var newBehaviour = {},
          petId = null;

      // 2 - Destructive
      // 7 - Senior
      // 8 - Aggressive
      // 9 - Fear-related

      // Setting general attributes
      newBehaviour = generalFormToObj(formData);

      if (formData.behaviourType.id == 2){
        // 2 - Destructive

        newBehaviour.ownerAtHome = formData.destructive.ownerAtHome;
        newBehaviour.destroyedObjectItems = 
        _.chain(formData.destructive.destroyedObjects)
          .keys()
          .value()
          .filter((e)=> { 
            return formData.destructive.destroyedObjects[e]==true  
          })
          .map((e) => { 
            return { 
              'destroyedObjectId' : parseInt(e)
            }
        });
        newBehaviour.otherDestroyedObject = formData.destructive.otherDestroyedObject;

        LoadingMsg.show();
        BehaviourService.setDestructive(vm.selectedPet.id,newBehaviour).then(
          (response) => {
            vm.formData = {};
            LoadingMsg.hide();
            showMsgOk();
          },
          (error) => {
            LoadingMsg.hide();
            showMsgError();
          }
        );

      }
      else if (formData.behaviourType.id == 7){
        // 7 - Senior

        newBehaviour.paceUpAndDown = formData.senior.paceUpAndDown || false;
        newBehaviour.stareBlanklyAtWallsOrFloor = formData.senior.stareBlanklyAtWallsOrFloor || false;
        newBehaviour.stuckBehindObjects = formData.senior.stuckBehindObjects || false;
        newBehaviour.recogniseFamiliar = formData.senior.recogniseFamiliar || false;
        newBehaviour.walkWallsOrDoors = formData.senior.walkWallsOrDoors || false;
        newBehaviour.walkAwayWhileAvoindPatted = formData.senior.walkAwayWhileAvoindPatted || false;
        newBehaviour.urinateOrDefecateInAreaKeptClean = formData.senior.urinateOrDefecateInAreaKeptClean || false;
        newBehaviour.difficultyFindingFoodDroppped = formData.senior.difficultyFindingFoodDroppped || false;

        BehaviourService.setSenior(vm.selectedPet.id,newBehaviour).then(
          (response) => {
            vm.formData = {};
            LoadingMsg.hide();
            showMsgOk();
          },
          (error) => {
            LoadingMsg.hide();
            showMsgError();
          }
        );

      }
      else if (formData.behaviourType.id == 8){
        // 8 - Aggressive

        if (!formData.aggresive.behaviourDirectedTowardId ||
            !formData.aggresive.behaviourDirectedTowardType) {
          showMsgRequiredFieldsError();
          return;
        }
        else {

          newBehaviour.nearResourceTypeId = formData.aggresive.nearResourceTypeId;
          newBehaviour.behaviourDirectedTowardId = formData.aggresive.behaviourDirectedTowardId;
          newBehaviour.behaviourDirectedTowardType = formData.aggresive.behaviourDirectedTowardType;
          newBehaviour.humanGender = formData.aggresive.humanGender;
          newBehaviour.dogType = formData.aggresive.dogType;
          newBehaviour.speciesId = formData.aggresive.speciesId;

          LoadingMsg.show();
          BehaviourService.setAggressive(vm.selectedPet.id,newBehaviour).then(
            (response) => {
              vm.formData = {};
              LoadingMsg.hide();
              showMsgOk();
            },
            (error) => {
              LoadingMsg.hide();
              showMsgError();
            }
          );          
        }

      }
      else if (formData.behaviourType.id == 9){
        // 9 - Fear-related

        newBehaviour.behaviourDuringTypeId = formData.fearrelated.behaviourDuringTypeId;

        LoadingMsg.show();
        BehaviourService.setFearRelated(vm.selectedPet.id,newBehaviour).then(
          (response) => {
            vm.formData = {};
            LoadingMsg.hide();
            showMsgOk();
          },
          (error) => {
            LoadingMsg.hide();
            showMsgError();
          }
        );

      }      
      else {
        // Other Behaviours

        LoadingMsg.show();
        BehaviourService.set(vm.selectedPet.id,newBehaviour).then(
          (response) => {
            vm.formData = {};
            LoadingMsg.hide();
            showMsgOk();
          },
          (error) => {
            LoadingMsg.hide();
            showMsgError();
          }
        );

      }

    }

    function showSpeciesName(specie){
      return specie.name + ' - ' + specie.speciesType.name;
    }

    function showMsgRequiredFieldsError(){
      PopupFactory.show('show',{
        title:'',
        template: translations.AddBehaviourRequiredFields,    
        buttons: [
          {
            text: translations.CommonOk,
            type:'button-assertive',
            onTap:function(e){}
          }
        ]
      });
    }

    function showMsgOk(){
      PopupFactory.show('show',{
        title:'',
        template: translations.AddBehaviourMsgSetOk,    
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

    function showMsgError(){
      PopupFactory.show('show',{
        title:'',
        template: translations.AddBehaviourMsgSetError,    
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

    function showNoSelectedPetMsg(){
      PopupFactory.show('show',{
        title:'',
        template: translations.AddBehaviourMsgGetPetError,    
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

