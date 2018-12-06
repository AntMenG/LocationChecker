var tesh = {lat: 19.409620, lng: -99.316517};
var marker;
var map;
function initMap() {
    // Create the map.
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 18,
        center: tesh,
        mapTypeControl: true,
        styles: [
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#f5f5f5"
                }
              ]
            },
            {
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#f5f5f5"
                }
              ]
            },
            {
              "featureType": "administrative.land_parcel",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#bdbdbd"
                }
              ]
            },
            {
              "featureType": "landscape.man_made",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#d9e1f4"
                }
              ]
            },
            {
              "featureType": "landscape.natural",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#ecf0fa"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#eeeeee"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#e5e5e5"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#ffffff"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#757575"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#dadada"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#616161"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#e5e5e5"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#eeeeee"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#c9c9c9"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9e9e9e"
                }
              ]
            }
        ],
        mapTypeControl: false,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.LEFT_BOTTOM
        },
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_BOTTOM
        },
        scaleControl: true,
        streetViewControl: false,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
        },
        fullscreenControl: false
    });
    /*
    var cityCircle = new google.maps.Circle({
        strokeColor: '#764ba2',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#764ba2',
        fillOpacity: 0.35,
        map: map,
        center: tesh,
        radius: 170
    });
    
    // Edificio I
    var eiCoords = [
        {lat: 19.408845, lng: -99.317095},
        {lat: 19.409010, lng: -99.316719},
        {lat: 19.408817, lng: -99.316623},
        {lat: 19.408653, lng: -99.317001}
    ];19.409455, -99.316025

    var eI = new google.maps.Polygon({
        paths: eiCoords,
        strokeColor: '#000000',
        strokeOpacity: 0.05,
        strokeWeight: 2,
        fillColor: '#764ba2',
        fillOpacity: 0.65,
        text: 'I'
    });
    eI.setMap(map);
    // Edificio A
    var eaCoords = [
        {lat: 19.409455, lng: -99.316025},
        {lat: 19.409627, lng: -99.315636},
        {lat: 19.409819, lng: -99.315735},
        {lat: 19.409647, lng: -99.316121}
    ];

    var eA = new google.maps.Polygon({
        paths: eaCoords,
        strokeColor: '#000000',
        strokeOpacity: 0.05,
        strokeWeight: 2,
        fillColor: '#764ba2',
        fillOpacity: 0.65,
        text: 'A'
    });
    eA.setMap(map);
    
    // Edificio G
    var egCoords = [
        {lat: 19.409396, lng: -99.316841},
        {lat: 19.409525, lng: -99.316575},
        {lat: 19.409756, lng: -99.316701},
        {lat: 19.409629, lng: -99.316966}, 
    ];

    var eG = new google.maps.Polygon({
        paths: egCoords,
        strokeColor: '#000000',
        strokeOpacity: 0.05,
        strokeWeight: 2,
        fillColor: '#764ba2',
        fillOpacity: 0.65,
        text: 'G'
    });
    eG.setMap(map);

    // Edificio F
    var efCoords = [
        {lat: 19.410114, lng: -99.316298},
        {lat: 19.410264, lng: -99.315921},
        {lat: 19.410482, lng: -99.316019},
        {lat: 19.410332, lng: -99.316395}
    ];

    var eF = new google.maps.Polygon({
        paths: efCoords,
        strokeColor: '#000000',
        strokeOpacity: 0.05,
        strokeWeight: 2,
        fillColor: '#764ba2',
        fillOpacity: 0.65,
        text: 'F'
    });
    eF.setMap(map);

    // Edificio H
    var ehCoords = [
        {lat: 19.410327, lng: -99.315809}, 
        {lat: 19.410487, lng: -99.315341},
        {lat: 19.410693, lng: -99.315421},
        {lat: 19.410532, lng: -99.315889}
    ];

    var eH = new google.maps.Polygon({
        paths: ehCoords,
        strokeColor: '#000000',
        strokeOpacity: 0.05,
        strokeWeight: 2,
        fillColor: '#764ba2',
        fillOpacity: 0.65,
        text: 'H'
    });
    eH.setMap(map);

    // Edificio C
    var ecCoords = [
        {lat: 19.409894, lng: -99.315590}, 
        {lat: 19.410008, lng: -99.315331},
        {lat: 19.409895, lng: -99.315277},
        {lat: 19.409778, lng: -99.315544}
    ];

    var eC = new google.maps.Polygon({
        paths: ecCoords,
        strokeColor: '#000000',
        strokeOpacity: 0.05,
        strokeWeight: 2,
        fillColor: '#764ba2',
        fillOpacity: 0.65,
        text: 'C'
    });
    eC.setMap(map);

    // Edificio B
    var ebCoords = [
        {lat: 19.409165, lng: -99.317231}, 
        {lat: 19.409292, lng: -99.316949},
        {lat: 19.409171, lng: -99.316886},
        {lat: 19.409044, lng: -99.317170}
    ];

    var eB = new google.maps.Polygon({
        paths: ebCoords,
        strokeColor: '#000000',
        strokeOpacity: 0.05,
        strokeWeight: 2,
        fillColor: '#764ba2',
        fillOpacity: 0.65,
        text: 'B'
    });
    eB.setMap(map);
    */

    var dataEdificios = document.getElementById("json").innerText;
    dataEdificios.replace(" ","");
    var jsonE = JSON.parse(dataEdificios);

    for (var i = 0; i < jsonE.length; i++) {
      for (var j = 0; j < jsonE[i].coordenadas.length; j++) {
        jsonE[i].coordenadas[j].lat = Number(jsonE[i].coordenadas[j].lat);
        jsonE[i].coordenadas[j].lng = Number(jsonE[i].coordenadas[j].lng);
      }
      var ebCoords = jsonE[i].coordenadas;

      var eB = new google.maps.Polygon({
          paths: ebCoords,
          strokeColor: '#000000',
          strokeOpacity: 0.05,
          strokeWeight: 2,
          fillColor: '#764ba2',
          fillOpacity: 0.65,
          text: 'B'
      });
      eB.setMap(map);
    }

    marker = new google.maps.Marker({
        position: {lat: 1, lng: -1},
        map: map,
        title: 'Profesor'
    });

    var drawingManager = new google.maps.drawing.DrawingManager({
      //drawingMode: google.maps.drawing.OverlayType.POLYGON,
      drawingControl: true,
      drawingControlOptions: {
        position: google.maps.ControlPosition.TOP_CENTER,
        drawingModes: ['polygon']
      },
      polygonOptions: {
        strokeColor: '#764ba2',
        strokeOpacity: 0.80,
        strokeWeight: 2,
        fillColor: '#764ba2',
        fillOpacity: 0.65,
        text: 'B'
      }
    });
    drawingManager.setMap(map);

    google.maps.event.addListener(drawingManager, 'polygoncomplete', function(polygon) {
      var JSONPath = [];
      var coordStr = "";
      for (var i = 0; i < polygon.getPath().getLength(); i++) {
        coordStr = polygon.getPath().getAt(i).toUrlValue(6);
        var coords = coordStr.split(",");
        JSONPath.push({
          lat: coords[0], lng: coords[1]
        });
      }
      coordPlane = JSON.stringify(JSONPath);
      document.getElementById("coordI").value = coordPlane;
    });
    
}