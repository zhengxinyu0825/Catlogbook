(function() {
  'use strict';

  angular.module('app')
  .factory('RunChaseQualityService',RunChaseQualityService)
  .factory('ActivityRateService',ActivityRateService);

  function RunChaseQualityService(){
    var service = this;
    var list = [
      { id:1, name:"Failed" },
      { id:2, name:"Poor" },
      { id:3, name:"Average" },
      { id:4, name:"Good" },
      { id:5, name:"Very Good" }
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

  function ActivityRateService(){
    var service = this;
    var list = [
      { id:1, name:"Would Not Enter" },
      { id:2, name:"Hesitant But Entered" },
      { id:3, name:"Average Entry" },
      { id:4, name:"Comfortable Entry" },
      { id:5, name:"Very Good Entry" }
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