(function(){
  'use strict';

  angular.module('app.controllers')
  .controller('PetProfileIndexCtrl',PetProfileIndexCtrl);

  function PetProfileIndexCtrl(
    $rootScope, $scope, $state, $filter,$stateParams,
    PetService,BehaviourService,WeightUnitsService,
    breeds,GenderService,
    ngDialog,
    translations, config) {

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

    $scope.$on('period-change', function(event, args) {
      init();
      getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);
    });

    if ($rootScope.selectedPet){
      vm.selectedPet = $rootScope.selectedPet;
      getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);
    }

    function init(){
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

      vm.breedPercentages = [
        { id: 100, name:'100%' },
        { id: 75,  name:'75%' },
        { id: 50, name:'50%' },
        { id: 25, name:'25%' }
      ];
      vm.ageTypes = [
        { id: 1, name:'year' },
        { id: 2,  name:'month' }
      ];
      vm.ageRanges = [];
      vm.ageRangesYears = [
        { id: 1,  name:'+/- 1' },
        { id: 2,  name:'+/- 2' },
        { id: 3,  name:'+/- 3' }
      ];
      vm.ageRangesMonths = [
        { id: 1,  name:'+/- 1' },
        { id: 2,  name:'+/- 2' },
        { id: 3,  name:'+/- 3' },
        { id: 4,  name:'+/- 4' },
        { id: 5,  name:'+/- 5' },
        { id: 6,  name:'+/- 6' },
        { id: 7,  name:'+/- 7' },
        { id: 8,  name:'+/- 8' },
        { id: 9,  name:'+/- 9' },
        { id: 10,  name:'+/- 10' },
        { id: 11,  name:'+/- 11' },
        { id: 12,  name:'+/- 12' }
      ];
      vm.petSexs = GenderService.getAll();
      vm.selectedCompareBreed = null;
      vm.selectedCompareBreedPercentage = null;
      vm.selectedCompareAgeType = null;
      vm.selectedCompareAgeRange = null;
      vm.selectedCompareSex = null;
    }

    function compareBreedChange(selectedCompareBreed){
      if (!selectedCompareBreed){
        vm.selectedCompareBreedPercentage = null;
      }
    }

    function weightUnitChange(){
      getWeightHistory($rootScope.selectedDatePeriod);
    }

    function compareWeightUnitChange(){
      getCompareResults($rootScope.selectedPet.id);
    }

    function getCompareResults(id){

      var getOptions = {
        type: vm.selectedCompareWeightUnit.id
      };

      if (vm.selectedCompareBreed){
        getOptions['breedId'] = vm.selectedCompareBreed.id;

        if (vm.selectedCompareBreedPercentage){
          getOptions['breedPercentage'] = vm.selectedCompareBreedPercentage.id;
        }
      }

      if (vm.selectedCompareAgeRange){
        var rangeValue = vm.selectedCompareAgeRange.id;
        getOptions['ageRange'] = (rangeValue * ((vm.selectedCompareAgeType.id == 1)?12:1));
      }

      if (vm.selectedCompareSex){
        getOptions['petSex'] = vm.selectedCompareSex.id;
      }


      PetService.getWeightComparision(vm.selectedPet.id,getOptions).then(
        (result) => {

          $scope.weightComparisonSeries = ["My Dog","Others"]
          $scope.weightComparisonLabels = ["Comparison"];;
          $scope.weightComparisonColors = ["#41c2f3","#c7c7c7"];
          $scope.weightComparisonOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                  scaleLabel: {
                      display: true,
                      labelString: 'Weight'
                  },
                  ticks: {
                      min: 0
                  }
                }]
            }
          };

          if (result &&
              result.petResult &&
              result.otherResult &&
              result.petResult >= 0 &&
              result.otherResult >= 0){
            vm.comparisonResult = result;

            $scope.weightComparisonData = [[result.petResult],[result.otherResult]];

          }
          else {
            vm.comparisonResult = null;

            $scope.weightComparisonData = [];

            ngDialog.open({
                template: "No results",
                plain: true
            });
          }
        },
        (error) => {
          ngDialog.open({
              template: "Error, cannot get results",
              plain: true
          });
        }
      );
    }

    function ageTypeChange(selectedCompareAgeType){
      if (selectedCompareAgeType){
        if (selectedCompareAgeType.id == 1){
          vm.ageRanges = vm.ageRangesYears;
        }
        else {
         vm.ageRanges = vm.ageRangesMonths;
        }
      }
      else {
        vm.ageRanges = null;
      }
    }


    function getWeightHistory(datePeriod){

      var getOptions = {
        period: datePeriod,
        type: vm.selectedWeightUnit.id
      };

      // Activities
      PetService.getWeightHistory(vm.selectedPet.id,getOptions).then(
        (weightHistories) => {

          vm.weightHistories = weightHistories;

           weightHistories = _.chain(weightHistories)
              .orderBy(['dateCreated'],['asc'])
              .value();


          $scope.labels = _.chain(weightHistories)
          .map((e) => {
            var dateFormat = $filter('date')(e.dateCreated, "d MMM HH:mm");
            return dateFormat;
          })
          .value();

          vm.data = _.chain(weightHistories)
          .map((e) => {
            return e.weight;
          })
          .value();

          $scope.series = ['Weight History'];
          $scope.data = [];
          $scope.options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              yAxes: [{
                  scaleLabel: {
                      display: true,
                      labelString: 'Weight'
                  }
              }]
            }
          };
          $scope.data.push(vm.data);

        }
      );
    }

    function getResults(id, datePeriod){

      var getOptions = {
        period: datePeriod
      };

      getWeightHistory(datePeriod);

      // Activities
      PetService.getActivityRate(vm.selectedPet.id,getOptions).then(
        (activities) => {

          vm.activities = activities;
          vm.activitiesGroups = _.chain(activities)
                                .groupBy(function (e) {
                                  return e.reportEvent.event.name +' - '+ e.reportEvent.report.name;
                                })
                                .toPairs()
                                .map((x) => {
                                  return [ x[0], x[1].length ]
                                })
                                .orderBy(['1'],['desc'])
                                .value()

        }
      );

      // Behaviours
      BehaviourService.getBehaviours(vm.selectedPet.id,getOptions).then(
        (behaviours) => {

          vm.behaviours = behaviours;
          vm.behavioursGroups = _.chain(behaviours)
                                .groupBy(function (e) {
                                  return e.behaviourType.name;
                                })
                                .toPairs()
                                .map((x) => {
                                  return [ x[0], x[1].length ]
                                })
                                .orderBy(['1'],['desc'])
                                .value()

        }
      );

      // RespirationRate
      PetService.getRespirationRate(vm.selectedPet.id,getOptions).then(
        (respirationRate) => {
          vm.respirationRate = respirationRate;
        }
      );

      // Socialisation
      PetService.getSocialisation(vm.selectedPet.id,getOptions).then(
        (socialisation) => {
          vm.socialisation = socialisation;
        }
      );

      // Treatments
      PetService.getTreatment(vm.selectedPet.id,getOptions).then(
        (treatments) => {

          vm.treatments = treatments;
          vm.treatmentsGroups = _.chain(treatments)
                                .groupBy(function (e) {
                                  return e.treatmentType.name;
                                })
                                .toPairs()
                                .map((x) => {
                                  return [ x[0], x[1].length ]
                                })
                                .orderBy(['1'],['desc'])
                                .value()

        }
      );

      // Symptom
      PetService.getSymptom(vm.selectedPet.id,getOptions).then(
        (symptoms) => {

        vm.symptoms = symptoms;
        vm.symptomsGroups =  _.chain(symptoms)
                              .groupBy(function (e) {
                                return e.symptomType.name;
                              })
                              .toPairs()
                              .map((x) => {
                                return [ x[0], x[1].length ]
                              })
                              .orderBy(['1'],['desc'])
                              .value()

        }
      );

      // Seizures
      PetService.getSeizures(vm.selectedPet.id,getOptions).then(
        (seizures) => {

        vm.seizures = seizures;
        vm.seizuresGroups =  _.chain(seizures)
                              .groupBy(function (e) {
                                return e.seizureType.name;
                              })
                              .toPairs()
                              .map((x) => {
                                return [ x[0], x[1].length ]
                              })
                              .orderBy(['1'],['desc'])
                              .value()

        }
      );

    }

  }

})();
