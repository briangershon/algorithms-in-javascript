
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

  // TODO: Add Left-leaning Red-Black logic
  insert(h, key) {
    if (this.root === null) {
      this.nodeCount += 1;
      const n = new Node(key);
      n.red = false;  // root node is black
      return n;
    }
    if (h === null) {
      this.nodeCount += 1;
      return new Node(key);
    }

    if (key < h.key) {
      h.left = this.insert(h.left, key);
    }
    else {
      h.right = this.insert(h.right, key);
    }

    return h;
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
}

class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
    this.red = true;
  }

  isRed() {
    return this.red;
  }

  isBlack() {
    return !this.red;
  }
}

export default RedBlackBinarySearchTree;