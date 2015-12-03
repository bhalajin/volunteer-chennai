/* global google, document, $ */

/*
        --- sample data format ---
[
  {
    type: 'RN',
    data: [
      {
        contact: '',
        area: '',
        no of people: '',
        other: ''
      }
    ]
  },
  {
    type: 'AN',
    data: [
      {
        contact: '',
        name: '',
        area: '',
        no of people: '',
        other: '',
        aid: ''
      }
    ]
  },
  {
    type: 'AO',
    data: [
      {
        contact: '',
        area: '',
        no of people: '',
        other: ''
      }
    ]
  }
]
*/

'use strict';

var geocoder;

var initMap = function () {

  geocoder = new google.maps.Geocoder();

  findCenter( function (centerLoc) {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 9,
      center: centerLoc
    });

    var pinColor = "FE7569"; // should define multiple pin colors

    var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
      new google.maps.Size(21, 34),
      new google.maps.Point(0, 0),
      new google.maps.Point(10, 34));

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
  });
};

var findCenter = function (callback) {
  var center = $('#curLoc').val() + ', chennai';
  geocoder.geocode( { 'address': center}, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      callback({'lat': results[0].geometry.location.lat(), 'lng': results[0].geometry.location.lng()});
    }
  });
};