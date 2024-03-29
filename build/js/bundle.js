(function () {
'use strict';

// Dom needs Classy! It's a mutually dependant deal.
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
function closest (className, context) {
  var current;
  for (current = context; current; current = current.parentNode) {
    if (current.nodeType === 1 && has(current, className)) {
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
function nodeListToArray (domNodeList) {
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
function findElements (query, domNode) {
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

// Classy needs the DOM helpers
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
function has (domNode, className) {
  return new RegExp('(\\s|^)' + className + '(\\s|$)').test(domNode.getAttribute('class'));
}

/**
 * Adds one or more classes to a DOM Node
 *
 * @param {Node} DOM Node to add class to
 * @param {String} Classes to add to DOM Node. Words seperated by spaces will be treated as seperate classes.
 */
function add (domNode, classes) {
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
function remove (domNode, classes) {
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
function toggle (domNode, className) {
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
function removeActive (array) {
  array = nodeListToArray(array);
  array.forEach(function (item) {
    remove(item, 'is-active');
  });
}

/**
 * Adds the `is-active` class from an array of Nodes
 *
 * @param {NodeArray} Array of DOM Nodes.
 */


/**
 * Removes the `is-active` class from an array of Nodes and adds it to a single Node.
 *
 * @param {NodeArray} Array of DOM Nodes.
 * @param {Node} DOM Node.
 */

/**
 * Creates the Event Bus.
 */
function E () {
  // Keep this empty so it's easier to inherit from
  // (via https://github.com/lipsmack from https://github.com/scottcorgan/tiny-emitter/issues/3)
}

E.prototype = {
  /**
   * Subscribes to an event, calling the function every time the event is emitted.
   *
   * @param {String} The name of the event to subscribe to
   * @param {Function} The  function to call when event is emitted
   * @param {String} (OPTIONAL) - the context to bind the event callback to
   */
  on: function (name, callback, ctx) {
    var e = this.e || (this.e = {});

    (e[name] || (e[name] = [])).push({
      fn: callback,
      ctx: ctx
    });

    return this;
  },

  /**
   * Subscribes to an event, calling the function the **first** time the event is emitted.
   *
   * @param {String} The name of the event to subscribe to
   * @param {Function} The  function to call when event is emitted
   * @param {String} (OPTIONAL) - the context to bind the event callback to
   */
  once: function (name, callback, ctx) {
    var self = this;
    function listener () {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    }

    listener._ = callback;
    return this.on(name, listener, ctx);
  },

  /**
   * Emit a named event. All subscribing listeners will call their functions.
   *
   * @param {String} The name of the event to subscribe to
   * @param {Args} Any number of arguments to pass to the callbacks.
   */
  emit: function (name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i = 0;
    var len = evtArr.length;

    for (i; i < len; i++) {
      evtArr[i].fn.apply(evtArr[i].ctx, data);
    }

    return this;
  },

  /**
   * Unsubscribes to an event. The function passed will no longer be called.
   *
   * @param {String} The name of the event to subscribe to
   * @param {Function} The  function to call when event is emitted
   */
  off: function (name, callback) {
    var e = this.e || (this.e = {});
    var evts = e[name];
    var liveEvents = [];

    if (evts && callback) {
      for (var i = 0, len = evts.length; i < len; i++) {
        if (evts[i].fn !== callback && evts[i].fn._ !== callback) {
          liveEvents.push(evts[i]);
        }
      }
    }

    // Remove event from queue to prevent memory leak
    // Suggested by https://github.com/lazd
    // Ref: https://github.com/scottcorgan/tiny-emitter/commit/c6ebfaa9bc973b33d110a84a307742b7cf94c953#commitcomment-5024910

    (liveEvents.length)
      ? e[name] = liveEvents
      : delete e[name];
    return this;
  }
};

var bus = new E();

bus.on('has:javascript', flagJS);

/**
 * Adds 'js-is-active' class to root HTML node
 */
function flagJS () {
  var html = document.querySelector('html');
  remove(html, 'js-is-inactive');
}

/**
 * Emits event to trigger flagJS function.
 */
var hasJS = function () {
  bus.emit('has:javascript');
  return true;
};

/**
* Parse URL and navigate to correct pane/state
*/

// this needs to a little more robust, and be able to handle queries maybe? for sure hashes.
function route () {
  var url = document.location.pathname + '/';
  url = url.replace('//', '/');
  if (url === '/map/') {
    bus.emit('set:view', 'map');
  } else if (url === '/text/') {
    bus.emit('set:view', 'text');
  } else {
    bus.emit('set:view', 'split');
  }
  bus.emit('routing:done');
}

// ┌──────────────────────┐
// │ DOM Event Management │
// └──────────────────────┘
// Designed for browser support becuase MICROSOFT sheesh.

/**
 * Keeps track of what events are bound on what component nodes.
 */
/**
 * Return the string 'click', apparently.
 *
 * @returns {String} 'click'
 */
function click () {
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
function add$1 (domNode, e, fn) {
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
function remove$1 (domNode, e, fn) {
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


/**
 * Prevent default behavior of an event
 *
 * @param {Event} Event to prevent.
 * @returns {Function} Proper event preventing function.
 */
function preventDefault (e) {
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


/**
 * Prevent a function from being called if it has been called recently.
 *
 * @param {Function} Event to prevent.
 * @param {Number} Length of time that function remains uncallable for.
 * @param {Uhhh} Context for function I guess?
 * @returns {Function} A function that will intercept the original function.
 */

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var scrollMonitor = createCommonjsModule(function (module, exports) {
!function(t,e){module.exports=e();}(commonjsGlobal,function(){return function(t){function e(o){if(i[o]){ return i[o].exports; }var s=i[o]={exports:{},id:o,loaded:!1};return t[o].call(s.exports,s,s.exports,e),s.loaded=!0,s.exports}var i={};return e.m=t,e.c=i,e.p="",e(0)}([function(t,e,i){"use strict";var o=i(1),s=o.isInBrowser,n=i(2),r=new n(s?document.body:null);r.setStateFromDOM(null),r.listenToDOM(),s&&(window.scrollMonitor=r),t.exports=r;},function(t,e){"use strict";e.VISIBILITYCHANGE="visibilityChange",e.ENTERVIEWPORT="enterViewport",e.FULLYENTERVIEWPORT="fullyEnterViewport",e.EXITVIEWPORT="exitViewport",e.PARTIALLYEXITVIEWPORT="partiallyExitViewport",e.LOCATIONCHANGE="locationChange",e.STATECHANGE="stateChange",e.eventTypes=[e.VISIBILITYCHANGE,e.ENTERVIEWPORT,e.FULLYENTERVIEWPORT,e.EXITVIEWPORT,e.PARTIALLYEXITVIEWPORT,e.LOCATIONCHANGE,e.STATECHANGE],e.isOnServer="undefined"==typeof window,e.isInBrowser=!e.isOnServer,e.defaultOffsets={top:0,bottom:0};},function(t,e,i){"use strict";function o(t,e){if(!(t instanceof e)){ throw new TypeError("Cannot call a class as a function") }}function s(t){return c?0:t===document.body?window.innerHeight||document.documentElement.clientHeight:t.clientHeight}function n(t){return c?0:t===document.body?Math.max(document.body.scrollHeight,document.documentElement.scrollHeight,document.body.offsetHeight,document.documentElement.offsetHeight,document.documentElement.clientHeight):t.scrollHeight}function r(t){return c?0:t===document.body?window.pageYOffset||document.documentElement&&document.documentElement.scrollTop||document.body.scrollTop:t.scrollTop}var h=i(1),c=h.isOnServer,a=h.isInBrowser,l=h.eventTypes,p=i(3),w=function(){function t(e,i){function h(){if(a.viewportTop=r(e),a.viewportBottom=a.viewportTop+a.viewportHeight,a.documentHeight=n(e),a.documentHeight!==p){for(w=a.watchers.length;w--;){ a.watchers[w].recalculateLocation(); }p=a.documentHeight;}}function c(){for(u=a.watchers.length;u--;){ a.watchers[u].update(); }for(u=a.watchers.length;u--;){ a.watchers[u].triggerCallbacks(); }}o(this,t);var a=this;this.item=e,this.watchers=[],this.viewportTop=null,this.viewportBottom=null,this.documentHeight=n(e),this.viewportHeight=s(e),this.DOMListener=function(){t.prototype.DOMListener.apply(a,arguments);},this.eventTypes=l,i&&(this.containerWatcher=i.create(e));var p,w,u;this.update=function(){h(),c();},this.recalculateLocations=function(){this.documentHeight=0,this.update();};}return t.prototype.listenToDOM=function(){a&&(window.addEventListener?(this.item===document.body?window.addEventListener("scroll",this.DOMListener):this.item.addEventListener("scroll",this.DOMListener),window.addEventListener("resize",this.DOMListener)):(this.item===document.body?window.attachEvent("onscroll",this.DOMListener):this.item.attachEvent("onscroll",this.DOMListener),window.attachEvent("onresize",this.DOMListener)),this.destroy=function(){window.addEventListener?(this.item===document.body?(window.removeEventListener("scroll",this.DOMListener),this.containerWatcher.destroy()):this.item.removeEventListener("scroll",this.DOMListener),window.removeEventListener("resize",this.DOMListener)):(this.item===document.body?(window.detachEvent("onscroll",this.DOMListener),this.containerWatcher.destroy()):this.item.detachEvent("onscroll",this.DOMListener),window.detachEvent("onresize",this.DOMListener));});},t.prototype.destroy=function(){},t.prototype.DOMListener=function(t){this.setStateFromDOM(t);},t.prototype.setStateFromDOM=function(t){var e=r(this.item),i=s(this.item),o=n(this.item);this.setState(e,i,o,t);},t.prototype.setState=function(t,e,i,o){
var this$1 = this;
var s=e!==this.viewportHeight||i!==this.contentHeight;if(this.latestEvent=o,this.viewportTop=t,this.viewportHeight=e,this.viewportBottom=t+e,this.contentHeight=i,s){ for(var n=this.watchers.length;n--;){ this$1.watchers[n].recalculateLocation(); } }this.updateAndTriggerWatchers(o);},t.prototype.updateAndTriggerWatchers=function(t){
var this$1 = this;
for(var e=this.watchers.length;e--;){ this$1.watchers[e].update(); }for(e=this.watchers.length;e--;){ this$1.watchers[e].triggerCallbacks(t); }},t.prototype.createCustomContainer=function(){return new t},t.prototype.createContainer=function(e){"string"==typeof e?e=document.querySelector(e):e&&e.length>0&&(e=e[0]);var i=new t(e,this);return i.setStateFromDOM(),i.listenToDOM(),i},t.prototype.create=function(t,e){"string"==typeof t?t=document.querySelector(t):t&&t.length>0&&(t=t[0]);var i=new p(this,t,e);return this.watchers.push(i),i},t.prototype.beget=function(t,e){return this.create(t,e)},t}();t.exports=w;},function(t,e,i){"use strict";function o(t,e,i){function o(t,e){if(0!==t.length){ for(E=t.length;E--;){ T=t[E],T.callback.call(s,e,s),T.isOne&&t.splice(E,1); } }}var s=this;this.watchItem=e,this.container=t,i?i===+i?this.offsets={top:i,bottom:i}:this.offsets={top:i.top||u.top,bottom:i.bottom||u.bottom}:this.offsets=u,this.callbacks={};for(var d=0,f=w.length;d<f;d++){ s.callbacks[w[d]]=[]; }this.locked=!1;var m,v,b,I,E,T;this.triggerCallbacks=function(t){switch(this.isInViewport&&!m&&o(this.callbacks[r],t),this.isFullyInViewport&&!v&&o(this.callbacks[h],t),this.isAboveViewport!==b&&this.isBelowViewport!==I&&(o(this.callbacks[n],t),v||this.isFullyInViewport||(o(this.callbacks[h],t),o(this.callbacks[a],t)),m||this.isInViewport||(o(this.callbacks[r],t),o(this.callbacks[c],t))),!this.isFullyInViewport&&v&&o(this.callbacks[a],t),!this.isInViewport&&m&&o(this.callbacks[c],t),this.isInViewport!==m&&o(this.callbacks[n],t),!0){case m!==this.isInViewport:case v!==this.isFullyInViewport:case b!==this.isAboveViewport:case I!==this.isBelowViewport:o(this.callbacks[p],t);}m=this.isInViewport,v=this.isFullyInViewport,b=this.isAboveViewport,I=this.isBelowViewport;},this.recalculateLocation=function(){if(!this.locked){var t=this.top,e=this.bottom;if(this.watchItem.nodeName){var i=this.watchItem.style.display;"none"===i&&(this.watchItem.style.display="");for(var s=0,n=this.container;n.containerWatcher;){ s+=n.containerWatcher.top-n.containerWatcher.container.viewportTop,n=n.containerWatcher.container; }var r=this.watchItem.getBoundingClientRect();this.top=r.top+this.container.viewportTop-s,this.bottom=r.bottom+this.container.viewportTop-s,"none"===i&&(this.watchItem.style.display=i);}else { this.watchItem===+this.watchItem?this.watchItem>0?this.top=this.bottom=this.watchItem:this.top=this.bottom=this.container.documentHeight-this.watchItem:(this.top=this.watchItem.top,this.bottom=this.watchItem.bottom); }this.top-=this.offsets.top,this.bottom+=this.offsets.bottom,this.height=this.bottom-this.top,void 0===t&&void 0===e||this.top===t&&this.bottom===e||o(this.callbacks[l],null);}},this.recalculateLocation(),this.update(),m=this.isInViewport,v=this.isFullyInViewport,b=this.isAboveViewport,I=this.isBelowViewport;}var s=i(1),n=s.VISIBILITYCHANGE,r=s.ENTERVIEWPORT,h=s.FULLYENTERVIEWPORT,c=s.EXITVIEWPORT,a=s.PARTIALLYEXITVIEWPORT,l=s.LOCATIONCHANGE,p=s.STATECHANGE,w=s.eventTypes,u=s.defaultOffsets;o.prototype={on:function(t,e,i){switch(!0){case t===n&&!this.isInViewport&&this.isAboveViewport:case t===r&&this.isInViewport:case t===h&&this.isFullyInViewport:case t===c&&this.isAboveViewport&&!this.isInViewport:case t===a&&this.isInViewport&&this.isAboveViewport:if(e.call(this,this.container.latestEvent,this),i){ return }}if(!this.callbacks[t]){ throw new Error("Tried to add a scroll monitor listener of type "+t+". Your options are: "+w.join(", ")); }this.callbacks[t].push({callback:e,isOne:i||!1});},off:function(t,e){
var this$1 = this;
if(!this.callbacks[t]){ throw new Error("Tried to remove a scroll monitor listener of type "+t+". Your options are: "+w.join(", ")); }for(var i,o=0;i=this.callbacks[t][o];o++){ if(i.callback===e){this$1.callbacks[t].splice(o,1);break} }},one:function(t,e){this.on(t,e,!0);},recalculateSize:function(){this.height=this.watchItem.offsetHeight+this.offsets.top+this.offsets.bottom,this.bottom=this.top+this.height;},update:function(){this.isAboveViewport=this.top<this.container.viewportTop,this.isBelowViewport=this.bottom>this.container.viewportBottom,this.isInViewport=this.top<this.container.viewportBottom&&this.bottom>this.container.viewportTop,this.isFullyInViewport=this.top>=this.container.viewportTop&&this.bottom<=this.container.viewportBottom||this.isAboveViewport&&this.isBelowViewport;},destroy:function(){var t=this.container.watchers.indexOf(this),e=this;this.container.watchers.splice(t,1);for(var i=0,o=w.length;i<o;i++){ e.callbacks[w[i]].length=0; }},lock:function(){this.locked=!0;},unlock:function(){this.locked=!1;}};for(var d=function(t){return function(e,i){this.on.call(this,t,e,i);}},f=0,m=w.length;f<m;f++){var v=w[f];o.prototype[v]=d(v);}t.exports=o;}])});

});

// ┌──────────────────────────┐
// │ Emit View Toggle Intents │
// └──────────────────────────┘
// emit toggle button clicks

/**
 * Locates layer control input nodes. Binds user input to bus event.
 */
var bindLayerToggles = function () {
  findElements('.js-layer-toggle').forEach(function (btn) {
    add$1(btn, 'click', toggleLayer);
  });
  function toggleLayer (e) {
    bus.emit('layers:draw');
  }
};

/**
 * Locates layer panel controller. Binds user input to bus event.
 */
var bindLayerControllers = function () {
  findElements('.js-layer-control').forEach(function (btn) {
    add$1(btn, 'click', toggleControl);
  });
  function toggleControl (e) {
    e.preventDefault();
    bus.emit('layer:control');
  }
};

/**
 * Locates app view controller. Binds user input to bus event.
 */
var bindViewController = function () {
  findElements('.js-view-control').forEach(function (btn) {
    add$1(btn, 'click', translateView);
  });
  function translateView (e) {
    e.preventDefault();
    var panel = e.target.getAttribute('data-panel');
    bus.emit("set:view", panel);
  }
};

/**
 * Locates pop up closing buttons. Binds user input to bus event.
 */
var bindPopUpClosers = function () {
  findElements('.js-close-popup').forEach(function (btn) {
    add$1(btn, 'click', closePopUp);
  });
  function closePopUp (e) {
    e.preventDefault();
    bus.emit('popup:close');
  }
};

// ┌──────────────────────┐
// │ Emit Keyboard Events │
// └──────────────────────┘
// emit presses of escape and return keys
// this would be 'bind:keyup'

/**
 * Adds listenrs to keyup, binds interesting keyups to bus events.
 */
var bindKeyup = function () {
  add$1(document, 'keyup', translateKeypress);
  function translateKeypress (e) {
    if (e.keyCode === 27) {
      bus.emit('keyboard:escape');
    } else if (e.keyCode === 13) {
      bus.emit('keyboard:return');
    } else if (e.keyCode === 32) {
      bus.emit('keyboard:space');
    } else if (e.keyCode === 38) {
      bus.emit('keyboard:arrow:up');
    } else if (e.keyCode === 40) {
      bus.emit('keyboard:arrow:down');
    } else if (e.keyCode === 37) {
      bus.emit('keyboard:arrow:left');
    } else if (e.keyCode === 39) {
      bus.emit('keyboard:arrow:right');
    } else if (e.keyCode === 9) {
      bus.emit('keyboard:tab');
    }

  }
};

/**
 * Emits type resizing events on window resize.
 */
var bindWindowResize = function () {
  window.onresize = didResize;
  var textPane = document.querySelector('.js-text-area');
  function didResize () {
    var width = textPane.offsetWidth;
    if (width > 785) {
      bus.emit("type:size", 'large');
    } else if (width > 599) {
      bus.emit("type:size", 'medium');
    } else if (width < 600) {
      bus.emit("type:size", 'small');
    }
  }
};

/**
 * Emits events for binding intent controllers.
 */
var bindIntents = function () {
  bus.emit('bind:layer:toggles');
  bus.emit('bind:layer:controllers');
  bus.emit('bind:view:controller');
  bus.emit('bind:scroll:watcher');
  bus.emit('bind:popup:closers');
  bus.emit('bind:keyup');
  bus.emit('bind:window:resize');
};

/**
 * Sets listeners for binding intents on bus events.
 * Emits event to bind all intent listeners.
 */
var intent = function () {
  bus.on('bind:layer:toggles', bindLayerToggles);
  bus.on('bind:layer:controllers', bindLayerControllers);
  // bus.on('bind:scroll:watcher', bindScrollWatcher);
  bus.on('bind:view:controller', bindViewController);
  bus.on('bind:popup:closers', bindPopUpClosers);
  bus.on('bind:keyup', bindKeyup);
  bus.on('bind:window:resize', bindWindowResize);
  bus.on('bind:intent', bindIntents);

  bus.emit('bind:intent');
};

function getOffsetTop( elem )
{
    var offsetTop = 0;
    do {
      if ( !isNaN( elem.offsetTop ) )
      {
          offsetTop += elem.offsetTop;
      }
    } while( elem = elem.offsetParent );
    return offsetTop;
}

// easing functions http://goo.gl/5HLl8
Math.easeInOutQuad = function (t, b, c, d) {
  t /= d/2;
  if (t < 1) {
    return c/2*t*t + b
  }
  t--;
  return -c/2 * (t*(t-2) - 1) + b;
};

Math.easeInCubic = function(t, b, c, d) {
  var tc = (t/=d)*t*t;
  return b+c*(tc);
};

Math.inOutQuintic = function(t, b, c, d) {
  var ts = (t/=d)*t,
  tc = ts*t;
  return b+c*(6*tc*ts + -15*ts*ts + 10*tc);
};

// requestAnimationFrame for Smart Animating http://goo.gl/sx5sts
var requestAnimFrame = (function(){
  return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function( callback ){ window.setTimeout(callback, 1000 / 60); };
})();

var scrollTo = function (node, to, callback, duration) {
  // because it's so fucking difficult to detect the scrolling element, just move them all
  function move(amount) {
    node.scrollTop = amount;
  }
  function position() {
    return node.scrollTop;
  }
  var start = position(),
    change = to - start,
    currentTime = 0,
    increment = 20;
  duration = (typeof(duration) === 'undefined') ? 500 : duration;
  var animateScroll = function() {
    // increment the time
    currentTime += increment;
    // find the value with the quadratic in-out easing function
    var val = Math.easeInOutQuad(currentTime, start, change, duration);
    // move the document.body
    move(val);
    // do the animation unless its over
    if (currentTime < duration) {
      requestAnimFrame(animateScroll);
    } else {
      if (callback && typeof(callback) === 'function') {
        // the animation is done so lets callback
        callback();
      }
    }
  };
  animateScroll();
};

var bind = function (node) {
  if ( node === void 0 ) node = document;

  var contentArea = document.querySelector('.js-text-area');
  var anchors = Array.apply(void 0, node.querySelectorAll('a'));
  var internals = anchors.filter(function (a) { return a.attributes.href.value.charAt(0) == '#'; });
  internals.forEach(function (a) {
    var id = a.attributes.href.value;
    a.addEventListener('click', function (e) {
      e.preventDefault();
      console.log(id);
      var node = document.querySelector(id);
      var position = getOffsetTop(node) - 60;
      scrollTo(contentArea, position);
    });
  });
};

// import responsiveType from './responsive-type.js';

/**
 * Renders the HTML for a popup, given a click event on a leaflet feature and a popup template
 * Places rendered popip html in DOM Node with the 'js-pop-up' class.
 *
 * @param {Event} Leaflet feature click event
 * @param {Function} Render template function from `./layers.hs`
 */
var handlePopUp = function (evt, renderTemplate) {

  var popUpContainer = document.querySelector('.js-pop-up');
  var popUpTemplate = document.querySelector('.js-template');
  var buttons = popUpContainer.querySelectorAll('.js-multiple-popups');
  buttons.forEach(function (node) {
    console.log('remove plz?');
    node.remove();
  });
  console.log(popUpContainer.querySelectorAll('.js-multiple-popups'));

  add(popUpContainer, 'is-active');
  evt.feature
    ? popUpTemplate.innerHTML = renderTemplate(evt.feature.properties)
    : popUpTemplate.innerHTML = renderTemplate(evt.features[0].properties);
  bind(popUpTemplate);
};


var handlePopUpMultiple = function (targets, template, layer) {
  var popUpContainer = document.querySelector('.js-pop-up');
  var popUpTemplate = document.querySelector('.js-template');

  var buttons = popUpContainer.querySelectorAll('.js-multiple-popups');
  buttons.forEach(function (node) {
    node.remove();
  });

  popUpContainer.classList.add('has-multiple');
  console.log('make some buttons');
  popUpTemplate.insertAdjacentHTML('beforebegin', ("\n    <div class=\"popup-buttons js-multiple-popups\" data-feature=" + (targets.length - 1) + ">\n      <button class=\"js-prev-popup pt6\">←</button>\n      <button class=\"js-next-popup pt6\"> →</button>\n    </div>\n  "));

  var popups = targets.map(function (target) { return template(target.feature.properties); });
  var prev = popUpContainer.querySelector(".js-prev-popup");
  var next = popUpContainer.querySelector(".js-next-popup");
  var state = popUpContainer.querySelector(".js-multiple-popups");

  prev.addEventListener('click', function (e) {
    e.preventDefault();
    var current = parseInt(state.getAttribute("data-feature"));
    var newState;
    current - 1 < 0
      ? newState = targets.length - 1
      : newState = current - 1;
    state.setAttribute("data-feature", newState);
    layer.features.resetStyle();
    popUpTemplate.innerHTML = popups[newState];
    targets[newState].setStyle({
      lineCap: 'round',
      weight: 24,
      color: '#98CBCC'
    });
  });

  next.addEventListener('click', function (e) {
    e.preventDefault();
    var current = parseInt(state.getAttribute("data-feature"));
    var newState;
    current + 1 > targets.length - 1
      ? newState = 0
      : newState = current + 1;
    state.setAttribute("data-feature", newState);
    layer.features.resetStyle();
    popUpTemplate.innerHTML = popups[newState];
    targets[newState].setStyle({
      lineCap: 'round',
      weight: 24,
      color: '#98CBCC'
    });
  });
};

/**
 * Removes `is-active` class from pop node.
 * Emits event on bus.
 *
 * @param {Event} Leaflet feature click event
 * @param {Function} Render template function from `./layers.hs`
 */
var closePopUp = function () {
  var popUpContainer = document.querySelector('.js-pop-up');
  var buttons = popUpContainer.querySelectorAll('.js-multiple-popups');
  buttons.forEach(function (node) {
    node.remove();
  });
  remove(popUpContainer, 'is-active');
  bus.emit('popup:closed');
};

/**
 * Adds panel view class to panel container DOM nodel
 *
 * @param {String} `map`, `text`, or `split`
 */
var setToPanel = function (panel) {
  var panelContainer = document.querySelector('.js-panels');
  if (has(panelContainer, "text-is-active")) {
    remove(panelContainer, "text-is-active");
  }
  if (has(panelContainer, "map-is-active")) {
    remove(panelContainer, "map-is-active");
  }
  if (has(panelContainer, "split-is-active")) {
    remove(panelContainer, "split-is-active");
  }
  add(panelContainer, (panel + "-is-active"));
  if (panel === 'map' | panel === 'split') {
    // bus.emit('map:redraw');
    delayRedrawMap();
  }
  // responsiveType();
};

/**
 * Sets URL to reflect panel view.
 *
 * @param {String} `map`, `text`, or `split`
 */
var setLocation = function (panel) {
  if (panel === 'split') {
    panel = '/';
  }
  if (window.history.replaceState) {
    window.history.replaceState(null, null, panel);
  }
};

/**
 * Shows or hides the layer control panel
 */
var toggleControl = function () {
  var controlPanel = document.querySelector('.js-layer-control-panel');
  var controlButton = document.querySelector('.js-layer-control');
  toggle(controlPanel, 'is-active');
  toggle(controlButton, 'is-active');
};

/**
 * Hides the layer control panel
 */
var closeControl = function () {
  // let controlPanel = document.querySelector('.js-layer-control-panel');
  // if (classy.has(controlPanel, 'is-active')) {
  //   classy.remove(controlPanel, 'is-active');
  // }
};

/**
 * Emits a map redraw event on the bus.
 */
var delayRedrawMap = function () {
  setTimeout(function() {
    bus.emit('map:redraw');
  }, 300);
};

var viewLoaded = function () {
  remove(document.querySelector('html'), 'is-loading');
};

/**
 * Binds event listeners for view functions.
 */
var view = function () {
  bus.on('set:view', setToPanel);
  bus.on('set:view', setLocation);
  // bus.on('set:view', delayRedrawMap);
  bus.on('layer:control', toggleControl);
  bus.on('keyboard:escape', closeControl);
  bus.on('keyboard:escape', closePopUp);
  bus.on('popup:opened', handlePopUp);
  bus.on('popup:nested', handlePopUpMultiple);
  bus.on('popup:close', closePopUp);
  bus.on('popup:leafletclosed', closePopUp);
  // bus.on('type:size', sizeTextTo);
  bus.on('routing:done', viewLoaded);
};

var acronym = {
  'Design': {
    'CIMS': 'Civic Main Streets',
    'NMS': 'Neighborhood Main Streets',
    'CIC': 'Civic Corridors',
    'NC': 'Neighborhood Corridors',
    'RC': 'Regional Corridors',
    'CC': 'Community Corridors',
    'UT': 'Urban Throughways',
    'IR': 'Industrial Roads',
    'EGC': 'Enhanced Greenway Corridors',
    'GS': 'Greenscape Streets',
    'LS': 'Local Streets',
    'N/A': 'No Class',
    'UNK': 'Unknown'
  },
  'Bicycle': {
    'MCB': 'Major City Bikeways',
    'CB': 'City Bikeways',
    'LS': 'Local Service Bikeways',
    'BD': 'Bicycle Districts',
    'OSP': 'Off-Street Paths',
    'N/A': 'No Class',
    'UNK': 'Unknown'
  },
  'Transit': {
    'RT': 'Regional Transitways',
    'RTMTP': 'Major Transit Priority Streets',
    'MTP': 'Major Transit Priority Streets',
    'TA': 'Transit Access Streets',
    'LS': 'Local Service Transit Streets',
    'IPR': 'Intercity Passenger Rail',
    'N/A': 'No Class',
    'UNK': 'Unknown'
  },
  'Traffic': {
    'RTMCT': 'Regional Trafficways',
    'MCT': 'Major City Traffic Streets',
    'TA': 'Traffic Access Streets',
    'DC': 'District Collectors',
    'NC': 'Neighborhood Collectors',
    'LS': 'Local Service Traffic Streets',
    'N/A': 'No Class',
    'UNK': 'Unknown'
  },
  'Emergency': {
    'MAJ': 'Major Emergency Response Streets',
    'MIN': 'Minor Emergency Response Streets',
    'PRIMARY': 'Secondary Emergency Response Streets',
    'SECOND': 'Secondary Emergency Response Streets',
    'N/A': 'No Class',
    'UNK': 'Unknown'
  },
  'Pedestrian': {
    'PD': 'Pedestrian Districts',
    'CCTP': 'Pedestrian-Transit Streets',
    'CW': 'City Walkways',
    'OSP': 'Off-Street Paths',
    'LS': 'Local Service Walkways',
    'N/A': 'No Class',
    'UNK': 'Unknown'
  },
  'Freight': {
    'RT': 'Regional Truckways',
    'PT': 'Priority Truck Streets',
    'MT': 'Major Truck Streets',
    'TA': 'Truck Access Streets',
    'LS': 'Local Service Truck Streets',
    'FD': 'Freight Districts',
    'RML': 'Railroad Main Lines',
    'RBL': 'Railroad Branch Lines',
    'FF': 'Freight Facilities',
    'N/A': 'No Class',
    'UNK': 'Unknown'
  },
};

/**
 * Composes an HTML pop-up template that is displayed on feature clicks.
 * This one is for the Street classification layers, where the user wishes
 * to see current classification, and proposed classification.
 *
 * @param {String} The column in the GIS layer that maps to current classification.
 * @param {String} The column in the GIS layer that maps to proposed classification.
 * @returns {String} The rendered HTML string for the popup.
 */

var popupRenderer = function (current, proposed) {
  console.log(current, proposed);
  return function (feature) {
    console.debug("feature:", feature);
    console.debug("current:", current);
    return ("\n      <h5 class=\"flush-top\">\n        " + (feature.StreetName) + "\n      </h5>\n      <table class=\"flush-bottom lead-top\">\n        <tbody>\n          <tr>\n            <td>" + current + " Class:</td>\n            <td><a href=\"#" + (acronym[current][feature[current]] ? acronym[current][feature[current]].replace(/ /g, '-').toLowerCase() :
            '') + "\">" + (feature[current]) + "</a></td>\n          </tr>\n        </tbody>\n      </table>\n      <p class=\"lead-top\">\n        <b>" + (feature[current]) + ":</b>\n        <a href=\"#" + (acronym[current][feature[current]] ? acronym[current][feature[current]].replace(/ /g, '-').toLowerCase() : '') + "\">" + (acronym[current][feature[current]]) + "</a>\n      </p>\n    ");
  };
};

/**
 * Composes an HTML pop-up template that is displayed on feature clicks.
 * This one is for the Street classification layers, where the user wishes
 * to see current classification, and proposed classification.
 *
 * @param {String} The column in the GIS layer that maps to current classification.
 * @param {String} The column in the GIS layer that maps to proposed classification.
 * @returns {String} The rendered HTML string for the popup.
 */

var popupDistricts = function (current, acr) {
  return function (feature) {

    console.log(feature);
    console.log(current);
    return ("\n      <h5 class=\"flush-top\">\n        " + current + " District\n      </h5>\n      <table class=\"flush-bottom lead-top\">\n        <tbody>\n          <tr>\n            <td><a href=\"#" + (current.replace(/ /g, '-').toLowerCase()) + "-districts\">" + current + " Districts</a></td>\n          </tr>\n        </tbody>\n      </table>\n    ");
  };
};

var numberWithCommas = function (x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
};

/**
 * Composes an HTML pop-up template that is displayed on feature clicks.
 * This one is for the Street classification layers, where the user wishes
 * to see current classification, and proposed classification.
 *
 * @param {String} The column in the GIS layer that maps to current classification.
 * @param {String} The column in the GIS layer that maps to proposed classification.
 * @returns {String} The rendered HTML string for the popup.
 */

var popupProject = function (current, proposed) {
  return function (feature) {
    return ("\n      <h5 class=\"flush-top\">\n        " + (feature.ProjectName) + "\n      </h5>\n      <p> " + (feature.ProjectDescription) + " </p>\n      <table class=\"lead-bottom lead-top\">\n        <tbody>\n          <tr>\n            <td>Status</td>\n            <td>" + (feature.ProjectStatus) + "</td>\n          </tr>\n          <tr>\n            <td>Lead Agency</td>\n            <td>" + (feature.LeadAgency) + "</td>\n          </tr>\n          <tr>\n            <td>Estimated Cost</td>\n            <td>$" + (numberWithCommas(feature.EstimatedCost)) + "</td>\n          </tr>\n          <tr>\n            <td>Estimated Time Frame</td>\n            <td>" + (feature.EstimatedTimeframe) + "</td>\n          </tr>\n        </tbody>\n      </table>\n      <p>Project Number: " + (feature.ProjectNumber) + "</p>\n    ");
  };
};

/**
 * Composes an HTML pop-up template that is displayed on feature clicks.
 * This one is for the Street classification layers, where the user wishes
 * to see current classification, and proposed classification.
 *
 * @param {String} The column in the GIS layer that maps to current classification.
 * @param {String} The column in the GIS layer that maps to proposed classification.
 * @returns {String} The rendered HTML string for the popup.
 */

var popupZoning = function (current, proposed) {
  return function (feature) {
    console.log(feature);
    return ("\n      <h5 class=\"flush-top\">\n        " + (feature.CMP) + "\n      </h5>\n      <p class=\"flush-bottom\">\n        <b>Zone:</b>\n        " + (feature.CMP_DESC) + "\n      </p>\n      <p>\n        <b>Overlay:</b>\n        " + (feature.OVRLY_DESC || 'None') + "\n      </p>\n      <p class=\"lead-bottom\">\n\n      </p>\n    ");
  };
};

/**
 * Composes an HTML pop-up template that is displayed on feature clicks.
 * This one is for the Street classification layers, where the user wishes
 * to see current classification, and proposed classification.
 *
 * @param {String} The column in the GIS layer that maps to current classification.
 * @param {String} The column in the GIS layer that maps to proposed classification.
 * @returns {String} The rendered HTML string for the popup.
 */

var popupTaxlots = function (current, proposed) {
  return function (feature) {
    console.log(feature);
    return ("\n      <h5 class=\"flush-top\">\n        " + (feature.SITEADDR) + "\n      </h5>\n    ");
  };
};

/**
 * Composes an HTML pop-up template that is displayed on feature clicks.
 * This one is for the Street classification layers, where the user wishes
 * to see current classification, and proposed classification.
 *
 * @param {String} The column in the GIS layer that maps to current classification.
 * @param {String} The column in the GIS layer that maps to proposed classification.
 * @returns {String} The rendered HTML string for the popup.
 */

var popupCenters = function (current, proposed) {
  return function (feature) {
    return ("\n      <h5 class=\"flush-top\">\n        " + (feature.NAME) + "\n      </h5>\n    ");
  };
};

/**
 * Composes an HTML pop-up template that is displayed on feature clicks.
 * This one is for the Street classification layers, where the user wishes
 * to see current classification, and proposed classification.
 *
 * @param {String} The column in the GIS layer that maps to current classification.
 * @param {String} The column in the GIS layer that maps to proposed classification.
 * @returns {String} The rendered HTML string for the popup.
 */

var popupCorridors = function (current, proposed) {
  return function (feature) {
    return ("\n      <h5 class=\"flush-top\">\n        " + (feature.LOCATION) + "\n      </h5>\n    ");
  };
};

// this file just maps GIS data layers to their popups, and gives them a reference handle
// so they can be got at by the map app
/**
 * @property {object} designClassifications          - Object for GIS layer
 * @property {number} designClassifications.features - Esri Leaflet Feature Layer
 * @property {string} designClassifications.popup    - Rendered HTML string of desired popup.
 */
var Design = {
  features: window.L.esri.dynamicMapLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer',
    layers: [10]
  }),
  pane: 'top',
};
var DesignFeatures = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/10',
    pane: 'top',
    minZoom: 15
  }),
  pane: 'top',
  popup: popupRenderer('Design')
};

/**
 * @property {object} bicycleClassifications          - Object for GIS layer
 * @property {number} bicycleClassifications.features - Esri Leaflet Feature Layer
 * @property {string} bicycleClassifications.popup    - Rendered HTML string of desired popup.
 */
var BicycleClassifications = {
  features: window.L.esri.dynamicMapLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer',
    layers: [12]
  })
};
var BicycleFeatures = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/12',
    pane: 'top',
    minZoom: 15
  }),
  pane: 'top',
  popup: popupRenderer('Bicycle')
};
var BicycleDistricts = {
  features: window.L.esri.dynamicMapLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer',
    layers: [13],
    style: function (feature) { return ({fillOpacity: 0.5}); }
  })
};
var BicycleDistrictFeatures = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/13',
    pane: 'bottom',
    minZoom: 15
  }),
  pane: 'bottom',
  popup: popupDistricts('Bicycle')
};
/**
 * @property {object} transitClassifications          - Object for GIS layer
 * @property {number} transitClassifications.features - Esri Leaflet Feature Layer
 * @property {string} transitClassifications.popup    - Rendered HTML string of desired popup.
 */
