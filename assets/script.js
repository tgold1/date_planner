
function initMap() {
  var {Map, places} = google.maps;

<<<<<<< HEAD
  var map1 = new Map(document.getElementById("map"), {
=======
  var map = new Map(document.getElementById("map"), {
>>>>>>> 4086cde2212f7e3d637bcef03c88ddc16bd53eb4
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });

  var searchInput = document.getElementById("search");
  var autocomplete = new places.Autocomplete(searchInput);

  autocomplete.addListener("place_changed", () => {
    var place = autocomplete.getPlace();
    if (place.geometry) {
<<<<<<< HEAD
      map1.panTo(place.geometry.location);
      map1.setZoom(15);
=======
      map.panTo(place.geometry.location);
      map.setZoom(15);
>>>>>>> 4086cde2212f7e3d637bcef03c88ddc16bd53eb4
    }
    window.initMap = initMap;
  });
}
<<<<<<< HEAD


=======
>>>>>>> 4086cde2212f7e3d637bcef03c88ddc16bd53eb4

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

<<<<<<< HEAD
=======
// window.initMap = initMap;
>>>>>>> 4086cde2212f7e3d637bcef03c88ddc16bd53eb4
