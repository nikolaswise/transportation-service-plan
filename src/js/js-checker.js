import * as classy from './helpers/classy.js'
import bus from './helpers/bus.js'

bus.on('has:javascript', flagJS)

function flagJS () {
  let body = document.querySelector('body')
  classy.add(body, 'js-is-active')
}

export default function () {
  bus.emit('has:javascript')
  bus.emit('map:show')
  bus.emit('text:show')
  return true
}