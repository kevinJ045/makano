var pickRandom = function(){
  var words = arguments;
  if(words.length <= 1) return arguments[0];
  if(arguments[0] instanceof Array) words = arguments[0];
  var randomWord = Array.from(words);
  var rand = Math.floor(Math.random() * randomWord.length);
  return randomWord[rand];
}

var randFrom = function(min,max) {
  return Math.floor(Math.random()*(max-min+1)+min);
}

function shuffleArray(array) {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}


export { pickRandom, randFrom, shuffleArray };