/*
"6 by 6 Skyscraper" Kata from https://www.codewars.com/kata/5679d5a3f2272011d700000d

Strategy:

* Cache all permutations of a line of 6 skyscrapers
* Use clues on the board to narrow down combinations
* Fill in the rest of the board by trying matching permuations

*/

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Permutation from '../permutation';

class SixBySixSkyscraper {
  constructor() {
    this.skyscraperRowPermutations = [];
    this.calculateAllRows();
  }
  calculateAllRows() {
    new Permutation().permutations([1, 2, 3, 4, 5, 6]).forEach((p) => {
      this.skyscraperRowPermutations.push(new SkyscraperRow(p));
    });
  }

  solvePuzzle(clues) {
    this.clues = clues;
    const rows = [];
    const cols = [];
    const unique = {};

    for (let i = 0; i < 6; i++) {
      const col = [clues[i], clues[17 - i]];
      const row = [clues[i + 6], clues[23 - i]];
      cols.push(col);
      rows.push(row);
      if (!unique[col]) unique[col] = [];
      if (!unique[row]) unique[row] = [];
    }

    let count = 0;
    for (let i = 0; i < this.skyscraperRowPermutations.length; i++) {
      for (let u in unique) {
        const [left, right] = u.split(',');
        if (this.skyscraperRowPermutations[i].left === Number(left) && this.skyscraperRowPermutations[i].right === Number(right)) {
          unique[u].push(this.skyscraperRowPermutations[i]);
          count++;
        }
      }
    }

    for (let u in unique) {
      // console.log(u);
      unique[u].forEach(permutation => {
        // console.log(permutation);
      });
    }

    return [];
  }

  show() {
    const c = this.clues;
    console.log(`
     ${c[0]} ${c[1]} ${c[2]} ${c[3]} ${c[4]} ${c[5]}
   +-------------+
 ${c[23]} | 0 0 0 0 0 0 | ${c[6]}
 ${c[22]} | 0 0 0 0 0 0 | ${c[7]}
 ${c[21]} | 0 0 0 0 0 0 | ${c[8]}
 ${c[20]} | 0 0 0 0 0 0 | ${c[9]}
 ${c[19]} | 0 0 0 0 0 0 | ${c[10]}
 ${c[18]} | 0 0 0 0 0 0 | ${c[11]}
   +-------------+
     ${c[17]} ${c[16]} ${c[15]} ${c[14]} ${c[13]} ${c[12]}`);
  }
}

// Store one permutation of 6 skyscrapers, along with count
// of how many skyscrapers are visible from left and right
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
