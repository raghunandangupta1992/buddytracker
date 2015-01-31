    var map;

      function initialize() {
        var mapOptions = {
          center: { lat: 12.973846499999999, lng: 77.6310944},
          zoom: 12
        };
        map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
      }
      google.maps.event.addDomListener(window, 'load', initialize);
    

    	var instanceName="";
    	var myDb;
    	var name = "guest";
    	var activeUserData = {};

    	$(window).on('load',function(){

    		setParams();
    		getDB();

    	});


    	function setParams(){

    		if(location.search){
    			
    			instanceName = location.search.split('?')[1];

    		} else {

    			window.location.href += "?"+randomString();
    		}

    	}

    	function getDB(){

			myDb = new Firebase("https://mymap.firebaseio.com/"+instanceName+"/"+name);

    	}

    	function randomString()
		{
		    var text = "";
		    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		    for( var i=0; i < 5; i++ )
		        text += possible.charAt(Math.floor(Math.random() * possible.length));

		    return text;
		}

		function getUserLocation(){

			navigator.geolocation.getCurrentPosition(function(loc){

				return loc;

    		})

		}

		function processUserData(locationObj){

			saveLocation(locationObj);

      collectUserLocation();

			// showMyLocation(locationObj);

		}

		function saveLocation(locationObj){

      activeUserData[name] = locationObj;

			myDb.set({'lat':locationObj.lat,'long':locationObj.long});

		}


		function showMyLocation(data){

      console.log(data)
      for(i in data){

  			var myLatlng = new google.maps.LatLng(data[i].lat,data[i].long);

        // console.log(activeUserData[i].marker)
        // console.log(activeUserData[i]['marker']);

        if(activeUserData[i] && activeUserData[i]['marker']){
          
          activeUserData[i]['marker'].setPosition(myLatlng);

        } else {
          activeUserData[i] = data[i];

          activeUserData[i]['marker'] = new google.maps.Marker({
              position: myLatlng,
              map: map,
              title: i
          });

        }
      }

		}

		function collectUserLocation(){

			var dbInstance = new Firebase('https://mymap.firebaseio.com/'+instanceName);
			
			
			dbInstance.on('value', function(dataSnapshot) {
			  // store dataSnapshot for use in below examples.
				var resp = dataSnapshot.val();

				// activeUserData = resp;

        showMyLocation(resp)

			});

		}

    	// $('#getLocation').on('click',function(){

    	// 	// return getUserLocation();
				
     //    // temp
  			// var x = {lat : 12.973846499999999, long : 77.6310944}

  			// processUserData(x);

    	// });

    	$('#nameSubmit').on('click',function(){

    		name = $('#name').val();

    		getDB();

        // return getUserLocation();

        var x = {lat : 12.973846499999999, long : 77.6310944}

        processUserData(x);

    	})
