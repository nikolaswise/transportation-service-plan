import bus from './helpers/bus.js'
import * as classy from './helpers/classy.js'
import * as dom from './helpers/dom.js'
import { toggleLayer as toggleLayer } from './map/map.js'

bus.on('set:view', setToPanel)
bus.on('set:view', setLocation)
bus.on('layer:control', toggleControl)
bus.on('keyboard:escape', closeControl)
bus.on('layer:toggle', toggleMapLayer)
bus.on('type:size', sizeTextTo)

let body = document.querySelector('body')
let panelContainer = document.querySelector('.js-panels')
let controlPanel = document.querySelector('.js-layer-control-panel')

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

function setLocation (panel) {
  panel === 'split' ? panel = '/' : panel = panel
  if (window.history.replaceState) {
    window.history.replaceState(null, null, panel)
  }
}

function sizeTextTo (size) {
  let html = document.querySelector('html')
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
  html = undefined
}

function toggleControl () {
  classy.toggle(controlPanel, 'is-active')
}

function closeControl () {
  if (classy.has(controlPanel, 'is-active')) {
    classy.remove(controlPanel, 'is-active')
  }
}

function toggleMapLayer (layer) {
  toggleLayer(layer)
}