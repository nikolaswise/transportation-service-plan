import * as dom from '../helpers/dom.js';
import bus from '../helpers/bus.js';
import * as layers from './layers';
import ZoomMin from '../lib/L.Control.ZoomMin.js'

// this stuff is statefull.
let map;
let position = {
  center: [45.528, -122.63],
  zoom: 12
};

/**
 * Interacts with the Esri Leaflet API to draw a map in the dom Node with an id of 'map'
 */

const drawMap = () => {
  map = window.L.map('map', {
    trackResize: true,
    center: position.center,
    minZoom: 12,
    zoom: position.zoom,
    zoomControl: false,
    scrollWheelZoom: true
  });

  map.createPane('bottom');
  map.createPane('top');

  window.L.esri.tiledMapLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Basemap_Color_Complete/MapServer'
  }).addTo(map);

  // stateful side effects!!
  map.on('moveend', function () {
    position.center = map.getCenter();
    position.zoom = map.getZoom();
  });
  createGeocoder();
};

/**
 * Adds a Geocoding widget to the map, if the map exists.
 */

const createGeocoder = () => {
  // map.addControl(window.L.control.zoom({position: 'topright'}));
  map.addControl(new ZoomMin)

  var pdxGeocoder = window.L.esri.Geocoding.geocodeServiceProvider({
    url: 'https://www.portlandmaps.com/locator/Default/GeocodeServer'
  });

  var searchControl = L.esri.Geocoding.geosearch({
    // providers: [pdxGeocoder],
    position: 'topright',
    zoomToResult: true,
    allowMultipleResults: false,
    searchBounds: L.latLngBounds([[45.6574694,-122.8695448],[45.3309588,-122.4284356]])
  }).addTo(map);
  var results = L.layerGroup().addTo(map);
  searchControl.on('results', function(data){
    results.clearLayers();
    results.addLayer(L.marker(data.results[0].latlng));
    map.setZoom(0);
    position.zoom = 0;
  });

};

/**
 * Locates all layer toggle elements currently checked.
 *
 * @returns {NodeList} NodeList of active input elements.
 */

const getActiveLayers = () => {
  let activeLayers = dom.findElements('.js-layer-toggle').filter(function (toggle) {
    return toggle.checked;
  });
  return activeLayers;
};

/**
 * Locates all layer toggle elements which are not currently checked.
 *
 * @returns {NodeList} NodeList of inactive input elements.
 */
const getInactiveLayers = () => {
  let inactiveLayers = dom.findElements('.js-layer-toggle').filter(function (toggle) {
    return !toggle.checked;
  });
  return inactiveLayers;
};

/**
 * Adds a set of layers from './layers.js' to the map.
 *
 * @param {String} Comma seperated string of layer names. eg "projectPoints, projectLines"
 */
const addLayers = (layerSet) => {
  if (!layerSet) { return; }
  layerSet = layerSet.replace(/ /g, '');
  layerSet.split(',').forEach((layer) => addLayer(layer));
};

/**
 * Adds a single of layers from './layers.js' to the map.
 *
 * @param {String} Layer key, eg 'projectPoints'
 */

const addLayer = layer => {
  if (!layers[layer]) {
    return
  }
  layers[layer].features.addTo(map);
  bus.emit('layer:reset', layer);
  layers[layer].features.bindPopup((err, evt) => {
    if (err) {
      err.feature
        ? evt = err
        : err = err
    }
    if (evt) {
      openPopUp(evt, layer);
    }
    return 'hey';
  }).on('popupclose', function () {
    bus.emit('layer:reset', layer);
  });
}

/**
 * Opens the independant (aka non-leaflet) popup from a click on a feature for a given layer.
 *
 * @param {Event} Click event from map feature.
 * @param {String} Layer key, eg 'projectPoints'
 */
const openPopUp = (evt, layer) => {
  bus.emit('popup:opened', evt, layers[layer].popup);
};

/**
 * Resets a layers style to default renderer. Used to undo highlighting from a click.
 *
 * @param {String} Layer key, eg 'projectPoints'
 */
