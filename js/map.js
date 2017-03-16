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
    console.log(zipcodes);
    console.log("-----------");


    var infowindow = new google.maps.InfoWindow({
      content: "<h4 id='" + zipcodes[i].zipcode +"'><strong>"+ zipcodes[i].zipcode + "</strong></h4><br>" +
               "<p>Number of bikes stolen: " + zipcodes[i].bikes.length + "</p>"
    });

    var marker = new google.maps.Marker(
      {
        map: this.map,
        position: new google.maps.LatLng(zipcodes[i].Lat,zipcodes[i].Long),
        thisInfowindow: infowindow
    });

    markers.push(marker);
    // console.log(markers[i]);
    markers[i].addListener('click', function() {
      for (var a = 0; a < markers.length; a++) {
        markers[a].thisInfowindow.close();
      }
      this.thisInfowindow.open(map, this);
    });
  }
};

exports.mapModule = Map;
