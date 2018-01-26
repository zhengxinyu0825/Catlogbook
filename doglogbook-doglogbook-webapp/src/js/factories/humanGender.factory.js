(function() {
  'use strict';

  angular.module('app')
  .factory('HumanGenderService',HumanGenderService);

  function HumanGenderService(){
    var service = this;
    var list = [
      { id:0, name:"Unspecified" },
      { id:1, name:"Male" },
      { id:2, name:"Female" },
      { id:3, name:"Transgender" }
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