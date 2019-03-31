import BinarySearchTree from './binary-search-tree';

/*
                 1
                    900
                 20
              17    50
            16
          15
*/

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

  test('returns pre-order keys', () => {
    const tree = new BinarySearchTree();
    tree.insert(1);
    tree.insert(900);
    tree.insert(20);
    tree.insert(50); 
    tree.insert(17); 
    tree.insert(16); 
    tree.insert(15); 
    expect(tree.preOrderKeys()).toEqual([1, 900, 20, 17, 16, 15, 50]);
  });

  test('returns post-order keys', () => {
    const tree = new BinarySearchTree();
    tree.insert(1);
    tree.insert(900);
    tree.insert(20);
    tree.insert(50); 
    tree.insert(17); 
    tree.insert(16); 
    tree.insert(15); 
    expect(tree.postOrderKeys()).toEqual([15, 16, 17, 50, 20, 900, 1]);
  });

  test('returns minimum key', () => {
    const tree = new BinarySearchTree();
    tree.insert(1);
    tree.insert(900);
    tree.insert(20);
    tree.insert(50);
    tree.insert(17);
    tree.insert(16);
    tree.insert(15);
    expect(tree.min()).toEqual(1);
  });

  test('returns maximum key', () => {
    const tree = new BinarySearchTree();
    tree.insert(1);
    tree.insert(900);
    tree.insert(20);
    tree.insert(50);
    tree.insert(17);
    tree.insert(16);
    tree.insert(15);
    expect(tree.max()).toEqual(900);
  });

  test('hasKey 17', () => {
    const tree = new BinarySearchTree();
    tree.insert(1);
    tree.insert(900);
    tree.insert(20);
    tree.insert(50);
    tree.insert(17);
    tree.insert(16);
    tree.insert(15);
    expect(tree.hasKey(1)).toEqual(true);
    expect(tree.hasKey(900)).toEqual(true);
    expect(tree.hasKey(20)).toEqual(true);
    expect(tree.hasKey(50)).toEqual(true);
    expect(tree.hasKey(17)).toEqual(true);
    expect(tree.hasKey(16)).toEqual(true);
    expect(tree.hasKey(15)).toEqual(true);
  });

  test('does not have Key 666', () => {
    const tree = new BinarySearchTree();
    tree.insert(1);
    tree.insert(900);
    tree.insert(20);
    tree.insert(50);
    tree.insert(17);
    tree.insert(16);
    tree.insert(15);
    expect(tree.hasKey(666)).toEqual(false);
  });

});