// "din"      =>  "((("
// "recede"   =>  "()()()"
// "Success"  =>  ")())())"
// "(( @"     =>  "))(("
function duplicateEncodeMy(word){
  const chars = [...word.toLowerCase()];
  const charsMap = chars.reduce((map, char) => {
    if (!map.has(char)) {
      map.set(char, 0);
    }
    const count = parseInt(map.get(char)) + 1;
    map.set(char, count);
    return map;
  }, new Map());

  const encoded = chars.reduce((acc, char) => {
    const count = charsMap.get(char);
    acc.push(count > 1 ? ')' : '(');
    return acc;
  }, []);

  return encoded.join('');
}

function duplicateEncode(word){
  const wordLowered = word.toLowerCase();
  const encoded = [...wordLowered].map((char) =>
    wordLowered.indexOf(char) === wordLowered.lastIndexOf(char) ? '(' : ')');
  return encoded.join('');
}

function duplicateEncode1(word){
  return word
    .toLowerCase()
    .split('')
    .map( function (a, i, w) {
      return w.indexOf(a) == w.lastIndexOf(a) ? '(' : ')'
    })
    .join('');
}

console.log(duplicateEncode('din'));
console.log(duplicateEncode('recede'));
console.log(duplicateEncode('Success'));
console.log(duplicateEncode('(( @'));
