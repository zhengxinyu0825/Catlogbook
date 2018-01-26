(function() {
  'use strict';

  angular.module('app')
  .factory('HeightUnitsService',HeightUnitsService)
  .factory('WeightUnitsService',WeightUnitsService) 
  .factory('DistanceUnitsService',DistanceUnitsService) 
  .factory('TemperatureUnitsService',TemperatureUnitsService);  


  function DistanceUnitsService(){
    var service = this;
    var list = [
      { id:0, name:'Kilometer'},
      { id:1, name:'Mile'}
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

  function HeightUnitsService(){
    var service = this;
    var list = [
      { id:'cm', name:'Cm'},
      { id:'feet', name:'Feet'}
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

  function WeightUnitsService(){
    var service = this;
    var list = [
      { id:'kg', name:'Kg'},
      { id:'pounds', name:'Pounds'}
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

  function TemperatureUnitsService(){
    var service = this;
    var list = [
      { id:1, name:'C'},
      { id:2, name:'F'}
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