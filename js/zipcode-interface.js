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
