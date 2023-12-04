const { expect } = require('../util/test');

// Напишите функцию, которая будет проверять на “глубокое” равенство 2 входящих параметра
// function deepEqual(a, b) {
//   if (a === b) {
//     return true;
//   }
//
//   if (typeof a !== typeof b) {
//     return false;
//   }
//
//   return JSON.stringify(a) === JSON.stringify(b);
// }

function deepEqual(a, b) {
  if (Number.isNaN(a) && Number.isNaN(b)) {
    return true
  }


  if (typeof a !== typeof b) {
    return false
  }

  if (typeof a !== 'object' || a === null || b === null) {
    return a === b
  }

  if (Object.keys(a).length !== Object.keys(b).length) {
    return false
  }

  for (const key of Object.keys(a)) {
    if (!deepEqual(a[key], b[key])) {
      return false
    }
  }

  return true
}

const source = {a: 1, b: {c: 1}}
const test1 = {a: 1, b: {c: 1}}
const test2 = {a: 1, b: {c: 2}}
const test3 = {b: {c: 1}, a: 1}
expect(deepEqual(source, test1) === true);
expect(deepEqual(source, test2) === false);
expect(deepEqual(NaN, NaN) === true);
expect(deepEqual('test', 'test!') === false);
expect(deepEqual() === true);
expect(deepEqual(source, test3) === true);

// const x = null;
// const y = null;
const x = undefined;
const y = undefined;
// const x = NaN;
// const y = NaN;
console.log('x === y: ', x === y);
console.log('typeof x: ', typeof x);
