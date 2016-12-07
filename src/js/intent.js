import bus from './helpers/bus.js'
import * as classy from './helpers/classy.js'
import * as dom from './helpers/dom.js'
import * as event from './helpers/event.js'

// ┌──────────────────────────┐
// │ Emit View Toggle Intents │
// └──────────────────────────┘
// emit toggle button clicks

dom.findElements('.js-layer-toggle').map(function (btn) {
  event.add(btn, 'click', toggleLayer)
})
function toggleLayer (e) {
  let layer = e.target.getAttribute('data-layer')
  bus.emit('layer:toggle', layer)
}

dom.findElements('.js-layer-control').map(function (btn) {
  event.add(btn, 'click', toggleControl)
})
function toggleControl (e) {
  e.preventDefault()
  bus.emit('layer:control')
}

dom.findElements('.js-pane-toggle').map(function (btn) {
  event.add(btn, 'click', togglePane)
})
function togglePane (e) {
  e.preventDefault()
  let pane = e.target.getAttribute('data-pane')
  bus.emit('pane:toggle', pane)
}

// ┌─────────────────────────┐
// │ Emit Nav Control Events │
// └─────────────────────────┘
// Search and Table of contents.

// ┌──────────────────────┐
// │ Emit Keyboard Events │
// └──────────────────────┘
// emit presses of escape and return keys
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

// ┌────────────────────┐
// │ Emit Scroll Events │
// └────────────────────┘
// throttled for performance
event.add(window, 'scroll', event.throttle(isScrolling, 100));
function isScrolling () {
  bus.emit('scrolling:at', window.pageYOffset);
}
