const util = require('util');
const assert = require('assert');

function deepEqualImpl(value, other) {
  if (typeof value !== typeof other) {
    return false;
  }

  if (Number.isNaN(value) && Number.isNaN(other)) {
    return true;
  }

  if (typeof value !== 'object' || value === null || other === null) {
    return value === other;
  }

  if (Object.keys(value).length !== Object.keys(other).length) {
    return false;
  }

  for (const key of Object.keys(value)) {
    if (!deepEqualImpl(value[key], other[key])) {
      return false;
    }
  }

  return true;
}

function strictEqual(actual, expected, message = '') {
  try {
    assert(deepEqualImpl(actual, expected), message);
    console.log(message ? `${message} - PASS` : `-> ${expected} - PASS`);
  } catch (e) {
    console.log(`EXPECTED: ${expected} ACTUAL: ${actual} ${message} - FAIL`);
  }
};

function deepEqual(actual, expected, message = '') {
  try {
    assert(deepEqualImpl(actual, expected), message);
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
