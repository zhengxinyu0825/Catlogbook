(function() {
  'use strict';

  angular.module('app')
  .factory('ConfidenceScaleService',ConfidenceScaleService);

  function ConfidenceScaleService(){
    var service = this;
    var list = [
      { id:1, name:"Extremely Shy" },
      { id:2, name:"Shy" },
      { id:3, name:"Moderate" },
      { id:4, name:"Bold" },
      { id:5, name:"Extremely Bold" }
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