var Transit = {
  features: window.L.esri.dynamicMapLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer',
    layers: [3]
  }),
  pane: 'top',
  // popup: popupRenderer('Transit')
};
var TransitFeatures = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/3',
    pane: 'top',
    minZoom: 15
  }),
  pane: 'top',
  popup: popupRenderer('Transit')
};
/**
 * @property {object} trafficClassifications          - Object for GIS layer
 * @property {number} trafficClassifications.features - Esri Leaflet Feature Layer
 * @property {string} trafficClassifications.popup    - Rendered HTML string of desired popup.
 */
var Traffic = {
  features: window.L.esri.dynamicMapLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer',
    layers: [4]
  }),
  pane: 'top',
};
var TrafficFeatures = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/4',
    pane: 'top',
    minZoom: 15
  }),
  pane: 'top',
  popup: popupRenderer('Traffic')
};
/**
 * @property {object} emergencyClassifications          - Object for GIS layer
 * @property {number} emergencyClassifications.features - Esri Leaflet Feature Layer
 * @property {string} emergencyClassifications.popup    - Rendered HTML string of desired popup.
 */
var Emergency = {
  features: window.L.esri.dynamicMapLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer',
    layers: [7]
  }),
  pane: 'top',
  // popup: popupRenderer('Emergency')
};
var EmergencyFeatures = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/7',
    pane: 'top',
    minZoom: 15
  }),
  pane: 'top',
  popup: popupRenderer('Emergency')
};
/**
 * @property {object} pedestrianClassifications          - Object for GIS layer
 * @property {number} pedestrianClassifications.features - Esri Leaflet Feature Layer
 * @property {string} pedestrianClassifications.popup    - Rendered HTML string of desired popup.
 */
