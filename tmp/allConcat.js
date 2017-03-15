var Zipcode = require("./../js/zipcode.js").zipcodeModule;
var getZipcodes = require("./../js/zipcode.js").getZipcodesModule;



$(function(){

  $('#search').click(function(event) {
    event.preventDefault();
    var city = $('#city-name').val();
    var range = $("#range").val();
    // var test = new Zipcode();
    var zipcodes = getZipcodes(city, range);
    

    console.log(zipcodes);


    // fillMap(zipcodes);
  });


  // $('#locateUser').click(locateUser);
});

//google maps functions
// function locateUser() {
//   // If the browser supports the Geolocation API
//   if (navigator.geolocation){
//     var positionOptions = {
//       enableHighAccuracy: true,
//       timeout: 10 * 1000 // 10 seconds
//     };
//     navigator.geolocation.getCurrentPosition(geolocationSuccess, geolocationError, positionOptions);
//   }
//   else {
//     alert("Your browser doesn't support the Geolocation API");
//   }
// }
// function fillMap(zipcodes) {
//
//   for(var i = 0; i<zipcodes.length; i++){
//
//   }
//   var userLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
//
//   var myOptions = {
//     zoom : 16,
//     center : userLatLng,
//     mapTypeId : google.maps.MapTypeId.ROADMAP
//   };
//   // Draw the map - you have to use 'getElementById' here.
//   var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
//   // Place the marker
//   new google.maps.Marker({
//     map: mapObject,
//     position: userLatLng
//   });
// }
// function geolocationError(positionError) {
//   alert(positionError);
// }
