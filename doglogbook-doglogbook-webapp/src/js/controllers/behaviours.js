(function(){
  'use strict';
  
  angular.module('app.controllers')
  .controller('BehavioursCtrl',BehavioursCtrl);

  function BehavioursCtrl(
    $rootScope, $scope, $state, $filter,$stateParams,
    BagService,BehaviourService,UserService,
    userPets,types,ngDialog,
    translations, config) {

    var vm = this;

    // methods
    vm.eventChange = eventChange;
    vm.getDurationFormat = getDurationFormat;
    vm.getTitleDetails = getTitleDetails;
    vm.dateFormatLocal = dateFormatLocal;
    vm.remove = remove;

    // dependencies
    vm.userPets = userPets;
    vm.types = types;

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
      vm.selectedPetBehaviours = [];
    }

    function getResults(id, datePeriod){

      var getOptions = {
        period: datePeriod
      };

      BehaviourService.getBehaviours(vm.selectedPet.id,getOptions).then(
        (results) => {
          vm.results = results;


          vm.selectedPetBehaviours = _.chain(vm.results)
          .map((r)=> {
            return r.behaviourType;
          })
          .uniqWith(_.isEqual)
          .value();

          // only events in use
          vm.types = vm.selectedPetBehaviours;


        },
        (error) => {
          var errorMsg = '';
          errorMsg = translations.BehavioursMsgGetError;

          ngDialog.open({
              template: errorMsg,
              plain: true
          });
        }
      );

    }

    function eventChange(type){

      if (type && vm.results){

        vm.filteredTypes = _.chain(vm.results)
        .filter((e) => {
          return (e.behaviourTypeId == type.id)
        })
        .orderBy(['dateRegistered'],['asc'])
        .value();

        $scope.labels = _.chain(vm.filteredTypes)
        .groupBy((e) => {
          return moment(e.dateRegistered).weekday(7).format("DD/MM/YY");
        })
        .keys()
        .value();


        vm.data = _.chain($scope.labels)
          .map((e) => {
            return (e.length);
          })
          .value();

        $scope.options = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
              xAxes: [{
                  scaleLabel: {
                      display: true,
                      labelString: 'Weeks ending on'
                  },
                  ticks: {
                      max: 7,
                      min: 0,
                      stepSize: 1
                  }
              }],
              yAxes: [{
                  scaleLabel: {
                      display: true,
                      labelString: 'Occurrences'
                  }
              }]
          }
        };
        $scope.series = ['Behaviours'];
        $scope.data = [];
        $scope.data.push(vm.data);

      }

    }

    function getTitleDetails(item){
      return item.behaviourType.name;
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

            BehaviourService.remove($rootScope.selectedPet.id, id).then(
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