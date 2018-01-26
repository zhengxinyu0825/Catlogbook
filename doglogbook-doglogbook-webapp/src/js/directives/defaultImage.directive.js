(function() {

angular.module('app.directives')
  .directive('defaultSrc', function() {
    return {
      link: function(scope, element, attrs) {

        scope.$watch(function() {
            return attrs['ngSrc'];
          }, function (value) {
            if (!value) {
              element.attr('src', attrs.defaultSrc);  
            }
        });

        element.bind('error', function() {
          element.attr('src', attrs.defaultSrc);
        });
      }
    }
  });

})();