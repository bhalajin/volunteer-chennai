var initMap = function () {

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 9,
    // should fix zoom based on the location given
    center: {lat: 13.0827, lng: 80.2707}
    // this information should be got from the input used
    // Get the coordinates so that the map use this as the center
  });

  var pinColor = "FE7569"; // should define multiple pin colors

  var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34));

  var geocoder = new google.maps.Geocoder();

  var address = ['MG Nagar, Aadhanoor, Urapakkam', 'kelambakkam', 'Alwarpet', 'Ashok Nagar,Chennai'];
  // this would be changed to a json object with more information available in this array

  for (var i = 0;i < address.length;i++){
    geocoder.geocode( { 'address': address[i]}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var marker = new google.maps.Marker({
          position: {lat: results[0].geometry.location.lat(), lng:results[0].geometry.location.lng()},
          map: map,
          icon: pinImage,
          title: address[i]
        });
      }
    });
  }
};