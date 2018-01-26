

// Modules
"use strict";

angular.module("app.controllers", []);
angular.module("app.directives", []);

angular.module("app", ["ionic", "ngCordova", "app.controllers", "app.directives", "pascalprecht.translate", "ngCookies", "restangular", "angularMoment", "ionic-modal-select"]).run(function ($ionicPlatform, $ionicHistory, $rootScope, GenderService, PopupFactory, LoadingMsg, $state, config) {
  $ionicPlatform.ready(function () {

    // PUSH NOTIFICATIONS

    // Enable to debug issues.
    // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

    var notificationOpenedCallback = function notificationOpenedCallback(jsonData) {
      console.log("didReceiveRemoteNotificationCallBack: " + JSON.stringify(jsonData));
    };

    if (window.plugins && window.plugins.OneSignal) {
      window.plugins.OneSignal.init("3aa02b45-0959-4f9e-a9a5-10a84a06c1c2", { googleProjectNumber: "199529748468" }, notificationOpenedCallback);

      // Show an alert box if a notification comes in when the user is in your app.
      window.plugins.OneSignal.enableInAppAlertNotification(true);
    }

    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

      console.log("STATE: " + fromState.name + " to " + toState.name);

      if (toState.name == "app.home") {
        $ionicHistory.clearHistory();
        $ionicHistory.nextViewOptions({
          disableBack: true,
          historyRoot: true
        });
      }

      LoadingMsg.show();

      if (fromState.name == "app.initialActivityRate" && toState.name == "app.addPet") {
        LoadingMsg.hide();
        event.preventDefault();

        PopupFactory.show("show", {
          title: "",
          template: "If you leave this form now some information could be lost. Are you sure you want to go back? In the udpate dog menu you can review and change your initial ratings.",
          buttons: [{
            text: "Cancel",
            type: "button-outline",
            onTap: function onTap(e) {}
          }, {
            text: "Ok",
            type: "button-assertive",
            onTap: function onTap(e) {
              $state.go(config.homeState);
            }
          }]
        });
      }
    });

    $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {

      LoadingMsg.hide();
    });
  });
}).config(function ($ionicConfigProvider, $httpProvider, $translateProvider, RestangularProvider, config) {

  // Http interceptor.
  // $httpProvider.interceptors.push('HttpInterceptor');

  $ionicConfigProvider.backButton.previousTitleText(false);
  $ionicConfigProvider.views.swipeBackEnabled(false);

  $translateProvider.useStaticFilesLoader({
    prefix: "translations/locale-",
    suffix: ".json"
  });
  $translateProvider.useLocalStorage();
  $translateProvider.preferredLanguage("en");

  // Restangular config
  RestangularProvider.setBaseUrl(config.apiUrl);
  //RestangularProvider.setDefaultHttpFields({cache: true});
});
"use strict";

angular.module("app").config(RouterConfig);

function RouterConfig($stateProvider, $urlRouterProvider) {

  $stateProvider.state("intro", {
    url: "/intro",
    templateUrl: "templates/intro.html"
  }).state("login", {
    url: "/login",
    cache: false,
    templateUrl: "templates/login.html",
    controller: "LoginCtrl as vm",
    resolve: {
      translations: function translations($translate) {
        return $translate(["LoginDefaultError", "CommonOk", "CommonCancel"]);
      }
    }
  }).state("signup", {
    url: "/signup",
    cache: false,
    templateUrl: "templates/signup.html",
    controller: "SignUpCtrl as vm",
    resolve: {
      translations: function translations($translate) {
        return $translate(["SignUpDefaultError", "CommonOk", "CommonCancel"]);
      }
    }
  }).state("forgotPassword", {
    url: "/forgotPassword",
    cache: false,
    templateUrl: "templates/forgot-password.html",
    controller: "ForgotPasswordCtrl as vm",
    resolve: {
      translations: function translations($translate) {
        return $translate(["ForgotPasswordDefaultError", "CommonOk", "CommonCancel"]);
      }
    }
  }).state("app", {
    url: "/app",
    abstract: true,
    templateUrl: "templates/main-menu.html",
    controller: "MainCtrl as vm"
  }).state("app.home", {
    url: "/home",
    cache: false,
    views: {
      menuContent: {
        templateUrl: "templates/home.html",
        controller: "HomeCtrl as vm"
      }
    },
    resolve: {
      petTypes: function petTypes(PetService) {
        return PetService.getTypes();
      },
      userPets: function userPets(UserService) {
        return UserService.getPets();
      },
      userInfo: function userInfo(UserService) {
        return UserService.getUserInfo();
      },
      translations: function translations($translate) {
        return $translate(["HomeActionButtonActions", "HomeActionButtonSession", "HomeActionButtonDeletePet", "HomeActionButtonActivity", "HomeActionButtonBehaviour", "HomeActionButtonSocialisation", "HomeActionButtonFeeding", "HomeActionButtonActionsTitle", "HomeActionButtonSessionTitle", "HomeActionButtonHealth", "HomeActionButtonHealthTitle", "HomeActionRecordTreatment", "HomeActionButtonTraining", "HomeActionButtonAssessment", "HomeActionRecordIllness", "HomeActionButtonMore", "HomeActionButtonUpdatePet", "HomeActionRecordSymptom", "HomeActionRecordRestingRespirationRate", "AddPetSectionInformation", "AddPetSectionBackgroundDetails", "AddPetSectionFavActivities", "HomeActionButtonAddPet", "HomeMsgNoTimelineItems", "HomeMsgBreedNotSet", "HomeMsgMixedBreed", "HomeActionRecordSeizure", "DeletePetMsgDeleteError", "TaskAlertTitle", "TaskAlertError", "TaskAlertLater", "CommonCancel", "CommonDone", "CommonOk", "CommonYes", "CommonNo"]);
      }
    }
  }).state("app.petHome", {
    url: "/petHome/:id",
    views: {
      menuContent: {
        templateUrl: "templates/pet-home.html",
        controller: "PetHomeCtrl as vm"
      }
    },
    resolve: {
      translations: function translations($translate) {
        return $translate(["PetHomeMsgGetPetError", "CommonBack", "CommonNext", "CommonSave", "CommonOk", "CommonClear", "CommonReset", "CommonCancel"]);
      }
    }
  }).state("app.addPet", {
    url: "/addPet/:id",
    views: {
      menuContent: {
        templateUrl: "templates/add-pet.html",
        controller: "AddPetCtrl as vm"
      }
    },
    resolve: {
      petTypes: function petTypes(PetService) {
        return PetService.getTypes();
      },
      petSubTypes: function petSubTypes(PetService) {
        return PetService.getSubTypes();
      },
      petBreeds: function petBreeds(PetService) {
        return PetService.getBreeds();
      },
      translations: function translations($translate) {
        return $translate(["AddPetSectionInformation", "AddPetSectionBackgroundDetails", "AddPetSectionFavActivities", "AddPetMsgAddedOk", "HomeActionSetPicture", "HomeActionTakePhoto", "HomeActionPhotoLibrary", "AddPetMsgGetPetError", "AddPetMsgTotalBreedsPercentageError", "AddPetMsgUpdatedOk", "AddPetMsgTotalErrorWeight", "CommonBack", "CommonNext", "CommonSave", "CommonOk", "CommonClear", "CommonReset", "CommonCancel"]);
      }
    }
  }).state("app.seizures", {
    url: "/seizures",
    views: {
      menuContent: {
        templateUrl: "templates/seizures.html",
        controller: "SeizuresCtrl as vm"
      }
    },
    resolve: {
      userPets: function userPets(UserService) {
        return UserService.getPets();
      },
      translations: function translations($translate) {
        return $translate(["SeizuresTitle", "SeizuresMsgGetError", "CommonMsgAreYouSure", "CommonHours", "CommonMinutes", "CommonBack", "CommonOk", "CommonCancel"]);
      }
    }
  }).state("app.petSeizure", {
    url: "/petSeizure/:id",
    views: {
      menuContent: {
        templateUrl: "templates/pet-seizure.html",
        controller: "PetSeizureCtrl as vm"
      }
    },
    resolve: {
      seizureTestTypes: function seizureTestTypes(VetService) {
        return VetService.getSeizureTestTypes();
      },
      seizureDiagnosis: function seizureDiagnosis(VetService) {
        return VetService.getDiagnosis();
      },
      ageFirstTimeSeizures: function ageFirstTimeSeizures(AgeFirstTimeSeizureService) {
        return AgeFirstTimeSeizureService.getAll();
      },
      translations: function translations($translate) {
        return $translate(["PetSeizureMsgGetPetError", "PetSeizureMsgSeizureOk", "PetSeizureMsgSeizureError", "PetSeizureMsgVideo", "CommonSkip", "CommonDone", "CommonOk", "CommonSave", "CommonCancel"]);
      }
    }
  }).state("app.addSeizure", {
    url: "/addSeizure/:id",
    views: {
      menuContent: {
        templateUrl: "templates/add-seizure.html",
        controller: "AddSeizureCtrl as vm"
      }
    },
    resolve: {
      seizureTypes: function seizureTypes(VetService) {
        return VetService.getSeizureTypes();
      },
      seizureSignTypes: function seizureSignTypes(VetService) {
        return VetService.getSeizureSignTypes();
      },
      seizureBodyStates: function seizureBodyStates(VetService) {
        return VetService.getSeizureBodyStates();
      },
      seizureBodyStatePositions: function seizureBodyStatePositions(VetService) {
        return VetService.getSeizureBodyStatePositions();
      },
      seizureAfterSignTypes: function seizureAfterSignTypes(VetService) {
        return VetService.getSeizureAfterSignTypes();
      },
      translations: function translations($translate) {
        return $translate(["AddSeizureMsgGetPetError", "AddSeizureMsgNoSeizureBackground", "AddSeizureMsgSetOk", "AddSeizureMsgSetError", "PetSeizureMsgVideo", "CommonHours", "CommonMinutes", "CommonSkip", "CommonDone", "CommonOk", "CommonSave", "CommonCancel"]);
      }
    }
  }).state("app.feeds", {
    url: "/feeds",
    views: {
      menuContent: {
        templateUrl: "templates/feeds.html",
        controller: "FeedsCtrl as vm"
      }
    },
    resolve: {
      userPets: function userPets(UserService) {
        return UserService.getPets();
      },
      translations: function translations($translate) {
        return $translate(["FeedsGetError", "CommonMsgAreYouSure", "CommonHours", "CommonMinutes", "CommonBack", "CommonOk", "CommonCancel"]);
      }
    }
  }).state("app.addFeeding", {
    url: "/addFeeding/:id",
    cache: false,
    views: {
      menuContent: {
        templateUrl: "templates/add-feeding.html",
        controller: "AddFeedingCtrl as vm"
      }
    },
    resolve: {
      userInfo: function userInfo(UserService) {
        return UserService.getUserInfo();
      },
      feedingTypes: function feedingTypes(FeedingService) {
        return FeedingService.getFeedingTypes();
      },
      feedingUnits: function feedingUnits(FeedingService) {
        return FeedingService.getFeedingUnits();
      },
      foodTypes: function foodTypes(FeedingService) {
        return FeedingService.getFoodTypes();
      },
      translations: function translations($translate) {
        return $translate(["AddFeedingGetCountryError", "CommonMsgGetPetError", "AddFeedingGetFrecuenciesError", "AddFeedingMsgRequiredFields", "AddFeedingMsgSetOk", "AddFeedingMsgSetError", "CommonSkip", "CommonDone", "CommonOk", "CommonUpdate", "CommonSave", "CommonCancel", "CommonNone"]);
      }
    }
  }).state("app.behaviours", {
    url: "/behaviours",
    views: {
      menuContent: {
        templateUrl: "templates/behaviours.html",
        controller: "BehavioursCtrl as vm"
      }
    },
    resolve: {
      userPets: function userPets(UserService) {
        return UserService.getPets();
      },
      translations: function translations($translate) {
        return $translate(["BehavioursTitle", "BehavioursMsgGetError", "CommonHours", "CommonMinutes", "CommonMsgAreYouSure", "CommonBack", "CommonOk", "CommonCancel"]);
      }
    }
  }).state("app.addBehaviour", {
    url: "/addBehaviour/:id",
    views: {
      menuContent: {
        templateUrl: "templates/add-behaviour.html",
        controller: "AddBehaviourCtrl as vm"
      }
    },
    resolve: {
      types: function types(BehaviourService) {
        return BehaviourService.getTypes();
      },
      observationTypes: function observationTypes(BehaviourService) {
        return BehaviourService.getObservationTypes();
      },
      locationTypes: function locationTypes(BehaviourService) {
        return BehaviourService.getLocationTypes();
      },
      nearResourceTypes: function nearResourceTypes(BehaviourService) {
        return BehaviourService.getNearResourceTypes();
      },
      directedTowards: function directedTowards(BehaviourService) {
        return BehaviourService.getDirectedTowards();
      },
      directedTowardTypes: function directedTowardTypes(BehaviourService) {
        return BehaviourService.getDirectedTowardTypes();
      },
      dogTypes: function dogTypes(DogTypeService) {
        return DogTypeService.getAll();
      },
      destroyedObjects: function destroyedObjects(BehaviourService) {
        return BehaviourService.getDestroyedObjects();
      },
      behaviourDuringTypes: function behaviourDuringTypes(BehaviourService) {
        return BehaviourService.getBehaviourDuringTypes();
      },
      humanGenders: function humanGenders(GenderService) {
        return GenderService.getAll();
      },
      species: function species(SpeciesService) {
        return SpeciesService.getAll();
      },
      translations: function translations($translate) {
        return $translate(["AddBehaviourMsgGetPetError", "AddBehaviourRequiredFields", "AddBehaviourMsgSetOk", "AddBehaviourMsgSetError", "CommonSkip", "CommonDone", "CommonOk", "CommonSave", "CommonCancel", "CommonNone"]);
      }
    }
  }).state("app.socialisations", {
    url: "/socialisations",
    views: {
      menuContent: {
        templateUrl: "templates/socialisations.html",
        controller: "SocialisationsCtrl as vm"
      }
    },
    resolve: {
      userPets: function userPets(UserService) {
        return UserService.getPets();
      },
      translations: function translations($translate) {
        return $translate(["SocialisationsTitle", "SocialisationsMsgGetError", "CommonHours", "CommonMinutes", "CommonMsgAreYouSure", "CommonBack", "CommonOk", "CommonCancel"]);
      }
    }
  }).state("app.addSocialisation", {
    url: "/addSocialisation/:id",
    views: {
      menuContent: {
        templateUrl: "templates/add-socialisation.html",
        controller: "AddSocialisationCtrl as vm"
      }
    },
    resolve: {
      species: function species(SpeciesService) {
        return SpeciesService.getAll();
      },
      surfaceObstacles: function surfaceObstacles(CommonService) {
        return CommonService.getSurfaceObstacles();
      },
      transportationTypes: function transportationTypes(CommonService) {
        return CommonService.getTransportationTypes();
      },
      travelQuality: function travelQuality(TravelQualityService) {
        return TravelQualityService.getAll();
      },
      relationshipTypes: function relationshipTypes(RelationshipTypeService) {
        return RelationshipTypeService.getAll();
      },
      locationTypes: function locationTypes(BehaviourService) {
        return BehaviourService.getLocationTypes();
      },
      locationSubTypes: function locationSubTypes(CommonService) {
        return CommonService.getLocationSubTypes();
      },
      humanGenders: function humanGenders(HumanGenderService) {
        return HumanGenderService.getAll();
      },
      ageRanges: function ageRanges(HumanAgeRangeService) {
        return HumanAgeRangeService.getAll();
      },
      distanceUnits: function distanceUnits(DistanceUnitsService) {
        return DistanceUnitsService.getAll();
      },
      sounds: function sounds(ReportService) {
        return ReportService.getSounds();
      },
      lifeExperiences: function lifeExperiences(ReportService) {
        return ReportService.getLifeExperiences();
      },
      dogTypes: function dogTypes(DogTypeService) {
        return DogTypeService.getAll();
      },
      translations: function translations($translate) {
        return $translate(["AddSocialisationTitle", "AddSocialisationMsgGetPetError", "AddSocialisationMsgSetOk", "AddSocialisationMsgSetError", "CommonSkip", "CommonDone", "CommonOk", "CommonSave", "CommonCancel", "CommonNone"]);
      }
    }
  }).state("app.sessions", {
    url: "/sessions",
    views: {
      menuContent: {
        templateUrl: "templates/sessions.html"
      }
    },
    resolve: {
      translations: function translations($translate) {
        return $translate(["CommonBack", "CommonOk", "CommonCancel"]);
      }
    }
  }).state("app.addSession", {
    url: "/addSession/:id/:sessionTypeId",
    views: {
      menuContent: {
        templateUrl: "templates/add-session.html",
        controller: "AddSessionCtrl as vm"
      }
    },
    resolve: {
      handGesturalCommands: function handGesturalCommands(SessionService) {
        return SessionService.getHandGesturalCommands();
      },
      verbalCommands: function verbalCommands(SessionService) {
        return SessionService.getVerbalCommands();
      },
      whistleLaserCommands: function whistleLaserCommands(SessionService) {
        return SessionService.getWhistleLaserCommands();
      },
      petSkills: function petSkills(SessionService) {
        return SessionService.getPetSkills();
      },
      petDeviceMethods: function petDeviceMethods(SessionService) {
        return SessionService.getPetDeviceMethods();
      },
      rewards: function rewards(SessionService) {
        return SessionService.getRewards();
      },
      correctionDevices: function correctionDevices(SessionService) {
        return SessionService.getCorrectionDevices();
      },
      sessionLevels: function sessionLevels(SessionService) {
        return SessionService.getSessionLevels();
      },
      species: function species(CommonService) {
        return CommonService.getSpecies();
      },
      surfaceObstacles: function surfaceObstacles(CommonService) {
        return CommonService.getSurfaceObstacles();
      },
      transportationTypes: function transportationTypes(CommonService) {
        return CommonService.getTransportationTypes();
      },
      travelQuality: function travelQuality(TravelQualityService) {
        return TravelQualityService.getAll();
      },
      relationshipTypes: function relationshipTypes(RelationshipTypeService) {
        return RelationshipTypeService.getAll();
      },
      locationTypes: function locationTypes(BehaviourService) {
        return BehaviourService.getLocationTypes();
      },
      locationSubTypes: function locationSubTypes(CommonService) {
        return CommonService.getLocationSubTypes();
      },
      humanGenders: function humanGenders(HumanGenderService) {
        return HumanGenderService.getAll();
      },
      ageRanges: function ageRanges(HumanAgeRangeService) {
        return HumanAgeRangeService.getAll();
      },
      distanceUnits: function distanceUnits(DistanceUnitsService) {
        return DistanceUnitsService.getAll();
      },
      commandFrecuencies: function commandFrecuencies(CommandFrecuencyService) {
        return CommandFrecuencyService.getAll();
      },
      exercisePhysicalConditions: function exercisePhysicalConditions(ExercisePhysicalConditionService) {
        return ExercisePhysicalConditionService.getAll();
      },
      guideSeeingAditionalTrainings: function guideSeeingAditionalTrainings(GuideSeeingAditionalTrainingService) {
        return GuideSeeingAditionalTrainingService.getAll();
      },
      temperatureUnits: function temperatureUnits(TemperatureUnitsService) {
        return TemperatureUnitsService.getAll();
      },
      weatherLevels: function weatherLevels(WeatherLevelsService) {
        return WeatherLevelsService.getAll();
      },
      motivationScales: function motivationScales(MotivationScaleService) {
        return MotivationScaleService.getAll();
      },
      confidenceScales: function confidenceScales(ConfidenceScaleService) {
        return ConfidenceScaleService.getAll();
      },
      dogTypes: function dogTypes(DogTypeService) {
        return DogTypeService.getAll();
      },
      livestockHerdingWorkTypes: function livestockHerdingWorkTypes(SessionService) {
        return SessionService.getLivestockHerdingWorkTypes();
      },
      trialTypes: function trialTypes(TrialTypeService) {
        return TrialTypeService.getAll();
      },
      trialRanges: function trialRanges(TrialRangeService) {
        return TrialRangeService.getAll();
      },
      competitionDivisions: function competitionDivisions(CompetitionDivisionService) {
        return CompetitionDivisionService.getAll();
      },
      competitionAwards: function competitionAwards(CompetitionAwardService) {
        return CompetitionAwardService.getAll();
      },
      scentDetectionOdours: function scentDetectionOdours(SessionService) {
        return SessionService.getScentDetectionOdours();
      },
      runChaseQualities: function runChaseQualities(RunChaseQualityService) {
        return RunChaseQualityService.getAll();
      },
      activityElements: function activityElements(SessionService) {
        return SessionService.getRacingGreyhoundActivityElements();
      },
      racingGreyhoundActivities: function racingGreyhoundActivities(SessionService) {
        return SessionService.getRacingGreyhoundActivities();
      },
      activityRates: function activityRates(ActivityRateService) {
        return ActivityRateService.getAll();
      },
      translations: function translations($translate) {
        return $translate(["AddSessionMsgGetPetError", "AddSessionRequiredFields", "AddSessionMsgSetOk", "AddSessionMsgSetError", "AddSessionTraining", "AddSessionAssessment", "AddSessionRewardTotalValidation", "AddSessionCorrectionTotalValidation", "CommonHours", "CommonMinutes", "CommonSkip", "CommonDone", "CommonOk", "CommonSave", "CommonCancel", "CommonNone"]);
      }
    }
  }).state("app.initialActivityRate", {
    url: "/initialActivityRate/:id",
    cache: false,
    views: {
      menuContent: {
        templateUrl: "templates/initial_activityrate.html",
        controller: "InitialActivityRateCtrl as vm"
      }
    },
    resolve: {
      activityEvents: function activityEvents(EventService) {
        var reportActivityTypeId = 1;
        return EventService.getByReportType(reportActivityTypeId);
      },
      activityRates: function activityRates(ReportService) {
        return ReportService.getRates();
      },
      translations: function translations($translate) {
        return $translate(["InitialActivityRatePetError", "InitialActivityRateMsgOk", "InitialActivityRateMsgError", "InitialActivityRateMsgPreventBack", "CommonBack", "CommonNext", "CommonSave", "CommonOk", "CommonCancel"]);
      }
    }
  }).state("app.treatments", {
    url: "/treatments",
    cache: false,
    views: {
      menuContent: {
        templateUrl: "templates/treatments.html",
        controller: "TreatmentsCtrl as vm"
      }
    },
    resolve: {
      userPets: function userPets(UserService) {
        return UserService.getPets();
      },
      translations: function translations($translate) {
        return $translate(["TreatmentsMsgTreatmentsError", "CommonOk"]);
      }
    }
  }).state("app.addTreatment", {
    url: "/addTreatment/:petId/:treatmentId",
    views: {
      menuContent: {
        templateUrl: "templates/add-treatment.html",
        controller: "AddTreatmentCtrl as vm"
      }
    },
    resolve: {
      treatmentTypes: function treatmentTypes(VetService) {
        return VetService.getTreatmentTypes();
      },
      translations: function translations($translate) {
        return $translate(["AddTreatmentTitle", "AddTreatmentDateAdministred", "CommonMsgAreYouSure", "AddTreatmentTimeAdministred", "AddTreatmentDose", "AddTreatmentMsgGetPetError", "AddTreatmentInstructions", "AddTreatmentAddReminders", "AddTreatmentUpdateReminders", "AddTreatmentMsgSetError", "AddTreatmentMsgTreatmentOk", "AddTreatmentMsgGetTreatmentError", "AddTreatmentMsgUpdateError", "AddTreatmentMsgTreatmentUpdatedOk", "CommonBack", "CommonDone", "CommonSave", "CommonOk", "CommonUpdate", "CommonCancel", "CommonClose", "CommonRemove"]);
      }
    }
  }).state("app.treatmentReminders", {
    url: "/treatmentReminders/:petId/:treatmentId",
    views: {
      menuContent: {
        templateUrl: "templates/treatment-reminders.html",
        controller: "TreatmentReminderCtrl as vm"
      }
    },
    resolve: {
      translations: function translations($translate) {
        return $translate(["TreatmentReminderTitle", "TreatmentReminderMsgTreatmentRemindersOk", "TreatmentReminderMsgSetRemindersError", "TreatmentReminderMsgSetNativeRemindersError", "TreatmentReminderMsgGetRemindersError", "TreatmentReminderMsgTreatmentRemindersRemoveOk", "TreatmentReminderMsgRemoveNativeRemindersError", "AddTreatmentMsgGetPetError", "AddTreatmentMsgGetTreatmentError", "TreatmentReminderMsgRemoveRemindersError", "CommonBack", "CommonDone", "CommonSave", "CommonOk", "CommonCancel"]);
      }
    }
  }).state("app.symptoms", {
    url: "/symptoms",
    views: {
      menuContent: {
        templateUrl: "templates/symptoms.html",
        controller: "SymptomsCtrl as vm"
      }
    },
    resolve: {
      userPets: function userPets(UserService) {
        return UserService.getPets();
      },
      translations: function translations($translate) {
        return $translate(["SymtomsTitle", "SymtomsMsgGetError", "CommonMsgAreYouSure", "CommonHours", "CommonMinutes", "CommonBack", "CommonOk", "CommonCancel"]);
      }
    }
  }).state("app.addSymptom", {
    url: "/addSymptom/:id",
    views: {
      menuContent: {
        templateUrl: "templates/add-symptom.html",
        controller: "AddSymptomCtrl as vm"
      }
    },
    resolve: {
      symptomTypes: function symptomTypes(VetService) {
        return VetService.getSymptomTypes();
      },
      symptomFrequencies: function symptomFrequencies(VetService) {
        return VetService.getSymptomFrequencies();
      },
      translations: function translations($translate) {
        return $translate(["AddSymtomTitle", "AddSymtomSymptomType", "AddSymtomSymptomFrequency", "AddSymtomMsgSetError", "AddSymtomMsgSetOk", "CommonBack", "CommonDone", "CommonSave", "CommonOk", "CommonCancel"]);
      }
    }
  }).state("app.activities", {
    url: "/activities",
    views: {
      menuContent: {
        templateUrl: "templates/activities.html",
        controller: "ActivitiesCtrl as vm"
      }
    },
    resolve: {
      userPets: function userPets(UserService) {
        return UserService.getPets();
      },
      translations: function translations($translate) {
        return $translate(["ActivitiesTitle", "ActivitiesMsgGetError", "CommonHours", "CommonMinutes", "CommonBack", "CommonOk", "CommonCancel", "CommonMsgAreYouSure"]);
      }
    }
  }).state("app.addActivity", {
    url: "/addActivity/:id",
    views: {
      menuContent: {
        templateUrl: "templates/add-activity.html",
        controller: "AddActivityCtrl as vm"
      }
    },
    resolve: {
      reports: function reports(EventService) {
        return EventService.getAll();
      },
      activityEvents: function activityEvents(EventService) {
        var reportActivityTypeId = 1;
        return EventService.getByReportType(reportActivityTypeId);
      },
      activityRates: function activityRates(ReportService) {
        return ReportService.getRates();
      },
      translations: function translations($translate) {
        return $translate(["AddActivityTitle", "AddActivityReportEvent", "AddActivityRating", "AddActivitySelectActivity", "AddActivityComment", "AddActivityMsgSetError", "AddActivityMsgSetOk", "CommonHours", "CommonMinutes", "CommonMsgCompleteFields", "CommonBack", "CommonSelect", "CommonNext", "CommonSave", "CommonOk", "CommonClear", "CommonReset", "CommonCancel"]);
      }
    }
  }).state("app.respirationRates", {
    url: "/respirationRates",
    views: {
      menuContent: {
        templateUrl: "templates/respiration-rates.html",
        controller: "RespirationRatesCtrl as vm"
      }
    },
    resolve: {
      userPets: function userPets(UserService) {
        return UserService.getPets();
      },
      translations: function translations($translate) {
        return $translate(["RespirationRateTitle", "RespirationRateMsgGetError", "CommonHours", "CommonMinutes", "CommonMsgAreYouSure", "CommonBack", "CommonOk", "CommonCancel"]);
      }
    }
  }).state("app.addRespirationRate", {
    url: "/addRespirationRate/:id",
    views: {
      menuContent: {
        templateUrl: "templates/add-respirationRate.html",
        controller: "AddRespirationRateCtrl as vm"
      }
    },
    resolve: {
      translations: function translations($translate) {
        return $translate(["CommonMsgGetPetError", "AddRespirationRateBreathFormat", "CommonHours", "CommonMinutes", "AddRespirationRateMsgSetOk", "AddRespirationRateMsgSetError", "CommonBack", "CommonDone", "CommonSave", "CommonOk", "CommonUpdate", "CommonCancel", "CommonClose"]);
      }
    }
  }).state("app.profile", {
    url: "/profile",
    cache: false,
    views: {
      menuContent: {
        templateUrl: "templates/profile.html",
        controller: "ProfileCtrl as vm"
      }
    },
    resolve: {
      countries: function countries(CommonService) {
        return CommonService.getCountries();
      },
      userInfo: function userInfo(UserService) {
        return UserService.getUserQuestion();
      },
      translations: function translations($translate) {
        return $translate(["ProfileTitle", "ProfileUpdateCountryError", "ProfileUpdateOk", "ProfileUpdateError", "CommonCancel", "CommonUpdate", "CommonOk"]);
      }
    }
  }).state("app.addProfile", {
    url: "/addProfile",
    views: {
      menuContent: {
        templateUrl: "templates/add-profile.html",
        controller: "AddProfileCtrl as vm"
      }
    },
    resolve: {
      translations: function translations($translate) {
        return $translate(["ProfileTitle", "ProfileSectionOwner", "CommonBack", "CommonNext", "CommonCancel", "CommonDone"]);
      }
    }
  });

  $urlRouterProvider.otherwise(function ($injector, $location) {
    var $state = $injector.get("$state");
    var AuthService = $injector.get("AuthService");
    var config = $injector.get("config");

    if (AuthService.isTokenValid()) {
      $state.go(config.homeState);
    } else {
      $state.go(config.loginState);
    }
  });
};
"use strict";

