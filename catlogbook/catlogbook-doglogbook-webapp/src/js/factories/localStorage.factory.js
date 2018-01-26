(function() {
  'use strict';

  angular.module('app')
  .factory('$localStorage', $localStorage);

  function $localStorage($window) {

    return {
      set: set,
      get: get,
      setObject: setObject,
      getObject: getObject,
      setArray:  setArray,
      getArray: getArray,
      clear: clear,
      removeKey: removeKey
    }

    function set(key, value) {
      $window.localStorage[key] = value;
    }

    function get(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    }

    function setObject(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    }

    function getObject(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }

    function setArray(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    }

    function getArray(key) {
      var rawValue = $window.localStorage[key];

      return ((rawValue==undefined)?[]:JSON.parse(rawValue));
    }

    function clear() {
      $window.localStorage.clear();
    }

    function removeKey(key) {
      $window.localStorage.removeItem(key);
    }

  }

})();
