(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

// Dom needs Classy! It's a mutually dependant deal.
// ┌─────┐
// │ DOM │
// └─────┘
// Handles dom nodes

/**
 * Returns closest element up the DOM tree matching a given class
 *
 * @param {String} The class to search for
 * @param {Node} Where to search for the Node
 * @returns {Node} The desired DOM Node.
 */
function closest(className, context) {
  var current;
  for (current = context; current; current = current.parentNode) {
    if (current.nodeType === 1 && has(current, className)) {
      break;
    }
  }
  return current;
}

/**
 * Converts a NodeList into an Array.
 *
 * @param {NodeList} A NodeList.
 * @returns {Array} An array of DOM nodes.
 */
function nodeListToArray(domNodeList) {
  if (Array.isArray(domNodeList)) {
    return domNodeList;
  } else {
    return Array.prototype.slice.call(domNodeList);
  }
}

/**
 * Finds all the elements inside a node, or the document and returns them as an array
 *
 * @param {String} Class to select DOM nodes on
 * @param {Node} The DOM Node to scope the search within.
 * @returns {Array} An array of DOM nodes.
 */
function findElements(query, domNode) {
  var context = domNode || document;
  var elements = context.querySelectorAll(query);
  return nodeListToArray(elements);
}

/**
 * Removes DOM Nodes from an array if they do not match the filter parameter.
 *
 * @param {String} String to filter array on.
 * @param {Array} An array of DOM nodes.
 * @returns {Array} An array of DOM nodes.
 */

// Classy needs the DOM helpers
// ┌────────────────────┐
// │ Class Manipulation │
// └────────────────────┘

/**
 * Checks a domNode for the presence of a class.
 *
 * @param {Node} DOM Node to check
 * @param {String} Class to check for.
 * @returns {Boolean}
 */
function has(domNode, className) {
  return new RegExp('(\\s|^)' + className + '(\\s|$)').test(domNode.getAttribute('class'));
}

/**
 * Adds one or more classes to a DOM Node
 *
 * @param {Node} DOM Node to add class to
 * @param {String} Classes to add to DOM Node. Words seperated by spaces will be treated as seperate classes.
 */
function add(domNode, classes) {
  classes.split(' ').forEach(function (c) {
    if (!has(domNode, c)) {
      domNode.setAttribute('class', domNode.getAttribute('class') + ' ' + c);
    }
  });
}

/**
 * Removes one or more classes from a DOM Node.
 *
 * @param {Node} DOM Node to check
 * @param {String} Classes to remove from DOM Node. Words seperated by spaces will be treated as seperate classes.
 */
function remove(domNode, classes) {
  classes.split(' ').forEach(function (c) {
    var removedClass = domNode.getAttribute('class').replace(new RegExp('(\\s|^)' + c + '(\\s|$)', 'g'), '$2');
    if (has(domNode, c)) {
      domNode.setAttribute('class', removedClass);
    }
  });
}

/**
 * Toggles a single class from a DOM Node.
 *
 * @param {Node} DOM Node to toggle class.
 * @param {String} Class to toggle. If the class is present, remove the class. If the class is not present, add the class.
 */
function toggle(domNode, className) {
  if (has(domNode, className)) {
    remove(domNode, className);
  } else {
    add(domNode, className);
  }
}

/**
 * Remove the `is-active` class from an array of Nodes
 *
 * @param {NodeArray} Array of DOM Nodes.
 */
function removeActive(array) {
  array = nodeListToArray(array);
  array.forEach(function (item) {
    remove(item, 'is-active');
  });
}

/**
 * Adds the `is-active` class from an array of Nodes
 *
 * @param {NodeArray} Array of DOM Nodes.
 */


/**
 * Removes the `is-active` class from an array of Nodes and adds it to a single Node.
 *
 * @param {NodeArray} Array of DOM Nodes.
 * @param {Node} DOM Node.
 */

/**
 * Creates the Event Bus.
 */
function E() {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  /**
   * Subscribes to an event, calling the function every time the event is emitted.
   *
   * @param {String} The name of the event to subscribe to
   * @param {Function} The  function to call when event is emitted
   * @param {String} (OPTIONAL) - the context to bind the event callback to
   */
  on: function on(name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  /**
   * Subscribes to an event, calling the function the **first** time the event is emitted.
   *
   * @param {String} The name of the event to subscribe to
   * @param {Function} The  function to call when event is emitted
   * @param {String} (OPTIONAL) - the context to bind the event callback to
   */
  once: function once(name, callback, ctx) {
    var self = this;
    function listener() {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    }

    listener._ = callback;
    return this.on(name, listener, ctx);
  },

  /**
   * Emit a named event. All subscribing listeners will call their functions.
   *
   * @param {String} The name of the event to subscribe to
   * @param {Args} Any number of arguments to pass to the callbacks.
   */
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

  /**
   * Unsubscribes to an event. The function passed will no longer be called.
   *
   * @param {String} The name of the event to subscribe to
   * @param {Function} The  function to call when event is emitted
   */
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

/**
 * Adds 'js-is-active' class to root HTML node
 */
function flagJS() {
  var html = document.querySelector('html');
  add(html, 'js-is-active');
}

/**
 * Emits event to trigger flagJS function.
 */
var hasJS = function () {
  bus.emit('has:javascript');
  return true;
};

/**
* Parse URL and navigate to correct pane/state
*/

// this needs to a little more robust, and be able to handle queries maybe? for sure hashes.
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

// ┌──────────────────────┐
// │ DOM Event Management │
// └──────────────────────┘
// Designed for browser support becuase MICROSOFT sheesh.

/**
 * Keeps track of what events are bound on what component nodes.
 */
/**
 * Return the string 'click', apparently.
 *
 * @returns {String} 'click'
 */
function click() {
  return 'click';
}

/**
 * Add a callback function to an event on a DOM node
 *
 * @param {Node} Node to attach event too.
 * @param {String} Type of event to attach.
 * @param {Function} Function to attach on event.
 * @returns {Function} Proper event attachment function.
 */
function add$1(domNode, e, fn) {
  if (domNode.addEventListener) {
    return domNode.addEventListener(e, fn, false);
  } else if (domNode.attachEvent) {
    return domNode.attachEvent('on' + e, fn);
  }
}

/**
 * Remove a specific function binding from a DOM node event
 *
 * @param {Node} Node to attach event too.
 * @param {String} Type of event to detach.
 * @param {Function} Function to detach on event.
 * @returns {Function} Proper event detachment function.
 */
function remove$1(domNode, e, fn) {
  if (domNode.removeEventListener) {
    return domNode.removeEventListener(e, fn, false);
  } else if (domNode.detachEvent) {
    return domNode.detachEvent('on' + e, fn);
  }
}

/**
 * Remove a specific function binding from a DOM node event
 *
 * @param {Event} Event with target
 * @returns {Node} Node which is the target of said event.
 */
// get the target element of an event


/**
 * Prevent default behavior of an event
 *
 * @param {Event} Event to prevent.
 * @returns {Function} Proper event preventing function.
 */
function preventDefault(e) {
  if (e.preventDefault) {
    return e.preventDefault();
  } else if (e.returnValue) {
    e.returnValue = false;
  }
}

/**
 * Prevent an event from bubbling up the DOM tree
 *
 * @param {Event} Event to prevent.
 * @returns {Function} Proper event debubbling function if required.
 */


/**
 * Prevent a function from being called if it has been called recently.
 *
 * @param {Function} Event to prevent.
 * @param {Number} Length of time that function remains uncallable for.
 * @param {Uhhh} Context for function I guess?
 * @returns {Function} A function that will intercept the original function.
 */

// ┌──────────────────────────┐
// │ Emit View Toggle Intents │
// └──────────────────────────┘
// emit toggle button clicks

/**
 * Locates layer control input nodes. Binds user input to bus event.
 */
var bindLayerToggles = function bindLayerToggles() {
  findElements('.js-layer-toggle').forEach(function (btn) {
    add$1(btn, 'click', toggleLayer);
  });
  function toggleLayer(e) {
    bus.emit('layers:draw');
  }
};

/**
 * Locates layer panel controller. Binds user input to bus event.
 */
var bindLayerControllers = function bindLayerControllers() {
  findElements('.js-layer-control').forEach(function (btn) {
    add$1(btn, 'click', toggleControl);
  });
  function toggleControl(e) {
    e.preventDefault();
    bus.emit('layer:control');
  }
};

/**
 * Locates app view controller. Binds user input to bus event.
 */
var bindViewController = function bindViewController() {
  findElements('.js-view-control').forEach(function (btn) {
    add$1(btn, 'click', translateView);
  });
  function translateView(e) {
    e.preventDefault();
    var panel = e.target.getAttribute('data-panel');
    bus.emit('set:view', panel);
  }
};

/**
 * Locates pop up closing buttons. Binds user input to bus event.
 */
var bindPopUpClosers = function bindPopUpClosers() {
  findElements('.js-close-popup').forEach(function (btn) {
    add$1(btn, 'click', closePopUp);
  });
  function closePopUp(e) {
    e.preventDefault();
    bus.emit('popup:close');
  }
};

// ┌──────────────────────┐
// │ Emit Keyboard Events │
// └──────────────────────┘
// emit presses of escape and return keys
// this would be 'bind:keyup'

/**
 * Adds listenrs to keyup, binds interesting keyups to bus events.
 */
var bindKeyup = function bindKeyup() {
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
};

/**
 * Emits type resizing events on window resize.
 */
var bindWindowResize = function bindWindowResize() {
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

/**
 * Emits events for binding intent controllers.
 */
var bindIntents = function bindIntents() {
  bus.emit('bind:layer:toggles');
  bus.emit('bind:layer:controllers');
  bus.emit('bind:view:controller');
  bus.emit('bind:popup:closers');
  bus.emit('bind:keyup');
  bus.emit('bind:window:resize');
};

/**
 * Sets listeners for binding intents on bus events.
 * Emits event to bind all intent listeners.
 */
var intent = function () {
  bus.on('bind:layer:toggles', bindLayerToggles);
  bus.on('bind:layer:controllers', bindLayerControllers);
  bus.on('bind:view:controller', bindViewController);
  bus.on('bind:popup:closers', bindPopUpClosers);
  bus.on('bind:keyup', bindKeyup);
  bus.on('bind:window:resize', bindWindowResize);
  bus.on('bind:intent', bindIntents);

  bus.emit('bind:intent');
};

/**
 * Renders the HTML for a popup, given a click event on a leaflet feature and a popup template
 * Places rendered popip html in DOM Node with the 'js-pop-up' class.
 *
 * @param {Event} Leaflet feature click event
 * @param {Function} Render template function from `./layers.hs`
 */
var handlePopUp = function handlePopUp(evt, renderTemplate) {
  var popUpContainer = document.querySelector('.js-pop-up');
  var popUpTemplate = document.querySelector('.js-template');
  add(popUpContainer, 'is-active');
  popUpTemplate.innerHTML = renderTemplate(evt.feature.properties);
};

/**
 * Removes `is-active` class from pop node.
 * Emits event on bus.
 *
 * @param {Event} Leaflet feature click event
 * @param {Function} Render template function from `./layers.hs`
 */
var closePopUp = function closePopUp() {
  var popUpContainer = document.querySelector('.js-pop-up');
  remove(popUpContainer, 'is-active');
  bus.emit('popup:closed');
};

/**
 * Adds panel view class to panel container DOM nodel
 *
 * @param {String} `map`, `text`, or `split`
 */
var setToPanel = function setToPanel(panel) {
  var panelContainer = document.querySelector('.js-panels');
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
};

/**
 * Sets URL to reflect panel view.
 *
 * @param {String} `map`, `text`, or `split`
 */
var setLocation = function setLocation(panel) {
  if (panel === 'split') {
    panel = '/';
  }
  if (window.history.replaceState) {
    window.history.replaceState(null, null, panel);
  }
};

/**
 * Sets class on root HTML node that defines text size.
 *
 * @param {String} `small`, `medium`, or `large`
 */
var sizeTextTo = function sizeTextTo(size) {
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
};

/**
 * Shows or hides the layer control panel
 */
var toggleControl = function toggleControl() {
  var controlPanel = document.querySelector('.js-layer-control-panel');
  var controlButton = document.querySelector('.js-layer-control');
  toggle(controlPanel, 'is-active');
  toggle(controlButton, 'is-active');
};

/**
 * Hides the layer control panel
 */
var closeControl = function closeControl() {
  var controlPanel = document.querySelector('.js-layer-control-panel');
  if (has(controlPanel, 'is-active')) {
    remove(controlPanel, 'is-active');
  }
};

/**
 * Emits a map redraw event on the bus.
 */
var redrawMap = function redrawMap() {
  bus.emit('map:redraw');
};

/**
 * Binds event listeners for view functions.
 */
var view = function () {
  bus.on('set:view', setToPanel);
  bus.on('set:view', setLocation);
  bus.on('set:view', redrawMap);
  bus.on('layer:control', toggleControl);
  bus.on('keyboard:escape', closeControl);
  bus.on('keyboard:escape', closePopUp);
  bus.on('popup:opened', handlePopUp);
  bus.on('popup:close', closePopUp);
  bus.on('popup:leafletclosed', closePopUp);
  bus.on('type:size', sizeTextTo);
};

var textPane = document.querySelector('.js-text-area');
var width = textPane.offsetWidth;

/**
 * Emits type resizing events on window resize.
 */
var responsiveType = function () {
  if (width > 785) {
    bus.emit('type:size', 'large');
  } else if (width > 599) {
    bus.emit('type:size', 'medium');
  } else if (width < 600) {
    bus.emit('type:size', 'small');
  }
};

/**
 * Composes an HTML pop-up template that is displayed on feature clicks.
 * This one is for the Street classification layers, where the user wishes
 * to see current classification, and proposed classification.
 *
 * @param {String} The column in the GIS layer that maps to current classification.
 * @param {String} The column in the GIS layer that maps to proposed classification.
 * @returns {String} The rendered HTML string for the popup.
 */

var popupRenderer = function (current, proposed) {
  return function (feature) {
    return "\n      <h5 class=\"flush-top\">\n        " + feature.StreetName + "\n      </h5>\n      <table class=\"lead-bottom lead-top\">\n        <tbody>\n          <tr>\n            <td>Current Classification:</td>\n            <td>" + feature[current] + "</td>\n          </tr>\n          <tr>\n            <td>Proposed Classification:</td>\n            <td>" + feature[proposed] + "</td>\n          </tr>\n        </tbody>\n      </table>\n      <p class=\"flush-bottom\"><b>" + feature[current] + ":</b></p>\n      <p>What does that mean do you thing?</p>\n\n      <p class=\"flush-bottom\"><b>" + feature[proposed] + ":</b></p>\n      <p>What does that mean do you thing?</p>\n\n      <p>Transportation Plan ID: <a href=\"#\">" + feature.TranPlanID + "</a></p>\n    ";
  };
};

// this needs to be named better, and there will be more of them I think.
// this file just maps GIS data layers to their popups, and gives them a reference handle
// so they can be got at by the map app
/**
 * @property {object} designClassifications          - Object for GIS layer
 * @property {number} designClassifications.features - Esri Leaflet Feature Layer
 * @property {string} designClassifications.popup    - Rendered HTML string of desired popup.
 */
var designClassifications = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/20'
  }),
  popup: popupRenderer('Design', 'ProposedDesign')
};

/**
 * @property {object} bicycleClassifications          - Object for GIS layer
 * @property {number} bicycleClassifications.features - Esri Leaflet Feature Layer
 * @property {string} bicycleClassifications.popup    - Rendered HTML string of desired popup.
 */
var bicycleClassifications = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/22'
  }),
  popup: popupRenderer('Bicycle', 'ProposedBicycle')
};

