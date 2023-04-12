
<!--#echo json="package.json" key="name" underline="=" -->
pojo-cache-opportunistic-flat-pmb
=================================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Shallow-merge a POJO with cached known data if a cache POJO is provided.
<!--/#echo -->



API
---

This module exports one function:

### updateCache(cache, key[, upd[, create]])

If `cache` is `false`-y, just return `upd`.
Except if `create` is also given, then a temporary cache entry
(that will not be saved into any cache) will be created as
described below.

The idea here is that your library can have an option to use a cache.
This module shall help your library transparently use a cache object
if one is provided, with minimal performance loss otherwise.

If `cache` is truthy, it is assumed to be an object where cache entries
can be stored as its properties.

Missing entries are created on demand.
If `create` is truthy, it's expected to be a function that returns the
initial value for a new cache entry.
If `create` is false-y, the entry will be initialized with an empty object.

If `upd` is truthy, its properties are shallow-copied into the cache entry
in-place (replacing the old properties).
Returns the updated cache entry.




Usage
-----

see [test/usage.mjs](test/usage.mjs).


<!--#toc stop="scan" -->



Difference to getoraddkey-simple
--------------------------------

* This module is even simpler: Less features, less code.
* This module merges the new data with the existing cache entry.



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
