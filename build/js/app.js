(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "AIzaSyApBa-WXsJ7_rzeREUMDEnjUvCe28oEtvw";

},{}],2:[function(require,module,exports){
var apiKey = require('./../.env').apiKey;

function Zipcode(code) {
  this.zipcode = code;
  this.bikes = [];
  this.LatLong = "";
}

function getZipcodes(city, range){
  var allZipcodes = [];
  $.get("https://bikeindex.org/api/v3/search?page=1&per_page=100&location=" + city +
   "&distance="+ range +"&stolenness=proximity").then(function(response) {
    var stringCodes = [];
    var responseBikes = response.bikes;
    for (var index = 0; index < responseBikes.length; index++) {
      var match = responseBikes[index].stolen_location.match(/\d{5,5}/);
      var zipCode = "";
      if(match){
        zipCode = match[0];
        var newZip = new Zipcode(zipCode);

        if(!(stringCodes.includes(zipCode))){
          stringCodes.push(zipCode);
          newZip.bikes.push(responseBikes[index]);
          allZipcodes.push(newZip);
        } else {
          allZipcodes[stringCodes.indexOf(zipCode)].bikes.push(responseBikes[index]);
        }

      }

    }

  }).then(function(){
    allZipcodes.forEach(function(code){
      code.getLatLong(code);
      // console.log(code);
    });
  });
  return allZipcodes;
}

Zipcode.prototype.getLatLong = function(code){
  var newArray = [];
  var zipCode = code.zipcode;
  $.get("https://maps.googleapis.com/maps/api/geocode/json?address="+zipCode+"&key=" + apiKey).then(function(response){
    code.LatLong = response.results[0].geometry.location.lat +","+response.results[0].geometry.location.lng;
    // console.log(zipCode + ": " +code.LatLong);
    newArray.push(code);
    // console.log(newArray);

  });

};

// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=

exports.zipcodeModule = Zipcode;
exports.getZipcodesModule = getZipcodes;

},{"./../.env":1}],3:[function(require,module,exports){
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

},{"./../js/zipcode.js":2}]},{},[3]);
