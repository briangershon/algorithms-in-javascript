import PathfindingReachableFields from './pathfinding-reachable-fields';

describe('PathfindingReachableFields', () => {
  test('should return 0 if path is blocked', () => {
    const inputGrid = [
      [true,true,true],
      [false,false,true],
      [false,true,false]
    ];
    const p = new PathfindingReachableFields(inputGrid, 3, 3, 0, 0);
    expect(p.numberOfReachableFields()).toEqual(0);
  });

  test('should return 1 for a single path', () => {
    const inputGrid = [
      [true],
      [true]
    ];
    const p = new PathfindingReachableFields(inputGrid, 2, 1, 0, 0);
    expect(p.numberOfReachableFields()).toEqual(1);
  });

  test('should return 2 for multiple paths', () => {
    const inputGrid = [
      [false,false,true],
      [true,false,true],
      [true,true,false]
    ];
    const p = new PathfindingReachableFields(inputGrid, 3, 3, 1, 0);
    expect(p.numberOfReachableFields()).toEqual(2);
  });

  test('should return 5 for side fully open 5 column grid', () => {
    const inputGrid = [
      [true, true ,true, true, true],
      [true, true ,true, true, true],
      [true, true ,true, true, true]
    ];
    const p = new PathfindingReachableFields(inputGrid, 3, 5, 0, 0);
    expect(p.numberOfReachableFields()).toEqual(5);
  });

  describe('availableMoves', () => {
    test('no moves available', () => {
      const inputGrid = [
        [false,false,true],
        [false,false,true],
        [false,true,false]
      ];
      const p = new PathfindingReachableFields(inputGrid, 3, 3, 0, 0);
      const location = [1, 2];
      expect(p.availableMoves(location)).toEqual(false);
    });
    test('left and right only', () => {
      const inputGrid = [
        [true,true,true],
        [false,false,true],
        [false,true,false]
      ];
      const p = new PathfindingReachableFields(inputGrid, 3, 3, 0, 0);
      const location = [0, 1];
      expect(p.availableMoves(location).length).toEqual(2);
      expect(p.availableMoves(location)[0]).toEqual([0, 0]);
      expect(p.availableMoves(location)[1]).toEqual([0, 2]);
    });
    test('down only', () => {
      const inputGrid = [
        [false,false,true],
        [false,false,true],
        [false,true,false]
      ];
      const p = new PathfindingReachableFields(inputGrid, 3, 3, 0, 0);
      const location = [0, 2];
      expect(p.availableMoves(location).length).toEqual(1);
      expect(p.availableMoves(location)[0]).toEqual([1, 2]);
    });
  });

});