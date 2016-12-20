import * as dom from '../helpers/dom.js'

import Scalebar from './scale'
import * as layers from './layers'
let map

let streets = L.esri.featureLayer({
  url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/20'
})

export function draw () {
  map = L.map('map', {
    trackResize: true,
    center: [45.528, -122.680],
    zoom: 13,
    zoomControl: false,
    scrollWheelZoom: false
  })

  map.addControl(L.control.zoom({position: 'topright'}));

  // Scale bar
  let scalebar = new Scalebar(map)
  scalebar.custom('scalebar-miles')

  L.esri.tiledMapLayer({
    url: "https://www.portlandmaps.com/arcgis/rest/services/Public/Basemap_Color_Complete/MapServer"
  }).addTo(map);

  var searchControl = L.esri.Geocoding.geosearch({
    position: 'topright',
    url: 'https://beta.portlandmaps.com/arcgis/rest/services/Public/Assessor_IDs/GeocodeServer/geocodeAddresses'
  }).addTo(map);

  var results = L.layerGroup().addTo(map);

  searchControl.on('results', function(data){
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
      results.addLayer(L.marker(data.results[i].latlng));
    }
  });
}

export function toggleLayer (layer) {
  if (layer.checked) {
    layers[layer.layerId].addTo(map)
  } else {
    layers[layer.layerId].unbindPopup()
    layers[layer.layerId].removeFrom(map)
  }
  return layers[layer.layerId]
}

export function checkActiveLayers () {
  dom.findElements('.js-layer-toggle').map(function (toggle) {
    if (toggle.checked) {
      let layer = toggle.getAttribute('data-layer')
      layers[layer].addTo(map)
    }
  })
}

export function remove () {
  if (map) {
    map.remove()
  }
}

export function redraw () {
  remove()
  draw()
  checkActiveLayers()
}