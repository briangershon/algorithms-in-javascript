/*
"Optimized Pathfinding" Kata from https://www.codewars.com/kata/57b4d2dad2a31c75f7000223

Strategy:

  * Use backtracking algorithm to find routes

I wrote the initial code here: https://github.com/briangershon/algorithms-in-javascript

*/

class PathfindingReachableFields {
  constructor(grid, rows, columns, startRow, startColumn) {
    this.debug = false;
    this.grid = grid;
    this.rows = rows;
    this.columns = columns;
    this.currentRow = startRow;
    this.currentColumn = startColumn;
    this.WALL = '#';
    this.GOAL = 'G';
    this.SPACE = ' ';
    this.ME = '*';
    this.goalsReached = {};
  }

  numberOfReachableFields() {
    if (this.debug) this.show();
    this.move([-1, -1], [this.currentRow, this.currentColumn]);
    return Object.keys(this.goalsReached).length;
  }

  move(prevLocation, toLocation) {
    if (this.debug) console.log(`Moving from ${prevLocation} to ${toLocation}`);

    if (this.charAtRowCol(toLocation) === this.GOAL) {
      this.goalsReached[toLocation] = true;
    }

    const moves = this.availableMoves(toLocation);
    if (moves) {
      for (let m = 0; m < moves.length; m++) {
        if (moves[m][0] === prevLocation[0] && moves[m][1] === prevLocation[1]) {
          continue; // only follow moves that don't go back to where we just came from
        }
        this.move(toLocation, moves[m]);
      }
    }

    return false; // no more moves at this generation
  }

  availableMoves(location) {
    const [r, c] = location;
    const moves = [];

    const leftAvailable = (c > 0 && (this.charAtRowCol([r, c - 1]) === this.SPACE || this.charAtRowCol([r, c - 1]) === this.GOAL));

    const rightAvailable = (c < this.columns - 1 && (this.charAtRowCol([r, c + 1]) === this.SPACE || this.charAtRowCol([r, c + 1]) === this.GOAL));

    const forwardAvailable = (r < this.rows - 1 && (this.charAtRowCol([r + 1, c]) === this.SPACE || this.charAtRowCol([r + 1, c]) === this.GOAL));

    if (forwardAvailable) moves.push([r + 1, c]);
    if (leftAvailable) moves.push([r, c - 1]);
    if (rightAvailable) moves.push([r, c + 1]);

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
    const gridItem = this.grid[row][col];
    switch (gridItem) {
    case true:
      if (row === this.rows - 1) return this.GOAL;
      return this.SPACE;
    case false:
      return this.WALL;
    }
  }

}

export default PathfindingReachableFields;