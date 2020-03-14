import RedBlackBinarySearchTree from './binary-search-tree-red-black';

describe('Binary Search Tree (Red-Black balancing algorithm)', () => {
  test('minimal balanced tree has expected values', () => {
    const tree = new RedBlackBinarySearchTree();
    tree.root = tree.insert(null, 8);
    tree.insert(tree.root, 18);
    tree.insert(tree.root, 5);

    expect(tree.orderedKeys()).toEqual([5, 8, 18]);

    const root = tree.search(tree.root, 8);
    expect(root.isBlack()).toBeTruthy();

    const left = tree.search(tree.root, 5);
    expect(left.isRed()).toBeTruthy();

    const right = tree.search(tree.root, 18);
    expect(right.isRed()).toBeTruthy();
  });
});
