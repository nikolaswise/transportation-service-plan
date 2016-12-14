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
  console.log(`text pane width is ${width}`)
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
  if (width < 800) {
    if (classy.has(body, 'split-view')) {
      bus.emit('pane:set', 'text')
    }
  } else if (width > 800) {
    if (classy.has(body, 'text-view')) {
      bus.emit('pane:set', 'split')
    }
  }
}

function handleControlToggle () {
  let controlPanel = document.querySelector('.js-layer-control-panel')
  classy.toggle(controlPanel, 'is-active')
}

function togglePane (pane) {
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
}

function emitRedraw () {
  bus.emit('map:redraw')
}