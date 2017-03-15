(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function Zipcode() {

}

exports.zipcodeModule = Zipcode;

},{}],2:[function(require,module,exports){
var Zipcode = require("./../js/zipcode.js").bikeModule;

$(function(){
  $.get("https://bikeindex.org/api/v3/search?page=1&per_page=100&location=97206&distance=10&stolenness=proximity", function(response){
    console.log(response);
  });

    $('#search').click(function(event) {
      event.preventDefault();
      var city = $('#city-name').val();
      $.get("https://bikeindex.org/api/v3/search?page=1&per_page100&location=" + city + "&distance=10&stoleness=proximity").then(function(response) {
        var zipCodes = [];
        var bikes = response.bikes;
        for (var index = 0; index < bikes.length; index++) {
          var zipCode = bikes[index].stolen_location.match(/\d+/g);
          console.log(zipCode)
        }
      });
    });

  });

},{"./../js/zipcode.js":1}]},{},[2]);
