/*
"6 by 6 Skyscraper" Kata from https://www.codewars.com/kata/5679d5a3f2272011d700000d

Strategy:

* Cache all permutations of a line of 6 skyscrapers
* Use clues on the board to reject boards that have wrong combination of rows.
* Think of as a maze backtracking problem and each row is a move.

*/

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Permutation from '../permutation';

class SixBySixSkyscraper {
  constructor() {
    this.permutations = new Permutation().permutations([1, 2, 3, 4, 5, 6]);
  }

  // solve 6 rows (6 generations of moves)
  // start with row 1, pick a permutation. if rejected, pick next permutation
  // if not rejected, row 2 is next. Pick a permutation.

  // board = [721]
  // board = [721, 722]
  // board = [721, 722, 5]
  // board = [721, 722, 5, 22]
  // board = [721, 722, 5, 22, 322]
  // board = [721, 722, 5, 22, 322, 123]

  // recursive function
  nextGeneration(boardArray) {
    for (let row = 0; row < 720; row++) {

      // if successfully found, return true to make sure each recursive loop exits
      if (boardArray.length === 6) {
        const potentiallySolvedBoard = new Board(boardArray, this.clues, this.permutations);
        if (potentiallySolvedBoard.solved()) {
          potentiallySolvedBoard.show();
          return true;
        }
      }
      const newBoardArray = Array.from(boardArray);
      newBoardArray.push(row);
      const board = new Board(newBoardArray, this.clues, this.permutations);

      if (board.rejected()) {
        continue;
      }

      const done = this.nextGeneration(newBoardArray);
      if (done) {
        return true;
      }
    }
  }

  solvePuzzle(clues) {
    this.clues = clues;
    const done = this.nextGeneration([]);
    return done;
    // return board.twoDimensionalArray();
  }
}

// Represent a 6x6 board
// Input is:
//   - a 6 element array, each elements is in permutations index
//   - and clues
class Board {
  constructor(boardArray, cluesArray, permutations) {
    this.board = [];

    if (boardArray) {
      for (let i = 0; i < 6; i++) {
        if (boardArray[i] !== undefined) {
          for (let j = 0; j < 6; j++) {
            this.board.push(permutations[boardArray[i]][j]);
          }
        } else {
          // fill with zeros
          for (let j = 0; j < 6; j++) {
            this.board.push(0);
          }
        }
      }
    } else {
      // fill with zeros
      for (let j = 0; j < 36; j++) {
        this.board.push(0);
      }
    }

    this.clues = cluesArray;
  }

  // check all 24 restraints, if any fail, return true
  rejected() {
    if (this.rejectLine(this.clues[0], 'col-down', 0)) return true;
    if (this.rejectLine(this.clues[1], 'col-down', 1)) return true;
    if (this.rejectLine(this.clues[2], 'col-down', 2)) return true;
    if (this.rejectLine(this.clues[3], 'col-down', 3)) return true;
    if (this.rejectLine(this.clues[4], 'col-down', 4)) return true;
    if (this.rejectLine(this.clues[5], 'col-down', 5)) return true;
    if (this.rejectLine(this.clues[6], 'row-left', 0)) return true;
    if (this.rejectLine(this.clues[7], 'row-left', 1)) return true;
    if (this.rejectLine(this.clues[8], 'row-left', 2)) return true;
    if (this.rejectLine(this.clues[9], 'row-left', 3)) return true;
    if (this.rejectLine(this.clues[10], 'row-left', 4)) return true;
    if (this.rejectLine(this.clues[11], 'row-left', 5)) return true;
    if (this.rejectLine(this.clues[12], 'col-up', 5)) return true;
    if (this.rejectLine(this.clues[13], 'col-up', 4)) return true;
    if (this.rejectLine(this.clues[14], 'col-up', 3)) return true;
    if (this.rejectLine(this.clues[15], 'col-up', 2)) return true;
    if (this.rejectLine(this.clues[16], 'col-up', 1)) return true;
    if (this.rejectLine(this.clues[17], 'col-up', 0)) return true;
    if (this.rejectLine(this.clues[18], 'row-right', 5)) return true;
    if (this.rejectLine(this.clues[19], 'row-right', 4)) return true;
    if (this.rejectLine(this.clues[20], 'row-right', 3)) return true;
    if (this.rejectLine(this.clues[21], 'row-right', 2)) return true;
    if (this.rejectLine(this.clues[22], 'row-right', 1)) return true;
    if (this.rejectLine(this.clues[23], 'row-right', 0)) return true;
    return false;
  }

