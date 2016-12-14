import bus from './helpers/bus.js'
import * as classy from './helpers/classy.js'
import * as dom from './helpers/dom.js'

bus.on('resize:width', log)

bus.on('type:large', logLarge)
bus.on('type:medium', logMedium)
bus.on('type:small', logSmall)


function logLarge () {
  console.log(`make type large`)
}
function logMedium () {
  console.log(`make type medium`)
}
function logSmall () {
  console.log(`make type small`)
}