(function(){
  'use strict';
  
  angular.module('app.controllers')
  .controller('InitialActivityRateCtrl',InitialActivityRateCtrl);

  function InitialActivityRateCtrl(
    $rootScope, $scope, $state, $stateParams,
    $ionicLoading, PopupFactory,ErrorMapper,LoadingMsg,
    PetService,
    activityEvents, activityRates, 
    config, translations) {

    var vm = this;

    // defaults
    vm.activityEvents = _.sortBy(activityEvents, ['reportId', 'event.name']);
    vm.activityRates  = activityRates;

    // methods
    vm.reportEventRatesChange = reportEventRatesChange;
    vm.getRateValueByRange = getRateValueByRange;
    vm.save = save;

    function init(){

      vm.rateNotApplicables = {};
      vm.heatmapValues = {};
      vm.rateRanges = [];

      // setting default 'Not Applicable' option
      vm.activityNotApplicableRates  = activityRates.filter((x)=> { return x.name.indexOf('Not applicable')==0});;
      if (vm.activityNotApplicableRates && vm.activityNotApplicableRates.length >= 0){
        vm.activityRateNotApplicable = vm.activityNotApplicableRates[0];   
      }  

      // All valid rates
      vm.activityRates  = _.chain(activityRates)
                          .filter((x)=> { return (x.name.indexOf('Not applicable')==-1) })
                          .orderBy(['order'],['desc'])
                          .value();

      // Preparing valid ranges
      if (vm.activityRates && vm.activityRates.length > 0){
        var ratesLength = vm.activityRates.length;
        vm.rateRanges = _.range(0, 100, (100/ratesLength));
        vm.rateRanges = vm.rateRanges.slice(1, vm.rateRanges.length);
        vm.rateRanges[vm.rateRanges.length - 1] = 100;

        vm.rateRanges = _.map(vm.rateRanges,(x, index)=>{
          return {
            range: x,
            id: vm.activityRates[index].id,
            name: vm.activityRates[index].name
          }
        });

        vm.rateRangesMin = vm.rateRanges[0].name || '';
        vm.rateRangesMax = vm.rateRanges[vm.rateRanges.length-1].name || '';

        vm.activityEvents.forEach((e)=>{
          vm.heatmapValues[e.id] = 0;
        })

      }
    }

    $scope.$on('$ionicView.beforeEnter',() => {

      init();

       if ($stateParams.id) {
          vm.selectedPetId = $stateParams.id;
       } 
       else {

          PopupFactory.show('show',{
            title:'',
            template: translations.InitialActivityRatePetError,    
            buttons: [
              {
                text: translations.CommonOk,
                type:'button-assertive',
                onTap:function(e){
                  $state.go(config.homeState);
                }
              }
            ]
          });
       }
      
    });

    function reportEventRatesChange(){

    }


    function getRateValueByRange(heatmapValue){
      var range = null;

      if (heatmapValue >= 0){
        var rangeValue = heatmapValue;
        _.forEach(vm.rateRanges, (x, index)=> {
          if (index == 0 && rangeValue <= x.range){
            range = vm.rateRanges[0];
          }
          else if (index > 0 && rangeValue >= vm.rateRanges[index-1].range && rangeValue <= x.range){
            range =  x;
          }
        })
      }
      else {
        if (!range){
          range = heatmapValue;
        }
      }
      return range;
    }

    function save(){

      // Activities

     var ratedActivities = _.chain(vm.heatmapValues).keys()
        .value()
        .filter((e)=> { 
          return vm.heatmapValues[e] || vm.heatmapValues[e] == 0
        })
        .map((e) => {

          var rate = {};
          if (vm.rateNotApplicables[e]){
            // not applicable option
            rate = vm.activityRateNotApplicable
          }
          else {
            rate = vm.getRateValueByRange(vm.heatmapValues[e]);
          }

          return { 
            'reportEventId' : parseInt(e),
            'rateId' : (rate)?rate.id:1
          }
      });




      if (ratedActivities){

        $ionicLoading.show();

        PetService.setBulkActivityRates(vm.selectedPetId,ratedActivities).then(
          (response) => {

            $ionicLoading.hide();

            PopupFactory.show('show',{
              title:'',
              template: translations.InitialActivityRateMsgOk,    
              buttons: [
                {
                  text: translations.CommonOk,
                  type:'button-assertive',
                  onTap:function(e){
                    $state.go(config.homeState);
                  }
                }
              ]
            });

          },
          (error) => {

            $ionicLoading.hide();

            var errorMsg = '';
            errorMsg = ErrorMapper.getErrorMsgs(error) || translations.InitialActivityRateMsgError;

            PopupFactory.show('show',{
              title:'',
              template: errorMsg,    
              buttons: [
                {
                  text: translations.CommonOk,
                  type:'button-assertive',
                  onTap:function(e){
                    $state.go(config.homeState);
                  }
                }
              ]
            });


          }
        );
      }


    }


  }

})();