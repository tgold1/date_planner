
function initMap() {
  var {Map, places} = google.maps;
  var Marker = google.maps.Marker;

  var map = new Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });

  var searchInput = document.getElementById("search");
  var autocomplete = new places.Autocomplete(searchInput);

  var infoWindow = new google.maps.InfoWindow();

  autocomplete.addListener("place_changed", () => {
    var place = autocomplete.getPlace();
    if (place.geometry) {
      map.panTo(place.geometry.location);
      map.setZoom(15);

      var marker = new Marker({
        position: place.geometry.location,
        map: map,
        title: place.name
      });

      marker.addListener("click", () => {
        infoWindow.setContent(place.name);
        infoWindow.open(map, marker);
      });
    }

  });
  // window.initMap = initMap;
}
window.initMap = initMap;

function getTicketmaster () {
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=1f2AwjK2AAERSzyWIP5MWX9nLRXGFLGZ"
    
    fetch (apiUrl) 
        .then (function (response){
            return response.json ();
        })
        .then (function (data){
            console.log (data);

            // data._embedded.events.forEach(function(event) {
              
            //   var latLng = new google.maps.LatLng(event._embedded.venues[0].location.latitude, event._embedded.venues[0].location.longitude);
            //   var marker = new google.maps.Marker({
            //     postion: latLng,
            //     map: map,
            //     title: event.name
            //   });
            // });
        }) ;
    
}
getTicketmaster ()

// window.initMap = initMap;
