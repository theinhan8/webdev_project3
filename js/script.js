let map, infoWindow;

function initMap() {
  // Initialize the map centered on IIT
  const IIT = { lat: 41.836878, lng: -87.625971 };
  map = new google.maps.Map(document.getElementById("map"), {
    center: IIT,
    zoom: 9,
  });

  // Add marker and info window
  const contentString = '<h1>REMINDER</h1><p>New first-year students who are living with a parent/guardian at a residential address within a 20-mile commuting distance from Mies Campus are eligible to commute to campus. If you live outside the 20-mile radius, you must submit a housing waiver.</p>'
  const infowindowIIT = new google.maps.InfoWindow({
    content: contentString,
    ariaLabel: "IIT",
  });
  const markerIIT = new google.maps.Marker({
    position: IIT,
    map,
    title: "Illinois Institute of Technology",
  });

  markerIIT.addListener("mouseover", () => {
    infowindowIIT.open({
      anchor: markerIIT,
      map,
    });
  });

  // InfoWindow for Geolocation
  infoWindow = new google.maps.InfoWindow();

  // Geolocation button
  const locationButton = document.createElement("button");
  locationButton.textContent = "Find Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

  locationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Current Location");
          infoWindow.open(map);
          map.setCenter(pos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
  
  // Add circle overlay around IIT marker
  const circle = new google.maps.Circle({
    map: map,
    radius: 32186.9, // meters
    fillColor: "#AAAAAA",
  });
  circle.bindTo("center", markerIIT, "position");
}

// Handle Geolocation errors
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: Current Location Cannot Be Found."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

window.initMap = initMap;