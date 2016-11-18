export function drawDemo () {
  var map = L.map('map', {
    center: [45.528, -122.680],
    zoom: 13,
    zoomControl: false
  })

  map.addControl(L.control.zoom({position: 'topright'}));

  L.esri.basemapLayer("Gray").addTo(map);

  var parks = L.esri.featureLayer({
    url: "https://services.arcgis.com/rOo16HdIMeOBI4Mb/arcgis/rest/services/Portland_Parks/FeatureServer/0",
    style: function () {
      return { color: "#70ca49", weight: 2 };
    }
  }).addTo(map);

  var searchControl = L.esri.Geocoding.geosearch({
    position: 'topright',
    url: 'https://www.portlandmaps.com/api/agslocator/'
  }).addTo(map);

  var results = L.layerGroup().addTo(map);

  searchControl.on('results', function(data){
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
      results.addLayer(L.marker(data.results[i].latlng));
    }
  });
}