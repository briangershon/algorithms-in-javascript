import { SkyscraperRow, SixBySixSkyscraper } from './6-by-6-skyscaper';

describe('SkyscraperRow', () => {
  test('6: 1 2 3 4 5 6 :1', () => {
    const c = new SkyscraperRow([1, 2, 3, 4, 5, 6]);
    expect(c.left).toEqual(6);
    expect(c.right).toEqual(1);
  });
  test('1: 6 5 4 3 2 1 :6', () => {
    const c = new SkyscraperRow([6, 5, 4, 3, 2, 1]);
    expect(c.left).toEqual(1);
    expect(c.right).toEqual(6);
  });
  test('2: 3 6 5 2 4 1 :4', () => {
    const c = new SkyscraperRow([3, 6, 5, 2, 4, 1]);
    expect(c.left).toEqual(2);
    expect(c.right).toEqual(4);
  });
  test('4: 1 2 5 6 4 3 :3', () => {
    const c = new SkyscraperRow([1, 2, 5, 6, 4, 3]);
    expect(c.left).toEqual(4);
    expect(c.right).toEqual(3);
  });
});

describe('SixBySixSkyscraper', () => {
  test('calculates all permutations for a line of 6 skyscrapers', () => {
    const s = new SixBySixSkyscraper();
    s.calculateAllRows();
    expect(s.skyscraperRowPermutations.length).toEqual(720);
  });
});
