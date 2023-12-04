const { strictEqual } = require('../util/test');

// Напишите функцию, которая проверит строку на сбалансированность скобок: `{}, (), []`.
// Вернуть `true` если они сбалансированы, иначе `false`.
//
// **Input**: String
//
// **Output**: Boolean

function isBalanced(string) {
  const chars = string.split('');
  const brackets = [];
  const OPENING = '[{(';
  const CLOSING = ']})';
  const pair = new Map([[']', '['], ['}', '{'], [')', '(']])

  for (let char of chars) {
    if (OPENING.includes(char)) {
      brackets.push(char);
    } else if (CLOSING.includes(char)) {
      const lastBracket = brackets.pop();
      if (lastBracket !== pair.get(char)) {
        return false;
      }
    }
  }

  const isBalanced = !brackets.length;
  return isBalanced;
}

strictEqual(isBalanced('(x + y) - (4)'), true);
strictEqual(isBalanced('(((10 ) ()) ((?)(:)))'), true);
strictEqual(isBalanced('[{()}]'), true);
strictEqual(isBalanced('(50)('), false);
strictEqual(isBalanced('[{]}'), false);
