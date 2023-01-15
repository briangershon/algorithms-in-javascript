// Initial test cases from Alchemy University's course

import MerkleTree from "./merkletree";
import crypto from "crypto";

const concat = (a, b) => `Hash(${a} + ${b})`;

// use the crypto module to create a sha256 hash from the data passed in
function sha256(data) {
  return crypto.createHash("sha256").update(data).digest();
}

// the concat function we use to hash together merkle leaves
function concatHash(left, right) {
  if (!left)
    throw new Error(
      "The concat function expects two hash arguments, the first was not receieved."
    );
  if (!right)
    throw new Error(
      "The concat function expects two hash arguments, the second was not receieved."
    );
  return sha256(Buffer.concat([left, right]));
}

// the concat function we use to show the merkle root calculation
function concatLetters(left, right) {
  return `Hash(${left} + ${right})`;
}

// given a proof, finds the merkle root
function hashProof(node, proof) {
  console.log("PROOF", node, proof);
  console.log(proof.length)
  if (!proof) throw new Error("Missing proof");
  let data = sha256(node);
  for (let i = 0; i < proof.length; i++) {
    const buffers = proof[i].left
      ? [proof[i].data, data]
      : [data, proof[i].data];
    data = sha256(Buffer.concat(buffers));
  }
  return data;
}

describe("MerkleTree", function () {
  it("should handle the base case: [A]", function () {
    const leaves = ["A"];
    const merkleTree = new MerkleTree(leaves, concat);
    expect(merkleTree.getRoot()).toEqual("A");
  });

  it("should create a root from two leaves: [A,B]", function () {
    const leaves = ["A", "B"];
    const merkleTree = new MerkleTree(leaves, concat);
    expect(merkleTree.getRoot()).toEqual("Hash(A + B)");
  });

  it("should create a root from four leaves: [A,B,C,D]", function () {
    const leaves = ["A", "B", "C", "D"];
    const merkleTree = new MerkleTree(leaves, concat);
    expect(merkleTree.getRoot()).toEqual("Hash(Hash(A + B) + Hash(C + D))");
  });

  it("should create a root from three leaves: [A,B,C]", function () {
    const leaves = ["A", "B", "C"];
    const merkleTree = new MerkleTree(leaves, concat);
    expect(merkleTree.getRoot()).toEqual("Hash(Hash(A + B) + C)");
  });

  it("should create a root from five leaves: [A,B,C,D,E]", function () {
    const leaves = ["A", "B", "C", "D", "E"];
    const merkleTree = new MerkleTree(leaves, concat);
    expect(merkleTree.getRoot()).toEqual(
      "Hash(Hash(Hash(A + B) + Hash(C + D)) + E)"
    );
  });

  it("should create a root from seven leaves: [A,B,C,D,E,F,G]", function () {
    const leaves = ["A", "B", "C", "D", "E", "F", "G"];
    const merkleTree = new MerkleTree(leaves, concat);
    expect(merkleTree.getRoot()).toEqual(
      "Hash(Hash(Hash(A + B) + Hash(C + D)) + Hash(Hash(E + F) + G))"
    );
  });

  describe("merkle proof", function () {
    const leaves = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const root =
      "eb100814abc896ab18bcf6c37b6550eeadeae0c312532286a4cf4be132ace526";
    const hashTree = new MerkleTree(leaves.map(sha256), concatHash);
    const lettersTree = new MerkleTree(leaves, concatLetters);

    describe("for each leaf", function () {
      leaves.forEach((leaf, i) => {
        if (leaf != "C") return; //debugging
        it.only(`should return a proof that calculates the root from leaf ${leaves[i]}`, function () {
          const proof = hashTree.getProof(i);
          const hashedProof = hashProof(leaf, proof).toString("hex");
          if (hashedProof !== root) {
            const lettersProof = lettersTree.getProof(i);
            console.log(
              "The resulting hash of your proof is wrong. \n" +
                `We were expecting: ${root} \n` +
                `We received: ${hashedProof} \n` +
                `In ${leaves.join("")} Merkle tree, the proof of ${
                  leaves[i]
                } you gave us is: \n` +
                `${JSON.stringify(lettersProof, null, 2)}`
            );
          }
          expect(hashedProof).toEqual(root);
        });
      });
    });
  });
});
