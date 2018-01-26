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
    service.getShareUser  = getShareUser;
    service.transferShareUser  = transferShareUser;
    service.addShareUser  = addShareUser;
    service.removeShareUser  = removeShareUser;
    service.updateShareUser  = updateShareUser;
    service.getUserByEmail  = getUserByEmail;

    service.getUsersPets  = getUsersPets;
    service.getPets  = getPets;
    service.logout   = logout;

    return service;

    function getShareUser(obj){
      var base = TokenRest.all('owners/ShareUserPet');
      return base.getList();
    }

    function addShareUser(obj){
      var base = TokenRest.all('owners/ShareUserPet');
      return base.post(obj);
    }

    function transferShareUser(obj){
      var base = TokenRest.all('owners/ShareUserPet/transfer');
      return base.post(obj);
    }

    function updateShareUser(id, obj) {
      var base =  TokenRest.one('owners/ShareUserPet',id);
      return base.customPUT(obj);
    }

   function removeShareUser(id){
      var base = TokenRest.one('owners/ShareUserPet',id);
      return base.remove();
   }

    function getUserByEmail(email){
      var query = {};

      if (email){
        query.email = email;
      }
      return TokenRest.one("owners/userByEmail").get(query);
    }

    function getUsersPets(){
      var base = TokenRest.all('owners/allpets');
      return base.getList();
    }

    function getAllPets(){
      var base = TokenRest.all('owners/pets');
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