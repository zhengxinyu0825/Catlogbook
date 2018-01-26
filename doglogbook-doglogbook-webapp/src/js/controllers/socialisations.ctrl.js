(function(){
  'use strict';
  
  angular.module('app.controllers')
  .controller('SocialisationsCtrl',SocialisationsCtrl);

  function SocialisationsCtrl(
    $rootScope, $scope, $state, $filter,$stateParams,ngDialog,
    BagService,PetService,UserService,
    userPets,
    translations, config) {

    var vm = this;

    // methods
    vm.getDurationFormat = getDurationFormat;
    vm.getTitleDetails = getTitleDetails;
    vm.dateFormatLocal = dateFormatLocal;    
    vm.remove = remove;    

    // dependencies
    vm.userPets = userPets;

    // defaults
    init(); 

    $scope.$on('period-change', function(event, args) {
      init();
      getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);
    });

    if ($rootScope.selectedPet){
      vm.selectedPet = $rootScope.selectedPet;
      getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);
    }

    function dateFormatLocal(date){
      if (date)
        return moment(moment.utc(moment.utc(date).format('YYYY-MM-DD HH:mm')).toDate()).format('YYYY-MM-DD HH:mm');
    }

    function init(){
      vm.results = [];
      vm.selectedType = null;
      vm.filteredTypes = [];
    }

    function getResults(id, datePeriod){

      var getOptions = {
        period: datePeriod
      };

      PetService.getSocialisation(vm.selectedPet.id,getOptions).then(
        (results) => {
          vm.results = results;
        },
        (error) => {
          var errorMsg = '';
          errorMsg = translations.SocialisationsMsgGetError;

          ngDialog.open({
              template: errorMsg,
              plain: true
          });
        }
      );

    }

    function getTitleDetails(item){
      var dateFormat = $filter('date')(item.dateCreated, "d MMM HH:mm");
      return dateFormat;
    }

    function getDurationFormat(min){
      var strResult = '',
          minutes   = moment.duration(parseInt(min), "minutes").minutes(),
          hours     = moment.duration(parseInt(min), "minutes").hours();

      strResult += hours + ' hs';
      strResult += ' ';
      strResult += minutes + ' min';

      return strResult;    
    }

    function remove(id){
      if (id){
        ngDialog.openConfirm({
              template:'\
                  <p>Are you sure you want to remove?</p>\
                  <div class="ngdialog-buttons">\
                      <button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">No</button>\
                      <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">Yes</button>\
                  </div>',
              plain: true,
          }).then(function (value) {

            PetService.removeSocialisation($rootScope.selectedPet.id, id).then(
              (result) => {

                getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);
                
                ngDialog.open({
                    template: "You have removed successfully",
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

  }

})();