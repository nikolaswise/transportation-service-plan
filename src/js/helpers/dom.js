// Dom needs Classy! It's a mutually dependant deal.
import * as classy from './classy';

// ┌─────┐
// │ DOM │
// └─────┘
// Handles dom nodes

/**
 * Returns closest element up the DOM tree matching a given class
 *
 * @param {String} The class to search for
 * @param {Node} Where to search for the Node
 * @returns {Node} The desired DOM Node.
 */
export function closest (className, context) {
  var current;
  for (current = context; current; current = current.parentNode) {
    if (current.nodeType === 1 && classy.has(current, className)) {
      break;
    }
  }
  return current;
}

/**
 * Converts a NodeList into an Array.
 *
 * @param {NodeList} A NodeList.
 * @returns {Array} An array of DOM nodes.
 */
export function nodeListToArray (domNodeList) {
  if (Array.isArray(domNodeList)) {
    return domNodeList;
  } else {
    return Array.prototype.slice.call(domNodeList);
  }
}

/**
 * Finds all the elements inside a node, or the document and returns them as an array
 *
 * @param {String} Class to select DOM nodes on
 * @param {Node} The DOM Node to scope the search within.
 * @returns {Array} An array of DOM nodes.
 */
export function findElements (query, domNode) {
  var context = domNode || document;
  var elements = context.querySelectorAll(query);
  return nodeListToArray(elements);
}

/**
 * Removes DOM Nodes from an array if they do not match the filter parameter.
 *
 * @param {String} String to filter array on.
 * @param {Array} An array of DOM nodes.
 * @returns {Array} An array of DOM nodes.
 */
export function filterArray (value, array) {
  var results = array.filter(function (item) {
    var val = value.toLowerCase();
    var t = item.innerHTML.toLowerCase();
    return t.indexOf(val) !== -1;
  });
  return results;
}
