const { deepEqual } = require('../util/test');

// Напишите функцию, которая будет генерировать последовательность Фиббоначи длинны `n`, которую передали как аргумент.
//
// **Input**: Number
//
// **Output**: Number[]

function fibonacci(n) {
  const result = [];
  for (let i = 0; i < n; i++) {
    result.push((i > 1) ? result[i - 1] + result[i - 2] : 1);
  }
  return result;
}

deepEqual(fibonacci(2), [1, 1]);
deepEqual(fibonacci(5), [1, 1, 2, 3, 5]);
deepEqual(fibonacci(8), [1, 1, 2, 3, 5, 8, 13, 21]);
