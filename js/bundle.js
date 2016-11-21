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
  bus.emit('map:show');
  bus.emit('text:show');
  return true;
};

function drawDemo() {
  var map = L.map('map', {
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
  var points = L.esri.featureLayer({
    url: "https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/1"
  }).addTo(map);
  var lines = L.esri.featureLayer({
    url: "https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/5"
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

// ┌──────────────────────────┐
// │ Emit View Toggle Intents │
// └──────────────────────────┘
// emit toggle button clicks
findElements('.js-hide-map').map(function (btn) {
  add$1(btn, 'click', hideMap);
});
function hideMap() {
  bus.emit('map:hide');
}

findElements('.js-show-map').map(function (btn) {
  add$1(btn, 'click', showMap);
});
function showMap() {
  bus.emit('map:show');
}

findElements('.js-hide-text').map(function (btn) {
  add$1(btn, 'click', hideText);
});
function hideText() {
  bus.emit('text:hide');
}

findElements('.js-show-text').map(function (btn) {
  add$1(btn, 'click', showText);
});
function showText() {
  bus.emit('text:show');
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

bus.on('map:hide', logMapHide);
bus.on('map:show', logMapShow);
bus.on('text:hide', logTextHide);
bus.on('text:show', logTextShow);
bus.on('search:open', searchOpen);
bus.on('search:close', searchClose);
bus.on('contents:open', contentsOpen);
bus.on('contents:close', contentsClose);

function logMapHide() {
  console.log('map:hide');
  var html = document.querySelector('html');
  remove(html, 'map-is-active');
}
function logMapShow() {
  console.log('map:show');
  var html = document.querySelector('html');
  add(html, 'map-is-active');
}
function logTextHide() {
  console.log('text:hide');
  var html = document.querySelector('html');
  remove(html, 'text-is-active');
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

checkJs();

drawDemo();

})));
