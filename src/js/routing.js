import * as routeMatcher from './helpers/route-matcher'
let match = routeMatcher.routeMatcher
import bus from './helpers/bus'
/**
* Parse URL and navigate to correct pane/state
*/
export default function route () {
  let width = window.innerWidth
  let url = document.location.pathname + '/'
  url = url.replace('//', '/')
  let home = match('/').parse(url)
  let view = match('/:mode/').parse(url)

  if (home) {
    bus.emit('set:view', 'split')
  } else if (view.mode === 'map') {
    bus.emit('set:view', 'map')
  } else if (view.mode === 'text') {
    bus.emit('set:view', 'text')
  } else {
    bus.emit('set:view', 'split')
  }
}
