/*
If given these words: 'he', 'hell', 'hello', 'help'
create and search a trie.

{
  h: {
    e: {
      l: {
        p: {}
        l : {
          o: {}
        }
      }
    }
  }
}

*/

class Trie {
  constructor(words) {
    this.trie = this.buildTrie(words);
    console.log('Trie built!', JSON.stringify(this.trie));
  }

  // add first letter if it doesn't exist in node
  recursiveAdd(node, letterArray) {
    if (letterArray.length === 0) {
      return;
    }
    const firstLetter = letterArray.shift();

    // does letter exist at this level? if yes, recursively continue
    if (node.hasOwnProperty(firstLetter)) {
      this.recursiveAdd(node[firstLetter], letterArray);
      return;
    }

    // add it to existing object
    node[firstLetter] = {};
    this.recursiveAdd(node[firstLetter], letterArray);
  }

  buildTrie(words) {
    const result = {};

    words.forEach((word) => {
      const letters = [];
      for (let i = 0; i < word.length; i += 1) {
        letters.push(word[i]);
      }
      this.recursiveAdd(result, letters);
    });
    return result;
  }

  findPrefix(startNode, prefix) {
    console.log(`searching for ${prefix}`);

    let node = startNode;
    console.log('startNode', startNode);
    for (let i = 0; i < prefix.length; i += 1) {
      console.log('prefix[i], node[prefix[i]]', prefix[i]);
      if (node[prefix[i]]) {
        node = node[prefix[i]];
      } else {
        return false;
      }
    }
    return node;
  }
 
  searchPrefix(prefix) {
    // does prefix exist? breadth search
    const nodesToSearch = this.findPrefix(this.trie, prefix);
    // console.log('this.findPrefix(this.trie, prefix)', this.findPrefix(this.trie, prefix));
    if (nodesToSearch) {
      // if prefix has only one item, return it
      if (Object.keys(nodesToSearch).length === 0) {
        return [prefix];
      }

      // do a depth first graph search
      console.log('SEARCHING beginning with', nodesToSearch);
      return [];
    }
    return [];
  }
}

export default Trie;