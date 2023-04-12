/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var hasOwn = Function.call.bind(Object.prototype.hasOwnProperty);

module.exports = function updateCache(cache, key, upd, create) {
  if ((!cache) && (!create)) { return upd; }
  var had = (cache && hasOwn(cache, key)),
    dest = (had ? cache[key] : (create || Object)());
  // eslint-disable-next-line no-param-reassign
  if (cache && (!had)) { cache[key] = dest; }
  if (upd) { Object.assign(dest, upd); }
  return dest;
};