var PedestrianClassifications = {
  features: window.L.esri.dynamicMapLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer',
    layers: [15],
    pane: 'top'
  }),
  pane: 'top',
  // popup: popupRenderer('Pedestrian')
};
var PedestrianFeatures = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/15',
    pane: 'top',
    minZoom: 15
  }),
  pane: 'top',
  popup: popupRenderer('Pedestrian')
};
var PedestrianDistricts = {
  features: window.L.esri.dynamicMapLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer',
    layers: [16],
    pane: 'bottom',
    style: function (feature) { return ({fillOpacity: 0.5}); }
  }),
  pane: 'bottom',
  // popup: popupDistricts('Pedestrian', 'PD')
};
var PedestrianDistrictFeatures = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/16',
    pane: 'bottom',
    minZoom: 15
  }),
  pane: 'bottom',
  popup: popupDistricts('Pedestrian`')
};
/**
 * @property {object} freightClassifications          - Object for GIS layer
 * @property {number} freightClassifications.features - Esri Leaflet Feature Layer
 * @property {string} freightClassifications.popup    - Rendered HTML string of desired popup.
 */
var FreightClassifications = {
  features: window.L.esri.dynamicMapLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer',
    layers: [19]
  }),
  // popup: popupRenderer('Freight')
};
var FreightFeatures = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/19',
    pane: 'top',
    minZoom: 15
  }),
  pane: 'top',
  popup: popupRenderer('Freight')
};
var FreightDistricts = {
  features: window.L.esri.dynamicMapLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer',
    layers: [20],
    style: function (feature) { return ({fillOpacity: 0.5}); }
  }),
  popup: popupDistricts('Freight', 'FD')
};
var FreightDistrictFeatures = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/20',
    pane: 'bottom',
    minZoom: 15
  }),
  pane: 'bottom',
  popup: popupDistricts('Freight')
};
var FreightFacilities = {
  features: window.L.esri.dynamicMapLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer',
    layers: [18]
  }),
  // popup: popupRenderer('Freight')
};
var FreightFacillitiesFeatures = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/18',
    pane: 'top',
    minZoom: 15
  }),
  pane: 'top',
  popup: popupRenderer('Freight')
};
/**
 * @property {object} projectPoints          - Object for GIS layer
 * @property {number} projectPoints.features - Esri Leaflet Feature Layer
 * @property {string} projectPoints.popup    - Rendered HTML string of desired popup.
 */
