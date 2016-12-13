(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (factory());
}(this, (function () { 'use strict';

// ┌─────┐
// │ DOM │
// └─────┘
// Handles dom nodes

// returns closest element up the DOM tree matching a given class


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

var routeMatcher$1 = Object.freeze({
	routeMatcher: routeMatcher
});

console.log(routeMatcher$1);
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

  if (home && width > 800) {
    console.log('default');
    bus.emit('pane:set', 'split');
  } else if (view.mode === 'map') {
    bus.emit('pane:set', 'map');
  } else if (view.mode === 'text') {
    bus.emit('pane:set', 'text');
  } else {
    bus.emit('pane:set', 'split');
  }
}

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};









var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};











var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};



var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

function getScale() {
  var map = this.map;
  var centerLatLng = map.getCenter(); // get map center

  var pointC = map.latLngToContainerPoint(centerLatLng); // convert to containerpoint (pixels)
  var pointX = [pointC.x + 1, pointC.y]; // add one pixel to x
  var pointY = [pointC.x, pointC.y + 1]; // add one pixel to y

  // convert containerpoints to latlng's
  var latLngC = map.containerPointToLatLng(pointC);
  var latLngX = map.containerPointToLatLng(pointX);
  var latLngY = map.containerPointToLatLng(pointY);

  var distanceX = latLngC.distanceTo(latLngX); // calculate distance between c and x (latitude)
  var distanceY = latLngC.distanceTo(latLngY); // calculate distance between c and y (longitude)

  var times = [distanceX, distanceY];

  var sum = times.reduce(function (distanceX, distanceY) {
    return distanceX + distanceY;
  });
  var avg = sum / times.length;

  var meters = avg; // meters per meter : 1
  var kilometer = avg / 1000; // meters per kilometer : 1000
  var feet = avg * 3.2804; // feet per meter : 3.2804
  var mile = feet / 5280; // feet per mile : 5280
  var nauticalMile = avg / 1852; // meters per nautical mile

  var scale = {
    'pixelTo': {
      'meters': meters.toFixed(3),
      'kilometer': kilometer.toFixed(3),
      'feet': feet.toFixed(3),
      'mile': mile.toFixed(3),
      'nauticalMile': nauticalMile.toFixed(3)
    },
    'pixelFrom': {
      'meter': 1 / meters,
      'kilometer': 1 / kilometer,
      'halfKilometer': 0.5 / kilometer,
      'quarterKilometer': 0.25 / kilometer,
      'eigthKilometer': 0.125 / kilometer,
      'feet': 1 / feet,
      'mile': 1 / mile,
      'halfMile': 0.5 / mile,
      'quarterMile': 0.25 / mile,
      'eigthMile': 0.125 / mile,
      'nauticalMile': 1 / nauticalMile
    }
  };
  return scale;
}

function custom(element, template) {
  var _this = this;

  console.log('' + element);

  var render = function render() {
    var scale = _this.getScale();
    console.log(scale);
  };

  this.map.whenReady(function () {
    render();
  });
  this.map.on('zoomend', function () {
    render();
  });
}

var Scalebar = function (_L$control$scale) {
  inherits(Scalebar, _L$control$scale);

  function Scalebar(map, fn) {
    classCallCheck(this, Scalebar);

    var _this2 = possibleConstructorReturn(this, (Scalebar.__proto__ || Object.getPrototypeOf(Scalebar)).call(this));

    _this2.map = map;
    _this2.fn = fn ? fn : false;
    _this2.getScale = getScale;
    _this2.custom = custom;
    console.log(_this2.fn);
    console.log('this is', _this2);
    return _this2;
  }

  return Scalebar;
}(L.control.scale);

var streets$1 = L.esri.featureLayer({
  url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/20'
});

var urbanThroughway = L.esri.featureLayer({
  url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/20',
  where: "ProposedDesign = 'UT'"
});

var urbanHighway = L.esri.featureLayer({
  url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/20',
  where: "ProposedDesign = 'UH'"
});
var industrialRoad = L.esri.featureLayer({
  url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/20',
  where: "ProposedDesign = 'IR'"
});
var civicMainSteet = L.esri.featureLayer({
  url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/20',
  where: "ProposedDesign = 'CIMS'"
});
var neighborhoodMainStreet = L.esri.featureLayer({
  url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/20',
  where: "ProposedDesign='NMS'"
});
var civicCorridor = L.esri.featureLayer({
  url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/20',
  where: "ProposedDesign = 'CIC'"
});
var neighborhoodCorridor = L.esri.featureLayer({
  url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/20',
  where: "ProposedDesign = 'NC'"
});
var regionalCorridor = L.esri.featureLayer({
  url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/20',
  where: "ProposedDesign = 'RC'"
});
var communityCorridor = L.esri.featureLayer({
  url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/20',
  where: "ProposedDesign = 'CC'"
});

var layers = Object.freeze({
	streets: streets$1,
	urbanThroughway: urbanThroughway,
	urbanHighway: urbanHighway,
	industrialRoad: industrialRoad,
	civicMainSteet: civicMainSteet,
	neighborhoodMainStreet: neighborhoodMainStreet,
	civicCorridor: civicCorridor,
	neighborhoodCorridor: neighborhoodCorridor,
	regionalCorridor: regionalCorridor,
	communityCorridor: communityCorridor
});

var map = void 0;

var streets$$1 = L.esri.featureLayer({
  url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/20'
});

