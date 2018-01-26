(function() {
  'use strict';

  angular.module('app')
  .factory('AgeFirstTimeSeizureService',AgeFirstTimeSeizureService);

  function AgeFirstTimeSeizureService(){
    var service = this;
    var list = [
      { id:0, name:"unknown" },
      { id:1, name:"<3 months" },
      { id:2, name:"3-6 months" },
      { id:3, name:"7-12 months" },
      { id:4, name:"12-18 months" },
      { id:5, name:"18+ months" }
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