var ProjectPoints = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/22',
    pane: 'top'
  }),
  pane: 'top',
  popup: popupProject('foo', 'bar')
};
var ProjectPointsTen = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/22',
    pane: 'top',
    where: "EstimatedTimeframe = '1-10_YRS'",
  }),
  pane: 'top',
  popup: popupProject('foo', 'bar')
};
var ProjectPointsTwenty = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/22',
    pane: 'top',
    where: "EstimatedTimeframe = '11-20_YRS'",
  }),
  pane: 'top',
  popup: popupProject('foo', 'bar')
};
var ProjectPointsOther = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/22',
    pane: 'top',
    where: "EstimatedTimeframe = 'NA'",
  }),
  pane: 'top',
  popup: popupProject('foo', 'bar')
};
/**
 * @property {object} projectLines          - Object for GIS layer
 * @property {number} projectLines.features - Esri Leaflet Feature Layer
 * @property {string} projectLines.popup    - Rendered HTML string of desired popup.
 */
var ProjectLines = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/23',
    pane: 'top'
  }),
  pane: 'top',
  popup: popupProject('foo', 'bar')
};
var ProjectLinesTen = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/23',
    pane: 'top',
    where: "EstimatedTimeframe = '1-10_YRS'",
  }),
  pane: 'top',
  popup: popupProject('foo', 'bar')
};
var ProjectLinesTwenty = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/23',
    pane: 'top',
    where: "EstimatedTimeframe = '11-20_YRS'",
  }),
  pane: 'top',
  popup: popupProject('foo', 'bar')
};
var ProjectLinesOther = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/23',
    pane: 'top',
    where: "EstimatedTimeframe = 'NA'",
  }),
  pane: 'top',
  popup: popupProject('foo', 'bar')
};
/**
 * @property {object} projectPolygons          - Object for GIS layer
 * @property {number} projectPolygons.features - Esri Leaflet Feature Layer
 * @property {string} projectPolygons.popup    - Rendered HTML string of desired popup.
 */
