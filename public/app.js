$(document).ready(function(){


var getDrones = function() {

	var urlDrone = 'http://api.dronestre.am/data';
		

	$.ajax({
		url: urlDrone,
		crossOrigin: true,
		type: "GET",
		dataType: 'jsonp'
	}).done(function(data){
		addMap(data);
	});

}

getDrones();




	var addMap = function(data) {
		
		var map;

     function initialize() {
        map = new google.maps.Map(document.getElementById('map'), {
          zoom: 2,
          center: new google.maps.LatLng(2.8,-187.3),
          mapTypeId: google.maps.MapTypeId.TERRAIN
        });
        addMarker(data);
      }

      
		  var addMarker = function(data) {
		  	console.log(data.strike.length)
        for (var i = 0; i < data.strike.length; i++) {
          var lat = parseFloat(data.strike[i]['lat']);
          var lon = parseFloat(data.strike[i]['lon']);
          var latLng = new google.maps.LatLng(lat,lon);
          var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            town: data.strike[i]['town'],
            country: data.strike[i]['country'],
            date: data.strike[i]['date'],
            narrative: data.strike[i]['narrative'],
            deaths: data.strike[i]['deaths'],
            article_link: data.strike[i]['bij_link']
           });
          var infowindow = new google.maps.InfoWindow()
          // infowindow.id = "strikeInfo"
          var content = 
          	"<span class='strikeTitle'>" + "<span class='strikeTown'>" + marker.town + "</span>" + ", " + "<span class='strikeCountry'>" + marker.country + "</span>" + "</span>" 
          	+ "<br>" + "<span class='strikeDate'>" + marker.date +"</span>" +"<br>"+ 
          	"<span class='strikeNarrative'>" + marker.narrative + "</span>"+"<br>"+ 
          	"<span class='strikeDeaths'>" + marker.deaths + "</span>" + "<br>" + 
          	"<span class='strikeArticle'>" + "<a href=" + marker.article_link + ">Article</a>" + "</span>" + "<br>" +
          	"<button id='saveArticle'> Save </button>";
          google.maps.event.addListener(marker,'click', (function(marker,content,infowindow){ 
				    return function() {
				        infowindow.setContent(content);
				        infowindow.open(map,marker);
				    };
					})(marker,content,infowindow));  
        }
      }
      
			
	google.maps.event.addDomListener(window, 'load', initialize);


	}





});











