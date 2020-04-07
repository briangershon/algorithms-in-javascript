import PathfindingReachableFields from './pathfinding-reachable-fields';

describe('PathfindingReachableFields', () => {

  describe('availableMoves', () => {
    test('no moves available', () => {
      const inputGrid = [
        [false,false,true],
        [false,false,true],
        [false,true,false]
      ];
      const p = new PathfindingReachableFields(inputGrid, 3, 3, 0, 0);
      const goal = [2, 1];
      expect(p.availableMoves(goal)).toEqual(false);
    });
    test('left and right only', () => {
      const inputGrid = [
        [true,true,true],
        [false,false,true],
        [true,true,true]
      ];
      const p = new PathfindingReachableFields(inputGrid, 3, 3, 0, 0);
      const goal = [2, 1];
      expect(p.availableMoves(goal).length).toEqual(2);
      expect(p.availableMoves(goal)[0]).toEqual([2, 0]);
      expect(p.availableMoves(goal)[1]).toEqual([2, 2]);
    });
    test('back only', () => {
      const inputGrid = [
        [false,false,true],
        [false,true,true],
        [false,true,false]
      ];
      const p = new PathfindingReachableFields(inputGrid, 3, 3, 0, 0);
      const goal = [2, 1];
      expect(p.availableMoves(goal).length).toEqual(1);
      expect(p.availableMoves(goal)[0]).toEqual([1, 1]);
    });
  });

  test('should return 0 if path is blocked', () => {
    const inputGrid = [
      [true,true,true],
      [false,false,true],
      [false,true,false]
    ];
    const p = new PathfindingReachableFields(inputGrid, 3, 3, 0, 0);
    expect(p.numberOfReachableFields()).toEqual(0);
  });

  test('should return 1 reachable field', () => {
    const inputGrid = [
      [true],
      [true]
    ];
    const p = new PathfindingReachableFields(inputGrid, 2, 1, 0, 0);
    expect(p.numberOfReachableFields()).toEqual(1);
  });

  test('should return 2 reachable fields', () => {
    const inputGrid = [
      [false,false,true],
      [true,false,true],
      [true,true,false]
    ];
    const p = new PathfindingReachableFields(inputGrid, 3, 3, 1, 0);
    expect(p.numberOfReachableFields()).toEqual(2);
  });

  test('should return 4 reachabled fields', () => {
    const inputGrid = [
      [true, true ,true, true, true],
      [true, true ,true, true, true],
      [true, true ,false, true, true]
    ];
    const p = new PathfindingReachableFields(inputGrid, 3, 5, 0, 0);
    expect(p.numberOfReachableFields()).toEqual(4);
  });

  test('no turning back from codewars', () => {
    const inputGrid = [
      [ false, false, true, true ],
      [ true, true, true, true ],
      [ true, true, false, true ]
    ];
    const p = new PathfindingReachableFields(inputGrid, 3, 4, 2, 0);
    expect(p.numberOfReachableFields()).toEqual(2);
  });

  test('200x13', () => {
    const inputGrid = [
      [ 1,1,1,1,1,1,0,1,1,1,1,0,0 ],
      [ 1,0,1,1,0,1,1,0,1,1,1,1,1 ],
      [ 1,1,1,1,1,1,1,1,0,1,1,1,1 ],
      [ 0,0,1,1,1,1,0,0,1,1,1,1,0 ],
      [ 1,0,1,1,1,1,1,1,1,1,1,1,1 ],
      [ 0,0,1,1,1,1,1,1,1,1,1,1,1 ],
      [ 1,1,1,1,1,0,0,1,1,1,1,1,1 ],
      [ 1,0,1,0,1,0,1,1,1,1,1,1,1 ],
      [ 0,1,1,1,1,0,1,1,1,1,1,1,1 ],
      [ 0,0,0,1,1,1,0,1,1,0,0,1,1 ],
      [ 0,0,1,1,1,0,1,1,1,1,1,1,1 ],
      [ 1,1,1,1,0,1,1,1,1,1,0,1,0 ],
      [ 1,1,1,1,0,0,1,1,1,1,1,1,1 ],
      [ 1,0,1,1,1,1,1,1,0,1,1,1,0 ],
      [ 1,1,1,1,0,1,1,1,1,0,1,1,1 ],
      [ 1,1,1,1,1,1,0,1,1,1,1,1,0 ],
      [ 1,1,0,1,1,0,1,1,1,1,1,1,1 ],
      [ 0,1,0,1,1,1,1,0,0,1,1,0,1 ],
      [ 1,1,0,1,0,1,0,1,0,1,1,1,1 ],
      [ 1,1,1,0,1,1,1,1,1,1,1,1,0 ],
      [ 1,0,1,1,0,1,1,1,1,1,1,1,1 ],
      [ 1,1,1,1,1,1,0,1,1,1,1,1,1 ],
      [ 1,0,0,1,0,1,0,1,1,1,1,1,1 ],
      [ 0,1,1,1,0,1,0,1,1,1,1,1,1 ],
      [ 0,1,1,1,1,0,1,1,1,1,1,0,1 ],
      [ 1,1,0,0,1,1,1,1,0,1,1,1,0 ],
      [ 1,1,1,1,1,1,0,1,0,1,1,0,0 ],
      [ 1,1,0,1,0,1,1,1,1,1,0,1,0 ],
      [ 1,1,1,1,1,1,1,1,1,1,0,1,1 ],
      [ 1,1,0,1,1,1,1,0,0,1,1,1,1 ],
      [ 1,0,1,1,1,1,1,0,1,1,1,1,1 ],
      [ 1,1,1,1,1,1,0,1,1,1,1,1,0 ],
      [ 1,1,1,1,1,0,0,1,0,1,1,0,1 ],
      [ 1,1,1,0,1,1,1,1,1,1,1,1,1 ],
      [ 1,0,1,1,1,1,1,1,1,1,1,1,1 ],
      [ 1,1,0,1,1,1,0,1,1,0,1,0,1 ],
      [ 1,1,0,1,1,1,0,1,1,1,1,1,1 ],
      [ 1,0,1,1,0,0,1,1,1,1,0,1,1 ],
      [ 0,1,0,1,1,1,1,0,1,1,1,0,1 ],
      [ 1,1,1,1,0,1,1,1,1,1,1,0,1 ],
      [ 1,1,1,0,1,1,0,1,1,1,1,0,0 ],
      [ 1,0,0,1,1,1,1,0,1,1,1,0,0 ],
      [ 1,1,1,1,1,1,0,0,1,0,1,1,1 ],
      [ 1,1,0,1,1,1,1,1,1,1,0,1,1 ],
      [ 0,1,1,1,1,0,1,1,1,0,1,1,1 ],
      [ 1,0,1,0,1,1,1,1,1,0,1,1,0 ],
      [ 1,1,1,0,1,1,0,0,1,1,1,1,1 ],
      [ 1,1,1,0,1,0,0,1,0,0,1,0,1 ],
      [ 1,0,0,0,1,1,1,1,1,0,0,1,1 ],
      [ 0,1,1,1,1,1,1,1,1,0,1,1,1 ],
      [ 1,1,1,1,1,1,1,0,1,1,1,1,0 ],
      [ 1,1,1,1,1,1,1,1,1,1,1,0,1 ],
      [ 0,0,0,1,1,1,1,1,1,1,1,1,0 ],
      [ 1,1,0,0,1,1,1,0,1,1,1,1,1 ],
      [ 1,1,1,1,1,1,1,0,1,0,0,1,1 ],
      [ 1,1,1,1,1,0,1,1,1,0,1,1,1 ],
      [ 0,1,1,0,1,1,1,0,1,1,1,1,1 ],
      [ 1,1,0,1,1,1,1,1,1,1,1,1,1 ],
      [ 1,1,1,1,1,1,1,1,1,1,1,1,1 ],
      [ 1,1,1,1,1,1,1,1,1,1,1,0,1 ],
      [ 1,0,1,0,0,0,1,1,1,0,1,1,0 ],
      [ 1,1,1,0,1,1,1,0,1,0,1,1,1 ],
      [ 0,0,0,1,0,1,1,0,1,1,1,1,1 ],
      [ 1,1,1,0,1,1,1,1,1,1,1,1,1 ],
      [ 0,1,1,1,1,0,0,1,0,1,1,1,0 ],
      [ 1,0,1,1,0,0,1,1,0,1,1,1,0 ],
      [ 1,1,0,1,1,1,1,1,0,1,1,1,1 ],
      [ 1,1,0,0,0,0,1,0,1,1,1,1,1 ],
      [ 1,1,1,1,1,1,0,1,0,0,0,1,1 ],
      [ 1,1,1,1,1,1,1,1,1,1,1,1,1 ],
      [ 1,1,1,0,1,0,1,1,1,1,1,0,1 ],
      [ 1,0,1,1,1,0,1,1,1,1,1,1,1 ],
      [ 1,1,1,0,1,1,1,1,1,1,1,1,1 ],
      [ 1,1,0,1,1,1,1,1,0,1,0,1,1 ],
      [ 0,1,1,0,1,1,1,1,1,1,1,1,1 ],
      [ 1,1,1,1,1,1,1,1,1,1,1,1,1 ],
      [ 1,1,1,0,1,1,0,1,1,1,1,1,1 ],
      [ 1,1,1,1,1,0,1,0,1,1,1,1,1 ],
      [ 1,1,0,1,1,1,1,0,1,1,1,1,0 ],
      [ 1,1,1,1,1,1,1,0,0,1,1,1,1 ],
      [ 1,1,1,1,0,1,1,1,1,1,0,1,1 ],
      [ 0,1,1,1,1,0,1,1,1,1,1,0,1 ],
      [ 1,0,1,1,0,1,1,1,1,1,1,1,1 ],
      [ 1,1,0,1,0,0,1,1,1,1,1,1,1 ],
      [ 1,1,1,1,1,1,1,1,1,1,1,1,1 ],
      [ 1,1,1,1,1,1,1,1,1,1,1,1,1 ],
      [ 1,1,1,1,1,1,1,1,1,0,1,0,1 ],
      [ 1,1,0,1,1,0,1,0,1,0,1,1,1 ],
      [ 1,1,1,0,1,1,1,1,1,1,1,1,1 ],
      [ 1,1,1,1,1,1,1,1,1,0,1,1,1 ],
      [ 1,1,1,1,1,1,1,1,1,0,1,1,1 ],
      [ 1,0,1,1,1,1,1,1,0,0,0,0,1 ],
      [ 0,0,0,1,1,1,1,1,1,1,1,1,1 ],
      [ 1,1,1,1,1,1,1,1,1,0,1,1,1 ],
      [ 1,0,1,1,1,1,1,1,1,1,0,1,1 ],
      [ 1,1,0,1,0,1,0,1,1,1,1,1,1 ],
      [ 1,0,0,1,1,1,1,1,1,1,0,0,1 ],
      [ 1,0,1,1,1,1,1,1,1,1,1,1,1 ],
      [ 0,0,0,1,0,0,1,1,0,0,1,1,1 ],
      [ 1,1,1,1,1,1,0,1,1,1,1,1,1 ],
      [ 1,0,1,1,1,1,1,1,1,1,1,1,1 ],
      [ 0,1,0,1,0,1,1,1,0,0,1,1,1 ],
      [ 1,0,1,1,1,1,1,1,1,1,1,1,1 ],
      [ 1,1,1,1,1,1,1,1,1,1,1,1,1 ],
      [ 1,1,0,1,1,0,1,0,1,0,1,0,1 ],
      [ 1,0,1,0,0,1,1,1,0,1,1,1,1 ],
      [ 0,1,1,1,0,1,1,1,0,0,1,1,1 ],
      [ 1,1,0,1,1,0,1,1,1,1,1,1,1 ],
      [ 1,1,1,1,1,1,1,1,1,1,0,1,1 ],
      [ 1,1,0,1,1,1,1,1,0,1,1,1,0 ],
      [ 1,1,1,1,1,0,0,1,1,1,1,1,1 ],
      [ 1,1,1,1,1,1,1,1,1,0,1,0,1 ],
      [ 1,1,1,1,1,1,1,1,1,0,0,1,1 ],
      [ 1,1,1,0,0,1,1,1,1,0,0,1,1 ],
      [ 1,1,1,1,1,1,1,1,1,1,0,1,1 ],
      [ 1,1,1,0,1,0,1,1,1,1,1,1,1 ],
      [ 1,1,1,1,0,1,0,1,1,1,1,1,0 ],
      [ 1,0,1,0,1,1,1,1,1,1,0,1,1 ],
      [ 1,1,1,1,1,1,0,0,1,1,1,1,1 ],
      [ 1,1,1,1,1,1,1,1,1,0,1,1,0 ],
      [ 1,1,1,1,0,0,1,1,1,1,1,1,1 ],
      [ 1,1,0,1,1,1,0,1,1,0,1,1,0 ],
      [ 1,1,1,1,1,0,1,1,1,1,1,1,1 ],
      [ 1,1,1,1,0,1,1,0,1,1,1,1,1 ],
      [ 1,1,1,1,1,1,1,1,1,1,1,0,1 ],
      [ 1,1,1,0,0,1,1,1,0,1,1,1,1 ],
      [ 1,1,1,1,0,1,1,1,0,1,1,0,1 ],
      [ 1,0,1,1,1,1,0,1,1,1,1,0,1 ],
      [ 1,0,1,0,1,1,1,1,1,0,0,1,1 ],
      [ 1,1,0,1,1,1,1,0,1,1,1,1,0 ],
      [ 1,1,0,1,0,1,1,1,1,0,1,0,1 ],
      [ 1,1,1,1,1,0,1,1,1,1,1,1,0 ],
      [ 0,1,1,1,1,1,1,0,1,1,1,1,1 ],
      [ 1,1,1,1,1,0,1,1,1,1,0,1,1 ],
      [ 0,1,1,1,1,1,1,1,1,1,0,1,1 ],
      [ 1,1,1,1,1,1,0,1,0,1,0,1,1 ],
      [ 1,1,1,1,1,0,1,1,0,1,1,1,1 ],
      [ 1,1,0,1,1,1,1,0,1,1,1,0,1 ],
      [ 1,0,1,0,1,0,1,1,0,1,1,1,1 ],
      [ 1,1,1,0,1,0,0,1,1,1,1,1,1 ],
      [ 1,1,1,1,0,1,1,1,1,0,1,1,1 ],
      [ 1,1,1,1,1,0,1,1,1,1,1,1,1 ],
      [ 1,1,1,1,1,1,1,1,1,0,0,0,1 ],
      [ 1,1,1,1,1,0,0,0,1,1,0,0,1 ],
      [ 1,1,0,1,0,1,1,1,1,1,0,0,0 ],
      [ 1,0,1,1,0,1,1,1,1,0,1,1,0 ],
      [ 1,0,1,1,1,1,0,0,1,1,1,1,1 ],
      [ 1,0,0,1,1,1,1,1,1,1,1,1,1 ],
      [ 1,1,1,1,1,0,1,1,1,1,0,1,1 ],
      [ 0,1,1,1,1,1,1,1,0,1,1,1,0 ],
      [ 0,0,1,1,1,0,1,1,1,1,0,0,0 ],
      [ 1,1,1,1,0,0,1,0,1,1,1,0,0 ],
      [ 1,1,1,1,1,0,1,0,1,1,1,1,1 ],
      [ 1,1,1,0,0,1,1,1,1,1,1,1,1 ],
      [ 1,1,1,1,1,0,1,1,1,1,1,0,1 ],
      [ 0,1,1,1,1,1,1,1,1,1,0,1,1 ],
      [ 1,1,1,1,1,0,1,0,1,1,1,1,1 ],
      [ 1,1,1,1,1,0,1,1,1,1,1,1,1 ],
      [ 1,1,1,1,1,1,1,1,1,1,0,1,1 ],
      [ 1,1,1,1,1,1,1,1,1,1,1,1,0 ],
      [ 1,1,1,0,1,0,1,1,1,1,1,1,1 ],
      [ 1,1,0,1,1,1,1,0,1,1,1,1,1 ],
      [ 0,0,1,1,1,0,1,1,1,1,1,1,1 ],
      [ 1,1,1,0,1,1,1,1,0,1,1,1,0 ],
      [ 1,1,0,1,1,1,1,1,1,1,1,1,1 ],
      [ 1,1,0,0,1,1,1,1,1,1,1,1,0 ],
      [ 1,1,1,0,1,1,1,1,1,1,0,1,1 ],
      [ 0,1,0,0,1,1,1,1,0,0,0,1,1 ],
      [ 1,1,1,1,1,0,1,1,0,1,1,1,0 ],
      [ 1,1,1,1,1,0,1,1,1,1,0,1,1 ],
      [ 1,0,1,0,1,1,1,1,1,0,1,0,0 ],
      [ 1,1,0,1,1,1,1,1,1,1,1,1,1 ],
      [ 1,1,1,1,1,1,1,1,1,1,0,1,1 ],
      [ 1,0,1,1,0,1,1,1,1,0,1,1,0 ],
      [ 0,1,0,1,1,0,1,1,1,1,1,1,1 ],
      [ 1,1,1,0,1,0,1,1,1,0,1,1,1 ],
      [ 1,1,1,1,1,0,1,1,1,0,1,1,1 ],
      [ 1,1,1,0,1,1,1,0,1,1,1,0,1 ],
      [ 1,0,1,1,1,1,1,1,1,0,1,1,1 ],
      [ 0,1,1,1,0,0,1,1,1,1,1,0,1 ],
      [ 1,1,1,1,1,1,1,1,1,0,1,1,1 ],
      [ 1,1,1,1,1,1,1,0,1,0,0,1,1 ],
      [ 1,0,1,1,1,1,1,0,1,1,0,1,1 ],
      [ 1,1,1,0,1,1,0,1,1,1,0,1,0 ],
      [ 0,1,0,1,1,1,1,1,1,0,1,0,0 ],
      [ 0,1,1,0,1,1,1,1,1,1,0,1,1 ],
      [ 1,1,0,0,1,1,0,1,0,1,1,1,0 ],
      [ 1,1,1,1,1,1,1,1,1,1,1,0,1 ],
      [ 0,1,1,1,1,1,1,1,1,1,1,1,1 ],
      [ 1,1,0,1,1,1,1,1,1,1,1,0,1 ],
      [ 0,1,1,0,1,0,1,1,1,1,1,1,1 ],
      [ 1,0,0,1,1,1,0,1,1,1,1,1,1 ],
      [ 0,0,1,1,1,1,1,1,1,0,1,1,0 ],
      [ 1,1,1,1,1,1,1,1,1,1,0,0,1 ],
      [ 1,1,1,1,1,0,0,1,1,1,1,0,1 ],
      [ 1,1,1,1,1,1,0,1,0,1,0,1,1 ],
      [ 1,1,1,1,0,1,1,1,1,0,0,1,1 ],
      [ 1,1,1,1,1,1,1,1,1,0,1,1,1 ],
      [ 0,0,1,1,1,1,1,1,1,1,0,1,0 ],
      [ 1,1,1,1,1,1,0,1,1,1,0,1,1 ],
    ];
    const p = new PathfindingReachableFields(inputGrid, 200, 13, 14, 11);
    // p.show();
    expect(p.numberOfReachableFields()).toEqual(9);
  });

});
