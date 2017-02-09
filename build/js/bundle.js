(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

function E() {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  on: function on(name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  once: function once(name, callback, ctx) {
    var self = this;
    function listener() {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    }

    listener._ = callback;
    return this.on(name, listener, ctx);
  },

  emit: function emit(name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  off: function off(name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback) {
          liveEvents.push(evts[i]);
        }
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    liveEvents.length ? e[name] = liveEvents : delete e[name];
    return this;
  }
};

var bus = new E();

/**
* Parse URL and navigate to correct pane/state
*/
function route() {
  var url = document.location.pathname + '/';
  url = url.replace('//', '/');

  if (url === '/map/') {
    bus.emit('set:view', 'map');
  } else if (url === '/text/') {
    bus.emit('set:view', 'text');
  } else {
    bus.emit('set:view', 'split');
  }
}

// Cool Helpers
// ┌────────────────────┐
// │ Class Manipulation │
// └────────────────────┘

// check if an element has a specific class
function has(domNode, className) {
  return new RegExp('(\\s|^)' + className + '(\\s|$)').test(domNode.getAttribute('class'));
}

// add one or more classes to an element
function add(domNode, classes) {
  classes.split(' ').forEach(function (c) {
    if (!has(domNode, c)) {
      domNode.setAttribute('class', domNode.getAttribute('class') + ' ' + c);
    }
  });
}

// remove one or more classes from an element
function remove$1(domNode, classes) {
  classes.split(' ').forEach(function (c) {
    var removedClass = domNode.getAttribute('class').replace(new RegExp('(\\s|^)' + c + '(\\s|$)', 'g'), '$2');
    if (has(domNode, c)) {
      domNode.setAttribute('class', removedClass);
    }
  });
}

// if domNode has the class, remove it, else add it
function toggle(domNode, className) {
  if (has(domNode, className)) {
    remove$1(domNode, className);
  } else {
    add(domNode, className);
  }
}

// remove 'is-active' class from every element in an array
function removeActive(array) {
  array = nodeListToArray(array);
  array.forEach(function (item) {
    remove$1(item, 'is-active');
  });
}

// add 'is-active' class from every element in an array


// remove 'is-active' class from every element in an array, add to one element

// ┌─────┐
// │ DOM │
// └─────┘
// Handles dom nodes

// returns closest element up the DOM tree matching a given class
function closest(className, context) {
  var current;
  for (current = context; current; current = current.parentNode) {
    if (current.nodeType === 1 && has(current, className)) {
      break;
    }
  }
  return current;
}

// turn a domNodeList into an array
function nodeListToArray(domNodeList) {
  if (Array.isArray(domNodeList)) {
    return domNodeList;
  } else {
    return Array.prototype.slice.call(domNodeList);
  }
}

// Finds all the elements inside a node, or the document and returns them as an array
function findElements(query, domNode) {
  var context = domNode || document;
  var elements = context.querySelectorAll(query);
  return nodeListToArray(elements);
}

var popupRenderer = function (current, proposed) {
  return function (feature) {
    console.log(feature);
    return "\n      <h5 class=\"flush-top\">\n        " + feature.StreetName + "\n      </h5>\n      <table class=\"lead-bottom lead-top\">\n        <tbody>\n          <tr>\n            <td>Current Classification:</td>\n            <td>" + feature[current] + "</td>\n          </tr>\n          <tr>\n            <td>Proposed Classification:</td>\n            <td>" + feature[proposed] + "</td>\n          </tr>\n        </tbody>\n      </table>\n      <p class=\"flush-bottom\"><b>" + feature[current] + ":</b></p>\n      <p>What does that mean do you thing?</p>\n\n      <p class=\"flush-bottom\"><b>" + feature[proposed] + ":</b></p>\n      <p>What does that mean do you thing?</p>\n\n      <p>Transportation Plan ID: <a href=\"#\">" + feature.TranPlanID + "</a></p>\n    ";
  };
};

var designClassifications = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/20'
  }),
  popup: popupRenderer('Design', 'ProposedDesign')
};

