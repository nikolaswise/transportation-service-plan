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
  bus.emit('layer:toggle', {
    layerId: layer,
    checked: e.target.checked
  })
}

dom.findElements('.js-layer-control').map(function (btn) {
  event.add(btn, 'click', toggleControl)
})
function toggleControl (e) {
  e.preventDefault()
  bus.emit('layer:control')
}

dom.findElements('.js-view-control').map(function (btn) {
  event.add(btn, 'click', translateView)
})
function translateView (e) {
  e.preventDefault()
  let panel = e.target.getAttribute('data-panel')
  bus.emit(`set:view`, panel)
}

dom.findElements('.js-close-popup').map(function (btn) {
  console.log(btn)
  event.add(btn, 'click', closePopUp)
})
function closePopUp (e) {
  console.log('close plz')
  e.preventDefault()
  bus.emit('popup:close');
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

// ┌────────────────────┐
// │ Emit Scroll Events │
// └────────────────────┘
// throttled for performance
// event.add(window, 'scroll', event.throttle(isScrolling, 100));
// function isScrolling () {
//   bus.emit('scrolling:at', window.pageYOffset);
// }

window.onresize = didResize;
let textPane = document.querySelector('.js-text-area')
function didResize () {
  let width =  textPane.offsetWidth
  if (width > 785) {
    bus.emit(`type:size`, 'large')
  } else if (width > 599) {
    bus.emit(`type:size`, 'medium')
  } else if (width < 600) {
    bus.emit(`type:size`, 'small')
  }
}

