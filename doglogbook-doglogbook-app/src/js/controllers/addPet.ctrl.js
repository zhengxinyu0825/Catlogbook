(function(){
  'use strict';

  angular.module('app.controllers')
    .controller('AddPetCtrl',AddPetCtrl);


    function AddPetCtrl( $ionicPlatform, $scope, $state, $filter, $timeout, $stateParams,
              $ionicScrollDelegate, PetService, $ionicActionSheet,$cordovaCamera,
              $q, $ionicLoading, PopupFactory,
              BagService,
              petTypes,petSubTypes,petBreeds, GenderService, WeightUnitsService,
              AgeAcquiredService, AgeDesexedService,
              ErrorMapper, config, translations){

    var vm = this;
    vm.minValidDate = config.minValidDate;
    vm.showPictureOptions = showPictureOptions;
    vm.nextPage = nextPage;
    vm.prevPage = prevPage;
    vm.closeWizardModal = closeWizardModal;
    vm.openSeizureBackground = openSeizureBackground;
    vm.save = save;
    vm.update = update;
    vm.petTypeChange = petTypeChange;
    vm.getTypeById = getTypeById;
    vm.getSubTypeById = getSubTypeById;
    vm.getBreedById = getBreedById;
    vm.getSexById = getSexById;
    vm.getBreedPercentageById = getBreedPercentageById;
    vm.getWeightUnitById = getWeightUnitById;
    vm.breedPercentangeChange = breedPercentangeChange;
    vm.breedPercentages = [
      { id:100, name:'100%'},
      { id:75, name:'75%'},
      { id:50, name:'50%'},
      { id:25, name:'25%'}
    ];


    function initForms(){

      $ionicScrollDelegate.scrollTop();

      vm.selectedPet = null;
      vm.types = petTypes;
      vm.breeds = petBreeds;
      vm.sexs = GenderService.getAll();
      vm.weightUnits = WeightUnitsService.getAll();
      vm.ageDesexedList  = AgeDesexedService.getAll();
      vm.ageAcquiredList = AgeAcquiredService.getAll();


      // Pet creation
      vm.subTypes = [];
      vm.avatar = null;
      vm.avatarImageData = null;
      vm.petFormData = {};
      vm.petFormData.desexed = false;
      vm.petFormData.ageDesexed  = null;
      vm.petFormData.ageAcquired = null;
      vm.petFormData.sex = null;
      vm.petFormData.weightUnits = null;
      vm.petFormData.petBreeds = [
        { order:0 }
      ];
      vm.petBreedsPercentagesfiltered = {};
      vm.petBreedsPercentagesfiltered[0] = vm.breedPercentages;
    }

    $scope.$on('$ionicView.beforeEnter', function() {

      initForms();

      if ($stateParams.id) {

        // Pet update
        vm.selectedPetId = $stateParams.id;
        vm.subTypes = petSubTypes;

        PetService.getById(vm.selectedPetId).then(
          (pet) => {

            vm.petFormData = objToFormMap(pet);
            vm.avatar = pet.photoLink;

            // filling up the form with pet information
            $q.all([
                PetService.getWeight(pet.id)
            ])
            .then((response) =>
            {
                if (response[0]){
                  vm.petFormData.weight      = response[0].weight;
                  vm.petFormData.weightUnits = vm.getWeightUnitById(response[0].units);
                }
            });

          },
          (error) => {

            // Cannot get pet by id.
            PopupFactory.show('show',{
              title:'',
              template: translations.AddPetMsgGetPetError,
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

      // pagination
      vm.page = 1;
      vm.pageLength = 2;
      changePage(vm.page);

    });

    function getTotalBreedsPercentage(){
      var totalPercentage = _.chain(vm.petFormData.breedPercentage).values().sumBy(function(o) {
        return o.id;
      }).value();
      return totalPercentage;
    }

    function isWeightValid(weight,weightUnit){
      if (weightUnit == 'kg' && weight > 0 && weight <= 145){
        return true;
      }
      else if (weightUnit == 'pounds' && weight > 0 && weight <= 320){
        return true;
      }
      else {
        return false;
      }
    }

    function isTotalPercentageValid(){
      return (getTotalBreedsPercentage() == 100);
    }

    function breedPercentangeChange(order){
      var breedPercentage = vm.petFormData.breedPercentage[order];

      if (breedPercentage && breedPercentage.id <= 100){

        if (order < vm.petFormData.petBreeds.length -1 ){

          // Restarting cross formula from the edited element
          vm.petFormData.petBreeds = vm.petFormData.petBreeds.filter((e)=>{return e.order <= order });

          vm.petFormData.breedPercentage = _.chain(vm.petFormData.breedPercentage)
              .values()
              .map((e,index)=>{e.index = index; return e; })
              .filter((e)=>{return e.index <= order })
              .keyBy('index').value();

          vm.petFormData.breed = _.chain(vm.petFormData.breed)
              .values()
              .map((e,index)=>{e.index = index; return e; })
              .filter((e)=>{return e.index <= order })
              .keyBy('index').value();

        }

        var totalPercentage = getTotalBreedsPercentage();

        if (totalPercentage < 100){

          var nextOrder = ++order;
          vm.petBreedsPercentagesfiltered[nextOrder] = vm.breedPercentages.filter((pb) =>{
            return (totalPercentage + pb.id <= 100);
          });

          if (nextOrder > vm.petFormData.petBreeds.length-1){
            vm.petFormData.petBreeds.push({
              order: nextOrder
            });
          }
        }
      }
    }

    function objToFormMap(obj){
      var pet = {};

      pet.name = obj.name;
      pet.dateOfBirth = new Date(moment.utc(obj.dateOfBirth));
      pet.type = vm.getTypeById(obj.petSubtype.petTypeId)

      // Updating subtype list by type
      petTypeChange(pet.type);

      // Pre select the correct value
      pet.subType = vm.getSubTypeById(obj.petSubtype.id);

      if (obj.petBreeds && obj.petBreeds.length > 0){

        // initializing petbreeds UI elements
        pet.petBreeds = [];
        pet.breedPercentage = {};
        pet.breed = {};
        var totalPercentage = 0;

        obj.petBreeds.forEach((pb,index)=> {

          pet.petBreeds.push({
            order: index
          });
          pet.breed[index] = vm.getBreedById(pb.breedId);
          pet.breedPercentage[index] = vm.getBreedPercentageById(pb.percentage);


          if (index == 0){
            vm.petBreedsPercentagesfiltered[index] = vm.breedPercentages;
          }
          else {
            vm.petBreedsPercentagesfiltered[index] = vm.breedPercentages.filter((pb) =>{
              return (totalPercentage + pb.id <= 100);
            });
          }
          totalPercentage += pb.percentage;

        });
      }
      else {
        pet.petBreeds = [
          { order:0 }
        ];
        vm.petBreedsPercentagesfiltered[0] = vm.breedPercentages;
      }

      pet.sex = vm.getSexById(obj.sex);
      pet.desexed = obj.desexed || false ;
      pet.ageDesexed = AgeDesexedService.get(obj.ageDesexed) || null;
      pet.ageAcquired = AgeAcquiredService.get(obj.ageAcquired) || null;
      pet.microchipNumber = obj.microchipNumber || null;
      pet.insured = obj.insured || false ;
      pet.seizureDiagnosisId = obj.seizureDiagnosisId || null ;

      return pet;
    }


    function formToObjMap(formData){
      var pet = {};

      pet.name = formData.name;
      pet.dateOfBirth = $filter('date')(formData.dateOfBirth, config.apiDateFormat);
      pet.petSubtypeId = formData.subType.id;

      pet.petBreeds = vm.petFormData.petBreeds.map((e) => {
        return {
           "breedId":vm.petFormData.breed[e.order].id,
           "percentage":vm.petFormData.breedPercentage[e.order].id
        }
      });

      pet.sex = formData.sex.id;
      pet.desexed = formData.desexed || false;
      pet.ageDesexed = ((pet.desexed && formData.ageDesexed)? (formData.ageDesexed.id) : null);
      pet.ageAcquired = (formData.ageAcquired)? formData.ageAcquired.id : null;
      pet.microchipNumber = formData.microchipNumber;
      pet.insured = formData.insured || false;
      pet.trainerId = formData.trainerId || null;
      pet.seizureDiagnosisId = formData.seizureDiagnosisId || null;

      return pet;
    }


    function save(formData) {
      var newPet = {};

      if (!isTotalPercentageValid()){
        PopupFactory.show('show',{
          title:'',
          template: translations.AddPetMsgTotalBreedsPercentageError,
          buttons: [
            {
              text: translations.CommonOk,
              type:'button-assertive',
              onTap:function(e){}
            }
          ]
        });
        return;
      }


      if (formData.weight != undefined && formData.weightUnits != undefined &&
          !isWeightValid(formData.weight,formData.weightUnits.id)){

        PopupFactory.show('show',{
          title:'',
          template: translations.AddPetMsgTotalErrorWeight,
          buttons: [
            {
              text: translations.CommonOk,
              type:'button-assertive',
              onTap:function(e){}
            }
          ]
        });
        return;
      }




      // mapping
      newPet = formToObjMap(formData);

      $ionicLoading.show();
      PetService.create(newPet).then(
        (response) => {

          // will force to update list
          BagService.set("Pets",null);

           // updating new pet id.
          newPet.id = response.id;

          // updating Weight
          if (formData.weight != undefined && formData.weightUnits != undefined){
             PetService.setWeight(newPet.id, { weight: formData.weight , units: formData.weightUnits.id });
          }

          if (vm.avatarImageData){
            PetService.setAvatar(newPet.id, vm.avatarImageData).then(
              (response) => {

                $ionicLoading.hide();
                PopupFactory.show('show',{
                  title:'',
                  template: translations.AddPetMsgAddedOk,
                  buttons: [
                    {
                      text: translations.CommonOk,
                      type:'button-assertive',
                      onTap:function(e){
                        vm.petFormData = {};

                        $state.go('app.initialActivityRate', {id: newPet.id});
                      }
                    }
                  ]
                });
              }
            );

          }
          else {

            $ionicLoading.hide();
            PopupFactory.show('show',{
              title:'',
              template: translations.AddPetMsgAddedOk,
              buttons: [
                {
                  text: translations.CommonOk,
                  type:'button-assertive',
                  onTap:function(e){
                    vm.petFormData = {};

                    $state.go('app.initialActivityRate', {id: newPet.id});
                  }
                }
              ]
            });

          }

        },
        (errors) => {
          $ionicLoading.hide();

          var errorMsg = '';
          errorMsg = ErrorMapper.getErrorMsgs(errors);

          PopupFactory.show('show',{
            title:'',
            template: errorMsg,
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


    function update(formData) {
      var newPet = {};

      if (!isTotalPercentageValid()){
        PopupFactory.show('show',{
          title:'',
          template: translations.AddPetMsgTotalBreedsPercentageError,
          buttons: [
            {
              text: translations.CommonOk,
              type:'button-assertive',
              onTap:function(e){}
            }
          ]
        });
        return;
      }


      if (formData.weight != undefined && formData.weightUnits != undefined &&
          !isWeightValid(formData.weight,formData.weightUnits.id)){

        PopupFactory.show('show',{
          title:'',
          template: translations.AddPetMsgTotalErrorWeight,
          buttons: [
            {
              text: translations.CommonOk,
              type:'button-assertive',
              onTap:function(e){}
            }
          ]
        });
        return;
      }


      // mapping
      newPet = formToObjMap(formData);

      $ionicLoading.show();
      PetService.update(vm.selectedPetId, newPet).then(
        (response) => {

          // will force to update list
          BagService.set("Pets",null);

           // updateing new pet id.
          newPet.id = response.id;

          // updating Weight
          if (formData.weight != undefined && formData.weightUnits != undefined){
             PetService.setWeight(newPet.id, { weight: formData.weight , units: formData.weightUnits.id });
          }

          if (vm.avatarImageData){
            PetService.setAvatar(newPet.id, vm.avatarImageData).then(
              (response) => {

                $ionicLoading.hide();
                PopupFactory.show('show',{
                  title:'',
                  template: translations.AddPetMsgUpdatedOk,
                  buttons: [
                    {
                      text: translations.CommonOk,
                      type:'button-assertive',
                      onTap:function(e){
                        vm.petFormData = {};

                        $state.go('app.home');
                      }
                    }
                  ]
                });
              }
            );

          }
          else {

            $ionicLoading.hide();
            PopupFactory.show('show',{
              title:'',
              template: translations.AddPetMsgUpdatedOk,
              buttons: [
                {
                  text: translations.CommonOk,
                  type:'button-assertive',
                  onTap:function(e){
                    vm.petFormData = {};

                    $state.go('app.home');
                  }
                }
              ]
            });

          }

        },
        (errors) => {
          $ionicLoading.hide();

          var errorMsg = '';
          errorMsg = ErrorMapper.getErrorMsgs(errors);

          PopupFactory.show('show',{
            title:'',
            template: errorMsg,
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

    function changePage(page) {

      // set scroll to the top
      $ionicScrollDelegate.scrollTop(true);
    }

    function prevPage(){

      if (vm.page > 1) {
        vm.page--;
        changePage(vm.page);
      }
    }

    function nextPage(){

      if(vm.page !== vm.pageLength) {
        vm.page++;
        changePage(vm.page);
      }
    }

    function closeWizardModal(){
      vm.modal.hide();
    }

    function showPictureOptions(){

      var hideSheet = $ionicActionSheet.show({
       buttons: [
       { text: '<i class="icon ion-camera"></i> '+ translations.HomeActionTakePhoto },
       { text: '<i class="icon ion-images"></i> '+ translations.HomeActionPhotoLibrary }
       ],
       titleText:  translations.HomeActionSetPicture,
       cancelText: translations.CommonCancel,
      cancel: function() {
        return true;
      },
      buttonClicked: function(index) {
        getPicture((index==0)?true:false);
        return true;
      }
    });

    }

    function getPicture(typeCamera){

      var options = {
        quality: 50,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: (typeCamera==true)?Camera.PictureSourceType.CAMERA:Camera.PictureSourceType.SAVEDPHOTOALBUM,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false
      };

      $ionicLoading.show();
      $ionicPlatform.ready(function() {

        $cordovaCamera.getPicture(options).then(function(imageData) {
          $ionicLoading.hide();
          vm.avatarImageData = imageData;
          vm.avatar = "data:image/jpeg;base64," + vm.avatarImageData;
        }, function(err) {
          $ionicLoading.hide();
          console.log(err);
        });

      });

    }

    function openSeizureBackground() {
      $state.go('app.petSeizure', {id: vm.selectedPetId });
    }

    function petTypeChange(type) {
      vm.subTypes = petSubTypes.filter((subtype) => {
        return subtype.petTypeId == type.id});
    }

    function getTypeById(id) {
      return petTypes.find((o)=>{ return o.id == id });
    }

    function getSubTypeById(id) {
      return petSubTypes.find((o)=>{ return o.id == id });
    }

    function getBreedById(id) {
      return petBreeds.find((o)=>{ return o.id == id });
    }

    function getSexById(id) {
      return GenderService.get(id);
    }

    function getBreedPercentageById(id) {
      return vm.breedPercentages.find((o)=>{ return o.id == id });
    }

    function getWeightUnitById(id){
      return WeightUnitsService.get(id);
    }

  }


})();
