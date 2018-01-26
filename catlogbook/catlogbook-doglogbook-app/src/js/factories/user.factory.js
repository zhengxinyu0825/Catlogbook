(function() {
  'use strict';

  angular.module('app')
  .factory('UserService',UserService);

  function UserService(TokenRest, AuthService,
    $q, $state,
    BagService,
    ErrorMapper, config){
    var service = this;

    // methods
    service.getUserInfo  = getUserInfo;
    service.setCountry  = setCountry;
    service.getUserQuestion = getUserQuestion;
    service.setUserQuestion = setUserQuestion;
    service.getPetsAlerts  = getPetsAlerts;
    service.setPetAlertsConfirmedBulk  = setPetAlertsConfirmedBulk;
    service.getPets  = getPets;
    service.logout   = logout;

    return service;

    function getUserInfo() {
      var base =  TokenRest.one('account/userinfo');
      return base.get();
    }

    function setCountry(countryId) {
      var base =  TokenRest.one('account/userCountry',countryId);
      return base.post();
    }

    function getUserQuestion() {
      var base =  TokenRest.one('account/userQuestion');
      return base.get();
    }

    function setUserQuestion(obj) {
      var base =  TokenRest.all('account/userQuestion');
      return base.customPOST(obj);
    }

    function getPetsAlerts(){
      var base = TokenRest.all('owners/pets/alerts');
      return base.getList();
    }

    function setPetAlertsConfirmedBulk(obj) {
      var base =  TokenRest.all('owners/pets/alerts/bulkconfirm');
      return base.customPOST(obj);
    }

    function getAllPets(){
      var base = TokenRest.all('owners/allPets');
      return base.getList();
    }

    function getPets(){
      var defer = $q.defer();

      service.Pets = BagService.get("Pets");
      if (service.Pets){
        defer.resolve(service.Pets);
      }
      else {
        getAllPets().then(
          (result) =>{
            BagService.set("Pets",result);
            defer.resolve(result);
          },
          (error) => {
            defer.reject(error);
        })
      }
      return defer.promise;
    }

    function logout(){
      BagService.set("Pets",null);
      AuthService.logoutUser();
      $state.go('login');
    }


  }

})();