/**
 * @property {object} transitClassifications          - Object for GIS layer
 * @property {number} transitClassifications.features - Esri Leaflet Feature Layer
 * @property {string} transitClassifications.popup    - Rendered HTML string of desired popup.
 */
var transitClassifications = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/1'
  }),
  popup: popupRenderer('Transit', 'ProposedTransit')
};

/**
 * @property {object} trafficClassifications          - Object for GIS layer
 * @property {number} trafficClassifications.features - Esri Leaflet Feature Layer
 * @property {string} trafficClassifications.popup    - Rendered HTML string of desired popup.
 */
var trafficClassifications = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/4'
  }),
  popup: popupRenderer('Traffic', 'ProposedTraffic')
};

/**
 * @property {object} emergencyClassifications          - Object for GIS layer
 * @property {number} emergencyClassifications.features - Esri Leaflet Feature Layer
 * @property {string} emergencyClassifications.popup    - Rendered HTML string of desired popup.
 */
var emergencyClassifications = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/7'
  }),
  popup: popupRenderer('Emergency', 'ProposedEmergency')
};

/**
 * @property {object} pedestrianClassifications          - Object for GIS layer
 * @property {number} pedestrianClassifications.features - Esri Leaflet Feature Layer
 * @property {string} pedestrianClassifications.popup    - Rendered HTML string of desired popup.
 */
