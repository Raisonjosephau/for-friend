$(document).ready(function() {

    //Animation for active tab-pane
    //Simple fade in animation
    var tabWrapper = $(".tab-pane");
    var activeTab = tabWrapper.find(".active");
    var activeTabHeight = activeTab.outerHeight();
    activeTab.fadeOut(250, function() {
        activeTabHeight = activeTab.outerHeight();

        // Animate height of wrapper to new tab height
        tabWrapper.stop().delay(50).animate({
            height: activeTabHeight
        }, 100, function() {

            // Fade in active tab
            activeTab.delay(20).fadeIn(120);

        });
    });

    //Galery
    $('.gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function(item) {
                return "<h5  style='font-weight:400'>" + item.el.attr('title') + "<h5>";
            }
        },
    });

    //Navbar
    //Change navbar behavoiur with the screen size
    var offset = 150;
    var currentScroll = $(this).scrollTop();
    var width = $(window).width();
    $(window).resize(function() {
        width = $(window).width();
    });

    //Navbar scroll effect
    //Hide on scroll dwon, and show on scroll up
    var lastScrollTop = 0;
    var header = document.getElementById("stick-nav");
    var sticky = header.offsetTop;

    $(window).scroll(function(event) {
        var st = $(this).scrollTop();
        var upscroll;
        if (st > lastScrollTop && st > 420 && width > 991) {
            // downscroll code
            $('.sticky-header').removeClass('active');
        } else if (width > 991) {
            // upscroll code
            $('.sticky-header').addClass('active');
        }
        lastScrollTop = st;
        myFunction();

    });

    function myFunction() {
        if (window.pageYOffset >= sticky) {
            $('#stick-nav').addClass("fixed-top");
        } else {
            $('#stick-nav').removeClass("fixed-top");
        }
    }

    console.log($("#contactUsMap").height());
    $("#timeline").height($("#contactUsMap").height());

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            if (this.getAttribute("role") !== "button" && this.getAttribute("data-toggle") !== "tab") {
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // When the window has finished loading create our google map below

    google.maps.event.addDomListener(window, 'load', map = init());

    function init() {
        // Basic options for a simple Google Map
        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
        var mapOptions = {
            // How zoomed in you want the map to start at (always required)
            zoom: 12,

            scrollwheel: false,
            clickableIcons: false,

            // The latitude and longitude to center the map (always required)
            center: new google.maps.LatLng(9.6311548, 76.4226266), // Fort Kochi

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

        map = new google.maps.Map(mapElement, mapOptions); // Let's also add a markerwhile we 're at it 

        return map;

    }

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
        new Location('Bird Sanctuary', "Bird Sanctuary", 9.6311548, 76.4226266),
        new Location('Vembanad Lake', "Vembanad Lake", 9.594922, 76.39421134710621),
        new Location('Houseboat', "Houseboat", 9.594922, 76.3945),

    ];

    var content_start = '<div id="iw-container">' +
        '<div class="iw-content">' +
        '<div class="iw-subTitle">';

    var content_end = '</div>' + '</div>';

    function createContentString(title, info) {
        var content_placeholder = title + '</div><p>' + info + '</p>';
        var content = content_start + content_placeholder + content_end;
        return content;
    }

    data.forEach(function(d) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(d.lat, d.lng),
            map: map,
            animation: google.maps.Animation.DROP,
        });
        d.marker = marker;
        contentString = createContentString(d.locName, d.info);
        var infowindow = new google.maps.InfoWindow({
            content: contentString,
            maxWidth: 380
        });
        d.infowindow = infowindow;
    });


    $('ul.itenary-steps li').click(function(e) {

        index = this.getAttribute("data-toggle-map");
        if (index !== -1) {
            if (activeInfoWindow) { activeInfoWindow.close(); }

            map.panTo(data[index].marker.position);

            data[index].infowindow.open(map, data[index].marker);

            // Reference to the DIV that wraps the bottom of infowindow
            var iwOuter = $('.gm-style-iw');

            /* Since this div is in a position prior to .gm-div style-iw.
             * We use jQuery and create a iwBackground variable,
             * and took advantage of the existing reference .gm-style-iw for the previous div with .prev().
             */

            var iwBackground = iwOuter.prev();
            iwBackground.hide();

            // Removes background shadow DIV
            // Reference to the div that groups the close button elements.
            var iwCloseBtn = iwOuter.next();

            // Apply the desired effect to the close button
            iwCloseBtn.addClass('btn-info-close');
            iwCloseBtn.children("img").remove();

            activeInfoWindow = data[index].infowindow;
        }


    });


});