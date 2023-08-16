// "camelCasing"  =>  "camel Casing"
// "identifier"   =>  "identifier"
// ""             =>  ""

// complete the function
function solution(string) {
  const result = [];
  let begin = 0;
  let i = 0;
  for (; i < string.length; i++) {
    const char = string.charAt(i);
    if (char.trim() === char.toUpperCase()) {
      result.push(string.substring(begin, i));
      begin = i;
    }
  }
  result.push(string.substring(begin, i));
  return result.join(' ');
}

console.log(solution('camelCasing'));
console.log(solution('identifier'));
console.log(solution(''));
