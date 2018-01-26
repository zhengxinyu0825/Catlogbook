

// Modules
angular.module('app.controllers', []);
angular.module('app.directives',  []);

angular.module('app', ['ionic', 'ngCordova', 
  'app.controllers','app.directives',
  'pascalprecht.translate','ngCookies','restangular',
  'angularMoment','ionic-modal-select'])

.run(function($ionicPlatform, $ionicHistory,$rootScope, GenderService,PopupFactory, LoadingMsg, $state, config) {
  $ionicPlatform.ready(function() {


    // PUSH NOTIFICATIONS

    // Enable to debug issues.
    // window.plugins.OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
    
    var notificationOpenedCallback = function(jsonData) {
      console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
    };

    if (window.plugins && window.plugins.OneSignal){
      window.plugins.OneSignal.init("3aa02b45-0959-4f9e-a9a5-10a84a06c1c2",
                                     {googleProjectNumber: "199529748468"},
                                     notificationOpenedCallback);
      
      // Show an alert box if a notification comes in when the user is in your app.
      window.plugins.OneSignal.enableInAppAlertNotification(true);
    }




    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    
    $rootScope.$on('$stateChangeStart', 
      function(event, toState, toParams, fromState, fromParams) {

      console.log("STATE: " + fromState.name + " to " + toState.name);

      if(toState.name=="app.home"){
        $ionicHistory.clearHistory();
        $ionicHistory.nextViewOptions({
          disableBack: true,
          historyRoot: true
        });        
      }

      LoadingMsg.show();

      if(fromState.name == 'app.initialActivityRate' && toState.name == 'app.addPet') {
        LoadingMsg.hide();
        event.preventDefault();

        PopupFactory.show('show',{
          title:'',
          template: "If you leave this form now some information could be lost. Are you sure you want to go back? In the udpate dog menu you can review and change your initial ratings.",    
          buttons: [
            {
              text: "Cancel",
              type:'button-outline',
              onTap:function(e){
                
              }
            },
            { 
              text: "Ok",
              type:'button-assertive',
              onTap:function(e){
                $state.go(config.homeState);
              }
            }
          ]
        });

      } 
    });

    $rootScope.$on('$stateChangeSuccess',
        function(event, toState, toParams, fromState, fromParams){ 
          
      LoadingMsg.hide();            
    });


  });
})
.config(function($ionicConfigProvider,$httpProvider,$translateProvider, RestangularProvider ,config) {

  // Http interceptor.
  // $httpProvider.interceptors.push('HttpInterceptor');
  
  $ionicConfigProvider.backButton.previousTitleText(false);
  $ionicConfigProvider.views.swipeBackEnabled(false);

  $translateProvider.useStaticFilesLoader({
      prefix: 'translations/locale-',
      suffix: '.json'
  });
  $translateProvider.useLocalStorage();
  $translateProvider.preferredLanguage('en');

  // Restangular config
  RestangularProvider.setBaseUrl(config.apiUrl);
  //RestangularProvider.setDefaultHttpFields({cache: true});


});