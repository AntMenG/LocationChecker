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

    var dataEdificios = document.getElementById("json").innerText;
    dataEdificios.replace(" ","");
    var jsonE = JSON.parse(dataEdificios);

    for (var i = 0; i < jsonE.length; i++) {
      for (var j = 0; j < jsonE[i].coordenadas.length; j++) {
        jsonE[i].coordenadas[j].lat = Number(jsonE[i].coordenadas[j].lat);
        jsonE[i].coordenadas[j].lng = Number(jsonE[i].coordenadas[j].lng);
      }
      var EdCoords = jsonE[i].coordenadas;

      var Edificio = new google.maps.Polygon({
        paths: EdCoords,
        strokeColor: '#000000',
        strokeOpacity: 0.05,
        strokeWeight: 2,
        fillColor: '#764ba2',
        fillOpacity: 0.65,
        text: jsonE[i].nombre,
        idText: jsonE[i].id
      });
      google.maps.event.addListener(Edificio, 'click', function (event) {
        var vertices = this.getPath();
        var coords = [];
        for (var i =0; i < vertices.getLength(); i++) {
          var xy = vertices.getAt(i);
          coords.push({lat:""+xy.lat(), lng:""+xy.lng()});
        }
        document.getElementById("enombre").value = this.text;
        document.getElementById("forEdif").value = "Modificar";
        document.getElementById("coordI").value = JSON.stringify(coords);
        document.getElementById("enombre").setAttribute("data-id", this.idText);
        document.getElementById("regEdificio").setAttribute("action", "/modificaEdificio");
        document.getElementById("dEdificio").setAttribute("style", "display: inline-block;");
        document.getElementById("rEd").click();
      });  
      Edificio.setMap(map);
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
        position: google.maps.ControlPosition.TOP_RIGHT,
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
      document.getElementById("enombre").value = "";
      document.getElementById("forEdif").value = "Registrar";
      document.getElementById("dEdificio").setAttribute("style", "display: none;");
      document.getElementById("regEdificio").setAttribute("action", "/registraEdificio");

      google.maps.event.addListener(polygon, 'click', function (event) {
        window.location = "/";
      });  
    });
}