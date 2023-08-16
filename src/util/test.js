const util = require('util');
const assert = require('assert');
function test(actual, expected, message = '') {
  try {
    assert(actual === expected, message);
    console.log(`${message}: ${expected} - OK`);
  } catch (e) {
    console.log(`EXPECTED: ${expected} ACTUAL: ${actual} ${message}`);
  }
};

function deepEqual(actual, expected, message = '') {
  try {
    assert(util.inspect(actual, {}) === util.inspect(expected), message);
    console.log(`${util.inspect(message)}: ${util.inspect(expected)} - OK`);
  } catch (e) {
    console.log(`EXPECTED: ${util.inspect(expected)} ACTUAL: ${util.inspect(actual)} ${message}`);
  }
};

function expect(actual, message = '') {
  try {
    assert(actual, message);
    console.log(`${message} - OK`);
  } catch (e) {
    console.log(`ACTUAL: ${actual} ${message}`);
  }
};


module.exports.strictEqual = test;
module.exports.deepEqual = deepEqual;
module.exports.expect = expect;
