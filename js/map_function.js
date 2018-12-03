 //Global Variable
      var fruits = [];
      function myFunction() {
    
      //var map1 = document.getElementById("map1"); 
      var map2 = document.getElementById("map2"); 
      var map3 = document.getElementById("map3"); 
      var map4 = document.getElementById("map4"); 
    
      var config = {
        apiKey: "AIzaSyBnv3e5FaZWeoLKCWUW1LuQYnS3rbylCFc",
        authDomain: "myparking-7e556.firebaseapp.com",
        databaseURL: "myparking-7e556.firebaseio.com",
        storageBucket: "myparking-7e556.appspot.com",
        messagingSenderId: "141182312829"
      };/*
	   apiKey: "AIzaSyA_GfH36smQ1dHhn4IBERQJZIzBlgQ5M3k",
  	   authDomain: "parking-asr.firebaseapp.com",
 	   databaseURL: "parking-asr.firebaseio.com",
 	   storageBucket: "parking-asr.appspot.com",
 	   messagingSenderId:"599740138021"
 		 };*/
      console.log("HELLO"); 
      firebase.initializeApp(config);
      const dbRefObject = firebase.database().ref().child('Device');
      var myTable = "";
      var myData = "";
      //var fruits = [];
      var text = "";
      dbRefObject.on('value', snap => {
         myTable = JSON.stringify(snap.val(), null, 1);
         snap.forEach(function(data) {
          
          data.forEach(function(field) {
            if(field.key === "Available")
              text = field.val();
            else
              text = text + "/" + field.val();
            });
            fruits.push(text);
          });
        console.log(myTable);
    
        document.getElementById("map1").innerText = fruits[0];
        document.getElementById("map2").innerText = fruits[1];
        document.getElementById("map3").innerText = fruits[2];
        document.getElementById("map4").innerText = fruits[3];
        document.getElementById("map5").innerText = fruits[4];
          
      });
      //fireHeading.innerText = fruits; 
      }
    window.myFunction();
    

    //DataFetch Function
    /*  
    function DataFetch() {
        var msg="Firebase DataFetch";
        document.getElementById("demo").innerHTML = msg;
        //return msg;
        }
        */