var AppSettings = {
  env: "prod",
  apiUrl: "https://api.doglogbook.com/api",
  analytics: true
};
"use strict";

(function () {
  "use strict";

  angular.module("app").constant("config", {
    version: "1.0",
    apiUrl: AppSettings.apiUrl,
    analytics: AppSettings.analytics,
    apiDateFormat: "yyyy-MM-dd",
    dateFormat: "YYYY-MM-DD",
    timeFormat: "HH:mm",
    apiDateTimeFormat: "YYYY-MM-DD HH:mm",
    minValidDate: "1900-01-01",
    maxActivityDurationMin: 120,
    maxSeizureDurationMin: 120,
    maxSessionDurationMin: 180,
    maxRecentLogsNumber: 5,
    homeState: "app.home",
    loginState: "login",
    languages: [{ code: "en", name: "SettingsLanguageEnglish", "default": true }, { code: "es", name: "SettingsLanguageSpanish" }, { code: "fr", name: "SettingsLanguageFrench" }]
  });
})();
"use strict";

(function () {

    angular.module("app.directives").directive("back", ["$window", function ($window) {
        return {
            restrict: "A",
            link: function link(scope, elem, attrs) {
                elem.bind("click", function () {
                    $window.history.back();
                });
            }
        };
    }]);
})();
"use strict";

(function () {

  angular.module("app.directives").directive("defaultSrc", function () {
    return {
      link: function link(scope, element, attrs) {

        scope.$watch(function () {
          return attrs.ngSrc;
        }, function (value) {
          if (!value) {
            element.attr("src", attrs.defaultSrc);
          }
        });

        element.bind("error", function () {
          element.attr("src", attrs.defaultSrc);
        });
      }
    };
  });
})();
"use strict";

(function () {

  angular.module("app.directives").directive("groupedRadio", function () {
    return {
      restrict: "A",
      require: "ngModel",
      scope: {
        model: "=ngModel",
        value: "=groupedRadio"
      },
      link: function link(scope, element, attrs, ngModelCtrl) {
        element.addClass("button");
        element.on("click", function (e) {
          scope.$apply(function () {
            ngModelCtrl.$setViewValue(scope.value);
          });
        });

        scope.$watch("model", function (newVal) {
          element.addClass("button-outline");

          if (newVal === scope.value) {
            element.removeClass("button-outline");
          }
        });
      }
    };
  });
})();
"use strict";

(function () {

  angular.module("app.directives").directive("hscroller", ["$timeout", function ($timeout) {
    return {
      restrict: "E",
      template: "<div class=\"hscroller\" ng-transclude></div>",
      replace: true,
      transclude: true,

      compile: function compile(element, attr) {
        return function ($scope, $element, $attr) {

          var el = $element[0];
          angular.element($element).bind("scroll", function () {
            var left = $element[0].scrollLeft;
            // console.log($element.childNodes);
          });
        };
      }
    };
  }]).directive("hcard", ["$rootScope", function ($rootScope) {
    return {
      restrict: "E",
      template: "<div class=\"hscroller-card\" ng-transclude ng-click=\"cardClick()\" ng-class=\"{activePanel : activeIndex == index}\"></div>",
      replace: true,
      transclude: true,
      scope: {
        desc: "@",
        image: "@",
        index: "@",
        activeIndex: "@",
        cardClick: "&"
      },
      link: function link(scope, element, attrs) {
        var img = angular.element("<img class='hscroller-img' src='" + attrs.image + "' default-src='https://res.cloudinary.com/statsone/image/upload/v1461384696/dlb/pet/jn.png'/>");
        element.append(img);
        element.append("            <div class=\"hscroller-extra\">             <span class=\"right\">" + attrs.age + "</span>             <span class=\"left\">" + attrs.gender + "</span>             </div>");
        element.append("            <div class=\"hscroller-label cat-" + attrs.category + "\">             <b>" + attrs.name + "</b> </br>             <span>" + attrs.desc + "</span>             </div>");
        var animationClass = "hscroller-card-animated-" + attrs.index.toString();
        element.addClass(animationClass);
      } };
  }]);
})();
"use strict";

