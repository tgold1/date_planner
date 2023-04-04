
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

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        var x = document.getElementById("location");
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}


function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}

// window.initMap = initMap;
function showPosition(position) {
    var x = document.getElementById("location");
    x.innerHTML = "Latitude: " + position.coords.latitude + 
    "<br>Longitude: " + position.coords.longitude; 
    var latlon = position.coords.latitude + "," + position.coords.longitude;


    $.ajax({
      type:"GET",
      url:"https://app.ticketmaster.com/discovery/v2/events.json?apikey=1f2AwjK2AAERSzyWIP5MWX9nLRXGFLGZ&latlong="+latlon,
      async:true,
      dataType: "json",
      success: function(json) {
                  console.log(json);
                  var e = document.getElementById("events");
                  e.innerHTML = json.page.totalElements + " events found.";
                  showEvents(json);
                  initMap(position, json);
               },
      error: function(xhr, status, err) {
                  console.log(err);
               }
    });

}

function showEvents(json) {
    for(var i=0; i<json.page.size; i++) {
      $("#events").append("<p>"+json._embedded.events[i].name+"</p>");
    }
  }
  
  
  // function initMap(position, json) {
  //   var mapDiv = document.getElementById('map');
  //   var map = new google.maps.Map(mapDiv, {
  //     center: {lat: position.coords.latitude, lng: position.coords.longitude},
  //     zoom: 10
  //   });
  //   for(var i=0; i<json.page.size; i++) {
  //     addMarker(map, json._embedded.events[i]);
  //   }
  // }
  
  function addMarker(map, event) {
    var marker = new google.maps.Marker({
      position: new google.maps.LatLng(event._embedded.venues[0].location.latitude, event._embedded.venues[0].location.longitude),
      map: map
    });
    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
    console.log(marker);
  }
