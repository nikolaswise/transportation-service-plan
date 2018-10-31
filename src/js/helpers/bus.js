
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

/**
 * Exports the Bus Object with above methods.
 */
export default bus;
