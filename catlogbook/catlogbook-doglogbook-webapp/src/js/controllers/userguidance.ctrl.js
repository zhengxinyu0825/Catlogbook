(function(){
  'use strict';

  angular.module('app.controllers')
  .controller('UserguidanceCtrl',UserguidanceCtrl);

  function UserguidanceCtrl(
    $rootScope, $scope, $state,
    PetService, GenderService, BagService,
    userPets,petTypes,ngDialog,
    translations) {

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

    function toPet(petId){
      if (petId){
       $state.go('app.profile.index', { 'id': petId });
      }
    }

    function toState(type,pet){

      if (type && pet){
        BagService.set('SelectedPet',pet);

        if (type == 1){
          // Activity
          $state.go('app.profile.activities', { 'id': pet.id });
        }
        else if (type == 2){
          // Behaviour
          $state.go('app.profile.behaviours', { 'id': pet.id });
        }
        else if (type == 3){
          // Treatments
          $state.go('app.profile.treatments', { 'id': pet.id });
        }
        else if (type == 4){
          // Puppy Socialisation
          $state.go('app.profile.socialisations', { 'id': pet.id });
        }
        else if (type == 5){
          // Seizures
          $state.go('app.profile.seizures', { 'id': pet.id });
        }
        else if (type == 6){
          // Respiration Rates
          $state.go('app.profile.respirationRates', { 'id': pet.id });
        }
        else if (type == 7){
          // Symptoms
          $state.go('app.profile.symptoms', { 'id': pet.id });
        }
        else if (type == 8){
          // Sessions
          $state.go('app.profile.sessions', { 'id': pet.id });
        }
      }


    }

    function search(obj) {
      if (vm.filterQuery){
        if (obj.microchipNumber){
          return !!((
            obj.name.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || '') !== -1 ||
            obj.microchipNumber.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || '') !== -1 ||
            obj.owner.firstName.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || '') !== -1 ||
            obj.owner.lastName.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || '') !== -1 ));
        }
        else {
          return !!((
            obj.name.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || '') !== -1 ||
            obj.owner.firstName.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || '') !== -1 ||
            obj.owner.lastName.toUpperCase().indexOf(vm.filterQuery.toUpperCase() || '') !== -1 ));
        }
      }
      else {
        return true;
      }


    };

    function searchFilter(obj) {
        var re = new RegExp(vm.searchBy, 'i');
        return !vm.searchBy || re.test(obj.name) || re.test(obj.desc);
    };

    function typeFilter(obj) {
        return !vm.searchByType || vm.searchByType.id == obj.petSubtype.petTypeId;
    };

    function setActive(pet, index) {
      vm.activeIndex = index;
      vm.activePet   = pet;

      // Setting pet on bag.
      BagService.set('SelectedPet',pet);

      PetService.getTimeline(pet.id).then(
        (items) => {
          vm.timeline = items;
        },
        (errors) => {
          vm.timeline = [];
        }
      );
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

    function getOwnerNames(owner){
      var fullName = '';

      if (owner.firstName)
        fullName += owner.firstName;

      if (owner.lastName)
        fullName += ' ' +  owner.lastName;

      return fullName;
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

    function isValidPuppy(pet){
      var diffValue = moment(new Date()).diff(pet.dateOfBirth, 'months', true);
      if (diffValue <= 6)
        return true;
      else
        return false;
    }

  }

})();
