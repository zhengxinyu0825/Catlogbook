(function(){
  'use strict';

  angular.module('app.controllers')
  .controller('AddSocialisationCtrl',AddSocialisationCtrl);

    function AddSocialisationCtrl(
        $scope, $state, $stateParams, $ionicScrollDelegate,
        PopupFactory, ErrorMapper, BagService, LoadingMsg,
        PetService,
        species,
        surfaceObstacles,
        transportationTypes,
        travelQuality,
        relationshipTypes,
        locationTypes,
        locationSubTypes,
        humanGenders,
        ageRanges,
        distanceUnits,
        sounds,
        lifeExperiences,
        dogTypes,
        config, translations){

    var vm = this;

    // defaults
    vm.maxSeizureDurationMin = config.maxSeizureDurationMin;

    // methods
    vm.save = save;
    vm.percentageDisplay = percentageDisplay;
    vm.minuteDisplay = minuteDisplay;
    vm.hourDisplay = hourDisplay;
    vm.getDurationFormat = getDurationFormat;

    function initForms(){

      $ionicScrollDelegate.scrollTop();

      vm.selectedPet = null;

      // defaults
      vm.durationHours = [ 0,1,2,3,4,5,6,7,8,9,10 ];
      vm.durationMinutes = [ 0,5,10,15,20,25,30,35,40,45,50,55 ];
      vm.soundItems = [];
      vm.lifeExperienceItems = [];
      vm.distractedByAnimalItems = [];

      // dependencies 
      vm.surfaceObstacles = surfaceObstacles;
      vm.transportationTypes = transportationTypes;
      vm.travelQuality = travelQuality;
      vm.relationshipTypes = relationshipTypes;
      vm.locationTypes = locationTypes;
      vm.locationSubTypes = locationSubTypes;
      vm.humanGenders = humanGenders;
      vm.ageRanges = ageRanges;
      vm.distanceUnits = distanceUnits;
      vm.sounds = sounds;
      vm.lifeExperiences = lifeExperiences;
      vm.dogTypes = dogTypes;
      vm.species = species;

      // Creation
      vm.formData = {};
      vm.formData.soundIsRealItems = [];
      vm.formData.soundDurationsItems = [];
      vm.sounds.forEach((e) => {
        vm.formData.soundIsRealItems[e.id] = false;
        vm.formData.soundDurationsItems[e.id] = 0;
      });
      

    }

    $scope.$on('$ionicView.beforeEnter', function() {

      initForms();

      if ($stateParams.id){
        vm.selectedPet = BagService.get('SelectedPet');
        if (!vm.selectedPet || $stateParams.id != vm.selectedPet.id) {
          showNoSelectedPetMsg();
        }
      }
      else {
        showNoSelectedPetMsg();
      }    
    });    

    function save(formData){
      var newSeizure = {},
          petId = null;

        formData.distractedByAnimalItems = 
        _.chain(formData.distractedByAnimalItems).keys()
          .value()
          .filter((e)=> { 
            return formData.distractedByAnimalItems[e]==true  
          })
          .map((e) => {
            return { 
              'SpeciesId' : parseInt(e)
            }
        });

      formData.surfacesItems = 
        _.chain(formData.surfacesItems).keys()
          .value()
          .filter((e)=> { 
            return formData.surfacesItems[e]==true  
          })
          .map((e) => {
            return { 
              'SurfaceObstacleId' : parseInt(e)
            }
        });


      formData.soundItems =
        _.chain(formData.soundItems).keys()
          .value()
         .filter((e)=> { 
            return formData.soundItems[e]==true  
          })                
          .map((e) => {
            var IsReal = vm.formData.soundIsRealItems[e];
            var Duration = vm.formData.soundDurationsItems[e];            

            return { 
              'soundId' : parseInt(e),
              'isReal' : IsReal || false,
              'duration' : parseInt(Duration)
            }
        });

      formData.lifeExperienceItems = 
        _.chain(formData.lifeExperienceItems).keys()
          .value()
          .filter((e)=> { 
            return formData.lifeExperienceItems[e]==true  
          })
          .map((e) => {
            return { 
              'lifeExperienceId' : parseInt(e)
            }
        });

      LoadingMsg.show();
      PetService.setSocialisation(vm.selectedPet.id,formData).then(
        (response) => {
          vm.formData = {};

          LoadingMsg.hide();
          PopupFactory.show('show',{
            title:'',
            template: translations.AddSocialisationMsgSetOk,    
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

        },
        (error) => {

          LoadingMsg.hide();
          PopupFactory.show('show',{
            title:'',
            template: translations.AddSocialisationMsgSetError,    
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
      );

    }

    function percentageDisplay(value){
      return value + ' %';
    }

    function minuteDisplay(value){
      return value + ' min';
    }

    function hourDisplay(value){
      return value + ' hrs';
    }

    function getDurationFormat(min){
      var strResult = '',
          minutes   = moment.duration(parseInt(min), "minutes").minutes(),
          hours     = moment.duration(parseInt(min), "minutes").hours();

      strResult += hours + ' '   + translations.CommonHours;
      strResult += ' ';
      strResult += minutes + ' ' + translations.CommonMinutes;

      return strResult;    
    }

    function showNoSelectedPetMsg(){
      PopupFactory.show('show',{
        title:'',
        template: translations.AddSocialisationMsgGetPetError,    
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

