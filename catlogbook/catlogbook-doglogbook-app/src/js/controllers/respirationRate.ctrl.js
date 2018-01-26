(function(){
  'use strict';

  angular.module('app.controllers')
  .controller('RespirationRatesCtrl',RespirationRatesCtrl);

    function RespirationRatesCtrl(
        $scope, $state, 
        PopupFactory, ErrorMapper, LoadingMsg,
        PetService,
        userPets, 
        config, translations){

    var vm = this;

    // methods
    vm.hasResults = hasResults;
    vm.getDurationFormat = getDurationFormat;
    vm.petChange  = petChange;
    vm.remove  = remove;

    function initForms(){

      vm.selectedPet = null;
      vm.results = [];
      vm.pets = userPets;
    }

    $scope.$on('$ionicView.beforeEnter', function() {
      initForms();   
    });    

    function getDurationFormat(min){
      var strResult = '',
          minutes   = moment.duration(parseInt(min), "minutes").minutes(),
          hours     = moment.duration(parseInt(min), "minutes").hours();

      strResult += hours + ' '   + translations.CommonHours;
      strResult += ' ';
      strResult += minutes + ' ' + translations.CommonMinutes;

      return strResult;    
    }

    function petChange(pet){
      vm.selectedPet = pet;

      var getOptions = {
      };

      LoadingMsg.show();
      PetService.getRespirationRate(vm.selectedPet.id, getOptions).then(
        (results) => {
          LoadingMsg.hide();
          vm.results = results;
        },
        (error) => {
          LoadingMsg.hide();

          var errorMsg = '';
          errorMsg = translations.RespirationRateMsgGetError;

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

        }
      );

    }

    function remove(id){
      if (vm.selectedPet && id){
        PopupFactory.show('show',{
          title:'',
          template: translations.CommonMsgAreYouSure,    
          buttons: [
            {
              text: translations.CommonCancel,
              type:'button-outline',
              onTap:function(e){ }
            },
            { 
              text: translations.CommonOk,
              type:'button-assertive',
              onTap:function(e){
                PetService.removeRespirationRate(vm.selectedPet.id, id).then(
                  function(result){
                    initForms();
                });

              }
            }
          ]
        });
      }
    }

    function hasResults(){
      return (
        vm.selectedPet && 
        vm.results && vm.results.length > 0);
    }


  }

})();

