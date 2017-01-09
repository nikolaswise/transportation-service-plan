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
import sticky from './sticky-navigation.js'
import modal from './modal.js'
import runningHead from './running-head.js'
import renderTable from './table.js'

route()
modal()

map.draw()