var ProjectPolygons = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/24',
    pane: 'bottom',
    style: function (feature) { return ({fillOpacity: 0.2}); }
  }),
  pane: 'bottom',
  popup: popupProject('foo', 'bar')
};
var ProjectPolygonsTen = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/24',
    pane: 'bottom',
    where: "EstimatedTimeframe = '1-10_YRS'",
    style: function (feature) { return ({fillOpacity: 0.2}); }
  }),
  pane: 'bottom',
  popup: popupProject('foo', 'bar')
};
var ProjectPolygonsTwenty = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/24',
    pane: 'bottom',
    where: "EstimatedTimeframe = '11-20_YRS'",
    style: function (feature) { return ({fillOpacity: 0.2}); }
  }),
  pane: 'bottom',
  popup: popupProject('foo', 'bar')
};
var ProjectPolygonsOther = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Transportation_System_Plan/MapServer/24',
    pane: 'bottom',
    where: "EstimatedTimeframe = 'NA'",
    style: function (feature) { return ({fillOpacity: 0.2}); }
  }),
  pane: 'bottom',
  popup: popupProject('foo', 'bar')
};
var bikeProgram = {
  features: window.L.esri.featureLayer({
    url: 'https://services.arcgis.com/quVN97tn06YNGj9s/arcgis/rest/services/TSPBikePrograms_temp_2018_03_15/FeatureServer/0',
    pane: 'bottom'
  }),
  popup: popupProject('foo', 'bar')
};

var greenwayProgram = {
  features: window.L.esri.featureLayer({
    url: 'https://services.arcgis.com/quVN97tn06YNGj9s/arcgis/rest/services/TSPBikePrograms_temp_2018_03_15/FeatureServer/1',
    pane: 'bottom'
  }),
  popup: popupProject('foo', 'bar')
};

var taxlots = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Basemap_Color/MapServer/8',
    pane: 'bottom',
    style: function (feature) { return ({fillOpacity: 0.2}); }
  }),
  popup: popupTaxlots('foo', 'bar')
};

var zoning = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/Zoning/MapServer/0',
    // url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_ReadOnly/MapServer/39',
    pane: 'bottom',
    style: function (feature) { return ({fillOpacity: 0.2}); }
  }),
  popup: popupZoning('foo', 'bar')
};


var centers = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_Thematic_Layers/MapServer/46',
    pane: 'bottom',
    style: function (feature) { return ({fillOpacity: 0.2}); }
  }),
  popup: popupCenters('foo', 'bar')
};
var corridors = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_Thematic_Layers/MapServer/44',
    pane: 'bottom'
  }),
  popup: popupCorridors('foo', 'bar')
};

var centersRegional = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_Thematic_Layers/MapServer/2',
    pane: 'bottom'
  }),
  popup: popupProject('foo', 'bar')
};
var centersTown = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_Thematic_Layers/MapServer/3',
    pane: 'bottom'
  }),
  popup: popupProject('foo', 'bar')
};
var centersNeighborhood = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_Thematic_Layers/MapServer/4',
    pane: 'bottom'
  }),
  popup: popupProject('foo', 'bar')
};
var corridorsCivic = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_Thematic_Layers/MapServer/5',
    pane: 'bottom'
  }),
  popup: popupProject('foo', 'bar')
};
var corridorsNeighborhood = {
  features: window.L.esri.featureLayer({
    url: 'https://www.portlandmaps.com/arcgis/rest/services/Public/BPS_Thematic_Layers/MapServer/6',
    pane: 'bottom'
  }),
  popup: popupProject('foo', 'bar')
};

var layers = Object.freeze({
	Design: Design,
	DesignFeatures: DesignFeatures,
	BicycleClassifications: BicycleClassifications,
	BicycleFeatures: BicycleFeatures,
	BicycleDistricts: BicycleDistricts,
	BicycleDistrictFeatures: BicycleDistrictFeatures,
	Transit: Transit,
	TransitFeatures: TransitFeatures,
	Traffic: Traffic,
	TrafficFeatures: TrafficFeatures,
	Emergency: Emergency,
	EmergencyFeatures: EmergencyFeatures,
	PedestrianClassifications: PedestrianClassifications,
	PedestrianFeatures: PedestrianFeatures,
	PedestrianDistricts: PedestrianDistricts,
	PedestrianDistrictFeatures: PedestrianDistrictFeatures,
	FreightClassifications: FreightClassifications,
	FreightFeatures: FreightFeatures,
	FreightDistricts: FreightDistricts,
	FreightDistrictFeatures: FreightDistrictFeatures,
	FreightFacilities: FreightFacilities,
	FreightFacillitiesFeatures: FreightFacillitiesFeatures,
	ProjectPoints: ProjectPoints,
	ProjectPointsTen: ProjectPointsTen,
	ProjectPointsTwenty: ProjectPointsTwenty,
	ProjectPointsOther: ProjectPointsOther,
	ProjectLines: ProjectLines,
	ProjectLinesTen: ProjectLinesTen,
	ProjectLinesTwenty: ProjectLinesTwenty,
	ProjectLinesOther: ProjectLinesOther,
	ProjectPolygons: ProjectPolygons,
	ProjectPolygonsTen: ProjectPolygonsTen,
	ProjectPolygonsTwenty: ProjectPolygonsTwenty,
	ProjectPolygonsOther: ProjectPolygonsOther,
	bikeProgram: bikeProgram,
	greenwayProgram: greenwayProgram,
	taxlots: taxlots,
	zoning: zoning,
	centers: centers,
	corridors: corridors,
	centersRegional: centersRegional,
	centersTown: centersTown,
	centersNeighborhood: centersNeighborhood,
	corridorsCivic: corridorsCivic,
	corridorsNeighborhood: corridorsNeighborhood
});

var initial = {
  center: [45.528, -122.63],
  zoom: 12
};

