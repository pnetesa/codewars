const { deepEqual } = require('../util/test');

// Напишите функцию, которая проверяет, являются ли все элементы в массиве анаграммами друг друга.
//
// **Input**: String[]
//
// **Output**: Boolean

function allAnagrams0(array) {
  if (!array.length || array.length < 2) {
    return false;
  }

  let result = true;
  const set = new Set(array[0]);
  for (let i = 1; i < array.length && result; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (!set.has(array[i].at(j))) {
        result = false;
        break;
      }
    }
  }
  return result;
}

function allAnagrams(array) {
  const sorted = array.map(word => word.split('').sort().join(''));
  const [first] = sorted;
  return sorted.every(item => item === first);
}

deepEqual(allAnagrams(['abcd', 'bdac', 'cabd']), true);
deepEqual(allAnagrams(['abcd', 'bdXc', 'cabd']), false);
deepEqual(allAnagrams(['abcd', 'bd']), false);
