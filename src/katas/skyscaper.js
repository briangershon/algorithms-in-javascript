/*
"6 by 6 Skyscraper" Kata from https://www.codewars.com/kata/5679d5a3f2272011d700000d

Strategy:

* Cache all permutations of a line of 6 skyscrapers
* Use clues on the board to reject boards that have wrong combination of rows.
* Think of as a maze backtracking problem and each row is a move.
* Optimize by starting with the side of the puzzle that has the most clues.
* Optimize by starting with permutations in highest lexicographical order.

*/

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import Permutation from '../permutation';

class Skyscraper {
  constructor() {
    this.permutations = new Permutation().permutations([1, 2, 3, 4, 5, 6]).reverse();
    this.iterations = 0;

    // // for debugging
    // const counts = {};
    // const b = new Board();
    // this.permutations.forEach((p) => {
    //   const left = b.countSkyscrapers(p, 6);
    //   const right = b.countSkyscrapers(Array.from(p).reverse(), 6);
    //   if (counts[''+left+right]) {
    //     counts[''+left+right]++;
    //   } else {
    //     counts[''+left+right] = 1;
    //   }
    // });
    // console.log(counts);
  }

  // solve 6 rows (6 generations of moves)
  // start with row 1, pick a permutation. if rejected, pick next permutation
  // if not rejected, row 2 is next. Pick a permutation. Recursive.

  // board = [721]
  // board = [721, 722]
  // board = [721, 722, 5]
  // board = [721, 722, 5, 22]
  // board = [721, 722, 5, 22, 322]
  // board = [721, 722, 5, 22, 322, 123]

  // recursive function
  nextGeneration(boardArray, rowClues) {
    const generation = boardArray.length;
    if (generation === 6) {
      return false;
    }

    for (let row = 0; row < rowClues[generation].perms.length; row++) {
      this.iterations++;
      const newBoardArray = Array.from(boardArray);
      newBoardArray.push(rowClues[generation].perms[row]);
      const board = new Board(newBoardArray, this.clues, this.permutations);

      if (board.rejected()) {
        continue;
      }

      // if successfully found, return true to make sure each recursive loop exits
      if (generation === 5) {
        const potentiallySolvedBoard = new Board(newBoardArray, this.clues, this.permutations);
        if (potentiallySolvedBoard.solved()) {
          // potentiallySolvedBoard.show();
          return { result: potentiallySolvedBoard };
        }
      }

      const done = this.nextGeneration(newBoardArray, rowClues);
      if (done) {
        return done;
      }
    }
    return false; // didn't find a solution in this loop
  }

  // rotates cues so that we start with the best clue at row 0
  // to reduce number of initial iterations.
  bestPlaceToStart(incomingClues) {

    // penalize clues that have more zeros
    function weightedClue(clue) {
      return clue ? clue : - 10;
    }

    const sideClues = [
      {
        direction: 'top',
        count:
          weightedClue(incomingClues[6]) + weightedClue(incomingClues[7]) + weightedClue(incomingClues[6]) +
          weightedClue(incomingClues[21]) + weightedClue(incomingClues[22]) + weightedClue(incomingClues[23])
      },
      {
        direction: 'bottom',
        count:
          weightedClue(incomingClues[9]) + weightedClue(incomingClues[10]) + weightedClue(incomingClues[11]) +
          weightedClue(incomingClues[18]) + weightedClue(incomingClues[19]) + weightedClue(incomingClues[20])
      },
      {
        direction: 'left',
        count:
          weightedClue(incomingClues[0]) + weightedClue(incomingClues[1]) + weightedClue(incomingClues[2]) +
          weightedClue(incomingClues[15]) + weightedClue(incomingClues[16]) + weightedClue(incomingClues[17])
      },
      {
        direction: 'right',
        count:
          weightedClue(incomingClues[3]) +  weightedClue(incomingClues[4]) + weightedClue(incomingClues[5]) +
          weightedClue(incomingClues[12]) + weightedClue(incomingClues[13]) + weightedClue(incomingClues[14])
      }
    ];
    sideClues.sort((a, b) => b.count - a.count);
    const bestDirection = sideClues[0].direction;

    let clues;
    let c1;
    let c2;
    let c3;
    let c4;
    switch(bestDirection) {
    case 'top':
      clues = incomingClues;
      break;
    case 'bottom': // shift bottom to the first row
      c1 = incomingClues.slice(12, 18).reverse();
      c2 = incomingClues.slice(6, 12).reverse();
      c3 = incomingClues.slice(0, 6).reverse();
      c4 = incomingClues.slice(18, 24).reverse();
      clues = c1.concat(c2).concat(c3).concat(c4);
      break;
    case 'left': // shift left side to the first row
      c1 = incomingClues.slice(18, 24);
      c2 = incomingClues.slice(0, 18);
      clues = c1.concat(c2);
      break;
    case 'right': // shift right side to the first row
      c1 = incomingClues.slice(6, 24);
      c2 = incomingClues.slice(0, 6);
      clues = c1.concat(c2);
      break;
    }
    return { startAt: bestDirection, clues };
  }

