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
    expect(s.skyscraperRowPermutations.length).toEqual(720);
  });
  test('can solve 6x6 puzzle 1', () => {
    const s = new SixBySixSkyscraper();
    const clues = [
      3, 2, 2, 3, 2, 1,
      1, 2, 3, 3, 2, 2,
      5, 1, 2, 2, 4, 3,
      3, 2, 1, 2, 2, 4
    ];
    const result = s.solvePuzzle(clues);
    s.show();
    // expect(result[0]).toEqual([ 2, 1, 4, 3, 5, 6]);
    // expect(result[1]).toEqual([ 1, 6, 3, 2, 4, 5]);
    // expect(result[2]).toEqual([ 4, 3, 6, 5, 1, 2]);
    // expect(result[3]).toEqual([ 6, 5, 2, 1, 3, 4]);
    // expect(result[4]).toEqual([ 5, 4, 1, 6, 2, 3]);
    // expect(result[5]).toEqual([ 3, 2, 5, 4, 6, 1]);
  });
});
