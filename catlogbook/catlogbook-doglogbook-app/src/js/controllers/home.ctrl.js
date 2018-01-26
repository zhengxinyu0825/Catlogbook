(function(){
  'use strict';
  
  angular.module('app.controllers')
  .controller('HomeCtrl',HomeCtrl);

  function HomeCtrl(
    $rootScope, $scope,$ionicPlatform,$cordovaCamera,$ionicLoading,PetService, $state, $timeout,
    LoadingMsg, ModalFactory,
    ModalService, PopupFactory, ReportService, EventService, $cordovaCalendar,
    $ionicActionSheet, $ionicScrollDelegate,GenderService, BagService, UserService,
    FieldsReminderService, TokenRest,userPets,userInfo, petTypes, translations, config) {

    var vm = this;

    vm.openReminderModal = openReminderModal;
    vm.openAddPetModal = openAddPetModal;
    vm.openDeletePetModal = openDeletePetModal;
    vm.setActive = setActive;
    vm.searchFilter = searchFilter;
    vm.typeFilter = typeFilter;
    vm.actionMenuActions = actionMenuActions;
    vm.actionMenuSession = actionMenuSession;
    vm.actionMenuHealth = actionMenuHealth;
    vm.actionMenuMore = actionMenuMore;
    vm.items = [];
    vm.timeline = [];
    vm.getSexType = getSexType;
    vm.getPetAge = getPetAge;
    vm.getBreedNames = getBreedNames;
    vm.isValidPuppy = isValidPuppy;
    vm.setAlertsBulkConfirm = setAlertsBulkConfirm;
    vm.petFilters = [
      { id: 1, name:'My Dogs'},
      { id: 2, name:'Shared Dogs'},
    ];



    $scope.$on('$ionicView.beforeEnter', function() {


      // setting default values
      vm.items = [];
      vm.items = userPets;
      vm.types = petTypes;
      vm.userInfo = userInfo;
      vm.petsAlerts = [];
      vm.timeline = [];
      vm.filteredPets = [];
      vm.selectedDeleteStatus = null;

      if (vm.items && vm.items.length == 1){
        // Setting default pet as selected
        vm.setActive(vm.items[0],0);
      }

          
      UserService.getPetsAlerts().then(
        (alerts)=>{

          if (alerts && alerts.length > 0){

              vm.petsAlerts = alerts;

              PopupFactory.show('show',{
                title:'',
                templateUrl: 'templates/alerts.html', 
                scope: $scope,   
                buttons: [
                  {
                    text: translations.TaskAlertLater,
                    type:'button button-outline',
                    onTap:function(e){
                    }
                  },
                  {
                    text: translations.CommonDone,
                    type:'button-assertive',
                    onTap:function(e){
                      vm.setAlertsBulkConfirm();
                    }
                  }
                ]
              });
          }

        });
      
    });

    function init(){
     
        UserService.getPets().then(
        (result)=>{
          vm.items = result;
        },
        (err)=>{
          vm.items = [];
        });
    }


    function setAlertsBulkConfirm() {
      var alertsItems = vm.petsAlerts.map((x)=> {
        return x.id;
      })
      UserService.setPetAlertsConfirmedBulk(alertsItems).then(
        (result)=>{

        },
        (err)=>{
          PopupFactory.show('show',{
            title:'',
            template: translations.TaskAlertError,    
            buttons: [
              {
                text: translations.CommonOk,
                type:'button-assertive',
                onTap:function(e){
                }
              }
            ]
          });
        });
    }

    function openReminderModal(){
      ModalService.show('templates/reminder.html', 'ReminderCtrl as vm');    
    }

    function openAddPetModal(id){
      if (id)
        $state.go('app.petHome', {id: id});  
      else 
        $state.go('app.addPet');
    }

    function searchFilter(obj) {
        var re = new RegExp(vm.searchBy, 'i');
        return !vm.searchBy || re.test(obj.name) || re.test(obj.desc);
    };
    
    function typeFilter(obj) {

       if (!vm.searchByType || !vm.userInfo){
        return true;
       }
       else {
        if (vm.searchByType.id == 1 && vm.userInfo){
          return vm.userInfo.id == obj.ownerId;
        }
        else if (vm.searchByType.id == 2 && vm.userInfo){
          return vm.userInfo.id != obj.ownerId;
        }
        else {
          return true;
        }
       }
    };

    function setActive(pet, index) {
      vm.activeIndex = index;
      vm.activePet   = pet;

      // Setting pet on bag.
      BagService.set('SelectedPet',pet);

      // will ask for more details randomly
      FieldsReminderService.randomRunCheck(pet);

      PetService.getTimeline(pet.id).then(
        (items) => {
          vm.timeline = items;
        },
        (errors) => {
          vm.timeline = [];
        }
      );
    }

    function actionMenuSession(){

      $ionicActionSheet.show({
        titleText: translations.HomeActionButtonSessionTitle,
        buttons: [
          { text: '<i class="icon ion-clipboard"></i> '+ translations.HomeActionButtonTraining },
          { text: '<i class="icon ion-clipboard"></i> '+ translations.HomeActionButtonAssessment }
        ],
        cancelText: translations.CommonCancel,
        cancel: function() { },
        buttonClicked: function(index) {

          if (index==0 && vm.activePet){
            $state.go('app.addSession', { 'id': vm.activePet.id , 'sessionTypeId': 1 });
          }
          else if (index==1 && vm.activePet){
            $state.go('app.addSession', { 'id': vm.activePet.id , 'sessionTypeId': 2 });
          }
          return true;
        }
      });       
    }
    function actionMenuActions(){
      var optionButtons = [];

      // default option.
      optionButtons.push({ text: '<i class="icon ion-clipboard"></i> '+ translations.HomeActionButtonActivity });
      optionButtons.push({ text: '<i class="icon ion-clipboard"></i> '+ translations.HomeActionButtonBehaviour });
      optionButtons.push({ text: '<i class="icon ion-clipboard"></i> '+ translations.HomeActionButtonFeeding });

      if (vm.isValidPuppy(vm.activePet)){
        optionButtons.push({ text: '<i class="icon ion-clipboard"></i> '+ translations.HomeActionButtonSocialisation });
      }

      $ionicActionSheet.show({
        titleText: translations.HomeActionButtonActionsTitle,
        buttons: optionButtons,
        cancelText: translations.CommonCancel,
        cancel: function() { },
        buttonClicked: function(index) {

          if (index==0 && vm.activePet){
            $state.go('app.addActivity', { 'id': vm.activePet.id });
          }
          else if (index==1 && vm.activePet){
            $state.go('app.addBehaviour', { 'id': vm.activePet.id });
          }
          else if (index==2 && vm.activePet){
            $state.go('app.addFeeding', { 'id': vm.activePet.id });
          }
          else if (index==3 && vm.activePet){
            $state.go('app.addSocialisation', { 'id': vm.activePet.id });
          }
          return true;
        }
      }); 
    }

    function actionMenuHealth(){

      $ionicActionSheet.show({
        titleText: translations.HomeActionButtonHealthTitle,
        buttons: [
          { text: '<i class="icon ion-clipboard"></i> '+ translations.HomeActionRecordTreatment },
          { text: '<i class="icon ion-medkit"></i> '+ translations.HomeActionRecordSymptom },
          { text: '<i class="icon ion-medkit"></i> '+ translations.HomeActionRecordSeizure },
          { text: '<i class="icon ion-clipboard"></i> '+ translations.HomeActionRecordRestingRespirationRate }
        ],
        cancelText: translations.CommonCancel,
        cancel: function() { },
        buttonClicked: function(index) {

          if (index==0 && vm.activePet){
            $state.go('app.addTreatment', { 'petId': vm.activePet.id });
          }
          else if (index==1 && vm.activePet){
            $state.go('app.addSymptom', { 'id': vm.activePet.id });
          }
          else if (index==2 && vm.activePet){
            $state.go('app.addSeizure', { 'id': vm.activePet.id });
          }
          else if (index==3 && vm.activePet){
            $state.go('app.addRespirationRate', { 'id': vm.activePet.id });
          }
          return true;
        }
      });
    }

    function actionMenuMore(){
      var optionButtons = [];

      // default option.
      optionButtons.push({ text: '<i class="icon ion-ios-plus"></i>' + translations.HomeActionButtonAddPet });

      if (vm.activePet){
        optionButtons.push({ text: '<i class="icon ion-edit"></i>' + translations.HomeActionButtonUpdatePet  });
        optionButtons.push({ text: '<i class="icon ion-trash-a"></i>' + translations.HomeActionButtonDeletePet  });
      }

      $ionicActionSheet.show({
        titleText: translations.HomeActionButtonMore,
        buttons: optionButtons,
        cancelText: translations.CommonCancel,
        cancel: function() { },
        buttonClicked: function(index) {

          if (index==0){
            openAddPetModal();
          }
          else if (index == 1 && vm.activePet){
            openAddPetModal(vm.activePet.id);
          }
          else if (index == 2 && vm.activePet){
            openDeletePetModal(vm.activePet.id);
          }
          return true;
        }
      });
    }
    
    function openDeletePetModal(id){

      vm.selectedDeleteStatus = null;

      if (id){

          LoadingMsg.show();
          PetService.getRemoveStatuses().then(
            (removeStatuses)=>{
              LoadingMsg.hide();

              vm.removeStatuses = removeStatuses;

              PopupFactory.show('show',{
                title:'',
                templateUrl: 'templates/delete-pet.html', 
                scope: $scope,   
                buttons: [
                  {
                    text: translations.CommonNo,
                    type:'button-assertive button-outline',
                    onTap:function(e){
                    }
                  },
                  {
                    text: translations.CommonYes,
                    type:'button-assertive',
                    onTap:function(e){
                       if (vm.selectedDeleteStatus) {
                       removePet(id,vm.selectedDeleteStatus.id)
                      } else {
                        e.preventDefault();
                      }
                    }
                  }
                ]
              });
            },
            (err)=>{
              LoadingMsg.hide();

              PopupFactory.show('show',{
                title:'',
                template: translations.AddFeedingGetCountryError,    
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

          });

      }
    }

    function removePet(id,deleteStatus){
      LoadingMsg.show();

      var opts = {
        deleteStatusId: deleteStatus
      };

      PetService.remove(id,opts).then(
        (result)=>{
          LoadingMsg.hide();

          // will force to update list
          BagService.set("Pets",null);
          init();

          $state.go(config.homeState);
        },
        (err)=>{
          LoadingMsg.hide();

          var errorMsg = '';
          if (err && err.data && err.data.message){
            errorMsg = err.data.message;
          }
          else {
           errorMsg = translations.DeletePetMsgDeleteError;
          }
          
          PopupFactory.show('show',{
            title:'',
            template: errorMsg,    
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

      });
    }

    function getBreedNames(petBreeds){
      if (petBreeds && petBreeds.length == 1){
        return petBreeds[0].breed.name; 
      }
      else if (petBreeds && petBreeds.length > 1){
        return translations.HomeMsgMixedBreed;
      }
      else {
        return translations.HomeMsgBreedNotSet;
      }
    }

    function getSexType(sexId){
      var gender = GenderService.get(sexId)
      if (gender){
        return gender.name || "";  
      }
      else {
        return "";
      }
      
    }

    function getPetAge(dateOfBirth){
      if (dateOfBirth){
        var now = moment(new Date());  //todays date
        var end = moment(dateOfBirth); // another date
        var duration = moment.duration(now.diff(end));
        if (duration.years() == 0)
          return "<1 y/o";
        else
          return duration.years() + " y/o";
      }
      else { 
        return "";
      }
    }

    function isValidPuppy(pet){
      var diffValue = moment(new Date()).diff(pet.dateOfBirth, 'months', true);
      if (diffValue <= 6) 
        return true;
      else
        return false;
    }

  }

})();