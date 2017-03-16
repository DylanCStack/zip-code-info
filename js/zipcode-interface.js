var Zipcode = require("./../js/zipcode.js").zipcodeModule;
var getZipcodes = require("./../js/zipcode.js").getZipcodesModule;
var Map = require("./../js/map.js").mapModule;



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

  var newMap = new Map();

  $("#make-map").click(function(){
    newMap.fillMap(zipcodes);

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
// function geolocationError(positionError) {
//   alert(positionError);
// }
