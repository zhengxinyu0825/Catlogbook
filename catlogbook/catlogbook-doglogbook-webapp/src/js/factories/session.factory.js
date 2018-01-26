(function() {
  'use strict';

  angular.module('app')
  .factory('SessionService',SessionService);

  function SessionService(TokenRest, $q){
    var service = this;
    
    // methods 
    service.getSessionsTypes  = getSessionsTypes;
    service.getHandGesturalCommands  = getHandGesturalCommands;
    service.getVerbalCommands  = getVerbalCommands;
    service.getWhistleLaserCommands  = getWhistleLaserCommands;
    service.getPetSkills  = getPetSkills;
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
      var base = TokenRest.all('Session/sessionsTypes');
      return base.getList();
    }
    function getHandGesturalCommands() {
      var base = TokenRest.all('Session/HandGesturalCommands');
      return base.getList();
    }

    function getVerbalCommands() {
      var base = TokenRest.all('Session/VerbalCommands');
      return base.getList();
    }

    function getWhistleLaserCommands() {
      var base = TokenRest.all('Session/WhistleLaserCommands');
      return base.getList();
    }

    function getPetSkills() {
      var base = TokenRest.all('Session/PetSkills');
      return base.getList();
    }    

    function getPetDeviceMethods() {
      var base = TokenRest.all('Session/PetDeviceMethods');
      return base.getList();
    }    

    function getRewards() {
      var base = TokenRest.all('Session/Rewards');
      return base.getList();
    }    

    function getCorrectionDevices() {
      var base = TokenRest.all('Session/CorrectionDevices');
      return base.getList();
    }

    function getSessionLevels() {
      var base = TokenRest.all('Session/SessionLevels');
      return base.getList();
    }

    function getLivestockHerdingWorkTypes() {
      var base = TokenRest.all('Session/LivestockHerdingWorkTypes');
      return base.getList();
    }    

    function getScentDetectionOdours() {
      var base = TokenRest.all('Session/scentDetectionOdours');
      return base.getList();
    }

    function getRacingGreyhoundActivityElements() {
      var base = TokenRest.all('Session/RacingGreyhoundActivityElements');
      return base.getList();
    }

    function getRacingGreyhoundActivities() {
      var base = TokenRest.all('Session/RacingGreyhoundActivities');
      return base.getList();
    }

  }

})();