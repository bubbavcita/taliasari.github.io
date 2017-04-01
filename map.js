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
  var styleArray =  [{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text.fill","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.text.stroke","stylers":[{"visibility":"off"}]},{"featureType":"all","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"off"},{"color":"#ffffff"}]},{"featureType":"landscape","elementType":"geometry.stroke","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural.terrain","elementType":"geometry.fill","stylers":[{"color":"#000000"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#ffffff"}]},{"featureType":"poi.attraction","elementType":"all","stylers":[{"visibility":"off"},{"color":"#ff0000"}]},{"featureType":"poi.business","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.government","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.medical","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#000000"}]},{"featureType":"road","elementType":"all","stylers":[{"color":"#000000"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"weight":"3"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"weight":"3.00"}]},{"featureType":"road.local","elementType":"labels","stylers":[{"color":"#ffffff"},{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#83c9d9"},{"visibility":"on"}]}];

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
    "zoom": 1,
    "size": 1
  }

  for (var key in params) {
    if (params.hasOwnProperty(key) && (!(key in ignore_params))) {
      var ul = document.getElementById("fields");
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(key + ": " + params[key]));
      ul.appendChild(li);
    }
  }


  if (params["size"]) {
    document.getElementById('map').style.height=params["size"]+"px";
    document.getElementById('map').style.width=params["size"]+"px";
  }

    
//   mapboxgl.accessToken = 'pk.eyJ1IjoidGFsaWFzYXJpZGV2IiwiYSI6ImNqMHoycjUxaTAyNHAyd3BlbW1hamprcW8ifQ.17P_6A1bBDU_XTj3kKMi0w';
//       style: 'mapbox://styles/mapbox/streets-v9',

  mapboxgl.accessToken = 'pk.eyJ1IjoidGFsaWFzYXJpIiwiYSI6ImY4MzcwNjAyMDRjZGUyOTZmMjM0OGFlYmRhMmI4YjdjIn0.qfgdEmate5DzRnG1vZHOCw';  
  map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/taliasari/cj0srdor100712rqrepc42428',
  attributionControl: false,
  zoom: myCenter.zoom,
  center: [myCenter.lng, myCenter.lat]
  });

  map.on('load', function (e) {
    map.resize();
    map.scrollZoom.disable();
  });    
    
//    map = new google.maps.Map(document.getElementById('map'), {
//     center: myCenter,
//     styles: styleArray,
//     scrollwheel: false,
//     zoom: myCenter.zoom,
//     disableDefaultUI: true,
// //    minZoom: 13,
//     zoomControl: false
// //    maxZoom: 18
//   });
}
