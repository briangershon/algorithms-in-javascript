/*
  Calculate Fibonacci.

  This is a bottom-up version using iteration and minimal memory
  since we just save last two values, not all of them.
*/
class Fibonacci {
  calc(i) {
    if (i === 0) {
      return 0;
    }

    let prevPrev = 0;
    let prev = 1;

    for (let n = 2; n < i; n += 1) {
      const newest = prev + prevPrev;
      prevPrev = prev;
      prev = newest;
    }
    return prev + prevPrev;
  }
}

export default Fibonacci;