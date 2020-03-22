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
});