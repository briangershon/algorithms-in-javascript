import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Return all unique permutations for an array
// using a generator.
class Permutation {
  permutations(array) {
    const result = [];
    for (let p of findNextPermutation(array)) {
      result.push(p);
    }
    return result;
  }
}

function* findNextPermutation(array) {
  let currentPerm = array.sort((a, b) => a - b);
  yield currentPerm;
  for (;;) {
    const next = nextLexPermutation(currentPerm);
    if (next === null) break;
    yield next;
    currentPerm = next;
  }
}

// Algorithm reference: https://www.nayuki.io/page/next-lexicographical-permutation-algorithm
// given a current permutation, figure out the next one in lexicographical order
function nextLexPermutation(a) {
  const array = Array.from(a);
  const i = findLongestAscendingSequenceIndex(array);

  if (i >= 0) {
    // find first character that's greater than character at i
    for (let j = array.length - 1; j >= 0; j--) {
      if (array[j] > array[i]) {
        // swap first character in longest sequence and right-mode bigger character
        [array[j], array[i]] = [array[i], array[j]];
        // reverse suffix and return final array
        return array.slice(0, i + 1).concat(array.slice(i + 1).sort());
      }
    }
  }
  return null;  // no more permutations, we're 100% in lexicographical order
}

// walk backward and find longest non-increasing suffix
function findLongestAscendingSequenceIndex(array) {
  let last = array[array.length - 1];
  for (let i = array.length - 2; i >= 0; i--) {
    if (array[i] >= last) {
      last = array[i];
    } else {
      return i;
    }
  }
  return null;
}

export default Permutation;
