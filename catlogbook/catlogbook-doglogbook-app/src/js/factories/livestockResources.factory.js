(function() {
  'use strict';

  angular.module('app')
  .factory('TrialTypeService',TrialTypeService)
  .factory('TrialRangeService',TrialRangeService)
  .factory('CompetitionDivisionService',CompetitionDivisionService)
  .factory('CompetitionAwardService',CompetitionAwardService);

  function TrialTypeService(){
    var service = this;
    var list = [
      { id:1, name:"Utility" },
      { id:2, name:"Yard" },
      { id:3, name:"3-sheep" },
      { id:4, name:"Cattle" }
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

  function TrialRangeService(){
    var service = this;
    var list = [
      { id:1, name:"1-3" },
      { id:2, name:"4-6" },
      { id:3, name:"7-9" },
      { id:4, name:"10-15" },
      { id:5, name:"Over 15" }
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

  function CompetitionDivisionService(){
    var service = this;
    var list = [
      { id:1, name:"None" },
      { id:2, name:"Novice" },
      { id:3, name:"Improver" },
      { id:4, name:"Open" }
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
  
  function CompetitionAwardService(){
    var service = this;
    var list = [
      { id:1, name:"Has not placed" },
      { id:2, name:"First" },
      { id:3, name:"Second" },
      { id:4, name:"Third" }
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