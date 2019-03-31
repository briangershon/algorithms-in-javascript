
class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}

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

  // visit left node, current node, then right node
  orderedKeys() {
    const results = [];
    const appendValue = (v) => {
      results.push(v);
    };
    this.inOrderTraversal(this.root, appendValue);
    return results;
  }

  inOrderTraversal(node, callback) {
    if (node !== null) {
      this.inOrderTraversal(node.left, callback);
      callback(node.key);  // append via callback
      this.inOrderTraversal(node.right, callback);
    }
  }
}

export default BinarySearchTree;