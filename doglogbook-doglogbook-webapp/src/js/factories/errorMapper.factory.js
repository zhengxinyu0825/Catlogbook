(function() {
  'use strict';

  angular.module('app')
  .factory('ErrorMapper',ErrorMapper);

  function ErrorMapper(){
    var service = this;
    
    // methods
    service.getErrors      = getErrors;
    service.getErrorMsgs   = getErrorMsgs;


    return service;

    function getErrors(error) {
        var errors = [];
        if (error.data && error.data.modelState){
          for (var key in error.data.modelState) {
              for (var i = 0; i < error.data.modelState[key].length; i++) {
                  errors.push(error.data.modelState[key][i]);
              }
          }
        }
        return errors;
    }

    function getErrorMsgs(error) {
        var errors = this.getErrors(error),
            errMsg = null;

        if (errors.length > 0){
          errMsg = "<ul>";
          errMsg += errors.map((err) => {
            return "<li>" + err + "</li>";
          }).join(' ');
          errMsg += "</ul>";
          return errMsg;
        }

        return errMsg;
    }


  }

})();