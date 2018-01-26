(function() {
  'use strict';

  angular.module('app')
  .factory('ExercisePhysicalConditionService',ExercisePhysicalConditionService);

  function ExercisePhysicalConditionService(){
    var service = this;
    var list = [
      { id:1, name: "Exercise on leash with handler" },
      { id:2, name: "Exercise off leash with handler" },
      { id:3, name: "Exercise off leash with other dogs" },
      { id:4, name: "Swim" },
      { id:5, name: "Retrieve" },
      { id:6, name: "Rest periods with handler" },
      { id:7, name: "Rest periods in kennel / vehicle" },
      { id:8, name: "Rest periods other (specify)" },
      { id:9, name: "Grooming" },
      { id:10, name: "Other" }
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