var ZoomMin = L.Control.Zoom.extend({
  options: {
    position: "topright",
    zoomInText: "+",
    zoomInTitle: "Zoom in",
    zoomOutText: "-",
    zoomOutTitle: "Zoom out",
    zoomMinText: "Zoom min",
    zoomMinTitle: "Zoom min"
  },

  onAdd: function (map) {
    var zoomName = "leaflet-control-zoom"
      , container = L.DomUtil.create("div", zoomName + " leaflet-bar")
      , options = this.options;

    this._map = map;

    this._zoomInButton = this._createButton(options.zoomInText, options.zoomInTitle,
     zoomName + '-in', container, this._zoomIn, this);

    this._zoomOutButton = this._createButton(options.zoomOutText, options.zoomOutTitle,
     zoomName + '-out', container, this._zoomOut, this);

    this._zoomMinButton = this._createButton(options.zoomMinText, options.zoomMinTitle,
     zoomName + '-min', container, this._zoomMin, this);


    return container
  },

  _zoomMin: function () {
    this._map.flyTo(initial.center, initial.zoom);
  }
});

// this stuff is statefull.
var map;
var position = {
  center: [45.528, -122.63],
  zoom: 12
};



/**
 * Interacts with the Esri Leaflet API to draw a map in the dom Node with an id of 'map'
 */

var drawMap = function () {

  map = window.L.map('map', {
    trackResize: true,
    center: position.center,
    minZoom: 12,
    zoom: position.zoom,
    zoomControl: false,
    scrollWheelZoom: true
  });

  window.map = map;

  map.createPane('bottom');
  map.createPane('top');

  window.L.esri.basemapLayer("Gray").addTo(map);

  // stateful side effects!!
  map.on('moveend', function () {
    position.center = map.getCenter();
    position.zoom = map.getZoom();
  });
  createGeocoder();
};

/**
 * Adds a Geocoding widget to the map, if the map exists.
 */

var createGeocoder = function () {
  // map.addControl(window.L.control.zoom({position: 'topright'}));
  map.addControl(new ZoomMin);

  var pdxGeocoder = window.L.esri.Geocoding.geocodeServiceProvider({
    url: 'https://www.portlandmaps.com/locator/Default/GeocodeServer'
  });

  var searchControl = L.esri.Geocoding.geosearch({
    // providers: [pdxGeocoder],
    position: 'topright',
    zoomToResult: true,
    allowMultipleResults: false,
    searchBounds: L.latLngBounds([[45.6574694,-122.8695448],[45.3309588,-122.4284356]])
  }).addTo(map);
  var results = L.layerGroup().addTo(map);
  searchControl.on('results', function(data){
    results.clearLayers();
    results.addLayer(L.marker(data.results[0].latlng));
    map.setZoom(0);
    position.zoom = 0;
  });

};

/**
 * Locates all layer toggle elements currently checked.
 *
 * @returns {NodeList} NodeList of active input elements.
 */

var getActiveLayers = function () {
  var activeLayers = findElements('.js-layer-toggle').filter(function (toggle$$1) {
    return toggle$$1.checked;
  });
  return activeLayers;
};

/**
 * Locates all layer toggle elements which are not currently checked.
 *
 * @returns {NodeList} NodeList of inactive input elements.
 */
var getInactiveLayers = function () {
  var inactiveLayers = findElements('.js-layer-toggle').filter(function (toggle$$1) {
    return !toggle$$1.checked;
  });
  return inactiveLayers;
};

/**
 * Adds a set of layers from './layers.js' to the map.
 *
 * @param {String} Comma seperated string of layer names. eg "projectPoints, projectLines"
 */
var addLayers = function (layerSet) {
  if (!layerSet) { return; }
  layerSet = layerSet.replace(/ /g, '');
  layerSet.split(',').forEach(function (layer) { return addLayer(layer); });
};


var getFeaturesAtPoint = function (coords, layer) {
  layer.features.query().nearby(coords, 10).ids(function (error, ids) {
    if (!ids) {
      return
    }
    var targets = ids.map(function (id) { return layer.features.getFeature(id); }).filter(function (feature) { return feature; });
    targets.length > 1
      ? bus.emit('popup:nested', targets, layer.popup, layer)
      : bus.emit('popup:single', targets, layer.popup, layer);

  });
};

/**
 * Adds a single of layers from './layers.js' to the map.
 *
 * @param {String} Layer key, eg 'projectPoints'
 */

var addLayer = function (layer) {
  if (!layers[layer]) {
    return
  }
  console.log(layers[layer].features);
  layers[layer].features.addTo(map);
  layers[layer].features.legend(function(error, legend) {
    if (!error && legend.layers.length == 1) {
      bus.emit('layer:legend', legend.layers[0]);
    }
  });
  bus.emit('layer:reset', layer);
  layers[layer].features.on('click', function (e) {
    getFeaturesAtPoint(e.latlng, layers[layer]);
  });
  layers[layer].features.bindPopup(function (evt) {
    var tempFeature;
    if (evt) {
      if (!evt.feature) {
        layers[layer].features.query().nearby(evt._latlng, 10).ids(function (error, ids) {
          if (!ids) {
            return
          }
          var targets = ids.map(function (id) { return layers[layer].features.getFeature(id); }).filter(function (feature) { return feature; });
          tempFeature = targets[0].feature;
          evt.feature
            ? evt.feature = evt.feature
            : evt.feature = tempFeature;
          openPopUp(evt, layer);
        });
      }

      if (evt.bringToFront && layers[layer].popup) {
        evt.bringToFront();
        evt.setStyle({
          lineCap: 'round',
          weight: 24,
          color: '#98CBCC'
        });
        openPopUp(evt, layer);
      }
    }
    return 'hey';
  }).on('popupclose', function () {
    bus.emit('layer:reset', layer);
  });
};

/**
 * Opens the independant (aka non-leaflet) popup from a click on a feature for a given layer.
 *
 * @param {Event} Click event from map feature.
 * @param {String} Layer key, eg 'projectPoints'
 */
var openPopUp = function (evt, layer) {
  bus.emit('popup:opened', evt, layers[layer].popup);
};

/**
 * Resets a layers style to default renderer. Used to undo highlighting from a click.
 *
 * @param {String} Layer key, eg 'projectPoints'
 */
var resetLayerStyle = function (layer) {
  if (layers[layer].features.resetStyle) {
    layers[layer].features.resetStyle();
  }
};

/**
 * Removes a set of layers from './layers.js' to the map.
 *
 * @param {String} Comma seperated string of layer names. eg "projectPoints, projectLines"
 */
var removeLayers = function (layerSet) {
  if (!layerSet) { return; }
  layerSet = layerSet.replace(/ /g, '');
  layerSet.split(',').forEach(function (layer) { return removeLayer(layer); });
};

/**
 * Removes a single of layers from './layers.js' to the map.
 *
 * @param {String} Layer key, eg 'projectPoints'
 */
var removeLayer = function (layer) {
  if (!layers[layer]) {
    return
  }
  layers[layer].features.removeFrom(map);
  layers[layer].features.unbindPopup();
};

/**
 * Adds any layers indicated as active from the layer toggle list to the map.
 */
var drawLayers = function () {
  var layers = getActiveLayers();
  bus.emit('map:legend', layers);
  layers.forEach(function (toggle$$1) {
    var layerSet = toggle$$1.getAttribute('data-layers');
    bus.emit('map:layer:add', layerSet);
  });
  getInactiveLayers().forEach(function (toggle$$1) {
    var layerSet = toggle$$1.getAttribute('data-layers');
    bus.emit('map:layer:remove', layerSet);
  });
};

/**
 * Tears down the map from the DOM.
 */
var destroyMap = function () {
  if (map) {
    map.remove();
  }
};

/**
 * Destroys and redraws the map.
 */
var redrawMap = function () {
  bus.emit('map:destroy');
  bus.emit('map:create');
};

/**
 * Closes all popups active on the map.
 */
var closePopUps = function () {
  map.closePopup();
};

/**
 * Fits the current map view to a leaflet bound.
 *
 * @param {Object} A Leaflet bounds object
 */
var setMapToBounds = function (bounds) {
  map.fitBounds(bounds);
};

/**
 * Moves map view to a specific point and zoom level.
 *
 * @param {Object} A Leaflet LatLng object
 * @param {Integer} Leaflet map zoom level
 */
var setMapToFeature = function (latlng, zoom) {
  map.flyTo(latlng, zoom);
  position.zoom = zoom;
};

/**
 * Moves map view to a specific feature.
 *
 * @param {Object} A Leaflet feature
 */
var zoomToFeature = function (feature) {
  // if (feature.getBounds) {
  //   let bounds = feature.getBounds();
  //   bus.emit('map:fitBounds', bounds);
  // } else {
  //   let latlng = feature._latlng
  //   let zoom = 16
  //   bus.emit('map:setFeature', latlng, zoom)
  // }
};

// const drawLegend = layers => {
//   let legend = document.querySelector('.js-legend')
//   legend.innerHTML = 'Viewing:'
//   layers = layers.filter(layer => {
//     return layer.getAttribute('data-layers') != null
//   })
//   layers.forEach(layer => {
//     legend.insertAdjacentHTML('beforeend', `
//       <span class="legend-layer">
//         ${layer.getAttribute('data-layers')},
//       </span>
//     `)
//   })
//   if ( layers.length < 1 ) {
//     legend.insertAdjacentHTML('beforeend', `None`)
//   }
// }



var slugify = function (string) { return string.trim().replace(/\s/g, '-'); };

var parseLegendData = function (data, i) { return ("\n  <button class=\"pt8 button button-clear legend-toggle js-legend-toggle\" data-legend=\"" + (slugify(data.layerName)) + "\">\n    <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\" class=\"icon legend-icon\"><path d=\"M10 2l14 14-14 14V2z\"/></svg>\n    " + (data.layerName) + "\n  </button>\n  <ul class=\"legend-group js-legend-group\" data-legend=\"" + (slugify(data.layerName)) + "\">\n    " + (data.legend.map(function (layer) { return (
      ("<li>\n        <img width=\"" + (layer.height) + "\" height=\"" + (layer.height) + "\" alt=\"Symbol\" src=\"data:image/gif;base64," + (layer.imageData) + "\" />\n        " + (layer.label) + "\n      </li>")
    ); }).join('')) + "\n  </ul>\n"); };

var closeToggles = function () {
  var toggles = Array.apply(void 0, document.querySelectorAll('.js-legend-toggle'));
  var nodes = Array.apply(void 0, document.querySelectorAll('.js-legend-group'));
  nodes.forEach(function (node) {
    remove(node, 'is-active');
  });
  toggles.forEach(function (node) {
    remove(node, 'is-active');
  });
};