var bicycleClassifications = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/22'
  }),
  popup: popupRenderer('Bicycle', 'ProposedBicycle')
};

var transitClassifications = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/1'
  }),
  popup: popupRenderer('Transit', 'ProposedTransit')
};

var trafficClassifications = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/4'
  }),
  popup: popupRenderer('Traffic', 'ProposedTraffic')
};

var emergencyClassifications = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/7'
  }),
  popup: popupRenderer('Emergency', 'ProposedEmergency')
};

var pedestrianClassifications = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/13'
  }),
  popup: popupRenderer('Pedestrian', 'ProposedPedestrian')
};

var pedestrianDistricts = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/14'
  }),
  popup: popupRenderer('Pedestrian', 'ProposedPedestrian')
};

var freightClassifications = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/17'
  }),
  popup: popupRenderer('Freight', 'ProposedFreight')
};

var freightDistricts = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/18'
  }),
  popup: popupRenderer('Freight', 'ProposedFreight')
};

var projectPoints = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/1',
    pane: 'top'
  }),
  popup: popupRenderer('foo', 'bar')
};
var projectLines = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/5',
    pane: 'top'
  }),
  popup: popupRenderer('foo', 'bar')
};
var projectPolygons = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/6',
    pane: 'bottom'
  }),
  popup: popupRenderer('foo', 'bar')
};

var layers = Object.freeze({
	designClassifications: designClassifications,
	bicycleClassifications: bicycleClassifications,
	transitClassifications: transitClassifications,
	trafficClassifications: trafficClassifications,
	emergencyClassifications: emergencyClassifications,
	pedestrianClassifications: pedestrianClassifications,
	pedestrianDistricts: pedestrianDistricts,
	freightClassifications: freightClassifications,
	freightDistricts: freightDistricts,
	projectPoints: projectPoints,
	projectLines: projectLines,
	projectPolygons: projectPolygons
});

var map = void 0;
var position = {
  center: [45.528, -122.680],
  zoom: 13
};

function draw() {
  map = window.L.map('map', {
    trackResize: true,
    center: position.center,
    zoom: position.zoom,
    zoomControl: false,
    scrollWheelZoom: false
  });

  map.createPane('bottom');
  map.createPane('top');
  map.addControl(window.L.control.zoom({ position: 'topright' }));

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
    allowMultipleResults: false
  }).addTo(map);

  var results = window.L.layerGroup().addTo(map);
  searchControl.on('results', function (data) {
    console.log(data);
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
      results.addLayer(L.marker(data.results[i].latlng));
    }
  });

  drawLayers();
  map.on('moveend', savePosition);
}

function savePosition() {
  position.center = map.getCenter();
  position.zoom = map.getZoom();
}



function getActiveLayers() {
  var activeLayers = findElements('.js-layer-toggle').filter(function (toggle) {
    return toggle.checked;
  });
  return activeLayers;
}
function getInactiveLayers() {
  var inactiveLayers = findElements('.js-layer-toggle').filter(function (toggle) {
    return !toggle.checked;
  });
  return inactiveLayers;
}

