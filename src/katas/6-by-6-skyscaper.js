import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Permutation from '../permutation';

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
    this.skyscraperRowPermutations = new Permutation().permutations([1, 2, 3, 4, 5, 6]);
  }
}

// store one permutation of 6 skyscrapers
class SkyscraperRow {
  constructor(array) {
    this.array = array;
    this.left = 0;  // number of builds person on left side will see
    this.right = 0; // number of builds person on right side will see
    this.calculate();
  }

  // for 1, 2, 3, 4, 5, 6 this function calculates the number
  // of buildings seen from left and right.
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
