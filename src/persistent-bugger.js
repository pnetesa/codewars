// 39 --> 3 (because 3*9 = 27, 2*7 = 14, 1*4 = 4 and 4 has only one digit)
// 999 --> 4 (because 9*9*9 = 729, 7*2*9 = 126, 1*2*6 = 12, and finally 1*2 = 2)
// 4 --> 0 (because 4 is already a one-digit number)
function persistence(num) {
  if (num < 10) return 0;

  const multiplyStep = (num, step) => {
    const result = [...num.toString()].reduce((acc, char) => {
      acc *= parseInt(char);
      return acc;
    }, 1);
    return result < 10 ? step : multiplyStep(result, step + 1);
  };

  return multiplyStep(num, 1);
}

console.log(persistence(39));
console.log(persistence(999));
console.log(persistence(4));
