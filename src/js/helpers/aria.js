// ┌────────────────┐
// │ Aria Adjusters │
// └────────────────┘
// utilities to help manage aria properties

/**
 * Toggles `aria-hidden` property on DOM nodes.
 *
 * @param {Array} Array of DOM Nodes
 */
export function toggleHidden (array) {
  array.forEach(function (node) {
    if (!node) {
      return;
    }
    var hidden = node.getAttribute('aria-hidden');
    if (hidden !== 'true') {
      node.setAttribute('aria-hidden', true);
    } else {
      node.removeAttribute('aria-hidden');
    }
  });
}

/**
 * Adds `aria-hidden` on DOM nodes.
 *
 * @param {Array} Array of DOM Nodes
 */
export function hide (array) {
  array.forEach(function (node) {
    if (!node) {
      return;
    }
    node.setAttribute('aria-hidden', true);
  });
}

/**
 * Removes `aria-hidden` on DOM nodes.
 *
 * @param {Array} Array of DOM Nodes
 */
export function show (array) {
  array.forEach(function (node) {
    if (!node) {
      return;
    }
    node.removeAttribute('aria-hidden');
  });
}

/**
 * Toggles `aria-expanded` property on a single DOM node.
 *
 * @param {Node} A DOM node.
 */
export function toggleExpanded (domNode) {
  if (!domNode) {
    return;
  }
  var isExpanded = domNode.getAttribute('aria-expanded');
  if (isExpanded) {
    domNode.removeAttribute('aria-expanded');
  } else {
    domNode.setAttribute('aria-expanded', 'true');
  }
}
