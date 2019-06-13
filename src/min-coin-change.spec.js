import MinCoinChange from './min-coin-change';

describe('Min coin change', () => {
  test('for 36 cents with [1,3,4] denominations', () => {
    const change = new MinCoinChange([1, 3, 4]);
    expect(change.makeChange(36)).toBe([3, 3]);
  });  
});
