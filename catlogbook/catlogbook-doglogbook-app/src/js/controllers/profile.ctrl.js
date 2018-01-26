(function(){
  'use strict';

  angular.module('app.controllers')
  .controller('ProfileCtrl',ProfileCtrl);

  function ProfileCtrl(
    $scope, $state, $ionicScrollDelegate,
    $ionicLoading,PopupFactory,UserService,
    userInfo, countries,
    translations,config){

    var vm = this;

    // methods
    vm.update = update;

    function init() {

      vm.userInfo = userInfo;
      vm.countries = countries;
      vm.selectedCountry = null;

      if (vm.userInfo && vm.userInfo.countryId){
        vm.selectedCountry = getCountryById(vm.userInfo.countryId)
      }

      if (vm.userInfo && vm.userInfo.children13 >= 0){
        vm.children13 = vm.userInfo.children13;
      }

      if (vm.userInfo && vm.userInfo.teens >= 0){
        vm.teens = vm.userInfo.teens;
      }

      if (vm.userInfo && vm.userInfo.adults >= 0){
        vm.adults = vm.userInfo.adults;
      }

      if (vm.userInfo && vm.userInfo.seniors >= 0){
        vm.seniors = vm.userInfo.seniors;
      }

      if (vm.userInfo && vm.userInfo.postCode){
        vm.postCode = vm.userInfo.postCode;
      }

    }


    $scope.$on('$ionicView.beforeEnter', function() {

      init();

    });


    function update(){

      if (vm.selectedCountry){
        $ionicLoading.show();

        var userData = {
          "postCode": vm.postCode,
          "children13": vm.children13 || 0,
          "teens":   vm.teens || 0,
          "adults":  vm.adults || 0,
          "seniors": vm.seniors || 0,
          "countryId": vm.selectedCountry.id
        };


        UserService.setUserQuestion(userData).then(
          (response) => {

            // Saving Symptom
            $ionicLoading.hide();
            PopupFactory.show('show',{
              title:'',
              template: translations.ProfileUpdateOk,
              buttons: [
                {
                  text: translations.CommonOk,
                  type:'button-assertive',
                  onTap:function(e){
                    vm.formData = {};

                    $state.go(config.homeState);
                  }
                }
              ]
            });
          },
          (errors) => {

            $ionicLoading.hide();

            var errorMsg = '';
            errorMsg = translations.ProfileUpdateError;

            PopupFactory.show('show',{
              title:'',
              template: errorMsg,
              buttons: [
                {
                  text: translations.CommonOk,
                  type:'button-assertive',
                  onTap:function(e){

                  }
                }
              ]
            });

          });
      }



    }

    function getCountryById(id) {
      return vm.countries.find((g) => {
        return g.id == id
      });
    }

  }

})();
