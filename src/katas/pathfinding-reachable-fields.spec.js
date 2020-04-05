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
});