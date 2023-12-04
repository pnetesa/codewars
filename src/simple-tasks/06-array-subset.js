const { deepEqual } = require('../util/test');

// Напишите функцию, которая проверяет, является ли второй массив подмножеством первого.
// То есть есть ли элементы второго массива в первом.
//
// **Input**: Number[] & String[], Number[] & String[]
//
// **Output**: Boolean

function arraySubset(source, subset) {
  if (source.length < subset.length) {
    return false;
  }

  const itemPosition = new Map()
  let isInclude = true;
  for (let item of subset) {
    const fromIndex = itemPosition.get(item) || 0;
    const itemIndex = source.indexOf(item, fromIndex);
    if (itemIndex < 0) {
      isInclude = false;
      break;
    }
    itemPosition.set(item, itemIndex + 1);
  }
  return isInclude;
}

deepEqual(arraySubset([2, 1, 3], [1, 2, 3]), true);
deepEqual(arraySubset([2, 1, 1, 3], [1, 2, 3]), true);
deepEqual(arraySubset([1, 1, 1, 3], [1, 3, 3]), false);
deepEqual(arraySubset([1, 2], [1, 2, 3]), false);
