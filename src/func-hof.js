const { expect } = require('./util/test');

function sum(a, b) {
  return a + b;
}

function sumEx(a, b, c) {
  return a + b + c;
}

function mul(a, b) {
  return a * b;
}

// function calculate() {
//
// }

function calculate0(func) {
  return (a) => {
    return (b) => {
      return func(a, b);
    }
  }
}

function calculate(opFn) {
  let argsCount = 0;
  let args = [];

  const f = (x) => {
    args.push(x);
    if (++argsCount === opFn.length) {
      return opFn(...args);
    }
    return f;
  }

  return f;
}

expect(calculate(sum)(3)(2) === 5, 'sum');
expect(calculate(mul)(3)(2) === 6, 'mul');
expect(calculate(sumEx)(3)(2)(4) === 9, 'sumEx');
