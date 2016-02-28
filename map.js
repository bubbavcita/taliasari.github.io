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
  var styleArray = [
    {
        "featureType": "all",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#f7f7f7"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "weight": "1.20"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            },
            {
                "weight": "0.80"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "weight": "1.00"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "weight": "1.30"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#6fbac5"
            },
            {
                "visibility": "on"
            }
        ]
    }
  ];

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
