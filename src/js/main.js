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

// Cool Components
import modal from './modal.js'

route()
modal()

let textPane = document.querySelector('.js-text-area')
let width =  textPane.offsetWidth

if (width > 785) {
  bus.emit(`type:size`, 'large')
} else if (width > 599) {
  bus.emit(`type:size`, 'medium')
} else if (width < 600) {
  bus.emit(`type:size`, 'small')
}

map.draw()
