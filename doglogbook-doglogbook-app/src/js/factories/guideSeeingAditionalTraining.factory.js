(function() {
  'use strict';

  angular.module('app')
  .factory('GuideSeeingAditionalTrainingService',GuideSeeingAditionalTrainingService);

  function GuideSeeingAditionalTrainingService(){
    var service = this;
    var list = [
      { id:1, name: "Dog walked under blindfold" },
      { id:2, name: "Local destination training" }
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