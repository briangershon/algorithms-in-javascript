import Fibonacci from './fibonacci';

// 0 1 2 3 5 8 13 21 34

describe('Fibonacci correct find n element', () => {
  test('when n = 0', () => {
    const result = new Fibonacci().calc(0);
    expect(result).toEqual(0);
  });

  test('when n = 1', () => {
    const result = new Fibonacci().calc(1);
    expect(result).toEqual(1);
  });

  test('when n = 8', () => {
    const result = new Fibonacci().calc(8);
    expect(result).toEqual(21);
  });

  test('when n = 20', () => {
    console.time('20');
    const result = new Fibonacci().calc(20);
    console.timeEnd('20');
    expect(result).toEqual(6765);
  });

  test('when n = 40', () => {
    console.time('40');
    const result = new Fibonacci().calc(40);
    console.timeEnd('40');
    expect(result).toEqual(102334155);
  });

  // this takes a long time using naive method
  // Note that 78 is the highest Fib that can be
  //  represented in JavaScript's 64 bit integer
  //  (9007199254740991)
  // test('when n = 78', () => {
  //   console.time('78');
  //   const result = new Fibonacci().calc(78);
  //   console.timeEnd('78');
  //   expect(result).toEqual(8944394323791464);
  // });
});
