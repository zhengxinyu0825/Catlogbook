(function() {
  'use strict';

  angular.module('app')
  .factory('SpeciesService',SpeciesService);

  function SpeciesService(TokenRest, $q){
    var service = this;
    
    // methods
    service.getAll    = getAll;
    service.getTypes  = getTypes;

    return service;

    function getAll(search) {
      var query = {};

      if (search){
        query.search = search;
      }

      var base = TokenRest.all('common/species');
      return base.getList(query);
    }

    function getTypes() {
      var base = TokenRest.all('common/speciesTypes');
      return base.getList();
    }
  }

})();