(function() {
  'use strict';

  angular.module('app')
  .factory('AgeAcquiredService',AgeAcquiredService);

  function AgeAcquiredService(){
    var service = this;
    var list = [
      { id:0, name:"unknown" },
      { id:1, name:"<6 weeks" },
      { id:2, name:"6-8 weeks" },
      { id:3, name:"9-12 weeks" },
      { id:4, name:"13-16 weeks" },
      { id:5, name:"17-24 weeks" },
      { id:6, name:"24+ weeks" }
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