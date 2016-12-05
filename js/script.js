var loadPag = function () {
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(good, error);
	}
}

$(document).ready(loadPag);

var good = function(pos){
	var lat = pos.coords.latitude;
    var lon = pos.coords.longitude;

    var latlon = new google.maps.LatLng(lat, lon);
    var mapa = document.getElementById("map");
    mapa.style.height = "100%";
    mapa.style.width = "100%";

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

