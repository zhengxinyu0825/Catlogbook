

// Modules
"use strict";

angular.module("app.controllers", []);
angular.module("app.directives", []);

angular.module("app", ["ui.bootstrap", "pascalprecht.translate", "ngCookies", "app.controllers", "app.directives", "ui.router", "restangular", "LocalStorageModule", "angularMoment", "chart.js", "ngDialog", "angular-loading-bar", "ngTable", "angulartics", "angulartics.google.analytics"]).run(function ($rootScope, Restangular, GenderService, $location, ngTableDefaults) {

  // Loading Genders
  GenderService.init();

  Restangular.setErrorInterceptor(function (response) {
    if (response.status == 401) {
      $location.path("/login");
      return false; // stop the promise chain
    }
  });

  $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {

    console.log("STATE: " + fromState.name + " to " + toState.name);
  });

  $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {});

  // ng-table
  ngTableDefaults.params.count = 10;
  ngTableDefaults.settings.counts = [];
  ngTableDefaults.settings.paginationMaxBlocks = 10;
  ngTableDefaults.settings.paginationMinBlocks = 2;
}).config(function ($httpProvider, localStorageServiceProvider, $translateProvider, RestangularProvider, cfpLoadingBarProvider, config) {

  cfpLoadingBarProvider.includeSpinner = false;

  // setting localStorage app prefix
  localStorageServiceProvider.setPrefix("dlb");

  $translateProvider.useStaticFilesLoader({
    prefix: "translations/locale-",
    suffix: ".json"
  });
  $translateProvider.useLocalStorage();
  $translateProvider.preferredLanguage("en");

  // Restangular config
  RestangularProvider.setBaseUrl(config.apiUrl);
});
"use strict";

angular.module("app").config(RouterConfig);

