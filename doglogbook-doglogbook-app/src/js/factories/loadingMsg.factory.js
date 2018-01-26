(function() {
  'use strict';

  angular.module('app')
  .factory('LoadingMsg', LoadingMsg);


  function LoadingMsg($ionicLoading){
    return {
      show : function(duration) {

        var durationTime = duration || 0;

        $ionicLoading.show({
        animation: 'fade-in',
        showBackdrop: true,
        maxWidth: 200,
        showDelay: 0,
        duration: durationTime
        });
      },
      hide : function(){
        $ionicLoading.hide();
      }
    };
  };

  })();