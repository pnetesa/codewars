const { strictEqual } = require('./util/test');

// In this example you have to validate if a user input string is alphanumeric. The given string is not nil/null/NULL/None, so you don't have to check that.
//
// The string has the following conditions to be alphanumeric:
//
//   At least one character ("" is not valid)
// Allowed characters are uppercase / lowercase latin letters and digits from 0 to 9
// No whitespaces / underscore

const regExp = /^[a-zA-Z0-9]+$/;
function alphanumeric1(string){
  return regExp.test(string);
}

function alphanumeric(string){
  const upperLetter = { min: 65, max: 90 };
  const lowerLetter = { min: 97, max: 122 };
  const numeric = { min: 48, max: 57 };

  let isValid = !!string.length;
  for (let i = 0; i < string.length; i++) {
    const code = string.charCodeAt(i);

    isValid &&= (upperLetter.min <= code && code <= upperLetter.max)
      || (lowerLetter.min <= code && code <= lowerLetter.max)
      || (numeric.min <= code && code <= numeric.max);

    if (!isValid) break;
  }

  return isValid;
}

strictEqual(alphanumeric("Mazinkaiser"), true)
strictEqual(alphanumeric("hello world_"), false)
strictEqual(alphanumeric("PassW0rd"), true)
strictEqual(alphanumeric("     "), false)
strictEqual(alphanumeric(""), false)
