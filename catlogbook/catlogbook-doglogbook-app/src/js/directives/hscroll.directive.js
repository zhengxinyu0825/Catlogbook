(function() {

  angular.module('app.directives')

    .directive('hscroller', ['$timeout', function($timeout) {
      return {
        restrict: 'E',
        template: '<div class="hscroller" ng-transclude></div>',
        replace: true,
        transclude: true,

        compile: function(element, attr) {
          return function($scope, $element, $attr) {

            var el = $element[0];
            angular.element($element).bind("scroll", function(){
              var left = $element[0].scrollLeft;
              // console.log($element.childNodes);
            });
          }
        }
      }
    }])

    .directive('hcard', ['$rootScope', function($rootScope) {
      return {
        restrict: 'E',
        template: '<div class="hscroller-card" ng-transclude ng-click="cardClick()" ng-class="{activePanel : activeIndex == index}"></div>',
        replace: true,
        transclude: true,
        scope: {
          desc: '@',
          image: '@',
          index: '@',
          activeIndex:'@',
          cardClick: '&'          
        },
        link: function(scope, element, attrs){
          var img = angular.element("<img class='hscroller-img' src='"+attrs.image+"' default-src='https://res.cloudinary.com/statsone/image/upload/v1461384696/dlb/pet/jn.png'/>");
          element.append(img);
          element.append('\
            <div class="hscroller-extra"> \
            <span class="right">'+attrs.age+'</span> \
            <span class="left">'+attrs.gender+'</span> \
            </div>');
          element.append('\
            <div class="hscroller-label cat-'+ attrs.category +'"> \
            <b>'+attrs.name+'</b> </br> \
            <span>'+attrs.desc+'</span> \
            </div>');
          var animationClass = 'hscroller-card-animated-' + attrs.index.toString();
          element.addClass(animationClass);

        },

      }
    }]);

})();