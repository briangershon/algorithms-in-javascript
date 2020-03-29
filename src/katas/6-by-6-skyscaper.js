import 'core-js/stable';
import 'regenerator-runtime/runtime';

/*
"6 by 6 Skyscraper" Kata from https://www.codewars.com/kata/5679d5a3f2272011d700000d

Strategy:

* Cache all permutations of a line of 6 skyscrapers
* Use clues on the board to narrow down combinations
* Fill in the rest of the board by trying matching permuations

*/

class SixBySixSkyscraper {
  constructor() {
    this.skyscraperRowPermutations = [];
  }
  calculateAllRows() {
    for (let p of findNextPermutation([1, 2, 3, 4, 5, 6])) {
      this.skyscraperRowPermutations.push(new SkyscraperRow(p));
    }
  }
}

function* findNextPermutation(array) {
  let currentPerm = array.sort((a, b) => a - b);
  yield currentPerm;
  for (;;) {
    const next = nextLexPermutation(currentPerm);
    if (next === null) break;
    yield next;
    currentPerm = next;
  }
}

// Algorithm reference: https://www.nayuki.io/page/next-lexicographical-permutation-algorithm
// given a current permutation, figure out the next one in lexicographical order
function nextLexPermutation(a) {
  const array = Array.from(a);
  const i = findLongestAscendingSequenceIndex(array);

  if (i >= 0) {
    // find first character that's greater than character at i
    for (let j = array.length - 1; j >= 0; j--) {
      if (array[j] > array[i]) {
        // swap first character in longest sequence and right-mode bigger character
        [array[j], array[i]] = [array[i], array[j]];
        // reverse suffix and return final array
        return array.slice(0, i + 1).concat(array.slice(i + 1).sort());
      }
    }
  }
  return null;  // no more permutations, we're 100% in lexicographical order
}

// walk backward and find longest non-increasing suffix
function findLongestAscendingSequenceIndex(array) {
  let last = array[array.length - 1];
  for (let i = array.length - 2; i >= 0; i--) {
    if (array[i] >= last) {
      last = array[i];
    } else {
      return i;
    }
  }
  return null;
}

// store one permutation of 6 skyscrapers
class SkyscraperRow {
  constructor(array) {
    this.array = array;
    this.left = 0;  // number of builds person on left side will see
    this.right = 0; // number of builds person on right side will see
    this.calculate();
  }

  // left: 6  -> 1, 2, 3, 4, 5, 6  <- right: 1
  calculate() {
    let lowestBuildingSoFarLeft = 0;
    let lowestBuildingSoFarRight = 0;
    for (let i = 0; i < this.array.length; i++) {
      if (this.array[i] > lowestBuildingSoFarLeft) {
        lowestBuildingSoFarLeft = this.array[i];
        this.left++;
      }
      const rightIndex = this.array.length - i - 1;
      if ((this.array[rightIndex]) > lowestBuildingSoFarRight) {
        lowestBuildingSoFarRight = this.array[rightIndex];
        this.right++;
      }
    }
  }
}

export { SixBySixSkyscraper, SkyscraperRow };
