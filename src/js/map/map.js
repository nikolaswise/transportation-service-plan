import * as dom from '../helpers/dom.js';
import bus from '../helpers/bus.js';
import * as classy from '../helpers/classy.js';
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

  window.map = map

  map.createPane('bottom');
  map.createPane('top');

  window.L.esri.basemapLayer("Gray").addTo(map);

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


const getFeaturesAtPoint = (coords, layer) => {
  layer.features.query().nearby(coords, 10).ids((error, ids) => {
    if (!ids) {
      return
    }
    let targets = ids.map(id => layer.features.getFeature(id)).filter(feature => feature)
    targets.length > 1
      ? bus.emit('popup:nested', targets, layer.popup, layer)
      : bus.emit('popup:single', targets, layer.popup, layer)

  })
}

/**
 * Adds a single of layers from './layers.js' to the map.
 *
 * @param {String} Layer key, eg 'projectPoints'
 */

const addLayer = layer => {
  if (!layers[layer]) {
    return
  }
  console.log(layers[layer].features)
  layers[layer].features.addTo(map);
  layers[layer].features.legend(function(error, legend) {
    if (!error && legend.layers.length == 1) {
      bus.emit('layer:legend', legend.layers[0]);
    }
  });
  bus.emit('layer:reset', layer);
  layers[layer].features.on('click', (e) => {
    getFeaturesAtPoint(e.latlng, layers[layer])
  })
  layers[layer].features.bindPopup((evt) => {
    let tempFeature
    if (evt) {
      if (!evt.feature) {
        layers[layer].features.query().nearby(evt._latlng, 10).ids((error, ids) => {
          if (!ids) {
            return
          }
          let targets = ids.map(id => layers[layer].features.getFeature(id)).filter(feature => feature)
          tempFeature = targets[0].feature
          evt.feature
            ? evt.feature = evt.feature
            : evt.feature = tempFeature
          openPopUp(evt, layer);
        })
      }

      if (evt.bringToFront && layers[layer].popup) {
        evt.bringToFront()
        evt.setStyle({
          lineCap: 'round',
          weight: 24,
          color: '#98CBCC'
        });
        openPopUp(evt, layer);
      }
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

// const drawLegend = layers => {
//   let legend = document.querySelector('.js-legend')
//   legend.innerHTML = 'Viewing:'
//   layers = layers.filter(layer => {
//     return layer.getAttribute('data-layers') != null
//   })
//   layers.forEach(layer => {
//     legend.insertAdjacentHTML('beforeend', `
//       <span class="legend-layer">
//         ${layer.getAttribute('data-layers')},
//       </span>
//     `)
//   })
//   if ( layers.length < 1 ) {
//     legend.insertAdjacentHTML('beforeend', `None`)
//   }
// }



const slugify = (string) => string.trim().replace(/\s/g, '-');

const parseLegendData = (data, i) => `
  <button class="pt8 button button-clear legend-toggle js-legend-toggle" data-legend="${slugify(data.layerName)}">
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" class="icon legend-icon"><path d="M10 2l14 14-14 14V2z"/></svg>
    ${data.layerName}
  </button>
  <ul class="legend-group js-legend-group" data-legend="${slugify(data.layerName)}">
    ${data.legend.map(layer => (
      `<li>
        <img width="${layer.height}" height="${layer.height}" alt="Symbol" src="data:image/gif;base64,${layer.imageData}" />
        ${layer.label}
      </li>`
    )).join('')}
  </ul>
`

const closeToggles = () => {
  let toggles = Array(...document.querySelectorAll('.js-legend-toggle'))
  let nodes = Array(...document.querySelectorAll('.js-legend-group'))
  nodes.forEach(node => {
    classy.remove(node, 'is-active')
  })
  toggles.forEach(node => {
    classy.remove(node, 'is-active')
  })
}

const toggleLegend = (e) => {
  e.preventDefault()
  let isOpen = classy.has(e.target, 'is-active')
  closeToggles()
  if (!isOpen) {
    let target = e.target.getAttribute('data-legend')
    classy.add(e.target, 'is-active')
    let nodes = Array(...document.querySelectorAll('.js-legend-group')).filter(node => node.getAttribute('data-legend') == target)
    nodes.forEach(node => {
      classy.add(node, 'is-active')
    })
  }
}

const bindLegendInteraction = () => {
  let toggles = Array(...document.querySelectorAll('.js-legend-toggle'))
  toggles.forEach(node => {
    node.addEventListener('click', toggleLegend)
  })
}

const drawLayerLegend = data => {
  let nodes = Array(...document.querySelectorAll('.js-layer-legend'))
  nodes.forEach((node) => {
    node.insertAdjacentHTML(`beforeend`, parseLegendData(data))
  })
  bindLegendInteraction()
}

const clearLayerLegend = () => {
  let nodes = Array(...document.querySelectorAll('.js-layer-legend'))
  nodes.forEach(node => node.innerHTML = '')
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
  bus.on('map:layer:remove', clearLayerLegend);
  bus.on('layer:reset', resetLayerStyle);
  bus.on('layer:legend', drawLayerLegend);
}
