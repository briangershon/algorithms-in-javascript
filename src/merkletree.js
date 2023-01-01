class MerkleTree {
  constructor(leaves, concat) {
    this.leaves = leaves;
    this.concat = concat;
  }

  calcLayer(leaves, concat) {
    if (leaves.length === 1) return leaves;

    const newLeaves = [];
    while (leaves.length) {
      if (leaves.length === 3) {
        newLeaves.push(this.concat(leaves.shift(), leaves.shift()));
        newLeaves.push(leaves.shift());
      } else {
        newLeaves.push(this.concat(leaves.shift(), leaves.shift()));
      }
    }
    return this.calcLayer(newLeaves, concat);
  }

  getRoot() {
    return this.calcLayer(this.leaves, this.concat).at(0);
  }
}

export default MerkleTree;
