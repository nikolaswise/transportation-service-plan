import checkJs from './js-checker.js';
import * as map from './map.js';
import * as classy from './helpers/classy.js'
import * as dom from './helpers/dom.js'
import * as event from './helpers/event.js'

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

map.drawDemo();
