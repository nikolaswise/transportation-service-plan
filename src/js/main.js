import checkJs from './js-checker.js';
import route from './routing.js';

import * as map from './map.js';
import * as classy from './helpers/classy.js'
import * as dom from './helpers/dom.js'
import * as event from './helpers/event.js'
import bus from './helpers/bus.js'

bus.on('map:draw', map.draw)
bus.on('map:remove', map.remove)
bus.on('map:redraw', map.redraw)

import intent from './intent.js'
import view from './view.js'
import sticky from './sticky-navigation.js'

checkJs()
route()
sticky()

window.onload = function() {
  let body = document.querySelector('body')
  classy.remove(body, 'preload')
  window.bus = bus
};

