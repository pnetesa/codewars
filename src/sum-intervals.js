const { strictEqual } = require('./util/test');

// Write a function called sumIntervals/sum_intervals that accepts an array of intervals, and returns the sum of all the
// interval lengths. Overlapping intervals should only be counted once.
//
// Intervals
//  Intervals are represented by a pair of integers in the form of an array. The first value of the interval will always
//  be less than the second value. Interval example: [1, 5] is an interval from 1 to 5. The length of this interval is 4.
//
// Overlapping Intervals
//  List containing overlapping intervals:
//
//   [
//     [1, 4],
//     [7, 10],
//     [3, 5]
//   ]
//
//  The sum of the lengths of these intervals is 7. Since [1, 4] and [3, 5] overlap, we can treat the interval as [1, 5],
//  which has a length of 4.
//
// Examples:
//   sumIntervals( [
//     [1, 2],
//     [6, 10],
//     [11, 15]
//   ] ) => 9
//
// sumIntervals( [
//   [1, 4],
//   [7, 10],
//   [3, 5]
// ] ) => 7
//
// sumIntervals( [
//   [1, 5],
//   [10, 20],
//   [1, 6],
//   [16, 19],
//   [5, 11]
// ] ) => 19
//
// sumIntervals( [
//   [0, 20],
//   [-100000000, 10],
//   [30, 40]
// ] ) => 100000030
//
// Tests with large intervals
//  Your algorithm should be able to handle large intervals. All tested intervals are subsets
//  of the range [-1000000000, 1000000000].

// Stack implementation - SLOW
function sumIntervals0(intervals) {
  let originalSize;
  do {
    originalSize = intervals.length;
    for (let i = 0; i < originalSize; i++) {
      let isIncluded = false;
      let [min, max] = intervals.shift();

      for (let i = 0; i < intervals.length; i++) {
        const [intervMin, intervMax] = intervals[i];

        // Included
        if ((min >= intervMin) && (max <= intervMax)) {
          isIncluded = true;
          break;
        }

        // Intersects
        if (((min < intervMin) && (max >= intervMin)) || ((min <= intervMax) && (max > intervMax))) {
          min = Math.min(min, intervMin);
          max = Math.max(max, intervMax);
        }
      }

      if (!isIncluded) {
        intervals.push([min, max]);
      }
    }
  } while (intervals.length > 1 && intervals.length < originalSize);

  return intervals.reduce((acc, [min, max]) => {
    acc = acc + Math.abs(max - min);
    return acc;
  }, 0);
}

// Single array + optimize SUM - OPTIMIZED
function sumIntervals1(intervals) {
  let sum = 0;
  let borderIndex = 0;
  let startIndex = borderIndex;
  while (startIndex < intervals.length) {
    let [min, max] = intervals[startIndex];
    sum = sum + Math.abs(max - min);

    let currentIndex = startIndex + 1;
    while (currentIndex < intervals.length) {
      const [intervMin, intervMax] = intervals[currentIndex];

      // Included inside other interval
      if ((min >= intervMin) && (max <= intervMax)) {
        sum = sum - Math.abs(max - min);
        intervals[startIndex] = intervals[borderIndex];
        borderIndex++;
        break;
      }

      // Includes other interval
      if ((intervMin >= min) && (intervMax <= max)) {
        intervals[currentIndex] = [min, max];
        sum = sum - Math.abs(max - min);
        intervals[startIndex] = intervals[borderIndex];
        borderIndex++;
        break;
      }

      // Intersects
      if (((min < intervMin) && (max >= intervMin)) || ((min <= intervMax) && (max > intervMax))) {
        sum = sum - Math.abs(max - min);
        min = Math.min(min, intervMin);
        max = Math.max(max, intervMax);
        intervals[currentIndex] = [min, max];
        intervals[startIndex] = intervals[borderIndex];
        borderIndex++;
        break;
      }
      currentIndex++;
    }

    startIndex++;
  }

  return sum;
}

