(function() {
  'use strict';

  angular.module('app')
  .factory('CommonService',CommonService);

  function CommonService(TokenRest, $q){
    var service = this;
    
    // methods
    service.getSpecies  = getSpecies;
    service.getSpeciesTypes  = getSpeciesTypes;
    service.getSurfaceObstacles  = getSurfaceObstacles;
    service.getTransportationTypes  = getTransportationTypes;
    service.getLocationSubTypes  = getLocationSubTypes;

    return service;

    function getSpecies() {
      var base = TokenRest.all('common/species');
      return base.getList();
    }

    function getSpeciesTypes() {
      var base = TokenRest.all('common/speciesTypes');
      return base.getList();
    }

    function getSurfaceObstacles() {
      var base = TokenRest.all('common/SurfaceObstacles');
      return base.getList();
    }    

    function getTransportationTypes() {
      var base = TokenRest.all('common/TransportationTypes');
      return base.getList();
    }    

    function getLocationSubTypes() {
      var base = TokenRest.all('common/LocationSubTypes');
      return base.getList();
    }

  }

})();