  solvePuzzle(incomingClues) {
    this.iterations = 0;
    const { startAt, clues } = this.bestPlaceToStart(incomingClues);

    this.startAt = startAt;
    this.clues = clues;

    // // debug
    // const initialBoard = new Board([], incomingClues, this.permutations);
    // initialBoard.show();
    // const transformedBoard = new Board([], clues, this.permutations);
    // transformedBoard.show();
    // return;

    // Build array of potential permutations for each row separately
    // based on clues to reduce number of iterations overall.
    // Without optimization, every loop would have 720 elements.
    const b = new Board();
    const rowClues = [];
    for (let row = 0; row < 6; row++) {
      const left = clues[23 - row];
      const right = clues[6 + row];
      const perms = [];
      for (let p = 0; p < this.permutations.length; p++) {
        const l = b.countSkyscrapers(this.permutations[p], 6);
        const r = b.countSkyscrapers(Array.from(this.permutations[p]).reverse(), 6);
        if (left === 0 && right === 0) { perms.push(p); continue; }
        if (left === 0 && r === right) { perms.push(p); continue; }
        if (right === 0 && l === left) { perms.push(p); continue; }
        if (l === left && r === right) { perms.push(p); continue; }
      }
      rowClues.push({ row, perms });
    }

    // console.time('Solved in');
    const { result: board } = this.nextGeneration([], rowClues, 0);
    // console.timeEnd('Solved in');
    // console.log(`${this.iterations} total iterations`);
    return board.twoDimensionalArray(startAt);
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

    // verify no columns have dups since there may not be enough clues
    for (let c = 0; c < 6; c++) {
      if (this.hasDuplicates(this.getColumnDown(c)))  {
        return true;
      }
    }
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
    return Array.from(this.getColumnDown(colNumber)).reverse();
  }

  getRowRight(rowNumber) {
    return [0, 1, 2, 3, 4, 5].map((i) => this.board[6 * rowNumber + i]);
  }

  getRowLeft(rowNumber) {
    return Array.from(this.getRowRight(rowNumber)).reverse();
  }

  hasDuplicates(array) {
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
    return false;
  }

  rejectLine(clue, direction, num) {
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

    // if any duplicate numbers in a row, reject!
    if (this.hasDuplicates(array)) return true;

    if (clue === 0) return false; // missing clue, consider things to be good

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

  twoDimensionalArray(direction) {
    const result = [];
    switch (direction) {
    case 'top':
      for (let i = 0; i < 6; i++) {
        result.push(this.board.slice(6 * i, 6 * i + 6));
      }
      return result;
    case 'bottom':
      for (let i = 0; i < 6; i++) {
        result.push(this.board.slice(6 * i, 6 * i + 6));
      }
      return result.reverse();
    case 'left':
      for (let row = 0; row < 6; row++) {
        const buildRow = [];
        for (let i = 0; i < 6; i++) {
          buildRow.push(this.board[6 * i + 5 - row]);
        }
        result.push(buildRow);
      }
      return result;
    case 'right':
      for (let row = 0; row < 6; row++) {
        const buildRow = [];
        for (let i = 5; i >= 0; i--) {
          buildRow.push(this.board[6 * i + row]);
        }
        result.push(buildRow);
      }
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

export { Skyscraper, Board };
