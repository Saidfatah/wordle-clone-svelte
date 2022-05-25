import wordsStore from "./wordsStore";
import words from "./wordsList";

export const todaysWord = getTodaysWord();
export const todaysWordCharacters = todaysWord
  .split("")
  .reduce((a, c, i) => [...a, c], []);

function getTodaysWord() {
  var wordValues = Object.keys(words);
  //I'm using Left shift (<<) here because its cool
  const randomWord = wordValues[(wordValues.length * Math.random()) << 0];
  return randomWord;
}
export const validateWord = (word) => {
  // check if the entered entry is an actual word
  const isValid = words.hasOwnProperty(word);
  wordsStore.updateWordIsValid(isValid);
  return words.hasOwnProperty(word);
};
