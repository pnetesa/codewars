const { strictEqual } = require('./util/test');

// Given an array containing elements of various data types, divide the data into subarrays based on types.
// For example, if the array contains numbers, strings, and objects, you should return an array containing
// three subarrays: one with all the numbers, one with all the strings, and one with all the objects.
//
// Finally, convert the resulting array into a JSON string using JSON.stringify().
// Some datatypes, like BigInt, are not compatible with JSON.stringify().
// If you detect an error when trying to convert the final array to a string with JSON.stringify(),
// return an empty string instead. The function should also return an empty string if the initial i
// nput array is empty.
//
// Examples
// sortTypes([1, "hi", null]) === '[[1],["hi"],[null]]'
// sortTypes([1, 2, true]) === '[[1, 2],[true]]')
//
// For a more complex example, what if we tried sortedTypes([[1, 2, 3]])?
//
// In this case, we only pass one value, [1, 2, 3]. This value's type is object, so it would
// go into an array of objects: [[1, 2, 3]]. We add this array of objects (which only has one entry)
// to the final array, resulting in [[[1, 2, 3]]].
//
// Finally, we pass this array through JSON.strinfigy() resulting in the string "[[[1,2,3]]]"

function sortTypes(arr) {
  const typeToArr = new Map();
  for (let item of arr) {
    let type = typeof item;
    if (type === 'object' && Array.isArray(item)) {
      type = 'array';
    }

    let values = typeToArr.get(type);
    if (!values) {
      values = [];
    }
    values.push(item);
    typeToArr.set(type, values);
  }

  const result = [];
  for (let value of typeToArr.values()) {
    result.push(value);
  }
  return JSON.stringify(result);
}

strictEqual(sortTypes([1, 'hello']), '[[1],["hello"]]');
strictEqual(sortTypes([[1, 2, 3]]), '[[[1,2,3]]]');
// strictEqual(sortTypes([this, 1]), '[[null],[1]]');
strictEqual(sortTypes([null, null]), '[[null,null]]');
strictEqual(sortTypes([1, 'hello', {}, [1, 2, 3], null, 4, false]), '[[1,4],["hello"],[{},null],[[1,2,3]],[false]]');
