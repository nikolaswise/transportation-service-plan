import * as routeMatcher from './helpers/route-matcher'
console.log(routeMatcher)
let match = routeMatcher.routeMatcher
import bus from './helpers/bus'
/**
* Parse URL and navigate to correct pane/state
*/
export default function route () {
  let url = document.location.pathname + '/'
  url = url.replace('//', '/')
  let home = match('/').parse(url)
  let view = match('/:mode/').parse(url)

  console.log(url)

  if (home) {
    console.log('default')
    bus.emit('pane:toggle')
  }
  if (view) {
    console.log(view)
    bus.emit('pane:toggle', view.mode)
  }
}
