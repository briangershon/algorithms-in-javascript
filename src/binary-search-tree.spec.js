import BinarySearchTree from './binary-search-tree';

describe('Binary Search Tree', () => {
  test('returns keys in numeric order', () => {
    const tree = new BinarySearchTree();
    tree.insert(1);
    tree.insert(900);
    tree.insert(20);
    tree.insert(50); 
    tree.insert(17); 
    tree.insert(16); 
    tree.insert(15); 
    expect(tree.orderedKeys()).toEqual([1, 15, 16, 17, 20, 50, 900]);
  });
});