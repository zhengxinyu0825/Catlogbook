(function() {

angular.module('app.directives')
  .directive('sessionGeneralSection', function($compile) {
    return {
      restrict: 'E',
      scope:false,
      templateUrl: 'templates/session-section-general.html',
      replace: true,
      link: function($scope, elem, attr, ctrl) {

      }
    };
  })
  .directive('sessionExposureSocializationSection', function($compile) {
    return {
      restrict: 'E',
      scope:false,
      templateUrl: 'templates/session-section-exposuresocialization.html',
      replace: true,
      link: function($scope, elem, attr, ctrl) {

      }
    };
  })
  .directive('sessionObedienceControlSection', function($compile) {
    return {
      restrict: 'E',
      scope:false,
      templateUrl: 'templates/session-obedience-control-section.html',
      replace: true,
      link: function($scope, elem, attr, ctrl) {

      }
    };
  })
  .directive('sessionTrainingReinforcementSection', function($compile) {
    return {
      restrict: 'E',
      scope:false,
      templateUrl: 'templates/session-training-reinforcement-section.html',
      replace: true,
      link: function($scope, elem, attr, ctrl) {

      }
    };
  })
  .directive('sessionAssessmentDevelopmentSection', function($compile) {
    return {
      restrict: 'E',
      scope:false,
      templateUrl: 'templates/session-assessment-development-section.html',
      replace: true,
      link: function($scope, elem, attr, ctrl) {

      }
    };
  })
  .directive('sessionExerciseSection', function($compile) {
    return {
      restrict: 'E',
      scope:false,
      templateUrl: 'templates/session-section-exercise.html',
      replace: true,
      link: function($scope, elem, attr, ctrl) {

      }
    };
  })
  .directive('sessionOtherSection', function($compile) {
    return {
      restrict: 'E',
      scope:false,
      templateUrl: 'templates/session-section-other.html',
      replace: true,
      link: function($scope, elem, attr, ctrl) {

      }
    };
  })
  .directive('sessionGuideseeingeyeTrainingdetailsSection', function($compile) {
    return {
      restrict: 'E',
      scope:false,
      templateUrl: 'templates/session-section-guideseeingeye-trainingdetails.html',
      replace: true,
      link: function($scope, elem, attr, ctrl) {

      }
    };
  });


})();