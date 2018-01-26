(function() {
  'use strict';

  angular.module('app')
  .factory('RelationshipTypeService',RelationshipTypeService);

  function RelationshipTypeService(){
    var service = this;
    var list = [
      { id:0, name:"Familiar" },
      { id:1, name:"Unfamiliar" },
      { id:2, name:"Both" }
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