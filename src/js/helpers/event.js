// ┌──────────────────────┐
// │ DOM Event Management │
// └──────────────────────┘
// Designed for browser support becuase MICROSOFT sheesh.

/**
 * Keeps track of what events are bound on what component nodes.
 */
var boundEvents = {
  dropdowns: [],
  accordions: []
};

export { boundEvents };

/**
 * Return the string 'click', apparently.
 *
 * @returns {String} 'click'
 */
export function click () {
  return 'click';
}

/**
 * Add a callback function to an event on a DOM node
 *
 * @param {Node} Node to attach event too.
 * @param {String} Type of event to attach.
 * @param {Function} Function to attach on event.
 * @returns {Function} Proper event attachment function.
 */
export function add (domNode, e, fn) {
  if (domNode.addEventListener) {
    return domNode.addEventListener(e, fn, false);
  } else if (domNode.attachEvent) {
    return domNode.attachEvent('on' + e, fn);
  }
}

/**
 * Remove a specific function binding from a DOM node event
 *
 * @param {Node} Node to attach event too.
 * @param {String} Type of event to detach.
 * @param {Function} Function to detach on event.
 * @returns {Function} Proper event detachment function.
 */
export function remove (domNode, e, fn) {
  if (domNode.removeEventListener) {
    return domNode.removeEventListener(e, fn, false);
  } else if (domNode.detachEvent) {
    return domNode.detachEvent('on' + e, fn);
  }
}

/**
 * Remove a specific function binding from a DOM node event
 *
 * @param {Event} Event with target
 * @returns {Node} Node which is the target of said event.
 */
// get the target element of an event
export function target (e) {
  return e.target || e.srcElement;
}

/**
 * Prevent default behavior of an event
 *
 * @param {Event} Event to prevent.
 * @returns {Function} Proper event preventing function.
 */
export function preventDefault (e) {
  if (e.preventDefault) {
    return e.preventDefault();
  } else if (e.returnValue) {
    e.returnValue = false;
  }
}

/**
 * Prevent an event from bubbling up the DOM tree
 *
 * @param {Event} Event to prevent.
 * @returns {Function} Proper event debubbling function if required.
 */
export function stopPropagation (e) {
  e = e || window.event;
  if (e.stopPropagation) {
    return e.stopPropagation();
  }
  if (e.cancelBubble) {
    e.cancelBubble = true;
  }
}

/**
 * Prevent a function from being called if it has been called recently.
 *
 * @param {Function} Event to prevent.
 * @param {Number} Length of time that function remains uncallable for.
 * @param {Uhhh} Context for function I guess?
 * @returns {Function} A function that will intercept the original function.
 */

export function throttle (fn, time, context) {
  var lock, args, wrapperFn, later;

  later = function () {
    // reset lock and call if queued
    lock = false;
    if (args) {
      wrapperFn.apply(context, args);
      args = false;
    }
  };

  wrapperFn = function () {
    if (lock) {
      // called too soon, queue to call later
      args = arguments;
    } else {
      // call and lock until later
      fn.apply(context, arguments);
      setTimeout(later, time);
      lock = true;
    }
  };

  return wrapperFn;
}