var pedestrianClassifications = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/13'
  }),
  popup: popupRenderer('Pedestrian', 'ProposedPedestrian')
};

/**
 * @property {object} pedestrianDistricts          - Object for GIS layer
 * @property {number} pedestrianDistricts.features - Esri Leaflet Feature Layer
 * @property {string} pedestrianDistricts.popup    - Rendered HTML string of desired popup.
 */
var pedestrianDistricts = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/14'
  }),
  popup: popupRenderer('Pedestrian', 'ProposedPedestrian')
};

/**
 * @property {object} freightClassifications          - Object for GIS layer
 * @property {number} freightClassifications.features - Esri Leaflet Feature Layer
 * @property {string} freightClassifications.popup    - Rendered HTML string of desired popup.
 */
var freightClassifications = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/17'
  }),
  popup: popupRenderer('Freight', 'ProposedFreight')
};

/**
 * @property {object} freightDistricts          - Object for GIS layer
 * @property {number} freightDistricts.features - Esri Leaflet Feature Layer
 * @property {string} freightDistricts.popup    - Rendered HTML string of desired popup.
 */
var freightDistricts = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/18'
  }),
  popup: popupRenderer('Freight', 'ProposedFreight')
};

/**
 * @property {object} projectPoints          - Object for GIS layer
 * @property {number} projectPoints.features - Esri Leaflet Feature Layer
 * @property {string} projectPoints.popup    - Rendered HTML string of desired popup.
 */
