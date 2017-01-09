(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('clusterize.js')) :
  typeof define === 'function' && define.amd ? define(['clusterize.js'], factory) :
  (factory(global.clusterize_js));
}(this, (function (clusterize_js) { 'use strict';

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
function remove(domNode, classes) {
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
    remove(domNode, className);
  } else {
    add(domNode, className);
  }
}

// remove 'is-active' class from every element in an array
function removeActive(array) {
  array = nodeListToArray(array);
  array.forEach(function (item) {
    remove(item, 'is-active');
  });
}

// add 'is-active' class from every element in an array


// remove 'is-active' class from every element in an array, add to one element

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

bus.on('has:javascript', flagJS);

function flagJS() {
  var html = document.querySelector('html');
  add(html, 'js-is-active');
}

var reEscape = /[\-\[\]{}()+?.,\\\^$|#\s]/g;
// Match named :param or *splat placeholders.
var reParam = /([:*])(\w+)/g;

// Test to see if a value matches the corresponding rule.
function validateRule(rule, value) {
  // For a given rule, get the first letter of the string name of its
  // constructor function. "R" -> RegExp, "F" -> Function (these shouldn't
  // conflict with any other types one might specify). Note: instead of
  // getting .toString from a new object {} or Object.prototype, I'm assuming
  // that exports will always be an object, and using its .toString method.
  // Bad idea? Let me know by filing an issue
  var type = exports.toString.call(rule).charAt(8);
  // If regexp, match. If function, invoke. Otherwise, compare. Note that ==
  // is used because type coercion is needed, as `value` will always be a
  // string, but `rule` might not.
  return type === "R" ? rule.test(value) : type === "F" ? rule(value) : rule == value;
}

// Pass in a route string (or RegExp) plus an optional map of rules, and get
// back an object with .parse and .stringify methods.
function routeMatcher(route, rules) {
  // Object to be returned. The public API.
  var self = {};
  // Matched param or splat names, in order
  var names = [];
  // Route matching RegExp.
  var re = route;

  // Build route RegExp from passed string.
  if (typeof route === "string") {
    // Escape special chars.
    re = re.replace(reEscape, "\\$&");
    // Replace any :param or *splat with the appropriate capture group.
    re = re.replace(reParam, function (_, mode, name) {
      names.push(name);
      // :param should capture until the next / or EOL, while *splat should
      // capture until the next :param, *splat, or EOL.
      return mode === ":" ? "([^/]*)" : "(.*)";
    });
    // Add ^/$ anchors and create the actual RegExp.
    re = new RegExp("^" + re + "$");

    // Match the passed url against the route, returning an object of params
    // and values.
    self.parse = function (url) {
      var i = 0;
      var param, value;
      var params = {};
      var matches = url.match(re);
      // If no matches, return null.
      if (!matches) {
        return null;
      }
      // Add all matched :param / *splat values into the params object.
      while (i < names.length) {
        param = names[i++];
        value = matches[i];
        // If a rule exists for thie param and it doesn't validate, return null.
        if (rules && param in rules && !validateRule(rules[param], value)) {
          return null;
        }
        params[param] = value;
      }
      return params;
    };

    // Build path by inserting the given params into the route.
    self.stringify = function (params) {
      var param, re;
      var result = route;
      // Insert each passed param into the route string. Note that this loop
      // doesn't check .hasOwnProperty because this script doesn't support
      // modifications to Object.prototype.
      for (param in params) {
        re = new RegExp("[:*]" + param + "\\b");
        result = result.replace(re, params[param]);
      }
      // Missing params should be replaced with empty string.
      return result.replace(reParam, "");
    };
  } else {
    // RegExp route was passed. This is super-simple.
    self.parse = function (url) {
      var matches = url.match(re);
      return matches && { captures: matches.slice(1) };
    };
    // There's no meaningful way to stringify based on a RegExp route, so
    // return empty string.
    self.stringify = function () {
      return "";
    };
  }
  return self;
}

var match = routeMatcher;
/**
* Parse URL and navigate to correct pane/state
*/
function route() {
  var width = window.innerWidth;
  var url = document.location.pathname + '/';
  url = url.replace('//', '/');
  var home = match('/').parse(url);
  var view = match('/:mode/').parse(url);

  if (home) {
    bus.emit('set:view', 'split');
  } else if (view.mode === 'map') {
    bus.emit('set:view', 'map');
  } else if (view.mode === 'text') {
    bus.emit('set:view', 'text');
  } else {
    bus.emit('set:view', 'split');
  }
}

var designClassifications = L.esri.featureLayer({
  url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/20'
});

var bicycleClassifications = L.esri.featureLayer({
  url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/22'
});

var transitClassifications = L.esri.featureLayer({
  url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/1'
});

var trafficClassifications = L.esri.featureLayer({
  url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/4'
});

var emergencyClassifications = L.esri.featureLayer({
  url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/7'
});

var pedestrianClassifications = L.esri.featureLayer({
  url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/13'
});

var pedestrianDistricts = L.esri.featureLayer({
  url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/14'
});

var freightClassifications = L.esri.featureLayer({
  url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/17'
});

var freightDistricts = L.esri.featureLayer({
  url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/18'
});

var layers = Object.freeze({
	designClassifications: designClassifications,
	bicycleClassifications: bicycleClassifications,
	transitClassifications: transitClassifications,
	trafficClassifications: trafficClassifications,
	emergencyClassifications: emergencyClassifications,
	pedestrianClassifications: pedestrianClassifications,
	pedestrianDistricts: pedestrianDistricts,
	freightClassifications: freightClassifications,
	freightDistricts: freightDistricts
});

var map = void 0;
var position = {
  center: [45.528, -122.680],
  zoom: 13
};

function draw() {
  map = L.map('map', {
    trackResize: true,
    center: position.center,
    zoom: position.zoom,
    zoomControl: false,
    scrollWheelZoom: false
  });

  map.addControl(L.control.zoom({ position: 'topright' }));

  L.esri.tiledMapLayer({
    url: "https://www.portlandmaps.com/arcgis/rest/services/Public/Basemap_Color_Complete/MapServer"
  }).addTo(map);

  drawLayers();
  map.on('moveend', savePosition);
}

function savePosition(e) {
  // console.log(e)
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
    layers[layer].addTo(map);
    layers[layer].resetStyle();
    layers[layer].bindPopup(function (evt) {
      evt.bringToFront();
      evt.setStyle({
        lineCap: 'round',
        weight: 30,
        color: '#34F644'
      });
      bus.emit('popup:opened', evt.feature.properties);
      return '';
    }).on('popupclose', function () {
      layers[layer].resetStyle();
      bus.emit('popup:leafletclosed');
    });
  });
}

function removeLayers(layerSet) {
  if (!layerSet) {
    return;
  }
  layerSet.split(',').forEach(function (layer) {
    layers[layer].removeFrom(map);
    layers[layer].unbindPopup();
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

function remove$1() {
  if (map) {
    map.remove();
  }
}

function redraw() {
  remove$1();
  draw();
  // checkActiveLayers()
}

function closeAllPopUps() {
  map.closePopup();
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

// ┌────────────────────┐
// │ Emit Scroll Events │
// └────────────────────┘
// throttled for performance
// event.add(window, 'scroll', event.throttle(isScrolling, 100));
// function isScrolling () {
//   bus.emit('scrolling:at', window.pageYOffset);
// }

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

var render = function (feature) {
  return "\n    <h5 class=\"flush-top\">\n      " + feature.StreetName + "\n    </h5>\n    <table class=\"lead-bottom lead-top\">\n      <tbody>\n        <tr>\n          <td>Current Design:</td>\n          <td>" + feature.Design + "</td>\n        </tr>\n        <tr>\n          <td>Proposed Design:</td>\n          <td>" + feature.ProposedDesign + "</td>\n        </tr>\n      </tbody>\n    </table>\n    <p class=\"flush-bottom\"><b>" + feature.Design + ":</b></p>\n    <p>What does that mean do you thing?</p>\n\n    <p class=\"flush-bottom\"><b>" + feature.ProposedDesign + ":</b></p>\n    <p>What does that mean do you thing?</p>\n\n    <p>Transportation Plan ID: <a href=\"#\">" + feature.TranPlanID + "</a></p>\n  ";
};

bus.on('set:view', setToPanel);
bus.on('set:view', setLocation);
bus.on('set:view', slowRedrawMap);
bus.on('layer:control', toggleControl$1);
bus.on('keyboard:escape', closeControl);
bus.on('keyboard:escape', closePopUp$1);
bus.on('layers:draw', drawMapLayers);
bus.on('popup:opened', handlePopUp);
bus.on('popup:opened', closeControl);
bus.on('popup:close', closePopUp$1);
bus.on('popup:leafletclosed', closePopUp$1);
bus.on('type:size', sizeTextTo);

var body = document.querySelector('body');
var panelContainer = document.querySelector('.js-panels');
var controlPanel = document.querySelector('.js-layer-control-panel');
var popUpContainer = document.querySelector('.js-pop-up');
var popUpTemplate = document.querySelector('.js-template');

function handlePopUp(feature) {
  add(popUpContainer, 'is-active');
  popUpTemplate.innerHTML = render(feature);
}

function closePopUp$1() {
  closeAllPopUps();
  remove(popUpContainer, 'is-active');
}

function setToPanel(panel) {
  if (has(panelContainer, 'text-is-active')) {
    remove(panelContainer, 'text-is-active');
  }
  if (has(panelContainer, 'map-is-active')) {
    remove(panelContainer, 'map-is-active');
  }
  if (has(panelContainer, 'split-is-active')) {
    remove(panelContainer, 'split-is-active');
  }
  add(panelContainer, panel + '-is-active');
}

function setLocation(panel) {
  panel === 'split' ? panel = '/' : panel = panel;
  if (window.history.replaceState) {
    window.history.replaceState(null, null, panel);
  }
}

function sizeTextTo(size) {
  var html = document.querySelector('html');
  if (has(html, 'type-small')) {
    remove(html, 'type-small');
  }
  if (has(html, 'type-medium')) {
    remove(html, 'type-medium');
  }
  if (has(html, 'type-large')) {
    remove(html, 'type-large');
  }
  add(html, 'type-' + size);
  html = undefined;
}

function toggleControl$1() {
  toggle(controlPanel, 'is-active');
}

function closeControl() {
  if (has(controlPanel, 'is-active')) {
    remove(controlPanel, 'is-active');
  }
}

function drawMapLayers() {
  drawLayers();
  // let activeLayers = map.getActiveLayers()
  // let inactiveLayers = map.getInactiveLayers()
  // activeLayers.forEach(function (toggle) {
  //   let layerSet = toggle.getAttribute('data-layers')
  //   map.addLayers(layerSet)
  // })
  // inactiveLayers.forEach(function (toggle) {
  //   let layerSet = toggle.getAttribute('data-layers')
  //   map.removeLayers(layerSet)
  // })

  // if (target) {
  //   target.resetStyle()
  // } else {
  //   return
  // }
  // if (target && layer.checked) {
  //   target.bindPopup(function (evt) {
  //     evt.bringToFront()
  //     evt.setStyle({
  //       lineCap: 'round',
  //       weight: 30,
  //       color: '#34F644'
  //     });
  //     bus.emit('popup:opened', evt.feature.properties)
  //     return ''
  //   }).on('popupclose', function () {
  //     target.resetStyle();
  //     bus.emit('popup:leafletclosed')
  //   })
  // } else {
  //   target.unbindPopup()
  // }
}

function slowRedrawMap() {
  var timeoutID = window.setTimeout(redraw, 300);
}

// Cool Helpers

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
    remove(modal, 'is-active');
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

// View and Intent
// Cool Components
route();
modal();

draw();

})));
