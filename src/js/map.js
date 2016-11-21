let map

export function draw () {
  console.log('draw map')
  map = L.map('map', {
    center: [45.528, -122.680],
    zoom: 13,
    zoomControl: false
  })

  map.addControl(L.control.zoom({position: 'topright'}));

  L.esri.tiledMapLayer({
    url: "https://www.portlandmaps.com/arcgis/rest/services/Public/Basemap_Color_Complete/MapServer"
  }).addTo(map);

  // var polygons = L.esri.featureLayer({
  //   url: "https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/6",
  // }).addTo(map);
  // var points = L.esri.featureLayer({
  //   url: "https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/1",
  // }).addTo(map);
  // var lines = L.esri.featureLayer({
  //   url: "https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/5",
  // }).addTo(map);

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

export function remove () {
  console.log('remove map', map)
  map.remove();
}

export function redraw () {
  remove();
  draw();
}