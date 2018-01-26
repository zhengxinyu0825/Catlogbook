angular.module('app')
.config(RouterConfig);

function RouterConfig($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('intro', {
    url: '/intro',
    templateUrl: 'templates/intro.html'
  })

  .state('login', {
    url: '/login',
    cache:false,
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl as vm',
    resolve:{
      translations: function($translate){
        return $translate([
          "LoginDefaultError",
          "CommonOk","CommonCancel"
        ]);
      }
    }
  })

  .state('signup', {
    url: '/signup',
    cache:false,
    templateUrl: 'templates/signup.html',
    controller: 'SignUpCtrl as vm',
    resolve:{
      translations: function($translate){
        return $translate([
          "SignUpDefaultError",
          "CommonOk","CommonCancel"
        ]);
      }
    }
    })

  .state('forgotPassword', {
    url: '/forgotPassword',
    cache:false,
    templateUrl: 'templates/forgot-password.html',
    controller: 'ForgotPasswordCtrl as vm',
    resolve:{
      translations: function($translate){
        return $translate([
          "ForgotPasswordDefaultError",
          "CommonOk","CommonCancel"
        ]);
      }
    }
    })

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/main-menu.html',
    controller: 'MainCtrl as vm'
  })

  .state('app.home', {
    url: '/home',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html',
        controller:  'HomeCtrl as vm'
      }
    },
    resolve:{
      petTypes: function(PetService){
        return PetService.getTypes();
      },
      userPets: function(UserService){
        return UserService.getPets();
      },
      userInfo: function(UserService){
        return UserService.getUserInfo();
      },
      translations: function($translate){
        return $translate([
          "HomeActionButtonActions","HomeActionButtonSession","HomeActionButtonDeletePet",
          "HomeActionButtonActivity","HomeActionButtonBehaviour",
          "HomeActionButtonSocialisation","HomeActionButtonFeeding",
          "HomeActionButtonActionsTitle","HomeActionButtonSessionTitle",
          "HomeActionButtonHealth","HomeActionButtonHealthTitle","HomeActionRecordTreatment",
          "HomeActionButtonTraining","HomeActionButtonAssessment",
          "HomeActionRecordIllness","HomeActionButtonMore",
          "HomeActionButtonUpdatePet","HomeActionRecordSymptom",
          "HomeActionRecordRestingRespirationRate",
          "AddPetSectionInformation","AddPetSectionBackgroundDetails",
          "AddPetSectionFavActivities","HomeActionButtonAddPet",
          "HomeMsgNoTimelineItems","HomeMsgBreedNotSet",
          "HomeMsgMixedBreed","HomeActionRecordSeizure",
          "DeletePetMsgDeleteError",
          "TaskAlertTitle","TaskAlertError","TaskAlertLater",
          "CommonCancel","CommonDone","CommonOk","CommonYes","CommonNo"
        ]);
      }
    }
  })


 .state('app.petHome', {
    url: '/petHome/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/pet-home.html',
        controller:  'PetHomeCtrl as vm'
      }
    },
    resolve:{
      translations: function($translate){
        return $translate([
          "PetHomeMsgGetPetError",
          "CommonBack","CommonNext","CommonSave",
          "CommonOk","CommonClear","CommonReset","CommonCancel"
        ]);
      }
    }
  })


 .state('app.addPet', {
    url: '/addPet/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/add-pet.html',
        controller:  'AddPetCtrl as vm'
      }
    },
    resolve:{
      petTypes: function(PetService){
        return PetService.getTypes();
      },
      petSubTypes: function(PetService){
        return PetService.getSubTypes();
      },
      petBreeds: function(PetService){
        return PetService.getBreeds();
      },
      translations: function($translate){
        return $translate([
          "AddPetSectionInformation","AddPetSectionBackgroundDetails","AddPetSectionFavActivities",
          "AddPetMsgAddedOk","HomeActionSetPicture","HomeActionTakePhoto","HomeActionPhotoLibrary",
          "AddPetMsgGetPetError","AddPetMsgTotalBreedsPercentageError","AddPetMsgUpdatedOk","AddPetMsgTotalErrorWeight",
          "CommonBack","CommonNext","CommonSave","CommonOk","CommonClear","CommonReset","CommonCancel"
        ]);
      }
    }
  })


 .state('app.seizures', {
    url: '/seizures',
    views: {
      'menuContent': {
        templateUrl: 'templates/seizures.html',
        controller:  'SeizuresCtrl as vm'
      }
    },
    resolve:{
      userPets: function(UserService){
        return UserService.getPets();
      },
      translations: function($translate){
        return $translate([
          "SeizuresTitle","SeizuresMsgGetError","CommonMsgAreYouSure",
          "CommonHours","CommonMinutes",
          "CommonBack","CommonOk","CommonCancel"
        ]);
      }
    }
  })

  .state('app.petSeizure', {
    url: '/petSeizure/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/pet-seizure.html',
        controller:  'PetSeizureCtrl as vm'
      }
    },
    resolve:{
      seizureTestTypes: function(VetService){
        return VetService.getSeizureTestTypes();
      },
      seizureDiagnosis: function(VetService){
        return VetService.getDiagnosis();
      },
      ageFirstTimeSeizures: function(AgeFirstTimeSeizureService){
        return AgeFirstTimeSeizureService.getAll();
      },
      translations: function($translate){
        return $translate([
          "PetSeizureMsgGetPetError","PetSeizureMsgSeizureOk", "PetSeizureMsgSeizureError",
          "PetSeizureMsgVideo",
          "CommonSkip","CommonDone","CommonOk","CommonSave","CommonCancel"
        ]);
      }
    }
  })

  .state('app.addSeizure', {
    url: '/addSeizure/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/add-seizure.html',
        controller:  'AddSeizureCtrl as vm'
      }
    },
    resolve:{
      seizureTypes: function(VetService){
        return VetService.getSeizureTypes();
      },
      seizureSignTypes: function(VetService){
        return VetService.getSeizureSignTypes();
      },
      seizureBodyStates: function(VetService){
        return VetService.getSeizureBodyStates();
      },
      seizureBodyStatePositions: function(VetService){
        return VetService.getSeizureBodyStatePositions();
      },
      seizureAfterSignTypes: function(VetService){
        return VetService.getSeizureAfterSignTypes();
      },
      translations: function($translate){
        return $translate([
          "AddSeizureMsgGetPetError","AddSeizureMsgNoSeizureBackground",
          "AddSeizureMsgSetOk","AddSeizureMsgSetError",
          "PetSeizureMsgVideo",
          "CommonHours","CommonMinutes",
          "CommonSkip","CommonDone","CommonOk","CommonSave","CommonCancel"
        ]);
      }
    }
  })

  .state('app.feeds', {
    url: '/feeds',
    views: {
      'menuContent': {
        templateUrl: 'templates/feeds.html',
        controller:  'FeedsCtrl as vm'
      }
    },
    resolve:{
      userPets: function(UserService){
        return UserService.getPets();
      },
      translations: function($translate){
        return $translate([
          "FeedsGetError","CommonMsgAreYouSure",
          "CommonHours","CommonMinutes",
          "CommonBack","CommonOk","CommonCancel"
        ]);
      }
    }
  })

  .state('app.addFeeding', {
      url: '/addFeeding/:id',
      cache:false,
      views: {
        'menuContent': {
          templateUrl: 'templates/add-feeding.html',
          controller:  'AddFeedingCtrl as vm'
        }
      },
      resolve:{
        userInfo: function(UserService){
          return UserService.getUserInfo();
        },
        feedingTypes: function(FeedingService){
          return FeedingService.getFeedingTypes();
        },
        feedingUnits: function(FeedingService){
          return FeedingService.getFeedingUnits();
        },
        foodTypes: function(FeedingService){
          return FeedingService.getFoodTypes();
        },
        translations: function($translate){
          return $translate([
            "AddFeedingGetCountryError","CommonMsgGetPetError","AddFeedingGetFrecuenciesError",
            "AddFeedingMsgRequiredFields","AddFeedingMsgSetOk","AddFeedingMsgSetError",
            "CommonSkip","CommonDone","CommonOk","CommonUpdate",
            "CommonSave","CommonCancel","CommonNone"
          ]);
        }
      }
    })

  .state('app.behaviours', {
    url: '/behaviours',
    views: {
      'menuContent': {
        templateUrl: 'templates/behaviours.html',
        controller:  'BehavioursCtrl as vm'
      }
    },
    resolve:{
      userPets: function(UserService){
        return UserService.getPets();
      },
      translations: function($translate){
        return $translate([
          "BehavioursTitle","BehavioursMsgGetError",
          "CommonHours","CommonMinutes","CommonMsgAreYouSure",
          "CommonBack","CommonOk","CommonCancel"
        ]);
      }
    }
  })

 .state('app.addBehaviour', {
    url: '/addBehaviour/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/add-behaviour.html',
        controller:  'AddBehaviourCtrl as vm'
      }
    },
    resolve:{
      types: function(BehaviourService){
        return BehaviourService.getTypes();
      },
      observationTypes: function(BehaviourService){
        return BehaviourService.getObservationTypes();
      },
      locationTypes: function(BehaviourService){
        return BehaviourService.getLocationTypes();
      },
      nearResourceTypes: function(BehaviourService){
        return BehaviourService.getNearResourceTypes();
      },
      directedTowards: function(BehaviourService){
        return BehaviourService.getDirectedTowards();
      },
      directedTowardTypes: function(BehaviourService){
        return BehaviourService.getDirectedTowardTypes();
      },
      dogTypes: function(DogTypeService){
        return DogTypeService.getAll();
      },
      destroyedObjects: function(BehaviourService){
        return BehaviourService.getDestroyedObjects();
      },
      behaviourDuringTypes: function(BehaviourService){
        return BehaviourService.getBehaviourDuringTypes();
      },
      humanGenders: function(GenderService){
        return GenderService.getAll()
      },
      species: function(SpeciesService){
        return SpeciesService.getAll();
      },
      translations: function($translate){
        return $translate([
          "AddBehaviourMsgGetPetError","AddBehaviourRequiredFields",
          "AddBehaviourMsgSetOk","AddBehaviourMsgSetError",
          "CommonSkip","CommonDone","CommonOk",
          "CommonSave","CommonCancel","CommonNone"
        ]);
      }
    }
  })


