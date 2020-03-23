/*
  A HashTable from scratch using Array + LinkedList implementation.

  The "lose lose" hash is used intentionally to test collision logic.
  */

import LinkedList from './linked-list';

class HashTable {
  constructor() {
    this.arraySize = 7;
    this.data = [];
  }

  loseloseHash(key) {
    let hash = 0;
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i);
    }
    return hash % this.arraySize;
  }

  putValue(key, value) {
    const hash = this.loseloseHash(key);
    if (this.data[hash] === undefined) {
      const list = new LinkedList();
      list.append(key, value);
      this.data[hash] = list;
    } else {
      this.data[hash].append(key, value);
    }
  }

  getValue(key) {
    const hash = this.loseloseHash(key);
    if (this.data[hash]) {
      const nodes = this.data[hash].allNodes();
      for (let i = 0; i < nodes.length; i += 1) {
        const node = nodes[i];
        if (node.key === key) {
          return node.value;
        }
      }
      return null;
    }
    return null;
  }
}

export default HashTable;