const { strictEqual, expect } = require('./util/test');

// Write a class called User that is used to calculate the amount that a user will progress through a ranking system
// similar to the one Codewars uses.
//
// Business Rules:
// - A user starts at rank -8 and can progress all the way to 8.
// - There is no 0 (zero) rank. The next rank after -1 is 1.
// - Users will complete activities. These activities also have ranks.
// - Each time the user completes a ranked activity the users rank progress is updated based off of the activity's rank
// - The progress earned from the completed activity is relative to what the user's current rank is compared to the rank
// of the activity
// - A user's rank progress starts off at zero, each time the progress reaches 100 the user's rank is upgraded to the
// next level
// - Any remaining progress earned while in the previous rank will be applied towards the next rank's progress (we don't
// throw any progress away). The exception is if there is no other rank left to progress towards (Once you reach rank 8
// there is no more progression).
// - A user cannot progress beyond rank 8.
// - The only acceptable range of rank values is -8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8. Any other value should raise an error.
//
// The progress is scored like so:
// - Completing an activity that is ranked the same as that of the user's will be worth 3 points
// - Completing an activity that is ranked one ranking lower than the user's will be worth 1 point
// - Any activities completed that are ranking 2 levels or more lower than the user's ranking will be ignored
// - Completing an activity ranked higher than the current user's rank will accelerate the rank progression. The greater
// the difference between rankings the more the progression will be increased. The formula is
//                   10 * d * d
// where d equals the difference in ranking between the activity and the user.
//
// Logic Examples:
// - If a user ranked -8 completes an activity ranked -7 they will receive 10 progress
// - If a user ranked -8 completes an activity ranked -6 they will receive 40 progress
// - If a user ranked -8 completes an activity ranked -5 they will receive 90 progress
// - If a user ranked -8 completes an activity ranked -4 they will receive 160 progress, resulting in the user being upgraded to rank -7 and having earned 60 progress towards their next rank
// - If a user ranked -1 completes an activity ranked 1 they will receive 10 progress (remember, zero rank is ignored)
//
// Code Usage Examples:
//
// var user = new User()
// user.rank // => -8
// user.progress // => 0
// user.incProgress(-7)
// user.progress // => 10
// user.incProgress(-5) // will add 90 progress
// user.progress # => 0 // progress is now zero
// user.rank # => -7 // rank was upgraded to -7
//
// Note: Codewars no longer uses this algorithm for its own ranking system. It uses a pure Math based solution that gives consistent results no matter what order a set of ranked activities are completed at.

class User {
  progress;
  rank;

  constructor(rank = -8, progress = 0) {
    this.rank = rank;
    this.progress = progress;
  }

  // The formula is
  //    10 * d * d
  // where d equals the difference in ranking between the activity and the user.
  incProgress(rank) {
    if (rank < -8 || rank > 8 || rank === 0) {
      throw new Error('Invalid rank value. Allowed range is -8 to 8 excluding 0');
    }

    const diff = (Math.sign(rank) !== Math.sign(this.rank)) ? rank - this.rank - 1 : rank - this.rank;
    if (diff >= 1) {
      this.progress += 10 * diff * diff;
    } else if (diff === 0) {
      this.progress += 3;
    } else if (diff === -1) {
      this.progress += 1;
    } else if (diff < -1) {
      // no progress increase
    }

    if (this.progress > 100 && this.rank < 8) {
      do {
        this.rank = this.rank + 1;
        this.progress = this.progress - 100;
      } while (this.progress > 100);
    }
  }
}

// let user = new User();
// user.incProgress(-4);
// console.log('rank: ', user.rank);
// console.log('progress: ', user.progress);
//
// user = new User(-1);
// user.incProgress(1);
// console.log('rank: ', user.rank);
// console.log('progress: ', user.progress);
//
// console.log('------------------------------------------------------------------');

let user = new User();

let assert = function(rank, expectedRank, expectedProgress) {
  user.incProgress(rank);
  strictEqual(user.rank, expectedRank, "After applying rank of " + rank + " the resulting user rank was expected to be " + expectedRank + ", but was actually " + user.rank);
  return strictEqual(user.progress, expectedProgress, "After applying rank of " + rank + " the progress was expected to be " + expectedProgress + ", but was actually " + user.progress);
};

let assertError = function(rank) {
  let passed = false;
  try {
    user.incProgress(rank);
  } catch (ex) {
    passed = true;
  }
  return expect(passed, "Expected incProgress(" + rank + ") to raise an error");
};

// it('should properly support incProgress', function(){
assert(-8, -8, 3);

user = new User();
assert(-7, -8, 10);

user = new User();
assert(-6, -8, 40);

user = new User();
assert(-5, -8, 90);

user = new User();
assert(-4, -7, 60);

user = new User();
assert(-8, -8, 3);

user = new User();
assert(1, -2, 40);
assert(1, -2, 80);
assert(1, -1, 20);
assert(1, -1, 30);
assert(1, -1, 40);
assert(2, -1, 80);
assert(2, 1, 20);
assert(-1, 1, 21)
assert(3, 1, 61);
assert(8, 6, 51);
assert(8, 6, 91);
assert(8, 7, 31);
assert(8, 7, 41);
assert(8, 7, 51);
assert(8, 7, 61);
assert(8, 7, 71);
assert(8, 7, 81);
assert(8, 7, 91);
assert(8, 8, 0);
assert(8, 8, 0);

// it('should handle invalid range values', function(){
assertError(9);
assertError(-9);
assertError(0);
