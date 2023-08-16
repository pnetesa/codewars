String.prototype.toCapitalCase = function () {
  const words = this.split(' ');
  const capitalized = words.reduce((result, word) => {
    // result.push(word[0].toUpperCase() + word.substring(1));
    result.push(word.charAt(0).toUpperCase() + word.substring(1));
    return result;
  }, []);
  return capitalized.join(' ');
}

const line = 'hello world asdf';
console.log(line.toCapitalCase());
