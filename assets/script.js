var submitButton = document.querySelector("#submit");
var cityName = document.querySelector("#city-search");
var ulElement = document.querySelector(".event-list");
var googleLocation = document.querySelector(".location");


function getData(){
  
  var cityText = cityName.value;

var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + cityText + "&onsaleOnStartDate=2023-04-07&apikey=1f2AwjK2AAERSzyWIP5MWX9nLRXGFLGZ"
    
    fetch (apiUrl) 
        .then (function (response){
            return response.json ();
        })
        //getting name of venue for event in searched city
        .then (function (data){
          console.log(data._embedded.events.length)
          console.log(data._embedded.events)
          var arrayItems = []
          for (var i = 0; i < data._embedded.events.length - 1; i++) {
            // if any of the below fields are missing, loop will fail
            arrayItems.push(data._embedded.events[i]._embedded.venues[0].name + ": " + data._embedded.events[i].classifications[0].segment.name + ": " + data._embedded.events[i].classifications[0].subGenre.name)

            //logging venue name, Event Type, and Subgenre.
            //  console.log (data._embedded.events[i]._embedded.venues[0].name + ": " + data._embedded.events[i].classifications[0].segment.name + ": " + data._embedded.events[i].classifications[0].subGenre.name)
             var event =(data._embedded.events[i]._embedded.venues[0].name + ": " + data._embedded.events[i].classifications[0].segment.name + ": " + data._embedded.events[i].classifications[0].subGenre.name)
             console.log(event)

          
          }
          console.log(arrayItems)
          for (var i = 0; i < arrayItems.length; i++) {
            var buttonElement = document.createElement("button");
            buttonElement.setAttribute("class", "location")
            var liElement = document.createElement("li");

            buttonElement.textContent = (arrayItems[i]);

          liElement.appendChild(buttonElement)
            ulElement.appendChild(liElement)
          }
            
        })
      }
var map;

function initMap() {
  var {Map, places} = google.maps;
  var Marker = google.maps.Marker;

  map = new Map(document.getElementById("map"), {
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
        console.log(place.name);
        var eventName = place.name
        console.log(eventName);
      });

      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: searchInput.value }, function(results, status) {
        if (status === "OK") {
          var latLng = results[0].geometry.location;
          console.log("latitude: ", latLng.lat());
          console.log("Longitude: ", latLng.lng());
        } else {
          console.error("geocode not successful", status);
        }
      });
    }

      var request = {
      location: map.getCenter(),
      radius: 500,
      type: "restaurant",
};
  
    var service = new places.PlacesService(map);

  
    service.nearbySearch(request, (results, status) => {
      if (status === places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
          var place = results[i];
          var marker = new google.maps.Marker({
            map: map,
            position: place.geometry.location,
            title: place.name
          });

          (function(marker, place) {
            marker.addListener("click", () => {
              infoWindow.setContent(place.name);
              infoWindow.open(map, marker);
              console.log(place.name + ": " + place.types[0]);
              
            });
          })(marker, place);
        }
      }
    });
  });
}
window.initMap = initMap;


submitButton.addEventListener("click", getData)






// function searchNearby() {
//   var {Map, places} = google.maps;
//   console.log("hi there");
//   var map = new Map(document.getElementById("map"));
  

//   var request = {
//     location: map.getCenter(),
//     radius: 500,
//     type: "restaurant"
//   };

//   var service = new places.PlacesService(map);

//   service.nearbySearch(request, (results, status) => {
//     if (status === places.PlacesServiceStatus.OK) {
//       // display search results on page? 
//       for (var i = 0; i < results.length; i++) {
//         var place = results[i];
//         var marker = new google.maps.Marker({
//           map: map,
//           position: place.geometry.location,
//           title: place.name
//         });
//       }
//     }
//   });
// }




// var savedLocation = document.getElementById("saved");
// var isFirstSearch = true;
// var firstSearchedLocation = "";


// function searchNearby() {
//   var { Map } = google.maps;
//   var map = new Map(document.getElementById("map"), {
//     center: {lat: -34.397, lng: 150.644},
//     zoom: 5,
//   });

//   var location = map.getCenter();

//   var radius = document.querySelector(".dropdown-item .is-active").id;
//   switch (radius) {
//     case "less-than-1":
//       radius = 1609; // 1 mile = 1609 meters
//       break;
//     case "1-2":
//       radius = 3219; // 2 miles = 3219 meters
//       break;
//     case "2+":
//       radius = 4828; // 3 miles = 4828 meters
//       break;
//     default:
//       radius = 1609; // Default radius is 1 mile
//   }

