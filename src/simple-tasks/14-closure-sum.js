const { expect } = require('../util/test');


function add(a, b) {

  let sum = 0;
  function nextAdd(x = 0) {
    sum = sum + x;
    console.log('caller', nextAdd.caller);
    return nextAdd;
    // return sum;
  }
  if (!isNaN(a)) {
    sum = sum + a;
    if (!isNaN(b)) {
      return sum + b;
    }

    return nextAdd;
  }

  return nextAdd;
}

// expect(add(20, 22) === 42);
// expect(add(20)(22) === 42);
expect(add(20)()(22) === 42);
// expect(add(20)()()()(22) === 42);
// expect(add(20)()()()()()()()()()()()(22) === 42);
// expect(add()(20)(22) === 42);
// expect(add()()()()(20)(22) === 42);
// expect(add()(20)()(22) === 42);
// expect(add()()()()()(20)()()()(22) === 42);
//
