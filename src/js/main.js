import checkJs from './js-checker.js';
import route from './routing.js';

import * as map from './map/map.js';
import * as classy from './helpers/classy.js'
import * as dom from './helpers/dom.js'
import * as event from './helpers/event.js'
import bus from './helpers/bus.js'

// View and Intent
import intent from './intent.js'
import view from './view.js'

route()

bus.on('map:redraw', redrawMap)
function redrawMap () {
  map.redraw()
}

bus.on('layer:toggle', handleLayerToggle)
function handleLayerToggle (layer) {
  map.toggleLayer(layer)
}

let html = document.querySelector('html')

bus.on('type:large', logLarge)
function logLarge () {
  if (!classy.has(html, 'type-large')) {
    classy.remove(html, 'type-medium')
    classy.remove(html, 'type-small')
    classy.add(html, 'type-large')
  }
}
bus.on('type:medium', logMedium)
function logMedium () {
  if (!classy.has(html, 'type-medium')) {
    classy.remove(html, 'type-large')
    classy.remove(html, 'type-small')
    classy.add(html, 'type-medium')
  }
}
bus.on('type:small', logSmall)
function logSmall () {
  if (!classy.has(html, 'type-small')) {
    classy.remove(html, 'type-medium')
    classy.remove(html, 'type-large')
    classy.add(html, 'type-small')
  }
}

let textPane = document.querySelector('.js-text-area')
bus.emit('resize:textPane', textPane.offsetWidth);

map.draw()

