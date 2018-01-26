(function() {
  'use strict';

  angular.module('app')
  .factory('EventService',EventService);

  function EventService(TokenRest, $q){
    var service = this;
    
    // methods
    service.getAll    = getAll;
    service.getByReportType    = getByReportType;

    return service;

    function getAll(search) {
      var query = {};

      if (search){
        query.search = search;
      }

      var base = TokenRest.all('reports');
      return base.getList(query);
    }

    function getByReportType(id) {
      var base = TokenRest.one('reports',id);
      return base.customGET("eventsByReportType");
    }

  }

})();