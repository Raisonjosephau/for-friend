$(document).ready(function() {
    // the body of this function is in assets/js/now-ui-kit.js
    var offset = 150;
    var currentScroll = $(this).scrollTop();
    var width = $(window).width();
    $(window).resize(function() {
        width = $(window).width();
    });
    $(".hover").mouseleave(
        function() {
            $(this).removeClass("hover");
        }
    );
    $(".carousel").carousel();
    var lastScrollTop = 0;
    var header = document.getElementById("stick-nav");
    var sticky = header.offsetTop;

    $(window).scroll(function(event) {
        var st = $(this).scrollTop();
        var upscroll;
        if (st > lastScrollTop && st > 650 && width > 991) {
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


    /* ==============================================
     pop up
     =============================================== */

    // portfolio-pop up


    $('.grid').magnificPopup({
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
                return "<h5 class='text-shadow-black'>" + item.el.attr('title') + "<h5>";
            }
        },
        zoom: {
            enabled: true,
            duration: 300, // don't foget to change the duration also in CSS
            opener: function(element) {
                return element.find('img');
            }
        }
    });
    ///


    $(".owl-carousel").owlCarousel({

        center: true,
        items: 2,
        loop: true,
        nav: true,
        margin: 5,
        autoplay: true,
        autoplayTimeout: 3000,
        autoplayHoverPause: true,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                nav: true,
                autoplayTimeout: 5000,
            },
            500: {
                items: 2,
                nav: true,
                autoplayTimeout: 5000,
            },
            1000: {
                items: 4,
                nav: true,
            }
        }
    });
    // When the window has finished loading create our google map below
    google.maps.event.addDomListener(window, 'load', init);

    function init() {
        // Basic options for a simple Google Map
        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
        var mapOptions = {
            // How zoomed in you want the map to start at (always required)
            zoom: 18,

            // The latitude and longitude to center the map (always required)
            center: new google.maps.LatLng(9.979106, 76.2785000004), // New York

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
        //
        var map = new google.maps.Map(mapElement, mapOptions); // Let's also add a markerwhile we 're at it 
        var marker = new google.maps.Marker({
            position: new google.maps.LatLng(9.979106, 76.27997400000004),
            map: map,
            animation: google.maps.Animation.DROP,
        });
        marker.addListener('mouseover', function() {
            infowindow.open(map,
                marker);
        });
        marker.addListener('mouseout', function() {
            infowindow.close(map, marker);
        });
    }


});