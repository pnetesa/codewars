const { strictEqual } = require('./util/test');

// The MEX number of a non-negative set of numbers is the smallest non-negative number
// that is not present in the set.
//
// For example, MEX({1, 3, 10}) = 0, and MEX({0, 1, 2, 8}) = 3.
//
// Your task is to take a given array 'arr' of length 'num' and remove the minimum number of
// elements from it so that the MEX value of the modified array is not equal to the MEX
// value of the original array.
//
// • Your code should return the minimum number of elements that need to be removed from the array.
// • If the task is not possible, then your code should return -1.
//
// Keep in mind:
// • Array arr elements are non-negative integers
// • Array elements are not necessarily distinct
// • 1 <= num <= 40
// • 0 <= arr[i] <= 90
//
// Example:
//   Input 1 (num): 4
//   Input 2 (arr): 0, 1, 1, 4
//   Output: 1
//
// Explanation:
// The MEX of the input array is 2. If we remove the element "0" from it, we have a modified
// array of 1, 1, 4 with MEX = 0, which is not equal to 2. So, the answer is 1 as removing one
// element changed the MEX of the array.

function min_removal(num, arr) {
  arr.sort((a, b) => Math.sign(a - b));

  function getMex(arr) {
    // const unique = Array.from(new Set(arr));
    const unique = [ ...new Set(arr)];
    let [first] = unique;
    if (first > 0) {
      return first - 1;
    }
    let mex = 0;
    for (let number of unique) {
      if (mex !== number) {
        break;
      }
      mex = mex + 1;
    }
    return mex;
  }

  const initialMex = getMex(arr);

  let count = 0;
  let minCount = -1;
  let prevNumber = -1;

  for (let number of arr) {
    if (number != prevNumber) {
      prevNumber = number;
      if (count > 0 && (count < minCount || minCount === -1)) {
        minCount = count;
      }
      count = 0;
    }

    count = count + 1;

    if (number > initialMex) {
      break;
    }
  }

  return minCount;
}

strictEqual(min_removal(1, [1]),  -1);
strictEqual(min_removal(3, [1, 3, 10]),  -1);
strictEqual(min_removal(4, [0, 1, 2, 8]),  1);

strictEqual(min_removal(4, [0, 1, 1, 4]),  1);
strictEqual(min_removal(25, [4, 3, 0, 0, 7, 7, 7, 0, 4, 4, 7, 7, 1, 7, 3, 0, 0, 4, 1, 1, 1, 9, 6, 5, 4]),  4);
strictEqual(min_removal(25, [25, 55, 10, 36, 0, 18, 19, 25, 6, 40, 35, 23, 76, 67, 32, 18, 1, 44, 44, 88, 65, 23, 72, 77, 48]),  1);
strictEqual(min_removal(10, [69, 45, 45, 36, 64, 20, 55, 18, 28, 55]),  -1);
