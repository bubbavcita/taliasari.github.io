function URLToArray(url) {
    var request = {};
    var pairs = url.substring(url.indexOf('?') + 1).split('&');
    for (var i = 0; i < pairs.length; i++) {
        if(!pairs[i])
            continue;
        var pair = pairs[i].split('=');
        request[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]).replace( /\+/g, ' ' );
     }
     return request;
}

function initMap() {
  var styleArray = [{
    "featureType": "all",
    "elementType": "labels",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "administrative",
    "elementType": "all",
    "stylers": [{
      "hue": "#ff0000"
    }, {
      "lightness": 100
    }, {
      "visibility": "off"
    }]
  }, {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "administrative",
    "elementType": "labels",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "landscape",
    "elementType": "all",
    "stylers": [{
      "hue": "#ffffff"
    }, {
      "saturation": -100
    }, {
      "lightness": 100
    }, {
      "visibility": "on"
    }]
  }, {
    "featureType": "landscape",
    "elementType": "geometry.fill",
    "stylers": [{
      "visibility": "on"
    }, {
      "color": "#f7f7f7"
    }]
  }, {
    "featureType": "landscape",
    "elementType": "geometry.stroke",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "landscape",
    "elementType": "labels",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "landscape.natural",
    "elementType": "geometry.fill",
    "stylers": [{
      "visibility": "off"
    }, {
      "color": "#ff0000"
    }]
  }, {
    "featureType": "poi",
    "elementType": "all",
    "stylers": [{
      "hue": "#ffffff"
    }, {
      "saturation": -100
    }, {
      "lightness": 100
    }, {
      "visibility": "off"
    }]
  }, {
    "featureType": "poi",
    "elementType": "labels",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [{
      "visibility": "off"
    }, {
      "color": "#e0e0e0"
    }]
  }, {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [{
      "hue": "#000000"
    }, {
      "saturation": -100
    }, {
      "lightness": -100
    }, {
      "visibility": "simplified"
    }]
  }, {
    "featureType": "road",
    "elementType": "labels",
    "stylers": [{
      "hue": "#ff0000"
    }, {
      "saturation": -100
    }, {
      "lightness": 100
    }, {
      "visibility": "off"
    }]
  }, {
    "featureType": "road.highway",
    "elementType": "labels",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [{
      "visibility": "simplified"
    }]
  }, {
    "featureType": "road.arterial",
    "elementType": "geometry.stroke",
    "stylers": [{
      "visibility": "simplified"
    }]
  }, {
    "featureType": "road.local",
    "elementType": "geometry.stroke",
    "stylers": [{
      "visibility": "simplified"
    }, {
      "weight": "0.50"
    }, {
      "lightness": "0"
    }]
  }, {
    "featureType": "transit",
    "elementType": "geometry",
    "stylers": [{
      "hue": "#000000"
    }, {
      "lightness": -100
    }, {
      "visibility": "on"
    }]
  }, {
    "featureType": "transit",
    "elementType": "geometry.fill",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "transit",
    "elementType": "geometry.stroke",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "transit",
    "elementType": "labels",
    "stylers": [{
      "hue": "#ff0000"
    }, {
      "lightness": 100
    }, {
      "visibility": "off"
    }]
  }, {
    "featureType": "transit",
    "elementType": "labels.text",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "transit.station",
    "elementType": "geometry.fill",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "transit.station",
    "elementType": "geometry.stroke",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "transit.station.rail",
    "elementType": "all",
    "stylers": [{
      "visibility": "off"
    }]
  }, {
    "featureType": "water",
    "elementType": "all",
    "stylers": [{
      "hue": "#00afff"
    }, {
      "saturation": -100
    }, {
      "lightness": 100
    }, {
      "visibility": "simplified"
    }]
  }, {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [{
      "visibility": "on"
    }, {
      "color": "#68c5d5"
    }]
  }, {
    "featureType": "water",
    "elementType": "labels",
    "stylers": [{
      "visibility": "off"
    }]
  }]

  var params = URLToArray(window.location.search);
  console.log(params);

  myCenterUrl = undefined;

  if (("lat" in params) && ("lng" in params) && ("zoom" in params)) {
    myCenter = {
      lat: Number(params["lat"]),
      lng: Number(params["lng"]),
      zoom: Number(params["zoom"])
    }
  } else {
    myCenter = {
      lat: 32.0663195,
      lng: 34.771751,
      zoom: 15
    }
  }

  var ignore_params = {
    "lat": 1,
    "lng": 1,
    "zoom": 1
  }

  for (var key in params) {
    if (params.hasOwnProperty(key) && (!(key in ignore_params))) {
      var ul = document.getElementById("fields");
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(key + ": " + params[key]));
      ul.appendChild(li);
    }
  }

  console.log('myCenter: ', myCenter)

  map = new google.maps.Map(document.getElementById('map'), {
    center: myCenter,
    styles: styleArray,
    scrollwheel: false,
    zoom: myCenter.zoom,
    disableDefaultUI: true,
    minZoom: 13,
    zoomControl: false,
    maxZoom: 17
  });
}
