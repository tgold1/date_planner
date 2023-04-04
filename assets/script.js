var gettickEvent = function () {
    var apiUrl = 'https://app.ticketmaster.com/discovery/v2/events.json?countryCode=US&apikey=1f2AwjK2AAERSzyWIP5MWX9nLRXGFLGZ';
    console.log(apiUrl)
  
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            displayVenues(data);
            console.log(data)
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to Ticketmaster');
      });
  };
  apiUrl ()