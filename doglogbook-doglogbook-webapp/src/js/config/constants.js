(function() {
  'use strict';

  angular.module('app')

  .constant('config', {
    version: '1.0',
    apiUrl: AppSettings.apiUrl,
    analytics: AppSettings.analytics,
    apiDateFormat: 'yyyy-MM-dd',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'HH:mm',
    apiDateTimeFormat: 'YYYY-MM-DD HH:mm',
    minValidDate:  '1900-01-01',
    maxActivityDurationMin: 120,
    maxSeizureDurationMin: 120,
    maxSessionDurationMin: 180,
    maxRecentLogsNumber:5,
    defaultPeriod:3,
    homeState:  'app.home',
    loginState: 'login',
    languages: [
      { code:'en', name:'SettingsLanguageEnglish', default:true},
      { code:'es', name:'SettingsLanguageSpanish'},
      { code:'fr', name:'SettingsLanguageFrench'}
    ]
  });

  // Periods
  // 1 - Day
  // 2 - Week
  // 3 - Month
  // 4 - 6 Months
  // 5 - All

})();