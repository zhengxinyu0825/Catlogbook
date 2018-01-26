

// Modules
angular.module('app.controllers', []);
angular.module('app.directives',  []);

angular.module('app', [
  'ui.bootstrap',
  'pascalprecht.translate','ngCookies',
  'app.controllers',
  'app.directives',
  'ui.router',
  'restangular',
  'LocalStorageModule',
  'angularMoment',
  'chart.js',
  'ngDialog',
  'angular-loading-bar',
  'ngTable',
  'angulartics', 
  'angulartics.google.analytics'])

.run(function($rootScope,Restangular, GenderService, $location, ngTableDefaults) {

  // Loading Genders
  GenderService.init();

  Restangular.setErrorInterceptor(
      function(response) {
        if (response.status == 401){
          $location.path('/login');
          return false; // stop the promise chain
        }
      }
  );
  
  $rootScope.$on('$stateChangeStart', 
    function(event, toState, toParams, fromState, fromParams) {

    console.log("STATE: " + fromState.name + " to " + toState.name);
  });

  $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams){          
  });

  // ng-table
  ngTableDefaults.params.count = 10;
  ngTableDefaults.settings.counts = [];
  ngTableDefaults.settings.paginationMaxBlocks = 10;
  ngTableDefaults.settings.paginationMinBlocks = 2;

})
.config(function($httpProvider,localStorageServiceProvider, $translateProvider, RestangularProvider ,cfpLoadingBarProvider ,config) {

  cfpLoadingBarProvider.includeSpinner = false;

  // setting localStorage app prefix
  localStorageServiceProvider
    .setPrefix('dlb');

  $translateProvider.useStaticFilesLoader({
      prefix: 'translations/locale-',
      suffix: '.json'
  });
  $translateProvider.useLocalStorage();
  $translateProvider.preferredLanguage('en');

  // Restangular config
  RestangularProvider.setBaseUrl(config.apiUrl);


});