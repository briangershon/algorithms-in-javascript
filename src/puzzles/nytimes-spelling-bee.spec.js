import { NYTimesSpellingBeeHints } from './nytimes-spelling-bee';
const fs = require('fs');

describe('NYTimesSpellingBeeHints', () => {
  const words = {};
  beforeEach(() => {
    console.time('import');
    const data = fs.readFileSync('./src/puzzles/words_alpha.txt');
    let count = 0;
    let tossed = 0;
    data.toString().split('\r\n').forEach((word) => {
      if (word.length >= 4) {
        words[word] = true;
        count++;
      } else {
        tossed++;
      }
    });
    console.log('import count, tossed', count, tossed);
    console.timeEnd('import');
  });
  // test('4 to 7 letter words', () => {
  //   const dictArray = ['pommelo', 'pollee', 'pollex', 'pommel', 'pomelo', 'people', 'pompom', 'pommee', 'molle', 'molpe', 'pomel', 'meloe', 'ploce', 'pomme', 'moll', 'poll', 'lolo', 'mole', 'loom', 'mool', 'plop', 'olpe', 'pole', 'polo', 'pool', 'oleo', 'loco', 'mome', 'momo', 'pomp', 'poem', 'pome', 'pomo', 'moco', 'poco', 'coco' ];
  //   const dict = {};
  //   dictArray.forEach((word) => {
  //     dict[word] = true;
  //   });
  //   console.time('wordsWithAtleastFour');
  //   const hints = new NYTimesSpellingBeeHints('O', ['L', 'M', 'P', 'E', 'C', 'X'], dict);
  //   const result = hints.wordsWithAtleastFourCharacters()
  //   console.log(result);
  //   console.timeEnd('wordsWithAtleastFour');
  //   expect(result.length).toEqual(36);
  // });

  test('4 to 7 letter words', () => {
    // const dictArray = ['pommelo', 'pollee', 'pollex', 'pommel', 'pomelo', 'people', 'pompom', 'pommee', 'molle', 'molpe', 'pomel', 'meloe', 'ploce', 'pomme', 'moll', 'poll', 'lolo', 'mole', 'loom', 'mool', 'plop', 'olpe', 'pole', 'polo', 'pool', 'oleo', 'loco', 'mome', 'momo', 'pomp', 'poem', 'pome', 'pomo', 'moco', 'poco', 'coco' ];
    // const dict = {};
    // dictArray.forEach((word) => {
    //   dict[word] = true;
    // });
    console.time('wordsWithAtleastFour');
    const hints = new NYTimesSpellingBeeHints('R', ['L', 'T', 'V', 'C', 'O', 'I'], words);
    const result = hints.wordsWithAtleastFourCharacters()
    console.log(result);
    console.timeEnd('wordsWithAtleastFour');
    expect(result.length).toEqual(36);
  });

});
