var loc_name;
var lat;
var lng;
function initAutocomplete() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.8688, lng: 151.2195},
          zoom: 13,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        });
		geocoder = new google.maps.Geocoder();
		
		 
		var xhttp = new XMLHttpRequest();
		xhttp.open("GET", "get-product-type.php", true);
		  xhttp.send();
		  xhttp.onreadystatechange = function() {
			if (xhttp.readyState == 4 && xhttp.status == 200) {
			  
			  response = xhttp.responseText;
			  
			  
			
		  
			
		
		
        // Create the search box and link it to the UI element.
		
				 
				 
   
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

        var markers = [];
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
          var places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            var icon = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
			marker = new google.maps.Marker({
              map: map,
              icon: icon,
              title: place.name,
			  draggable: true,
              position: place.geometry.location
            }); 
            
			infowindow = new google.maps.InfoWindow({
			  size: new google.maps.Size(150, 50),

			});
			
			
			google.maps.event.addListener(marker, "click", function(event) {
          geocodePosition(marker.getPosition(), marker);
        });
			google.maps.event.addListener(marker, "dragstart", function() {   
    infowindow.close();
    });
	
	markers.push(marker);		
            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          map.fitBounds(bounds);
        });
		
		}
		  };
      }
	  
	  function geocodePosition(pos, marker) {
  geocoder.geocode({
    latLng: pos
  }, function(responses) {
    if (responses && responses.length > 0) {
      marker.formatted_address = responses[0].formatted_address;
    } else {
      marker.formatted_address = 'Cannot determine address at this location.';
    }
	
	address = new Object();
	for (var i=0; i < responses[0].address_components.length; i++) {
          for (var j=0; j < responses[0].address_components[i].types.length; j++) {
            if (responses[0].address_components[i].types[j] == "country") {
              country = responses[0].address_components[i];
              console.log(country.long_name);
              console.log(country.short_name);
			  address.country = country.long_name;
            }
			if (responses[0].address_components[i].types[j] == "locality") {
              locality = responses[0].address_components[i];
              console.log(locality.long_name);
			  address.city = locality.long_name;
              
            }
			if (responses[0].address_components[i].types[j] == "sublocality_level_1") {
              locality = responses[0].address_components[i];
              console.log(locality.long_name);
              address.area_name = locality.long_name;
            }
			if (responses[0].address_components[i].types[j] == "postal_code") {
              postal_code = responses[0].address_components[i];
              console.log(postal_code.long_name);
			  address.pin = postal_code.long_name;
              //console.log(country.short_name)
            }
			if (responses[0].address_components[i].types[j] == "administrative_area_level_1") {
              administrative_area_level_1 = responses[0].address_components[i];
              console.log(administrative_area_level_1.long_name);
			  address.state = administrative_area_level_1.long_name;
              //console.log(administrative_level_1.short_name)
            }
			if (responses[0].address_components[i].types[j] == "street_number") {
              administrative_area_level_1 = responses[0].address_components[i];
              console.log(administrative_area_level_1.long_name);
			  address.street = administrative_area_level_1.long_name;
              //console.log(administrative_level_1.short_name)
            }
			if (responses[0].address_components[i].types[j] == "route") {
              administrative_area_level_1 = responses[0].address_components[i];
              console.log(administrative_area_level_1.long_name);
			  address.route = administrative_area_level_1.long_name;
              //console.log(administrative_level_1.short_name)
            }
			
			
          }
        }
		
		address.complete = marker.formatted_address;
		address.lat = marker.getPosition().lat();
		address.lng = marker.getPosition().lng();
		console.log(address.lng);
		var html = "<table><tr><td>Name:</td> <td><input style='border: 1px solid black;' type='text' id='name' required/> </td> </tr>" +
					"<tr><td>Type:</td><td>"+response+
					"</td></tr>"+
					"<tr><td>Machin ID:</td> <td><input type='text' style='border: 1px solid black;' id='machine_id' required/></td></tr>"+					
					"<tr><td>Description:</td> <td><textarea style='border: 1px solid black;' id='desc' required/></textarea></td></tr>" +				 
                 	"<tr><td>Street:</td><td><input type=text' id='street' required></td></tr>"+
					"<tr><td>Route:</td><td><input type='text' id='route' required></td></tr>"+
					"<tr><td>Area Name:</td><td>"+address.area_name+"</td></tr>"+
					"<tr><td>City:</td><td>"+address.city+"</td></tr>"+
					"<tr><td>State:</td><td>"+address.state+"</td></tr>"+
					"<tr><td>Country:</td><td>"+address.country+"</td></tr>"+
					"<tr><td>pin:</td><td>"+address.pin+"</td></tr>"+
					"<tr><td>Latitude:</td><td>"+address.lat+"</td></tr>"+
					"<tr><td>Latitude:</td><td>"+address.lng+"</td></tr>"+
					"<tr><td>Submit:</td><td><input type='submit' value='Save' onclick='save()'></td></tr></table>";

	
	infowindow.setContent(html);
	infowindow.open(map, marker);


  });
}
	  
	  function save() {
      var name = document.getElementById("name").value;
	  var type = document.getElementById("type").value;
      var desc = document.getElementById("desc").value;
	  street = document.getElementById("street").value;
	 route = document.getElementById("route").value;
	 machine_id = document.getElementById("machine_id").value;
	  
      //var latlng = marker.getPosition();
	if(confirm("Are you sure that you want to add the location?"))
	{
		var url = "query/add-location-query.php?&machine_id="+machine_id+"&name=" + name + 
                "&type="+type+"&desc=" + desc +"&street="+street+"&route="+route+"&area_name="+address.area_name+ "&city=" +address.city+"&state="+address.state+"&country="+address.country+"&pin="+address.pin+"&lat=" + address.lat + "&lng=" + address.lng; 
      
	  
	  downloadUrl(url, function(data, responseCode) {
        if (responseCode == 200 && data.length >= 1) {
          infowindow.close();
          console.log('hi');
        }
      });
	}
      
    }

    function downloadUrl(url, callback) {
      var request = window.ActiveXObject ?
          new ActiveXObject('Microsoft.XMLHTTP') :
          new XMLHttpRequest;

      request.onreadystatechange = function() {
        if (request.readyState == 4) {
          request.onreadystatechange = doNothing;
          callback(request.responseText, request.status);
        }
      };

      request.open('GET', url, true);
      request.send(null);
	  alert("added");
		location.reload();
    }

    function doNothing() {}
