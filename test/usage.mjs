// -*- coding: utf-8, tab-width: 2 -*-

import test from 'p-tape';

import updateCache from '../cache.js';


function makeGenCounter() {
  function gen() {
    gen.counter += 1;
    return { 'gen#': gen.counter };
  };
  gen.counter = 0;
  return gen;
}


test('Basic example', async (t) => {
  const cache = {};
  t.plan(33);

  (function animalSounds() {
    const topic = 'animal sounds';

    const gen = makeGenCounter();
    const addCat = { cat: 'meow' };
    const learnedCat = updateCache(cache, topic, addCat, gen);
    t.equal(gen.counter, 1, 'cat gen ran');
    t.same(learnedCat, { 'gen#': 1, cat: 'meow' }, 'learned cat sound');
    t.notEqual(learnedCat, addCat);
    const uncachedCat = updateCache(null, topic, addCat);
    t.equal(uncachedCat, addCat);
    const uncachedGenCat = updateCache(null, topic, addCat, gen);
    t.equal(gen.counter, 2, 'cat gen ran');
    t.notEqual(uncachedGenCat, addCat);
    t.same(uncachedGenCat, { 'gen#': 2, cat: 'meow' });
    const againCat = updateCache(cache, topic, addCat, gen);
    t.equal(againCat, learnedCat);
    t.equal(gen.counter, 2, 'cat gen skipped');

    const addDog = { dog: 'woof' };
    const learnedDog = updateCache(cache, topic, addDog, gen);
    t.equal(gen.counter, 2, 'dog gen skipped');
    t.same(learnedDog, { 'gen#': 1, cat: 'meow', dog: 'woof' },
      'learned dog sound');
    t.notEqual(learnedDog, addCat);
    t.notEqual(learnedDog, addDog);
    const uncachedDog = updateCache(null, topic, addDog);
    t.equal(uncachedDog, addDog);

    const addCow = { cow: 'moo' };
    const learnedCow = updateCache(cache, topic, addCow);
    t.same(learnedCow, { 'gen#': 1, cat: 'meow', dog: 'woof', cow: 'moo' },
      'learned cow sound');
    t.notEqual(learnedCow, addCat);
    t.notEqual(learnedCow, addDog);
    t.notEqual(learnedCow, addCow);
    t.notEqual(learnedCow, gen);
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
    'animal sounds': { 'gen#': 1, cat: 'meow', dog: 'woof', cow: 'moo' },
    'flower colors': { rose: 'red', violet: 'blue', lily: 'white' },
  });

  t.end();
});







/* scroll */