var projectPoints = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/1',
    pane: 'top'
  }),
  popup: popupRenderer('foo', 'bar')
};

/**
 * @property {object} projectLines          - Object for GIS layer
 * @property {number} projectLines.features - Esri Leaflet Feature Layer
 * @property {string} projectLines.popup    - Rendered HTML string of desired popup.
 */
var projectLines = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/5',
    pane: 'top'
  }),
  popup: popupRenderer('foo', 'bar')
};

/**
 * @property {object} projectPolygons          - Object for GIS layer
 * @property {number} projectPolygons.features - Esri Leaflet Feature Layer
 * @property {string} projectPolygons.popup    - Rendered HTML string of desired popup.
 */
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

// this stuff is statefull.
var map = void 0;
var position = {
  center: [45.528, -122.680],
  zoom: 13
};

/**
 * Interacts with the Esri Leaflet API to draw a map in the dom Node with an id of 'map'
 */

var drawMap = function drawMap() {
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
var createGeocoder = function createGeocoder() {
  map.addControl(window.L.control.zoom({ position: 'topright' }));
  var searchControl = window.L.esri.Geocoding.geosearch({
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
      results.addLayer(window.L.marker(data.results[i].latlng));
    }
  });
};

/**
 * Locates all layer toggle elements currently checked.
 *
 * @returns {NodeList} NodeList of active input elements.
 */