var toggleLegend = function (e) {
  e.preventDefault();
  var isOpen = has(e.target, 'is-active');
  closeToggles();
  if (!isOpen) {
    var target = e.target.getAttribute('data-legend');
    add(e.target, 'is-active');
    var nodes = Array.apply(void 0, document.querySelectorAll('.js-legend-group')).filter(function (node) { return node.getAttribute('data-legend') == target; });
    nodes.forEach(function (node) {
      add(node, 'is-active');
    });
  }
};

var bindLegendInteraction = function () {
  var toggles = Array.apply(void 0, document.querySelectorAll('.js-legend-toggle'));
  toggles.forEach(function (node) {
    node.addEventListener('click', toggleLegend);
  });
};

var drawLayerLegend = function (data) {
  var nodes = Array.apply(void 0, document.querySelectorAll('.js-layer-legend'));
  nodes.forEach(function (node) {
    node.insertAdjacentHTML("beforeend", parseLegendData(data));
  });
  bindLegendInteraction();
};

var clearLayerLegend = function () {
  var nodes = Array.apply(void 0, document.querySelectorAll('.js-layer-legend'));
  nodes.forEach(function (node) { return node.innerHTML = ''; });
};

/**
 * Binds all side effect listeners, exposes the API, and draws the map
 */
var map$1 = function () {
  bus.on('popup:opened', zoomToFeature);
  bus.on('popup:closed', closePopUps);
  bus.on('map:redraw', redrawMap);
  bus.on('map:destroy', destroyMap);
  bus.on('map:create', drawMap);
  bus.on('map:create', drawLayers);
  bus.on('map:fitBounds', setMapToBounds);
  bus.on('map:setFeature', setMapToFeature);
  bus.on('layers:draw', drawLayers);
  bus.on('map:layer:add', addLayers);
  bus.on('map:layer:remove', removeLayers);
  bus.on('map:layer:remove', clearLayerLegend);
  bus.on('layer:reset', resetLayerStyle);
  bus.on('layer:legend', drawLayerLegend);
};

// ┌────────────────┐
// │ Aria Adjusters │
// └────────────────┘
// utilities to help manage aria properties

/**
 * Toggles `aria-hidden` property on DOM nodes.
 *
 * @param {Array} Array of DOM Nodes
 */


/**
 * Adds `aria-hidden` on DOM nodes.
 *
 * @param {Array} Array of DOM Nodes
 */
