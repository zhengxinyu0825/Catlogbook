angular.module('app')
.config(RouterConfig);

function RouterConfig($stateProvider, $urlRouterProvider) {


  $urlRouterProvider.otherwise(function($injector) {
    var $state = $injector.get('$state');
    var AuthService = $injector.get('AuthService');
    var config = $injector.get('config');

    if(AuthService.isTokenValid()) {
      $state.go(config.homeState);
    } else {
      $state.go(config.loginState);
    }
  });

  $stateProvider
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

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/layout.html',
    controller: 'MainCtrl as vm'
  })

  .state('app.home', {
    url: '/home',
    views: {
      'mainContent': {
        templateUrl: 'templates/home.html',
        controller:  'HomeCtrl as vm'
      }
    },
    resolve:{
      petTypes: function(PetService){
        return PetService.getTypes();
      },
      userPets: function(UserService){
        return UserService.getUsersPets();
      },
      translations: function($translate){
        return $translate([
          "HomeActionButtonActions","HomeActionButtonSession",
          "HomeActionButtonActivity","HomeActionButtonBehaviour",
          "HomeActionButtonSocialisation",
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
          "CommonCancel"
          ]);
      }
    }
  })
 .state('app.upload', {
    url: '/upload',
    views: {
      'mainContent': {
        templateUrl: 'templates/upload.html',
        controller:  'UploadCtrl as vm'
      }
    },
    resolve:{
    }
  })
  .state('app.qanda', {
    url: '/qanda',
    views: {
      'mainContent': {
        templateUrl: 'templates/qanda.html',
        controller:  'QandaCtrl as vm'
      }
    },
    resolve:{
      petTypes: function(PetService){
        return PetService.getTypes();
      },
      userPets: function(UserService){
        return UserService.getUsersPets();
      },
      translations: function($translate){
        return $translate([
          "HomeActionButtonActions","HomeActionButtonSession",
          "HomeActionButtonActivity","HomeActionButtonBehaviour",
          "HomeActionButtonSocialisation",
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
          "CommonCancel"
          ]);
      }
    }
  })

  .state('app.userguidance', {
    url: '/userguidance',
    views: {
      'mainContent': {
        templateUrl: 'templates/userguidance.html',
        controller:  'UserguidanceCtrl as vm'
      }
    },
    resolve:{
      petTypes: function(PetService){
        return PetService.getTypes();
      },
      userPets: function(UserService){
        return UserService.getUsersPets();
      },
      translations: function($translate){
        return $translate([
          "HomeActionButtonActions","HomeActionButtonSession",
          "HomeActionButtonActivity","HomeActionButtonBehaviour",
          "HomeActionButtonSocialisation",
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
          "CommonCancel"
          ]);
      }
    }
  })

  .state('app.contactus', {
    url: '/contactus',
    views: {
      'mainContent': {
        templateUrl: 'templates/contactus.html',
        controller:  'ContactusCtrl as vm'
      }
    },
    resolve:{
      petTypes: function(PetService){
        return PetService.getTypes();
      },
      userPets: function(UserService){
        return UserService.getUsersPets();
      },
      translations: function($translate){
        return $translate([
          "HomeActionButtonActions","HomeActionButtonSession",
          "HomeActionButtonActivity","HomeActionButtonBehaviour",
          "HomeActionButtonSocialisation",
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
          "CommonCancel"
          ]);
        }
    }
  })

    .state('app.email', {
    url: '/email',
    views: {
      'mainContent': {
        templateUrl: 'templates/email.html',
        controller:  'EmailCtrl as vm'

      }
    },
    resolve:{
    }
  })
  .state('app.permissions', {
    url: '/permissions',
    views: {
      'mainContent': {
        templateUrl: 'templates/permissions.html',
        controller:  'PermissionsCtrl as vm'
      }
    },
    resolve:{
      pets: function(UserService){
        return UserService.getPets();
      },
      shareUserTypes: function(ShareUserTypeService){
        return ShareUserTypeService.getAll();
      },
      translations:function($translate){
        return $translate([
          "HomeMsgMixedBreed","HomeMsgBreedNotSet"
        ]);
      }
    }
  })

  .state('app.profile', {
    url: '/profile/:id',
    views: {
      'mainContent': {
        templateUrl: 'templates/profile.html',
        controller:  'ProfileCtrl as vm'
      }
    },
    resolve:{
      selectedPet: function(PetService, $stateParams, $state, $q , config){
        if ($stateParams) {
          return PetService.getById($stateParams.id);
        }
        else {
          $state.go(config.homeState);
        }
      },
      translations: function($translate){
        return $translate([
          "HomeMsgBreedNotSet","HomeMsgMixedBreed",
          "CommonBack","CommonOk","CommonCancel"
        ]);
      }
    }
  })

  .state('app.profile.index', {
    url: '/index',
    views: {
      'profileContent': {
        templateUrl: 'templates/pet-profile-index.html',
        controller:  'PetProfileIndexCtrl as vm'
      }
    },
    resolve:{
      breeds: function(PetService){
        return PetService.getBreeds();
      }
    }
  })


  .state('app.profile.activities', {
    url: '/activities',
    views: {
      'profileContent': {
        templateUrl: 'templates/activities.html',
        controller:  'ActivitiesCtrl as vm'
      }
    },
    resolve:{
      breeds: function(PetService){
        return PetService.getBreeds();
      },
      userPets: function(UserService){
        return UserService.getUsersPets();
      },
      activityEvents: function(EventService){
        var reportActivityTypeId = 1;
        return EventService.getByReportType(reportActivityTypeId);
      },
      translations: function($translate){
        return $translate([
          "ActivitiesTitle","ActivitiesMsgGetError",
          "CommonHours","CommonMinutes",
          "CommonBack","CommonOk","CommonCancel"
        ]);
      }
    }
  })

  .state('app.profile.behaviours', {
    url: '/behaviours',
    views: {
      'profileContent': {
        templateUrl: 'templates/behaviours.html',
        controller:  'BehavioursCtrl as vm'
      }
    },
    resolve:{
      userPets: function(UserService){
        return UserService.getUsersPets();
      },
      types: function(BehaviourService){
        return BehaviourService.getTypes();
      },
      translations: function($translate){
        return $translate([
          "BehavioursTitle","BehavioursMsgGetError",
          "CommonHours","CommonMinutes",
          "CommonBack","CommonOk","CommonCancel"
        ]);
      }
    }
  })

  .state('app.profile.feeds', {
    url: '/feeds',
    views: {
      'profileContent': {
        templateUrl: 'templates/feeds.html',
        controller:  'FeedsCtrl as vm'
      }
    },
    resolve:{
      userPets: function(UserService){
        return UserService.getUsersPets();
      },
      translations: function($translate){
        return $translate([
          "CommonHours","CommonMinutes",
          "CommonBack","CommonOk","CommonCancel"
        ]);
      }
    }
  })

  .state('app.profile.respirationRates', {
    url: '/respirationRates',
    views: {
      'profileContent': {
        templateUrl: 'templates/respiration-rates.html',
        controller:  'RespirationRatesCtrl as vm'
      }
    },
    resolve:{
      userPets: function(UserService){
        return UserService.getUsersPets();
      },
      translations: function($translate){
        return $translate([
          "RespirationRateTitle","RespirationRateMsgGetError",
          "CommonHours","CommonMinutes",
          "CommonBack","CommonOk","CommonCancel"
        ]);
      }
    }
  })

  .state('app.profile.socialisations', {
    url: '/socialisations',
    views: {
      'profileContent': {
        templateUrl: 'templates/socialisations.html',
        controller:  'SocialisationsCtrl as vm'
      }
    },
    resolve:{
      userPets: function(UserService){
        return UserService.getUsersPets();
      },
      translations: function($translate){
        return $translate([
          "SocialisationsTitle","SocialisationsMsgGetError",
          "CommonHours","CommonMinutes",
          "CommonBack","CommonOk","CommonCancel"
        ]);
      }
    }
  })

 .state('app.profile.treatments', {
  url: '/treatments',
  views: {
    'profileContent': {
      templateUrl: 'templates/treatments.html',
      controller:  'TreatmentsCtrl as vm'
    }
  },
  resolve:{
    userPets: function(UserService){
      return UserService.getUsersPets();
    },
    translations: function($translate){
      return $translate([
        "TreatmentsMsgTreatmentsError",
        "CommonOk"
      ]);
    }
  }
})

