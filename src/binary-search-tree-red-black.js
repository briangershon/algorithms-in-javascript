
/*
  Left Leaning Red Black Binary Search Tree.
  Author: Brian Gershon, March 2020

  Favorite article about Red-Black: https://medium.com/basecs/painting-nodes-black-with-red-black-trees-60eacb2be9a5
  which leads to simplified Left Leaning implementation: https://www.cs.princeton.edu/~rs/talks/LLRB/RedBlack.pdf
*/

class RedBlackBinarySearchTree {
  constructor() {
    this.root = null;
    this.nodeCount = 0;
  }

  insert(key) {
    this.root = this.insertHelper(this.root, key);
  }

  insertHelper(h, key) {
    if (h === null) {
      this.nodeCount += 1;
      const n = new Node(key);
      if (this.root === null) n.red = false;
      return n;
    }

    // color flip on way down
    if (this.isRed(h.left) && this.isRed(h.right)) this.colorFlip(h);

    if (key < h.key) {
      h.left = this.insertHelper(h.left, key);
    } else {
      h.right = this.insertHelper(h.right, key);
    }

    // rotate on way up
    if (this.isRed(h.right)) h = this.rotateLeft(h);
    if (this.isRed(h.left) && this.isRed(h.left.left)) h = this.rotateRight(h);

    return h;
  }

  colorFlip(x) {
    x.red = !x.red;
    x.left.red = !x.left.red;
    x.right.red = !x.right.red;
    return x;
  }

  /*
    8 (h)
     \
      18 (x)
  */
  rotateLeft(h) {
    const x = h.right;
    // change root if necessary
    if (this.root && h === this.root) {
      this.root = x;
    }
    h.right = x.left;
    x.left = h;
    x.red = x.left.red;
    x.left.red = true;
    return x;
  }

  rotateRight(h) {
    const x = h.left;
    // change root if necessary
    if (this.root && h === this.root) {
      this.root = x;
    }
    h.left = x.right;
    x.right = h;
    x.red = x.right.red;
    x.right.red = true;
    return x;
  }

  removeMin() {
    this.root = this.deleteMin(this.root);
    if (this.root) {
      this.root.red = false;
    }
  }

  deleteMin(h) {
    if (h.left === null) return null;
    if (this.isBlack(h.left) && this.isBlack(h.left.left)) h = this.moveRedLeft(h);
    h.left = this.deleteMin(h.left);
    return this.fixUp(h);
  }

  moveRedLeft(h) {
    this.colorFlip(h);
    if (this.isRed(h.right.left)) {
      h.right = this.rotateRight(h.right);
      h = this.rotateLeft(h);
      this.colorFlip(h);
    }
    return h;
  }

  fixUp(h) {
    if (this.isRed(h.right)) h = this.rotateLeft(h);
    if (this.isRed(h.left) && this.isRed(h.left.left)) h = this.rotateRight(h);
    if (this.isRed(h.left) && this.isRed(h.right)) this.colorFlip(h);
    return h;
  }

  isRed(h) {
    if (h === null) return false;
    return h.red;
  }

  isBlack(h) {
    if (h === null) return true;
    return !h.red;
  }


  orderedKeys() {
    const results = [];
    const appendValue = (v) => {
      results.push(v);
    };
    this.inOrderTraversal(this.root, appendValue);
    return results;
  }

  // visit left node, current node, then right node
  inOrderTraversal(node, callback) {
    if (node !== null) {
      this.inOrderTraversal(node.left, callback);
      callback(node.key);  // append via callback
      this.inOrderTraversal(node.right, callback);
    }
  }

  preOrderKeys() {
    const results = [];
    const appendValue = (v) => {
      results.push(v);
    };
    this.preOrderTraversal(this.root, appendValue);
    return results;
  }

  preOrderTraversal(node, callback) {
    if (node !== null) {
      callback(node.key);  // append via callback
      this.preOrderTraversal(node.left, callback);
      this.preOrderTraversal(node.right, callback);
    }
  }

  postOrderKeys() {
    const results = [];
    const appendValue = (v) => {
      results.push(v);
    };
    this.postOrderTraversal(this.root, appendValue);
    return results;
  }

  postOrderTraversal(node, callback) {
    if (node !== null) {
      this.postOrderTraversal(node.left, callback);
      this.postOrderTraversal(node.right, callback);
      callback(node.key);  // append via callback
    }
  }

  // find the bottom left most node
  min() {
    const minNode = this.findMinNode(this.root);
    if (minNode) {
      return minNode.key;
    }
    return null;
  }

  max() {
    return this.maxNode(this.root);
  }

  // find the bottom right most node
  maxNode(node) {
    if (node) {
      while (node && node.right !== null) {
        node = node.right;
      }
      return node.key;
    }
  }

  hasKey(key) {
    return this.search(this.root, key);
  }

  // return found node, or null
  search(node, key) {
    if (node === null) return null;

    if (key < node.key) {
      return this.search(node.left, key);
    } else if (key > node.key) {
      return this.search(node.right, key);
    } else {
      return node;
    }
  }

  remove(key) {
    this.root = this.removeNode(this.root, key);
  }

  removeNode(node, key) {
    if (node === null) {
      return null;
    }
    if (key < node.key) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (key > node.key) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      // found it

      // if leaf node
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }

      // if node with only one child
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }

      // if node has both children
      var rightMinNode = this.findMinNode(node.right);
      node.key = rightMinNode.key;
      node.right = this.removeNode(node.right, rightMinNode.key);
      return node;
    }
  }

  findMinNode(node) {
    while (node && node.left !== null) {
      node = node.left;
    }
    return node;
  }

  getHeight() {
    return this.height(this.root);
  }

  // post traversal to figure out balance
  height(node) {
    if (node === null) {
      return 0;
    }
    const leftHeight = this.height(node.left);
    const rightHeight = this.height(node.right);
    node.height = Math.max(leftHeight, rightHeight) + 1;
    node.balance = leftHeight - rightHeight;
    return node.height;
  }
}

class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
    this.red = true;
  }
}

export default RedBlackBinarySearchTree;