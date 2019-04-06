/*
  Calculate Fibonacci.

  This is a bottom-up version using memoization and iteration.
*/
class Fibonacci {
  constructor() {
    this.memo = {
      0: 0,
      1: 1,
    };
  }

  calc(i) {
    if (i === 0 || i === 1) {
      return i;
    }

    let total = 2;
    for (let n = 2; n < i - 1; n += 1) {
      if (this.memo.hasOwnProperty(i)) {
        total += this.memo[n];
      } else {
        this.memo[n] = this.memo[n - 1] + this.memo[n - 2];
        total += this.memo[n];
      }
    }
    return total;
  }
}

export default Fibonacci;