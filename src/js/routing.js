import bus from './helpers/bus';
/**
* Parse URL and navigate to correct pane/state
*/
export default function route () {
  let url = document.location.pathname + '/';
  url = url.replace('//', '/');

  if (url === '/map/') {
    bus.emit('set:view', 'map');
  } else if (url === '/text/') {
    bus.emit('set:view', 'text');
  } else {
    bus.emit('set:view', 'split');
  }
}
