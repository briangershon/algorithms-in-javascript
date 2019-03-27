
function arraySwap(array, indexOne, indexTwo) {
  [array[indexOne], array[indexTwo]] = [array[indexTwo], array[indexOne]];
}

export { arraySwap };