/*
  Calculate Fibonacci.

  This is a top-down version with memoization and recursion.
*/
class Fibonacci {
  constructor() {
    this.memo = {
      0: 0,
      1: 1,
    };
  }

  calc(i) {
    if (this.memo.hasOwnProperty(i)) {
      return this.memo[i];
    }

    this.memo[i] = this.calc(i - 1) + this.calc(i - 2); 
    return this.memo[i];
  }
}

export default Fibonacci;