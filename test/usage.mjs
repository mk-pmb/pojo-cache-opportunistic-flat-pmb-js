// -*- coding: utf-8, tab-width: 2 -*-

import test from 'p-tape';

import updateCache from '../cache.js';


test('Basic example', async (t) => {
  const cache = {};
  t.plan(25);

  (function animalSounds() {
    const topic = 'animal sounds';

    const addCat = { cat: 'meow' };
    const learnedCat = updateCache(cache, topic, addCat);
    t.same(learnedCat, { cat: 'meow' });
    t.notEqual(learnedCat, addCat);
    const uncachedCat = updateCache(null, topic, addCat);
    t.equal(uncachedCat, addCat);

    const addDog = { dog: 'woof' };
    const learnedDog = updateCache(cache, topic, addDog);
    t.same(learnedDog, { cat: 'meow', dog: 'woof' });
    t.notEqual(learnedDog, addCat);
    t.notEqual(learnedDog, addDog);
    const uncachedDog = updateCache(null, topic, addDog);
    t.equal(uncachedDog, addDog);

    const addCow = { cow: 'moo' };
    const learnedCow = updateCache(cache, topic, addCow);
    t.same(learnedCow, { cat: 'meow', dog: 'woof', cow: 'moo' });
    t.notEqual(learnedCow, addCat);
    t.notEqual(learnedCow, addDog);
    t.notEqual(learnedCow, addCow);
    const uncachedCow = updateCache(null, topic, addCow);
    t.equal(uncachedCow, addCow);
  }());

  (function flowerColors() {
    const topic = 'flower colors';

    const addRose = { rose: 'red' };
    const learnedRose = updateCache(cache, topic, addRose);
    t.same(learnedRose, { rose: 'red' });
    t.notEqual(learnedRose, addRose);
    const uncachedRose = updateCache(null, topic, addRose);
    t.equal(uncachedRose, addRose);

    const addViolet = { violet: 'blue' };
    const learnedViolet = updateCache(cache, topic, addViolet);
    t.same(learnedViolet, { rose: 'red', violet: 'blue' });
    t.notEqual(learnedViolet, addRose);
    t.notEqual(learnedViolet, addViolet);
    const uncachedViolet = updateCache(null, topic, addViolet);
    t.equal(uncachedViolet, addViolet);

    const addLily = { lily: 'white' };
    const learnedLily = updateCache(cache, topic, addLily);
    t.same(learnedLily, { rose: 'red', violet: 'blue', lily: 'white' });
    t.notEqual(learnedLily, addRose);
    t.notEqual(learnedLily, addViolet);
    t.notEqual(learnedLily, addLily);
    const uncachedLily = updateCache(null, topic, addLily);
    t.equal(uncachedLily, addLily);
  }());

  t.same(cache, {
    'animal sounds': { cat: 'meow', dog: 'woof', cow: 'moo' },
    'flower colors': { rose: 'red', violet: 'blue', lily: 'white' },
  });

  t.end();
});







/* scroll */
