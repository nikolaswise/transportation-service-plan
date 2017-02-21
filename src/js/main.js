import route from './routing.js';

import * as map from './map/map.js';
import bus from './helpers/bus.js';

// View and Intent
import intent from './intent.js';
import view from './view.js';

// Cool Components
import modal from './modal.js';
import drawer from './drawers.js';

// if intent and views are not a single function
// do this still need to get called?
// the base function could just set the bus listners.
intent();
view();

// same as these suckers do
route();
modal();
drawer();


// this needs to happen in a slightly different way I think...
let textPane = document.querySelector('.js-text-area');
let width = textPane.offsetWidth;

if (width > 785) {
  bus.emit(`type:size`, 'large');
} else if (width > 599) {
  bus.emit(`type:size`, 'medium');
} else if (width < 600) {
  bus.emit(`type:size`, 'small');
}

map.draw();
