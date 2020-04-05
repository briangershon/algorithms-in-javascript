/*
"Optimized Pathfinding" Kata from https://www.codewars.com/kata/57b4d2dad2a31c75f7000223

Strategy:

  * Use backtracking algorithm to find routes

I wrote initial code here: https://github.com/briangershon/algorithms-in-javascript

*/

class PathfindingReachableFields {
  constructor(grid, rows, columns, startRow, startColumn) {
    this.grid = grid;
    this.rows = rows;
    this.columns = columns;
    this.startRow = startRow;
    this.startColumn = startColumn;
  }

  numberOfReachableFields() {
    return 0;
  }
}

export default PathfindingReachableFields;