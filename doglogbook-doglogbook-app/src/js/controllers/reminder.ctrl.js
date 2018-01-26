(function(){
  'use strict';

  angular.module('app.controllers')
  .controller('ReminderCtrl',function($scope,parameters){
    var vm = this;

    vm.cancel = cancel;
    vm.set = set;

    function init(){
      var viewForm = {
        date: null,
        treatment:null,
        frecuency:null,
        active:false
      }
      vm.reminder = angular.copy(viewForm);
    }

    function cancel(){
      init();
      vm.closeModal();
    }

    function set(){

    }


  });

})();