//   function addEventListener() {
//     $("radius").on("click", function() {
//       radius = $(this).attr('id');
//       switch (radius) {
//         case "less-than-1":
//         radius = 1609; // 1 mile = 1609 meters
//         break;
//       case "1-2":
//         radius = 3219; // 2 miles = 3219 meters
//         break;
//       case "2+":
//         radius = 4828; // 3 miles = 4828 meters
//         break;
//       default:
//         radius = 1609; // Default radius is 1 mile
//       }
//       console.log(radius);
//       searchNearby();
//     });
//   }

//   var request = {
//     location: location,
//     radius: radius,
//     type: ["restaurant"],
//   }

//   var service = new google.maps.places.PlacesService(map);
//   service.nearbySearch(request, function (results, status) {
//     if (status == google.maps.places.PlacesServiceStatus.OK) {
//       for (var i = 0; i < results.length; i++) {
//         var place = results[i];
//         var marker = new google.maps.Marker({
//           position: place.geometry.location,
//           map: map,
//           title: place.name,
//         });

//         google.maps.event.addListener(marker, "click", function () {
//           var contentString =
//             "<h3>" + place.name + "</h3>" + "<p>" + place.vicinity + "</p>";
//           var infowindow = new google.maps.InfoWindow({
//             content: contentString,
//           });
//           infowindow.open(map, marker);
//         });
//       }
      
//       if (isFirstSearch) {
//         firstSearchedLocation = results[0].name;
//         savedLocation.innerText = `First searched location: ${firstSearchedLocation}`;
//         console.log(`First searched location: ${firstSearchedLocation}`);
//         isFirstSearch = false;
//       }
      
//     } else {
//       console.log("Nearby search failed. Status: ", status);
//     }
//   });
// }

// function getTicketmaster () {
//     var apiUrl = "https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=1f2AwjK2AAERSzyWIP5MWX9nLRXGFLGZ"
    
//     fetch (apiUrl) 
//         .then (function (response){
//             return response.json ();
//         })
//         .then (function (data){
//             console.log (data);

            // data._embedded.events.forEach(function(event) {
              
            //   var latLng = new google.maps.LatLng(event._embedded.venues[0].location.latitude, event._embedded.venues[0].location.longitude);
            //   var marker = new google.maps.Marker({
            //     postion: latLng,
            //     map: map,
            //     title: event.name
            //   });
            // });
//         }) ;
    
// }
// getTicketmaster ()

// function getLocation() {
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(showPosition, showError);
//     } else {
//         var x = document.getElementById("location");
//         x.innerHTML = "Geolocation is not supported by this browser.";
//     }
// }


// function showError(error) {
//     switch(error.code) {
//         case error.PERMISSION_DENIED:
//             x.innerHTML = "User denied the request for Geolocation."
//             break;
//         case error.POSITION_UNAVAILABLE:
//             x.innerHTML = "Location information is unavailable."
//             break;
//         case error.TIMEOUT:
//             x.innerHTML = "The request to get user location timed out."
//             break;
//         case error.UNKNOWN_ERROR:
//             x.innerHTML = "An unknown error occurred."
//             break;
//     }
// }

// // window.initMap = initMap;
// function showPosition(position) {
//     var x = document.getElementById("location");
//     x.innerHTML = "Latitude: " + position.coords.latitude + 
//     "<br>Longitude: " + position.coords.longitude; 
//     var latlon = position.coords.latitude + "," + position.coords.longitude;


//     $.ajax({
//       type:"GET",
//       url:"https://app.ticketmaster.com/discovery/v2/events.json?apikey=1f2AwjK2AAERSzyWIP5MWX9nLRXGFLGZ&latlong="+latlon,
//       async:true,
//       dataType: "json",
//       success: function(json) {
//                   console.log(json);
//                   var e = document.getElementById("events");
//                   e.innerHTML = json.page.totalElements + " events found.";
//                   showEvents(json);
//                   initMap(position, json);
//                },
//       error: function(xhr, status, err) {
//                   console.log(err);
//                }
//     });

// }

// function showEvents(json) {
//     for(var i=0; i<json.page.size; i++) {
//       $("#events").append("<p>"+json._embedded.events[i].name+"</p>");
//     }
//   }
  
  
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
  
  // function addMarker(map, event) {
  //   var marker = new google.maps.Marker({
  //     position: new google.maps.LatLng(event._embedded.venues[0].location.latitude, event._embedded.venues[0].location.longitude),
  //     map: map
  //   });
  //   marker.setIcon('http://maps.google.com/mapfiles/ms/icons/red-dot.png');
  //   console.log(marker);
  // }
