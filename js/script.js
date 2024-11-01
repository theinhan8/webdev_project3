let map;

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    center: { lat: 41.836878, lng: -87.625971 },
    zoom: 9,
  });
  
  // Create marker 
  var marker = new google.maps.Marker({
  map: map,
  position: new google.maps.LatLng(41.836878, -87.625971),
  animation: google.maps.Animation.DROP,
  title: 'Illinois Institute of Technology'
  });

  // Add circle overlay and bind to marker
  var circle = new google.maps.Circle({
  map: map,
  radius: 32186.9, //meters
  fillColor: '#AAAAAA'
  });
  circle.bindTo('center', marker, 'position');
}

initMap();