var Zipcode = require("./../js/zipcode.js").zipcodeModule;
var getZipcodes = require("./../js/zipcode.js").getZipcodesModule;


$(function(){
  $.get("https://bikeindex.org/api/v3/search?page=1&per_page=100&location=97206&distance=10&stolenness=proximity", function(response){
    // console.log(response);
  });

  $('#search').click(function(event) {
    event.preventDefault();
    var city = $('#city-name').val();
    // var test = new Zipcode();
    var zipcodes = getZipcodes(city);
    console.log(zipcodes);
  });

  });
