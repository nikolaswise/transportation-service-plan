// Cool Helpers
import * as dom from './helpers/dom';
import * as classy from './helpers/classy';
import bus from './helpers/bus';

// ┌────────┐
// │ Sticky │
// └────────┘
// sticks things to the window

function sticky () {
  var referenceElement = document.querySelector('.js-sticky-reference')
  var targetElement = document.querySelector('.js-sticky-target')
  bus.on('scrolling:at', scrollHandler);
  bus.on('sticky:stick', stickItem);
  bus.on('sticky:unstick', unstickItem);

  function scrollHandler (pageYOffset) {
    let position = referenceElement.offsetTop
    if (position > pageYOffset) {
      bus.emit('sticky:unstick');
    } else {
      bus.emit('sticky:stick');
    }
  }

  function unstickItem () {
    if (!targetElement.hasAttribute('hidden')) {
      targetElement.setAttribute('hidden', 'hidden')
    }
  }
  function stickItem () {
    if (targetElement.hasAttribute('hidden')) {
      targetElement.removeAttribute('hidden')
    }
  }
}

export default sticky;