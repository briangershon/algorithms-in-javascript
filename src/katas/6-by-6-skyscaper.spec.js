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

  test('can solve 6x6 puzzle 2', () => {
    const s = new SixBySixSkyscraper();
    const clues = [
      0, 0, 0, 2, 2, 0,
      0, 0, 0, 6, 3, 0,
      0, 4, 0, 0, 0, 0,
      4, 4, 0, 3, 0, 0
    ];

    const result = s.solvePuzzle(clues);
    expect(result[0]).toEqual([ 5, 6, 1, 4, 3, 2 ]);
    expect(result[1]).toEqual([ 4, 1, 3, 2, 6, 5 ]);
    expect(result[2]).toEqual([ 2, 3, 6, 1, 5, 4 ]);
    expect(result[3]).toEqual([ 6, 5, 4, 3, 2, 1 ]);
    expect(result[4]).toEqual([ 1, 2, 5, 6, 4, 3 ]);
    expect(result[5]).toEqual([ 3, 4, 2, 5, 1, 6 ]);
  });

  test('can solve 6x6 puzzle 3', () => {
    const s = new SixBySixSkyscraper();
    const clues = [
      0, 3, 0, 5, 3, 4, 
      0, 0, 0, 0, 0, 1,
      0, 3, 0, 3, 2, 3,
      3, 2, 0, 3, 1, 0
    ];

    const result = s.solvePuzzle(clues);
    expect(result[0]).toEqual([ 5, 2, 6, 1, 4, 3 ]);
    expect(result[1]).toEqual([ 6, 4, 3, 2, 5, 1 ]);
    expect(result[2]).toEqual([ 3, 1, 5, 4, 6, 2 ]);
    expect(result[3]).toEqual([ 2, 6, 1, 5, 3, 4 ]);
    expect(result[4]).toEqual([ 4, 3, 2, 6, 1, 5 ]);
    expect(result[5]).toEqual([ 1, 5, 4, 3, 2, 6 ]);
  });

  test('can solve 6x6 puzzle 4', () => {
    const s = new SixBySixSkyscraper();
    const clues = [
      0, 3, 0, 3, 2, 3,
      3, 2, 0, 3, 1, 0,
      0, 3, 0, 5, 3, 4,
      0, 0, 0, 0, 0, 1
    ];

    const result = s.solvePuzzle(clues);
    expect(result[0]).toEqual([ 6, 2, 3, 4, 5, 1 ]);
    expect(result[1]).toEqual([ 5, 1, 6, 2, 3, 4 ]);
    expect(result[2]).toEqual([ 4, 3, 5, 1, 6, 2 ]);
    expect(result[3]).toEqual([ 2, 6, 4, 5, 1, 3 ]);
    expect(result[4]).toEqual([ 1, 5, 2, 3, 4, 6 ]);
    expect(result[5]).toEqual([ 3, 4, 1, 6, 2, 5 ]);
  });

  describe('bestPlaceToStart', () => {
    test('top', () => {
      const s = new SixBySixSkyscraper();
      const incomingClues = [ 3, 2, 2, 3, 2, 1, 6, 6, 6, 3, 2, 2, 5, 1, 2, 2, 4, 3, 3, 2, 1, 1, 1, 1 ];
      const newClues = [ 3, 2, 2, 3, 2, 1, 6, 6, 6, 3, 2, 2, 5, 1, 2, 2, 4, 3, 3, 2, 1, 1, 1, 1 ];
      expect(s.bestPlaceToStart(incomingClues).clues).toEqual(newClues);
    });
    test('bottom', () => {
      const s = new SixBySixSkyscraper();
      const incomingClues = [ 0, 0, 0, 2, 2, 0, 0, 0, 0, 6, 3, 0, 0, 4, 0, 0, 0, 0, 4, 4, 0, 3, 0, 0 ];
      const newClues = [ 0, 0, 0, 0, 4, 0, 0, 3, 6, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 3, 0, 4, 4 ];
      expect(s.bestPlaceToStart(incomingClues).clues).toEqual(newClues);
    });
    test('left', () => {
      const s = new SixBySixSkyscraper();
      const incomingClues = [ 3, 2, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3, 3, 2, 1, 2, 2, 4 ];
      // const newClues = [ 4, 2, 2, 1, 2, 3, 3, 2, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3 ];
      const newClues = [ 3, 2, 1, 2, 2, 4, 3, 2, 2, 3, 2, 1, 1, 2, 3, 3, 2, 2, 5, 1, 2, 2, 4, 3 ];
      expect(s.bestPlaceToStart(incomingClues).clues).toEqual(newClues);
    });
    test('right', () => {
      const s = new SixBySixSkyscraper();
      const incomingClues = [ 0, 3, 0, 5, 3, 4, 0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 2, 3, 3, 2, 0, 3, 1, 0 ];
      const newClues = [ 0, 0, 0, 0, 0, 1, 0, 3, 0, 3, 2, 3, 3, 2, 0, 3, 1, 0, 0, 3, 0, 5, 3, 4 ];
      expect(s.bestPlaceToStart(incomingClues).clues).toEqual(newClues);
    });
  });
});

