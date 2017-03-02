// Classy needs the DOM helpers
import * as dom from './dom';

// ┌────────────────────┐
// │ Class Manipulation │
// └────────────────────┘

/**
 * Checks a domNode for the presence of a class.
 *
 * @param {Node} DOM Node to check
 * @param {String} Class to check for.
 * @returns {Boolean}
 */
export function has (domNode, className) {
  return new RegExp('(\\s|^)' + className + '(\\s|$)').test(domNode.getAttribute('class'));
}

/**
 * Adds one or more classes to a DOM Node
 *
 * @param {Node} DOM Node to add class to
 * @param {String} Classes to add to DOM Node. Words seperated by spaces will be treated as seperate classes.
 */
export function add (domNode, classes) {
  classes.split(' ').forEach(function (c) {
    if (!has(domNode, c)) {
      domNode.setAttribute('class', domNode.getAttribute('class') + ' ' + c);
    }
  });
}

/**
 * Removes one or more classes from a DOM Node.
 *
 * @param {Node} DOM Node to check
 * @param {String} Classes to remove from DOM Node. Words seperated by spaces will be treated as seperate classes.
 */
export function remove (domNode, classes) {
  classes.split(' ').forEach(function (c) {
    var removedClass = domNode.getAttribute('class').replace(new RegExp('(\\s|^)' + c + '(\\s|$)', 'g'), '$2');
    if (has(domNode, c)) {
      domNode.setAttribute('class', removedClass);
    }
  });
}

/**
 * Toggles a single class from a DOM Node.
 *
 * @param {Node} DOM Node to toggle class.
 * @param {String} Class to toggle. If the class is present, remove the class. If the class is not present, add the class.
 */
export function toggle (domNode, className) {
  if (has(domNode, className)) {
    remove(domNode, className);
  } else {
    add(domNode, className);
  }
}

/**
 * Remove the `is-active` class from an array of Nodes
 *
 * @param {NodeArray} Array of DOM Nodes.
 */
export function removeActive (array) {
  array = dom.nodeListToArray(array);
  array.forEach(function (item) {
    remove(item, 'is-active');
  });
}

/**
 * Adds the `is-active` class from an array of Nodes
 *
 * @param {NodeArray} Array of DOM Nodes.
 */
export function addActive (array) {
  array = dom.nodeListToArray(array);
  array.forEach(function (item) {
    add(item, 'is-active');
  });
}

/**
 * Removes the `is-active` class from an array of Nodes and adds it to a single Node.
 *
 * @param {NodeArray} Array of DOM Nodes.
 * @param {Node} DOM Node.
 */
export function toggleActive (array, el) {
  removeActive(array);
  add(el, 'is-active');
}
