(function() {
  'use strict';

  angular.module('app')
  .factory('BagService',BagService);

  function BagService(){
    var service = this;

    service.bag = {};

    // methods
    service.set    = set;
    service.get    = get;

    return service;

    function set(key,value) {
      console.log("Bag set: ", key);
      service.bag[key] = angular.copy(value);
    }

    function get(key,value) {
      console.log("Bag get: ", key);
      return service.bag[key];
    }

  }

})();