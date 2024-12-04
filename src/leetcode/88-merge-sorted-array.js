const { strictEqual } = require('../util/test');

// 88. Merge Sorted Array
//
// You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing
// the number of elements in nums1 and nums2 respectively.
//
//   Merge nums1 and nums2 into a single array sorted in non-decreasing order.
//
//   The final sorted array should not be returned by the function, but instead be stored inside the array nums1. To
//   accommodate this, nums1 has a length of m + n, where the first m elements denote the elements that should be
//   merged, and the last n elements are set to 0 and should be ignored. nums2 has a length of n.
//
//   Example 1:
//
//     Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
//     Output: [1,2,2,3,5,6]
//     Explanation: The arrays we are merging are [1,2,3] and [2,5,6].
//       The result of the merge is [1,2,2,3,5,6] with the underlined elements coming from nums1.
//
//   Example 2:
//
//     Input: nums1 = [1], m = 1, nums2 = [], n = 0
//     Output: [1]
//     Explanation: The arrays we are merging are [1] and [].
//       The result of the merge is [1].
//
//   Example 3:
//
//     Input: nums1 = [0], m = 0, nums2 = [1], n = 1
//     Output: [1]
//     Explanation: The arrays we are merging are [] and [1].
//       The result of the merge is [1].
//       Note that because m = 0, there are no elements in nums1. The 0 is only there to ensure the merge result can fit in nums1.
//

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
const mergeLong = function(nums1, m, nums2, n) {
  // console.log('-- nums1', nums1);
  // console.log('-- nums2', nums2);

  if (n === 0) {
    return;
  }

  let j = 0;
  for (let i = 0; i < nums1.length && j < n; i++) {

    if (i < m) {
      if (nums2[j] > nums1[i]) {
        continue;
      }

      // Shift elements in "nums1"
      for (let k = m; k > i; k--) {
        nums1[k] = nums1[k - 1];
      }
      m = m + 1;

      // console.log('-- nums1/shifted', i, nums1)
    }

    nums1[i] = nums2[j];
    j = j + 1;
  }
};

/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
const merge = function(nums1, m, nums2, n) {
  for (let i = 0, j = 0; i < nums1.length && j < n; i++) {
    if (i < m) {
      if (nums2[j] > nums1[i]) {
        continue;
      }

      // Shift elements in "nums1"
      for (let k = m++; k > i; k--) {
        nums1[k] = nums1[k - 1];
      }
    }

    nums1[i] = nums2[j++];
  }
};

function mergeAI(nums1, m, nums2, n) {
  let i = m - 1, j = n - 1, k = m + n - 1;
  while (i >= 0 && j >= 0) {
    nums1[k--] = nums1[i] > nums2[j] ? nums1[i--] : nums2[j--];
  }
  while (j >= 0) {
    nums1[k--] = nums2[j--];
  }
  return nums1;
}

// Tests

(() => {
  const nums1 = [1,2,3,0,0,0];
  const m = 3;
  const nums2 = [2,5,6];
  const n = 3;
  merge(nums1, m, nums2, n);
  strictEqual(nums1, [1,2,2,3,5,6]);
})();

(() => {
  const nums1 = [1];
  const m = 1;
  const nums2 = [];
  const n = 0;
  merge(nums1, m, nums2, n);
  strictEqual(nums1, [1]);
})();

(() => {
  const nums1 = [0];
  const m = 0;
  const nums2 = [1];
  const n = 1;
  merge(nums1, m, nums2, n);
  strictEqual(nums1, [1]);
})();

(() => {
  const nums1 = [2,0];
  const m = 1;
  const nums2 = [1];
  const n = 1;
  merge(nums1, m, nums2, n);
  // mergeAI(nums1, m, nums2, n);
  strictEqual(nums1, [1,2]);
})();

(() => {
  const nums1 = [-1,0,0,3,3,3,0,0,0];
  const m = 6;
  const nums2 = [1,2,2];
  const n = 3;
  merge(nums1, m, nums2, n);
  strictEqual(nums1, [-1,0,0,1,2,2,3,3,3]);
})();
