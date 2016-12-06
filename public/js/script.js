var clientId = 'hu8yWg5fJYQ_';
var clientSecret = 'vL8Xk8zs1RCLAeL7ZlsD-CSBsgHkbIoq';

var start_lat= parseFloat(localStorage.getItem("latitud"));
var start_lng= parseFloat(localStorage.getItem("longitud"));
var end_lat= parseFloat(localStorage.getItem("latitud1"));
var end_lng= parseFloat(localStorage.getItem("longitud1"));
var access_token = null;

var good= function(){
		var mapa= document.getElementById('map');
		mapa.style.height= "100vh";
		mapa.style.width= "100vw";

	  var map = new google.maps.Map(mapa, {
	    center: {lat: -33.8688, lng: 151.2195},
	    zoom: 13
	  });
	  var geocoder = new google.maps.Geocoder();

	  var image1= "img/origin.png"
	  var image2= "img/destination.png"
	  var input = /** @type {!HTMLInputElement} */(document.getElementById('startPoint'));
	  var inputDos=  document.getElementById("endPoint");
	  
	  var autocomplete = new google.maps.places.Autocomplete(input);
	  
	  autocomplete.bindTo('bounds', map);
	  
	  var marker = new google.maps.Marker({
	    map: map,
	    anchorPoint: new google.maps.Point(0, -29)
	  });

	  autocomplete.addListener('place_changed', function() {
	    marker.setVisible(false);
	    var place = autocomplete.getPlace();
	    if (!place.geometry) {
	      window.alert("Autocomplete's returned place contains no geometry");
	      return;
	    }
	    // If the place has a geometry, then present it on a map.
	    if (place.geometry.viewport) {
	      map.fitBounds(place.geometry.viewport);
	    } else {
	      map.setCenter(place.geometry.location);
	      map.setZoom(17);  // Why 17? Because it looks good.
	    }
	    marker.setIcon(/** @type {google.maps.Icon} */({
	      url: image1,
	    }));
	    
	    marker.setPosition(place.geometry.location);
	    marker.setVisible(true);
	    var address = '';
	    geocodeAddress(geocoder, input, "latitud", "longitud");
	  });

	  var autocompleteDos = new google.maps.places.Autocomplete(inputDos);
	  autocompleteDos.bindTo('bounds', map);
	  
	  var markerDos = new google.maps.Marker({
	    map: map,
	    anchorPoint: new google.maps.Point(0, -29)
	  });
	  autocompleteDos.addListener('place_changed', function() {
	    markerDos.setVisible(false);
	    var place = autocompleteDos.getPlace();
	    
	    if (!place.geometry) {
	      window.alert("Autocomplete's returned place contains no geometry");
	      return;
	    }
	    // If the place has a geometry, then present it on a map.
	    if (place.geometry.viewport) {
	      map.fitBounds(place.geometry.viewport);
	    } else {
	      map.setCenter(place.geometry.location);
	      map.setZoom(14);  // Why 17? Because it looks good.
	    }

	    markerDos.setIcon(/** @type {google.maps.Icon} */({
	      url: image2
	      })
	    );
	    markerDos.setPosition(place.geometry.location);
	    markerDos.setVisible(true)
	    geocodeAddress(geocoder, inputDos, "latitud1", "longitud");
	  });
}

var loadPag = function () {
	if (navigator.geolocation){
		navigator.geolocation.getCurrentPosition(good);
	}

	$.ajax({
		url: 'https://api.lyft.com/oauth/token',
		type: 'POST',
		data: {
			grant_type: 'client_credentials',
			scope: 'public'
		},
		beforeSend: function (xhr) {
			xhr.setRequestHeader ("Authorization", "Basic " + btoa(clientId + ":" + clientSecret));
		},
		success: function(response) {
			access_token = response.access_token;
		},
		error: function(error) {
			console.log(error);
		}
	});

	$("#startPoint").click(changePlaceholder);
	$("#estimate").click(showRoute);
}

$(document).ready(loadPag);

//show route
var showRoute = function(){
	if($("#startPoint").val().trim().length > 0 && $("#endPoint").val().trim().length > 0){
		$.ajax({
			url: 'https://api.lyft.com/v1/cost',
			data:{
		    	start_lat : start_lat,
		    	start_lng : start_lng,
		    	end_lat : end_lat,
		    	end_lng : end_lng
		    	//'https://api.lyft.com/v1/cost?start_lat=37.7772&start_lng=-122.4233&end_lat=37.7972&end_lng=-122.4533'
		    },
			beforeSend: function(xhr) {
				xhr.setRequestHeader("Authorization", "bearer " + access_token);
	        },
			success: function(response){
				console.log(response);
				localStorage.setItem("lyftPlus", response.cost_estimates[0].estimated_cost_cents_min + " - " + response.cost_estimates[0].estimated_cost_cents_max );
				localStorage.setItem("lyftLine", response.cost_estimates[1].estimated_cost_cents_min + " - " + response.cost_estimates[1].estimated_cost_cents_max );
				localStorage.setItem("lyft", response.cost_estimates[2].estimated_cost_cents_min + " - " + response.cost_estimates[2].estimated_cost_cents_max );
		    },	
		    error: function(error){
		    	console.log(error);
		    }
		})

		$("#lyftPlus").html(localStorage.getItem("lyftPlus"));
		$("#lyftLine").html(localStorage.getItem("lyftLine"));
		$("#lyft").html(localStorage.getItem("lyft"));
	}
}

//changePlaceholder
var changePlaceholder = function (){
	$(this).attr("placeholder", "Search address or location");
}

var geocodeAddress= function(geocoder, valor, lat,lon) {
  var address = valor.value;
  geocoder.geocode({'address': address}, function(results, status) {
  	localStorage.setItem(lat, results[0].geometry.location.lat().toFixed(4));
  	localStorage.setItem(lon, results[0].geometry.location.lng().toFixed(4));
  });
}