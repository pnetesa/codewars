const { deepEqual } = require('../util/test');

// Largest Leading Substring
//
// You are given a non-empty array of strings. Write a function to find the largest set of characters that are shared
// between all of them. The algorithm should be able to handle cases where there are no common preceding characters
// among the strings provided. Additionally, the algorithm should be optimized for efficiency and avoid using any
// built-in functions or libraries.
//
// Example 1
// INPUT: strs = ['arabia', 'armenia', 'argentina']
// OUTPUT: 'ar'
//
// Example 2
// INPUT: strs = ['flower', 'lotous', 'rose']
// OUTPUT: ''
// EXPLANATION: There is no common leading among the input strings
//
// Constraints:
// 1 <= strs.length <= 200
// 0 <= strs[i].length <= 200
// strs[i] consists of only lowercase English letters

function solution(strs) {
  let maxCount = 0;
  let largestSubstr = '';

  for (let i = 0; i < strs.length; i++) {
    const word = strs[i];
    for (let charIndex = 2; charIndex < word.length; charIndex++) {
      let foundCount = 0;
      let substr = word.substring(0, charIndex);
      // for (let j = 0; j < strs.length; j++) {
      for (let j = i; j < strs.length; j++) {
        if (i == j) {
          continue;
        }
        let currentWord = strs[j];
        if (currentWord.startsWith(substr, 0)) {
          foundCount++;
        }
      }

      if (foundCount > maxCount) {
        maxCount = foundCount;
        largestSubstr = substr;
      }
    }
  }

  return largestSubstr;
}

deepEqual(solution(['arabia', 'armenia', 'argentina']), 'ar');
deepEqual(solution(['flower', 'lotous', 'rose']), '');
