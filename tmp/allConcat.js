var Zipcode = require("./../js/zipcode.js").zipcodeModule;
var getZipcodes = require("./../js/zipcode.js").getZipcodesModule;



$(function(){
  var zipcodes = [];
  $('#search').click(function(event) {
    event.preventDefault();
    var city = $('#city-name').val();
    var range = $("#range").val();
    // var test = new Zipcode();
    zipcodes = getZipcodes(city, range);


    console.log(zipcodes);


  });

  $("#make-map").click(function(){
    fillMap(zipcodes);

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
function fillMap(zipcodes) {

  var userLatLng = new google.maps.LatLng(45.48563720000001,-122.5946256);


  var myOptions = {
    zoom : 16,
    center : userLatLng,
    mapTypeId : google.maps.MapTypeId.ROADMAP
  };
  // Draw the map - you have to use 'getElementById' here.
  var mapObject = new google.maps.Map(document.getElementById("map"), myOptions);
  // Place the marker
  for(var i = 0; i<zipcodes.length; i++){
    new google.maps.Marker({
      map: mapObject,
      position: new google.maps.LatLng(zipcodes[i].Lat,zipcodes[i].Long)
    });
  }

}
function geolocationError(positionError) {
  alert(positionError);
}