(function () {

  angular.module("app.directives").directive("sessionGeneralSection", function ($compile) {
    return {
      restrict: "E",
      scope: false,
      templateUrl: "templates/session-section-general.html",
      replace: true,
      link: function link($scope, elem, attr, ctrl) {}
    };
  }).directive("sessionExposureSocializationSection", function ($compile) {
    return {
      restrict: "E",
      scope: false,
      templateUrl: "templates/session-section-exposuresocialization.html",
      replace: true,
      link: function link($scope, elem, attr, ctrl) {}
    };
  }).directive("sessionObedienceControlSection", function ($compile) {
    return {
      restrict: "E",
      scope: false,
      templateUrl: "templates/session-obedience-control-section.html",
      replace: true,
      link: function link($scope, elem, attr, ctrl) {}
    };
  }).directive("sessionTrainingReinforcementSection", function ($compile) {
    return {
      restrict: "E",
      scope: false,
      templateUrl: "templates/session-training-reinforcement-section.html",
      replace: true,
      link: function link($scope, elem, attr, ctrl) {}
    };
  }).directive("sessionAssessmentDevelopmentSection", function ($compile) {
    return {
      restrict: "E",
      scope: false,
      templateUrl: "templates/session-assessment-development-section.html",
      replace: true,
      link: function link($scope, elem, attr, ctrl) {}
    };
  }).directive("sessionExerciseSection", function ($compile) {
    return {
      restrict: "E",
      scope: false,
      templateUrl: "templates/session-section-exercise.html",
      replace: true,
      link: function link($scope, elem, attr, ctrl) {}
    };
  }).directive("sessionOtherSection", function ($compile) {
    return {
      restrict: "E",
      scope: false,
      templateUrl: "templates/session-section-other.html",
      replace: true,
      link: function link($scope, elem, attr, ctrl) {}
    };
  }).directive("sessionGuideseeingeyeTrainingdetailsSection", function ($compile) {
    return {
      restrict: "E",
      scope: false,
      templateUrl: "templates/session-section-guideseeingeye-trainingdetails.html",
      replace: true,
      link: function link($scope, elem, attr, ctrl) {}
    };
  });
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("AddSeizureCtrl", AddSeizureCtrl);

  function AddSeizureCtrl($scope, $state, $stateParams, $ionicScrollDelegate, PopupFactory, ErrorMapper, BagService, LoadingMsg, PetService, seizureTypes, seizureSignTypes, seizureBodyStates, seizureBodyStatePositions, seizureAfterSignTypes, config, translations) {

    var vm = this;

    // defaults
    vm.maxSeizureDurationMin = config.maxSeizureDurationMin;

    // methods
    vm.save = save;
    vm.testCheckboxChange = testCheckboxChange;
    vm.getDurationFormat = getDurationFormat;

    function initForms() {

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

    $scope.$on("$ionicView.beforeEnter", function () {

      initForms();

      if ($stateParams.id) {
        vm.selectedPet = BagService.get("SelectedPet");
        if (!vm.selectedPet || $stateParams.id != vm.selectedPet.id) {
          showNoSelectedPetMsg();
        } else {
          if (vm.selectedPet && !vm.selectedPet.petSeizure) {
            showNoSeizureBackgroundMsg();
          } else {
            PopupFactory.show("show", {
              title: "",
              template: translations.PetSeizureMsgVideo,
              buttons: [{
                text: translations.CommonOk,
                type: "button-assertive",
                onTap: function onTap(e) {}
              }]
            });
          }
        }
      } else {
        showNoSelectedPetMsg();
      }
    });

    function save(formData) {
      var newSeizure = {},
          petId = null;

      // setting up seizure
      newSeizure.seizureTypeId = formData.seizureType.id;
      newSeizure.duration = parseInt(formData.duration);
      newSeizure.seizureBodyStatePositionId = formData.seizureBodyStatePosition ? formData.seizureBodyStatePosition.id : null;
      newSeizure.seizureBodyStateId = formData.seizureBodyState ? formData.seizureBodyState.id : null;

      newSeizure.seizureSigns = _.chain(formData.seizureSignTypes).keys().value().filter(function (e) {
        return formData.seizureSignTypes[e] == true;
      }).map(function (e) {
        return { seizureSignTypeId: parseInt(e)
        };
      });

      newSeizure.seizureAfterSigns = _.chain(formData.seizureAfterSigns).keys().value().filter(function (e) {
        return formData.seizureAfterSigns[e] == true;
      }).map(function (e) {
        return { SeizureAfterSignTypeId: parseInt(e)
        };
      });

      LoadingMsg.show();
      PetService.setSeizure(vm.selectedPet.id, newSeizure).then(function (response) {
        vm.formData = {};

        LoadingMsg.hide();
        PopupFactory.show("show", {
          title: "",
          template: translations.AddSeizureMsgSetOk,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {
              $state.go(config.homeState);
            }
          }]
        });
      }, function (error) {

        LoadingMsg.hide();
        PopupFactory.show("show", {
          title: "",
          template: translations.AddSeizureMsgSetError,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {
              $state.go(config.homeState);
            }
          }]
        });
      });
    }

    function testCheckboxChange(id, value) {}

    function getDurationFormat(min) {
      var strResult = "",
          minutes = moment.duration(parseInt(min), "minutes").minutes(),
          hours = moment.duration(parseInt(min), "minutes").hours();

      strResult += hours + " " + translations.CommonHours;
      strResult += " ";
      strResult += minutes + " " + translations.CommonMinutes;

      return strResult;
    }

    function showNoSelectedPetMsg() {
      PopupFactory.show("show", {
        title: "",
        template: translations.AddSeizureMsgGetPetError,
        buttons: [{
          text: translations.CommonOk,
          type: "button-assertive",
          onTap: function onTap(e) {
            $state.go(config.homeState);
          }
        }]
      });
    }

    function showNoSeizureBackgroundMsg() {
      PopupFactory.show("show", {
        title: "",
        template: translations.AddSeizureMsgNoSeizureBackground,
        buttons: [{
          text: translations.CommonOk,
          type: "button-assertive",
          onTap: function onTap(e) {
            $state.go("app.petSeizure", { id: vm.selectedPet.id });
          }
        }]
      });
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("ActivitiesCtrl", ActivitiesCtrl);

  function ActivitiesCtrl($scope, $state, PopupFactory, ErrorMapper, LoadingMsg, PetService, userPets, config, translations) {

    var vm = this;

    // methods
    vm.hasResults = hasResults;
    vm.getDurationFormat = getDurationFormat;
    vm.petChange = petChange;
    vm.remove = remove;

    function initForms() {

      vm.selectedPet = null;
      vm.results = [];
      vm.pets = userPets;
    }

    $scope.$on("$ionicView.beforeEnter", function () {
      initForms();
    });

    function getDurationFormat(min) {
      var strResult = "",
          minutes = moment.duration(parseInt(min), "minutes").minutes(),
          hours = moment.duration(parseInt(min), "minutes").hours();

      strResult += hours + " " + translations.CommonHours;
      strResult += " ";
      strResult += minutes + " " + translations.CommonMinutes;

      return strResult;
    }

    function petChange(pet) {
      vm.selectedPet = pet;

      var getOptions = {};

      LoadingMsg.show();
      PetService.getActivityRate(vm.selectedPet.id, getOptions).then(function (results) {
        LoadingMsg.hide();
        vm.results = results;
      }, function (error) {
        LoadingMsg.hide();

        var errorMsg = "";
        errorMsg = translations.ActivitiesMsgGetError;

        PopupFactory.show("show", {
          title: "",
          template: errorMsg,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {}
          }]
        });
      });
    }

    function remove(id) {
      if (vm.selectedPet && id) {
        PopupFactory.show("show", {
          title: "",
          template: translations.CommonMsgAreYouSure,
          buttons: [{
            text: translations.CommonCancel,
            type: "button-outline",
            onTap: function onTap(e) {}
          }, {
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {
              PetService.removeActivityRate(vm.selectedPet.id, id).then(function (result) {
                initForms();
              });
            }
          }]
        });
      }
    }

    function hasResults() {
      return vm.selectedPet && vm.results && vm.results.length > 0;
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("AddActivityCtrl", function ($ionicPlatform, $scope, $state, $timeout, $ionicScrollDelegate, $ionicActionSheet, $stateParams, PetService, ErrorMapper, TimeService, reports, activityEvents, activityRates, $ionicLoading, PopupFactory, config, translations) {

    var vm = this;

    // defaults
    vm.maxActivityDurationMin = config.maxActivityDurationMin;

    // methods
    vm.save = save;
    vm.locationTypeChange = locationTypeChange;

    $scope.$watch("vm.formData.reportEvent", function (value) {
      if (value) {
        vm.formData.reportEventDisplayName = vm.getActivityOption(value);

        if (vm.selectedPetId && value.id) {
          getLastActivity(vm.selectedPetId, value.id);
        }
      } else {
        vm.formData.reportEventDisplayName = translations.CommonSelect;
      }
    });

    function initForms() {

      $ionicScrollDelegate.scrollTop();

      vm.entry = {};
      vm.selectedPet = null;
      vm.reports = reports;
      vm.allEvents = activityEvents;
      vm.activityEvents = vm.allEvents;
      vm.rateRanges = [];

      // setting default 'Not Applicable' option
      vm.activityNotApplicableRates = activityRates.filter(function (x) {
        return x.name.indexOf("Not applicable") == 0;
      });;
      if (vm.activityNotApplicableRates && vm.activityNotApplicableRates.length >= 0) {
        vm.activityRateNotApplicable = vm.activityNotApplicableRates[0];
      }

      // All valid rates
      vm.activityRates = _.chain(activityRates).filter(function (x) {
        return x.name.indexOf("Not applicable") == -1;
      }).orderBy(["order"], ["desc"]).value();

      // Preparing valid ranges
      if (vm.activityRates && vm.activityRates.length > 0) {
        var ratesLength = vm.activityRates.length;
        vm.rateRanges = _.range(0, 100, 100 / ratesLength);
        vm.rateRanges = vm.rateRanges.slice(1, vm.rateRanges.length);
        vm.rateRanges[vm.rateRanges.length - 1] = 100;

        vm.rateRanges = _.map(vm.rateRanges, function (x, index) {
          return {
            range: x,
            id: vm.activityRates[index].id,
            name: vm.activityRates[index].name
          };
        });

        vm.rateRangesMin = vm.rateRanges[0].name || "";
        vm.rateRangesMax = vm.rateRanges[vm.rateRanges.length - 1].name || "";
      }

      vm.getActivityOption = getActivityOption;
      vm.getDurationFormat = getDurationFormat;
      vm.noApplicableRangeHandler = noApplicableRangeHandler;
      vm.getRateValueByRange = getRateValueByRange;

      // Creation
      vm.formData = {};
      vm.formData.dateRegistered = new Date();
      if (vm.reports && vm.reports.length > 0) {
        vm.formData.locationType = vm.reports[0];
        locationTypeChange();
      }
      vm.formData.symptomTypeId = null;
      vm.formData.symptomFrequencyId = null;
      vm.formData.rateNotApplicable = false;

      vm.formData.heatmapValue = 0;
      vm.formData.durationHours = 0;
      vm.formData.durationMinutes = 0;

      // Last Entry
      vm.lastEntry = null;
    }

    $scope.$on("$ionicView.beforeEnter", function () {

      initForms();

      if ($stateParams.id) {
        vm.selectedPetId = $stateParams.id;
      }
    });

    function save(formData) {
      var newActivity = {},
          petId = null,
          rateValue = {};

      if (!formData.reportEvent) {

        PopupFactory.show("show", {
          title: "",
          template: translations.CommonMsgCompleteFields,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {}
          }]
        });
      } else {

        petId = vm.selectedPetId;
        newActivity.dateRegistered = TimeService.dateToString(formData.dateRegistered);
        newActivity.comment = formData.comment;

        if (vm.lastEntry && vm.lastEntry.useSameEntry == true) {

          newActivity.rateId = vm.lastEntry.rate.id;
          newActivity.reportEventId = vm.lastEntry.reportEvent.id;
          newActivity.duration = vm.lastEntry.duration;
        } else {

          rateValue = getRateValueByRange();
          newActivity.rateId = rateValue.id;
          newActivity.reportEventId = formData.reportEvent.id;

          var totalMinutes = 0;
          totalMinutes += parseInt(vm.formData.durationHours) * 60;
          totalMinutes += parseInt(vm.formData.durationMinutes);

          newActivity.duration = totalMinutes;
        }

        $ionicLoading.show();

        PetService.setActivityRate(petId, newActivity).then(function (response) {

          // Saving ActivityRate
          $ionicLoading.hide();
          PopupFactory.show("show", {
            title: "",
            template: translations.AddActivityMsgSetOk,
            buttons: [{
              text: translations.CommonOk,
              type: "button-assertive",
              onTap: function onTap(e) {
                vm.formData = {};

                $state.go(config.homeState);
              }
            }]
          });
        }, function (errors) {

          $ionicLoading.hide();

          var errorMsg = "";
          errorMsg = ErrorMapper.getErrorMsgs(errors) || translations.AddActivityMsgSetError;

          PopupFactory.show("show", {
            title: "",
            template: errorMsg,
            buttons: [{
              text: translations.CommonOk,
              type: "button-assertive",
              onTap: function onTap(e) {}
            }]
          });
        });
      }
    }

    function getLastActivity(petId, reportEventId) {

      var getOptions = {
        reportEventId: reportEventId
      };

      $ionicLoading.show();

      PetService.getLastActivityRate(petId, getOptions).then(function (response) {

        $ionicLoading.hide();

        if (response) {
          vm.lastEntry = response;
          vm.lastEntry.useSameEntry = true;
        } else {
          vm.lastEntry = null;
        }
      }, function (errors) {

        $ionicLoading.hide();

        vm.lastEntry = null;
      });
    }

    function getRateValueByRange() {
      var range = null;

      if (vm.formData.heatmapValue != null && vm.formData.heatmapValue >= 0) {
        var rangeValue = vm.formData.heatmapValue;
        _.forEach(vm.rateRanges, function (x, index) {
          if (index == 0 && rangeValue <= x.range) {
            range = vm.rateRanges[0];
          } else if (index > 0 && rangeValue >= vm.rateRanges[index - 1].range && rangeValue <= x.range) {
            range = x;
          }
        });
      } else {
        if (!range) {
          range = vm.formData.heatmapValue;
        }
      }
      return range;
    }

    function locationTypeChange() {
      if (vm.formData.locationType) {

        vm.formData.reportEvent = null;
        vm.activityEvents = vm.allEvents.filter(function (x) {
          return x.reportId == vm.formData.locationType.id;
        });
      }
    }

    function noApplicableRangeHandler(notApplicableValue) {
      if (notApplicableValue) {
        vm.formData.heatmapValue = vm.activityRateNotApplicable;
      } else {
        vm.formData.heatmapValue = 0;
      }
    }

    function getActivityOption(option) {
      if (option && option.report && option.event) {
        return option.event.name;
      } else {
        return "";
      }
    }

    function getDurationFormat(min) {
      var strResult = "",
          minutes = moment.duration(parseInt(min), "minutes").minutes(),
          hours = moment.duration(parseInt(min), "minutes").hours();

      strResult += hours + " " + translations.CommonHours;
      strResult += " ";
      strResult += minutes + " " + translations.CommonMinutes;

      return strResult;
    }
  });
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("AddBehaviourCtrl", AddBehaviourCtrl);

  function AddBehaviourCtrl($scope, $state, $stateParams, $ionicScrollDelegate, PopupFactory, ErrorMapper, BagService, LoadingMsg, BehaviourService, TimeService, GenderService, types, observationTypes, locationTypes, nearResourceTypes, directedTowards, directedTowardTypes, dogTypes, destroyedObjects, behaviourDuringTypes, humanGenders, species, config, translations) {

    var vm = this;

    // methods
    vm.save = save;
    vm.behaviourTypeChange = behaviourTypeChange;
    vm.behaviourDirectedTowardChange = behaviourDirectedTowardChange;

    function initForms() {

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

    $scope.$on("$ionicView.beforeEnter", function () {

      initForms();

      if ($stateParams.id) {
        vm.selectedPet = BagService.get("SelectedPet");
        if (!vm.selectedPet || $stateParams.id != vm.selectedPet.id) {
          showNoSelectedPetMsg();
        }
      } else {
        showNoSelectedPetMsg();
      }
    });

    function resetBehavioursItems() {
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

    function behaviourTypeChange(behaviourType) {

      // cleaning previous selections
      resetBehavioursItems();

      LoadingMsg.show();
      BehaviourService.getItemTypesByTypeId(behaviourType.id).then(function (items) {
        LoadingMsg.hide();
        vm.itemTypes = items;
      }, function (error) {
        LoadingMsg.hide();
        vm.itemTypes = [];
      });
    }

    function behaviourDirectedTowardChange(behaviourDirectedTowardId) {
      if (behaviourDirectedTowardId) {
        vm.formData.aggresive.humanGender = null;
        vm.formData.aggresive.dogType = null;
        vm.formData.aggresive.speciesId = null;
      }
    }

    function generalFormToObj(formData) {
      var newBehaviour = {};

      // general behaviour attributes
      newBehaviour.dateRegistered = TimeService.dateToString(formData.dateRegistered);
      newBehaviour.behaviourTypeId = formData.behaviourType.id;
      newBehaviour.behaviourItems = _.chain(formData.behaviourItems).keys().value().filter(function (e) {
        return formData.behaviourItems[e] == true;
      }).map(function (e) {
        var obs = formData.behaviourObservations[e];
        var loc = formData.behaviourLocations[e];
        return {
          behaviourItemTypeId: parseInt(e),
          observationTypeId: obs ? obs.id : null,
          locationTypeId: loc ? loc.id : null,
          comment: formData.behaviourComments[e] || ""
        };
      });
      return newBehaviour;
    }

    function save(formData) {
      var newBehaviour = {},
          petId = null;

      // 2 - Destructive
      // 7 - Senior
      // 8 - Aggressive
      // 9 - Fear-related

      // Setting general attributes
      newBehaviour = generalFormToObj(formData);

      if (formData.behaviourType.id == 2) {
        // 2 - Destructive

        newBehaviour.ownerAtHome = formData.destructive.ownerAtHome;
        newBehaviour.destroyedObjectItems = _.chain(formData.destructive.destroyedObjects).keys().value().filter(function (e) {
          return formData.destructive.destroyedObjects[e] == true;
        }).map(function (e) {
          return {
            destroyedObjectId: parseInt(e)
          };
        });
        newBehaviour.otherDestroyedObject = formData.destructive.otherDestroyedObject;

        LoadingMsg.show();
        BehaviourService.setDestructive(vm.selectedPet.id, newBehaviour).then(function (response) {
          vm.formData = {};
          LoadingMsg.hide();
          showMsgOk();
        }, function (error) {
          LoadingMsg.hide();
          showMsgError();
        });
      } else if (formData.behaviourType.id == 7) {
        // 7 - Senior

        newBehaviour.paceUpAndDown = formData.senior.paceUpAndDown || false;
        newBehaviour.stareBlanklyAtWallsOrFloor = formData.senior.stareBlanklyAtWallsOrFloor || false;
        newBehaviour.stuckBehindObjects = formData.senior.stuckBehindObjects || false;
        newBehaviour.recogniseFamiliar = formData.senior.recogniseFamiliar || false;
        newBehaviour.walkWallsOrDoors = formData.senior.walkWallsOrDoors || false;
        newBehaviour.walkAwayWhileAvoindPatted = formData.senior.walkAwayWhileAvoindPatted || false;
        newBehaviour.urinateOrDefecateInAreaKeptClean = formData.senior.urinateOrDefecateInAreaKeptClean || false;
        newBehaviour.difficultyFindingFoodDroppped = formData.senior.difficultyFindingFoodDroppped || false;

        BehaviourService.setSenior(vm.selectedPet.id, newBehaviour).then(function (response) {
          vm.formData = {};
          LoadingMsg.hide();
          showMsgOk();
        }, function (error) {
          LoadingMsg.hide();
          showMsgError();
        });
      } else if (formData.behaviourType.id == 8) {
        // 8 - Aggressive

        if (!formData.aggresive.behaviourDirectedTowardId || !formData.aggresive.behaviourDirectedTowardType) {
          showMsgRequiredFieldsError();
          return;
        } else {

          newBehaviour.nearResourceTypeId = formData.aggresive.nearResourceTypeId;
          newBehaviour.behaviourDirectedTowardId = formData.aggresive.behaviourDirectedTowardId;
          newBehaviour.behaviourDirectedTowardType = formData.aggresive.behaviourDirectedTowardType;
          newBehaviour.humanGender = formData.aggresive.humanGender;
          newBehaviour.dogType = formData.aggresive.dogType;
          newBehaviour.speciesId = formData.aggresive.speciesId;

          LoadingMsg.show();
          BehaviourService.setAggressive(vm.selectedPet.id, newBehaviour).then(function (response) {
            vm.formData = {};
            LoadingMsg.hide();
            showMsgOk();
          }, function (error) {
            LoadingMsg.hide();
            showMsgError();
          });
        }
      } else if (formData.behaviourType.id == 9) {
        // 9 - Fear-related

        newBehaviour.behaviourDuringTypeId = formData.fearrelated.behaviourDuringTypeId;

        LoadingMsg.show();
        BehaviourService.setFearRelated(vm.selectedPet.id, newBehaviour).then(function (response) {
          vm.formData = {};
          LoadingMsg.hide();
          showMsgOk();
        }, function (error) {
          LoadingMsg.hide();
          showMsgError();
        });
      } else {
        // Other Behaviours

        LoadingMsg.show();
        BehaviourService.set(vm.selectedPet.id, newBehaviour).then(function (response) {
          vm.formData = {};
          LoadingMsg.hide();
          showMsgOk();
        }, function (error) {
          LoadingMsg.hide();
          showMsgError();
        });
      }
    }

    function showSpeciesName(specie) {
      return specie.name + " - " + specie.speciesType.name;
    }

    function showMsgRequiredFieldsError() {
      PopupFactory.show("show", {
        title: "",
        template: translations.AddBehaviourRequiredFields,
        buttons: [{
          text: translations.CommonOk,
          type: "button-assertive",
          onTap: function onTap(e) {}
        }]
      });
    }

    function showMsgOk() {
      PopupFactory.show("show", {
        title: "",
        template: translations.AddBehaviourMsgSetOk,
        buttons: [{
          text: translations.CommonOk,
          type: "button-assertive",
          onTap: function onTap(e) {
            $state.go(config.homeState);
          }
        }]
      });
    }

    function showMsgError() {
      PopupFactory.show("show", {
        title: "",
        template: translations.AddBehaviourMsgSetError,
        buttons: [{
          text: translations.CommonOk,
          type: "button-assertive",
          onTap: function onTap(e) {}
        }]
      });
    }

    function showNoSelectedPetMsg() {
      PopupFactory.show("show", {
        title: "",
        template: translations.AddBehaviourMsgGetPetError,
        buttons: [{
          text: translations.CommonOk,
          type: "button-assertive",
          onTap: function onTap(e) {
            $state.go(config.homeState);
          }
        }]
      });
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("AddFeedingCtrl", AddFeedingCtrl);

  function AddFeedingCtrl($scope, $state, $stateParams, $ionicScrollDelegate, PopupFactory, ErrorMapper, BagService, LoadingMsg, PetService, CommonService, UserService, FeedingService, userInfo, feedingTypes, foodTypes, feedingUnits, config, translations) {

    var vm = this;

    // defaults
    vm.countries = [];
    vm.feedingTypesFrecuencies = [];
    vm.userInfo = null;
    vm.selectedFeedingType = null;
    vm.brands = [];

    // methods
    vm.save = save;
    vm.updateUserCountry = updateUserCountry;
    vm.foodTypeChecked = foodTypeChecked;
    vm.feedingTypeChange = feedingTypeChange;
    vm.brandChange = brandChange;

    function initForms() {

      $ionicScrollDelegate.scrollTop();

      // dependencies
      vm.userInfo = vm.userInfo || userInfo;
      vm.feedingUnits = feedingUnits;
      vm.feedingTypes = feedingTypes;
      vm.foodTypes = foodTypes;

      if (vm.userInfo.countryId) {
        FeedingService.getFoodBrands(vm.userInfo.countryId).then(function (brands) {
          vm.brands = brands;
        }, function (err) {
          vm.brands = [];
        });
      }

      // Creation
      vm.formData = {};
      vm.formData.items = [];
      vm.formData.frequencyItems = [];
      vm.formData.productItems = [];
      vm.formData.feedingUnitsItems = [];
      vm.formData.amountItems = [];
      vm.formData.otherItems = [];
    }

    $scope.$on("$ionicView.beforeEnter", function () {

      if ($stateParams.id) {
        vm.selectedPet = BagService.get("SelectedPet");
        if (!vm.selectedPet || $stateParams.id != vm.selectedPet.id) {
          showNoSelectedPetMsg();
        }
      } else {
        showNoSelectedPetMsg();
      }

      checkUserCountry();
      initForms();
    });

    function checkUserCountry() {
      if (userInfo != null && userInfo.countryId == null) {

        LoadingMsg.show();
        CommonService.getCountries().then(function (countries) {
          LoadingMsg.hide();

          vm.countries = countries;

          PopupFactory.show("show", {
            title: "",
            templateUrl: "templates/update-country.html",
            scope: $scope,
            buttons: [{
              text: translations.CommonUpdate,
              type: "button-assertive",
              onTap: function onTap(e) {
                if (vm.selectedCountry) {
                  vm.updateUserCountry(vm.selectedCountry);
                } else {
                  e.preventDefault();
                }
              }
            }]
          });
        }, function (err) {
          LoadingMsg.hide();

          PopupFactory.show("show", {
            title: "",
            template: translations.AddFeedingGetCountryError,
            buttons: [{
              text: translations.CommonOk,
              type: "button-assertive",
              onTap: function onTap(e) {
                $state.go(config.homeState);
              }
            }]
          });
        });
      }
    }

    function foodTypeChecked(foodType, checkValue) {
      LoadingMsg.show(500);

      if (checkValue) {
        vm.formData.items[foodType.id] = foodType;
        vm.formData.items[foodType.id].products = [];
      } else {
        // reset
        vm.formData.items[foodType.id] = null;
      }
    }

    function updateUserCountry(selectedCountry) {
      if (selectedCountry) {

        LoadingMsg.show();
        UserService.setCountry(selectedCountry.id).then(function (userInfo) {
          LoadingMsg.hide();
          // updating User Info
          vm.userInfo = userInfo;
          initForms();
        }, function (error) {
          LoadingMsg.hide();
          vm.selectedCountry = null;
        });
      }
    }

    function feedingTypeChange(feedingTypeChange) {

      if (feedingTypeChange) {

        LoadingMsg.show();
        FeedingService.getFeedingTypesFrecuencies(feedingTypeChange.id).then(function (frecuencies) {

          LoadingMsg.hide();
          vm.feedingTypesFrecuencies = frecuencies;
        }, function (err) {
          vm.feedingTypesFrecuencies = [];
          LoadingMsg.hide();
          PopupFactory.show("show", {
            title: "",
            template: translations.AddFeedingGetCountryError,
            buttons: [{
              text: translations.CommonOk,
              type: "button-assertive",
              onTap: function onTap(e) {}
            }]
          });
        });
      } else {
        vm.feedingTypesFrecuencies = [];
      }
    }

    function brandChange(foodType, brand) {

      if (brand) {
        vm.formData.items[foodType.id].products = [];

        FeedingService.getFoodProducts(brand.id, foodType.id).then(function (products) {
          vm.formData.items[foodType.id].products = products;
        }, function (err) {
          vm.formData.items[foodType.id].products = [];
        });
      } else {
        // reset
        vm.formData.items[foodType.id].products = [];
      }
    }

    function save(formData) {
      var newFeed = {},
          petId = null,
          itemOptions = [];

      itemOptions = _.chain(formData.checkboxItems).keys().value().filter(function (e) {
        return formData.checkboxItems[e] == true;
      });

      if (vm.selectedFeedingType && itemOptions.length > 0) {

        newFeed.feedingTypeId = vm.selectedFeedingType.id;
        newFeed.feedItems = _.chain(formData.checkboxItems).keys().value().filter(function (e) {
          return formData.checkboxItems[e] == true;
        }).map(function (e) {
          var foodType = formData.items[e];
          var frequency = formData.frequencyItems[e];
          var product = formData.productItems[e];
          var feedingUnit = formData.feedingUnitsItems[e];
          var amount = formData.amountItems[e];
          var other = formData.otherItems[e];
          return {
            foodTypeId: foodType ? foodType.id : null,
            feedingTypeFrecuencyId: frequency ? frequency.id : null,
            foodProductId: product ? product.id : null,
            feedingUnitId: feedingUnit ? feedingUnit.id : null,
            amount: amount ? amount : null,
            other: other ? other : null
          };
        });

        LoadingMsg.show();
        PetService.setFeed(vm.selectedPet.id, newFeed).then(function (response) {
          vm.formData = {};
          LoadingMsg.hide();
          showMsgOk();
        }, function (error) {
          LoadingMsg.hide();
          showMsgError();
        });
      } else {

        PopupFactory.show("show", {
          title: "",
          template: translations.AddFeedingMsgRequiredFields,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {}
          }]
        });
      }
    }

    function showMsgOk() {
      PopupFactory.show("show", {
        title: "",
        template: translations.AddFeedingMsgSetOk,
        buttons: [{
          text: translations.CommonOk,
          type: "button-assertive",
          onTap: function onTap(e) {
            $state.go(config.homeState);
          }
        }]
      });
    }

    function showMsgError() {
      PopupFactory.show("show", {
        title: "",
        template: translations.AddFeedingMsgSetError,
        buttons: [{
          text: translations.CommonOk,
          type: "button-assertive",
          onTap: function onTap(e) {}
        }]
      });
    }

    function showNoSelectedPetMsg() {
      PopupFactory.show("show", {
        title: "",
        template: translations.CommonMsgGetPetError,
        buttons: [{
          text: translations.CommonOk,
          type: "button-assertive",
          onTap: function onTap(e) {
            $state.go(config.homeState);
          }
        }]
      });
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("AddPetCtrl", AddPetCtrl);

  function AddPetCtrl($ionicPlatform, $scope, $state, $filter, $timeout, $stateParams, $ionicScrollDelegate, PetService, $ionicActionSheet, $cordovaCamera, $q, $ionicLoading, PopupFactory, BagService, petTypes, petSubTypes, petBreeds, GenderService, WeightUnitsService, AgeAcquiredService, AgeDesexedService, ErrorMapper, config, translations) {

    var vm = this;
    vm.minValidDate = config.minValidDate;
    vm.showPictureOptions = showPictureOptions;
    vm.nextPage = nextPage;
    vm.prevPage = prevPage;
    vm.closeWizardModal = closeWizardModal;
    vm.openSeizureBackground = openSeizureBackground;
    vm.save = save;
    vm.update = update;
    vm.petTypeChange = petTypeChange;
    vm.getTypeById = getTypeById;
    vm.getSubTypeById = getSubTypeById;
    vm.getBreedById = getBreedById;
    vm.getSexById = getSexById;
    vm.getBreedPercentageById = getBreedPercentageById;
    vm.getWeightUnitById = getWeightUnitById;
    vm.breedPercentangeChange = breedPercentangeChange;
    vm.breedPercentages = [{ id: 100, name: "100%" }, { id: 75, name: "75%" }, { id: 50, name: "50%" }, { id: 25, name: "25%" }];

    function initForms() {

      $ionicScrollDelegate.scrollTop();

      vm.selectedPet = null;
      vm.types = petTypes;
      vm.breeds = petBreeds;
      vm.sexs = GenderService.getAll();
      vm.weightUnits = WeightUnitsService.getAll();
      vm.ageDesexedList = AgeDesexedService.getAll();
      vm.ageAcquiredList = AgeAcquiredService.getAll();

      // Pet creation
      vm.subTypes = [];
      vm.avatar = null;
      vm.avatarImageData = null;
      vm.petFormData = {};
      vm.petFormData.desexed = false;
      vm.petFormData.ageDesexed = null;
      vm.petFormData.ageAcquired = null;
      vm.petFormData.sex = null;
      vm.petFormData.weightUnits = null;
      vm.petFormData.petBreeds = [{ order: 0 }];
      vm.petBreedsPercentagesfiltered = {};
      vm.petBreedsPercentagesfiltered[0] = vm.breedPercentages;
    }

    $scope.$on("$ionicView.beforeEnter", function () {

      initForms();

      if ($stateParams.id) {

        // Pet update
        vm.selectedPetId = $stateParams.id;
        vm.subTypes = petSubTypes;

        PetService.getById(vm.selectedPetId).then(function (pet) {

          vm.petFormData = objToFormMap(pet);
          vm.avatar = pet.photoLink;

          // filling up the form with pet information
          $q.all([PetService.getWeight(pet.id)]).then(function (response) {
            if (response[0]) {
              vm.petFormData.weight = response[0].weight;
              vm.petFormData.weightUnits = vm.getWeightUnitById(response[0].units);
            }
          });
        }, function (error) {

          // Cannot get pet by id.
          PopupFactory.show("show", {
            title: "",
            template: translations.AddPetMsgGetPetError,
            buttons: [{
              text: translations.CommonOk,
              type: "button-assertive",
              onTap: function onTap(e) {
                $state.go(config.homeState);
              }
            }]
          });
        });
      }

      // pagination
      vm.page = 1;
      vm.pageLength = 2;
      changePage(vm.page);
    });

    function getTotalBreedsPercentage() {
      var totalPercentage = _.chain(vm.petFormData.breedPercentage).values().sumBy(function (o) {
        return o.id;
      }).value();
      return totalPercentage;
    }

    function isWeightValid(weight, weightUnit) {
      if (weightUnit == "kg" && weight > 0 && weight <= 145) {
        return true;
      } else if (weightUnit == "pounds" && weight > 0 && weight <= 320) {
        return true;
      } else {
        return false;
      }
    }

    function isTotalPercentageValid() {
      return getTotalBreedsPercentage() == 100;
    }

    function breedPercentangeChange(order) {
      var breedPercentage = vm.petFormData.breedPercentage[order];

      if (breedPercentage && breedPercentage.id <= 100) {

        if (order < vm.petFormData.petBreeds.length - 1) {

          // Restarting cross formula from the edited element
          vm.petFormData.petBreeds = vm.petFormData.petBreeds.filter(function (e) {
            return e.order <= order;
          });

          vm.petFormData.breedPercentage = _.chain(vm.petFormData.breedPercentage).values().map(function (e, index) {
            e.index = index;return e;
          }).filter(function (e) {
            return e.index <= order;
          }).keyBy("index").value();

          vm.petFormData.breed = _.chain(vm.petFormData.breed).values().map(function (e, index) {
            e.index = index;return e;
          }).filter(function (e) {
            return e.index <= order;
          }).keyBy("index").value();
        }

        var totalPercentage = getTotalBreedsPercentage();

        if (totalPercentage < 100) {

          var nextOrder = ++order;
          vm.petBreedsPercentagesfiltered[nextOrder] = vm.breedPercentages.filter(function (pb) {
            return totalPercentage + pb.id <= 100;
          });

          if (nextOrder > vm.petFormData.petBreeds.length - 1) {
            vm.petFormData.petBreeds.push({
              order: nextOrder
            });
          }
        }
      }
    }

    function objToFormMap(obj) {
      var pet = {};

      pet.name = obj.name;
      pet.dateOfBirth = new Date(moment.utc(obj.dateOfBirth));
      pet.type = vm.getTypeById(obj.petSubtype.petTypeId);

      // Updating subtype list by type
      petTypeChange(pet.type);

      // Pre select the correct value
      pet.subType = vm.getSubTypeById(obj.petSubtype.id);

      if (obj.petBreeds && obj.petBreeds.length > 0) {

        // initializing petbreeds UI elements
        pet.petBreeds = [];
        pet.breedPercentage = {};
        pet.breed = {};
        var totalPercentage = 0;

        obj.petBreeds.forEach(function (pb, index) {

          pet.petBreeds.push({
            order: index
          });
          pet.breed[index] = vm.getBreedById(pb.breedId);
          pet.breedPercentage[index] = vm.getBreedPercentageById(pb.percentage);

          if (index == 0) {
            vm.petBreedsPercentagesfiltered[index] = vm.breedPercentages;
          } else {
            vm.petBreedsPercentagesfiltered[index] = vm.breedPercentages.filter(function (pb) {
              return totalPercentage + pb.id <= 100;
            });
          }
          totalPercentage += pb.percentage;
        });
      } else {
        pet.petBreeds = [{ order: 0 }];
        vm.petBreedsPercentagesfiltered[0] = vm.breedPercentages;
      }

      pet.sex = vm.getSexById(obj.sex);
      pet.desexed = obj.desexed || false;
      pet.ageDesexed = AgeDesexedService.get(obj.ageDesexed) || null;
      pet.ageAcquired = AgeAcquiredService.get(obj.ageAcquired) || null;
      pet.microchipNumber = obj.microchipNumber || null;
      pet.insured = obj.insured || false;
      pet.seizureDiagnosisId = obj.seizureDiagnosisId || null;

      return pet;
    }

    function formToObjMap(formData) {
      var pet = {};

      pet.name = formData.name;
      pet.dateOfBirth = $filter("date")(formData.dateOfBirth, config.apiDateFormat);
      pet.petSubtypeId = formData.subType.id;

      pet.petBreeds = vm.petFormData.petBreeds.map(function (e) {
        return {
          breedId: vm.petFormData.breed[e.order].id,
          percentage: vm.petFormData.breedPercentage[e.order].id
        };
      });

      pet.sex = formData.sex.id;
      pet.desexed = formData.desexed || false;
      pet.ageDesexed = pet.desexed && formData.ageDesexed ? formData.ageDesexed.id : null;
      pet.ageAcquired = formData.ageAcquired ? formData.ageAcquired.id : null;
      pet.microchipNumber = formData.microchipNumber;
      pet.insured = formData.insured || false;
      pet.trainerId = formData.trainerId || null;
      pet.seizureDiagnosisId = formData.seizureDiagnosisId || null;

      return pet;
    }

    function save(formData) {
      var newPet = {};

      if (!isTotalPercentageValid()) {
        PopupFactory.show("show", {
          title: "",
          template: translations.AddPetMsgTotalBreedsPercentageError,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {}
          }]
        });
        return;
      }

      if (formData.weight != undefined && formData.weightUnits != undefined && !isWeightValid(formData.weight, formData.weightUnits.id)) {

        PopupFactory.show("show", {
          title: "",
          template: translations.AddPetMsgTotalErrorWeight,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {}
          }]
        });
        return;
      }

      // mapping
      newPet = formToObjMap(formData);

      $ionicLoading.show();
      PetService.create(newPet).then(function (response) {

        // will force to update list
        BagService.set("Pets", null);

        // updating new pet id.
        newPet.id = response.id;

        // updating Weight
        if (formData.weight != undefined && formData.weightUnits != undefined) {
          PetService.setWeight(newPet.id, { weight: formData.weight, units: formData.weightUnits.id });
        }

        if (vm.avatarImageData) {
          PetService.setAvatar(newPet.id, vm.avatarImageData).then(function (response) {

            $ionicLoading.hide();
            PopupFactory.show("show", {
              title: "",
              template: translations.AddPetMsgAddedOk,
              buttons: [{
                text: translations.CommonOk,
                type: "button-assertive",
                onTap: function onTap(e) {
                  vm.petFormData = {};

                  $state.go("app.initialActivityRate", { id: newPet.id });
                }
              }]
            });
          });
        } else {

          $ionicLoading.hide();
          PopupFactory.show("show", {
            title: "",
            template: translations.AddPetMsgAddedOk,
            buttons: [{
              text: translations.CommonOk,
              type: "button-assertive",
              onTap: function onTap(e) {
                vm.petFormData = {};

                $state.go("app.initialActivityRate", { id: newPet.id });
              }
            }]
          });
        }
      }, function (errors) {
        $ionicLoading.hide();

        var errorMsg = "";
        errorMsg = ErrorMapper.getErrorMsgs(errors);

        PopupFactory.show("show", {
          title: "",
          template: errorMsg,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {}
          }]
        });
      });
    }

    function update(formData) {
      var newPet = {};

      if (!isTotalPercentageValid()) {
        PopupFactory.show("show", {
          title: "",
          template: translations.AddPetMsgTotalBreedsPercentageError,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {}
          }]
        });
        return;
      }

      if (formData.weight != undefined && formData.weightUnits != undefined && !isWeightValid(formData.weight, formData.weightUnits.id)) {

        PopupFactory.show("show", {
          title: "",
          template: translations.AddPetMsgTotalErrorWeight,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {}
          }]
        });
        return;
      }

      // mapping
      newPet = formToObjMap(formData);

      $ionicLoading.show();
      PetService.update(vm.selectedPetId, newPet).then(function (response) {

        // will force to update list
        BagService.set("Pets", null);

        // updateing new pet id.
        newPet.id = response.id;

        // updating Weight
        if (formData.weight != undefined && formData.weightUnits != undefined) {
          PetService.setWeight(newPet.id, { weight: formData.weight, units: formData.weightUnits.id });
        }

        if (vm.avatarImageData) {
          PetService.setAvatar(newPet.id, vm.avatarImageData).then(function (response) {

            $ionicLoading.hide();
            PopupFactory.show("show", {
              title: "",
              template: translations.AddPetMsgUpdatedOk,
              buttons: [{
                text: translations.CommonOk,
                type: "button-assertive",
                onTap: function onTap(e) {
                  vm.petFormData = {};

                  $state.go("app.home");
                }
              }]
            });
          });
        } else {

          $ionicLoading.hide();
          PopupFactory.show("show", {
            title: "",
            template: translations.AddPetMsgUpdatedOk,
            buttons: [{
              text: translations.CommonOk,
              type: "button-assertive",
              onTap: function onTap(e) {
                vm.petFormData = {};

                $state.go("app.home");
              }
            }]
          });
        }
      }, function (errors) {
        $ionicLoading.hide();

        var errorMsg = "";
        errorMsg = ErrorMapper.getErrorMsgs(errors);

        PopupFactory.show("show", {
          title: "",
          template: errorMsg,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {}
          }]
        });
      });
    }

    function changePage(page) {

      // set scroll to the top
      $ionicScrollDelegate.scrollTop(true);
    }

    function prevPage() {

      if (vm.page > 1) {
        vm.page--;
        changePage(vm.page);
      }
    }

    function nextPage() {

      if (vm.page !== vm.pageLength) {
        vm.page++;
        changePage(vm.page);
      }
    }

    function closeWizardModal() {
      vm.modal.hide();
    }

    function showPictureOptions() {

      var hideSheet = $ionicActionSheet.show({
        buttons: [{ text: "<i class=\"icon ion-camera\"></i> " + translations.HomeActionTakePhoto }, { text: "<i class=\"icon ion-images\"></i> " + translations.HomeActionPhotoLibrary }],
        titleText: translations.HomeActionSetPicture,
        cancelText: translations.CommonCancel,
        cancel: function cancel() {
          return true;
        },
        buttonClicked: function buttonClicked(index) {
          getPicture(index == 0 ? true : false);
          return true;
        }
      });
    }

    function getPicture(typeCamera) {

      var options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: typeCamera == true ? Camera.PictureSourceType.CAMERA : Camera.PictureSourceType.SAVEDPHOTOALBUM,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

      $ionicLoading.show();
      $ionicPlatform.ready(function () {

        $cordovaCamera.getPicture(options).then(function (imageData) {
          $ionicLoading.hide();
          vm.avatarImageData = imageData;
          vm.avatar = "data:image/jpeg;base64," + vm.avatarImageData;
        }, function (err) {
          $ionicLoading.hide();
          console.log(err);
        });
      });
    }

    function openSeizureBackground() {
      $state.go("app.petSeizure", { id: vm.selectedPetId });
    }

    function petTypeChange(type) {
      vm.subTypes = petSubTypes.filter(function (subtype) {
        return subtype.petTypeId == type.id;
      });
    }

    function getTypeById(id) {
      return petTypes.find(function (o) {
        return o.id == id;
      });
    }

    function getSubTypeById(id) {
      return petSubTypes.find(function (o) {
        return o.id == id;
      });
    }

    function getBreedById(id) {
      return petBreeds.find(function (o) {
        return o.id == id;
      });
    }

    function getSexById(id) {
      return GenderService.get(id);
    }

    function getBreedPercentageById(id) {
      return vm.breedPercentages.find(function (o) {
        return o.id == id;
      });
    }

    function getWeightUnitById(id) {
      return WeightUnitsService.get(id);
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("AddProfileCtrl", function ($ionicPlatform, $scope, $state, $timeout, $ionicScrollDelegate, $ionicActionSheet, $cordovaCamera, $ionicLoading, PopupFactory, translations) {

    var vm = this;
    vm.cancel = cancel;
    vm.done = done;

    // inits

    $scope.$on("$ionicView.beforeEnter", function () {});

    function closeWizardModal() {
      vm.modal.hide();
    }

    function cancel() {
      $state.go("app.home");
    }

    function done() {
      PopupFactory.show("show", {
        title: "",
        template: "<p>Successfully added</p>",
        buttons: [{
          text: "Complete",
          type: "button-assertive",
          onTap: function onTap(e) {
            $state.go("app.home");
          }
        }]
      });
    }
  });
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("AddRespirationRateCtrl", AddRespirationRateCtrl);

  function AddRespirationRateCtrl($ionicPlatform, $scope, $state, $filter, $timeout, $stateParams, BagService, TimeService, $ionicScrollDelegate, PetService, $q, $ionicLoading, PopupFactory, $cordovaDatePicker, ErrorMapper, config, translations) {

    var vm = this;

    vm.save = save;
    vm.getBreathsFormat = getBreathsFormat;

    function initForms() {

      vm.selectedPet = null;

      // Creation
      vm.formData = {};
      vm.formData.dateRegistered = new Date();
      vm.formData.breaths = 0;
      vm.formData.comment = "";
    }

    $scope.$on("$ionicView.beforeEnter", function () {

      initForms();

      if ($stateParams.id) {
        vm.selectedPet = BagService.get("SelectedPet");
        if (!vm.selectedPet || $stateParams.id != vm.selectedPet.id) {
          showNoSelectedPetMsg();
        }
      } else {
        showNoSelectedPetMsg();
      }
    });

    function save(formData) {
      var newRespirationRate = {},
          petId = null;

      // setting pet Id
      petId = vm.selectedPet.id;

      newRespirationRate.breaths = formData.breaths;
      newRespirationRate.dateRegistered = TimeService.dateToString(formData.dateRegistered);
      newRespirationRate.comment = formData.comment;

      $ionicLoading.show();

      PetService.setRespirationRate(petId, newRespirationRate).then(function (response) {

        // Saving Symptom
        $ionicLoading.hide();
        PopupFactory.show("show", {
          title: "",
          template: translations.AddRespirationRateMsgSetOk,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {
              vm.formData = {};

              $state.go(config.homeState);
            }
          }]
        });
      }, function (errors) {

        $ionicLoading.hide();

        var errorMsg = "";
        errorMsg = ErrorMapper.getErrorMsgs(errors) || translations.AddRespirationRateMsgSetError;

        PopupFactory.show("show", {
          title: "",
          template: errorMsg,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {}
          }]
        });
      });
    }

    function getBreathsFormat(amount) {
      var strResult = "";

      strResult += amount + " " + translations.AddRespirationRateBreathFormat;

      return strResult;
    }

    function showNoSelectedPetMsg() {
      PopupFactory.show("show", {
        title: "",
        template: translations.CommonMsgGetPetError,
        buttons: [{
          text: translations.CommonOk,
          type: "button-assertive",
          onTap: function onTap(e) {
            $state.go(config.homeState);
          }
        }]
      });
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("AddSessionCtrl", AddSessionCtrl);

  function AddSessionCtrl($scope, $state, $stateParams, $ionicScrollDelegate, PopupFactory, ErrorMapper, BagService, LoadingMsg, ModalFactory, PetService, TimeService, GenderService, handGesturalCommands, verbalCommands, whistleLaserCommands, petSkills, petDeviceMethods, rewards, correctionDevices, sessionLevels, species, surfaceObstacles, transportationTypes, travelQuality, relationshipTypes, locationTypes, locationSubTypes, humanGenders, ageRanges, distanceUnits, commandFrecuencies, exercisePhysicalConditions, guideSeeingAditionalTrainings, temperatureUnits, weatherLevels, motivationScales, confidenceScales, dogTypes, livestockHerdingWorkTypes, trialTypes, trialRanges, competitionDivisions, competitionAwards, scentDetectionOdours, runChaseQualities, activityElements, racingGreyhoundActivities, activityRates, config, translations) {

    var vm = this;

    // defaults
    vm.maxSessionDurationMin = config.maxSessionDurationMin;
    vm.scoredByArray = [{ id: 0, name: "Self" }, { id: 1, name: "Other" }];

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

    function initForms() {

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
      vm.stockSpecies = species.filter(function (s) {
        return s.speciesTypeId == 2;
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

      vm.durationHours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      vm.durationMinutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
      vm.OnLeadValues = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
      vm.OffLeadValues = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
      vm.rewardsPercetages = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

      vm.formData = {};
      vm.formData.duration = 0;
      vm.formData.transportationDuration = 0;
      vm.formData.spentTetheredDuration = 0;
      vm.formData.createdItems = [];
      vm.formData.createdDurations = [];
      vm.transportationTypes.forEach(function (e) {
        vm.formData.createdDurations[e.id] = 0;
      });
      vm.formData.observedTime = 0;
      vm.formData.verbalCommandsDuration = 0;
      vm.formData.handGesturalCommandsDuration = 0;
      vm.formData.otherSkillsDevelopmentDuration = 0;
      vm.formData.rewardResults = [];
      vm.formData.correctionResults = [];

      vm.formData.exerciseDurations = [];
      vm.exercisePhysicalConditions.forEach(function (e) {
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
      vm.formData.otherTimeSpentDuration = null;

      // Guide Seeing Eye ONLY
      vm.formData.guideSeeingAditionalTrainingItems = [];
      vm.formData.trainingTransportationTypeId = null;

      // Scent Detection ONLY
      vm.formData.equipmentWithDistractions = [];
      vm.formData.equipmentWithNoDistractions = [];

      // Racing Greyhound ONLY
      vm.formData.racingGreyhoundActivityItems = [];

      // Setting default collapse
      vm.shownGroup = "AddSessionGeneral";
    }

    $scope.$on("$ionicView.beforeEnter", function () {

      initForms();

      if ($stateParams.id) {
        vm.selectedPet = BagService.get("SelectedPet");
        if (!vm.selectedPet || $stateParams.id != vm.selectedPet.id) {
          showNoSelectedPetMsg();
        }

        if ($stateParams.sessionTypeId) {
          vm.sessionTypeId = $stateParams.sessionTypeId;

          if (vm.selectedPet) {
            var subtitle = vm.sessionTypeId == 1 ? translations.AddSessionTraining : translations.AddSessionAssessment;
            vm.title = vm.selectedPet.petSubtype.name + " - " + subtitle;

            vm.formData.sessionTypeId = vm.sessionTypeId;
            vm.formData.petSubTypeId = vm.selectedPet.petSubtypeId;
          }
        }
      } else {
        showNoSelectedPetMsg();
      }
    });

    function generalFormToObj(formData) {

      formData.duration = formData.durationHours * 60 + formData.durationMinutes;

      formData.distractedByAnimalItems = _.chain(formData.distractedByAnimalItems).keys().value().filter(function (e) {
        return formData.distractedByAnimalItems[e] == true;
      }).map(function (e) {
        return {
          SpeciesId: parseInt(e)
        };
      });

      formData.surfacesItems = _.chain(formData.surfacesItems).keys().value().filter(function (e) {
        return formData.surfacesItems[e] == true;
      }).map(function (e) {
        return {
          SurfaceObstacleId: parseInt(e)
        };
      });

      formData.createdItems = _.chain(formData.createdItems).keys().value().filter(function (e) {
        return formData.createdItems[e] == true && formData.createdDurations[e] && formData.createdQualities[e];
      }).map(function (e) {
        var duration = vm.formData.createdDurations[e];
        var TransportationTypeId = parseInt(e);
        var TravelQuality = vm.formData.createdQualities[e];
        return {
          Duration: duration ? duration : null,
          TransportationTypeId: TransportationTypeId ? TransportationTypeId : null,
          TravelQuality: TravelQuality ? TravelQuality : null
        };
      });

      formData.otherSkillsDevelopmentItems = _.chain(formData.otherSkillsDevelopmentItems).keys().value().filter(function (e) {
        return formData.otherSkillsDevelopmentItems[e] == true;
      }).map(function (e) {
        var PetSkillId = parseInt(e);
        var Duration = vm.formData.otherSkillsDevelopmentDurations[e];
        return {
          PetSkillId: PetSkillId ? PetSkillId : null,
          Duration: Duration ? Duration : null
        };
      });

      formData.petDeviceMethodItems = _.chain(formData.petDeviceMethodItems).keys().value().filter(function (e) {
        return formData.petDeviceMethodItems[e] == true;
      }).map(function (e) {
        return {
          PetDeviceMethodId: parseInt(e)
        };
      });

      formData.rewardItems = _.map(formData.rewardResults, function (e) {
        return {
          RewardId: e.id,
          Percentage: e.percentage
        };
      });

      formData.correctionDeviceItems = _.map(formData.correctionResults, function (e) {
        return {
          CorrectionDeviceId: e.id,
          Percentage: e.percentage
        };
      });

      formData.exercisePhysicalConditionItems = _.chain(formData.exerciseItems).keys().value().filter(function (e) {
        return formData.exerciseItems[e] == true && formData.exerciseDurations[e];
      }).map(function (e) {
        var Duration = vm.formData.exerciseDurations[e];
        return {
          ExercisePhysicalConditionId: parseInt(e),
          Duration: Duration ? Duration : null
        };
      });

      formData.guideSeeingAditionalTrainingItems = _.chain(formData.guideSeeingAditionalTrainings).keys().value().filter(function (e) {
        return formData.guideSeeingAditionalTrainings[e] == true;
      }).map(function (e) {
        var Duration = vm.formData.exerciseDurations[e];
        return {
          GuideSeeingAditionalTrainingId: parseInt(e)
        };
      });

      // LIVESTOCK

      formData.livestockHerdingWorkTypeItems = _.chain(formData.livestockHerdingWorkTypeItems).keys().value().filter(function (e) {
        return formData.livestockHerdingWorkTypeItems[e] == true;
      }).map(function (e) {
        return {
          LivestockHerdingDogWorkTypeId: parseInt(e)
        };
      });

      formData.workWithStockItems = _.chain(formData.workWithStockItems).keys().value().filter(function (e) {
        return formData.workWithStockItems[e] == true;
      }).map(function (e) {
        return {
          SpeciesId: parseInt(e)
        };
      });

      return formData;
    }

    function formValidations() {
      var validationResults = [];

      // setting default values
      validationResults.rewardResults = false;
      validationResults.correctionResults = false;

      // Rewards Validation
      if (vm.formData.rewardResults && vm.formData.rewardResults.length > 0) {

        var rewardResultsSubtotal = _.chain(vm.formData.rewardResults).values().sumBy(function (o) {
          return o.percentage;
        }).value();

        if (rewardResultsSubtotal == 100) {
          validationResults.rewardResults = true;
        } else {

          validationResults.rewardResults = false;
          PopupFactory.show("show", {
            title: "",
            template: translations.AddSessionRewardTotalValidation,
            buttons: [{
              text: translations.CommonOk,
              type: "button-assertive",
              onTap: function onTap(e) {}
            }]
          });
        }
      } else {
        validationResults.rewardResults = true;
      }

      // Correction Validation
      if (vm.formData.correctionResults && vm.formData.correctionResults.length > 0) {

        var correctionResultsSubtotal = _.chain(vm.formData.correctionResults).values().sumBy(function (o) {
          return o.percentage;
        }).value();

        if (correctionResultsSubtotal == 100) {
          validationResults.correctionResults = true;
        } else {

          validationResults.correctionResults = false;
          PopupFactory.show("show", {
            title: "",
            template: translations.AddSessionCorrectionTotalValidation,
            buttons: [{
              text: translations.CommonOk,
              type: "button-assertive",
              onTap: function onTap(e) {}
            }]
          });
        }
      } else {
        validationResults.correctionResults = true;
      }

      return validationResults.rewardResults && validationResults.correctionResults;
    }

    function save(formData) {
      var newSession = {},
          petId = null;

      if (vm.formValidations()) {

        newSession = generalFormToObj(formData);

        LoadingMsg.show();
        PetService.setSession(vm.sessionTypeId, vm.formData.petSubTypeId, vm.selectedPet.id, newSession).then(function (response) {
          LoadingMsg.hide();
          showMsgOk();
        }, function (error) {
          LoadingMsg.hide();
          showMsgError();
        });
      }
    }

    function filterRewardsPercentage(value) {
      var subtotal = _.chain(vm.formData.rewardResults).values().sumBy(function (o) {
        return o.percentage;
      }).value();

      if (subtotal) {
        return value + subtotal <= 100;
      } else {
        return true;
      }
    }

    function addReward(reward, percentage) {
      if (reward && percentage) {

        reward.percentage = percentage;
        vm.formData.rewardResults.push(reward);

        // reset inputs
        vm.formData.selectedReward = null;
        vm.formData.selectedRewardPertentage = null;
      }
    }

    function removeReward(reward) {
      _.remove(vm.formData.rewardResults, function (e) {
        return e == reward;
      });
    }

    function filterCorrectionPercentage(value) {
      var subtotal = _.chain(vm.formData.correctionResults).values().sumBy(function (o) {
        return o.percentage;
      }).value();

      if (subtotal) {
        return value + subtotal <= 100;
      } else {
        return true;
      }
    }

    function addCorrection(correction, percentage) {
      if (correction && percentage) {

        correction.percentage = percentage;
        console.log(correction);
        vm.formData.correctionResults.push(correction);

        // reset inputs
        vm.formData.selectedCorrection = null;
        vm.formData.selectedCorrectionPertentage = null;
      }
    }

    function removeCorrection(reward) {
      _.remove(vm.formData.correctionResults, function (e) {
        return e == reward;
      });
    }

    function percentageDisplay(value) {
      return value + " %";
    }

    function minuteDisplay(value) {
      return value + " min";
    }

    function hourDisplay(value) {
      return value + " hrs";
    }

    function filterLeads(value) {
      return 100 - vm.formData.percentageOnLead == value;
    }

    function commandModal() {
      ModalFactory.initModal("templates/command-modal.html", $scope).then(function (modal) {
        vm.commandModal = modal;
      });
    }

    function greyhoundActivityModal() {
      ModalFactory.initModal("templates/greyhound-activity-modal.html", $scope).then(function (modal) {
        vm.greyhoundActivityModal = modal;
      });
    }

    function getDurationFormat(min) {
      var strResult = "",
          minutes = moment.duration(parseInt(min), "minutes").minutes(),
          hours = moment.duration(parseInt(min), "minutes").hours();

      strResult += hours + " " + translations.CommonHours;
      strResult += " ";
      strResult += minutes + " " + translations.CommonMinutes;

      return strResult;
    }

    function selectedCommandInit() {
      vm.formData.selectedCommand = {};

      vm.formData.verbalCommandsDuration = null;
      vm.formData.selectedVerbalCommand = null;
      vm.formData.handGesturalCommandsDuration = null;
      vm.formData.selectedHandGesturalCommand = null;
      vm.formData.whistleLaserCommandsDuration = null;
      vm.formData.selectedWhistleLaserCommand = null;
    }

    function addCommandDetail(command, commandType) {
      selectedCommandInit();

      vm.formData.selectedCommand.id = command.id;
      vm.formData.selectedCommand.name = command.name;
      vm.formData.selectedCommand.commandType = commandType;
      vm.commandModal.show();
    }

    function modalCommandCancel() {

      selectedCommandInit();
      vm.commandModal.hide();
    }

    function selectedGreyhoundActivityInit() {
      vm.formData.selectedGreyhoundActivity = {};

      vm.formData.selectedGreyhoundActivity.repetitions = null;
      vm.formData.selectedGreyhoundActivity.distance = null;
      vm.formData.selectedGreyhoundActivity.distanceUnit = null;
      vm.formData.selectedGreyhoundActivity.duration = null;
      vm.formData.selectedGreyhoundActivity.rate = null;
    }

    function addGreyhoundActivityDetail(command, commandType) {
      selectedGreyhoundActivityInit();

      vm.formData.selectedGreyhoundActivity.id = command.id;
      vm.formData.selectedGreyhoundActivity.name = command.name;
      vm.greyhoundActivityModal.show();
    }

    function modalGreyhoundActivityCancel() {

      selectedGreyhoundActivityInit();

      vm.formData.selectedRacingGreyhoundActivity = null;
      vm.greyhoundActivityModal.hide();
    }

    function modalVerbalCommandRemove(command) {
      _.remove(vm.formData.verbalCommandsItems, function (e) {
        return e == command;
      });
    }

    function modalHandGesturalCommandRemove(command) {
      _.remove(vm.formData.handGesturalCommandsItems, function (e) {
        return e == command;
      });
    }

    function modalWhistleLaserCommandRemove(command) {
      _.remove(vm.formData.whistleLaserCommandsItems, function (e) {
        return e == command;
      });
    }

    function modalCommandAdd(selectedCommand) {
      var newCommand = {
        Name: selectedCommand.name,
        Frecuency: selectedCommand.frecuency,
        Duration: selectedCommand.duration,
        TimesRequested: selectedCommand.timesRequested,
        TimesComplied: selectedCommand.timesComplied
      };

      if (selectedCommand.commandType == 1) {
        // Verbal
        newCommand.VerbalCommandId = selectedCommand.id;
        vm.formData.verbalCommandsItems.push(newCommand);
      } else if (selectedCommand.commandType == 2) {
        // Hand Gestural
        newCommand.HandGesturalCommandId = selectedCommand.id;
        vm.formData.handGesturalCommandsItems.push(newCommand);
      } else if (selectedCommand.commandType == 3) {
        // Whistle Laser
        newCommand.WhistleLaserCommandId = selectedCommand.id;
        vm.formData.whistleLaserCommandsItems.push(newCommand);
      } else {
        modalCommandCancel();
      }

      selectedCommandInit();
      vm.commandModal.hide();
    }

    function addEquipment(type, selectedEquipment) {
      var newEquipment = {
        Name: selectedEquipment.name,
        ScentDetectionOdourId: selectedEquipment.id
      };

      if (type) {
        // With Distractions
        vm.formData.equipmentWithDistractions.push(newEquipment);
        vm.formData.selectedEquipmentWithDistraction = null;
      } else {
        // With No Distractions
        vm.formData.equipmentWithNoDistractions.push(newEquipment);
        vm.formData.selectedEquipmentWithNoDistraction = null;
      }
    }

    function removeEquipmentItem(type, selectedEquipment) {
      if (type) {
        // With Distractions
        _.remove(vm.formData.equipmentWithDistractions, function (e) {
          return e == selectedEquipment;
        });
      } else {
        // With No Distractions
        _.remove(vm.formData.equipmentWithNoDistractions, function (e) {
          return e == selectedEquipment;
        });
      }
    }

    function addGreyhoundActivity(selectedGreyhoundActivity) {
      var newGreyhoundActivity = {
        Name: selectedGreyhoundActivity.name,
        RacingGreyhoundActivityId: selectedGreyhoundActivity.id,
        repetitions: selectedGreyhoundActivity.repetitions || null,
        distance: selectedGreyhoundActivity.distance || null,
        distanceUnit: selectedGreyhoundActivity.distanceUnit == 0 ? "0" : selectedGreyhoundActivity.distanceUnit,
        duration: selectedGreyhoundActivity.duration || null,
        rate: selectedGreyhoundActivity.rate || null
      };

      vm.formData.racingGreyhoundActivityItems.push(newGreyhoundActivity);
      vm.formData.selectedRacingGreyhoundActivity = null;

      selectedGreyhoundActivityInit();
      vm.greyhoundActivityModal.hide();
    }

    function removeGreyhoundActivity(selectedGreyhoundActivity) {
      _.remove(vm.formData.racingGreyhoundActivityItems, function (e) {
        return e == selectedGreyhoundActivity;
      });
    }

    function defaultSession() {
      var defaultObj = {
        peopleEnconteredGender: null,
        peopleEnconteredAgeRange: null,
        plannedEncounterNumber: null,
        plannedEncounterType: null,
        plannedEncounterGender: null,
        plannedEncounterChildren13Number: null,
        plannedEncounterTeeens1320Number: null,
        plannedEncounterAdults2065Number: null,
        plannedEncounterSeniors65Number: null,
        unplannedEncounterNumber: null,
        unplannedEncounterType: null,
        unplannedEncounterGender: null,
        unpPlannedEncounterChildren13Number: null,
        unplannedEncounterTeeens1320Number: null,
        unplannedEncounterAdults2065Number: null,
        unplannedEncounterSeniors65Number: null,
        dogEncounterNumber: null,
        dogEncounterRelationshipType: null,
        dogEncounterType: null,
        dogEncounterSameBreed: null,
        distractedByAnimalItems: [],
        surfacesItems: [],
        transportationTypeId: null,
        transportationDuration: null,
        transportationDistance: null,
        transportationDistanceUnit: null,
        transportationTravelQuality: null,
        spentTetheredDuration: null,
        spentTetheredTypeId: null,
        spentTetheredTravelQuality: null,
        createdItems: [],
        observedTime: null,
        scoredBy: null,
        verbalCommandsDuration: null,
        verbalCommandsItems: [],
        handGesturalCommandsDuration: null,
        handGesturalCommandsItems: [],
        whistleLaserCommandsDuration: null,
        whistleLaserCommandItems: [],
        otherSkillsDevelopmentDuration: null,
        otherSkillsDevelopmentItems: [],
        petDeviceMethodItems: [],
        rewardItems: [],
        correctionDeviceItem: [],
        sessionLevelId: null,
        exercisePhysicalConditionItems: [],
        otherTimeSpentDescription: null,
        otherTimeSpentDuration: null,
        guideSeeingAditionalTrainingItems: [] };
      return defaultObj;
    }

    function showMsgRequiredFieldsError() {
      PopupFactory.show("show", {
        title: "",
        template: translations.AddSessionRequiredFields,
        buttons: [{
          text: translations.CommonOk,
          type: "button-assertive",
          onTap: function onTap(e) {}
        }]
      });
    }

    function showMsgOk() {
      PopupFactory.show("show", {
        title: "",
        template: translations.AddSessionMsgSetOk,
        buttons: [{
          text: translations.CommonOk,
          type: "button-assertive",
          onTap: function onTap(e) {
            $state.go(config.homeState);
          }
        }]
      });
    }

    function showMsgError() {
      PopupFactory.show("show", {
        title: "",
        template: translations.AddSessionMsgSetError,
        buttons: [{
          text: translations.CommonOk,
          type: "button-assertive",
          onTap: function onTap(e) {}
        }]
      });
    }

    function showNoSelectedPetMsg() {
      PopupFactory.show("show", {
        title: "",
        template: translations.AddSessionMsgGetPetError,
        buttons: [{
          text: translations.CommonOk,
          type: "button-assertive",
          onTap: function onTap(e) {
            $state.go(config.homeState);
          }
        }]
      });
    }

    vm.toggleGroup = function (group) {
      if (vm.isGroupShown(group)) {
        vm.shownGroup = null;
      } else {
        $ionicScrollDelegate.scrollTop();
        vm.shownGroup = group;
      }
    };
    vm.isGroupShown = function (group) {
      return vm.shownGroup === group;
    };
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("AddSocialisationCtrl", AddSocialisationCtrl);

  function AddSocialisationCtrl($scope, $state, $stateParams, $ionicScrollDelegate, PopupFactory, ErrorMapper, BagService, LoadingMsg, PetService, species, surfaceObstacles, transportationTypes, travelQuality, relationshipTypes, locationTypes, locationSubTypes, humanGenders, ageRanges, distanceUnits, sounds, lifeExperiences, dogTypes, config, translations) {

    var vm = this;

    // defaults
    vm.maxSeizureDurationMin = config.maxSeizureDurationMin;

    // methods
    vm.save = save;
    vm.percentageDisplay = percentageDisplay;
    vm.minuteDisplay = minuteDisplay;
    vm.hourDisplay = hourDisplay;
    vm.getDurationFormat = getDurationFormat;

    function initForms() {

      $ionicScrollDelegate.scrollTop();

      vm.selectedPet = null;

      // defaults
      vm.durationHours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      vm.durationMinutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
      vm.soundItems = [];
      vm.lifeExperienceItems = [];
      vm.distractedByAnimalItems = [];

      // dependencies
      vm.surfaceObstacles = surfaceObstacles;
      vm.transportationTypes = transportationTypes;
      vm.travelQuality = travelQuality;
      vm.relationshipTypes = relationshipTypes;
      vm.locationTypes = locationTypes;
      vm.locationSubTypes = locationSubTypes;
      vm.humanGenders = humanGenders;
      vm.ageRanges = ageRanges;
      vm.distanceUnits = distanceUnits;
      vm.sounds = sounds;
      vm.lifeExperiences = lifeExperiences;
      vm.dogTypes = dogTypes;
      vm.species = species;

      // Creation
      vm.formData = {};
      vm.formData.soundIsRealItems = [];
      vm.formData.soundDurationsItems = [];
      vm.sounds.forEach(function (e) {
        vm.formData.soundIsRealItems[e.id] = false;
        vm.formData.soundDurationsItems[e.id] = 0;
      });
    }

    $scope.$on("$ionicView.beforeEnter", function () {

      initForms();

      if ($stateParams.id) {
        vm.selectedPet = BagService.get("SelectedPet");
        if (!vm.selectedPet || $stateParams.id != vm.selectedPet.id) {
          showNoSelectedPetMsg();
        }
      } else {
        showNoSelectedPetMsg();
      }
    });

    function save(formData) {
      var newSeizure = {},
          petId = null;

      formData.distractedByAnimalItems = _.chain(formData.distractedByAnimalItems).keys().value().filter(function (e) {
        return formData.distractedByAnimalItems[e] == true;
      }).map(function (e) {
        return {
          SpeciesId: parseInt(e)
        };
      });

      formData.surfacesItems = _.chain(formData.surfacesItems).keys().value().filter(function (e) {
        return formData.surfacesItems[e] == true;
      }).map(function (e) {
        return {
          SurfaceObstacleId: parseInt(e)
        };
      });

      formData.soundItems = _.chain(formData.soundItems).keys().value().filter(function (e) {
        return formData.soundItems[e] == true;
      }).map(function (e) {
        var IsReal = vm.formData.soundIsRealItems[e];
        var Duration = vm.formData.soundDurationsItems[e];

        return {
          soundId: parseInt(e),
          isReal: IsReal || false,
          duration: parseInt(Duration)
        };
      });

      formData.lifeExperienceItems = _.chain(formData.lifeExperienceItems).keys().value().filter(function (e) {
        return formData.lifeExperienceItems[e] == true;
      }).map(function (e) {
        return {
          lifeExperienceId: parseInt(e)
        };
      });

      LoadingMsg.show();
      PetService.setSocialisation(vm.selectedPet.id, formData).then(function (response) {
        vm.formData = {};

        LoadingMsg.hide();
        PopupFactory.show("show", {
          title: "",
          template: translations.AddSocialisationMsgSetOk,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {
              $state.go(config.homeState);
            }
          }]
        });
      }, function (error) {

        LoadingMsg.hide();
        PopupFactory.show("show", {
          title: "",
          template: translations.AddSocialisationMsgSetError,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {
              $state.go(config.homeState);
            }
          }]
        });
      });
    }

    function percentageDisplay(value) {
      return value + " %";
    }

    function minuteDisplay(value) {
      return value + " min";
    }

    function hourDisplay(value) {
      return value + " hrs";
    }

    function getDurationFormat(min) {
      var strResult = "",
          minutes = moment.duration(parseInt(min), "minutes").minutes(),
          hours = moment.duration(parseInt(min), "minutes").hours();

      strResult += hours + " " + translations.CommonHours;
      strResult += " ";
      strResult += minutes + " " + translations.CommonMinutes;

      return strResult;
    }

    function showNoSelectedPetMsg() {
      PopupFactory.show("show", {
        title: "",
        template: translations.AddSocialisationMsgGetPetError,
        buttons: [{
          text: translations.CommonOk,
          type: "button-assertive",
          onTap: function onTap(e) {
            $state.go(config.homeState);
          }
        }]
      });
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("AddSymptomCtrl", AddSymptomCtrl);

  function AddSymptomCtrl($ionicPlatform, $scope, $state, $filter, $timeout, $stateParams, $ionicScrollDelegate, PetService, $q, $ionicLoading, PopupFactory, $cordovaDatePicker, symptomTypes, symptomFrequencies, ErrorMapper, config, translations) {

    var vm = this;

    vm.save = save;

    function initForms() {

      $ionicScrollDelegate.scrollTop();

      vm.selectedPet = null;
      vm.symptomTypes = symptomTypes;
      vm.symptomFrequencies = symptomFrequencies;

      // Creation
      vm.formData = {};
      vm.formData.symptomTypeId = null;
      vm.formData.symptomFrequencyId = null;
      vm.formData.comment = "";
    }

    $scope.$on("$ionicView.beforeEnter", function () {

      initForms();

      if ($stateParams.id) {
        vm.selectedPetId = $stateParams.id;
      }
    });

    function save(formData) {
      var newSymptom = {},
          petId = null;

      // setting pet Id
      petId = vm.selectedPetId;

      newSymptom.symptomTypeId = formData.symptomType.id;
      newSymptom.symptomFrequencyId = formData.symptomFrequency.id;
      newSymptom.comment = formData.comment;

      $ionicLoading.show();

      PetService.setSymptom(petId, newSymptom).then(function (response) {

        // Saving Symptom
        $ionicLoading.hide();
        PopupFactory.show("show", {
          title: "",
          template: translations.AddSymtomMsgSetOk,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {
              vm.formData = {};

              $state.go(config.homeState);
            }
          }]
        });
      }, function (errors) {

        $ionicLoading.hide();

        var errorMsg = "";
        errorMsg = ErrorMapper.getErrorMsgs(errors) || translations.AddSymtomMsgSetError;

        PopupFactory.show("show", {
          title: "",
          template: errorMsg,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {}
          }]
        });
      });
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("AddTreatmentCtrl", AddTreatmentCtrl);

  function AddTreatmentCtrl($ionicPlatform, $scope, $state, $filter, $timeout, $stateParams, $ionicScrollDelegate, PetService, $q, PopupFactory, $cordovaDatePicker, treatmentTypes, BagService, ReminderService, TimeService, ErrorMapper, LoadingMsg, config, translations) {

    var vm = this;

    vm.save = save;
    vm.update = update;
    vm.getTreatmentById = getTreatmentById;
    vm.updateReminders = updateReminders;
    vm.remove = remove;

    function initForms() {

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

    $scope.$on("$ionicView.beforeEnter", function () {

      initForms();

      if ($stateParams.petId) {

        vm.selectedPet = BagService.get("SelectedPet");
        if (!vm.selectedPet || $stateParams.petId != vm.selectedPet.id) {
          showNoSelectedPetMsg();
        }

        if ($stateParams.treatmentId) {

          vm.selectedTreatment = BagService.get("SelectedTreatment");
          if (!vm.selectedTreatment || $stateParams.treatmentId != vm.selectedTreatment.id) {
            showNoSelectedTreatmentMsg();
          }

          // filling up the form
          vm.formData = objToFormMap(vm.selectedTreatment);
        }
      } else {
        showNoSelectedPetMsg();
      }
    });

    function save(formData) {
      var newTreatment = {},
          petId = null,
          petName = "";

      // setting pet Id
      petId = vm.selectedPet.id;
      petName = vm.selectedPet.name;

      // setting treatments attributes
      newTreatment = formToObjMap(formData);

      LoadingMsg.show();

      PetService.setTreatment(petId, newTreatment).then(function (treatment) {

        // updating treatment
        newTreatment.id = treatment.id;
        BagService.set("SelectedTreatment", treatment);

        LoadingMsg.hide();
        PopupFactory.show("show", {
          title: "",
          template: translations.AddTreatmentMsgTreatmentOk,
          buttons: [{
            text: translations.CommonClose,
            type: "button button-outline",
            onTap: function onTap(e) {
              vm.formData = {};
              $state.go(config.homeState);
            }
          }, {
            text: " " + translations.AddTreatmentAddReminders,
            type: "ion-android-alarm-clock button-assertive",
            onTap: function onTap(e) {
              vm.formData = {};

              $state.go("app.treatmentReminders", {
                petId: petId,
                petName: petName,
                treatmentId: newTreatment.id
              });
            }
          }]
        });
      }, function (errors) {
        // Error adding Treatment

        LoadingMsg.hide();

        var errorMsg = "";
        errorMsg = ErrorMapper.getErrorMsgs(errors) || translations.AddTreatmentMsgSetError;

        PopupFactory.show("show", {
          title: "",
          template: errorMsg,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {}
          }]
        });
      });
    }

    function update(formData) {
      var treatment = {},
          petId = null,
          petName = "";

      treatment = formToObjMap(formData);

      petId = vm.selectedPet.id;

      LoadingMsg.show();
      PetService.updateTreatment(petId, vm.selectedTreatment.id, treatment).then(function (response) {

        LoadingMsg.hide();
        PopupFactory.show("show", {
          title: "",
          template: translations.AddTreatmentMsgTreatmentUpdatedOk,
          buttons: [{
            text: translations.CommonClose,
            type: "button button-outline",
            onTap: function onTap(e) {
              vm.formData = {};
              $state.go(config.homeState);
            }
          }, {
            text: " " + translations.AddTreatmentUpdateReminders,
            type: "ion-android-alarm-clock button-assertive",
            onTap: function onTap(e) {
              vm.formData = {};

              $state.go("app.treatmentReminders", {
                petId: petId,
                treatmentId: vm.selectedTreatment.id
              });
            }
          }]
        });
      }, function (error) {

        LoadingMsg.hide();
        PopupFactory.show("show", {
          title: "",
          template: translations.AddTreatmentMsgUpdateError,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {}
          }]
        });
      });
    }

    function updateReminders() {

      $state.go("app.treatmentReminders", {
        petId: vm.selectedPet.id,
        treatmentId: vm.selectedTreatment.id
      });
    }

    function getTreatmentById(id) {
      return treatmentTypes.find(function (o) {
        return o.id == id;
      });
    }

    function formToObjMap(formData) {
      var treatment = {};

      treatment.treatmentTypeId = formData.treatmentType.id;
      treatment.customType = formData.customType;
      treatment.dateAdministered = TimeService.dateToString(formData.dateAdministered);
      treatment.dose = formData.dose;
      treatment.instructions = formData.instructions;

      return treatment;
    }

    function objToFormMap(obj) {
      var treatment = {};

      treatment.treatmentType = vm.getTreatmentById(obj.treatmentTypeId);
      treatment.customType = obj.customType;
      treatment.dateAdministered = new Date(moment(obj.dateAdministered).format("YYYY"), moment(obj.dateAdministered).format("M"), moment(obj.dateAdministered).format("D"));
      treatment.dose = obj.dose;
      treatment.instructions = obj.instructions;

      return treatment;
    }

    function remove() {
      if (vm.selectedPet && vm.selectedTreatment) {
        PopupFactory.show("show", {
          title: "",
          template: translations.CommonMsgAreYouSure,
          buttons: [{
            text: translations.CommonCancel,
            type: "button-outline",
            onTap: function onTap(e) {}
          }, {
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {
              PetService.removeTreatment(vm.selectedPet.id, vm.selectedTreatment.id).then(function (result) {
                $state.go(config.homeState);
              });
            }
          }]
        });
      }
    }

    function showNoSelectedPetMsg() {
      PopupFactory.show("show", {
        title: "",
        template: translations.AddTreatmentMsgGetPetError,
        buttons: [{
          text: translations.CommonOk,
          type: "button-assertive",
          onTap: function onTap(e) {
            $state.go(config.homeState);
          }
        }]
      });
    }

    function showNoSelectedTreatmentMsg() {
      PopupFactory.show("show", {
        title: "",
        template: translations.AddTreatmentMsgGetTreatmentError,
        buttons: [{
          text: translations.CommonOk,
          type: "button-assertive",
          onTap: function onTap(e) {
            $state.go(config.homeState);
          }
        }]
      });
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("BehavioursCtrl", BehavioursCtrl);

  function BehavioursCtrl($scope, $state, PopupFactory, ErrorMapper, LoadingMsg, BehaviourService, userPets, config, translations) {

    var vm = this;

    // methods
    vm.hasResults = hasResults;
    vm.getDurationFormat = getDurationFormat;
    vm.petChange = petChange;
    vm.remove = remove;

    function initForms() {

      vm.selectedPet = null;
      vm.results = [];
      vm.pets = userPets;
    }

    $scope.$on("$ionicView.beforeEnter", function () {
      initForms();
    });

    function getDurationFormat(min) {
      var strResult = "",
          minutes = moment.duration(parseInt(min), "minutes").minutes(),
          hours = moment.duration(parseInt(min), "minutes").hours();

      strResult += hours + " " + translations.CommonHours;
      strResult += " ";
      strResult += minutes + " " + translations.CommonMinutes;

      return strResult;
    }

    function petChange(pet) {
      vm.selectedPet = pet;

      var getOptions = {};

      LoadingMsg.show();
      BehaviourService.getBehaviours(vm.selectedPet.id, getOptions).then(function (results) {
        LoadingMsg.hide();
        vm.results = results;
      }, function (error) {
        LoadingMsg.hide();

        var errorMsg = "";
        errorMsg = translations.BehavioursMsgGetError;

        PopupFactory.show("show", {
          title: "",
          template: errorMsg,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {}
          }]
        });
      });
    }

    function remove(id) {
      if (vm.selectedPet && id) {
        PopupFactory.show("show", {
          title: "",
          template: translations.CommonMsgAreYouSure,
          buttons: [{
            text: translations.CommonCancel,
            type: "button-outline",
            onTap: function onTap(e) {}
          }, {
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {
              BehaviourService.remove(vm.selectedPet.id, id).then(function (result) {
                initForms();
              });
            }
          }]
        });
      }
    }

    function hasResults() {
      return vm.selectedPet && vm.results && vm.results.length > 0;
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("FeedsCtrl", FeedsCtrl);

  function FeedsCtrl($scope, $state, PopupFactory, ErrorMapper, LoadingMsg, PetService, userPets, config, translations) {

    var vm = this;

    // methods
    vm.hasResults = hasResults;
    vm.getDurationFormat = getDurationFormat;
    vm.petChange = petChange;
    vm.remove = remove;

    function initForms() {

      vm.selectedPet = null;
      vm.results = [];
      vm.pets = userPets;
    }

    $scope.$on("$ionicView.beforeEnter", function () {
      initForms();
    });

    function getDurationFormat(min) {
      var strResult = "",
          minutes = moment.duration(parseInt(min), "minutes").minutes(),
          hours = moment.duration(parseInt(min), "minutes").hours();

      strResult += hours + " " + translations.CommonHours;
      strResult += " ";
      strResult += minutes + " " + translations.CommonMinutes;

      return strResult;
    }

    function petChange(pet) {
      vm.selectedPet = pet;

      var getOptions = {};

      LoadingMsg.show();
      PetService.getFeed(vm.selectedPet.id, getOptions).then(function (results) {
        LoadingMsg.hide();
        vm.results = results;
      }, function (error) {
        LoadingMsg.hide();

        var errorMsg = "";
        errorMsg = translations.FeedsGetError;

        PopupFactory.show("show", {
          title: "",
          template: errorMsg,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {}
          }]
        });
      });
    }

    function remove(id) {
      if (vm.selectedPet && id) {
        PopupFactory.show("show", {
          title: "",
          template: translations.CommonMsgAreYouSure,
          buttons: [{
            text: translations.CommonCancel,
            type: "button-outline",
            onTap: function onTap(e) {}
          }, {
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {
              PetService.removeFeed(vm.selectedPet.id, id).then(function (result) {
                initForms();
              });
            }
          }]
        });
      }
    }

    function hasResults() {
      return vm.selectedPet && vm.results && vm.results.length > 0;
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("ForgotPasswordCtrl", ForgotPasswordCtrl);

  function ForgotPasswordCtrl($scope, $state, AuthService, $ionicLoading, PopupFactory, ErrorMapper, translations) {
    var vm = this;

    vm.send = send;

    $scope.$on("$ionicView.beforeEnter", function () {});

    function send(formData) {

      $ionicLoading.show();
      AuthService.forgotPassword(formData.email).then(function (response) {

        $ionicLoading.hide();
        PopupFactory.show("show", {
          title: "",
          template: response.message,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {
              $state.go("login");
            }
          }]
        });
      }, function (errors) {
        var errorMsg = "";
        errorMsg = errors.message || ErrorMapper.getErrorMsgs(errors) || translations.ForgotPasswordDefaultError;

        PopupFactory.show("show", {
          title: "",
          template: errorMsg,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {}
          }]
        });
        $ionicLoading.hide();
      });
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("HomeCtrl", HomeCtrl);

  function HomeCtrl($rootScope, $scope, $ionicPlatform, $cordovaCamera, $ionicLoading, PetService, $state, $timeout, LoadingMsg, ModalFactory, ModalService, PopupFactory, ReportService, EventService, $cordovaCalendar, $ionicActionSheet, $ionicScrollDelegate, GenderService, BagService, UserService, FieldsReminderService, TokenRest, userPets, userInfo, petTypes, translations, config) {

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
    vm.petFilters = [{ id: 1, name: "My Dogs" }, { id: 2, name: "Shared Dogs" }];

    $scope.$on("$ionicView.beforeEnter", function () {

      // setting default values
      vm.items = [];
      vm.items = userPets;
      vm.types = petTypes;
      vm.userInfo = userInfo;
      vm.petsAlerts = [];
      vm.timeline = [];
      vm.filteredPets = [];
      vm.selectedDeleteStatus = null;

      if (vm.items && vm.items.length == 1) {
        // Setting default pet as selected
        vm.setActive(vm.items[0], 0);
      }

      UserService.getPetsAlerts().then(function (alerts) {

        if (alerts && alerts.length > 0) {

          vm.petsAlerts = alerts;

          PopupFactory.show("show", {
            title: "",
            templateUrl: "templates/alerts.html",
            scope: $scope,
            buttons: [{
              text: translations.TaskAlertLater,
              type: "button button-outline",
              onTap: function onTap(e) {}
            }, {
              text: translations.CommonDone,
              type: "button-assertive",
              onTap: function onTap(e) {
                vm.setAlertsBulkConfirm();
              }
            }]
          });
        }
      });
    });

    function init() {

      UserService.getPets().then(function (result) {
        vm.items = result;
      }, function (err) {
        vm.items = [];
      });
    }

    function setAlertsBulkConfirm() {
      var alertsItems = vm.petsAlerts.map(function (x) {
        return x.id;
      });
      UserService.setPetAlertsConfirmedBulk(alertsItems).then(function (result) {}, function (err) {
        PopupFactory.show("show", {
          title: "",
          template: translations.TaskAlertError,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {}
          }]
        });
      });
    }

    function openReminderModal() {
      ModalService.show("templates/reminder.html", "ReminderCtrl as vm");
    }

    function openAddPetModal(id) {
      if (id) $state.go("app.petHome", { id: id });else $state.go("app.addPet");
    }

    function searchFilter(obj) {
      var re = new RegExp(vm.searchBy, "i");
      return !vm.searchBy || re.test(obj.name) || re.test(obj.desc);
    };

    function typeFilter(obj) {

      if (!vm.searchByType || !vm.userInfo) {
        return true;
      } else {
        if (vm.searchByType.id == 1 && vm.userInfo) {
          return vm.userInfo.id == obj.ownerId;
        } else if (vm.searchByType.id == 2 && vm.userInfo) {
          return vm.userInfo.id != obj.ownerId;
        } else {
          return true;
        }
      }
    };

    function setActive(pet, index) {
      vm.activeIndex = index;
      vm.activePet = pet;

      // Setting pet on bag.
      BagService.set("SelectedPet", pet);

      // will ask for more details randomly
      FieldsReminderService.randomRunCheck(pet);

      PetService.getTimeline(pet.id).then(function (items) {
        vm.timeline = items;
      }, function (errors) {
        vm.timeline = [];
      });
    }

    function actionMenuSession() {

      $ionicActionSheet.show({
        titleText: translations.HomeActionButtonSessionTitle,
        buttons: [{ text: "<i class=\"icon ion-clipboard\"></i> " + translations.HomeActionButtonTraining }, { text: "<i class=\"icon ion-clipboard\"></i> " + translations.HomeActionButtonAssessment }],
        cancelText: translations.CommonCancel,
        cancel: function cancel() {},
        buttonClicked: function buttonClicked(index) {

          if (index == 0 && vm.activePet) {
            $state.go("app.addSession", { id: vm.activePet.id, sessionTypeId: 1 });
          } else if (index == 1 && vm.activePet) {
            $state.go("app.addSession", { id: vm.activePet.id, sessionTypeId: 2 });
          }
          return true;
        }
      });
    }
    function actionMenuActions() {
      var optionButtons = [];

      // default option.
      optionButtons.push({ text: "<i class=\"icon ion-clipboard\"></i> " + translations.HomeActionButtonActivity });
      optionButtons.push({ text: "<i class=\"icon ion-clipboard\"></i> " + translations.HomeActionButtonBehaviour });
      optionButtons.push({ text: "<i class=\"icon ion-clipboard\"></i> " + translations.HomeActionButtonFeeding });

      if (vm.isValidPuppy(vm.activePet)) {
        optionButtons.push({ text: "<i class=\"icon ion-clipboard\"></i> " + translations.HomeActionButtonSocialisation });
      }

      $ionicActionSheet.show({
        titleText: translations.HomeActionButtonActionsTitle,
        buttons: optionButtons,
        cancelText: translations.CommonCancel,
        cancel: function cancel() {},
        buttonClicked: function buttonClicked(index) {

          if (index == 0 && vm.activePet) {
            $state.go("app.addActivity", { id: vm.activePet.id });
          } else if (index == 1 && vm.activePet) {
            $state.go("app.addBehaviour", { id: vm.activePet.id });
          } else if (index == 2 && vm.activePet) {
            $state.go("app.addFeeding", { id: vm.activePet.id });
          } else if (index == 3 && vm.activePet) {
            $state.go("app.addSocialisation", { id: vm.activePet.id });
          }
          return true;
        }
      });
    }

    function actionMenuHealth() {

      $ionicActionSheet.show({
        titleText: translations.HomeActionButtonHealthTitle,
        buttons: [{ text: "<i class=\"icon ion-clipboard\"></i> " + translations.HomeActionRecordTreatment }, { text: "<i class=\"icon ion-medkit\"></i> " + translations.HomeActionRecordSymptom }, { text: "<i class=\"icon ion-medkit\"></i> " + translations.HomeActionRecordSeizure }, { text: "<i class=\"icon ion-clipboard\"></i> " + translations.HomeActionRecordRestingRespirationRate }],
        cancelText: translations.CommonCancel,
        cancel: function cancel() {},
        buttonClicked: function buttonClicked(index) {

          if (index == 0 && vm.activePet) {
            $state.go("app.addTreatment", { petId: vm.activePet.id });
          } else if (index == 1 && vm.activePet) {
            $state.go("app.addSymptom", { id: vm.activePet.id });
          } else if (index == 2 && vm.activePet) {
            $state.go("app.addSeizure", { id: vm.activePet.id });
          } else if (index == 3 && vm.activePet) {
            $state.go("app.addRespirationRate", { id: vm.activePet.id });
          }
          return true;
        }
      });
    }

    function actionMenuMore() {
      var optionButtons = [];

      // default option.
      optionButtons.push({ text: "<i class=\"icon ion-ios-plus\"></i>" + translations.HomeActionButtonAddPet });

      if (vm.activePet) {
        optionButtons.push({ text: "<i class=\"icon ion-edit\"></i>" + translations.HomeActionButtonUpdatePet });
        optionButtons.push({ text: "<i class=\"icon ion-trash-a\"></i>" + translations.HomeActionButtonDeletePet });
      }

      $ionicActionSheet.show({
        titleText: translations.HomeActionButtonMore,
        buttons: optionButtons,
        cancelText: translations.CommonCancel,
        cancel: function cancel() {},
        buttonClicked: function buttonClicked(index) {

          if (index == 0) {
            openAddPetModal();
          } else if (index == 1 && vm.activePet) {
            openAddPetModal(vm.activePet.id);
          } else if (index == 2 && vm.activePet) {
            openDeletePetModal(vm.activePet.id);
          }
          return true;
        }
      });
    }

    function openDeletePetModal(id) {

      vm.selectedDeleteStatus = null;

      if (id) {

        LoadingMsg.show();
        PetService.getRemoveStatuses().then(function (removeStatuses) {
          LoadingMsg.hide();

          vm.removeStatuses = removeStatuses;

          PopupFactory.show("show", {
            title: "",
            templateUrl: "templates/delete-pet.html",
            scope: $scope,
            buttons: [{
              text: translations.CommonNo,
              type: "button-assertive button-outline",
              onTap: function onTap(e) {}
            }, {
              text: translations.CommonYes,
              type: "button-assertive",
              onTap: function onTap(e) {
                if (vm.selectedDeleteStatus) {
                  removePet(id, vm.selectedDeleteStatus.id);
                } else {
                  e.preventDefault();
                }
              }
            }]
          });
        }, function (err) {
          LoadingMsg.hide();

          PopupFactory.show("show", {
            title: "",
            template: translations.AddFeedingGetCountryError,
            buttons: [{
              text: translations.CommonOk,
              type: "button-assertive",
              onTap: function onTap(e) {
                $state.go(config.homeState);
              }
            }]
          });
        });
      }
    }

    function removePet(id, deleteStatus) {
      LoadingMsg.show();

      var opts = {
        deleteStatusId: deleteStatus
      };

      PetService.remove(id, opts).then(function (result) {
        LoadingMsg.hide();

        // will force to update list
        BagService.set("Pets", null);
        init();

        $state.go(config.homeState);
      }, function (err) {
        LoadingMsg.hide();

        var errorMsg = "";
        if (err && err.data && err.data.message) {
          errorMsg = err.data.message;
        } else {
          errorMsg = translations.DeletePetMsgDeleteError;
        }

        PopupFactory.show("show", {
          title: "",
          template: errorMsg,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {
              $state.go(config.homeState);
            }
          }]
        });
      });
    }

    function getBreedNames(petBreeds) {
      if (petBreeds && petBreeds.length == 1) {
        return petBreeds[0].breed.name;
      } else if (petBreeds && petBreeds.length > 1) {
        return translations.HomeMsgMixedBreed;
      } else {
        return translations.HomeMsgBreedNotSet;
      }
    }

    function getSexType(sexId) {
      var gender = GenderService.get(sexId);
      if (gender) {
        return gender.name || "";
      } else {
        return "";
      }
    }

    function getPetAge(dateOfBirth) {
      if (dateOfBirth) {
        var now = moment(new Date()); //todays date
        var end = moment(dateOfBirth); // another date
        var duration = moment.duration(now.diff(end));
        if (duration.years() == 0) {
          return "<1 y/o";
        } else {
          return duration.years() + " y/o";
        }
      } else {
        return "";
      }
    }

    function isValidPuppy(pet) {
      var diffValue = moment(new Date()).diff(pet.dateOfBirth, "months", true);
      if (diffValue <= 6) {
        return true;
      } else {
        return false;
      }
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("InitialActivityRateCtrl", InitialActivityRateCtrl);

  function InitialActivityRateCtrl($rootScope, $scope, $state, $stateParams, $ionicLoading, PopupFactory, ErrorMapper, LoadingMsg, PetService, activityEvents, activityRates, config, translations) {

    var vm = this;

    // defaults
    vm.activityEvents = _.sortBy(activityEvents, ["reportId", "event.name"]);
    vm.activityRates = activityRates;

    // methods
    vm.reportEventRatesChange = reportEventRatesChange;
    vm.getRateValueByRange = getRateValueByRange;
    vm.save = save;

    function init() {

      vm.rateNotApplicables = {};
      vm.heatmapValues = {};
      vm.rateRanges = [];

      // setting default 'Not Applicable' option
      vm.activityNotApplicableRates = activityRates.filter(function (x) {
        return x.name.indexOf("Not applicable") == 0;
      });;
      if (vm.activityNotApplicableRates && vm.activityNotApplicableRates.length >= 0) {
        vm.activityRateNotApplicable = vm.activityNotApplicableRates[0];
      }

      // All valid rates
      vm.activityRates = _.chain(activityRates).filter(function (x) {
        return x.name.indexOf("Not applicable") == -1;
      }).orderBy(["order"], ["desc"]).value();

      // Preparing valid ranges
      if (vm.activityRates && vm.activityRates.length > 0) {
        var ratesLength = vm.activityRates.length;
        vm.rateRanges = _.range(0, 100, 100 / ratesLength);
        vm.rateRanges = vm.rateRanges.slice(1, vm.rateRanges.length);
        vm.rateRanges[vm.rateRanges.length - 1] = 100;

        vm.rateRanges = _.map(vm.rateRanges, function (x, index) {
          return {
            range: x,
            id: vm.activityRates[index].id,
            name: vm.activityRates[index].name
          };
        });

        vm.rateRangesMin = vm.rateRanges[0].name || "";
        vm.rateRangesMax = vm.rateRanges[vm.rateRanges.length - 1].name || "";

        vm.activityEvents.forEach(function (e) {
          vm.heatmapValues[e.id] = 0;
        });
      }
    }

    $scope.$on("$ionicView.beforeEnter", function () {

      init();

      if ($stateParams.id) {
        vm.selectedPetId = $stateParams.id;
      } else {

        PopupFactory.show("show", {
          title: "",
          template: translations.InitialActivityRatePetError,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {
              $state.go(config.homeState);
            }
          }]
        });
      }
    });

    function reportEventRatesChange() {}

    function getRateValueByRange(heatmapValue) {
      var range = null;

      if (heatmapValue >= 0) {
        var rangeValue = heatmapValue;
        _.forEach(vm.rateRanges, function (x, index) {
          if (index == 0 && rangeValue <= x.range) {
            range = vm.rateRanges[0];
          } else if (index > 0 && rangeValue >= vm.rateRanges[index - 1].range && rangeValue <= x.range) {
            range = x;
          }
        });
      } else {
        if (!range) {
          range = heatmapValue;
        }
      }
      return range;
    }

    function save() {

      // Activities

      var ratedActivities = _.chain(vm.heatmapValues).keys().value().filter(function (e) {
        return vm.heatmapValues[e] || vm.heatmapValues[e] == 0;
      }).map(function (e) {

        var rate = {};
        if (vm.rateNotApplicables[e]) {
          // not applicable option
          rate = vm.activityRateNotApplicable;
        } else {
          rate = vm.getRateValueByRange(vm.heatmapValues[e]);
        }

        return {
          reportEventId: parseInt(e),
          rateId: rate ? rate.id : 1
        };
      });

      if (ratedActivities) {

        $ionicLoading.show();

        PetService.setBulkActivityRates(vm.selectedPetId, ratedActivities).then(function (response) {

          $ionicLoading.hide();

          PopupFactory.show("show", {
            title: "",
            template: translations.InitialActivityRateMsgOk,
            buttons: [{
              text: translations.CommonOk,
              type: "button-assertive",
              onTap: function onTap(e) {
                $state.go(config.homeState);
              }
            }]
          });
        }, function (error) {

          $ionicLoading.hide();

          var errorMsg = "";
          errorMsg = ErrorMapper.getErrorMsgs(error) || translations.InitialActivityRateMsgError;

          PopupFactory.show("show", {
            title: "",
            template: errorMsg,
            buttons: [{
              text: translations.CommonOk,
              type: "button-assertive",
              onTap: function onTap(e) {
                $state.go(config.homeState);
              }
            }]
          });
        });
      }
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("LoginCtrl", LoginCtrl);

  function LoginCtrl($scope, $state, AuthService, $ionicLoading, PopupFactory, ErrorMapper, translations) {
    var vm = this;

    // defaults
    vm.passwordType = "password";

    vm.login = login;
    vm.showPassword = showPassword;

    $scope.$on("$ionicView.beforeEnter", function () {});

    function login(formData) {

      $ionicLoading.show();
      AuthService.getUsersToken(formData).then(function (token) {

        $ionicLoading.hide();
        $state.go("app.home");
      }, function (errors) {

        PopupFactory.show("show", {
          title: "",
          template: translations.LoginDefaultError,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {}
          }]
        });

        $ionicLoading.hide();
      });
    }

    function showPassword(currentType) {
      vm.passwordType = currentType === "password" ? "text" : "password";
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("MainCtrl", MainCtrl);

  function MainCtrl(UserService) {
    var vm = this;

    vm.logout = logout;

    function logout() {
      UserService.logout();
    }
  };
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("PetHomeCtrl", PetHomeCtrl);

  function PetHomeCtrl($scope, $state, $stateParams, PopupFactory, BagService, config, translations) {

    var vm = this;

    vm.openProfile = openProfile;
    vm.openInitialActivityRate = openInitialActivityRate;
    vm.check = check;

    function initForms() {
      vm.selectedPet = null;
      vm.avatar = null;
    }

    $scope.$on("$ionicView.beforeEnter", function () {

      initForms();

      if ($stateParams.id) {
        vm.selectedPet = BagService.get("SelectedPet");
        if (!vm.selectedPet || $stateParams.id != vm.selectedPet.id) {
          showNoSelectedPetMsg();
        }
      } else {
        showNoSelectedPetMsg();
      }
    });

    function openProfile() {
      $state.go("app.addPet", { id: vm.selectedPet.id });
    }

    function openInitialActivityRate() {
      $state.go("app.initialActivityRate", { id: vm.selectedPet.id });
    }

    function check(feature) {
      if (feature == "Profile") {
        return vm.selectedPet;
      } else if (feature == "SeizureBackground") {
        return vm.selectedPet && vm.selectedPet.petSeizure;
      } else {
        return false;
      }
    }

    function showNoSelectedPetMsg() {
      PopupFactory.show("show", {
        title: "",
        template: translations.PetHomeMsgGetPetError,
        buttons: [{
          text: translations.CommonOk,
          type: "button-assertive",
          onTap: function onTap(e) {
            $state.go(config.homeState);
          }
        }]
      });
    }
  };
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("PetSeizureCtrl", PetSeizureCtrl);

  function PetSeizureCtrl($scope, $state, $stateParams, PopupFactory, ErrorMapper, BagService, LoadingMsg, PetService, ageFirstTimeSeizures, seizureDiagnosis, seizureTestTypes, config, translations) {

    var vm = this;

    // methods
    vm.save = save;
    vm.ageFirstTimeById = ageFirstTimeById;
    vm.seizureDiagnosisById = seizureDiagnosisById;
    vm.testCheckboxChange = testCheckboxChange;

    function initForms() {

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

    $scope.$on("$ionicView.beforeEnter", function () {

      initForms();

      if ($stateParams.id) {

        PopupFactory.show("show", {
          title: "",
          template: translations.PetSeizureMsgVideo,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {}
          }]
        });

        vm.selectedPet = BagService.get("SelectedPet");
        if (!vm.selectedPet || $stateParams.id != vm.selectedPet.id) {
          showNoSelectedPetMsg();
        }
        if (vm.selectedPet && vm.selectedPet.petSeizure) {

          var seizure = vm.selectedPet.petSeizure;

          // load seizure background
          vm.formData.everHadASeizure = true;

          vm.formData.ageFirstTime = vm.ageFirstTimeById(seizure.ageFirstTime);

          // setting tests options
          seizure.seizureTests.forEach(function (s) {
            vm.formData.seizureTests[s.seizureTestTypeId] = true;
          });

          vm.formData.seizureDiagnosis = seizureDiagnosisById(seizure.seizureDiagnosisId);
          vm.formData.clusterSeizures = seizure.clusterSeizures;
          vm.formData.statusEpilepticus = seizure.statusEpilepticus;
        }
      } else {
        showNoSelectedPetMsg();
      }
    });

    function save(formData) {
      var newSeizure = {},
          petId = null;

      // setting up seizure
      newSeizure.ageFirstTime = formData.ageFirstTime.id;
      newSeizure.seizureTests = _.chain(formData.seizureTests).keys().value().filter(function (e) {
        return formData.seizureTests[e] == true;
      }).map(function (e) {
        return { seizureTestTypeId: parseInt(e)
        };
      });

      newSeizure.seizureDiagnosisId = formData.seizureDiagnosis.id;
      newSeizure.clusterSeizures = formData.clusterSeizures || false;
      newSeizure.statusEpilepticus = formData.statusEpilepticus || false;

      LoadingMsg.show();
      PetService.updateSeizureBackground(vm.selectedPet.id, newSeizure).then(function (result) {

        // will force to update list
        BagService.set("Pets", null);

        LoadingMsg.hide();
        PopupFactory.show("show", {
          title: "",
          template: translations.PetSeizureMsgSeizureOk,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {
              vm.formData = {};
              $state.go(config.homeState);
            }
          }]
        });
      }, function (error) {

        LoadingMsg.hide();
        PopupFactory.show("show", {
          title: "",
          template: translations.PetSeizureMsgSeizureError,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {}
          }]
        });
      });
    }

    function testCheckboxChange(id, value) {
      vm.formData.seizureTests[id] = value;
    }

    function ageFirstTimeById(id) {
      return vm.ageFirstTimeSeizures.find(function (e) {
        return e.id == id;
      });
    }

    function seizureDiagnosisById(id) {
      return vm.seizureDiagnosis.find(function (e) {
        return e.id == id;
      });
    }

    function showNoSelectedPetMsg() {
      PopupFactory.show("show", {
        title: "",
        template: translations.PetSeizureMsgGetPetError,
        buttons: [{
          text: translations.CommonOk,
          type: "button-assertive",
          onTap: function onTap(e) {
            $state.go(config.homeState);
          }
        }]
      });
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("ProfileCtrl", ProfileCtrl);

  function ProfileCtrl($scope, $state, $ionicScrollDelegate, $ionicLoading, PopupFactory, UserService, userInfo, countries, translations, config) {

    var vm = this;

    // methods
    vm.update = update;

    function init() {

      vm.userInfo = userInfo;
      vm.countries = countries;
      vm.selectedCountry = null;

      if (vm.userInfo && vm.userInfo.countryId) {
        vm.selectedCountry = getCountryById(vm.userInfo.countryId);
      }

      if (vm.userInfo && vm.userInfo.children13 >= 0) {
        vm.children13 = vm.userInfo.children13;
      }

      if (vm.userInfo && vm.userInfo.teens >= 0) {
        vm.teens = vm.userInfo.teens;
      }

      if (vm.userInfo && vm.userInfo.adults >= 0) {
        vm.adults = vm.userInfo.adults;
      }

      if (vm.userInfo && vm.userInfo.seniors >= 0) {
        vm.seniors = vm.userInfo.seniors;
      }

      if (vm.userInfo && vm.userInfo.postCode) {
        vm.postCode = vm.userInfo.postCode;
      }
    }

    $scope.$on("$ionicView.beforeEnter", function () {

      init();
    });

    function update() {

      if (vm.selectedCountry) {
        $ionicLoading.show();

        var userData = {
          postCode: vm.postCode,
          children13: vm.children13 || 0,
          teens: vm.teens || 0,
          adults: vm.adults || 0,
          seniors: vm.seniors || 0,
          countryId: vm.selectedCountry.id
        };

        UserService.setUserQuestion(userData).then(function (response) {

          // Saving Symptom
          $ionicLoading.hide();
          PopupFactory.show("show", {
            title: "",
            template: translations.ProfileUpdateOk,
            buttons: [{
              text: translations.CommonOk,
              type: "button-assertive",
              onTap: function onTap(e) {
                vm.formData = {};

                $state.go(config.homeState);
              }
            }]
          });
        }, function (errors) {

          $ionicLoading.hide();

          var errorMsg = "";
          errorMsg = translations.ProfileUpdateError;

          PopupFactory.show("show", {
            title: "",
            template: errorMsg,
            buttons: [{
              text: translations.CommonOk,
              type: "button-assertive",
              onTap: function onTap(e) {}
            }]
          });
        });
      }
    }

    function getCountryById(id) {
      return vm.countries.find(function (g) {
        return g.id == id;
      });
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("ReminderCtrl", function ($scope, parameters) {
    var vm = this;

    vm.cancel = cancel;
    vm.set = set;

    function init() {
      var viewForm = {
        date: null,
        treatment: null,
        frecuency: null,
        active: false
      };
      vm.reminder = angular.copy(viewForm);
    }

    function cancel() {
      init();
      vm.closeModal();
    }

    function set() {}
  });
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("RespirationRatesCtrl", RespirationRatesCtrl);

  function RespirationRatesCtrl($scope, $state, PopupFactory, ErrorMapper, LoadingMsg, PetService, userPets, config, translations) {

    var vm = this;

    // methods
    vm.hasResults = hasResults;
    vm.getDurationFormat = getDurationFormat;
    vm.petChange = petChange;
    vm.remove = remove;

    function initForms() {

      vm.selectedPet = null;
      vm.results = [];
      vm.pets = userPets;
    }

    $scope.$on("$ionicView.beforeEnter", function () {
      initForms();
    });

    function getDurationFormat(min) {
      var strResult = "",
          minutes = moment.duration(parseInt(min), "minutes").minutes(),
          hours = moment.duration(parseInt(min), "minutes").hours();

      strResult += hours + " " + translations.CommonHours;
      strResult += " ";
      strResult += minutes + " " + translations.CommonMinutes;

      return strResult;
    }

    function petChange(pet) {
      vm.selectedPet = pet;

      var getOptions = {};

      LoadingMsg.show();
      PetService.getRespirationRate(vm.selectedPet.id, getOptions).then(function (results) {
        LoadingMsg.hide();
        vm.results = results;
      }, function (error) {
        LoadingMsg.hide();

        var errorMsg = "";
        errorMsg = translations.RespirationRateMsgGetError;

        PopupFactory.show("show", {
          title: "",
          template: errorMsg,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {}
          }]
        });
      });
    }

    function remove(id) {
      if (vm.selectedPet && id) {
        PopupFactory.show("show", {
          title: "",
          template: translations.CommonMsgAreYouSure,
          buttons: [{
            text: translations.CommonCancel,
            type: "button-outline",
            onTap: function onTap(e) {}
          }, {
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {
              PetService.removeRespirationRate(vm.selectedPet.id, id).then(function (result) {
                initForms();
              });
            }
          }]
        });
      }
    }

    function hasResults() {
      return vm.selectedPet && vm.results && vm.results.length > 0;
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("SeizuresCtrl", SeizuresCtrl);

  function SeizuresCtrl($scope, $state, PopupFactory, ErrorMapper, LoadingMsg, PetService, userPets, config, translations) {

    var vm = this;

    // methods
    vm.hasResults = hasResults;
    vm.getDurationFormat = getDurationFormat;
    vm.petChange = petChange;
    vm.remove = remove;

    function initForms() {

      vm.selectedPet = null;
      vm.results = [];
      vm.pets = userPets;
    }

    $scope.$on("$ionicView.beforeEnter", function () {
      initForms();
    });

    function getDurationFormat(min) {
      var strResult = "",
          minutes = moment.duration(parseInt(min), "minutes").minutes(),
          hours = moment.duration(parseInt(min), "minutes").hours();

      strResult += hours + " " + translations.CommonHours;
      strResult += " ";
      strResult += minutes + " " + translations.CommonMinutes;

      return strResult;
    }

    function petChange(pet) {
      vm.selectedPet = pet;

      var getOptions = {};

      LoadingMsg.show();
      PetService.getSeizures(vm.selectedPet.id, getOptions).then(function (results) {
        LoadingMsg.hide();
        vm.results = results;
      }, function (error) {
        LoadingMsg.hide();

        var errorMsg = "";
        errorMsg = translations.SeizuresMsgGetError;

        PopupFactory.show("show", {
          title: "",
          template: errorMsg,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {}
          }]
        });
      });
    }

    function remove(id) {
      if (vm.selectedPet && id) {
        PopupFactory.show("show", {
          title: "",
          template: translations.CommonMsgAreYouSure,
          buttons: [{
            text: translations.CommonCancel,
            type: "button-outline",
            onTap: function onTap(e) {}
          }, {
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {
              PetService.removeSeizures(vm.selectedPet.id, id).then(function (result) {
                initForms();
              });
            }
          }]
        });
      }
    }

    function hasResults() {
      return vm.selectedPet && vm.results && vm.results.length > 0;
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("SignUpCtrl", SignUpCtrl);

  function SignUpCtrl($scope, $state, $filter, AuthService, $ionicLoading, PopupFactory, ErrorMapper, translations, config) {
    var vm = this;

    // defaults
    vm.minValidDate = config.minValidDate;
    vm.passwordType = "password";

    // methods
    vm.send = send;
    vm.showPassword = showPassword;

    $scope.$on("$ionicView.beforeEnter", function () {});

    function send(formData) {
      var newUser = {};

      newUser.email = formData.email;
      newUser.password = formData.password;
      newUser.confirmPassword = formData.password;
      newUser.firstName = formData.firstName;
      newUser.lastName = formData.lastName;

      $ionicLoading.show();
      AuthService.createUser(newUser).then(function (response) {

        $ionicLoading.hide();
        $state.go("login");
      }, function (err) {
        var errorMsg = "";
        errorMsg = err.message || ErrorMapper.getErrorMsgs(err) || translations.SignUpDefaultError;

        PopupFactory.show("show", {
          title: "",
          template: errorMsg,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {}
          }]
        });
        $ionicLoading.hide();
      });
    }

    function showPassword(currentType) {
      vm.passwordType = currentType === "password" ? "text" : "password";
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("SocialisationsCtrl", SocialisationsCtrl);

  function SocialisationsCtrl($scope, $state, PopupFactory, ErrorMapper, LoadingMsg, PetService, userPets, config, translations) {

    var vm = this;

    // methods
    vm.hasResults = hasResults;
    vm.getDurationFormat = getDurationFormat;
    vm.petChange = petChange;
    vm.remove = remove;

    function initForms() {

      vm.selectedPet = null;
      vm.results = [];
      vm.pets = userPets;
    }

    $scope.$on("$ionicView.beforeEnter", function () {
      initForms();
    });

    function getDurationFormat(min) {
      var strResult = "",
          minutes = moment.duration(parseInt(min), "minutes").minutes(),
          hours = moment.duration(parseInt(min), "minutes").hours();

      strResult += hours + " " + translations.CommonHours;
      strResult += " ";
      strResult += minutes + " " + translations.CommonMinutes;

      return strResult;
    }

    function petChange(pet) {
      vm.selectedPet = pet;

      var getOptions = {};

      LoadingMsg.show();
      PetService.getSocialisation(vm.selectedPet.id, getOptions).then(function (results) {
        LoadingMsg.hide();
        vm.results = results;
      }, function (error) {
        LoadingMsg.hide();

        var errorMsg = "";
        errorMsg = translations.SocialisationsMsgGetError;

        PopupFactory.show("show", {
          title: "",
          template: errorMsg,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {}
          }]
        });
      });
    }

    function remove(id) {
      if (vm.selectedPet && id) {
        PopupFactory.show("show", {
          title: "",
          template: translations.CommonMsgAreYouSure,
          buttons: [{
            text: translations.CommonCancel,
            type: "button-outline",
            onTap: function onTap(e) {}
          }, {
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {
              PetService.removeSocialisation(vm.selectedPet.id, id).then(function (result) {
                initForms();
              });
            }
          }]
        });
      }
    }

    function hasResults() {
      return vm.selectedPet && vm.results && vm.results.length > 0;
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("SymptomsCtrl", SymptomsCtrl);

  function SymptomsCtrl($scope, $state, PopupFactory, ErrorMapper, LoadingMsg, PetService, userPets, config, translations) {

    var vm = this;

    // methods
    vm.hasResults = hasResults;
    vm.getDurationFormat = getDurationFormat;
    vm.petChange = petChange;
    vm.remove = remove;

    function initForms() {

      vm.selectedPet = null;
      vm.results = [];
      vm.pets = userPets;
    }

    $scope.$on("$ionicView.beforeEnter", function () {
      initForms();
    });

    function getDurationFormat(min) {
      var strResult = "",
          minutes = moment.duration(parseInt(min), "minutes").minutes(),
          hours = moment.duration(parseInt(min), "minutes").hours();

      strResult += hours + " " + translations.CommonHours;
      strResult += " ";
      strResult += minutes + " " + translations.CommonMinutes;

      return strResult;
    }

    function petChange(pet) {
      vm.selectedPet = pet;

      var getOptions = {};

      LoadingMsg.show();
      PetService.getSymptom(vm.selectedPet.id, getOptions).then(function (results) {
        LoadingMsg.hide();
        vm.results = results;
      }, function (error) {
        LoadingMsg.hide();

        var errorMsg = "";
        errorMsg = translations.SymtomsMsgGetError;

        PopupFactory.show("show", {
          title: "",
          template: errorMsg,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {}
          }]
        });
      });
    }

    function remove(id) {
      if (vm.selectedPet && id) {
        PopupFactory.show("show", {
          title: "",
          template: translations.CommonMsgAreYouSure,
          buttons: [{
            text: translations.CommonCancel,
            type: "button-outline",
            onTap: function onTap(e) {}
          }, {
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {
              PetService.removeSymptom(vm.selectedPet.id, id).then(function (result) {
                initForms();
              });
            }
          }]
        });
      }
    }

    function hasResults() {
      return vm.selectedPet && vm.results && vm.results.length > 0;
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("TreatmentReminderCtrl", TreatmentReminderCtrl);

  function TreatmentReminderCtrl($ionicPlatform, $scope, $state, $window, $filter, $timeout, $stateParams, $ionicScrollDelegate, PetService, $q, LoadingMsg, PopupFactory, $cordovaDatePicker, BagService, $cordovaCalendar, ReminderService, TimeService, ErrorMapper, config, translations) {

    var vm = this;

    vm.save = save;
    vm.addReminder = addReminder;
    vm.removeReminder = removeReminder;
    vm.done = done;

    function initForms() {

      vm.selectedPet = null;
      vm.currentReminders = [];

      // Creation
      vm.formData = {};
      vm.formData.reminders = [];

      // datetime format
      vm.apiDateTimeFormat = config.apiDateTimeFormat;
    }

    $scope.$on("$ionicView.beforeEnter", function () {

      initForms();

      if (!$stateParams.petId) {
        showNoSelectedPetMsg();
      } else if ($stateParams.petId && !$stateParams.treatmentId) {
        showNoSelectedTreatmentMsg();
      }

      if ($stateParams.petId && $stateParams.treatmentId) {

        vm.selectedPet = BagService.get("SelectedPet");
        if (!vm.selectedPet || $stateParams.petId != vm.selectedPet.id) {
          showNoSelectedPetMsg();
        }

        vm.selectedTreatment = BagService.get("SelectedTreatment");
        if (!vm.selectedTreatment || $stateParams.treatmentId != vm.selectedTreatment.id) {
          showNoSelectedTreatmentMsg();
        }

        LoadingMsg.show();
        PetService.getTreatmentRemindersByPetIdTreatmentId(vm.selectedPet.id, vm.selectedTreatment.id).then(function (reminders) {

          LoadingMsg.hide();
          vm.currentReminders = reminders;
          vm.formData.reminders = reminders.map(function (e) {
            e.displayDate = TimeService.dateToString(e.doseDateTime);
            return e;
          });
        }, function (error) {

          LoadingMsg.hide();
          PopupFactory.show("show", {
            title: "",
            template: translations.TreatmentReminderMsgGetRemindersError,
            buttons: [{
              text: translations.CommonOk,
              type: "button-assertive",
              onTap: function onTap(e) {
                vm.formData = {};
                $window.history.back();
              }
            }]
          });
        });
      } else {
        showNoSelectedPetMsg();
      }
    });

    function save(formData) {
      var petId = null,
          petName = "",
          treatmentId = null;

      // setting pet Id
      petId = vm.selectedPet.id;
      petName = vm.selectedPet.name;
      treatmentId = vm.selectedTreatment.id;

      var bulkReminders = formData.reminders.map(function (e) {
        e.doseDateTime = TimeService.dateToString(e.displayDate);
        return e;
      });

      if (bulkReminders && bulkReminders.length > 0) {
        // There are reminders to set

        var title = vm.selectedPet.name + ": " + vm.selectedTreatment.treatmentType.name;
        var instructions = vm.selectedTreatment.instructions || "";

        ReminderService.removeBulk(vm.currentReminders);

        LoadingMsg.show();
        ReminderService.setBulk(title, instructions, formData.reminders).then(function (reminders) {

          PetService.setBulkTreatmentReminders(petId, treatmentId, reminders).then(function (result) {

            LoadingMsg.hide();
            PopupFactory.show("show", {
              title: "",
              template: translations.TreatmentReminderMsgTreatmentRemindersOk,
              buttons: [{
                text: translations.CommonOk,
                type: "button-assertive",
                onTap: function onTap(e) {
                  vm.formData = {};

                  $state.go(config.homeState);
                }
              }]
            });
          }, function (error) {

            LoadingMsg.hide();

            // removing native reminders
            var events = formData.reminders.map(function (r) {
              return JSON.parse(r.jsonObj);
            });
            ReminderService.removeBulk(events);

            // An error pushing reminder to the server, Need to remove all created calendars.
            PopupFactory.show("show", {
              title: "",
              template: translations.TreatmentReminderMsgSetRemindersError,
              buttons: [{
                text: translations.CommonOk,
                type: "button-assertive",
                onTap: function onTap(e) {}
              }]
            });
          });
        }, function (error) {

          LoadingMsg.hide();
          PopupFactory.show("show", {
            title: "",
            template: translations.TreatmentReminderMsgSetNativeRemindersError,
            buttons: [{
              text: translations.CommonOk,
              type: "button-assertive",
              onTap: function onTap(e) {}
            }]
          });
        });
      } else {
        // Saving Treatment with no Reminders

        LoadingMsg.hide();
        PopupFactory.show("show", {
          title: "",
          template: translations.TreatmentReminderMsgTreatmentOk,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {
              vm.formData = {};

              $state.go(config.homeState);
            }
          }]
        });
      }
    }

    function addReminder() {
      var petId = null,
          treatmentId = null;

      // setting pet Id
      petId = vm.selectedPet.id;
      treatmentId = vm.selectedTreatment.id;

      var newReminderDateTime = TimeService.dateToString(new Date());
      var title = vm.selectedPet.name + ": " + vm.selectedTreatment.treatmentType.name;
      var instructions = vm.selectedTreatment.instructions || "";

      var newReminder = {
        title: vm.selectedPet.name + ": " + vm.selectedTreatment.treatmentType.name,
        instructions: vm.selectedTreatment.instructions || "",
        startDate: TimeService.formatToDatetime(newReminderDateTime),
        endDate: TimeService.formatToDatetime(newReminderDateTime)
      };

      ReminderService.set(newReminder.title, newReminder.instructions, newReminder.startDate, newReminder.endDate, true).then(function (reminderObj) {

        var newApiReminder = {
          JsonObj: reminderObj,
          doseDateTime: TimeService.dateToString(newReminderDateTime)
        };

        PetService.setTreatmentReminder(petId, treatmentId, newApiReminder).then(function (reminderResult) {

          LoadingMsg.hide();
          reminderResult.displayDate = newReminderDateTime;

          PopupFactory.show("show", {
            title: "",
            template: translations.TreatmentReminderMsgTreatmentRemindersOk,
            buttons: [{
              text: translations.CommonOk,
              type: "button-assertive",
              onTap: function onTap(e) {}
            }]
          });

          vm.formData.reminders.push(reminderResult);
        }, function (error) {

          LoadingMsg.hide();
          PopupFactory.show("show", {
            title: "",
            template: translations.TreatmentReminderMsgSetRemindersError,
            buttons: [{
              text: translations.CommonOk,
              type: "button-assertive",
              onTap: function onTap(e) {}
            }]
          });
        });
      }, function (error) {

        LoadingMsg.hide();
        PopupFactory.show("show", {
          title: "",
          template: translations.TreatmentReminderMsgSetNativeRemindersError,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {}
          }]
        });
      });
    }

    function removeReminder(reminder) {
      var petId = null,
          reminderId = null,
          treatmentId = null;

      var delReminder = reminder;

      if (reminder.jsonObj) {

        var event = JSON.parse(reminder.jsonObj);

        petId = vm.selectedPet.id;
        treatmentId = vm.selectedTreatment.id;
        reminderId = reminder.id;

        LoadingMsg.show();
        ReminderService.remove(event).then(function (reminder) {

          PetService.removeTreatmentReminder(petId, treatmentId, reminderId).then(function (result) {
            LoadingMsg.hide();

            PopupFactory.show("show", {
              title: "",
              template: translations.TreatmentReminderMsgTreatmentRemindersRemoveOk,
              buttons: [{
                text: translations.CommonOk,
                type: "button-assertive",
                onTap: function onTap(e) {}
              }]
            });

            // reset reminder inputs
            vm.formData.dateAddReminder = null;
            vm.formData.timeAddReminder = null;
          }, function (error) {

            LoadingMsg.hide();
            PopupFactory.show("show", {
              title: "",
              template: translations.TreatmentReminderMsgRemoveRemindersError,
              buttons: [{
                text: translations.CommonOk,
                type: "button-assertive",
                onTap: function onTap(e) {}
              }]
            });
          });
        }, function (error) {

          LoadingMsg.hide();
          PopupFactory.show("show", {
            title: "",
            template: translations.TreatmentReminderMsgRemoveNativeRemindersError,
            buttons: [{
              text: translations.CommonOk,
              type: "button-assertive",
              onTap: function onTap(e) {}
            }]
          });
        });
      }

      // removing item from list;
      _.remove(vm.formData.reminders, function (e) {
        return e == reminder;
      });
    }

    function done() {
      $state.go(config.homeState);
    }

    function showNoSelectedPetMsg() {
      PopupFactory.show("show", {
        title: "",
        template: translations.AddTreatmentMsgGetPetError,
        buttons: [{
          text: translations.CommonOk,
          type: "button-assertive",
          onTap: function onTap(e) {
            $state.go(config.homeState);
          }
        }]
      });
    }

    function showNoSelectedTreatmentMsg() {
      PopupFactory.show("show", {
        title: "",
        template: translations.AddTreatmentMsgGetTreatmentError,
        buttons: [{
          text: translations.CommonOk,
          type: "button-assertive",
          onTap: function onTap(e) {
            $state.go(config.homeState);
          }
        }]
      });
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("TreatmentsCtrl", TreatmentsCtrl);

  function TreatmentsCtrl($scope, $state, LoadingMsg, PopupFactory, PetService, BagService, $ionicHistory, userPets, translations) {

    var vm = this;

    vm.hasResults = hasResults;
    vm.petChange = petChange;
    vm.edit = edit;

    function initForms() {

      vm.selectedPet = null;
      vm.pets = userPets;
    }

    $scope.$on("$ionicView.beforeEnter", function () {

      initForms();
    });

    function petChange(pet) {
      vm.selectedPet = pet;

      LoadingMsg.show();
      PetService.getTreatment(vm.selectedPet.id).then(function (treatments) {
        LoadingMsg.hide();
        vm.treatments = treatments;
      }, function (error) {
        LoadingMsg.hide();

        var errorMsg = "";
        errorMsg = translations.TreatmentsMsgTreatmentsError;

        PopupFactory.show("show", {
          title: "",
          template: errorMsg,
          buttons: [{
            text: translations.CommonOk,
            type: "button-assertive",
            onTap: function onTap(e) {}
          }]
        });
      });
    }

    function edit(pet, treatment) {
      BagService.set("SelectedPet", pet);
      BagService.set("SelectedTreatment", treatment);

      $ionicHistory.clearCache().then(function () {
        $state.go("app.addTreatment", { petId: pet.id, treatmentId: treatment.id });
      });
    }

    function hasResults() {
      return vm.selectedPet && vm.treatments && vm.treatments.length > 0;
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("AgeAcquiredService", AgeAcquiredService);

  function AgeAcquiredService() {
    var service = this;
    var list = [{ id: 0, name: "unknown" }, { id: 1, name: "<6 weeks" }, { id: 2, name: "6-8 weeks" }, { id: 3, name: "9-12 weeks" }, { id: 4, name: "13-16 weeks" }, { id: 5, name: "17-24 weeks" }, { id: 6, name: "24+ weeks" }];

    // methods
    service.get = get;
    service.getAll = getAll;

    return service;

    function get(id) {
      return list.find(function (g) {
        return g.id == id;
      });
    }

    function getAll() {
      return list;
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("AgeDesexedService", AgeDesexedService);

  function AgeDesexedService() {
    var service = this;
    var list = [{ id: 0, name: "unknown" }, { id: 1, name: "<3 months" }, { id: 2, name: "3-6 months" }, { id: 3, name: "7-12 months" }, { id: 4, name: "12-18 months" }, { id: 5, name: "18+ months" }];

    // methods
    service.get = get;
    service.getAll = getAll;

    return service;

    function get(id) {
      return list.find(function (g) {
        return g.id == id;
      });
    }

    function getAll() {
      return list;
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("AgeFirstTimeSeizureService", AgeFirstTimeSeizureService);

  function AgeFirstTimeSeizureService() {
    var service = this;
    var list = [{ id: 0, name: "unknown" }, { id: 1, name: "<3 months" }, { id: 2, name: "3-6 months" }, { id: 3, name: "7-12 months" }, { id: 4, name: "12-18 months" }, { id: 5, name: "18+ months" }];
    // methods
    service.get = get;
    service.getAll = getAll;

    return service;

    function get(id) {
      return list.find(function (g) {
        return g.id == id;
      });
    }

    function getAll() {
      return list;
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("AuthService", AuthService);

  function AuthService(Restangular, $q, $httpParamSerializerJQLike, $localStorage, config) {
    var authService = this;

    // methods
    authService.createUser = createUser;
    authService.getUsersToken = getUsersToken;
    authService.logoutUser = logoutUser;
    authService.isTokenValid = isTokenValid;
    authService.forgotPassword = forgotPassword;

    return authService;

    function createUser(user) {
      var base = Restangular.all("account/register");
      return base.post(user);
    }

    function getUsersToken(user) {
      var defer = $q.defer();
      var base = Restangular.all("token");

      user.grant_type = "password";
      base.post($httpParamSerializerJQLike(user), {}, { "Content-Type": "application/x-www-form-urlencoded" }).then(function (result) {
        $localStorage.setObject("s1token", result);
        defer.resolve(result);
      }, function (error) {
        defer.reject(error);
      });

      return defer.promise;
    }

    function logoutUser() {
      $localStorage.removeKey("s1token");
    }

    function isTokenValid() {
      var token = $localStorage.getObject("s1token");

      if (token) {
        var expDate = new Date(token[".expires"]);
        var nowDate = moment();

        if (expDate > nowDate) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }

    function forgotPassword(username) {
      var base = Restangular.all("account/forgotpassword");
      return base.customPOST(undefined, undefined, { userName: username }, {});
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("BagService", BagService);

  function BagService() {
    var service = this;

    service.bag = {};

    // methods
    service.set = set;
    service.get = get;

    return service;

    function set(key, value) {
      console.log("Bag set: ", key);
      service.bag[key] = angular.copy(value);
    }

    function get(key, value) {
      console.log("Bag get: ", key);
      return service.bag[key];
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("BehaviourService", BehaviourService);

  function BehaviourService(TokenRest, $q, ErrorMapper) {
    var service = this;

    // methods
    service.set = set;
    service.remove = remove;
    service.setDestructive = setDestructive;
    service.setSenior = setSenior;
    service.setFearRelated = setFearRelated;
    service.setAggressive = setAggressive;
    service.getTypes = getTypes;
    service.getItemTypesByTypeId = getItemTypesByTypeId;
    service.getObservationTypes = getObservationTypes;
    service.getLocationTypes = getLocationTypes;
    service.getNearResourceTypes = getNearResourceTypes;
    service.getDirectedTowards = getDirectedTowards;
    service.getDirectedTowardTypes = getDirectedTowardTypes;
    service.getDestroyedObjects = getDestroyedObjects;
    service.getBehaviourDuringTypes = getBehaviourDuringTypes;
    service.getBehaviours = getBehaviours;

    service.behaviourTypes = [{ id: 1, name: "Vocalising" }, { id: 2, name: "Destructive" }, { id: 3, name: "Repetitive" }, { id: 4, name: "Toileting/Elimination-related" }, { id: 5, name: "Escaping/evading" }, { id: 6, name: "Other" }, { id: 7, name: "Senior" }, { id: 8, name: "Aggressive" }, { id: 9, name: "Fear-related" }, { id: 10, name: "Anxiety-related" }];

    service.directedTowardTypes = [{ id: 1, name: "Familiar" }, { id: 2, name: "Unfamiliar" }, { id: 3, name: "Both" }];

    return service;

    function set(petId, obj) {
      var base = TokenRest.one("pets", petId);
      return base.customPOST(obj, "behaviour");
    }

    function remove(petId, id) {
      var base = TokenRest.one("pets", petId).one("behaviour", id);
      return base.remove();
    }

    function getBehaviours(petId, options) {
      var base = TokenRest.one("pets", petId);
      return base.customGET("behaviour", options);
    }

    function setDestructive(petId, obj) {
      var base = TokenRest.one("pets", petId);
      return base.customPOST(obj, "behaviour/destructive");
    }

    function setSenior(petId, obj) {
      var base = TokenRest.one("pets", petId);
      return base.customPOST(obj, "behaviour/senior");
    }

    function setFearRelated(petId, obj) {
      var base = TokenRest.one("pets", petId);
      return base.customPOST(obj, "behaviour/fearrelated");
    }

    function setAggressive(petId, obj) {
      var base = TokenRest.one("pets", petId);
      return base.customPOST(obj, "behaviour/aggresive");
    }

    function getTypes() {
      return service.behaviourTypes;
    }

    function getItemTypesByTypeId(typeId) {
      var base = TokenRest.one("behaviour", typeId);
      return base.customGET("itemTypes");
    }

    function getObservationTypes() {
      var base = TokenRest.all("behaviour/observationTypes");
      return base.getList();
    }

    function getLocationTypes() {
      var base = TokenRest.all("behaviour/locationTypes");
      return base.getList();
    }

    function getNearResourceTypes() {
      var base = TokenRest.all("behaviour/nearResources");
      return base.getList();
    }

    function getDirectedTowards() {
      var base = TokenRest.all("behaviour/behaviourDirectedTowards");
      return base.getList();
    }

    function getDirectedTowardTypes() {
      return service.directedTowardTypes;
    }

    function getDestroyedObjects() {
      var base = TokenRest.all("behaviour/destroyedObjects");
      return base.getList();
    }

    function getBehaviourDuringTypes() {
      var base = TokenRest.all("behaviour/behaviourDuringTypes");
      return base.getList();
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("CommandFrecuencyService", CommandFrecuencyService);

  function CommandFrecuencyService() {
    var service = this;
    var list = [{ id: 1, name: "Never" }, { id: 2, name: "Seldom" }, { id: 3, name: "Sometimes" }, { id: 4, name: "Usually" }, { id: 5, name: "Always" }, { id: 6, name: "Not Applicable" }];

    // methods
    service.get = get;
    service.getAll = getAll;

    return service;

    function get(id) {
      return list.find(function (g) {
        return g.id == id;
      });
    }

    function getAll() {
      return list;
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("CommonService", CommonService);

  function CommonService(TokenRest, $q) {
    var service = this;

    // methods
    service.getCountries = getCountries;
    service.getSpecies = getSpecies;
    service.getSpeciesTypes = getSpeciesTypes;
    service.getSurfaceObstacles = getSurfaceObstacles;
    service.getTransportationTypes = getTransportationTypes;
    service.getLocationSubTypes = getLocationSubTypes;

    return service;

    function getCountries() {
      var base = TokenRest.all("common/countries");
      return base.getList();
    }

    function getSpecies() {
      var base = TokenRest.all("common/species");
      return base.getList();
    }

    function getSpeciesTypes() {
      var base = TokenRest.all("common/speciesTypes");
      return base.getList();
    }

    function getSurfaceObstacles() {
      var base = TokenRest.all("common/SurfaceObstacles");
      return base.getList();
    }

    function getTransportationTypes() {
      var base = TokenRest.all("common/TransportationTypes");
      return base.getList();
    }

    function getLocationSubTypes() {
      var base = TokenRest.all("common/LocationSubTypes");
      return base.getList();
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("ConfidenceScaleService", ConfidenceScaleService);

  function ConfidenceScaleService() {
    var service = this;
    var list = [{ id: 1, name: "Extremely Shy" }, { id: 2, name: "Shy" }, { id: 3, name: "Moderate" }, { id: 4, name: "Bold" }, { id: 5, name: "Extremely Bold" }];

    // methods
    service.get = get;
    service.getAll = getAll;

    return service;

    function get(id) {
      return list.find(function (g) {
        return g.id == id;
      });
    }

    function getAll() {
      return list;
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("DogTypeService", DogTypeService);

  function DogTypeService() {
    var service = this;
    var list = [{ id: 1, name: "Puppy" }, { id: 2, name: "Adult" }, { id: 3, name: "Both" }, { id: 4, name: "Unknown" }];

    // methods
    service.get = get;
    service.getAll = getAll;

    return service;

    function get(id) {
      return list.find(function (g) {
        return g.id == id;
      });
    }

    function getAll() {
      return list;
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("ErrorMapper", ErrorMapper);

  function ErrorMapper() {
    var service = this;

    // methods
    service.getErrors = getErrors;
    service.getErrorMsgs = getErrorMsgs;

    return service;

    function getErrors(error) {
      var errors = [];
      if (error.data && error.data.modelState) {
        for (var key in error.data.modelState) {
          for (var i = 0; i < error.data.modelState[key].length; i++) {
            errors.push(error.data.modelState[key][i]);
          }
        }
      }
      return errors;
    }

    function getErrorMsgs(error) {
      var errors = this.getErrors(error),
          errMsg = null;

      if (errors.length > 0) {
        errMsg = "<ul>";
        errMsg += errors.map(function (err) {
          return "<li>" + err + "</li>";
        }).join(" ");
        errMsg += "</ul>";
        return errMsg;
      }

      return errMsg;
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("EventService", EventService);

  function EventService(TokenRest, $q) {
    var service = this;

    // methods
    service.getAll = getAll;
    service.getByReportType = getByReportType;

    return service;

    function getAll(search) {
      var query = {};

      if (search) {
        query.search = search;
      }

      var base = TokenRest.all("reports");
      return base.getList(query);
    }

    function getByReportType(id) {
      var base = TokenRest.one("reports", id);
      return base.customGET("eventsByReportType");
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("ExercisePhysicalConditionService", ExercisePhysicalConditionService);

  function ExercisePhysicalConditionService() {
    var service = this;
    var list = [{ id: 1, name: "Exercise on leash with handler" }, { id: 2, name: "Exercise off leash with handler" }, { id: 3, name: "Exercise off leash with other dogs" }, { id: 4, name: "Swim" }, { id: 5, name: "Retrieve" }, { id: 6, name: "Rest periods with handler" }, { id: 7, name: "Rest periods in kennel / vehicle" }, { id: 8, name: "Rest periods other (specify)" }, { id: 9, name: "Grooming" }, { id: 10, name: "Other" }];

    // methods
    service.get = get;
    service.getAll = getAll;

    return service;

    function get(id) {
      return list.find(function (g) {
        return g.id == id;
      });
    }

    function getAll() {
      return list;
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("FeedingService", FeedingService);

  function FeedingService(TokenRest, $q, BagService, ErrorMapper) {
    var service = this;

    // methods
    service.getFeedingTypes = getFeedingTypes;
    service.getFeedingUnits = getFeedingUnits;
    service.getFeedingTypesFrecuencies = getFeedingTypesFrecuencies;
    service.getFoodTypes = getFoodTypes;
    service.getFoodBrands = getFoodBrands;
    service.getFoodProducts = getFoodProducts;

    return service;

    function getFeedingTypes() {
      var base = TokenRest.all("feeding/FeedingTypes");
      return base.getList();
    }

    function getFeedingUnits() {
      var base = TokenRest.all("feeding/FeedingUnits");
      return base.getList();
    }

    function getFeedingTypesFrecuencies(id) {
      var base = TokenRest.one("feeding/FeedingTypes", id);
      return base.customGET("frecuencies");
    }

    function getFoodTypes() {
      var base = TokenRest.all("feeding/FoodTypes");
      return base.getList();
    }

    function getFoodBrands(countryId) {
      var query = {};

      if (countryId) {
        query.countryId = countryId;
      }

      var base = TokenRest.all("feeding/FoodBrands");
      return base.getList(query);
    }

    function getFoodProducts(brandId, foodTypeId) {
      var query = {};

      if (brandId && foodTypeId) {
        query.brandId = brandId;
        query.foodTypeId = foodTypeId;
      }

      var base = TokenRest.all("feeding/FoodProducts");
      return base.getList(query);
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("FieldsReminderService", FieldsReminderService);

  function FieldsReminderService(PopupFactory, $state) {
    var service = this;
    var fields = [{ id: "name", name: "Name" }, { id: "petSubtype", name: "Sub Type" }, { id: "sex", name: "Sex" }, { id: "petBreeds", name: "Breed" }, { id: "photoLink", name: "Picture" }, { id: "dateOfBirth", name: "Date of Birth" }, { id: "desexed", name: "Desexed" }, { id: "ageAcquired", name: "Age of Acquired" }, { id: "microchipNumber", name: "Microchip" }];

    // Not mandatory fields
    // { id:"ageDesexed", name: "Age of Desexed" }

    // methods
    service.randomRunCheck = randomRunCheck;

    return service;

    function randomRunCheck(pet) {
      var msg = "",
          reqFields = [];

      if (randomCheck()) {

        reqFields = getRequiredFields(pet);
        if (reqFields && reqFields.length > 0) {

          msg += "Don't forget to complete <b>" + pet.name + "</b> 's profile";
          msg += ", so you can get the most from Doglogbook still to complete:";
          msg += "</br>";
          msg += "</br>";
          msg += "<ul>";
          reqFields.forEach(function (x) {
            msg += "<li>" + x + "</li>";
          });
          msg += "</ul>";

          PopupFactory.show("show", {
            title: "",
            template: msg,
            buttons: [{
              text: "Cancel",
              type: "button-outline",
              onTap: function onTap(e) {}
            }, {
              text: "Update",
              type: "button-assertive",
              onTap: function onTap(e) {
                $state.go("app.addPet", { id: pet.id });
              }
            }]
          });
        }
      }
    }

    function randomCheck() {
      var ranValue = Math.floor(Math.random() * 100 + 1);
      return ranValue < 5;
    }

    function getRequiredFields(pet) {
      var reqFields = [];

      reqFields = _.chain(fields).filter(function (x) {
        if (x.id == "petBreeds") {
          return pet[x.id] == null || pet[x.id] == undefined || pet[x.id].length == 0;
        }
        if (x.id == "microchipNumber") {
          return pet[x.id] == null || pet[x.id] == undefined || pet[x.id] == "";
        } else {
          return pet[x.id] == null || pet[x.id] == undefined;
        }
      }).map(function (x) {
        return x.name;
      }).value();

      return reqFields;
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("GenderService", GenderService);

  function GenderService($translate) {
    var service = this;
    var list = [{ id: 0, name: "Unspecified" }, { id: 1, name: "Male" }, { id: 2, name: "Female" }];

    // methods
    service.get = get;
    service.getAll = getAll;

    return service;

    function get(id) {
      return list.find(function (g) {
        return g.id == id;
      });
    }

    function getAll() {
      return list;
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("GuideSeeingAditionalTrainingService", GuideSeeingAditionalTrainingService);

  function GuideSeeingAditionalTrainingService() {
    var service = this;
    var list = [{ id: 1, name: "Dog walked under blindfold" }, { id: 2, name: "Local destination training" }];

    // methods
    service.get = get;
    service.getAll = getAll;

    return service;

    function get(id) {
      return list.find(function (g) {
        return g.id == id;
      });
    }

    function getAll() {
      return list;
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("HttpInterceptor", HttpInterceptor);

  function HttpInterceptor($rootScope, $injector, $q, $localStorage, config) {

    var factory = {
      request: request,
      response: response,
      responseError: responseError
    };

    return factory;

    function request(config) {
      var deferred = $q.defer();
      var AuthService = $injector.get("AuthService");

      if (!AuthService.isTokenValid()) {
        deferred.reject(config);
        $rootScope.$broadcast("app.relogin");
      } else {
        deferred.resolve(config);
      }
      return config;
    };

    function response(response) {
      var deferred = $q.defer();

      var resource = response.config.headers.Resource || undefined;

      // Sync.setResourse(resource,response.data);

      deferred.resolve(response);

      return deferred.promise;
    }

    function responseError(response) {
      var deferred = $q.defer();

      if (response.status === 0) {

        // Server is not responding or not connected to internet.
        $rootScope.$broadcast("app.offline");

        var resource = response.config.headers.Resource || undefined;

        deferred.reject(response);

        // if (resource){
        //   var syncResource = Sync.getResourse(resource); 
        //   if (syncResource){
        //     response.data = syncResource;
        //     deferred.resolve(response);         
        //   }
        //   else {
        //     deferred.reject(response);
        //   }
        // }
        // else {
        //   deferred.reject(response);
        // }
      } else if (response.status === 401) {
        deferred.reject(response);

        // 401 Unauthorized
        $rootScope.$broadcast("app.relogin");

        var UserService = $injector.get("UserService");
        UserService.logout();
      } else {
        deferred.reject(response);
      }

      return deferred.promise;
    };
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("HumanAgeRangeService", HumanAgeRangeService);

  function HumanAgeRangeService() {
    var service = this;
    var list = [{ id: 0, name: "<18" }, { id: 1, name: "18-25" }, { id: 2, name: "26-35" }, { id: 3, name: "36-45" }, { id: 4, name: "46-55" }, { id: 5, name: "56-65" }, { id: 6, name: "65+" }];

    // methods
    service.get = get;
    service.getAll = getAll;

    return service;

    function get(id) {
      return list.find(function (g) {
        return g.id == id;
      });
    }

    function getAll() {
      return list;
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("HumanGenderService", HumanGenderService);

  function HumanGenderService() {
    var service = this;
    var list = [{ id: 0, name: "Unspecified" }, { id: 1, name: "Male" }, { id: 2, name: "Female" }, { id: 3, name: "Transgender" }];

    // methods
    service.get = get;
    service.getAll = getAll;

    return service;

    function get(id) {
      return list.find(function (g) {
        return g.id == id;
      });
    }

    function getAll() {
      return list;
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("TrialTypeService", TrialTypeService).factory("TrialRangeService", TrialRangeService).factory("CompetitionDivisionService", CompetitionDivisionService).factory("CompetitionAwardService", CompetitionAwardService);

  function TrialTypeService() {
    var service = this;
    var list = [{ id: 1, name: "Utility" }, { id: 2, name: "Yard" }, { id: 3, name: "3-sheep" }, { id: 4, name: "Cattle" }];

    // methods
    service.get = get;
    service.getAll = getAll;

    return service;

    function get(id) {
      return list.find(function (g) {
        return g.id == id;
      });
    }

    function getAll() {
      return list;
    }
  }

  function TrialRangeService() {
    var service = this;
    var list = [{ id: 1, name: "1-3" }, { id: 2, name: "4-6" }, { id: 3, name: "7-9" }, { id: 4, name: "10-15" }, { id: 5, name: "Over 15" }];

    // methods
    service.get = get;
    service.getAll = getAll;

    return service;

    function get(id) {
      return list.find(function (g) {
        return g.id == id;
      });
    }

    function getAll() {
      return list;
    }
  }

  function CompetitionDivisionService() {
    var service = this;
    var list = [{ id: 1, name: "None" }, { id: 2, name: "Novice" }, { id: 3, name: "Improver" }, { id: 4, name: "Open" }];

    // methods
    service.get = get;
    service.getAll = getAll;

    return service;

    function get(id) {
      return list.find(function (g) {
        return g.id == id;
      });
    }

    function getAll() {
      return list;
    }
  }

  function CompetitionAwardService() {
    var service = this;
    var list = [{ id: 1, name: "Has not placed" }, { id: 2, name: "First" }, { id: 3, name: "Second" }, { id: 4, name: "Third" }];

    // methods
    service.get = get;
    service.getAll = getAll;

    return service;

    function get(id) {
      return list.find(function (g) {
        return g.id == id;
      });
    }

    function getAll() {
      return list;
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("LoadingMsg", LoadingMsg);

  function LoadingMsg($ionicLoading) {
    return {
      show: function show(duration) {

        var durationTime = duration || 0;

        $ionicLoading.show({
          animation: "fade-in",
          showBackdrop: true,
          maxWidth: 200,
          showDelay: 0,
          duration: durationTime
        });
      },
      hide: function hide() {
        $ionicLoading.hide();
      }
    };
  };
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("$localStorage", $localStorage);

  function $localStorage($window) {

    return {
      set: set,
      get: get,
      setObject: setObject,
      getObject: getObject,
      setArray: setArray,
      getArray: getArray,
      clear: clear,
      removeKey: removeKey
    };

    function set(key, value) {
      $window.localStorage[key] = value;
    }

    function get(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    }

    function setObject(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    }

    function getObject(key) {
      return JSON.parse($window.localStorage[key] || "{}");
    }

    function setArray(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    }

    function getArray(key) {
      var rawValue = $window.localStorage[key];

      return rawValue == undefined ? [] : JSON.parse(rawValue);
    }

    function clear() {
      $window.localStorage.clear();
    }

    function removeKey(key) {
      $window.localStorage.removeItem(key);
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("ModalFactory", ModalFactory).factory("ModalService", ModalService);

  function ModalFactory($rootScope, $ionicModal) {

    var ModalFactory = {
      initModal: initModal };

    return ModalFactory;

    function initModal(url, scope, focusFirstInput) {
      return $ionicModal.fromTemplateUrl(url, {
        scope: scope || $rootScope,
        animation: "slide-in-up",
        focusFirstInput: focusFirstInput }).then(function (modal) {
        scope.modal = modal;
        return modal;
      }, function (error) {
        console.log(error);
      });
    }
  }

  function ModalService($ionicModal, $rootScope, $q, $injector, $controller) {

    return {
      show: show
    };

    function show(templeteUrl, controller, parameters, options) {
      // Grab the injector and create a new scope
      var deferred = $q.defer(),
          ctrlInstance,
          modalScope = $rootScope.$new(),
          thisScopeId = modalScope.$id,
          defaultOptions = {
        animation: "slide-in-up",
        focusFirstInput: false,
        backdropClickToClose: true,
        hardwareBackButtonClose: true,
        modalCallback: null
      };

      options = angular.extend({}, defaultOptions, options);

      $ionicModal.fromTemplateUrl(templeteUrl, {
        scope: modalScope,
        animation: options.animation,
        focusFirstInput: options.focusFirstInput,
        backdropClickToClose: options.backdropClickToClose,
        hardwareBackButtonClose: options.hardwareBackButtonClose
      }).then(function (modal) {
        modalScope.modal = modal;

        modalScope.openModal = function () {
          modalScope.modal.show();
        };
        modalScope.closeModal = function (result) {
          deferred.resolve(result);
          modalScope.modal.hide();
        };
        modalScope.$on("modal.hidden", function (thisModal) {
          if (thisModal.currentScope) {
            var modalScopeId = thisModal.currentScope.$id;
            if (thisScopeId === modalScopeId) {
              deferred.resolve(null);
              _cleanup(thisModal.currentScope);
            }
          }
        });

        // Invoke the controller
        var locals = { $scope: modalScope, parameters: parameters };
        var ctrlEval = _evalController(controller);
        ctrlInstance = $controller(controller, locals);
        if (ctrlEval.isControllerAs) {
          ctrlInstance.openModal = modalScope.openModal;
          ctrlInstance.closeModal = modalScope.closeModal;
        }

        modalScope.modal.show().then(function () {
          modalScope.$broadcast("modal.afterShow", modalScope.modal);
        });

        if (angular.isFunction(options.modalCallback)) {
          options.modalCallback(modal);
        }
      }, function (err) {
        deferred.reject(err);
      });

      return deferred.promise;
    }

    function _cleanup(scope) {
      scope.$destroy();
      if (scope.modal) {
        scope.modal.remove();
      }
    }

    function _evalController(ctrlName) {
      var result = {
        isControllerAs: false,
        controllerName: "",
        propName: ""
      };
      var fragments = (ctrlName || "").trim().split(/\s+/);
      result.isControllerAs = fragments.length === 3 && (fragments[1] || "").toLowerCase() === "as";
      if (result.isControllerAs) {
        result.controllerName = fragments[0];
        result.propName = fragments[2];
      } else {
        result.controllerName = ctrlName;
      }

      return result;
    }
  };
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("MotivationScaleService", MotivationScaleService);

  function MotivationScaleService() {
    var service = this;
    var list = [{ id: 1, name: "Very Low" }, { id: 2, name: "Low" }, { id: 3, name: "Average" }, { id: 4, name: "High" }, { id: 5, name: "Very High" }, { id: 6, name: "Dont Know" }];

    // methods
    service.get = get;
    service.getAll = getAll;

    return service;

    function get(id) {
      return list.find(function (g) {
        return g.id == id;
      });
    }

    function getAll() {
      return list;
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("PetService", PetService);

  function PetService(TokenRest, $q, BagService, ErrorMapper) {
    var service = this;

    // methods
    service.create = create;
    service.update = update;
    service.remove = remove;
    service.getRemoveStatuses = getRemoveStatuses;
    service.updateSeizureBackground = updateSeizureBackground;
    service.setAvatar = setAvatar;
    service.getAvatar = getAvatar;
    service.setHeight = setHeight;
    service.getHeight = getHeight;
    service.setWeight = setWeight;
    service.getWeight = getWeight;
    service.getActivityRate = getActivityRate;
    service.getLastActivityRate = getLastActivityRate;
    service.setActivityRate = setActivityRate;
    service.removeActivityRate = removeActivityRate;
    service.setBulkActivityRates = setBulkActivityRates;
    service.getAll = getAll;
    service.getById = getById;
    service.getTypes = getTypes;
    service.getSubTypes = getSubTypes;
    service.getSubTypesById = getSubTypesById;
    service.getBreeds = getBreeds;
    service.setTreatment = setTreatment;
    service.updateTreatment = updateTreatment;
    service.getTreatment = getTreatment;
    service.setBulkTreatmentReminders = setBulkTreatmentReminders;
    service.setTreatmentReminder = setTreatmentReminder;
    service.removeTreatment = removeTreatment;
    service.removeTreatmentReminder = removeTreatmentReminder;
    service.getTreatmentRemindersByPetIdTreatmentId = getTreatmentRemindersByPetIdTreatmentId;
    service.getTreatmentRemindersByPetId = getTreatmentRemindersByPetId;
    service.setSymptom = setSymptom;
    service.getSymptom = getSymptom;
    service.removeSymptom = removeSymptom;
    service.getRespirationRate = getRespirationRate;
    service.setRespirationRate = setRespirationRate;
    service.removeRespirationRate = removeRespirationRate;
    service.setSeizure = setSeizure;
    service.getSeizures = getSeizures;
    service.removeSeizures = removeSeizures;
    service.getTimeline = getTimeline;
    service.setSession = setSession;
    service.getSocialisation = getSocialisation;
    service.setSocialisation = setSocialisation;
    service.removeSocialisation = removeSocialisation;
    service.getFeed = getFeed;
    service.setFeed = setFeed;
    service.removeFeed = removeFeed;

    return service;

    function create(obj) {
      var defer = $q.defer();
      var base = TokenRest.all("pets");

      base.post(obj).then(function (response) {
        defer.resolve(response);
      }, function (error) {
        defer.reject(error);
      });

      return defer.promise;
    }

    function update(id, obj) {
      var base = TokenRest.one("pets", id);
      return base.customPUT(obj);
    }

    function remove(id, obj) {
      var base = TokenRest.one("pets", id);
      return base.remove(obj);
    }

    function getRemoveStatuses() {
      var base = TokenRest.all("pets/DeleteStatus");
      return base.getList();
    }

    function updateSeizureBackground(petId, obj) {
      var base = TokenRest.one("pets", petId);
      return base.customPUT(obj, "petseizure");
    }

    function setAvatar(petId, obj) {
      var base = TokenRest.one("pets", petId);
      var imgData = {};
      imgData.data = obj;
      return base.customPUT(imgData, "avatar");
    }

    function getAvatar(petId) {
      var base = TokenRest.one("pets", petId);
      return base.customGET("avatar");
    }

    function setHeight(petId, obj) {
      var base = TokenRest.one("pets", petId);
      return base.customPUT(obj, "height");
    }

    function getHeight(petId) {
      var base = TokenRest.one("pets", petId);
      return base.customGET("height");
    }

    function setWeight(petId, obj) {
      var base = TokenRest.one("pets", petId);
      return base.customPUT(obj, "weight");
    }

    function getWeight(petId) {
      var base = TokenRest.one("pets", petId);
      return base.customGET("weight");
    }

    function getActivityRate(petId, options) {
      var base = TokenRest.one("pets", petId);
      return base.customGET("activityrate", options);
    }

    function getLastActivityRate(petId, options) {
      var base = TokenRest.one("pets", petId);
      return base.customGET("activityrate/lastentry", options);
    }

    function setActivityRate(petId, obj) {
      var base = TokenRest.one("pets", petId);
      return base.customPOST(obj, "activityrate");
    }

    function removeActivityRate(petId, id) {
      var base = TokenRest.one("pets", petId).one("activityrate", id);
      return base.remove();
    }

    function setBulkActivityRates(petId, obj) {
      var base = TokenRest.one("pets", petId);
      return base.customPOST(obj, "bulkactivityrate");
    }

    function getAll(search) {
      var query = {};

      if (search) {
        query.search = search;
      }

      var base = TokenRest.all("pets");
      return base.getList(query);
    }

    function getById(id) {
      var base = TokenRest.one("pets", id);
      return base.get();
    }

    function getTypes() {
      var base = TokenRest.all("pets/types");
      return base.getList();
    }

    function getSubTypes() {
      var base = TokenRest.all("pets/subtypes");
      return base.getList();
    }

    function getSubTypesById(id) {
      var base = TokenRest.one("pets/types", id);
      return base.get();
    }

    function getAllBreeds() {
      var query = {};

      query.pageSize = 1000;

      var base = TokenRest.all("pets/breeds");
      return base.getList(query);
    }

    function getBreeds() {
      var defer = $q.defer();

      service.Breeds = BagService.get("Breeds");
      if (service.Breeds) {
        defer.resolve(service.Breeds);
      } else {
        getAllBreeds().then(function (result) {
          BagService.set("Breeds", result);
          defer.resolve(result);
        }, function (error) {
          defer.reject(error);
        });
      }
      return defer.promise;
    }

    function setTreatment(petId, obj) {
      var base = TokenRest.one("pets", petId);
      return base.customPOST(obj, "treatment");
    }

    function updateTreatment(petId, treatmentId, obj) {
      var base = TokenRest.one("pets", petId);
      return base.one("treatment", treatmentId).customPUT(obj);
    }

    function getTreatment(petId) {
      var base = TokenRest.one("pets", petId);
      return base.customGET("treatment");
    }

    function setBulkTreatmentReminders(petId, treatmentId, obj) {
      var base = TokenRest.one("pets", petId).one("treatment", treatmentId);
      return base.customPOST(obj, "bulkreminders");
    }

    function setTreatmentReminder(petId, treatmentId, obj) {
      var base = TokenRest.one("pets", petId).one("treatment", treatmentId);
      return base.customPOST(obj, "reminder");
    }

    function removeTreatment(petId, id) {
      var base = TokenRest.one("pets", petId).one("treatment", id);
      return base.remove();
    }

    function removeTreatmentReminder(petId, treatmentId, reminderId) {
      var base = TokenRest.one("pets", petId).one("treatment", treatmentId).one("reminder", reminderId);
      return base.remove();
    }

    function getTreatmentRemindersByPetIdTreatmentId(petId, treatmentId) {
      var base = TokenRest.one("pets", petId).one("treatment", treatmentId);
      return base.customGET("reminders");
    }

    function getTreatmentRemindersByPetId(petId) {
      var base = TokenRest.one("pets", petId).all("treatment/reminders");
      return base.getList();
    }

    function setSymptom(petId, obj) {
      var base = TokenRest.one("pets", petId);
      return base.customPOST(obj, "symptom");
    }

    function getSymptom(petId, options) {
      var base = TokenRest.one("pets", petId);
      return base.customGET("symptoms", options);
    }

    function removeSymptom(petId, id) {
      var base = TokenRest.one("pets", petId).one("symptoms", id);
      return base.remove();
    }

    function setSeizure(petId, obj) {
      var base = TokenRest.one("pets", petId);
      return base.customPOST(obj, "seizure");
    }

    function getSeizures(petId, options) {
      var base = TokenRest.one("pets", petId);
      return base.customGET("seizure", options);
    }

    function removeSeizures(petId, id) {
      var base = TokenRest.one("pets", petId).one("seizure", id);
      return base.remove();
    }

    function getRespirationRate(petId, options) {
      var base = TokenRest.one("pets", petId);
      return base.customGET("respirationRate", options);
    }

    function setRespirationRate(petId, obj) {
      var base = TokenRest.one("pets", petId);
      return base.customPOST(obj, "respirationRate");
    }

    function removeRespirationRate(petId, id) {
      var base = TokenRest.one("pets", petId).one("respirationRate", id);
      return base.remove();
    }

    function getTimeline(petId) {
      var base = TokenRest.one("pets", petId);
      return base.customGET("timeline");
    }

    function setSession(sessionType, petSubTypeId, petId, obj) {
      var sessionTypePath = "";

      // 1 Guide Seeing Eye
      // 2 Livestock Herding Farm
      // 3 Protection Guard
      // 4 Racing Greyhound
      // 5 Scent Detection

      switch (petSubTypeId) {
        case 1:
          sessionTypePath = "guideseeing";
          break;
        case 2:
          sessionTypePath = "livestock";
          break;
        case 3:
          sessionTypePath = "protectionguard";
          break;
        case 4:
          sessionTypePath = "racinggreyhound";
          break;
        case 5:
          sessionTypePath = "scentdetection";
          break;
        default:
          sessionTypePath = "general";
      }

      sessionTypePath += sessionType == 1 ? "/training" : "/assessment";
      var base = TokenRest.one("pets", petId);
      return base.customPOST(obj, sessionTypePath);
    }

    function getSocialisation(petId, options) {
      var base = TokenRest.one("pets", petId);
      return base.customGET("socialisation", options);
    }

    function setSocialisation(petId, obj) {
      var base = TokenRest.one("pets", petId);

      // Points tasks flag. Will trigger Puppy S. Point calculation.
      obj.pTask = true;
      return base.customPOST(obj, "socialisation");
    }

    function removeSocialisation(petId, id) {
      var base = TokenRest.one("pets", petId).one("socialisation", id);
      return base.remove();
    }

    function getFeed(petId, options) {
      var base = TokenRest.one("pets", petId);
      return base.customGET("feed", options);
    }

    function setFeed(petId, obj) {
      var base = TokenRest.one("pets", petId);
      return base.customPOST(obj, "feed");
    }

    function removeFeed(petId, id) {
      var base = TokenRest.one("pets", petId).one("feed", id);
      return base.remove();
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("PopupFactory", PopupFactory);

  function PopupFactory($ionicPopup, $q) {

    var firstDeferred = $q.defer();
    firstDeferred.resolve();

    var lastPopupPromise = firstDeferred.promise;

    // Change this var to true if you want that popups will automaticly close before opening another
    var closeAndOpen = false;

    return {
      show: function show(method, object) {
        var deferred = $q.defer();
        var closeMethod = null;
        deferred.promise.isOpen = false;
        deferred.promise.close = function () {
          if (deferred.promise.isOpen && angular.isFunction(closeMethod)) {
            closeMethod();
          }
        };

        if (closeAndOpen && lastPopupPromise.isOpen) {
          lastPopupPromise.close();
        }

        lastPopupPromise.then(function () {
          deferred.promise.isOpen = true;
          var popupInstance = $ionicPopup[method](object);

          closeMethod = popupInstance.close;
          popupInstance.then(function (res) {
            deferred.promise.isOpen = false;
            deferred.resolve(res);
          });
        });

        lastPopupPromise = deferred.promise;

        return deferred.promise;
      }
    };
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("RunChaseQualityService", RunChaseQualityService).factory("ActivityRateService", ActivityRateService);

  function RunChaseQualityService() {
    var service = this;
    var list = [{ id: 1, name: "Failed" }, { id: 2, name: "Poor" }, { id: 3, name: "Average" }, { id: 4, name: "Good" }, { id: 5, name: "Very Good" }];

    // methods
    service.get = get;
    service.getAll = getAll;

    return service;

    function get(id) {
      return list.find(function (g) {
        return g.id == id;
      });
    }

    function getAll() {
      return list;
    }
  }

  function ActivityRateService() {
    var service = this;
    var list = [{ id: 1, name: "Would Not Enter" }, { id: 2, name: "Hesitant But Entered" }, { id: 3, name: "Average Entry" }, { id: 4, name: "Comfortable Entry" }, { id: 5, name: "Very Good Entry" }];

    // methods
    service.get = get;
    service.getAll = getAll;

    return service;

    function get(id) {
      return list.find(function (g) {
        return g.id == id;
      });
    }

    function getAll() {
      return list;
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("RelationshipTypeService", RelationshipTypeService);

  function RelationshipTypeService() {
    var service = this;
    var list = [{ id: 0, name: "Familiar" }, { id: 1, name: "Unfamiliar" }, { id: 2, name: "Both" }];

    // methods
    service.get = get;
    service.getAll = getAll;

    return service;

    function get(id) {
      return list.find(function (g) {
        return g.id == id;
      });
    }

    function getAll() {
      return list;
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("ReminderService", ReminderService);

  function ReminderService($q, $cordovaCalendar, TimeService) {
    var service = this;

    // methods
    service.set = set;
    service.setBulk = setBulk;
    service.remove = remove;
    service.removeBulk = removeBulk;

    return service;

    function set(title, notes, startDate, endDate, isInteractive) {
      var defer = $q.defer();

      var uniqueTitle = title + " - DLG" + startDate.format("YYYYMMDDHHmmss");
      var event = {
        title: uniqueTitle,
        notes: notes,
        startDate: startDate,
        endDate: moment(endDate).add(60, "minutes").toDate()
      };

      if (isInteractive) {

        $cordovaCalendar.createEventInteractively(event).then(function (result) {

          // In Android prevent Calendar Cancel button event creation.
          var isAndroid = ionic.Platform.isAndroid();
          if (isAndroid) {
            $cordovaCalendar.findEvent({ title: event.title }).then(function (eventFound) {
              defer.resolve(JSON.stringify(event));
            }, function (err) {
              defer.reject(err);
            });
          } else {
            defer.resolve(JSON.stringify(event));
          }
        }, function (err) {
          defer.reject(err);
        });
      } else {
        $cordovaCalendar.createEvent(event).then(function (result) {
          defer.resolve(JSON.stringify(event));
        }, function (err) {
          defer.reject(err);
        });
      }

      return defer.promise;
    }

    function setBulk(title, notes, reminders) {
      var defer = $q.defer();
      var promises = [];

      var bulkReminders = reminders;

      $q.all(reminders.map(function (e) {
        return set(title, notes, TimeService.formatToDatetime(e.doseDateTime), TimeService.formatToDatetime(e.doseDateTime));
      })).then(function (result) {

        // all promises returned ok
        if (result && result.length > 0 && result.length == _.chain(result).without(undefined).value().length) {

          // Setting event result obj.
          bulkReminders = reminders.map(function (e, index) {
            e.jsonObj = result[index];
            return e;
          });

          defer.resolve(bulkReminders);
        } else {
          defer.reject();
        }
      }, function (err) {
        defer.reject(err);
      });

      return defer.promise;
    }

    function remove(event) {

      var eventToDelete = {
        newTitle: event.title,
        startDate: event.startDate,
        endDate: moment(event.startDate).add(3, "years").toDate()
      };

      return $cordovaCalendar.deleteEvent(eventToDelete);
    }

    function removeBulk(reminders) {
      var defer = $q.defer();
      var promises = [];
      var filteredReminders = [];

      filteredReminders = reminders.filter(function (e) {
        return e.jsonObj;
      });

      if (filteredReminders && filteredReminders.length == 0) {
        defer.resolve();
      } else {

        $q.all(filteredReminders.forEach(function (e) {
          var promise = remove(e.jsonObj);
          promises.push(promise);
        })).then(function (result) {
          defer.resolve(result);
        }, function (err) {
          defer.reject(err);
        });
      }

      return defer.promise;
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("ReportService", ReportService);

  function ReportService(TokenRest, $q) {
    var service = this;

    // methods
    service.getAll = getAll;
    service.getById = getById;
    service.getTypes = getTypes;
    service.getRates = getRates;
    service.getEventsById = getEventsById;
    service.getSounds = getSounds;
    service.getLifeExperiences = getLifeExperiences;

    return service;

    function getAll(search) {
      var query = {};

      if (search) {
        query.search = search;
      }

      var base = TokenRest.all("reports");
      return base.getList(query);
    }

    function getById(id) {
      var base = TokenRest.one("reports", id);
      return base.get();
    }

    function getTypes() {
      var base = TokenRest.all("reports/types");
      return base.getList();
    }

    function getRates() {
      var base = TokenRest.all("reports/rates");
      return base.getList();
    }

    function getEventsById(id) {
      var base = TokenRest.one("reports", id);
      return base.getList("events");
    }

    function getSounds(id) {
      var base = TokenRest.one("reports", id);
      return base.getList("sounds");
    }

    function getLifeExperiences(id) {
      var base = TokenRest.one("reports", id);
      return base.getList("lifeExperiences");
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("SessionService", SessionService);

  function SessionService(TokenRest, $q) {
    var service = this;

    // methods
    service.getSessionsTypes = getSessionsTypes;
    service.getHandGesturalCommands = getHandGesturalCommands;
    service.getVerbalCommands = getVerbalCommands;
    service.getWhistleLaserCommands = getWhistleLaserCommands;
    service.getPetSkills = getPetSkills;
    service.getPetDeviceMethods = getPetDeviceMethods;
    service.getRewards = getRewards;
    service.getCorrectionDevices = getCorrectionDevices;
    service.getSessionLevels = getSessionLevels;
    service.getLivestockHerdingWorkTypes = getLivestockHerdingWorkTypes;
    service.getScentDetectionOdours = getScentDetectionOdours;
    service.getRacingGreyhoundActivityElements = getRacingGreyhoundActivityElements;
    service.getRacingGreyhoundActivities = getRacingGreyhoundActivities;

    return service;

    function getSessionsTypes() {
      var base = TokenRest.all("Session/sessionsTypes");
      return base.getList();
    }
    function getHandGesturalCommands() {
      var base = TokenRest.all("Session/HandGesturalCommands");
      return base.getList();
    }

    function getVerbalCommands() {
      var base = TokenRest.all("Session/VerbalCommands");
      return base.getList();
    }

    function getWhistleLaserCommands() {
      var base = TokenRest.all("Session/WhistleLaserCommands");
      return base.getList();
    }

    function getPetSkills() {
      var base = TokenRest.all("Session/PetSkills");
      return base.getList();
    }

    function getPetDeviceMethods() {
      var base = TokenRest.all("Session/PetDeviceMethods");
      return base.getList();
    }

    function getRewards() {
      var base = TokenRest.all("Session/Rewards");
      return base.getList();
    }

    function getCorrectionDevices() {
      var base = TokenRest.all("Session/CorrectionDevices");
      return base.getList();
    }

    function getSessionLevels() {
      var base = TokenRest.all("Session/SessionLevels");
      return base.getList();
    }

    function getLivestockHerdingWorkTypes() {
      var base = TokenRest.all("Session/LivestockHerdingWorkTypes");
      return base.getList();
    }

    function getScentDetectionOdours() {
      var base = TokenRest.all("Session/scentDetectionOdours");
      return base.getList();
    }

    function getRacingGreyhoundActivityElements() {
      var base = TokenRest.all("Session/RacingGreyhoundActivityElements");
      return base.getList();
    }

    function getRacingGreyhoundActivities() {
      var base = TokenRest.all("Session/RacingGreyhoundActivities");
      return base.getList();
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("SpeciesService", SpeciesService);

  function SpeciesService(TokenRest, $q) {
    var service = this;

    // methods
    service.getAll = getAll;
    service.getTypes = getTypes;

    return service;

    function getAll(search) {
      var query = {};

      if (search) {
        query.search = search;
      }

      var base = TokenRest.all("common/species");
      return base.getList(query);
    }

    function getTypes() {
      var base = TokenRest.all("common/speciesTypes");
      return base.getList();
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("TimeService", TimeService);

  function TimeService(config) {
    var service = this;

    // methods
    service.formatToDatetime = formatToDatetime;
    service.dateToString = dateToString;
    service.dateAndTimeToDate = dateAndTimeToDate;
    service.dateAndTimeToFormat = dateAndTimeToFormat;

    return service;

    function formatToDatetime(strDate) {
      return moment(strDate, config.apiDateTimeFormat);
    }

    function dateToString(date) {
      return moment(date).format(config.apiDateTimeFormat);
    }

    function dateAndTimeToDate(date, time) {
      var newDate = moment(date).hour(moment(time, "HH:mm").format("HH")).minutes(moment(time, "HH:mm").format("mm"));

      return newDate;
    }

    function dateAndTimeToFormat(date, time) {
      var newDate = dateAndTimeToDate(date, time);
      return newDate.format(config.apiDateTimeFormat);
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("TokenRest", TokenRest);

  function TokenRest(Restangular, $localStorage) {
    return Restangular.withConfig(function (RestangularConfigurer) {

      RestangularConfigurer.setDefaultHeaders({ Authorization: function Authorization() {
          var token = $localStorage.getObject("s1token").access_token;
          return "Bearer " + token;
        }
      });
    });
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("TravelQualityService", TravelQualityService);

  function TravelQualityService() {
    var service = this;
    var list = [{ id: 0, name: "Very Poorly" }, { id: 1, name: "Poorly" }, { id: 2, name: "Neither Well Nor Poorly" }, { id: 3, name: "Well" }, { id: 4, name: "Very Well" }];

    // methods
    service.get = get;
    service.getAll = getAll;

    return service;

    function get(id) {
      return list.find(function (g) {
        return g.id == id;
      });
    }

    function getAll() {
      return list;
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("HeightUnitsService", HeightUnitsService).factory("WeightUnitsService", WeightUnitsService).factory("DistanceUnitsService", DistanceUnitsService).factory("TemperatureUnitsService", TemperatureUnitsService);

  function DistanceUnitsService() {
    var service = this;
    var list = [{ id: 0, name: "Kilometer" }, { id: 1, name: "Mile" }];

    // methods
    service.get = get;
    service.getAll = getAll;

    return service;

    function get(id) {
      return list.find(function (g) {
        return g.id == id;
      });
    }

    function getAll() {
      return list;
    }
  }

  function HeightUnitsService() {
    var service = this;
    var list = [{ id: "cm", name: "Cm" }, { id: "feet", name: "Feet" }];

    // methods
    service.get = get;
    service.getAll = getAll;

    return service;

    function get(id) {
      return list.find(function (g) {
        return g.id == id;
      });
    }

    function getAll() {
      return list;
    }
  }

  function WeightUnitsService() {
    var service = this;
    var list = [{ id: "kg", name: "Kg" }, { id: "pounds", name: "Pounds" }];

    // methods
    service.get = get;
    service.getAll = getAll;

    return service;

    function get(id) {
      return list.find(function (g) {
        return g.id == id;
      });
    }

    function getAll() {
      return list;
    }
  }

  function TemperatureUnitsService() {
    var service = this;
    var list = [{ id: 1, name: "C" }, { id: 2, name: "F" }];

    // methods
    service.get = get;
    service.getAll = getAll;

    return service;

    function get(id) {
      return list.find(function (g) {
        return g.id == id;
      });
    }

    function getAll() {
      return list;
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("UserService", UserService);

  function UserService(TokenRest, AuthService, $q, $state, BagService, ErrorMapper, config) {
    var service = this;

    // methods
    service.getUserInfo = getUserInfo;
    service.setCountry = setCountry;
    service.getUserQuestion = getUserQuestion;
    service.setUserQuestion = setUserQuestion;
    service.getPetsAlerts = getPetsAlerts;
    service.setPetAlertsConfirmedBulk = setPetAlertsConfirmedBulk;
    service.getPets = getPets;
    service.logout = logout;

    return service;

    function getUserInfo() {
      var base = TokenRest.one("account/userinfo");
      return base.get();
    }

    function setCountry(countryId) {
      var base = TokenRest.one("account/userCountry", countryId);
      return base.post();
    }

    function getUserQuestion() {
      var base = TokenRest.one("account/userQuestion");
      return base.get();
    }

    function setUserQuestion(obj) {
      var base = TokenRest.all("account/userQuestion");
      return base.customPOST(obj);
    }

    function getPetsAlerts() {
      var base = TokenRest.all("owners/pets/alerts");
      return base.getList();
    }

    function setPetAlertsConfirmedBulk(obj) {
      var base = TokenRest.all("owners/pets/alerts/bulkconfirm");
      return base.customPOST(obj);
    }

    function getAllPets() {
      var base = TokenRest.all("owners/allPets");
      return base.getList();
    }

    function getPets() {
      var defer = $q.defer();

      service.Pets = BagService.get("Pets");
      if (service.Pets) {
        defer.resolve(service.Pets);
      } else {
        getAllPets().then(function (result) {
          BagService.set("Pets", result);
          defer.resolve(result);
        }, function (error) {
          defer.reject(error);
        });
      }
      return defer.promise;
    }

    function logout() {
      BagService.set("Pets", null);
      AuthService.logoutUser();
      $state.go("login");
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("VetService", VetService);

  function VetService(TokenRest, $q) {
    var service = this;

    // methods
    service.getTreatmentTypes = getTreatmentTypes;
    service.getSymptomTypes = getSymptomTypes;
    service.getSymptomFrequencies = getSymptomFrequencies;
    service.getDiagnosis = getDiagnosis;
    service.getSeizureTestTypes = getSeizureTestTypes;
    service.getSeizureTypes = getSeizureTypes;
    service.getSeizureSignTypes = getSeizureSignTypes;
    service.getSeizureBodyStates = getSeizureBodyStates;
    service.getSeizureBodyStatePositions = getSeizureBodyStatePositions;
    service.getSeizureAfterSignTypes = getSeizureAfterSignTypes;

    return service;

    function getTreatmentTypes() {
      var base = TokenRest.all("vets/treatmenttypes");
      return base.getList();
    }

    function getSymptomTypes() {
      var base = TokenRest.all("vets/symptomtypes");
      return base.getList();
    }

    function getSymptomFrequencies() {
      var base = TokenRest.all("vets/symptomfrequencies");
      return base.getList();
    }

    function getDiagnosis() {
      var base = TokenRest.all("vets/diagnosis");
      return base.getList();
    }

    function getSeizureTestTypes() {
      var base = TokenRest.all("vets/seizuretesttypes");
      return base.getList();
    }

    function getSeizureTypes() {
      var base = TokenRest.all("vets/seizureTypes");
      return base.getList();
    }

    function getSeizureSignTypes() {
      var base = TokenRest.all("vets/seizureSignTypes");
      return base.getList();
    }

    function getSeizureBodyStates() {
      var base = TokenRest.all("vets/seizureBodyStates");
      return base.getList();
    }

    function getSeizureBodyStatePositions() {
      var base = TokenRest.all("vets/seizureBodyStatePositions");
      return base.getList();
    }

    function getSeizureAfterSignTypes() {
      var base = TokenRest.all("vets/seizureAfterSignTypes");
      return base.getList();
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app").factory("WeatherLevelsService", WeatherLevelsService);

  function WeatherLevelsService() {
    var service = this;
    var list = [{ id: 1, name: "None" }, { id: 2, name: "Low" }, { id: 3, name: "Moderate" }, { id: 4, name: "High" }];

    // methods
    service.get = get;
    service.getAll = getAll;

    return service;

    function get(id) {
      return list.find(function (g) {
        return g.id == id;
      });
    }

    function getAll() {
      return list;
    }
  }
})();
//# sourceMappingURL=all.js.map
