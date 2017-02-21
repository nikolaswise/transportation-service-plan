import * as dom from '../helpers/dom.js';
import bus from '../helpers/bus.js';
import * as layers from './layers';
let map;
let position = {
  center: [45.528, -122.680],
  zoom: 13
};

// this is the the _main_ side effect - draw that map!
export function draw () {
  map = window.L.map('map', {
    trackResize: true,
    center: position.center,
    zoom: position.zoom,
    zoomControl: false,
    scrollWheelZoom: false
  });

  map.createPane('bottom');
  map.createPane('top');
  map.addControl(window.L.control.zoom({position: 'topright'}));

  window.L.esri.tiledMapLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Basemap_Color_Complete/MapServer'
  }).addTo(map);


  // var arcgisOnline = window.L.esri.Geocoding.arcgisOnlineProvider();
  // var portlandMaps = new window.L.esri.Geocoding.geocodeServiceProvider({
  //   label: 'Portland Maps',
  //   maxResults: 10,
  //   url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Address_Geocoding_PDX/GeocodeServer'
  // });

  // console.log(portlandMaps)
  // window.provider = portlandMaps

  // var searchControl = window.L.esri.Geocoding.geosearch({
  //   position: 'topright',
  //   zoomToResult: true,
  //   useMapBounds: 10,
  //   allowMultipleResults: false,
  //   providers: [portlandMaps]
  // }).addTo(map);

  // create the geocoding control and add it to the map
  var searchControl = L.esri.Geocoding.geosearch({
    position: 'topright',
    zoomToResult: true,
    useMapBounds: 10,
    allowMultipleResults: false,
  }).addTo(map);

  var results = window.L.layerGroup().addTo(map);
  searchControl.on('results', function(data){
    console.log(data);
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
      results.addLayer(L.marker(data.results[i].latlng));
    }
  });

  drawLayers();
  map.on('moveend', savePosition);
}

function savePosition () {
  position.center = map.getCenter();
  position.zoom = map.getZoom();
}


// does exporting inidivual functions make this better?
// or would this be better served by using the bus?
// ie: hoist the functions and just set the bindings in the default function.
export function getLayer (layer) {
  return layers[layer.layerId];
}

// but these functions return data ...
// they would need to invoked as a promise maybe? or a callback?
// function (input, cb) { let return = manipulate(input); cb(return) }
// would probably be a cleaner way to deal with this.
export function getActiveLayers () {
  let activeLayers = dom.findElements('.js-layer-toggle').filter(function (toggle) {
    return toggle.checked;
  });
  return activeLayers;
}
export function getInactiveLayers () {
  let inactiveLayers = dom.findElements('.js-layer-toggle').filter(function (toggle) {
    return !toggle.checked;
  });
  return inactiveLayers;
}

// again, this is a sude effect so should only happen via explicit bus command.
export function addLayers (layerSet) {
  if (!layerSet) { return; }
  layerSet.split(',').forEach(function (layer) {
    layers[layer].features.addTo(map);
    layers[layer].features.resetStyle();
    layers[layer].features.bindPopup(function (evt) {
      evt.bringToFront();
      evt.setStyle({
        lineCap: 'round',
        weight: 30,
        color: '#34F644'
      });
      bus.emit('popup:opened', evt, layers[layer].popup);
      return '';
    }).on('popupclose', function () {
      layers[layer].features.resetStyle();
      bus.emit('popup:leafletclosed');
    });
  });
}

export function removeLayers (layerSet) {
  if (!layerSet) { return; }
  layerSet.split(',').forEach(function (layer) {
    layers[layer].features.removeFrom(map);
    layers[layer].features.unbindPopup();
  });
}

export function drawLayers () {
  let activeLayers = getActiveLayers();
  let inactiveLayers = getInactiveLayers();
  activeLayers.forEach(function (toggle) {
    let layerSet = toggle.getAttribute('data-layers');
    addLayers(layerSet);
  });
  inactiveLayers.forEach(function (toggle) {
    let layerSet = toggle.getAttribute('data-layers');
    removeLayers(layerSet);
  });
}

// these are just side effect functions —
// could probably be done with the bus
export function remove () {
  if (map) {
    map.remove();
  }
}

export function redraw () {
  remove();
  draw();
}

export function closeAllPopUps () {
  map.closePopup();
}

// same here ...
export function zoomToFeature (feature, popup) {
  console.log(`Feature Properties: ${feature}`)
  console.log(feature)
  if (feature.getBounds) {
    console.log('fit bunds plz')
    let bounds = feature.getBounds()
    map.fitBounds(bounds)
  } else {
    console.log('no bounds thre buddy just this point:')
    window.feature = feature
    console.log(feature)
    map.flyTo(feature._latlng, 16)
    // map.setZoom(16)
    // position.zoom = 16;
  }

  // feature.getBounds()
}
