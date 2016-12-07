angular.module('10011177.service', ['ionic'])
.service("blobService", function($http){ //one service called blobService
  var blobID; //initialise global variable blobID
  //function to create(post) a jsonblob on jsonBlob website
  this.postBlob = function (title, callbackOK, callbackNOK){
    $http.post("https://jsonblob.com/api/jsonBlob", title).then(funOK, funNOK);
    //if function is ok then set blobID, print blobID to screen and set localStorage
    //return the response data to the controller
    function funOK(response) {
      blobID = response.headers("x-jsonblob");
      console.log("Blob ID = " + blobID);
      localStorage.setItem('blob', blobID);
      callbackOK(response);
    }

    //if function returns error data pass this to controller
    function funNOK(response){
      callbackNOK(response.status, response.statusText);
    }
  }
  //function to update(put) a jsonblob on jsonBlob website
  this.putBlob = function (title, callbackOK, callbackNOK){
    $http.put("https://jsonblob.com/api/jsonBlob/" + blobID, title).then(funOK, funNOK);

    //if function is ok set localStorage
    //return the response data to the controller
    function funOK(response) {
      callbackOK(response);
      localStorage.setItem('blob', blobID);
    }

    //if function returns error data pass this to controller
    function funNOK(response){
      callbackNOK(response.status, response.statusText);
    }
  }
  //function to retrieve(get) a jsonblob on jsonBlob website
  this.getBlob = function (storage, callbackOK, callbackNOK){
    $http.get("https://jsonblob.com/api/jsonBlob/" + storage).then(funOK, funNOK);
    //if function is ok set blobID to returned storage value
    //return the response.data(object) to the controller
    function funOK(response) {
      blobID = storage;
      callbackOK(response.data);
    }

    //if function returns error data pass this to controller
    function funNOK(response){
      callbackNOK(response.status, response.statusText);
    }
  }
  //function to delete(delete) a jsonblob on jsonBlob website
  this.deleteBlob = function (callbackOK, callbackNOK){
    $http.delete("https://jsonblob.com/api/jsonBlob/" + blobID).then(funOK, funNOK);
    function funOK(response) {
      callbackOK(response);
    }
      //if function returns error data pass this to controller
    function funNOK(response){
      callbackNOK(response.status, response.statusText);
    }
  }
})
