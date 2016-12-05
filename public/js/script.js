var loadPag = function () {
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(good, error);
	}
	$("#estimate").click(pickupLocation);
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

var pickupLocation = function(){
	var directionsDisplay = new google.maps.DirectionsRenderer();
	var directionsService = new google.maps.DirectionsService();
}

var request = {
	origin: $('#startPoint').val(),
	destination: $('#endPoint').val(),
	provideRouteAlternatives: true
};

directionsService.route(request, function(response, status) {
    if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setMap(map);
        directionsDisplay.setPanel($("#ruta").get(0));
        directionsDisplay.setDirections(response);
    } else {
        alert("No existen rutas entre ambos puntos");
    }
});



//get address
// var pickupLocation = function(){
// 	var addPickup = $("#startPoint").val();
// 	//var destination = $("#endPoint").val();

// 	var geocoder = new google.maps.Geocoder();

// 	geocoder.geocode({"address": addPickup}, geocodeResult);
// }

// var geocodeResult = function(result, status){
// 	if (status){
// 		var opMap = {
// 			center: result[0].geometry.location,
// 			mapTypeId: google.maps.MapTypeId.ROADMAP,
// 		};

// 		var map = new google.maps.Map(document.getElementById("map"), opMap);
// 		map.fitBounds(result[0].geometry.viewport);

// 		var markerOptions = { position: result[0].geometry.location }
//         var marker = new google.maps.Marker(markerOptions);
//         marker.setMap(map);
// 	}
