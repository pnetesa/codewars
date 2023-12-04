const { deepEqual } = require('../util/test');

// Напишите функцию, которая принимает строку и возвращает новую, в которой все
// дублирующиеся символы будут удалены.
//
// **Input**: String
//
// **Output**: String

function removeDupes(str) {
  return Array.from(new Set(str)).join('');
}


deepEqual(removeDupes('abcd'), 'abcd');
deepEqual(removeDupes('aabbccdd'), 'abcd');
deepEqual(removeDupes('abcddbca'), 'abcd');
deepEqual(removeDupes('abababcdcdcd'), 'abcd');
