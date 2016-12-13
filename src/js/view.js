import bus from './helpers/bus.js'
import * as classy from './helpers/classy.js'
import * as dom from './helpers/dom.js'

bus.on('pane:toggle', togglePane)
bus.on('pane:set', setPane)
bus.on('layer:control', handleControlToggle)
bus.on('resize:width', checkWidth)

let body = document.querySelector('body')

function checkWidth (width) {
  if (width < 800) {
    if (classy.has(body, 'split-view')) {
      bus.emit('pane:set', 'text')
    }
  } else if (width > 800) {
    if (classy.has(body, 'text-view')) {
      console.log('back??')
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
  console.log(`set to ${pane}`)
  classy.add(body, `${pane}-view`)
}

function emitRedraw () {
  bus.emit('map:redraw')
}