const resetLayerStyle = layer => {
  if (layers[layer].features.resetStyle) {
    layers[layer].features.resetStyle();
  }
};

/**
 * Removes a set of layers from './layers.js' to the map.
 *
 * @param {String} Comma seperated string of layer names. eg "projectPoints, projectLines"
 */
const removeLayers = (layerSet) => {
  if (!layerSet) { return; }
  layerSet = layerSet.replace(/ /g, '');
  layerSet.split(',').forEach((layer) => removeLayer(layer));
};

/**
 * Removes a single of layers from './layers.js' to the map.
 *
 * @param {String} Layer key, eg 'projectPoints'
 */
const removeLayer = layer => {
  if (!layers[layer]) {
    return
  }
  layers[layer].features.removeFrom(map);
  layers[layer].features.unbindPopup();
};

/**
 * Adds any layers indicated as active from the layer toggle list to the map.
 */
const drawLayers = () => {
  let layers = getActiveLayers()
  bus.emit('map:legend', layers);
  layers.forEach((toggle) => {
    let layerSet = toggle.getAttribute('data-layers');
    bus.emit('map:layer:add', layerSet);
  });
  getInactiveLayers().forEach((toggle) => {
    let layerSet = toggle.getAttribute('data-layers');
    bus.emit('map:layer:remove', layerSet);
  });
};

/**
 * Tears down the map from the DOM.
 */
const destroyMap = () => {
  if (map) {
    map.remove();
  }
};

/**
 * Destroys and redraws the map.
 */
const redrawMap = () => {
  bus.emit('map:destroy');
  bus.emit('map:create');
};

/**
 * Closes all popups active on the map.
 */
const closePopUps = () => {
  map.closePopup();
};

/**
 * Fits the current map view to a leaflet bound.
 *
 * @param {Object} A Leaflet bounds object
 */
const setMapToBounds = bounds => {
  map.fitBounds(bounds);
};

/**
 * Moves map view to a specific point and zoom level.
 *
 * @param {Object} A Leaflet LatLng object
 * @param {Integer} Leaflet map zoom level
 */
const setMapToFeature = (latlng, zoom) => {
  map.flyTo(latlng, zoom);
  position.zoom = zoom;
};

/**
 * Moves map view to a specific feature.
 *
 * @param {Object} A Leaflet feature
 */
const zoomToFeature = feature => {
  // if (feature.getBounds) {
  //   let bounds = feature.getBounds();
  //   bus.emit('map:fitBounds', bounds);
  // } else {
  //   let latlng = feature._latlng
  //   let zoom = 16
  //   bus.emit('map:setFeature', latlng, zoom)
  // }
};

const drawLegend = layers => {
  let legend = document.querySelector('.js-legend')
  legend.innerHTML = 'Viewing:'
  layers = layers.filter(layer => {
    return layer.getAttribute('data-layers') != null
  })
  layers.forEach(layer => {
    legend.insertAdjacentHTML('beforeend', `
      <span class="legend-layer">
        ${layer.getAttribute('data-layers')},
      </span>
    `)
  })
  if ( layers.length < 1 ) {
    legend.insertAdjacentHTML('beforeend', `None`)
  }
}

/**
 * Binds all side effect listeners, exposes the API, and draws the map
 */
export default function () {
  bus.on('popup:opened', zoomToFeature);
  bus.on('popup:closed', closePopUps);
  bus.on('map:redraw', redrawMap);
  bus.on('map:destroy', destroyMap);
  bus.on('map:create', drawMap);
  bus.on('map:create', drawLayers);
  bus.on('map:fitBounds', setMapToBounds);
  bus.on('map:setFeature', setMapToFeature);
  bus.on('layers:draw', drawLayers);
  bus.on('map:layer:add', addLayers);
  bus.on('map:layer:remove', removeLayers);
  bus.on('layer:reset', resetLayerStyle);
  bus.on('map:legend', drawLegend);
}
