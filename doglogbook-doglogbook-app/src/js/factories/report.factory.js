(function() {
  'use strict';

  angular.module('app')
  .factory('ReportService',ReportService);

  function ReportService(TokenRest, $q){
    var service = this;
    
    // methods
    service.getAll    = getAll;
    service.getById   = getById;
    service.getTypes  = getTypes;
    service.getRates  = getRates;
    service.getEventsById  = getEventsById;
    service.getSounds  = getSounds;
    service.getLifeExperiences  = getLifeExperiences;

    return service;

    function getAll(search) {
      var query = {};

      if (search){
        query.search = search;
      }

      var base = TokenRest.all('reports');
      return base.getList(query);
    }

    function getById(id) {
      var base =  TokenRest.one('reports',id);
      return base.get();
    }

    function getTypes() {
      var base = TokenRest.all('reports/types');
      return base.getList();
    }

    function getRates() {
      var base = TokenRest.all('reports/rates');
      return base.getList();
    }

    function getEventsById(id) {
      var base =  TokenRest.one('reports',id);
      return base.getList('events');
    }
  
    function getSounds(id) {
      var base =  TokenRest.one('reports',id);
      return base.getList('sounds');
    }

    function getLifeExperiences(id) {
      var base =  TokenRest.one('reports',id);
      return base.getList('lifeExperiences');
    }


  }

})();