function hide (array) {
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
function show (array) {
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

// ┌───────┐
// │ Modal │
// └───────┘
// show and hide modal dialogues
// Listens to a 'modal:bind' optionally takes a node
// Emits and listens on the 'modal:open' channel. Takes a data-modal attr
// Emits and listens to on the 'modal:close' channel. Optionally takes a data-modal
// Emitting a modal id toggle that modals state.
// Emitting false or null closes all modals.

/**
 * Initializes modal pattern and binds events.
 */
function modal () {
  // Cool nodes
  var toggles = findElements('.js-modal-toggle');
  var modals = findElements('.js-modal');

  // Bus events
  bus.on('modal:open', openModal);
  bus.on('keyboard:escape', closeModal);
  bus.on('modal:close', closeModal);
  bus.on('modal:bind', bindModals);

  /**
   * Find nodes that are effected by opening the modal
   *
   * @returns {Array} Array of DOM Nodes
   */
  function dependentNodes () {
    var nodes = [];
    return nodes;
  }

  /**
   * Opens a modal
   *
   * @param {String} Id of modal to open
   */
  function openModal (modalId) {
    bus.emit('modal:close');
    if (!modalId) { return; }
    var modal = document.querySelector((".js-modal[data-modal=\"" + modalId + "\"]"));
    modal.removeAttribute('tabindex');
    add$1(document, 'focusin', fenceModal);
    add(modal, 'is-active');
    hide(dependentNodes());
    modal.focus();
  }

  /**
   * Closes a modal. If no id passed, closes all modals.
   *
   * @param {String} Id of modal to open
   */
  function closeModal (modalId) {
    if (!modalId) { return removeActive(modals); }
    var modal = document.querySelector((".js-modal[data-modal=\"" + modalId + "\"]"));
    remove(modal, 'is-active');
    modal.setAttribute('tabindex', 0);
    remove$1(document, 'focusin', fenceModal);
    show(dependentNodes());
  }

  /**
   * Binds event listeners on a node: binds all modals if no node is provided
   *
   * @param {Node} Dom node to bind listeners on.
   */
  function bindModals (node) {
    if (!node) {
      toggles.forEach(function (toggle$$1) {
        add$1(toggle$$1, click(), toggleClick);
      });
    } else {
      add$1(node, click(), toggleClick);
    }
  }

  /**
   * Prevents focus from leaving modal component while modal is open.
   *
   * @param {Event} Event
   */
  function fenceModal (e) {
    if (!closest('js-modal', e.target)) {
      modals.forEach(function (modal) {
        if (has(modal, 'is-active')) {
          modal.focus();
        }
      });
    }
  }

  /**
   * Toggles the state of a modal when the modals controller is clicked.
   *
   * @param {Event} Event
   */
  function toggleClick (e) {
    preventDefault(e);
    var modalId = e.target.dataset.modal;
    bus.emit('modal:open', modalId);
  }

  bus.emit('modal:bind');
}

// Cool Helpers
/**
 * Initializes drawer pattern and binds events.
 */
function drawer () {
  var wrapper = document.querySelector('.js-panels');
  var toggles = findElements('.js-drawer-toggle');
  var drawers = findElements('.js-drawer');
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
    var drawer = document.querySelector((".js-drawer[data-drawer=\"" + (options.id) + "\"]"));
    if (drawer && !has(drawer, 'is-active')) {
      bus.emit('drawer:close');
      var right = has(drawer, 'drawer-right');
      var left = has(drawer, 'drawer-left');

      drawer.setAttribute('tabindex', 0);
      add(drawer, 'is-active');

      if (right) {
        add(wrapper, 'drawer-right-is-active');
      } else if (left) {
        add(wrapper, 'drawer-left-is-active');
      }

      hide([wrapper]);
      add$1(drawer, click(), closeClick);
      add$1(document, 'focusin', fenceDrawer);
    } else {
      bus.emit('drawer:close');
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
        remove(drawer, 'is-active');
      });
    } else {
      var drawer = document.querySelector((".js-drawer[data-drawer=\"" + (options.id) + "\"]"));
      drawer.removeAttribute('tabindex');
      remove(drawer, 'is-active');
    }
    remove(wrapper, 'drawer-left-is-active');
    remove(wrapper, 'drawer-right-is-active');
    toggles.forEach(function (toggle$$1) {
      remove(toggle$$1, 'is-active');
    });
    show([wrapper]);
    remove$1(document, 'focusin', fenceDrawer);
    if (lastOn) { lastOn.focus(); }
  }

  /**
   * Prevents focus from leaving drawer component while drawer is open.
   *
   * @param {Event} Event
   */
  function fenceDrawer (e) {
    if (!closest('js-drawer', e.target)) {
      drawers.forEach(function (drawer) {
        if (has(drawer, 'is-active')) {
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
      toggles.forEach(function (toggle$$1) {
        add$1(toggle$$1, click(), toggleClick);
      });
    } else {
      add$1(options.node, click(), toggleClick);
    }
  }

  /**
   * Closes drawer when the drawer wrapper is clicked.
   * The drawer wrapper is everything outside the drawer.
   *
   * @param {Event} Event
   */
  function closeClick (e) {
    if (has(e.target, 'js-drawer')) {
      bus.emit('drawer:close');
    }
    if (has(e.target, 'js-drawer-close')) {
      bus.emit('drawer:close');
    }
  }

  /**
   * Toggles the state of a drawer when the drawers controller is clicked.
   *
   * @param {Event} Event
   */
  function toggleClick (e) {
    preventDefault(e);
    var drawerId = e.target.getAttribute('data-drawer');
    bus.emit('drawer:open', {id: drawerId});
  }

  bus.emit('drawer:bind');
}

var options = {
  startTag : "<b class='highlight'>", // could be a hyperlink
  endTag   : "</b>" // or you could use <i> instead of <b> ... want it? ask!
};
/**
 * Want to Set the Desired Start Tag to apply to the highlight?
 * see: https://github.com/dwyl/search-result-keyword-highlighter/issues/5
 * Potential future feature ...
 */

/**
 * wraps a single string passed to it in the start and end tags of the options
 * @param {String} match - the string to be wrapped
 * @returns {String} - the string wraped
 */

function wrapper (match) {
  return options.startTag + match + options.endTag;
}

/**

 * highlight does Simple String Substitution given a set of keywords in
 * a body of text and substitutes the keyword with a marked up html Tag
 * @param {String} keywords - a string of one or more keywords
 *   separated by spaces.
 * @param {String} text - the body of text where you want to highlight keywords
 * @returns {String} text - the text with all highlights.
 */
function highlight(keywords, text) {

  var regex = keywords.split(' ');
  regex = regex.filter(function(char){
    return char !== '';
  });
  regex = regex.join('|');
  regex = regex.replace(/[-[\]{}()*+?.,\\^$]/g, "\\$&");
  var matcher = new RegExp(regex, 'gi');

  return text.replace(matcher, wrapper);
}

var keywordHighlighter = highlight;

// Cool Helpers
/**
 * Initializes drawer pattern and binds events.
 */
if (!String.prototype.includes) {
  String.prototype.includes = function(search, start) {
    'use strict';
    if (typeof start !== 'number') {
      start = 0;
    }

    if (start + search.length > this.length) {
      return false;
    } else {
      return this.indexOf(search, start) !== -1;
    }
  };
}

// this is prolly not so good
var indexContent = function () {
  window.content = [];
  var contentArea = document.querySelector('.js-search-content');
  var headerOnes = nodeListToArray(contentArea.getElementsByTagName('h1'));
  var headerTwos = nodeListToArray(contentArea.getElementsByTagName('h2'));
  var headerThrees = nodeListToArray(contentArea.getElementsByTagName('h3'));
  var headerFourss = nodeListToArray(contentArea.getElementsByTagName('h4'));
  var headerFivess = nodeListToArray(contentArea.getElementsByTagName('h5'));
  var headerSixess = nodeListToArray(contentArea.getElementsByTagName('h6'));
  var tablecells = nodeListToArray(contentArea.getElementsByTagName('td'));
  var paragraphs = nodeListToArray(contentArea.getElementsByTagName('p'));
  window.content = window.content.concat(headerOnes);
  window.content = window.content.concat(headerTwos);
  window.content = window.content.concat(headerThrees);
  window.content = window.content.concat(headerFourss);
  window.content = window.content.concat(headerFivess);
  window.content = window.content.concat(headerSixess);
  window.content = window.content.concat(tablecells);
  // window.content = window.content.concat(paragraphs)
};

var matchStringToNode = function (node, string) {
  if (!node.innerHTML) {
    return false
  }
  if (node.innerHTML.toLowerCase().includes(string)) {
    return true
  } else {
    return false
  }
};

var searchFor = function (term) {
  term = term.toLowerCase();
  var content = window.content.filter(function (node) {
    return matchStringToNode(node, term)
  });
  bus.emit('search:result', content.length, content, term);
};

var submit = function (e) {
  preventDefault(e);
  var input = findElements('.js-search-input', e.target.parentNode)[0];
  var term = input.value;
  bus.emit('search:for', term);
};
var cancel = function (e) {
  preventDefault(e);
  var input = findElements('.js-search-input', e.target.parentNode)[0];
  input.value = '';
  bus.emit('search:cancel');
};


var bindSearch = function () {
  var submitBtns = findElements('.js-search-submit');
  var cancelBtns = findElements('.js-search-cancel');
  submitBtns.map(function (btn) {
    add$1(btn, 'click', submit);
  });
  cancelBtns.map(function (btn) {
    add$1(btn, 'click', cancel);
  });
};

var showLoader = function () {
  var searchViews = findElements('.js-search-loader');
  var hiddenViews = findElements('.js-search-hide');
  var resultViews = findElements('.js-search-results');
  hiddenViews.forEach(function (view) {
    add(view, 'is-hidden');
  });
  searchViews.forEach(function (view) {
    add(view, 'is-active');
  });
  resultViews.forEach(function (view) {
    remove(view, 'is-active');
  });
};
var showResults = function () {
  var searchViews = findElements('.js-search-loader');
  var hiddenViews = findElements('.js-search-hide');
  var resultViews = findElements('.js-search-results');
  hiddenViews.forEach(function (view) {
    add(view, 'is-hidden');
  });
  searchViews.forEach(function (view) {
    remove(view, 'is-active');
  });
  resultViews.forEach(function (view) {
    add(view, 'is-active');
  });
};
var showOriginal = function () {
  var searchViews = findElements('.js-search-loader');
  var hiddenViews = findElements('.js-search-hide');
  var resultViews = findElements('.js-search-results');
  hiddenViews.forEach(function (view) {
    remove(view, 'is-hidden');
  });
  searchViews.forEach(function (view) {
    remove(view, 'is-active');
  });
  resultViews.forEach(function (view) {
    remove(view, 'is-active');
  });
};

window.scrollToPosition = function (position) {
  var contentArea = document.querySelector('.js-text-area');
  scrollTo(contentArea, position - 60);
};

var getClosestHeader = function (node) {
  var sourceNode = node;
  var lastNode;
  while (node.tagName[0] != 'H') {
    lastNode = node;
    node = node.previousElementSibling;
    if (!node) {
      node = lastNode.parentNode;
    }
  }
  console.log(node.innerHTML, sourceNode.innerHTML);
  if (node.innerHTML == sourceNode.innerHTML) {
    return false
  } else {
    return node.innerHTML
  }
};


var needsHeader = function (section) {
  if (section) {
    return ("<h6 class=\"search-result-header\">" + section + "</h6>")
  } else {
    return ""
  }
};

var loadResults = function (count, results, term) {
  var resultsDiv = findElements('.js-search-results');
  var contentArea = document.querySelector('.js-search-content');
  resultsDiv.map(function (div) {
    div.innerHTML = "\n      <h6 class=\"search-result-summary\">" + count + " results for '" + term + "'</h6>\n    ";
    results.map(function (result) {
      var section = getClosestHeader(result);
      var nodePos = getOffsetTop(result);
      var preview = result.innerHTML;
      var highlighted = keywordHighlighter(term, preview);
      div.insertAdjacentHTML('beforeend', ("\n        <a class=\"search-result\" onclick=\"scrollToPosition(" + nodePos + ")\">\n          " + (needsHeader(section)) + "\n          <p class=\"search-result-preview\">" + highlighted + "</p>\n        </a>\n      "));
    });
  });
  bus.emit('search:render');
};

function search () {
  bus.on('search:index', indexContent);
  bus.on('search:bind', bindSearch);
  bus.on('search:for', showLoader);
  bus.on('search:render', showResults);
  bus.on('search:cancel', showOriginal);
  bus.on('search:for', searchFor);
  bus.on('search:result', loadResults);

  bus.emit('search:index');
  bus.emit('search:bind');
}

// Cool Helpers
var contentArea = document.querySelector('.js-text-area');
var headerOnes = nodeListToArray(contentArea.getElementsByTagName('h1'));
var nubContainer = document.querySelector('.js-chapter-nubs');
var nubList = document.querySelector('.js-nub-list');
var containerMonitor = scrollMonitor.createContainer(contentArea);

var watchers = {};

var bindWatchers = function () {
  headerOnes.forEach(function (header) {
    watchers[header.id] = containerMonitor.create(header);
    watchers[header.id].enterViewport(function() {
      bus.emit('nubs:active', header.id);
      bus.emit('breadscrumbs:active', header);
    });
  });
};

var renderNub = function (nub) {
  return ("\n    <li>\n      <a href=\"#" + (nub.href) + "\"\n         data-nub=\"" + (nub.href) + "\"\n         class=\"nub\n                js-nub\n                tooltip tooltip-right\"\n         aria-label=\"" + (nub.text) + "\">\n      </a>\n    </li>\n  ")
};

var drawNubs = function () {
  var headerOnes = nodeListToArray(contentArea.getElementsByTagName('h1'));
  var nubs = headerOnes.map(function (header) {
    return {
      href: header.id,
      text: header.innerHTML
    }
  });
  nubs.forEach(function (nub) {
    var html = renderNub(nub);
    if (nubList) {
      nubList.insertAdjacentHTML('beforeend', html);
    }
  });
  bus.emit('nubs:active', 'top');
};

var setActiveNub = function (id) {
  if (nubList) {
    var nubs = nodeListToArray(nubList.querySelectorAll('.js-nub'));
    nubs.forEach(function (nub) {
      remove(nub, 'is-active');
      if (nub.getAttribute('data-nub') === id) {
        add(nub, 'is-active');
      }
    });
  }
};

var nubs = function () {
  bus.on('nubs:draw', drawNubs);
  bus.on('nubs:draw', bindWatchers);
  bus.on('nubs:active', setActiveNub);

  bus.emit('nubs:draw');
};

// Cool Helpers
var crumbZone = document.querySelector('.js-breadcrumbs');

var draw = function (crumb) {
  var html = "\n    <span class=\"pt8 nav-top-link\">></span>\n    <a href='#" + (crumb.id) + "' class=\"crumb nav-top-link pt10\">\n      " + (crumb.innerHTML) + "\n    </a>\n  ";
  crumbZone.innerHTML = '';
  crumbZone.insertAdjacentHTML('beforeend', html);
};

var breadcrumbs = function () {
  bus.on('breadscrumbs:active', draw);
};

var close = function () {
  var nodes = Array.apply(void 0, document.querySelectorAll('.toc ul li ul'));
  var moreNodes = Array.apply(void 0, document.querySelectorAll('.toc ul'));
  nodes.forEach(function (node) {
    if (has(node, 'is-active')) {
      remove(node, 'is-active');
    }
  });
  moreNodes.forEach(function (node) {
    if (has(node, 'is-active')) {
      remove(node, 'is-active');
    }
  });
};

var toggle$1 = function (node) {
  var target = node.querySelector('ul');
  toggle(target, 'is-active');
};

var bind$1 = function () {
  var links = Array.apply(void 0, document.querySelectorAll('.toc a'));
  links.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var parent = e.target.parentNode;
      var grandpappy = parent.parentNode.parentNode;
      bus.emit('toc:toggle', parent);
      bus.emit('toc:toggle', grandpappy);
    });
  });
  var backs = Array.apply(void 0, document.querySelectorAll('.toc ul li ul'));
  backs.forEach(function (back) {
    back.addEventListener('click', function (e) {
      bus.emit('toc:close');
    });
  });
};


var listen = function () {
  bus.on('toc:bind', bind$1);
  bus.on('toc:toggle', toggle$1);
  bus.on('toc:close', close);
  bus.on('keyboard:escape', close);
  bus.on('drawer:close', close);
  bus.on('keyboard:arrow:left', close);
  bus.emit('toc:bind');
};

// The JS Checker
// Neat Helpers
// View and Intent
// Cool Components
// import responsiveType from './responsive-type.js';
/**
 * Initializes app and app components.
 */


// Remove Node Polyfill
(function (arr) {
  arr.forEach(function (item) {
    if (item.hasOwnProperty('remove')) {
      return;
    }
    Object.defineProperty(item, 'remove', {
      configurable: true,
      enumerable: true,
      writable: true,
      value: function remove() {
        if (this.parentNode !== null)
          { this.parentNode.removeChild(this); }
      }
    });
  });
})([Element.prototype, CharacterData.prototype, DocumentType.prototype]);

var initApp = function () {
  console.debug("App init started");
  // Model, View, Intent
  // Intent and View are the larger, containing component.
  // This app has no model: all data is consumed via GIS API.
  view();
  intent();

  // The router controls the application state
  // everything derives from URL
  route();

  // Components each handle their own MVI loops:
  // This makes them compasble, replaceable, and easier to work on.
  // Easy to maintain, easy to delete!
  modal();
  drawer();
  map$1();
  search();
  nubs();
  breadcrumbs();
  bind();
  listen();
  console.debug("App init finished");
};

// This loads the application and makes sure that there IS javascript running on the page.
// If there is no JS available, than the default minimum-viable-app is loaded:
// this app is basically just text on a screen. How nice!
console.debug("We are loading our goodness");
bus.on('has:javascript', initApp);
hasJS();

}());
