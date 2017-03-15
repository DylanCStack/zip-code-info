(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Zipcode(code) {
  this.zipcode = code;
  this.bikes = [];
}

function getZipcodes(city, range){
  $.get("https://bikeindex.org/api/v3/search?page=1&per_page=100&location=" + city +
   "&distance="+ range +"&stolenness=proximity").then(function(response) {
    var allZipcodes = [];
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
    console.log(allZipcodes);
    return allZipcodes;
  });
}

exports.zipcodeModule = Zipcode;
exports.getZipcodesModule = getZipcodes;

},{}],2:[function(require,module,exports){
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
  });

  });

},{"./../js/zipcode.js":1}]},{},[2]);
