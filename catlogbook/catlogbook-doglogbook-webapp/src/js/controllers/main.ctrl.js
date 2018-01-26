(function(){
  'use strict';
  
  angular.module('app.controllers')
  .controller('MainCtrl',MainCtrl);

  function MainCtrl($rootScope, UserService, BagService, $state) {
    var vm = this;

    vm.logout = logout;
    vm.toState = toState;

    // defaults
    $rootScope.selectedPet = null;

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
        else if (type == 9){
          // Sessions
          $state.go('app.profile.feeds', { 'id': pet.id });
        }      
        else if (type == 10){
          // Profile
          $state.go('app.profile.index', { 'id': pet.id });
        }
      }

      
    }

    function logout(){
      UserService.logout();
    }
  };

})();