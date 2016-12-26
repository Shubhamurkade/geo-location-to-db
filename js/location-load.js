var loc_name;
function initAutocomplete() 
{
    var map = new google.maps.Map( document.getElementById('map'), 
	{
		center: {lat: 12.9716, lng: 77.5946},
        zoom: 13,
          mapTypeId: google.maps.MapTypeId.ROADMAP
    });
	var infowindow;
	var xhttp = new XMLHttpRequest();
	xhttp.open("GET", "query/get-product-query.php", true);
	xhttp.send();
	xhttp.onreadystatechange = function() 
	{
		if (xhttp.readyState == 4 && xhttp.status == 200) 
		{
			response = xhttp.responseText;
			// Create the search box and link it to the UI element.
			var html = "<table>" +
					 "<tr><td>Machine Id:</td> <td><input style='border: 1px solid black;height:20px;' type='text' id='name'/> </td> </tr>" +
					 "<tr><td>Type:</td><td>"+response+
					"</td></tr>"+
					 "<tr><td>Area Name:</td> <td><input style='border: 1px solid black;height:20px;' type='text' id='area'/> </td> </tr>" +
					 "<tr><td></td><td><input type='button' value='Add Location' onclick='saveData()'/></td></tr></table>";;
			infowindow = new google.maps.InfoWindow(
			{
				content: html
			});
			var input = document.getElementById('pac-input');
			var searchBox = new google.maps.places.SearchBox(input);
			map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
			// Bias the SearchBox results towards current map's viewport.
			map.addListener('bounds_changed', function() 
			{
			  searchBox.setBounds(map.getBounds());
			});
			var markers = [];
			// Listen for the event fired when the user selects a prediction and retrieve
			// more details for that place.
			searchBox.addListener('places_changed', function() 
			{
				var places = searchBox.getPlaces();
				if (places.length == 0) 
				{
					return;
				}
				// Clear out the old markers.
				markers.forEach(function(marker) 
				{
					marker.setMap(null);
				});
				markers = [];

				// For each place, get the icon, name and location.
				var bounds = new google.maps.LatLngBounds();
				places.forEach(function(place) 
				{
					var icon = 
					{
						url: place.icon,
						size: new google.maps.Size(71, 71),
						origin: new google.maps.Point(0, 0),
						anchor: new google.maps.Point(17, 34),
						scaledSize: new google.maps.Size(25, 25)
					};
					// Create a marker for each place.
					marker = new google.maps.Marker(
					{
						map: map,
						icon: icon,
						title: place.name,
						position: place.geometry.location
					}); 
					markers.push(marker);
					loc_name = place.name;
					google.maps.event.addListener(marker, "click", function() 
					{
						infowindow.open(map, marker);
					});					
					if (place.geometry.viewport) 
					{
						// Only geocodes have viewport.
						bounds.union(place.geometry.viewport);
					} 
					else 
					{
						bounds.extend(place.geometry.location);
					}
				});
				map.fitBounds(bounds);
			});
		}
	};
}
function saveData() 
{
    var name = escape(document.getElementById("name").value);
	var type = document.getElementById("type").value;
	var area_name = document.getElementById("area").value;  
    var latlng = marker.getPosition();
    var url = "query/add-location-query.php?name=" + name + 
              "&type="+type+"&area="+area_name+ "&location=" +loc_name+"&lat=" + latlng.lat() + "&lng=" + latlng.lng(); 
    downloadUrl(url, function(data, responseCode) 
	{
        if (responseCode == 200 && data.length >= 1) 
		{
			infowindow.close();
			console.log('hi');
        }
    });
}
function downloadUrl(url, callback) 
{
    var request = window.ActiveXObject ?
    new ActiveXObject('Microsoft.XMLHTTP') :
    new XMLHttpRequest;
    request.onreadystatechange = function() 
	{
        if (request.readyState == 4) 
		{
			request.onreadystatechange = doNothing;
			callback(request.responseText, request.status);
        }
    };
    request.open('GET', url, true);
    request.send(null);
	location.reload();
}
function doNothing() {}
