// Initial test cases from Alchemy University's course

import MerkleTree from "./merkletree";

const concat = (a, b) => `Hash(${a} + ${b})`;

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
});
