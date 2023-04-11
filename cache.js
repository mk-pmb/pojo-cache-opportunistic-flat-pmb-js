/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var hasOwn = Function.call.bind(Object.prototype.hasOwnProperty);

module.exports = function updateCache(cache, key, upd) {
  if (!cache) { return upd; }
  var had = hasOwn(cache, key), dest = (had ? cache[key] : {});
  if (!had) { cache[key] = dest; } // eslint-disable-line no-param-reassign
  if (!upd) { return dest; }
  return Object.assign(dest, upd);
};
