(function() {
  'use strict';

  angular.module('app')
  .factory('MotivationScaleService',MotivationScaleService);

  function MotivationScaleService(){
    var service = this;
    var list = [
      { id:1, name:"Very Low" },
      { id:2, name:"Low" },
      { id:3, name:"Average" },
      { id:4, name:"High" },
      { id:5, name:"Very High" },
      { id:6, name:"Dont Know" }
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