.state('app.socialisations', {
  url: '/socialisations',
  views: {
    'menuContent': {
      templateUrl: 'templates/socialisations.html',
      controller:  'SocialisationsCtrl as vm'
    }
  },
  resolve:{
    userPets: function(UserService){
      return UserService.getPets();
    },
    translations: function($translate){
      return $translate([
        "SocialisationsTitle","SocialisationsMsgGetError",
        "CommonHours","CommonMinutes", "CommonMsgAreYouSure",
        "CommonBack","CommonOk","CommonCancel"
      ]);
    }
  }
})

.state('app.addSocialisation', {
    url: '/addSocialisation/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/add-socialisation.html',
        controller:  'AddSocialisationCtrl as vm'
      }
    },
    resolve:{
      species: function(SpeciesService){
        return SpeciesService.getAll();
      },
      surfaceObstacles: function(CommonService){
        return CommonService.getSurfaceObstacles();
      },
      transportationTypes: function(CommonService){
        return CommonService.getTransportationTypes();
      },
      travelQuality: function(TravelQualityService){
        return TravelQualityService.getAll();
      },
      relationshipTypes: function(RelationshipTypeService){
        return RelationshipTypeService.getAll();
      },
      locationTypes: function(BehaviourService){
        return BehaviourService.getLocationTypes();
      },
      locationSubTypes: function(CommonService){
        return CommonService.getLocationSubTypes();
      },
      humanGenders: function(HumanGenderService){
        return HumanGenderService.getAll();
      },
      ageRanges: function(HumanAgeRangeService){
        return HumanAgeRangeService.getAll();
      },
      distanceUnits: function(DistanceUnitsService){
        return DistanceUnitsService.getAll();
      },
      sounds: function(ReportService){
        return ReportService.getSounds();
      },
      lifeExperiences: function(ReportService){
        return ReportService.getLifeExperiences();
      },
      dogTypes: function(DogTypeService){
        return DogTypeService.getAll();
      },
      translations: function($translate){
        return $translate([
          "AddSocialisationTitle",
          "AddSocialisationMsgGetPetError",
          "AddSocialisationMsgSetOk","AddSocialisationMsgSetError",
          "CommonSkip","CommonDone","CommonOk",
          "CommonSave","CommonCancel","CommonNone"
        ]);
      }
    }
  })

  .state('app.sessions', {
    url: '/sessions',
    views: {
      'menuContent': {
        templateUrl: 'templates/sessions.html'
      }
    },
    resolve:{
      translations: function($translate){
        return $translate([
          "CommonBack","CommonOk","CommonCancel"
        ]);
      }
    }
  })

   .state('app.addSession', {
    url: '/addSession/:id/:sessionTypeId',
    views: {
      'menuContent': {
        templateUrl: 'templates/add-session.html',
        controller:  'AddSessionCtrl as vm'
      }
    },
    resolve:{
      handGesturalCommands: function(SessionService){
        return SessionService.getHandGesturalCommands();
      },
      verbalCommands: function(SessionService){
        return SessionService.getVerbalCommands();
      },
      whistleLaserCommands: function(SessionService){
        return SessionService.getWhistleLaserCommands();
      },
      petSkills: function(SessionService){
        return SessionService.getPetSkills();
      },
      petDeviceMethods: function(SessionService){
        return SessionService.getPetDeviceMethods();
      },
      rewards: function(SessionService){
        return SessionService.getRewards();
      },
      correctionDevices: function(SessionService){
        return SessionService.getCorrectionDevices();
      },
      sessionLevels: function(SessionService){
        return SessionService.getSessionLevels();
      },
      species: function(CommonService){
        return CommonService.getSpecies();
      },
      surfaceObstacles: function(CommonService){
        return CommonService.getSurfaceObstacles();
      },
      transportationTypes: function(CommonService){
        return CommonService.getTransportationTypes();
      },
      travelQuality: function(TravelQualityService){
        return TravelQualityService.getAll();
      },
      relationshipTypes: function(RelationshipTypeService){
        return RelationshipTypeService.getAll();
      },
      locationTypes: function(BehaviourService){
        return BehaviourService.getLocationTypes();
      },
      locationSubTypes: function(CommonService){
        return CommonService.getLocationSubTypes();
      },
      humanGenders: function(HumanGenderService){
        return HumanGenderService.getAll();
      },
      ageRanges: function(HumanAgeRangeService){
        return HumanAgeRangeService.getAll();
      },
      distanceUnits: function(DistanceUnitsService){
        return DistanceUnitsService.getAll();
      },
      commandFrecuencies: function(CommandFrecuencyService){
        return CommandFrecuencyService.getAll();
      },
      exercisePhysicalConditions: function(ExercisePhysicalConditionService){
        return ExercisePhysicalConditionService.getAll();
      },
      guideSeeingAditionalTrainings: function(GuideSeeingAditionalTrainingService){
        return GuideSeeingAditionalTrainingService.getAll();
      },
      temperatureUnits: function(TemperatureUnitsService){
        return TemperatureUnitsService.getAll();
      },
      weatherLevels: function(WeatherLevelsService){
        return WeatherLevelsService.getAll();
      },
      motivationScales: function(MotivationScaleService){
        return MotivationScaleService.getAll();
      },
      confidenceScales: function(ConfidenceScaleService){
        return ConfidenceScaleService.getAll();
      },
      dogTypes: function(DogTypeService){
        return DogTypeService.getAll();
      },
      livestockHerdingWorkTypes: function(SessionService){
        return SessionService.getLivestockHerdingWorkTypes();
      },
      trialTypes: function(TrialTypeService){
        return TrialTypeService.getAll();
      },
      trialRanges: function(TrialRangeService){
        return TrialRangeService.getAll();
      },
      competitionDivisions: function(CompetitionDivisionService){
        return CompetitionDivisionService.getAll();
      },
      competitionAwards: function(CompetitionAwardService){
        return CompetitionAwardService.getAll();
      },
      scentDetectionOdours: function(SessionService){
        return SessionService.getScentDetectionOdours();
      },
      runChaseQualities: function(RunChaseQualityService){
        return RunChaseQualityService.getAll();
      },
      activityElements: function(SessionService){
        return SessionService.getRacingGreyhoundActivityElements();
      },
      racingGreyhoundActivities: function(SessionService){
        return SessionService.getRacingGreyhoundActivities();
      },
      activityRates: function(ActivityRateService){
        return ActivityRateService.getAll();
      },
      translations: function($translate){
        return $translate([
          "AddSessionMsgGetPetError","AddSessionRequiredFields",
          "AddSessionMsgSetOk","AddSessionMsgSetError",
          "AddSessionTraining", "AddSessionAssessment",
          "AddSessionRewardTotalValidation","AddSessionCorrectionTotalValidation",
          "CommonHours","CommonMinutes",
          "CommonSkip","CommonDone","CommonOk",
          "CommonSave","CommonCancel","CommonNone"
        ]);
      }
    }
  })




 .state('app.initialActivityRate', {
    url: '/initialActivityRate/:id',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/initial_activityrate.html',
        controller:  'InitialActivityRateCtrl as vm'
      }
    },
    resolve:{
      activityEvents: function(EventService){
        var reportActivityTypeId = 1;
        return EventService.getByReportType(reportActivityTypeId);
      },
      activityRates: function(ReportService){
        return ReportService.getRates();
      },
      translations: function($translate){
        return $translate([
          "InitialActivityRatePetError","InitialActivityRateMsgOk","InitialActivityRateMsgError",
          "InitialActivityRateMsgPreventBack",
          "CommonBack","CommonNext","CommonSave","CommonOk","CommonCancel"
        ]);
      }
    }
  })


   .state('app.treatments', {
    url: '/treatments',
    cache: false,
    views: {
      'menuContent': {
        templateUrl: 'templates/treatments.html',
        controller:  'TreatmentsCtrl as vm'
      }
    },
    resolve:{
      userPets: function(UserService){
        return UserService.getPets();
      },
      translations: function($translate){
        return $translate([
          "TreatmentsMsgTreatmentsError",
          "CommonOk"
        ]);
      }
    }
  })

  .state('app.addTreatment', {
    url: '/addTreatment/:petId/:treatmentId',
    views: {
      'menuContent': {
        templateUrl: 'templates/add-treatment.html',
        controller:  'AddTreatmentCtrl as vm'
      }
    },
    resolve:{
      treatmentTypes: function(VetService){
        return VetService.getTreatmentTypes();
      },
      translations: function($translate){
        return $translate([
          "AddTreatmentTitle","AddTreatmentDateAdministred","CommonMsgAreYouSure",
          "AddTreatmentTimeAdministred","AddTreatmentDose","AddTreatmentMsgGetPetError",
          "AddTreatmentInstructions", "AddTreatmentAddReminders","AddTreatmentUpdateReminders",
          "AddTreatmentMsgSetError","AddTreatmentMsgTreatmentOk","AddTreatmentMsgGetTreatmentError",
          "AddTreatmentMsgUpdateError","AddTreatmentMsgTreatmentUpdatedOk",
          "CommonBack","CommonDone","CommonSave","CommonOk","CommonUpdate","CommonCancel","CommonClose","CommonRemove"
        ]);
      }
    }
  })

  .state('app.treatmentReminders', {
    url: '/treatmentReminders/:petId/:treatmentId',
    views: {
      'menuContent': {
        templateUrl: 'templates/treatment-reminders.html',
        controller:  'TreatmentReminderCtrl as vm'
      }
    },
    resolve:{
      translations: function($translate){
        return $translate([
          "TreatmentReminderTitle",
          "TreatmentReminderMsgTreatmentRemindersOk","TreatmentReminderMsgSetRemindersError",
          "TreatmentReminderMsgSetNativeRemindersError","TreatmentReminderMsgGetRemindersError",
          "TreatmentReminderMsgTreatmentRemindersRemoveOk","TreatmentReminderMsgRemoveNativeRemindersError",
          "AddTreatmentMsgGetPetError","AddTreatmentMsgGetTreatmentError","TreatmentReminderMsgRemoveRemindersError",
          "CommonBack","CommonDone","CommonSave","CommonOk","CommonCancel"
        ]);
      }
    }
  })

  .state('app.symptoms', {
    url: '/symptoms',
    views: {
      'menuContent': {
        templateUrl: 'templates/symptoms.html',
        controller:  'SymptomsCtrl as vm'
      }
    },
    resolve:{
      userPets: function(UserService){
        return UserService.getPets();
      },
      translations: function($translate){
        return $translate([
          "SymtomsTitle","SymtomsMsgGetError","CommonMsgAreYouSure",
          "CommonHours","CommonMinutes",
          "CommonBack","CommonOk","CommonCancel"
        ]);
      }
    }
  })

  .state('app.addSymptom', {
    url: '/addSymptom/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/add-symptom.html',
        controller:  'AddSymptomCtrl as vm'
      }
    },
    resolve:{
      symptomTypes: function(VetService){
        return VetService.getSymptomTypes();
      },
      symptomFrequencies: function(VetService){
        return VetService.getSymptomFrequencies();
      },
      translations: function($translate){
        return $translate([
          "AddSymtomTitle","AddSymtomSymptomType","AddSymtomSymptomFrequency",
          "AddSymtomMsgSetError","AddSymtomMsgSetOk",
          "CommonBack","CommonDone","CommonSave","CommonOk","CommonCancel"
        ]);
      }
    }
  })

  .state('app.activities', {
    url: '/activities',
    views: {
      'menuContent': {
        templateUrl: 'templates/activities.html',
        controller:  'ActivitiesCtrl as vm'
      }
    },
    resolve:{
      userPets: function(UserService){
        return UserService.getPets();
      },
      translations: function($translate){
        return $translate([
          "ActivitiesTitle","ActivitiesMsgGetError",
          "CommonHours","CommonMinutes",
          "CommonBack","CommonOk","CommonCancel","CommonMsgAreYouSure"
        ]);
      }
    }
  })

  .state('app.addActivity', {
    url: '/addActivity/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/add-activity.html',
        controller:  'AddActivityCtrl as vm'
      }
    },
    resolve:{
      reports: function(EventService){
        return EventService.getAll();
      },
      activityEvents: function(EventService){
        var reportActivityTypeId = 1;
        return EventService.getByReportType(reportActivityTypeId);
      },
      activityRates: function(ReportService){
        return ReportService.getRates();
      },
      translations: function($translate){
        return $translate([
          "AddActivityTitle","AddActivityReportEvent","AddActivityRating","AddActivitySelectActivity",
          "AddActivityComment","AddActivityMsgSetError","AddActivityMsgSetOk",
          "CommonHours","CommonMinutes",  "CommonMsgCompleteFields",
          "CommonBack","CommonSelect","CommonNext","CommonSave","CommonOk","CommonClear","CommonReset","CommonCancel"
        ]);
      }
    }
  })

  .state('app.respirationRates', {
    url: '/respirationRates',
    views: {
      'menuContent': {
        templateUrl: 'templates/respiration-rates.html',
        controller:  'RespirationRatesCtrl as vm'
      }
    },
    resolve:{
      userPets: function(UserService){
        return UserService.getPets();
      },
      translations: function($translate){
        return $translate([
          "RespirationRateTitle","RespirationRateMsgGetError",
          "CommonHours","CommonMinutes","CommonMsgAreYouSure",
          "CommonBack","CommonOk","CommonCancel"
        ]);
      }
    }
  })

  .state('app.addRespirationRate', {
    url: '/addRespirationRate/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/add-respirationRate.html',
        controller:  'AddRespirationRateCtrl as vm'
      }
    },
    resolve:{
      translations: function($translate){
        return $translate([
          "CommonMsgGetPetError",
          "AddRespirationRateBreathFormat",
          "CommonHours","CommonMinutes",
          "AddRespirationRateMsgSetOk","AddRespirationRateMsgSetError",
          "CommonBack","CommonDone","CommonSave","CommonOk","CommonUpdate","CommonCancel","CommonClose"
        ]);
      }
    }
  })

  .state('app.profile', {
    url: '/profile',
    cache:false,
    views: {
      'menuContent': {
        templateUrl: 'templates/profile.html',
        controller:  'ProfileCtrl as vm'
      }
    },
    resolve:{
      countries: function(CommonService){
        return CommonService.getCountries();
      },
      userInfo: function(UserService){
        return UserService.getUserQuestion();
      },
      translations: function($translate){
        return $translate([
          "ProfileTitle","ProfileUpdateCountryError","ProfileUpdateOk",
          "ProfileUpdateError",
          "CommonCancel","CommonUpdate","CommonOk"
        ]);
      }
    }
  })

  .state('app.addProfile', {
    url: '/addProfile',
    views: {
      'menuContent': {
        templateUrl: 'templates/add-profile.html',
        controller:  'AddProfileCtrl as vm'
      }
    },
    resolve:{
      translations: function($translate){
        return $translate([
          "ProfileTitle","ProfileSectionOwner",
          "CommonBack","CommonNext","CommonCancel","CommonDone"
        ]);
      }
    }
  })

  $urlRouterProvider.otherwise(function($injector, $location) {
    var $state = $injector.get('$state');
    var AuthService = $injector.get('AuthService');
    var config = $injector.get('config');

    if(AuthService.isTokenValid()) {
      $state.go(config.homeState);
    } else {
      $state.go(config.loginState);
    }

  });
};
