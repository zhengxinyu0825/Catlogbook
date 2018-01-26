(function() {
  'use strict';

  angular.module('app')
  .factory('VetService',VetService);

  function VetService(TokenRest, $q){
    var service = this;
    
    // methods
    service.getTreatmentTypes             = getTreatmentTypes;
    service.getSymptomTypes               = getSymptomTypes;
    service.getSymptomFrequencies         = getSymptomFrequencies;
    service.getDiagnosis                  = getDiagnosis;
    service.getSeizureTestTypes           = getSeizureTestTypes;
    service.getSeizureTypes               = getSeizureTypes;
    service.getSeizureSignTypes           = getSeizureSignTypes;
    service.getSeizureBodyStates          = getSeizureBodyStates;
    service.getSeizureBodyStatePositions  = getSeizureBodyStatePositions;
    service.getSeizureAfterSignTypes      = getSeizureAfterSignTypes;

    return service;

    function getTreatmentTypes() {
      var base = TokenRest.all('vets/treatmenttypes');
      return base.getList();
    }

    function getSymptomTypes() {
      var base = TokenRest.all('vets/symptomtypes');
      return base.getList();
    }

    function getSymptomFrequencies() {
      var base = TokenRest.all('vets/symptomfrequencies');
      return base.getList();
    }    

    function getDiagnosis() {
      var base = TokenRest.all('vets/diagnosis');
      return base.getList();
    }    

    function getSeizureTestTypes() {
      var base = TokenRest.all('vets/seizuretesttypes');
      return base.getList();
    }

    function getSeizureTypes() {
      var base = TokenRest.all('vets/seizureTypes');
      return base.getList();
    }

    function getSeizureSignTypes() {
      var base = TokenRest.all('vets/seizureSignTypes');
      return base.getList();
    }

    function getSeizureBodyStates() {
      var base = TokenRest.all('vets/seizureBodyStates');
      return base.getList();
    }

    function getSeizureBodyStatePositions() {
      var base = TokenRest.all('vets/seizureBodyStatePositions');
      return base.getList();
    }

    function getSeizureAfterSignTypes() {
      var base = TokenRest.all('vets/seizureAfterSignTypes');
      return base.getList();
    }


  }

})();