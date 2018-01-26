(function(){
  'use strict';

  angular.module('app.controllers')
    .controller('TreatmentReminderCtrl',TreatmentReminderCtrl);


    function TreatmentReminderCtrl( 
              $ionicPlatform, $scope, $state, $window,
              $filter, $timeout, $stateParams,
              $ionicScrollDelegate, PetService, 
              $q, LoadingMsg, PopupFactory,
              $cordovaDatePicker,
              BagService,$cordovaCalendar,
              ReminderService,TimeService,
              ErrorMapper, config, translations){

    var vm = this;
    
    vm.save = save;
    vm.addReminder     = addReminder;
    vm.removeReminder  = removeReminder;
    vm.done = done;

    function initForms(){

      vm.selectedPet = null;
      vm.currentReminders = [];

      // Creation
      vm.formData = {};
      vm.formData.reminders = [];

      // datetime format
      vm.apiDateTimeFormat = config.apiDateTimeFormat;

    }

    $scope.$on('$ionicView.beforeEnter', function() {

      initForms();

      if (!$stateParams.petId){
        showNoSelectedPetMsg();
      }
      else if ($stateParams.petId && !$stateParams.treatmentId){
        showNoSelectedTreatmentMsg();
      }

      if ($stateParams.petId && $stateParams.treatmentId){

        vm.selectedPet = BagService.get('SelectedPet');
        if (!vm.selectedPet || $stateParams.petId != vm.selectedPet.id) {
          showNoSelectedPetMsg();
        }

        vm.selectedTreatment = BagService.get('SelectedTreatment');
        if (!vm.selectedTreatment || $stateParams.treatmentId != vm.selectedTreatment.id) {
          showNoSelectedTreatmentMsg();
        }

        LoadingMsg.show();
        PetService.getTreatmentRemindersByPetIdTreatmentId(vm.selectedPet.id,vm.selectedTreatment.id).then(
          (reminders) => {
            
            LoadingMsg.hide();
            vm.currentReminders = reminders;
            vm.formData.reminders = reminders.map((e)=> {
              e['displayDate'] = TimeService.dateToString(e.doseDateTime);
              return e;
            });

          },
          (error) => {

            LoadingMsg.hide();
            PopupFactory.show('show',{
              title:'',
              template: translations.TreatmentReminderMsgGetRemindersError,    
              buttons: [
                {
                  text: translations.CommonOk,
                  type:'button-assertive',
                  onTap:function(e){
                    vm.formData = {};
                    $window.history.back();
                  }
                }
              ]
            });

          }
        );

      }
      else {
        showNoSelectedPetMsg();
      }

    });    

    function save(formData){
      var petId = null,
          petName = '',
          treatmentId = null;

      // setting pet Id
      petId = vm.selectedPet.id;
      petName = vm.selectedPet.name;
      treatmentId = vm.selectedTreatment.id;

      var bulkReminders = formData.reminders.map((e)=> {
        e['doseDateTime'] = TimeService.dateToString(e.displayDate);
        return e;
      });


      if (bulkReminders && bulkReminders.length > 0){
        // There are reminders to set

        var title = vm.selectedPet.name + ': ' + vm.selectedTreatment.treatmentType.name;
        var instructions = vm.selectedTreatment.instructions || "";


       ReminderService.removeBulk(vm.currentReminders);

       LoadingMsg.show();
        ReminderService
          .setBulk(title, instructions, formData.reminders)
          .then(
            (reminders) => {

              PetService.setBulkTreatmentReminders(petId,treatmentId,reminders).then(
                (result) => {

                  LoadingMsg.hide();
                  PopupFactory.show('show',{
                    title:'',
                    template: translations.TreatmentReminderMsgTreatmentRemindersOk,    
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
                (error) => {

                  LoadingMsg.hide();

                  // removing native reminders
                  var events = formData.reminders.map((r)=> { return  JSON.parse(r.jsonObj); });
                  ReminderService.removeBulk(events);

                  // An error pushing reminder to the server, Need to remove all created calendars.
                  PopupFactory.show('show',{
                    title:'',
                    template: translations.TreatmentReminderMsgSetRemindersError,    
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

          },(error) => {

            LoadingMsg.hide();
            PopupFactory.show('show',{
              title:'',
              template: translations.TreatmentReminderMsgSetNativeRemindersError,    
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
      else {
        // Saving Treatment with no Reminders

        LoadingMsg.hide();
        PopupFactory.show('show',{
          title:'',
          template: translations.TreatmentReminderMsgTreatmentOk,    
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

      }
    }


    function addReminder(){
      var petId = null,
          treatmentId = null;

        // setting pet Id
        petId = vm.selectedPet.id;
        treatmentId = vm.selectedTreatment.id;

        var newReminderDateTime = TimeService.dateToString(new Date());
        var title = vm.selectedPet.name + ': ' + vm.selectedTreatment.treatmentType.name;
        var instructions = vm.selectedTreatment.instructions || "";

        var newReminder = {
          title : vm.selectedPet.name + ': ' + vm.selectedTreatment.treatmentType.name,
          instructions: vm.selectedTreatment.instructions || "",
          startDate: TimeService.formatToDatetime(newReminderDateTime),
          endDate: TimeService.formatToDatetime(newReminderDateTime)
        };

        ReminderService.set(
          newReminder.title,
          newReminder.instructions,
          newReminder.startDate,
          newReminder.endDate, true).then(
          (reminderObj) => {

            var newApiReminder = {
              'JsonObj': reminderObj,
              'doseDateTime': TimeService.dateToString(newReminderDateTime)
            };

            PetService.setTreatmentReminder(petId,treatmentId,newApiReminder).then(
              (reminderResult) => {

                LoadingMsg.hide();
                reminderResult['displayDate'] = newReminderDateTime;

                PopupFactory.show('show',{
                  title:'',
                  template: translations.TreatmentReminderMsgTreatmentRemindersOk,    
                  buttons: [
                    {
                      text: translations.CommonOk,
                      type:'button-assertive',
                      onTap:function(e){}
                    }
                  ]
                });

                vm.formData.reminders.push(reminderResult);
              },
              (error) => {

                LoadingMsg.hide();
                PopupFactory.show('show',{
                  title:'',
                  template: translations.TreatmentReminderMsgSetRemindersError,    
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
          },
          (error) => {

            LoadingMsg.hide();
            PopupFactory.show('show',{
              title:'',
              template: translations.TreatmentReminderMsgSetNativeRemindersError,    
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

    function removeReminder(reminder){
      var petId = null,
          reminderId = null,
          treatmentId = null;

      var delReminder = reminder;

      if (reminder['jsonObj']) {

        var event = JSON.parse(reminder.jsonObj);

        petId = vm.selectedPet.id;
        treatmentId = vm.selectedTreatment.id;
        reminderId  = reminder.id;

        LoadingMsg.show();
        ReminderService.remove(event).then(
          (reminder) => {

            PetService.removeTreatmentReminder(petId,treatmentId,reminderId).then(
              (result) => {
                LoadingMsg.hide();

                PopupFactory.show('show',{
                  title:'',
                  template: translations.TreatmentReminderMsgTreatmentRemindersRemoveOk,    
                  buttons: [
                    {
                      text: translations.CommonOk,
                      type:'button-assertive',
                      onTap:function(e){}
                    }
                  ]
                });

                // reset reminder inputs
                vm.formData.dateAddReminder = null;
                vm.formData.timeAddReminder = null;  
              },
              (error) => {

                LoadingMsg.hide();
                PopupFactory.show('show',{
                  title:'',
                  template: translations.TreatmentReminderMsgRemoveRemindersError,    
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
          },
          (error) => {

            LoadingMsg.hide();
            PopupFactory.show('show',{
              title:'',
              template: translations.TreatmentReminderMsgRemoveNativeRemindersError,    
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

      // removing item from list;
      _.remove(vm.formData.reminders,(e) => { return e==reminder});
    }

    function done(){
      $state.go(config.homeState);  
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