function draw() {
  console.log('draw map');
  map = L.map('map', {
    center: [45.528, -122.680],
    zoom: 13,
    zoomControl: false
  });

  map.addControl(L.control.zoom({ position: 'topright' }));

  // Scale bar
  var scalebar = new Scalebar(map);
  scalebar.custom('scalebar-miles');

  L.esri.tiledMapLayer({
    url: "https://www.portlandmaps.com/arcgis/rest/services/Public/Basemap_Color_Complete/MapServer"
  }).addTo(map);

  var searchControl = L.esri.Geocoding.geosearch({
    position: 'topright',
    url: 'https://www.portlandmaps.com/api/agslocator/'
  }).addTo(map);

  var results = L.layerGroup().addTo(map);

  searchControl.on('results', function (data) {
    results.clearLayers();
    for (var i = data.results.length - 1; i >= 0; i--) {
      results.addLayer(L.marker(data.results[i].latlng));
    }
  });
}

function toggleLayer(layer) {
  if (layer.checked) {
    layers[layer.layerId].addTo(map);
  } else {
    layers[layer.layerId].removeFrom(map);
  }
}

function remove$1() {
  console.log('remove map', map);
  if (map) {
    map.remove();
  }
}

function redraw() {
  remove$1();
  draw();
}

// ┌──────────────────────┐
// │ DOM Event Management │
// └──────────────────────┘

// returns standard interaction event, later will add touch support


// add a callback function to an event on a DOM node
function add$1(domNode, e, fn) {
  if (domNode.addEventListener) {
    return domNode.addEventListener(e, fn, false);
  } else if (domNode.attachEvent) {
    return domNode.attachEvent('on' + e, fn);
  }
}

// remove a specific function binding from a DOM node event


// get the target element of an event


// prevent default behavior of an event


// stop and event from bubbling up the DOM tree


// return a function that will only execute
// once it is NOT called for delay milliseconds
function throttle(fn, time, context) {
  var lock, args, wrapperFn, later;

  later = function later() {
    // reset lock and call if queued
    lock = false;
    if (args) {
      wrapperFn.apply(context, args);
      args = false;
    }
  };

  wrapperFn = function wrapperFn() {
    if (lock) {
      // called too soon, queue to call later
      args = arguments;
    } else {
      // call and lock until later
      fn.apply(context, arguments);
      setTimeout(later, time);
      lock = true;
    }
  };

  return wrapperFn;
}

// ┌──────────────────────────┐
// │ Emit View Toggle Intents │
// └──────────────────────────┘
// emit toggle button clicks

findElements('.js-layer-toggle').map(function (btn) {
  add$1(btn, 'click', toggleLayer$1);
});
function toggleLayer$1(e) {
  var layer = e.target.getAttribute('data-layer');
  bus.emit('layer:toggle', {
    layerId: layer,
    checked: e.target.checked
  });
}

findElements('.js-layer-control').map(function (btn) {
  add$1(btn, 'click', toggleControl);
});
function toggleControl(e) {
  e.preventDefault();
  bus.emit('layer:control');
}

findElements('.js-pane-toggle').map(function (btn) {
  add$1(btn, 'click', togglePane);
});
function togglePane(e) {
  e.preventDefault();
  var pane = e.target.getAttribute('data-pane');
  bus.emit('pane:toggle', pane);
}

// ┌─────────────────────────┐
// │ Emit Nav Control Events │
// └─────────────────────────┘
// Search and Table of contents.

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
add$1(window, 'scroll', throttle(isScrolling, 100));
function isScrolling() {
  bus.emit('scrolling:at', window.pageYOffset);
}

window.onresize = didResize;
function didResize() {
  console.log(window.innerWidth);
  bus.emit('resize:width', window.innerWidth);
}

bus.on('pane:toggle', togglePane$1);
bus.on('pane:set', setPane);
bus.on('layer:control', handleControlToggle);
bus.on('resize:width', checkWidth);

var body = document.querySelector('body');

function checkWidth(width) {
  if (width < 800) {
    if (has(body, 'split-view')) {
      bus.emit('pane:set', 'text');
    }
  } else if (width > 800) {
    if (has(body, 'text-view')) {
      console.log('back??');
      bus.emit('pane:set', 'split');
    }
  }
}

function handleControlToggle() {
  var controlPanel = document.querySelector('.js-layer-control-panel');
  toggle(controlPanel, 'is-active');
}

function togglePane$1(pane) {
  if (has(body, 'split-view')) {
    remove(body, 'split-view');
    add(body, pane + '-view');
  } else if (has(body, pane + '-view')) {
    add(body, 'split-view');
    remove(body, pane + '-view');
  } else {
    remove(body, 'map-view');
    remove(body, 'text-view');
    add(body, 'split-view');
  }
  window.setTimeout(emitRedraw, 300);
}

function setPane(pane) {
  if (has(body, 'map-view')) {
    remove(body, 'map-view');
  }
  if (has(body, 'text-view')) {
    remove(body, 'text-view');
  }
  if (has(body, 'split-view')) {
    remove(body, 'split-view');
  }
  console.log('set to ' + pane);
  add(body, pane + '-view');
}

function emitRedraw() {
  bus.emit('map:redraw');
}

// View and Intent
route();

bus.on('map:redraw', redrawMap);
function redrawMap() {
  redraw();
}

bus.on('layer:toggle', handleLayerToggle);
function handleLayerToggle(layer) {
  toggleLayer(layer);
}

draw();

})));
