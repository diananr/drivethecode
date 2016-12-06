var loadPag = function () {
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(good, error);
	}
	$("#estimate").click(showRoute);

	var clientId = 'ydgWzNZ4qVrS';
	var clientSecret = '04gYKvHBfWi_HS7uuiERZqBiH9V_YWBd';

	$.ajax({
	  url: 'https://api.lyft.com/oauth/token',
	  type: 'POST',
	  data: {
	    grant_type: 'client_credentials',
	    scope: 'public'
	  },
	  beforeSend: function (xhr) {
	    xhr.setRequestHeader ("Authorization", "Basic " + btoa(clientId+":"+clientSecret));
	  },
	  success: function(response) {
	    console.log(response);
	  },
	  error: function(error) {
	    console.log(error);
	  }
	});
}


$(document).ready(loadPag);

//show map
var good = function(pos){
	var lat = pos.coords.latitude;
    var lon = pos.coords.longitude;

    var latlon = new google.maps.LatLng(lat, lon);
    var mapa = document.getElementById("map");
    mapa.style.height = "100vh";
    mapa.style.width = "100vw";

  	var myOptions = {
	    center:latlon,
	    zoom:14,
	    mapTypeId:google.maps.MapTypeId.ROADMAP,
	    mapTypeControl:false,

	    navigationControlOptions:{
	    	style: google.maps.NavigationControlStyle.SMALL
	   	}
    };
    
    var map = new google.maps.Map(document.getElementById("map"), myOptions);
}
var error = function(error){
	console.log(error);
}

//show route
var showRoute = function(){
	var directionsDisplay = new google.maps.DirectionsRenderer();
	var directionsService = new google.maps.DirectionsService();

	var geocoder = new google.maps.Geocoder();

	var mapOptions = {
		zoom: 5,
		center: new google.maps.LatLng(40.674389,-4.700432),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById('map'), mapOptions);

	var request = {
		origin: $('#startPoint').val(),
		destination: $('#endPoint').val(),
		travelMode: google.maps.TravelMode.DRIVING
	};

	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById("route"));

	directionsService.route(request, function(result, status) {
  		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(result);
  		}
	});

	geocodeAddress(geocoder, resultsMap, "startPoint");
	geocodeAddress(geocoder, resultsMap, "endPoint");
}

var geocodeAddress= function(geocoder, resultsMap, valor) {
  var address = document.getElementById(valor).value;
  geocoder.geocode({'address': address}, function(results, status) {
    console.log(results);
    console.log(status);
  });
}