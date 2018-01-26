(function() {
  'use strict';

  angular.module('app')
  .factory('HumanAgeRangeService',HumanAgeRangeService);

  function HumanAgeRangeService(){
    var service = this;
    var list = [
      { id:0, name:"<18" },
      { id:1, name:"18-25" },
      { id:2, name:"26-35" },
      { id:3, name:"36-45" },
      { id:4, name:"46-55" },
      { id:5, name:"56-65" },
      { id:6, name:"65+" }
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