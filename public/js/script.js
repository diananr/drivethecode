var loadPag = function () {
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(good, error);
	}
	$("#estimate").click(showRoute);

	autocomplete();
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
    
    var iconBase = 'https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png';
      var marker = new google.maps.Marker({
        position: loatlon,
        map: map,
        icon: iconBase 
    });
}
var error = function(error){
	console.log(error);
}

//show route
var showRoute = function(){
	var directionsDisplay = new google.maps.DirectionsRenderer({
		polylineOptions: {
      		strokeColor: "#9194a1"
    	}
	});
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

	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById("route"));

	directionsService.route(request, function(result, status) {
  		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(result);
  		}
	});
}

//show the predict
var autocomplete = function() {
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



var addressValidator = require('address-validator');
var Address = addressValidator.Address;
var _ = require('underscore');

//any of the props in this object are optional, also spelling does not have to be exact.
var address = new Address({
    street: '100 North Washington St',
    city: 'Bostont',
    state: 'Mass',
    country: 'US'
});

//the passed in address does not need to be an address object it can be a string. (address objects will give you a better likelihood of finding an exact match)
address = '100 North Washington St, Boston, MA, US';

//`addressValidator.match.streetAddress` -> tells the validator that you think the input should be a street address. This data makes the validator more accurate. 
// But, sometimes you dont know.. in that cause you should use `addressValidator.match.unknown`
addressValidator.validate(address, addressValidator.match.streetAddress, function(err, exact, inexact){
    console.log('input: ', address.toString())
    console.log('match: ', _.map(exact, function(a) {
      return a.toString();
    }));
    console.log('did you mean: ', _.map(inexact, function(a) {
      return a.toString();
    }));

    //access some props on the exact match
    var first = exact[0];
    console.log(first.streetNumber + ' '+ first.street);
});