describe('Board', () => {
  test('get various rows/columns in both directions', () => {
    const perms = [
      [2, 1, 4, 3, 5, 6],
      [1, 6, 3, 2, 4, 5],
      [4, 3, 6, 5, 1, 2],
      [6, 5, 2, 1, 3, 4],
      [5, 4, 1, 6, 2, 3],
      [3, 2, 5, 4, 6, 1]
    ];
    const b = new Board([0, 1, 2, 3, 4, 5], [
      3, 2, 2, 3, 2, 1,
      1, 2, 3, 3, 2, 2,
      5, 1, 2, 2, 4, 3,
      3, 2, 1, 2, 2, 4
    ], perms);
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

  describe('solved', () => {
    test('Solved (all)', () => {
      const permutations = [
        [2, 1, 4, 3, 5, 6],
        [1, 6, 3, 2, 4, 5],
        [4, 3, 6, 5, 1, 2],
        [6, 5, 2, 1, 3, 4],
        [5, 4, 1, 6, 2, 3],
        [3, 2, 5, 4, 6, 1]
      ];
      const b = new Board([0, 1, 2, 3, 4, 5], [
        3, 2, 2, 3, 2, 1,
        1, 2, 3, 3, 2, 2,
        5, 1, 2, 2, 4, 3,
        3, 2, 1, 2, 2, 4
      ], permutations);
      expect(b.rejected()).toEqual(false);
      expect(b.solved()).toEqual(true);
    });  
    test('Unrejected partial (row one)', () => {
      const permutations = [
        [2, 1, 4, 3, 5, 6],
        [1, 6, 3, 2, 4, 5],
        [4, 3, 6, 5, 1, 2],
        [6, 5, 2, 1, 3, 4],
        [5, 4, 1, 6, 2, 3],
        [3, 2, 5, 4, 6, 1]
      ];
      const b = new Board([0], [
        3, 2, 2, 3, 2, 1,
        1, 2, 3, 3, 2, 2,
        5, 1, 2, 2, 4, 3,
        3, 2, 1, 2, 2, 4
      ], permutations);
      expect(b.rejected()).toEqual(false);
    });  
    test('Unrejected partial (plus row two)', () => {
      const permutations = [
        [2, 1, 4, 3, 5, 6],
        [1, 6, 3, 2, 4, 5],
        [4, 3, 6, 5, 1, 2],
        [6, 5, 2, 1, 3, 4],
        [5, 4, 1, 6, 2, 3],
        [3, 2, 5, 4, 6, 1]
      ];
      const b = new Board([0, 1], [
        3, 2, 2, 3, 2, 1,
        1, 2, 3, 3, 2, 2,
        5, 1, 2, 2, 4, 3,
        3, 2, 1, 2, 2, 4
      ], permutations);
      expect(b.rejected()).toEqual(false);
    });  
    test('Unrejected partial (plus row three)', () => {
      const permutations = [
        [2, 1, 4, 3, 5, 6],
        [1, 6, 3, 2, 4, 5],
        [4, 3, 6, 5, 1, 2],
        [6, 5, 2, 1, 3, 4],
        [5, 4, 1, 6, 2, 3],
        [3, 2, 5, 4, 6, 1]
      ];
      const b = new Board([0, 1, 2], [
        3, 2, 2, 3, 2, 1,
        1, 2, 3, 3, 2, 2,
        5, 1, 2, 2, 4, 3,
        3, 2, 1, 2, 2, 4
      ], permutations);
      expect(b.rejected()).toEqual(false);
    });  
    test('Unrejected partial (plus row four)', () => {
      const permutations = [
        [2, 1, 4, 3, 5, 6],
        [1, 6, 3, 2, 4, 5],
        [4, 3, 6, 5, 1, 2],
        [6, 5, 2, 1, 3, 4],
        [5, 4, 1, 6, 2, 3],
        [3, 2, 5, 4, 6, 1]
      ];
      const b = new Board([0, 1, 2, 3], [
        3, 2, 2, 3, 2, 1,
        1, 2, 3, 3, 2, 2,
        5, 1, 2, 2, 4, 3,
        3, 2, 1, 2, 2, 4
      ], permutations);
      expect(b.rejected()).toEqual(false);
    });  
    test('Unrejected partial (plus row five)', () => {
      const permutations = [
        [2, 1, 4, 3, 5, 6],
        [1, 6, 3, 2, 4, 5],
        [4, 3, 6, 5, 1, 2],
        [6, 5, 2, 1, 3, 4],
        [5, 4, 1, 6, 2, 3],
        [3, 2, 5, 4, 6, 1]
      ];
      const b = new Board([0, 1, 2, 3, 4], [
        3, 2, 2, 3, 2, 1,
        1, 2, 3, 3, 2, 2,
        5, 1, 2, 2, 4, 3,
        3, 2, 1, 2, 2, 4
      ], permutations);
      expect(b.rejected()).toEqual(false);
    });
    test('Unrejected partial (plus row six) and solved', () => {
      const permutations = [
        [2, 1, 4, 3, 5, 6],
        [1, 6, 3, 2, 4, 5],
        [4, 3, 6, 5, 1, 2],
        [6, 5, 2, 1, 3, 4],
        [5, 4, 1, 6, 2, 3],
        [3, 2, 5, 4, 6, 1]
      ];
      const b = new Board([0, 1, 2, 3, 4, 5], [
        3, 2, 2, 3, 2, 1,
        1, 2, 3, 3, 2, 2,
        5, 1, 2, 2, 4, 3,
        3, 2, 1, 2, 2, 4
      ], permutations);
      expect(b.rejected()).toEqual(false);
      expect(b.solved()).toEqual(true);
    });  
  });

  test('Rejected in situation when there are no zeros in line', () => {
    const perms = [
      [1, 2, 3, 4, 5, 6],
      [2, 3, 4, 5, 6, 1],
      [3, 4, 5, 6, 1, 2],
      [4, 5, 6, 1, 2, 3],
      [5, 6, 1, 2, 3, 4],
      [6, 1, 2, 3, 4, 5]
    ];
    const b = new Board([0, 1, 2, 3, 4, 5], [
      3, 2, 2, 3, 2, 1,
      1, 2, 3, 3, 2, 2,
      5, 1, 2, 2, 4, 3,
      3, 2, 1, 2, 2, 4
    ], perms);
    expect(b.rejected()).toEqual(true);
    expect(b.solved()).toEqual(false);
  });
  test('should reject in situation where there are zeros in this row', () => {
    const perms = [
      [1, 5, 2, 3, 4, 6],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0]
    ];
    const b = new Board([0, 1, 2, 3, 4, 5], [
      3, 2, 2, 3, 2, 1,
      1, 2, 3, 3, 2, 2,
      5, 1, 2, 2, 4, 3,
      3, 2, 1, 2, 2, 4
    ], perms);
    expect(b.getRowRight(0)).toEqual([1, 5, 2, 3, 4, 6]);
    expect(b.rejected()).toEqual(true);
  });
});
