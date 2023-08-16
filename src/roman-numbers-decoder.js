const assert = require('assert');

// Create a function that takes a Roman numeral as its argument and returns its value as a numeric decimal integer.
// You don't need to validate the form of the Roman numeral.
//
// Modern Roman numerals are written by expressing each decimal digit of the number to be encoded separately,
// starting with the leftmost digit and skipping any 0s.
// So 1990 is rendered "MCMXC" (1000 = M, 900 = CM, 90 = XC) and 2008 is rendered "MMVIII" (2000 = MM, 8 = VIII).
// The Roman numeral for 1666, "MDCLXVI", uses each letter in descending order.
//
// Symbol    Value
// I          1
// V          5
// X          10
// L          50
// C          100
// D          500
// M          1,000

// complete the solution by transforming the
// string roman numeral into an integer
function solution (roman) {
  const symbolToValue = new Map([
    ['I', 1],
    ['V', 5],
    ['X', 10],
    ['L', 50],
    ['C', 100],
    ['D', 500],
    ['M', 1000],
  ]);

  let result = 0;
  for (let index = 0; index < roman.length; index++) {
    const symbol = roman.charAt(index);
    const value = symbolToValue.get(symbol);

    if (index + 1 < roman.length) {
      const nextSymbol = roman.charAt(index + 1);
      const nextValue = symbolToValue.get(nextSymbol);

      if (nextValue > value) {
        result += nextValue - value;
        index++;
        continue;
      }
    }

    result += value;
  }

  return result;
}

function doTest (romanString, expected) {
  const actual = solution(romanString);
  console.log(actual);
  console.log('--------------');
  assert(actual === expected, `for roman number ${romanString}`);
}

doTest('XXI', 21);
doTest('I', 1);
doTest('IV', 4);
doTest('MMVIII', 2008);
doTest('MDCLXVI', 1666);
