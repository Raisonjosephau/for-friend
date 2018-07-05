google.maps.event.addDomListener(window, 'load', init);

function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 16,

        scrollwheel: false,

        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(9.9661212, 76.2412716), // New York

        // How you would like to style the map. 
        // This is where you would paste any style found on Snazzy Maps.
        styles: [{
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{
                "color": "#e9e9e9"
            }, {
                "lightness": 17
            }]
        }, {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{
                "saturation": -100
            }, {
                "lightness": 45
            }, {
                "visibility": "on"
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#ffffff"
            }, {
                "lightness": 17
            }]
        }, {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#ffffff"
            }, {
                "lightness": 29
            }, {
                "weight": 0.2
            }]
        }, {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [{
                "color": "#ffffff"
            }, {
                "lightness": 18
            }]
        }, {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{
                "color": "#ffffff"
            }, {
                "lightness": 16
            }]
        }, {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "color": "#f5f5f5"
            }, {
                "lightness": 21
            }]
        }, {
            "featureType": "poi.park",
            "elementType": "geometry",
            "stylers": [{
                "color": "#dedede"
            }, {
                "lightness": 21
            }]
        }, {
            "elementType": "labels.text.stroke",
            "stylers": [{
                "visibility": "on"
            }, {
                "color": "#ffffff"
            }, {
                "lightness": 16
            }]
        }, {
            "elementType": "labels.text.fill",
            "stylers": [{
                "saturation": 36
            }, {
                "color": "#333333"
            }, {
                "lightness": 40
            }]
        }, {
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "on"
            }]
        }, {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [{
                "color": "#f2f2f2"
            }, {
                "lightness": 19
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#fefefe"
            }, {
                "lightness": 20
            }]
        }, {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#fefefe"
            }, {
                "lightness": 17
            }, {
                "weight": 1.2
            }]
        }]
    };

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('contactUsMap');
    var labels = 'Das';
    var labelIndex = 0;
    var contentString = '<div class="marker-map">' + "<h5>Das Holidays</h5>" + "TD West Road, Kochi 682035,<br/>Kochi, Kerala<br/>Phone: 8089 608 979" + ' </div>';
    var infowindow = new google.maps.InfoWindow({
        content: contentString
    });

    var activeInfoWindow;

    function setInfoWindow(contentString) {
        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });
        return infowindow
    }

    function Location(locName, info, lat, lng) {
        this.locName = locName;
        this.info = info;
        this.lat = lat;
        this.lng = lng;
    }

    var data = [
        new Location('Chinavala', "The great", 9.96839624, 76.2422419),
        new Location('St. Francis church', "The great", 9.9660689, 76.2408042),
        new Location('Dutch Cemetry', "The great", 9.9641985, 76.2383446),
        new Location('Fort Kochi Beach', "The great", 9.963908, 76.237412),
        new Location('Prince Street', "The great", 9.9668931, 76.2428051),
        new Location('Jew Town', "The great", 9.955742, 76.260170),
        new Location('Mattanchery Palace', "The great", 9.958277, 76.259351)
    ];


    //
    map = new google.maps.Map(mapElement, mapOptions); // Let's also add a markerwhile we 're at it 
    // var marker = new google.maps.Marker({
    //     position: new google.maps.LatLng(9.96839624, 76.2422419),
    //     map: map,
    //     animation: google.maps.Animation.DROP,
    // });

    data.forEach(function(d) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(d.lat, d.lng),
            map: map,
            animation: google.maps.Animation.DROP,
        });
        d.marker = marker;
    });


    $('ul.itenary-steps li').click(function(e) {
        if (activeInfoWindow) { activeInfoWindow.close(); }
        console.log(this.getAttribute("data-toggle-map"));
        map.panTo(data[this.getAttribute("data-toggle-map")].marker.position);
        infowindow = setInfoWindow(data[5].info);
        infowindow.open(map, data[this.getAttribute("data-toggle-map")].marker);
        activeInfoWindow = infowindow;
    });
}