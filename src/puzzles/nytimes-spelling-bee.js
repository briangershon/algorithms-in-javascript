/*
Hints for the New York Times Spelling Bee puzzle.

Strategy:

* Find all combinations of 7 letters, that all include one central letter
* Find all permutations that include all 7 letters.
*/

import combinations from '../combinations';
import Permutation from '../permutation';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

class NYTimesSpellingBeeHints {
  constructor(singleLetter, remainingSixLetters, wordDictionary) {
    this.dict = wordDictionary;
    this.singleLetter = singleLetter.toLowerCase();
    this.remainingSixLetters = remainingSixLetters.map((letter) => {
      return letter.toLowerCase();
    });
    this.allLetters = Array.from(this.remainingSixLetters);
    this.allLetters.push(this.singleLetter);
  }

  wordsWithAtleastFourCharacters() {
    const dict = this.dict;
    const requiredLetter = this.singleLetter;
    const doubleLetters = [];
    this.allLetters.forEach((letter) => {
      doubleLetters.push(letter);
      doubleLetters.push(letter);
      doubleLetters.push(letter);
    });
    const result = {};
    let comboCount = 0;
    let permCount = 0;
    console.log('double letters', doubleLetters);
    for (let wordArray of combinations(doubleLetters)) {
      // if word is right size and contains the one required character
      if (wordArray.length >= 4 && wordArray.length <= 7 && wordArray.indexOf(requiredLetter) > -1) {
        const wordPerms = new Permutation().permutations(wordArray);
        wordPerms.forEach((w) => {
          permCount++;
          const joined = w.join('');
          if (dict[joined]) {
            result[joined] = true;
          }
        });
      }
      comboCount++;
    }
    console.log('comboCount', comboCount);
    console.log('permCount', permCount);
    console.log('count', Object.keys(result).length);
    return Object.keys(result).sort((a,b) => { return b.length - a.length; });
  }
}

export { NYTimesSpellingBeeHints };
