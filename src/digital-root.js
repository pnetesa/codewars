// 16  -->  1 + 6 = 7
// 942  -->  9 + 4 + 2 = 15  -->  1 + 5 = 6
// 132189  -->  1 + 3 + 2 + 1 + 8 + 9 = 24  -->  2 + 4 = 6
// 493193  -->  4 + 9 + 3 + 1 + 9 + 3 = 29  -->  2 + 9 = 11  -->  1 + 1 = 2

function digitalRoot(n) {
  const result = [...n.toString()].reduce((sum, char) => {
    sum += parseInt(char);
    return sum;
  }, 0);
  return result < 10 ? result : digitalRoot(result);
}

console.log(digitalRoot(64));
console.log(digitalRoot(16));
console.log(digitalRoot(942));
console.log(digitalRoot(132189));
console.log(digitalRoot(493193));
