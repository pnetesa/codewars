const { strictEqual } = require('../util/test');

// Напишите функцию, которая определяет уникальны ли все символы в строке.
// Регистр должен учитываться: `‘a’` и `‘A’` разные символы.
//
// **Input**: String
//
// **Output**: Boolean

function isUnique(string) {
  return new Set(string).size === string.length;
}

strictEqual(isUnique('abcdef'), true);
strictEqual(isUnique('1234567'), true);
strictEqual(isUnique('abcABC'), true);
strictEqual(isUnique('abcadef'), false);
