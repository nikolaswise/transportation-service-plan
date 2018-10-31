import bus from './helpers/bus';

let textPane = document.querySelector('.js-text-area');


/**
 * Emits type resizing events on window resize.
 */
export default function () {
  let width = textPane.offsetWidth;
  if (width > 785) {
    bus.emit(`type:size`, 'large');
  } else if (width > 599) {
    bus.emit(`type:size`, 'medium');
  } else if (width < 600) {
    bus.emit(`type:size`, 'small');
  }
}
