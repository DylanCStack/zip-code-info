
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
  for(var i = 0; i<zipcodes.length; i++){
    new google.maps.Marker({
      map: this.map,
      position: new google.maps.LatLng(zipcodes[i].Lat,zipcodes[i].Long)
    });
  }
};

exports.mapModule = Map;
