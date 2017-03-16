(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "AIzaSyApBa-WXsJ7_rzeREUMDEnjUvCe28oEtvw";

},{}],2:[function(require,module,exports){
function Map() {
  var userLatLng = new google.maps.LatLng(45.48563720000001,-122.5946256);
  var myOptions = {
    zoom : 11,
    center : userLatLng,
    mapTypeId : google.maps.MapTypeId.ROADMAP
  };
  // Draw the map - you have to use 'getElementById' here.
  this.map = new google.maps.Map(document.getElementById("map"), myOptions);
}

Map.prototype.fillMap = function(zipcodes){

  // Place the marker
  var markers = [];
  for(var i = 0; i<zipcodes.length; i++){
    console.log(zipcodes[i]);


    $('#zip-bike-info').append("<div id='" + zipcodes[i].zipcode + "' class='zipcodes'>" + zipcodes[i].zipcode + " Bikes Stolen: " + zipcodes[i].bikes.length + "<ul></ul></div>");
    for (var bikeIndex = 0; bikeIndex < zipcodes[i].bikes.length; bikeIndex++) {
      $('#'+zipcodes[i].zipcode).children('ul').append("<li> <ul>" +
      "<li>"+ zipcodes[i].bikes[bikeIndex].manufacturer_name +  "</li>" +
      "<li>" + zipcodes[i].bikes[bikeIndex].title + "</li>" +
      "<li>" + zipcodes[i].bikes[bikeIndex].frame_model + "</li>" +
      "<li>" + zipcodes[i].bikes[bikeIndex].serial + "</li>" +
      "<li><img src='" + zipcodes[i].bikes[bikeIndex].thumb + "'></li>" +
      "</ul></li>");
    }

    var infowindow = new google.maps.InfoWindow({
      content: "<h4><strong>"+ zipcodes[i].zipcode + "</strong></h4><br>" +
               "<p>Number of bikes stolen: " + zipcodes[i].bikes.length + "</p>"
    });

    var marker = new google.maps.Marker(
      {
        map: this.map,
        position: new google.maps.LatLng(zipcodes[i].Lat,zipcodes[i].Long),
        thisInfowindow: infowindow,
        zipcode: zipcodes[i].zipcode
    });

    markers.push(marker);
    // console.log(markers[i]);
    markers[i].addListener('click', function() {
      for (var a = 0; a < markers.length; a++) {
        markers[a].thisInfowindow.close();
      }
      $(".zipcodes").hide();
      $('#'+this.zipcode).show();
      this.thisInfowindow.open(map, this);
    });
  }
};

exports.mapModule = Map;

},{}],3:[function(require,module,exports){
var apiKey = require('./../.env').apiKey;
var Map = require('./../js/map.js').mapModule;

function Zipcode(code) {
  this.zipcode = code;
  this.bikes = [];
  this.Lat = null;
  this.Long = null;
}

function getZipcodes(city, range){
  var allZipcodes = [];
  var newMap = new Map();
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
  }).then(function() {
    setTimeout(function(){
      newMap.fillMap(allZipcodes);

    },800);
    console.log(allZipcodes);
    // console.log("-----^^ is right!");
  });
  // return allZipcodes;
}

Zipcode.prototype.getLatLong = function(code){
  var newArray = [];
  var zipCode = code.zipcode;
  $.get("https://maps.googleapis.com/maps/api/geocode/json?address="+zipCode+"&key=" + apiKey).then(function(response){
    code.Lat = response.results[0].geometry.location.lat;
    code.Long = response.results[0].geometry.location.lng;
    // console.log(zipCode + ": " +code.LatLong);
    newArray.push(code);
    // console.log(newArray);

  });

};

// https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=

exports.zipcodeModule = Zipcode;
exports.getZipcodesModule = getZipcodes;

},{"./../.env":1,"./../js/map.js":2}],4:[function(require,module,exports){
var Zipcode = require("./../js/zipcode.js").zipcodeModule;
var getZipcodes = require("./../js/zipcode.js").getZipcodesModule;
var Map = require("./../js/map.js").mapModule;



$(function(){
  var newMap = new Map();
  var zipcodes = [];

  // $.get("https://portland.craigslist.org/search/bik", function(response){
  //   console.log(response);
  // });

  $('#search').click(function(event) {
    event.preventDefault();
    var city = $('#city-name').val();
    var range = $("#range").val();
    // var test = new Zipcode();
    zipcodes = getZipcodes(city, range);

    // console.log(zipcodes);

  });
  // $("#make-map").click(function(){
  //   // newMap.fillMap(zipcodes);
  // });
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

},{"./../js/map.js":2,"./../js/zipcode.js":3}]},{},[4]);