var getActiveLayers = function getActiveLayers() {
  var activeLayers = findElements('.js-layer-toggle').filter(function (toggle) {
    return toggle.checked;
  });
  return activeLayers;
};

/**
 * Locates all layer toggle elements which are not currently checked.
 *
 * @returns {NodeList} NodeList of inactive input elements.
 */
var getInactiveLayers = function getInactiveLayers() {
  var inactiveLayers = findElements('.js-layer-toggle').filter(function (toggle) {
    return !toggle.checked;
  });
  return inactiveLayers;
};

/**
 * Adds a set of layers from './layers.js' to the map.
 *
 * @param {String} Comma seperated string of layer names. eg "projectPoints, projectLines"
 */
var addLayers = function addLayers(layerSet) {
  if (!layerSet) {
    return;
  }
  layerSet.split(',').forEach(function (layer) {
    return addLayer(layer);
  });
};

/**
 * Adds a single of layers from './layers.js' to the map.
 *
 * @param {String} Layer key, eg 'projectPoints'
 */
var addLayer = function addLayer(layer) {
  layers[layer].features.addTo(map);
  bus.emit('layer:reset', layer);
  layers[layer].features.bindPopup(function (evt) {
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
var openPopUp = function openPopUp(evt, layer) {
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
var resetLayerStyle = function resetLayerStyle(layer) {
  layers[layer].features.resetStyle();
};

/**
 * Removes a single of layers from './layers.js' to the map.
 *
 * @param {String} Layer key, eg 'projectPoints'
 */
var removeLayer = function removeLayer(layer) {
  layers[layer].features.removeFrom(map);
  layers[layer].features.unbindPopup();
};

/**
 * Adds any layers indicated as active from the layer toggle list to the map.
 */
var drawLayers = function drawLayers() {
  getActiveLayers().forEach(function (toggle) {
    var layerSet = toggle.getAttribute('data-layers');
    bus.emit('map:layer:add', layerSet);
  });
  getInactiveLayers().forEach(function (toggle) {
    var layerSet = toggle.getAttribute('data-layers');
    bus.emit('map:layer:remove', layerSet);
  });
};

/**
 * Tears down the map from the DOM.
 */
var destroyMap = function destroyMap() {
  if (map) {
    map.remove();
  }
};

/**
 * Destroys and redraws the map.
 */
var redrawMap$1 = function redrawMap$1() {
  bus.emit('map:destroy');
  bus.emit('map:create');
};

/**
 * Binds all side effect listeners, exposes the API, and draws the map
 */
var map$1 = function () {
  bus.on('popup:opened', console.log);
  bus.on('popup:closed', console.log);
  bus.on('map:redraw', redrawMap$1);
  bus.on('map:destroy', destroyMap);
  bus.on('map:create', drawMap);
  bus.on('layers:draw', drawLayers);
  bus.on('map:layer:add', addLayers);
  bus.on('layer:reset', resetLayerStyle);

  bus.emit('map:create');
};

// ┌────────────────┐
// │ Aria Adjusters │
// └────────────────┘
// utilities to help manage aria properties

/**
 * Toggles `aria-hidden` property on DOM nodes.
 *
 * @param {Array} Array of DOM Nodes
 */


/**
 * Adds `aria-hidden` on DOM nodes.
 *
 * @param {Array} Array of DOM Nodes
 */
function hide(array) {
  array.forEach(function (node) {
    if (!node) {
      return;
    }
    node.setAttribute('aria-hidden', true);
  });
}

/**
 * Removes `aria-hidden` on DOM nodes.
 *
 * @param {Array} Array of DOM Nodes
 */
function show(array) {
  array.forEach(function (node) {
    if (!node) {
      return;
    }
    node.removeAttribute('aria-hidden');
  });
}

/**
 * Toggles `aria-expanded` property on a single DOM node.
 *
 * @param {Node} A DOM node.
 */

// ┌───────┐
// │ Modal │
// └───────┘
// show and hide modal dialogues
// Listens to a 'modal:bind' optionally takes a node
// Emits and listens on the 'modal:open' channel. Takes a data-modal attr
// Emits and listens to on the 'modal:close' channel. Optionally takes a data-modal
// Emitting a modal id toggle that modals state.
// Emitting false or null closes all modals.

/**
 * Initializes modal pattern and binds events.
 */
function modal() {
  // Cool nodes
  var toggles = findElements('.js-modal-toggle');
  var modals = findElements('.js-modal');

  // Bus events
  bus.on('modal:open', openModal);
  bus.on('keyboard:escape', closeModal);
  bus.on('modal:close', closeModal);
  bus.on('modal:bind', bindModals);

  /**
   * Find nodes that are effected by opening the modal
   *
   * @returns {Array} Array of DOM Nodes
   */
  function dependentNodes() {
    var nodes = [];
    return nodes;
  }

  /**
   * Opens a modal
   *
   * @param {String} Id of modal to open
   */
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

  /**
   * Closes a modal. If no id passed, closes all modals.
   *
   * @param {String} Id of modal to open
   */
  function closeModal(modalId) {
    if (!modalId) return removeActive(modals);
    var modal = document.querySelector('.js-modal[data-modal="' + modalId + '"]');
    remove(modal, 'is-active');
    modal.setAttribute('tabindex', 0);
    remove$1(document, 'focusin', fenceModal);
    show(dependentNodes());
  }

  /**
   * Binds event listeners on a node: binds all modals if no node is provided
   *
   * @param {Node} Dom node to bind listeners on.
   */
  function bindModals(node) {
    if (!node) {
      toggles.forEach(function (toggle$$1) {
        add$1(toggle$$1, click(), toggleClick);
      });
    } else {
      add$1(node, click(), toggleClick);
    }
  }

  /**
   * Prevents focus from leaving modal component while modal is open.
   *
   * @param {Event} Event
   */
  function fenceModal(e) {
    if (!closest('js-modal', e.target)) {
      modals.forEach(function (modal) {
        if (has(modal, 'is-active')) {
          modal.focus();
        }
      });
    }
  }

  /**
   * Toggles the state of a modal when the modals controller is clicked.
   *
   * @param {Event} Event
   */
  function toggleClick(e) {
    preventDefault(e);
    var modalId = e.target.dataset.modal;
    bus.emit('modal:open', modalId);
  }

  bus.emit('modal:bind');
}

// Cool Helpers
/**
 * Initializes drawer pattern and binds events.
 */
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

  /**
   * Adds the 'is-active' class to the target drawer component.
   * Manages ARIA and tab indexing.
   *
   * @param {Object} Options object: {id: drawer-id}
   */
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

  /**
   * Removes the 'is-active' class to the target drawer component.
   * Manages ARIA and tab indexing.
   * If no drawer is specified, closes all drawers.
   *
   * @param {Object} Options object: {id: string}
   */
  function closeDrawer(options) {
    if (!options) {
      drawers.forEach(function (drawer) {
        drawer.removeAttribute('tabindex');
        remove(drawer, 'is-active');
      });
    } else {
      var drawer = document.querySelector('.js-drawer[data-drawer="' + options.id + '"]');
      drawer.removeAttribute('tabindex');
      remove(drawer, 'is-active');
    }
    remove(wrapper, 'drawer-left-is-active');
    remove(wrapper, 'drawer-right-is-active');
    toggles.forEach(function (toggle$$1) {
      remove(toggle$$1, 'is-active');
    });
    show([wrapper]);
    remove$1(document, 'focusin', fenceDrawer);
    if (lastOn) lastOn.focus();
  }

  /**
   * Prevents focus from leaving drawer component while drawer is open.
   *
   * @param {Event} Event
   */
  function fenceDrawer(e) {
    if (!closest('js-drawer', e.target)) {
      drawers.forEach(function (drawer) {
        if (has(drawer, 'is-active')) {
          drawer.focus();
        }
      });
    }
  }

  /**
   * Adds listeners from drawer toggle buttons for all drawers,
   * or just specified drawer.
   *
   * @param {Object} {node: DOMnode}
   */
  function bindDrawers(options) {
    if (!options) {
      toggles.forEach(function (toggle$$1) {
        add$1(toggle$$1, click(), toggleClick);
      });
    } else {
      add$1(options.node, click(), toggleClick);
    }
  }

  /**
   * Closes drawer when the drawer wrapper is clicked.
   * The drawer wrapper is everything outside the drawer.
   *
   * @param {Event} Event
   */
  function closeClick(e) {
    if (has(e.target, 'js-drawer')) {
      bus.emit('drawer:close');
    }
  }

  /**
   * Toggles the state of a drawer when the drawers controller is clicked.
   *
   * @param {Event} Event
   */
  function toggleClick(e) {
    preventDefault(e);
    var drawerId = e.target.getAttribute('data-drawer');
    add(e.target, 'is-active');
    bus.emit('drawer:open', { id: drawerId });
  }

  bus.emit('drawer:bind');
}

// The JS Checker
// Neat Helpers
// View and Intent
// Cool Components
/**
 * Initializes app and app components.
 */

var initApp = function initApp() {
  // The router controls the application state
  // everything derives from URL
  route();

  // Model, View, Intent
  // Intent and View are the larger, containing component.
  // This app has no model: all data is consumed via GIS API.
  intent();
  view();

  // Components each handle their own MVI loops:
  // This makes them compasble, replaceable, and easier to work on.
  // Easy to maintain, easy to delete!
  responsiveType();
  modal();
  drawer();
  map$1();
};

// This loads the application and makes sure that there IS javascript running on the page.
// If there is no JS available, than the default minimum-viable-app is loaded:
// this app is basically just text on a screen. How nice!
bus.on('has:javascript', initApp);
hasJS();

})));
