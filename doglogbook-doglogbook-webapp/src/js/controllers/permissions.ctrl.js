(function(){
  'use strict';
  
  angular.module('app.controllers')
  .controller('PermissionsCtrl',PermissionsCtrl);

  function PermissionsCtrl(
    $scope, $state, ngDialog,
    NgTableParams, $element,
    PetService, GenderService, ShareUserTypeService,
    pets, shareUserTypes,translations,
    UserService) {

    var vm = this;

    // methods
    vm.newSharePetsChange = newSharePetsChange;
    vm.transferSharePetsChange = transferSharePetsChange;
    vm.updateSharePetsChange = updateSharePetsChange;
    vm.getUserFullDesc = getUserFullDesc;
    vm.getUserName = getUserName;
    vm.checkUser = checkUser;
    vm.checkTransferUser = checkTransferUser;
    vm.addShareUser = addShareUser;
    vm.updateShareUser = updateShareUser;
    vm.removeShareUser = removeShareUser;
    vm.transferShareUser = transferShareUser;
    vm.dateFormatLocal = dateFormatLocal;
    vm.getShareUserDetails = getShareUserDetails;
    vm.getBreedNames = getBreedNames;
    vm.getPetAge = getPetAge;
    vm.getSexType = getSexType;
    vm.getShareUserTypeDetails = getShareUserTypeDetails;

    // dependencies
    vm.pets = pets;
    vm.shareUserTypes = shareUserTypes;
    vm.shareUsersItems = [];
    vm.ngTableUpdateConfigs = [];


    // New Share User

    vm.ngTableConfig = angular.copy(createNgTableConfig());
    vm.ngTableTransferConfig = angular.copy(createNgTableConfig());

    function createNgTableConfig() {
      var initialParams = {
        count:5
      };
      var initialSettings = {
        counts: [],
        dataset: vm.pets
      };
      return new NgTableParams(initialParams, initialSettings);
    }

    // defaults
    init(); 


    function init(){
      vm.ngTableUpdateConfigs = [];
      vm.results = [];
      vm.userEmail = null;
      vm.transferUserEmail = null;
      vm.selectedUser = null;
      vm.selectedTransferUser = null;
      vm.newSharePets = null;
      vm.newSharePetsFiltered = [];
      vm.updateSharePetsFiltered = [];
      vm.selectedShareUserType = null;
      vm.updateSharePets = [];
      vm.shareUsers = [];
      vm.transferSharePets = null;
      vm.transferSharePetsFiltered = [];

      UserService.getShareUser().then((shareUsers) => {
        vm.shareUsers = shareUsers;

        vm.shareUsers.forEach((shareUser) => {
          vm.updateSharePets[shareUser.id] = {};

          // ng-table configuration
          vm.ngTableUpdateConfigs[shareUser.id] = angular.copy(createNgTableConfig());

          shareUser.sharePets.forEach((sharePet) => {
            vm.updateSharePets[shareUser.id][sharePet.petId] = true;
          });
        });
        
      });
    }

    function newSharePetsChange(){

      vm.newSharePetsFiltered = _.chain(vm.newSharePets).keys()
          .value()
          .filter((e)=> { 
            return vm.newSharePets[e]==true  
          });
    }

    function transferSharePetsChange(){

      vm.transferSharePetsFiltered = _.chain(vm.transferSharePets).keys()
          .value()
          .filter((e)=> { 
            return vm.transferSharePets[e]==true  
          });
    }

    function updateSharePetsChange(shareUserId,sharePetId){
      vm.updateSharePetsFiltered = _.chain(vm.updateSharePets[shareUserId]).keys()
          .value()
          .filter((e)=> { 
            return vm.updateSharePets[shareUserId][e]==true  
          });
    }

    function dateFormatLocal(date){
      if (date)
        return moment(moment.utc(moment.utc(date).format('YYYY-MM-DD HH:mm')).toDate()).format('YYYY-MM-DD HH:mm');
    }


    function checkUser(userEmail){

     if (userEmail){

        UserService.getUserByEmail(userEmail).then(
          (user)=>{
            if (user){

              vm.selectedUser = user;
            }
            else {
              ngDialog.open({
                  template: "The user is not valid",
                  plain: true
              });       
            }
          },
          (err)=>{
            ngDialog.open({
                template: "The user is not member of Doglogbook",
                plain: true
            });
          });

      }

    }

    function checkTransferUser(userEmail){

     if (userEmail){

        UserService.getUserByEmail(userEmail).then(
          (user)=>{
            if (user){

              vm.selectedTransferUser = user;
            }
            else {
              ngDialog.open({
                  template: "The user is not valid",
                  plain: true
              });       
            }
          },
          (err)=>{
            ngDialog.open({
                template: "The user is not member of Doglogbook",
                plain: true
            });
          });

      }

    }

    function addShareUser(selectedUser){
      var newShareUser = {};

      if (vm.selectedUser && 
          vm.selectedShareUserType &&
          vm.newSharePetsFiltered &&
          vm.newSharePetsFiltered.length > 0){


      newShareUser.shareUserId = vm.selectedUser.id;
      newShareUser.shareUserType = vm.selectedShareUserType.id;
      
      newShareUser.sharePets = vm.newSharePetsFiltered.map((e) => {
        return { "petId" : e }
      });


      UserService.addShareUser(newShareUser).then(
        (result) => {

          ngDialog.open({
              template: "You have shared successfully",
              plain: true
          });

          init();

        },
        (error) => {
          ngDialog.open({
              template: "Error, please try again later.",
              plain: true
          });
        }
      );



      }
      else {
        ngDialog.open({
            template: "Please complete all the required fields.",
            plain: true
        });
      }

    }

    function updateShareUser(shareUser){
      var updateShareUser = {};

      if (shareUser && 
          shareUser.sharePets &&
          shareUser.sharePets.length > 0){


      updateShareUser.shareUserId = shareUser.shareUserId;
      updateShareUser.shareUserType = shareUser.shareUserType
      updateShareUser.sharePets = 
         _.chain(vm.updateSharePets[shareUser.id]).keys()
          .value()
          .filter((e)=> { 
            return vm.updateSharePets[shareUser.id][e] == true  
          })
          .map((e) => {
            return { "petId" : e }
          });


      UserService.updateShareUser(shareUser.id, updateShareUser).then(
        (result) => {

          ngDialog.open({
              template: "You have updated successfully",
              plain: true
          });

          init();

        },
        (error) => {
          ngDialog.open({
              template: "Error, please try again later.",
              plain: true
          });
        }
      );



      }
      else {
        ngDialog.open({
            template: "Please complete all the required fields.",
            plain: true
        });
      }

    }


    function removeShareUser(shareUser){

      if (shareUser){

      ngDialog.openConfirm({
            template:'\
                <p>Are you sure you want to remove the user?</p>\
                <div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">No</button>\
                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">Yes</button>\
                </div>',
            plain: true,
        }).then(function (value) {

          UserService.removeShareUser(shareUser.id).then(
            (result) => {
              init();

              ngDialog.open({
                  template: "You have removed a user successfully",
                  plain: true
              });

            },
            (error) => {
              ngDialog.open({
                  template: "Error, please try again later.",
                  plain: true
              });
            }
          );
        });


      }
    }

    function transferShareUser(selectedTransferUser){
      var transferShareUser = {};

      if (vm.selectedTransferUser && 
          vm.transferSharePetsFiltered &&
          vm.transferSharePetsFiltered.length > 0){


        ngDialog.openConfirm({
              template:'\
                  <p>Are you sure you want to transfer?</p>\
                  <div class="ngdialog-buttons">\
                      <button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">No</button>\
                      <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">Yes</button>\
                  </div>',
              plain: true,
          }).then(function (value) {

            transferShareUser.shareUserId = vm.selectedTransferUser.id;
            transferShareUser.shareUserType = 1; // as a default value
            transferShareUser.sharePets = vm.transferSharePetsFiltered.map((e) => {
              return { "petId" : e }
            });

            UserService.transferShareUser(transferShareUser).then(
              (result) => {
                init();

                ngDialog.open({
                    template: "You have transfered successfully",
                    plain: true
                });

              },
              (error) => {
                ngDialog.open({
                    template: "Error, please try again later.",
                    plain: true
                });
              }
            );
          });

      }
      else {
        ngDialog.open({
            template: "Please complete all the required fields.",
            plain: true
        });
      }

    }

    function getUserName(user){
      var desc = '';
      
      if (user.firstName)
        desc += user.firstName;

      if (user.lastName)
        desc += ' ' +  user.lastName;

      return desc;
    }

    function getUserFullDesc(user){
      var desc = '';

      if (user){
        if (user.firstName)
          desc += user.firstName;

        if (user.lastName)
          desc += ' ' +  user.lastName;

        return desc;
      }
      else {
        return "";
      }
      
    }

    function getShareUserDetails(item){
      var desc = '';
      

      if (item && item.shareUser){
        if (item.shareUser.firstName)
          desc += item.shareUser.firstName;

        if (item.shareUser.lastName)
          desc += ' ' +  item.shareUser.lastName;
      }

      return desc;
    }

    function getBreedNames(petBreeds){
      if (petBreeds && petBreeds.length == 1){
        return petBreeds[0].breed.name; 
      }
      else if (petBreeds && petBreeds.length > 1){
        return translations.HomeMsgMixedBreed;
      }
      else {
        return translations.HomeMsgBreedNotSet;
      }
    }

    function getPetAge(dateOfBirth){
      if (dateOfBirth){
        var now = moment(new Date());  //todays date
        var end = moment(dateOfBirth); // another date
        var duration = moment.duration(now.diff(end));
        return duration.years();
      }
      else { 
        return "";
      }
    }

    function getSexType(sexId){
      var gender = GenderService.get(sexId)
      return gender.name || "";
    }

    function getShareUserTypeDetails(item){
      if (item && item.shareUserType){
        var value = ShareUserTypeService.get(item.shareUserType);
        return (value)?value.name:"";
      }
      else {
        return "";
      }
    }

  }

})();