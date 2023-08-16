// 1 eyes : or ;
// 2 nose - or ~
// 3 smiling mouth ) or D
// Valid smiley face examples: :) :D ;-D :~)
// Invalid smiley faces: ;( :> :} :]

// Error: Incorrect answer for arr=[":---)" , "))" , ";~~D" , ";D"]: expected 3 to equal 1
function countSmileysTry1(arr) {
  const regExp = /^[:|;][-|~]*[)|D]$/;
  let count = 0;
  arr.forEach((smiley) => {
    if (regExp.test(smiley)) count += 1;
  });

  return count;
}

function countSmileysCorrect(arr) {
  const regExp = /^[:|;][-|~]?[)|D]$/;
  let count = 0;
  arr.forEach((smiley) => {
    if (regExp.test(smiley)) count += 1;
  });

  return count;
}

function countSmileys(arr) {
  const regExp = /^[:;][-~]?[\)D]$/;
  return arr.filter(smiley => regExp.test(smiley)).length
}

console.log(countSmileys([':)', ';(', ';}', ':-D']));       // should return 2;
console.log(countSmileys([';D', ':-(', ':-)', ';~)']));     // should return 3;
console.log(countSmileys([';]', ':[', ';*', ':$', ';-D'])); // should return 1;
console.log(countSmileys([':---)', '))', ';~~D', ';D'])); // should return 1;

