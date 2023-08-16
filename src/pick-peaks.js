const { deepEqual } = require('./util/test');

// Write a function that returns the positions and the values of the "peaks" (or local maxima) of a numeric array.
//
// For example, the array arr = [0, 1, 2, 5, 1, 0] has a peak at position 3 with a value of 5 (since arr[3] equals 5).
//
// The output will be returned as an object with two properties: pos and peaks. Both of these properties should be
// arrays. If there is no peak in the given array, then the output should be {pos: [], peaks: []}.
//
// Example: pickPeaks([3, 2, 3, 6, 4, 1, 2, 3, 2, 1, 2, 3]) should return {pos: [3, 7], peaks: [6, 3]} (or equivalent
// in other languages)
//
// All input arrays will be valid integer arrays (although it could still be empty), so you won't need to validate the
// input.
//
// The first and last elements of the array will not be considered as peaks (in the context of a mathematical function,
// we don't know what is after and before and therefore, we don't know if it is a peak or not).
//
// Also, beware of plateaus !!! [1, 2, 2, 2, 1] has a peak while [1, 2, 2, 2, 3] and [1, 2, 2, 2, 2] do not. In case of
// a plateau-peak, please only return the position and value of the beginning of the plateau.
// For example: pickPeaks([1, 2, 2, 2, 1]) returns {pos: [1], peaks: [2]} (or equivalent in other languages)

function pickPeaks(arr) {
  let plateauPeak;
  const result = arr.reduce((accumulator, currentValue, currentIndex, array) => {
    // First & last
    if (currentIndex === 0 || currentIndex === arr.length - 1) {
      return accumulator;
    }

    const prevIndex = currentIndex - 1;
    const nextIndex = currentIndex + 1;
    if (array[currentIndex] > array[nextIndex]) {
      if (array[currentIndex] > array[prevIndex]) {
        // Maximum
        accumulator.pos.push(currentIndex);
        accumulator.peaks.push(array[currentIndex]);
      } else if (array[currentIndex] === array[prevIndex] && !!plateauPeak) {
        // End of plateau
        accumulator.pos.push(plateauPeak.pos);
        accumulator.peaks.push(plateauPeak.peak);
      }
      plateauPeak = null;
    } else if ((array[currentIndex] === array[nextIndex]) && (array[currentIndex] > array[prevIndex])) {
      // Start of plateau
      plateauPeak = { pos: currentIndex, peak: array[currentIndex] };
    }

    return accumulator;
  }, { pos: [], peaks: [] });

  return result;
}

deepEqual(pickPeaks([1, 2, 3, 6, 4, 1, 2, 3, 2, 1]), { pos: [3, 7], peaks: [6, 3] });
deepEqual(pickPeaks([3, 2, 3, 6, 4, 1, 2, 3, 2, 1, 2, 3]), { pos: [3, 7], peaks: [6, 3] });
deepEqual(pickPeaks([3, 2, 3, 6, 4, 1, 2, 3, 2, 1, 2, 2, 2, 1]), { pos: [3, 7, 10], peaks: [6, 3, 2] });
deepEqual(pickPeaks([2, 1, 3, 1, 2, 2, 2, 2, 1]), { pos: [2, 4], peaks: [3, 2] });
deepEqual(pickPeaks([2, 1, 3, 1, 2, 2, 2, 2]), { pos: [2], peaks: [3] });
deepEqual(pickPeaks([2, 1, 3, 2, 2, 2, 2, 5, 6]), { pos: [2], peaks: [3] });
deepEqual(pickPeaks([2, 1, 3, 2, 2, 2, 2, 1]), { pos: [2], peaks: [3] });
deepEqual(pickPeaks([1, 2, 5, 4, 3, 2, 3, 6, 4, 1, 2, 3, 3, 4, 5, 3, 2, 1, 2, 3, 5, 5, 4, 3]), {
  pos: [2, 7, 14, 20],
  peaks: [5, 6, 5, 5]
});
deepEqual(pickPeaks([]), { pos: [], peaks: [] });
deepEqual(pickPeaks([1, 1, 1, 1]), { pos: [], peaks: [] });

deepEqual(pickPeaks([
  12, 6, 2, 12, -2, 6, -2, 7,
  14, 0, -3, 5, 5, 2, 2, 3,
  3, 11, 1, 1, 0, 15, 9, 1,
  0
]), { pos: [ 3, 5, 8, 11, 17, 21 ], peaks: [ 12, 6, 14, 5, 11, 15 ] });
