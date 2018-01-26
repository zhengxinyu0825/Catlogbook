(function() {
  'use strict';

  angular.module('app')
  .factory('GenderService',GenderService);

  function GenderService($translate){
    var service = this;
    var genders = [];

    // methods
    service.init   = init;
    service.get    = get;
    service.getAll = getAll;

    return service;

    function init(){

      $translate([
        "AddPetSexUnspecified","AddPetSexMale","AddPetSexFemale"
      ])
      .then(function (translations) {
        genders = [
          { id:0, name: translations.AddPetSexUnspecified },
          { id:1, name: translations.AddPetSexMale },
          { id:2, name: translations.AddPetSexFemale }
        ];
        console.log("Async Genders loaded");
      });  
    }

    function get(id) {
      return genders.find((g) => {
        return g.id == id
      });
    }

    function getAll() {
      return genders;
    }

  }

})();