const { deepEqual } = require('../util/test');

// Напишите функцию, которая принимает 2 строки. Верните `true` если строки являются
// перевернутым вариантом друг друга (см. пример). Иначе верните `false`.
//
// **Input**: String, String
//
// **Output**: Boolean

function isStringRotated(source, test) {
  if (source.length !== test.length) {
    return false;
  }

  let result = false;
  let start = 0;
  for (let i = 0; i < test.length; i++) {
    if (!source.includes(test.substring(start, i + 1))) {
      if ((i - start) > 1 && source.includes(test.substring(i))) {
        result = true;
        break;
      } else {
        break;
      }
    }
  }
  return result;
}

function isStringRotated1(source, test) {
  return source.length === test.length && (source + source).includes(test)
}

deepEqual(isStringRotated('javascript', 'scrjavaipt'), false);
deepEqual(isStringRotated('javascript', 'iptguavacr'), false);
deepEqual(isStringRotated('javascript', 'scriptjava'), true);
deepEqual(isStringRotated('javascript', 'iptjavascr'), true);
deepEqual(isStringRotated('javascript', 'java'), false);
