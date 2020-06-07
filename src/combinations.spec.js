import combinations from './combinations';

describe('combinations', () => {
  test('0 elements', () => {
    const result = [];
    for (let i of combinations([])) {
      result.push(i);
    }
    expect(result[0]).toEqual([]);
  });

  test('3 elements (numbers)', () => {
    const result = [];
    for (let i of combinations([10, 20, 30])) {
      result.push(i);
    }
    expect(result[0]).toEqual([ 10, 20, 30 ]);
    expect(result[1]).toEqual([ 10, 20 ]);
    expect(result[2]).toEqual([ 10, 30 ]);
    expect(result[3]).toEqual([ 10 ]);
    expect(result[4]).toEqual([ 20, 30 ]);
    expect(result[5]).toEqual([ 20 ]);
    expect(result[6]).toEqual([ 30 ]);
  });

  test('3 elements (letters)', () => {
    const result = [];
    for (let i of combinations(['A', 'B', 'C'])) {
      result.push(i);
    }
    expect(result[0]).toEqual([ 'A', 'B', 'C' ]);
    expect(result[1]).toEqual([ 'A', 'B' ]);
    expect(result[2]).toEqual([ 'A', 'C']);
    expect(result[3]).toEqual([ 'A' ]);
    expect(result[4]).toEqual([ 'B', 'C' ]);
    expect(result[5]).toEqual([ 'B' ]);
    expect(result[6]).toEqual([ 'C' ]);
  });

  test('6 elements', () => {
    const elements = [10, 20, 30, 40, 50, 60];
    const result = [];
    for (let i of combinations(elements)) {
      result.push(i);
    }
    expect(result.length).toEqual(2**elements.length - 1);
  });

});
