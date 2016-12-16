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
// route()

// bus.on('map:redraw', redrawMap)
// function redrawMap () {
//   map.redraw()
// }

// bus.on('layer:toggle', handleLayerToggle)
// function handleLayerToggle (layer) {
//   map.toggleLayer(layer)
// }

// let html = document.querySelector('html')

// bus.on('type:large', logLarge)
// function logLarge () {
//   if (!classy.has(html, 'type-large')) {
//     classy.remove(html, 'type-medium')
//     classy.remove(html, 'type-small')
//     classy.add(html, 'type-large')
//   }
// }
// bus.on('type:medium', logMedium)
// function logMedium () {
//   if (!classy.has(html, 'type-medium')) {
//     classy.remove(html, 'type-large')
//     classy.remove(html, 'type-small')
//     classy.add(html, 'type-medium')
//   }
// }
// bus.on('type:small', logSmall)
// function logSmall () {
//   if (!classy.has(html, 'type-small')) {
//     classy.remove(html, 'type-medium')
//     classy.remove(html, 'type-large')
//     classy.add(html, 'type-small')
//   }
// }

// let textPane = document.querySelector('.js-text-area')
// bus.emit('resize:textPane', textPane.offsetWidth);

// sticky()
// map.draw()

let viewControlButtons = document.querySelectorAll('.js-view-control')
dom.nodeListToArray(viewControlButtons).forEach(function (btn) {
  event.add(btn, 'click', translateView)
})
function translateView (e) {
  e.preventDefault()
  let panel = e.target.getAttribute('data-panel')
  bus.emit(`set:view`, panel)
}

bus.on('set:view', setToPanel)

let panelContainer = document.querySelector('.js-panels')

function setToPanel (panel) {
  if (classy.has(panelContainer, `text-is-active`)) {
    classy.remove(panelContainer, `text-is-active`)
  }
  if (classy.has(panelContainer, `map-is-active`)) {
    classy.remove(panelContainer, `map-is-active`)
  }
  if (classy.has(panelContainer, `split-is-active`)) {
    classy.remove(panelContainer, `split-is-active`)
  }
  classy.add(panelContainer, `${panel}-is-active`)
}

let textControlButtons = document.querySelectorAll('.js-text-control')
dom.nodeListToArray(textControlButtons).forEach(function (btn) {
  event.add(btn, 'click', sizeText)
})
function sizeText (e) {
  e.preventDefault()
  let size = e.target.getAttribute('data-size')
  bus.emit(`type:size`, size)
}


bus.on('type:size', sizeTextTo)

let html = document.querySelector('html')

function sizeTextTo (size) {
  if (classy.has(html, `type-small`)) {
    classy.remove(html, `type-small`)
  }
  if (classy.has(html, `type-medium`)) {
    classy.remove(html, `type-medium`)
  }
  if (classy.has(html, `type-large`)) {
    classy.remove(html, `type-large`)
  }
  classy.add(html, `type-${size}`)
}

bus.emit(`set:view`, 'split')

