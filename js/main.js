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
      i = 0;
      iter = 0;
      initMap();
    }
  });
};

var map;

var initMap = function () {

  geocoder = new google.maps.Geocoder();

  findCenter( function (centerLoc) {
    map = new google.maps.Map(document.getElementById('map'), {
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
    plotOption(data);
  });
};

var i = 0;
var plotOption = function (data) {
  if (i < data.length) {
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
    plotLoc(data, i, pinImage, function (){
      i++;
      plotOption(data);
    });
  }
};

var iter = 0;
var plotLoc = function (data, i, pinImage, callback) {
  if (iter < data[i].data.length) {
    geocoder.geocode( { 'address': data[i].data[iter].area}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        var marker = new google.maps.Marker({
          position: {lat: results[0].geometry.location.lat(), lng:results[0].geometry.location.lng()},
          map: map,
          icon: pinImage,
          title: 'hello world'
        });
      }
      iter ++;
      plotLoc(data, i, pinImage, callback);
    });
  } else {
    iter = 0;
    callback();
  }
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