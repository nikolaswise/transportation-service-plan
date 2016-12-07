import bus from './helpers/bus.js'
import * as classy from './helpers/classy.js'
import * as dom from './helpers/dom.js'

bus.on('pane:toggle', togglePane)
bus.on('layer:toggle', handleLayerToggle)
bus.on('layer:control', handleControlToggle)

function handleControlToggle () {
  let controlPanel = document.querySelector('.js-layer-control-panel')
  classy.toggle(controlPanel, 'is-active')
}

function handleLayerToggle (layer) {
  console.log(`toggle layer ${layer} plz`);
}

function togglePane (pane) {
  let body = document.querySelector('body')
  if (classy.has(body, 'split-view')) {
    classy.remove(body, 'split-view')
    classy.add(body, `${pane}-view`)
  } else if (classy.has(body, `${pane}-view`)) {
    classy.add(body, 'split-view')
    classy.remove(body, `${pane}-view`)
  } else {
    classy.remove(body, `map-view`)
    classy.remove(body, `text-view`)
    classy.add(body, 'split-view')
  }

  window.setTimeout(emitRedraw, 300);
}

function showPane (pane) {
  console.log(`show ${pane}`)
}

function emitRedraw () {
  bus.emit('map:redraw')
}