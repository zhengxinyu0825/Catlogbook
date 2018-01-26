(function(){
  'use strict';

  angular.module('app.controllers')
  .controller('ActivitiesCtrl',ActivitiesCtrl);

  function ActivitiesCtrl(
    $rootScope, $scope, $state, $filter,$stateParams,
    BagService,PetService,UserService,GenderService,
    userPets,activityEvents,breeds,
    ngDialog ,
    translations, config) {

    var vm = this;

    // methods
    vm.getDurationFormat = getDurationFormat;
    vm.getActivityFullName = getActivityFullName;
    vm.dateFormatLocal = dateFormatLocal;
    vm.addCondition = addCondition;
    vm.removeCondition = removeCondition;
    vm.compareBreedChange = compareBreedChange;
    vm.ageTypeChange = ageTypeChange;
    vm.remove = remove;
    vm.compare = compare;
    vm.avgByChange = avgByChange;
    vm.valueByChange = valueByChange;

    // dependencies
    vm.userPets = userPets;
    vm.activityEvents = activityEvents;
    vm.breeds = breeds;

    // defaults
    init();

    $scope.$on('period-change', function(event, args) {
      init();
      getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);
      getCompareResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);
    });

    if ($rootScope.selectedPet){
      vm.selectedPet = $rootScope.selectedPet;
      getResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);
    }

    function dateFormatLocal(date){
      if (date)
        return moment(date).format("DD/MM/YY");
    }

    function init(){

      vm.results = [];
      vm.selectedActivity = null;
      vm.selectedPetActivities = [];
      vm.filteredActivities = [];
      vm.chartConditions = [];

      // compare section
      vm.comparisonResult = null;

      $scope.compMyDogActivitiesData = null;
      $scope.compMyDogActivitieslabels = null;
      $scope.compMyDogActivitiesColors = null;

      $scope.compOthersActivitiesData = null;
      $scope.compOthersActivitieslabels = null;
      $scope.compOthersActivitiesColors = null;

      vm.avgBy = [
        { id: 1, name:'day' },
        { id: 2, name:'week' }
      ];
      vm.selectedAvgBy = vm.avgBy[1];

      vm.valuesBy = [
        { id: 1, name:'rate' },
        { id: 2, name:'time spent' }
      ];
      vm.selectedValuesBy = vm.valuesBy[0];

      vm.breedPercentages = [
        { id: 100, name:'100%' },
        { id: 75,  name:'75%' },
        { id: 50, name:'50%' },
        { id: 25, name:'25%' }
      ];
      vm.ageTypes = [
        { id: 1, name:'year' },
        { id: 2,  name:'month' }
      ];
      vm.ageRanges = [];
      vm.ageRangesYears = [
        { id: 1,  name:'+/- 1' },
        { id: 2,  name:'+/- 2' },
        { id: 3,  name:'+/- 3' }
      ];
      vm.ageRangesMonths = [
        { id: 1,  name:'+/- 1' },
        { id: 2,  name:'+/- 2' },
        { id: 3,  name:'+/- 3' },
        { id: 4,  name:'+/- 4' },
        { id: 5,  name:'+/- 5' },
        { id: 6,  name:'+/- 6' },
        { id: 7,  name:'+/- 7' },
        { id: 8,  name:'+/- 8' },
        { id: 9,  name:'+/- 9' },
        { id: 10,  name:'+/- 10' },
        { id: 11,  name:'+/- 11' },
        { id: 12,  name:'+/- 12' }
      ];
      vm.petSexs = GenderService.getAll();
      vm.selectedCompareActivity = null;
      vm.selectedCompareBreed = null;
      vm.selectedCompareBreedPercentage = null;
      vm.selectedCompareAgeType = null;
      vm.selectedCompareAgeRange = null;
      vm.selectedCompareSex = null;
    }



    function getCompareResults(id, datePeriod){

      if (vm.selectedCompareActivity){
        var getOptions = {
          reportEventId: vm.selectedCompareActivity.id,
          period: datePeriod,
        };

        if (vm.selectedCompareBreed){
          getOptions['breedId'] = vm.selectedCompareBreed.id;

          if (vm.selectedCompareBreedPercentage){
            getOptions['breedPercentage'] = vm.selectedCompareBreedPercentage.id;
          }
        }

        if (vm.selectedCompareAgeRange){
          var rangeValue = vm.selectedCompareAgeRange.id;
          getOptions['ageRange'] = (rangeValue * ((vm.selectedCompareAgeType.id == 1)?12:1));
        }

        if (vm.selectedCompareSex){
          getOptions['petSex'] = vm.selectedCompareSex.id;
        }


        PetService.getActivityComparision(vm.selectedPet.id,getOptions).then(
          (result) => {

            $scope.compMyDogActivitieslabels = ["My Dog",""];
            $scope.compMyDogActivitiesColors = ["#41c2f3","#f5f5f5"];

            $scope.compOthersActivitieslabels = ["Others",""];
            $scope.compOthersActivitiesColors = ["#929292","#f5f5f5"];

            if (result &&
                result.petResult &&
                result.otherResult &&
                result.petResult >= 0 &&
                result.otherResult >= 0){
              vm.comparisonResult = result;

              var roundPetResult = Math.round( result.petResult * 10 ) / 10;
              var roundOtherResult = Math.round( result.otherResult * 10 ) / 10;
              $scope.compMyDogActivitiesData = [roundPetResult,6 - roundPetResult];
              $scope.compOthersActivitiesData = [roundOtherResult, 6 - roundOtherResult];

            }
            else {
              vm.comparisonResult = null;

              $scope.compMyDogActivitiesData = [0,0];
              $scope.compOthersActivitiesData = [0,0];


              ngDialog.open({
                  template: "No results",
                  plain: true
              });
            }
          },
          (error) => {
            ngDialog.open({
                template: "Error, cannot get results",
                plain: true
            });
          }
        );
      }
    }

    function getResults(id, datePeriod){

      var getOptions = {
        period: datePeriod
      };

      PetService.getActivityRate(vm.selectedPet.id,getOptions).then(
        (results) => {
          vm.results = results;

          vm.selectedPetActivities = _.chain(vm.results)
          .map((r)=> {
            return r.reportEvent;
          })
          .uniqWith(_.isEqual)
          .value();

          // only events in use
          vm.activityEvents = vm.selectedPetActivities;

        },
        (error) => {
          var errorMsg = '';
          errorMsg = translations.ActivitiesMsgGetError;

          ngDialog.open({
              template: errorMsg,
              plain: true
          });
        }
      );

    }

    function addCondition(selectedActivity){
      if (selectedActivity && _.find(vm.chartConditions, (x)=> { return x.id == selectedActivity.id }) == undefined){
        vm.chartConditions.push(selectedActivity);
        vm.selectedActivity = null;

        resetChartData();
      }
    }

    function removeCondition(selectedActivity){
      _.remove(vm.chartConditions, (x)=> { return x.id == selectedActivity.id });
      resetChartData();
    }

    function avgByChange(selectedAvgBy){
      if (selectedAvgBy){
        resetChartData();
      }
    }

    function valueByChange(selectedValueBy){
      if (selectedValueBy){
        resetChartData();
      }
    }

    function resetChartData(){
      var serieData = {},
          conditionIds =  [],
          chartData = {},
          xAxisTitle = '',
          yAxisTitle = '',
          groupResult = [];

      $scope.labels = [];
      $scope.series = [];
      $scope.data = [];
      chartData.datasetOverride = [];

      if (vm.chartConditions && vm.chartConditions.length > 0){

        conditionIds = vm.chartConditions.map((x)=>{ return x.id});

        vm.filteredActivities = _.chain(vm.results)
        .filter((e) => {
            return (_.indexOf(conditionIds, e.reportEvent.id) >= 0)
        })
        .orderBy(['dateRegistered'],['asc'])
        .value();

        // init data series
        chartData.labels = [];

        chartData.series = vm.chartConditions.map((x)=>{
          serieData[x.id.toString()] = {};
          return getActivityFullName(x);
        });



         if (vm.selectedValuesBy && vm.selectedValuesBy.id == 1){
            yAxisTitle = 'Rate Value';
         }
         else {
            yAxisTitle = 'Time Spent (min)';
         }


        if (vm.selectedAvgBy && vm.selectedAvgBy.id == 1){
          xAxisTitle = 'Days';

          groupResult =_.chain(vm.filteredActivities)
            .groupBy((e) => {
              return moment.utc(e.dateRegistered).format("DD/MM/YY");
            })
            .value();
        }
        else {
          xAxisTitle = 'Weeks ending on';

          groupResult =_.chain(vm.filteredActivities)
            .groupBy((e) => {
              return moment(e.dateRegistered).weekday(7).format("DD/MM/YY");
            })
            .value();
        }

        _.each(groupResult,(items,index)=> {
          chartData.labels.push(index);
        });


        _.each(groupResult,(items,index)=> {

          var tempCond = {};
         _.each(items,(item)=>{
            tempCond[item.reportEventId] = [];
          });

          _.each(items,(item)=>{

            if (vm.selectedValuesBy && vm.selectedValuesBy.id == 1){
              // Rate Value
              tempCond[item.reportEventId].push(8 - item.rate.order);
            }
            else {
              // Time Spent
              tempCond[item.reportEventId].push(item.duration);
            }


          });

          _.each(tempCond,(cond, condIndex)=>{
            var condSum = _.sum(cond);
            serieData[condIndex][index] = condSum / cond.length;
          })

        });


        chartData.data = [];
        _.values(serieData).forEach((e,index) => {

          var arrData = [];
          _.each(chartData.labels,(label)=> {


            var labelIndex = _.keys(e).indexOf(label);
            if (labelIndex >= 0){
              arrData.push(_.values(e)[labelIndex]);
            }
            else {
              arrData.push(0);
            }
          })

          chartData.data.push(arrData);
        });

        $scope.options = {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
              xAxes: [{
                  scaleLabel: {
                      display: true,
                      labelString: xAxisTitle
                  }
              }],
              yAxes: [{
                  scaleLabel: {
                      display: true,
                      labelString: yAxisTitle
                  }
              }]
          }
        };

       if (vm.selectedValuesBy && vm.selectedValuesBy.id == 1){
          // Rate Value
          $scope.options.scales.yAxes[0]["ticks"] = {
              max: 6,
              min: 0,
              stepSize: 1
          }
        }
        else {
          $scope.options.scales.yAxes[0]["ticks"] = {
              min: 0
          }
        }



        $scope.labels = chartData.labels;
        $scope.series = chartData.series;
        $scope.data = [];
        $scope.data = chartData.data;
        $scope.datasetOverride = chartData.datasetOverride;

      }
    }



    function compareBreedChange(selectedCompareBreed){
      if (!selectedCompareBreed){
        vm.selectedCompareBreedPercentage = null;
      }
    }

    function ageTypeChange(selectedCompareAgeType){
      if (selectedCompareAgeType){
        if (selectedCompareAgeType.id == 1){
          vm.ageRanges = vm.ageRangesYears;
        }
        else {
         vm.ageRanges = vm.ageRangesMonths;
        }
      }
      else {
        vm.ageRanges = null;
      }
    }

    function compare(){

      if (vm.selectedCompareActivity){
        getCompareResults($rootScope.selectedPet.id, $rootScope.selectedDatePeriod);
      }
      else {
        ngDialog.open({
            template: "Complete all required fields.",
            plain: true
        });
      }

    }

    function getActivityFullName(activity){
      return activity.report.name + ' - ' + activity.event.name;
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

            PetService.removeActivityRate($rootScope.selectedPet.id, id).then(
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