// Single array + SORT - FINAL SOLUTION
function sumIntervals2(intervals) {
  function quickSort(arr) {
    function quickSortImpl(arr, begin, end) {
      if (begin < end) {
        const pivotIndex = partition(arr, begin, end);
        quickSortImpl(arr, begin, pivotIndex - 1);
        quickSortImpl(arr, pivotIndex + 1, end);
      }
    }

    function partition(arr, begin, end) {
      let pivotIndex = begin;
      for (let index = begin + 1; index <= end; index++) {
        if (arr[index][0] < arr[begin][0]) {
          pivotIndex = pivotIndex + 1;
          swap(arr, pivotIndex, index);
        }
      }
      swap(arr, begin, pivotIndex);
      return pivotIndex;
    }

    function swap(arr, begin, pivotIndex) {
      const temp = arr[begin];
      arr[begin] = arr[pivotIndex];
      arr[pivotIndex] = temp;
    }

    quickSortImpl(arr, 0, arr.length - 1);
  }

  quickSort(intervals);

  let sum = 0;
  let startIndex = 0;
  while (startIndex < intervals.length) {
    let [min, max] = intervals[startIndex];
    sum = sum + Math.abs(max - min);

    let currentIndex = startIndex + 1;
    while (currentIndex < intervals.length) {
      const [intervMin, intervMax] = intervals[currentIndex];

      // Included inside other interval
      if ((min >= intervMin) && (max <= intervMax)) {
        sum = sum - Math.abs(max - min);
        break;
      }

      // Includes other interval
      if ((intervMin >= min) && (intervMax <= max)) {
        intervals[currentIndex] = [min, max];
        sum = sum - Math.abs(max - min);
        break;
      }

      // Intersects
      if (((min < intervMin) && (max >= intervMin)) || ((min <= intervMax) && (max > intervMax))) {
        sum = sum - Math.abs(max - min);
        min = Math.min(min, intervMin);
        max = Math.max(max, intervMax);
        intervals[currentIndex] = [min, max];
        break;
      }
      currentIndex++;
    }

    startIndex++;
  }

  return sum;
}

// Single Array.sort() - OPT FINAL SOLUTION
function sumIntervals(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);

  let sum = 0;
  let startIndex = 0;
  while (startIndex < intervals.length) {
    let [min, max] = intervals[startIndex];
    sum = sum + Math.abs(max - min);

    let currentIndex = startIndex + 1;
    while (currentIndex < intervals.length) {
      const [intervMin, intervMax] = intervals[currentIndex];

      // Included inside other interval
      if ((min >= intervMin) && (max <= intervMax)) {
        sum = sum - Math.abs(max - min);
        break;
      }

      // Includes other interval
      if ((intervMin >= min) && (intervMax <= max)) {
        intervals[currentIndex] = [min, max];
        sum = sum - Math.abs(max - min);
        break;
      }

      // Intersects
      if (((min < intervMin) && (max >= intervMin)) || ((min <= intervMax) && (max > intervMax))) {
        sum = sum - Math.abs(max - min);
        min = Math.min(min, intervMin);
        max = Math.max(max, intervMax);
        intervals[currentIndex] = [min, max];
        break;
      }
      currentIndex++;
    }

    startIndex++;
  }

  return sum;
}


// Basic case
strictEqual(sumIntervals([
  [1, 5],
  [10, 20],
  [1, 6],
  [16, 19],
  [5, 11]
]), 19);


// Failed case
strictEqual(sumIntervals([
  [1, 4],
  [7, 10],
  [3, 5],
]), 7);
strictEqual(sumIntervals([
  [ 0, 20 ],
  [ -100000000, 10 ],
  [ 30, 40 ],
]), 100000030);

// Small Random Tests
strictEqual(sumIntervals([
  [ -8, -4 ],   [ 17, 19 ],
  [ 15, 16 ],   [ -4, 5 ],
  [ -15, -9 ],  [ 6, 12 ],
  [ -20, -10 ], [ 16, 21 ],
  [ -10, 0 ],   [ 0, 7 ]
]), 38);

strictEqual(sumIntervals([
  [15, 21],
  [-20, 5],
  [-20, 12]
]), 38);

// should return the correct sum for non overlapping intervals
strictEqual(sumIntervals([[1, 5]]), 4);
strictEqual(sumIntervals([[1, 5], [6, 10]]), 8);

// should return the correct sum for overlapping intervals
strictEqual(sumIntervals([[1, 5], [1, 5]]), 4);
strictEqual(sumIntervals([[1, 4], [7, 10], [3, 5]]), 7);

// should return the correct sum for large intervals
let intervals = [
  { intervals: [[-1e9, 1e9]], sum: 2e9 },
  {
    intervals: [
      [0, 20],
      [-1e8, 10],
      [30, 40]
    ], sum: 1e8 + 30
  }
];
for (let i = 0; i < intervals.length; i++) {
  strictEqual(sumIntervals(intervals[i].intervals), intervals[i].sum);
}


// BIG array
// const SIZE = 4;
// const SIZE = 40;
// const SIZE = 400000;
const SIZE = 4000000;
const first = [];
const second = [];
for (let i = 0; i < SIZE; i++) {
  const sign = Math.random() > 0.5 ? 1 : -1;
  const multiply = Array(9).fill().map((value, index) => Math.pow(10, index + 1));
  const value1 = Math.ceil(Math.random() * multiply[Math.ceil(Math.random() * 8)]) * sign;
  const value2 = Math.ceil(Math.random() * multiply[Math.ceil(Math.random() * 8)]);
  const [min, max] = value2 > value1 ? [value1, value2] : [value2, value1];
  first.push([min, max]);
  second.push([min, max]);
}

console.time('slow');
const expected = sumIntervals(first);
console.log(`expected = ${expected}`);
console.timeEnd('slow');

console.log();

console.time('faster');
strictEqual(sumIntervals(second), expected);
console.timeEnd('faster');
