(function() {
  'use strict';

  angular.module('app')
  .factory('FieldsReminderService',FieldsReminderService);

  function FieldsReminderService(PopupFactory, $state){
    var service = this;
    var fields = [
      { id:"name", name: "Name" },
      { id:"petSubtype", name: "Sub Type" },
      { id:"sex", name: "Sex" },
      { id:"petBreeds", name: "Breed" },
      { id:"photoLink", name: "Picture" },
      { id:"dateOfBirth", name: "Date of Birth" },
      { id:"desexed", name: "Desexed" },
      { id:"ageAcquired", name: "Age of Acquired" },
      { id:"microchipNumber", name: "Microchip" }
    ];

    // Not mandatory fields
    // { id:"ageDesexed", name: "Age of Desexed" }

    // methods
    service.randomRunCheck    = randomRunCheck;

    return service;


    function randomRunCheck(pet){
      var msg = '',
          reqFields = [];


      if (randomCheck()){

        reqFields = getRequiredFields(pet);
        if (reqFields && reqFields.length > 0) {

          msg += "Don't forget to complete <b>" + pet.name + "</b> 's profile";
          msg += ", so you can get the most from Doglogbook still to complete:";
          msg += "</br>";
          msg += "</br>";
          msg += "<ul>";
          reqFields.forEach((x) => {
            msg += "<li>"+ x +"</li>";
          });
          msg += "</ul>";



          PopupFactory.show('show',{
            title:'',
            template:msg,    
            buttons: [
              {
                text:'Cancel',
                type:'button-outline',
                onTap:function(e){
                  
                }
              },          
              {
                text:'Update',
                type:'button-assertive',
                onTap:function(e){
                  $state.go('app.addPet', {id: pet.id }); 
                }
              }
            ]
          });

        }
      }
    }    

    function randomCheck(){
      var ranValue = Math.floor((Math.random() * 100) + 1);
      return (ranValue < 5)
    }

    function getRequiredFields(pet){
      var reqFields = []; 

      reqFields = _.chain(fields)
      .filter((x) => { 
        if (x.id == "petBreeds"){
          return (pet[x.id] == null || pet[x.id] == undefined || pet[x.id].length == 0)
        }
        if (x.id == "microchipNumber"){
          return (pet[x.id] == null || pet[x.id] == undefined || pet[x.id] == "")
        }
        else {
          return (pet[x.id] == null || pet[x.id] == undefined);   
        }
      })
      .map((x) => { return x.name; })
      .value();

      return reqFields;
    }

  }

})();