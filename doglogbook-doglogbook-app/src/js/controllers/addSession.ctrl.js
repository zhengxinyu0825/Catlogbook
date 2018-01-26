(function(){
  'use strict';

  angular.module('app.controllers')
  .controller('AddSessionCtrl',AddSessionCtrl);

    function AddSessionCtrl(
        $scope, $state, $stateParams, $ionicScrollDelegate,
        PopupFactory, ErrorMapper, BagService, LoadingMsg, ModalFactory,
        PetService, TimeService, GenderService,
        handGesturalCommands , verbalCommands , whistleLaserCommands,
        petSkills ,
        petDeviceMethods ,
        rewards ,
        correctionDevices ,
        sessionLevels ,
        species ,
        surfaceObstacles ,
        transportationTypes ,
        travelQuality , relationshipTypes,
        locationTypes, locationSubTypes,
        humanGenders, ageRanges, distanceUnits,
        commandFrecuencies, exercisePhysicalConditions,
        guideSeeingAditionalTrainings,
        temperatureUnits, weatherLevels, 
        motivationScales, confidenceScales,
        dogTypes , livestockHerdingWorkTypes,
        trialTypes, trialRanges, 
        competitionDivisions, competitionAwards,
        scentDetectionOdours, runChaseQualities,
        activityElements, racingGreyhoundActivities,
        activityRates, 
        config, translations){

    var vm = this;

    // defaults
    vm.maxSessionDurationMin = config.maxSessionDurationMin;
    vm.scoredByArray = [
      { id: 0, name: 'Self'},
      { id: 1, name: 'Other'}
    ];

    // methods
    vm.save = save;
    vm.getDurationFormat = getDurationFormat;
    vm.filterLeads = filterLeads;
    vm.percentageDisplay = percentageDisplay;
    vm.hourDisplay = hourDisplay;
    vm.minuteDisplay = minuteDisplay;
    vm.filterRewardsPercentage = filterRewardsPercentage;    
    vm.addReward = addReward;
    vm.removeReward = removeReward;
    vm.filterCorrectionPercentage = filterCorrectionPercentage;    
    vm.addCorrection = addCorrection;
    vm.removeCorrection = removeCorrection;
    vm.addCommandDetail = addCommandDetail;
    vm.modalVerbalCommandRemove = modalVerbalCommandRemove;
    vm.modalHandGesturalCommandRemove = modalHandGesturalCommandRemove;
    vm.modalWhistleLaserCommandRemove = modalWhistleLaserCommandRemove;
    vm.modalCommandCancel = modalCommandCancel;
    vm.modalCommandAdd = modalCommandAdd;
    vm.formValidations = formValidations;
    vm.addEquipment = addEquipment;
    vm.removeEquipmentItem = removeEquipmentItem;
    vm.addGreyhoundActivity = addGreyhoundActivity;
    vm.removeGreyhoundActivity = removeGreyhoundActivity;
    vm.addGreyhoundActivityDetail = addGreyhoundActivityDetail;
    vm.modalGreyhoundActivityCancel = modalGreyhoundActivityCancel;


    function initForms(){

      commandModal();
      greyhoundActivityModal();

      // scroll top
      $ionicScrollDelegate.scrollTop();

      vm.selectedPet = null;
      vm.title = null;

      // dependencies 
      vm.handGesturalCommands = handGesturalCommands;
      vm.verbalCommands = verbalCommands;
      vm.whistleLaserCommands = whistleLaserCommands;
      vm.petSkills = petSkills;
      vm.petDeviceMethods = petDeviceMethods;
      vm.rewards = rewards;
      vm.correctionDevices = correctionDevices;
      vm.sessionLevels = sessionLevels;
      vm.species = species;
      vm.surfaceObstacles = surfaceObstacles;
      vm.transportationTypes = transportationTypes;
      vm.travelQuality = travelQuality;
      vm.relationshipTypes = relationshipTypes;
      vm.locationTypes = locationTypes;
      vm.locationSubTypes = locationSubTypes;
      vm.humanGenders = humanGenders;
      vm.ageRanges = ageRanges;
      vm.distanceUnits = distanceUnits;
      vm.commandFrecuencies = commandFrecuencies;
      vm.exercisePhysicalConditions = exercisePhysicalConditions;
      vm.guideSeeingAditionalTrainings = guideSeeingAditionalTrainings;
      vm.temperatureUnits = temperatureUnits;
      vm.weatherLevels = weatherLevels;
      vm.motivationScales = motivationScales;
      vm.confidenceScales = confidenceScales;
      vm.dogTypes = dogTypes;
      vm.livestockHerdingWorkTypes = livestockHerdingWorkTypes;
      vm.stockSpecies = species.filter((s) => { 
        return s.speciesTypeId == 2
      });
      vm.trialTypes = trialTypes;
      vm.trialRanges = trialRanges;
      vm.competitionDivisions = competitionDivisions;
      vm.competitionAwards = competitionAwards;
      vm.scentDetectionOdours = scentDetectionOdours;
      vm.runChaseQualities = runChaseQualities;
      vm.activityElements = activityElements;
      vm.racingGreyhoundActivities = racingGreyhoundActivities;
      vm.activityRates = activityRates;


      vm.durationHours = [ 0,1,2,3,4,5,6,7,8,9,10 ];
      vm.durationMinutes = [ 0,5,10,15,20,25,30,35,40,45,50,55 ];
      vm.OnLeadValues = [ 0, 10, 20, 30 , 40 , 50 , 60 , 70 , 80 , 90, 100];
      vm.OffLeadValues = [ 0, 10, 20, 30 , 40 , 50 , 60 , 70 , 80 , 90, 100];
      vm.rewardsPercetages = [ 0, 10, 20, 30 , 40 , 50 , 60 , 70 , 80 , 90, 100];

      vm.formData = {};
      vm.formData.duration = 0;
      vm.formData.transportationDuration = 0;
      vm.formData.spentTetheredDuration  = 0;
      vm.formData.createdItems = [];
      vm.formData.createdDurations = [];
      vm.transportationTypes.forEach((e) => {
        vm.formData.createdDurations[e.id] = 0;
      });
      vm.formData.observedTime = 0;
      vm.formData.verbalCommandsDuration = 0;
      vm.formData.handGesturalCommandsDuration = 0;
      vm.formData.otherSkillsDevelopmentDuration = 0;
      vm.formData.rewardResults = [];  
      vm.formData.correctionResults = [];  

      vm.formData.exerciseDurations = [];
      vm.exercisePhysicalConditions.forEach((e) => {
        vm.formData.exerciseDurations[e.id] = 0;
      });

      vm.formData.otherTimeSpentDuration = 0;
      vm.formData.createdLocations = [];
      vm.formData.createdQualities = [];

      vm.formData.withDistractionsDuration = null;
      vm.formData.withoutDistractionsDuration = null;
      vm.formData.temperatureValue = null;
      vm.formData.temperatureUnit = null;
      vm.formData.wind = null;
      vm.formData.rain = null;

      // Commands
      vm.formData.verbalCommandsItems = [];
      vm.formData.handGesturalCommandsItems = [];
      vm.formData.whistleLaserCommandsItems = [];

      // TRAINING ONLY
      vm.formData.buildingAssociationTargetRewardDuration = null;
      vm.formData.teachingAlertBehaviourDuration = null;
      vm.formData.teachingReleaseBehaviourDuration = null;
      vm.formData.similarEnvironmentDuration = null;
      vm.formData.generalisationUsingWeatherVarietyDuration = null;
      vm.formData.generalisationUsingScenarioVarietyDuration = null;
      vm.formData.validationSkillAppraisalDuration = null;
      vm.formData.exercisePhysicalConditionItems = [];
      vm.formData.otherTimeSpentDescription = null;
      vm.formData.otherTimeSpentDuration =  null;

      // Guide Seeing Eye ONLY
      vm.formData.guideSeeingAditionalTrainingItems = [];
      vm.formData.trainingTransportationTypeId = null;

      // Scent Detection ONLY
      vm.formData.equipmentWithDistractions = [];
      vm.formData.equipmentWithNoDistractions = [];

      // Racing Greyhound ONLY
      vm.formData.racingGreyhoundActivityItems = [];

      // Setting default collapse
      vm.shownGroup = 'AddSessionGeneral';
    }

    $scope.$on('$ionicView.beforeEnter', function() {

      initForms();

      if ($stateParams.id){
        vm.selectedPet = BagService.get('SelectedPet');
        if (!vm.selectedPet || $stateParams.id != vm.selectedPet.id) {
          showNoSelectedPetMsg();
        }

        if ($stateParams.sessionTypeId) {
          vm.sessionTypeId = $stateParams.sessionTypeId;

          if (vm.selectedPet){
            var subtitle = (vm.sessionTypeId == 1)? translations.AddSessionTraining: translations.AddSessionAssessment;
            vm.title = vm.selectedPet.petSubtype.name + ' - ' + subtitle;

            vm.formData.sessionTypeId = vm.sessionTypeId;
            vm.formData.petSubTypeId =  vm.selectedPet.petSubtypeId;
          }
        } 
   
      }
      else {
        showNoSelectedPetMsg();
      }    
    });    

    function generalFormToObj(formData){

      formData.duration = (formData.durationHours * 60) + (formData.durationMinutes);
  
      formData.distractedByAnimalItems = 
        _.chain(formData.distractedByAnimalItems).keys()
          .value()
          .filter((e)=> { 
            return formData.distractedByAnimalItems[e]==true  
          })
          .map((e) => {
            return { 
              'SpeciesId' : parseInt(e)
            }
        });

      formData.surfacesItems = 
        _.chain(formData.surfacesItems).keys()
          .value()
          .filter((e)=> { 
            return formData.surfacesItems[e]==true  
          })
          .map((e) => {
            return { 
              'SurfaceObstacleId' : parseInt(e)
            }
        });

      formData.createdItems = 
        _.chain(formData.createdItems).keys()
          .value()
          .filter((e)=> { 
            return (
              formData.createdItems[e]==true && 
              formData.createdDurations[e] &&
              formData.createdQualities[e]
              )
          })
          .map((e) => {
            var duration = vm.formData.createdDurations[e];
            var TransportationTypeId = parseInt(e);
            var TravelQuality = vm.formData.createdQualities[e];
            return { 
              'Duration' : (duration)?duration:null,
              'TransportationTypeId' : (TransportationTypeId)?TransportationTypeId:null,
              'TravelQuality' : (TravelQuality)?TravelQuality:null
            }
        });

        formData.otherSkillsDevelopmentItems =
          _.chain(formData.otherSkillsDevelopmentItems).keys()
            .value()
            .filter((e)=> { 
              return formData.otherSkillsDevelopmentItems[e]==true  
            })
            .map((e) => {
              var PetSkillId = parseInt(e);
              var Duration = vm.formData.otherSkillsDevelopmentDurations[e];
              return { 
                'PetSkillId' : (PetSkillId)?PetSkillId:null,
                'Duration' : (Duration)?Duration:null
              }
          });

        formData.petDeviceMethodItems =
          _.chain(formData.petDeviceMethodItems).keys()
            .value()
            .filter((e)=> { 
              return formData.petDeviceMethodItems[e]==true  
            })
            .map((e) => {
              return { 
                'PetDeviceMethodId' : parseInt(e)
              }
          });

         formData.rewardItems =
          _.map(formData.rewardResults,
            (e)=> { 
              return { 
                  'RewardId' : e.id,
                  'Percentage' : e.percentage
                }
            });            

          formData.correctionDeviceItems = 
          _.map(formData.correctionResults,
            (e)=> { 
              return { 
                  'CorrectionDeviceId' : e.id,
                  'Percentage' : e.percentage
                }
            });     

          formData.exercisePhysicalConditionItems = 
          _.chain(formData.exerciseItems).keys()
            .value()
           .filter((e)=> { 
            return (
                formData.exerciseItems[e]==true && 
                formData.exerciseDurations[e] 
              )            
            })                
            .map((e) => {
              var Duration = vm.formData.exerciseDurations[e];
              return { 
                'ExercisePhysicalConditionId' : parseInt(e),
                'Duration' : (Duration)?Duration:null
              }
          });

        formData.guideSeeingAditionalTrainingItems =
          _.chain(formData.guideSeeingAditionalTrainings).keys()
            .value()
           .filter((e)=> { 
              return formData.guideSeeingAditionalTrainings[e]==true  
            })                
            .map((e) => {
              var Duration = vm.formData.exerciseDurations[e];
              return { 
                'GuideSeeingAditionalTrainingId' : parseInt(e)
              }
          });

      // LIVESTOCK

      formData.livestockHerdingWorkTypeItems = 
        _.chain(formData.livestockHerdingWorkTypeItems).keys()
          .value()
          .filter((e)=> { 
            return formData.livestockHerdingWorkTypeItems[e]==true  
          })
          .map((e) => {
            return { 
              'LivestockHerdingDogWorkTypeId' : parseInt(e)
            }
        });

      formData.workWithStockItems = 
        _.chain(formData.workWithStockItems).keys()
          .value()
          .filter((e)=> { 
            return formData.workWithStockItems[e]==true  
          })
          .map((e) => {
            return { 
              'SpeciesId' : parseInt(e)
            }
        });

      return formData;      
    }

    function formValidations(){
      var validationResults = [];

      // setting default values
      validationResults['rewardResults'] = false;
      validationResults['correctionResults'] = false;

      // Rewards Validation
      if (vm.formData.rewardResults && 
          vm.formData.rewardResults.length > 0){

        var rewardResultsSubtotal = 
          _.chain(vm.formData.rewardResults)
          .values().sumBy(function(o) { 
          return o.percentage; 
        }).value();

        if (rewardResultsSubtotal == 100) {
          validationResults['rewardResults'] = true;
        }
        else {

          validationResults['rewardResults'] = false;
          PopupFactory.show('show',{
            title:'',
            template: translations.AddSessionRewardTotalValidation,    
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
      else {
        validationResults['rewardResults'] = true;
      }


      // Correction Validation
      if (vm.formData.correctionResults && 
          vm.formData.correctionResults.length > 0){

        var correctionResultsSubtotal = 
          _.chain(vm.formData.correctionResults)
          .values().sumBy(function(o) { 
          return o.percentage; 
        }).value();

        if (correctionResultsSubtotal == 100) {
          validationResults['correctionResults'] = true;
        }
        else {

          validationResults['correctionResults'] = false;
          PopupFactory.show('show',{
            title:'',
            template: translations.AddSessionCorrectionTotalValidation,    
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
      else {
        validationResults['correctionResults'] = true;
      }

      return (
        validationResults['rewardResults'] && 
        validationResults['correctionResults']);
    }

    function save(formData){
      var newSession = {},
          petId = null;

      if (vm.formValidations()){

        newSession = generalFormToObj(formData);

        LoadingMsg.show();
        PetService.setSession(vm.sessionTypeId, vm.formData.petSubTypeId , vm.selectedPet.id,newSession).then(
          (response) => {
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


    function filterRewardsPercentage(value){
      var subtotal = _.chain(vm.formData.rewardResults).values().sumBy(function(o) { 
        return o.percentage; 
      }).value();  

      if (subtotal){
        return (value + subtotal) <= 100;
      }
      else {
        return true;
      }
    }

    function addReward(reward , percentage){
        if (reward && percentage){

          reward.percentage = percentage;
          vm.formData.rewardResults.push(reward);

          // reset inputs
          vm.formData.selectedReward = null;
          vm.formData.selectedRewardPertentage = null;
        }
    }

    function removeReward(reward){
      _.remove(vm.formData.rewardResults,(e) => { return e==reward});
    }

    function filterCorrectionPercentage(value){
      var subtotal = _.chain(vm.formData.correctionResults).values().sumBy(function(o) { 
        return o.percentage; 
      }).value();  

      if (subtotal){
        return (value + subtotal) <= 100;
      }
      else {
        return true;
      }
    }

    function addCorrection(correction , percentage){
        if (correction && percentage){

          correction.percentage = percentage;
          console.log(correction);
          vm.formData.correctionResults.push(correction);

          // reset inputs
          vm.formData.selectedCorrection = null;
          vm.formData.selectedCorrectionPertentage = null;
        }
    }

    function removeCorrection(reward){
      _.remove(vm.formData.correctionResults,(e) => { return e==reward});
    }

    function percentageDisplay(value){
      return value + ' %';
    }

    function minuteDisplay(value){
      return value + ' min';
    }

    function hourDisplay(value){
      return value + ' hrs';
    }


    function filterLeads(value){
        return (100 - vm.formData.percentageOnLead) == value ;
    }    

    function commandModal() {
      ModalFactory.initModal('templates/command-modal.html', $scope).then(function(modal) {
        vm.commandModal = modal;
      });
    }

    function greyhoundActivityModal() {
      ModalFactory.initModal('templates/greyhound-activity-modal.html', $scope).then(function(modal) {
        vm.greyhoundActivityModal = modal;
      });
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

    function selectedCommandInit(){
      vm.formData.selectedCommand = {};

      vm.formData.verbalCommandsDuration = null;
      vm.formData.selectedVerbalCommand = null;
      vm.formData.handGesturalCommandsDuration = null;
      vm.formData.selectedHandGesturalCommand = null;
      vm.formData.whistleLaserCommandsDuration = null;
      vm.formData.selectedWhistleLaserCommand = null;
    }

    function addCommandDetail(command, commandType){
      selectedCommandInit();

      vm.formData.selectedCommand.id = command.id;
      vm.formData.selectedCommand.name = command.name;
      vm.formData.selectedCommand.commandType = commandType;
      vm.commandModal.show();
    }

    function modalCommandCancel(){
      
      selectedCommandInit();
      vm.commandModal.hide();      
    }


    function selectedGreyhoundActivityInit(){
      vm.formData.selectedGreyhoundActivity = {};

      vm.formData.selectedGreyhoundActivity.repetitions = null;
      vm.formData.selectedGreyhoundActivity.distance  = null;
      vm.formData.selectedGreyhoundActivity.distanceUnit = null;
      vm.formData.selectedGreyhoundActivity.duration  = null;
      vm.formData.selectedGreyhoundActivity.rate  = null;
    }

    function addGreyhoundActivityDetail(command, commandType){
      selectedGreyhoundActivityInit();

      vm.formData.selectedGreyhoundActivity.id = command.id;
      vm.formData.selectedGreyhoundActivity.name = command.name;
      vm.greyhoundActivityModal.show();
    }

    function modalGreyhoundActivityCancel(){
      
      selectedGreyhoundActivityInit();
      
      vm.formData.selectedRacingGreyhoundActivity = null;
      vm.greyhoundActivityModal.hide();      
    }


    function modalVerbalCommandRemove(command){
      _.remove(vm.formData.verbalCommandsItems,(e) => { return e==command});
    }

    function modalHandGesturalCommandRemove(command){
      _.remove(vm.formData.handGesturalCommandsItems,(e) => { return e==command});
    }

    function modalWhistleLaserCommandRemove(command){
      _.remove(vm.formData.whistleLaserCommandsItems,(e) => { return e==command});
    }


    function modalCommandAdd(selectedCommand){
      var newCommand = {
        'Name': selectedCommand.name,
        'Frecuency' :  selectedCommand.frecuency,
        'Duration' :   selectedCommand.duration,
        'TimesRequested' : selectedCommand.timesRequested,
        'TimesComplied' : selectedCommand.timesComplied
      };

      
      if (selectedCommand.commandType == 1){
        // Verbal
        newCommand['VerbalCommandId'] = selectedCommand.id;
        vm.formData.verbalCommandsItems.push(newCommand);
      }
      else if (selectedCommand.commandType == 2){
        // Hand Gestural
        newCommand['HandGesturalCommandId'] = selectedCommand.id;
        vm.formData.handGesturalCommandsItems.push(newCommand);
      }
      else if (selectedCommand.commandType == 3){
        // Whistle Laser 
        newCommand['WhistleLaserCommandId'] = selectedCommand.id;
        vm.formData.whistleLaserCommandsItems.push(newCommand);
      }
      else {
        modalCommandCancel();
      }

      selectedCommandInit();
      vm.commandModal.hide();
    }

    function addEquipment(type, selectedEquipment){
      var newEquipment = {
        'Name': selectedEquipment.name,
        'ScentDetectionOdourId': selectedEquipment.id
      };

      if (type){
        // With Distractions
        vm.formData.equipmentWithDistractions.push(newEquipment);
        vm.formData.selectedEquipmentWithDistraction = null;
      }
      else {
        // With No Distractions
        vm.formData.equipmentWithNoDistractions.push(newEquipment);
        vm.formData.selectedEquipmentWithNoDistraction = null;
      }
    }

    function removeEquipmentItem(type, selectedEquipment){
      if (type){
        // With Distractions
        _.remove(vm.formData.equipmentWithDistractions,(e) => { 
          return e==selectedEquipment;
        });
      }
      else {
        // With No Distractions
        _.remove(vm.formData.equipmentWithNoDistractions,(e) => { 
          return e==selectedEquipment;
        });
      } 
    }

    function addGreyhoundActivity(selectedGreyhoundActivity){
      var newGreyhoundActivity = {
        'Name': selectedGreyhoundActivity.name,
        'RacingGreyhoundActivityId': selectedGreyhoundActivity.id,
        'repetitions': selectedGreyhoundActivity.repetitions || null,
        'distance': selectedGreyhoundActivity.distance || null,
        'distanceUnit': (selectedGreyhoundActivity.distanceUnit == 0)?'0':selectedGreyhoundActivity.distanceUnit,
        'duration': selectedGreyhoundActivity.duration || null,
        'rate': selectedGreyhoundActivity.rate || null
      };

      vm.formData.racingGreyhoundActivityItems.push(newGreyhoundActivity);
      vm.formData.selectedRacingGreyhoundActivity = null;

      selectedGreyhoundActivityInit();
      vm.greyhoundActivityModal.hide();
    }

    function removeGreyhoundActivity(selectedGreyhoundActivity){
      _.remove(vm.formData.racingGreyhoundActivityItems,(e) => { 
        return e==selectedGreyhoundActivity;
      });   
    }    

    function defaultSession(){
      var defaultObj = {
        "peopleEnconteredGender": null,
        "peopleEnconteredAgeRange": null,
        "plannedEncounterNumber": null,
        "plannedEncounterType":   null,
        "plannedEncounterGender": null,
        "plannedEncounterChildren13Number":null,
        "plannedEncounterTeeens1320Number":null,
        "plannedEncounterAdults2065Number":null,
        "plannedEncounterSeniors65Number": null,
        "unplannedEncounterNumber": null,
        "unplannedEncounterType": null,
        "unplannedEncounterGender":null,
        "unpPlannedEncounterChildren13Number": null,
        "unplannedEncounterTeeens1320Number": null ,
        "unplannedEncounterAdults2065Number": null,
        "unplannedEncounterSeniors65Number": null ,
        "dogEncounterNumber":null,
        "dogEncounterRelationshipType":null,
        "dogEncounterType":null,
        "dogEncounterSameBreed":null,
        "distractedByAnimalItems": [],
        "surfacesItems":  [],
        "transportationTypeId": null,
        "transportationDuration": null,
        "transportationDistance": null,
        "transportationDistanceUnit": null,
        "transportationTravelQuality": null,
        "spentTetheredDuration": null,
        "spentTetheredTypeId": null,
        "spentTetheredTravelQuality": null,
        "createdItems": [],
        "observedTime": null,
        "scoredBy": null,
        "verbalCommandsDuration": null,
        "verbalCommandsItems": [ ],
        "handGesturalCommandsDuration": null,
        "handGesturalCommandsItems": [ ],
        "whistleLaserCommandsDuration": null,
        "whistleLaserCommandItems": [ ],
        "otherSkillsDevelopmentDuration": null,
        "otherSkillsDevelopmentItems": [ ] ,
        "petDeviceMethodItems": [ ],
        "rewardItems": [ ],
        "correctionDeviceItem": [  ],
        "sessionLevelId": null, 
        "exercisePhysicalConditionItems": [ ],
        "otherTimeSpentDescription":null,
        "otherTimeSpentDuration": null,
        "guideSeeingAditionalTrainingItems": [ ],
      }
      return defaultObj;
    }


    function showMsgRequiredFieldsError(){
      PopupFactory.show('show',{
        title:'',
        template: translations.AddSessionRequiredFields,    
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
        template: translations.AddSessionMsgSetOk,    
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
        template: translations.AddSessionMsgSetError,    
        buttons: [
          {
            text: translations.CommonOk,
            type:'button-assertive',
            onTap:function(e){}
          }
        ]
      });
    }

    function showNoSelectedPetMsg(){
      PopupFactory.show('show',{
        title:'',
        template: translations.AddSessionMsgGetPetError,    
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


    vm.toggleGroup = function(group) {
      if (vm.isGroupShown(group)) {
        vm.shownGroup = null;
      } else {
        $ionicScrollDelegate.scrollTop();
        vm.shownGroup = group;
      }
    };
    vm.isGroupShown = function(group) {
      return vm.shownGroup === group;
    };


  }

})();

