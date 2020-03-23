import ReversePolish from './reverse-polish-notation';

describe('ReversePolish', () => {
  test('supports one value', () => {
    const notation = new ReversePolish();
    expect(notation.calculate([1])).toEqual(1);
  });
  test('supports multiplicaton and addition', () => {
    const notation = new ReversePolish();
    expect(notation.calculate([2, 100, '*', 50, '+'])).toEqual(250);
  });
  test('supports more complex multiplicaton and addition', () => {
    const notation = new ReversePolish();
    expect(notation.calculate([7, 100, '*', 83, '+', 1000, '*', 9, 100, '*', 19, '+', '+'])).toEqual(783919);
  });
  test('supports division and subtraction', () => {
    const notation = new ReversePolish();
    expect(notation.calculate([100, 2, '/', 50, '-'])).toEqual(0);
  });
  test('supports more complex division and subtraction', () => {
    const notation = new ReversePolish();
    expect(notation.calculate([100, 2, '/', 50, '+', 1000, '*', 12, 4, '/', 19, '+', '-'])).toEqual(99978);
  });
});