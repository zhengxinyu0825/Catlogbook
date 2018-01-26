(function() {
  'use strict';

  angular.module('app')
  .factory('DogTypeService',DogTypeService);

  function DogTypeService(){
    var service = this;
    var list = [
      { id:1, name:"Puppy" },
      { id:2, name:"Adult" },
      { id:3, name:"Both" },
      { id:4, name:"Unknown" }
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