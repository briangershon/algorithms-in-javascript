import MakeChange from './make-change';

describe('MakeChange count with denominations {1, 2, 3}', () => {
  test('when change desired is 0 cents', () => {
    const denominations = [1, 2, 3];
    const count = new MakeChange().count(denominations, 0);
    expect(count).toEqual(1);
  });
  test('when change desired is 4 cents', () => {
    const denominations = [1, 2, 3];
    const count = new MakeChange().count(denominations, 4);
    expect(count).toEqual(4);
  });
});