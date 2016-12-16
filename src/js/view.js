import bus from './helpers/bus.js'
import * as classy from './helpers/classy.js'
import * as dom from './helpers/dom.js'

bus.on('pane:toggle', togglePane)
bus.on('pane:set', setPane)
bus.on('layer:control', handleControlToggle)
bus.on('resize:width', checkWidth)

bus.on('resize:textPane', log)

let html = document.querySelector('html')

function log (width) {
  // | size   | min width | max width |
  // | ------ | --------- | --------- |
  // | large  | 786       | n/a       |
  // | medium | 600       | 785       |
  // | small  | n/a       | 599       |
  if (width > 785) {
    bus.emit('type:large')
  } else if (width > 599) {
    bus.emit('type:medium')
  } else if (width < 600) {
    bus.emit('type:small')
  }
}

let body = document.querySelector('body')

function checkWidth (width) {
  if (width < 800 && window.location.pathname === '/') {
    classy.remove(body, 'split-view')
    classy.add(body, `text-view`)
  } else if (width > 800 && window.location.pathname === '/') {
    classy.remove(body, 'text-view')
    classy.add(body, `split-view`)
  }
}

function handleControlToggle () {
  let controlPanel = document.querySelector('.js-layer-control-panel')
  classy.toggle(controlPanel, 'is-active')
}

function togglePane (pane) {
  if (classy.has(body, 'split-view')) {
    classy.remove(body, 'split-view')
    bus.emit('pane:set', pane)
  } else if (classy.has(body, `${pane}-view`)) {
    classy.remove(body, `${pane}-view`)
    checkWidth()
  } else {
    classy.remove(body, `map-view`)
    classy.remove(body, `text-view`)
    checkWidth()
  }
  window.setTimeout(emitRedraw, 300);
}

function setPane (pane) {
  if ( classy.has(body, `map-view`) ) {
    classy.remove(body, `map-view`)
  }
  if (classy.has(body, `text-view`) ) {
    classy.remove(body, `text-view`)
  }
  if (classy.has(body, `split-view`) ) {
    classy.remove(body, `split-view`)
  }
  classy.add(body, `${pane}-view`)
  if (pane === 'split') {
    window.history.replaceState(null, null, '/')
  } else {
    window.history.replaceState(null, null, pane)
  }

}

function emitRedraw () {
  bus.emit('map:redraw')
}