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
