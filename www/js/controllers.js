angular.module('10011177.controller', ['ionic'])
.controller('reminderCTRL', function($scope, blobService) { //one controller called reminderCTRL
  //html page(the view) Display code
  $scope.pageDisplay = []; //initialise pagedisplay array
  var pageDisplayObj = function(name){ //create object constructor called pageDisplayObj
    this.name = name; //set name to parameter "name"
    $scope.pageDisplay.push(this); // push this object into arrray $scope.pageDisplay
  }

  var pageTitle = new pageDisplayObj("Title"); //create new instance of objects on for each heading(div)
  var description = new pageDisplayObj("Description");
  var priority = new pageDisplayObj("Priority");
  var complete = new pageDisplayObj("Complete");

  $scope.title = {}; //initialise $scope.title object
  var title; // initialise title variable

  //set variable to a localStorage item called 'blob'
  var storage = localStorage.getItem('blob');

  if (storage === null) { //if localStorage is null(not set) set default values
    $scope.title.priority = "Medium";
    $scope.title.complete = false;
    $scope.saveTF = true;
  } else { //if localStorage is set (not null) retrieve the saved data
    $scope.saveTF = false; //show update and delete buttons, remove save button
    blobService.getBlob(storage, callbackOK, callbackNOK); //call the service function getBlob
    //if response(from url in service) is ok set variables
    function callbackOK(response) {
      setVariables(response);
     }

     //if response(from url in service) is Not OK report error and code
     function callbackNOK(errorStatus, errorStatusText) {
       alert(errorStatus);
       alert(errorStatusText);
     }
  }
  //when save buton is clicked
  $scope.save = function(){
    $scope.saveTF = false; //hide save button and show delete and update buttons
    title=$scope.title; //set title to the $scope object title
    blobService.postBlob(title, callbackOK, callbackNOK); //call postBlob, which creates a new jsonBlob in blobService
    //if response(from url in service) is ok set variables
    function callbackOK(response) {
      function setVariables(response) {
      }
    }
    //if response(from url in service) is Not OK report error and code
    function callbackNOK(errorStatus, errorStatusText) {
      alert(errorStatus);
      alert(errorStatusText);
    }
  }
  //when update button is clicked
  $scope.update =function() {
    title=$scope.title; //set title to the $scope object title
    blobService.putBlob(title, callbackOK, callbackNOK); //call putBlob, which updates existing jsonBlob in blobService
    //if response(from url in service) is ok set variables
    function callbackOK(response) {
      function setVariables(response) {
      }
    }
    //if response(from url in service) is Not OK report error and code
    function callbackNOK(errorStatus, errorStatusText) {
        alert(errorStatus);
        alert(errorStatusText);
    }
  }
  //when delete button is clicked
  $scope.delete =function() {
    blobService.deleteBlob(callbackOK, callbackNOK);//call deleteBlob, which deletes existing jsonBlob in blobService
    //if response(from url in service) is ok delete blob from local storage and reset variables to default
    //AND clear text fields
    function callbackOK(response) {
      localStorage.removeItem('blob');
      $scope.saveTF = true;
      $scope.title.header = "";
      $scope.title.desc = "";
      $scope.title.priority = "Medium";
      $scope.title.complete = false;
    }
    //if response(from url in service) is Not OK report error and code
    function callbackNOK(errorStatus, errorStatusText) {
      alert(errorStatus);
      alert(errorStatusText);
    }
  }

  //set variables function, set by update and save functions
  var setVariables = function(response) {
    $scope.title.priority = response.priority;
    $scope.title.header = response.header;
    $scope.title.complete = response.complete;
    $scope.title.desc = response.desc;
  }
})
