const { strictEqual } = require('./util/test');

// A format for expressing an ordered list of integers is to use a comma separated list of either
//
// • individual integers
// • or a range of integers denoted by the starting integer separated from the end integer in the range by a dash, '-'.
//   The range includes all integers in the interval including both endpoints. It is not considered a range unless it
//   spans at least 3 numbers. For example "12,13,15-17"
//
// Complete the solution so that it takes a list of integers in increasing order and returns a correctly formatted
// string in the range format.
function solution0(list) {
  const result = list.reduce((accumulator, currentValue, currentIndex, array) => {
    const prevValue = array[currentIndex - 1];
    const nextValue = array[currentIndex + 1];

    // First & Last
    if (currentIndex === 0 || (currentIndex === (array.length - 1))) {
      if (accumulator.length && accumulator.at(-1) !== '-') {
        accumulator.push(`,`);
      }
      accumulator.push(`${currentValue}`);
      return accumulator;
    }

    // Next individual
    if (currentValue - prevValue !== 1) {
      accumulator.push(`,${currentValue}`);
      return accumulator;
    }

    // Moving inside range - insert dash
    if ((nextValue - currentValue) === 1 && (currentValue - prevValue) === 1 && accumulator.at(-1) !== '-') {
      accumulator.push('-');
    }

    // Last from range
    if (nextValue - currentValue !== 1) {
      if (accumulator.at(-1) !== '-') {
        accumulator.push(`,`);
      }
      accumulator.push(`${currentValue}`);
    }

    return accumulator;
  }, []);
  return `${result.join('')}`;
}

// function solution1(list) {
//   for (let i = 0; i < list.length; i++) {
//     let j = i;
//     while (list[j] - list[j + 1] == -1) j++;
//     if (j != i && j - i > 1) list.splice(i, j - i + 1, list[i] + '-' + list[j]);
//   }
//   return list.join();
// }

// Super!!!
function solution(list) {
  return list.reduce((acc, curr, i) => {
    // if (i == 0) return curr.toString();
    if (list[i - 1] == curr - 1 && list[i + 1] == curr + 1) return acc;
    if (list[i - 2] == curr - 2 && list[i - 1] == curr - 1) return acc + '-' + curr;
    return acc + ',' + curr;
  });
}

strictEqual(solution([-6, -3, -2, -1, 0, 1, 3, 4, 5, 7, 8, 9, 10, 11, 14, 15, 17, 18, 19, 20]), '-6,-3-1,3-5,7-11,14,15,17-20');
strictEqual(solution([-3, -2, -1, 2, 10, 15, 16, 18, 19, 20]), '-3--1,2,10,15,16,18-20');
strictEqual(solution([1, 3, 5, 7, 9, 10, 11]), '1,3,5,7,9-11');
strictEqual(solution([-32, -31, -28, -27]), '-32,-31,-28,-27');

// '-85,-83,-80,-77--73,-70,-69,-66,-64,-62,-59,-56--54,-52,-50--48,-46,-44,-42,-41,-38,-35,-32,-31,-28-27' to deeply equal
// '-85,-83,-80,-77--73,-70,-69,-66,-64,-62,-59,-56--54,-52,-50--48,-46,-44,-42,-41,-38,-35,-32,-31,-28,-27'
