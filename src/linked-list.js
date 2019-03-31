class LinkedList {
  constructor() {
    this.head = null;
    this.listLength = 0;
  }

  append(key, value) {
    if (!this.head) {
      this.head = new Node(key, value);
      this.listLength += 1;
      return;
    }
    
    // find tail
    let currentNode = this.head;
    while (currentNode.next) {
      currentNode = currentNode.next;
    }

    // at the end, time to append
    currentNode.next = new Node(key, value);
    this.listLength += 1;
  }

  remove(key) {
    if (this.listLength === 0) {
      return;
    }

    let current = this.head;
    if (current.key === key) {
      this.head = current.next;
      this.listLength -= 1;
      return;
    }
    while (current.next) {
      const prev = current;
      current = current.next;
      if (current.key === key) {
        prev.next = current.next;
        this.listLength -= 1;
        return;
      }
    }
  }

  // return linked list as an array of nodes
  allNodes() {
    if (!this.head) {
      return [];
    } else {
      const result = [];

      let current = this.head;
      result.push({ key: current.key, value: current.value });
      while (current.next) {
        current = current.next;
        result.push({ key: current.key, value: current.value });
      }
      return result;
    }
  }
}

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

export default LinkedList;