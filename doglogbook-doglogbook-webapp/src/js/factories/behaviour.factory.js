(function() {
  'use strict';

  angular.module('app')
  .factory('BehaviourService',BehaviourService);

  function BehaviourService(TokenRest, $q, ErrorMapper){
    var service = this;
    
    // methods
    service.set = set;
    service.remove = remove;
    service.setDestructive = setDestructive;
    service.setSenior = setSenior;
    service.setFearRelated = setFearRelated;
    service.setAggressive = setAggressive;
    service.getTypes = getTypes;
    service.getItemTypesByTypeId = getItemTypesByTypeId;
    service.getObservationTypes = getObservationTypes;
    service.getLocationTypes = getLocationTypes;
    service.getNearResourceTypes = getNearResourceTypes;
    service.getDirectedTowards = getDirectedTowards;
    service.getDirectedTowardTypes = getDirectedTowardTypes;
    service.getDestroyedObjects = getDestroyedObjects;
    service.getBehaviourDuringTypes = getBehaviourDuringTypes;
    service.getBehaviours = getBehaviours;

    service.behaviourTypes = [
      { id:1 , name:'Vocalising' },
      { id:2 , name:'Destructive' },
      { id:3 , name:'Repetitive' },
      { id:4 , name:'Toileting/Elimination-related' },
      { id:5 , name:'Escaping/evading' },
      { id:6 , name:'Other' },
      { id:7 , name:'Senior' },
      { id:8 , name:'Aggressive' },
      { id:9 , name:'Fear-related' },
      { id:10, name:'Anxiety-related' }
    ];

    service.directedTowardTypes = [
      { id:1, name:"Familiar" },
      { id:2, name:"Unfamiliar" },
      { id:3, name:"Both" }
    ];

    return service;
    
    function set(petId, obj) {
      var base =  TokenRest.one('pets',petId);
      return base.customPOST(obj ,"behaviour");
    }

    function remove(petId, id) {
      var base =  TokenRest.one('pets',petId).one('behaviour',id);
      return base.remove();
    }   

    function getBehaviours(petId, options) {
      var base =  TokenRest.one('pets',petId);
      return base.customGET("behaviour", options);
    }

    function setDestructive(petId, obj) {
      var base =  TokenRest.one('pets',petId);
      return base.customPOST(obj ,"behaviour/destructive");
    }

    function setSenior(petId, obj) {
      var base =  TokenRest.one('pets',petId);
      return base.customPOST(obj ,"behaviour/senior");
    }    

    function setFearRelated(petId, obj) {
      var base =  TokenRest.one('pets',petId);
      return base.customPOST(obj ,"behaviour/fearrelated");
    }

    function setAggressive(petId, obj) {
      var base =  TokenRest.one('pets',petId);
      return base.customPOST(obj ,"behaviour/aggresive");
    }

    function getTypes() {
      return service.behaviourTypes;
    }

    function getItemTypesByTypeId(typeId) {
      var base =  TokenRest.one('behaviour',typeId);
      return base.customGET("itemTypes");
    }

    function getObservationTypes() {
      var base = TokenRest.all('behaviour/observationTypes');
      return base.getList();
    }

    function getLocationTypes() {
      var base = TokenRest.all('behaviour/locationTypes');
      return base.getList();
    }

    function getNearResourceTypes() {
      var base = TokenRest.all('behaviour/nearResources');
      return base.getList();
    }

    function getDirectedTowards() {
      var base = TokenRest.all('behaviour/behaviourDirectedTowards');
      return base.getList();
    }    

    function getDirectedTowardTypes() {
      return service.directedTowardTypes;
    }

    function getDestroyedObjects() {
      var base = TokenRest.all('behaviour/destroyedObjects');
      return base.getList();
    }    

    function getBehaviourDuringTypes() {
      var base = TokenRest.all('behaviour/behaviourDuringTypes');
      return base.getList();
    }    


  }

})();