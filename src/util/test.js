const util = require('util');
const assert = require('assert');
function strictEqual(actual, expected, message = '') {
  try {
    assert(actual === expected, message);
    console.log(message ? `${message} - OK` : `-> ${expected} - OK`);
  } catch (e) {
    console.log(`EXPECTED: ${expected} ACTUAL: ${actual} ${message}`);
  }
};

function deepEqual(actual, expected, message = '') {
  try {
    assert(util.inspect(actual, {}) === util.inspect(expected), message);
    console.log(message ? `${util.inspect(message)} - OK` : `-> ${util.inspect(expected)} - OK`);
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


module.exports.strictEqual = strictEqual;
module.exports.deepEqual = deepEqual;
module.exports.expect = expect;
