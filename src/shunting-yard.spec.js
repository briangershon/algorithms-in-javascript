import ShuntingYard from './shunting-yard';

describe('ShuntingYard returns Reverse Polish Notation', () => {
  test('when there is only one value (no operators)', () => {
    const yard = new ShuntingYard();
    expect(yard.toReversePolishNotation('1')).toEqual([1]);
  });
  test('when multiplying two values', () => {
    const yard = new ShuntingYard();
    expect(yard.toReversePolishNotation('2 * 100')).toEqual([2, 100, '*']);
  });
  test('when multiplying and adding values', () => {
    const yard = new ShuntingYard();
    expect(yard.toReversePolishNotation('2 * 100 + 46')).toEqual([2, 100, '*', 46, '+']);
  });
  test('support for parenthesis', () => {
    const yard = new ShuntingYard();
    expect(yard.toReversePolishNotation('2 * ( 100 + 46 )')).toEqual([2, 100, 46, '+', '*']);
  });
  test('support for parenthesis', () => {
    const yard = new ShuntingYard();
    expect(yard.toReversePolishNotation('( 7 * 100 + 83 ) * 1000 + ( 9 * 100 + 19 )')).toEqual([7, 100, '*', 83, '+', 1000, '*', 9, 100, '*', 19, '+', '+']);
  });
});
