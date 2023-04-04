function initMap() {
  var {Map, places} = google.maps;

  var map1 = new Map(document.getElementById("map1"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });

  var searchInput = document.getElementById("search");
  var autocomplete = new places.Autocomplete(searchInput);

  autocomplete.addListener("place_changed", () => {
    var place = autocomplete.getPlace();
    if (place.geometry) {
      map1.panTo(place.geometry.location);
      map1.setZoom(15);
    }
    window.initMap = initMap;
  });
}

function initMap2() {
  var {Map, places} = google.maps;

  var map2 = new Map(document.getElementById("map2"), {
    center: { lat: -32.397, lng: 152.644},
    zoom: 10,
  });

  autocomplete.addListener("place_changed", () => {
    var place = autocomplete.getPlace();
    if (place.geometry) {
      map2.panTo(place.geometry.location);
      map2.setZoom(15);
    }
    window.initMap = initMap;
  });
}


