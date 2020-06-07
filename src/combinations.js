// JavaScript generator that returns all combinations
// using bitmask method.

import 'core-js/stable';
import 'regenerator-runtime/runtime';

// count down in binary from "2 ** array length" to 1
function* combinations(array) {
  if (array.length === 0) yield [];

  let count = (2**array.length) - 1;
  while (count > 0) {
    const combo = (count >>> 0).toString(2).padStart(array.length, '0').split('');
    const result = [];
    for (let i = 0; i < combo.length; i++) {
      if (combo[i] === '1') {
        result.push(array[i]);
      }
    }
    yield result;
    count -= 1;
  }
}

export default combinations;