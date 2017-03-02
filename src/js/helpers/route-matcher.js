var reEscape = /[\]{}()+?.,\\$|#\s]/g;
var reParam = /([:*])(\w+)/g;

function validateRule (rule, value) {
  var type = exports.toString.call(rule).charAt(8);
  return type === 'R' ? rule.test(value) : type === 'F' ? rule(value) : rule === value;
}

/**
 * A route matching function. I didnt write this, should prolly find the original doc.
 *
 * @param {String} Route to match
 * @param {Array} Array of validation rules
 * @returns {Object} Object of route matching results.
 */
export function routeMatcher (route, rules) {
  var self = {};
  var names = [];
  var re = route;

  if (typeof route === 'string') {
    re = re.replace(reEscape, '\\$&');
    re = re.replace(reParam, function (_, mode, name) {
      names.push(name);
      return mode === ':' ? '([^/]*)' : '(.*)';
    });
    re = new RegExp('^' + re + '$');

    self.parse = function (url) {
      var i = 0;
      var param, value;
      var params = {};
      var matches = url.match(re);
      if (!matches) { return null; }
      while (i < names.length) {
        param = names[i++];
        value = matches[i];
        if (rules && param in rules && !validateRule(rules[param], value)) { return null; }
        params[param] = value;
      }
      return params;
    };

    self.stringify = function (params) {
      var param, re;
      var result = route;
      for (param in params) {
        re = new RegExp('[:*]' + param + '\\b');
        result = result.replace(re, params[param]);
      }
      return result.replace(reParam, '');
    };
  } else {
    self.parse = function (url) {
      var matches = url.match(re);
      return matches && {captures: matches.slice(1)};
    };
    self.stringify = function () { return ''; };
  }
  return self;
}
