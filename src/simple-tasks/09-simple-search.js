const { deepEqual } = require('../util/test');

// Напишите функцию, которая принимает отсортированный массив с числами и число.
// Необходимо вернуть индекс числа, если оно есть в массиве. Иначе вернуть `-1`.
//
// **Input**: Number[], Number
//
// **Output**: Number

function search(array, target) {
  return array.indexOf(target);
}

deepEqual(search([1, 3, 6, 13, 17], 13), 3);
deepEqual(search([1, 3, 6, 13, 17], 12), -1);
