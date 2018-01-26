(function() {
  'use strict';

  angular.module('app')
  .factory('ShareUserTypeService',ShareUserTypeService);

  function ShareUserTypeService(config){
    var service = this;
    var list = [
      { id:1, name:"Vet" },
      { id:2, name:"Co-owner" },
      { id:3, name:"Handler" },
      { id:4, name:"Trainer" },
      { id:5, name:"Breeder" },
      { id:6, name:"Shelter Staff" }
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