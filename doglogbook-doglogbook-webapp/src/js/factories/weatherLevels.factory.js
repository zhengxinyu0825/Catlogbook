(function() {
  'use strict';

  angular.module('app')
  .factory('WeatherLevelsService',WeatherLevelsService);

  function WeatherLevelsService(){
    var service = this;
    var list = [
      { id:1, name:"None" },
      { id:2, name:"Low" },
      { id:3, name:"Moderate" },
      { id:4, name:"High" }
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