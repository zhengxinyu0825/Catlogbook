(function() {
  'use strict';

  angular.module('app')
  .factory('PetService',PetService);

  function PetService(TokenRest, $q, BagService, ErrorMapper){
    var service = this;

    // methods
    service.create    = create;
    service.update    = update;
    service.remove    = remove;
    service.getRemoveStatuses    = getRemoveStatuses;
    service.updateSeizureBackground = updateSeizureBackground;
    service.setAvatar = setAvatar;
    service.getAvatar = getAvatar;
    service.setHeight = setHeight;
    service.getHeight = getHeight;
    service.setWeight = setWeight;
    service.getWeight = getWeight;
    service.getActivityRate = getActivityRate;
    service.getLastActivityRate = getLastActivityRate;
    service.setActivityRate = setActivityRate;
    service.removeActivityRate = removeActivityRate;
    service.setBulkActivityRates = setBulkActivityRates;
    service.getAll    = getAll;
    service.getById   = getById;
    service.getTypes  = getTypes;
    service.getSubTypes  = getSubTypes;
    service.getSubTypesById  = getSubTypesById;
    service.getBreeds  = getBreeds;
    service.setTreatment = setTreatment;
    service.updateTreatment = updateTreatment;
    service.getTreatment = getTreatment;
    service.setBulkTreatmentReminders = setBulkTreatmentReminders;
    service.setTreatmentReminder = setTreatmentReminder;
    service.removeTreatment = removeTreatment;
    service.removeTreatmentReminder = removeTreatmentReminder;
    service.getTreatmentRemindersByPetIdTreatmentId = getTreatmentRemindersByPetIdTreatmentId;
    service.getTreatmentRemindersByPetId = getTreatmentRemindersByPetId;
    service.setSymptom = setSymptom;
    service.getSymptom = getSymptom;
    service.removeSymptom = removeSymptom;
    service.getRespirationRate = getRespirationRate;
    service.setRespirationRate = setRespirationRate;
    service.removeRespirationRate = removeRespirationRate;
    service.setSeizure = setSeizure;
    service.getSeizures = getSeizures;
    service.removeSeizures = removeSeizures;
    service.getTimeline = getTimeline;
    service.setSession = setSession;
    service.getSocialisation = getSocialisation;
    service.setSocialisation = setSocialisation;
    service.removeSocialisation = removeSocialisation;
    service.getFeed = getFeed;
    service.setFeed = setFeed;
    service.removeFeed = removeFeed;

    return service;

    function create(obj) {
      var defer = $q.defer();
      var base =  TokenRest.all('pets');

      base.post(obj).then(
        (response) => {
          defer.resolve(response);
        },
        (error) => {
          defer.reject(error);
        }
      );

      return defer.promise;
    }

    function update(id, obj) {
      var base =  TokenRest.one('pets',id);
      return base.customPUT(obj);
    }

    function remove(id,obj) {
      var base =  TokenRest.one('pets',id);
      return base.remove(obj);
    }

    function getRemoveStatuses() {
      var base = TokenRest.all('pets/DeleteStatus');
      return base.getList();
    }

    function updateSeizureBackground(petId,obj) {
      var base =  TokenRest.one('pets',petId);
      return base.customPUT(obj, "petseizure");
    }

    function setAvatar(petId,obj) {
      var base =  TokenRest.one('pets',petId);
      var imgData = {};
      imgData["data"] = obj;
      return base.customPUT(imgData, "avatar");
    }

    function getAvatar(petId) {
      var base =  TokenRest.one('pets',petId);
      return base.customGET("avatar");
    }

    function setHeight(petId,obj) {
      var base =  TokenRest.one('pets',petId);
      return base.customPUT(obj, "height");
    }

    function getHeight(petId) {
      var base =  TokenRest.one('pets',petId);
      return base.customGET("height");
    }

    function setWeight(petId,obj) {
      var base =  TokenRest.one('pets',petId);
      return base.customPUT(obj, "weight");
    }

    function getWeight(petId) {
      var base =  TokenRest.one('pets',petId);
      return base.customGET("weight");
    }

    function getActivityRate(petId,options) {
      var base =  TokenRest.one('pets',petId);
      return base.customGET("activityrate",options);
    }

    function getLastActivityRate(petId,options) {
      var base =  TokenRest.one('pets',petId);
      return base.customGET("activityrate/lastentry",options);
    }

    function setActivityRate(petId, obj) {
      var base =  TokenRest.one('pets',petId);
      return base.customPOST(obj ,"activityrate");
    }

    function removeActivityRate(petId, id) {
      var base =  TokenRest.one('pets',petId).one('activityrate',id);
      return base.remove();
    }

    function setBulkActivityRates(petId, obj) {
      var base =  TokenRest.one('pets',petId);
      return base.customPOST(obj ,"bulkactivityrate");
    }

    function getAll(search) {
      var query = {};

      if (search){
        query.search = search;
      }

      var base = TokenRest.all('pets');
      return base.getList(query);
    }

    function getById(id) {
      var base =  TokenRest.one('pets',id);
      return base.get();
    }

    function getTypes() {
      var base = TokenRest.all('pets/types');
      return base.getList();
    }

    function getSubTypes() {
      var base = TokenRest.all('pets/subtypes');
      return base.getList();
    }

    function getSubTypesById(id) {
      var base =  TokenRest.one('pets/types',id);
      return base.get();
    }

    function getAllBreeds(){
      var query = {};

      query.pageSize = 1000

      var base = TokenRest.all('pets/breeds');
      return base.getList(query);
    }

    function getBreeds() {
      var defer = $q.defer();

      service.Breeds = BagService.get("Breeds");
      if (service.Breeds){
        defer.resolve(service.Breeds);
      }
      else {
        getAllBreeds().then(
          (result) =>{
            BagService.set("Breeds",result);
            defer.resolve(result);
          },
          (error) => {
            defer.reject(error);
        })
      }
      return defer.promise;
    }

    function setTreatment(petId, obj) {
      var base =  TokenRest.one('pets',petId);
      return base.customPOST(obj ,"treatment");
    }

    function updateTreatment(petId, treatmentId, obj) {
      var base = TokenRest.one('pets',petId);
      return base.one('treatment',treatmentId)
            .customPUT(obj);
    }

    function getTreatment(petId) {
      var base =  TokenRest.one('pets',petId);
      return base.customGET("treatment");
    }

    function setBulkTreatmentReminders(petId, treatmentId, obj) {
      var base =  TokenRest.one('pets',petId).one('treatment',treatmentId);
      return base.customPOST(obj ,"bulkreminders");
    }

    function setTreatmentReminder(petId, treatmentId, obj) {
      var base =  TokenRest.one('pets',petId).one('treatment',treatmentId);
      return base.customPOST(obj ,"reminder");
    }

    function removeTreatment(petId, id) {
      var base =  TokenRest.one('pets',petId).one('treatment',id);
      return base.remove();
    }

    function removeTreatmentReminder(petId, treatmentId, reminderId) {
      var base =  TokenRest
                    .one('pets',petId)
                    .one('treatment',treatmentId)
                    .one('reminder',reminderId);
      return base.remove();
    }

    function getTreatmentRemindersByPetIdTreatmentId(petId, treatmentId) {
      var base =  TokenRest.one('pets',petId).one('treatment',treatmentId);
      return base.customGET("reminders");
    }

    function getTreatmentRemindersByPetId(petId) {
      var base =  TokenRest.one('pets',petId).all('treatment/reminders')
      return base.getList();
    }

    function setSymptom(petId, obj) {
      var base =  TokenRest.one('pets',petId);
      return base.customPOST(obj ,"symptom");
    }

    function getSymptom(petId, options) {
      var base =  TokenRest.one('pets',petId);
      return base.customGET("symptoms", options);
    }

    function removeSymptom(petId, id) {
      var base =  TokenRest.one('pets',petId).one('symptoms',id);
      return base.remove();
    }

    function setSeizure(petId, obj) {
      var base =  TokenRest.one('pets',petId);
      return base.customPOST(obj ,"seizure");
    }

    function getSeizures(petId, options) {
      var base =  TokenRest.one('pets',petId);
      return base.customGET("seizure",options);
    }

    function removeSeizures(petId, id) {
      var base =  TokenRest.one('pets',petId).one('seizure',id);
      return base.remove();
    }

    function getRespirationRate(petId, options) {
      var base =  TokenRest.one('pets',petId);
      return base.customGET("respirationRate", options);
    }

    function setRespirationRate(petId, obj) {
      var base =  TokenRest.one('pets',petId);
      return base.customPOST(obj ,"respirationRate");
    }

    function removeRespirationRate(petId, id) {
      var base =  TokenRest.one('pets',petId).one('respirationRate',id);
      return base.remove();
    }

    function getTimeline(petId) {
      var base =  TokenRest.one('pets',petId);
      return base.customGET("timeline");
    }

    function setSession(sessionType,petSubTypeId, petId, obj) {
      var sessionTypePath = '';

      // 1 Guide Seeing Eye
      // 2 Livestock Herding Farm
      // 3 Protection Guard
      // 4 Racing Greyhound
      // 5 Scent Detection

      switch(petSubTypeId) {
          case 1:
              sessionTypePath = 'guideseeing';
              break;
          case 2:
              sessionTypePath = 'livestock';
              break;
          case 3:
              sessionTypePath = 'protectionguard';
              break;
          case 4:
              sessionTypePath = 'racinggreyhound';
              break;
          case 5:
              sessionTypePath = 'scentdetection';
              break;
          default:
              sessionTypePath = 'general';
      }

      sessionTypePath += (sessionType == 1)?"/training":"/assessment";
      var base =  TokenRest.one('pets',petId);
      return base.customPOST(obj ,sessionTypePath);
    }

    function getSocialisation(petId, options) {
      var base =  TokenRest.one('pets',petId);
      return base.customGET("socialisation",options);
    }

    function setSocialisation(petId, obj) {
      var base =  TokenRest.one('pets',petId);

      // Points tasks flag. Will trigger Puppy S. Point calculation.
      obj['pTask'] = true;
      return base.customPOST(obj ,"socialisation");
    }

    function removeSocialisation(petId, id) {
      var base =  TokenRest.one('pets',petId).one('socialisation',id);
      return base.remove();
    }

    function getFeed(petId, options) {
      var base =  TokenRest.one('pets',petId);
      return base.customGET("feed",options);
    }

    function setFeed(petId, obj) {
      var base =  TokenRest.one('pets',petId);
      return base.customPOST(obj ,"feed");
    }

    function removeFeed(petId, id) {
      var base =  TokenRest.one('pets',petId).one('feed',id);
      return base.remove();
    }


  }

})();
