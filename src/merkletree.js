class MerkleTree {
  constructor(leaves, concat) {
    this.leaves = leaves;
    this.concat = concat;
  }

  // recursively calculate hashes for each level
  calcLayerHash(leaves, concat) {
    if (leaves.length === 1) return leaves; // stop recursing and return final root hash

    // create next layer of hashes above prior layer
    const newLeaves = [];
    while (leaves.length) {
      if (leaves.length === 3) {
        // handle odd number of items
        newLeaves.push(this.concat(leaves.shift(), leaves.shift()));
        newLeaves.push(leaves.shift());
      } else {
        // handle even number of items
        newLeaves.push(this.concat(leaves.shift(), leaves.shift()));
      }
    }

    return this.calcLayerHash(newLeaves, concat);
  }

  getRoot() {
    // return root hash
    return this.calcLayerHash(this.leaves, this.concat).at(0);
  }
}

export default MerkleTree;