function RouterConfig($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise(function ($injector) {
    var $state = $injector.get("$state");
    var AuthService = $injector.get("AuthService");
    var config = $injector.get("config");

    if (AuthService.isTokenValid()) {
      $state.go(config.homeState);
    } else {
      $state.go(config.loginState);
    }
  });

  $stateProvider.state("login", {
    url: "/login",
    cache: false,
    templateUrl: "templates/login.html",
    controller: "LoginCtrl as vm",
    resolve: {
      translations: function translations($translate) {
        return $translate(["LoginDefaultError", "CommonOk", "CommonCancel"]);
      }
    }
  }).state("app", {
    url: "/app",
    abstract: true,
    templateUrl: "templates/layout.html",
    controller: "MainCtrl as vm"
  }).state("app.home", {
    url: "/home",
    views: {
      mainContent: {
        templateUrl: "templates/home.html",
        controller: "HomeCtrl as vm"
      }
    },
    resolve: {
      petTypes: function petTypes(PetService) {
        return PetService.getTypes();
      },
      userPets: function userPets(UserService) {
        return UserService.getUsersPets();
      },
      translations: function translations($translate) {
        return $translate(["HomeActionButtonActions", "HomeActionButtonSession", "HomeActionButtonActivity", "HomeActionButtonBehaviour", "HomeActionButtonSocialisation", "HomeActionButtonActionsTitle", "HomeActionButtonSessionTitle", "HomeActionButtonHealth", "HomeActionButtonHealthTitle", "HomeActionRecordTreatment", "HomeActionButtonTraining", "HomeActionButtonAssessment", "HomeActionRecordIllness", "HomeActionButtonMore", "HomeActionButtonUpdatePet", "HomeActionRecordSymptom", "HomeActionRecordRestingRespirationRate", "AddPetSectionInformation", "AddPetSectionBackgroundDetails", "AddPetSectionFavActivities", "HomeActionButtonAddPet", "HomeMsgNoTimelineItems", "HomeMsgBreedNotSet", "HomeMsgMixedBreed", "HomeActionRecordSeizure", "CommonCancel"]);
      }
    }
  }).state("app.upload", {
    url: "/upload",
    views: {
      mainContent: {
        templateUrl: "templates/upload.html",
        controller: "UploadCtrl as vm"
      }
    },
    resolve: {}
  }).state("app.qanda", {
    url: "/qanda",
    views: {
      mainContent: {
        templateUrl: "templates/qanda.html",
        controller: "QandaCtrl as vm"
      }
    },
    resolve: {
      petTypes: function petTypes(PetService) {
        return PetService.getTypes();
      },
      userPets: function userPets(UserService) {
        return UserService.getUsersPets();
      },
      translations: function translations($translate) {
        return $translate(["HomeActionButtonActions", "HomeActionButtonSession", "HomeActionButtonActivity", "HomeActionButtonBehaviour", "HomeActionButtonSocialisation", "HomeActionButtonActionsTitle", "HomeActionButtonSessionTitle", "HomeActionButtonHealth", "HomeActionButtonHealthTitle", "HomeActionRecordTreatment", "HomeActionButtonTraining", "HomeActionButtonAssessment", "HomeActionRecordIllness", "HomeActionButtonMore", "HomeActionButtonUpdatePet", "HomeActionRecordSymptom", "HomeActionRecordRestingRespirationRate", "AddPetSectionInformation", "AddPetSectionBackgroundDetails", "AddPetSectionFavActivities", "HomeActionButtonAddPet", "HomeMsgNoTimelineItems", "HomeMsgBreedNotSet", "HomeMsgMixedBreed", "HomeActionRecordSeizure", "CommonCancel"]);
      }
    }
  }).state("app.userguidance", {
    url: "/userguidance",
    views: {
      mainContent: {
        templateUrl: "templates/userguidance.html",
        controller: "UserguidanceCtrl as vm"
      }
    },
    resolve: {
      petTypes: function petTypes(PetService) {
        return PetService.getTypes();
      },
      userPets: function userPets(UserService) {
        return UserService.getUsersPets();
      },
      translations: function translations($translate) {
        return $translate(["HomeActionButtonActions", "HomeActionButtonSession", "HomeActionButtonActivity", "HomeActionButtonBehaviour", "HomeActionButtonSocialisation", "HomeActionButtonActionsTitle", "HomeActionButtonSessionTitle", "HomeActionButtonHealth", "HomeActionButtonHealthTitle", "HomeActionRecordTreatment", "HomeActionButtonTraining", "HomeActionButtonAssessment", "HomeActionRecordIllness", "HomeActionButtonMore", "HomeActionButtonUpdatePet", "HomeActionRecordSymptom", "HomeActionRecordRestingRespirationRate", "AddPetSectionInformation", "AddPetSectionBackgroundDetails", "AddPetSectionFavActivities", "HomeActionButtonAddPet", "HomeMsgNoTimelineItems", "HomeMsgBreedNotSet", "HomeMsgMixedBreed", "HomeActionRecordSeizure", "CommonCancel"]);
      }
    }
  }).state("app.contactus", {
    url: "/contactus",
    views: {
      mainContent: {
        templateUrl: "templates/contactus.html",
        controller: "ContactusCtrl as vm"
      }
    },
    resolve: {
      petTypes: function petTypes(PetService) {
        return PetService.getTypes();
      },
      userPets: function userPets(UserService) {
        return UserService.getUsersPets();
      },
      translations: function translations($translate) {
        return $translate(["HomeActionButtonActions", "HomeActionButtonSession", "HomeActionButtonActivity", "HomeActionButtonBehaviour", "HomeActionButtonSocialisation", "HomeActionButtonActionsTitle", "HomeActionButtonSessionTitle", "HomeActionButtonHealth", "HomeActionButtonHealthTitle", "HomeActionRecordTreatment", "HomeActionButtonTraining", "HomeActionButtonAssessment", "HomeActionRecordIllness", "HomeActionButtonMore", "HomeActionButtonUpdatePet", "HomeActionRecordSymptom", "HomeActionRecordRestingRespirationRate", "AddPetSectionInformation", "AddPetSectionBackgroundDetails", "AddPetSectionFavActivities", "HomeActionButtonAddPet", "HomeMsgNoTimelineItems", "HomeMsgBreedNotSet", "HomeMsgMixedBreed", "HomeActionRecordSeizure", "CommonCancel"]);
      }
    }
  }).state("app.email", {
    url: "/email",
    views: {
      mainContent: {
        templateUrl: "templates/email.html",
        controller: "EmailCtrl as vm"

      }
    },
    resolve: {}
  }).state("app.permissions", {
    url: "/permissions",
    views: {
      mainContent: {
        templateUrl: "templates/permissions.html",
        controller: "PermissionsCtrl as vm"
      }
    },
    resolve: {
      pets: function pets(UserService) {
        return UserService.getPets();
      },
      shareUserTypes: function shareUserTypes(ShareUserTypeService) {
        return ShareUserTypeService.getAll();
      },
      translations: function translations($translate) {
        return $translate(["HomeMsgMixedBreed", "HomeMsgBreedNotSet"]);
      }
    }
  }).state("app.profile", {
    url: "/profile/:id",
    views: {
      mainContent: {
        templateUrl: "templates/profile.html",
        controller: "ProfileCtrl as vm"
      }
    },
    resolve: {
      selectedPet: function selectedPet(PetService, $stateParams, $state, $q, config) {
        if ($stateParams) {
          return PetService.getById($stateParams.id);
        } else {
          $state.go(config.homeState);
        }
      },
      translations: function translations($translate) {
        return $translate(["HomeMsgBreedNotSet", "HomeMsgMixedBreed", "CommonBack", "CommonOk", "CommonCancel"]);
      }
    }
  }).state("app.profile.index", {
    url: "/index",
    views: {
      profileContent: {
        templateUrl: "templates/pet-profile-index.html",
        controller: "PetProfileIndexCtrl as vm"
      }
    },
    resolve: {
      breeds: function breeds(PetService) {
        return PetService.getBreeds();
      }
    }
  }).state("app.profile.activities", {
    url: "/activities",
    views: {
      profileContent: {
        templateUrl: "templates/activities.html",
        controller: "ActivitiesCtrl as vm"
      }
    },
    resolve: {
      breeds: function breeds(PetService) {
        return PetService.getBreeds();
      },
      userPets: function userPets(UserService) {
        return UserService.getUsersPets();
      },
      activityEvents: function activityEvents(EventService) {
        var reportActivityTypeId = 1;
        return EventService.getByReportType(reportActivityTypeId);
      },
      translations: function translations($translate) {
        return $translate(["ActivitiesTitle", "ActivitiesMsgGetError", "CommonHours", "CommonMinutes", "CommonBack", "CommonOk", "CommonCancel"]);
      }
    }
  }).state("app.profile.behaviours", {
    url: "/behaviours",
    views: {
      profileContent: {
        templateUrl: "templates/behaviours.html",
        controller: "BehavioursCtrl as vm"
      }
    },
    resolve: {
      userPets: function userPets(UserService) {
        return UserService.getUsersPets();
      },
      types: function types(BehaviourService) {
        return BehaviourService.getTypes();
      },
      translations: function translations($translate) {
        return $translate(["BehavioursTitle", "BehavioursMsgGetError", "CommonHours", "CommonMinutes", "CommonBack", "CommonOk", "CommonCancel"]);
      }
    }
  }).state("app.profile.feeds", {
    url: "/feeds",
    views: {
      profileContent: {
        templateUrl: "templates/feeds.html",
        controller: "FeedsCtrl as vm"
      }
    },
    resolve: {
      userPets: function userPets(UserService) {
        return UserService.getUsersPets();
      },
      translations: function translations($translate) {
        return $translate(["CommonHours", "CommonMinutes", "CommonBack", "CommonOk", "CommonCancel"]);
      }
    }
  }).state("app.profile.respirationRates", {
    url: "/respirationRates",
    views: {
      profileContent: {
        templateUrl: "templates/respiration-rates.html",
        controller: "RespirationRatesCtrl as vm"
      }
    },
    resolve: {
      userPets: function userPets(UserService) {
        return UserService.getUsersPets();
      },
      translations: function translations($translate) {
        return $translate(["RespirationRateTitle", "RespirationRateMsgGetError", "CommonHours", "CommonMinutes", "CommonBack", "CommonOk", "CommonCancel"]);
      }
    }
  }).state("app.profile.socialisations", {
    url: "/socialisations",
    views: {
      profileContent: {
        templateUrl: "templates/socialisations.html",
        controller: "SocialisationsCtrl as vm"
      }
    },
    resolve: {
      userPets: function userPets(UserService) {
        return UserService.getUsersPets();
      },
      translations: function translations($translate) {
        return $translate(["SocialisationsTitle", "SocialisationsMsgGetError", "CommonHours", "CommonMinutes", "CommonBack", "CommonOk", "CommonCancel"]);
      }
    }
  }).state("app.profile.treatments", {
    url: "/treatments",
    views: {
      profileContent: {
        templateUrl: "templates/treatments.html",
        controller: "TreatmentsCtrl as vm"
      }
    },
    resolve: {
      userPets: function userPets(UserService) {
        return UserService.getUsersPets();
      },
      translations: function translations($translate) {
        return $translate(["TreatmentsMsgTreatmentsError", "CommonOk"]);
      }
    }
  }).state("app.profile.symptoms", {
    url: "/symptoms",
    views: {
      profileContent: {
        templateUrl: "templates/symptoms.html",
        controller: "SymptomsCtrl as vm"
      }
    },
    resolve: {
      userPets: function userPets(UserService) {
        return UserService.getUsersPets();
      },
      translations: function translations($translate) {
        return $translate(["SymtomsTitle", "SymtomsMsgGetError", "CommonHours", "CommonMinutes", "CommonBack", "CommonOk", "CommonCancel"]);
      }
    }
  }).state("app.profile.seizures", {
    url: "/seizures",
    views: {
      profileContent: {
        templateUrl: "templates/seizures.html",
        controller: "SeizuresCtrl as vm"
      }
    },
    resolve: {
      userPets: function userPets(UserService) {
        return UserService.getUsersPets();
      },
      translations: function translations($translate) {
        return $translate(["SeizuresTitle", "SeizuresMsgGetError", "CommonHours", "CommonMinutes", "CommonBack", "CommonOk", "CommonCancel"]);
      }
    }
  }).state("app.profile.sessions", {
    url: "/sessions",
    views: {
      profileContent: {
        templateUrl: "templates/sessions.html",
        controller: "SessionCtrl as vm"
      }
    },
    resolve: {
      translations: function translations($translate) {
        return $translate(["CommonHours", "CommonMinutes", "CommonBack", "CommonOk", "CommonCancel"]);
      }
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
    defaultPeriod: 3,
    homeState: "app.home",
    loginState: "login",
    languages: [{ code: "en", name: "SettingsLanguageEnglish", "default": true }, { code: "es", name: "SettingsLanguageSpanish" }, { code: "fr", name: "SettingsLanguageFrench" }]
  });

  // Periods
  // 1 - Day
  // 2 - Week
  // 3 - Month
  // 4 - 6 Months
  // 5 - All
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("ActivitiesCtrl", ActivitiesCtrl);

  function ActivitiesCtrl($rootScope, $scope, $state, $filter, $stateParams, BagService, PetService, UserService, GenderService, userPets, activityEvents, breeds, ngDialog, translations, config) {

    var vm = this;

    // methods
    vm.getDurationFormat = getDurationFormat;
    vm.getActivityFullName = getActivityFullName;
    vm.dateFormatLocal = dateFormatLocal;
    vm.addCondition = addCondition;
    vm.removeCondition = removeCondition;
    vm.compareBreedChange = compareBreedChange;
    vm.ageTypeChange = ageTypeChange;
    vm.remove = remove;
    vm.compare = compare;
    vm.avgByChange = avgByChange;
    vm.valueByChange = valueByChange;

    // dependencies
    vm.userPets = userPets;
    vm.activityEvents = activityEvents;
    vm.breeds = breeds;

    // defaults
    init();

    $scope.$on("period-change", function (event, args) {
      init();
      getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);
      getCompareResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);
    });

    if ($rootScope.selectedPet) {
      vm.selectedPet = $rootScope.selectedPet;
      getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);
    }

    function dateFormatLocal(date) {
      if (date) {
        return moment(date).format("DD/MM/YY");
      }
    }

    function init() {

      vm.results = [];
      vm.selectedActivity = null;
      vm.selectedPetActivities = [];
      vm.filteredActivities = [];
      vm.chartConditions = [];

      // compare section
      vm.comparisonResult = null;

      $scope.compMyDogActivitiesData = null;
      $scope.compMyDogActivitieslabels = null;
      $scope.compMyDogActivitiesColors = null;

      $scope.compOthersActivitiesData = null;
      $scope.compOthersActivitieslabels = null;
      $scope.compOthersActivitiesColors = null;

      vm.avgBy = [{ id: 1, name: "day" }, { id: 2, name: "week" }];
      vm.selectedAvgBy = vm.avgBy[1];

      vm.valuesBy = [{ id: 1, name: "rate" }, { id: 2, name: "time spent" }];
      vm.selectedValuesBy = vm.valuesBy[0];

      vm.breedPercentages = [{ id: 100, name: "100%" }, { id: 75, name: "75%" }, { id: 50, name: "50%" }, { id: 25, name: "25%" }];
      vm.ageTypes = [{ id: 1, name: "year" }, { id: 2, name: "month" }];
      vm.ageRanges = [];
      vm.ageRangesYears = [{ id: 1, name: "+/- 1" }, { id: 2, name: "+/- 2" }, { id: 3, name: "+/- 3" }];
      vm.ageRangesMonths = [{ id: 1, name: "+/- 1" }, { id: 2, name: "+/- 2" }, { id: 3, name: "+/- 3" }, { id: 4, name: "+/- 4" }, { id: 5, name: "+/- 5" }, { id: 6, name: "+/- 6" }, { id: 7, name: "+/- 7" }, { id: 8, name: "+/- 8" }, { id: 9, name: "+/- 9" }, { id: 10, name: "+/- 10" }, { id: 11, name: "+/- 11" }, { id: 12, name: "+/- 12" }];
      vm.petSexs = GenderService.getAll();
      vm.selectedCompareActivity = null;
      vm.selectedCompareBreed = null;
      vm.selectedCompareBreedPercentage = null;
      vm.selectedCompareAgeType = null;
      vm.selectedCompareAgeRange = null;
      vm.selectedCompareSex = null;
    }

    function getCompareResults(id, datePeriod) {

      if (vm.selectedCompareActivity) {
        var getOptions = {
          reportEventId: vm.selectedCompareActivity.id,
          period: datePeriod };

        if (vm.selectedCompareBreed) {
          getOptions.breedId = vm.selectedCompareBreed.id;

          if (vm.selectedCompareBreedPercentage) {
            getOptions.breedPercentage = vm.selectedCompareBreedPercentage.id;
          }
        }

        if (vm.selectedCompareAgeRange) {
          var rangeValue = vm.selectedCompareAgeRange.id;
          getOptions.ageRange = rangeValue * (vm.selectedCompareAgeType.id == 1 ? 12 : 1);
        }

        if (vm.selectedCompareSex) {
          getOptions.petSex = vm.selectedCompareSex.id;
        }

        PetService.getActivityComparision(vm.selectedPet.id, getOptions).then(function (result) {

          $scope.compMyDogActivitieslabels = ["My Dog", ""];
          $scope.compMyDogActivitiesColors = ["#41c2f3", "#f5f5f5"];

          $scope.compOthersActivitieslabels = ["Others", ""];
          $scope.compOthersActivitiesColors = ["#929292", "#f5f5f5"];

          if (result && result.petResult && result.otherResult && result.petResult >= 0 && result.otherResult >= 0) {
            vm.comparisonResult = result;

            var roundPetResult = Math.round(result.petResult * 10) / 10;
            var roundOtherResult = Math.round(result.otherResult * 10) / 10;
            $scope.compMyDogActivitiesData = [roundPetResult, 6 - roundPetResult];
            $scope.compOthersActivitiesData = [roundOtherResult, 6 - roundOtherResult];
          } else {
            vm.comparisonResult = null;

            $scope.compMyDogActivitiesData = [0, 0];
            $scope.compOthersActivitiesData = [0, 0];

            ngDialog.open({
              template: "No results",
              plain: true
            });
          }
        }, function (error) {
          ngDialog.open({
            template: "Error, cannot get results",
            plain: true
          });
        });
      }
    }

    function getResults(id, datePeriod) {

      var getOptions = {
        period: datePeriod
      };

      PetService.getActivityRate(vm.selectedPet.id, getOptions).then(function (results) {
        vm.results = results;

        vm.selectedPetActivities = _.chain(vm.results).map(function (r) {
          return r.reportEvent;
        }).uniqWith(_.isEqual).value();

        // only events in use
        vm.activityEvents = vm.selectedPetActivities;
      }, function (error) {
        var errorMsg = "";
        errorMsg = translations.ActivitiesMsgGetError;

        ngDialog.open({
          template: errorMsg,
          plain: true
        });
      });
    }

    function addCondition(selectedActivity) {
      if (selectedActivity && _.find(vm.chartConditions, function (x) {
        return x.id == selectedActivity.id;
      }) == undefined) {
        vm.chartConditions.push(selectedActivity);
        vm.selectedActivity = null;

        resetChartData();
      }
    }

    function removeCondition(selectedActivity) {
      _.remove(vm.chartConditions, function (x) {
        return x.id == selectedActivity.id;
      });
      resetChartData();
    }

    function avgByChange(selectedAvgBy) {
      if (selectedAvgBy) {
        resetChartData();
      }
    }

    function valueByChange(selectedValueBy) {
      if (selectedValueBy) {
        resetChartData();
      }
    }

    function resetChartData() {
      var serieData = {},
          conditionIds = [],
          chartData = {},
          xAxisTitle = "",
          yAxisTitle = "",
          groupResult = [];

      $scope.labels = [];
      $scope.series = [];
      $scope.data = [];
      chartData.datasetOverride = [];

      if (vm.chartConditions && vm.chartConditions.length > 0) {

        conditionIds = vm.chartConditions.map(function (x) {
          return x.id;
        });

        vm.filteredActivities = _.chain(vm.results).filter(function (e) {
          return _.indexOf(conditionIds, e.reportEvent.id) >= 0;
        }).orderBy(["dateRegistered"], ["asc"]).value();

        // init data series
        chartData.labels = [];

        chartData.series = vm.chartConditions.map(function (x) {
          serieData[x.id.toString()] = {};
          return getActivityFullName(x);
        });

        if (vm.selectedValuesBy && vm.selectedValuesBy.id == 1) {
          yAxisTitle = "Rate Value";
        } else {
          yAxisTitle = "Time Spent (min)";
        }

        if (vm.selectedAvgBy && vm.selectedAvgBy.id == 1) {
          xAxisTitle = "Days";

          groupResult = _.chain(vm.filteredActivities).groupBy(function (e) {
            return moment.utc(e.dateRegistered).format("DD/MM/YY");
          }).value();
        } else {
          xAxisTitle = "Weeks ending on";

          groupResult = _.chain(vm.filteredActivities).groupBy(function (e) {
            return moment(e.dateRegistered).weekday(7).format("DD/MM/YY");
          }).value();
        }

        _.each(groupResult, function (items, index) {
          chartData.labels.push(index);
        });

        _.each(groupResult, function (items, index) {

          var tempCond = {};
          _.each(items, function (item) {
            tempCond[item.reportEventId] = [];
          });

          _.each(items, function (item) {

            if (vm.selectedValuesBy && vm.selectedValuesBy.id == 1) {
              // Rate Value
              tempCond[item.reportEventId].push(8 - item.rate.order);
            } else {
              // Time Spent
              tempCond[item.reportEventId].push(item.duration);
            }
          });

          _.each(tempCond, function (cond, condIndex) {
            var condSum = _.sum(cond);
            serieData[condIndex][index] = condSum / cond.length;
          });
        });

        chartData.data = [];
        _.values(serieData).forEach(function (e, index) {

          var arrData = [];
          _.each(chartData.labels, function (label) {

            var labelIndex = _.keys(e).indexOf(label);
            if (labelIndex >= 0) {
              arrData.push(_.values(e)[labelIndex]);
            } else {
              arrData.push(0);
            }
          });

          chartData.data.push(arrData);
        });

        $scope.options = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: xAxisTitle
              }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: yAxisTitle
              }
            }]
          }
        };

        if (vm.selectedValuesBy && vm.selectedValuesBy.id == 1) {
          // Rate Value
          $scope.options.scales.yAxes[0].ticks = {
            max: 6,
            min: 0,
            stepSize: 1
          };
        } else {
          $scope.options.scales.yAxes[0].ticks = {
            min: 0
          };
        }

        $scope.labels = chartData.labels;
        $scope.series = chartData.series;
        $scope.data = [];
        $scope.data = chartData.data;
        $scope.datasetOverride = chartData.datasetOverride;
      }
    }

    function compareBreedChange(selectedCompareBreed) {
      if (!selectedCompareBreed) {
        vm.selectedCompareBreedPercentage = null;
      }
    }

    function ageTypeChange(selectedCompareAgeType) {
      if (selectedCompareAgeType) {
        if (selectedCompareAgeType.id == 1) {
          vm.ageRanges = vm.ageRangesYears;
        } else {
          vm.ageRanges = vm.ageRangesMonths;
        }
      } else {
        vm.ageRanges = null;
      }
    }

    function compare() {

      if (vm.selectedCompareActivity) {
        getCompareResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);
      } else {
        ngDialog.open({
          template: "Complete all required fields.",
          plain: true
        });
      }
    }

    function getActivityFullName(activity) {
      return activity.report.name + " - " + activity.event.name;
    }

    function getDurationFormat(min) {
      var strResult = "",
          minutes = moment.duration(parseInt(min), "minutes").minutes(),
          hours = moment.duration(parseInt(min), "minutes").hours();

      strResult += hours + " hs";
      strResult += " ";
      strResult += minutes + " min";

      return strResult;
    }

    function remove(id) {
      if (id) {
        ngDialog.openConfirm({
          template: "                  <p>Are you sure you want to delete this record?</p>                  <div class=\"ngdialog-buttons\">                      <button type=\"button\" class=\"ngdialog-button ngdialog-button-secondary\" ng-click=\"closeThisDialog(0)\">No</button>                      <button type=\"button\" class=\"ngdialog-button ngdialog-button-primary\" ng-click=\"confirm(1)\">Yes</button>                  </div>",
          plain: true }).then(function (value) {

          PetService.removeActivityRate($rootScope.selectedPet.id, id).then(function (result) {

            getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);

            ngDialog.open({
              template: "You have deleted successfully",
              plain: true
            });
          }, function (error) {
            ngDialog.open({
              template: "Error, please try again later.",
              plain: true
            });
          });
        });
      }
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("BehavioursCtrl", BehavioursCtrl);

  function BehavioursCtrl($rootScope, $scope, $state, $filter, $stateParams, BagService, BehaviourService, UserService, userPets, types, ngDialog, translations, config) {

    var vm = this;

    // methods
    vm.eventChange = eventChange;
    vm.getDurationFormat = getDurationFormat;
    vm.getTitleDetails = getTitleDetails;
    vm.dateFormatLocal = dateFormatLocal;
    vm.remove = remove;

    // dependencies
    vm.userPets = userPets;
    vm.types = types;

    // defaults
    init();

    $scope.$on("period-change", function (event, args) {
      init();
      getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);
    });

    if ($rootScope.selectedPet) {
      vm.selectedPet = $rootScope.selectedPet;
      getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);
    }

    function dateFormatLocal(date) {
      if (date) {
        return moment(moment.utc(moment.utc(date).format("YYYY-MM-DD HH:mm")).toDate()).format("YYYY-MM-DD HH:mm");
      }
    }

    function init() {
      vm.results = [];
      vm.selectedType = null;
      vm.filteredTypes = [];
      vm.selectedPetBehaviours = [];
    }

    function getResults(id, datePeriod) {

      var getOptions = {
        period: datePeriod
      };

      BehaviourService.getBehaviours(vm.selectedPet.id, getOptions).then(function (results) {
        vm.results = results;

        vm.selectedPetBehaviours = _.chain(vm.results).map(function (r) {
          return r.behaviourType;
        }).uniqWith(_.isEqual).value();

        // only events in use
        vm.types = vm.selectedPetBehaviours;
      }, function (error) {
        var errorMsg = "";
        errorMsg = translations.BehavioursMsgGetError;

        ngDialog.open({
          template: errorMsg,
          plain: true
        });
      });
    }

    function eventChange(type) {

      if (type && vm.results) {

        vm.filteredTypes = _.chain(vm.results).filter(function (e) {
          return e.behaviourTypeId == type.id;
        }).orderBy(["dateRegistered"], ["asc"]).value();

        $scope.labels = _.chain(vm.filteredTypes).groupBy(function (e) {
          return moment(e.dateRegistered).weekday(7).format("DD/MM/YY");
        }).keys().value();

        vm.data = _.chain($scope.labels).map(function (e) {
          return e.length;
        }).value();

        $scope.options = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            xAxes: [{
              scaleLabel: {
                display: true,
                labelString: "Weeks ending on"
              },
              ticks: {
                max: 7,
                min: 0,
                stepSize: 1
              }
            }],
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: "Occurrences"
              }
            }]
          }
        };
        $scope.series = ["Behaviours"];
        $scope.data = [];
        $scope.data.push(vm.data);
      }
    }

    function getTitleDetails(item) {
      return item.behaviourType.name;
    }

    function getDurationFormat(min) {
      var strResult = "",
          minutes = moment.duration(parseInt(min), "minutes").minutes(),
          hours = moment.duration(parseInt(min), "minutes").hours();

      strResult += hours + " hs";
      strResult += " ";
      strResult += minutes + " min";

      return strResult;
    }

    function remove(id) {
      if (id) {
        ngDialog.openConfirm({
          template: "                  <p>Are you sure you want to delete this record?</p>                  <div class=\"ngdialog-buttons\">                      <button type=\"button\" class=\"ngdialog-button ngdialog-button-secondary\" ng-click=\"closeThisDialog(0)\">No</button>                      <button type=\"button\" class=\"ngdialog-button ngdialog-button-primary\" ng-click=\"confirm(1)\">Yes</button>                  </div>",
          plain: true }).then(function (value) {

          BehaviourService.remove($rootScope.selectedPet.id, id).then(function (result) {

            getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);

            ngDialog.open({
              template: "You have deleted successfully",
              plain: true
            });
          }, function (error) {
            ngDialog.open({
              template: "Error, please try again later.",
              plain: true
            });
          });
        });
      }
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("ContactusCtrl", ContactusCtrl);

  function ContactusCtrl($rootScope, $scope, $state, PetService, GenderService, BagService, userPets, petTypes, ngDialog, translations) {

    var vm = this;

    vm.toPet = toPet;
    vm.toState = toState;
    vm.search = search;
    vm.setActive = setActive;
    vm.searchFilter = searchFilter;
    vm.typeFilter = typeFilter;
    vm.getSexType = getSexType;
    vm.getPetAge = getPetAge;
    vm.getBreedNames = getBreedNames;
    vm.getOwnerNames = getOwnerNames;
    vm.isValidPuppy = isValidPuppy;

    // setting default values
    vm.items = [];
    vm.items = userPets;
    vm.types = petTypes;

    $rootScope.selectedPet = null;

    function toPet(petId) {
      if (petId) {
        $state.go("app.profile.index", { id: petId });
      }
    }

    function toState(type, pet) {

      if (type && pet) {
        BagService.set("SelectedPet", pet);

        if (type == 1) {
          // Activity
          $state.go("app.profile.activities", { id: pet.id });
        } else if (type == 2) {
          // Behaviour
          $state.go("app.profile.behaviours", { id: pet.id });
        } else if (type == 3) {
          // Treatments
          $state.go("app.profile.treatments", { id: pet.id });
        } else if (type == 4) {
          // Puppy Socialisation
          $state.go("app.profile.socialisations", { id: pet.id });
        } else if (type == 5) {
          // Seizures
          $state.go("app.profile.seizures", { id: pet.id });
        } else if (type == 6) {
          // Respiration Rates
          $state.go("app.profile.respirationRates", { id: pet.id });
        } else if (type == 7) {
          // Symptoms
          $state.go("app.profile.symptoms", { id: pet.id });
        } else if (type == 8) {
          // Sessions
          $state.go("app.profile.sessions", { id: pet.id });
        }
      }
    }

    function search(obj) {
      if (vm.filterQuery) {
        if (obj.microchipNumber) {
          return !!(obj.name.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || "") !== -1 || obj.microchipNumber.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || "") !== -1 || obj.owner.firstName.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || "") !== -1 || obj.owner.lastName.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || "") !== -1);
        } else {
          return !!(obj.name.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || "") !== -1 || obj.owner.firstName.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || "") !== -1 || obj.owner.lastName.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || "") !== -1);
        }
      } else {
        return true;
      }
    };

    function searchFilter(obj) {
      var re = new RegExp(vm.searchBy, "i");
      return !vm.searchBy || re.test(obj.name) || re.test(obj.desc);
    };

    function typeFilter(obj) {
      return !vm.searchByType || vm.searchByType.id == obj.petSubtype.petTypeId;
    };

    function setActive(pet, index) {
      vm.activeIndex = index;
      vm.activePet = pet;

      // Setting pet on bag.
      BagService.set("SelectedPet", pet);

      PetService.getTimeline(pet.id).then(function (items) {
        vm.timeline = items;
      }, function (errors) {
        vm.timeline = [];
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

    function getOwnerNames(owner) {
      var fullName = "";

      if (owner.firstName) fullName += owner.firstName;

      if (owner.lastName) fullName += " " + owner.lastName;

      return fullName;
    }

    function getSexType(sexId) {
      var gender = GenderService.get(sexId);
      return gender.name || "";
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

  angular.module("app.controllers").controller("Email", EmailCtrl);

  function EmailCtrl() {}
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("FeedsCtrl", FeedsCtrl);

  function FeedsCtrl($rootScope, $scope, $state, $filter, $stateParams, BagService, PetService, UserService, userPets, ngDialog, translations, config) {

    var vm = this;

    // methods
    vm.getDurationFormat = getDurationFormat;
    vm.getTitleDetails = getTitleDetails;
    vm.dateFormatLocal = dateFormatLocal;
    vm.getFoodItems = getFoodItems;
    vm.remove = remove;

    // dependencies
    vm.userPets = userPets;

    // defaults
    init();

    $scope.$on("period-change", function (event, args) {
      init();
      getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);
    });

    if ($rootScope.selectedPet) {
      vm.selectedPet = $rootScope.selectedPet;
      getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);
    }

    function dateFormatLocal(date) {
      if (date) {
        return moment(moment.utc(moment.utc(date).format("YYYY-MM-DD HH:mm")).toDate()).format("YYYY-MM-DD HH:mm");
      }
    }

    function init() {
      vm.results = [];
      vm.selectedType = null;
      vm.filteredTypes = [];
      vm.selectedPetBehaviours = [];
    }

    function getResults(id, datePeriod) {

      var getOptions = {
        period: datePeriod
      };

      PetService.getFeed(vm.selectedPet.id, getOptions).then(function (results) {
        vm.results = results;

        vm.selectedPetBehaviours = _.chain(vm.results).map(function (r) {
          return r.behaviourType;
        }).uniqWith(_.isEqual).value();

        // only events in use
        vm.types = vm.selectedPetBehaviours;
      }, function (error) {
        var errorMsg = "";
        errorMsg = translations.BehavioursMsgGetError;

        ngDialog.open({
          template: errorMsg,
          plain: true
        });
      });
    }

    function getTitleDetails(item) {
      var dateFormat = $filter("date")(vm.dateFormatLocal(item.dateCreated), "short");
      return item.behaviourType.name + " - " + dateFormat;
    }

    function getDurationFormat(min) {
      var strResult = "",
          minutes = moment.duration(parseInt(min), "minutes").minutes(),
          hours = moment.duration(parseInt(min), "minutes").hours();

      strResult += hours + " hs";
      strResult += " ";
      strResult += minutes + " min";

      return strResult;
    }

    function getFoodItems(items) {
      return items.map(function (i) {
        return i.foodType.name;
      }).join(", ");
    }

    function remove(id) {
      if (id) {
        ngDialog.openConfirm({
          template: "                  <p>Are you sure you want to delete this record?</p>                  <div class=\"ngdialog-buttons\">                      <button type=\"button\" class=\"ngdialog-button ngdialog-button-secondary\" ng-click=\"closeThisDialog(0)\">No</button>                      <button type=\"button\" class=\"ngdialog-button ngdialog-button-primary\" ng-click=\"confirm(1)\">Yes</button>                  </div>",
          plain: true }).then(function (value) {

          PetService.removeFeed($rootScope.selectedPet.id, id).then(function (result) {

            getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);

            ngDialog.open({
              template: "You have deleted successfully",
              plain: true
            });
          }, function (error) {
            ngDialog.open({
              template: "Error, please try again later.",
              plain: true
            });
          });
        });
      }
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("HomeCtrl", HomeCtrl);

  function HomeCtrl($rootScope, $scope, $state, PetService, GenderService, BagService, userPets, petTypes, ngDialog, translations) {

    var vm = this;

    vm.toPet = toPet;
    vm.toState = toState;
    vm.search = search;
    vm.setActive = setActive;
    vm.searchFilter = searchFilter;
    vm.typeFilter = typeFilter;
    vm.getSexType = getSexType;
    vm.getPetAge = getPetAge;
    vm.getBreedNames = getBreedNames;
    vm.getOwnerNames = getOwnerNames;
    vm.isValidPuppy = isValidPuppy;

    // setting default values
    vm.items = [];
    vm.items = userPets;
    vm.types = petTypes;

    $rootScope.selectedPet = null;

    function toPet(petId) {
      if (petId) {
        $state.go("app.profile.index", { id: petId });
      }
    }

    function toState(type, pet) {

      if (type && pet) {
        BagService.set("SelectedPet", pet);

        if (type == 1) {
          // Activity
          $state.go("app.profile.activities", { id: pet.id });
        } else if (type == 2) {
          // Behaviour
          $state.go("app.profile.behaviours", { id: pet.id });
        } else if (type == 3) {
          // Treatments
          $state.go("app.profile.treatments", { id: pet.id });
        } else if (type == 4) {
          // Puppy Socialisation
          $state.go("app.profile.socialisations", { id: pet.id });
        } else if (type == 5) {
          // Seizures
          $state.go("app.profile.seizures", { id: pet.id });
        } else if (type == 6) {
          // Respiration Rates
          $state.go("app.profile.respirationRates", { id: pet.id });
        } else if (type == 7) {
          // Symptoms
          $state.go("app.profile.symptoms", { id: pet.id });
        } else if (type == 8) {
          // Sessions
          $state.go("app.profile.sessions", { id: pet.id });
        }
      }
    }

    function search(obj) {
      if (vm.filterQuery) {
        if (obj.microchipNumber) {
          return !!(obj.name.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || "") !== -1 || obj.microchipNumber.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || "") !== -1 || obj.owner.firstName.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || "") !== -1 || obj.owner.lastName.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || "") !== -1);
        } else {
          return !!(obj.name.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || "") !== -1 || obj.owner.firstName.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || "") !== -1 || obj.owner.lastName.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || "") !== -1);
        }
      } else {
        return true;
      }
    };

    function searchFilter(obj) {
      var re = new RegExp(vm.searchBy, "i");
      return !vm.searchBy || re.test(obj.name) || re.test(obj.desc);
    };

    function typeFilter(obj) {
      return !vm.searchByType || vm.searchByType.id == obj.petSubtype.petTypeId;
    };

    function setActive(pet, index) {
      vm.activeIndex = index;
      vm.activePet = pet;

      // Setting pet on bag.
      BagService.set("SelectedPet", pet);

      PetService.getTimeline(pet.id).then(function (items) {
        vm.timeline = items;
      }, function (errors) {
        vm.timeline = [];
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

    function getOwnerNames(owner) {
      var fullName = "";

      if (owner.firstName) fullName += owner.firstName;

      if (owner.lastName) fullName += " " + owner.lastName;

      return fullName;
    }

    function getSexType(sexId) {
      var gender = GenderService.get(sexId);
      return gender.name || "";
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

  angular.module("app.controllers").controller("LoginCtrl", LoginCtrl);

  function LoginCtrl($scope, $state, AuthService, ErrorMapper, ngDialog, translations) {
    var vm = this;

    // defaults
    vm.passwordType = "password";

    vm.login = login;
    vm.showPassword = showPassword;

    function login(formData) {

      AuthService.getUsersToken(formData).then(function (token) {
        $state.go("app.home");
      }, function (errors) {

        var errorMsg = "";
        errorMsg = ErrorMapper.getErrorMsgs(errors) || errors.data.error_description || translations.LoginDefaultError;;

        ngDialog.open({
          template: errorMsg,
          plain: true
        });
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

  function MainCtrl($rootScope, UserService, BagService, $state) {
    var vm = this;

    vm.logout = logout;
    vm.toState = toState;

    // defaults
    $rootScope.selectedPet = null;

    function toState(type, pet) {

      if (type && pet) {
        BagService.set("SelectedPet", pet);

        if (type == 1) {
          // Activity
          $state.go("app.profile.activities", { id: pet.id });
        } else if (type == 2) {
          // Behaviour
          $state.go("app.profile.behaviours", { id: pet.id });
        } else if (type == 3) {
          // Treatments
          $state.go("app.profile.treatments", { id: pet.id });
        } else if (type == 4) {
          // Puppy Socialisation
          $state.go("app.profile.socialisations", { id: pet.id });
        } else if (type == 5) {
          // Seizures
          $state.go("app.profile.seizures", { id: pet.id });
        } else if (type == 6) {
          // Respiration Rates
          $state.go("app.profile.respirationRates", { id: pet.id });
        } else if (type == 7) {
          // Symptoms
          $state.go("app.profile.symptoms", { id: pet.id });
        } else if (type == 8) {
          // Sessions
          $state.go("app.profile.sessions", { id: pet.id });
        } else if (type == 9) {
          // Sessions
          $state.go("app.profile.feeds", { id: pet.id });
        } else if (type == 10) {
          // Profile
          $state.go("app.profile.index", { id: pet.id });
        }
      }
    }

    function logout() {
      UserService.logout();
    }
  };
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("PermissionsCtrl", PermissionsCtrl);

  function PermissionsCtrl($scope, $state, ngDialog, NgTableParams, $element, PetService, GenderService, ShareUserTypeService, pets, shareUserTypes, translations, UserService) {

    var vm = this;

    // methods
    vm.newSharePetsChange = newSharePetsChange;
    vm.transferSharePetsChange = transferSharePetsChange;
    vm.updateSharePetsChange = updateSharePetsChange;
    vm.getUserFullDesc = getUserFullDesc;
    vm.getUserName = getUserName;
    vm.checkUser = checkUser;
    vm.checkTransferUser = checkTransferUser;
    vm.addShareUser = addShareUser;
    vm.updateShareUser = updateShareUser;
    vm.removeShareUser = removeShareUser;
    vm.transferShareUser = transferShareUser;
    vm.dateFormatLocal = dateFormatLocal;
    vm.getShareUserDetails = getShareUserDetails;
    vm.getBreedNames = getBreedNames;
    vm.getPetAge = getPetAge;
    vm.getSexType = getSexType;
    vm.getShareUserTypeDetails = getShareUserTypeDetails;

    // dependencies
    vm.pets = pets;
    vm.shareUserTypes = shareUserTypes;
    vm.shareUsersItems = [];
    vm.ngTableUpdateConfigs = [];

    // New Share User

    vm.ngTableConfig = angular.copy(createNgTableConfig());
    vm.ngTableTransferConfig = angular.copy(createNgTableConfig());

    function createNgTableConfig() {
      var initialParams = {
        count: 5
      };
      var initialSettings = {
        counts: [],
        dataset: vm.pets
      };
      return new NgTableParams(initialParams, initialSettings);
    }

    // defaults
    init();

    function init() {
      vm.ngTableUpdateConfigs = [];
      vm.results = [];
      vm.userEmail = null;
      vm.transferUserEmail = null;
      vm.selectedUser = null;
      vm.selectedTransferUser = null;
      vm.newSharePets = null;
      vm.newSharePetsFiltered = [];
      vm.updateSharePetsFiltered = [];
      vm.selectedShareUserType = null;
      vm.updateSharePets = [];
      vm.shareUsers = [];
      vm.transferSharePets = null;
      vm.transferSharePetsFiltered = [];

      UserService.getShareUser().then(function (shareUsers) {
        vm.shareUsers = shareUsers;

        vm.shareUsers.forEach(function (shareUser) {
          vm.updateSharePets[shareUser.id] = {};

          // ng-table configuration
          vm.ngTableUpdateConfigs[shareUser.id] = angular.copy(createNgTableConfig());

          shareUser.sharePets.forEach(function (sharePet) {
            vm.updateSharePets[shareUser.id][sharePet.petId] = true;
          });
        });
      });
    }

    function newSharePetsChange() {

      vm.newSharePetsFiltered = _.chain(vm.newSharePets).keys().value().filter(function (e) {
        return vm.newSharePets[e] == true;
      });
    }

    function transferSharePetsChange() {

      vm.transferSharePetsFiltered = _.chain(vm.transferSharePets).keys().value().filter(function (e) {
        return vm.transferSharePets[e] == true;
      });
    }

    function updateSharePetsChange(shareUserId, sharePetId) {
      vm.updateSharePetsFiltered = _.chain(vm.updateSharePets[shareUserId]).keys().value().filter(function (e) {
        return vm.updateSharePets[shareUserId][e] == true;
      });
    }

    function dateFormatLocal(date) {
      if (date) {
        return moment(moment.utc(moment.utc(date).format("YYYY-MM-DD HH:mm")).toDate()).format("YYYY-MM-DD HH:mm");
      }
    }

    function checkUser(userEmail) {

      if (userEmail) {

        UserService.getUserByEmail(userEmail).then(function (user) {
          if (user) {

            vm.selectedUser = user;
          } else {
            ngDialog.open({
              template: "The user is not valid",
              plain: true
            });
          }
        }, function (err) {
          ngDialog.open({
            template: "The user is not member of Doglogbook",
            plain: true
          });
        });
      }
    }

    function checkTransferUser(userEmail) {

      if (userEmail) {

        UserService.getUserByEmail(userEmail).then(function (user) {
          if (user) {

            vm.selectedTransferUser = user;
          } else {
            ngDialog.open({
              template: "The user is not valid",
              plain: true
            });
          }
        }, function (err) {
          ngDialog.open({
            template: "The user is not member of Doglogbook",
            plain: true
          });
        });
      }
    }

    function addShareUser(selectedUser) {
      var newShareUser = {};

      if (vm.selectedUser && vm.selectedShareUserType && vm.newSharePetsFiltered && vm.newSharePetsFiltered.length > 0) {

        newShareUser.shareUserId = vm.selectedUser.id;
        newShareUser.shareUserType = vm.selectedShareUserType.id;

        newShareUser.sharePets = vm.newSharePetsFiltered.map(function (e) {
          return { petId: e };
        });

        UserService.addShareUser(newShareUser).then(function (result) {

          ngDialog.open({
            template: "You have shared successfully",
            plain: true
          });

          init();
        }, function (error) {
          ngDialog.open({
            template: "Error, please try again later.",
            plain: true
          });
        });
      } else {
        ngDialog.open({
          template: "Please complete all the required fields.",
          plain: true
        });
      }
    }

    function updateShareUser(shareUser) {
      var updateShareUser = {};

      if (shareUser && shareUser.sharePets && shareUser.sharePets.length > 0) {

        updateShareUser.shareUserId = shareUser.shareUserId;
        updateShareUser.shareUserType = shareUser.shareUserType;
        updateShareUser.sharePets = _.chain(vm.updateSharePets[shareUser.id]).keys().value().filter(function (e) {
          return vm.updateSharePets[shareUser.id][e] == true;
        }).map(function (e) {
          return { petId: e };
        });

        UserService.updateShareUser(shareUser.id, updateShareUser).then(function (result) {

          ngDialog.open({
            template: "You have updated successfully",
            plain: true
          });

          init();
        }, function (error) {
          ngDialog.open({
            template: "Error, please try again later.",
            plain: true
          });
        });
      } else {
        ngDialog.open({
          template: "Please complete all the required fields.",
          plain: true
        });
      }
    }

    function removeShareUser(shareUser) {

      if (shareUser) {

        ngDialog.openConfirm({
          template: "                <p>Are you sure you want to remove the user?</p>                <div class=\"ngdialog-buttons\">                    <button type=\"button\" class=\"ngdialog-button ngdialog-button-secondary\" ng-click=\"closeThisDialog(0)\">No</button>                    <button type=\"button\" class=\"ngdialog-button ngdialog-button-primary\" ng-click=\"confirm(1)\">Yes</button>                </div>",
          plain: true }).then(function (value) {

          UserService.removeShareUser(shareUser.id).then(function (result) {
            init();

            ngDialog.open({
              template: "You have removed a user successfully",
              plain: true
            });
          }, function (error) {
            ngDialog.open({
              template: "Error, please try again later.",
              plain: true
            });
          });
        });
      }
    }

    function transferShareUser(selectedTransferUser) {
      var transferShareUser = {};

      if (vm.selectedTransferUser && vm.transferSharePetsFiltered && vm.transferSharePetsFiltered.length > 0) {

        ngDialog.openConfirm({
          template: "                  <p>Are you sure you want to transfer?</p>                  <div class=\"ngdialog-buttons\">                      <button type=\"button\" class=\"ngdialog-button ngdialog-button-secondary\" ng-click=\"closeThisDialog(0)\">No</button>                      <button type=\"button\" class=\"ngdialog-button ngdialog-button-primary\" ng-click=\"confirm(1)\">Yes</button>                  </div>",
          plain: true }).then(function (value) {

          transferShareUser.shareUserId = vm.selectedTransferUser.id;
          transferShareUser.shareUserType = 1; // as a default value
          transferShareUser.sharePets = vm.transferSharePetsFiltered.map(function (e) {
            return { petId: e };
          });

          UserService.transferShareUser(transferShareUser).then(function (result) {
            init();

            ngDialog.open({
              template: "You have transfered successfully",
              plain: true
            });
          }, function (error) {
            ngDialog.open({
              template: "Error, please try again later.",
              plain: true
            });
          });
        });
      } else {
        ngDialog.open({
          template: "Please complete all the required fields.",
          plain: true
        });
      }
    }

    function getUserName(user) {
      var desc = "";

      if (user.firstName) desc += user.firstName;

      if (user.lastName) desc += " " + user.lastName;

      return desc;
    }

    function getUserFullDesc(user) {
      var desc = "";

      if (user) {
        if (user.firstName) desc += user.firstName;

        if (user.lastName) desc += " " + user.lastName;

        return desc;
      } else {
        return "";
      }
    }

    function getShareUserDetails(item) {
      var desc = "";

      if (item && item.shareUser) {
        if (item.shareUser.firstName) desc += item.shareUser.firstName;

        if (item.shareUser.lastName) desc += " " + item.shareUser.lastName;
      }

      return desc;
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

    function getPetAge(dateOfBirth) {
      if (dateOfBirth) {
        var now = moment(new Date()); //todays date
        var end = moment(dateOfBirth); // another date
        var duration = moment.duration(now.diff(end));
        return duration.years();
      } else {
        return "";
      }
    }

    function getSexType(sexId) {
      var gender = GenderService.get(sexId);
      return gender.name || "";
    }

    function getShareUserTypeDetails(item) {
      if (item && item.shareUserType) {
        var value = ShareUserTypeService.get(item.shareUserType);
        return value ? value.name : "";
      } else {
        return "";
      }
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("PetProfileIndexCtrl", PetProfileIndexCtrl);

  function PetProfileIndexCtrl($rootScope, $scope, $state, $filter, $stateParams, PetService, BehaviourService, WeightUnitsService, breeds, GenderService, ngDialog, translations, config) {

    var vm = this;

    // methods
    vm.weightUnitChange = weightUnitChange;
    vm.compareWeightUnitChange = compareWeightUnitChange;
    vm.ageTypeChange = ageTypeChange;
    vm.compareBreedChange = compareBreedChange;

    // dependencies
    vm.breeds = breeds;

    // defaults
    init();

    $scope.$on("period-change", function (event, args) {
      init();
      getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);
    });

    if ($rootScope.selectedPet) {
      vm.selectedPet = $rootScope.selectedPet;
      getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);
    }

    function init() {
      vm.weightHistories = [];
      vm.activities = [];
      vm.activitiesGroups = [];
      vm.behavioursGroups = [];
      vm.respirationRate = [];
      vm.socialisation = [];
      vm.treatmentsGroups = [];
      vm.symptoms = [];
      vm.symptomsGroups = [];
      vm.seizures = [];
      vm.seizuresGroups = [];
      vm.weightUnits = WeightUnitsService.getAll();
      vm.selectedWeightUnit = vm.weightUnits[0];
      vm.selectedCompareWeightUnit = vm.weightUnits[0];

      // comparison
      vm.comparisonResult = null;

      $scope.compMyDogData = null;
      $scope.compMyDoglabels = null;
      $scope.compMyDogColors = null;

      $scope.compOthersData = null;
      $scope.compOtherslabels = null;
      $scope.compOthersColors = null;

      vm.breedPercentages = [{ id: 100, name: "100%" }, { id: 75, name: "75%" }, { id: 50, name: "50%" }, { id: 25, name: "25%" }];
      vm.ageTypes = [{ id: 1, name: "year" }, { id: 2, name: "month" }];
      vm.ageRanges = [];
      vm.ageRangesYears = [{ id: 1, name: "+/- 1" }, { id: 2, name: "+/- 2" }, { id: 3, name: "+/- 3" }];
      vm.ageRangesMonths = [{ id: 1, name: "+/- 1" }, { id: 2, name: "+/- 2" }, { id: 3, name: "+/- 3" }, { id: 4, name: "+/- 4" }, { id: 5, name: "+/- 5" }, { id: 6, name: "+/- 6" }, { id: 7, name: "+/- 7" }, { id: 8, name: "+/- 8" }, { id: 9, name: "+/- 9" }, { id: 10, name: "+/- 10" }, { id: 11, name: "+/- 11" }, { id: 12, name: "+/- 12" }];
      vm.petSexs = GenderService.getAll();
      vm.selectedCompareBreed = null;
      vm.selectedCompareBreedPercentage = null;
      vm.selectedCompareAgeType = null;
      vm.selectedCompareAgeRange = null;
      vm.selectedCompareSex = null;
    }

    function compareBreedChange(selectedCompareBreed) {
      if (!selectedCompareBreed) {
        vm.selectedCompareBreedPercentage = null;
      }
    }

    function weightUnitChange() {
      getWeightHistory($rootScope.selectedDatePeriod);
    }

    function compareWeightUnitChange() {
      getCompareResults($rootScope.selectedPet.id);
    }

    function getCompareResults(id) {

      var getOptions = {
        type: vm.selectedCompareWeightUnit.id
      };

      if (vm.selectedCompareBreed) {
        getOptions.breedId = vm.selectedCompareBreed.id;

        if (vm.selectedCompareBreedPercentage) {
          getOptions.breedPercentage = vm.selectedCompareBreedPercentage.id;
        }
      }

      if (vm.selectedCompareAgeRange) {
        var rangeValue = vm.selectedCompareAgeRange.id;
        getOptions.ageRange = rangeValue * (vm.selectedCompareAgeType.id == 1 ? 12 : 1);
      }

      if (vm.selectedCompareSex) {
        getOptions.petSex = vm.selectedCompareSex.id;
      }

      PetService.getWeightComparision(vm.selectedPet.id, getOptions).then(function (result) {

        $scope.weightComparisonSeries = ["My Dog", "Others"];
        $scope.weightComparisonLabels = ["Comparison"];;
        $scope.weightComparisonColors = ["#41c2f3", "#c7c7c7"];
        $scope.weightComparisonOptions = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: "Weight"
              },
              ticks: {
                min: 0
              }
            }]
          }
        };

        if (result && result.petResult && result.otherResult && result.petResult >= 0 && result.otherResult >= 0) {
          vm.comparisonResult = result;

          $scope.weightComparisonData = [[result.petResult], [result.otherResult]];
        } else {
          vm.comparisonResult = null;

          $scope.weightComparisonData = [];

          ngDialog.open({
            template: "No results",
            plain: true
          });
        }
      }, function (error) {
        ngDialog.open({
          template: "Error, cannot get results",
          plain: true
        });
      });
    }

    function ageTypeChange(selectedCompareAgeType) {
      if (selectedCompareAgeType) {
        if (selectedCompareAgeType.id == 1) {
          vm.ageRanges = vm.ageRangesYears;
        } else {
          vm.ageRanges = vm.ageRangesMonths;
        }
      } else {
        vm.ageRanges = null;
      }
    }

    function getWeightHistory(datePeriod) {

      var getOptions = {
        period: datePeriod,
        type: vm.selectedWeightUnit.id
      };

      // Activities
      PetService.getWeightHistory(vm.selectedPet.id, getOptions).then(function (weightHistories) {

        vm.weightHistories = weightHistories;

        weightHistories = _.chain(weightHistories).orderBy(["dateCreated"], ["asc"]).value();

        $scope.labels = _.chain(weightHistories).map(function (e) {
          var dateFormat = $filter("date")(e.dateCreated, "d MMM HH:mm");
          return dateFormat;
        }).value();

        vm.data = _.chain(weightHistories).map(function (e) {
          return e.weight;
        }).value();

        $scope.series = ["Weight History"];
        $scope.data = [];
        $scope.options = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: "Weight"
              }
            }]
          }
        };
        $scope.data.push(vm.data);
      });
    }

    function getResults(id, datePeriod) {

      var getOptions = {
        period: datePeriod
      };

      getWeightHistory(datePeriod);

      // Activities
      PetService.getActivityRate(vm.selectedPet.id, getOptions).then(function (activities) {

        vm.activities = activities;
        vm.activitiesGroups = _.chain(activities).groupBy(function (e) {
          return e.reportEvent.event.name + " - " + e.reportEvent.report.name;
        }).toPairs().map(function (x) {
          return [x[0], x[1].length];
        }).orderBy(["1"], ["desc"]).value();
      });

      // Behaviours
      BehaviourService.getBehaviours(vm.selectedPet.id, getOptions).then(function (behaviours) {

        vm.behaviours = behaviours;
        vm.behavioursGroups = _.chain(behaviours).groupBy(function (e) {
          return e.behaviourType.name;
        }).toPairs().map(function (x) {
          return [x[0], x[1].length];
        }).orderBy(["1"], ["desc"]).value();
      });

      // RespirationRate
      PetService.getRespirationRate(vm.selectedPet.id, getOptions).then(function (respirationRate) {
        vm.respirationRate = respirationRate;
      });

      // Socialisation
      PetService.getSocialisation(vm.selectedPet.id, getOptions).then(function (socialisation) {
        vm.socialisation = socialisation;
      });

      // Treatments
      PetService.getTreatment(vm.selectedPet.id, getOptions).then(function (treatments) {

        vm.treatments = treatments;
        vm.treatmentsGroups = _.chain(treatments).groupBy(function (e) {
          return e.treatmentType.name;
        }).toPairs().map(function (x) {
          return [x[0], x[1].length];
        }).orderBy(["1"], ["desc"]).value();
      });

      // Symptom
      PetService.getSymptom(vm.selectedPet.id, getOptions).then(function (symptoms) {

        vm.symptoms = symptoms;
        vm.symptomsGroups = _.chain(symptoms).groupBy(function (e) {
          return e.symptomType.name;
        }).toPairs().map(function (x) {
          return [x[0], x[1].length];
        }).orderBy(["1"], ["desc"]).value();
      });

      // Seizures
      PetService.getSeizures(vm.selectedPet.id, getOptions).then(function (seizures) {

        vm.seizures = seizures;
        vm.seizuresGroups = _.chain(seizures).groupBy(function (e) {
          return e.seizureType.name;
        }).toPairs().map(function (x) {
          return [x[0], x[1].length];
        }).orderBy(["1"], ["desc"]).value();
      });
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("ProfileCtrl", ProfileCtrl);

  function ProfileCtrl($rootScope, $scope, $state, $filter, $stateParams, BagService, PetService, UserService, DatePeriodService, GenderService, selectedPet, translations) {

    var vm = this;

    // methods
    vm.getBreedNames = getBreedNames;
    vm.datePeriodChange = datePeriodChange;
    vm.getSexType = getSexType;
    vm.getPetAge = getPetAge;

    // dependencies

    // defaults
    init();

    function init() {
      $rootScope.selectedPet = selectedPet;

      // Periods
      vm.datePeriods = DatePeriodService.getAll();
      vm.selectedDatePeriodObj = DatePeriodService.getDefault();
      $rootScope.selectedDatePeriod = vm.selectedDatePeriodObj.id;
    }

    function getSexType(sexId) {
      var gender = GenderService.get(sexId);
      return gender.name || "";
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

    function getBreedNames(petBreeds) {
      if (petBreeds && petBreeds.length == 1) {
        return petBreeds[0].breed.name;
      } else if (petBreeds && petBreeds.length > 1) {
        return translations.HomeMsgMixedBreed;
      } else {
        return translations.HomeMsgBreedNotSet;
      }
    }

    function datePeriodChange(selectedDatePeriodObj) {
      if (selectedDatePeriodObj) {
        $rootScope.selectedDatePeriod = vm.selectedDatePeriodObj.id;
        $rootScope.$broadcast("period-change", $rootScope.selectedDatePeriod);
      }
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("QandaCtrl", QandaCtrl);

  function QandaCtrl($rootScope, $scope, $state, PetService, GenderService, BagService, userPets, petTypes, ngDialog, translations) {

    var vm = this;

    vm.toPet = toPet;
    vm.toState = toState;
    vm.search = search;
    vm.setActive = setActive;
    vm.searchFilter = searchFilter;
    vm.typeFilter = typeFilter;
    vm.getSexType = getSexType;
    vm.getPetAge = getPetAge;
    vm.getBreedNames = getBreedNames;
    vm.getOwnerNames = getOwnerNames;
    vm.isValidPuppy = isValidPuppy;

    // setting default values
    vm.items = [];
    vm.items = userPets;
    vm.types = petTypes;

    $rootScope.selectedPet = null;

    function toPet(petId) {
      if (petId) {
        $state.go("app.profile.index", { id: petId });
      }
    }

    function toState(type, pet) {

      if (type && pet) {
        BagService.set("SelectedPet", pet);

        if (type == 1) {
          // Activity
          $state.go("app.profile.activities", { id: pet.id });
        } else if (type == 2) {
          // Behaviour
          $state.go("app.profile.behaviours", { id: pet.id });
        } else if (type == 3) {
          // Treatments
          $state.go("app.profile.treatments", { id: pet.id });
        } else if (type == 4) {
          // Puppy Socialisation
          $state.go("app.profile.socialisations", { id: pet.id });
        } else if (type == 5) {
          // Seizures
          $state.go("app.profile.seizures", { id: pet.id });
        } else if (type == 6) {
          // Respiration Rates
          $state.go("app.profile.respirationRates", { id: pet.id });
        } else if (type == 7) {
          // Symptoms
          $state.go("app.profile.symptoms", { id: pet.id });
        } else if (type == 8) {
          // Sessions
          $state.go("app.profile.sessions", { id: pet.id });
        }
      }
    }

    function search(obj) {
      if (vm.filterQuery) {
        if (obj.microchipNumber) {
          return !!(obj.name.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || "") !== -1 || obj.microchipNumber.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || "") !== -1 || obj.owner.firstName.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || "") !== -1 || obj.owner.lastName.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || "") !== -1);
        } else {
          return !!(obj.name.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || "") !== -1 || obj.owner.firstName.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || "") !== -1 || obj.owner.lastName.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || "") !== -1);
        }
      } else {
        return true;
      }
    };

    function searchFilter(obj) {
      var re = new RegExp(vm.searchBy, "i");
      return !vm.searchBy || re.test(obj.name) || re.test(obj.desc);
    };

    function typeFilter(obj) {
      return !vm.searchByType || vm.searchByType.id == obj.petSubtype.petTypeId;
    };

    function setActive(pet, index) {
      vm.activeIndex = index;
      vm.activePet = pet;

      // Setting pet on bag.
      BagService.set("SelectedPet", pet);

      PetService.getTimeline(pet.id).then(function (items) {
        vm.timeline = items;
      }, function (errors) {
        vm.timeline = [];
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

    function getOwnerNames(owner) {
      var fullName = "";

      if (owner.firstName) fullName += owner.firstName;

      if (owner.lastName) fullName += " " + owner.lastName;

      return fullName;
    }

    function getSexType(sexId) {
      var gender = GenderService.get(sexId);
      return gender.name || "";
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

    function QandaCtrl() {}
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("RespirationRatesCtrl", RespirationRatesCtrl);

  function RespirationRatesCtrl($rootScope, $scope, $state, $filter, $stateParams, ngDialog, BagService, PetService, UserService, userPets, translations, config) {

    var vm = this;

    // methods
    vm.getDurationFormat = getDurationFormat;
    vm.getTitleDetails = getTitleDetails;
    vm.dateFormatLocal = dateFormatLocal;
    vm.remove = remove;

    // dependencies
    vm.userPets = userPets;

    // defaults
    init();

    $scope.$on("period-change", function (event, args) {
      init();
      getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);
    });

    if ($rootScope.selectedPet) {
      vm.selectedPet = $rootScope.selectedPet;
      getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);
    }

    function dateFormatLocal(date) {
      if (date) {
        return moment(moment.utc(moment.utc(date).format("YYYY-MM-DD HH:mm")).toDate()).format("YYYY-MM-DD HH:mm");
      }
    }

    function init() {
      vm.results = [];
      vm.selectedType = null;
      vm.filteredTypes = [];
    }

    function getResults(id, datePeriod) {

      var getOptions = {
        period: datePeriod
      };

      PetService.getRespirationRate(vm.selectedPet.id, getOptions).then(function (results) {
        vm.results = results;
      }, function (error) {
        var errorMsg = "";
        errorMsg = translations.RespirationRateMsgGetError;

        ngDialog.open({
          template: errorMsg,
          plain: true
        });
      });
    }

    function getTitleDetails(item) {
      var dateFormat = $filter("date")(item.dateCreated, "d MMM HH:mm");
      return dateFormat;
    }

    function getDurationFormat(min) {
      var strResult = "",
          minutes = moment.duration(parseInt(min), "minutes").minutes(),
          hours = moment.duration(parseInt(min), "minutes").hours();

      strResult += hours + " hs";
      strResult += " ";
      strResult += minutes + " min";

      return strResult;
    }

    function remove(id) {
      if (id) {
        ngDialog.openConfirm({
          template: "                  <p>Are you sure you want to delete this record?</p>                  <div class=\"ngdialog-buttons\">                      <button type=\"button\" class=\"ngdialog-button ngdialog-button-secondary\" ng-click=\"closeThisDialog(0)\">No</button>                      <button type=\"button\" class=\"ngdialog-button ngdialog-button-primary\" ng-click=\"confirm(1)\">Yes</button>                  </div>",
          plain: true }).then(function (value) {

          PetService.removeRespirationRate($rootScope.selectedPet.id, id).then(function (result) {

            getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);

            ngDialog.open({
              template: "You have deleted successfully",
              plain: true
            });
          }, function (error) {
            ngDialog.open({
              template: "Error, please try again later.",
              plain: true
            });
          });
        });
      }
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("SeizuresCtrl", SeizuresCtrl);

  function SeizuresCtrl($rootScope, $scope, $state, $filter, $stateParams, ngDialog, BagService, PetService, UserService, userPets, translations, config) {

    var vm = this;

    // methods
    vm.getDurationFormat = getDurationFormat;
    vm.getTitleDetails = getTitleDetails;
    vm.dateFormatLocal = dateFormatLocal;
    vm.remove = remove;

    // dependencies
    vm.userPets = userPets;

    // defaults
    init();

    $scope.$on("period-change", function (event, args) {
      init();
      getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);
    });

    if ($rootScope.selectedPet) {
      vm.selectedPet = $rootScope.selectedPet;
      getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);
    }

    function dateFormatLocal(date) {
      if (date) {
        return moment(moment.utc(moment.utc(date).format("YYYY-MM-DD HH:mm")).toDate()).format("YYYY-MM-DD HH:mm");
      }
    }

    function init() {
      vm.results = [];
      vm.selectedType = null;
      vm.filteredTypes = [];
    }

    function getResults(id, datePeriod) {

      var getOptions = {
        period: datePeriod
      };

      PetService.getSeizures(vm.selectedPet.id, getOptions).then(function (results) {
        vm.results = results;
      }, function (error) {
        var errorMsg = "";
        errorMsg = translations.SeizuresMsgGetError;

        ngDialog.open({
          template: errorMsg,
          plain: true
        });
      });
    }

    function getTitleDetails(item) {
      var dateFormat = $filter("date")(vm.dateFormatLocal(item.dateCreated), "short");
      return dateFormat;
    }

    function getDurationFormat(min) {
      var strResult = "",
          minutes = moment.duration(parseInt(min), "minutes").minutes(),
          hours = moment.duration(parseInt(min), "minutes").hours();

      strResult += hours + " hs";
      strResult += " ";
      strResult += minutes + " min";

      return strResult;
    }

    function remove(id) {
      if (id) {
        ngDialog.openConfirm({
          template: "                  <p>Are you sure you want to delete this record?</p>                  <div class=\"ngdialog-buttons\">                      <button type=\"button\" class=\"ngdialog-button ngdialog-button-secondary\" ng-click=\"closeThisDialog(0)\">No</button>                      <button type=\"button\" class=\"ngdialog-button ngdialog-button-primary\" ng-click=\"confirm(1)\">Yes</button>                  </div>",
          plain: true }).then(function (value) {

          PetService.removeSeizures($rootScope.selectedPet.id, id).then(function (result) {

            getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);

            ngDialog.open({
              template: "You have deleted successfully",
              plain: true
            });
          }, function (error) {
            ngDialog.open({
              template: "Error, please try again later.",
              plain: true
            });
          });
        });
      }
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("SessionCtrl", SessionCtrl);

  function SessionCtrl($rootScope, $scope, $state, $filter, $stateParams, ngDialog, BagService, PetService, translations, config) {

    var vm = this;

    // methods
    vm.dateFormatLocal = dateFormatLocal;
    vm.getDurationFormat = getDurationFormat;
    vm.getTitleDetails = getTitleDetails;
    vm.displayReward = displayReward;
    vm.remove = remove;

    // dependencies

    // defaults
    init();

    $scope.$on("period-change", function (event, args) {
      init();
      getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);
    });

    if ($rootScope.selectedPet) {
      vm.selectedPet = $rootScope.selectedPet;
      getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);
    }

    function init() {
      vm.results = [];
    }

    function getResults(id, datePeriod) {

      var getOptions = {
        period: datePeriod
      };

      PetService.getSession(vm.selectedPet.id, getOptions).then(function (results) {
        vm.results = results;
      }, function (error) {
        var errorMsg = "";
        errorMsg = "Cannot get Sessions";

        ngDialog.open({
          template: errorMsg,
          plain: true
        });
      });
    }

    function displayReward(item) {
      if (item.reward) {
        return item.reward.name;
      } else {
        return item.name;
      }
    }

    function dateFormatLocal(date) {
      if (date) {
        return moment(moment.utc(moment.utc(date).format("YYYY-MM-DD HH:mm")).toDate()).format("YYYY-MM-DD HH:mm");
      }
    }

    function getTitleDetails(item) {
      return item.sessionType.name + " - " + getDurationFormat(item.duration);
    }

    function getDurationFormat(min) {
      var strResult = "",
          minutes = moment.duration(parseInt(min), "minutes").minutes(),
          hours = moment.duration(parseInt(min), "minutes").hours();

      strResult += hours + " hs";
      strResult += " ";
      strResult += minutes + " min";

      return strResult;
    }

    function remove(id) {
      if (id) {
        ngDialog.openConfirm({
          template: "                  <p>Are you sure you want to delete this record?</p>                  <div class=\"ngdialog-buttons\">                      <button type=\"button\" class=\"ngdialog-button ngdialog-button-secondary\" ng-click=\"closeThisDialog(0)\">No</button>                      <button type=\"button\" class=\"ngdialog-button ngdialog-button-primary\" ng-click=\"confirm(1)\">Yes</button>                  </div>",
          plain: true }).then(function (value) {

          PetService.removeSession($rootScope.selectedPet.id, id).then(function (result) {

            getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);

            ngDialog.open({
              template: "You have deleted successfully",
              plain: true
            });
          }, function (error) {
            ngDialog.open({
              template: "Error, please try again later.",
              plain: true
            });
          });
        });
      }
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("SocialisationsCtrl", SocialisationsCtrl);

  function SocialisationsCtrl($rootScope, $scope, $state, $filter, $stateParams, ngDialog, BagService, PetService, UserService, userPets, translations, config) {

    var vm = this;

    // methods
    vm.getDurationFormat = getDurationFormat;
    vm.getTitleDetails = getTitleDetails;
    vm.dateFormatLocal = dateFormatLocal;
    vm.remove = remove;

    // dependencies
    vm.userPets = userPets;

    // defaults
    init();

    $scope.$on("period-change", function (event, args) {
      init();
      getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);
    });

    if ($rootScope.selectedPet) {
      vm.selectedPet = $rootScope.selectedPet;
      getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);
    }

    function dateFormatLocal(date) {
      if (date) {
        return moment(moment.utc(moment.utc(date).format("YYYY-MM-DD HH:mm")).toDate()).format("YYYY-MM-DD HH:mm");
      }
    }

    function init() {
      vm.results = [];
      vm.selectedType = null;
      vm.filteredTypes = [];
    }

    function getResults(id, datePeriod) {

      var getOptions = {
        period: datePeriod
      };

      PetService.getSocialisation(vm.selectedPet.id, getOptions).then(function (results) {
        vm.results = results;
      }, function (error) {
        var errorMsg = "";
        errorMsg = translations.SocialisationsMsgGetError;

        ngDialog.open({
          template: errorMsg,
          plain: true
        });
      });
    }

    function getTitleDetails(item) {
      var dateFormat = $filter("date")(item.dateCreated, "d MMM HH:mm");
      return dateFormat;
    }

    function getDurationFormat(min) {
      var strResult = "",
          minutes = moment.duration(parseInt(min), "minutes").minutes(),
          hours = moment.duration(parseInt(min), "minutes").hours();

      strResult += hours + " hs";
      strResult += " ";
      strResult += minutes + " min";

      return strResult;
    }

    function remove(id) {
      if (id) {
        ngDialog.openConfirm({
          template: "                  <p>Are you sure you want to remove?</p>                  <div class=\"ngdialog-buttons\">                      <button type=\"button\" class=\"ngdialog-button ngdialog-button-secondary\" ng-click=\"closeThisDialog(0)\">No</button>                      <button type=\"button\" class=\"ngdialog-button ngdialog-button-primary\" ng-click=\"confirm(1)\">Yes</button>                  </div>",
          plain: true }).then(function (value) {

          PetService.removeSocialisation($rootScope.selectedPet.id, id).then(function (result) {

            getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);

            ngDialog.open({
              template: "You have removed successfully",
              plain: true
            });
          }, function (error) {
            ngDialog.open({
              template: "Error, please try again later.",
              plain: true
            });
          });
        });
      }
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("SymptomsCtrl", SymptomsCtrl);

  function SymptomsCtrl($rootScope, $scope, $state, $filter, $stateParams, ngDialog, BagService, PetService, UserService, userPets, translations, config) {

    var vm = this;

    // methods
    vm.getDurationFormat = getDurationFormat;
    vm.getTitleDetails = getTitleDetails;
    vm.dateFormatLocal = dateFormatLocal;
    vm.remove = remove;

    // dependencies
    vm.userPets = userPets;

    // defaults
    init();

    $scope.$on("period-change", function (event, args) {
      init();
      getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);
    });

    if ($rootScope.selectedPet) {
      vm.selectedPet = $rootScope.selectedPet;
      getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);
    }

    function dateFormatLocal(date) {
      if (date) {
        return moment(moment.utc(moment.utc(date).format("YYYY-MM-DD HH:mm")).toDate()).format("YYYY-MM-DD HH:mm");
      }
    }

    function init() {
      vm.results = [];
      vm.selectedType = null;
      vm.filteredTypes = [];
    }

    function getResults(id, datePeriod) {

      var getOptions = {
        period: datePeriod
      };

      PetService.getSymptom(vm.selectedPet.id, getOptions).then(function (results) {
        vm.results = results;
      }, function (error) {
        var errorMsg = "";
        errorMsg = translations.SymtomsMsgGetError;

        ngDialog.open({
          template: errorMsg,
          plain: true
        });
      });
    }

    function getTitleDetails(item) {
      var dateFormat = $filter("date")(vm.dateFormatLocal(item.dateCreated), "short");
      return item.symptomType.name + " - " + item.symptomFrequency.name;
    }

    function getDurationFormat(min) {
      var strResult = "",
          minutes = moment.duration(parseInt(min), "minutes").minutes(),
          hours = moment.duration(parseInt(min), "minutes").hours();

      strResult += hours + " hs";
      strResult += " ";
      strResult += minutes + " min";

      return strResult;
    }

    function remove(id) {
      if (id) {
        ngDialog.openConfirm({
          template: "                  <p>Are you sure you want to delete this record?</p>                  <div class=\"ngdialog-buttons\">                      <button type=\"button\" class=\"ngdialog-button ngdialog-button-secondary\" ng-click=\"closeThisDialog(0)\">No</button>                      <button type=\"button\" class=\"ngdialog-button ngdialog-button-primary\" ng-click=\"confirm(1)\">Yes</button>                  </div>",
          plain: true }).then(function (value) {

          PetService.removeSymptom($rootScope.selectedPet.id, id).then(function (result) {

            getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);

            ngDialog.open({
              template: "You have deleted successfully",
              plain: true
            });
          }, function (error) {
            ngDialog.open({
              template: "Error, please try again later.",
              plain: true
            });
          });
        });
      }
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("TreatmentsCtrl", TreatmentsCtrl);

  function TreatmentsCtrl($rootScope, $scope, $state, $filter, $stateParams, ngDialog, BagService, PetService, UserService, userPets, translations, config) {

    var vm = this;

    // methods
    vm.getDurationFormat = getDurationFormat;
    vm.getTitleDetails = getTitleDetails;
    vm.dateFormatLocal = dateFormatLocal;
    vm.remove = remove;

    // dependencies
    vm.userPets = userPets;

    // defaults
    init();

    $scope.$on("period-change", function (event, args) {
      init();
      getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);
    });

    if ($rootScope.selectedPet) {
      vm.selectedPet = $rootScope.selectedPet;
      getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);
    }

    function dateFormatLocal(date) {
      if (date) {
        return moment(moment.utc(moment.utc(date).format("YYYY-MM-DD HH:mm")).toDate()).format("YYYY-MM-DD HH:mm");
      }
    }

    function init() {
      vm.results = [];
      vm.selectedType = null;
      vm.filteredTypes = [];
    }

    function getResults(id, datePeriod) {

      var getOptions = {
        period: datePeriod
      };

      PetService.getTreatment(vm.selectedPet.id, getOptions).then(function (results) {
        vm.results = results;
      }, function (error) {
        var errorMsg = "";
        errorMsg = translations.TreatmentsMsgTreatmentsError;

        ngDialog.open({
          template: errorMsg,
          plain: true
        });
      });
    }

    function getTitleDetails(item) {
      var dateFormat = $filter("date")(vm.dateFormatLocal(item.dateCreated), "short");
      return dateFormat;
    }

    function getDurationFormat(min) {
      var strResult = "",
          minutes = moment.duration(parseInt(min), "minutes").minutes(),
          hours = moment.duration(parseInt(min), "minutes").hours();

      strResult += hours + " hs";
      strResult += " ";
      strResult += minutes + " min";

      return strResult;
    }

    function remove(id) {
      if (id) {
        ngDialog.openConfirm({
          template: "                  <p>Are you sure you want to delete this record?</p>                  <div class=\"ngdialog-buttons\">                      <button type=\"button\" class=\"ngdialog-button ngdialog-button-secondary\" ng-click=\"closeThisDialog(0)\">No</button>                      <button type=\"button\" class=\"ngdialog-button ngdialog-button-primary\" ng-click=\"confirm(1)\">Yes</button>                  </div>",
          plain: true }).then(function (value) {

          PetService.removeTreatment($rootScope.selectedPet.id, id).then(function (result) {

            getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);

            ngDialog.open({
              template: "You have deleted successfully",
              plain: true
            });
          }, function (error) {
            ngDialog.open({
              template: "Error, please try again later.",
              plain: true
            });
          });
        });
      }
    }
  }
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("UploadCtrl", UploadCtrl);

  function UploadCtrl() {}
})();
"use strict";

