// Cool Helpers
import * as dom from './helpers/dom';
import * as classy from './helpers/classy';
import bus from './helpers/bus';

// ┌────────┐
// │ Sticky │
// └────────┘
// sticks things to the window

function sticky () {
  console.log('stickify')
  bus.on('scrolling:at', scrollHandler);
  bus.on('sticky:stick', stickItem);
  bus.on('sticky:unstick', unstickItem);

  var elements = dom.findElements('.js-sticky');
  var stickies = elements.map(function (el) {
    var offset = el.offsetTop;
    var hasId = el.getAttribute('data-sticky-id');
    if (!hasId) createShim(el);
    return {
      element: el
    };
  });

  function createShim (el) {
    var guid = 'sticky-navigation';
    el.setAttribute('data-sticky-id', guid);
    var parent = el.parentNode;
    var shim = el.cloneNode('deep');
    classy.add(shim, 'js-shim');
    classy.remove(shim, 'js-sticky');
    shim.setAttribute('data-sticky-id', guid);
    shim.style.visibility = 'hidden';
    shim.style.display = 'none';
    parent.insertBefore(shim, el);
  }

  function stickItem (item) {
    console.log('its stuck!')
    var id = item.element.getAttribute('data-sticky-id');
    var shim = document.querySelector(`.js-shim[data-sticky-id="${id}"]`);
    if (id && shim) {
      classy.add(item.element, 'is-sticky');
      shim.style.display = '';
    }
  }

  function unstickItem (item) {
    var id = item.element.getAttribute('data-sticky-id');
    var shim = document.querySelector(`.js-shim[data-sticky-id="${id}"]`);
    if (id && shim) {
      classy.remove(item.element, 'is-sticky');
      shim.style.display = 'none';
    }
  }

  function scrollHandler (pageYOffset) {
    stickies.forEach(function (item) {
      console.log('ping')
      var referenceElement = item.element;
      if (classy.has(item.element, 'is-sticky')) {
        var id = item.element.getAttribute('data-sticky-id');
        referenceElement = document.querySelector(`.js-shim[data-sticky-id="${id}"]`);
      }

      if (referenceElement) {
        var dataTop = referenceElement.getAttribute('data-top') || 0;
        item.top = referenceElement.offsetTop - parseInt(dataTop, 0);
      }

      if (item.top < pageYOffset) {
        console.log('stick it!')
        bus.emit('sticky:stick', item);
      } else {
        console.log('unstick it!')
        bus.emit('sticky:unstick', item);
      }
    });
  }
}

export default sticky;