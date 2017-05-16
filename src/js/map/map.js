import * as dom from '../helpers/dom.js';
import bus from '../helpers/bus.js';
import * as layers from './layers';

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
  console.log('draw map')
  map = window.L.map('map', {
    trackResize: true,
    center: position.center,
    zoom: position.zoom,
    zoomControl: false,
    scrollWheelZoom: false
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
  map.addControl(window.L.control.zoom({position: 'topright'}));

  var pbotGeocoder = window.L.esri.Geocoding.geocodeServiceProvider({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Geocoding_PDX/GeocodeServer'
  });

  var searchControl = window.L.esri.Geocoding.geosearch({
    providers: [pbotGeocoder],
    position: 'topright',
    zoomToResult: true,
    useMapBounds: 10,
    allowMultipleResults: true
  }).addTo(map);

  var results = window.L.layerGroup().addTo(map);

  searchControl.on('results', function (data) {
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
      results.addLayer(window.L.marker(data.results[i].latlng));
    }
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
  layerSet.split(',').forEach((layer) => addLayer(layer));
};

/**
 * Adds a single of layers from './layers.js' to the map.
 *
 * @param {String} Layer key, eg 'projectPoints'
 */
const addLayer = layer => {
  layers[layer].features.addTo(map);
  bus.emit('layer:reset', layer);
  layers[layer].features.bindPopup((evt) => {
    openPopUp(evt, layer);
    return '';
  }).on('popupclose', function () {
    bus.emit('layer:reset', layer);
  });
};

/**
 * Opens the independant (aka non-leaflet) popup from a click on a feature for a given layer.
 *
 * @param {Event} Click event from map feature.
 * @param {String} Layer key, eg 'projectPoints'
 */
const openPopUp = (evt, layer) => {
  evt.bringToFront();
  evt.setStyle({
    lineCap: 'round',
    weight: 30,
    color: '#34F644'
  });
  bus.emit('popup:opened', evt, layers[layer].popup);
};

/**
 * Resets a layers style to default renderer. Used to undo highlighting from a click.
 *
 * @param {String} Layer key, eg 'projectPoints'
 */
const resetLayerStyle = layer => {
  layers[layer].features.resetStyle();
};

/**
 * Removes a set of layers from './layers.js' to the map.
 *
 * @param {String} Comma seperated string of layer names. eg "projectPoints, projectLines"
 */
const removeLayers = (layerSet) => {
  if (!layerSet) { return; }
  layerSet.split(',').forEach((layer) => removeLayer(layer));
};

/**
 * Removes a single of layers from './layers.js' to the map.
 *
 * @param {String} Layer key, eg 'projectPoints'
 */
const removeLayer = layer => {
  layers[layer].features.removeFrom(map);
  layers[layer].features.unbindPopup();
};

/**
 * Adds any layers indicated as active from the layer toggle list to the map.
 */
const drawLayers = () => {
  getActiveLayers().forEach((toggle) => {
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
  if (feature.getBounds) {
    let bounds = feature.getBounds();
    bus.emit('map:fitBounds', bounds);
  } else {
    let latlng = feature._latlng
    let zoom = 16
    bus.emit('map:setFeature', latlng, zoom)
  }
};

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
}
