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
  var styleArray = [{"featureType":"all","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#1f1f1f"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"simplified"},{"weight":1.01}]},{"featureType":"water","elementType":"all","stylers":[{"visibility":"on"},{"color":"#6dabc2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#f7f7f7"}]}];

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
    maxZoom: 18
  });
}