(function () {
  "use strict";

  angular.module("app.controllers").controller("UserguidanceCtrl", UserguidanceCtrl);

  function UserguidanceCtrl($rootScope, $scope, $state, PetService, GenderService, BagService, userPets, petTypes, ngDialog, translations) {

    var vm = this;

    vm.toPet = toPet;
    vm.toState = toState;
    vm.search = search;
    vm.setActive = setActive;
    vm.searchFilter = searchFilter;
    vm.typeFilter = typeFilter;
    vm.getSexType = getSexType;
    vm.getPetAge = getPetAge;
    vm.getBreedNames = getBreedNames;
    vm.getOwnerNames = getOwnerNames;
    vm.isValidPuppy = isValidPuppy;

    // setting default values
    vm.items = [];
    vm.items = userPets;
    vm.types = petTypes;

    $rootScope.selectedPet = null;

    function toPet(petId) {
      if (petId) {
        $state.go("app.profile.index", { id: petId });
      }
    }

    function toState(type, pet) {

      if (type && pet) {
        BagService.set("SelectedPet", pet);

        if (type == 1) {
          // Activity
          $state.go("app.profile.activities", { id: pet.id });
        } else if (type == 2) {
          // Behaviour
          $state.go("app.profile.behaviours", { id: pet.id });
        } else if (type == 3) {
          // Treatments
          $state.go("app.profile.treatments", { id: pet.id });
        } else if (type == 4) {
          // Puppy Socialisation
          $state.go("app.profile.socialisations", { id: pet.id });
        } else if (type == 5) {
          // Seizures
          $state.go("app.profile.seizures", { id: pet.id });
        } else if (type == 6) {
          // Respiration Rates
          $state.go("app.profile.respirationRates", { id: pet.id });
        } else if (type == 7) {
          // Symptoms
          $state.go("app.profile.symptoms", { id: pet.id });
        } else if (type == 8) {
          // Sessions
          $state.go("app.profile.sessions", { id: pet.id });
        }
      }
    }

    function search(obj) {
      if (vm.filterQuery) {
        if (obj.microchipNumber) {
          return !!(obj.name.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || "") !== -1 || obj.microchipNumber.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || "") !== -1 || obj.owner.firstName.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || "") !== -1 || obj.owner.lastName.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || "") !== -1);
        } else {
          return !!(obj.name.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || "") !== -1 || obj.owner.firstName.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || "") !== -1 || obj.owner.lastName.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || "") !== -1);
        }
      } else {
        return true;
      }
    };

    function searchFilter(obj) {
      var re = new RegExp(vm.searchBy, "i");
      return !vm.searchBy || re.test(obj.name) || re.test(obj.desc);
    };

    function typeFilter(obj) {
      return !vm.searchByType || vm.searchByType.id == obj.petSubtype.petTypeId;
    };

    function setActive(pet, index) {
      vm.activeIndex = index;
      vm.activePet = pet;

      // Setting pet on bag.
      BagService.set("SelectedPet", pet);

      PetService.getTimeline(pet.id).then(function (items) {
        vm.timeline = items;
      }, function (errors) {
        vm.timeline = [];
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

    function getOwnerNames(owner) {
      var fullName = "";

      if (owner.firstName) fullName += owner.firstName;

      if (owner.lastName) fullName += " " + owner.lastName;

      return fullName;
    }

    function getSexType(sexId) {
      var gender = GenderService.get(sexId);
      return gender.name || "";
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

  angular.module("app").factory("BreedService", BreedService);

  function BreedService() {
    var service = this;
    var list = [{
      id: 1,
      name: "Affenpinscher",
      description: null
    }, {
      id: 2,
      name: "Afghan Hound",
      description: null
    }, {
      id: 3,
      name: "Aidi",
      description: null
    }, {
      id: 4,
      name: "Airedale Terrier",
      description: null
    }, {
      id: 5,
      name: "Akbash Dog",
      description: null
    }, {
      id: 6,
      name: "Alano Español",
      description: null
    }, {
      id: 7,
      name: "Alaskan Klee Kai",
      description: null
    }, {
      id: 8,
      name: "Alaskan Malamute",
      description: null
    }, {
      id: 9,
      name: "Alpine Dachsbracke",
      description: null
    }, {
      id: 10,
      name: "Alpine Spaniel",
      description: null
    }, {
      id: 11,
      name: "American Bulldog",
      description: null
    }, {
      id: 12,
      name: "American Cocker Spaniel",
      description: null
    }, {
      id: 13,
      name: "American Eskimo Dog",
      description: null
    }, {
      id: 14,
      name: "American Foxhound",
      description: null
    }, {
      id: 15,
      name: "American Hairless Terrier",
      description: null
    }, {
      id: 16,
      name: "American Pit Bull Terrier",
      description: null
    }, {
      id: 17,
      name: "American Staffordshire Terrier",
      description: null
    }, {
      id: 18,
      name: "American Water Spaniel",
      description: null
    }, {
      id: 19,
      name: "Anglo-Français de Petite Vénerie",
      description: null
    }, {
      id: 20,
      name: "Appenzeller Sennenhund",
      description: null
    }, {
      id: 21,
      name: "Ariege Pointer",
      description: null
    }, {
      id: 22,
      name: "Ariegeois",
      description: null
    }, {
      id: 23,
      name: "Armant",
      description: null
    }, {
      id: 24,
      name: "Armenian Gampr dog",
      description: null
    }, {
      id: 25,
      name: "Artois Hound",
      description: null
    }, {
      id: 26,
      name: "Australian Cattle Dog",
      description: null
    }, {
      id: 27,
      name: "Australian Kelpie",
      description: null
    }, {
      id: 28,
      name: "Australian Shepherd",
      description: null
    }, {
      id: 29,
      name: "Australian Silky Terrier",
      description: null
    }, {
      id: 30,
      name: "Australian Stumpy Tail Cattle Dog",
      description: null
    }, {
      id: 31,
      name: "Australian Terrier",
      description: null
    }, {
      id: 32,
      name: "Azawakh",
      description: null
    }, {
      id: 33,
      name: "Bakharwal Dog",
      description: null
    }, {
      id: 34,
      name: "Barbet",
      description: null
    }, {
      id: 35,
      name: "Basenji",
      description: null
    }, {
      id: 36,
      name: "Basque Shepherd Dog",
      description: null
    }, {
      id: 37,
      name: "Basset Artésien Normand",
      description: null
    }, {
      id: 38,
      name: "Basset Bleu de Gascogne",
      description: null
    }, {
      id: 39,
      name: "Basset Fauve de Bretagne",
      description: null
    }, {
      id: 40,
      name: "Basset Hound",
      description: null
    }, {
      id: 41,
      name: "Bavarian Mountain Hound",
      description: null
    }, {
      id: 42,
      name: "Beagle",
      description: null
    }, {
      id: 43,
      name: "Beagle-Harrier",
      description: null
    }, {
      id: 44,
      name: "Bearded Collie",
      description: null
    }, {
      id: 45,
      name: "Beauceron",
      description: null
    }, {
      id: 46,
      name: "Bedlington Terrier",
      description: null
    }, {
      id: 47,
      name: "Belgian Shepherd Dog (Groenendael)",
      description: null
    }, {
      id: 48,
      name: "Belgian Shepherd Dog (Laekenois)",
      description: null
    }, {
      id: 49,
      name: "Belgian Shepherd Dog (Malinois)",
      description: null
    }, {
      id: 50,
      name: "Bergamasco Shepherd",
      description: null
    }, {
      id: 51,
      name: "Berger Blanc Suisse",
      description: null
    }, {
      id: 52,
      name: "Berger Picard",
      description: null
    }, {
      id: 53,
      name: "Berner Laufhund",
      description: null
    }, {
      id: 54,
      name: "Bernese Mountain Dog",
      description: null
    }, {
      id: 55,
      name: "Billy",
      description: null
    }, {
      id: 56,
      name: "Black and Tan Coonhound",
      description: null
    }, {
      id: 57,
      name: "Black and Tan Virginia Foxhound",
      description: null
    }, {
      id: 58,
      name: "Black Norwegian Elkhound",
      description: null
    }, {
      id: 59,
      name: "Black Russian Terrier",
      description: null
    }, {
      id: 60,
      name: "Bloodhound",
      description: null
    }, {
      id: 61,
      name: "Blue Lacy",
      description: null
    }, {
      id: 62,
      name: "Blue Paul Terrier",
      description: null
    }, {
      id: 63,
      name: "Boerboel",
      description: null
    }, {
      id: 64,
      name: "Bohemian Shepherd",
      description: null
    }, {
      id: 65,
      name: "Bolognese",
      description: null
    }, {
      id: 66,
      name: "Border Collie",
      description: null
    }, {
      id: 67,
      name: "Border Terrier",
      description: null
    }, {
      id: 68,
      name: "Borzoi",
      description: null
    }, {
      id: 69,
      name: "Boston Terrier",
      description: null
    }, {
      id: 70,
      name: "Bouvier des Ardennes",
      description: null
    }, {
      id: 71,
      name: "Bouvier des Flandres",
      description: null
    }, {
      id: 72,
      name: "Boxer",
      description: null
    }, {
      id: 73,
      name: "Boykin Spaniel",
      description: null
    }, {
      id: 74,
      name: "Bracco Italiano",
      description: null
    }, {
      id: 75,
      name: "Braque d'Auvergne",
      description: null
    }, {
      id: 76,
      name: "Braque du Bourbonnais",
      description: null
    }, {
      id: 77,
      name: "Braque du Puy",
      description: null
    }, {
      id: 78,
      name: "Braque Francais",
      description: null
    }, {
      id: 79,
      name: "Braque Saint-Germain",
      description: null
    }, {
      id: 80,
      name: "Brazilian Terrier",
      description: null
    }, {
      id: 81,
      name: "Briard",
      description: null
    }, {
      id: 82,
      name: "Briquet Griffon Vendéen",
      description: null
    }, {
      id: 83,
      name: "Brittany",
      description: null
    }, {
      id: 84,
      name: "Broholmer",
      description: null
    }, {
      id: 85,
      name: "Bruno Jura Hound",
      description: null
    }, {
      id: 86,
      name: "Bucovina Shepherd Dog",
      description: null
    }, {
      id: 87,
      name: "Bull and Terrier",
      description: null
    }, {
      id: 89,
      name: "Bull Terrier",
      description: null
    }, {
      id: 88,
      name: "Bull Terrier (Miniature)",
      description: null
    }, {
      id: 90,
      name: "Bulldog",
      description: null
    }, {
      id: 91,
      name: "Bullenbeisser",
      description: null
    }, {
      id: 92,
      name: "Bullmastiff",
      description: null
    }, {
      id: 93,
      name: "Bully Kutta",
      description: null
    }, {
      id: 94,
      name: "Burgos Pointer",
      description: null
    }, {
      id: 95,
      name: "Cairn Terrier",
      description: null
    }, {
      id: 96,
      name: "Canaan Dog",
      description: null
    }, {
      id: 97,
      name: "Canadian Eskimo Dog",
      description: null
    }, {
      id: 98,
      name: "Cane Corso",
      description: null
    }, {
      id: 134,
      name: "Cão da Serra de Aires",
      description: null
    }, {
      id: 135,
      name: "Cão de Castro Laboreiro",
      description: null
    }, {
      id: 136,
      name: "Cão Fila de São Miguel",
      description: null
    }, {
      id: 99,
      name: "Cardigan Welsh Corgi",
      description: null
    }, {
      id: 100,
      name: "Carolina Dog",
      description: null
    }, {
      id: 101,
      name: "Carpathian Shepherd Dog",
      description: null
    }, {
      id: 102,
      name: "Catahoula Cur",
      description: null
    }, {
      id: 103,
      name: "Catalan Sheepdog",
      description: null
    }, {
      id: 104,
      name: "Caucasian Shepherd Dog",
      description: null
    }, {
      id: 105,
      name: "Cavalier King Charles Spaniel",
      description: null
    }, {
      id: 106,
      name: "Central Asian Shepherd Dog",
      description: null
    }, {
      id: 107,
      name: "Cesky Fousek",
      description: null
    }, {
      id: 108,
      name: "Cesky Terrier",
      description: null
    }, {
      id: 109,
      name: "Chesapeake Bay Retriever",
      description: null
    }, {
      id: 110,
      name: "Chien Français Blanc et Noir",
      description: null
    }, {
      id: 111,
      name: "Chien Français Blanc et Orange",
      description: null
    }, {
      id: 112,
      name: "Chien Français Tricolore",
      description: null
    }, {
      id: 113,
      name: "Chien-gris",
      description: null
    }, {
      id: 114,
      name: "Chihuahua",
      description: null
    }, {
      id: 115,
      name: "Chilean Fox Terrier",
      description: null
    }, {
      id: 116,
      name: "Chinese Chongqing Dog",
      description: null
    }, {
      id: 117,
      name: "Chinese Crested Dog",
      description: null
    }, {
      id: 118,
      name: "Chinese Imperial Dog",
      description: null
    }, {
      id: 119,
      name: "Chinook",
      description: null
    }, {
      id: 120,
      name: "Chippiparai",
      description: null
    }, {
      id: 121,
      name: "Chow Chow",
      description: null
    }, {
      id: 122,
      name: "Cierny Sery",
      description: null
    }, {
      id: 123,
      name: "Cimarrón Uruguayo",
      description: null
    }, {
      id: 124,
      name: "Cirneco dell'Etna",
      description: null
    }, {
      id: 125,
      name: "Clumber Spaniel",
      description: null
    }, {
      id: 126,
      name: "Combai",
      description: null
    }, {
      id: 127,
      name: "Cordoba Fighting Dog",
      description: null
    }, {
      id: 128,
      name: "Coton de Tulear",
      description: null
    }, {
      id: 129,
      name: "Cretan Hound",
      description: null
    }, {
      id: 130,
      name: "Croatian Sheepdog",
      description: null
    }, {
      id: 131,
      name: "Cumberland Sheepdog",
      description: null
    }, {
      id: 132,
      name: "Curly Coated Retriever",
      description: null
    }, {
      id: 133,
      name: "Cursinu",
      description: null
    }, {
      id: 137,
      name: "Dachshund",
      description: null
    }, {
      id: 138,
      name: "Dalmatian",
      description: null
    }, {
      id: 139,
      name: "Dandie Dinmont Terrier",
      description: null
    }, {
      id: 140,
      name: "Danish Swedish Farmdog",
      description: null
    }, {
      id: 141,
      name: "Deutsche Bracke",
      description: null
    }, {
      id: 142,
      name: "Doberman Pinscher",
      description: null
    }, {
      id: 143,
      name: "Dogo Argentino",
      description: null
    }, {
      id: 144,
      name: "Dogo Cubano",
      description: null
    }, {
      id: 145,
      name: "Dogue de Bordeaux",
      description: null
    }, {
      id: 146,
      name: "Drentse Patrijshond",
      description: null
    }, {
      id: 147,
      name: "Drever",
      description: null
    }, {
      id: 148,
      name: "Dunker",
      description: null
    }, {
      id: 149,
      name: "Dutch Shepherd Dog",
      description: null
    }, {
      id: 150,
      name: "Dutch Smoushond",
      description: null
    }, {
      id: 151,
      name: "East Siberian Laika",
      description: null
    }, {
      id: 152,
      name: "East-European Shepherd",
      description: null
    }, {
      id: 153,
      name: "Elo",
      description: null
    }, {
      id: 154,
      name: "English Cocker Spaniel",
      description: null
    }, {
      id: 155,
      name: "English Foxhound",
      description: null
    }, {
      id: 156,
      name: "English Mastiff",
      description: null
    }, {
      id: 157,
      name: "English Setter",
      description: null
    }, {
      id: 158,
      name: "English Shepherd",
      description: null
    }, {
      id: 159,
      name: "English Springer Spaniel",
      description: null
    }, {
      id: 160,
      name: "English Toy Terrier (Black &amp; Tan)",
      description: null
    }, {
      id: 161,
      name: "English Water Spaniel",
      description: null
    }, {
      id: 162,
      name: "English White Terrier",
      description: null
    }, {
      id: 163,
      name: "Entlebucher Mountain Dog",
      description: null
    }, {
      id: 164,
      name: "Estonian Hound",
      description: null
    }, {
      id: 165,
      name: "Estrela Mountain Dog",
      description: null
    }, {
      id: 166,
      name: "Eurasier",
      description: null
    }, {
      id: 167,
      name: "Field Spaniel",
      description: null
    }, {
      id: 168,
      name: "Fila Brasileiro",
      description: null
    }, {
      id: 169,
      name: "Finnish Hound",
      description: null
    }, {
      id: 170,
      name: "Finnish Lapphund",
      description: null
    }, {
      id: 171,
      name: "Finnish Spitz",
      description: null
    }, {
      id: 172,
      name: "Flat-Coated Retriever",
      description: null
    }, {
      id: 173,
      name: "Formosan Mountain Dog",
      description: null
    }, {
      id: 174,
      name: "Fox Terrier (Smooth)",
      description: null
    }, {
      id: 175,
      name: "French Bulldog",
      description: null
    }, {
      id: 176,
      name: "French Spaniel",
      description: null
    }, {
      id: 177,
      name: "Galgo Español",
      description: null
    }, {
      id: 178,
      name: "Gascon Saintongeois",
      description: null
    }, {
      id: 179,
      name: "German Longhaired Pointer",
      description: null
    }, {
      id: 180,
      name: "German Pinscher",
      description: null
    }, {
      id: 181,
      name: "German Shepherd",
      description: null
    }, {
      id: 182,
      name: "German Shorthaired Pointer",
      description: null
    }, {
      id: 183,
      name: "German Spaniel",
      description: null
    }, {
      id: 184,
      name: "German Spitz",
      description: null
    }, {
      id: 185,
      name: "German Wirehaired Pointer",
      description: null
    }, {
      id: 186,
      name: "Giant Schnauzer",
      description: null
    }, {
      id: 187,
      name: "Glen of Imaal Terrier",
      description: null
    }, {
      id: 188,
      name: "Golden Retriever",
      description: null
    }, {
      id: 189,
      name: "Gordon Setter",
      description: null
    }, {
      id: 190,
      name: "Gran Mastín de Borínquen",
      description: null
    }, {
      id: 191,
      name: "Grand Anglo-Français Blanc et Noir",
      description: null
    }, {
      id: 192,
      name: "Grand Anglo-Français Blanc et Orange",
      description: null
    }, {
      id: 193,
      name: "Grand Anglo-Français Tricolore",
      description: null
    }, {
      id: 194,
      name: "Grand Basset Griffon Vendéen",
      description: null
    }, {
      id: 195,
      name: "Grand Bleu de Gascogne",
      description: null
    }, {
      id: 196,
      name: "Grand Griffon Vendéen",
      description: null
    }, {
      id: 197,
      name: "Great Dane",
      description: null
    }, {
      id: 198,
      name: "Great Pyrenees",
      description: null
    }, {
      id: 199,
      name: "Greater Swiss Mountain Dog",
      description: null
    }, {
      id: 200,
      name: "Greek Harehound",
      description: null
    }, {
      id: 201,
      name: "Greenland Dog",
      description: null
    }, {
      id: 202,
      name: "Greyhound",
      description: null
    }, {
      id: 203,
      name: "Griffon Bleu de Gascogne",
      description: null
    }, {
      id: 204,
      name: "Griffon Bruxellois",
      description: null
    }, {
      id: 205,
      name: "Griffon Fauve de Bretagne",
      description: null
    }, {
      id: 206,
      name: "Griffon Nivernais",
      description: null
    }, {
      id: 207,
      name: "Hamiltonstövare",
      description: null
    }, {
      id: 208,
      name: "Hanover Hound",
      description: null
    }, {
      id: 209,
      name: "Hare Indian Dog",
      description: null
    }, {
      id: 210,
      name: "Harrier",
      description: null
    }, {
      id: 211,
      name: "Havanese",
      description: null
    }, {
      id: 212,
      name: "Hawaiian Poi Dog",
      description: null
    }, {
      id: 213,
      name: "Himalayan Sheepdog",
      description: null
    }, {
      id: 214,
      name: "Hokkaido",
      description: null
    }, {
      id: 215,
      name: "Hovawart",
      description: null
    }, {
      id: 216,
      name: "Huntaway",
      description: null
    }, {
      id: 217,
      name: "Hygenhund",
      description: null
    }, {
      id: 218,
      name: "Ibizan Hound",
      description: null
    }, {
      id: 219,
      name: "Icelandic Sheepdog",
      description: null
    }, {
      id: 220,
      name: "Indian pariah dog",
      description: null
    }, {
      id: 221,
      name: "Indian Spitz",
      description: null
    }, {
      id: 222,
      name: "Irish Red and White Setter",
      description: null
    }, {
      id: 223,
      name: "Irish Setter",
      description: null
    }, {
      id: 224,
      name: "Irish Terrier",
      description: null
    }, {
      id: 225,
      name: "Irish Water Spaniel",
      description: null
    }, {
      id: 226,
      name: "Irish Wolfhound",
      description: null
    }, {
      id: 227,
      name: "Istrian Coarse-haired Hound",
      description: null
    }, {
      id: 228,
      name: "Istrian Shorthaired Hound",
      description: null
    }, {
      id: 229,
      name: "Italian Greyhound",
      description: null
    }, {
      id: 230,
      name: "Jack Russell Terrier",
      description: null
    }, {
      id: 231,
      name: "Jagdterrier",
      description: null
    }, {
      id: 232,
      name: "Jämthund",
      description: null
    }, {
      id: 233,
      name: "Kai Ken",
      description: null
    }, {
      id: 234,
      name: "Kaikadi",
      description: null
    }, {
      id: 235,
      name: "Kanni",
      description: null
    }, {
      id: 236,
      name: "Karelian Bear Dog",
      description: null
    }, {
      id: 237,
      name: "Karst Shepherd",
      description: null
    }, {
      id: 238,
      name: "Keeshond",
      description: null
    }, {
      id: 239,
      name: "Kerry Beagle",
      description: null
    }, {
      id: 240,
      name: "Kerry Blue Terrier",
      description: null
    }, {
      id: 241,
      name: "King Charles Spaniel",
      description: null
    }, {
      id: 242,
      name: "King Shepherd",
      description: null
    }, {
      id: 243,
      name: "Kintamani",
      description: null
    }, {
      id: 244,
      name: "Kishu",
      description: null
    }, {
      id: 245,
      name: "Komondor",
      description: null
    }, {
      id: 246,
      name: "Kooikerhondje",
      description: null
    }, {
      id: 247,
      name: "Koolie",
      description: null
    }, {
      id: 248,
      name: "Korean Jindo Dog",
      description: null
    }, {
      id: 249,
      name: "Kromfohrländer",
      description: null
    }, {
      id: 250,
      name: "Kumaon Mastiff",
      description: null
    }, {
      id: 251,
      name: "Kurī",
      description: null
    }, {
      id: 252,
      name: "Kuvasz",
      description: null
    }, {
      id: 253,
      name: "Kyi-Leo",
      description: null
    }, {
      id: 254,
      name: "Labrador Husky",
      description: null
    }, {
      id: 255,
      name: "Labrador Retriever",
      description: null
    }, {
      id: 256,
      name: "Lagotto Romagnolo",
      description: null
    }, {
      id: 257,
      name: "Lakeland Terrier",
      description: null
    }, {
      id: 258,
      name: "Lancashire Heeler",
      description: null
    }, {
      id: 259,
      name: "Landseer",
      description: null
    }, {
      id: 260,
      name: "Lapponian Herder",
      description: null
    }, {
      id: 261,
      name: "Large Münsterländer",
      description: null
    }, {
      id: 262,
      name: "Leonberger",
      description: null
    }, {
      id: 263,
      name: "Lhasa Apso",
      description: null
    }, {
      id: 264,
      name: "Lithuanian Hound",
      description: null
    }, {
      id: 265,
      name: "Longhaired Whippet",
      description: null
    }, {
      id: 266,
      name: "Löwchen",
      description: null
    }, {
      id: 267,
      name: "Mahratta Greyhound",
      description: null
    }, {
      id: 268,
      name: "Maltese",
      description: null
    }, {
      id: 269,
      name: "Manchester Terrier",
      description: null
    }, {
      id: 270,
      name: "Maremma Sheepdog",
      description: null
    }, {
      id: 271,
      name: "McNab",
      description: null
    }, {
      id: 272,
      name: "Mexican Hairless Dog",
      description: null
    }, {
      id: 273,
      name: "Miniature American Shepherd",
      description: null
    }, {
      id: 274,
      name: "Miniature Australian Shepherd",
      description: null
    }, {
      id: 275,
      name: "Miniature Fox Terrier",
      description: null
    }, {
      id: 276,
      name: "Miniature Pinscher",
      description: null
    }, {
      id: 277,
      name: "Miniature Schnauzer",
      description: null
    }, {
      id: 278,
      name: "Miniature Shar Pei",
      description: null
    }, {
      id: 279,
      name: "Molossus",
      description: null
    }, {
      id: 280,
      name: "Montenegrin Mountain Hound",
      description: null
    }, {
      id: 281,
      name: "Moscow Watchdog",
      description: null
    }, {
      id: 282,
      name: "Moscow Water Dog",
      description: null
    }, {
      id: 283,
      name: "Mountain Cur",
      description: null
    }, {
      id: 284,
      name: "Mucuchies",
      description: null
    }, {
      id: 285,
      name: "Mudhol Hound",
      description: null
    }, {
      id: 286,
      name: "Mudi",
      description: null
    }, {
      id: 287,
      name: "Neapolitan Mastiff",
      description: null
    }, {
      id: 288,
      name: "New Zealand Heading Dog",
      description: null
    }, {
      id: 289,
      name: "Newfoundland",
      description: null
    }, {
      id: 290,
      name: "Norfolk Spaniel",
      description: null
    }, {
      id: 291,
      name: "Norfolk Terrier",
      description: null
    }, {
      id: 292,
      name: "Norrbottenspets",
      description: null
    }, {
      id: 293,
      name: "North Country Beagle",
      description: null
    }, {
      id: 294,
      name: "Northern Inuit Dog",
      description: null
    }, {
      id: 295,
      name: "Norwegian Buhund",
      description: null
    }, {
      id: 296,
      name: "Norwegian Elkhound",
      description: null
    }, {
      id: 297,
      name: "Norwegian Lundehund",
      description: null
    }, {
      id: 298,
      name: "Norwich Terrier",
      description: null
    }, {
      id: 299,
      name: "Old Croatian Sighthound",
      description: null
    }, {
      id: 300,
      name: "Old Danish Pointer",
      description: null
    }, {
      id: 301,
      name: "Old English Sheepdog",
      description: null
    }, {
      id: 302,
      name: "Old English Terrier",
      description: null
    }, {
      id: 303,
      name: "Old German Shepherd Dog",
      description: null
    }, {
      id: 304,
      name: "Olde English Bulldogge",
      description: null
    }, {
      id: 305,
      name: "Otterhound",
      description: null
    }, {
      id: 306,
      name: "Pachon Navarro",
      description: null
    }, {
      id: 307,
      name: "Paisley Terrier",
      description: null
    }, {
      id: 308,
      name: "Pandikona",
      description: null
    }, {
      id: 309,
      name: "Papillon",
      description: null
    }, {
      id: 310,
      name: "Parson Russell Terrier",
      description: null
    }, {
      id: 311,
      name: "Patterdale Terrier",
      description: null
    }, {
      id: 312,
      name: "Pekingese",
      description: null
    }, {
      id: 313,
      name: "Pembroke Welsh Corgi",
      description: null
    }, {
      id: 314,
      name: "Perro de Presa Canario",
      description: null
    }, {
      id: 315,
      name: "Perro de Presa Mallorquin",
      description: null
    }, {
      id: 316,
      name: "Peruvian Hairless Dog",
      description: null
    }, {
      id: 317,
      name: "Petit Basset Griffon Vendéen",
      description: null
    }, {
      id: 318,
      name: "Petit Bleu de Gascogne",
      description: null
    }, {
      id: 319,
      name: "Phalène",
      description: null
    }, {
      id: 320,
      name: "Pharaoh Hound",
      description: null
    }, {
      id: 321,
      name: "Phu Quoc ridgeback dog",
      description: null
    }, {
      id: 322,
      name: "Picardy Spaniel",
      description: null
    }, {
      id: 323,
      name: "Plott Hound",
      description: null
    }, {
      id: 324,
      name: "Podenco Canario",
      description: null
    }, {
      id: 325,
      name: "Pointer (dog breed)",
      description: null
    }, {
      id: 326,
      name: "Polish Greyhound",
      description: null
    }, {
      id: 327,
      name: "Polish Hound",
      description: null
    }, {
      id: 328,
      name: "Polish Hunting Dog",
      description: null
    }, {
      id: 329,
      name: "Polish Lowland Sheepdog",
      description: null
    }, {
      id: 330,
      name: "Polish Tatra Sheepdog",
      description: null
    }, {
      id: 331,
      name: "Pomeranian",
      description: null
    }, {
      id: 332,
      name: "Pont-Audemer Spaniel",
      description: null
    }, {
      id: 333,
      name: "Poodle",
      description: null
    }, {
      id: 334,
      name: "Porcelaine",
      description: null
    }, {
      id: 335,
      name: "Portuguese Podengo",
      description: null
    }, {
      id: 336,
      name: "Portuguese Pointer",
      description: null
    }, {
      id: 337,
      name: "Portuguese Water Dog",
      description: null
    }, {
      id: 338,
      name: "Posavac Hound",
      description: null
    }, {
      id: 339,
      name: "Pražský Krysařík",
      description: null
    }, {
      id: 340,
      name: "Pudelpointer",
      description: null
    }, {
      id: 341,
      name: "Pug",
      description: null
    }, {
      id: 342,
      name: "Puli",
      description: null
    }, {
      id: 343,
      name: "Pumi",
      description: null
    }, {
      id: 344,
      name: "Pungsan Dog",
      description: null
    }, {
      id: 345,
      name: "Pyrenean Mastiff",
      description: null
    }, {
      id: 346,
      name: "Pyrenean Shepherd",
      description: null
    }, {
      id: 347,
      name: "Rafeiro do Alentejo",
      description: null
    }, {
      id: 348,
      name: "Rajapalayam",
      description: null
    }, {
      id: 349,
      name: "Rampur Greyhound",
      description: null
    }, {
      id: 350,
      name: "Rastreador Brasileiro",
      description: null
    }, {
      id: 351,
      name: "Rat Terrier",
      description: null
    }, {
      id: 352,
      name: "Ratonero Bodeguero Andaluz",
      description: null
    }, {
      id: 353,
      name: "Redbone Coonhound",
      description: null
    }, {
      id: 354,
      name: "Rhodesian Ridgeback",
      description: null
    }, {
      id: 355,
      name: "Rottweiler",
      description: null
    }, {
      id: 356,
      name: "Rough Collie",
      description: null
    }, {
      id: 357,
      name: "Russell Terrier",
      description: null
    }, {
      id: 358,
      name: "Russian Spaniel",
      description: null
    }, {
      id: 359,
      name: "Russian tracker",
      description: null
    }, {
      id: 360,
      name: "Russo-European Laika",
      description: null
    }, {
      id: 361,
      name: "Sabueso Español",
      description: null
    }, {
      id: 362,
      name: "Saint-Usuge Spaniel",
      description: null
    }, {
      id: 363,
      name: "Sakhalin Husky",
      description: null
    }, {
      id: 364,
      name: "Saluki",
      description: null
    }, {
      id: 365,
      name: "Samoyed",
      description: null
    }, {
      id: 366,
      name: "Sapsali",
      description: null
    }, {
      id: 452,
      name: "Šarplaninac",
      description: null
    }, {
      id: 367,
      name: "Schapendoes",
      description: null
    }, {
      id: 368,
      name: "Schillerstövare",
      description: null
    }, {
      id: 369,
      name: "Schipperke",
      description: null
    }, {
      id: 370,
      name: "Schweizer Laufhund",
      description: null
    }, {
      id: 371,
      name: "Schweizerischer Niederlaufhund",
      description: null
    }, {
      id: 372,
      name: "Scotch Collie",
      description: null
    }, {
      id: 373,
      name: "Scottish Deerhound",
      description: null
    }, {
      id: 374,
      name: "Scottish Terrier",
      description: null
    }, {
      id: 375,
      name: "Sealyham Terrier",
      description: null
    }, {
      id: 376,
      name: "Segugio Italiano",
      description: null
    }, {
      id: 377,
      name: "Seppala Siberian Sleddog",
      description: null
    }, {
      id: 378,
      name: "Serbian Hound",
      description: null
    }, {
      id: 379,
      name: "Serbian Tricolour Hound",
      description: null
    }, {
      id: 380,
      name: "Shar Pei",
      description: null
    }, {
      id: 381,
      name: "Shetland Sheepdog",
      description: null
    }, {
      id: 382,
      name: "Shiba Inu",
      description: null
    }, {
      id: 383,
      name: "Shih Tzu",
      description: null
    }, {
      id: 384,
      name: "Shikoku",
      description: null
    }, {
      id: 385,
      name: "Shiloh Shepherd Dog",
      description: null
    }, {
      id: 386,
      name: "Siberian Husky",
      description: null
    }, {
      id: 387,
      name: "Silken Windhound",
      description: null
    }, {
      id: 388,
      name: "Sinhala Hound",
      description: null
    }, {
      id: 389,
      name: "Skye Terrier",
      description: null
    }, {
      id: 390,
      name: "Sloughi",
      description: null
    }, {
      id: 391,
      name: "Slovak Cuvac",
      description: null
    }, {
      id: 392,
      name: "Slovakian Rough-haired Pointer",
      description: null
    }, {
      id: 393,
      name: "Small Greek Domestic Dog",
      description: null
    }, {
      id: 394,
      name: "Small Münsterländer",
      description: null
    }, {
      id: 395,
      name: "Smooth Collie",
      description: null
    }, {
      id: 396,
      name: "South Russian Ovcharka",
      description: null
    }, {
      id: 397,
      name: "Southern Hound",
      description: null
    }, {
      id: 398,
      name: "Spanish Mastiff",
      description: null
    }, {
      id: 399,
      name: "Spanish Water Dog",
      description: null
    }, {
      id: 400,
      name: "Spinone Italiano",
      description: null
    }, {
      id: 401,
      name: "Sporting Lucas Terrier",
      description: null
    }, {
      id: 402,
      name: "St. Bernard",
      description: null
    }, {
      id: 403,
      name: "St. John's water dog",
      description: null
    }, {
      id: 404,
      name: "Stabyhoun",
      description: null
    }, {
      id: 405,
      name: "Staffordshire Bull Terrier",
      description: null
    }, {
      id: 406,
      name: "Standard Schnauzer",
      description: null
    }, {
      id: 407,
      name: "Stephens Cur",
      description: null
    }, {
      id: 408,
      name: "Styrian Coarse-haired Hound",
      description: null
    }, {
      id: 409,
      name: "Sussex Spaniel",
      description: null
    }, {
      id: 410,
      name: "Swedish Lapphund",
      description: null
    }, {
      id: 411,
      name: "Swedish Vallhund",
      description: null
    }, {
      id: 412,
      name: "Tahltan Bear Dog",
      description: null
    }, {
      id: 413,
      name: "Taigan",
      description: null
    }, {
      id: 414,
      name: "Talbot",
      description: null
    }, {
      id: 415,
      name: "Tamaskan Dog",
      description: null
    }, {
      id: 416,
      name: "Teddy Roosevelt Terrier",
      description: null
    }, {
      id: 417,
      name: "Telomian",
      description: null
    }, {
      id: 418,
      name: "Tenterfield Terrier",
      description: null
    }, {
      id: 419,
      name: "Thai Bangkaew Dog",
      description: null
    }, {
      id: 420,
      name: "Thai Ridgeback",
      description: null
    }, {
      id: 421,
      name: "Tibetan Mastiff",
      description: null
    }, {
      id: 422,
      name: "Tibetan Spaniel",
      description: null
    }, {
      id: 423,
      name: "Tibetan Terrier",
      description: null
    }, {
      id: 424,
      name: "Tornjak",
      description: null
    }, {
      id: 425,
      name: "Tosa",
      description: null
    }, {
      id: 426,
      name: "Toy Bulldog",
      description: null
    }, {
      id: 427,
      name: "Toy Fox Terrier",
      description: null
    }, {
      id: 428,
      name: "Toy Manchester Terrier",
      description: null
    }, {
      id: 429,
      name: "Toy Trawler Spaniel",
      description: null
    }, {
      id: 430,
      name: "Transylvanian Hound",
      description: null
    }, {
      id: 431,
      name: "Treeing Cur",
      description: null
    }, {
      id: 432,
      name: "Treeing Walker Coonhound",
      description: null
    }, {
      id: 433,
      name: "Trigg Hound",
      description: null
    }, {
      id: 434,
      name: "Tweed Water Spaniel",
      description: null
    }, {
      id: 435,
      name: "Tyrolean Hound",
      description: null
    }, {
      id: 436,
      name: "Vizsla",
      description: null
    }, {
      id: 437,
      name: "Volpino Italiano",
      description: null
    }, {
      id: 438,
      name: "Weimaraner",
      description: null
    }, {
      id: 439,
      name: "Welsh Sheepdog",
      description: null
    }, {
      id: 440,
      name: "Welsh Springer Spaniel",
      description: null
    }, {
      id: 441,
      name: "Welsh Terrier",
      description: null
    }, {
      id: 442,
      name: "West Highland White Terrier",
      description: null
    }, {
      id: 443,
      name: "West Siberian Laika",
      description: null
    }, {
      id: 444,
      name: "Westphalian Dachsbracke",
      description: null
    }, {
      id: 445,
      name: "Wetterhoun",
      description: null
    }, {
      id: 446,
      name: "Whippet",
      description: null
    }, {
      id: 447,
      name: "White Shepherd",
      description: null
    }, {
      id: 448,
      name: "Wire Fox Terrier",
      description: null
    }, {
      id: 449,
      name: "Wirehaired Pointing Griffon",
      description: null
    }, {
      id: 450,
      name: "Wirehaired Vizsla",
      description: null
    }, {
      id: 451,
      name: "Yorkshire Terrier",
      description: null
    }, {
      id: 452,
      name: "Šarplaninac",
      description: null
    }, {
      id: 453,
      name: "Unknown",
      description: null
    }];

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
    service.getSpecies = getSpecies;
    service.getSpeciesTypes = getSpeciesTypes;
    service.getSurfaceObstacles = getSurfaceObstacles;
    service.getTransportationTypes = getTransportationTypes;
    service.getLocationSubTypes = getLocationSubTypes;

    return service;

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

  angular.module("app").factory("DatePeriodService", DatePeriodService);

  function DatePeriodService(config) {
    var service = this;
    var list = [{ id: 1, name: "Day" }, { id: 2, name: "Week" }, { id: 3, name: "Month" }, { id: 4, name: "6 Months" }, { id: 5, name: "Year" }, { id: 6, name: "All" }];

    // methods
    service.getDefault = getDefault;
    service.getAll = getAll;

    return service;

    function getDefault(id) {
      return list.find(function (g) {
        return g.id == config.defaultPeriod;
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

  angular.module("app").factory("GenderService", GenderService);

  function GenderService($translate) {
    var service = this;
    var genders = [];

    // methods
    service.init = init;
    service.get = get;
    service.getAll = getAll;

    return service;

    function init() {

      $translate(["AddPetSexUnspecified", "AddPetSexMale", "AddPetSexFemale"]).then(function (translations) {
        genders = [{ id: 0, name: translations.AddPetSexUnspecified }, { id: 1, name: translations.AddPetSexMale }, { id: 2, name: translations.AddPetSexFemale }];
        console.log("Async Genders loaded");
      });
    }

    function get(id) {
      return genders.find(function (g) {
        return g.id == id;
      });
    }

    function getAll() {
      return genders;
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
    service.updateSeizureBackground = updateSeizureBackground;
    service.setAvatar = setAvatar;
    service.getAvatar = getAvatar;
    service.setHeight = setHeight;
    service.getHeight = getHeight;
    service.setWeight = setWeight;
    service.getWeight = getWeight;
    service.getActivityRate = getActivityRate;
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
    service.removeTreatment = removeTreatment;
    service.setBulkTreatmentReminders = setBulkTreatmentReminders;
    service.setTreatmentReminder = setTreatmentReminder;
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
    service.getSession = getSession;
    service.setSession = setSession;
    service.removeSession = removeSession;
    service.getSocialisation = getSocialisation;
    service.setSocialisation = setSocialisation;
    service.removeSocialisation = removeSocialisation;
    service.getFeed = getFeed;
    service.setFeed = setFeed;
    service.removeFeed = removeFeed;
    service.getWeightHistory = getWeightHistory;
    service.getActivityComparision = getActivityComparision;
    service.getWeightComparision = getWeightComparision;

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

    function setTreatment(petId, obj) {
      var base = TokenRest.one("pets", petId);
      return base.customPOST(obj, "treatment");
    }

    function updateTreatment(petId, treatmentId, obj) {
      var base = TokenRest.one("pets", petId);
      return base.one("treatment", treatmentId).customPUT(obj);
    }

    function removeTreatment(petId, id) {
      var base = TokenRest.one("pets", petId).one("treatment", id);
      return base.remove();
    }

    function getTreatment(petId, options) {
      var base = TokenRest.one("pets", petId);
      return base.customGET("treatment", options);
    }

    function setBulkTreatmentReminders(petId, treatmentId, obj) {
      var base = TokenRest.one("pets", petId).one("treatment", treatmentId);
      return base.customPOST(obj, "bulkreminders");
    }

    function setTreatmentReminder(petId, treatmentId, obj) {
      var base = TokenRest.one("pets", petId).one("treatment", treatmentId);
      return base.customPOST(obj, "reminder");
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

    function getSession(petId, options) {
      var base = TokenRest.one("pets", petId);
      return base.customGET("sessions", options);
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

    function removeSession(petId, id) {
      var base = TokenRest.one("pets", petId).one("sessions", id);
      return base.remove();
    }

    function getSocialisation(petId, options) {
      var base = TokenRest.one("pets", petId);
      return base.customGET("socialisation", options);
    }

    function setSocialisation(petId, obj) {
      var base = TokenRest.one("pets", petId);
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

    function getWeightHistory(petId, options) {
      var base = TokenRest.one("pets", petId);
      return base.customGET("weighthistory", options);
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

    function getActivityComparision(petId, options) {
      var base = TokenRest.one("pets", petId);
      return base.customGET("activityComparision", options);
    }

    function getWeightComparision(petId, options) {
      var base = TokenRest.one("pets", petId);
      return base.customGET("weightComparision", options);
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

    function set(title, notes, startDate, endDate) {
      var defer = $q.defer();

      var uniqueTitle = title + " - DLG" + startDate.format("YYYYMMDDHHmmss");
      var event = {
        title: uniqueTitle,
        notes: notes,
        startDate: startDate,
        endDate: moment(endDate).add(60, "minutes").toDate()
      };

      $cordovaCalendar.createEvent(event).then(function (result) {
        defer.resolve(JSON.stringify(event));
      }, function (err) {
        defer.reject(err);
      });

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
        endDate: event.endDate
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

  angular.module("app").factory("ShareUserTypeService", ShareUserTypeService);

  function ShareUserTypeService(config) {
    var service = this;
    var list = [{ id: 1, name: "Vet" }, { id: 2, name: "Co-owner" }, { id: 3, name: "Handler" }, { id: 4, name: "Trainer" }, { id: 5, name: "Breeder" }, { id: 6, name: "Shelter Staff" }];

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
    service.getShareUser = getShareUser;
    service.transferShareUser = transferShareUser;
    service.addShareUser = addShareUser;
    service.removeShareUser = removeShareUser;
    service.updateShareUser = updateShareUser;
    service.getUserByEmail = getUserByEmail;

    service.getUsersPets = getUsersPets;
    service.getPets = getPets;
    service.logout = logout;

    return service;

    function getShareUser(obj) {
      var base = TokenRest.all("owners/ShareUserPet");
      return base.getList();
    }

    function addShareUser(obj) {
      var base = TokenRest.all("owners/ShareUserPet");
      return base.post(obj);
    }

    function transferShareUser(obj) {
      var base = TokenRest.all("owners/ShareUserPet/transfer");
      return base.post(obj);
    }

    function updateShareUser(id, obj) {
      var base = TokenRest.one("owners/ShareUserPet", id);
      return base.customPUT(obj);
    }

    function removeShareUser(id) {
      var base = TokenRest.one("owners/ShareUserPet", id);
      return base.remove();
    }

    function getUserByEmail(email) {
      var query = {};

      if (email) {
        query.email = email;
      }
      return TokenRest.one("owners/userByEmail").get(query);
    }

    function getUsersPets() {
      var base = TokenRest.all("owners/allpets");
      return base.getList();
    }

    function getAllPets() {
      var base = TokenRest.all("owners/pets");
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
