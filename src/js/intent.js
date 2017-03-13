import bus from './helpers/bus.js';
import * as dom from './helpers/dom.js';
import * as event from './helpers/event.js';
import scrollMonitor from 'scrollmonitor'; // if you're not using require, you can use the scrollMonitor global.

// ┌──────────────────────────┐
// │ Emit View Toggle Intents │
// └──────────────────────────┘
// emit toggle button clicks

/**
 * Locates layer control input nodes. Binds user input to bus event.
 */
const bindLayerToggles = () => {
  dom.findElements('.js-layer-toggle').forEach((btn) => {
    event.add(btn, 'click', toggleLayer);
  });
  function toggleLayer (e) {
    bus.emit('layers:draw');
  }
};

/**
 * Locates layer panel controller. Binds user input to bus event.
 */
const bindLayerControllers = () => {
  dom.findElements('.js-layer-control').forEach((btn) => {
    event.add(btn, 'click', toggleControl);
  });
  function toggleControl (e) {
    e.preventDefault();
    bus.emit('layer:control');
  }
};

/**
 * Locates app view controller. Binds user input to bus event.
 */
const bindViewController = () => {
  dom.findElements('.js-view-control').forEach((btn) => {
    event.add(btn, 'click', translateView);
  });
  function translateView (e) {
    e.preventDefault();
    let panel = e.target.getAttribute('data-panel');
    bus.emit(`set:view`, panel);
  }
};

/**
 * Locates pop up closing buttons. Binds user input to bus event.
 */
const bindPopUpClosers = () => {
  dom.findElements('.js-close-popup').forEach((btn) => {
    event.add(btn, 'click', closePopUp);
  });
  function closePopUp (e) {
    e.preventDefault();
    bus.emit('popup:close');
  }
};

// ┌──────────────────────┐
// │ Emit Keyboard Events │
// └──────────────────────┘
// emit presses of escape and return keys
// this would be 'bind:keyup'

/**
 * Adds listenrs to keyup, binds interesting keyups to bus events.
 */
const bindKeyup = () => {
  event.add(document, 'keyup', translateKeypress);
  function translateKeypress (e) {
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
};

/**
 * Binds scroll monitor module and emits events when event things happen
 */
const bindScrollWatcher = () => {
  let myElement = document.getElementById("itemToWatch");
  const watcher = scrollMonitor.create(myElement);
  watcher.enterViewport(function() {
    console.log( 'I have entered the viewport' );
  });
  watcher.exitViewport(function() {
    console.log( 'I have left the viewport' );
  });
}

/**
 * Emits type resizing events on window resize.
 */
const bindWindowResize = () => {
  window.onresize = didResize;
  let textPane = document.querySelector('.js-text-area');
  function didResize () {
    let width = textPane.offsetWidth;
    if (width > 785) {
      bus.emit(`type:size`, 'large');
    } else if (width > 599) {
      bus.emit(`type:size`, 'medium');
    } else if (width < 600) {
      bus.emit(`type:size`, 'small');
    }
  }
};

/**
 * Emits events for binding intent controllers.
 */
const bindIntents = () => {
  bus.emit('bind:layer:toggles');
  bus.emit('bind:layer:controllers');
  bus.emit('bind:view:controller');
  bus.emit('bind:scroll:watcher');
  bus.emit('bind:popup:closers');
  bus.emit('bind:keyup');
  bus.emit('bind:window:resize');
};

/**
 * Sets listeners for binding intents on bus events.
 * Emits event to bind all intent listeners.
 */
export default function () {
  bus.on('bind:layer:toggles', bindLayerToggles);
  bus.on('bind:layer:controllers', bindLayerControllers);
  bus.on('bind:scroll:watcher', bindScrollWatcher);
  bus.on('bind:view:controller', bindViewController);
  bus.on('bind:popup:closers', bindPopUpClosers);
  bus.on('bind:keyup', bindKeyup);
  bus.on('bind:window:resize', bindWindowResize);
  bus.on('bind:intent', bindIntents);

  bus.emit('bind:intent');
}
