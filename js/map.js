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
      var img = "<img src='" + zipcodes[i].bikes[bikeIndex].thumb + "'>";
      if (!zipcodes[i].bikes[bikeIndex].thumb) {
        img = "no picture!";
      }
      $('#'+zipcodes[i].zipcode).children('ul').append("<li> <ul>" +
      "<li>"+ zipcodes[i].bikes[bikeIndex].manufacturer_name +  "</li>" +
      "<li>" + zipcodes[i].bikes[bikeIndex].title + "</li>" +
      "<li>" + zipcodes[i].bikes[bikeIndex].frame_model + "</li>" +
      "<li>" + zipcodes[i].bikes[bikeIndex].serial + "</li>" +
      "<li>" + img + "</li>" +
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
