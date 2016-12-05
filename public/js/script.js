var loadPag = function () {
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(good, error);
	}
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

//get address
var pickupLocation = function(){
	var addPickup = $("#startPoint").val();
	var destination = $("#endPoint").val();

	var geocoder = new google.maps.Geocoder();

	geocoder.geocode({"address": addPickup}, geocodeResult);
	geocoder.geocoder({"address": destination}, geocodeResult);
}

var geocodeResult = function(result, status){
	if (status){
		var opMap = {
			center: resultado[0].geometry.location,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
		};

		var map = new google.maps.Map(document.getElementById("map"), opMap);
		map.fitBounds(resultado[0].geometry.viewport);

		var markerOptions = { position: resultado[0].geometry.location }
        var marker = new google.maps.Marker(markerOptions);
        marker.setMap(map);
	}
}