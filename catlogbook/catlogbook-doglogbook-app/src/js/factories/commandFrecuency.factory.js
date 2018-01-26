(function() {
  'use strict';

  angular.module('app')
  .factory('CommandFrecuencyService',CommandFrecuencyService);

  function CommandFrecuencyService(){
    var service = this;
    var list = [
      { id:1, name:"Never" },
      { id:2, name:"Seldom" },
      { id:3, name:"Sometimes" },
      { id:4, name:"Usually" },
      { id:5, name:"Always" },
      { id:6, name:"Not Applicable" }
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