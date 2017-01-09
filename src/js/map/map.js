import * as dom from '../helpers/dom.js'
import * as layers from './layers'
let map

export function draw () {
  map = L.map('map', {
    trackResize: true,
    center: [45.528, -122.680],
    zoom: 13,
    zoomControl: false,
    scrollWheelZoom: false
  })

  map.addControl(L.control.zoom({position: 'topright'}));

  L.esri.tiledMapLayer({
    url: "https://www.portlandmaps.com/arcgis/rest/services/Public/Basemap_Color_Complete/MapServer"
  }).addTo(map);
}

export function getLayer (layer) {
  return layers[layer.layerId]
}

export function getActiveLayers () {
  let activeLayers = dom.findElements('.js-layer-toggle').filter(function (toggle) {
    return toggle.checked
  })
  return activeLayers
}
export function getInactiveLayers () {
  let inactiveLayers = dom.findElements('.js-layer-toggle').filter(function (toggle) {
    return !toggle.checked
  })
  return inactiveLayers
}

export function addLayers (layerSet) {
  if (!layerSet) { return }
  layerSet.split(',').forEach(function (layer) {
    console.log(layers[layer])
    layers[layer].addTo(map)
  })
}

export function removeLayers (layerSet) {
  if (!layerSet) { return }
  layerSet.split(',').forEach(function (layer) {
    layers[layer].removeFrom(map)
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
  // checkActiveLayers()
}

export function closeAllPopUps () {
  map.closePopup()
}