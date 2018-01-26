(function(){
  'use strict';

  angular.module('app.controllers')
  .controller('AddActivityCtrl',function(
    $ionicPlatform, $scope, $state, $timeout, 
    $ionicScrollDelegate, $ionicActionSheet,
    $stateParams, PetService,ErrorMapper,TimeService,
    reports, activityEvents, activityRates,
    $ionicLoading, PopupFactory, 
    config, translations){

    var vm = this;

    // defaults
    vm.maxActivityDurationMin = config.maxActivityDurationMin;

    // methods
    vm.save = save;
    vm.locationTypeChange = locationTypeChange;

    $scope.$watch('vm.formData.reportEvent',(value)=> {
      if (value) {
        vm.formData.reportEventDisplayName = vm.getActivityOption(value);
        
        if (vm.selectedPetId && value.id){
          getLastActivity(vm.selectedPetId, value.id)
        }
      }
      else {
        vm.formData.reportEventDisplayName = translations.CommonSelect;
      }
    })

    function initForms(){

      $ionicScrollDelegate.scrollTop();
      
      vm.entry = {};
      vm.selectedPet = null;
      vm.reports = reports;
      vm.allEvents = activityEvents;
      vm.activityEvents = vm.allEvents;
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
      }
                       

      vm.getActivityOption = getActivityOption;
      vm.getDurationFormat = getDurationFormat;
      vm.noApplicableRangeHandler = noApplicableRangeHandler;
      vm.getRateValueByRange = getRateValueByRange;

      // Creation
      vm.formData = {};
      vm.formData.dateRegistered = new Date();      
      if (vm.reports && vm.reports.length > 0){
        vm.formData.locationType = vm.reports[0];
        locationTypeChange();
      }
      vm.formData.symptomTypeId = null;
      vm.formData.symptomFrequencyId = null;
      vm.formData.rateNotApplicable = false;

      vm.formData.heatmapValue = 0;
      vm.formData.durationHours = 0;
      vm.formData.durationMinutes = 0; 

      // Last Entry
      vm.lastEntry = null;
    }

    $scope.$on('$ionicView.beforeEnter', function() {

      initForms();

      if ($stateParams.id) {
        vm.selectedPetId = $stateParams.id;
      }

    });    



    function save(formData){
      var newActivity = {},
          petId = null,
          rateValue = {};

      if (!formData.reportEvent){

        PopupFactory.show('show',{
          title:'',
          template: translations.CommonMsgCompleteFields,    
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
      else {


          petId = vm.selectedPetId;
          newActivity.dateRegistered = TimeService.dateToString(formData.dateRegistered);
          newActivity.comment       = formData.comment;

        if (vm.lastEntry && vm.lastEntry.useSameEntry == true) {

          newActivity.rateId        = vm.lastEntry.rate.id;
          newActivity.reportEventId = vm.lastEntry.reportEvent.id;
          newActivity.duration      = vm.lastEntry.duration;    

        }
        else {

          rateValue = getRateValueByRange();
          newActivity.rateId        = rateValue.id;
          newActivity.reportEventId = formData.reportEvent.id;

          var totalMinutes = 0;
          totalMinutes += (parseInt(vm.formData.durationHours) * 60);
          totalMinutes += parseInt(vm.formData.durationMinutes);

          newActivity.duration      = totalMinutes;     
        }



        $ionicLoading.show();

        PetService.setActivityRate(petId,newActivity).then(
          (response) => {

            // Saving ActivityRate
            $ionicLoading.hide();
            PopupFactory.show('show',{
              title:'',
              template: translations.AddActivityMsgSetOk,    
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
            errorMsg = ErrorMapper.getErrorMsgs(errors) || translations.AddActivityMsgSetError;

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

    }

    function getLastActivity(petId, reportEventId){

      var getOptions = {
        reportEventId: reportEventId
      };

      $ionicLoading.show();

      PetService.getLastActivityRate(petId,getOptions).then(
          (response) => {

            $ionicLoading.hide();

            if (response){
              vm.lastEntry = response;
              vm.lastEntry.useSameEntry = true;              
            }
            else {
              vm.lastEntry = null;
            }
          },
          (errors) => {

            $ionicLoading.hide();

            vm.lastEntry = null;
          
          }
        );

    }

    function getRateValueByRange(){
      var range = null;

      if (vm.formData.heatmapValue != null && vm.formData.heatmapValue >= 0){
        var rangeValue = vm.formData.heatmapValue;
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
          range = vm.formData.heatmapValue;
        }
      }
      return range;
    }

    function locationTypeChange(){
      if (vm.formData.locationType){

        vm.formData.reportEvent = null;
        vm.activityEvents = vm.allEvents.filter((x) => {
          return (x.reportId == vm.formData.locationType.id);
        });
      }
    }

    function noApplicableRangeHandler(notApplicableValue){
      if (notApplicableValue){
        vm.formData.heatmapValue = vm.activityRateNotApplicable;
      }
      else {
        vm.formData.heatmapValue = 0;
      }
    }

    function getActivityOption(option){
      if (option && option.report && option.event)
        return (option.event.name);
      else 
        return "";
    }

    function getDurationFormat(min){
      var strResult = '',
          minutes   = moment.duration(parseInt(min), "minutes").minutes(),
          hours     = moment.duration(parseInt(min), "minutes").hours();

      strResult += hours + ' '   + translations.CommonHours;
      strResult += ' ';
      strResult += minutes + ' ' + translations.CommonMinutes;

      return strResult;    
    }


  });
})();

