(function() {
  'use strict';

  angular.module('app')
  .factory('DatePeriodService',DatePeriodService);

  function DatePeriodService(config){
    var service = this;
    var list = [
      { id:1, name:"Day" },
      { id:2, name:"Week" },
      { id:3, name:"Month" },
      { id:4, name:"6 Months" },
      { id:5, name:"Year" },
      { id:6, name:"All" }
    ];

    // methods
    service.getDefault    = getDefault;
    service.getAll = getAll;

    return service;

    function getDefault(id) {
      return list.find((g) => {
        return g.id == config.defaultPeriod;
      });
    }

    function getAll() {
      return list;
    }

  }

})();