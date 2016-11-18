import checkJs from './js-checker.js';
import * as map from './map.js';
import * as classy from './helpers/classy.js'
import * as dom from './helpers/dom.js'
import * as event from './helpers/event.js'
import bus from './helpers/bus.js'

checkJs()

dom.findElements('.js-hide-map').map(function (btn) {
  event.add(btn, 'click', hideMap)
})

dom.findElements('.js-hide-text').map(function (btn) {
  event.add(btn, 'click', hideText)
})

function hideMap (e) {
  console.log(e.target)
  e.preventDefault()
  classy.remove(document.querySelector('body'), 'split-screen')
}

function hideText (e) {
  console.log(e.target)
  e.preventDefault()
  classy.remove(document.querySelector('body'), 'split-screen')
  classy.add(document.querySelector('body'), 'map-view')
}

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

bus.on('keyboard:escape', pingEscape)

function pingEscape () {
  console.log('esc hit')
}

map.drawDemo();
