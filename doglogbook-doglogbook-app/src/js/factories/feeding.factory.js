(function() {
  'use strict';

  angular.module('app')
  .factory('FeedingService',FeedingService);

  function FeedingService(TokenRest, $q, BagService, ErrorMapper){
    var service = this;
    
    // methods
    service.getFeedingTypes     = getFeedingTypes;
    service.getFeedingUnits     = getFeedingUnits;
    service.getFeedingTypesFrecuencies    = getFeedingTypesFrecuencies;
    service.getFoodTypes        = getFoodTypes;
    service.getFoodBrands       = getFoodBrands;
    service.getFoodProducts     = getFoodProducts;


    return service;

    function getFeedingTypes() {
      var base = TokenRest.all('feeding/FeedingTypes');
      return base.getList();
    }

    function getFeedingUnits() {
      var base = TokenRest.all('feeding/FeedingUnits');
      return base.getList();
    }

    function getFeedingTypesFrecuencies(id) {
      var base =  TokenRest.one('feeding/FeedingTypes',id);
      return base.customGET("frecuencies");
    }

    function getFoodTypes() {
      var base = TokenRest.all('feeding/FoodTypes');
      return base.getList();
    }

    function getFoodBrands(countryId){
      var query = {};

      if (countryId){
        query.countryId = countryId        
      }

      var base = TokenRest.all('feeding/FoodBrands');
      return base.getList(query);
    }

    function getFoodProducts(brandId,foodTypeId){
      var query = {};

      if (brandId && foodTypeId){
        query.brandId = brandId        
        query.foodTypeId = foodTypeId        
      }

      var base = TokenRest.all('feeding/FoodProducts');
      return base.getList(query);
    }

  }

})();