//------------------- To get rail directions from one stop to another ---------------//
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;

function initialize() {
    directionsDisplay = new google.maps.DirectionsRenderer();
    var boston = new google.maps.LatLng(42.3601, -71.0589);
    var mapOptions = {
        zoom: 12,
        center: boston
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    directionsDisplay.setMap(map);
}


function calcRoute() {
    var start = document.getElementById('stops1').value;
    var end = document.getElementById('stops2').value;
    var request = {
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.TRANSIT,
        transitOptions: {
            modes: [google.maps.TransitMode.RAIL],
            // routingPreference: google.maps.TransitRoutePreference.FEWER_TRANSFERS
        },
        unitSystem: google.maps.UnitSystem.METRIC
    };
    directionsService.route(request, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        }
    });
}

google.maps.event.addDomListener(window, 'onClick', initialize);
