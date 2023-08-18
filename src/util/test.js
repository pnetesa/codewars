const util = require('util');
const assert = require('assert');
function strictEqual(actual, expected, message = '') {
  try {
    assert(actual === expected, message);
    console.log(message ? `${message} - PASS` : `-> ${expected} - PASS`);
  } catch (e) {
    console.log(`EXPECTED: ${expected} ACTUAL: ${actual} ${message} - FAIL`);
  }
};

function deepEqual(actual, expected, message = '') {
  try {
    assert(util.inspect(actual, {}) === util.inspect(expected), message);
    console.log(message ? `${util.inspect(message)} - PASS` : `-> ${util.inspect(expected)} - PASS`);
  } catch (e) {
    console.log(`EXPECTED: ${util.inspect(expected)} ACTUAL: ${util.inspect(actual)} ${message} - FAIL`);
  }
};

function expect(actual, message = '') {
  try {
    assert(actual, message);
    console.log(`${message} - PASS`);
  } catch (e) {
    console.log(`ACTUAL: ${actual} ${message} - FAIL`);
  }
};


module.exports.strictEqual = strictEqual;
module.exports.deepEqual = deepEqual;
module.exports.expect = expect;
