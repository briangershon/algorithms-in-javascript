/*
  Implement a HashTable from scratch.

  The "lose lose" hash is used intentionally to test collision logic.
  */

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
    // console.log(`key "${hash}" being set to "${value}"`);
    this.data[hash] = value;
  }

  getValue(key) {
    const hash = this.loseloseHash(key);
    return this.data[hash];
  }
}

export default HashTable;