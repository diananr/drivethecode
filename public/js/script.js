var clientId = 'ydgWzNZ4qVrS';
var clientSecret = '04gYKvHBfWi_HS7uuiERZqBiH9V_YWBd';

var lati= localStorage.getItem("latitud");
var lati1= localStorage.getItem("latitud1");
var longi= localStorage.getItem("longitud");
var longi1= localStorage.getItem("longitud1");

var loadPag = function () {
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(good, error);
	}
	$("#estimate").click(showRoute);

	initialize();
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

	var mapOptions = {
		zoom: 5,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	var map = new google.maps.Map(document.getElementById('map'), mapOptions);

	var request = {
		origin: $('#startPoint').val(),
		destination: $('#endPoint').val(),
		travelMode: google.maps.TravelMode.DRIVING
	};

	var geocoder = new google.maps.Geocoder();

	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById("route"));

	directionsService.route(request, function(result, status) {
  		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(result);
  		}
	});

	geocodeAddress(geocoder, "startPoint", "latitud", "longitud");
	geocodeAddress(geocoder, "endPoint",  "latitud1", "longitud1");

	$.ajax({
	    url: 'https://api.lyft.com/v1/cost?ride_type=lyft&start_lat='+lati+'&start_lng='+longi+'&end_lat='+lati1+'&end_lng='+longi1,
	    type: 'GET',
	    beforeSend: function(xhr) {
             xhr.setRequestHeader("Authorization", "Bearer "+clientId);
        },
	    success: function(response){
	    	console.log(response);
	    }
	})
}

//show the predict
var initialize = function() {
	var defaultBounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(40.802089, -124.163751)
		);

	var origin_input = document.getElementById('startPoint');
	var destination_input = document.getElementById('endPoint');

	var options = {
		bounds: defaultBounds
	};

	var autocomplete_origin = new google.maps.places.Autocomplete(origin_input, options);    
	var autocomplete_destination = new google.maps.places.Autocomplete(destination_input, options);
}


var geocodeAddress= function(geocoder, valor, lat,lon) {
  var address = document.getElementById(valor).value;
  geocoder.geocode({'address': address}, function(results, status) {
  	localStorage.setItem(lat, results[0].geometry.location.lat());
  	localStorage.setItem(lon, results[0].geometry.location.lng());
  });
}
