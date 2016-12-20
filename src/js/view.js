import bus from './helpers/bus.js'
import * as classy from './helpers/classy.js'
import * as dom from './helpers/dom.js'
import * as map from './map/map.js'

bus.on('set:view', setToPanel)
bus.on('set:view', setLocation)
bus.on('set:view', slowRedrawMap)
bus.on('layer:control', toggleControl)
bus.on('keyboard:escape', closeControl)
bus.on('keyboard:escape', closePopUp)
bus.on('layer:toggle', toggleMapLayer)
bus.on('popup:opened', handlePopUp)
bus.on('popup:close', closePopUp)
bus.on('popup:leafletclosed', closePopUp)
bus.on('type:size', sizeTextTo)

let body = document.querySelector('body')
let panelContainer = document.querySelector('.js-panels')
let controlPanel = document.querySelector('.js-layer-control-panel')
let popUpContainer = document.querySelector('.js-pop-up')

function handlePopUp (feature) {
  classy.add(popUpContainer, 'is-active')
  console.log(feature)
}

function closePopUp () {
  classy.remove(popUpContainer, 'is-active')
}

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
  let target = map.toggleLayer(layer)
  if (layer.checked) {
    bus.on('popup:closed', layer.closePopup)
    target.bindPopup(function (evt) {
      bus.emit('popup:opened', evt.feature.properties)
      return ''
    }).on('popupclose', function () {
      console.log('yup that closed')
      bus.emit('popup:leafletclosed')
      console.log(bus)
    })
  } else {
    target.unbindPopup()
  }
}

function slowRedrawMap () {
  var timeoutID = window.setTimeout(map.redraw, 300);
}



