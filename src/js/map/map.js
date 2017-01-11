import * as dom from '../helpers/dom.js'
import bus from '../helpers/bus.js'
import * as layers from './layers'
let map
let position = {
  center: [45.528, -122.680],
  zoom: 13
}

export function draw () {
  map = L.map('map', {
    trackResize: true,
    center: position.center,
    zoom: position.zoom,
    zoomControl: false,
    scrollWheelZoom: false
  })

  map.addControl(L.control.zoom({position: 'topright'}));

  L.esri.tiledMapLayer({
    url: "https://www.portlandmaps.com/arcgis/rest/services/Public/Basemap_Color_Complete/MapServer"
  }).addTo(map);

  drawLayers()
  map.on('moveend', savePosition)
}

function savePosition () {
  position.center = map.getCenter()
  position.zoom = map.getZoom()
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
    layers[layer].addTo(map)
    layers[layer].resetStyle()
    layers[layer].bindPopup(function (evt) {
      evt.bringToFront()
      evt.setStyle({
        lineCap: 'round',
        weight: 30,
        color: '#34F644'
      });
      bus.emit('popup:opened', evt.feature.properties)
      return ''
    }).on('popupclose', function () {
      layers[layer].resetStyle();
      bus.emit('popup:leafletclosed')
    })
  })
}

export function removeLayers (layerSet) {
  if (!layerSet) { return }
  layerSet.split(',').forEach(function (layer) {
    layers[layer].removeFrom(map)
    layers[layer].unbindPopup()
  })
}

export function drawLayers () {
  let activeLayers = getActiveLayers()
  let inactiveLayers = getInactiveLayers()
  activeLayers.forEach(function (toggle) {
    let layerSet = toggle.getAttribute('data-layers')
    addLayers(layerSet)
  })
  inactiveLayers.forEach(function (toggle) {
    let layerSet = toggle.getAttribute('data-layers')
    removeLayers(layerSet)
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
}

export function closeAllPopUps () {
  map.closePopup()
}