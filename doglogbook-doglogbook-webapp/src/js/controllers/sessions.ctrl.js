(function(){
  'use strict';
  
  angular.module('app.controllers')
  .controller('SessionCtrl',SessionCtrl);

  function SessionCtrl(
    $rootScope, $scope, $state, $filter,$stateParams,ngDialog,
    BagService,PetService,
    translations, config) {

    var vm = this;

    // methods
    vm.dateFormatLocal = dateFormatLocal;
    vm.getDurationFormat = getDurationFormat;
    vm.getTitleDetails = getTitleDetails;
    vm.displayReward = displayReward;
    vm.remove = remove;

    // dependencies

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

    function init(){
      vm.results = [];
    }

    function getResults(id, datePeriod){

      var getOptions = {
        period: datePeriod
      };

      PetService.getSession(vm.selectedPet.id,getOptions).then(
        (results) => {
          vm.results = results;
        },
        (error) => {
          var errorMsg = '';
          errorMsg = "Cannot get Sessions";

          ngDialog.open({
              template: errorMsg,
              plain: true
          });
        }
      );

    }

    function displayReward(item){
      if (item.reward){
        return item.reward.name;
      }
      else {
        return item.name;
      }
    }

    function dateFormatLocal(date){
      if (date)
        return moment(moment.utc(moment.utc(date).format('YYYY-MM-DD HH:mm')).toDate()).format('YYYY-MM-DD HH:mm');
    }    

    function getTitleDetails(item){
      return item.sessionType.name + ' - ' + getDurationFormat(item.duration);
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
                  <p>Are you sure you want to delete this record?</p>\
                  <div class="ngdialog-buttons">\
                      <button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">No</button>\
                      <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">Yes</button>\
                  </div>',
              plain: true,
          }).then(function (value) {

            PetService.removeSession($rootScope.selectedPet.id, id).then(
              (result) => {

                getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);
                
                ngDialog.open({
                    template: "You have deleted successfully",
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