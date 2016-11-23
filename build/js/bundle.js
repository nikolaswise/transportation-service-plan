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

var checkJs = function () {
  bus.emit('has:javascript');
  return true;
};

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
  var url = document.location.pathname + '/';
  url = url.replace('//', '/');
  var home = match('/').parse(url);
  var view = match('/:mode/').parse(url);

  console.log(url);

  if (home) {
    console.log('default');
    bus.emit('map:show');
    bus.emit('text:show');
  }
  if (view) {
    console.log(view);
    if (view.mode === 'map') {
      bus.emit('map:show');
      bus.emit('text:hide');
    }
    if (view.mode === 'text') {
      bus.emit('text:show');
      bus.emit('map:hide');
    }
  }
}

var map = void 0;

function draw() {
  console.log('draw map');
  map = L.map('map', {
    center: [45.528, -122.680],
    zoom: 13,
    zoomControl: false
  });

  map.addControl(L.control.zoom({ position: 'topright' }));

  L.esri.tiledMapLayer({
    url: "https://www.portlandmaps.com/arcgis/rest/services/Public/Basemap_Color_Complete/MapServer"
  }).addTo(map);

  // var polygons = L.esri.featureLayer({
  //   url: "https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/6",
  // }).addTo(map);
  // var points = L.esri.featureLayer({
  //   url: "https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/1",
  // }).addTo(map);
  // var lines = L.esri.featureLayer({
  //   url: "https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/5",
  // }).addTo(map);

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
findElements('.js-hide-map').map(function (btn) {
  add$1(btn, 'click', hideMap);
});
function hideMap(e) {
  e.preventDefault();
  bus.emit('map:hide');
}

findElements('.js-show-map').map(function (btn) {
  add$1(btn, 'click', showMap);
});
function showMap(e) {
  e.preventDefault();
  bus.emit('map:show');
}

findElements('.js-hide-text').map(function (btn) {
  add$1(btn, 'click', hideText);
});
function hideText(e) {
  e.preventDefault();
  bus.emit('text:hide');
}

findElements('.js-show-text').map(function (btn) {
  add$1(btn, 'click', showText);
});
function showText(e) {
  e.preventDefault();
  bus.emit('text:show');
}

findElements('.js-layer-control').map(function (btn) {
  add$1(btn, 'click', toggleControl);
});
function toggleControl(e) {
  var layer = e.target.getAttribute('data-layer');
  bus.emit('layer:toggle', layer);
}

// ┌─────────────────────────┐
// │ Emit Nav Control Events │
// └─────────────────────────┘
// Search and Table of contents.
findElements('.js-open-search').map(function (btn) {
  add$1(btn, 'click', openSearch);
});
function openSearch() {
  bus.emit('search:open');
}

findElements('.js-close-search').map(function (btn) {
  add$1(btn, 'click', closeSearch);
});
function closeSearch() {
  bus.emit('search:close');
}

findElements('.js-open-contents').map(function (btn) {
  add$1(btn, 'click', opencontents);
});
function opencontents() {
  bus.emit('contents:open');
}

findElements('.js-close-contents').map(function (btn) {
  add$1(btn, 'click', closecontents);
});
function closecontents() {
  bus.emit('contents:close');
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
add$1(window, 'scroll', throttle(isScrolling, 100));
function isScrolling() {
  bus.emit('scrolling:at', window.pageYOffset);
}

bus.on('map:hide', logMapHide);
bus.on('map:show', logMapShow);
bus.on('text:hide', logTextHide);
bus.on('text:show', logTextShow);
bus.on('search:open', searchOpen);
bus.on('search:close', searchClose);
bus.on('contents:open', contentsOpen);
bus.on('contents:close', contentsClose);

bus.on('layer:toggle', handleLayerToggle);

function handleLayerToggle(layer) {
  console.log('toggle layer ' + layer + ' plz');
}

function logMapHide() {
  console.log('map:hide');
  var html = document.querySelector('html');
  remove(html, 'map-is-active');
  bus.emit('map:remove');
}
function logMapShow() {
  console.log('map:show');
  var html = document.querySelector('html');
  add(html, 'map-is-active');
  bus.emit('map:draw');
}
function logTextHide() {
  console.log('text:hide');
  var html = document.querySelector('html');
  remove(html, 'text-is-active');
  bus.emit('map:remove');
  window.setTimeout(resizeMap, 300);
}

function resizeMap() {
  bus.emit('map:draw');
}

function logTextShow() {
  console.log('text:show');
  var html = document.querySelector('html');
  add(html, 'text-is-active');
}

function searchOpen() {
  console.log('search:open');
}
function searchClose() {
  console.log('search:close');
}
function contentsOpen() {
  console.log('contents:open');
}
function contentsClose() {
  console.log('contents:close');
}

// Cool Helpers
// ┌────────┐
// │ Sticky │
// └────────┘
// sticks things to the window

function sticky() {
  bus.on('scrolling:at', scrollHandler);
  bus.on('sticky:stick', stickItem);
  bus.on('sticky:unstick', unstickItem);

  var elements = findElements('.js-sticky');
  var stickies = elements.map(function (el) {
    var offset = el.offsetTop;
    var dataTop = el.getAttribute('data-top') || 0;
    el.style.top = dataTop + 'px';
    var hasId = el.getAttribute('data-sticky-id');
    if (!hasId) createShim(el);
    return {
      top: offset - parseInt(dataTop, 0),
      element: el
    };
  });

  function createShim(el) {
    var guid = 'sticky-navigation';
    el.setAttribute('data-sticky-id', guid);
    var parent = el.parentNode;
    var shim = el.cloneNode('deep');
    add(shim, 'js-shim');
    remove(shim, 'js-sticky');
    shim.setAttribute('data-sticky-id', guid);
    shim.style.visibility = 'hidden';
    shim.style.display = 'none';
    parent.insertBefore(shim, el);
  }

  function stickItem(item) {
    var id = item.element.getAttribute('data-sticky-id');
    var shim = document.querySelector('.js-shim[data-sticky-id="' + id + '"]');
    if (id && shim) {
      add(item.element, 'is-sticky');
      shim.style.display = '';
    }
  }

  function unstickItem(item) {
    var id = item.element.getAttribute('data-sticky-id');
    var shim = document.querySelector('.js-shim[data-sticky-id="' + id + '"]');
    if (id && shim) {
      remove(item.element, 'is-sticky');
      shim.style.display = 'none';
    }
  }

  function scrollHandler(pageYOffset) {
    stickies.forEach(function (item) {
      var referenceElement = item.element;
      if (has(item.element, 'is-sticky')) {
        var id = item.element.getAttribute('data-sticky-id');
        referenceElement = document.querySelector('.js-shim[data-sticky-id="' + id + '"]');
      }

      if (referenceElement) {
        var dataTop = referenceElement.getAttribute('data-top') || 0;
        item.top = referenceElement.offsetTop - parseInt(dataTop, 0);
      }

      if (item.top < pageYOffset) {
        bus.emit('sticky:stick', item);
      } else {
        bus.emit('sticky:unstick', item);
      }
    });
  }
}

bus.on('map:draw', draw);
bus.on('map:remove', remove$1);
bus.on('map:redraw', redraw);

checkJs();
route();
sticky();

window.onload = function () {
  var body = document.querySelector('body');
  remove(body, 'preload');
  window.bus = bus;
};

})));
