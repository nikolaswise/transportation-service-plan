import * as classy from './helpers/classy.js'
import bus from './helpers/bus.js'

bus.on('has:javascript', flagJS)

function flagJS () {
  let html = document.querySelector('html')
  classy.add(html, 'js-is-active')
}

export default function () {
  bus.emit('has:javascript')
  return true
}