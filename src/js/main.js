// The JS Checker
import hasJS from './js-checker';

// Neat Helpers
import route from './routing.js';
import bus from './helpers/bus.js';

// View and Intent
import intent from './intent.js';
import view from './view.js';

// Cool Components
import responsiveType from './responsive-type.js';
import map from './map/map.js';
import modal from './modal.js';
import drawer from './drawers.js';
import search from './search.js';

/**
 * Initializes app and app components.
 */

const initApp = () => {
  // Model, View, Intent
  // Intent and View are the larger, containing component.
  // This app has no model: all data is consumed via GIS API.
  view();
  intent();

  // The router controls the application state
  // everything derives from URL
  route();

  // Components each handle their own MVI loops:
  // This makes them compasble, replaceable, and easier to work on.
  // Easy to maintain, easy to delete!
  modal();
  drawer();
  map();
  search();
};

// This loads the application and makes sure that there IS javascript running on the page.
// If there is no JS available, than the default minimum-viable-app is loaded:
// this app is basically just text on a screen. How nice!
bus.on('has:javascript', initApp);
hasJS();
