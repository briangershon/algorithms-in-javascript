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

  calcProofLayer(leaves, concat, index) {
    console.log("current leaves", { leaves });
    if (leaves.length <= 1) return leaves;

    const isLeft = index % 2 == 0;
    console.log({ isLeft });
    console.log("leaves[index]", leaves[index]);
    if (isLeft) {
      console.log("leaves[index+1]", leaves[index + 1]);
    } else {
      console.log("leaves[index-1]", leaves[index - 1]);
    }

    const newLeaves = [];
    while (leaves.length) {
      if (leaves.length === 3) {
        newLeaves.push(this.concat(leaves.shift(), leaves.shift()));
        newLeaves.push(leaves.shift());
      } else {
        newLeaves.push(this.concat(leaves.shift(), leaves.shift()));
      }
    }
    console.log('XXX', { newLeaves });
    return this.calcProofLayer(newLeaves, concat, Math.floor(index / 2));
  }

  getProof(index) {
    if (index !== 2) return;
    console.log("looking for index", index);
    return this.calcProofLayer(this.leaves, this.concat, index);
  }
}

export default MerkleTree;
