/*
  Calculate Fibonacci.

  This is initial naive slow version.
*/
class Fibonacci {
  calc(i) {
    if (i === 0 || i === 1) {
      return i;
    }
    return this.calc(i - 1) + this.calc(i - 2);
  }
}

export default Fibonacci;