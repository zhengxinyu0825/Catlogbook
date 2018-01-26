(function() {
  'use strict';

  angular.module('app')
  .factory('TravelQualityService',TravelQualityService);

  function TravelQualityService(){
    var service = this;
    var list = [
      { id:0, name:"Very Poorly" },
      { id:1, name:"Poorly" },
      { id:2, name:"Neither Well Nor Poorly" },
      { id:3, name:"Well" },
      { id:4, name:"Very Well" }
    ];

    // methods
    service.get    = get;
    service.getAll = getAll;

    return service;

    function get(id) {
      return list.find((g) => {
        return g.id == id
      });
    }

    function getAll() {
      return list;
    }

  }

})();