import { Board, SixBySixSkyscraper } from './6-by-6-skyscaper';

describe('SixBySixSkyscraper', () => {
  test('can solve 6x6 puzzle 1', () => {
    const s = new SixBySixSkyscraper();
    const clues = [
      3, 2, 2, 3, 2, 1,
      1, 2, 3, 3, 2, 2,
      5, 1, 2, 2, 4, 3,
      3, 2, 1, 2, 2, 4
    ];
    const result = s.solvePuzzle(clues);
    expect(result[0]).toEqual([ 2, 1, 4, 3, 5, 6]);
    expect(result[1]).toEqual([ 1, 6, 3, 2, 4, 5]);
    expect(result[2]).toEqual([ 4, 3, 6, 5, 1, 2]);
    expect(result[3]).toEqual([ 6, 5, 2, 1, 3, 4]);
    expect(result[4]).toEqual([ 5, 4, 1, 6, 2, 3]);
    expect(result[5]).toEqual([ 3, 2, 5, 4, 6, 1]);
  });
});

describe('Board', () => {
  test('get various rows/columns in both directions', () => {
    const b = new Board([
      2, 1, 4, 3, 5, 6,
      1, 6, 3, 2, 4, 5,
      4, 3, 6, 5, 1, 2,
      6, 5, 2, 1, 3, 4,
      5, 4, 1, 6, 2, 3,
      3, 2, 5, 4, 6, 1
    ], [
      3, 2, 2, 3, 2, 1,
      1, 2, 3, 3, 2, 2,
      5, 1, 2, 2, 4, 3,
      3, 2, 1, 2, 2, 4
    ]);
    expect(b.getColumnDown(0)).toEqual([2, 1, 4, 6, 5, 3]);
    expect(b.getColumnUp(0)).toEqual([2, 1, 4, 6, 5, 3].reverse());
    expect(b.getRowRight(0)).toEqual([2, 1, 4, 3, 5, 6]);
    expect(b.getRowLeft(0)).toEqual([2, 1, 4, 3, 5, 6].reverse());
  });

  test('countSkyscrapers()', () => {
    const b = new Board();
    expect(b.countSkyscrapers([1, 2, 3, 4, 5, 6], 6)).toEqual(6);
    expect(b.countSkyscrapers([1, 2, 3, 4, 5, 6].reverse(), 6)).toEqual(1);
    expect(b.countSkyscrapers([3, 6, 5, 2, 4, 1], 6)).toEqual(2);
    expect(b.countSkyscrapers([3, 6, 5, 2, 4, 1].reverse(), 6)).toEqual(4);
    expect(b.countSkyscrapers([1, 2, 5, 6, 4, 3], 6)).toEqual(4);
    expect(b.countSkyscrapers([1, 2, 5, 6, 4, 3].reverse(), 6)).toEqual(3);
  });
  test('Solved', () => {
    const b = new Board([
      2, 1, 4, 3, 5, 6,
      1, 6, 3, 2, 4, 5,
      4, 3, 6, 5, 1, 2,
      6, 5, 2, 1, 3, 4,
      5, 4, 1, 6, 2, 3,
      3, 2, 5, 4, 6, 1
    ], [
      3, 2, 2, 3, 2, 1,
      1, 2, 3, 3, 2, 2,
      5, 1, 2, 2, 4, 3,
      3, 2, 1, 2, 2, 4
    ]);
    expect(b.rejected()).toEqual(false);
    expect(b.solved()).toEqual(true);
  });
  test('Rejected', () => {
    const b = new Board([
      1, 2, 3, 4, 5, 6,
      2, 3, 4, 5, 6, 1,
      3, 4, 5, 6, 1, 2,
      4, 5, 6, 1, 2, 3,
      5, 6, 1, 2, 3, 4,
      6, 1, 2, 3, 4, 5
    ], [
      3, 2, 2, 3, 2, 1,
      1, 2, 3, 3, 2, 2,
      5, 1, 2, 2, 4, 3,
      3, 2, 1, 2, 2, 4
    ]);
    expect(b.rejected()).toEqual(true);
    expect(b.solved()).toEqual(false);
  });

  // test('next board', () => {

  // });
});
