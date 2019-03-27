import BubbleSort from './bubble-sort';

test('sort 5 4 3 2 1', () => {
  const sort = new BubbleSort();
  sort.insert(5);
  sort.insert(4);
  sort.insert(3);
  sort.insert(2);
  sort.insert(1);
  sort.sort();
  expect(sort.toString()).toBe('1,2,3,4,5');
});
