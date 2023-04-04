function initMap() {
  var {Map, places} = google.maps;

  var map = new Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });

  var searchInput = document.getElementById("search");
  var autocomplete = new places.Autocomplete(searchInput);

  autocomplete.addListener("place_changed", () => {
    var place = autocomplete.getPlace();
    if (place.geometry) {
      map.panTo(place.geometry.location);
      map.setZoom(15);
    }
    window.initMap = initMap;
  });
}


// window.initMap = initMap;
