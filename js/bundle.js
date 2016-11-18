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

var checkJs = function () {
  var body = document.querySelector('body');
  add(body, 'js-is-active');
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

  var polygons = L.esri.featureLayer({
    url: "https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/6"
  }).addTo(map);
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

checkJs();

findElements('.js-hide-map').map(function (btn) {
  add$1(btn, 'click', hideMap);
});

findElements('.js-hide-text').map(function (btn) {
  add$1(btn, 'click', hideText);
});

function hideMap(e) {
  console.log(e.target);
  e.preventDefault();
  remove(document.querySelector('body'), 'split-screen');
}

function hideText(e) {
  console.log(e.target);
  e.preventDefault();
  remove(document.querySelector('body'), 'split-screen');
  add(document.querySelector('body'), 'map-view');
}

drawDemo();

})));
