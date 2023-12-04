const { deepEqual } = require('../util/test');

// Напишите функцию, которая принимает массив строк и возвращает самую частовстречающуюся строку в этом массиве.
// Если таких строк несколько, то нужно вернуть первую, идя слева на право.
//
// **Input**: String[]
//
// **Output**: String

function highestFrequency(array) {
  const valueCount = new Map();
  let maxCount = 0;
  // let maxValue = '';
  let [maxValue] = array;
  for (let value of array) {
    const count = valueCount.get(value) || 0;
    valueCount.set(value, count + 1);

    if (count > maxCount && value !== maxValue) {
      maxCount = count;
      maxValue = value;
    }
  }
  return maxValue;
}

deepEqual(highestFrequency(['a', 'b', 'c', 'c', 'd', 'e']), 'c');
deepEqual(highestFrequency(['abc', 'def', 'abc', 'def', 'abc']), 'abc');
deepEqual(highestFrequency(['abc', 'def']), 'abc'); // ??? Not sure
deepEqual(highestFrequency(['abc', 'abc', 'def', 'def', 'def', 'ghi', 'ghi', 'ghi', 'ghi' ]), 'ghi');
