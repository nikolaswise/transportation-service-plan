import bus from './helpers/bus.js'
import * as classy from './helpers/classy.js'
import * as dom from './helpers/dom.js'
import * as event from './helpers/event.js'

// ┌──────────────────────────┐
// │ Emit View Toggle Intents │
// └──────────────────────────┘
// emit toggle button clicks
dom.findElements('.js-hide-map').map(function (btn) {
  event.add(btn, 'click', hideMap)
})
function hideMap (e) {
  e.preventDefault()
  bus.emit('map:hide')
}

dom.findElements('.js-show-map').map(function (btn) {
  event.add(btn, 'click', showMap)
})
function showMap (e) {
  e.preventDefault()
  bus.emit('map:show')
}

dom.findElements('.js-hide-text').map(function (btn) {
  event.add(btn, 'click', hideText)
})
function hideText (e) {
  e.preventDefault()
  bus.emit('text:hide')
}

dom.findElements('.js-show-text').map(function (btn) {
  event.add(btn, 'click', showText)
})
function showText (e) {
  e.preventDefault()
  bus.emit('text:show')
}

dom.findElements('.js-layer-control').map(function (btn) {
  event.add(btn, 'click', toggleControl)
})
function toggleControl (e) {
  let layer = e.target.getAttribute('data-layer')
  bus.emit('layer:toggle', layer)
}

// ┌─────────────────────────┐
// │ Emit Nav Control Events │
// └─────────────────────────┘
// Search and Table of contents.
dom.findElements('.js-open-search').map(function (btn) {
  event.add(btn, 'click', openSearch)
})
function openSearch () {
  bus.emit('search:open')
}

dom.findElements('.js-close-search').map(function (btn) {
  event.add(btn, 'click', closeSearch)
})
function closeSearch () {
  bus.emit('search:close')
}

dom.findElements('.js-open-contents').map(function (btn) {
  event.add(btn, 'click', opencontents)
})
function opencontents () {
  bus.emit('contents:open')
}

dom.findElements('.js-close-contents').map(function (btn) {
  event.add(btn, 'click', closecontents)
})
function closecontents () {
  bus.emit('contents:close')
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
event.add(window, 'scroll', event.throttle(isScrolling, 100));
function isScrolling () {
  bus.emit('scrolling:at', window.pageYOffset);
}