  // count number of skyscrapers in array
  // shortcircuit if we go above clue value
  countSkyscrapers(array, clue) {
    let lowestBuilding = 0;
    let count = 0;
    for (let i = 0; i < 6; i++) {
      const el = array[i];
      if (el > lowestBuilding) {
        lowestBuilding = el;
        count++;
        if (count > clue) return count;
      }
    }
    return count;
  }

  getColumnDown(colNumber) {
    return [0, 1, 2, 3, 4, 5].map((i) => this.board[6 * i + colNumber]);
  }

  getColumnUp(colNumber) {
    return this.getColumnDown(colNumber).reverse();
  }

  getRowRight(rowNumber) {
    return [0, 1, 2, 3, 4, 5].map((i) => this.board[6 * rowNumber + i]);
  }

  getRowLeft(rowNumber) {
    return this.getRowRight(rowNumber).reverse();
  }

  rejectLine(clue, direction, num) {
    if (clue === 0) return false; // missing clue, consider things to be good
    let array;
    switch (direction) {
    case 'col-down':
      array = this.getColumnDown(num);
      break;
    case 'col-up':
      array = this.getColumnUp(num);
      break;
    case 'row-left':
      array = this.getRowLeft(num);
      break;
    case 'row-right':
      array = this.getRowRight(num);
      break;
    }

    // if any dups of 1,2,3,4,5 or 6 reject!
    const counts = {};
    for (let i = 0; i < 6; i++) {
      const el = array[i];
      if (counts[el]) {
        return true;  // there's more than one
      }
      if (el !== 0) {  // don't count 0's
        counts[el] = 1;
      }
    }

    // if there are zeros in the row use ">" otherwise use "!=="
    const count = this.countSkyscrapers(array, clue);
    if (array.filter((el) => el !== 0).length == 6) {
      // no zeros
      if (count !== clue) {
        return true;
      }
    } else {
      // there are zeros
      // skip and line that stats with zero to not screw up calculation.
      //   which is mainly col-up since these are zeros until the last move (last row added)
      if (array[0] > 0 && this.countSkyscrapers(array, clue) > clue) {
        return true;
      }
    }
    return false;
  }

  // solved if board contains all numbers > 0 and is not rejected
  solved() {
    const allNumbers = this.board.filter((el) => el === 0).length === 0;
    return allNumbers && !this.rejected();
  }

  twoDimensionalArray() {
    const result = [];
    for (let i = 0; i < 6; i++) {
      result.push(this.board.slice(6 * i, 6 * i + 6));
    }
    return result;
  }

  show () {
    const c = this.clues;
    const b = this.board;
    console.log(`
     ${c[0]} ${c[1]} ${c[2]} ${c[3]} ${c[4]} ${c[5]}
   +-------------+
 ${c[23]} | ${b[0]} ${b[1]} ${b[2]} ${b[3]} ${b[4]} ${b[5]} | ${c[6]}
 ${c[22]} | ${b[6]} ${b[7]} ${b[8]} ${b[9]} ${b[10]} ${b[11]} | ${c[7]}
 ${c[21]} | ${b[12]} ${b[13]} ${b[14]} ${b[15]} ${b[16]} ${b[17]} | ${c[8]}
 ${c[20]} | ${b[18]} ${b[19]} ${b[20]} ${b[21]} ${b[22]} ${b[23]} | ${c[9]}
 ${c[19]} | ${b[24]} ${b[25]} ${b[26]} ${b[27]} ${b[28]} ${b[29]} | ${c[10]}
 ${c[18]} | ${b[30]} ${b[31]} ${b[32]} ${b[33]} ${b[34]} ${b[35]} | ${c[11]}
   +-------------+
     ${c[17]} ${c[16]} ${c[15]} ${c[14]} ${c[13]} ${c[12]}`);
  }
}

export { SixBySixSkyscraper, Board };
