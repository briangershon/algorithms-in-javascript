import RedBlackBinarySearchTree from './binary-search-tree-red-black';

describe('Binary Search Tree (Red-Black balancing algorithm)', () => {
  test('minimal balanced tree has expected values', () => {
    const tree = new RedBlackBinarySearchTree();
    tree.root = tree.insert(null, 8);
    tree.insert(tree.root, 18);
    tree.insert(tree.root, 5);

    expect(tree.orderedKeys()).toEqual([5, 8, 18]);

    const root = tree.search(tree.root, 8);
    expect(tree.isBlack(root)).toBeTruthy();

    const left = tree.search(tree.root, 5);
    expect(tree.isRed(left)).toBeTruthy();

    const right = tree.search(tree.root, 18);
    expect(tree.isRed(right)).toBeTruthy();
  });

  // test('insert 1 2 3 should rotate left', () => {
  //   const tree = new RedBlackBinarySearchTree();
  //   tree.root = tree.insert(null, 1);
  //   tree.insert(tree.root, 2);
  //   tree.insert(tree.root, 3);

  //   console.log('tree.orderedKeys()', tree.orderedKeys());
  //   expect(tree.orderedKeys()).toEqual([1, 2, 3]);

  //   const root = tree.search(tree.root, 2);
  //   expect(tree.isBlack(root)).toBeTruthy();

  //   const left = tree.search(tree.root, 1);
  //   expect(tree.isRed(left)).toBeTruthy();

  //   const right = tree.search(tree.root, 3);
  //   expect(tree.isRed(right)).toBeTruthy();
  // });

});
