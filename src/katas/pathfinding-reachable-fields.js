/*
"Optimized Pathfinding" Kata from https://www.codewars.com/kata/57b4d2dad2a31c75f7000223

Strategy:

  * Start at each goal, and pathfind our way to the starting space.
  * Use backtracking algorithm to find routes

I wrote the initial code here: https://github.com/briangershon/algorithms-in-javascript

*/

class PathfindingReachableFields {
  constructor(grid, rows, columns, startRow, startColumn) {
    this.debug = false;
    this.grid = grid;
    this.rows = rows;
    this.columns = columns;
    this.startRow = startRow;
    this.startColumn = startColumn;
    this.WALL = '#';
    this.GOAL = 'G';
    this.SPACE = ' ';
    this.ME = '*';

    this.moves = -1;
  }

  numberOfReachableFields() {
    this.moves = -1;
    if (this.debug) this.show();

    const potentialReachableFields = [];
    const lastRow = this.rows - 1;

    // optimization: if a goal is next to another goal, count it true
    // since piece can always get there if it can get to other one

    let firstGoal = false;
    for (let c = 0; c < this.columns; c++) {
      if (!this.grid[lastRow][c]) {
        potentialReachableFields.push(false);
        firstGoal = false;
        continue;
      }
      if (this.grid[lastRow][c] && !firstGoal) {
        potentialReachableFields.push(this.move([-1, -1], [lastRow, c]));
        firstGoal = true;
      } else {
        // part of a contiguous exit, so use same result as previous result
        potentialReachableFields.push(potentialReachableFields[c - 1]);
      }
    }

    const success = potentialReachableFields.filter((f) => {
      return f;
    });

    return success.length;
  }

  move(prevLocation, toLocation) {
    this.moves++;
    if (this.debug) console.log(`Moving from ${prevLocation} to ${toLocation}`);

    if (toLocation[0] === this.startRow && toLocation[1] === this.startColumn) {
      if (this.debug) console.log('found player!', toLocation);
      return true; // successfully found player
    }

    const moves = this.availableMoves(toLocation);
    if (moves) {
      for (let m = 0; m < moves.length; m++) {
        if (moves[m][0] === prevLocation[0] && moves[m][1] === prevLocation[1]) {
          continue; // only follow moves that don't go back to where we just came from
        }
        const result = this.move(toLocation, moves[m]);
        if (result) return true;
      }
    }

    return false; // no more moves at this generation
  }

  availableMoves(location) {
    const [r, c] = location;
    const moves = [];

    const leftAvailable = (c > 0 && (this.charAtRowCol([r, c - 1]) === this.SPACE || this.charAtRowCol([r, c - 1]) === this.ME));

    const rightAvailable = (c < this.columns - 1 && (this.charAtRowCol([r, c + 1]) === this.SPACE || this.charAtRowCol([r, c + 1]) === this.ME));

    const backAvailable = (r > this.startRow) && (r > 0 && (this.charAtRowCol([r - 1, c]) === this.SPACE || this.charAtRowCol([r - 1, c]) === this.ME));

    if (this.startColumn < c) {
      if (leftAvailable) moves.push([r, c - 1]);
      if (backAvailable) moves.push([r - 1, c]);
      if (rightAvailable) moves.push([r, c + 1]);
    } else if (this.startColumn > c) {
      if (rightAvailable) moves.push([r, c + 1]);
      if (backAvailable) moves.push([r - 1, c]);
      if (leftAvailable) moves.push([r, c - 1]);
    } else {
      if (backAvailable) moves.push([r - 1, c]);
      if (rightAvailable) moves.push([r, c + 1]);
      if (leftAvailable) moves.push([r, c - 1]);
    }

    if (moves.length) {
      return moves;
    }
    return false;
  }

  show() {
    const final = [];
    const columnHeader = ['      |'];
    for (let c = 0; c < this.columns; c++) {
      columnHeader.push(`${('' + c).padStart(3, 0)}|`);
    }
    final.push(columnHeader.join('') + '\n');

    for (let r = 0; r < this.rows; r++) {
      const row = [];
      row.push(` ${(''+r).padStart(4, 0)} |`);
      for (let c = 0; c < this.columns; c++) {
        row.push(` ${this.charAtRowCol([r, c])} |`);
      }
      final.push(row.join('') + '\n');
    }
    console.log(final.join(''));
  }

  charAtRowCol([row, col]) {
    if (row === this.startRow && col === this.startColumn) return this.ME;
    const gridItem = this.grid[row][col];
    switch (Boolean(gridItem)) {
    case true:
      return this.SPACE;
    case false:
      return this.WALL;
    }
  }

}

export default PathfindingReachableFields;