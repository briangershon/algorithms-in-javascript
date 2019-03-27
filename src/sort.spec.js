import BubbleSort from './bubble-sort';
import MergeSort from './merge-sort';

describe('bubble sort', () => {
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
});

describe('merge sort', () => {
  test('sort 5 4 3 2 1', () => {
    const sort = new MergeSort();
    sort.insert(5);
    sort.insert(4);
    sort.insert(3);
    sort.insert(2);
    sort.insert(1);
    sort.sort();
    expect(sort.toString()).toEqual('1,2,3,4,5');
  });
  test('split array in half', () => {
    const sort = new MergeSort();
    const [left, right] = sort.splitArrayInHalf([5, 4, 3, 2, 1]);
    expect(left).toEqual([5, 4]);
    expect(right).toEqual([3, 2, 1]);
  });
});
