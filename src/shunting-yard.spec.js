import ShuntingYard from './shunting-yard';

describe('ShuntingYard', () => {
  test('supports only one value (no operators)', () => {
    const yard = new ShuntingYard();
    expect(yard.toReversePolishNotation('1')).toEqual([1]);
  });
  test('multiplies two values', () => {
    const yard = new ShuntingYard();
    expect(yard.toReversePolishNotation('2 * 100')).toEqual([2, 100, '*']);
  });
  test('multiplies and adds values', () => {
    const yard = new ShuntingYard();
    expect(yard.toReversePolishNotation('2 * 100 + 46')).toEqual([2, 100, '*', 46, '+']);
  });
  test('negates', () => {
    const yard = new ShuntingYard();
    expect(yard.toReversePolishNotation('7 * 100 + -83')).toEqual([7, 100, '*', -83, '+']);
  });  

  describe('supports parenthesis', () => {
    test('simple', () => {
      const yard = new ShuntingYard();
      expect(yard.toReversePolishNotation('2 * ( 100 + 46 )')).toEqual([2, 100, 46, '+', '*']);
    });
    test('more complex', () => {
      const yard = new ShuntingYard();
      expect(yard.toReversePolishNotation('( 7 * 100 + 83 ) * 1000 + ( 9 * 100 + 19 )')).toEqual([7, 100, '*', 83, '+', 1000, '*', 9, 100, '*', 19, '+', '+']);
    });  
    test('with negate in front of parens', () => {
      const yard = new ShuntingYard();
      expect(yard.toReversePolishNotation('-( 7 * 100 + 83 )')).toEqual([0, 7, 100, '*', 83, '+','-']);
    });
  });
  test('when dividing two values', () => {
    const yard = new ShuntingYard();
    expect(yard.toReversePolishNotation('100 / 2')).toEqual([100, 2, '/']);
  });
  test('when dividing and subtracting values', () => {
    const yard = new ShuntingYard();
    expect(yard.toReversePolishNotation('100 / 2 - 46')).toEqual([100, 2, '/', 46, '-']);
  });

  describe('supports badly formatted expressions', () => {
    test('adds proper whitespacing', () => {
      const expressions = [
        ['1+1', '1 + 1'],
        ['1-1', '1 - 1'],
        ['1- 1', '1 - 1'],
        ['1 - 1', '1 - 1'],
        ['1- -1', '1 - -1'],
        ['1 - -1', '1 - -1'],
        ['1* 1', '1 * 1'],
        ['1 /1', '1 / 1'],
        ['-123', '-123'],
        ['2 /2+3 * 4.75- -6', '2 / 2 + 3 * 4.75 - -6'],
        ['12* 123', '12 * 123'],
        ['2 / (2 + 3) * 4.33 - -6', '2 / ( 2 + 3 ) * 4.33 - -6']
      ];
      const yard = new ShuntingYard();
      for (let i = 0; i < expressions.length; i++) {
        expect(yard.cleanFormat(expressions[i][0])).toEqual(expressions[i][1]);
      }
    });
    test('support unary minus in front of parenthesis (add zero for reverse-polish)', () => {
      const expressions = [
        ['6 + -(4)', '6 + 0 - ( 4 )'],
        ['6 + -( -4)', '6 + 0 - ( -4 )']
      ];
      const yard = new ShuntingYard();
      for (let i = 0; i < expressions.length; i++) {
        expect(yard.cleanFormat(expressions[i][0])).toEqual(expressions[i][1]);
      }
    });
  });
});
