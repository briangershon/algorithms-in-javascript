
/*
  Binary Search tree with methods for:

  In Order traversal -- e.g. sorted list of keys
  Pre Order traversal -- e.g. useful for showing a structured document
  Post Order traveral -- e.g. useful for adding up space used by files in directories

*/
class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(key) {
    if (this.root === null) {
      this.root = new Node(key);
    } else {
      this.insertNode(this.root, new Node(key));
    }
  }

  insertNode(node, newNode) {
    if (newNode.key < node.key) {
      // add to the left
      if (node.left) {
        this.insertNode(node.left, newNode);
      } else {
        node.left = newNode;
      }
    } else {
      // add to the right
      if (node.right) {
        this.insertNode(node.right, newNode);
      } else {
        node.right = newNode;
      }
    }
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

  min() {
    return this.minNode(this.root);
  }

  // find the bottom left most node
  minNode(node) {
    if (node) {
      while (node && node.left !== null) {
        node = node.left;
      }
      return node.key;
    }
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

  search(node, key) {
    if (node === null) {
      return false;
    }
    if (key < node.key) {
      return this.search(node.left, key);
    } else if (key > node.key) {
      return this.search(node.right, key);
    } else {
      return true;
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
  }
}

export default BinarySearchTree;