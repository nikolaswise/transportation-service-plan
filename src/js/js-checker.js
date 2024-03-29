import * as classy from './helpers/classy.js';
import bus from './helpers/bus.js';

bus.on('has:javascript', flagJS);

/**
 * Adds 'js-is-active' class to root HTML node
 */
function flagJS () {
  let html = document.querySelector('html');
  classy.remove(html, 'js-is-inactive');
}

/**
 * Emits event to trigger flagJS function.
 */
export default function () {
  bus.emit('has:javascript');
  return true;
}
