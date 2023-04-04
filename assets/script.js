
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

function getTicketmaster () {
    var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=1f2AwjK2AAERSzyWIP5MWX9nLRXGFLGZ"
    
    fetch (apiUrl) 
        .then (function (response){
            return response.json ()
        })
        .then (function (data){
            console.log (data)
        }) 
    
}
getTicketmaster ()

// window.initMap = initMap;
