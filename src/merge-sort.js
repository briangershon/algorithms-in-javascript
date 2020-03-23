class MergeSort {
  constructor() {
    this.data = [];
    this.cost = 0;
  }

  insert(item) {
    this.data.push(item);
  }

  splitArrayInHalf(array) {
    const mid = Math.floor(array.length / 2);
    const left = array.slice(0,mid);
    const right = array.slice(mid);
    return [left, right];
  }

  merge(arrayLeft, arrayRight) {
    const result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < arrayLeft.length && rightIndex < arrayRight.length) {
      if (arrayLeft[leftIndex] < arrayRight[rightIndex]) {
        result.push(arrayLeft[leftIndex++]);
      } else {
        result.push(arrayRight[rightIndex++]);
      }
    }

    while (leftIndex < arrayLeft.length) {
      result.push(arrayLeft[leftIndex++]);
    }

    while (rightIndex < arrayRight.length) {
      result.push(arrayRight[rightIndex++]);
    }

    return result;
  }

  sortRecursive(array) {
    if (array.length === 1) {
      return array;
    }
    const [left, right] = this.splitArrayInHalf(array);
    return this.merge(this.sortRecursive(left), this.sortRecursive(right));
  }

  sort() {
    this.data = this.sortRecursive(this.data);
  }

  toString() {
    return this.data.join();
  }
}

export default MergeSort;
