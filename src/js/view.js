import bus from './helpers/bus.js'
import * as classy from './helpers/classy.js'
import * as dom from './helpers/dom.js'

bus.on('map:hide', logMapHide)
bus.on('map:show', logMapShow)
bus.on('text:hide', logTextHide)
bus.on('text:show', logTextShow)
bus.on('search:open', searchOpen)
bus.on('search:close', searchClose)
bus.on('contents:open', contentsOpen)
bus.on('contents:close', contentsClose)

function logMapHide () {
  console.log('map:hide')
  let html = document.querySelector('html')
  classy.remove(html, 'map-is-active')
  bus.emit('map:remove')
}
function logMapShow () {
  console.log('map:show')
  let html = document.querySelector('html')
  classy.add(html, 'map-is-active')
  bus.emit('map:draw')
}
function logTextHide () {
  console.log('text:hide')
  let html = document.querySelector('html')
  classy.remove(html, 'text-is-active')
  bus.emit('map:remove')
  window.setTimeout(resizeMap, 300);
}

function resizeMap () {
  bus.emit('map:draw')
}

function logTextShow () {
  console.log('text:show')
  let html = document.querySelector('html')
  classy.add(html, 'text-is-active')
}

function searchOpen () {
  console.log('search:open')
}
function searchClose () {
  console.log('search:close')
}
function contentsOpen () {
  console.log('contents:open')
}
function contentsClose () {
  console.log('contents:close')
}