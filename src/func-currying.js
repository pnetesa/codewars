const { expect } = require('./util/test');

function sum(x) {
  const addFunc = (y) => {
    if (y) {
      x += y;
    }
    return y ? addFunc : x;
  }

  return addFunc;
}

expect(sum(1)(2)() === 3);
expect(sum(1)(2)(3)() === 6);
expect(sum(1)(2)(3)(4)() === 10);
