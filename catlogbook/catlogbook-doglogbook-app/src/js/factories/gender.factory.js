(function() {
  'use strict';

  angular.module('app')
  .factory('GenderService',GenderService);

  function GenderService($translate){
    var service = this;
    var list = [
      { id:0, name:"Unspecified" },
      { id:1, name:"Male" },
      { id:2, name:"Female" }
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
