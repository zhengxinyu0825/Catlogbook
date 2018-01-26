(function(){
  'use strict';
  
  angular.module('app.controllers')
  .controller('ProfileCtrl',ProfileCtrl);

  function ProfileCtrl(
    $rootScope, $scope, $state, $filter,$stateParams,
    BagService,PetService,UserService,DatePeriodService,
    GenderService,
    selectedPet,
    translations) {

    var vm = this;

    // methods
    vm.getBreedNames = getBreedNames;
    vm.datePeriodChange = datePeriodChange;
    vm.getSexType = getSexType;
    vm.getPetAge = getPetAge;

    // dependencies

    // defaults
    init(); 

    function init(){
      $rootScope.selectedPet = selectedPet;

      // Periods
      vm.datePeriods = DatePeriodService.getAll();
      vm.selectedDatePeriodObj = DatePeriodService.getDefault();
      $rootScope.selectedDatePeriod = vm.selectedDatePeriodObj.id;
    }

    function getSexType(sexId){
      var gender = GenderService.get(sexId)
      return gender.name || "";
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

    function datePeriodChange(selectedDatePeriodObj){
      if (selectedDatePeriodObj){
        $rootScope.selectedDatePeriod = vm.selectedDatePeriodObj.id;
        $rootScope.$broadcast('period-change', $rootScope.selectedDatePeriod  );
      }    
    }

  }

})();