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
