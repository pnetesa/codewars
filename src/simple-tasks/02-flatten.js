const { deepEqual } = require('../util/test');

// Напишите функцию, принимающая массив с вложенными массивами и распакуйте в результирующий плоский массов.
// В результате должны получить новый одномерный массив.
//
// **Input**: Array
//
// **Output**: Array

function flatten(array) {
  function doFlatten(arr, res) {
    for (let item of arr) {
      if (Array.isArray(item)) {
        doFlatten(item, res);
      } else {
        res.push(item);
      }
    }
  }

  const result = [];
  doFlatten(array, result);
  return result;
}

function flattenTheirs(array) {
  const res = []

  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      const flat = flatten(array[i])
      for (let j = 0; j < flat.length; j++) {
        res.push(flat[j])
      }
    } else {
      res.push(array[i])
    }
  }

  return res
}

deepEqual(flatten([[1], [[2, 3]], [[[4]]]]), [1, 2, 3, 4]);
