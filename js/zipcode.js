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
