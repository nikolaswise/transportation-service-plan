// Cool Helpers
import * as dom from './helpers/dom';
import * as classy from './helpers/classy';
import * as aria from './helpers/aria';
import * as event from './helpers/event';
import bus from './helpers/bus';

/**
 * Initializes drawer pattern and binds events.
 */
function drawer () {
  var wrapper = document.querySelector('.js-panels');
  var toggles = dom.findElements('.js-drawer-toggle');
  var drawers = dom.findElements('.js-drawer');
  var lastOn;

  // Bus events
  bus.on('drawer:open', openDrawer);
  bus.on('keyboard:escape', closeDrawer);
  bus.on('drawer:close', closeDrawer);
  bus.on('drawer:bind', bindDrawers);

  /**
   * Adds the 'is-active' class to the target drawer component.
   * Manages ARIA and tab indexing.
   *
   * @param {Object} Options object: {id: drawer-id}
   */
  function openDrawer (options) {
    bus.emit('drawer:close');
    var drawer = document.querySelector(`.js-drawer[data-drawer="${options.id}"]`);
    if (drawer) {
      var right = classy.has(drawer, 'drawer-right');
      var left = classy.has(drawer, 'drawer-left');

      drawer.setAttribute('tabindex', 0);
      classy.add(drawer, 'is-active');

      if (right) {
        classy.add(wrapper, 'drawer-right-is-active');
      } else if (left) {
        classy.add(wrapper, 'drawer-left-is-active');
      }

      aria.hide([wrapper]);
      event.add(drawer, event.click(), closeClick);
      event.add(document, 'focusin', fenceDrawer);
    }
  }

  /**
   * Removes the 'is-active' class to the target drawer component.
   * Manages ARIA and tab indexing.
   * If no drawer is specified, closes all drawers.
   *
   * @param {Object} Options object: {id: string}
   */
  function closeDrawer (options) {
    if (!options) {
      drawers.forEach(function (drawer) {
        drawer.removeAttribute('tabindex');
        classy.remove(drawer, 'is-active');
      });
    } else {
      var drawer = document.querySelector(`.js-drawer[data-drawer="${options.id}"]`);
      drawer.removeAttribute('tabindex');
      classy.remove(drawer, 'is-active');
    }
    classy.remove(wrapper, 'drawer-left-is-active');
    classy.remove(wrapper, 'drawer-right-is-active');
    toggles.forEach(function (toggle) {
      classy.remove(toggle, 'is-active');
    });
    aria.show([wrapper]);
    event.remove(document, 'focusin', fenceDrawer);
    if (lastOn) lastOn.focus();
  }

  /**
   * Prevents focus from leaving drawer component while drawer is open.
   *
   * @param {Event} Event
   */
  function fenceDrawer (e) {
    if (!dom.closest('js-drawer', e.target)) {
      drawers.forEach(function (drawer) {
        if (classy.has(drawer, 'is-active')) {
          drawer.focus();
        }
      });
    }
  }

  /**
   * Adds listeners from drawer toggle buttons for all drawers,
   * or just specified drawer.
   *
   * @param {Object} {node: DOMnode}
   */
  function bindDrawers (options) {
    if (!options) {
      toggles.forEach(function (toggle) {
        event.add(toggle, event.click(), toggleClick);
      });
    } else {
      event.add(options.node, event.click(), toggleClick);
    }
  }

  /**
   * Closes drawer when the drawer wrapper is clicked.
   * The drawer wrapper is everything outside the drawer.
   *
   * @param {Event} Event
   */
  function closeClick (e) {
    if (classy.has(e.target, 'js-drawer')) {
      bus.emit('drawer:close');
    }
    if (classy.has(e.target, 'js-drawer-close')) {
      bus.emit('drawer:close');
    }
  }

  /**
   * Toggles the state of a drawer when the drawers controller is clicked.
   *
   * @param {Event} Event
   */
  function toggleClick (e) {
    event.preventDefault(e);
    var drawerId = e.target.getAttribute('data-drawer');
    classy.add(e.target, 'is-active');
    bus.emit('drawer:open', {id: drawerId});
  }

  bus.emit('drawer:bind');
}

export default drawer;