//


	
//map function	
	
	function detectBrowser() {
          //myFunction
          


            var useragent = navigator.userAgent;
            var mapdiv = document.getElementById("map");
            if (useragent.indexOf('iPhone') != -1 || useragent.indexOf('Android') != -1) {
                mapdiv.style.width = '100%';
                mapdiv.style.height = '100%';
            } else {
                mapdiv.style.width = '600px';
                mapdiv.style.height = '800px';
            }
        }
		var total=[50,30,70,35,55];
        var myLatLng;
        var latit;
        var longit;
        function geoSuccess(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;
            myLatLng = {
                lat: latitude,
                lng: longitude
            };
            var mapProp = {
                //            center: new google.maps.LatLng(latitude, longitude), // puts your current location at the centre of the map,
                zoom: 15,
                mapTypeId: 'roadmap',
            };
            var map = new google.maps.Map(document.getElementById("band1"), mapProp);
            var directionsService = new google.maps.DirectionsService;
            var directionsDisplay = new google.maps.DirectionsRenderer;
            //call renderer to display directions
            directionsDisplay.setMap(map);
            var bounds = new google.maps.LatLngBounds();
            //        var mapOptions = {
            //            mapTypeId: 'roadmap'
            //        };
            // Multiple Markers
            var marker = new google.maps.Marker({

              //Data From Firebase
              //console.log("Firebase");



                position: myLatLng,
                map: map,
                title: 'My location'
            });
			
            var markers = [
                ['Parking D1', 21.249688, 81.603884],
                ['Parking D2', 21.242608, 81.611158],
                ['Parking D3', 21.242048,81.602081],
                ['Parking D4', 21.240822, 81.62677],
                ['Parking D5', 21.245982, 81.642778],
               /* ['Roasted Brown', 53.344813, -6.264707],
                ['Kaph', 53.342599, -6.263272],
                ['Fallon & Byrne', 53.343151, -6.263287],
                ['Clement & Pekoe', 53.341534, -6.26276],*/
                ['my current location', latitude, longitude]
            ];
            // Info Window Content
            var infoWindowContent = [
                ['<div class="info_content">' +
                    '<h3>Parking D1</h3>' +
                    fruits[0]+'/'+total[0]+
                    '</div>'
                ],
                ['<div class="info_content">' +
                    '<h3>Parking D2</h3>'+
                    fruits[1]+'/'+total[1]+
                    '</div>'
                ],
                ['<div class="info_content">' +
                    '<h3>' + markers[3][0] + '</h3>' +
                    fruits[2]+'/'+total[2]+
                    '</div>'
                ],
                ['<div class="info_content">' +
                    '<h3>Parking D3</h3>' +
                    fruits[3]+'/'+total[3]+
                    '</div>'
                ],
                ['<div class="info_content">' +
                    '<h3>Parking D5</h3>' +
                    fruits[4]+'/'+total[4]+
                    '</div>'
                ],
              /*  ['<div class="info_content">' +
                    '<h3>Kaph</h3>' +
                    '<p>31 Drury St, Dublin 2</p>' +
                    '<img src="images/kaph-6.jpg" width="200" height="200">' +
                    '</div>'
                ],
                ['<div class="info_content">' +
                    '<h3>Fallon & Byrne</h3>' +
                    '<p>17 Exchequer St, Dublin 2</p>' +
                    '<img src="images/fallonandbyrne.jpg" width="200" height="200">' +
                    '</div>'
                ],
                ['<div class="info_content">' +
                    '<h3>Clement & Pekoe</h3>' +
                    '<p>50 South William St, Dublin 2</p>' +
                    '<img src="images/ClementPekoe.jpg" width="200" height="200">' +
                    '</div>'
                ]*/
            ];
            // Display multiple markers on a map
            var infoWindow = new google.maps.InfoWindow(),
                marker, i;
            // Loop through our array of markers & place each one on the map
            for (i = 0; i < markers.length; i++) {
                var position = new google.maps.LatLng(markers[i][1], markers[i][2]);
                bounds.extend(position);
                marker = new google.maps.Marker({
                    position: position,
                    map: map,
                    title: markers[i][0]
                });
                // Allow each marker to have an info window
                google.maps.event.addListener(marker, 'click', (function(marker, i) {
                    return function() {
                        infoWindow.setContent(infoWindowContent[i][0]);
                        infoWindow.open(map, marker);
                        latit = marker.getPosition().lat();
                        longit = marker.getPosition().lng();
                        // console.log("lat: " + latit);
                        // console.log("lng: " + longit);
                    }
                })(marker, i));
                marker.addListener('click', function() {
                    directionsService.route({
                        // origin: document.getElementById('start').value,
                        origin: myLatLng,
                        // destination: marker.getPosition(),
                        destination: {
                            lat: latit,
                            lng: longit
                        },
                        travelMode: 'DRIVING'
                    }, function(response, status) {
                        if (status === 'OK') {
                            directionsDisplay.setDirections(response);
                        } else {
                            window.alert('Directions request failed due to ' + status);
                        }
                    });
                });
                // Automatically center the map fitting all markers on the screen
                map.fitBounds(bounds);
            }
        }
        // function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        //     directionsService.route({
        //         // origin: document.getElementById('start').value,
        //         origin: myLatLng,
        //         destination: marker.getPosition(),
        //         travelMode: 'DRIVING'
        //     }, function(response, status) {
        //         if (status === 'OK') {
        //             console.log('all good');
        //             directionsDisplay.setDirections(response);
        //         } else {
        //             window.alert('Directions request failed due to ' + status);
        //         }
        //     });
        // }
        function geoError() {
            alert("Geocoder failed.");
        }
        function getLocation() {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
                // alert("Geolocation is supported by this browser.");
            } else {
                alert("Geolocation is not supported by this browser.");
            }
        }
		
		
	
	