(function(){
  'use strict';

  angular.module('app.controllers')
  .controller('AddFeedingCtrl',AddFeedingCtrl);

    function AddFeedingCtrl(
        $scope, $state, $stateParams, $ionicScrollDelegate,
        PopupFactory, ErrorMapper, BagService, LoadingMsg,PetService,
        CommonService,UserService, FeedingService,
        userInfo,feedingTypes,foodTypes,feedingUnits,
        config, translations){

    var vm = this;

    // defaults
    vm.countries = [];
    vm.feedingTypesFrecuencies = [];
    vm.userInfo = null;
    vm.selectedFeedingType = null;
    vm.brands = [];

    // methods
    vm.save = save;
    vm.updateUserCountry = updateUserCountry;
    vm.foodTypeChecked   = foodTypeChecked;
    vm.feedingTypeChange = feedingTypeChange;
    vm.brandChange       = brandChange;

    function initForms(){

      $ionicScrollDelegate.scrollTop();

      // dependencies 
      vm.userInfo     = vm.userInfo || userInfo;
      vm.feedingUnits = feedingUnits;
      vm.feedingTypes = feedingTypes;
      vm.foodTypes    = foodTypes;

      if (vm.userInfo.countryId){
        FeedingService.getFoodBrands(vm.userInfo.countryId).then(
          (brands) => {
            vm.brands = brands
          },
          (err) => {
            vm.brands = [];
          }
        );        
      }

      // Creation
      vm.formData = {};
      vm.formData.items = [];
      vm.formData.frequencyItems = [];
      vm.formData.productItems = [];
      vm.formData.feedingUnitsItems = [];
      vm.formData.amountItems = [];
      vm.formData.otherItems = [];
    }

    $scope.$on('$ionicView.beforeEnter', function() {

      if ($stateParams.id){
        vm.selectedPet = BagService.get('SelectedPet');
        if (!vm.selectedPet || $stateParams.id != vm.selectedPet.id) {
          showNoSelectedPetMsg();
        }
      }
      else {
        showNoSelectedPetMsg();
      }    

      checkUserCountry();
      initForms();


    });    

    function checkUserCountry(){
      if (userInfo != null && userInfo.countryId == null){

          LoadingMsg.show();
          CommonService.getCountries().then(
            (countries)=>{
              LoadingMsg.hide();

              vm.countries = countries;

              PopupFactory.show('show',{
                title:'',
                templateUrl: 'templates/update-country.html', 
                scope: $scope,   
                buttons: [
                  {
                    text: translations.CommonUpdate,
                    type:'button-assertive',
                    onTap:function(e){
                       if (vm.selectedCountry) {
                        vm.updateUserCountry(vm.selectedCountry)
                      } else {
                        e.preventDefault();
                      }
                    }
                  }
                ]
              });
            },
            (err)=>{
              LoadingMsg.hide();

              PopupFactory.show('show',{
                title:'',
                template: translations.AddFeedingGetCountryError,    
                buttons: [
                  {
                    text: translations.CommonOk,
                    type:'button-assertive',
                    onTap:function(e){
                      $state.go(config.homeState);
                    }
                  }
                ]
              });

          });

      }
    }

    function foodTypeChecked(foodType, checkValue){
      LoadingMsg.show(500);

      if (checkValue){
        vm.formData.items[foodType.id] = foodType;
        vm.formData.items[foodType.id].products = [];
      }
      else {
        // reset
        vm.formData.items[foodType.id] = null;
      }
      

    }

    function updateUserCountry(selectedCountry){
      if (selectedCountry){

        LoadingMsg.show();
        UserService.setCountry(selectedCountry.id).then(
          (userInfo)=>{
            LoadingMsg.hide();
            // updating User Info
            vm.userInfo = userInfo;
            initForms();
          },
          (error)=>{
            LoadingMsg.hide();
            vm.selectedCountry = null;
          }
        );

      }
    }

    function feedingTypeChange(feedingTypeChange){

      if (feedingTypeChange){

        LoadingMsg.show();
        FeedingService.getFeedingTypesFrecuencies(feedingTypeChange.id).then(
          (frecuencies) => {

            LoadingMsg.hide();
            vm.feedingTypesFrecuencies = frecuencies;

          },
          (err) => {
            vm.feedingTypesFrecuencies = [];
            LoadingMsg.hide();
            PopupFactory.show('show',{
              title:'',
              template: translations.AddFeedingGetCountryError,    
              buttons: [
                {
                  text: translations.CommonOk,
                  type:'button-assertive',
                  onTap:function(e){

                  }
                }
              ]
            });

          }
        );
      }
      else {
         vm.feedingTypesFrecuencies = [];
      }
    }

    function brandChange(foodType, brand){

      if (brand){
        vm.formData.items[foodType.id].products = [];

        FeedingService.getFoodProducts(brand.id,foodType.id).then(
          (products)=> {
            vm.formData.items[foodType.id].products = products;
          },
          (err) => {
            vm.formData.items[foodType.id].products = []
          }
        );

      }
      else {
        // reset
        vm.formData.items[foodType.id].products = [];
      }

    }

    function save(formData){
      var newFeed = {},
          petId = null,
          itemOptions = [];

      itemOptions = _.chain(formData.checkboxItems).keys()
          .value()
          .filter((e)=> { 
            return formData.checkboxItems[e]==true  
          });

      if (vm.selectedFeedingType && itemOptions.length > 0){

        newFeed.feedingTypeId = vm.selectedFeedingType.id;
        newFeed.feedItems = _.chain(formData.checkboxItems).keys()
          .value()
          .filter((e)=> { 
            return formData.checkboxItems[e]==true  
          })
          .map((e) => {
            var foodType = formData.items[e];
            var frequency = formData.frequencyItems[e];
            var product = formData.productItems[e];
            var feedingUnit = formData.feedingUnitsItems[e];
            var amount = formData.amountItems[e];
            var other = formData.otherItems[e];
            return { 
              'foodTypeId': (foodType)?foodType.id:null,
              'feedingTypeFrecuencyId': (frequency)?frequency.id:null,
              'foodProductId': (product)?product.id:null, 
              'feedingUnitId': (feedingUnit)?feedingUnit.id:null, 
              'amount':(amount)?amount:null, 
              'other':(other)?other:null
            }
        });


        LoadingMsg.show();
        PetService.setFeed(vm.selectedPet.id,newFeed).then(
          (response) => {
            vm.formData = {};
            LoadingMsg.hide();
            showMsgOk();
          },
          (error) => {
            LoadingMsg.hide();
            showMsgError();
          }
        );


      }
      else {
        
        PopupFactory.show('show',{
          title:'',
          template: translations.AddFeedingMsgRequiredFields,    
          buttons: [
            {
              text: translations.CommonOk,
              type:'button-assertive',
              onTap:function(e){
              }
            }
          ]
        });

      }



    }

    function showMsgOk(){
      PopupFactory.show('show',{
        title:'',
        template: translations.AddFeedingMsgSetOk,    
        buttons: [
          {
            text: translations.CommonOk,
            type:'button-assertive',
            onTap:function(e){
              $state.go(config.homeState);
            }
          }
        ]
      });
    }

    function showMsgError(){
      PopupFactory.show('show',{
        title:'',
        template: translations.AddFeedingMsgSetError,    
        buttons: [
          {
            text: translations.CommonOk,
            type:'button-assertive',
            onTap:function(e){

            }
          }
        ]
      });
    }

    function showNoSelectedPetMsg(){
      PopupFactory.show('show',{
        title:'',
        template: translations.CommonMsgGetPetError,    
        buttons: [
          {
            text: translations.CommonOk,
            type:'button-assertive',
            onTap:function(e){
              $state.go(config.homeState);
            }
          }
        ]
      });
    }
    
  }

})();