.state('app.profile.symptoms', {
  url: '/symptoms',
  views: {
    'profileContent': {
      templateUrl: 'templates/symptoms.html',
      controller:  'SymptomsCtrl as vm'
    }
  },
  resolve:{
    userPets: function(UserService){
      return UserService.getUsersPets();
    },
    translations: function($translate){
      return $translate([
        "SymtomsTitle","SymtomsMsgGetError",
        "CommonHours","CommonMinutes",
        "CommonBack","CommonOk","CommonCancel"
      ]);
    }
  }
})

 .state('app.profile.seizures', {
    url: '/seizures',
    views: {
      'profileContent': {
        templateUrl: 'templates/seizures.html',
        controller:  'SeizuresCtrl as vm'
      }
    },
    resolve:{
      userPets: function(UserService){
        return UserService.getUsersPets();
      },
      translations: function($translate){
        return $translate([
          "SeizuresTitle","SeizuresMsgGetError",
          "CommonHours","CommonMinutes",
          "CommonBack","CommonOk","CommonCancel"
        ]);
      }
    }
  })

 .state('app.profile.sessions', {
    url: '/sessions',
    views: {
      'profileContent': {
        templateUrl: 'templates/sessions.html',
        controller:  'SessionCtrl as vm'
      }
    },
    resolve:{
      translations: function($translate){
        return $translate([
          "CommonHours","CommonMinutes",
          "CommonBack","CommonOk","CommonCancel"
        ]);
      }
    }
  })

};
