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

var zoomlevel;

var loadPage = function () {
  $('#curLoc').keypress(function(e) {
    if (e.keyCode == 13) {
      initMap();
    }
  });
};

var initMap = function () {

  geocoder = new google.maps.Geocoder();

  findCenter( function (centerLoc) {
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: zoomlevel,
      center: centerLoc
    });

    var data = [
      {
        type: 'RN',
        data: [
          {
            contact: '+919176281689',
            area: 'MG Nagar, Aadhanoor, Urapakkam ',
            people: '4',
            other: ''
          }
        ]
      },
      {
        type: 'AN',
        data: [
          {
            contact: '9003163805',
            name: 'Rajamani',
            area: 'Ashok nagar - Raghavan colony',
            other: '',
            aid: 'Food, Water'
          }
        ]
      },
      {
        type: 'AO',
        data: [
          {
            contact: '9840042152',
            area: 'Meenambakkam',
            people: '500',
            other: ''
          }
        ]
      }
    ];
    for (var i = 0;i < data.length;i++) {
      var pinColor;
      if (data[i].type === 'RN') {
        pinColor = "FE7569";
      } else if (data[i].type === 'AN') {
        pinColor = "FE0069";
      } else if (data[i].type === 'AO') {
        pinColor = "007569";
      }
      var pinImage = new google.maps.MarkerImage("http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|" + pinColor,
        new google.maps.Size(21, 34),
        new google.maps.Point(0, 0),
        new google.maps.Point(10, 34));

      for (var i = 0;i < data[i].data.length;i++) {
        geocoder.geocode( { 'address': data[i].data.area}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            var marker = new google.maps.Marker({
              position: {lat: results[0].geometry.location.lat(), lng:results[0].geometry.location.lng()},
              map: map,
              icon: pinImage,
              title: 'hello world'
            });
          }
        });
      }
    }
  });
};

var findCenter = function (callback) {
  var center = $('#curLoc').val() + ', chennai';
  zoomlevel = ($('#curLoc').val().toLowerCase() === 'chennai')?10:13;
  geocoder.geocode( { 'address': center}, function (results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      callback({'lat': results[0].geometry.location.lat(), 'lng': results[0].geometry.location.lng()});
    }
  });
};