/*
For n cents, how many combinations of change can you make
with quarters, dimes, nickels and pennies?

If denominations is [1, 2, 3] there are 4 combinations:

  [3, 1]
  [2, 2]
  [1, 1, 1, 1]
  [2, 1, 1]
*/

class MakeChange {
  constructor() {
    this.timesCalled = 0;
  }
  count(denominations, changeAmount) {
    const c = this.findCount(denominations, denominations.length, changeAmount);
    // console.log(`For change amount ${changeAmount}, total calls were ${this.timesCalled} without memoization`);
    return c;
  }

  findCount(denominations, m, n) {
    this.timesCalled += 1;
    // if desired amount is 0, there is one solution
    if (n === 0) {
      return 1;
    }

    // if desired amount is less than zero, there is no solution
    if (n < 0) {
      return 0;
    }

    // if there are no coins, and desired amount is > 0, no solution exists
    if (m <= 0 && n > 0) {
      return 0;
    }

    /*
      If denominations is [1, 2, 3] and you're looking for 4
        which is [1, 2, 3], 4

      Break problem into adding both:

      1. Use same denominations, but look for value after subtracting largest demonination:
          [1, 2, 3], 1

      2. Use one less denomination, and try again with n
          [1, 2], 4
    */
    return this.findCount(denominations, m, n - denominations[m-1] ) + this.findCount(denominations, m - 1, n);
  }
}

export default MakeChange;