(function() {
  'use strict';

  angular.module('app')
  .factory('TimeService',TimeService);

  function TimeService(config){
    var service = this;
    
    // methods
    service.formatToDatetime    = formatToDatetime;
    service.dateToString        = dateToString;
    service.dateAndTimeToDate   = dateAndTimeToDate;
    service.dateAndTimeToFormat = dateAndTimeToFormat;

    return service;

    function formatToDatetime(strDate){
      return moment(strDate, config.apiDateTimeFormat);
    }

    function dateToString(date){
      return moment(date).format(config.apiDateTimeFormat);
    }

    function dateAndTimeToDate(date, time){
      var newDate = moment(date)
          .hour(moment(time, "HH:mm").format('HH'))
          .minutes(moment(time, "HH:mm").format('mm'));

      return newDate;
    }

    function dateAndTimeToFormat(date, time){
      var newDate = dateAndTimeToDate(date,time);
      return newDate.format(config.apiDateTimeFormat);
    }

  }

})();