function addLayers(layerSet) {
  if (!layerSet) {
    return;
  }
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

function removeLayers(layerSet) {
  if (!layerSet) {
    return;
  }
  layerSet.split(',').forEach(function (layer) {
    layers[layer].features.removeFrom(map);
    layers[layer].features.unbindPopup();
  });
}

function drawLayers() {
  var activeLayers = getActiveLayers();
  var inactiveLayers = getInactiveLayers();
  activeLayers.forEach(function (toggle) {
    var layerSet = toggle.getAttribute('data-layers');
    addLayers(layerSet);
  });
  inactiveLayers.forEach(function (toggle) {
    var layerSet = toggle.getAttribute('data-layers');
    removeLayers(layerSet);
  });
}

function remove() {
  if (map) {
    map.remove();
  }
}

function redraw() {
  remove();
  draw();
}

function closeAllPopUps() {
  map.closePopup();
}

function zoomToFeature(feature, popup) {
  console.log('Feature Properties: ' + feature);
  console.log(feature);
  if (feature.getBounds) {
    console.log('fit bunds plz');
    var bounds = feature.getBounds();
    map.fitBounds(bounds);
  } else {
    console.log('no bounds thre buddy just this point:');
    window.feature = feature;
    console.log(feature);
    map.flyTo(feature._latlng, 16);
    // map.setZoom(16)
    // position.zoom = 16;
  }

  // feature.getBounds()
}

// ┌──────────────────────┐
// │ DOM Event Management │
// └──────────────────────┘

// returns standard interaction event, later will add touch support
function click() {
  return 'click';
}

// add a callback function to an event on a DOM node
function add$1(domNode, e, fn) {
  if (domNode.addEventListener) {
    return domNode.addEventListener(e, fn, false);
  } else if (domNode.attachEvent) {
    return domNode.attachEvent('on' + e, fn);
  }
}

// remove a specific function binding from a DOM node event
function remove$2(domNode, e, fn) {
  if (domNode.removeEventListener) {
    return domNode.removeEventListener(e, fn, false);
  } else if (domNode.detachEvent) {
    return domNode.detachEvent('on' + e, fn);
  }
}

// get the target element of an event


// prevent default behavior of an event
function preventDefault(e) {
  if (e.preventDefault) {
    return e.preventDefault();
  } else if (e.returnValue) {
    e.returnValue = false;
  }
}

// stop and event from bubbling up the DOM tree


// return a function that will only execute
// once it is NOT called for delay milliseconds

// ┌──────────────────────────┐
// │ Emit View Toggle Intents │
// └──────────────────────────┘
// emit toggle button clicks
var intent = function () {
  findElements('.js-layer-toggle').map(function (btn) {
    add$1(btn, 'click', toggleLayer);
  });
  function toggleLayer(e) {
    bus.emit('layers:draw');
  }

  findElements('.js-layer-control').map(function (btn) {
    add$1(btn, 'click', toggleControl);
  });
  function toggleControl(e) {
    e.preventDefault();
    bus.emit('layer:control');
  }

  findElements('.js-view-control').map(function (btn) {
    add$1(btn, 'click', translateView);
  });
  function translateView(e) {
    e.preventDefault();
    var panel = e.target.getAttribute('data-panel');
    bus.emit('set:view', panel);
  }

  findElements('.js-close-popup').map(function (btn) {
    add$1(btn, 'click', closePopUp);
  });
  function closePopUp(e) {
    e.preventDefault();
    bus.emit('popup:close');
  }

  // ┌──────────────────────┐
  // │ Emit Keyboard Events │
  // └──────────────────────┘
  // emit presses of escape and return keys
  add$1(document, 'keyup', translateKeypress);
  function translateKeypress(e) {
    if (e.keyCode === 27) {
      bus.emit('keyboard:escape');
    } else if (e.keyCode === 13) {
      bus.emit('keyboard:return');
    } else if (e.keyCode === 32) {
      bus.emit('keyboard:space');
    } else if (e.keyCode === 38) {
      bus.emit('keyboard:arrow:up');
    } else if (e.keyCode === 40) {
      bus.emit('keyboard:arrow:down');
    } else if (e.keyCode === 37) {
      bus.emit('keyboard:arrow:left');
    } else if (e.keyCode === 39) {
      bus.emit('keyboard:arrow:right');
    }
  }

  window.onresize = didResize;
  var textPane = document.querySelector('.js-text-area');
  function didResize() {
    var width = textPane.offsetWidth;
    if (width > 785) {
      bus.emit('type:size', 'large');
    } else if (width > 599) {
      bus.emit('type:size', 'medium');
    } else if (width < 600) {
      bus.emit('type:size', 'small');
    }
  }
};

var view = function () {
  bus.on('set:view', setToPanel);
  bus.on('set:view', setLocation);
  bus.on('set:view', slowRedrawMap);
  bus.on('layer:control', toggleControl);
  bus.on('keyboard:escape', closeControl);
  bus.on('keyboard:escape', closePopUp);
  bus.on('layers:draw', drawMapLayers);
  bus.on('popup:opened', handlePopUp);
  // bus.on('popup:opened', closeControl);
  bus.on('popup:opened', zoomToFeature);
  bus.on('popup:close', closePopUp);
  bus.on('popup:leafletclosed', closePopUp);
  bus.on('type:size', sizeTextTo);

  var panelContainer = document.querySelector('.js-panels');
  var controlPanel = document.querySelector('.js-layer-control-panel');
  var controlButton = document.querySelector('.js-layer-control');
  var popUpContainer = document.querySelector('.js-pop-up');
  var popUpTemplate = document.querySelector('.js-template');

  function handlePopUp(evt, renderTemplate) {
    console.log(evt, renderTemplate);
    add(popUpContainer, 'is-active');
    console.log(evt.feature.properties);
    popUpTemplate.innerHTML = renderTemplate(evt.feature.properties);
  }

  function closePopUp() {
    closeAllPopUps();
    remove$1(popUpContainer, 'is-active');
  }

  function setToPanel(panel) {
    if (has(panelContainer, 'text-is-active')) {
      remove$1(panelContainer, 'text-is-active');
    }
    if (has(panelContainer, 'map-is-active')) {
      remove$1(panelContainer, 'map-is-active');
    }
    if (has(panelContainer, 'split-is-active')) {
      remove$1(panelContainer, 'split-is-active');
    }
    add(panelContainer, panel + '-is-active');
  }

  function setLocation(panel) {
    if (panel === 'split') {
      panel = '/';
    }
    if (window.history.replaceState) {
      window.history.replaceState(null, null, panel);
    }
  }

  function sizeTextTo(size) {
    var html = document.querySelector('html');
    if (has(html, 'type-small')) {
      remove$1(html, 'type-small');
    }
    if (has(html, 'type-medium')) {
      remove$1(html, 'type-medium');
    }
    if (has(html, 'type-large')) {
      remove$1(html, 'type-large');
    }
    add(html, 'type-' + size);
  }

  function toggleControl() {
    toggle(controlPanel, 'is-active');
    toggle(controlButton, 'is-active');
  }

  function closeControl() {
    if (has(controlPanel, 'is-active')) {
      remove$1(controlPanel, 'is-active');
    }
  }

  function drawMapLayers() {
    drawLayers();
  }

  function slowRedrawMap() {
    window.setTimeout(redraw, 300);
  }
};

// ┌────────────────┐
// │ Aria Adjusters │
// └────────────────┘
// utilities to help manage aria properties

// toggles `aria-hidden` on a domNode


// adds `aria-hidden` on a domNode
function hide(array) {
  array.forEach(function (node) {
    if (!node) {
      return;
    }
    node.setAttribute('aria-hidden', true);
  });
}

// removes `aria-hidden` on a domNode
function show(array) {
  array.forEach(function (node) {
    if (!node) {
      return;
    }
    node.removeAttribute('aria-hidden');
  });
}

// ┌───────┐
// │ Modal │
// └───────┘
// show and hide modal dialogues
// Listens to a 'modal:bind' optionally takes a node
// Emits and listens on the 'modal:open' channel. Takes a data-modal attr
// Emits and listens to on the 'modal:close' channel. Optionally takes a data-modal
// Emitting a modal id toggle that modals state.
// Emitting false or null closes all modals.

function modal() {
  // Cool nodes
  var toggles = findElements('.js-modal-toggle');
  var modals = findElements('.js-modal');

  // Bus events
  bus.on('modal:open', openModal);
  bus.on('keyboard:escape', closeModal);
  bus.on('modal:close', closeModal);
  bus.on('modal:bind', bindModals);

  function dependentNodes() {
    var nodes = [];
    return nodes;
  }

  function openModal(modalId) {
    bus.emit('modal:close');
    if (!modalId) return;
    var modal = document.querySelector('.js-modal[data-modal="' + modalId + '"]');
    modal.removeAttribute('tabindex');
    add$1(document, 'focusin', fenceModal);
    add(modal, 'is-active');
    hide(dependentNodes());
    modal.focus();
  }

  function closeModal(modalId) {
    if (!modalId) return removeActive(modals);
    var modal = document.querySelector('.js-modal[data-modal="' + modalId + '"]');
    remove$1(modal, 'is-active');
    modal.setAttribute('tabindex', 0);
    remove$2(document, 'focusin', fenceModal);
    show(dependentNodes());
  }

  function bindModals(node) {
    if (!node) {
      toggles.forEach(function (toggle$$1) {
        add$1(toggle$$1, click(), toggleClick);
      });
    } else {
      add$1(node, click(), toggleClick);
    }
  }

  function fenceModal(e) {
    if (!closest('js-modal', e.target)) {
      modals.forEach(function (modal) {
        if (has(modal, 'is-active')) {
          modal.focus();
        }
      });
    }
  }

  function toggleClick(e) {
    preventDefault(e);
    var modalId = e.target.dataset.modal;
    bus.emit('modal:open', modalId);
  }

  bus.emit('modal:bind');
}

// Cool Helpers
function drawer() {
  var wrapper = document.querySelector('.js-panels');
  var toggles = findElements('.js-drawer-toggle');
  var drawers = findElements('.js-drawer');
  var lastOn;

  // Bus events
  bus.on('drawer:open', openDrawer);
  bus.on('keyboard:escape', closeDrawer);
  bus.on('drawer:close', closeDrawer);
  bus.on('drawer:bind', bindDrawers);

  function openDrawer(options) {
    bus.emit('drawer:close');
    var drawer = document.querySelector('.js-drawer[data-drawer="' + options.id + '"]');
    var right = has(drawer, 'drawer-right');
    var left = has(drawer, 'drawer-left');

    drawer.setAttribute('tabindex', 0);
    add(drawer, 'is-active');

    if (right) {
      add(wrapper, 'drawer-right-is-active');
    } else if (left) {
      add(wrapper, 'drawer-left-is-active');
    }

    hide([wrapper]);
    add$1(drawer, click(), closeClick);
    add$1(document, 'focusin', fenceDrawer);
  }

  function closeDrawer(options) {
    if (!options) {
      drawers.forEach(function (drawer) {
        drawer.removeAttribute('tabindex');
        remove$1(drawer, 'is-active');
      });
    } else {
      var drawer = document.querySelector('.js-drawer[data-drawer="' + options.id + '"]');
      drawer.removeAttribute('tabindex');
      remove$1(drawer, 'is-active');
    }
    remove$1(wrapper, 'drawer-left-is-active');
    remove$1(wrapper, 'drawer-right-is-active');
    toggles.forEach(function (toggle$$1) {
      remove$1(toggle$$1, 'is-active');
    });
    show([wrapper]);
    remove$2(document, 'focusin', fenceDrawer);
    if (lastOn) lastOn.focus();
  }

  function fenceDrawer(e) {
    if (!closest('js-drawer', e.target)) {
      drawers.forEach(function (drawer) {
        if (has(drawer, 'is-active')) {
          drawer.focus();
        }
      });
    }
  }

  function bindDrawers(options) {
    if (!options) {
      toggles.forEach(function (toggle$$1) {
        add$1(toggle$$1, click(), toggleClick);
      });
    } else {
      add$1(options.node, click(), toggleClick);
    }
  }

  function closeClick(e) {
    if (has(e.target, 'js-drawer')) {
      bus.emit('drawer:close');
    }
  }

  function toggleClick(e) {
    preventDefault(e);
    var drawerId = e.target.getAttribute('data-drawer');
    add(e.target, 'is-active');
    bus.emit('drawer:open', { id: drawerId });
  }

  bus.emit('drawer:bind');
}

// View and Intent
// Cool Components
intent();
view();

route();
modal();
drawer();

var textPane = document.querySelector('.js-text-area');
var width = textPane.offsetWidth;

if (width > 785) {
  bus.emit('type:size', 'large');
} else if (width > 599) {
  bus.emit('type:size', 'medium');
} else if (width < 600) {
  bus.emit('type:size', 'small');
}

draw();

})));
