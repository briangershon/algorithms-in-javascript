import RedBlackBinarySearchTree from './binary-search-tree-red-black';

describe('Binary Search Tree (Red-Black balancing algorithm)', () => {
  test('minimal balanced tree has expected values', () => {
    const tree = new RedBlackBinarySearchTree();
    tree.insert(8);
    tree.insert(18);
    tree.insert(5);

    expect(tree.orderedKeys()).toEqual([5, 8, 18]);

    const root = tree.search(tree.root, 8);
    expect(tree.isBlack(root)).toBeTruthy();

    const left = tree.search(tree.root, 5);
    expect(tree.isRed(left)).toBeTruthy();

    const right = tree.search(tree.root, 18);
    expect(tree.isRed(right)).toBeTruthy();
  });

  test('delete minimal value', () => {
    const tree = new RedBlackBinarySearchTree();
    tree.insert(8);
    tree.insert(18);
    tree.insert(5);

    tree.removeMin();

    expect(tree.orderedKeys()).toEqual([8, 18]);
  });

  test('delete minimal value (where root node is the min)', () => {
    const tree = new RedBlackBinarySearchTree();
    tree.insert(8);
    tree.removeMin(tree.root);
    tree.insert(18);
    tree.removeMin(tree.root);

    expect(tree.orderedKeys()).toEqual([]);
  });
});
