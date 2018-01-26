(function() {
  'use strict';

  angular.module('app')
  .factory('ReminderService',ReminderService);

  function ReminderService($q, $cordovaCalendar, TimeService){
    var service = this;

    // methods
    service.set        = set;
    service.setBulk    = setBulk;
    service.remove     = remove;
    service.removeBulk = removeBulk;

    return service;

    function set(title, notes, startDate, endDate, isInteractive) {
      var defer = $q.defer();

       var uniqueTitle = title + ' - DLG' + startDate.format('YYYYMMDDHHmmss');
       var event = {
          title: uniqueTitle,
          notes: notes,
          startDate: startDate,
          endDate:   moment(endDate).add(60,"minutes").toDate()
        };

       if (isInteractive){
        
         $cordovaCalendar.createEventInteractively(event).then(
          (result) => {

           // In Android prevent Calendar Cancel button event creation.
           var isAndroid = ionic.Platform.isAndroid();
           if (isAndroid){
            $cordovaCalendar.findEvent({title: event.title}).then(
              (eventFound) => {
                defer.resolve(JSON.stringify(event));
              },
              (err) => {
                defer.reject(err);
              });
           }
           else {
             defer.resolve(JSON.stringify(event));
           }

          },
          (err) => {
            defer.reject(err);
          });
       } 
       else {
         $cordovaCalendar.createEvent(event).then(
          (result) => {
            defer.resolve(JSON.stringify(event));
          },
          (err) => {
            defer.reject(err);
          });
       }

      return defer.promise;
    }


    function setBulk(title, notes, reminders) {
      var defer = $q.defer();
      var promises = [];

      var bulkReminders = reminders;

      $q.all(reminders.map((e) => {
          return set(
                title,notes,
                TimeService.formatToDatetime(e.doseDateTime),
                TimeService.formatToDatetime(e.doseDateTime));
        })).then(
        (result) => {

          // all promises returned ok
          if (result && result.length > 0 && 
             (result.length == _.chain(result).without(undefined).value().length) ){

            // Setting event result obj.
            bulkReminders = reminders.map((e,index) => { 
              e['jsonObj'] = result[index];
              return e;
            });

           defer.resolve(bulkReminders);
          }
          else {
            defer.reject();
          }

        },
        (err) => {
          defer.reject(err);
        }
      );

      return defer.promise;
    }

    function remove(event){

      var eventToDelete = {
        newTitle: event.title,
        startDate: event.startDate,
        endDate: moment(event.startDate).add(3,"years").toDate()
      };

       return $cordovaCalendar.deleteEvent(eventToDelete);
    }

    function removeBulk(reminders) {
      var defer = $q.defer();
      var promises = [];
      var filteredReminders = [];

      filteredReminders = reminders.filter((e) => {
        return (e["jsonObj"]);
      });

      if (filteredReminders && filteredReminders.length == 0){
        defer.resolve();
      }
      else {

        $q.all(filteredReminders.forEach((e) => {
            var promise = remove(e["jsonObj"]);
            promises.push(promise);
        })).then(
          (result) => {
           defer.resolve(result);
          },
          (err) => {
            defer.reject(err);
          }
        );
      }

      return defer.promise;
    }


  }

})();